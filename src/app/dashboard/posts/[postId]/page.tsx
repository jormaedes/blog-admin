"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getComments, getPost, getToken } from "@/lib/api";
import type { Post } from "@/types/post";
import Link from "next/link";

import type { Comment } from "@/types/comment";

import PostContent from "@/components/PostContent";

export default function PostPage() {
  const params = useParams<{ postId: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [comments, setComments] = useState<Comment[]>([]);

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
        const commentsData = await getComments(params.postId, token);

        setPost(data);
        setComments(commentsData);
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
        <div>
          <Link href="/dashboard/posts">
            ← Voltar aos posts
          </Link>
        </div>

        <header>
          <h1>{post.title}</h1>

          <p>
            Por {post.author.firstName} {post.author.lastName} (@
            {post.author.username})
          </p>

          <div>
            <time dateTime={post.timestamp}>
              {new Date(post.timestamp).toLocaleDateString()}
            </time>

            <span>
              {post.published
                ? "Publicado"
                : "Rascunho"}
            </span>
          </div>
        </header>

        <PostContent content={post.content} />
      </article>

      <footer>
        <Link href="/dashboard/posts">
          Voltar aos posts
        </Link>

        <Link href={`/dashboard/posts/${post.id}/edit`}>
          Editar
        </Link>
      </footer>
    </main>
  );
}