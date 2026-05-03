"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionCard } from "@/components/ui/section-card";

const sourceColors = ["#0f766e", "#f97316", "#0284c7", "#16a34a", "#dc2626", "#7c3aed", "#64748b"];
const statusColors = ["#0f766e", "#0284c7", "#f59e0b", "#16a34a", "#f97316", "#dc2626"];

export function DashboardCharts({
  leadsByDay,
  leadsBySource,
  leadsByStatus,
}: {
  leadsByDay: Array<{ date: string; leads: number }>;
  leadsBySource: Array<{ source: string; leads: number }>;
  leadsByStatus: Array<{ status: string; leads: number }>;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
      <SectionCard
        title="Leads by day"
        description="A quick view of daily lead volume so owners can spot momentum changes before the week is over."
        contentClassName="h-80 p-4 md:p-6"
      >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadsByDay}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="leads" radius={[10, 10, 0, 0]} fill="#0f766e" />
            </BarChart>
          </ResponsiveContainer>
      </SectionCard>

      <div className="grid gap-4">
        <SectionCard
          title="Leads by source"
          description="See which channels are driving the most lead volume into the workspace."
          contentClassName="h-72 p-4 md:p-6"
        >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadsBySource.filter((item) => item.leads > 0)} dataKey="leads" nameKey="source" innerRadius={60} outerRadius={90}>
                  {leadsBySource.map((entry, index) => (
                    <Cell key={entry.source} fill={sourceColors[index % sourceColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
        </SectionCard>

        <SectionCard
          title="Lead status distribution"
          description="Understand how much of the pipeline is fresh, active, booked, or at risk of being lost."
          contentClassName="space-y-3"
        >
            {leadsByStatus.map((item, index) => (
              <div key={item.status} className="flex items-center justify-between rounded-2xl bg-[var(--secondary)]/60 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: statusColors[index % statusColors.length] }} />
                  <span className="text-sm font-medium">{item.status}</span>
                </div>
                <span className="text-sm text-[var(--muted-foreground)]">{item.leads}</span>
              </div>
            ))}
        </SectionCard>
      </div>
    </div>
  );
}
