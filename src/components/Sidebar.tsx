"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import useAuthStore from "@/stores/authStore";

export default function Sidebar() {
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/dashboard/posts">Posts</Link>
          </li>

          <li>
            <Link href="/dashboard/posts/new">Escrever post</Link>
          </li>

          <li>
            <Link href="/dashboard/users">Utilizadores</Link>
          </li>

          <li>
            <Link href="/dashboard/profile">Perfil</Link>
          </li>
        </ul>
      </nav>

      <footer>
        <button type="button">
          Alterar tema
        </button>

        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </footer>
    </aside>
  );
}