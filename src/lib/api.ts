import type { LoginResponse, User } from "@/types/auth";

const API_URL = "http://localhost:3300";

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get current user");
  }

  return response.json();
}