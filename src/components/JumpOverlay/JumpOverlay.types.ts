// src/components/JumpOverlay/JumpOverlay.types.ts
import type { ResolvedTour } from '../../types/Tour/index.js';

export interface JumpOverlayProps {
	tour: ResolvedTour;
	currentChapterId: string;
	currentStepId: string;
	onJump: (chapterId: string, stepId: string) => void;
	onClose: () => void;
}
