"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Editor } from "@tinymce/tinymce-react";

import { getPost, getToken, updatePost, togglePostPublished } from "@/lib/api";
import type { Post } from "@/types/post";

import AuthorGuard from "@/components/AuthGuard";

export default function EditPostPage() {
  const params = useParams<{ postId: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    try {
      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found");
      }

      await updatePost(
        params.postId,
        title,
        content,
        token
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsSaving(false);
    }
  }

  async function handleTogglePublished() {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Authentication token not found");
      }

      setIsPublishing(true);

      const updatedPost = await togglePostPublished(
        params.postId,
        !post!.published,
        token
      );

      setPost(updatedPost);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsPublishing(false);
    }
  }

  useEffect(() => {
    async function loadPost() {
      try {
        const token = getToken();

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const data = await getPost(params.postId, token);

        setPost(data);
        setTitle(data.title);
        setContent(data.content);
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
    return <p>Loading post...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <AuthorGuard>
      <main>
        <h1>Editar post</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Título</label>

            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="content">Conteúdo</label>

            <Editor
              apiKey='bonyjowkb1vp3xnp38zzgdi0z60j6djhppcw196jrszgik6i'
              id="content"
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 500,
                menubar: false,
                entity_encoding: 'raw',
                plugins: [
                  "lists",
                  "link",
                  "image",
                  "table",
                  "code",
                ],
                toolbar:
                  "undo redo | blocks | bold italic | " +
                  "alignleft aligncenter alignright | " +
                  "bullist numlist | link image | code",
              }}
            />
          </div>

          <div>
            <button type="submit" disabled={isSaving}>
              {isSaving ? "A guardar..." : "Guardar alterações"}
            </button>

            <button
              type="button"
              onClick={handleTogglePublished}
              disabled={isPublishing}
            >
              {isPublishing ? "A atualizar..." : post.published ? "Despublicar" : "Publicar"}
            </button>
          </div>
        </form>
      </main>
    </AuthorGuard>
  );
}