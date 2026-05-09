import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CalendarClock, ClipboardList, FileText, PhoneCall, Sparkles, UserRound } from "lucide-react";
import { ActionPanel } from "@/components/design-system/action-panel";
import { InsightCard } from "@/components/design-system/insight-card";
import { MetricCard } from "@/components/design-system/metric-card";
import { LeadDetailForm } from "@/components/leads/lead-detail-form";
import { EmptyState } from "@/components/ui/empty-state";
import { LeadStatusBadge, SourceTypeBadge } from "@/components/ui/entity-badges";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { getCurrentWorkspace } from "@/lib/auth";
import { getLeadById } from "@/lib/data";
import { formatDate, formatDateTime, formatRelativeDate, timeAgo } from "@/lib/utils";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const tPage = await getTranslations("LeadDetailPage");
  const tLabels = await getTranslations("Labels");
  const tStatus = await getTranslations("LeadStatus");
  const tSource = await getTranslations("LeadSource");
  const [{ organization }, { id }] = await Promise.all([getCurrentWorkspace(), params]);
  const lead = await getLeadById(organization.id, id);

  if (!lead) {
    notFound();
  }

  const suggestedAction =
    lead.status === "NEW"
      ? tPage("suggestedActionNew")
      : lead.followUpAt
        ? tPage("suggestedActionFollowUp")
        : tPage("suggestedActionGeneral");

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={tPage("eyebrow")}
        title={lead.fullName}
        description={tPage("description")}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <LeadStatusBadge status={lead.status} />
            <SourceTypeBadge sourceType={lead.sourceType} />
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard
          title={tPage("summaryTitle")}
          description={tPage("summaryDescription", { date: formatDate(lead.createdAt) })}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <MetricCard title={tLabels("status")} value={tStatus(lead.status)} description={tPage("statusHint")} />
            <MetricCard title={tLabels("source")} value={tSource(lead.sourceType)} description={tPage("sourceHint")} />
            <MetricCard title={tPage("serviceInterest")} value={lead.serviceInterest ?? tPage("generalInquiry")} description={tPage("serviceHint")} />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-2">
            <DetailTile label={tLabels("campaign")} value={lead.campaign?.name ?? tPage("noCampaign")} />
            <DetailTile label={tLabels("created")} value={formatDateTime(lead.createdAt)} />
            <DetailTile label={tPage("updatedLabel")} value={timeAgo(lead.updatedAt)} />
            <DetailTile label={tPage("preferredContactLabel")} value={lead.preferredContactTime ?? tPage("noPreference")} />
          </div>
        </SectionCard>

        <SectionCard title={tPage("suggestedActionTitle")} description={tPage("suggestedActionDescription")}>
          <div className="space-y-4">
            <ActionPanel
              label={tPage("nextBestMove")}
              description={suggestedAction}
              icon={<Sparkles className="h-4 w-4" />}
              tone="accent"
            />
            <LeadDetailForm
              leadId={lead.id}
              defaultStatus={lead.status}
              defaultFollowUpAt={lead.followUpAt ? new Date(lead.followUpAt.getTime() - lead.followUpAt.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
              defaultNotes={lead.notes ?? ""}
            />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionCard title={tPage("contactTitle")} description={tPage("contactDescription")}>
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactTile icon={<PhoneCall className="h-4 w-4" />} label={tLabels("phone")} value={lead.phone} />
            <ContactTile icon={<FileText className="h-4 w-4" />} label={tLabels("email")} value={lead.email ?? tPage("notProvided")} />
            <ContactTile icon={<ClipboardList className="h-4 w-4" />} label={tLabels("campaign")} value={lead.campaign?.name ?? tPage("noCampaign")} />
            <ContactTile icon={<CalendarClock className="h-4 w-4" />} label={tPage("preferredContactLabel")} value={lead.preferredContactTime ?? tPage("noPreference")} />
            <ContactTile icon={<CalendarClock className="h-4 w-4" />} label={tLabels("followUp")} value={lead.followUpAt ? formatRelativeDate(lead.followUpAt) : tPage("noFollowUp")} />
            <ContactTile icon={<UserRound className="h-4 w-4" />} label={tPage("ownerContextLabel")} value={tPage("ownerContextValue")} />
          </div>
        </SectionCard>

        <SectionCard title={tLabels("notes")} description={tPage("notesDescription")}>
          <p className="text-sm leading-7 text-slate-700">
            {lead.notes || tPage("noNotes")}
          </p>
        </SectionCard>
      </div>

      <SectionCard title={tPage("timelineTitle")} description={tPage("timelineDescription")}>
        <div className="space-y-4">
          {lead.activities.length ? (
            lead.activities.map((activity) => (
              <div key={activity.id} className="rounded-[24px] border bg-[var(--secondary)]/45 p-4">
                <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {formatDateTime(activity.createdAt)} | {timeAgo(activity.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <EmptyState title={tPage("timelineEmptyTitle")} description={tPage("timelineEmptyDescription")} />
          )}
        </div>
      </SectionCard>
    </div>
  );
}

function DetailTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[22px] border bg-[var(--secondary)]/45 p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 break-words text-sm leading-7 text-slate-900">{value}</p>
    </div>
  );
}

function ContactTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return <InsightCard title={label} description={value} icon={icon} />;
}
