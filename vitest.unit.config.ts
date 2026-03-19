import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { unitConfig } from '@yaos-git/toolkit/build';

export default unitConfig({
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
});
