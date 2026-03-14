// src/providers/TourProvider/TourProvider.types.ts
import type React from 'react';
import type {
	ResolvedChapter,
	ResolvedStep,
	ResolvedTour,
} from '../../types/Tour/index.js';
import type { ValidationResult } from '../../types/Validation/index.js';

export interface TourContextValue {
	tour: ResolvedTour;
	currentChapter: ResolvedChapter;
	currentStep: ResolvedStep;
	chapterIndex: number;
	stepIndex: number;
	totalSteps: number;
	globalStepIndex: number;
	globalTotalSteps: number;
	validation: ValidationResult | null;
	stepValidations: Map<string, ValidationResult>;
	nextStep: () => boolean;
	prevStep: () => boolean;
	nextChapter: () => boolean;
	prevChapter: () => boolean;
	jumpTo: (chapterId: string, stepId?: string) => boolean;
	setValidation: (stepId: string, result: ValidationResult) => void;
}

export interface TourProviderProps {
	tour: ResolvedTour;
	initialChapter?: string;
	initialStep?: string;
	children: React.ReactNode;
}
