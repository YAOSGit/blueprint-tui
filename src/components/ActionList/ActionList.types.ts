// src/components/ActionList/ActionList.types.ts

import type { ProcessEntry } from '../../types/Process/index.js';
import type { Action } from '../../types/Tour/index.js';

export interface ActionListProps {
	actions: Action[];
	processes: Map<string, ProcessEntry>;
	focused: boolean;
	selectedIndex: number;
	onRun: (action: Action) => void;
}
