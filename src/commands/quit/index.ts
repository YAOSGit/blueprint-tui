// src/commands/quit/index.ts
import type { CommandHandler } from '../../providers/CommandsProvider/CommandsProvider.types.js';

export const quitCommand: CommandHandler = {
	id: 'QUIT',
	keys: [{ textKey: 'q' }],
	displayKey: 'q',
	displayText: 'quit',
	helpSection: 'General',
	helpLabel: 'Quit',
	footer: 'priority',
	isEnabled: (deps) => deps.ui.activeOverlay === 'none',
	execute: (deps) => deps.onQuit(),
	needsConfirmation: () => true,
	confirmMessage: 'Quit?',
};
