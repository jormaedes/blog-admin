"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPost, getToken } from "@/lib/api";
import type { Post } from "@/types/post";
import Link from "next/link";

export default function PostPage() {
  const params = useParams<{ postId: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPost() {
      const token = getToken();

      if (!token) {
        setError("Authentication token not found");
        setIsLoading(false);
        return;
      }

      try {
        const data = await getPost(params.postId, token);

        setPost(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [params.postId]);

  if (isLoading) {
    return <p>A carregar post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Post não encontrado.</p>;
  }

  return (
    <main>
      <article>
        <h1>{post.title}</h1>

        <p>
          {new Date(post.timestamp).toLocaleDateString()}
        </p>

        <div
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </article>

      <div>
        <Link href="/dashboard/posts">
          Voltar aos posts
        </Link>

        <Link href={`/dashboard/posts/${post.id}/edit`}>
          Editar
        </Link>
      </div>
    </main>
  );
}