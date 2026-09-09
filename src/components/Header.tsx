import Link from "next/link";

export default function Header() {
	return (
		<header className="">
			<div className="flex items-center justify-between py-2 container mx-auto">
				<Link href={'/'}>Blog Admin</Link>
				<Link href={'/login'}>Login</Link>
			</div>
		</header>
	);
}