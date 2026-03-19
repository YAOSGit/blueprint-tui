// src/app/tui.tsx
import path from 'node:path';
import chalk from 'chalk';
import { createCLI, fatalError, formatError, getExitCode, runIfMain } from '@yaos-git/toolkit/cli';
import { render } from 'ink';
import { loadTour } from '../utils/loader/index.js';
import App from './index.js';

declare const __CLI_VERSION__: string;

async function runTUI(args: string[] = process.argv.slice(2)): Promise<void> {
	const { program } = createCLI({
		name: 'blueprint-tui',
		description: 'Interactive codebase onboarding TUI',
		version: __CLI_VERSION__,
	});

	program
		.argument('[path]', 'Path to .blueprint/ directory', '.blueprint')
		.option('--jump <target>', 'Jump to chapter:step (e.g., architecture:data-layer)')
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
					process.exitCode = 1;
					return;
				}
			},
		);

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

export { runTUI };

runIfMain(import.meta.url, () => {
	runTUI();
});
