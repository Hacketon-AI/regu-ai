import { Prisma, type Incident, type User } from "@prisma/client";

import { ApiError } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { sanitizeRawLogs } from "@/lib/sanitize";
import { createAuditTrail } from "@/modules/audit/audit.service";
import type {
  CreateIncidentInput,
  IncidentListQuery,
  UpdateIncidentInput,
} from "@/modules/incidents/incident.validation";
import type {
  IncidentAuditSummary,
  IncidentDetail,
  IncidentListItem,
  IncidentListResult,
} from "@/modules/incidents/incident.types";

const DEMO_ACTOR = "Demo User";
const DEMO_USER_EMAIL = "demo@reguai.local";

const incidentListSelect = {
  id: true,
  title: true,
  type: true,
  severity: true,
  status: true,
  affectedSystem: true,
  impactSummary: true,
  affectedUsers: true,
  suspectedCause: true,
  detectedAt: true,
  resolvedAt: true,
  createdAt: true,
  updatedAt: true,
  aiReport: {
    select: {
      id: true,
    },
  },
} satisfies Prisma.IncidentSelect;

const incidentDetailInclude = {
  aiReport: true,
  tasks: {
    orderBy: {
      createdAt: "asc",
    },
  },
  auditTrails: {
    orderBy: {
      createdAt: "desc",
    },
  },
} satisfies Prisma.IncidentInclude;

const incidentAuditFields = [
  "title",
  "type",
  "severity",
  "status",
  "affectedSystem",
  "impactSummary",
  "affectedUsers",
  "rawLogs",
  "suspectedCause",
  "detectedAt",
  "resolvedAt",
] as const;

type IncidentAuditField = (typeof incidentAuditFields)[number];
type IncidentListRecord = Prisma.IncidentGetPayload<{
  select: typeof incidentListSelect;
}>;
type IncidentDetailRecord = Prisma.IncidentGetPayload<{
  include: typeof incidentDetailInclude;
}>;

export async function createIncident(
  input: CreateIncidentInput,
): Promise<Incident> {
  const demoUser = await getOrCreateDemoUser();

  const createdIncident = await prisma.incident.create({
    data: {
      title: input.title,
      type: input.type,
      severity: input.severity,
      status: input.status,
      affectedSystem: input.affectedSystem,
      impactSummary: input.impactSummary,
      affectedUsers: input.affectedUsers ?? 0,
      rawLogs: sanitizeRawLogs(input.rawLogs),
      suspectedCause: input.suspectedCause ?? null,
      detectedAt: input.detectedAt ?? new Date(),
      resolvedAt: input.resolvedAt,
      createdBy: demoUser.id,
    },
  });

  await createAuditTrail({
    incidentId: createdIncident.id,
    action: "Incident created",
    actor: DEMO_ACTOR,
    oldValue: null,
    newValue: buildIncidentSummary(createdIncident),
    note: "Incident record created",
  });

  return createdIncident;
}

