import { PageHeader } from "@/components/ui/page-header";
import { getCurrentWorkspace } from "@/lib/auth";
import { generateWeeklyLeadReport } from "@/lib/report-generator";
import { ReportCard } from "@/components/reports/report-card";

export default async function ReportsPage() {
  const { organization } = await getCurrentWorkspace();
  const reportData = await generateWeeklyLeadReport(organization.id);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Reports"
        title="Weekly AI-style summary"
        description="This MVP uses deterministic local logic today, with a clear path to future OpenAI or Vercel AI SDK generated reporting."
      />
      <ReportCard {...reportData} />
    </div>
  );
}
