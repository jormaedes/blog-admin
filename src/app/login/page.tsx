export default function LoginPage() {
	return (
		<main className="flex flex-1 items-center justify-center">
			<form className="flex w-full max-w-sm flex-col gap-4">
				<h1 className="text-2xl font-bold">Login</h1>

				<div className="flex flex-col gap-2">
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						required
					/>
				</div>

				<button type="submit">
					Login
				</button>
			</form>
		</main>
	);
}