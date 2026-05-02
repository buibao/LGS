import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { LeadDetailForm } from "@/components/leads/lead-detail-form";
import { getCurrentWorkspace } from "@/lib/auth";
import { getLeadById } from "@/lib/data";
import { formatDate, formatDateTime, timeAgo } from "@/lib/utils";
import { leadStatusLabels, sourceTypeLabels } from "@/types";

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
        description="Review contact data, update the pipeline status, and capture context for the next follow-up."
      />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Lead information</CardTitle>
            <CardDescription>Captured on {formatDate(lead.createdAt)}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <DetailItem label="Phone" value={lead.phone} />
            <DetailItem label="Email" value={lead.email ?? "Not provided"} />
            <DetailItem label="Source" value={sourceTypeLabels[lead.sourceType]} />
            <DetailItem label="Campaign" value={lead.campaign?.name ?? "Unassigned"} />
            <DetailItem label="Service interest" value={lead.serviceInterest ?? "Not provided"} />
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Current status</p>
              <Badge variant="info">{leadStatusLabels[lead.status]}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status update</CardTitle>
            <CardDescription>Keep the follow-up queue accurate for the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <LeadDetailForm
              leadId={lead.id}
              defaultStatus={lead.status}
              defaultFollowUpAt={lead.followUpAt ? new Date(lead.followUpAt.getTime() - lead.followUpAt.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""}
              defaultNotes={lead.notes ?? ""}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-slate-700">{lead.notes || "No notes yet. Add context to keep handoffs clean."}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity timeline</CardTitle>
            <CardDescription>Recent lead events and placeholders for future CRM actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lead.activities.length ? (
              lead.activities.map((activity) => (
                <div key={activity.id} className="rounded-2xl bg-[var(--secondary)]/60 p-4">
                  <p className="text-sm font-medium text-slate-900">{activity.message}</p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    {formatDateTime(activity.createdAt)} • {timeAgo(activity.createdAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--muted-foreground)]">Timeline will populate as the team creates notes, follow-ups, and status changes.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <p className="text-sm text-slate-600">{value}</p>
    </div>
  );
}
