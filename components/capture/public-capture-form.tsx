"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CaptureFormState } from "@/app/capture/[orgSlug]/actions";
import { sourceTypeLabels } from "@/types";

const initialState: CaptureFormState = {};

export function PublicCaptureForm({
  action,
  organizationName,
  defaultSource,
  campaignId,
  campaignName,
}: {
  action: (state: CaptureFormState, formData: FormData) => Promise<CaptureFormState>;
  organizationName: string;
  defaultSource: "FACEBOOK" | "TIKTOK" | "ORGANIC" | "REFERRAL" | "WEBSITE" | "OTHER";
  campaignId?: string;
  campaignName?: string;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const values = state.values ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="sourceType" value={defaultSource} />
      <input type="hidden" name="campaignId" value={campaignId ?? ""} />
      <div className="rounded-3xl border bg-white p-5 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.2)] sm:p-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[var(--primary)]">Public lead capture</p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{organizationName}</h1>
          <p className="text-sm leading-7 text-slate-600">
            Share this form in ads, chats, or landing pages so new inquiries go straight into the LeadOps pipeline.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoTile label="Source" value={sourceTypeLabels[defaultSource]} />
          <InfoTile label="Campaign" value={campaignName ?? "Not linked"} />
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-5 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.2)] sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" error={state.fieldErrors?.fullName?.[0]}>
            <Input name="fullName" defaultValue={values.fullName ?? ""} placeholder="Nguyen Thi Lan" required />
          </Field>
          <Field label="Phone" error={state.fieldErrors?.phone?.[0]}>
            <Input name="phone" defaultValue={values.phone ?? ""} placeholder="+84 90 123 4567" required />
          </Field>
          <Field label="Email" error={state.fieldErrors?.email?.[0]}>
            <Input name="email" defaultValue={values.email ?? ""} placeholder="name@example.com" type="email" />
          </Field>
          <Field label="Service interest" error={state.fieldErrors?.serviceInterest?.[0]}>
            <Input
              name="serviceInterest"
              defaultValue={values.serviceInterest ?? ""}
              placeholder="Facial treatment, whitening package, consultation..."
            />
          </Field>
          <Field
            label="Preferred contact time"
            error={state.fieldErrors?.preferredContactTime?.[0]}
            className="sm:col-span-2"
          >
            <Input
              name="preferredContactTime"
              defaultValue={values.preferredContactTime ?? ""}
              placeholder="This afternoon, after 6pm, Saturday morning..."
            />
          </Field>
          <Field label="Notes" error={state.fieldErrors?.notes?.[0]} className="sm:col-span-2">
            <Textarea
              name="notes"
              defaultValue={values.notes ?? ""}
              placeholder="Anything helpful for the team to know before they reach out."
            />
          </Field>
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="honey" autoComplete="off" tabIndex={-1} defaultValue="" />
        </div>

        {state.formError ? <p className="mt-4 text-sm text-rose-600">{state.formError}</p> : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-slate-500">
            By submitting, your inquiry will be sent directly to the business so they can follow up.
          </p>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full sm:w-auto" size="lg" disabled={pending} type="submit">
      {pending ? "Sending..." : "Send inquiry"}
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
