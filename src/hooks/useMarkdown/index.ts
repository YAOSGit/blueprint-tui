// src/hooks/useMarkdown/index.ts
import figlet from 'figlet';
// @ts-expect-error -- .flf files are inlined as text by esbuild
import miniwiFont from 'figlet/fonts/miniwi.flf';
import { Marked, type MarkedExtension } from 'marked';
// @ts-expect-error -- marked-terminal has no type declarations
import { markedTerminal } from 'marked-terminal';

// @ts-expect-error -- .flf files are inlined as text by esbuild
import maxiwiFont from './maxiwi.flf';

figlet.parseFont('maxiwi', maxiwiFont);
figlet.parseFont('miniwi', miniwiFont);

const HEADING_FONTS: Record<number, string> = {
	1: 'maxiwi',
	2: 'miniwi',
};

function figletWordWrap(text: string, font: string, maxWidth: number): string {
	// Try full text first
	const full = figlet.textSync(text, { font });
	const fullWidth = (full.split('\n')[0] ?? '').length;
	if (fullWidth <= maxWidth) return full;

	// Word-wrap: greedily fit words per line
	const words = text.split(/\s+/);
	const lines: string[] = [];
	let current: string[] = [];

	for (const word of words) {
		const candidate = [...current, word].join(' ');
		const rendered = figlet.textSync(candidate, { font });
		const width = (rendered.split('\n')[0] ?? '').length;
		if (width > maxWidth && current.length > 0) {
			lines.push(figlet.textSync(current.join(' '), { font }));
			current = [word];
		} else {
			current.push(word);
		}
	}
	if (current.length > 0) {
		lines.push(figlet.textSync(current.join(' '), { font }));
	}

	return lines.join('\n');
}

function createFigletExtension(width: number): MarkedExtension {
	return {
		renderer: {
			heading({ text, depth }) {
				const font = HEADING_FONTS[depth];
				if (font) {
					return `\n${figletWordWrap(text, font, width)}\n\n`;
				}
				if (depth === 3) {
					const line = '─'.repeat(Math.min(text.length, width));
					return `\n${text}\n${line}\n\n`;
				}
				return false;
			},
		},
	};
}

export function renderMarkdown(raw: string, width?: number): string {
	const w = width ?? 80;
	const md = new Marked(
		markedTerminal() as MarkedExtension,
		createFigletExtension(w),
	);
	return md.parse(raw) as string;
}
