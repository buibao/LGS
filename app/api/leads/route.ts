import { LeadActivityType } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentWorkspace } from "@/lib/auth";
import { db } from "@/lib/db";
import { leadSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const { organization } = await getCurrentWorkspace();
    const payload = leadSchema.parse(await request.json());

    const lead = await db.lead.create({
      data: {
        organizationId: organization.id,
        fullName: payload.fullName,
        phone: payload.phone,
        email: payload.email || null,
        serviceInterest: payload.serviceInterest || null,
        sourceType: payload.sourceType,
        campaignId: payload.campaignId || null,
        status: payload.status,
        notes: payload.notes || null,
        followUpAt: payload.followUpAt ? new Date(payload.followUpAt) : null,
        activities: {
          create: [
            {
              type: LeadActivityType.CREATED,
              message: `Lead created from ${payload.sourceType.toLowerCase()} source.`,
            },
            ...(payload.followUpAt
              ? [
                  {
                    type: LeadActivityType.FOLLOW_UP_SET,
                    message: `Follow-up scheduled for ${new Date(payload.followUpAt).toLocaleString()}.`,
                  },
                ]
              : []),
          ],
        },
      },
    });

    return NextResponse.json({ id: lead.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create lead." },
      { status: 400 },
    );
  }
}
