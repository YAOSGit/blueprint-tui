// src/hooks/useMarkdown/useMarkdown.test.ts
import { describe, expect, it } from 'vitest';
import { renderMarkdown } from './index.js';

describe('renderMarkdown', () => {
	it('renders a heading as figlet banner', () => {
		const result = renderMarkdown('# Hello');
		const lines = result.split('\n').filter((l) => l.trim());
		expect(lines.length).toBeGreaterThanOrEqual(4);
	});

	it('renders a code block', () => {
		const result = renderMarkdown('```js\nconst x = 1;\n```');
		expect(result).toContain('const x = 1');
	});

	it('renders inline code', () => {
		const result = renderMarkdown('Use `npm install` to install.');
		expect(result).toContain('npm install');
	});
});
