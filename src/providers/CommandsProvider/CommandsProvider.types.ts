// src/providers/CommandsProvider/CommandsProvider.types.ts
import type React from 'react';

import type { ProcessContextValue } from '../ProcessProvider/ProcessProvider.types.js';
import type { TourContextValue } from '../TourProvider/TourProvider.types.js';
import type { UIStateContextValue } from '../UIStateProvider/UIStateProvider.types.js';

export type CommandDeps = {
	tour: TourContextValue;
	uiState: UIStateContextValue;
	process: ProcessContextValue;
	onTeleport: () => void;
	onValidate: () => void;
	onQuit: () => void;
};

export type CommandHandler = {
	id: string;
	keys: string[];
	displayKey: string;
	displayText: string;
	helpSection?: string;
	helpLabel?: string;
	footer?: 'priority' | 'optional' | 'hidden';
	isEnabled: (deps: CommandDeps) => boolean;
	execute: (deps: CommandDeps) => void;
};

export interface CommandsContextValue {
	commands: CommandHandler[];
	deps: CommandDeps;
}

export interface CommandsProviderProps {
	onQuit: () => void;
	projectRoot: string;
	editorOverride?: string;
	children: React.ReactNode;
}
