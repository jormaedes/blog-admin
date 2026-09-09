"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/lib/api";
import useAuthStore from "@/stores/authStore";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const setUser = useAuthStore((state) => state.setUser);

	const router = useRouter();

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			const data = await login(username, password);
			
			localStorage.setItem("token", data.token);
			setUser(data.user);
			
			console.log(data);
			router.push("/dashboard");
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		}
	}

	return (
		<main className="flex flex-1 items-center justify-center">
			<form className="flex w-full max-w-sm flex-col gap-4" onSubmit={handleSubmit}>
				<h1 className="text-2xl font-bold">Login</h1>

				<div className="flex flex-col gap-2">
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						required
						onChange={(event) => setUsername(event.target.value)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>

				<button type="submit">
					Login
				</button>
			</form>
		</main>
	);
}