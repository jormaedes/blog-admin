"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import ThemeSwitcher from "@/components/ThemeSwitcher";

import {
  FileText,
  LayoutDashboard,
  LogOut,
  User,
  Users,
  PenLine,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Posts",
    href: "/dashboard/posts",
    icon: FileText,
  },
  {
    label: "Escrever post",
    href: "/dashboard/posts/new",
    icon: PenLine,
    authorOnly: true,
  },
  {
    label: "Utilizadores",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    label: "Perfil",
    href: "/dashboard/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();

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
            {navigation.map((item) => {
              if (item.authorOnly && user?.userType !== "AUTHOR") {
                return null;
              }

              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
              flex items-center gap-3 rounded-lg px-3 py-2
              text-sm font-medium
              transition-colors
              ${isActive
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                      }
            `}
                  >
                    <Icon size={18} strokeWidth={2} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <footer className="space-y-3">
          <ThemeSwitcher />

          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
          >
            <LogOut size={18} strokeWidth={2} />
            <span>Logout</span>
          </button>
        </footer>
      </div>
    </aside>
  );
}