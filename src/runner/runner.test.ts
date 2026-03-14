// src/runner/runner.test.ts
import { describe, expect, it } from 'vitest';
import { runOneShot } from './oneShot.js';
import { spawnPersistent } from './persistent.js';

describe('runOneShot', () => {
	it('captures stdout from a successful command', async () => {
		const result = await runOneShot('echo hello');
		expect(result.exitCode).toBe(0);
		expect(result.output).toContain('hello');
	});

	it('returns non-zero exit code on failure', async () => {
		const result = await runOneShot('exit 1');
		expect(result.exitCode).toBe(1);
	});

	it('captures stderr', async () => {
		const result = await runOneShot('echo error >&2');
		expect(result.output).toContain('error');
	});

	it('times out after specified duration', async () => {
		const result = await runOneShot('sleep 10', { timeoutMs: 500 });
		expect(result.timedOut).toBe(true);
	});
});

describe('spawnPersistent', () => {
	it('streams stdout via onOutput callback', async () => {
		const lines: string[] = [];
		const handle = spawnPersistent('echo streaming', {
			onOutput: (line) => lines.push(line),
		});

		// Wait for process to finish
		await new Promise((resolve) => setTimeout(resolve, 500));

		expect(lines.some((l) => l.includes('streaming'))).toBe(true);
		handle.kill();
	});

	it('reports exit via onExit callback', async () => {
		let exitCode: number | null = null;
		spawnPersistent('exit 42', {
			onExit: (code) => {
				exitCode = code;
			},
		});

		await new Promise((resolve) => setTimeout(resolve, 500));

		expect(exitCode).toBe(42);
	});

	it('kills process with SIGTERM then SIGKILL', async () => {
		const handle = spawnPersistent('sleep 30', {});

		expect(handle.pid).toBeGreaterThan(0);
		handle.kill();

		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Process should be dead — kill(0) throws if PID doesn't exist
		const pid = handle.pid;
		expect(pid).not.toBeNull();
		expect(() => process.kill(pid as number, 0)).toThrow();
	});
});
