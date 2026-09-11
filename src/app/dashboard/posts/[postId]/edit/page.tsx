"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPost, getToken } from "@/lib/api";
import type { Post } from "@/types/post";

export default function EditPostPage() {
	const params = useParams<{ postId: string }>();
	const [post, setPost] = useState<Post | null>(null);
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

			<p>ID: {post.id}</p>
			<p>Título: {post.title}</p>
			<p>Conteúdo: {post.content}</p>
			<p>
				Estado: {post.published ? "Publicado" : "Rascunho"}
			</p>
		</main>
	);
}