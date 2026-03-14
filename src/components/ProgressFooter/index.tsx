// src/components/ProgressFooter/index.tsx
import { Box, Text } from 'ink';
import type { ProgressFooterProps } from './ProgressFooter.types.js';

export function ProgressFooter({
	commands,
	commandDeps,
	chapterTitle: _chapterTitle,
	globalStepIndex,
	globalTotalSteps: _globalTotalSteps,
	stepValidations,
	stepIds,
}: ProgressFooterProps) {
	const stepper = stepIds
		.map((id, i) => {
			if (i === globalStepIndex) return '●';
			if (i < globalStepIndex) {
				const v = stepValidations.get(id);
				if (v && v.state === 'passing') return '●';
				return '\x1b[2m●\x1b[0m';
			}
			return '○';
		})
		.join(' ');

	const visibleCommands = commands.filter(
		(c) => c.footer !== 'hidden' && c.isEnabled(commandDeps),
	);

	return (
		<Box borderStyle="round" borderColor="gray" paddingX={1}>
			<Text wrap="end">
				<Text bold color="magenta">
					YAOSGit
					<Text dimColor> : </Text>
					blueprint
				</Text>
				<Text dimColor> │ </Text>
				<Text dimColor>{stepper}</Text>
				{visibleCommands.map((cmd) => (
					<Text key={cmd.id}>
						<Text dimColor> │ </Text>
						<Text bold>{cmd.displayKey}</Text> {cmd.displayText}
					</Text>
				))}
			</Text>
		</Box>
	);
}
