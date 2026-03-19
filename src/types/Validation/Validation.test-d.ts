import { assertType, describe, expectTypeOf, it } from 'vitest';
import type { ValidationResult, ValidationState } from './index.js';

describe('ValidationState', () => {
	it('is a union of known state strings', () => {
		expectTypeOf<ValidationState>().toEqualTypeOf<
			'untested' | 'passing' | 'failing' | 'running' | 'timeout'
		>();
	});

	it('accepts valid states', () => {
		assertType<ValidationState>('untested');
		assertType<ValidationState>('passing');
		assertType<ValidationState>('failing');
		assertType<ValidationState>('running');
		assertType<ValidationState>('timeout');
	});

	it('rejects invalid states', () => {
		// @ts-expect-error - 'success' is not a valid ValidationState
		assertType<ValidationState>('success');
	});
});

describe('ValidationResult', () => {
	it('has state, output, and hint properties', () => {
		expectTypeOf<ValidationResult>().toHaveProperty('state');
		expectTypeOf<ValidationResult>().toHaveProperty('output');
		expectTypeOf<ValidationResult>().toHaveProperty('hint');
	});

	it('state is of type ValidationState', () => {
		expectTypeOf<ValidationResult['state']>().toEqualTypeOf<ValidationState>();
	});

	it('output is a string', () => {
		expectTypeOf<ValidationResult['output']>().toEqualTypeOf<string>();
	});

	it('hint is a string', () => {
		expectTypeOf<ValidationResult['hint']>().toEqualTypeOf<string>();
	});

	it('accepts valid ValidationResult objects', () => {
		assertType<ValidationResult>({
			state: 'passing',
			output: 'All tests passed',
			hint: '',
		});

		assertType<ValidationResult>({
			state: 'failing',
			output: 'Error: test failed',
			hint: 'Check the test configuration',
		});
	});

	it('rejects missing properties', () => {
		// @ts-expect-error - missing required properties
		assertType<ValidationResult>({ state: 'untested' });
	});
});
