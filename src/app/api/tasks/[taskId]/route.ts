import { ApiError } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import {
  formatZodErrors,
  handleRouteError,
  parseRequestBody,
} from "@/lib/route-helpers";
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
    return handleRouteError(error, "PATCH /api/tasks/[taskId]");
  }
}

export async function DELETE(_request: Request, context: TaskRouteContext) {
  try {
    const { taskId } = await parseParams(context);
    const deletedTask = await deleteIncidentTask(taskId);

    return successResponse("Incident task deleted successfully.", deletedTask);
  } catch (error) {
    return handleRouteError(error, "DELETE /api/tasks/[taskId]");
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
