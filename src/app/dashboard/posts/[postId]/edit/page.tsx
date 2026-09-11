interface EditPostPageProps {
	params: Promise<{
		postId: string;
	}>;
}

export default async function EditPostPage({
	params,
}: EditPostPageProps) {
	const { postId } = await params;

	return (
		<main>
			<h1>Editar post</h1>
			<p>Post ID: {postId}</p>
		</main>
	);
}