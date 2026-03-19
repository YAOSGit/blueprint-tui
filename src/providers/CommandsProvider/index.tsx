// src/providers/CommandsProvider/index.tsx
import path from 'node:path';
import { createCommandsProvider } from '@yaos-git/toolkit/tui/commands';
import type { PendingConfirmation } from '@yaos-git/toolkit/types';
import React, { useCallback, useMemo, useState } from 'react';
import { useProcess } from '../../hooks/useProcess/index.js';
import { useTour } from '../../hooks/useTour/index.js';
import { useUIState } from '../../hooks/useUIState/index.js';
import { runOneShot } from '../../utils/runner/oneShot.js';
import { detectEditor } from '../../utils/teleport/editorDetector.js';
import { executeTeleport } from '../../utils/teleport/index.js';
import { PROJECT_COMMANDS } from './CommandsProvider.consts.js';
import type {
	CommandDeps,
	CommandsProviderProps,
} from './CommandsProvider.types.js';

const {
	CommandsProvider: ToolkitCommandsProvider,
	useCommands: toolkitUseCommands,
	COMMANDS,
} = createCommandsProvider<CommandDeps>(PROJECT_COMMANDS);

export { COMMANDS };

export const CommandsProvider: React.FC<CommandsProviderProps> = ({
	onQuit,
	projectRoot,
	editorOverride,
	children,
}) => {
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

	const [confirmation, setConfirmation] = useState<PendingConfirmation | null>(null);

	const requestConfirmation = useCallback(
		(message: string, onConfirm: () => void) => {
			setConfirmation({ message, onConfirm });
		},
		[],
	);

	const clearConfirmation = useCallback(() => {
		setConfirmation(null);
	}, []);

	const deps: CommandDeps = useMemo(
		() => ({
			ui: {
				activeOverlay: confirmation ? 'confirmation' : uiState.activeOverlay as string | 'none',
				setActiveOverlay: (overlay: string | 'none') => {
					setConfirmation(null);
					(uiState.setActiveOverlay as (o: string | 'none') => void)(overlay);
				},
				cycleFocus: uiState.cycleFocus,
				confirmation,
				requestConfirmation,
				clearConfirmation,
			},
			tour,
			uiState,
			process: proc,
			onTeleport,
			onValidate,
			onQuit,
		}),
		[tour, uiState, proc, onTeleport, onValidate, onQuit, confirmation, requestConfirmation, clearConfirmation],
	);

	return (
		<ToolkitCommandsProvider deps={deps}>
			{children}
		</ToolkitCommandsProvider>
	);
};

export function useCommands() {
	return toolkitUseCommands();
}
