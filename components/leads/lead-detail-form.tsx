"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LeadStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { leadStatusLabels } from "@/types";

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
  const router = useRouter();
  const [status, setStatus] = useState(defaultStatus);
  const [followUpAt, setFollowUpAt] = useState(defaultFollowUpAt);
  const [notes, setNotes] = useState(defaultNotes);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const save = async () => {
    setSaving(true);
    setMessage(null);

    const response = await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, followUpAt, notes }),
    });

    setSaving(false);

    if (!response.ok) {
      setMessage("Unable to update lead.");
      return;
    }

    setMessage("Lead updated.");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700">Lead status</span>
        <Select value={status} onChange={(event) => setStatus(event.target.value as LeadStatus)}>
          {Object.entries(leadStatusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700">Next follow-up</span>
        <Input type="datetime-local" value={followUpAt} onChange={(event) => setFollowUpAt(event.target.value)} />
        <span className="text-xs leading-6 text-slate-500">Set the next promised contact so it shows up in the follow-up queue.</span>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700">Notes</span>
        <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} />
        <span className="text-xs leading-6 text-slate-500">Keep notes practical: customer intent, timing, objections, and what to do next.</span>
      </label>
      {message ? <p className="text-sm text-[var(--primary)]">{message}</p> : null}
      <Button className="w-full sm:w-auto" onClick={save} disabled={saving}>
        {saving ? "Updating..." : "Save changes"}
      </Button>
    </div>
  );
}
