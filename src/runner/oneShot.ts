// src/runner/oneShot.ts
import { spawn } from 'node:child_process';

export type OneShotResult = {
	exitCode: number;
	output: string;
	timedOut: boolean;
};

export function runOneShot(
	command: string,
	options: { timeoutMs?: number } = {},
): Promise<OneShotResult> {
	const { timeoutMs = 30_000 } = options;

	return new Promise((resolve) => {
		const child = spawn('sh', ['-c', command], { stdio: 'pipe' });
		const chunks: string[] = [];
		let timedOut = false;

		child.stdout.on('data', (data: Buffer) => chunks.push(data.toString()));
		child.stderr.on('data', (data: Buffer) => chunks.push(data.toString()));

		const timer = setTimeout(() => {
			timedOut = true;
			child.kill('SIGTERM');
		}, timeoutMs);

		child.on('close', (code) => {
			clearTimeout(timer);
			resolve({
				exitCode: code ?? 1,
				output: chunks.join(''),
				timedOut,
			});
		});
	});
}
