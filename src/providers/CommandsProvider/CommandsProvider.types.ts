// src/providers/CommandsProvider/CommandsProvider.types.ts
import type React from 'react';
import type { BaseDeps, Command } from '@yaos-git/toolkit/types';

import type { ProcessContextValue } from '../ProcessProvider/ProcessProvider.types.js';
import type { TourContextValue } from '../TourProvider/TourProvider.types.js';
import type { UIStateContextValue } from '../UIStateProvider/UIStateProvider.types.js';

export type CommandDeps = BaseDeps & {
	tour: TourContextValue;
	uiState: UIStateContextValue;
	process: ProcessContextValue;
	onTeleport: () => void;
	onValidate: () => void;
};

export type CommandHandler = Command<CommandDeps>;

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
