// src/utils/teleport/index.ts
import { spawn } from 'node:child_process';
import type { Teleport } from '../../types/Tour/index.js';

export type TeleportCommand = {
	bin: string;
	args: string[];
};

export function buildTeleportCommand(
	editor: string,
	teleport: Pick<Teleport, 'file' | 'line'>,
): TeleportCommand {
	const { file, line } = teleport;

	if (editor === 'code' || editor === 'codium' || editor === 'cursor') {
		return { bin: editor, args: ['--goto', `${file}:${line}`] };
	}

	if (editor === 'idea' || editor === 'webstorm' || editor === 'goland') {
		return { bin: editor, args: ['--line', String(line), file] };
	}

	if (editor === 'nvim' || editor === 'vim') {
		return { bin: editor, args: [`+${line}`, file] };
	}

	// Generic fallback: editor file:line
	return { bin: editor, args: [`${file}:${line}`] };
}

export type TeleportResult = { ok: true } | { ok: false; error: string };

export function executeTeleport(
	editor: string,
	teleport: Pick<Teleport, 'file' | 'line'>,
): TeleportResult {
	const { bin, args } = buildTeleportCommand(editor, teleport);
	try {
		const child = spawn(bin, args, { detached: true, stdio: 'ignore' });
		child.on('error', () => {});
		child.unref();
		return { ok: true };
	} catch {
		return { ok: false, error: `Failed to spawn ${bin}` };
	}
}
