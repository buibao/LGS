"use client";

import { BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { useTranslations } from "next-intl";
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
import { EmptyState } from "@/components/design-system/empty-state";
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
  const tDashboard = useTranslations("Dashboard");
  const tEmpty = useTranslations("EmptyStates");
  const hasTrendData = leadsByDay.some((item) => item.leads > 0);
  const sourceData = leadsBySource.filter((item) => item.leads > 0);
  const statusData = leadsByStatus.filter((item) => item.leads > 0);

  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
      <SectionCard
        title={tDashboard("leadsByDayTitle")}
        description={tDashboard("leadsByDayDescription")}
        contentClassName="h-80 p-4 md:p-6"
      >
        {hasTrendData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadsByDay}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="leads" radius={[10, 10, 0, 0]} fill="#0f766e" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState
            icon={BarChart3}
            title={tEmpty("noChartDataTitle")}
            description={tEmpty("noChartDataDescription")}
            className="flex h-full items-center justify-center"
          />
        )}
      </SectionCard>

      <div className="grid gap-4">
        <SectionCard
          title={tDashboard("leadsBySourceTitle")}
          description={tDashboard("leadsBySourceDescription")}
          contentClassName="h-72 p-4 md:p-6"
        >
          {sourceData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} dataKey="leads" nameKey="source" innerRadius={60} outerRadius={90}>
                  {sourceData.map((entry, index) => (
                    <Cell key={entry.source} fill={sourceColors[index % sourceColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState
              icon={PieChartIcon}
              title={tEmpty("noChartDataTitle")}
              description={tEmpty("noChartDataDescription")}
              className="flex h-full items-center justify-center"
            />
          )}
        </SectionCard>

        <SectionCard
          title={tDashboard("statusDistributionTitle")}
          description={tDashboard("statusDistributionDescription")}
          contentClassName="space-y-3"
        >
          {statusData.length ? (
            statusData.map((item, index) => (
              <div key={item.status} className="flex items-center justify-between rounded-2xl bg-[var(--secondary)]/60 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: statusColors[index % statusColors.length] }} />
                  <span className="text-sm font-medium">{item.status}</span>
                </div>
                <span className="text-sm text-[var(--muted-foreground)]">{item.leads}</span>
              </div>
            ))
          ) : (
            <EmptyState title={tEmpty("noChartDataTitle")} description={tEmpty("noChartDataDescription")} />
          )}
        </SectionCard>
      </div>
    </div>
  );
}
