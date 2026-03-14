// src/runner/persistent.ts

import type { ChildProcess } from 'node:child_process';
import { spawn } from 'node:child_process';

export type PersistentHandle = {
	pid: number | null;
	kill: () => void;
};

export type PersistentOptions = {
	onOutput?: (line: string) => void;
	onExit?: (code: number | null) => void;
};

export function spawnPersistent(
	command: string,
	options: PersistentOptions,
): PersistentHandle {
	const { onOutput, onExit } = options;

	const child: ChildProcess = spawn('sh', ['-c', command], { stdio: 'pipe' });

	if (onOutput) {
		child.stdout?.on('data', (data: Buffer) => {
			const lines = data.toString().split('\n');
			if (lines.at(-1) === '') lines.pop();
			for (const line of lines) {
				onOutput(line);
			}
		});
		child.stderr?.on('data', (data: Buffer) => {
			const lines = data.toString().split('\n');
			if (lines.at(-1) === '') lines.pop();
			for (const line of lines) {
				onOutput(line);
			}
		});
	}

	child.on('close', (code) => {
		onExit?.(code);
	});

	const kill = () => {
		if (child.killed) return;
		child.kill('SIGTERM');
		setTimeout(() => {
			if (!child.killed) {
				child.kill('SIGKILL');
			}
		}, 2000);
	};

	return {
		pid: child.pid ?? null,
		kill,
	};
}
