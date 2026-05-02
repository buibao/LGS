"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadStatus, SourceType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

    router.push("/leads");
    router.refresh();
  });

  return (
    <Card>
      <CardContent className="p-6">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full name" error={form.formState.errors.fullName?.message}>
              <Input {...form.register("fullName")} placeholder="Emily Tran" />
            </Field>
            <Field label="Phone" error={form.formState.errors.phone?.message}>
              <Input {...form.register("phone")} placeholder="+1 555 010 1212" />
            </Field>
            <Field label="Email" error={form.formState.errors.email?.message}>
              <Input {...form.register("email")} placeholder="emily@example.com" />
            </Field>
            <Field label="Service interest" error={form.formState.errors.serviceInterest?.message}>
              <Input {...form.register("serviceInterest")} placeholder="Teeth whitening, skin treatment..." />
            </Field>
            <Field label="Source" error={form.formState.errors.sourceType?.message}>
              <Select {...form.register("sourceType")}>
                {Object.entries(sourceTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Campaign">
              <Select {...form.register("campaignId")}>
                <option value="">No campaign</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Status" error={form.formState.errors.status?.message}>
              <Select {...form.register("status")}>
                {Object.entries(leadStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Follow-up at">
              <Input {...form.register("followUpAt")} type="datetime-local" />
            </Field>
          </div>

          <Field label="Notes" error={form.formState.errors.notes?.message}>
            <Textarea {...form.register("notes")} placeholder="Context from chat, preferred appointment time, budget signals..." />
          </Field>

          {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}

          <div className="flex justify-end">
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ? "Saving..." : "Create Lead"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error ? <span className="text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}
