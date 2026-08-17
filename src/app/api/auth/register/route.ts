import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth/service";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import type { AuthApiResponse } from "@/types/auth";

const MAX_BODY_BYTES = 16 * 1024;

export async function POST(request: Request): Promise<Response> {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json<AuthApiResponse>(
        { ok: false, error: "请求内容过大。", field: "form" },
        { status: 413 },
      );
    }
    const body = (await request.json()) as { email?: unknown; password?: unknown; displayName?: unknown };
    if (typeof body.email !== "string" || typeof body.password !== "string") {
      return NextResponse.json<AuthApiResponse>(
        { ok: false, error: "请求格式不正确。", field: "form" },
        { status: 400 },
      );
    }
    const result = await registerUser({
      email: body.email,
      password: body.password,
      displayName: typeof body.displayName === "string" ? body.displayName : undefined,
    });
    if (!result.ok) {
      return NextResponse.json<AuthApiResponse>(result, { status: 400 });
    }
    const token = await createSessionToken(result.user);
    await setSessionCookie(token);
    return NextResponse.json<AuthApiResponse>({ ok: true, user: result.user });
  } catch (e) {
    console.error("[/api/auth/register] error:", e);
    return NextResponse.json<AuthApiResponse>(
      { ok: false, error: "服务器暂时不可用，请稍后再试。", field: "form" },
      { status: 500 },
    );
  }
}
