import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'fe_theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setThemeState] = useState<Theme>('light');

	useEffect(() => {
		const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null);
		if (saved) {
			setThemeState(saved);
			return;
		}
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		setThemeState(prefersDark ? 'dark' : 'light');
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const setTheme = (t: Theme) => setThemeState(t);
	const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

	const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
	return ctx;
};
