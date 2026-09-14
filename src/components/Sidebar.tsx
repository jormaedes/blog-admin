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
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-full flex-col p-4">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            Blog Admin
          </Link>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <Link href="/dashboard">
                Dashboard
              </Link>
            </li>

            <li>
              <Link href="/dashboard/posts">
                Posts
              </Link>
            </li>

            {user?.userType === "AUTHOR" && (
              <li>
                <Link href="/dashboard/posts/new">
                  Escrever post
                </Link>
              </li>
            )}

            <li>
              <Link href="/dashboard/users">
                Utilizadores
              </Link>
            </li>

            <li>
              <Link href="/dashboard/profile">
                Perfil
              </Link>
            </li>
          </ul>
        </nav>

        <footer className="space-y-3">
          <ThemeSwitcher />

          <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </footer>
      </div>
    </aside>
  );
}