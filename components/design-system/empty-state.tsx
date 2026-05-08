import { ReactNode } from "react";
import { LucideIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[24px] border border-dashed border-[var(--border)] bg-white px-6 py-10 text-center shadow-sm", className)}>
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)]">
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h2>
          <p className="text-sm leading-7 text-[var(--muted-foreground)]">{description}</p>
        </div>
        {action}
      </div>
    </div>
  );
}
