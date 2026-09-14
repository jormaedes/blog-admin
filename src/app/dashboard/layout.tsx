import { ReactNode } from "react";

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="flex flex-1">
        <Sidebar />

        <main className="ml-64 min-w-0 flex-1">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}