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
    <header className="flex flex-col gap-4 rounded-[28px] border bg-white/80 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">Workspace</p>
        <div className="mt-1 flex items-center gap-3">
          <h2 className="text-xl font-semibold">{organizationName}</h2>
          <Badge variant="info">{role}</Badge>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="warning">Weekly AI report demo</Badge>
        <UserButton />
      </div>
    </header>
  );
}
