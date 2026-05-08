"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadStatus, SourceType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Link, useRouter } from "@/i18n/navigation";
import { FormSection } from "@/components/design-system/form-section";
import {
  DateTimeField,
  EmailInputField,
  PhoneInputField,
  PlainTextField,
  SelectField,
  SubmitButton,
  TextareaField,
} from "@/components/design-system/form-fields";
import { ErrorState } from "@/components/design-system/error-state";
import { SectionCard } from "@/components/ui/section-card";
import { Button } from "@/components/ui/button";
import { translateFormMessage } from "@/lib/form-messages";
import { leadSchema, type LeadInput } from "@/lib/validators";
import { leadStatusValues, sourceTypeValues } from "@/types";

export function LeadForm({
  campaigns,
}: {
  campaigns: Array<{ id: string; name: string }>;
}) {
  const tForm = useTranslations("LeadForm");
  const tActions = useTranslations("Actions");
  const tValidation = useTranslations("Validation");
  const tStatus = useTranslations("LeadStatus");
  const tSource = useTranslations("LeadSource");
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      serviceInterest: "",
      preferredContactTime: "",
      sourceType: SourceType.FACEBOOK,
      campaignId: "",
      status: LeadStatus.NEW,
      notes: "",
      followUpAt: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setServerError(
        translateFormMessage(
          payload.error ?? "validation.saveLeadFailed",
          tValidation,
        ) ?? tValidation("validation.saveLeadFailed"),
      );
      return;
    }

    const payload = (await response.json()) as { id: string };
    router.push(`/leads/${payload.id}`);
    router.refresh();
  });

  return (
    <form className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]" onSubmit={onSubmit}>
      <SectionCard
        title={tForm("detailsTitle")}
        description={tForm("detailsDescription")}
      >
        <div className="space-y-6">
          <FormSection title={tForm("contactSectionTitle")} description={tForm("contactSectionDescription")}>
            <div className="grid gap-5 md:grid-cols-2">
              <PlainTextField
                {...form.register("fullName")}
                label={tForm("fullNameLabel")}
                placeholder={tForm("fullNamePlaceholder")}
                helperText={tForm("fullNameHelp")}
                required
                error={translateFormMessage(form.formState.errors.fullName?.message, tValidation)}
              />
              <PhoneInputField
                {...form.register("phone")}
                label={tForm("phoneLabel")}
                placeholder={tForm("phonePlaceholder")}
                helperText={tForm("phoneHelp")}
                required
                error={translateFormMessage(form.formState.errors.phone?.message, tValidation)}
              />
              <EmailInputField
                {...form.register("email")}
                label={tForm("emailLabel")}
                placeholder={tForm("emailPlaceholder")}
                helperText={tForm("emailHelp")}
                error={translateFormMessage(form.formState.errors.email?.message, tValidation)}
              />
              <PlainTextField
                {...form.register("serviceInterest")}
                label={tForm("serviceInterestLabel")}
                placeholder={tForm("serviceInterestPlaceholder")}
                helperText={tForm("serviceInterestHelp")}
                error={translateFormMessage(form.formState.errors.serviceInterest?.message, tValidation)}
              />
            </div>
          </FormSection>

          <FormSection title={tForm("leadSectionTitle")} description={tForm("leadSectionDescription")}>
            <PlainTextField
              {...form.register("preferredContactTime")}
              label={tForm("preferredContactTimeLabel")}
              placeholder={tForm("preferredContactTimePlaceholder")}
              helperText={tForm("preferredContactTimeHelp")}
              error={translateFormMessage(form.formState.errors.preferredContactTime?.message, tValidation)}
            />
          </FormSection>

          <FormSection title={tForm("sourceSectionTitle")} description={tForm("sourceSectionDescription")}>
            <div className="grid gap-5 md:grid-cols-2">
              <SelectField
                {...form.register("sourceType")}
                label={tForm("sourceLabel")}
                helperText={tForm("sourceHelp")}
                required
                error={translateFormMessage(form.formState.errors.sourceType?.message, tValidation)}
              >
                {sourceTypeValues.map((value) => (
                  <option key={value} value={value}>
                    {tSource(value)}
                  </option>
                ))}
              </SelectField>
              <SelectField
                {...form.register("campaignId")}
                label={tForm("campaignLabel")}
                helperText={tForm("campaignHelp")}
              >
                <option value="">{tForm("noCampaign")}</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </SelectField>
            </div>
          </FormSection>

          <FormSection title={tForm("followUpSectionTitle")} description={tForm("followUpSectionDescription")}>
            <div className="grid gap-5 md:grid-cols-2">
              <SelectField
                {...form.register("status")}
                label={tForm("statusLabel")}
                helperText={tForm("statusHelp")}
                required
                error={translateFormMessage(form.formState.errors.status?.message, tValidation)}
              >
                {leadStatusValues.map((value) => (
                  <option key={value} value={value}>
                    {tStatus(value)}
                  </option>
                ))}
              </SelectField>
              <DateTimeField
                {...form.register("followUpAt")}
                label={tForm("followUpLabel")}
                helperText={tForm("followUpHelp")}
              />
            </div>
          </FormSection>

          <FormSection title={tForm("notesSectionTitle")} description={tForm("notesSectionDescription")}>
            <TextareaField
              {...form.register("notes")}
              label={tForm("notesLabel")}
              placeholder={tForm("notesPlaceholder")}
              helperText={tForm("notesHelp")}
              error={translateFormMessage(form.formState.errors.notes?.message, tValidation)}
            />
          </FormSection>
        </div>
      </SectionCard>

      <SectionCard
        title={tForm("summaryTitle")}
        description={tForm("summaryDescription")}
        className="h-fit xl:sticky xl:top-6"
      >
        <div className="space-y-4">
          <div className="rounded-2xl bg-[var(--secondary)]/60 p-4 text-sm leading-7 text-slate-600">
            {tForm("summaryBody")}
          </div>
          {serverError ? (
            <ErrorState
              title={tValidation("validation.saveLeadFailed")}
              description={serverError}
            />
          ) : null}
          <div className="flex flex-col gap-3">
            <SubmitButton
              className="w-full"
              isSubmitting={form.formState.isSubmitting}
              type="submit"
              idleLabel={tActions("createLead")}
              submittingLabel={tForm("saving")}
            />
            <Link href="/leads">
              <Button className="w-full" variant="outline" type="button">
                {tActions("cancel")}
              </Button>
            </Link>
          </div>
        </div>
      </SectionCard>
    </form>
  );
}
