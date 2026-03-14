// src/hooks/useTour/index.ts
import { useContext } from 'react';
import { TourContext } from '../../providers/TourProvider/index.js';
import type { TourContextValue } from '../../providers/TourProvider/TourProvider.types.js';

export const useTour = (): TourContextValue => {
	const context = useContext(TourContext);
	if (!context) {
		throw new Error('useTour must be used within a TourProvider');
	}
	return context;
};
