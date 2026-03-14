import { render } from 'ink-testing-library';
import { ProcessOutput } from './index.js';

describe('ProcessOutput', () => {
	it('returns null when lines empty and no label', () => {
		const { lastFrame } = render(
			<ProcessOutput lines={[]} label="" scrollOffset={0} focused={false} />,
		);
		expect(lastFrame()).toBe('');
	});

	it('renders PROCESS OUTPUT header', () => {
		const { lastFrame } = render(
			<ProcessOutput
				lines={['hello']}
				label=""
				scrollOffset={0}
				focused={false}
			/>,
		);
		expect(lastFrame()).toContain('PROCESS OUTPUT');
	});

	it('renders label in brackets when provided', () => {
		const { lastFrame } = render(
			<ProcessOutput
				lines={['hello']}
				label="npm test"
				scrollOffset={0}
				focused={false}
			/>,
		);
		expect(lastFrame()).toContain('[npm test]');
	});

	it('renders output lines', () => {
		const { lastFrame } = render(
			<ProcessOutput
				lines={['first line', 'second line']}
				label=""
				scrollOffset={0}
				focused={false}
			/>,
		);
		expect(lastFrame()).toContain('first line');
		expect(lastFrame()).toContain('second line');
	});

	it('respects scrollOffset', () => {
		const { lastFrame } = render(
			<ProcessOutput
				lines={['line A', 'line B', 'line C']}
				label=""
				scrollOffset={1}
				focused={false}
			/>,
		);
		expect(lastFrame()).not.toContain('line A');
		expect(lastFrame()).toContain('line B');
		expect(lastFrame()).toContain('line C');
	});
});
