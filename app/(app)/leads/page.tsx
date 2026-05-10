import { getTranslations } from "next-intl/server";
import { ClipboardList, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { MetricCard } from "@/components/design-system/metric-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { LeadsTable } from "@/components/leads/leads-table";
import { getCurrentWorkspace } from "@/lib/auth";
import { getLeadsForOrganization } from "@/lib/data";

export default async function LeadsPage() {
  const tActions = await getTranslations("Actions");
  const tEmpty = await getTranslations("EmptyStates");
  const tPage = await getTranslations("LeadsPage");
  const { organization } = await getCurrentWorkspace();
  const leads = await getLeadsForOrganization(organization.id);
  const activeLeads = leads.filter((lead) => lead.status !== "BOOKED" && lead.status !== "LOST").length;
  const followUpNeeded = leads.filter((lead) => lead.followUpAt && lead.followUpAt <= new Date()).length;

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader
        eyebrow={tPage("eyebrow")}
        title={tPage("title")}
        description={tPage("description")}
        action={
          <Link href="/leads/new">
            <Button>{tActions("addLead")}</Button>
          </Link>
        }
      />

      {leads.length ? (
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title={tPage("stats.activePipeline")}
              value={activeLeads.toString()}
              description={tPage("stats.activePipelineHint")}
              icon={<Users className="h-5 w-5" />}
            />
            <MetricCard
              title={tPage("stats.followUpNeeded")}
              value={followUpNeeded.toString()}
              description={followUpNeeded > 0 ? tPage("stats.followUpNeededAlert") : tPage("stats.followUpNeededHealthy")}
              icon={<ClipboardList className="h-5 w-5" />}
              trend={{ label: followUpNeeded > 0 ? tPage("stats.followUpNeededTrendAlert") : tPage("stats.followUpNeededTrendHealthy"), direction: followUpNeeded > 0 ? "down" : "up" }}
            />
          </div>

          <LeadsTable
            rows={leads.map((lead) => ({
              id: lead.id,
              fullName: lead.fullName,
              phone: lead.phone,
              email: lead.email,
              sourceType: lead.sourceType,
              status: lead.status,
              followUpAt: lead.followUpAt?.toISOString() ?? null,
              createdAt: lead.createdAt.toISOString(),
              campaignName: lead.campaign?.name ?? null,
              serviceInterest: lead.serviceInterest ?? null,
            }))}
          />
        </div>
      ) : (
        <EmptyState
          eyebrow={tPage("eyebrow")}
          title={tEmpty("noLeadsTitle")}
          description={tEmpty("noLeadsDescription")}
          action={
            <Link href="/leads/new">
              <Button>{tActions("addLead")}</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
