"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import useAuthStore from "@/stores/authStore";

export default function Header() {
	const router = useRouter();

	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);

	console.log(user)
	function handleLogout() {
		logout();
		router.replace("/login");
	}

	if (!user) {
		return (
			<header>
				<div className="flex items-center justify-between py-2 container mx-auto">
					<Link href="/">Blog Admin</Link>

					<Link href="/login">Login</Link>
				</div>
			</header>
		);
	}

	return (
		<header>
			<div className="flex items-center justify-between py-2 container mx-auto">
				<Link href="/">Blog Admin</Link>

				<h2>
					{user.firstName} {user.lastName}
				</h2>

				<button onClick={handleLogout}>
					Logout
				</button>
			</div>
		</header>
	);
}