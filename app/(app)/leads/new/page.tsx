import { getTranslations } from "next-intl/server";
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
    <div className="space-y-8">
      <PageHeader
        eyebrow={tPage("eyebrow")}
        title={tPage("title")}
        description={tPage("description")}
        action={<div className="rounded-full border bg-white px-4 py-2 text-sm font-medium text-slate-600">{tActions("createLead")}</div>}
      />
      <LeadForm campaigns={campaigns.map((campaign) => ({ id: campaign.id, name: campaign.name }))} />
    </div>
  );
}
