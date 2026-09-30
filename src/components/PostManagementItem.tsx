import Link from "next/link";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import type { Post } from "@/types/post";

interface PostManagementItemProps {
  post: Post;
  onDelete: (post: Post) => void;
  onTogglePublished: (post: Post) => void;
  isUpdating: boolean;
}

export default function PostManagementItem({
	post,
	onDelete,
	onTogglePublished,
	isUpdating
}: PostManagementItemProps) {
	return (
		<div className="flex items-center gap-4 border-b border-gray-100 px-4 py-4 last:border-b-0 dark:border-gray-800">
			<div className="min-w-0 flex-1">
				<Link
					href={`/dashboard/posts/${post.id}`}
					className="block truncate text-sm font-medium text-gray-900 hover:text-[#a5452e] dark:text-white dark:hover:text-[#df8064]"
				>
					{post.title}
				</Link>

				<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
					{post.author.firstName} {post.author.lastName}
				</p>
			</div>

			<div className="hidden w-28 sm:block">
				<button
					type="button"
					onClick={() => onTogglePublished(post)}
					disabled={isUpdating}
					aria-busy={isUpdating}
					className={
						post.published
							? "rounded-md bg-[#f8eee9] px-2.5 py-1 text-xs font-medium text-[#a5452e] transition-colors hover:bg-[#f1dfd7] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#38251f] dark:text-[#df8064] dark:hover:bg-[#493027]"
							: "rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
					}
				>
					{isUpdating ? (
						<span className="flex items-center gap-1.5">
							<Loader2 size={12} className="animate-spin" />
							A atualizar...
						</span>
					) : (
						post.published ? "Publicado" : "Rascunho"
					)}
				</button>
			</div>

			<div className="hidden w-20 text-sm text-gray-500 dark:text-gray-400 md:block">
				{post.likesCount}
			</div>

			<div className="hidden w-24 text-sm text-gray-500 dark:text-gray-400 md:block">
				{post.commentsCount}
			</div>

			<div className="hidden w-24 text-sm text-gray-500 dark:text-gray-400 lg:block">
				{new Date(post.timestamp).toLocaleDateString("pt-PT")}
			</div>

			<div className="flex shrink-0 items-center gap-1">
				<Link
					href={`/dashboard/posts/${post.id}`}
					aria-label="Ver post"
					className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
				>
					<Eye size={16} />
				</Link>

				<Link
					href={`/dashboard/posts/${post.id}/edit`}
					aria-label="Editar post"
					className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
				>
					<Edit size={16} />
				</Link>

				<button
					type="button"
					onClick={() => onDelete(post)}
					aria-label="Eliminar post"
					className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-950/40 dark:hover:text-red-400"
				>
					<Trash2 size={16} />
				</button>
			</div>
		</div>
	);
}