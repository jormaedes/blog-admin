"use client";

import { useEffect, useState } from "react";

import { getPosts, getToken } from "@/lib/api";
import type { Post } from "@/types/post";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  function formatDate(timestamp: string) {
    return new Date(timestamp).toLocaleDateString("pt-PT");
  }

  useEffect(() => {
    async function loadPosts() {
      try {
        const token = getToken();

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const data = await getPosts(token);

        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Posts</h1>

      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>

          <p>{formatDate(post.timestamp)}</p>

          <p>
            {post.published ? "Publicado" : "Rascunho"}
          </p>

          <p>{post.content}</p>

          <div>
            <Link href={`/dashboard/posts/${post.id}/edit`}>
              Editar
            </Link>

            <button type="button">
              {post.published ? "Despublicar" : "Publicar"}
            </button>

            <button type="button">
              Apagar
            </button>
          </div>
        </article>
      ))}
    </main>
  );
}