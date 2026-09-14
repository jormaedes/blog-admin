"use client";

import Link from "next/link";
import useAuthStore from "@/stores/authStore";

export default function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Dashboard
          </h1>
        </div>

        {user && (
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user.username}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.userType === "AUTHOR" ? "Author" : "Reader"}
              </p>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}