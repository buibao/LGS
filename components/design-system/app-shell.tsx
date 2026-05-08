import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";

export function AppShell({
  organizationName,
  role,
  children,
}: {
  organizationName: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <div className="dashboard-shell min-h-screen p-3 md:p-6">
      <div className="mx-auto grid max-w-[1480px] gap-4 md:grid-cols-[288px_minmax(0,1fr)] md:gap-5">
        <AppSidebar organizationName={organizationName} />
        <div className="space-y-4">
          <Topbar organizationName={organizationName} role={role} />
          <main className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-sm md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
