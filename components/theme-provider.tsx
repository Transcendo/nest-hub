"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
	theme: Theme;
	resolvedTheme: ResolvedTheme;
	systemTheme: ResolvedTheme;
	setTheme: (theme: Theme | ((theme: Theme) => Theme)) => void;
};

const storageKey = "theme";
const themes: Theme[] = ["light", "dark", "system"];

const ThemeContext = createContext<ThemeContextValue>({
	theme: "system",
	resolvedTheme: "light",
	systemTheme: "light",
	setTheme: () => {},
});

function isTheme(value: string | null): value is Theme {
	return themes.includes(value as Theme);
}

function getSystemTheme(): ResolvedTheme {
	if (
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	) {
		return "dark";
	}
	return "light";
}

function getStoredTheme(): Theme {
	if (typeof window === "undefined") return "system";

	try {
		const storedTheme = window.localStorage.getItem(storageKey);
		if (isTheme(storedTheme)) return storedTheme;
	} catch {
		// Ignore storage failures and fall back to system preference.
	}

	return "system";
}

function applyTheme(theme: ResolvedTheme) {
	const root = document.documentElement;
	root.classList.remove("light", "dark");
	root.classList.add(theme);
	root.style.colorScheme = theme;
}

function resolveTheme(theme: Theme, systemTheme: ResolvedTheme): ResolvedTheme {
	return theme === "system" ? systemTheme : theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>("system");
	const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");

	useEffect(() => {
		const initialSystemTheme = getSystemTheme();
		const initialTheme = getStoredTheme();

		setSystemTheme(initialSystemTheme);
		setThemeState(initialTheme);
		applyTheme(resolveTheme(initialTheme, initialSystemTheme));
	}, []);

	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => {
			const nextSystemTheme = getSystemTheme();
			setSystemTheme(nextSystemTheme);
			setThemeState((currentTheme) => {
				if (currentTheme === "system") applyTheme(nextSystemTheme);
				return currentTheme;
			});
		};

		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, []);

	const setTheme = useCallback(
		(nextTheme: Theme | ((theme: Theme) => Theme)) => {
			setThemeState((currentTheme) => {
				const value =
					typeof nextTheme === "function" ? nextTheme(currentTheme) : nextTheme;

				try {
					window.localStorage.setItem(storageKey, value);
				} catch {
					// Ignore storage failures; the visual theme can still update.
				}

				applyTheme(resolveTheme(value, getSystemTheme()));
				return value;
			});
		},
		[],
	);

	const value = useMemo<ThemeContextValue>(
		() => ({
			theme,
			resolvedTheme: resolveTheme(theme, systemTheme),
			systemTheme,
			setTheme,
		}),
		[theme, systemTheme, setTheme],
	);

	return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
	return useContext(ThemeContext);
}
