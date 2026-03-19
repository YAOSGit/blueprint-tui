#!/usr/bin/env node
import path from 'node:path';
import chalk from 'chalk';
import { createCLI, fatalError, formatError, getExitCode, runIfMain } from '@yaos-git/toolkit/cli';
import { loadTour } from '../utils/loader/index.js';

declare const __CLI_VERSION__: string;

async function runCLI(args: string[] = process.argv.slice(2)): Promise<void> {
	const { program } = createCLI({
		name: 'blueprint-tui-cli',
		description: 'Interactive codebase onboarding TUI — CLI utilities',
		version: __CLI_VERSION__,
	});

	program
		.command('validate [path]')
		.description('Validate a .blueprint/ directory without running the TUI')
		.action(async (blueprintPath: string = '.blueprint') => {
			const resolvedPath = path.resolve(blueprintPath);
			try {
				const tour = await loadTour(resolvedPath);
				const stepCount = tour.chapters.reduce((sum, c) => sum + c.steps.length, 0);
				process.stdout.write(
					chalk.green(`\u2713 Valid tour: ${tour.name} (${tour.chapters.length} chapters, ${stepCount} steps)\n`),
				);
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				process.stderr.write(chalk.red(`\u2717 Validation failed: ${message}\n`));
				process.exitCode = 1;
				return;
			}
		});

	program
		.command('list [path]')
		.description('Print tour outline')
		.action(async (blueprintPath: string = '.blueprint') => {
			const resolvedPath = path.resolve(blueprintPath);
			try {
				const tour = await loadTour(resolvedPath);
				process.stdout.write(`${chalk.bold(tour.name)} v${tour.version}\n\n`);
				for (const chapter of tour.chapters) {
					process.stdout.write(
						`${chalk.cyan(`[${chapter.id}]`)} ${chalk.bold(chapter.title)}\n`,
					);
					for (const step of chapter.steps) {
						const req = step.required ? chalk.yellow(' (required)') : '';
						process.stdout.write(`  ${chalk.dim('\u00B7')} ${step.title}${req}\n`);
					}
				}
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				process.stderr.write(chalk.red(`Error: ${message}\n`));
				process.exitCode = 1;
				return;
			}
		});

	try {
		await program.parseAsync(args, { from: 'user' });
	} catch (err) {
		if (err instanceof Error && 'exitCode' in err) {
			process.exitCode = getExitCode(err);
		} else {
			fatalError(formatError(err));
		}
	}
}

export { runCLI };

runIfMain(import.meta.url, () => {
	runCLI();
});
