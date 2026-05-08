import { LeadStatus, SourceType } from "@prisma/client";
import { z } from "zod";

const optionalEmailSchema = z.union([z.string().trim().email("Enter a valid email."), z.literal("")]).optional();
const optionalShortTextSchema = z.string().trim().max(120).optional();
const optionalNotesSchema = z.string().trim().max(2000).optional();

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  phone: z.string().trim().min(8, "Phone number is required."),
  email: optionalEmailSchema,
  serviceInterest: optionalShortTextSchema,
  preferredContactTime: optionalShortTextSchema,
  sourceType: z.nativeEnum(SourceType),
  campaignId: z.string().optional(),
  status: z.nativeEnum(LeadStatus),
  notes: optionalNotesSchema,
  followUpAt: z.string().optional(),
});

export const leadUpdateSchema = z.object({
  status: z.nativeEnum(LeadStatus).optional(),
  notes: optionalNotesSchema,
  followUpAt: z.string().optional(),
});

export const publicCaptureSourceSchema = z.enum([
  "FACEBOOK",
  "TIKTOK",
  "ORGANIC",
  "REFERRAL",
  "WEBSITE",
  "OTHER",
]);

export const publicCaptureLeadSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  phone: z.string().trim().min(8, "Phone number is required."),
  email: optionalEmailSchema,
  serviceInterest: optionalShortTextSchema,
  preferredContactTime: optionalShortTextSchema,
  notes: optionalNotesSchema,
  sourceType: publicCaptureSourceSchema,
  campaignId: z.string().optional(),
  honey: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>;
export type PublicCaptureLeadInput = z.infer<typeof publicCaptureLeadSchema>;
