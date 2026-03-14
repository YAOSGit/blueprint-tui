// src/loader/loader.test.ts
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadTour } from './index.js';

const FIXTURE_DIR = path.resolve('test/fixtures/valid-tour/.blueprint');

describe('loadTour', () => {
	it('loads a complete ResolvedTour from .blueprint/', async () => {
		const tour = await loadTour(FIXTURE_DIR);
		expect(tour.name).toBe('test-tour');
		expect(tour.version).toBe('1.0.0');
		expect(tour.chapters).toHaveLength(2);
	});

	it('resolves chapter metadata', async () => {
		const tour = await loadTour(FIXTURE_DIR);
		expect(tour.chapters[0].id).toBe('getting-started');
		expect(tour.chapters[0].title).toBe('Getting Started');
	});

	it('resolves step frontmatter and body', async () => {
		const tour = await loadTour(FIXTURE_DIR);
		const step = tour.chapters[0].steps[0];
		expect(step.id).toBe('overview');
		expect(step.title).toBe('Project Overview');
		expect(step.body).toContain('# Overview');
		expect(step.teleport?.file).toBe('src/index.ts');
	});

	it('resolves required flag and validation', async () => {
		const tour = await loadTour(FIXTURE_DIR);
		const setup = tour.chapters[0].steps[1];
		expect(setup.required).toBe(true);
		expect(setup.validate?.command).toBe('npm test');
	});

	it('detects duplicate step IDs', async () => {
		const fs = await import('node:fs/promises');
		const os = await import('node:os');
		const tmpDir = path.join(os.default.tmpdir(), `bp-test-${Date.now()}`);
		const bpDir = path.join(tmpDir, '.blueprint');
		const ch0 = path.join(bpDir, '00-ch');

		await fs.mkdir(ch0, { recursive: true });
		await fs.writeFile(
			path.join(bpDir, 'blueprint.yaml'),
			'name: dup-test\nversion: 1.0.0',
		);
		await fs.writeFile(path.join(ch0, 'chapter.yaml'), 'title: Chapter');
		await fs.writeFile(
			path.join(ch0, '01-same.md'),
			'---\ntitle: Step A\n---\nBody A',
		);
		await fs.writeFile(
			path.join(ch0, '02-same.md'),
			'---\ntitle: Step B\n---\nBody B',
		);

		await expect(loadTour(bpDir)).rejects.toThrow(/[Dd]uplicate step id/);

		await fs.rm(tmpDir, { recursive: true });
	});
});
