"use client";

import { useTranslations } from "next-intl";
import { Building2, Clock3, Sparkles } from "lucide-react";
import { SidebarNav } from "@/components/design-system/sidebar-nav";
import { Badge } from "@/components/ui/badge";

export function AppSidebar({ organizationName }: { organizationName: string }) {
  const tCommon = useTranslations("Common");
  const tShell = useTranslations("AppShell");

  return (
    <aside className="surface-panel w-full rounded-[34px] border border-white/70 p-4 text-[var(--sidebar-foreground)] shadow-[0_26px_60px_-44px_rgba(15,23,42,0.22)] md:sticky md:top-5 md:w-[18.5rem] md:self-start">
      <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,255,0.96))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/85 p-3 text-[var(--primary)] shadow-sm">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--primary)]">
                  {tCommon("appName")}
                </p>
                <p className="mt-1 text-[0.82rem] font-medium text-slate-500">Workspace</p>
              </div>
            </div>
            <Badge variant="info" className="shrink-0 self-start whitespace-nowrap rounded-full px-3 py-1">
              {tShell("demoReady")}
            </Badge>
          </div>

          <div className="min-w-0 space-y-3">
            <h2 className="text-[1.55rem] font-bold leading-[1.15] tracking-[-0.02em] text-slate-950 [overflow-wrap:anywhere]">
              {organizationName}
            </h2>
            <p className="max-w-[26ch] text-[0.95rem] leading-7 text-slate-600">
              {tShell("sidebarDescription")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
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
    </aside>
  );
}
