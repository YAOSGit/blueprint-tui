// src/components/ActionList/index.tsx
import { Box, Text, useInput } from 'ink';
import { StatusIcon } from '@yaos-git/toolkit/tui/components';
import { theme } from '../../theme.js';
import { STATUS_COLORS, STATUS_ICONS } from './ActionList.consts.js';
import type { ActionListProps } from './ActionList.types.js';

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
				const selected = focused && i === selectedIndex;

				return (
					<Text key={action.label}>
						{selected ? <Text color={theme.brand}>{'▸ '}</Text> : '  '}
						{status === 'done' ? (
							<StatusIcon status="success" />
						) : status === 'failed' ? (
							<StatusIcon status="error" />
						) : (
							<Text color={STATUS_COLORS[status]}>{STATUS_ICONS[status]}</Text>
						)}{' '}
						<Text>{action.label}</Text>
						{proc?.persistent && status === 'running' && (
							<Text dimColor> (running)</Text>
						)}
					</Text>
				);
			})}
		</Box>
	);
}
