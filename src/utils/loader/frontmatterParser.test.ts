// src/utils/loader/frontmatterParser.test.ts
import { describe, expect, it } from 'vitest';
import { parseFrontmatter } from './frontmatterParser.js';

const VALID_STEP = `---
title: Project Overview
teleport:
  file: src/index.ts
  line: 10
  highlight: createApp
actions:
  - label: Run dev
    command: npm run dev
    persistent: true
validate:
  command: npm test
  hint: Make tests pass
required: true
---

# Welcome

This is the body content.`;

const MINIMAL_STEP = `---
title: Simple Step
---

Just a paragraph.`;

describe('parseFrontmatter', () => {
	it('parses frontmatter and body from a full step file', () => {
		const result = parseFrontmatter(VALID_STEP);
		expect(result.frontmatter.title).toBe('Project Overview');
		expect(result.frontmatter.teleport?.file).toBe('src/index.ts');
		expect(result.frontmatter.teleport?.line).toBe(10);
		expect(result.frontmatter.teleport?.highlight).toBe('createApp');
		expect(result.frontmatter.actions).toHaveLength(1);
		expect(result.frontmatter.actions[0].persistent).toBe(true);
		expect(result.frontmatter.validate?.command).toBe('npm test');
		expect(result.frontmatter.required).toBe(true);
		expect(result.body).toContain('# Welcome');
		expect(result.body).toContain('This is the body content.');
	});

	it('parses a minimal step with only title', () => {
		const result = parseFrontmatter(MINIMAL_STEP);
		expect(result.frontmatter.title).toBe('Simple Step');
		expect(result.frontmatter.actions).toEqual([]);
		expect(result.frontmatter.required).toBe(false);
		expect(result.body).toContain('Just a paragraph.');
	});

	it('throws on missing title', () => {
		const noTitle = '---\nrequired: true\n---\nBody';
		expect(() => parseFrontmatter(noTitle)).toThrow();
	});

	it('throws on missing frontmatter', () => {
		const noFrontmatter = '# Just Markdown\n\nNo frontmatter here.';
		expect(() => parseFrontmatter(noFrontmatter)).toThrow();
	});
});
