"use client";

import { useState } from "react";

import { getToken, updateUser } from "@/lib/api";
import useAuthStore from "@/stores/authStore";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [firstName, setFirstName] = useState(
    user?.firstName ?? ""
  );

  const [lastName, setLastName] = useState(
    user?.lastName ?? ""
  );

  const [username, setUsername] = useState(
    user?.username ?? ""
  );

  const [password, setPassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    return null;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) {
      setError("User not found");
      return;
    }

    const token = getToken();

    if (!token) {
      setError("Authentication token not found");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setMessage("");

      const updatedUser = await updateUser(
        user.id,
        firstName,
        lastName,
        username,
        token,
        password
      );

      setUser(updatedUser);
      setPassword("");

      setMessage("Perfil atualizado com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main>
      <h1>Perfil</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">
            Nome
          </label>

          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(event) =>
              setFirstName(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="lastName">
            Apelido
          </label>

          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) =>
              setLastName(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="password">
            Nova password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Deixe vazio para não alterar"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
        >
          {isSaving
            ? "A guardar..."
            : "Guardar alterações"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {error && <p>{error}</p>}
    </main>
  );
}