"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === "dark";
	const Icon = isDark ? Sun : Moon;

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
			className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#a5452e] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-[#df8064]"
		>
			<Icon size={17} strokeWidth={1.8} />
		</button>
	);
}