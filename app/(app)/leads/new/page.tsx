import { PageHeader } from "@/components/ui/page-header";
import { LeadForm } from "@/components/leads/lead-form";
import { getCurrentWorkspace } from "@/lib/auth";
import { getCampaignsForOrganization } from "@/lib/data";

export default async function NewLeadPage() {
  const { organization } = await getCurrentWorkspace();
  const campaigns = await getCampaignsForOrganization(organization.id);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Leads"
        title="Add a new lead"
        description="Capture contact details, campaign attribution, and the next follow-up step in one form."
      />
      <LeadForm campaigns={campaigns.map((campaign) => ({ id: campaign.id, name: campaign.name }))} />
    </div>
  );
}
