"use client";

import { useTranslations } from "next-intl";
import { Building2, Clock3, Sparkles } from "lucide-react";
import { SidebarNav } from "@/components/design-system/sidebar-nav";
import { Badge } from "@/components/ui/badge";

export function AppSidebar({ organizationName }: { organizationName: string }) {
  const tCommon = useTranslations("Common");
  const tShell = useTranslations("AppShell");

  return (
    <aside className="surface-panel w-full rounded-[34px] border border-white/70 p-4 text-[var(--sidebar-foreground)] shadow-[0_26px_60px_-44px_rgba(15,23,42,0.22)] md:sticky md:top-5 md:w-[18rem] md:self-start">
      <div className="rounded-[28px] border border-[var(--border)] bg-white/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-3">
            <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--primary)]">{tCommon("appName")}</p>
                  <h2 className="mt-1 line-clamp-2 text-[1.15rem] font-bold leading-tight text-slate-950">{organizationName}</h2>
                </div>
              </div>
            <p className="text-[0.92rem] leading-6 text-slate-600">{tShell("sidebarDescription")}</p>
          </div>
          <Badge variant="info" className="shrink-0">
            {tShell("demoReady")}
          </Badge>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/90 p-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{tShell("focusLabel")}</p>
            <p className="mt-2 text-[0.95rem] font-semibold text-slate-900">{tShell("focusValue")}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/90 p-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{tShell("priorityLabel")}</p>
            <p className="mt-2 text-[0.95rem] font-semibold text-slate-900">{tShell("priorityValue")}</p>
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
