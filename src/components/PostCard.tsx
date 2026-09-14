import Link from "next/link";

import type { Post } from "@/types/post";

interface PostCardProps {
	post: Post;
	isDeleting: boolean;
	isPublishing: boolean;
	onDelete: (postId: number) => void;
	onTogglePublished: (
		postId: number,
		published: boolean
	) => void;
}

export default function PostCard({post, isDeleting, isPublishing, onDelete, onTogglePublished}: PostCardProps) {
	function formatDate(timestamp: string) {
		return new Date(timestamp).toLocaleDateString("pt-PT");
	}

	return (
		<article>
			<h2>
				<Link href={`/dashboard/posts/${post.id}`}>
					{post.title}
				</Link>
			</h2>

			<p>
				Por {post.author.firstName}{" "}
				{post.author.lastName}{" "}
				(@{post.author.username})
			</p>

			<p>{formatDate(post.timestamp)}</p>

			<p>
				{post.published
					? "Publicado"
					: "Rascunho"}
			</p>

			<p>{post.content}</p>

			<div>
				<Link href={`/dashboard/posts/${post.id}`}>
					Ver
				</Link>

				<Link href={`/dashboard/posts/${post.id}/edit`}>
					Editar
				</Link>

				<button
					type="button"
					onClick={() =>
						onTogglePublished(
							post.id,
							post.published
						)
					}
					disabled={isPublishing}
				>
					{isPublishing
						? "A atualizar..."
						: post.published
							? "Despublicar"
							: "Publicar"}
				</button>

				<button
					type="button"
					onClick={() => onDelete(post.id)}
					disabled={isDeleting}
				>
					{isDeleting
						? "A apagar..."
						: "Apagar"}
				</button>
			</div>
		</article>
	);
}