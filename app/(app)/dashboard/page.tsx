import { CalendarClock, CalendarRange, CheckCircle2, Target, TrendingUp, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DashboardCharts } from "@/components/dashboard/charts";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { RecentLeadsTable } from "@/components/dashboard/recent-leads-table";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
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
import { getAttentionSummary, getDashboardRecentLeads } from "@/lib/data";
import { formatPercent, timeAgo } from "@/lib/utils";
import { leadStatusLabels, sourceTypeLabels } from "@/types";

export default async function DashboardPage() {
  const { organization } = await getCurrentWorkspace();
  const [totalLeads, newLeads, followUpNeeded, bookedAppointments, conversionRate, leadsByDay, leadsBySource, leadsByStatus, recentLeads, attentionSummary] =
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
      getAttentionSummary(organization.id),
    ]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Today’s Lead Overview"
        description="Track new leads, follow-ups, and booked appointments in one place."
      />

      <OverviewCards
        items={[
          {
            label: "Total leads",
            value: totalLeads.toString(),
            hint: "All inquiries currently tracked in this workspace.",
            icon: <Users className="h-5 w-5" />,
            trend: { label: "Pipeline visibility", direction: "neutral" },
          },
          {
            label: "New leads",
            value: newLeads.toString(),
            hint: "Fresh opportunities that should be contacted quickly.",
            icon: <CalendarRange className="h-5 w-5" />,
            trend: { label: "Protect first response", direction: "up" },
          },
          {
            label: "Follow-up needed",
            value: followUpNeeded.toString(),
            hint: "Leads due today or already overdue for follow-up.",
            icon: <CalendarClock className="h-5 w-5" />,
            trend: { label: followUpNeeded > 0 ? "Needs attention" : "Under control", direction: followUpNeeded > 0 ? "down" : "up" },
          },
          {
            label: "Booked appointments",
            value: bookedAppointments.toString(),
            hint: "Leads already converted into confirmed bookings.",
            icon: <Target className="h-5 w-5" />,
            trend: { label: "Booking progress", direction: "up" },
          },
          {
            label: "Conversion rate",
            value: formatPercent(conversionRate),
            hint: "Booked appointments as a share of total tracked leads.",
            icon: <TrendingUp className="h-5 w-5" />,
            trend: { label: "Sales efficiency", direction: "up" },
          },
        ]}
      />

      <SectionCard
        title="What needs attention"
        description="A short action summary so staff know what to do next without digging through the full lead list."
        action={
          <Link href="/leads" className="text-sm font-semibold text-[var(--primary)]">
            Review lead queue
          </Link>
        }
      >
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <AttentionTile
            label="Leads needing follow-up"
            value={attentionSummary.followUpNeeded.toString()}
            text="Any lead waiting too long risks a missed appointment or a cold conversation."
          />
          <AttentionTile
            label="Oldest pending follow-up"
            value={attentionSummary.oldestPendingLead?.fullName ?? "None due"}
            text={
              attentionSummary.oldestPendingLead?.followUpAt
                ? `${timeAgo(attentionSummary.oldestPendingLead.followUpAt)} via ${sourceTypeLabels[attentionSummary.oldestPendingLead.sourceType]}`
                : "No overdue follow-up is currently in the queue."
            }
          />
          <div className="rounded-[24px] border bg-slate-950 p-5 text-white">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              Suggested next action
            </div>
            <p className="mt-3 text-sm leading-7 text-white/85">
              {attentionSummary.followUpNeeded > 0
                ? "Call or message the oldest due lead first, then clear the rest of the overdue follow-up queue before new inquiries pile up."
                : "The follow-up queue looks healthy. Focus on moving new and interested leads toward booked appointments."}
            </p>
          </div>
        </div>
      </SectionCard>

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

function AttentionTile({
  label,
  value,
  text,
}: {
  label: string;
  value: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border bg-[var(--secondary)]/50 p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
    </div>
  );
}
