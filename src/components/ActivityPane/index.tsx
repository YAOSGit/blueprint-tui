// src/components/ActivityPane/index.tsx
import { Box } from 'ink';
import { ActionList } from '../ActionList/index.js';
import { ProcessOutput } from '../ProcessOutput/index.js';
import { ValidationStatus } from '../ValidationStatus/index.js';
import type { ActivityPaneProps } from './ActivityPane.types.js';

export function ActivityPane({
	actions,
	processes,
	validate,
	required,
	validationResult,
	processLines,
	processLabel,
	focusPane,
	selectedActionIndex,
	processScrollOffset,
	onRunAction,
}: ActivityPaneProps) {
	const hasActions = actions.length > 0;
	const hasValidation = !!validate;
	const hasOutput = processLines.length > 0;

	return (
		<Box flexDirection="column" flexGrow={1}>
			{hasActions && (
				<ActionList
					actions={actions}
					processes={processes}
					focused={focusPane === 'actions'}
					selectedIndex={selectedActionIndex}
					onRun={onRunAction}
				/>
			)}
			{hasValidation && (
				<ValidationStatus
					validate={validate}
					required={required}
					result={validationResult}
				/>
			)}
			{(hasOutput || hasActions) && (
				<ProcessOutput
					lines={processLines}
					label={processLabel}
					scrollOffset={processScrollOffset}
					focused={focusPane === 'processOutput'}
				/>
			)}
		</Box>
	);
}
