"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Editor } from "@tinymce/tinymce-react";

import { getPost, getToken } from "@/lib/api";
import type { Post } from "@/types/post";

export default function EditPostPage() {
  const params = useParams<{ postId: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
    <main>
      <h1>Editar post</h1>

      <form>
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

        <button type="submit">
          Guardar alterações
        </button>
      </form>
    </main>
  );
}