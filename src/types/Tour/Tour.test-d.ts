// src/types/Tour/Tour.test-d.ts
import { assertType, describe, it } from 'vitest';
import type { ResolvedChapter, ResolvedStep, ResolvedTour } from './index.js';

describe('Tour types', () => {
	it('accepts a valid ResolvedStep', () => {
		assertType<ResolvedStep>({
			id: 'overview',
			title: 'Project Overview',
			body: '# Welcome\n\nThis is the overview.',
			filePath: '.blueprint/00-getting-started/01-overview.md',
			actions: [],
			required: false,
		});
	});

	it('accepts a ResolvedStep with all optional fields', () => {
		assertType<ResolvedStep>({
			id: 'setup',
			title: 'Setup',
			body: '# Setup',
			filePath: '.blueprint/00-getting-started/02-setup.md',
			teleport: { file: 'src/index.ts', line: 10, highlight: 'createApp' },
			actions: [
				{ label: 'Run dev', command: 'npm run dev', persistent: true },
				{ label: 'Test', command: 'npm test', persistent: false },
			],
			validate: {
				command: 'npm test -- --grep health',
				hint: 'Make health check pass',
			},
			required: true,
		});
	});

	it('accepts a valid ResolvedChapter', () => {
		assertType<ResolvedChapter>({
			id: 'getting-started',
			title: 'Getting Started',
			steps: [],
		});
	});

	it('accepts a valid ResolvedTour', () => {
		assertType<ResolvedTour>({
			name: 'my-tour',
			version: '1.0.0',
			chapters: [],
		});
	});
});
