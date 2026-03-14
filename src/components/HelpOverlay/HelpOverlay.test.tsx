import { render } from 'ink-testing-library';
import { vi } from 'vitest';
import { HelpOverlay } from './index.js';

const tick = () => new Promise<void>((resolve) => setImmediate(resolve));

describe('HelpOverlay', () => {
	it('renders the title', () => {
		const { lastFrame } = render(<HelpOverlay onClose={() => {}} />);

		expect(lastFrame() ?? '').toContain('Keyboard Shortcuts');
	});

	it('renders section headings', () => {
		const { lastFrame } = render(<HelpOverlay onClose={() => {}} />);

		const frame = lastFrame() ?? '';
		expect(frame).toContain('Navigation');
		expect(frame).toContain('Actions');
		expect(frame).toContain('General');
	});

	it('renders key bindings from commands', () => {
		const { lastFrame } = render(<HelpOverlay onClose={() => {}} />);

		const frame = lastFrame() ?? '';
		expect(frame).toContain('Previous step');
		expect(frame).toContain('Next step');
		expect(frame).toContain('Run action');
		expect(frame).toContain('Run validation');
	});

	it('renders close hint', () => {
		const { lastFrame } = render(<HelpOverlay onClose={() => {}} />);

		const frame = lastFrame() ?? '';
		expect(frame).toContain('ESC');
		expect(frame).toContain('q');
		expect(frame).toContain('to close');
	});

	it('calls onClose when q is pressed', () => {
		const onClose = vi.fn();
		const { stdin } = render(<HelpOverlay onClose={onClose} />);

		stdin.write('q');

		expect(onClose).toHaveBeenCalledOnce();
	});

	it('calls onClose when escape is pressed', async () => {
		const onClose = vi.fn();
		const { stdin } = render(<HelpOverlay onClose={onClose} />);

		stdin.write('\x1B');
		await tick();

		expect(onClose).toHaveBeenCalledOnce();
	});
});
