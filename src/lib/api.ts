import type { LoginResponse, User } from "@/types/auth";
import type { Post } from "@/types/post";

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

export async function getPosts(token: string): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to get all posts");
  }

  return response.json();
}

export async function getPost(postId: string, token: string): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get post");
  }

  return response.json();
}

export async function updatePost(postId: string, title: string, content: string, token: string): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  return response.json();
}

export async function togglePostPublished(postId: string, published: boolean, token: string): Promise<Post> {
  const response = await fetch( `${API_URL}/posts/${postId}/publish`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        published,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update post publication status");
  }

  return response.json();
}