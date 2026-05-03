import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { getCurrentWorkspace } from "@/lib/auth";

export default async function SettingsPage() {
  const { organization, membership } = await getCurrentWorkspace();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Settings"
        title="Business settings"
        description="A planned settings workspace for profile details, team controls, notifications, subscription management, and future integrations."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Business profile" description="The core information that identifies this workspace for staff and future reporting.">
          <div className="grid gap-4 sm:grid-cols-2">
            <SettingTile label="Business name" value={organization.name} />
            <SettingTile label="Workspace slug" value={organization.slug} />
            <SettingTile label="Industry fit" value="Local service business" />
            <SettingTile label="Current role" value={membership.role} />
          </div>
        </SectionCard>

        <SectionCard title="Team members" description="Invite flows and permission controls are planned so owners can coordinate front-desk staff and managers.">
          <div className="space-y-3 text-sm leading-7 text-slate-600">
            <p>Role visibility is already tracked in the workspace.</p>
            <p>Planned next: invite teammates, assign operational roles, and keep lead follow-up accountability visible.</p>
            <Badge variant="neutral">Placeholder for next milestone</Badge>
          </div>
        </SectionCard>

        <SectionCard title="Notification preferences" description="Future controls for follow-up reminders, daily summaries, and overdue lead alerts.">
          <div className="grid gap-3 sm:grid-cols-2">
            <PreferenceTile label="Daily lead summary" description="Planned email summary for owners and managers." />
            <PreferenceTile label="Overdue follow-up alerts" description="Planned reminders for leads due today or already late." />
            <PreferenceTile label="Booked appointment updates" description="Planned notifications when a lead moves into booked status." />
            <PreferenceTile label="Weekly report delivery" description="Planned scheduled delivery of the weekly performance report." />
          </div>
        </SectionCard>

        <SectionCard title="Subscription" description="A clear placeholder for plan controls, billing history, and usage limits in a future release.">
          <div className="space-y-3 text-sm leading-7 text-slate-600">
            <p>Current plan: Demo workspace</p>
            <p>Starter, Growth, and Custom plans will be managed here once billing is introduced.</p>
            <Badge variant="warning">Coming soon</Badge>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Integrations roadmap" description="Intentional placeholders for the lead sources local businesses commonly rely on.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <IntegrationTile name="Facebook Lead Ads" description="Capture Facebook inquiries directly into the lead queue." />
          <IntegrationTile name="TikTok Lead Generation" description="Sync TikTok campaign leads and compare booking quality by source." />
          <IntegrationTile name="Website Forms" description="Route website inquiries into the same follow-up workflow as paid campaigns." />
          <IntegrationTile name="Zalo OA" description="Track conversations and inquiries from Zalo into a shared booking pipeline." />
        </div>
      </SectionCard>
    </div>
  );
}

function SettingTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-[var(--secondary)]/45 p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-sm leading-7 text-slate-900">{value}</p>
    </div>
  );
}

function PreferenceTile({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-[var(--secondary)]/45 p-4">
      <p className="text-sm font-semibold text-slate-900">{label}</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function IntegrationTile({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-950">{name}</p>
        <Badge variant="neutral">Planned</Badge>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
