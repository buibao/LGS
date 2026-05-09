import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const toneClasses = {
  default: "border-[var(--border)] bg-[var(--secondary)]/55",
  success: "border-emerald-200/80 bg-emerald-50/85",
  warning: "border-amber-200/80 bg-amber-50/90",
  info: "border-cyan-200/80 bg-cyan-50/90",
};

export function InsightCard({
  title,
  description,
  icon,
  value,
  tone = "default",
  className,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  value?: string;
  tone?: keyof typeof toneClasses;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border/70 p-5 md:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]", toneClasses[tone], className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="grid min-w-0 flex-1 gap-2">
          <p className="min-w-0 text-[0.98rem] font-semibold leading-snug text-slate-950">{title}</p>
          {value ? (
            <p className="type-kpi min-w-0 break-words text-[1.3rem] leading-tight font-extrabold text-slate-950 sm:text-[1.45rem]">
              {value}
            </p>
          ) : null}
        </div>
        {icon ? <div className="shrink-0 rounded-2xl bg-white/80 p-2 text-[var(--primary)] shadow-sm">{icon}</div> : null}
      </div>
      <p className="mt-3 min-w-0 max-w-[36ch] break-words text-[0.92rem] leading-6 text-slate-600">{description}</p>
    </div>
  );
}
