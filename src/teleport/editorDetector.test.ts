// src/teleport/editorDetector.test.ts
import { describe, expect, it } from 'vitest';
import { detectEditor } from './editorDetector.js';

describe('detectEditor', () => {
	it('returns CLI flag override when provided', () => {
		const result = detectEditor({ cliOverride: 'nvim' });
		expect(result).toBe('nvim');
	});

	it('returns blueprint.yaml editor when no CLI override', () => {
		const result = detectEditor({ configEditor: 'code' });
		expect(result).toBe('code');
	});

	it('returns $VISUAL env var before $EDITOR', () => {
		const origVisual = process.env.VISUAL;
		const origEditor = process.env.EDITOR;
		process.env.VISUAL = 'cursor';
		process.env.EDITOR = 'vim';
		const result = detectEditor({});
		expect(result).toBe('cursor');
		process.env.VISUAL = origVisual;
		process.env.EDITOR = origEditor;
	});

	it('returns $EDITOR env var as fallback', () => {
		const origVisual = process.env.VISUAL;
		const origEditor = process.env.EDITOR;
		delete process.env.VISUAL;
		process.env.EDITOR = 'vim';
		const result = detectEditor({});
		expect(result).toBe('vim');
		process.env.VISUAL = origVisual;
		process.env.EDITOR = origEditor;
	});

	it('returns null when nothing is detected', () => {
		const origVisual = process.env.VISUAL;
		const origEditor = process.env.EDITOR;
		delete process.env.VISUAL;
		delete process.env.EDITOR;
		const result = detectEditor({ binaryCheck: () => false });
		expect(result).toBeNull();
		process.env.VISUAL = origVisual;
		process.env.EDITOR = origEditor;
	});

	it('falls back to binary detection on PATH', () => {
		const origVisual = process.env.VISUAL;
		const origEditor = process.env.EDITOR;
		delete process.env.VISUAL;
		delete process.env.EDITOR;
		const result = detectEditor({ binaryCheck: (name) => name === 'code' });
		expect(result).toBe('code');
		process.env.VISUAL = origVisual;
		process.env.EDITOR = origEditor;
	});
});
