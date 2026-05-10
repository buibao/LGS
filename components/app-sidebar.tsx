"use client";

import { SidebarContent } from "@/components/sidebar-content";

export function AppSidebar({ organizationName }: { organizationName: string }) {
  return (
    <aside className="surface-panel w-full rounded-[34px] border border-white/70 p-4 text-[var(--sidebar-foreground)] shadow-[0_26px_60px_-44px_rgba(15,23,42,0.22)] md:sticky md:top-5 md:w-[18.5rem] md:self-start">
      <SidebarContent organizationName={organizationName} />
    </aside>
  );
}
