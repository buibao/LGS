import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CardHeaderRow({
  title,
  description,
  badge,
  icon,
  actions,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-start gap-3">
          {icon ? <div className="shrink-0 pt-0.5">{icon}</div> : null}
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex min-w-0 flex-wrap items-start gap-2">
              <div className="min-w-0 flex-1">
                {typeof title === "string" ? (
                  <p className="min-w-0 text-sm font-semibold leading-snug text-slate-950">{title}</p>
                ) : (
                  title
                )}
              </div>
              {badge ? <div className="shrink-0">{badge}</div> : null}
            </div>
            {description ? (
              typeof description === "string" ? (
                <p className="min-w-0 text-sm leading-6 text-slate-600">{description}</p>
              ) : (
                description
              )
            ) : null}
          </div>
        </div>
      </div>
      {actions ? <div className="shrink-0 self-start">{actions}</div> : null}
    </div>
  );
}
