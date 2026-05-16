import { ZodError } from "zod";

import { ApiError, type ApiErrorDetail } from "./api-error";
import { errorResponse } from "./api-response";
import { logger } from "./logger";

export function handleRouteError(error: unknown, context?: string) {
  if (error instanceof ApiError) {
    logger.error("API error occurred", error, { context, statusCode: error.statusCode });
    return errorResponse(error.message, error.errors, error.statusCode);
  }

  logger.error("Unexpected error occurred", error, { context });
  return errorResponse("Unexpected server error.", [], 500);
}

export function formatZodErrors(error: ZodError): ApiErrorDetail[] {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

export async function parseRequestBody(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch (error) {
    logger.warn("Invalid JSON in request body", { error });
    throw new ApiError("Invalid JSON request body.", 400);
  }
}

// Made with Bob
