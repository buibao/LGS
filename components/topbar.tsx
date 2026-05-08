"use client";

import { CalendarDays, Building2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { appNavigationItems } from "@/components/navigation-items";
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

  return (
    <header className="surface-panel rounded-[30px] border border-white/70 px-4 py-4 shadow-[0_24px_54px_-42px_rgba(15,23,42,0.2)] md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="hidden rounded-2xl border bg-[var(--secondary)] p-3 text-[var(--primary)] md:block">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">{tCommon("appName")}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold text-slate-950">{organizationName}</h2>
              <Badge variant="info">{role}</Badge>
              <Badge variant="neutral">{tShell("livePipeline")}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-500">{tShell("topbarDescription")}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border bg-[var(--secondary)]/60 px-3 py-2 text-sm text-slate-600 lg:flex">
            <CalendarDays className="h-4 w-4 text-[var(--primary)]" />
            {tShell("dailySnapshot")}
          </div>
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Badge variant="warning" className="hidden lg:inline-flex">
            {tShell("aiReportingPreview")}
          </Badge>
          <UserButton />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:hidden">
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
          <Badge variant="warning">{tShell("aiReportingPreview")}</Badge>
        </div>
      </div>
    </header>
  );
}
