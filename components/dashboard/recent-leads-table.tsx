import Link from "next/link";
import { LeadStatus, SourceType } from "@prisma/client";
import { LeadStatusBadge, SourceTypeBadge } from "@/components/ui/entity-badges";
import { SectionCard } from "@/components/ui/section-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatRelativeDate } from "@/lib/utils";

export function RecentLeadsTable({
  leads,
}: {
  leads: Array<{
    id: string;
    fullName: string;
    sourceType: SourceType;
    status: LeadStatus;
    createdAt: Date;
    followUpAt: Date | null;
    serviceInterest: string | null;
    campaign: { name: string } | null;
  }>;
}) {
  return (
    <SectionCard
      title="Recent leads"
      description="The latest leads entering the pipeline, with just enough context to know who needs follow-up next."
      action={
        <Link href="/leads" className="text-sm font-semibold text-[var(--primary)]">
          View all leads
        </Link>
      }
      contentClassName="p-0"
    >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Interest</TableHead>
              <TableHead>Follow-up date</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="font-medium text-slate-900 hover:text-[var(--primary)]">
                    {lead.fullName}
                  </Link>
                </TableCell>
                <TableCell>
                  <SourceTypeBadge sourceType={lead.sourceType} />
                </TableCell>
                <TableCell>
                  <LeadStatusBadge status={lead.status} />
                </TableCell>
                <TableCell>{lead.serviceInterest ?? lead.campaign?.name ?? "General inquiry"}</TableCell>
                <TableCell>{lead.followUpAt ? formatRelativeDate(lead.followUpAt) : "Not scheduled"}</TableCell>
                <TableCell>{formatDate(lead.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </SectionCard>
  );
}
