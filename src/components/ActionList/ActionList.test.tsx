import { render } from 'ink-testing-library';
import type { ProcessEntry } from '../../types/Process/index.js';
import type { Action } from '../../types/Tour/index.js';
import { ActionList } from './index.js';

function createAction(overrides: Partial<Action> = {}): Action {
	return {
		label: 'Run tests',
		command: 'npm test',
		persistent: false,
		...overrides,
	};
}

function createProcessEntry(
	overrides: Partial<ProcessEntry> = {},
): ProcessEntry {
	return {
		actionLabel: 'Run tests',
		command: 'npm test',
		persistent: false,
		status: 'idle',
		output: [],
		exitCode: null,
		pid: null,
		...overrides,
	};
}

const noop = () => {};

describe('ActionList', () => {
	it('returns null when actions array is empty', () => {
		const { lastFrame } = render(
			<ActionList
				actions={[]}
				processes={new Map()}
				focused={false}
				selectedIndex={0}
				onRun={noop}
			/>,
		);
		expect(lastFrame()).toBe('');
	});

	it('renders ACTIONS header', () => {
		const { lastFrame } = render(
			<ActionList
				actions={[createAction()]}
				processes={new Map()}
				focused={false}
				selectedIndex={0}
				onRun={noop}
			/>,
		);
		expect(lastFrame()).toContain('ACTIONS');
	});

	it('renders action labels', () => {
		const actions = [
			createAction({ label: 'Build' }),
			createAction({ label: 'Lint' }),
		];
		const { lastFrame } = render(
			<ActionList
				actions={actions}
				processes={new Map()}
				focused={false}
				selectedIndex={0}
				onRun={noop}
			/>,
		);
		const frame = lastFrame();
		expect(frame).toContain('Build');
		expect(frame).toContain('Lint');
	});

	it('shows idle icon for actions without process', () => {
		const { lastFrame } = render(
			<ActionList
				actions={[createAction()]}
				processes={new Map()}
				focused={false}
				selectedIndex={0}
				onRun={noop}
			/>,
		);
		expect(lastFrame()).toContain('▷');
	});

	it('shows running icon for running processes', () => {
		const action = createAction({ label: 'Build' });
		const processes = new Map<string, ProcessEntry>([
			[
				'Build',
				createProcessEntry({ actionLabel: 'Build', status: 'running' }),
			],
		]);
		const { lastFrame } = render(
			<ActionList
				actions={[action]}
				processes={processes}
				focused={false}
				selectedIndex={0}
				onRun={noop}
			/>,
		);
		expect(lastFrame()).toContain('▶');
	});

	it('shows done icon for completed processes', () => {
		const action = createAction({ label: 'Build' });
		const processes = new Map<string, ProcessEntry>([
			[
				'Build',
				createProcessEntry({
					actionLabel: 'Build',
					status: 'done',
					exitCode: 0,
				}),
			],
		]);
		const { lastFrame } = render(
			<ActionList
				actions={[action]}
				processes={processes}
				focused={false}
				selectedIndex={0}
				onRun={noop}
			/>,
		);
		expect(lastFrame()).toContain('✓');
	});

	it('shows failed icon for failed processes', () => {
		const action = createAction({ label: 'Build' });
		const processes = new Map<string, ProcessEntry>([
			[
				'Build',
				createProcessEntry({
					actionLabel: 'Build',
					status: 'failed',
					exitCode: 1,
				}),
			],
		]);
		const { lastFrame } = render(
			<ActionList
				actions={[action]}
				processes={processes}
				focused={false}
				selectedIndex={0}
				onRun={noop}
			/>,
		);
		expect(lastFrame()).toContain('✗');
	});

	it('shows selection indicator when focused', () => {
		const { lastFrame } = render(
			<ActionList
				actions={[createAction()]}
				processes={new Map()}
				focused={true}
				selectedIndex={0}
				onRun={noop}
			/>,
		);
		expect(lastFrame()).toContain('▸');
	});
});
