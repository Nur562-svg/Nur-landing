import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import type { AuthUserView } from "@/types/auth";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4 * 1024;

/**
 * M4: 密码重置。
 * POST /api/auth/reset-password
 * Body: { token: string, password: string }
 *
 * 验证令牌（有效+未过期+未使用）→ 更新密码 → 标记令牌已用 → 签发新会话。
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "请求内容过大" }, { status: 413 });
    }

    const body = (await request.json()) as { token?: unknown; password?: unknown };
    if (typeof body.token !== "string" || typeof body.password !== "string") {
      return NextResponse.json({ ok: false, error: "参数不正确" }, { status: 400 });
    }

    const passwordError = validatePasswordStrength(body.password);
    if (passwordError) {
      return NextResponse.json({ ok: false, error: passwordError }, { status: 400 });
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: body.token },
      include: { user: true },
    });

    if (!resetToken) {
      return NextResponse.json({ ok: false, error: "重置链接无效" }, { status: 400 });
    }

    if (resetToken.usedAt) {
      return NextResponse.json({ ok: false, error: "该重置链接已使用，请重新申请" }, { status: 400 });
    }

    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json({ ok: false, error: "重置链接已过期，请重新申请" }, { status: 400 });
    }

    // 事务：更新密码 + 标记令牌已用
    const passwordHash = await hashPassword(body.password);
    const updated = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      });
      await tx.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      });
      return user;
    });

    // 签发新会话
    const userView: AuthUserView = {
      id: updated.id,
      email: updated.email,
      displayName: updated.displayName,
      membershipTier: updated.membershipTier === "pro" ? "pro" : updated.membershipTier === "lite" ? "lite" : "free",
      membershipExpiresAt: updated.membershipExpiresAt?.toISOString() ?? null,
      emailVerified: !!updated.emailVerifiedAt,
      createdAt: updated.createdAt.toISOString(),
    };

    const token = await createSessionToken(userView);
    await setSessionCookie(token);

    return NextResponse.json({ ok: true, user: userView, message: "密码已重置，已自动登录" });
  } catch (e) {
    console.error("[/api/auth/reset-password] error:", e);
    return NextResponse.json({ ok: false, error: "服务器暂时不可用" }, { status: 500 });
  }
}
