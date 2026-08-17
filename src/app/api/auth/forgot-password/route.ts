import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";
import { sendMail } from "@/lib/mail";
import { SITE_URL } from "@/lib/site-config";

export const dynamic = "force-dynamic";

const TOKEN_TTL_MINUTES = 15;
const MAX_BODY_BYTES = 4 * 1024;

/**
 * M4: 密码重置请求。
 * POST /api/auth/forgot-password
 * Body: { email: string }
 *
 * 生成一次性重置令牌（15 分钟过期），发送重置链接邮件。
 * 为防止账户枚举：无论邮箱是否存在都返回相同成功响应。
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "请求内容过大" }, { status: 413 });
    }

    const body = (await request.json()) as { email?: unknown };
    if (typeof body.email !== "string") {
      return NextResponse.json({ ok: false, error: "请输入邮箱地址" }, { status: 400 });
    }

    const email = body.email.trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = randomUUID();
      const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000);

      // 清除旧令牌并创建新令牌
      await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
      await prisma.passwordResetToken.create({
        data: { userId: user.id, token, expiresAt },
      });

      // 发送重置邮件（console 模式下输出到终端）
      const resetUrl = `${SITE_URL}/reset-password?token=${token}`;
      await sendMail({
        to: email,
        subject: "NUR LEARN 密码重置",
        text: `你收到这封邮件是因为你的 NUR LEARN 账户发起了密码重置请求。\n\n请访问以下链接重置密码（15 分钟内有效，一次性使用）：\n${resetUrl}\n\n如非本人操作，请忽略此邮件，你的密码不会改变。`,
      });
    }

    // 无论邮箱是否存在，都返回成功（防枚举）
    return NextResponse.json({
      ok: true,
      message: "如该邮箱已注册，重置链接已发送至邮箱（15 分钟内有效）。",
    });
  } catch (e) {
    console.error("[/api/auth/forgot-password] error:", e);
    return NextResponse.json({ ok: false, error: "服务器暂时不可用" }, { status: 500 });
  }
}
