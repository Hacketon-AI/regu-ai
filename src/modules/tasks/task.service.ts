import { Prisma, type IncidentTask } from "@prisma/client";

import { ApiError } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { createAuditTrail } from "@/modules/audit/audit.service";
import type {
  CreateTaskInput,
  UpdateTaskInput,
} from "@/modules/tasks/task.validation";

const DEMO_ACTOR = "Demo User";
const DEFAULT_TASK_OWNER = "Unassigned";

const taskAuditFields = [
  "title",
  "description",
  "owner",
  "status",
  "priority",
  "dueDate",
] as const;

type TaskAuditField = (typeof taskAuditFields)[number];
type TaskAuditSummary = Record<string, Prisma.InputJsonValue | null>;

export async function listIncidentTasks(
  incidentId: string,
): Promise<IncidentTask[]> {
  await ensureIncidentExists(incidentId);

  return prisma.incidentTask.findMany({
    where: { incidentId },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function createIncidentTask(
  incidentId: string,
  input: CreateTaskInput,
): Promise<IncidentTask> {
  await ensureIncidentExists(incidentId);

  const task = await prisma.incidentTask.create({
    data: {
      incidentId,
      title: input.title,
      description: input.description ?? null,
      owner: input.owner ?? DEFAULT_TASK_OWNER,
      status: input.status,
      priority: input.priority,
      dueDate: input.dueDate,
    },
  });

  await createAuditTrail({
    incidentId,
    action: "Task created",
    actor: DEMO_ACTOR,
    oldValue: null,
    newValue: buildTaskSummary(task),
    note: "Incident task created",
  });

  return task;
}

export async function updateIncidentTask(
  taskId: string,
  input: UpdateTaskInput,
): Promise<IncidentTask> {
  const existingTask = await findTaskOrThrow(taskId);
  const data = buildTaskUpdateData(input);

  const updatedTask = await prisma.incidentTask.update({
    where: { id: taskId },
    data,
  });

  const { oldValue, newValue } = buildChangedAuditValues(
    existingTask,
    updatedTask,
    data,
  );

  await createAuditTrail({
    incidentId: updatedTask.incidentId,
    action: "Task updated",
    actor: DEMO_ACTOR,
    oldValue,
    newValue,
    note: buildUpdateAuditNote(existingTask, updatedTask),
  });

  return updatedTask;
}

export async function deleteIncidentTask(taskId: string): Promise<{ id: string }> {
  const task = await findTaskOrThrow(taskId);

  await createAuditTrail({
    incidentId: task.incidentId,
    action: "Task deleted",
    actor: DEMO_ACTOR,
    oldValue: buildTaskSummary(task),
    newValue: null,
    note: "Incident task deleted",
  });

  await prisma.incidentTask.delete({
    where: { id: taskId },
  });

  return { id: taskId };
}

async function ensureIncidentExists(incidentId: string): Promise<void> {
  const incident = await prisma.incident.findUnique({
    where: { id: incidentId },
    select: { id: true },
  });

  if (!incident) {
    throw new ApiError("Incident not found.", 404);
  }
}

async function findTaskOrThrow(taskId: string): Promise<IncidentTask> {
  const task = await prisma.incidentTask.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw new ApiError("Task not found.", 404);
  }

  return task;
}

function buildTaskUpdateData(
  input: UpdateTaskInput,
): Prisma.IncidentTaskUpdateInput {
  const data: Prisma.IncidentTaskUpdateInput = {};

  if (input.title !== undefined) data.title = input.title;
  if (input.description !== undefined) data.description = input.description;
  if (input.owner !== undefined) data.owner = input.owner;
  if (input.status !== undefined) data.status = input.status;
  if (input.priority !== undefined) data.priority = input.priority;
  if (input.dueDate !== undefined) data.dueDate = input.dueDate;

  return data;
}

function buildChangedAuditValues(
  before: IncidentTask,
  after: IncidentTask,
  data: Prisma.IncidentTaskUpdateInput,
): {
  oldValue: TaskAuditSummary;
  newValue: TaskAuditSummary;
} {
  const oldValue: TaskAuditSummary = {};
  const newValue: TaskAuditSummary = {};

  for (const field of taskAuditFields) {
    if (!(field in data)) {
      continue;
    }

    const previousValue = serializeTaskFieldValue(before[field]);
    const nextValue = serializeTaskFieldValue(after[field]);

    if (previousValue !== nextValue) {
      oldValue[field] = previousValue;
      newValue[field] = nextValue;
    }
  }

  return { oldValue, newValue };
}

function buildTaskSummary(task: IncidentTask): TaskAuditSummary {
  return {
    id: task.id,
    title: task.title,
    owner: task.owner,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate?.toISOString() ?? null,
  };
}

function buildUpdateAuditNote(before: IncidentTask, after: IncidentTask): string {
  if (before.status !== after.status) {
    return `Incident task updated. Status changed from ${before.status} to ${after.status}.`;
  }

  return "Incident task updated";
}

function serializeTaskFieldValue(
  value: IncidentTask[TaskAuditField],
): Prisma.InputJsonValue | null {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}
