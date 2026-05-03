import { EmptyState } from "@/components/ui/empty-state";
import { SourceTypeBadge } from "@/components/ui/entity-badges";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCampaignPerformance } from "@/lib/analytics";
import { getCurrentWorkspace } from "@/lib/auth";
import { formatDate, formatPercent } from "@/lib/utils";

export default async function CampaignsPage() {
  const { organization } = await getCurrentWorkspace();
  const campaigns = await getCampaignPerformance(organization.id);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Campaigns"
        title="Campaign performance"
        description="Understand which campaigns and sources are creating qualified leads and booked appointments."
      />

      {campaigns.length ? (
        <div className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-3">
            {campaigns.slice(0, 3).map((campaign) => (
              <SectionCard
                key={campaign.id}
                title={campaign.name}
                description="Quick performance snapshot"
                className="h-full"
                contentClassName="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <SourceTypeBadge sourceType={campaign.sourceType} />
                  <span className="text-sm font-semibold text-slate-500">{formatPercent(campaign.conversionRate)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MiniMetric label="Leads" value={campaign.leadCount.toString()} />
                  <MiniMetric label="Booked" value={campaign.bookedLeads.toString()} />
                </div>
                <p className="text-sm leading-7 text-slate-600">
                  {campaign.budget ? `Budget placeholder: $${campaign.budget.toFixed(2)}` : "Budget placeholder: not entered yet."}
                </p>
              </SectionCard>
            ))}
          </div>

          <SectionCard
            title="Campaign source performance"
            description="Review all tracked campaigns, compare conversion rates, and decide where to shift effort or budget."
            contentClassName="p-0"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Source type</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Booked</TableHead>
                  <TableHead>Conversion rate</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Active dates</TableHead>
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
                    <TableCell>{campaign.budget ? `$${campaign.budget.toFixed(2)}` : "Not set"}</TableCell>
                    <TableCell>
                      {campaign.startedAt ? formatDate(campaign.startedAt) : "Start TBD"}
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
          eyebrow="Campaigns"
          title="No campaigns yet"
          description="No campaigns yet. Add campaigns when you want to compare lead quality, booked appointments, and source performance more clearly."
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
