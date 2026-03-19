// src/utils/runner/persistent.ts
import { spawnProcess } from '@yaos-git/toolkit/tui/process';
import type { ProcessHandle } from '@yaos-git/toolkit/tui/process';

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
	const handle: ProcessHandle = spawnProcess({
		command,
		onOutput: options.onOutput,
		onExit: options.onExit,
	});

	// Capture pid at spawn time (toolkit resets to null on close)
	const initialPid = handle.pid;

	return {
		pid: initialPid,
		kill: () => handle.kill(),
	};
}
