// src/providers/TourProvider/index.tsx
import type React from 'react';
import { createContext, useCallback, useMemo, useState } from 'react';
import type { ValidationResult } from '../../types/Validation/index.js';
import type {
	TourContextValue,
	TourProviderProps,
} from './TourProvider.types.js';

export const TourContext = createContext<TourContextValue | null>(null);

export const TourProvider: React.FC<TourProviderProps> = ({
	tour,
	initialChapter,
	initialStep,
	children,
}) => {
	const startChapterIdx = initialChapter
		? Math.max(
				0,
				tour.chapters.findIndex((c) => c.id === initialChapter),
			)
		: 0;
	const startStepIdx =
		initialStep && tour.chapters[startChapterIdx]
			? Math.max(
					0,
					tour.chapters[startChapterIdx].steps.findIndex(
						(s) => s.id === initialStep,
					),
				)
			: 0;

	const [chapterIndex, setChapterIndex] = useState(startChapterIdx);
	const [stepIndex, setStepIndex] = useState(startStepIdx);
	const [stepValidations, setStepValidations] = useState<
		Map<string, ValidationResult>
	>(new Map());

	const currentChapter = tour.chapters[chapterIndex]!;
	const currentStep = currentChapter?.steps[stepIndex];

	const globalTotalSteps = tour.chapters.reduce(
		(sum, c) => sum + c.steps.length,
		0,
	);
	let globalStepIndex = 0;
	for (let i = 0; i < chapterIndex; i++) {
		globalStepIndex += tour.chapters[i].steps.length;
	}
	globalStepIndex += stepIndex;

	const validation = stepValidations.get(currentStep.id) ?? null;

	const canAdvance = useCallback(() => {
		if (!currentStep.required) return true;
		if (!currentStep.validate) return true;
		const v = stepValidations.get(currentStep.id);
		return v?.state === 'passing';
	}, [currentStep, stepValidations]);

	const nextStep = useCallback((): boolean => {
		if (!canAdvance()) return false;
		if (stepIndex < currentChapter.steps.length - 1) {
			setStepIndex(stepIndex + 1);
			return true;
		}
		// Move to next non-empty chapter (defense-in-depth for empty chapters)
		let nextIdx = chapterIndex + 1;
		while (
			nextIdx < tour.chapters.length &&
			tour.chapters[nextIdx]!.steps.length === 0
		) {
			nextIdx++;
		}
		if (nextIdx < tour.chapters.length) {
			setChapterIndex(nextIdx);
			setStepIndex(0);
			return true;
		}
		return false;
	}, [canAdvance, stepIndex, chapterIndex, currentChapter, tour]);

	const prevStep = useCallback((): boolean => {
		if (stepIndex > 0) {
			setStepIndex(stepIndex - 1);
			return true;
		}
		// Move to previous non-empty chapter (defense-in-depth for empty chapters)
		let prevIdx = chapterIndex - 1;
		while (prevIdx >= 0 && tour.chapters[prevIdx]!.steps.length === 0) {
			prevIdx--;
		}
		if (prevIdx >= 0) {
			const prevChapter = tour.chapters[prevIdx]!;
			setChapterIndex(prevIdx);
			setStepIndex(prevChapter.steps.length - 1);
			return true;
		}
		return false;
	}, [stepIndex, chapterIndex, tour]);

	const nextChapter = useCallback((): boolean => {
		// Skip empty chapters (defense-in-depth for empty chapters)
		let nextIdx = chapterIndex + 1;
		while (
			nextIdx < tour.chapters.length &&
			tour.chapters[nextIdx]!.steps.length === 0
		) {
			nextIdx++;
		}
		if (nextIdx < tour.chapters.length) {
			setChapterIndex(nextIdx);
			setStepIndex(0);
			return true;
		}
		return false;
	}, [chapterIndex, tour]);

	const prevChapter = useCallback((): boolean => {
		// Skip empty chapters (defense-in-depth for empty chapters)
		let prevIdx = chapterIndex - 1;
		while (prevIdx >= 0 && tour.chapters[prevIdx]!.steps.length === 0) {
			prevIdx--;
		}
		if (prevIdx >= 0) {
			setChapterIndex(prevIdx);
			setStepIndex(0);
			return true;
		}
		return false;
	}, [chapterIndex, tour]);

	const jumpTo = useCallback(
		(chapterId: string, stepId?: string): boolean => {
			const ci = tour.chapters.findIndex((c) => c.id === chapterId);
			if (ci === -1) return false;
			setChapterIndex(ci);
			if (stepId) {
				const si = tour.chapters[ci].steps.findIndex((s) => s.id === stepId);
				setStepIndex(si === -1 ? 0 : si);
			} else {
				setStepIndex(0);
			}
			return true;
		},
		[tour],
	);

	const setValidation = useCallback(
		(stepId: string, result: ValidationResult) => {
			setStepValidations((prev) => {
				const next = new Map(prev);
				next.set(stepId, result);
				return next;
			});
		},
		[],
	);

	const value: TourContextValue = useMemo(
		() => ({
			tour,
			currentChapter,
			currentStep,
			chapterIndex,
			stepIndex,
			totalSteps: currentChapter.steps.length,
			globalStepIndex,
			globalTotalSteps,
			validation,
			stepValidations,
			nextStep,
			prevStep,
			nextChapter,
			prevChapter,
			jumpTo,
			setValidation,
		}),
		[
			tour,
			currentChapter,
			currentStep,
			chapterIndex,
			stepIndex,
			globalStepIndex,
			globalTotalSteps,
			validation,
			stepValidations,
			nextStep,
			prevStep,
			nextChapter,
			prevChapter,
			jumpTo,
			setValidation,
		],
	);

	return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};
