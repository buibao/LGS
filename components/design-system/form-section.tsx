import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FormSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        {description ? <p className="text-sm leading-6 text-[var(--muted-foreground)]">{description}</p> : null}
      </div>
      <div className="grid gap-5">{children}</div>
    </section>
  );
}
