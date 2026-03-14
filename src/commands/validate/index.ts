// src/commands/validate/index.ts
import type { CommandHandler } from '../../providers/CommandsProvider/CommandsProvider.types.js';

export const validateCommand: CommandHandler = {
	id: 'VALIDATE',
	keys: ['v'],
	displayKey: 'v',
	displayText: 'validate',
	helpSection: 'Actions',
	helpLabel: 'Run validation',
	footer: 'optional',
	isEnabled: (deps) =>
		deps.uiState.activeOverlay === 'none' && !!deps.tour.currentStep.validate,
	execute: (deps) => deps.onValidate(),
};
