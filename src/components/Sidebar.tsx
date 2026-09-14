"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import useAuthStore from "@/stores/authStore";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Sidebar() {
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <aside className="w-64 flex flex-col">
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/dashboard/posts">Posts</Link>
          </li>

          {user?.userType === "AUTHOR" && (
            <li>
              <Link href="/dashboard/posts/new">
                Escrever post
              </Link>
            </li>
          )}

          <li>
            <Link href="/dashboard/users">Utilizadores</Link>
          </li>

          <li>
            <Link href="/dashboard/profile">Perfil</Link>
          </li>
        </ul>
      </nav>

      <footer className="mt-auto space-y-2">
        <ThemeSwitcher />

        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </footer>
    </aside>
  );
}