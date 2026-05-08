import { AlertCircle, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { EmptyState } from "@/components/design-system/empty-state";
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
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <AlertCircle className="h-4 w-4" />
              {tReports("suggestedAction")}
            </div>
            {suggestedActionsLine ?? tReports("fallbackSuggestedAction")}
          </div>
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
              <Insight title={tReports("bestSource")} text={bestSourceLine ?? tReports("fallbackBestSource")} />
              <Insight title={tReports("followUpRisk")} text={followUpLine ?? tReports("fallbackFollowUpRisk")} />
              <Insight
                title={tReports("bookingPerformance")}
                text={bookingLine ? tReports("bookingPerformanceWithCount", { count: bookingLine }) : tReports("fallbackBookingPerformance")}
              />
              <Insight title={tReports("suggestedAction")} text={suggestedActionsLine ?? tReports("fallbackSuggestedActionDetailed")} />
            </div>
          ) : (
            <EmptyState title={tEmpty("noReportTitle")} description={tEmpty("noReportDescription")} />
          )}

          <div className="rounded-2xl bg-slate-950 p-5 text-white">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <TrendingUp className="h-4 w-4 text-emerald-300" />
              {tReports("readout")}
            </div>
            <p className="mt-3 text-sm leading-7 text-white/88">
              {suggestedActionsLine ?? tReports("fallbackReadout")}
            </p>
          </div>

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

function Insight({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-[var(--secondary)]/45 p-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
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
