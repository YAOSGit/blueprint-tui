// src/app/providers.tsx
import React from 'react';
import { CommandsProvider } from '../providers/CommandsProvider/index.js';
import { ProcessProvider } from '../providers/ProcessProvider/index.js';
import { TourProvider } from '../providers/TourProvider/index.js';
import { UIStateProvider } from '../providers/UIStateProvider/index.js';
import type { ResolvedTour } from '../types/Tour/index.js';

export interface AppProvidersProps {
	tour: ResolvedTour;
	projectRoot: string;
	editorOverride?: string;
	initialChapter?: string;
	initialStep?: string;
	onQuit: () => void;
	children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({
	tour,
	projectRoot,
	editorOverride,
	initialChapter,
	initialStep,
	onQuit,
	children,
}) => {
	return (
		<TourProvider
			tour={tour}
			initialChapter={initialChapter}
			initialStep={initialStep}
		>
			<ProcessProvider>
				<UIStateProvider>
					<CommandsProvider
						onQuit={onQuit}
						projectRoot={projectRoot}
						editorOverride={editorOverride}
					>
						{children}
					</CommandsProvider>
				</UIStateProvider>
			</ProcessProvider>
		</TourProvider>
	);
};
