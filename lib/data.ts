import { LeadStatus } from "@prisma/client";
import { db } from "@/lib/db";

export async function getDashboardRecentLeads(organizationId: string) {
  return db.lead.findMany({
    where: { organizationId },
    include: {
      campaign: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export async function getAttentionSummary(organizationId: string) {
  const pendingLead = await db.lead.findFirst({
    where: {
      organizationId,
      status: { in: [LeadStatus.NEW, LeadStatus.CONTACTED, LeadStatus.INTERESTED] },
      followUpAt: { lte: new Date() },
    },
    orderBy: { followUpAt: "asc" },
    select: {
      id: true,
      fullName: true,
      followUpAt: true,
      status: true,
      sourceType: true,
    },
  });

  const followUpNeeded = await db.lead.count({
    where: {
      organizationId,
      status: { in: [LeadStatus.NEW, LeadStatus.CONTACTED, LeadStatus.INTERESTED] },
      followUpAt: { lte: new Date() },
    },
  });

  return {
    followUpNeeded,
    oldestPendingLead: pendingLead,
  };
}

export async function getLeadsForOrganization(organizationId: string) {
  return db.lead.findMany({
    where: { organizationId },
    include: {
      campaign: {
        select: {
          id: true,
          name: true,
        },
      },
      activities: {
        select: {
          id: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getLeadById(organizationId: string, leadId: string) {
  return db.lead.findFirst({
    where: {
      id: leadId,
      organizationId,
    },
    include: {
      campaign: true,
      activities: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getCampaignsForOrganization(organizationId: string) {
  return db.campaign.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOpenLeadSummary(organizationId: string) {
  return db.lead.count({
    where: {
      organizationId,
      status: { in: [LeadStatus.NEW, LeadStatus.CONTACTED, LeadStatus.INTERESTED] },
    },
  });
}
