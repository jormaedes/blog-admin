"use client";

import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	return (
		<div>
			<button
				type="button"
				onClick={() => setTheme("light")}
				aria-pressed={theme === "light"}
			>
				Light
			</button>

			<button
				type="button"
				onClick={() => setTheme("system")}
				aria-pressed={theme === "system"}
			>
				System
			</button>

			<button
				type="button"
				onClick={() => setTheme("dark")}
				aria-pressed={theme === "dark"}
			>
				Dark
			</button>
		</div>
	);
}