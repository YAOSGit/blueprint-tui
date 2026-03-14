// src/types/Validation/index.ts
export type ValidationState =
	| 'untested'
	| 'passing'
	| 'failing'
	| 'running'
	| 'timeout';

export type ValidationResult = {
	state: ValidationState;
	output: string;
	hint: string;
};
