"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

import { createPost, getToken } from "@/lib/api";

export default function NewPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const token = getToken();

    if (!token) {
      setError("Authentication token not found");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      await createPost(
        title,
        content,
        published,
        token
      );

      router.push("/dashboard/posts");
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
      <h1>Escrever post</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            Título
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="content">
            Conteúdo
          </label>

          <Editor
            apiKey='bonyjowkb1vp3xnp38zzgdi0z60j6djhppcw196jrszgik6i'
            id="content"
            value={content}
            onEditorChange={(newContent) =>
              setContent(newContent)
            }
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
          <label>
            <input
              type="checkbox"
              checked={published}
              onChange={(event) =>
                setPublished(event.target.checked)
              }
            />

            Publicar imediatamente
          </label>
        </div>

        <button
          type="submit"
          disabled={isSaving}
        >
          {isSaving
            ? "A guardar..."
            : "Criar post"}
        </button>
      </form>
    </main>
  );
}