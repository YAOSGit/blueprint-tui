// src/providers/UIStateProvider/index.tsx
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import type {
	ActiveOverlay,
	FocusPane,
	UIStateContextValue,
	UIStateProviderProps,
} from './UIStateProvider.types.js';

export const UIStateContext = createContext<UIStateContextValue | null>(null);

const FOCUS_ORDER: FocusPane[] = ['narrative', 'actions', 'processOutput'];
const STATUS_MESSAGE_DURATION = 3000;

export function UIStateProvider({ children }: UIStateProviderProps) {
	const [focusPane, setFocusPane] = useState<FocusPane>('narrative');
	const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>('none');
	const [narrativeScroll, setNarrativeScroll] = useState(0);
	const [processScroll, setProcessScroll] = useState(0);
	const [statusMessage, setStatusMessageRaw] = useState<string | null>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const setStatusMessage = useCallback((msg: string | null) => {
		if (timerRef.current) clearTimeout(timerRef.current);
		setStatusMessageRaw(msg);
		if (msg) {
			timerRef.current = setTimeout(
				() => setStatusMessageRaw(null),
				STATUS_MESSAGE_DURATION,
			);
		}
	}, []);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	const cycleFocus = useCallback(() => {
		setFocusPane((current) => {
			const idx = FOCUS_ORDER.indexOf(current);
			return FOCUS_ORDER[(idx + 1) % FOCUS_ORDER.length];
		});
	}, []);

	const scrollNarrative = useCallback((delta: number) => {
		setNarrativeScroll((prev) => Math.max(0, prev + delta));
	}, []);

	const scrollProcess = useCallback((delta: number) => {
		setProcessScroll((prev) => Math.max(0, prev + delta));
	}, []);

	const value: UIStateContextValue = useMemo(
		() => ({
			focusPane,
			activeOverlay,
			narrativeScroll,
			processScroll,
			statusMessage,
			setFocusPane,
			cycleFocus,
			setActiveOverlay,
			scrollNarrative,
			scrollProcess,
			setStatusMessage,
		}),
		[
			focusPane,
			activeOverlay,
			narrativeScroll,
			processScroll,
			statusMessage,
			cycleFocus,
			scrollNarrative,
			scrollProcess,
			setStatusMessage,
		],
	);

	return (
		<UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>
	);
}
