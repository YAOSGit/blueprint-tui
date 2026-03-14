import { render } from 'ink-testing-library';
import type {
	CommandDeps,
	CommandHandler,
} from '../../providers/CommandsProvider/CommandsProvider.types.js';
import { ProgressFooter } from './index.js';

const mockDeps = {
	tour: { currentStep: { teleport: null, validate: null, actions: [] } },
	uiState: { activeOverlay: 'none' },
	process: {},
	onTeleport: () => {},
	onValidate: () => {},
	onQuit: () => {},
} as unknown as CommandDeps;

function makeCommand(
	overrides: Partial<CommandHandler> & Pick<CommandHandler, 'id'>,
): CommandHandler {
	return {
		keys: [],
		displayKey: overrides.displayKey ?? 'k',
		displayText: overrides.displayText ?? 'text',
		footer: 'priority',
		isEnabled: () => true,
		execute: () => {},
		...overrides,
	};
}

describe('ProgressFooter', () => {
	it('renders branding text', () => {
		const { lastFrame } = render(
			<ProgressFooter
				commands={[]}
				commandDeps={mockDeps}
				chapterTitle="Intro"
				globalStepIndex={0}
				globalTotalSteps={3}
				stepValidations={new Map()}
				stepIds={['s1', 's2', 's3']}
			/>,
		);

		const frame = lastFrame() ?? '';
		expect(frame).toContain('YAOSGit');
		expect(frame).toContain('blueprint');
	});

	it('renders step progress dots with current and future markers', () => {
		const { lastFrame } = render(
			<ProgressFooter
				commands={[]}
				commandDeps={mockDeps}
				chapterTitle="Intro"
				globalStepIndex={1}
				globalTotalSteps={4}
				stepValidations={new Map()}
				stepIds={['s1', 's2', 's3', 's4']}
			/>,
		);

		const frame = lastFrame() ?? '';
		expect(frame).toContain('●');
		expect(frame).toContain('○');
	});

	it('shows enabled non-hidden commands', () => {
		const commands = [
			makeCommand({
				id: 'A',
				displayKey: 'h',
				displayText: 'help',
				footer: 'priority',
				isEnabled: () => true,
			}),
			makeCommand({
				id: 'B',
				displayKey: 'q',
				displayText: 'quit',
				footer: 'priority',
				isEnabled: () => true,
			}),
		];

		const { lastFrame } = render(
			<ProgressFooter
				commands={commands}
				commandDeps={mockDeps}
				chapterTitle="Intro"
				globalStepIndex={0}
				globalTotalSteps={1}
				stepValidations={new Map()}
				stepIds={['s1']}
			/>,
		);

		const frame = lastFrame() ?? '';
		expect(frame).toContain('help');
		expect(frame).toContain('quit');
	});

	it('hides disabled commands', () => {
		const commands = [
			makeCommand({
				id: 'ENABLED',
				displayKey: 'h',
				displayText: 'help',
				isEnabled: () => true,
			}),
			makeCommand({
				id: 'DISABLED',
				displayKey: 'x',
				displayText: 'secret',
				isEnabled: () => false,
			}),
		];

		const { lastFrame } = render(
			<ProgressFooter
				commands={commands}
				commandDeps={mockDeps}
				chapterTitle="Intro"
				globalStepIndex={0}
				globalTotalSteps={1}
				stepValidations={new Map()}
				stepIds={['s1']}
			/>,
		);

		const frame = lastFrame() ?? '';
		expect(frame).toContain('help');
		expect(frame).not.toContain('secret');
	});

	it('hides commands with footer=hidden', () => {
		const commands = [
			makeCommand({
				id: 'VISIBLE',
				displayKey: 'v',
				displayText: 'validate',
				footer: 'priority',
			}),
			makeCommand({
				id: 'HIDDEN',
				displayKey: '←',
				displayText: 'prev step',
				footer: 'hidden',
			}),
		];

		const { lastFrame } = render(
			<ProgressFooter
				commands={commands}
				commandDeps={mockDeps}
				chapterTitle="Intro"
				globalStepIndex={0}
				globalTotalSteps={1}
				stepValidations={new Map()}
				stepIds={['s1']}
			/>,
		);

		const frame = lastFrame() ?? '';
		expect(frame).toContain('validate');
		expect(frame).not.toContain('prev step');
	});
});
