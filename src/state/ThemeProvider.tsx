"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { z } from "zod";

const LOCAL_STORAGE_KEY = "fitforge-theme";
const themeSchema = z.enum(["dark", "light"]);

type Theme = z.infer<typeof themeSchema>;

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		// Check for saved theme first
		const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY) as Theme;
		const parsedTheme = themeSchema.safeParse(savedTheme);
		if (parsedTheme.success) {
			setTheme(parsedTheme.data);
			document.documentElement.classList.toggle(
				"dark",
				parsedTheme.data === "dark",
			);
			return;
		}

		// If no saved theme, check system preference
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
			const newTheme = e.matches ? "dark" : "light";
			setTheme(newTheme);
			document.documentElement.classList.toggle("dark", e.matches);
		};

		// Set initial theme based on system preference
		handleChange(mediaQuery);

		// Listen for system theme changes
		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
