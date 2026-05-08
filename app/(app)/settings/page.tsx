import { getTranslations } from "next-intl/server";
import { BellRing, CreditCard, PlugZap, Users } from "lucide-react";
import { ActionPanel } from "@/components/design-system/action-panel";
import { InsightCard } from "@/components/design-system/insight-card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { getCurrentWorkspace } from "@/lib/auth";
import { getAppUrl } from "@/lib/app-url";
import { CaptureUrlCopy } from "@/components/settings/capture-url-copy";

export default async function SettingsPage() {
  const tPage = await getTranslations("SettingsPage");
  const { organization, membership } = await getCurrentWorkspace();
  const captureUrl = `${getAppUrl()}/capture/${organization.slug}`;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={tPage("eyebrow")}
        title={tPage("title")}
        description={tPage("description")}
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <SectionCard title={tPage("businessProfile.title")} description={tPage("businessProfile.description")}>
          <div className="grid gap-4 sm:grid-cols-2">
            <InsightCard title={tPage("businessProfile.businessName")} description={organization.name} />
            <InsightCard title={tPage("businessProfile.workspaceSlug")} description={organization.slug} />
            <InsightCard title={tPage("businessProfile.industryFit")} description={tPage("businessProfile.industryFitValue")} />
            <InsightCard title={tPage("businessProfile.currentRole")} description={membership.role} />
          </div>
        </SectionCard>

        <SectionCard title={tPage("publicCapture.title")} description={tPage("publicCapture.description")}>
          <CaptureUrlCopy url={captureUrl} />
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title={tPage("team.title")} description={tPage("team.description")}>
          <ActionPanel
            icon={<Users className="h-4 w-4" />}
            label={tPage("placeholder")}
            title={tPage("team.cardTitle")}
            description={tPage("team.cardBody")}
            tone="neutral"
          />
        </SectionCard>

        <SectionCard title={tPage("notifications.title")} description={tPage("notifications.description")}>
          <div className="space-y-3">
            <PreferenceTile title={tPage("notifications.dailySummary")} description={tPage("notifications.dailySummaryDescription")} />
            <PreferenceTile title={tPage("notifications.followUpAlerts")} description={tPage("notifications.followUpAlertsDescription")} />
            <PreferenceTile title={tPage("notifications.weeklyReports")} description={tPage("notifications.weeklyReportsDescription")} />
          </div>
        </SectionCard>

        <SectionCard title={tPage("subscription.title")} description={tPage("subscription.description")}>
          <ActionPanel
            icon={<CreditCard className="h-4 w-4" />}
            label={tPage("comingSoon")}
            title={tPage("subscription.cardTitle")}
            description={tPage("subscription.cardBody")}
            tone="neutral"
          />
        </SectionCard>
      </div>

      <SectionCard title={tPage("integrations.title")} description={tPage("integrations.description")}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <IntegrationTile name={tPage("integrations.facebook")} description={tPage("integrations.facebookDescription")} badge={tPage("planned")} />
          <IntegrationTile name={tPage("integrations.tiktok")} description={tPage("integrations.tiktokDescription")} badge={tPage("planned")} />
          <IntegrationTile name={tPage("integrations.website")} description={tPage("integrations.websiteDescription")} badge={tPage("planned")} />
          <IntegrationTile name={tPage("integrations.zalo")} description={tPage("integrations.zaloDescription")} badge={tPage("planned")} />
        </div>
      </SectionCard>
    </div>
  );
}

function PreferenceTile({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[22px] border bg-[var(--secondary)]/45 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <BellRing className="h-4 w-4 text-[var(--primary)]" />
        {title}
      </div>
      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}


function IntegrationTile({
  name,
  description,
  badge,
}: {
  name: string;
  description: string;
  badge: string;
}) {
  return (
    <div className="rounded-[24px] border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
          <PlugZap className="h-4 w-4 text-[var(--primary)]" />
          {name}
        </div>
        <Badge variant="neutral">{badge}</Badge>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
