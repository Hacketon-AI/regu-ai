export type ApiErrorDetail =
  | string
  | {
      field?: string;
      message: string;
    }
  | Record<string, unknown>;

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errors: ApiErrorDetail[];
  readonly isOperational = true;

  constructor(
    message: string,
    statusCode = 500,
    errors: ApiErrorDetail[] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace?.(this, ApiError);
  }
}
