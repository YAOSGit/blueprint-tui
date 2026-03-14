import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		name: { label: 'types', color: 'magenta' },
		typecheck: {
			enabled: true,
			checker: 'tsgo',
			tsconfig: './tsconfig.vitest.json',
		},
		include: ['**/*.test-d.ts'],
		exclude: ['node_modules'],
		sequence: {
			groupOrder: 3,
		},
	},
});
