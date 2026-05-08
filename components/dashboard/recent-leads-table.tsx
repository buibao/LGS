import { Clock3 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LeadStatus, SourceType } from "@prisma/client";
import { Link } from "@/i18n/navigation";
import { EmptyState } from "@/components/design-system/empty-state";
import { LeadStatusBadge, SourceTypeBadge } from "@/components/ui/entity-badges";
import { SectionCard } from "@/components/ui/section-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatRelativeDate } from "@/lib/utils";

export async function RecentLeadsTable({
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
  const tDashboard = await getTranslations("Dashboard");
  const tLabels = await getTranslations("Labels");
  const tLeadTable = await getTranslations("LeadTable");
  const tEmpty = await getTranslations("EmptyStates");

  return (
    <SectionCard
      title={tDashboard("recentLeadsTitle")}
      description={tDashboard("recentLeadsDescription")}
      action={
        <Link href="/leads" className="text-sm font-semibold text-[var(--primary)]">
          {tDashboard("viewAllLeads")}
        </Link>
      }
      contentClassName="p-0"
    >
      {leads.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{tLabels("name")}</TableHead>
              <TableHead>{tLabels("source")}</TableHead>
              <TableHead>{tLabels("status")}</TableHead>
              <TableHead>{tLabels("interest")}</TableHead>
              <TableHead>{tLeadTable("followUpDate")}</TableHead>
              <TableHead>{tLabels("created")}</TableHead>
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
                <TableCell>{lead.serviceInterest ?? lead.campaign?.name ?? tLeadTable("generalInquiry")}</TableCell>
                <TableCell>{lead.followUpAt ? formatRelativeDate(lead.followUpAt) : tDashboard("notScheduled")}</TableCell>
                <TableCell>{formatDate(lead.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="p-6">
          <EmptyState
            icon={Clock3}
            title={tEmpty("noRecentLeadsTitle")}
            description={tEmpty("noRecentLeadsDescription")}
          />
        </div>
      )}
    </SectionCard>
  );
}
