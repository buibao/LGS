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
import { ChartCard } from "@/components/design-system/chart-card";
import { EmptyState } from "@/components/design-system/empty-state";
import { InsightCard } from "@/components/design-system/insight-card";

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
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,1fr)]">
      <ChartCard
        title={tDashboard("leadsByDayTitle")}
        description={tDashboard("leadsByDayDescription")}
        icon={<BarChart3 className="h-4 w-4" />}
        contentClassName="h-72 p-3 sm:p-4 md:h-80 md:p-6"
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
      </ChartCard>

      <div className="grid gap-4">
        <ChartCard
          title={tDashboard("leadsBySourceTitle")}
          description={tDashboard("leadsBySourceDescription")}
          icon={<PieChartIcon className="h-4 w-4" />}
          contentClassName="h-64 p-3 sm:p-4 md:h-72 md:p-6"
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
        </ChartCard>

        <ChartCard
          title={tDashboard("statusDistributionTitle")}
          description={tDashboard("statusDistributionDescription")}
          icon={<BarChart3 className="h-4 w-4" />}
          contentClassName="space-y-3 p-3 sm:p-4 md:p-5"
        >
          {statusData.length ? (
            statusData.map((item, index) => (
              <InsightCard
                key={item.status}
                title={item.status}
                value={item.leads.toString()}
                description={tDashboard(`statusDescriptions.${item.status}`)}
                tone="default"
                icon={<span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: statusColors[index % statusColors.length] }} />}
              />
            ))
          ) : (
            <EmptyState title={tEmpty("noChartDataTitle")} description={tEmpty("noChartDataDescription")} />
          )}
        </ChartCard>
      </div>
    </div>
  );
}
