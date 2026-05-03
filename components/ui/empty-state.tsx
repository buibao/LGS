import { ReactNode } from "react";
import { LucideIcon, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  action,
  eyebrow,
  icon: Icon = Sparkles,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  eyebrow?: string;
  icon?: LucideIcon;
}) {
  return (
    <Card className="surface-panel overflow-hidden border-dashed">
      <CardContent className="flex min-h-56 flex-col items-center justify-center gap-4 px-6 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)]">
          <Icon className="h-6 w-6" />
        </div>
        {eyebrow ? <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">{eyebrow}</p> : null}
        <div className="text-xl font-semibold tracking-tight">{title}</div>
        <p className="max-w-md text-sm leading-7 text-[var(--muted-foreground)]">{description}</p>
        {action}
      </CardContent>
    </Card>
  );
}
