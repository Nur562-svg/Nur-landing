import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { loginUser } from "@/lib/auth/service";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import type { AuthApiResponse } from "@/types/auth";

const MAX_BODY_BYTES = 16 * 1024;

async function clientIp(): Promise<string> {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request): Promise<Response> {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json<AuthApiResponse>(
        { ok: false, error: "请求内容过大。", field: "form" },
        { status: 413 },
      );
    }
    const body = (await request.json()) as { email?: unknown; password?: unknown };
    if (typeof body.email !== "string" || typeof body.password !== "string") {
      return NextResponse.json<AuthApiResponse>(
        { ok: false, error: "请求格式不正确。", field: "form" },
        { status: 400 },
      );
    }
    const result = await loginUser({ email: body.email, password: body.password }, await clientIp());
    if (!result.ok) {
      return NextResponse.json<AuthApiResponse>(result, { status: 401 });
    }
    const token = await createSessionToken(result.user);
    await setSessionCookie(token);
    return NextResponse.json<AuthApiResponse>({ ok: true, user: result.user });
  } catch {
    return NextResponse.json<AuthApiResponse>(
      { ok: false, error: "服务器暂时不可用，请稍后再试。", field: "form" },
      { status: 500 },
    );
  }
}
