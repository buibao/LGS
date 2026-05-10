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
    <div className="dashboard-shell min-h-screen px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
      <div className="mx-auto grid w-full max-w-[1440px] gap-4 lg:grid-cols-[296px_minmax(0,1fr)] xl:grid-cols-[304px_minmax(0,1fr)] xl:gap-6">
        <div className="hidden lg:block">
          <AppSidebar organizationName={organizationName} />
        </div>
        <div className="min-w-0 space-y-4 xl:space-y-5">
          <Topbar organizationName={organizationName} role={role} />
          <main className="min-w-0 rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.92)] p-4 shadow-[0_28px_60px_-42px_rgba(15,23,42,0.22)] backdrop-blur sm:p-5 md:p-6 xl:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
