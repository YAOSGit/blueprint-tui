import { render } from 'ink-testing-library';
import { NarrativePane } from './index.js';

vi.mock('../../hooks/useMarkdown/index.js', () => ({
	renderMarkdown: (raw: string) => raw,
}));

describe('NarrativePane', () => {
	it('renders body text', () => {
		const { lastFrame } = render(
			<NarrativePane body="Hello world" scrollOffset={0} focused={false} />,
		);
		expect(lastFrame()).toContain('Hello world');
	});

	it('respects scrollOffset', () => {
		const body = 'line one\nline two\nline three';
		const { lastFrame } = render(
			<NarrativePane body={body} scrollOffset={1} focused={false} />,
		);
		expect(lastFrame()).not.toContain('line one');
		expect(lastFrame()).toContain('line two');
		expect(lastFrame()).toContain('line three');
	});

	it('renders when focused', () => {
		const { lastFrame } = render(
			<NarrativePane body="focused text" scrollOffset={0} focused={true} />,
		);
		expect(lastFrame()).toContain('focused text');
	});

	it('renders when not focused', () => {
		const { lastFrame } = render(
			<NarrativePane body="unfocused text" scrollOffset={0} focused={false} />,
		);
		expect(lastFrame()).toContain('unfocused text');
	});
});
