// src/app/app.tsx
import { SplitPane, TUILayout } from '@yaos-git/toolkit/tui/components';
import { Text, useInput, useStdout } from 'ink';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityPane } from '../components/ActivityPane/index.js';
import { Header } from '../components/Header/index.js';
import { JumpOverlay } from '../components/JumpOverlay/index.js';
import { NarrativePane } from '../components/NarrativePane/index.js';
import { SECTION_COLORS } from '../providers/CommandsProvider/CommandsProvider.consts.js';
import { useCommands } from '../hooks/useCommands/index.js';
import { useProcess } from '../hooks/useProcess/index.js';
import { useTour } from '../hooks/useTour/index.js';
import { useUIState } from '../hooks/useUIState/index.js';
import { theme } from '../theme.js';

function useTermWidth(): number {
	const { stdout } = useStdout();
	const [width, setWidth] = useState(stdout?.columns ?? 80);
	const mountedRef = useRef(true);

	const onResize = useCallback(() => {
		if (mountedRef.current && stdout) setWidth(stdout.columns);
	}, [stdout]);

	useEffect(() => {
		if (!stdout) return;
		stdout.on('resize', onResize);
		return () => {
			mountedRef.current = false;
			stdout.off('resize', onResize);
		};
	}, [stdout, onResize]);

	return width;
}

export function AppContent() {
	const termWidth = useTermWidth();
	const narrativeWidth = Math.floor(termWidth * 0.55) - 8;
	const tour = useTour();
	const proc = useProcess();
	const uiState = useUIState();
	const { commands, deps: commandDeps } = useCommands();

	const [selectedActionIdx, setSelectedActionIdx] = useState(0);

	const chapterIdx = tour.chapterIndex;
	const stepIdx = tour.stepIndex;
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional trigger on step/chapter change
	useEffect(() => {
		uiState.scrollNarrative(-Infinity);
		setSelectedActionIdx(0);
	}, [chapterIdx, stepIdx]);

	useInput((_input, key) => {
		if (uiState.focusPane !== 'actions') return;
		if (key.upArrow) setSelectedActionIdx((prev) => Math.max(0, prev - 1));
		if (key.downArrow)
			setSelectedActionIdx((prev) =>
				Math.min(tour.currentStep.actions.length - 1, prev + 1),
			);
	});

	const activeProcesses = [...proc.processes.entries()];
	const lastActive =
		activeProcesses.length > 0
			? activeProcesses[activeProcesses.length - 1]
			: null;
	const processLines = lastActive ? lastActive[1].output : [];
	const processLabel = lastActive ? lastActive[1].actionLabel : '';

	// Progress stepper dots
	const allStepIds = tour.tour.chapters.flatMap((c) =>
		c.steps.map((s) => s.id),
	);
	const stepper = allStepIds
		.map((id, i) => {
			if (i === tour.globalStepIndex) return '\u25CF';
			if (i < tour.globalStepIndex) {
				const v = tour.stepValidations.get(id);
				if (v && v.state === 'passing') return '\u25CF';
				return '\x1b[2m\u25CF\x1b[0m';
			}
			return '\u25CB';
		})
		.join(' ');

	// Determine focused pane index for SplitPane (0 = left/narrative, 1 = right/activity)
	const focusedPaneIndex = uiState.focusPane === 'narrative' ? 0 : 1;

	return (
		<TUILayout
			brand="blueprint"
			theme={theme}
			commands={commands}
			deps={commandDeps}
			helpTitle="YAOSGit blueprint - Keyboard Shortcuts"
			helpSectionColors={SECTION_COLORS}
			overlays={{
				jump: () => (
					<JumpOverlay
						tour={tour.tour}
						currentChapterId={tour.currentChapter.id}
						currentStepId={tour.currentStep.id}
						onJump={(cid, sid) => tour.jumpTo(cid, sid)}
						onClose={() => uiState.setActiveOverlay('none')}
					/>
				),
			}}
			header={
				<Header
					tourName={tour.tour.name}
					chapterTitle={tour.currentChapter.title}
					chapterNumber={tour.chapterIndex}
					stepNumber={tour.stepIndex}
					totalSteps={tour.totalSteps}
				/>
			}
			statusBar={
				uiState.statusMessage ? (
					<Text dimColor>{uiState.statusMessage}</Text>
				) : null
			}
			footerChildren={<Text dimColor>{stepper}</Text>}
		>
			<SplitPane
				direction="horizontal"
				ratio={[55, 45]}
				focusedIndex={focusedPaneIndex}
				theme={theme}
				borders={[true, false]}
			>
				<NarrativePane
					body={tour.currentStep.body}
					scrollOffset={uiState.narrativeScroll}
					width={narrativeWidth}
				/>
				<ActivityPane
					actions={tour.currentStep.actions}
					processes={proc.processes}
					validate={tour.currentStep.validate}
					required={tour.currentStep.required}
					validationResult={tour.validation}
					processLines={processLines}
					processLabel={processLabel}
					focusPane={uiState.focusPane}
					selectedActionIndex={selectedActionIdx}
					processScrollOffset={uiState.processScroll}
					onRunAction={proc.runAction}
				/>
			</SplitPane>
		</TUILayout>
	);
}
