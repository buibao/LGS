"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarClock, MessageSquareText, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadStatus, SourceType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/ui/section-card";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { leadSchema, type LeadInput } from "@/lib/validators";
import { leadStatusLabels, sourceTypeLabels } from "@/types";

export function LeadForm({
  campaigns,
}: {
  campaigns: Array<{ id: string; name: string }>;
}) {
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
      setServerError(payload.error ?? "Unable to save lead.");
      return;
    }

    const payload = (await response.json()) as { id: string };
    router.push(`/leads/${payload.id}`);
    router.refresh();
  });

  return (
    <form className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]" onSubmit={onSubmit}>
      <SectionCard
        title="Lead details"
        description="Capture enough context for the team to follow up quickly, understand the source, and move the lead toward a booking."
      >
        <div className="space-y-6">
          <section className="space-y-4">
            <SectionTitle icon={<UserRoundPlus className="h-4 w-4" />} title="Contact information" />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name" hint="Use the customer name your staff will recognize." error={form.formState.errors.fullName?.message}>
                <Input {...form.register("fullName")} placeholder="Emily Tran" />
              </Field>
              <Field label="Phone" hint="Primary number for call-back or SMS follow-up." error={form.formState.errors.phone?.message}>
                <Input {...form.register("phone")} placeholder="+1 555 010 1212" />
              </Field>
              <Field label="Email" hint="Optional, but helpful for confirmations and nurturing." error={form.formState.errors.email?.message}>
                <Input {...form.register("email")} placeholder="emily@example.com" />
              </Field>
              <Field label="Service interest" hint="What does the customer want to book or learn more about?" error={form.formState.errors.serviceInterest?.message}>
                <Input {...form.register("serviceInterest")} placeholder="Teeth whitening, skin treatment, English class..." />
              </Field>
              <Field
                label="Preferred contact time"
                hint="Optional timing preference from the customer."
                error={form.formState.errors.preferredContactTime?.message}
              >
                <Input {...form.register("preferredContactTime")} placeholder="Weekday afternoons, after 6pm, this weekend..." />
              </Field>
            </div>
          </section>

          <section className="space-y-4">
            <SectionTitle icon={<CalendarClock className="h-4 w-4" />} title="Lead details" />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Lead source" hint="Choose the source so campaign reporting stays useful." error={form.formState.errors.sourceType?.message}>
                <Select {...form.register("sourceType")}>
                  {Object.entries(sourceTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Campaign" hint="Optional when you want to tie the lead to a named promotion or ad set.">
                <Select {...form.register("campaignId")}>
                  <option value="">No campaign</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Pipeline status" hint="Start with the stage that best matches the current conversation." error={form.formState.errors.status?.message}>
                <Select {...form.register("status")}>
                  {Object.entries(leadStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Follow-up" hint="Set the next promised action so it appears in the dashboard queue.">
                <Input {...form.register("followUpAt")} type="datetime-local" />
              </Field>
            </div>
          </section>

          <section className="space-y-4">
            <SectionTitle icon={<MessageSquareText className="h-4 w-4" />} title="Notes" />
            <Field label="Notes" hint="Add budget clues, preferred timing, objections, or handoff context." error={form.formState.errors.notes?.message}>
              <Textarea {...form.register("notes")} placeholder="Context from chat, preferred appointment time, budget signals..." />
            </Field>
          </section>
        </div>
      </SectionCard>

      <SectionCard
        title="Create lead"
        description="Save the lead and continue into the detail page for follow-up management."
        className="h-fit xl:sticky xl:top-6"
      >
        <div className="space-y-4">
          <div className="rounded-2xl bg-[var(--secondary)]/60 p-4 text-sm leading-7 text-slate-600">
            A well-tagged lead helps owners understand which channels are producing real appointment opportunities instead of just message volume.
          </div>
          {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}
          <div className="flex flex-col gap-3">
            <Button className="w-full" disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ? "Saving..." : "Create Lead"}
            </Button>
            <Link href="/leads">
              <Button className="w-full" variant="outline" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </SectionCard>
    </form>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
      <span className="rounded-xl bg-[var(--secondary)] p-2 text-[var(--primary)]">{icon}</span>
      {title}
    </div>
  );
}

function Field({
  label,
  children,
  error,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint ? <span className="block text-xs leading-6 text-slate-500">{hint}</span> : null}
      {error ? <span className="text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}
