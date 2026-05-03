import { CalendarDays, Building2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";

export function Topbar({
  organizationName,
  role,
}: {
  organizationName: string;
  role: string;
}) {
  return (
    <header className="surface-panel flex flex-col gap-4 rounded-[30px] border px-5 py-4 shadow-[0_18px_45px_-36px_rgba(15,23,42,0.18)] md:flex-row md:items-center md:justify-between md:px-6">
      <div className="flex items-start gap-3">
        <div className="hidden rounded-2xl border bg-[var(--secondary)] p-3 text-[var(--primary)] md:block">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">Workspace</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold text-slate-950">{organizationName}</h2>
            <Badge variant="info">{role}</Badge>
            <Badge variant="neutral">Live pipeline</Badge>
          </div>
          <p className="mt-2 text-sm text-slate-500">Track lead intake, team follow-up pressure, and booking momentum from one clear operating view.</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border bg-[var(--secondary)]/60 px-3 py-2 text-sm text-slate-600 md:flex">
          <CalendarDays className="h-4 w-4 text-[var(--primary)]" />
          Daily operating snapshot
        </div>
        <Badge variant="warning">AI reporting preview</Badge>
        <UserButton />
      </div>
    </header>
  );
}
