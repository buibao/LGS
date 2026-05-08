import { LeadStatus, SourceType } from "@prisma/client";

export const sourceTypeValues = [
  SourceType.FACEBOOK,
  SourceType.TIKTOK,
  SourceType.ORGANIC,
  SourceType.REFERRAL,
  SourceType.WEBSITE,
  SourceType.MANUAL,
  SourceType.OTHER,
] as const;

export const sourceTypeLabels: Record<SourceType, string> = {
  FACEBOOK: "Facebook",
  TIKTOK: "TikTok",
  ORGANIC: "Organic",
  REFERRAL: "Referral",
  WEBSITE: "Website",
  MANUAL: "Manual",
  OTHER: "Other",
};

export const leadStatusValues = [
  LeadStatus.NEW,
  LeadStatus.CONTACTED,
  LeadStatus.INTERESTED,
  LeadStatus.BOOKED,
  LeadStatus.NO_RESPONSE,
  LeadStatus.LOST,
] as const;

export const leadStatusLabels: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  INTERESTED: "Interested",
  BOOKED: "Booked",
  NO_RESPONSE: "No Response",
  LOST: "Lost",
};
