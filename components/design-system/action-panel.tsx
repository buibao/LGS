import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ActionPanel({
  label,
  title,
  description,
  icon,
  tone = "dark",
  footer,
  className,
}: {
  label: string;
  title?: string;
  description: string;
  icon?: ReactNode;
  tone?: "dark" | "accent" | "neutral";
  footer?: ReactNode;
  className?: string;
}) {
  const toneClassName =
    tone === "accent"
      ? "border-[var(--primary)]/10 bg-[linear-gradient(180deg,rgba(15,95,115,0.08),rgba(15,95,115,0.03))] text-slate-900"
      : tone === "neutral"
        ? "border-[var(--border)] bg-[var(--secondary)]/60 text-slate-900"
        : "border-slate-900/5 bg-slate-950 text-white";

  const bodyClassName = tone === "dark" ? "text-white/84" : "text-slate-600";
  const labelClassName = tone === "dark" ? "text-white/72" : "text-slate-700";
  const titleClassName = tone === "dark" ? "text-white" : "text-slate-950";

  return (
    <div className={cn("rounded-[26px] border p-5 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.18)]", toneClassName, className)}>
      <div className="flex items-start gap-3">
        {icon ? (
          <div className={cn("rounded-2xl p-2.5", tone === "dark" ? "bg-white/10 text-emerald-300" : "bg-white text-[var(--primary)]")}>
            {icon}
          </div>
        ) : null}
        <div className="min-w-0 space-y-2">
          <p className={cn("text-[0.8rem] font-bold tracking-[0.14em] uppercase", labelClassName)}>{label}</p>
          {title ? <h3 className={cn("text-[1.12rem] font-semibold", titleClassName)}>{title}</h3> : null}
          <p className={cn("text-[0.95rem] leading-7", bodyClassName)}>{description}</p>
        </div>
      </div>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
}
