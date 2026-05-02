import {
  LeadActivityType,
  LeadStatus,
  MembershipRole,
  PrismaClient,
  SourceType,
} from "@prisma/client";
import { addDays, subDays } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  await prisma.leadActivity.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  const organization = await prisma.organization.create({
    data: {
      name: "Glow Dental & Beauty",
      slug: "glow-dental-beauty",
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      clerkId: "demo_clerk_user",
      email: "owner@glowclinic.demo",
      name: "Demo Owner",
    },
  });

  await prisma.membership.create({
    data: {
      userId: demoUser.id,
      organizationId: organization.id,
      role: MembershipRole.OWNER,
    },
  });

  const campaigns = await prisma.$transaction([
    prisma.campaign.create({
      data: {
        organizationId: organization.id,
        name: "Facebook Lead Ads - April",
        sourceType: SourceType.FACEBOOK,
        budget: 1200,
        startedAt: subDays(new Date(), 30),
      },
    }),
    prisma.campaign.create({
      data: {
        organizationId: organization.id,
        name: "TikTok Booking Campaign",
        sourceType: SourceType.TIKTOK,
        budget: 900,
        startedAt: subDays(new Date(), 24),
      },
    }),
    prisma.campaign.create({
      data: {
        organizationId: organization.id,
        name: "Organic Social Inbox",
        sourceType: SourceType.ORGANIC,
        startedAt: subDays(new Date(), 18),
      },
    }),
  ]);

  const sampleLeads = [
    ["Amy Nguyen", SourceType.FACEBOOK, LeadStatus.NEW, campaigns[0].id],
    ["Brandon Lee", SourceType.TIKTOK, LeadStatus.CONTACTED, campaigns[1].id],
    ["Chloe Pham", SourceType.ORGANIC, LeadStatus.BOOKED, campaigns[2].id],
    ["David Tran", SourceType.REFERRAL, LeadStatus.INTERESTED, null],
    ["Ella Vo", SourceType.WEBSITE, LeadStatus.NEW, null],
    ["Fiona Dang", SourceType.FACEBOOK, LeadStatus.BOOKED, campaigns[0].id],
    ["Grace Ho", SourceType.MANUAL, LeadStatus.NO_RESPONSE, null],
    ["Henry Bui", SourceType.TIKTOK, LeadStatus.INTERESTED, campaigns[1].id],
    ["Isla Le", SourceType.REFERRAL, LeadStatus.BOOKED, null],
    ["Jason Ngo", SourceType.ORGANIC, LeadStatus.CONTACTED, campaigns[2].id],
    ["Kira Nguyen", SourceType.FACEBOOK, LeadStatus.NEW, campaigns[0].id],
    ["Lina Dao", SourceType.WEBSITE, LeadStatus.LOST, null],
    ["Mason Pham", SourceType.OTHER, LeadStatus.NEW, null],
    ["Nina Vu", SourceType.TIKTOK, LeadStatus.BOOKED, campaigns[1].id],
    ["Owen Tran", SourceType.ORGANIC, LeadStatus.INTERESTED, campaigns[2].id],
    ["Paula Hoang", SourceType.FACEBOOK, LeadStatus.CONTACTED, campaigns[0].id],
    ["Quinn Le", SourceType.MANUAL, LeadStatus.NEW, null],
    ["Ruby Nguyen", SourceType.REFERRAL, LeadStatus.BOOKED, null],
    ["Sophia Truong", SourceType.TIKTOK, LeadStatus.NO_RESPONSE, campaigns[1].id],
    ["Tommy Do", SourceType.FACEBOOK, LeadStatus.INTERESTED, campaigns[0].id],
  ] as const;

  for (const [index, leadSeed] of sampleLeads.entries()) {
    const [fullName, sourceType, status, campaignId] = leadSeed;
    const createdAt = subDays(new Date(), 20 - index);
    const followUpAt =
      status === LeadStatus.NEW || status === LeadStatus.CONTACTED || status === LeadStatus.INTERESTED
        ? addDays(createdAt, 2)
        : null;

    const lead = await prisma.lead.create({
      data: {
        organizationId: organization.id,
        fullName,
        phone: `+1 555 010 ${String(index + 10).padStart(2, "0")}`,
        email: `${fullName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        serviceInterest: index % 2 === 0 ? "Consultation" : "Treatment package",
        sourceType,
        campaignId,
        status,
        notes: `${fullName} asked about pricing and availability.`,
        followUpAt,
        createdAt,
        updatedAt: createdAt,
      },
    });

    await prisma.leadActivity.createMany({
      data: [
        {
          leadId: lead.id,
          type: LeadActivityType.CREATED,
          message: `Lead created from ${sourceType.toLowerCase()} source.`,
          createdAt,
        },
        {
          leadId: lead.id,
          type: LeadActivityType.STATUS_CHANGED,
          message: `Lead moved into ${status.toLowerCase().replace("_", " ")}.`,
          createdAt: addDays(createdAt, 1),
        },
        ...(followUpAt
          ? [
              {
                leadId: lead.id,
                type: LeadActivityType.FOLLOW_UP_SET,
                message: `Follow-up scheduled for ${followUpAt.toLocaleString()}.`,
                createdAt: addDays(createdAt, 1),
              },
            ]
          : []),
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
