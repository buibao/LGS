"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Megaphone, Settings, Sparkles, Users } from "lucide-react";
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
    <aside className="w-full rounded-[28px] bg-[var(--sidebar)] p-4 text-[var(--sidebar-foreground)] md:sticky md:top-4 md:w-72 md:self-start">
      <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-white/60">LeadOps AI</p>
            <h2 className="mt-2 text-2xl font-semibold">{organizationName}</h2>
          </div>
          <Badge className="bg-white/10 text-white" variant="default">
            MVP
          </Badge>
        </div>
        <p className="mt-3 text-sm text-white/70">
          Lightweight lead operations for clinics, spas, beauty centers, and education teams.
        </p>
      </div>

      <nav className="mt-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active ? "bg-white text-slate-900" : "text-white/76 hover:bg-white/8 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
