import type { LucideIcon } from "lucide-react";

interface StatCardProps {
	label: string;
	value: number;
	icon: LucideIcon;
}

export default function StatCard({
	label,
	value,
	icon: Icon,
}: StatCardProps) {
	return (
		<div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
			<div className="flex items-center justify-between">
				<p className="text-sm text-gray-500 dark:text-gray-400">
					{label}
				</p>

				<Icon
					size={18}
					className="text-gray-400 dark:text-gray-500"
				/>
			</div>

			<p className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">
				{value}
			</p>
		</div>
	);
}