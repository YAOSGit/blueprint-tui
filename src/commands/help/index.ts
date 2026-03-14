// src/commands/help/index.ts
import type { CommandHandler } from '../../providers/CommandsProvider/CommandsProvider.types.js';

export const helpCommand: CommandHandler = {
	id: 'HELP',
	keys: ['h'],
	displayKey: 'h',
	displayText: 'help',
	helpSection: 'General',
	footer: 'priority',
	isEnabled: (deps) => deps.uiState.activeOverlay === 'none',
	execute: (deps) => deps.uiState.setActiveOverlay('help'),
};
