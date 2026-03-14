// src/providers/ProcessProvider/index.tsx
import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import { runOneShot } from '../../runner/oneShot.js';
import type { PersistentHandle } from '../../runner/persistent.js';
import { spawnPersistent } from '../../runner/persistent.js';
import type { ProcessEntry } from '../../types/Process/index.js';
import type { Action } from '../../types/Tour/index.js';
import type {
	ProcessContextValue,
	ProcessProviderProps,
} from './ProcessProvider.types.js';

export const ProcessContext = createContext<ProcessContextValue | null>(null);

const MAX_OUTPUT_LINES = 500;

export function ProcessProvider({ children }: ProcessProviderProps) {
	const [processes, setProcesses] = useState<Map<string, ProcessEntry>>(
		new Map(),
	);
	const handlesRef = useRef<Map<string, PersistentHandle>>(new Map());

	const updateProcess = useCallback(
		(label: string, update: Partial<ProcessEntry>) => {
			setProcesses((prev) => {
				const next = new Map(prev);
				const existing = next.get(label);
				if (existing) {
					next.set(label, { ...existing, ...update });
				}
				return next;
			});
		},
		[],
	);

	const appendOutput = useCallback((label: string, line: string) => {
		setProcesses((prev) => {
			const next = new Map(prev);
			const existing = next.get(label);
			if (existing) {
				const output = [...existing.output, line].slice(-MAX_OUTPUT_LINES);
				next.set(label, { ...existing, output });
			}
			return next;
		});
	}, []);

	const runAction = useCallback(
		(action: Action) => {
			const { label, command, persistent } = action;

			// Kill existing persistent process with same label (re-run replaces)
			const existingHandle = handlesRef.current.get(label);
			if (existingHandle) {
				existingHandle.kill();
				handlesRef.current.delete(label);
			}

			const entry: ProcessEntry = {
				actionLabel: label,
				command,
				persistent,
				status: 'running',
				output: [],
				exitCode: null,
				pid: null,
			};

			setProcesses((prev) => {
				const next = new Map(prev);
				next.set(label, entry);
				return next;
			});

			if (persistent) {
				const handle = spawnPersistent(command, {
					onOutput: (line) => appendOutput(label, line),
					onExit: (code) => {
						updateProcess(label, {
							status: code === 0 ? 'done' : 'failed',
							exitCode: code,
						});
						handlesRef.current.delete(label);
					},
				});
				handlesRef.current.set(label, handle);
				updateProcess(label, { pid: handle.pid });
			} else {
				runOneShot(command).then((result) => {
					updateProcess(label, {
						status: result.exitCode === 0 ? 'done' : 'failed',
						exitCode: result.exitCode,
						output: result.timedOut
							? ['Command timed out after 30s']
							: result.output.replace(/\n$/, '').split('\n'),
					});
				});
			}
		},
		[appendOutput, updateProcess],
	);

	const killAll = useCallback(() => {
		for (const handle of handlesRef.current.values()) {
			handle.kill();
		}
		handlesRef.current.clear();
	}, []);

	const value: ProcessContextValue = useMemo(
		() => ({
			processes,
			runAction,
			killAll,
		}),
		[processes, runAction, killAll],
	);

	return (
		<ProcessContext.Provider value={value}>{children}</ProcessContext.Provider>
	);
}
