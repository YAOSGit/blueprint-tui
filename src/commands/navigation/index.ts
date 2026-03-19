// src/commands/navigation/index.ts
import type { CommandHandler } from '../../providers/CommandsProvider/CommandsProvider.types.js';

export const prevStepCommand: CommandHandler = {
	id: 'PREV_STEP',
	keys: [{ leftArrow: true }],
	displayKey: '\u2190',
	displayText: 'prev step',
	helpSection: 'Navigation',
	helpLabel: 'Previous step',
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => deps.tour.prevStep(),
};

export const nextStepCommand: CommandHandler = {
	id: 'NEXT_STEP',
	keys: [{ rightArrow: true }],
	displayKey: '\u2192',
	displayText: 'next step',
	helpSection: 'Navigation',
	helpLabel: 'Next step',
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => deps.tour.nextStep(),
};

export const prevChapterCommand: CommandHandler = {
	id: 'PREV_CHAPTER',
	keys: [{ leftArrow: true, shift: true }],
	displayKey: 'Shift\u00A0+\u00A0\u2190',
	displayText: 'prev chapter',
	helpSection: 'Navigation',
	helpLabel: 'Previous chapter',
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => deps.tour.prevChapter(),
};

export const nextChapterCommand: CommandHandler = {
	id: 'NEXT_CHAPTER',
	keys: [{ rightArrow: true, shift: true }],
	displayKey: 'Shift\u00A0+\u00A0\u2192',
	displayText: 'next chapter',
	helpSection: 'Navigation',
	helpLabel: 'Next chapter',
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => deps.tour.nextChapter(),
};

export const cycleFocusCommand: CommandHandler = {
	id: 'CYCLE_FOCUS',
	keys: [{ specialKey: 'tab' }],
	displayKey: 'Tab',
	displayText: 'cycle focus',
	helpSection: 'Navigation',
	helpLabel: 'Cycle pane focus',
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => deps.uiState.cycleFocus(),
};

export const scrollUpCommand: CommandHandler = {
	id: 'SCROLL_UP',
	keys: [{ specialKey: 'up' }],
	displayKey: '\u2191',
	displayText: 'scroll up',
	helpSection: 'Navigation',
	helpLabel: 'Scroll pane',
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => {
		if (deps.uiState.focusPane === 'narrative') {
			deps.uiState.scrollNarrative(-1);
		} else if (deps.uiState.focusPane === 'processOutput') {
			deps.uiState.scrollProcess(-1);
		}
	},
};

export const scrollDownCommand: CommandHandler = {
	id: 'SCROLL_DOWN',
	keys: [{ specialKey: 'down' }],
	displayKey: '\u2193',
	displayText: 'scroll down',
	helpSection: 'Navigation',
	helpLabel: undefined,
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => {
		if (deps.uiState.focusPane === 'narrative') {
			deps.uiState.scrollNarrative(1);
		} else if (deps.uiState.focusPane === 'processOutput') {
			deps.uiState.scrollProcess(1);
		}
	},
};
