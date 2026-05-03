import { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">{eyebrow}</p> : null}
        <div className="space-y-1">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 md:text-[2rem]">{title}</h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}
