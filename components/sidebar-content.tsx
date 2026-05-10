"use client";

import { useTranslations } from "next-intl";
import { Building2, Clock3, Sparkles } from "lucide-react";
import { CardHeaderRow } from "@/components/design-system/card-header-row";
import { SidebarNav } from "@/components/design-system/sidebar-nav";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SidebarContent({
  organizationName,
  compact = false,
}: {
  organizationName: string;
  compact?: boolean;
}) {
  const tCommon = useTranslations("Common");
  const tShell = useTranslations("AppShell");

  return (
    <>
      <div
        className={cn(
          "overflow-hidden rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,255,0.96))] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
          compact ? "p-4" : "p-5",
        )}
      >
        <div className={cn("space-y-4", compact && "space-y-3.5")}>
          <div className="flex items-start gap-3">
            <div className="shrink-0 rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/85 p-3 text-[var(--primary)] shadow-sm">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--primary)]">
                  {tCommon("appName")}
                </p>
                <Badge variant="info" size="sm">
                  {tShell("demoReady")}
                </Badge>
              </div>
              <p className="text-[0.95rem] font-semibold text-slate-500">Workspace</p>
            </div>
          </div>

          <div className="min-w-0 space-y-3">
            <h2 className="text-[1.35rem] font-bold leading-[1.15] tracking-[-0.02em] text-slate-950 [overflow-wrap:anywhere] sm:text-[1.5rem]">
              {organizationName}
            </h2>
            <p className="max-w-[30ch] text-[0.92rem] leading-6 text-slate-600">
              {tShell("sidebarDescription")}
            </p>
          </div>

          <div className="grid gap-3 grid-cols-1">
            <div className="rounded-[22px] border border-[var(--border)] bg-[var(--secondary)]/90 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{tShell("focusLabel")}</p>
              <p className="mt-2 text-[1rem] font-semibold leading-7 text-slate-900">{tShell("focusValue")}</p>
            </div>
            <div className="rounded-[22px] border border-[var(--border)] bg-[var(--secondary)]/90 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{tShell("priorityLabel")}</p>
              <p className="mt-2 text-[1rem] font-semibold leading-7 text-slate-900">{tShell("priorityValue")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-2 text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase">{tShell("navigationTitle")}</div>
      <div className="mt-3">
        <SidebarNav />
      </div>

      <div className="mt-6 rounded-[26px] border bg-white/95 p-4">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase">
          <Clock3 className="h-3.5 w-3.5 text-[var(--primary)]" />
          {tShell("weeklyFocusTitle")}
        </div>
        <p className="mt-2 text-[0.92rem] leading-6 text-slate-600">{tShell("weeklyFocusDescription")}</p>
      </div>

      <div className="mt-4 rounded-[26px] border border-[var(--primary)]/10 bg-[var(--primary)]/[0.04] p-4">
        <div className="flex items-center gap-2 text-[0.95rem] font-semibold text-slate-900">
          <Sparkles className="h-4 w-4 text-[var(--primary)]" />
          {tShell("automationTitle")}
        </div>
        <p className="mt-2 text-[0.92rem] leading-6 text-slate-600">{tShell("automationDescription")}</p>
      </div>
    </>
  );
}
