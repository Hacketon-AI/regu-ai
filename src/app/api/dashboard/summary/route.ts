import { successResponse } from "@/lib/api-response";
import { handleRouteError } from "@/lib/route-helpers";
import { getDashboardSummary } from "@/modules/dashboard/dashboard.service";

export async function GET() {
  try {
    const summary = await getDashboardSummary();

    return successResponse("Dashboard summary retrieved successfully.", summary);
  } catch (error) {
    return handleRouteError(error, "GET /api/dashboard/summary");
  }
}
