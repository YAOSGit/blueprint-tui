// src/components/ProgressFooter/index.tsx
import { CommandFooter } from '@yaos-git/toolkit/tui/components';
import { Text } from 'ink';
import { theme } from '../../theme.js';
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
			if (i === globalStepIndex) return '\u25CF';
			if (i < globalStepIndex) {
				const v = stepValidations.get(id);
				if (v && v.state === 'passing') return '\u25CF';
				return '\x1b[2m\u25CF\x1b[0m';
			}
			return '\u25CB';
		})
		.join(' ');

	return (
		<CommandFooter brand="blueprint" commands={commands} deps={commandDeps} theme={theme}>
			<Text dimColor>{stepper}</Text>
		</CommandFooter>
	);
}
