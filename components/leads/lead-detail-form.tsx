"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadStatus } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "@/i18n/navigation";
import { ErrorState } from "@/components/design-system/error-state";
import {
  DateTimeField,
  SelectField,
  SubmitButton,
  TextareaField,
} from "@/components/design-system/form-fields";
import { leadUpdateSchema, type LeadUpdateInput } from "@/lib/validators";
import { translateFormMessage } from "@/lib/form-messages";
import { leadStatusValues } from "@/types";

export function LeadDetailForm({
  leadId,
  defaultStatus,
  defaultFollowUpAt,
  defaultNotes,
}: {
  leadId: string;
  defaultStatus: LeadStatus;
  defaultFollowUpAt: string;
  defaultNotes: string;
}) {
  const tActions = useTranslations("Actions");
  const tDetail = useTranslations("LeadDetailForm");
  const tValidation = useTranslations("Validation");
  const tStatus = useTranslations("LeadStatus");
  const tLabels = useTranslations("Labels");
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<LeadUpdateInput>({
    resolver: zodResolver(leadUpdateSchema),
    defaultValues: {
      status: defaultStatus,
      followUpAt: defaultFollowUpAt,
      notes: defaultNotes,
    },
  });

  const save = form.handleSubmit(async (values) => {
    setMessage(null);
    setServerError(null);

    const response = await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setServerError(
        translateFormMessage(
          payload.error ?? "validation.updateLeadFailed",
          tValidation,
        ) ?? tValidation("validation.updateLeadFailed"),
      );
      return;
    }

    setMessage(tDetail("success"));
    router.refresh();
  });

  return (
    <form className="space-y-4" onSubmit={save}>
      <div className="space-y-4">
        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <SelectField
              label={tDetail("statusLabel")}
              required
              value={field.value}
              onChange={field.onChange}
              error={translateFormMessage(form.formState.errors.status?.message, tValidation)}
              options={leadStatusValues.map((value) => ({
                value,
                label: tStatus(value),
              }))}
            />
          )}
        />
        <Controller
          control={form.control}
          name="followUpAt"
          render={({ field }) => (
            <DateTimeField
              label={tDetail("followUpLabel")}
              helperText={tDetail("followUpHelp")}
              value={field.value}
              onChange={field.onChange}
              placeholder={tDetail("followUpPlaceholder")}
              dateLabel={tLabels("followUp")}
              timeLabel={tDetail("followUpTimeLabel")}
              clearLabel={tDetail("clearFollowUp")}
              todayLabel={tDetail("today")}
              noValueLabel={tDetail("noFollowUp")}
              error={translateFormMessage(form.formState.errors.followUpAt?.message, tValidation)}
            />
          )}
        />
      </div>
      <TextareaField
        {...form.register("notes")}
        label={tDetail("notesLabel")}
        helperText={tDetail("notesHelp")}
        error={translateFormMessage(form.formState.errors.notes?.message, tValidation)}
      />
      {serverError ? (
        <ErrorState title={tValidation("validation.updateLeadFailed")} description={serverError} />
      ) : null}
      {message ? <p className="text-sm text-[var(--primary)]">{message}</p> : null}
      <SubmitButton
        className="w-full sm:w-auto"
        isSubmitting={form.formState.isSubmitting}
        type="submit"
        idleLabel={tActions("updateLead")}
        submittingLabel={tDetail("updating")}
      />
    </form>
  );
}
