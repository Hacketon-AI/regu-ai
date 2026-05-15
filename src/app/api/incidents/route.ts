import { ZodError } from "zod";

import { ApiError, type ApiErrorDetail } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import {
  createIncident,
  listIncidents,
} from "@/modules/incidents/incident.service";
import {
  createIncidentSchema,
  incidentListQuerySchema,
} from "@/modules/incidents/incident.validation";

export async function GET(request: Request) {
  try {
    const query = Object.fromEntries(new URL(request.url).searchParams);
    const validation = incidentListQuerySchema.safeParse(query);

    if (!validation.success) {
      return errorResponse(
        "Invalid incident query parameters.",
        formatZodErrors(validation.error),
        400,
      );
    }

    const result = await listIncidents(validation.data);

    return successResponse("Incidents retrieved successfully.", result);
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await parseRequestBody(request);
    const validation = createIncidentSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        "Invalid incident payload.",
        formatZodErrors(validation.error),
        400,
      );
    }

    const incident = await createIncident(validation.data);

    return successResponse("Incident created successfully.", incident, 201);
  } catch (error) {
    return handleRouteError(error);
  }
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
