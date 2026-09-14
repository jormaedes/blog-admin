"use client";

import { useState } from "react";

import { deleteComment } from "@/lib/api";
import type { Comment } from "@/types/comment";

interface CommentListProps {
	comments: Comment[];
	currentUserId: number;
	isPostAuthor: boolean;
	token: string;
	onCommentDeleted: (commentId: number) => void;
}

export default function CommentList({ comments, currentUserId, isPostAuthor, token, onCommentDeleted }: CommentListProps) {
	const [isDeleting, setIsDeleting] = useState<number | null>(null);

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

							<p>{comment.content}</p>

							<time dateTime={comment.timestamp}>
								{new Date(
									comment.timestamp
								).toLocaleDateString("pt-PT")}
							</time>

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