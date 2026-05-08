"use client";

import { useEffect } from "react";
import { DatabaseSetupState } from "@/components/database-setup-state";
import { Button } from "@/components/ui/button";
import { isDatabaseConnectionError } from "@/lib/errors";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  if (isDatabaseConnectionError(error)) {
    return <DatabaseSetupState />;
  }

  return (
    <div className="dashboard-shell flex min-h-screen items-center justify-center p-4 md:p-6">
      <div className="max-w-lg rounded-[28px] border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Something went wrong</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          LeadOps AI hit an unexpected error while loading this page. Try again, and if the problem persists,
          review the server logs and environment configuration.
        </p>
        <div className="mt-5">
          <Button onClick={reset} type="button">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
