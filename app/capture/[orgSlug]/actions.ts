"use server";

import { LeadStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createLeadForOrganization } from "@/lib/leads";
import { publicCaptureLeadSchema } from "@/lib/validators";

type CaptureActionContext = {
  organizationId: string;
  organizationSlug: string;
};

export type CaptureFormState = {
  formError?: string;
  fieldErrors?: Partial<Record<"fullName" | "phone" | "email" | "serviceInterest" | "preferredContactTime" | "notes", string[]>>;
  values?: Record<string, string>;
};

export async function submitPublicLeadCapture(
  context: CaptureActionContext,
  _previousState: CaptureFormState,
  formData: FormData,
): Promise<CaptureFormState> {
  const rawValues = {
    fullName: String(formData.get("fullName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    serviceInterest: String(formData.get("serviceInterest") ?? ""),
    preferredContactTime: String(formData.get("preferredContactTime") ?? ""),
    notes: String(formData.get("notes") ?? ""),
    sourceType: String(formData.get("sourceType") ?? ""),
    campaignId: String(formData.get("campaignId") ?? ""),
    honey: String(formData.get("honey") ?? ""),
  };

  if (rawValues.honey.trim()) {
    redirect(`/capture/${context.organizationSlug}/success`);
  }

  const parsed = publicCaptureLeadSchema.safeParse(rawValues);

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
      values: rawValues,
    };
  }

  const campaignId = parsed.data.campaignId?.trim();

  if (campaignId) {
    const campaign = await db.campaign.findFirst({
      where: {
        id: campaignId,
        organizationId: context.organizationId,
      },
      select: { id: true },
    });

    if (!campaign) {
      return {
        formError: "validation.invalidCampaign",
        values: rawValues,
      };
    }
  }

  await createLeadForOrganization({
    organizationId: context.organizationId,
    fullName: parsed.data.fullName,
    phone: parsed.data.phone,
    email: parsed.data.email,
    serviceInterest: parsed.data.serviceInterest,
    preferredContactTime: parsed.data.preferredContactTime,
    sourceType: parsed.data.sourceType,
    campaignId,
    status: LeadStatus.NEW,
    notes: parsed.data.notes,
  });

  revalidatePath("/dashboard");
  revalidatePath("/leads");
  revalidatePath("/reports");

  redirect(`/capture/${context.organizationSlug}/success`);
}
