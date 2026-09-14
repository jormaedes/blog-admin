import type { Comment } from "@/types/comment";

interface CommentListProps {
	comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
	if (comments.length === 0) {
		return <p>Ainda não existem comentários.</p>;
	}

	return (
		<section>
			<h2>Comentários ({comments.length})</h2>

			<div>
				{comments.map((comment) => (
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
					</article>
				))}
			</div>
		</section>
	);
}