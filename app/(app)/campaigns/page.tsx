import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCampaignPerformance } from "@/lib/analytics";
import { getCurrentWorkspace } from "@/lib/auth";
import { formatPercent } from "@/lib/utils";
import { sourceTypeLabels } from "@/types";

export default async function CampaignsPage() {
  const { organization } = await getCurrentWorkspace();
  const campaigns = await getCampaignPerformance(organization.id);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Campaigns"
        title="Source and campaign tracking"
        description="Compare lead volume and conversion quality by campaign before adjusting budget."
      />

      {campaigns.length ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Source type</TableHead>
                  <TableHead>Leads</TableHead>
                  <TableHead>Booked</TableHead>
                  <TableHead>Conversion rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium text-slate-900">{campaign.name}</TableCell>
                    <TableCell>
                      <Badge variant="info">{sourceTypeLabels[campaign.sourceType]}</Badge>
                    </TableCell>
                    <TableCell>{campaign.leadCount}</TableCell>
                    <TableCell>{campaign.bookedLeads}</TableCell>
                    <TableCell>{formatPercent(campaign.conversionRate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          title="No campaigns yet"
          description="Seeded data adds demo campaigns automatically, but you can also start simple and assign leads to sources without a named campaign."
        />
      )}
    </div>
  );
}
