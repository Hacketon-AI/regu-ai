import { ApiError } from "@/lib/api-error";
import { errorResponse, successResponse } from "@/lib/api-response";
import { getDashboardSummary } from "@/modules/dashboard/dashboard.service";

export async function GET() {
  try {
    const summary = await getDashboardSummary();

    return successResponse("Dashboard summary retrieved successfully.", summary);
  } catch (error) {
    return handleRouteError(error);
  }
}

function handleRouteError(error: unknown) {
  if (error instanceof ApiError) {
    return errorResponse(error.message, error.errors, error.statusCode);
  }

  return errorResponse("Unexpected server error.", [], 500);
}
