// src/components/ValidationStatus/index.tsx
import { Box, Text } from 'ink';
import type { ValidationStatusProps } from './ValidationStatus.types.js';

export function ValidationStatus({
	validate,
	required,
	result,
}: ValidationStatusProps) {
	if (!validate) return null;

	return (
		<Box flexDirection="column" paddingX={1}>
			<Text bold dimColor>
				VALIDATION
			</Text>
			<Text>
				{required ? (
					<Text color="yellow">● Required</Text>
				) : (
					<Text dimColor>○ Optional</Text>
				)}
			</Text>
			{result ? (
				<>
					<Text>
						{result.state === 'passing' && <Text color="green">✓ </Text>}
						{result.state === 'failing' && <Text color="red">✗ </Text>}
						{result.state === 'running' && <Text color="yellow">⟳ </Text>}
						{result.state === 'timeout' && <Text color="red">⏱ </Text>}
						<Text dimColor>{validate.command}</Text>
					</Text>
					{result.state === 'failing' && (
						<Text color="yellow">Hint: {validate.hint}</Text>
					)}
					{result.state === 'timeout' && (
						<Text color="red">Validation timed out</Text>
					)}
				</>
			) : (
				<Text dimColor>Press v to validate</Text>
			)}
		</Box>
	);
}
