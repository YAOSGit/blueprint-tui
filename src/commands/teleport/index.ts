// src/commands/teleport/index.ts
import type { CommandHandler } from '../../providers/CommandsProvider/CommandsProvider.types.js';

export const teleportCommand: CommandHandler = {
	id: 'TELEPORT',
	keys: ['o'],
	displayKey: 'o',
	displayText: 'teleport',
	helpSection: 'Actions',
	helpLabel: 'Teleport to file',
	footer: 'optional',
	isEnabled: (deps) =>
		deps.uiState.activeOverlay === 'none' && !!deps.tour.currentStep.teleport,
	execute: (deps) => deps.onTeleport(),
};
