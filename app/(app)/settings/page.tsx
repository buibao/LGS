import { getTranslations } from "next-intl/server";
import { BellRing, CreditCard, PlugZap, Users } from "lucide-react";
import { ActionPanel } from "@/components/design-system/action-panel";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { getCurrentWorkspace } from "@/lib/auth";
import { getPublicAppUrl } from "@/lib/app-url";
import { CaptureUrlCopy } from "@/components/settings/capture-url-copy";

export default async function SettingsPage() {
  const tPage = await getTranslations("SettingsPage");
  const { organization, membership } = await getCurrentWorkspace();
  const captureUrl = `${getPublicAppUrl()}/capture/${organization.slug}`;

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
            <ReadOnlyTile title={tPage("businessProfile.businessName")} value={organization.name} badge={tPage("readOnly")} />
            <ReadOnlyTile title={tPage("businessProfile.workspaceSlug")} value={organization.slug} badge={tPage("readOnly")} />
            <ReadOnlyTile title={tPage("businessProfile.industryFit")} value={tPage("businessProfile.industryFitValue")} badge={tPage("comingSoon")} />
            <ReadOnlyTile title={tPage("businessProfile.currentRole")} value={membership.role} badge={tPage("readOnly")} />
          </div>
        </SectionCard>

        <SectionCard title={tPage("publicCapture.title")} description={tPage("publicCapture.description")}>
          <CaptureUrlCopy url={captureUrl} />
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title={tPage("notifications.title")} description={tPage("notifications.description")}>
          <div className="space-y-3">
            <PreferenceTile title={tPage("notifications.dailySummary")} description={tPage("notifications.dailySummaryDescription")} />
            <PreferenceTile title={tPage("notifications.followUpAlerts")} description={tPage("notifications.followUpAlertsDescription")} />
            <PreferenceTile title={tPage("notifications.weeklyReports")} description={tPage("notifications.weeklyReportsDescription")} />
          </div>
        </SectionCard>

        <SectionCard title={tPage("roadmapTitle")} description={tPage("roadmapDescription")}>
          <div className="grid gap-3">
            <RoadmapTile icon={<Users className="h-4 w-4" />} title={tPage("team.title")} description={tPage("team.cardBody")} badge={tPage("comingSoon")} />
            <RoadmapTile icon={<CreditCard className="h-4 w-4" />} title={tPage("subscription.title")} description={tPage("subscription.cardBody")} badge={tPage("comingSoon")} />
            <RoadmapTile icon={<PlugZap className="h-4 w-4" />} title={tPage("integrations.title")} description={tPage("integrations.description")} badge={tPage("planned")} />
          </div>
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

function ReadOnlyTile({
  title,
  value,
  badge,
}: {
  title: string;
  value: string;
  badge: string;
}) {
  return (
    <div className="rounded-[22px] border border-border/70 bg-[var(--secondary)]/35 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <Badge variant="neutral">{badge}</Badge>
      </div>
      <p className="mt-3 break-words text-sm leading-7 text-slate-900">{value}</p>
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

function RoadmapTile({
  icon,
  title,
  description,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}) {
  return (
    <ActionPanel
      icon={icon}
      label={badge}
      title={title}
      description={description}
      tone="neutral"
      className="p-4"
    />
  );
}
