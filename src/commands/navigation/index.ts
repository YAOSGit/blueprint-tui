// src/commands/navigation/index.ts
import type { CommandHandler } from '../../providers/CommandsProvider/CommandsProvider.types.js';

export const prevStepCommand: CommandHandler = {
	id: 'PREV_STEP',
	keys: [],
	displayKey: '←',
	displayText: 'prev step',
	helpSection: 'Navigation',
	helpLabel: 'Previous step',
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => deps.tour.prevStep(),
};

export const nextStepCommand: CommandHandler = {
	id: 'NEXT_STEP',
	keys: [],
	displayKey: '→',
	displayText: 'next step',
	helpSection: 'Navigation',
	helpLabel: 'Next step',
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => deps.tour.nextStep(),
};

export const prevChapterCommand: CommandHandler = {
	id: 'PREV_CHAPTER',
	keys: [],
	displayKey: 'Shift+←',
	displayText: 'prev chapter',
	helpSection: 'Navigation',
	helpLabel: 'Previous chapter',
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => deps.tour.prevChapter(),
};

export const nextChapterCommand: CommandHandler = {
	id: 'NEXT_CHAPTER',
	keys: [],
	displayKey: 'Shift+→',
	displayText: 'next chapter',
	helpSection: 'Navigation',
	helpLabel: 'Next chapter',
	footer: 'hidden',
	isEnabled: () => true,
	execute: (deps) => deps.tour.nextChapter(),
};

export const cycleFocusCommand: CommandHandler = {
	id: 'CYCLE_FOCUS',
	keys: [],
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
	keys: [],
	displayKey: '↑',
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
	keys: [],
	displayKey: '↓',
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
