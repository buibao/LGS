import Link from "next/link";
import { LeadStatus, SourceType } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { leadStatusLabels, sourceTypeLabels } from "@/types";

function statusVariant(status: LeadStatus) {
  if (status === LeadStatus.BOOKED) return "success";
  if (status === LeadStatus.NEW || status === LeadStatus.INTERESTED) return "warning";
  if (status === LeadStatus.LOST || status === LeadStatus.NO_RESPONSE) return "danger";
  return "info";
}

export function RecentLeadsTable({
  leads,
}: {
  leads: Array<{
    id: string;
    fullName: string;
    sourceType: SourceType;
    status: LeadStatus;
    createdAt: Date;
    campaign: { name: string } | null;
  }>;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent leads</CardTitle>
        <Link href="/leads" className="text-sm font-medium text-[var(--primary)]">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Link href={`/leads/${lead.id}`} className="font-medium text-slate-900">
                    {lead.fullName}
                  </Link>
                </TableCell>
                <TableCell>{sourceTypeLabels[lead.sourceType]}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(lead.status)}>{leadStatusLabels[lead.status]}</Badge>
                </TableCell>
                <TableCell>{lead.campaign?.name ?? "Unassigned"}</TableCell>
                <TableCell>{formatDate(lead.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
