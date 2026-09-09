"use client";

import { FormEvent, useState } from "react";
import { login } from "@/lib/api";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			const data = await login(username, password);

			console.log(data.token);
			console.log(data.user);
		} catch (error) {
			console.error(error);
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