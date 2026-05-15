import { NextResponse } from "next/server";

import type { ApiErrorDetail } from "./api-error";

export type ApiSuccessResponse<TData> = {
  success: true;
  message: string;
  data: TData;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors: ApiErrorDetail[];
};

export function successResponse<TData>(
  message: string,
  data: TData,
  status = 200,
): NextResponse<ApiSuccessResponse<TData>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status },
  );
}

export function errorResponse(
  message: string,
  errors: ApiErrorDetail[] = [],
  status = 500,
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status },
  );
}
