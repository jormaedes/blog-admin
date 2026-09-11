"use client";

import useAuthStore from "@/stores/authStore";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <main>
      <h1>Perfil</h1>

      <div>
        <p>
          <strong>Nome:</strong> {user.firstName}
        </p>

        <p>
          <strong>Apelido:</strong> {user.lastName}
        </p>

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Tipo:</strong> {user.userType}
        </p>
      </div>
    </main>
  );
}