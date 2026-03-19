// src/components/Header/index.tsx
import { Box, Text } from 'ink';
import { theme } from '../../theme.js';
import type { HeaderProps } from './Header.types.js';

export function Header({
	tourName,
	chapterTitle,
	chapterNumber,
	stepNumber,
	totalSteps,
}: HeaderProps) {
	return (
		<Box width="100%" borderStyle="round" borderColor="gray" paddingX={1}>
			<Text wrap="truncate">
				<Text bold color={theme.brand}>
					{tourName}
				</Text>
				<Text dimColor> › </Text>
				<Text>
					Ch {chapterNumber + 1}: {chapterTitle}
				</Text>
				<Text dimColor> › </Text>
				<Text>
					Step {stepNumber + 1}/{totalSteps}
				</Text>
			</Text>
		</Box>
	);
}
