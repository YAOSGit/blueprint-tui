// src/components/NarrativePane/index.tsx
import { Box, Text } from 'ink';
import { renderMarkdown } from '../../hooks/useMarkdown/index.js';
import type { NarrativePaneProps } from './NarrativePane.types.js';

export function NarrativePane({
	body,
	scrollOffset,
	focused,
}: NarrativePaneProps) {
	const rendered = renderMarkdown(body);
	const lines = rendered.split('\n');
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
			{visible.map((line, i) => {
				const lineKey = `line-${scrollOffset + i}-${line.slice(0, 20)}`;
				return <Text key={lineKey}>{line || ' '}</Text>;
			})}
		</Box>
	);
}
