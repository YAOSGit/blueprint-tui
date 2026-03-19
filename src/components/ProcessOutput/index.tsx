// src/components/ProcessOutput/index.tsx
import { Text } from 'ink';
import { FocusablePane } from '@yaos-git/toolkit/tui/components';
import { theme } from '../../theme.js';
import type { ProcessOutputProps } from './ProcessOutput.types.js';

export function ProcessOutput({
	lines,
	label,
	scrollOffset,
	focused,
}: ProcessOutputProps) {
	if (lines.length === 0 && !label) return null;

	const visible = lines.slice(scrollOffset);

	return (
		<FocusablePane focused={focused} theme={theme}>
			<Text bold dimColor>
				PROCESS OUTPUT {label && `[${label}]`}
			</Text>
			{visible.map((line, i) => {
				const lineKey = `out-${scrollOffset + i}-${line.slice(0, 20)}`;
				return (
					<Text key={lineKey} wrap="truncate">
						{line}
					</Text>
				);
			})}
		</FocusablePane>
	);
}
