"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();

  function getPageTitle(pathname: string) {
    if (pathname === "/dashboard") {
      return "Dashboard";
    }

    if (pathname === "/dashboard/posts") {
      return "Posts";
    }

    if (pathname === "/dashboard/posts/new") {
      return "Escrever post";
    }

    if (pathname === "/dashboard/users") {
      return "Utilizadores";
    }

    if (pathname === "/dashboard/profile") {
      return "Perfil";
    }

    if (pathname.includes("/edit")) {
      return "Editar post";
    }

    if (
      pathname.startsWith("/dashboard/posts/") &&
      pathname !== "/dashboard/posts/new"
    ) {
      return "Post";
    }

    return "Dashboard";
  }

  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-[#FAF9F6]/95 backdrop-blur dark:border-gray-800/80 dark:bg-[#141614]/95">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Abrir menu"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#a5452e] lg:hidden dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-[#df8064]"
          >
            <Menu size={20} />
          </button>

          <h1 className="font-serif text-lg text-gray-900 dark:text-white">
            {pageTitle}
          </h1>
        </div>

        {user && (
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f8eee9] text-sm font-semibold text-[#a5452e] dark:bg-[#38251f] dark:text-[#df8064]">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user.username}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.userType === "AUTHOR"
                  ? "Author"
                  : "Reader"}
              </p>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}