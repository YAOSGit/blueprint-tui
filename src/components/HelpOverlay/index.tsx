// src/components/HelpOverlay/index.tsx
import { Box, Text, useInput } from 'ink';
import {
	COMMANDS,
	SECTION_COLORS,
} from '../../providers/CommandsProvider/CommandsProvider.consts.js';
import type { HelpOverlayProps } from './HelpOverlay.types.js';

const HELP_SECTIONS = (() => {
	const sectionMap = new Map<
		string,
		{ color: string; rows: Array<{ key: string; label: string }> }
	>();
	for (const cmd of COMMANDS) {
		if (!cmd.helpSection) continue;
		if (!sectionMap.has(cmd.helpSection)) {
			sectionMap.set(cmd.helpSection, {
				color: SECTION_COLORS[cmd.helpSection] ?? 'white',
				rows: [],
			});
		}
		// Skip duplicate display keys within a section (e.g. ↑/↓ share "Scroll pane")
		if (cmd.helpLabel === undefined) continue;
		sectionMap.get(cmd.helpSection)?.rows.push({
			key: cmd.displayKey,
			label: cmd.helpLabel ?? cmd.displayText,
		});
	}
	return Array.from(sectionMap.entries()).map(([title, { color, rows }]) => ({
		title,
		color,
		rows,
	}));
})();

export function HelpOverlay({ onClose }: HelpOverlayProps) {
	useInput((input, key) => {
		if (key.escape || input === 'q' || input === 'h') {
			onClose();
		}
	});

	return (
		<Box
			flexDirection="column"
			borderStyle="round"
			borderColor="yellow"
			paddingX={2}
			paddingY={1}
		>
			<Box marginBottom={1} justifyContent="center">
				<Text bold color="yellow">
					YAOSGit blueprint - Keyboard Shortcuts
				</Text>
			</Box>

			<Box flexDirection="row" gap={4} justifyContent="center">
				{HELP_SECTIONS.map((section, sectionIdx) => (
					<Box key={section.title} flexDirection="column" gap={1}>
						<Text
							bold
							underline
							color={section.color as Parameters<typeof Text>[0]['color']}
						>
							{section.title}
						</Text>
						{section.rows.map(({ key, label }) => (
							<Text key={key}>
								<Text bold>{key}</Text> : {label}
							</Text>
						))}
						{sectionIdx === HELP_SECTIONS.length - 1 && (
							<Box marginTop={1}>
								<Text dimColor>Press </Text>
								<Text bold>ESC</Text>
								<Text dimColor> or </Text>
								<Text bold>q</Text>
								<Text dimColor> to close</Text>
							</Box>
						)}
					</Box>
				))}
			</Box>
		</Box>
	);
}
