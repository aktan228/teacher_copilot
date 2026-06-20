import { DashboardShell } from "@/components/dashboard-shell";
import { hasApiKey } from "@/lib/ai/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Detected on the server so the UI can show "Demo mode" vs "Live AI".
  return <DashboardShell demoMode={!hasApiKey()}>{children}</DashboardShell>;
}
