import { ZodError } from "zod";

import { ApiError, type ApiErrorDetail } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import {
  deleteIncidentTask,
  updateIncidentTask,
} from "@/modules/tasks/task.service";
import {
  taskIdParamSchema,
  updateTaskSchema,
} from "@/modules/tasks/task.validation";

type TaskRouteContext = {
  params: Promise<{
    taskId: string;
  }>;
};

export async function PATCH(request: Request, context: TaskRouteContext) {
  try {
    const { taskId } = await parseParams(context);
    const body = await parseRequestBody(request);
    const validation = updateTaskSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        "Invalid task payload.",
        formatZodErrors(validation.error),
        400,
      );
    }

    const task = await updateIncidentTask(taskId, validation.data);

    return successResponse("Incident task updated successfully.", task);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_request: Request, context: TaskRouteContext) {
  try {
    const { taskId } = await parseParams(context);
    const deletedTask = await deleteIncidentTask(taskId);

    return successResponse("Incident task deleted successfully.", deletedTask);
  } catch (error) {
    return handleRouteError(error);
  }
}

async function parseParams(
  context: TaskRouteContext,
): Promise<{ taskId: string }> {
  const params = await context.params;
  const validation = taskIdParamSchema.safeParse(params);

  if (!validation.success) {
    throw new ApiError(
      "Invalid task id.",
      400,
      formatZodErrors(validation.error),
    );
  }

  return validation.data;
}

async function parseRequestBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ApiError("Invalid JSON request body.", 400);
  }
}

function handleRouteError(error: unknown) {
  if (error instanceof ApiError) {
    return errorResponse(error.message, error.errors, error.statusCode);
  }

  return errorResponse("Unexpected server error.", [], 500);
}

function formatZodErrors(error: ZodError): ApiErrorDetail[] {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}
