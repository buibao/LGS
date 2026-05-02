import { CalendarClock, CalendarRange, Target, TrendingUp, Users } from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/charts";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { RecentLeadsTable } from "@/components/dashboard/recent-leads-table";
import { PageHeader } from "@/components/ui/page-header";
import {
  getBookedAppointments,
  getConversionRate,
  getFollowUpNeeded,
  getLeadsByDay,
  getLeadsBySource,
  getLeadsByStatus,
  getNewLeads,
  getTotalLeads,
} from "@/lib/analytics";
import { getCurrentWorkspace } from "@/lib/auth";
import { getDashboardRecentLeads } from "@/lib/data";
import { formatPercent } from "@/lib/utils";
import { leadStatusLabels, sourceTypeLabels } from "@/types";

export default async function DashboardPage() {
  const { organization } = await getCurrentWorkspace();
  const [totalLeads, newLeads, followUpNeeded, bookedAppointments, conversionRate, leadsByDay, leadsBySource, leadsByStatus, recentLeads] =
    await Promise.all([
      getTotalLeads(organization.id),
      getNewLeads(organization.id),
      getFollowUpNeeded(organization.id),
      getBookedAppointments(organization.id),
      getConversionRate(organization.id),
      getLeadsByDay(organization.id),
      getLeadsBySource(organization.id),
      getLeadsByStatus(organization.id),
      getDashboardRecentLeads(organization.id),
    ]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Lead performance at a glance"
        description="Monitor lead volume, campaign performance, booking momentum, and follow-up workload from one workspace."
      />

      <OverviewCards
        items={[
          { label: "Total leads", value: totalLeads.toString(), hint: "All captured opportunities", icon: <Users className="h-5 w-5 text-[var(--primary)]" /> },
          { label: "New leads", value: newLeads.toString(), hint: "Fresh leads waiting for action", icon: <CalendarRange className="h-5 w-5 text-[var(--accent)]" /> },
          { label: "Follow-up needed", value: followUpNeeded.toString(), hint: "Overdue or due today", icon: <CalendarClock className="h-5 w-5 text-amber-600" /> },
          { label: "Booked appointments", value: bookedAppointments.toString(), hint: "Leads moved to booked", icon: <Target className="h-5 w-5 text-emerald-600" /> },
          { label: "Conversion rate", value: formatPercent(conversionRate), hint: "Booked leads / total leads", icon: <TrendingUp className="h-5 w-5 text-cyan-700" /> },
        ]}
      />

      <DashboardCharts
        leadsByDay={leadsByDay}
        leadsBySource={leadsBySource.map((item) => ({
          ...item,
          source: sourceTypeLabels[item.source],
        }))}
        leadsByStatus={leadsByStatus.map((item) => ({
          ...item,
          status: leadStatusLabels[item.status],
        }))}
      />

      <RecentLeadsTable leads={recentLeads} />
    </div>
  );
}
