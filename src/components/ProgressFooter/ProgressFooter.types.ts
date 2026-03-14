// src/components/ProgressFooter/ProgressFooter.types.ts
import type {
	CommandDeps,
	CommandHandler,
} from '../../providers/CommandsProvider/CommandsProvider.types.js';
import type { ValidationResult } from '../../types/Validation/index.js';

export interface ProgressFooterProps {
	commands: CommandHandler[];
	commandDeps: CommandDeps;
	chapterTitle: string;
	globalStepIndex: number;
	globalTotalSteps: number;
	stepValidations: Map<string, ValidationResult>;
	stepIds: string[];
}
