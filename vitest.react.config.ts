import { defineConfig } from 'vitest/config';

export default defineConfig({
	define: {
		__CLI_VERSION__: JSON.stringify('0.0.0-test'),
	},
	test: {
		name: { label: 'react', color: 'cyan' },
		environment: 'jsdom',
		globals: true,
		typecheck: {
			tsconfig: './tsconfig.vitest.json',
		},
		include: ['**/*.test.tsx'],
		exclude: ['node_modules'],
		sequence: {
			groupOrder: 2,
		},
	},
});
