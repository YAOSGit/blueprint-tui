// src/utils/teleport/editorDetector.ts
import { execFileSync } from 'node:child_process';

const KNOWN_EDITORS = [
	'code',
	'codium',
	'cursor',
	'idea',
	'webstorm',
	'goland',
	'nvim',
	'vim',
] as const;

export type DetectEditorOptions = {
	cliOverride?: string;
	configEditor?: string;
	binaryCheck?: (name: string) => boolean;
};

function defaultBinaryCheck(name: string): boolean {
	try {
		execFileSync('which', [name], { stdio: 'ignore' });
		return true;
	} catch {
		return false;
	}
}

export function detectEditor(options: DetectEditorOptions = {}): string | null {
	const {
		cliOverride,
		configEditor,
		binaryCheck = defaultBinaryCheck,
	} = options;

	if (cliOverride) return cliOverride;
	if (configEditor) return configEditor;
	if (process.env.VISUAL) return process.env.VISUAL;
	if (process.env.EDITOR) return process.env.EDITOR;

	for (const editor of KNOWN_EDITORS) {
		if (binaryCheck(editor)) return editor;
	}

	return null;
}
