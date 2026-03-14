// src/providers/UIStateProvider/UIStateProvider.types.ts
import type React from 'react';

export type FocusPane = 'narrative' | 'actions' | 'processOutput';
export type ActiveOverlay = 'none' | 'jump' | 'help';

export interface UIStateContextValue {
	focusPane: FocusPane;
	activeOverlay: ActiveOverlay;
	narrativeScroll: number;
	processScroll: number;
	statusMessage: string | null;
	setFocusPane: (pane: FocusPane) => void;
	cycleFocus: () => void;
	setActiveOverlay: (overlay: ActiveOverlay) => void;
	scrollNarrative: (delta: number) => void;
	scrollProcess: (delta: number) => void;
	setStatusMessage: (msg: string | null) => void;
}

export interface UIStateProviderProps {
	children: React.ReactNode;
}
