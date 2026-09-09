"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/stores/authStore";

interface AuthGuardProps {
	children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
	const router = useRouter();

	const isAuthenticated = useAuthStore(
		(state) => state.isAuthenticated
	);

	const isAuthLoading = useAuthStore(
		(state) => state.isAuthLoading
	);

	useEffect(() => {
		if (isAuthLoading) return;

		if (!isAuthenticated) {
			router.replace("/login");
		}
	}, [isAuthLoading, isAuthenticated, router]);

	if (isAuthLoading || !isAuthenticated) {
		return null;
	}

	return children;
}