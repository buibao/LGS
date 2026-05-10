import { Clock3 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LeadStatus, SourceType } from "@prisma/client";
import { Link } from "@/i18n/navigation";
import { EmptyState } from "@/components/design-system/empty-state";
import { OverflowTooltip } from "@/components/design-system/overflow-tooltip";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/ui/section-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

function getStatusTextClass(status: LeadStatus) {
  switch (status) {
    case LeadStatus.BOOKED:
      return "text-emerald-700";
    case LeadStatus.NEW:
      return "text-teal-700";
    case LeadStatus.INTERESTED:
      return "text-amber-700";
    case LeadStatus.CONTACTED:
      return "text-cyan-700";
    case LeadStatus.NO_RESPONSE:
      return "text-orange-700";
    case LeadStatus.LOST:
      return "text-rose-700";
    default:
      return "text-slate-600";
  }
}

function getSourceTextClass(sourceType: SourceType) {
  switch (sourceType) {
    case SourceType.FACEBOOK:
      return "text-cyan-700";
    case SourceType.TIKTOK:
      return "text-rose-700";
    case SourceType.ORGANIC:
      return "text-emerald-700";
    case SourceType.REFERRAL:
      return "text-amber-700";
    case SourceType.WEBSITE:
      return "text-teal-700";
    case SourceType.MANUAL:
      return "text-slate-600";
    default:
      return "text-orange-700";
  }
}

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
  const tStatus = await getTranslations("LeadStatus");
  const tSource = await getTranslations("LeadSource");
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
        <div>
          <div className="grid gap-3 p-4 sm:p-5 md:hidden">
            {leads.map((lead) => (
              <div key={lead.id} className="rounded-[24px] border border-border/70 bg-white p-4 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.18)]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <OverflowTooltip content={lead.fullName}>
                      <Link href={`/leads/${lead.id}`} className="block truncate text-base font-semibold text-slate-900 hover:text-[var(--primary)]">
                        {lead.fullName}
                      </Link>
                    </OverflowTooltip>
                    <p className="mt-1 text-sm text-slate-500">{formatDate(lead.createdAt)}</p>
                  </div>
                  <span className={cn("text-sm font-medium", getStatusTextClass(lead.status))}>{tStatus(lead.status)}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className={cn("font-medium", getSourceTextClass(lead.sourceType))}>{tSource(lead.sourceType)}</span>
                  <Badge variant="outline" size="sm" className="text-slate-600">
                    {lead.followUpAt ? formatRelativeDate(lead.followUpAt) : tDashboard("notScheduled")}
                  </Badge>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <MobileRecentField label={tLabels("interest")} value={lead.serviceInterest ?? lead.campaign?.name ?? tLeadTable("generalInquiry")} />
                  <MobileRecentField label={tLeadTable("followUpDate")} value={lead.followUpAt ? formatRelativeDate(lead.followUpAt) : tDashboard("notScheduled")} />
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
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
                      <span className={cn("text-sm font-medium", getSourceTextClass(lead.sourceType))}>{tSource(lead.sourceType)}</span>
                    </TableCell>
                    <TableCell>
                      <span className={cn("text-sm font-medium", getStatusTextClass(lead.status))}>{tStatus(lead.status)}</span>
                    </TableCell>
                    <TableCell>{lead.serviceInterest ?? lead.campaign?.name ?? tLeadTable("generalInquiry")}</TableCell>
                    <TableCell>{lead.followUpAt ? formatRelativeDate(lead.followUpAt) : tDashboard("notScheduled")}</TableCell>
                    <TableCell>{formatDate(lead.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-5 md:p-6">
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

function MobileRecentField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-[var(--secondary)]/35 p-3">
      <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-slate-500">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-700">{value}</p>
    </div>
  );
}
