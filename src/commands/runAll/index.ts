// src/commands/runAll/index.ts
import type { CommandHandler } from '../../providers/CommandsProvider/CommandsProvider.types.js';

export const runAllCommand: CommandHandler = {
	id: 'RUN_ALL',
	keys: ['R'],
	displayKey: 'R',
	displayText: 'run all',
	helpSection: 'Actions (Shift)',
	helpLabel: 'Run all actions',
	footer: 'optional',
	isEnabled: (deps) =>
		deps.uiState.activeOverlay === 'none' &&
		deps.tour.currentStep.actions.length > 1,
	execute: (deps) => {
		for (const action of deps.tour.currentStep.actions) {
			deps.process.runAction(action);
		}
	},
};
