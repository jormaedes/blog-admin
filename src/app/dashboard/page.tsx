"use client";

import { useEffect, useState } from "react";

import { getPosts, getToken } from "@/lib/api";
import useAuthStore from "@/stores/authStore";
import type { Post } from "@/types/post";
import {
  FileText,
  Heart,
  PenLine,
  Send,
} from "lucide-react";

import StatCard from "@/components/StatCard";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const token = getToken();

        if (!token) return;

        const data = await getPosts(token);

        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const totalPosts = posts.length;

  const publishedPosts = posts.filter(
    (post) => post.published
  ).length;

  const draftPosts = posts.filter(
    (post) => !post.published
  ).length;

  const totalLikes = posts.reduce(
    (total, post) => total + post.likesCount,
    0
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Olá, {user?.firstName}
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Aqui está um resumo do teu blog.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total de posts"
            value={totalPosts}
            icon={FileText}
          />

          <StatCard
            label="Publicados"
            value={publishedPosts}
            icon={Send}
          />

          <StatCard
            label="Rascunhos"
            value={draftPosts}
            icon={PenLine}
          />

          <StatCard
            label="Likes"
            value={totalLikes}
            icon={Heart}
          />
        </div>
      </div>
    </div>
  );
}