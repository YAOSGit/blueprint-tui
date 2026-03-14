import { render } from 'ink-testing-library';
import { Header } from './index.js';

describe('Header', () => {
	it('renders tour name', () => {
		const { lastFrame } = render(
			<Header
				tourName="My Tour"
				chapterTitle="Intro"
				chapterNumber={0}
				stepNumber={0}
				totalSteps={5}
			/>,
		);
		expect(lastFrame()).toContain('My Tour');
	});

	it('renders chapter info', () => {
		const { lastFrame } = render(
			<Header
				tourName="My Tour"
				chapterTitle="Getting Started"
				chapterNumber={2}
				stepNumber={0}
				totalSteps={3}
			/>,
		);
		expect(lastFrame()).toContain('Ch 3: Getting Started');
	});

	it('renders step info', () => {
		const { lastFrame } = render(
			<Header
				tourName="My Tour"
				chapterTitle="Intro"
				chapterNumber={0}
				stepNumber={3}
				totalSteps={10}
			/>,
		);
		expect(lastFrame()).toContain('Step 4/10');
	});
});
