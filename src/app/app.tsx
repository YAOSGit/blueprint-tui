// src/app/app.tsx
import { Box, Text, useInput, useStdout } from 'ink';
import { useEffect, useState } from 'react';
import { ActivityPane } from '../components/ActivityPane/index.js';
import { Header } from '../components/Header/index.js';
import { HelpOverlay } from '../components/HelpOverlay/index.js';
import { JumpOverlay } from '../components/JumpOverlay/index.js';
import { NarrativePane } from '../components/NarrativePane/index.js';
import { ProgressFooter } from '../components/ProgressFooter/index.js';
import { useCommands } from '../hooks/useCommands/index.js';
import { useProcess } from '../hooks/useProcess/index.js';
import { useTour } from '../hooks/useTour/index.js';
import { useUIState } from '../hooks/useUIState/index.js';

export function AppContent() {
	const { stdout } = useStdout();
	const termHeight = stdout?.rows ?? 24;
	const termWidth = stdout?.columns ?? 80;

	const tour = useTour();
	const proc = useProcess();
	const uiState = useUIState();
	const { commands, deps: commandDeps } = useCommands();

	const [selectedActionIdx, setSelectedActionIdx] = useState(0);

	// Reset scroll and action selection on step change
	const chapterIdx = tour.chapterIndex;
	const stepIdx = tour.stepIndex;
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentional trigger on step/chapter change
	useEffect(() => {
		uiState.scrollNarrative(-Infinity);
		setSelectedActionIdx(0);
	}, [chapterIdx, stepIdx]);

	// Handle Up/Down in action focus mode
	useInput((_input, key) => {
		if (uiState.focusPane !== 'actions') return;
		if (key.upArrow) setSelectedActionIdx((prev) => Math.max(0, prev - 1));
		if (key.downArrow)
			setSelectedActionIdx((prev) =>
				Math.min(tour.currentStep.actions.length - 1, prev + 1),
			);
	});

	// Determine active process output
	const activeProcesses = [...proc.processes.entries()];
	const lastActive =
		activeProcesses.length > 0
			? activeProcesses[activeProcesses.length - 1]
			: null;
	const processLines = lastActive ? lastActive[1].output : [];
	const processLabel = lastActive ? lastActive[1].actionLabel : '';

	// Collect all step IDs for progress stepper
	const allStepIds = tour.tour.chapters.flatMap((c) =>
		c.steps.map((s) => s.id),
	);

	// Overlay rendering
	if (uiState.activeOverlay === 'jump') {
		return (
			<Box
				flexDirection="column"
				width={termWidth}
				height={termHeight}
				borderStyle="round"
				borderColor="blue"
				paddingX={1}
			>
				<JumpOverlay
					tour={tour.tour}
					currentChapterId={tour.currentChapter.id}
					currentStepId={tour.currentStep.id}
					onJump={(cid, sid) => tour.jumpTo(cid, sid)}
					onClose={() => uiState.setActiveOverlay('none')}
				/>
			</Box>
		);
	}

	if (uiState.activeOverlay === 'help') {
		return (
			<Box
				flexDirection="column"
				width={termWidth}
				height={termHeight}
				borderStyle="round"
				borderColor="blue"
				paddingX={1}
			>
				<HelpOverlay onClose={() => uiState.setActiveOverlay('none')} />
			</Box>
		);
	}

	return (
		<Box
			flexDirection="column"
			width={termWidth}
			height={termHeight}
			borderStyle="round"
			borderColor="blue"
			paddingX={1}
		>
			<Header
				tourName={tour.tour.name}
				chapterTitle={tour.currentChapter.title}
				chapterNumber={tour.chapterIndex}
				stepNumber={tour.stepIndex}
				totalSteps={tour.totalSteps}
			/>

			<Box flexDirection="row" flexGrow={1}>
				<Box width="55%" flexDirection="column">
					<NarrativePane
						body={tour.currentStep.body}
						scrollOffset={uiState.narrativeScroll}
						focused={uiState.focusPane === 'narrative'}
					/>
				</Box>
				<Box width="45%" flexDirection="column">
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
				</Box>
			</Box>

			{uiState.statusMessage && (
				<Box paddingX={1}>
					<Text dimColor>{uiState.statusMessage}</Text>
				</Box>
			)}

			<ProgressFooter
				commands={commands}
				commandDeps={commandDeps}
				chapterTitle={tour.currentChapter.title}
				globalStepIndex={tour.globalStepIndex}
				globalTotalSteps={tour.globalTotalSteps}
				stepValidations={tour.stepValidations}
				stepIds={allStepIds}
			/>
		</Box>
	);
}
