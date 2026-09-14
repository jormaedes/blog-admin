interface PostContentProps {
	content: string;
}

export default function PostContent({ content }: PostContentProps) {
	return (
		<div
			className="post-content"
			dangerouslySetInnerHTML={{
				__html: content,
			}}
		/>
	);
}