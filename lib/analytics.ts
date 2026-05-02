import { LeadStatus, Prisma, SourceType } from "@prisma/client";
import { endOfDay, format, startOfDay, subDays } from "date-fns";
import { db } from "@/lib/db";

const followUpStatuses: LeadStatus[] = [
  LeadStatus.NEW,
  LeadStatus.CONTACTED,
  LeadStatus.INTERESTED,
];

export async function getTotalLeads(organizationId: string) {
  return db.lead.count({ where: { organizationId } });
}

export async function getNewLeads(organizationId: string) {
  return db.lead.count({
    where: {
      organizationId,
      status: LeadStatus.NEW,
    },
  });
}

export async function getFollowUpNeeded(organizationId: string) {
  return db.lead.count({
    where: {
      organizationId,
      status: { in: followUpStatuses },
      followUpAt: { lte: endOfDay(new Date()) },
    },
  });
}

export async function getBookedAppointments(organizationId: string) {
  return db.lead.count({
    where: {
      organizationId,
      status: LeadStatus.BOOKED,
    },
  });
}

export async function getConversionRate(organizationId: string) {
  const [total, booked] = await Promise.all([
    getTotalLeads(organizationId),
    getBookedAppointments(organizationId),
  ]);

  return total === 0 ? 0 : (booked / total) * 100;
}

export async function getLeadsByDay(organizationId: string, days = 7) {
  const start = startOfDay(subDays(new Date(), days - 1));
  const leads = await db.lead.findMany({
    where: {
      organizationId,
      createdAt: { gte: start },
    },
    select: {
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const map = new Map<string, number>();
  for (let index = 0; index < days; index += 1) {
    const date = subDays(new Date(), days - 1 - index);
    map.set(format(date, "MMM d"), 0);
  }

  for (const lead of leads) {
    const key = format(lead.createdAt, "MMM d");
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  return Array.from(map.entries()).map(([date, leadsCount]) => ({
    date,
    leads: leadsCount,
  }));
}

export async function getLeadsBySource(organizationId: string) {
  const grouped = await db.lead.groupBy({
    by: ["sourceType"],
    where: { organizationId },
    _count: { _all: true },
  });

  return Object.values(SourceType).map((source) => ({
    source,
    leads: grouped.find((item) => item.sourceType === source)?._count._all ?? 0,
  }));
}

export async function getLeadsByStatus(organizationId: string) {
  const grouped = await db.lead.groupBy({
    by: ["status"],
    where: { organizationId },
    _count: { _all: true },
  });

  return Object.values(LeadStatus).map((status) => ({
    status,
    leads: grouped.find((item) => item.status === status)?._count._all ?? 0,
  }));
}

export async function getCampaignPerformance(organizationId: string) {
  const campaigns = await db.campaign.findMany({
    where: { organizationId },
    include: {
      leads: {
        select: {
          id: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return campaigns.map((campaign) => {
    const totalLeads = campaign.leads.length;
    const bookedLeads = campaign.leads.filter((lead) => lead.status === LeadStatus.BOOKED).length;
    const conversionRate = totalLeads === 0 ? 0 : (bookedLeads / totalLeads) * 100;

    return {
      id: campaign.id,
      name: campaign.name,
      sourceType: campaign.sourceType,
      leadCount: totalLeads,
      bookedLeads,
      conversionRate,
      budget:
        campaign.budget instanceof Prisma.Decimal ? Number(campaign.budget) : campaign.budget,
      startedAt: campaign.startedAt,
      endedAt: campaign.endedAt,
    };
  });
}
