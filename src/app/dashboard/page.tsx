import AuthGuard from "@/components/AuthGuard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <main>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard.</p>
      </main>
    </AuthGuard>
  );
}