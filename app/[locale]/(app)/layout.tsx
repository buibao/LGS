import { ReactNode } from "react";
import { AppShell } from "@/components/design-system/app-shell";
import { DatabaseSetupState } from "@/components/database-setup-state";
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

  return <AppShell organizationName={organization.name} role={membership.role}>{children}</AppShell>;
}
