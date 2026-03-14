// src/commands/quit/index.ts
import type { CommandHandler } from '../../providers/CommandsProvider/CommandsProvider.types.js';

export const quitCommand: CommandHandler = {
	id: 'QUIT',
	keys: ['q'],
	displayKey: 'q',
	displayText: 'quit',
	helpSection: 'General',
	footer: 'priority',
	isEnabled: () => true,
	execute: (deps) => deps.onQuit(),
};
