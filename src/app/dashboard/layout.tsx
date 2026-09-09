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
      <div>
        <Sidebar />

        <main>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}