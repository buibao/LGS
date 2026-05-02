import { LeadStatus, SourceType } from "@prisma/client";
import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: z.string().min(8, "Phone number is required."),
  email: z.union([z.string().email("Enter a valid email."), z.literal("")]).optional(),
  serviceInterest: z.string().max(120).optional(),
  sourceType: z.nativeEnum(SourceType),
  campaignId: z.string().optional(),
  status: z.nativeEnum(LeadStatus),
  notes: z.string().max(2000).optional(),
  followUpAt: z.string().optional(),
});

export const leadUpdateSchema = z.object({
  status: z.nativeEnum(LeadStatus).optional(),
  notes: z.string().max(2000).optional(),
  followUpAt: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>;
