import { render } from 'ink-testing-library';
import type { Validate } from '../../types/Tour/index.js';
import type { ValidationResult } from '../../types/Validation/index.js';
import { ValidationStatus } from './index.js';

function createValidate(overrides: Partial<Validate> = {}): Validate {
	return {
		command: 'npm test',
		hint: 'Run npm install first',
		...overrides,
	};
}

function createResult(
	overrides: Partial<ValidationResult> = {},
): ValidationResult {
	return {
		state: 'passing',
		output: '',
		hint: 'Run npm install first',
		...overrides,
	};
}

describe('ValidationStatus', () => {
	it('returns null when validate is undefined', () => {
		const { lastFrame } = render(
			<ValidationStatus validate={undefined} required={false} result={null} />,
		);
		expect(lastFrame()).toBe('');
	});

	it('shows VALIDATION header when validate exists', () => {
		const { lastFrame } = render(
			<ValidationStatus
				validate={createValidate()}
				required={false}
				result={null}
			/>,
		);
		expect(lastFrame()).toContain('VALIDATION');
	});

	it('shows Required when required is true', () => {
		const { lastFrame } = render(
			<ValidationStatus
				validate={createValidate()}
				required={true}
				result={null}
			/>,
		);
		expect(lastFrame()).toContain('Required');
	});

	it('shows Optional when required is false', () => {
		const { lastFrame } = render(
			<ValidationStatus
				validate={createValidate()}
				required={false}
				result={null}
			/>,
		);
		expect(lastFrame()).toContain('Optional');
	});

	it('shows passing state with check icon', () => {
		const { lastFrame } = render(
			<ValidationStatus
				validate={createValidate()}
				required={false}
				result={createResult({ state: 'passing' })}
			/>,
		);
		expect(lastFrame()).toContain('✓');
	});

	it('shows failing state with cross icon and hint text', () => {
		const hint = 'Run npm install first';
		const { lastFrame } = render(
			<ValidationStatus
				validate={createValidate({ hint })}
				required={false}
				result={createResult({ state: 'failing' })}
			/>,
		);
		const frame = lastFrame();
		expect(frame).toContain('✗');
		expect(frame).toContain(`Hint: ${hint}`);
	});

	it('shows running state with spinner icon', () => {
		const { lastFrame } = render(
			<ValidationStatus
				validate={createValidate()}
				required={false}
				result={createResult({ state: 'running' })}
			/>,
		);
		expect(lastFrame()).toContain('⟳');
	});

	it('shows timeout state with clock icon', () => {
		const { lastFrame } = render(
			<ValidationStatus
				validate={createValidate()}
				required={false}
				result={createResult({ state: 'timeout' })}
			/>,
		);
		expect(lastFrame()).toContain('⏱');
	});

	it('shows "Press v to validate" when no result', () => {
		const { lastFrame } = render(
			<ValidationStatus
				validate={createValidate()}
				required={false}
				result={null}
			/>,
		);
		expect(lastFrame()).toContain('Press v to validate');
	});
});
