// src/utils/loader/walker.test.ts
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { walkBlueprint } from './walker.js';

const FIXTURE_DIR = path.resolve('test/fixtures/valid-tour/.blueprint');

describe('walkBlueprint', () => {
	it('reads blueprint.yaml metadata', async () => {
		const raw = await walkBlueprint(FIXTURE_DIR);
		expect(raw.meta.name).toBe('test-tour');
		expect(raw.meta.version).toBe('1.0.0');
	});

	it('discovers chapters in prefix order', async () => {
		const raw = await walkBlueprint(FIXTURE_DIR);
		expect(raw.chapters).toHaveLength(2);
		expect(raw.chapters[0].id).toBe('getting-started');
		expect(raw.chapters[1].id).toBe('architecture');
	});

	it('reads chapter.yaml metadata', async () => {
		const raw = await walkBlueprint(FIXTURE_DIR);
		expect(raw.chapters[0].meta.title).toBe('Getting Started');
		expect(raw.chapters[0].meta.description).toBe(
			'First steps with the project.',
		);
	});

	it('discovers steps in prefix order', async () => {
		const raw = await walkBlueprint(FIXTURE_DIR);
		expect(raw.chapters[0].steps).toHaveLength(2);
		expect(raw.chapters[0].steps[0].id).toBe('overview');
		expect(raw.chapters[0].steps[1].id).toBe('setup');
	});

	it('reads step file content', async () => {
		const raw = await walkBlueprint(FIXTURE_DIR);
		const step = raw.chapters[0].steps[0];
		expect(step.rawContent).toContain('title: Project Overview');
		expect(step.rawContent).toContain('# Overview');
	});

	it('throws if blueprint.yaml is missing', async () => {
		await expect(walkBlueprint('/tmp/nonexistent')).rejects.toThrow();
	});
});
