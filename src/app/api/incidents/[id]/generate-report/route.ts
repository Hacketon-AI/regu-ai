import { ZodError } from "zod";

import { ApiError, type ApiErrorDetail } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import { incidentIdParamSchema } from "@/modules/incidents/incident.validation";
import { generateIncidentReport } from "@/modules/reports/report.service";

type IncidentReportRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  _request: Request,
  context: IncidentReportRouteContext,
) {
  try {
    const { id } = await parseParams(context);
    const report = await generateIncidentReport(id);

    return successResponse("Incident report generated successfully.", report);
  } catch (error) {
    return handleRouteError(error);
  }
}

async function parseParams(
  context: IncidentReportRouteContext,
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
