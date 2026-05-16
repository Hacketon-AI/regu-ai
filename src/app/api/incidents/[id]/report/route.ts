import { ApiError } from "@/lib/api-error";
import { successResponse } from "@/lib/api-response";
import { formatZodErrors, handleRouteError } from "@/lib/route-helpers";
import { incidentIdParamSchema } from "@/modules/incidents/incident.validation";
import { getSavedIncidentReport } from "@/modules/reports/report.service";

type IncidentReportRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: IncidentReportRouteContext) {
  try {
    const { id } = await parseParams(context);
    const report = await getSavedIncidentReport(id);

    return successResponse("Incident report retrieved successfully.", report);
  } catch (error) {
    return handleRouteError(error, "GET /api/incidents/[id]/report");
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
