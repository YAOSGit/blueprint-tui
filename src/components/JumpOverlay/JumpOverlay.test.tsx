import { render } from 'ink-testing-library';
import type { ResolvedTour } from '../../types/Tour/index.js';
import { JumpOverlay } from './index.js';

const mockTour: ResolvedTour = {
	name: 'Test Tour',
	version: '1.0.0',
	chapters: [
		{
			id: 'ch1',
			title: 'Chapter One',
			steps: [
				{
					id: 'step1',
					title: 'First Step',
					body: 'Body 1',
					actions: [],
					filePath: '/tmp/step1.md',
					required: false,
				},
				{
					id: 'step2',
					title: 'Second Step',
					body: 'Body 2',
					actions: [],
					filePath: '/tmp/step2.md',
					required: false,
				},
			],
		},
		{
			id: 'ch2',
			title: 'Chapter Two',
			steps: [
				{
					id: 'step3',
					title: 'Third Step',
					body: 'Body 3',
					actions: [],
					filePath: '/tmp/step3.md',
					required: false,
				},
				{
					id: 'step4',
					title: 'Fourth Step',
					body: 'Body 4',
					actions: [],
					filePath: '/tmp/step4.md',
					required: false,
				},
			],
		},
	],
};

describe('JumpOverlay', () => {
	it('renders "Jump to Step" title', () => {
		const { lastFrame } = render(
			<JumpOverlay
				tour={mockTour}
				currentChapterId="ch1"
				currentStepId="step1"
				onJump={vi.fn()}
				onClose={vi.fn()}
			/>,
		);
		expect(lastFrame()).toContain('Jump to Step');
	});

	it('renders step titles from tour', () => {
		const { lastFrame } = render(
			<JumpOverlay
				tour={mockTour}
				currentChapterId="ch1"
				currentStepId="step1"
				onJump={vi.fn()}
				onClose={vi.fn()}
			/>,
		);
		expect(lastFrame()).toContain('First Step');
		expect(lastFrame()).toContain('Second Step');
		expect(lastFrame()).toContain('Third Step');
		expect(lastFrame()).toContain('Fourth Step');
	});

	it('renders chapter titles', () => {
		const { lastFrame } = render(
			<JumpOverlay
				tour={mockTour}
				currentChapterId="ch1"
				currentStepId="step1"
				onJump={vi.fn()}
				onClose={vi.fn()}
			/>,
		);
		expect(lastFrame()).toContain('Chapter One');
		expect(lastFrame()).toContain('Chapter Two');
	});

	it('shows "(current)" for the current step', () => {
		const { lastFrame } = render(
			<JumpOverlay
				tour={mockTour}
				currentChapterId="ch1"
				currentStepId="step2"
				onJump={vi.fn()}
				onClose={vi.fn()}
			/>,
		);
		expect(lastFrame()).toContain('Second Step');
		expect(lastFrame()).toContain('(current)');
	});

	it('calls onClose on escape', async () => {
		const onClose = vi.fn();
		const { stdin } = render(
			<JumpOverlay
				tour={mockTour}
				currentChapterId="ch1"
				currentStepId="step1"
				onJump={vi.fn()}
				onClose={onClose}
			/>,
		);
		stdin.write('\x1B');
		await new Promise((resolve) => {
			setImmediate(resolve);
		});
		expect(onClose).toHaveBeenCalledOnce();
	});

	it('calls onJump when enter is pressed', () => {
		const onJump = vi.fn();
		const onClose = vi.fn();
		const { stdin } = render(
			<JumpOverlay
				tour={mockTour}
				currentChapterId="ch1"
				currentStepId="step1"
				onJump={onJump}
				onClose={onClose}
			/>,
		);
		stdin.write('\r');
		expect(onJump).toHaveBeenCalledWith('ch1', 'step1');
		expect(onClose).toHaveBeenCalled();
	});
});
