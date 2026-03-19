// src/commands/runAction/index.ts
import type { CommandHandler } from '../../providers/CommandsProvider/CommandsProvider.types.js';

export const runActionCommand: CommandHandler = {
	id: 'RUN_ACTION',
	keys: [{ textKey: 'r' }],
	displayKey: 'r',
	displayText: 'run',
	helpSection: 'Actions',
	helpLabel: 'Run action',
	footer: 'optional',
	isEnabled: (deps) =>
		deps.uiState.activeOverlay === 'none' &&
		deps.tour.currentStep.actions.length > 0,
	execute: (deps) => {
		const { actions } = deps.tour.currentStep;
		if (actions.length === 1) {
			deps.process.runAction(actions[0]);
		} else {
			deps.uiState.setFocusPane('actions');
		}
	},
};
