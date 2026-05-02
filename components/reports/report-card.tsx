import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <CardHeader>
          <CardTitle>Weekly summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Metric label="Total leads this week" value={weeklyLeads.toString()} />
          <Metric label="Best source" value={bestSource ?? "N/A"} />
          <Metric label="Booked leads" value={bookedLeads.toString()} />
          <Metric label="Follow-up warnings" value={followUpNeeded.toString()} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Generated report</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{report}</pre>
        </CardContent>
      </Card>
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
