import { NextResponse } from "next/server";
import { getCurrentSession, createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import type { AuthUserView } from "@/types/auth";

export const dynamic = "force-dynamic";

/**
 * M3 Demo: 将当前用户升级为 Pro（纯演示，不涉及支付）。
 * 成功后重新签发 session cookie。
 */
export async function POST() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.email },
      select: { id: true, email: true, displayName: true, membershipTier: true, createdAt: true },
    });

    if (!user) {
      return NextResponse.json({ ok: false, error: "用户不存在" }, { status: 404 });
    }

    if (user.membershipTier === "pro") {
      return NextResponse.json({
        ok: true,
        message: "已经是 Pro",
        user: { id: user.id, email: user.email, displayName: user.displayName, membershipTier: "pro" as const },
      });
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { membershipTier: "pro", usage: {} }, // M3: reset usage on upgrade for demo
    });

    // 构造 AuthUserView 重新签发 session
    const newUserView: AuthUserView = {
      id: updated.id,
      email: updated.email,
      displayName: updated.displayName,
      membershipTier: "pro",
      membershipExpiresAt: null,
      emailVerified: false,
      createdAt: updated.createdAt.toISOString(),
    };

    const token = await createSessionToken(newUserView);
    await setSessionCookie(token);

    return NextResponse.json({
      ok: true,
      message: "已升级为 Pro（演示）",
      user: {
        id: updated.id,
        email: updated.email,
        displayName: updated.displayName,
        membershipTier: "pro",
      },
    });
  } catch (err) {
    console.error("demo upgrade error", err);
    return NextResponse.json({ ok: false, error: "升级失败" }, { status: 500 });
  }
}
