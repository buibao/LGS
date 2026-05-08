import { getTranslations } from "next-intl/server";
import { BarChart3, Coins, Trophy } from "lucide-react";
import { MetricCard } from "@/components/design-system/metric-card";
import { EmptyState } from "@/components/ui/empty-state";
import { SourceTypeBadge } from "@/components/ui/entity-badges";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCampaignPerformance } from "@/lib/analytics";
import { getCurrentWorkspace } from "@/lib/auth";
import { formatDate, formatPercent } from "@/lib/utils";

export default async function CampaignsPage() {
  const tEmpty = await getTranslations("EmptyStates");
  const tPage = await getTranslations("CampaignsPage");
  const { organization } = await getCurrentWorkspace();
  const campaigns = await getCampaignPerformance(organization.id);
  const totalLeads = campaigns.reduce((sum, campaign) => sum + campaign.leadCount, 0);
  const totalBooked = campaigns.reduce((sum, campaign) => sum + campaign.bookedLeads, 0);
  const bestCampaign = [...campaigns].sort((a, b) => b.conversionRate - a.conversionRate)[0];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={tPage("eyebrow")}
        title={tPage("title")}
        description={tPage("description")}
      />

      {campaigns.length ? (
        <div className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-3">
            <MetricCard title={tPage("summary.totalLeads")} value={totalLeads.toString()} description={tPage("summary.totalLeadsHint")} icon={<BarChart3 className="h-5 w-5" />} />
            <MetricCard title={tPage("summary.bookedLeads")} value={totalBooked.toString()} description={tPage("summary.bookedLeadsHint")} icon={<Trophy className="h-5 w-5" />} />
            <MetricCard
              title={tPage("summary.bestCampaign")}
              value={bestCampaign?.name ?? tPage("notAvailable")}
              description={bestCampaign ? tPage("summary.bestCampaignHint", { rate: formatPercent(bestCampaign.conversionRate) }) : tPage("summary.bestCampaignEmpty")}
              icon={<Coins className="h-5 w-5" />}
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {campaigns.slice(0, 3).map((campaign) => (
              <SectionCard
                key={campaign.id}
                title={campaign.name}
                description={tPage("snapshotDescription")}
                className="h-full"
                contentClassName="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <SourceTypeBadge sourceType={campaign.sourceType} />
                  <span className="text-sm font-semibold text-slate-500">{formatPercent(campaign.conversionRate)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MiniMetric label={tPage("table.leads")} value={campaign.leadCount.toString()} />
                  <MiniMetric label={tPage("table.booked")} value={campaign.bookedLeads.toString()} />
                </div>
                <p className="text-sm leading-7 text-slate-600">
                  {campaign.budget ? tPage("budgetValue", { value: campaign.budget.toFixed(2) }) : tPage("budgetEmpty")}
                </p>
              </SectionCard>
            ))}
          </div>

          <SectionCard
            title={tPage("tableTitle")}
            description={tPage("tableDescription")}
            contentClassName="p-0"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{tPage("table.campaign")}</TableHead>
                  <TableHead>{tPage("table.sourceType")}</TableHead>
                  <TableHead>{tPage("table.leads")}</TableHead>
                  <TableHead>{tPage("table.booked")}</TableHead>
                  <TableHead>{tPage("table.conversionRate")}</TableHead>
                  <TableHead>{tPage("table.budget")}</TableHead>
                  <TableHead>{tPage("table.activeDates")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium text-slate-900">{campaign.name}</TableCell>
                    <TableCell>
                      <SourceTypeBadge sourceType={campaign.sourceType} />
                    </TableCell>
                    <TableCell>{campaign.leadCount}</TableCell>
                    <TableCell>{campaign.bookedLeads}</TableCell>
                    <TableCell>{formatPercent(campaign.conversionRate)}</TableCell>
                    <TableCell>{campaign.budget ? `$${campaign.budget.toFixed(2)}` : tPage("notSet")}</TableCell>
                    <TableCell>
                      {campaign.startedAt ? formatDate(campaign.startedAt) : tPage("startTbd")}
                      {campaign.endedAt ? ` - ${formatDate(campaign.endedAt)}` : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>
        </div>
      ) : (
        <EmptyState
          eyebrow={tPage("eyebrow")}
          title={tEmpty("noCampaignsTitle")}
          description={tEmpty("noCampaignsDescription")}
        />
      )}
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-[var(--secondary)]/45 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}
