import { getTranslations } from "next-intl/server";
import { ReportCard } from "@/components/reports/report-card";
import { PageHeader } from "@/components/ui/page-header";
import { getCurrentWorkspace } from "@/lib/auth";
import { generateWeeklyLeadReport } from "@/lib/report-generator";

export default async function ReportsPage() {
  const tReports = await getTranslations("Reports");
  const { organization } = await getCurrentWorkspace();
  const reportData = await generateWeeklyLeadReport(organization.id);

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader
        eyebrow={tReports("pageEyebrow")}
        title={tReports("pageTitle")}
        description={tReports("pageDescription")}
      />
      <ReportCard {...reportData} />
    </div>
  );
}
