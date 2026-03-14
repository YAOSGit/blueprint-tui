// src/components/ActivityPane/ActivityPane.types.ts

import type { FocusPane } from '../../providers/UIStateProvider/UIStateProvider.types.js';
import type { ProcessEntry } from '../../types/Process/index.js';
import type { Action, Validate } from '../../types/Tour/index.js';
import type { ValidationResult } from '../../types/Validation/index.js';

export interface ActivityPaneProps {
	actions: Action[];
	processes: Map<string, ProcessEntry>;
	validate: Validate | undefined;
	required: boolean;
	validationResult: ValidationResult | null;
	processLines: string[];
	processLabel: string;
	focusPane: FocusPane;
	selectedActionIndex: number;
	processScrollOffset: number;
	onRunAction: (action: Action) => void;
}
