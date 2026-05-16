import { successResponse } from "@/lib/api-response";
import { handleRouteError } from "@/lib/route-helpers";
import { getCurrentDemoUser } from "@/modules/auth/auth.service";

export async function GET(request: Request) {
  try {
    const user = await getCurrentDemoUser(request.headers.get("authorization"));

    return successResponse("Current user retrieved successfully.", user);
  } catch (error) {
    return handleRouteError(error, "GET /api/auth/me");
  }
}
