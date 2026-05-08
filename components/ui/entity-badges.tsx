import { LeadStatus, SourceType } from "@prisma/client";
import { StatusBadge } from "@/components/design-system/status-badge";
import { SourceBadge } from "@/components/design-system/source-badge";

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <StatusBadge status={status} />;
}

export function SourceTypeBadge({ sourceType }: { sourceType: SourceType }) {
  return <SourceBadge sourceType={sourceType} />;
}
