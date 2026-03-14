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

const figletHeadings: MarkedExtension = {
	renderer: {
		heading({ text, depth }) {
			const font = HEADING_FONTS[depth];
			if (font) {
				return `\n${figlet.textSync(text, { font })}\n\n`;
			}
			if (depth === 3) {
				const line = '─'.repeat(text.length);
				return `\n${text}\n${line}\n\n`;
			}
			return false;
		},
	},
};

const marked = new Marked(markedTerminal() as MarkedExtension, figletHeadings);

export function renderMarkdown(raw: string): string {
	return marked.parse(raw) as string;
}
