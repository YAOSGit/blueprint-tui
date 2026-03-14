// src/providers/TourProvider/index.tsx
import { createContext, useCallback, useMemo, useState } from 'react';
import type { ValidationResult } from '../../types/Validation/index.js';
import type {
	TourContextValue,
	TourProviderProps,
} from './TourProvider.types.js';

export const TourContext = createContext<TourContextValue | null>(null);

export function TourProvider({
	tour,
	initialChapter,
	initialStep,
	children,
}: TourProviderProps) {
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

	const currentChapter = tour.chapters[chapterIndex];
	const currentStep = currentChapter.steps[stepIndex];

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
		if (chapterIndex < tour.chapters.length - 1) {
			setChapterIndex(chapterIndex + 1);
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
		if (chapterIndex > 0) {
			const prevChapter = tour.chapters[chapterIndex - 1];
			setChapterIndex(chapterIndex - 1);
			setStepIndex(prevChapter.steps.length - 1);
			return true;
		}
		return false;
	}, [stepIndex, chapterIndex, tour]);

	const nextChapter = useCallback((): boolean => {
		if (chapterIndex < tour.chapters.length - 1) {
			setChapterIndex(chapterIndex + 1);
			setStepIndex(0);
			return true;
		}
		return false;
	}, [chapterIndex, tour]);

	const prevChapter = useCallback((): boolean => {
		if (chapterIndex > 0) {
			setChapterIndex(chapterIndex - 1);
			setStepIndex(0);
			return true;
		}
		return false;
	}, [chapterIndex]);

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
}
