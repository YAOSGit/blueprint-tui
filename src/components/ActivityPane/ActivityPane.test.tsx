import { Text } from 'ink';
import { render } from 'ink-testing-library';
import type { Action } from '../../types/Tour/index.js';
import { ActivityPane } from './index.js';

vi.mock('../ActionList/index.js', () => ({
	ActionList: () => <Text>ActionList</Text>,
}));
vi.mock('../ValidationStatus/index.js', () => ({
	ValidationStatus: () => <Text>ValidationStatus</Text>,
}));
vi.mock('../ProcessOutput/index.js', () => ({
	ProcessOutput: () => <Text>ProcessOutput</Text>,
}));

const baseProps = {
	actions: [] as Action[],
	processes: new Map(),
	validate: undefined,
	required: false,
	validationResult: null,
	processLines: [] as string[],
	processLabel: '',
	focusPane: 'narrative' as const,
	selectedActionIndex: 0,
	processScrollOffset: 0,
	onRunAction: vi.fn(),
};

describe('ActivityPane', () => {
	it('renders ActionList when actions are provided', () => {
		const { lastFrame } = render(
			<ActivityPane
				{...baseProps}
				actions={[{ label: 'Run', command: 'echo hi', persistent: false }]}
			/>,
		);
		expect(lastFrame()).toContain('ActionList');
	});

	it('does not render ActionList when actions is empty', () => {
		const { lastFrame } = render(<ActivityPane {...baseProps} actions={[]} />);
		expect(lastFrame()).not.toContain('ActionList');
	});

	it('renders ValidationStatus when validate is provided', () => {
		const { lastFrame } = render(
			<ActivityPane
				{...baseProps}
				validate={{ command: 'test -f foo', hint: 'Create foo' }}
			/>,
		);
		expect(lastFrame()).toContain('ValidationStatus');
	});

	it('does not render ValidationStatus when validate is undefined', () => {
		const { lastFrame } = render(
			<ActivityPane {...baseProps} validate={undefined} />,
		);
		expect(lastFrame()).not.toContain('ValidationStatus');
	});

	it('renders ProcessOutput when actions exist', () => {
		const { lastFrame } = render(
			<ActivityPane
				{...baseProps}
				actions={[
					{ label: 'Build', command: 'npm run build', persistent: false },
				]}
				processLines={[]}
			/>,
		);
		expect(lastFrame()).toContain('ProcessOutput');
	});
});
