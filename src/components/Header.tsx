"use client";

import Link from "next/link";

import useAuthStore from "@/stores/authStore";

export default function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header>
      <div className="flex items-center justify-between py-2 mx-auto">
        <Link href="/">Blog Admin</Link>

        {user ? (
          <Link href="/dashboard/profile">
            <div className="flex items-center gap-2">
              <div>
                {user.firstName[0]}
                {user.lastName[0]}
              </div>

              <span>{user.username}</span>
            </div>
          </Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </header>
  );
}