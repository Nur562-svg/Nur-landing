import { NextResponse } from "next/server";
import type { HiDocApiFailure, HiDocErrorCode } from "@/types/hidoc";

/** Hi doc API 统一失败响应（thin adapter 共用）。 */
export function hiDocFailure(status: number, code: HiDocErrorCode, message: string) {
  const body: HiDocApiFailure = { ok: false, code, error: message };
  return NextResponse.json(body, { status });
}

export function hiDocServiceFailure(failure: {
  status: number;
  code: HiDocErrorCode;
  message: string;
}) {
  return hiDocFailure(failure.status, failure.code, failure.message);
}

export function hiDocUnauthorized(action: string) {
  return hiDocFailure(401, "unauthorized", `请先登录后再${action}。`);
}