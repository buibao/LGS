import { NextResponse } from "next/server";
import { getCurrentWorkspace } from "@/lib/auth";
import { createLeadForOrganization } from "@/lib/leads";
import { leadSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const { organization } = await getCurrentWorkspace();
    const payload = leadSchema.parse(await request.json());

    const lead = await createLeadForOrganization({
      organizationId: organization.id,
      fullName: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      serviceInterest: payload.serviceInterest,
      preferredContactTime: payload.preferredContactTime,
      sourceType: payload.sourceType,
      campaignId: payload.campaignId,
      status: payload.status,
      notes: payload.notes,
      followUpAt: payload.followUpAt,
    });

    return NextResponse.json({ id: lead.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "validation.saveLeadFailed" },
      { status: 400 },
    );
  }
}
