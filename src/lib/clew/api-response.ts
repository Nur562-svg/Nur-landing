import { NextResponse } from "next/server";
import type { ClewApiFailure, ClewErrorCode } from "@/types/clew";

/** Clew API 统一失败响应（thin adapter 共用）。 */
export function clewFailure(status: number, code: ClewErrorCode, message: string) {
  const body: ClewApiFailure = { ok: false, code, error: message };
  return NextResponse.json(body, { status });
}

export function clewServiceFailure(failure: {
  status: number;
  code: ClewErrorCode;
  message: string;
}) {
  return clewFailure(failure.status, failure.code, failure.message);
}

export function clewUnauthorized(action: string) {
  return clewFailure(401, "unauthorized", `请先登录后再${action}。`);
}