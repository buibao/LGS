import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { LeadForm } from "@/components/leads/lead-form";
import { getCurrentWorkspace } from "@/lib/auth";
import { getCampaignsForOrganization } from "@/lib/data";

export default async function NewLeadPage() {
  const tPage = await getTranslations("NewLeadPage");
  const tActions = await getTranslations("Actions");
  const { organization } = await getCurrentWorkspace();
  const campaigns = await getCampaignsForOrganization(organization.id);

  return (
    <div className="space-y-6 xl:space-y-8">
      <PageHeader
        eyebrow={tPage("eyebrow")}
        title={tPage("title")}
        description={tPage("description")}
        action={<Badge variant="outline" size="sm">{tActions("createLead")}</Badge>}
      />
      <LeadForm campaigns={campaigns.map((campaign) => ({ id: campaign.id, name: campaign.name }))} />
    </div>
  );
}
