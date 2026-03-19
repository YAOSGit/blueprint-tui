// src/components/HelpOverlay/index.tsx
import { HelpMenu } from '@yaos-git/toolkit/tui/components';
import {
	COMMANDS,
} from '../../providers/CommandsProvider/index.js';
import {
	SECTION_COLORS,
} from '../../providers/CommandsProvider/CommandsProvider.consts.js';
import type { HelpOverlayProps } from './HelpOverlay.types.js';

export function HelpOverlay({ onClose }: HelpOverlayProps) {
	return (
		<HelpMenu
			commands={COMMANDS}
			sectionColors={SECTION_COLORS}
			title="YAOSGit blueprint - Keyboard Shortcuts"
			onClose={onClose}
		/>
	);
}
