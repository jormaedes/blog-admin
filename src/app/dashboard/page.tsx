import AuthGuard from "@/components/AuthGuard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
    </AuthGuard>
  );
}