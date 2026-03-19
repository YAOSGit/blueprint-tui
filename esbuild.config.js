import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';
import { createEsbuildConfig } from '@yaos-git/toolkit/build';

const __dirname = dirname(fileURLToPath(import.meta.url));

const flfFonts = {
	name: 'flf-fonts',
	setup(build) {
		build.onResolve({ filter: /figlet\/fonts\/.*\.flf$/ }, (args) => ({
			path: resolve(
				__dirname,
				'node_modules/figlet/fonts',
				args.path.replace(/^figlet\/fonts\//, ''),
			),
		}));
		build.onLoad({ filter: /\.flf$/ }, (args) => ({
			contents: readFileSync(args.path, 'utf-8'),
			loader: 'text',
		}));
	},
};

// Build CLI (validate, list — no React)
await esbuild.build({
	...createEsbuildConfig({ entry: 'src/app/cli.ts' }),
	outfile: 'dist/cli.js',
});

// Build TUI (interactive tour — Ink/React)
await esbuild.build({
	...createEsbuildConfig({ entry: 'src/app/tui.tsx', plugins: [flfFonts] }),
	outfile: 'dist/tui.js',
});
