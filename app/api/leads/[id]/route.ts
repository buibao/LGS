import { LeadActivityType } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentWorkspace } from "@/lib/auth";
import { db } from "@/lib/db";
import { leadUpdateSchema } from "@/lib/validators";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const [{ organization }, { id }] = await Promise.all([getCurrentWorkspace(), params]);
    const payload = leadUpdateSchema.parse(await request.json());
    const existingLead = await db.lead.findFirst({
      where: {
        id,
        organizationId: organization.id,
      },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    const activities = [];

    if (payload.status && payload.status !== existingLead.status) {
      activities.push({
        type: LeadActivityType.STATUS_CHANGED,
        message: `Status changed from ${existingLead.status} to ${payload.status}.`,
      });
    }

    if (payload.notes && payload.notes !== existingLead.notes) {
      activities.push({
        type: LeadActivityType.NOTE_ADDED,
        message: "Lead notes were updated.",
      });
    }

    if (payload.followUpAt && payload.followUpAt !== existingLead.followUpAt?.toISOString().slice(0, 16)) {
      activities.push({
        type: LeadActivityType.FOLLOW_UP_SET,
        message: `Follow-up updated for ${new Date(payload.followUpAt).toLocaleString()}.`,
      });
    }

    await db.lead.update({
      where: { id: existingLead.id },
      data: {
        status: payload.status ?? existingLead.status,
        notes: payload.notes ?? existingLead.notes,
        followUpAt: payload.followUpAt ? new Date(payload.followUpAt) : null,
        activities: activities.length ? { create: activities } : undefined,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update lead." },
      { status: 400 },
    );
  }
}
