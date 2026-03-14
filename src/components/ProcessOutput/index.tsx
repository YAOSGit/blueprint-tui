// src/components/ProcessOutput/index.tsx
import { Box, Text } from 'ink';
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
		<Box
			flexDirection="column"
			flexGrow={1}
			borderStyle="round"
			borderColor={focused ? 'cyan' : 'gray'}
			paddingX={1}
			overflow="hidden"
		>
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
		</Box>
	);
}
