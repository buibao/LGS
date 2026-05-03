"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BarChart3, Megaphone, Settings, Sparkles, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/reports", label: "Reports", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar({ organizationName }: { organizationName: string }) {
  const pathname = usePathname();

  return (
    <aside className="surface-panel w-full rounded-[30px] border p-4 text-[var(--sidebar-foreground)] shadow-[0_20px_50px_-36px_rgba(15,23,42,0.16)] md:sticky md:top-6 md:w-72 md:self-start">
      <div className="rounded-[24px] border bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[var(--primary)]">LeadOps AI</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-950">{organizationName}</h2>
          </div>
          <Badge variant="info" className="shrink-0">
            Demo ready
          </Badge>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Keep new inquiries, follow-up promises, and booked appointments visible for the whole front-desk team.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border bg-[var(--secondary)]/70 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Focus</p>
            <p className="mt-2 text-sm font-medium text-slate-900">Leads to bookings</p>
          </div>
          <div className="rounded-2xl border bg-[var(--secondary)]/70 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Priority</p>
            <p className="mt-2 text-sm font-medium text-slate-900">Response speed</p>
          </div>
        </div>
      </div>

      <div className="mt-6 px-2 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Navigation</div>
      <nav className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition",
                active
                  ? "border-[var(--primary)]/20 bg-[var(--primary)] text-white shadow-[0_12px_24px_-18px_rgba(15,95,115,0.7)]"
                  : "border-transparent bg-white/70 text-slate-700 hover:border-[var(--border)] hover:bg-white hover:text-slate-950",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {item.label}
              </div>
              <ArrowUpRight className={cn("h-4 w-4 transition", active ? "opacity-100" : "opacity-0 group-hover:opacity-60")} />
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-[24px] border bg-white p-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">Weekly focus</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Any lead waiting longer than one day risks a missed appointment. Use the dashboard to protect the queue before it cools off.
        </p>
      </div>
    </aside>
  );
}
