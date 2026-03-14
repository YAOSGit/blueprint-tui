// src/commands/jump/index.ts
import type { CommandHandler } from '../../providers/CommandsProvider/CommandsProvider.types.js';

export const jumpCommand: CommandHandler = {
	id: 'JUMP',
	keys: ['j'],
	displayKey: 'j',
	displayText: 'jump',
	helpSection: 'Navigation',
	helpLabel: 'Jump to step',
	footer: 'optional',
	isEnabled: (deps) => deps.uiState.activeOverlay === 'none',
	execute: (deps) => deps.uiState.setActiveOverlay('jump'),
};
