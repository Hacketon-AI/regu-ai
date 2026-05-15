import { ZodError } from "zod";

import { ApiError, type ApiErrorDetail } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import {
  deleteIncident,
  getIncidentById,
  updateIncident,
} from "@/modules/incidents/incident.service";
import {
  incidentIdParamSchema,
  updateIncidentSchema,
} from "@/modules/incidents/incident.validation";

type IncidentRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: IncidentRouteContext) {
  try {
    const { id } = await parseParams(context);
    const incident = await getIncidentById(id);

    return successResponse("Incident retrieved successfully.", incident);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(request: Request, context: IncidentRouteContext) {
  try {
    const { id } = await parseParams(context);
    const body = await parseRequestBody(request);
    const validation = updateIncidentSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        "Invalid incident payload.",
        formatZodErrors(validation.error),
        400,
      );
    }

    const incident = await updateIncident(id, validation.data);

    return successResponse("Incident updated successfully.", incident);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(_request: Request, context: IncidentRouteContext) {
  try {
    const { id } = await parseParams(context);
    const deletedIncident = await deleteIncident(id);

    return successResponse("Incident deleted successfully.", deletedIncident);
  } catch (error) {
    return handleRouteError(error);
  }
}

async function parseParams(
  context: IncidentRouteContext,
): Promise<{ id: string }> {
  const params = await context.params;
  const validation = incidentIdParamSchema.safeParse(params);

  if (!validation.success) {
    throw new ApiError(
      "Invalid incident id.",
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
