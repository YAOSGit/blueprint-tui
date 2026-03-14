// src/app/cli.tsx
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import { Command } from 'commander';
import { render } from 'ink';
import { loadTour } from '../loader/index.js';
import App from './index.js';

declare const __CLI_VERSION__: string;

async function runCLI(args: string[] = process.argv.slice(2)): Promise<void> {
	const versionInfo = [
		`blueprint-tui v${__CLI_VERSION__}`,
		`Node.js ${process.version}`,
		`Platform: ${process.platform} ${process.arch}`,
	].join('\n');

	const program = new Command();

	program
		.name('blueprint-tui')
		.description('Interactive codebase onboarding TUI')
		.version(versionInfo, '-v, --version')
		.argument('[path]', 'Path to .blueprint/ directory', '.blueprint')
		.option(
			'--jump <target>',
			'Jump to chapter:step (e.g., architecture:data-layer)',
		)
		.option('--editor <editor>', 'Override editor detection')
		.action(
			async (
				blueprintPath: string,
				options: { jump?: string; editor?: string },
			) => {
				const resolvedPath = path.resolve(blueprintPath);

				try {
					const projectRoot = path.resolve(resolvedPath, '..');
					const tour = await loadTour(resolvedPath, projectRoot);

					let initialChapter: string | undefined;
					let initialStep: string | undefined;
					if (options.jump) {
						const parts = options.jump.split(':');
						initialChapter = parts[0];
						initialStep = parts[1];
					}

					render(
						<App
							tour={tour}
							projectRoot={projectRoot}
							editorOverride={options.editor}
							initialChapter={initialChapter}
							initialStep={initialStep}
						/>,
					);
				} catch (err) {
					const message = err instanceof Error ? err.message : String(err);
					process.stderr.write(chalk.red(`Error: ${message}\n`));
					process.exit(1);
				}
			},
		);

	// validate subcommand
	program
		.command('validate [path]')
		.description('Validate a .blueprint/ directory without running the TUI')
		.action(async (blueprintPath: string = '.blueprint') => {
			const resolvedPath = path.resolve(blueprintPath);
			try {
				const tour = await loadTour(resolvedPath);
				const stepCount = tour.chapters.reduce(
					(sum, c) => sum + c.steps.length,
					0,
				);
				process.stdout.write(
					chalk.green(
						`✓ Valid tour: ${tour.name} (${tour.chapters.length} chapters, ${stepCount} steps)\n`,
					),
				);
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				process.stderr.write(chalk.red(`✗ Validation failed: ${message}\n`));
				process.exit(1);
			}
		});

	// list subcommand
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
						process.stdout.write(`  ${chalk.dim('·')} ${step.title}${req}\n`);
					}
				}
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				process.stderr.write(chalk.red(`Error: ${message}\n`));
				process.exit(1);
			}
		});

	program.parse(args, { from: 'user' });
}

export { runCLI };

let isMain = false;
try {
	if (process.argv[1]) {
		const scriptPath = fs.realpathSync(process.argv[1]);
		const currentFile = fileURLToPath(import.meta.url);
		isMain = scriptPath === currentFile;
	}
} catch {
	isMain = false;
}

if (isMain) {
	runCLI();
}
