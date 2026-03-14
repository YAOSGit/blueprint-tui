// src/providers/ProcessProvider/ProcessProvider.types.ts
import type React from 'react';
import type { ProcessEntry } from '../../types/Process/index.js';
import type { Action } from '../../types/Tour/index.js';

export interface ProcessContextValue {
	processes: Map<string, ProcessEntry>;
	runAction: (action: Action) => void;
	killAll: () => void;
}

export interface ProcessProviderProps {
	children: React.ReactNode;
}
