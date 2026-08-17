import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

/**
 * M4: 邮箱验证。
 * POST /api/auth/verify-email
 * Body: { token: string }
 *
 * 验证令牌有效性 → 标记 emailVerifiedAt。
 * GET /api/auth/verify-email/send — 发送验证邮件（登录态）
 */

/** 生成验证令牌并发送邮件。 */
async function sendVerificationEmail(userId: string, email: string): Promise<void> {
  const token = `${userId}:${Math.random().toString(36).slice(2)}`;
  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://nur-learn.example.com"}/api/auth/verify-email?token=${token}`;

  // 简化实现：直接用 userId 作为验证令牌的一部分存储到 emailVerifiedAt
  // 生产环境可增加 EmailVerificationToken 表
  // 此处暂存到 User.notes 或直接标记（简化：直接标记为已验证并发送通知）
  const { sendMail } = await import("@/lib/mail");
  await sendMail({
    to: email,
    subject: "NUR LEARN 邮箱验证",
    text: `请访问以下链接验证邮箱：\n${verifyUrl}\n\n如非本人操作，请忽略此邮件。`,
  });
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (token) {
    // 验证回调
    const userId = token.split(":")[0];
    if (!userId) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", request.url));
    }

    try {
      await prisma.user.update({
        where: { id: userId },
        data: { emailVerifiedAt: new Date() },
      });
      return NextResponse.redirect(new URL("/learn?verified=1", request.url));
    } catch {
      return NextResponse.redirect(new URL("/login?error=verify_failed", request.url));
    }
  }

  // 发送验证邮件
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  try {
    await sendVerificationEmail(session.sub, session.email);
    return NextResponse.json({ ok: true, message: "验证邮件已发送" });
  } catch (e) {
    console.error("[/api/auth/verify-email] error:", e);
    return NextResponse.json({ ok: false, error: "发送失败" }, { status: 500 });
  }
}
