// src/components/ValidationStatus/ValidationStatus.types.ts
import type { Validate } from '../../types/Tour/index.js';
import type { ValidationResult } from '../../types/Validation/index.js';

export interface ValidationStatusProps {
	validate: Validate | undefined;
	required: boolean;
	result: ValidationResult | null;
}
