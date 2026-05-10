import { LeadStatus } from "@prisma/client";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

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

export function StatusBadge({ status }: { status: LeadStatus }) {
  const t = useTranslations("LeadStatus");

  return <Badge variant={getStatusVariant(status)} size="sm">{t(status)}</Badge>;
}
