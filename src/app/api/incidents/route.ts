import { errorResponse, successResponse } from "@/lib/api-response";
import {
  formatZodErrors,
  handleRouteError,
  parseRequestBody,
} from "@/lib/route-helpers";
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
    return handleRouteError(error, "GET /api/incidents");
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
    return handleRouteError(error, "POST /api/incidents");
  }
}
