import { errorResponse, successResponse } from "@/lib/api-response";
import {
  formatZodErrors,
  handleRouteError,
  parseRequestBody,
} from "@/lib/route-helpers";
import { loginWithDemoCredentials } from "@/modules/auth/auth.service";
import { loginSchema } from "@/modules/auth/auth.validation";

export async function POST(request: Request) {
  try {
    const body = await parseRequestBody(request);
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        "Invalid login payload.",
        formatZodErrors(validation.error),
        400,
      );
    }

    const result = await loginWithDemoCredentials(validation.data);

    return successResponse("Login successful.", result);
  } catch (error) {
    return handleRouteError(error, "POST /api/auth/login");
  }
}
