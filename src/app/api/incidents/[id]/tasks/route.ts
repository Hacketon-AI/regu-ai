import { ApiError } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import {
  formatZodErrors,
  handleRouteError,
  parseRequestBody,
} from "@/lib/route-helpers";
import {
  createIncidentTask,
  listIncidentTasks,
} from "@/modules/tasks/task.service";
import {
  createTaskSchema,
  incidentTaskParamSchema,
} from "@/modules/tasks/task.validation";

type IncidentTasksRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: IncidentTasksRouteContext) {
  try {
    const { id } = await parseParams(context);
    const tasks = await listIncidentTasks(id);

    return successResponse("Incident tasks retrieved successfully.", tasks);
  } catch (error) {
    return handleRouteError(error, "GET /api/incidents/[id]/tasks");
  }
}

export async function POST(request: Request, context: IncidentTasksRouteContext) {
  try {
    const { id } = await parseParams(context);
    const body = await parseRequestBody(request);
    const validation = createTaskSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        "Invalid task payload.",
        formatZodErrors(validation.error),
        400,
      );
    }

    const task = await createIncidentTask(id, validation.data);

    return successResponse("Incident task created successfully.", task, 201);
  } catch (error) {
    return handleRouteError(error, "POST /api/incidents/[id]/tasks");
  }
}

async function parseParams(
  context: IncidentTasksRouteContext,
): Promise<{ id: string }> {
  const params = await context.params;
  const validation = incidentTaskParamSchema.safeParse(params);

  if (!validation.success) {
    throw new ApiError(
      "Invalid incident id.",
      400,
      formatZodErrors(validation.error),
    );
  }

  return validation.data;
}
