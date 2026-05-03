import { LeadStatus, SourceType } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { leadStatusLabels, sourceTypeLabels } from "@/types";

function getStatusVariant(status: LeadStatus) {
  switch (status) {
    case LeadStatus.BOOKED:
      return "success";
    case LeadStatus.NEW:
      return "teal";
    case LeadStatus.INTERESTED:
      return "warning";
    case LeadStatus.CONTACTED:
      return "info";
    case LeadStatus.NO_RESPONSE:
      return "orange";
    case LeadStatus.LOST:
      return "danger";
    default:
      return "neutral";
  }
}

function getSourceVariant(sourceType: SourceType) {
  switch (sourceType) {
    case SourceType.FACEBOOK:
      return "info";
    case SourceType.TIKTOK:
      return "danger";
    case SourceType.ORGANIC:
      return "success";
    case SourceType.REFERRAL:
      return "warning";
    case SourceType.WEBSITE:
      return "teal";
    case SourceType.MANUAL:
      return "neutral";
    default:
      return "orange";
  }
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <Badge variant={getStatusVariant(status)}>{leadStatusLabels[status]}</Badge>;
}

export function SourceTypeBadge({ sourceType }: { sourceType: SourceType }) {
  return <Badge variant={getSourceVariant(sourceType)}>{sourceTypeLabels[sourceType]}</Badge>;
}
