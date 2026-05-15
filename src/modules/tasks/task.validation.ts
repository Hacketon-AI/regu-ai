import { z } from "zod";

const taskStatusValues = ["ToDo", "InProgress", "Done", "Blocked"] as const;
const priorityValues = ["Low", "Medium", "High", "Critical"] as const;

const nullableDateTimeSchema = z.string().datetime().nullable();

const taskFieldsSchema = z.object({
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().max(2000).optional(),
  owner: z.string().trim().max(120).optional(),
  status: z.enum(taskStatusValues),
  priority: z.enum(priorityValues),
  dueDate: nullableDateTimeSchema.optional(),
});

export const createTaskSchema = taskFieldsSchema;

export const updateTaskSchema = taskFieldsSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided.",
  });

export const taskIdParamSchema = z.object({
  taskId: z.string().trim().min(1),
});

export const incidentTaskParamSchema = z.object({
  id: z.string().trim().min(1),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskIdParam = z.infer<typeof taskIdParamSchema>;
export type IncidentTaskParam = z.infer<typeof incidentTaskParamSchema>;
