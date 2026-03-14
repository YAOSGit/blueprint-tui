// src/types/Process/Process.test-d.ts
import { assertType, describe, it } from 'vitest';
import type { ProcessEntry, ProcessStatus } from './index.js';

describe('Process types', () => {
	it('accepts valid ProcessStatus values', () => {
		assertType<ProcessStatus>('idle');
		assertType<ProcessStatus>('running');
		assertType<ProcessStatus>('done');
		assertType<ProcessStatus>('failed');
	});

	it('accepts a valid ProcessEntry', () => {
		assertType<ProcessEntry>({
			actionLabel: 'Run dev',
			command: 'npm run dev',
			persistent: true,
			status: 'running',
			output: ['Server listening on :3000'],
			exitCode: null,
			pid: 12345,
		});
	});
});
