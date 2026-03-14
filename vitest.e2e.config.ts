import { defineConfig } from 'vitest/config';

export default defineConfig({
	define: {
		__CLI_VERSION__: JSON.stringify('0.0.0-test'),
	},
	test: {
		name: { label: 'e2e', color: 'red' },
		pool: 'forks',
		maxWorkers: 1,
		testTimeout: 30000,
		globals: true,
		include: ['**/*.e2e.ts'],
		exclude: ['node_modules'],
		sequence: {
			groupOrder: 4,
		},
	},
});
