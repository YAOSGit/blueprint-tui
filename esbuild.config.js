import { readFileSync } from 'node:fs';
import { builtinModules } from 'node:module';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import * as esbuild from 'esbuild';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = packageJson.version;

const requireShim = `#!/usr/bin/env node
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
`;

await esbuild.build({
	entryPoints: ['src/app/cli.tsx'],
	outfile: 'dist/cli.js',
	bundle: true,
	platform: 'node',
	format: 'esm',
	minify: true,
	tsconfig: 'tsconfig.app.json',
	external: builtinModules.map((m) => `node:${m}`),
	banner: {
		js: requireShim,
	},
	define: {
		__CLI_VERSION__: JSON.stringify(version),
	},
	supported: {
		'top-level-await': true,
	},
	plugins: [
		{
			name: 'node-builtins-to-node-prefix',
			setup(build) {
				const filter = new RegExp(`^(${builtinModules.join('|')})$`);
				build.onResolve({ filter }, (args) => ({
					path: `node:${args.path}`,
					external: true,
				}));
			},
		},
		{
			name: 'stub-react-devtools',
			setup(build) {
				build.onResolve({ filter: /^react-devtools-core$/ }, () => ({
					path: 'react-devtools-core',
					namespace: 'stub',
				}));
				build.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({
					contents: 'export default undefined;',
					loader: 'js',
				}));
			},
		},
		{
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
		},
	],
	mainFields: ['module', 'main'],
	conditions: ['import', 'node'],
});
