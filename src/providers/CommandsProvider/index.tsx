// src/providers/CommandsProvider/index.tsx
import path from 'node:path';
import { useInput } from 'ink';
import { createContext, useCallback, useMemo } from 'react';
import { useProcess } from '../../hooks/useProcess/index.js';
import { useTour } from '../../hooks/useTour/index.js';
import { useUIState } from '../../hooks/useUIState/index.js';
import { runOneShot } from '../../runner/oneShot.js';
import { detectEditor } from '../../teleport/editorDetector.js';
import { executeTeleport } from '../../teleport/index.js';
import { COMMANDS } from './CommandsProvider.consts.js';
import type {
	CommandDeps,
	CommandsContextValue,
	CommandsProviderProps,
} from './CommandsProvider.types.js';

export const CommandsContext = createContext<CommandsContextValue | null>(null);

export function CommandsProvider({
	onQuit,
	projectRoot,
	editorOverride,
	children,
}: CommandsProviderProps) {
	const tour = useTour();
	const proc = useProcess();
	const uiState = useUIState();

	const onTeleport = useCallback(() => {
		const teleport = tour.currentStep.teleport;
		if (!teleport) return;
		const editor = detectEditor({
			cliOverride: editorOverride,
			configEditor: tour.tour.editor,
		});
		if (!editor) {
			uiState.setStatusMessage(
				'No editor detected — set $EDITOR or use --editor',
			);
			return;
		}
		const resolvedFile = path.resolve(projectRoot, teleport.file);
		const result = executeTeleport(editor, { ...teleport, file: resolvedFile });
		if (result.ok) {
			uiState.setStatusMessage(
				`Opened ${teleport.file}:${teleport.line} in ${editor}`,
			);
		} else {
			uiState.setStatusMessage(
				`Teleport failed: ${result.error} — is "${editor}" installed?`,
			);
		}
	}, [
		tour.currentStep,
		tour.tour.editor,
		editorOverride,
		projectRoot,
		uiState,
	]);

	const onValidate = useCallback(() => {
		const validate = tour.currentStep.validate;
		if (!validate) return;
		tour.setValidation(tour.currentStep.id, {
			state: 'running',
			output: '',
			hint: validate.hint,
		});
		runOneShot(validate.command).then((result) => {
			if (result.timedOut) {
				tour.setValidation(tour.currentStep.id, {
					state: 'timeout',
					output: result.output,
					hint: validate.hint,
				});
			} else if (result.exitCode === 0) {
				tour.setValidation(tour.currentStep.id, {
					state: 'passing',
					output: result.output,
					hint: validate.hint,
				});
			} else {
				tour.setValidation(tour.currentStep.id, {
					state: 'failing',
					output: result.output,
					hint: validate.hint,
				});
			}
		});
	}, [tour]);

	const deps: CommandDeps = useMemo(
		() => ({
			tour,
			uiState,
			process: proc,
			onTeleport,
			onValidate,
			onQuit,
		}),
		[tour, uiState, proc, onTeleport, onValidate, onQuit],
	);

	useInput((input, key) => {
		// Escape dismisses overlays
		if (key.escape) {
			if (uiState.activeOverlay !== 'none') {
				uiState.setActiveOverlay('none');
				return;
			}
		}

		// Arrow-key and Tab commands are handled via special key matching
		// (they have empty `keys` arrays so won't match the text-input loop below)
		if (key.tab) {
			const cmd = COMMANDS.find((c) => c.id === 'CYCLE_FOCUS');
			if (cmd?.isEnabled(deps)) cmd.execute(deps);
			return;
		}

		if (key.upArrow || key.downArrow) {
			const id = key.upArrow ? 'SCROLL_UP' : 'SCROLL_DOWN';
			const cmd = COMMANDS.find((c) => c.id === id);
			if (cmd?.isEnabled(deps)) cmd.execute(deps);
			return;
		}

		if (key.shift && key.leftArrow) {
			const cmd = COMMANDS.find((c) => c.id === 'PREV_CHAPTER');
			if (cmd?.isEnabled(deps)) cmd.execute(deps);
			return;
		}
		if (key.shift && key.rightArrow) {
			const cmd = COMMANDS.find((c) => c.id === 'NEXT_CHAPTER');
			if (cmd?.isEnabled(deps)) cmd.execute(deps);
			return;
		}

		if (key.leftArrow) {
			const cmd = COMMANDS.find((c) => c.id === 'PREV_STEP');
			if (cmd?.isEnabled(deps)) cmd.execute(deps);
			return;
		}
		if (key.rightArrow) {
			const cmd = COMMANDS.find((c) => c.id === 'NEXT_STEP');
			if (cmd?.isEnabled(deps)) cmd.execute(deps);
			return;
		}

		// Match registered text-key commands
		for (const cmd of COMMANDS) {
			if (cmd.keys.includes(input) && cmd.isEnabled(deps)) {
				cmd.execute(deps);
				return;
			}
		}
	});

	const value: CommandsContextValue = useMemo(
		() => ({ commands: COMMANDS, deps }),
		[deps],
	);

	return (
		<CommandsContext.Provider value={value}>
			{children}
		</CommandsContext.Provider>
	);
}
