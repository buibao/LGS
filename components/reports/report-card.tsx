import { AlertCircle, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/ui/section-card";

export function ReportCard({
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
      <SectionCard
        title="Executive summary"
        description="A quick operating summary for owners who want direction on lead flow, booking performance, and follow-up risk."
      >
        <div className="space-y-4">
          <Metric label="Total leads this week" value={weeklyLeads.toString()} />
          <Metric label="Best source" value={bestSource ?? "N/A"} />
          <Metric label="Booked appointments" value={bookedLeads.toString()} />
          <Metric label="Follow-up risk" value={followUpNeeded.toString()} />
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <AlertCircle className="h-4 w-4" />
              Suggested next action
            </div>
            {suggestedActionsLine ?? "Keep an eye on delayed responses and protect follow-up speed."}
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Weekly Lead Performance Report"
        description="Deterministic reporting for demo use today, designed to become AI-generated in a future release."
        action={<Badge variant="neutral">Business summary</Badge>}
      >
        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-2">
            <Insight title="Best source" text={bestSourceLine ?? "No clear leader yet. Keep testing the channels that bring qualified inquiries."} />
            <Insight title="Follow-up risk" text={followUpLine ?? "No follow-up risk detected this week."} />
            <Insight title="Booking performance" text={bookingLine ? `${bookingLine} booked appointments were recorded this week.` : "No bookings recorded this week yet."} />
            <Insight
              title="Suggested action"
              text={suggestedActionsLine ?? "Speed up response time for fresh leads and review any stage where leads are stalling."}
            />
          </div>

          <div className="rounded-2xl bg-slate-950 p-5 text-white">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <TrendingUp className="h-4 w-4 text-emerald-300" />
              LeadOps AI readout
            </div>
            <p className="mt-3 text-sm leading-7 text-white/88">
              {suggestedActionsLine ??
                "Prioritize response speed and the best-performing source while overdue follow-ups are still recoverable."}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ArrowRight className="h-4 w-4 text-[var(--primary)]" />
              Full report
            </div>
            <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{report}</pre>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-[var(--secondary)] px-4 py-3 text-sm text-slate-600">
            <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            AI-generated reporting will be available in a future version.
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
