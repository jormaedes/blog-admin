"use client";

import { useState } from "react";
import {
  Edit2,
  Heart,
  Loader2,
  Trash2,
  X,
  Check,
} from "lucide-react";

import type { Comment } from "@/types/comment";

interface CommentListProps {
  comments: Comment[];
  currentUserId: number | null;
  isPostAuthor: boolean;
  token: string;
  onCommentDeleted: () => void;
  onCommentUpdated: () => void;
}

export default function CommentList({
  comments,
  currentUserId,
  isPostAuthor,
  token,
  onCommentDeleted,
  onCommentUpdated,
}: CommentListProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(
    null
  );
  const [editingContent, setEditingContent] = useState("");

  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null
  );
  const [updatingCommentId, setUpdatingCommentId] = useState<number | null>(
    null
  );

  const [error, setError] = useState("");

  function getInitials(firstName: string, lastName: string) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  function startEditing(comment: Comment) {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
    setError("");
  }

  function cancelEditing() {
    setEditingCommentId(null);
    setEditingContent("");
    setError("");
  }

  async function handleUpdate(commentId: number) {
    const content = editingContent.trim();

    if (!content || updatingCommentId !== null) {
      return;
    }

    try {
      setUpdatingCommentId(commentId);
      setError("");

      const response = await fetch(
        `http://localhost:3300/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Não foi possível atualizar o comentário."
        );
      }

      cancelEditing();
      onCommentUpdated();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o comentário."
      );
    } finally {
      setUpdatingCommentId(null);
    }
  }

  async function handleDelete(commentId: number) {
    if (deletingCommentId !== null) {
      return;
    }

    const confirmed = window.confirm(
      "Tens a certeza de que queres eliminar este comentário?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingCommentId(commentId);
      setError("");

      const response = await fetch(
        `http://localhost:3300/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || "Não foi possível eliminar o comentário."
        );
      }

      onCommentDeleted();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível eliminar o comentário."
      );
    } finally {
      setDeletingCommentId(null);
    }
  }

  if (comments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 px-6 py-10 text-center dark:border-gray-800">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          Ainda não existem comentários.
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Sê o primeiro a comentar este post.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {comments.map((comment) => {
        const isCommentOwner = currentUserId === comment.userId;
        const canEdit = isCommentOwner;
        const canDelete = isCommentOwner || isPostAuthor;
        const isEditing = editingCommentId === comment.id;
        const isUpdating = updatingCommentId === comment.id;
        const isDeleting = deletingCommentId === comment.id;

        const initials = getInitials(
          comment.user.firstName,
          comment.user.lastName
        );

        return (
          <article
            key={comment.id}
            className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0 dark:border-gray-800"
          >
            <div className="flex gap-3 sm:gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {comment.user.firstName} {comment.user.lastName}
                    </p>

                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      @{comment.user.username}
                    </p>
                  </div>

                  <time
                    dateTime={comment.timestamp}
                    className="shrink-0 text-xs text-gray-400 dark:text-gray-500"
                  >
                    {new Date(comment.timestamp).toLocaleDateString("pt-PT")}
                  </time>
                </div>

                {isEditing ? (
                  <div className="mt-4 space-y-3">
                    <textarea
                      value={editingContent}
                      onChange={(event) =>
                        setEditingContent(event.target.value)
                      }
                      rows={4}
                      disabled={isUpdating}
                      autoFocus
                      className="block w-full resize-y rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-indigo-400"
                    />

                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        disabled={isUpdating}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <X size={14} />
                        Cancelar
                      </button>

                      <button
                        type="button"
                        onClick={() => handleUpdate(comment.id)}
                        disabled={!editingContent.trim() || isUpdating}
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-xs font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isUpdating ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Check size={14} />
                        )}

                        {isUpdating ? "A guardar..." : "Guardar"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Heart size={14} />
                        <span>{comment.likesCount}</span>
                      </div>

                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => startEditing(comment)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          <Edit2 size={14} />
                          Editar
                        </button>
                      )}

                      {canDelete && (
                        <button
                          type="button"
                          onClick={() => handleDelete(comment.id)}
                          disabled={isDeleting}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:text-red-400"
                        >
                          {isDeleting ? (
                            <Loader2
                              size={14}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={14} />
                          )}

                          {isDeleting ? "A eliminar..." : "Eliminar"}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}