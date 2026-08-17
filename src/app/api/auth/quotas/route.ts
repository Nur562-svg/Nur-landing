import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { computeUserQuotas } from "@/lib/quotas-server";

export const dynamic = "force-dynamic";

/**
 * M3: 返回当前登录用户的配额使用情况。
 * 需要登录，否则 401。
 */
export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: session.email },
      select: { id: true },
    });
    if (!dbUser) {
      return NextResponse.json({ ok: false, error: "用户不存在" }, { status: 404 });
    }

    const quotas = await computeUserQuotas(dbUser.id);
    return NextResponse.json({ ok: true, quotas });
  } catch (err) {
    console.error("quotas compute error", err);
    return NextResponse.json({ ok: false, error: "配额计算失败" }, { status: 500 });
  }
}
