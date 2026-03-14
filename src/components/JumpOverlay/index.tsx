// src/components/JumpOverlay/index.tsx
import { Box, Text, useInput } from 'ink';
import { useState } from 'react';
import type { JumpOverlayProps } from './JumpOverlay.types.js';

export function JumpOverlay({
	tour,
	currentChapterId,
	currentStepId,
	onJump,
	onClose,
}: JumpOverlayProps) {
	// Build flat list of all chapter:step entries
	const entries: {
		chapterId: string;
		chapterTitle: string;
		stepId: string;
		stepTitle: string;
	}[] = [];
	for (const chapter of tour.chapters) {
		for (const step of chapter.steps) {
			entries.push({
				chapterId: chapter.id,
				chapterTitle: chapter.title,
				stepId: step.id,
				stepTitle: step.title,
			});
		}
	}

	const currentIdx = entries.findIndex(
		(e) => e.chapterId === currentChapterId && e.stepId === currentStepId,
	);
	const [selectedIdx, setSelectedIdx] = useState(Math.max(0, currentIdx));

	useInput((_input, key) => {
		if (key.escape) {
			onClose();
			return;
		}
		if (key.return) {
			const entry = entries[selectedIdx];
			onJump(entry.chapterId, entry.stepId);
			onClose();
			return;
		}
		if (key.upArrow) {
			setSelectedIdx((prev) => Math.max(0, prev - 1));
		}
		if (key.downArrow) {
			setSelectedIdx((prev) => Math.min(entries.length - 1, prev + 1));
		}
	});

	return (
		<Box
			flexDirection="column"
			borderStyle="double"
			borderColor="cyan"
			paddingX={1}
			paddingY={1}
		>
			<Text bold>Jump to Step</Text>
			<Text dimColor>Use ↑↓ to navigate, Enter to select, Esc to cancel</Text>
			<Box flexDirection="column" marginTop={1}>
				{entries.map((entry, i) => {
					const isCurrent =
						entry.chapterId === currentChapterId &&
						entry.stepId === currentStepId;
					const isSelected = i === selectedIdx;
					return (
						<Text key={`${entry.chapterId}:${entry.stepId}`}>
							{isSelected ? <Text color="cyan">{'> '}</Text> : '  '}
							<Text dimColor>{entry.chapterTitle}</Text>
							<Text dimColor> / </Text>
							<Text bold={isCurrent}>{entry.stepTitle}</Text>
							{isCurrent && <Text dimColor> (current)</Text>}
						</Text>
					);
				})}
			</Box>
		</Box>
	);
}
