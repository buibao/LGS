import { getTranslations } from "next-intl/server";
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

export default async function DashboardPage() {
  const tDashboard = await getTranslations("Dashboard");
  const tStatus = await getTranslations("LeadStatus");
  const tSource = await getTranslations("LeadSource");
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
        eyebrow={tDashboard("eyebrow")}
        title={tDashboard("pageTitle")}
        description={tDashboard("pageDescription")}
      />

      <OverviewCards
        items={[
          {
            label: tDashboard("metrics.totalLeads.label"),
            value: totalLeads.toString(),
            hint: tDashboard("metrics.totalLeads.hint"),
            icon: <Users className="h-5 w-5" />,
            trend: { label: tDashboard("metrics.totalLeads.trend"), direction: "neutral" },
          },
          {
            label: tDashboard("metrics.newLeads.label"),
            value: newLeads.toString(),
            hint: tDashboard("metrics.newLeads.hint"),
            icon: <CalendarRange className="h-5 w-5" />,
            trend: { label: tDashboard("metrics.newLeads.trend"), direction: "up" },
          },
          {
            label: tDashboard("metrics.followUpNeeded.label"),
            value: followUpNeeded.toString(),
            hint: tDashboard("metrics.followUpNeeded.hint"),
            icon: <CalendarClock className="h-5 w-5" />,
            trend: {
              label: followUpNeeded > 0 ? tDashboard("metrics.followUpNeeded.alertTrend") : tDashboard("metrics.followUpNeeded.healthyTrend"),
              direction: followUpNeeded > 0 ? "down" : "up",
            },
          },
          {
            label: tDashboard("metrics.bookedAppointments.label"),
            value: bookedAppointments.toString(),
            hint: tDashboard("metrics.bookedAppointments.hint"),
            icon: <Target className="h-5 w-5" />,
            trend: { label: tDashboard("metrics.bookedAppointments.trend"), direction: "up" },
          },
          {
            label: tDashboard("metrics.conversionRate.label"),
            value: formatPercent(conversionRate),
            hint: tDashboard("metrics.conversionRate.hint"),
            icon: <TrendingUp className="h-5 w-5" />,
            trend: { label: tDashboard("metrics.conversionRate.trend"), direction: "up" },
          },
        ]}
      />

      <SectionCard
        title={tDashboard("attentionTitle")}
        description={tDashboard("attentionDescription")}
        action={
          <Link href="/leads" className="text-sm font-semibold text-[var(--primary)]">
            {tDashboard("reviewLeadQueue")}
          </Link>
        }
      >
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <AttentionTile
            label={tDashboard("attention.followUpNeededLabel")}
            value={attentionSummary.followUpNeeded.toString()}
            text={tDashboard("attention.followUpNeededText")}
          />
          <AttentionTile
            label={tDashboard("attention.oldestPendingLabel")}
            value={attentionSummary.oldestPendingLead?.fullName ?? tDashboard("attention.noneDue")}
            text={
              attentionSummary.oldestPendingLead?.followUpAt
                ? tDashboard("attention.oldestPendingText", {
                    age: timeAgo(attentionSummary.oldestPendingLead.followUpAt),
                    source: tSource(attentionSummary.oldestPendingLead.sourceType),
                  })
                : tDashboard("attention.noOverdueText")
            }
          />
          <div className="rounded-[24px] border bg-slate-950 p-5 text-white">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              {tDashboard("attention.suggestedAction")}
            </div>
            <p className="mt-3 text-sm leading-7 text-white/85">
              {attentionSummary.followUpNeeded > 0
                ? tDashboard("attention.suggestedActionAlert")
                : tDashboard("attention.suggestedActionHealthy")}
            </p>
          </div>
        </div>
      </SectionCard>

      <DashboardCharts
        leadsByDay={leadsByDay}
        leadsBySource={leadsBySource.map((item) => ({
          ...item,
          source: tSource(item.source),
        }))}
        leadsByStatus={leadsByStatus.map((item) => ({
          ...item,
          status: tStatus(item.status),
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
