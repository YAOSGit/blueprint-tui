// src/utils/teleport/teleport.test.ts
import { describe, expect, it } from 'vitest';
import { buildTeleportCommand } from './index.js';

describe('buildTeleportCommand', () => {
	it('builds VS Code command', () => {
		const cmd = buildTeleportCommand('code', {
			file: 'src/index.ts',
			line: 10,
		});
		expect(cmd).toEqual({ bin: 'code', args: ['--goto', 'src/index.ts:10'] });
	});

	it('builds JetBrains command', () => {
		const cmd = buildTeleportCommand('idea', { file: 'src/main.rs', line: 5 });
		expect(cmd).toEqual({ bin: 'idea', args: ['--line', '5', 'src/main.rs'] });
	});

	it('builds Neovim command', () => {
		const cmd = buildTeleportCommand('nvim', { file: 'lib/app.py', line: 42 });
		expect(cmd).toEqual({ bin: 'nvim', args: ['+42', 'lib/app.py'] });
	});

	it('builds Vim command', () => {
		const cmd = buildTeleportCommand('vim', { file: 'main.go', line: 1 });
		expect(cmd).toEqual({ bin: 'vim', args: ['+1', 'main.go'] });
	});

	it('defaults to code --goto for unknown editors', () => {
		const cmd = buildTeleportCommand('subl', { file: 'a.txt', line: 3 });
		expect(cmd).toEqual({ bin: 'subl', args: ['a.txt:3'] });
	});
});
