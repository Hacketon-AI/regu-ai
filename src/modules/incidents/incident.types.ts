import type {
  Incident,
  IncidentAiReport,
  IncidentAuditTrail,
  IncidentTask,
  Prisma,
} from "@prisma/client";

export type IncidentListItem = Pick<
  Incident,
  | "id"
  | "title"
  | "type"
  | "severity"
  | "status"
  | "affectedSystem"
  | "impactSummary"
  | "affectedUsers"
  | "suspectedCause"
  | "detectedAt"
  | "resolvedAt"
  | "createdAt"
  | "updatedAt"
> & {
  hasReport: boolean;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type IncidentListResult = {
  items: IncidentListItem[];
  pagination: PaginationMeta;
};

export type IncidentDetail = Incident & {
  report: IncidentAiReport | null;
  tasks: IncidentTask[];
  auditTrails: IncidentAuditTrail[];
};

export type IncidentAuditSummary = Record<string, Prisma.InputJsonValue | null>;
