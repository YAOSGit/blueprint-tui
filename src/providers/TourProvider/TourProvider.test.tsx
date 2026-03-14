// src/providers/TourProvider/TourProvider.test.tsx

import { Text } from 'ink';
import { render } from 'ink-testing-library';
import { describe, expect, it } from 'vitest';
import { useTour } from '../../hooks/useTour/index.js';
import type { ResolvedTour } from '../../types/Tour/index.js';
import { TourProvider } from './index.js';

const MOCK_TOUR: ResolvedTour = {
	name: 'test',
	version: '1.0.0',
	chapters: [
		{
			id: 'ch1',
			title: 'Chapter 1',
			steps: [
				{
					id: 'step1',
					title: 'Step 1',
					body: 'Body 1',
					filePath: 'a.md',
					actions: [],
					required: false,
				},
				{
					id: 'step2',
					title: 'Step 2',
					body: 'Body 2',
					filePath: 'b.md',
					actions: [],
					required: false,
				},
			],
		},
		{
			id: 'ch2',
			title: 'Chapter 2',
			steps: [
				{
					id: 'step3',
					title: 'Step 3',
					body: 'Body 3',
					filePath: 'c.md',
					actions: [],
					required: false,
				},
			],
		},
	],
};

function TestConsumer() {
	const { currentStep, chapterIndex, stepIndex } = useTour();
	return <Text>{`${chapterIndex}:${stepIndex}:${currentStep.title}`}</Text>;
}

describe('TourProvider', () => {
	it('starts at first chapter, first step', () => {
		const { lastFrame } = render(
			<TourProvider tour={MOCK_TOUR}>
				<TestConsumer />
			</TourProvider>,
		);
		expect(lastFrame()).toContain('0:0:Step 1');
	});

	it('starts at jump target when initialChapter/initialStep given', () => {
		const { lastFrame } = render(
			<TourProvider tour={MOCK_TOUR} initialChapter="ch2" initialStep="step3">
				<TestConsumer />
			</TourProvider>,
		);
		expect(lastFrame()).toContain('1:0:Step 3');
	});
});
