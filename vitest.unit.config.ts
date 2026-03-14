import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		{
			name: 'flf-fonts',
			resolveId(source) {
				if (source.endsWith('.flf')) {
					return resolve(
						'node_modules/figlet/fonts',
						source.replace('figlet/fonts/', ''),
					);
				}
			},
			load(id) {
				if (id.endsWith('.flf')) {
					return `export default ${JSON.stringify(readFileSync(id, 'utf-8'))}`;
				}
			},
		},
	],
	define: {
		__CLI_VERSION__: JSON.stringify('0.0.0-test'),
	},
	test: {
		name: { label: 'unit', color: 'green' },
		environment: 'node',
		globals: true,
		typecheck: {
			tsconfig: './tsconfig.vitest.json',
		},
		include: ['**/*.test.ts'],
		exclude: ['node_modules', 'examples', '**/*.test.tsx', '**/*.test-d.ts'],
		sequence: {
			groupOrder: 1,
		},
	},
});
