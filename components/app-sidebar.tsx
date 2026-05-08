"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Building2, Clock3, Sparkles } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { appNavigationItems } from "@/components/navigation-items";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AppSidebar({ organizationName }: { organizationName: string }) {
  const pathname = usePathname();
  const tCommon = useTranslations("Common");
  const tNav = useTranslations("Navigation");
  const tShell = useTranslations("AppShell");

  return (
    <aside className="surface-panel w-full rounded-[34px] border border-white/70 p-4 text-[var(--sidebar-foreground)] shadow-[0_26px_60px_-44px_rgba(15,23,42,0.22)] md:sticky md:top-5 md:w-76 md:self-start">
      <div className="rounded-[28px] border border-[var(--border)] bg-white/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[var(--secondary)] p-3 text-[var(--primary)]">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[var(--primary)]">{tCommon("appName")}</p>
                <h2 className="mt-1 text-xl font-semibold leading-tight text-slate-950">{organizationName}</h2>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-600">{tShell("sidebarDescription")}</p>
          </div>
          <Badge variant="info" className="shrink-0">
            {tShell("demoReady")}
          </Badge>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/90 p-3.5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{tShell("focusLabel")}</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{tShell("focusValue")}</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/90 p-3.5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{tShell("priorityLabel")}</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{tShell("priorityValue")}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 px-2 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">{tShell("navigationTitle")}</div>
      <nav className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-1">
        {appNavigationItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-[22px] border px-4 py-3.5 text-sm font-medium transition",
                active
                  ? "border-[var(--primary)]/20 bg-[linear-gradient(135deg,#0f5f73,#146f85)] text-white shadow-[0_16px_28px_-20px_rgba(15,95,115,0.78)]"
                  : "border-transparent bg-white/70 text-slate-700 hover:border-[var(--border)] hover:bg-white hover:text-slate-950",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {tNav(item.label)}
              </div>
              <ArrowUpRight className={cn("h-4 w-4 transition", active ? "opacity-100" : "opacity-0 group-hover:opacity-60")} />
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-[26px] border bg-white/95 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
          <Clock3 className="h-3.5 w-3.5 text-[var(--primary)]" />
          {tShell("weeklyFocusTitle")}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{tShell("weeklyFocusDescription")}</p>
      </div>

      <div className="mt-4 rounded-[26px] border border-[var(--primary)]/10 bg-[var(--primary)]/[0.04] p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Sparkles className="h-4 w-4 text-[var(--primary)]" />
          {tShell("automationTitle")}
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{tShell("automationDescription")}</p>
      </div>
    </aside>
  );
}
