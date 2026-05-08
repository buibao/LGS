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
    <div className={cn("rounded-[24px] border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]", toneClasses[tone], className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.98rem] font-semibold text-slate-950">{title}</p>
          {value ? <p className="type-kpi mt-2 text-[1.6rem] font-extrabold text-slate-950">{value}</p> : null}
        </div>
        {icon ? <div className="rounded-2xl bg-white/80 p-2 text-[var(--primary)] shadow-sm">{icon}</div> : null}
      </div>
      <p className="mt-2.5 text-[0.92rem] leading-7 text-slate-600">{description}</p>
    </div>
  );
}
