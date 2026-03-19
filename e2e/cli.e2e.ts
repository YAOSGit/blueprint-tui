// src/app/cli.e2e.ts
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const CLI = path.resolve('dist/cli.js');
const FIXTURE = path.resolve('test/fixtures/valid-tour/.blueprint');

function run(args: string[]): {
	stdout: string;
	stderr: string;
	exitCode: number;
} {
	try {
		const stdout = execFileSync('node', [CLI, ...args], {
			encoding: 'utf-8',
			timeout: 10_000,
		});
		return { stdout, stderr: '', exitCode: 0 };
	} catch (err: unknown) {
		const e = err as { stdout?: string; stderr?: string; status?: number };
		return {
			stdout: e.stdout ?? '',
			stderr: e.stderr ?? '',
			exitCode: e.status ?? 1,
		};
	}
}

describe('blueprint-tui CLI', () => {
	it('--help shows usage with "blueprint-tui" and lists subcommands', () => {
		const { stdout, exitCode } = run(['--help']);
		expect(exitCode).toBe(0);
		expect(stdout).toContain('blueprint-tui');
		expect(stdout).toContain('validate');
		expect(stdout).toContain('list');
	});

	it('prints version', () => {
		const { stdout, exitCode } = run(['--version']);
		expect(exitCode).toBe(0);
		expect(stdout).toContain('blueprint-tui-cli/');
	});

	it('validates a valid tour', () => {
		const { stdout, exitCode } = run(['validate', FIXTURE]);
		expect(exitCode).toBe(0);
		expect(stdout).toContain('Valid tour');
		expect(stdout).toContain('test-tour');
	});

	it('lists tour outline', () => {
		const { stdout, exitCode } = run(['list', FIXTURE]);
		expect(exitCode).toBe(0);
		expect(stdout).toContain('test-tour');
		expect(stdout).toContain('Getting Started');
		expect(stdout).toContain('Architecture');
		expect(stdout).toContain('Project Overview');
	});

	it('fails validation on missing directory', () => {
		const { stderr, exitCode } = run(['validate', '/tmp/nonexistent']);
		expect(exitCode).toBe(1);
		expect(stderr).toContain('Validation failed');
	});
});
