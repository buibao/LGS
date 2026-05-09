"use client";

import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { appNavigationItems } from "@/components/navigation-items";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const pathname = usePathname();
  const tNav = useTranslations("Navigation");

  return (
    <nav className="grid gap-2 sm:grid-cols-2 md:grid-cols-1">
      {appNavigationItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center justify-between rounded-[22px] border px-4 py-3 text-[0.95rem] font-medium transition",
              active
                ? "border-[var(--primary)]/20 bg-[linear-gradient(135deg,#0f5f73,#146f85)] text-white shadow-[0_16px_28px_-20px_rgba(15,95,115,0.78)]"
                : "border-transparent bg-white/70 text-slate-700 hover:border-[var(--border)] hover:bg-white hover:text-slate-950",
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4" />
              {tNav(item.label)}
            </div>
            <ChevronRight className={cn("h-4 w-4 transition", active ? "opacity-100" : "opacity-0 group-hover:opacity-60")} />
          </Link>
        );
      })}
    </nav>
  );
}
