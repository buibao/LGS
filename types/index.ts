import { LeadStatus, SourceType } from "@prisma/client";

export const sourceTypeLabels: Record<SourceType, string> = {
  FACEBOOK: "Facebook",
  TIKTOK: "TikTok",
  ORGANIC: "Organic",
  REFERRAL: "Referral",
  WEBSITE: "Website",
  MANUAL: "Manual",
  OTHER: "Other",
};

export const leadStatusLabels: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  INTERESTED: "Interested",
  BOOKED: "Booked",
  NO_RESPONSE: "No Response",
  LOST: "Lost",
};
