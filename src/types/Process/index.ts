// src/types/Process/index.ts
export type ProcessStatus = 'idle' | 'running' | 'done' | 'failed';

export type ProcessEntry = {
	actionLabel: string;
	command: string;
	persistent: boolean;
	status: ProcessStatus;
	output: string[];
	exitCode: number | null;
	pid: number | null;
};
