import { SourceType } from "@prisma/client";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

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

export function SourceBadge({ sourceType }: { sourceType: SourceType }) {
  const t = useTranslations("LeadSource");

  return <Badge variant={getSourceVariant(sourceType)}>{t(sourceType)}</Badge>;
}
