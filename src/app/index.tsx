// src/app/index.tsx
import { useApp } from 'ink';
import { useCallback } from 'react';
import type { ResolvedTour } from '../types/Tour/index.js';
import { AppContent } from './app.js';
import { AppProviders } from './providers.js';

export interface AppProps {
	tour: ResolvedTour;
	projectRoot: string;
	editorOverride?: string;
	initialChapter?: string;
	initialStep?: string;
}

export default function App({
	tour,
	projectRoot,
	editorOverride,
	initialChapter,
	initialStep,
}: AppProps) {
	const { exit } = useApp();

	const handleQuit = useCallback(() => {
		exit();
		setTimeout(() => process.exit(0), 100);
	}, [exit]);

	return (
		<AppProviders
			tour={tour}
			projectRoot={projectRoot}
			editorOverride={editorOverride}
			initialChapter={initialChapter}
			initialStep={initialStep}
			onQuit={handleQuit}
		>
			<AppContent />
		</AppProviders>
	);
}
