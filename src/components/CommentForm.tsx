"use client";

import { useState, type FormEvent } from "react";
import { createComment } from "@/lib/api";
import type { Comment } from "@/types/comment";

interface CommentFormProps {
  postId: string;
  token: string;
  onCommentCreated: (comment: Comment) => void;
}

export default function CommentForm({ postId, token, onCommentCreated, }: CommentFormProps) {
	const [content, setContent] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!content.trim()) {
			return;
		}

		try {
			setIsSubmitting(true);
			setError("");

			const comment = await createComment(
				postId,
				content.trim(),
				token
			);

			setContent("");
			onCommentCreated(comment);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="comment">
				Escreve um comentário
			</label>

			<textarea
				id="comment"
				value={content}
				onChange={(event) => setContent(event.target.value)}
				placeholder="O que achaste deste post?"
				rows={4}
				disabled={isSubmitting}
			/>

			{error && <p>{error}</p>}

			<button
				type="submit"
				disabled={isSubmitting || !content.trim()}
			>
				{isSubmitting
					? "A publicar..."
					: "Comentar"}
			</button>
		</form>
	);
}