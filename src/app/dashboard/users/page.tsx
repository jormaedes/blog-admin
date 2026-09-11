"use client";

import { useEffect, useState } from "react";

import { getToken, getUsers } from "@/lib/api";
import type { User } from "@/types/auth";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      const token = getToken();

      if (!token) {
        setError("Authentication token not found");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getUsers(token);

        setUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (isLoading) {
    return <p>A carregar utilizadores...</p>;
  }

  return (
    <main>
      <h1>Utilizadores</h1>

      {error && <p>{error}</p>}

      {!error && users.length === 0 && (
        <p>Nenhum utilizador encontrado.</p>
      )}

      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>
                <strong>
                  {user.firstName} {user.lastName}
                </strong>
              </div>

              <div>
                @{user.username}
              </div>

              <div>
                {user.userType}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}