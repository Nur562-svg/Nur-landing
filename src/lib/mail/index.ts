/**
 * 邮件发送抽象层。
 * - console provider：开发/演示模式，邮件内容输出到终端（SMTP 未配置时默认）
 * - smtp provider：生产模式，通过 nodemailer 发送真实邮件
 *
 * 选择逻辑：有 SMTP_HOST 则用 smtp，否则 fallback 到 console。
 * 密钥仅存在于服务端环境变量，永不进入客户端 bundle。
 */

export type MailMessage = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export type MailProvider = {
  send(message: MailMessage): Promise<{ ok: true } | { ok: false; error: string }>;
};

// === Console Provider（开发/演示）===

const consoleProvider: MailProvider = {
  async send(message: MailMessage) {
    if (process.env.NODE_ENV !== "production") {
      console.log("\n========== MAIL (console) ==========");
      console.log(`To: ${message.to}`);
      console.log(`Subject: ${message.subject}`);
      console.log("---");
      console.log(message.text);
      console.log("====================================\n");
    }
    return { ok: true };
  },
};

// === SMTP Provider（生产，惰性加载 nodemailer）===

async function createSmtpProvider(): Promise<MailProvider> {
  // nodemailer 仅在服务端使用，惰性 require 避免客户端 bundle
  const { createTransport } = await import("nodemailer");
  const transport = createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER ?? "",
      pass: process.env.SMTP_PASS ?? "",
    },
  });

  return {
    async send(message: MailMessage) {
      try {
        await transport.sendMail({
          from: process.env.SMTP_FROM ?? "NUR LEARN <noreply@nur-learn.example.com>",
          to: message.to,
          subject: message.subject,
          text: message.text,
          html: message.html,
        });
        return { ok: true };
      } catch (e) {
        const msg = (e as Error)?.message || "smtp-send-failed";
        console.error("[mail] SMTP send failed:", msg);
        return { ok: false, error: msg };
      }
    },
  };
}

let cachedProvider: MailProvider | null = null;

/** 获取当前邮件 provider（SMTP 优先，无则 console）。 */
export async function getMailProvider(): Promise<MailProvider> {
  if (cachedProvider) return cachedProvider;
  cachedProvider = process.env.SMTP_HOST ? await createSmtpProvider() : consoleProvider;
  return cachedProvider;
}

/** 发送邮件的便捷入口。 */
export async function sendMail(
  message: MailMessage,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const provider = await getMailProvider();
  return provider.send(message);
}
