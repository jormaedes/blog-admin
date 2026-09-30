"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  FileText,
  Loader2,
  Send,
} from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

import { createPost, getToken } from "@/lib/api";
import AuthorGuard from "@/components/AuthGuard";

export default function NewPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const token = getToken();

    if (!token) {
      setError("Authentication token not found");
      return;
    }

    if (!title.trim()) {
      setError("O título do post é obrigatório.");
      return;
    }

    if (!content.trim()) {
      setError("O conteúdo do post é obrigatório.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      await createPost(
        title.trim(),
        content,
        published,
        token
      );

      router.push("/dashboard/posts");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Não foi possível criar o post.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AuthorGuard>
      <main className="min-h-full bg-[#FAF9F6] dark:bg-[#141614]">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft size={16} />
              Voltar
            </button>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#f8eee9] dark:bg-[#38251f]">
                <FileText
                  size={20}
                  className="text-[#a5452e] dark:text-[#df8064]"
                />
              </div>

              <div>
                <h1 className="font-serif text-2xl text-gray-950 dark:text-white">
                  Escrever post
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Cria e publica um novo artigo no teu blog.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#1b1e1b]">
              <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Título
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    setError("");
                  }}
                  placeholder="Escreve o título do teu post..."
                  disabled={isSaving}
                  className="mt-2 h-12 w-full border-0 bg-transparent px-0 font-serif text-2xl text-gray-950 outline-none placeholder:text-gray-300 focus:ring-0 dark:text-white dark:placeholder:text-gray-600"
                />
              </div>

              <div className="px-6 py-5">
                <div className="mb-3">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Conteúdo
                  </label>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Escreve o conteúdo do teu artigo usando o editor.
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                  <Editor
                    apiKey="bonyjowkb1vp3xnp38zzgdi0z60j6djhppcw196jrszgik6i"
                    id="content"
                    value={content}
                    onEditorChange={(newContent) => {
                      setContent(newContent);
                      setError("");
                    }}
                    init={{
                      height: 520,
                      menubar: false,
                      entity_encoding: "raw",
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
                      content_style:
                        "body { font-family: ui-sans-serif, system-ui, sans-serif; font-size: 16px; line-height: 1.7; padding: 8px 12px; }",
                    }}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-5 dark:border-gray-800">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={published}
                      onChange={(event) =>
                        setPublished(event.target.checked)
                      }
                      disabled={isSaving}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#c2573a] focus:ring-2 focus:ring-[#c2573a]/20 dark:border-gray-600 dark:bg-gray-800"
                    />

                    <span>
                      <span className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                        Publicar imediatamente
                      </span>

                      <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
                        O post ficará visível assim que for criado.
                      </span>
                    </span>
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        router.push("/dashboard/posts")
                      }
                      disabled={isSaving}
                      className="h-10 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex h-10 items-center gap-2 rounded-md bg-[#c2573a] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#a5452e] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? (
                        <>
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                          A guardar...
                        </>
                      ) : published ? (
                        <>
                          <Send size={16} />
                          Publicar post
                        </>
                      ) : (
                        <>
                          <Check size={16} />
                          Guardar rascunho
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="border-t border-red-100 bg-red-50 px-6 py-4 dark:border-red-950/50 dark:bg-red-950/20">
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
    </AuthorGuard>
  );
}