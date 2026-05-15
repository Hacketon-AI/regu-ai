import { z } from "zod";

const severityValues = ["Low", "Medium", "High", "Critical"] as const;
const incidentStatusValues = [
  "Open",
  "Investigating",
  "Mitigating",
  "Monitoring",
  "Resolved",
  "Closed",
] as const;

const optionalDateTimeSchema = z.string().datetime();
const nullableDateTimeSchema = optionalDateTimeSchema.nullable();

const incidentFieldsSchema = z.object({
  title: z.string().trim().min(3).max(160),
  type: z.string().trim().min(2).max(80),
  severity: z.enum(severityValues),
  status: z.enum(incidentStatusValues),
  affectedSystem: z.string().trim().min(2).max(120),
  impactSummary: z.string().trim().min(5).max(2000),
  affectedUsers: z.number().int().min(0).optional(),
  rawLogs: z.string().max(10_000).optional(),
  suspectedCause: z.string().trim().max(2000).optional(),
  detectedAt: optionalDateTimeSchema.optional(),
  resolvedAt: nullableDateTimeSchema.optional(),
});

export const createIncidentSchema = incidentFieldsSchema;

export const updateIncidentSchema = incidentFieldsSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided.",
  });

export const incidentIdParamSchema = z.object({
  id: z.string().trim().min(1),
});

export const incidentListQuerySchema = z.object({
  search: z.string().trim().min(1).optional(),
  severity: z.enum(severityValues).optional(),
  status: z.enum(incidentStatusValues).optional(),
  type: z.string().trim().min(1).max(80).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;
export type UpdateIncidentInput = z.infer<typeof updateIncidentSchema>;
export type IncidentIdParam = z.infer<typeof incidentIdParamSchema>;
export type IncidentListQuery = z.infer<typeof incidentListQuerySchema>;
