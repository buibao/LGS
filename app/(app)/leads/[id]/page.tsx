import { notFound } from "next/navigation";
import { CalendarClock, ClipboardList, FileText, PhoneCall } from "lucide-react";
import { LeadDetailForm } from "@/components/leads/lead-detail-form";
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
  const [{ organization }, { id }] = await Promise.all([getCurrentWorkspace(), params]);
  const lead = await getLeadById(organization.id, id);

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Lead detail"
        title={lead.fullName}
        description="See who this lead is, what they want, where they came from, and what the team should do next."
      />

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard
          title="Lead profile summary"
          description={`Captured on ${formatDate(lead.createdAt)}. Use this card to understand the customer context before reaching out.`}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SummaryTile label="Lead status">
              <LeadStatusBadge status={lead.status} />
            </SummaryTile>
            <SummaryTile label="Lead source">
              <SourceTypeBadge sourceType={lead.sourceType} />
            </SummaryTile>
            <DetailItem label="Service interest" value={lead.serviceInterest ?? "General inquiry"} />
            <DetailItem label="Campaign" value={lead.campaign?.name ?? "Not linked to a campaign"} />
            <DetailItem label="Created" value={formatDateTime(lead.createdAt)} />
            <DetailItem label="Last updated" value={timeAgo(lead.updatedAt)} />
          </div>
        </SectionCard>

        <SectionCard title="Lead status control" description="Update the stage, timing, and notes so the dashboard stays reliable for the whole team.">
          <div className="space-y-5">
            <div className="rounded-2xl bg-[var(--secondary)]/60 p-4 text-sm leading-7 text-slate-600">
              Best practice: every active lead should either have a next follow-up date or be clearly marked as booked, lost, or no response.
            </div>
            <LeadDetailForm
              leadId={lead.id}
              defaultStatus={lead.status}
              defaultFollowUpAt={lead.followUpAt ? new Date(lead.followUpAt.getTime() - lead.followUpAt.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
              defaultNotes={lead.notes ?? ""}
            />
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Contact information" description="Make it easy for staff to know how to reach the lead and what they are asking for.">
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactTile icon={<PhoneCall className="h-4 w-4" />} label="Phone" value={lead.phone} />
            <ContactTile icon={<FileText className="h-4 w-4" />} label="Email" value={lead.email ?? "Not provided"} />
            <ContactTile icon={<ClipboardList className="h-4 w-4" />} label="Campaign" value={lead.campaign?.name ?? "No linked campaign"} />
            <ContactTile
              icon={<CalendarClock className="h-4 w-4" />}
              label="Next follow-up"
              value={lead.followUpAt ? formatRelativeDate(lead.followUpAt) : "No follow-up scheduled"}
            />
          </div>
        </SectionCard>

        <SectionCard title="Notes" description="Useful handoff context, customer intent, and conversation history.">
          <p className="text-sm leading-7 text-slate-700">
            {lead.notes || "No notes yet. Add context to keep handoffs clean and help the next staff member respond with confidence."}
          </p>
        </SectionCard>
      </div>

      <SectionCard title="Activity timeline" description="A lightweight CRM-style history of what has happened and what was scheduled next.">
        <div className="space-y-4">
          {lead.activities.length ? (
            lead.activities.map((activity) => (
              <div key={activity.id} className="rounded-2xl border bg-[var(--secondary)]/45 p-4">
                <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {formatDateTime(activity.createdAt)} - {timeAgo(activity.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">Timeline will populate as the team creates notes, follow-ups, and status changes.</p>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

function SummaryTile({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 rounded-2xl border bg-[var(--secondary)]/45 p-4">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <div>{children}</div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2 rounded-2xl border bg-[var(--secondary)]/45 p-4">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <p className="text-sm text-slate-600">{value}</p>
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
  return (
    <div className="rounded-2xl border bg-[var(--secondary)]/45 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <span className="rounded-xl bg-white p-2 text-[var(--primary)]">{icon}</span>
        {label}
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-600">{value}</p>
    </div>
  );
}
