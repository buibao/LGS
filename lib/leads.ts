import { LeadActivityType, LeadStatus, Prisma, SourceType } from "@prisma/client";
import { db } from "@/lib/db";

type CreateLeadForOrganizationInput = {
  organizationId: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceInterest?: string;
  preferredContactTime?: string;
  sourceType: SourceType;
  campaignId?: string;
  status?: LeadStatus;
  notes?: string;
  followUpAt?: string;
};

export async function createLeadForOrganization({
  organizationId,
  fullName,
  phone,
  email,
  serviceInterest,
  preferredContactTime,
  sourceType,
  campaignId,
  status = LeadStatus.NEW,
  notes,
  followUpAt,
}: CreateLeadForOrganizationInput) {
  const activityMessageParts = [`Lead created from ${sourceType.toLowerCase()} source.`];

  if (preferredContactTime) {
    activityMessageParts.push(`Preferred contact time: ${preferredContactTime}.`);
  }

  const activities: Prisma.LeadActivityCreateWithoutLeadInput[] = [
    {
      type: LeadActivityType.CREATED,
      message: activityMessageParts.join(" "),
    },
  ];

  if (followUpAt) {
    activities.push({
      type: LeadActivityType.FOLLOW_UP_SET,
      message: `Follow-up scheduled for ${new Date(followUpAt).toLocaleString()}.`,
    });
  }

  return db.lead.create({
    data: {
      organizationId,
      fullName,
      phone,
      email: email || null,
      serviceInterest: serviceInterest || null,
      preferredContactTime: preferredContactTime || null,
      sourceType,
      campaignId: campaignId || null,
      status,
      notes: notes || null,
      followUpAt: followUpAt ? new Date(followUpAt) : null,
      activities: {
        create: activities,
      },
    },
  });
}
