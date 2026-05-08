import { AlertCircle, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ActionPanel } from "@/components/design-system/action-panel";
import { EmptyState } from "@/components/design-system/empty-state";
import { InsightCard } from "@/components/design-system/insight-card";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/ui/section-card";

export async function ReportCard({
  report,
  weeklyLeads,
  bestSource,
  bookedLeads,
  followUpNeeded,
}: {
  report: string;
  weeklyLeads: number;
  bestSource: string | null;
  bookedLeads: number;
  followUpNeeded: number;
}) {
  const tEmpty = await getTranslations("EmptyStates");
  const tReports = await getTranslations("Reports");
  const reportLines = report
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const suggestedActionsLine = reportLines.find((line) => line.startsWith("Suggested actions:"))?.replace("Suggested actions: ", "");
  const followUpLine = reportLines.find((line) => line.startsWith("Follow-up warnings:"))?.replace("Follow-up warnings: ", "");
  const bestSourceLine = reportLines.find((line) => line.startsWith("Best-performing source:"))?.replace("Best-performing source: ", "");
  const bookingLine = reportLines.find((line) => line.startsWith("Booked leads this week:"))?.replace("Booked leads this week: ", "");

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <SectionCard title={tReports("summaryTitle")} description={tReports("summaryDescription")}>
        <div className="space-y-4">
          <Metric label={tReports("metrics.totalLeads")} value={weeklyLeads.toString()} />
          <Metric label={tReports("metrics.bestSource")} value={bestSource ?? tReports("notAvailable")} />
          <Metric label={tReports("metrics.bookedAppointments")} value={bookedLeads.toString()} />
          <Metric label={tReports("metrics.followUpRisk")} value={followUpNeeded.toString()} />
          <ActionPanel
            label={tReports("suggestedAction")}
            description={suggestedActionsLine ?? tReports("fallbackSuggestedAction")}
            icon={<AlertCircle className="h-4 w-4" />}
            tone="accent"
          />
        </div>
      </SectionCard>

      <SectionCard
        title={tReports("fullReportTitle")}
        description={tReports("fullReportDescription")}
        action={<Badge variant="neutral">{tReports("businessSummary")}</Badge>}
      >
        <div className="space-y-5">
          {weeklyLeads > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              <InsightCard title={tReports("bestSource")} description={bestSourceLine ?? tReports("fallbackBestSource")} tone="info" />
              <InsightCard title={tReports("followUpRisk")} description={followUpLine ?? tReports("fallbackFollowUpRisk")} tone="warning" />
              <InsightCard
                title={tReports("bookingPerformance")}
                description={bookingLine ? tReports("bookingPerformanceWithCount", { count: bookingLine }) : tReports("fallbackBookingPerformance")}
                tone="success"
              />
              <InsightCard title={tReports("suggestedAction")} description={suggestedActionsLine ?? tReports("fallbackSuggestedActionDetailed")} />
            </div>
          ) : (
            <EmptyState title={tEmpty("noReportTitle")} description={tEmpty("noReportDescription")} />
          )}

          <ActionPanel
            label={tReports("readout")}
            description={suggestedActionsLine ?? tReports("fallbackReadout")}
            icon={<TrendingUp className="h-4 w-4" />}
            tone="dark"
          />

          <div className="rounded-2xl border bg-white p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ArrowRight className="h-4 w-4 text-[var(--primary)]" />
              {tReports("fullReport")}
            </div>
            <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{report}</pre>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-[var(--secondary)] px-4 py-3 text-sm text-slate-600">
            <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            {tReports("futureAi")}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[var(--secondary)]/60 p-4">
      <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
