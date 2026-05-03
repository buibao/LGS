import { ReportCard } from "@/components/reports/report-card";
import { PageHeader } from "@/components/ui/page-header";
import { getCurrentWorkspace } from "@/lib/auth";
import { generateWeeklyLeadReport } from "@/lib/report-generator";

export default async function ReportsPage() {
  const { organization } = await getCurrentWorkspace();
  const reportData = await generateWeeklyLeadReport(organization.id);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Reports"
        title="Weekly Lead Performance Report"
        description="Clear business reporting for lead volume, follow-up risk, and booking performance, even before AI-generated insights are enabled."
      />
      <ReportCard {...reportData} />
    </div>
  );
}
