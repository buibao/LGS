import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { LeadsTable } from "@/components/leads/leads-table";
import { getCurrentWorkspace } from "@/lib/auth";
import { getLeadsForOrganization } from "@/lib/data";

export default async function LeadsPage() {
  const tActions = await getTranslations("Actions");
  const tEmpty = await getTranslations("EmptyStates");
  const { organization } = await getCurrentWorkspace();
  const leads = await getLeadsForOrganization(organization.id);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Leads"
        title="Lead pipeline"
        description="Search, filter, and manage every incoming lead with clear follow-up visibility and booking progress."
        action={
          <Link href="/leads/new">
            <Button>{tActions("addLead")}</Button>
          </Link>
        }
      />

      {leads.length ? (
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
      ) : (
        <EmptyState
          eyebrow="Leads"
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
