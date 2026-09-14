import { ReactNode } from "react";

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="ml-64 flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}