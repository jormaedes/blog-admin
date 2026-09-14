"use client";

import { useEffect, useState } from "react";

import { getPosts, getToken, deletePost, togglePostPublished } from "@/lib/api";
import useAuthStore from "@/stores/authStore";
import type { Post } from "@/types/post";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isPublishing, setIsPublishing] = useState<number | null>(null);

  const user = useAuthStore((state) => state.user);

  function formatDate(timestamp: string) {
    return new Date(timestamp).toLocaleDateString("pt-PT");
  }

  async function handleDelete(postId: number) {
    const confirmed = window.confirm(
      "Tens a certeza que queres apagar este post?"
    );

    if (!confirmed) {
      return;
    }
    const token = getToken();

    if (!token) {
      setError("Authentication token not found");
      return;
    }

    try {
      setIsDeleting(postId);

      await deletePost(String(postId), token);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId)
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsDeleting(null);
    }
  }

  async function handleTogglePublished(
    postId: number,
    published: boolean
  ) {
    const token = getToken();

    if (!token) {
      setError("Authentication token not found");
      return;
    }

    try {
      setIsPublishing(postId);

      const updatedPost = await togglePostPublished(
        String(postId),
        !published,
        token
      );

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId ? updatedPost : post
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsPublishing(null);
    }
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

  if (posts.length === 0) {
    return (
      <main>
        <h1>Posts</h1>

        <p>Ainda não existem posts.</p>

        <Link href="/dashboard/posts/new">
          Escrever primeiro post
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Posts</h1>

      {posts.map((post) => (
        <article key={post.id}>
          <h2>
            <Link href={`/dashboard/posts/${post.id}`}>
              {post.title}
            </Link>
          </h2>

          <p>
            Por {post.author.firstName} {post.author.lastName}
            {" "}
            (@{post.author.username})
          </p>

          <p>{formatDate(post.timestamp)}</p>

          <p>
            {post.published ? "Publicado" : "Rascunho"}
          </p>

          <p>{post.content}</p>

          {user?.userType === "AUTHOR" && (
            <div>
              <Link href={`/dashboard/posts/${post.id}`}>
                Ver
              </Link>
              <Link href={`/dashboard/posts/${post.id}/edit`}>
                Editar
              </Link>

              <button
                type="button"
                onClick={() =>
                  handleTogglePublished(post.id, post.published)
                }
                disabled={isPublishing === post.id}
              >
                {isPublishing === post.id
                  ? "A atualizar..."
                  : post.published
                    ? "Despublicar"
                    : "Publicar"}
              </button>

              <button
                type="button"
                onClick={() => handleDelete(post.id)}
                disabled={isDeleting === post.id}
              >
                {isDeleting === post.id ? "A apagar..." : "Apagar"}
              </button>
            </div>
          )}
        </article>
      ))}
    </main>
  );
}