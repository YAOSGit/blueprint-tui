// src/components/ActionList/index.tsx
import { Box, Text, useInput } from 'ink';
import type { ActionListProps } from './ActionList.types.js';

const STATUS_ICONS: Record<string, string> = {
	idle: '▷',
	running: '▶',
	done: '✓',
	failed: '✗',
};

const STATUS_COLORS: Record<string, string> = {
	idle: 'gray',
	running: 'yellow',
	done: 'green',
	failed: 'red',
};

export function ActionList({
	actions,
	processes,
	focused,
	selectedIndex,
	onRun,
}: ActionListProps) {
	useInput((_input, key) => {
		if (!focused) return;
		if (actions.length === 0) return;
		if (key.return && actions[selectedIndex]) {
			onRun(actions[selectedIndex]);
		}
	});

	if (actions.length === 0) return null;

	return (
		<Box flexDirection="column" paddingX={1}>
			<Text bold dimColor>
				ACTIONS
			</Text>
			{actions.map((action, i) => {
				const proc = processes.get(action.label);
				const status = proc?.status ?? 'idle';
				const icon = STATUS_ICONS[status];
				const color = STATUS_COLORS[status];
				const selected = focused && i === selectedIndex;

				return (
					<Text key={action.label}>
						{selected ? <Text color="cyan">{'> '}</Text> : '  '}
						<Text color={color}>{icon}</Text> <Text>{action.label}</Text>
						{proc?.persistent && status === 'running' && (
							<Text dimColor> (running)</Text>
						)}
					</Text>
				);
			})}
		</Box>
	);
}
