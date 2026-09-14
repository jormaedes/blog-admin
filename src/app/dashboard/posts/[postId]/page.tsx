"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Heart,
  MessageCircle,
  Trash2,
} from "lucide-react";

import {
  deletePost,
  getComments,
  getCurrentUser,
  getPost,
  getToken,
  togglePostPublished,
} from "@/lib/api";
import type { Post } from "@/types/post";
import type { Comment } from "@/types/comment";
import PostContent from "@/components/PostContent";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function PostPage() {
  const params = useParams();
  const router = useRouter();

  const postId = params.postId as string;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const token = getToken();

        if (!token) {
          setError("Sessão não encontrada.");
          return;
        }

        const [postData, commentsData, userData] = await Promise.all([
          getPost(postId, token),
          getComments(postId, token),
          getCurrentUser(token),
        ]);

        setPost(postData);
        setComments(commentsData);
        setCurrentUserId(userData.id);
      } catch (error) {
        console.error(error);
        setError("Não foi possível carregar o post.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPost();
  }, [postId]);

  async function handleTogglePublished() {
    if (!post) return;

    try {
      const token = getToken();

      if (!token) return;

      setIsUpdating(true);

      await togglePostPublished(
        post.id.toString(),
        !post.published,
        token
      );

      setPost((currentPost) =>
        currentPost
          ? {
              ...currentPost,
              published: !currentPost.published,
            }
          : currentPost
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete() {
    if (!post) return;

    try {
      const token = getToken();

      if (!token) return;

      setIsDeleting(true);

      await deletePost(post.id.toString(), token);

      router.push("/dashboard/posts");
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  }

  function handleCommentCreated(comment: Comment) {
    setComments((currentComments) => [
      comment,
      ...currentComments,
    ]);

    setPost((currentPost) =>
      currentPost
        ? {
            ...currentPost,
            commentsCount: currentPost.commentsCount + 1,
          }
        : currentPost
    );
  }

  function handleCommentDeleted(commentId: number) {
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.id !== commentId)
    );

    setPost((currentPost) =>
      currentPost
        ? {
            ...currentPost,
            commentsCount: Math.max(0, currentPost.commentsCount - 1),
          }
        : currentPost
    );
  }

  function handleCommentUpdated(updatedComment: Comment) {
    setComments((currentComments) =>
      currentComments.map((comment) =>
        comment.id === updatedComment.id
          ? updatedComment
          : comment
      )
    );
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />

          <div className="mt-8 h-10 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />

          <div className="mt-4 h-4 w-48 rounded bg-gray-200 dark:bg-gray-800" />

          <div className="mt-10 space-y-3">
            <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard/posts"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            Voltar para posts
          </Link>

          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Post não encontrado
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {error ?? "Não foi possível encontrar este post."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const token = getToken() ?? "";
  const isPostAuthor = currentUserId === post.authorId;

  return (
    <>
      <div className="p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/dashboard/posts"
              className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft size={16} />
              Voltar para posts
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href={`/dashboard/posts/${post.id}/edit`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Edit size={16} />
                Editar
              </Link>

              <button
                type="button"
                onClick={handleTogglePublished}
                disabled={isUpdating}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {isUpdating
                  ? "A atualizar..."
                  : post.published
                    ? "Despublicar"
                    : "Publicar"}
              </button>

              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                aria-label="Eliminar post"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <header className="mt-10">
            <div className="flex items-center gap-3">
              <span
                className={
                  post.published
                    ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400"
                    : "rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }
              >
                {post.published ? "Publicado" : "Rascunho"}
              </span>

              <span className="text-sm text-gray-400">
                {new Date(post.timestamp).toLocaleDateString("pt-PT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {post.title}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {post.author.firstName[0]}
                {post.author.lastName[0]}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {post.author.firstName} {post.author.lastName}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  @{post.author.username}
                </p>
              </div>
            </div>
          </header>

          <div className="mt-10 border-y border-gray-200 py-10 dark:border-gray-800">
            <PostContent content={post.content} />
          </div>

          <div className="flex items-center gap-6 border-b border-gray-200 py-5 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Heart size={17} />
              <span>
                {post.likesCount}{" "}
                {post.likesCount === 1 ? "like" : "likes"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MessageCircle size={17} />
              <span>
                {post.commentsCount}{" "}
                {post.commentsCount === 1
                  ? "comentário"
                  : "comentários"}
              </span>
            </div>
          </div>

          <section className="mt-10">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Comentários
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {post.commentsCount}{" "}
                {post.commentsCount === 1
                  ? "comentário"
                  : "comentários"}{" "}
                neste post.
              </p>
            </div>

            <CommentForm
              postId={post.id.toString()}
              token={token}
              onCommentCreated={handleCommentCreated}
            />

            <div className="mt-8">
              {currentUserId !== null && (
                <CommentList
                  comments={comments}
                  currentUserId={currentUserId}
                  isPostAuthor={isPostAuthor}
                  token={token}
                  onCommentDeleted={handleCommentDeleted}
                  onCommentUpdated={handleCommentUpdated}
                />
              )}
            </div>
          </section>
        </div>
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Eliminar post?"
        description={`Tem certeza de que deseja eliminar "${post.title}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!isDeleting) {
            setIsDeleteDialogOpen(false);
          }
        }}
      />
    </>
  );
}