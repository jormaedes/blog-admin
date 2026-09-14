"use client";

import { useState } from "react";

import { deleteComment, updateComment, likeComment, unlikeComment } from "@/lib/api";
import type { Comment } from "@/types/comment";

interface CommentListProps {
	comments: Comment[];
	currentUserId: number;
	isPostAuthor: boolean;
	token: string;
	onCommentDeleted: (commentId: number) => void;
	onCommentUpdated: (comment: Comment) => void;
}

export default function CommentList({
	comments,
	currentUserId,
	isPostAuthor,
	token,
	onCommentDeleted,
	onCommentUpdated
}: CommentListProps) {
	const [isDeleting, setIsDeleting] = useState<number | null>(null);

	const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
	const [editingContent, setEditingContent] = useState("");

	const [isLiking, setIsLiking] = useState<number | null>(null);

	async function handleDelete(commentId: number) {
		const confirmed = window.confirm(
			"Tens a certeza que queres apagar este comentário?"
		);

		if (!confirmed) {
			return;
		}

		try {
			setIsDeleting(commentId);

			await deleteComment(commentId, token);

			onCommentDeleted(commentId);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
			}
		} finally {
			setIsDeleting(null);
		}
	}

	async function handleUpdate(commentId: number) {
		if (!editingContent.trim()) {
			return;
		}

		try {
			const updatedComment = await updateComment(
				commentId,
				editingContent.trim(),
				token
			);

			onCommentUpdated(updatedComment);

			setEditingCommentId(null);
			setEditingContent("");
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
			}
		}
	}

	async function handleToggleLike(comment: Comment) {
		try {
			setIsLiking(comment.id);

			if (comment.likedByMe) {
				await unlikeComment(comment.id, token);
			} else {
				await likeComment(comment.id, token);
			}

			onCommentUpdated({
				...comment,
				likedByMe: !comment.likedByMe,
				likesCount: comment.likedByMe
					? comment.likesCount - 1
					: comment.likesCount + 1,
			});
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
			}
		} finally {
			setIsLiking(null);
		}
	}

	if (comments.length === 0) {
		return <p>Ainda não existem comentários.</p>;
	}

	return (
		<section>
			<h2>Comentários ({comments.length})</h2>

			<div>
				{comments.map((comment) => {
					const isOwner =
						comment.userId === currentUserId;

					const canDelete =
						isOwner || isPostAuthor;

					return (
						<article key={comment.id}>
							<div>
								<strong>
									{comment.user.firstName}{" "}
									{comment.user.lastName}
								</strong>

								<span>
									{" "}
									@{comment.user.username}
								</span>
							</div>


							{editingCommentId === comment.id ? (
								<div>
									<textarea
										value={editingContent}
										onChange={(event) =>
											setEditingContent(event.target.value)
										}
										rows={3}
									/>

									<button
										type="button"
										onClick={() => handleUpdate(comment.id)}
									>
										Guardar
									</button>

									<button
										type="button"
										onClick={() => {
											setEditingCommentId(null);
											setEditingContent("");
										}}
									>
										Cancelar
									</button>
								</div>
							) : (
								<p>{comment.content}</p>
							)}

							{isOwner && editingCommentId !== comment.id && (
								<button
									type="button"
									onClick={() => {
										setEditingCommentId(comment.id);
										setEditingContent(comment.content);
									}}
								>
									Editar
								</button>
							)}

							<time dateTime={comment.timestamp}>
								{new Date(
									comment.timestamp
								).toLocaleDateString("pt-PT")}
							</time>

							<button
								type="button"
								onClick={() => handleToggleLike(comment)}
								disabled={isLiking === comment.id}
							>
								{comment.likedByMe ? "Descurtir" : "Curtir"}
							</button>

							<span>
								{comment.likesCount}{" "}
								{comment.likesCount === 1 ? "like" : "likes"}
							</span>

							{canDelete && (
								<button
									type="button"
									onClick={() =>
										handleDelete(comment.id)
									}
									disabled={
										isDeleting === comment.id
									}
								>
									{isDeleting === comment.id
										? "A apagar..."
										: "Apagar"}
								</button>
							)}
						</article>
					);
				})}
			</div>
		</section>
	);
}