import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DatabaseSetupState } from "@/components/database-setup-state";
import { Topbar } from "@/components/topbar";
import { getCurrentWorkspace } from "@/lib/auth";
import { isDatabaseConnectionError } from "@/lib/errors";

export default async function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  let workspace: Awaited<ReturnType<typeof getCurrentWorkspace>>;

  try {
    workspace = await getCurrentWorkspace();
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      return <DatabaseSetupState />;
    }

    throw error;
  }

  const { organization, membership } = workspace;

  return (
    <div className="dashboard-shell min-h-screen p-3 md:p-6">
      <div className="mx-auto grid max-w-[1480px] gap-4 md:grid-cols-[288px_minmax(0,1fr)] md:gap-5">
        <AppSidebar organizationName={organization.name} />
        <div className="space-y-4">
          <Topbar organizationName={organization.name} role={membership.role} />
          <main className="surface-panel rounded-[32px] border p-5 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.16)] md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
