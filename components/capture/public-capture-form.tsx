"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CaptureFormState } from "@/app/capture/[orgSlug]/actions";

const initialState: CaptureFormState = {};

type PublicCaptureCopy = {
  eyebrow: string;
  titleDescription: string;
  backToApp: string;
  sourceLabel: string;
  campaignLabel: string;
  notLinked: string;
  fullNameLabel: string;
  phoneLabel: string;
  emailLabel: string;
  serviceInterestLabel: string;
  preferredContactTimeLabel: string;
  notesLabel: string;
  fullNamePlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  serviceInterestPlaceholder: string;
  preferredContactTimePlaceholder: string;
  notesPlaceholder: string;
  submissionHelp: string;
  sending: string;
  sendInquiry: string;
  sourceValue: string;
  campaignValue: string;
  leaveEmpty: string;
};

type ValidationCopy = Record<string, string>;

function translateValidationMessage(
  message: string | undefined,
  validationMessages: ValidationCopy,
) {
  if (!message) {
    return undefined;
  }

  return validationMessages[message] ?? message;
}

export function PublicCaptureForm({
  action,
  organizationName,
  defaultSource,
  campaignId,
  campaignName,
  copy,
  validationMessages,
}: {
  action: (state: CaptureFormState, formData: FormData) => Promise<CaptureFormState>;
  organizationName: string;
  defaultSource: "FACEBOOK" | "TIKTOK" | "ORGANIC" | "REFERRAL" | "WEBSITE" | "OTHER";
  campaignId?: string;
  campaignName?: string;
  copy: PublicCaptureCopy;
  validationMessages: ValidationCopy;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const values = state.values ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="sourceType" value={defaultSource} />
      <input type="hidden" name="campaignId" value={campaignId ?? ""} />
      <div className="rounded-3xl border bg-white p-5 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.2)] sm:p-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[var(--primary)]">{copy.eyebrow}</p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{organizationName}</h1>
          <p className="text-sm leading-7 text-slate-600">{copy.titleDescription}</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoTile label={copy.sourceLabel} value={copy.sourceValue} />
          <InfoTile label={copy.campaignLabel} value={campaignName ?? copy.notLinked} />
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-5 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.2)] sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={copy.fullNameLabel} error={translateValidationMessage(state.fieldErrors?.fullName?.[0], validationMessages)}>
            <Input name="fullName" defaultValue={values.fullName ?? ""} placeholder={copy.fullNamePlaceholder} required />
          </Field>
          <Field label={copy.phoneLabel} error={translateValidationMessage(state.fieldErrors?.phone?.[0], validationMessages)}>
            <Input name="phone" defaultValue={values.phone ?? ""} placeholder={copy.phonePlaceholder} required />
          </Field>
          <Field label={copy.emailLabel} error={translateValidationMessage(state.fieldErrors?.email?.[0], validationMessages)}>
            <Input name="email" defaultValue={values.email ?? ""} placeholder={copy.emailPlaceholder} type="email" />
          </Field>
          <Field label={copy.serviceInterestLabel} error={translateValidationMessage(state.fieldErrors?.serviceInterest?.[0], validationMessages)}>
            <Input
              name="serviceInterest"
              defaultValue={values.serviceInterest ?? ""}
              placeholder={copy.serviceInterestPlaceholder}
            />
          </Field>
          <Field
            label={copy.preferredContactTimeLabel}
            error={translateValidationMessage(state.fieldErrors?.preferredContactTime?.[0], validationMessages)}
            className="sm:col-span-2"
          >
            <Input
              name="preferredContactTime"
              defaultValue={values.preferredContactTime ?? ""}
              placeholder={copy.preferredContactTimePlaceholder}
            />
          </Field>
          <Field label={copy.notesLabel} error={translateValidationMessage(state.fieldErrors?.notes?.[0], validationMessages)} className="sm:col-span-2">
            <Textarea
              name="notes"
              defaultValue={values.notes ?? ""}
              placeholder={copy.notesPlaceholder}
            />
          </Field>
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">{copy.leaveEmpty}</label>
          <input id="website" name="honey" autoComplete="off" tabIndex={-1} defaultValue="" />
        </div>

        {state.formError ? <p className="mt-4 text-sm text-rose-600">{translateValidationMessage(state.formError, validationMessages) ?? state.formError}</p> : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-slate-500">{copy.submissionHelp}</p>
          <SubmitButton sendingLabel={copy.sending} idleLabel={copy.sendInquiry} />
        </div>
      </div>
    </form>
  );
}

function SubmitButton({
  sendingLabel,
  idleLabel,
}: {
  sendingLabel: string;
  idleLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full sm:w-auto" size="lg" disabled={pending} type="submit">
      {pending ? sendingLabel : idleLabel}
    </Button>
  );
}

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-[var(--secondary)]/45 p-4">
      <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">{label}</p>
      <p className="mt-2 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}
