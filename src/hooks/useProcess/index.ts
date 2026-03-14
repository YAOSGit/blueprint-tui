// src/hooks/useProcess/index.ts
import { useContext } from 'react';
import { ProcessContext } from '../../providers/ProcessProvider/index.js';
import type { ProcessContextValue } from '../../providers/ProcessProvider/ProcessProvider.types.js';

export const useProcess = (): ProcessContextValue => {
	const context = useContext(ProcessContext);
	if (!context) {
		throw new Error('useProcess must be used within a ProcessProvider');
	}
	return context;
};
