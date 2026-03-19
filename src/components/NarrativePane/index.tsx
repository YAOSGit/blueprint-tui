// src/components/NarrativePane/index.tsx
import { Text } from 'ink';
import { renderMarkdown } from '../../hooks/useMarkdown/index.js';
import type { NarrativePaneProps } from './NarrativePane.types.js';

export function NarrativePane({
	body,
	scrollOffset,
	width,
}: NarrativePaneProps) {
	const rendered = renderMarkdown(body, width);
	const lines = rendered.split('\n');
	const visible = lines.slice(scrollOffset);

	return (
		<>
			{visible.map((line, i) => {
				const lineKey = `line-${scrollOffset + i}-${line.slice(0, 20)}`;
				return <Text key={lineKey}>{line || ' '}</Text>;
			})}
		</>
	);
}
