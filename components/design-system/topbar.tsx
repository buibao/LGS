"use client";

import { useState } from "react";
import { Building2, CalendarDays, Menu, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SidebarContent } from "@/components/sidebar-content";
import { LanguageSwitcher } from "@/components/language-switcher";
import { appNavigationItems } from "@/components/navigation-items";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Topbar({
  organizationName,
  role,
}: {
  organizationName: string;
  role: string;
}) {
  const tCommon = useTranslations("Common");
  const tNav = useTranslations("Navigation");
  const tShell = useTranslations("AppShell");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="surface-panel rounded-[26px] border border-white/70 px-4 py-4 shadow-[0_24px_54px_-42px_rgba(15,23,42,0.2)] sm:px-5 md:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-10 w-10 shrink-0 px-0 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={tShell("navigationTitle")}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="hidden rounded-2xl border bg-[var(--secondary)] p-3 text-[var(--primary)] lg:block">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--primary)] uppercase">{tCommon("appName")}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <h2 className="min-w-0 text-[1.15rem] font-bold text-slate-950 [overflow-wrap:anywhere] sm:text-[1.35rem]">{organizationName}</h2>
                <Badge variant="outline" size="sm">{role}</Badge>
                <Badge variant="info" size="sm">{tShell("livePipeline")}</Badge>
              </div>
              <p className="mt-2 max-w-[62ch] text-[0.92rem] leading-6 text-slate-500 sm:text-[0.95rem] sm:leading-7">{tShell("topbarDescription")}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 self-stretch lg:self-auto">
            <Badge variant="outline" size="sm" className="hidden lg:inline-flex gap-2 text-slate-600">
              <CalendarDays className="h-4 w-4 text-[var(--primary)]" />
              {tShell("dailySnapshot")}
            </Badge>
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <Badge variant="warning" size="sm" className="hidden lg:inline-flex">
              {tShell("aiReportingPreview")}
            </Badge>
            <UserButton />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 lg:hidden">
          <div className="overflow-x-auto">
            <nav className="flex min-w-max gap-2 pb-1">
              {appNavigationItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition",
                      active
                        ? "border-[var(--primary)]/20 bg-[var(--primary)] text-white"
                        : "border-[var(--border)] bg-white text-slate-700",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tNav(item.label)}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center justify-between gap-3">
            <LanguageSwitcher className="flex-1" />
            <Badge variant="warning" size="sm">{tShell("aiReportingPreview")}</Badge>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation"
          />
          <div className="absolute inset-0 overflow-y-auto p-3 sm:p-4">
            <div className="surface-panel min-h-full w-full rounded-[30px] border border-white/70 p-4 shadow-[0_28px_60px_-34px_rgba(15,23,42,0.28)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[var(--primary)] uppercase">{tCommon("appName")}</p>
                  <p className="mt-1 text-sm font-medium text-slate-500">{tShell("navigationTitle")}</p>
                </div>
                <Button type="button" variant="outline" size="sm" className="h-10 w-10 px-0" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <SidebarContent organizationName={organizationName} compact />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
