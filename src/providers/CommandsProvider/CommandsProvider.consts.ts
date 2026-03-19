// src/providers/CommandsProvider/CommandsProvider.consts.ts

import { helpCommand } from '../../commands/help/index.js';
import { jumpCommand } from '../../commands/jump/index.js';
import {
	cycleFocusCommand,
	nextChapterCommand,
	nextStepCommand,
	prevChapterCommand,
	prevStepCommand,
	scrollDownCommand,
	scrollUpCommand,
} from '../../commands/navigation/index.js';
import { quitCommand } from '../../commands/quit/index.js';
import { runActionCommand } from '../../commands/runAction/index.js';
import { runAllCommand } from '../../commands/runAll/index.js';
import { teleportCommand } from '../../commands/teleport/index.js';
import { validateCommand } from '../../commands/validate/index.js';
import type { CommandHandler } from './CommandsProvider.types.js';

/**
 * Project-specific commands. The toolkit's createCommandsProvider will
 * append shared help, quit, scroll, and cycleFocus commands automatically.
 * Project help/quit are listed first so they match before toolkit defaults.
 */
export const PROJECT_COMMANDS: CommandHandler[] = [
	// Navigation
	prevStepCommand,
	nextStepCommand,
	prevChapterCommand,
	nextChapterCommand,
	jumpCommand,
	cycleFocusCommand,
	scrollUpCommand,
	scrollDownCommand,

	// Actions
	teleportCommand,
	runActionCommand,
	runAllCommand,
	validateCommand,

	// General
	helpCommand,
	quitCommand,
];

export const SECTION_COLORS: Record<string, string> = {
	Navigation: 'cyan',
	Actions: 'green',
	'Actions (Shift)': 'red',
	General: 'yellow',
};
