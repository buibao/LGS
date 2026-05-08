import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
  className,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <div className={cn("rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,251,255,0.9))] p-5 shadow-[0_20px_45px_-36px_rgba(15,23,42,0.18)] md:p-6", className)}>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0 space-y-3.5">
          {breadcrumbs?.length ? (
            <nav className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] text-[var(--muted-foreground)] uppercase" aria-label="Breadcrumb">
              {breadcrumbs.map((item, index) => (
                <div key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                  {index > 0 ? <ChevronRight className="h-3.5 w-3.5" /> : null}
                  {item.href ? (
                    <a href={item.href} className="transition hover:text-slate-900">
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-slate-700">{item.label}</span>
                  )}
                </div>
              ))}
            </nav>
          ) : null}

          <div className="space-y-2">
            <h1 className="text-balance text-[2rem] font-extrabold text-slate-950 md:text-[2.45rem]">{title}</h1>
            {description ? <p className="max-w-3xl text-[0.95rem] leading-7 text-[var(--muted-foreground)] md:text-base">{description}</p> : null}
          </div>
        </div>

        {actions ? <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">{actions}</div> : null}
      </div>
    </div>
  );
}
