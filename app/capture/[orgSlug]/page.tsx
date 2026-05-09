import Link from "next/link";
import { SourceType } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PublicCaptureForm } from "@/components/capture/public-capture-form";
import { db } from "@/lib/db";
import { publicCaptureSourceSchema } from "@/lib/validators";
import { submitPublicLeadCapture } from "./actions";

export default async function PublicCapturePage({
  params,
  searchParams,
}: {
  params: Promise<{ orgSlug: string }>;
  searchParams: Promise<{ source?: string; campaignId?: string }>;
}) {
  const [{ orgSlug }, query, tCapture, tValidation, tSource] = await Promise.all([
    params,
    searchParams,
    getTranslations("PublicCapture"),
    getTranslations("Validation"),
    getTranslations("LeadSource"),
  ]);
  const organization = await db.organization.findUnique({
    where: { slug: orgSlug },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  if (!organization) {
    notFound();
  }

  const sourceResult = publicCaptureSourceSchema.safeParse(query.source);
  const defaultSource = sourceResult.success ? sourceResult.data : SourceType.WEBSITE;

  const selectedCampaign = query.campaignId
    ? await db.campaign.findFirst({
        where: {
          id: query.campaignId,
          organizationId: organization.id,
        },
        select: {
          id: true,
          name: true,
        },
      })
    : null;

  const action = submitPublicLeadCapture.bind(null, {
    organizationId: organization.id,
    organizationSlug: organization.slug,
  });

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f9fc_0%,#eef5fb_100%)] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-2xl space-y-5">
        <div className="rounded-3xl border bg-white/80 px-5 py-4 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.18)] backdrop-blur sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-[var(--primary)] uppercase">LeadOps AI</p>
              <p className="mt-1 text-sm text-slate-600">{tCapture("bannerDescription")}</p>
            </div>
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-[var(--primary)]">
              {tCapture("backToApp")}
            </Link>
          </div>
        </div>

        <PublicCaptureForm
          action={action}
          organizationName={organization.name}
          defaultSource={defaultSource}
          campaignId={selectedCampaign?.id}
          campaignName={selectedCampaign?.name}
          copy={{
            eyebrow: tCapture("eyebrow"),
            titleDescription: tCapture("titleDescription"),
            backToApp: tCapture("backToApp"),
            sourceLabel: tCapture("sourceLabel"),
            campaignLabel: tCapture("campaignLabel"),
            notLinked: tCapture("notLinked"),
            fullNameLabel: tCapture("fullNameLabel"),
            phoneLabel: tCapture("phoneLabel"),
            emailLabel: tCapture("emailLabel"),
            serviceInterestLabel: tCapture("serviceInterestLabel"),
            preferredContactTimeLabel: tCapture("preferredContactTimeLabel"),
            notesLabel: tCapture("notesLabel"),
            fullNamePlaceholder: tCapture("fullNamePlaceholder"),
            phonePlaceholder: tCapture("phonePlaceholder"),
            emailPlaceholder: tCapture("emailPlaceholder"),
            serviceInterestPlaceholder: tCapture("serviceInterestPlaceholder"),
            preferredContactTimePlaceholder: tCapture("preferredContactTimePlaceholder"),
            notesPlaceholder: tCapture("notesPlaceholder"),
            submissionHelp: tCapture("submissionHelp"),
            sending: tCapture("sending"),
            sendInquiry: tCapture("sendInquiry"),
            sourceValue: tSource(defaultSource),
            campaignValue: selectedCampaign?.name ?? tCapture("notLinked"),
            leaveEmpty: tCapture("leaveEmpty"),
          }}
          validationMessages={{
            "validation.fullNameRequired": tValidation("validation.fullNameRequired"),
            "validation.phoneRequired": tValidation("validation.phoneRequired"),
            "validation.emailInvalid": tValidation("validation.emailInvalid"),
            "validation.shortTextTooLong": tValidation("validation.shortTextTooLong"),
            "validation.notesTooLong": tValidation("validation.notesTooLong"),
            "validation.honeypotInvalid": tValidation("validation.honeypotInvalid"),
            "validation.invalidCampaign": tValidation("validation.invalidCampaign"),
          }}
        />
      </div>
    </div>
  );
}
