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
    <div className="dashboard-shell min-h-screen px-3 py-3 md:px-5 md:py-5 xl:px-6 xl:py-6">
      <div className="mx-auto grid max-w-[1540px] gap-4 md:grid-cols-[304px_minmax(0,1fr)] xl:gap-6">
        <div className="hidden md:block">
          <AppSidebar organizationName={organizationName} />
        </div>
        <div className="space-y-4 xl:space-y-5">
          <Topbar organizationName={organizationName} role={role} />
          <main className="rounded-[32px] border border-[var(--border)] bg-[rgba(255,255,255,0.92)] p-4 shadow-[0_28px_60px_-42px_rgba(15,23,42,0.22)] backdrop-blur md:p-7 xl:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
