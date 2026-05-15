import { Prisma, type IncidentAuditTrail } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type CreateAuditTrailInput = {
  incidentId: string;
  action: string;
  actor: string;
  oldValue?: Prisma.InputJsonValue | null;
  newValue?: Prisma.InputJsonValue | null;
  note?: string | null;
};

export async function createAuditTrail(
  input: CreateAuditTrailInput,
): Promise<IncidentAuditTrail> {
  const data: Prisma.IncidentAuditTrailUncheckedCreateInput = {
    incidentId: input.incidentId,
    action: input.action,
    actor: input.actor,
    note: input.note ?? null,
  };

  if (input.oldValue !== undefined) {
    data.oldValue = input.oldValue ?? Prisma.JsonNull;
  }

  if (input.newValue !== undefined) {
    data.newValue = input.newValue ?? Prisma.JsonNull;
  }

  return prisma.incidentAuditTrail.create({ data });
}