export async function listIncidents(
  query: IncidentListQuery,
): Promise<IncidentListResult> {
  const where = buildIncidentWhereInput(query);
  const skip = (query.page - 1) * query.limit;

  const [items, total] = await prisma.$transaction([
    prisma.incident.findMany({
      where,
      select: incidentListSelect,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: query.limit,
    }),
    prisma.incident.count({ where }),
  ]);

  return {
    items: items.map(toIncidentListItem),
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

export async function getIncidentById(id: string): Promise<IncidentDetail> {
  const incident = await prisma.incident.findUnique({
    where: { id },
    include: incidentDetailInclude,
  });

  if (!incident) {
    throw new ApiError("Incident not found.", 404);
  }

  return toIncidentDetail(incident);
}

export async function updateIncident(
  id: string,
  input: UpdateIncidentInput,
): Promise<Incident> {
  const existingIncident = await prisma.incident.findUnique({
    where: { id },
  });

  if (!existingIncident) {
    throw new ApiError("Incident not found.", 404);
  }

  const data = buildIncidentUpdateData(input, existingIncident);

  const updatedIncident = await prisma.incident.update({
    where: { id },
    data,
  });

  const { oldValue, newValue } = buildChangedAuditValues(
    existingIncident,
    updatedIncident,
    data,
  );

  await createAuditTrail({
    incidentId: updatedIncident.id,
    action: "Incident updated",
    actor: DEMO_ACTOR,
    oldValue,
    newValue,
    note: "Incident record updated",
  });

  return updatedIncident;
}

export async function deleteIncident(id: string): Promise<{ id: string }> {
  const incident = await prisma.incident.findUnique({
    where: { id },
    select: {
      id: true,
    },
  });

  if (!incident) {
    throw new ApiError("Incident not found.", 404);
  }

  // Audit trails belong to an incident and cascade with it, so a hard delete
  // cannot retain an "Incident deleted" audit record with the current schema.
  await prisma.incident.delete({
    where: { id },
  });

  return { id };
}

function buildIncidentWhereInput(
  query: IncidentListQuery,
): Prisma.IncidentWhereInput {
  const filters: Prisma.IncidentWhereInput[] = [];

  if (query.search) {
    filters.push({
      OR: [
        { title: { contains: query.search, mode: "insensitive" } },
        { type: { contains: query.search, mode: "insensitive" } },
        { affectedSystem: { contains: query.search, mode: "insensitive" } },
        { impactSummary: { contains: query.search, mode: "insensitive" } },
      ],
    });
  }

  if (query.severity) {
    filters.push({ severity: query.severity });
  }

  if (query.status) {
    filters.push({ status: query.status });
  }

  if (query.type) {
    filters.push({
      type: {
        contains: query.type,
        mode: "insensitive",
      },
    });
  }

  return filters.length > 0 ? { AND: filters } : {};
}

function buildIncidentUpdateData(
  input: UpdateIncidentInput,
  existingIncident: Incident,
): Prisma.IncidentUpdateInput {
  const data: Prisma.IncidentUpdateInput = {};

  if (input.title !== undefined) data.title = input.title;
  if (input.type !== undefined) data.type = input.type;
  if (input.severity !== undefined) data.severity = input.severity;
  if (input.status !== undefined) data.status = input.status;
  if (input.affectedSystem !== undefined) data.affectedSystem = input.affectedSystem;
  if (input.impactSummary !== undefined) data.impactSummary = input.impactSummary;
  if (input.affectedUsers !== undefined) data.affectedUsers = input.affectedUsers;
  if (input.rawLogs !== undefined) data.rawLogs = sanitizeRawLogs(input.rawLogs);
  if (input.suspectedCause !== undefined) {
    data.suspectedCause = input.suspectedCause;
  }
  if (input.detectedAt !== undefined) data.detectedAt = input.detectedAt;

  if (input.resolvedAt !== undefined) {
    data.resolvedAt = input.resolvedAt;
  } else if (input.status === "Resolved" && existingIncident.status !== "Resolved") {
    data.resolvedAt = new Date();
  }

  return data;
}

function buildChangedAuditValues(
  before: Incident,
  after: Incident,
  data: Prisma.IncidentUpdateInput,
): {
  oldValue: IncidentAuditSummary;
  newValue: IncidentAuditSummary;
} {
  const oldValue: IncidentAuditSummary = {};
  const newValue: IncidentAuditSummary = {};

  for (const field of incidentAuditFields) {
    if (!(field in data)) {
      continue;
    }

    const previousValue = serializeIncidentFieldValue(before[field]);
    const nextValue = serializeIncidentFieldValue(after[field]);

    if (previousValue !== nextValue) {
      oldValue[field] = previousValue;
      newValue[field] = nextValue;
    }
  }

  return { oldValue, newValue };
}

function buildIncidentSummary(incident: Incident): IncidentAuditSummary {
  return {
    id: incident.id,
    title: incident.title,
    type: incident.type,
    severity: incident.severity,
    status: incident.status,
    affectedSystem: incident.affectedSystem,
    detectedAt: incident.detectedAt.toISOString(),
  };
}

function serializeIncidentFieldValue(
  value: Incident[IncidentAuditField],
): Prisma.InputJsonValue | null {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}

function toIncidentListItem(incident: IncidentListRecord): IncidentListItem {
  const { aiReport, ...item } = incident;

  return {
    ...item,
    hasReport: aiReport !== null,
  };
}

function toIncidentDetail(incident: IncidentDetailRecord): IncidentDetail {
  const { aiReport, ...rest } = incident;

  return {
    ...rest,
    report: aiReport,
  };
}

async function getOrCreateDemoUser(): Promise<User> {
  return prisma.user.upsert({
    where: {
      email: DEMO_USER_EMAIL,
    },
    update: {},
    create: {
      name: DEMO_ACTOR,
      email: DEMO_USER_EMAIL,
      role: "Demo Admin",
    },
  });
}
