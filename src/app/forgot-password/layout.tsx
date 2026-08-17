import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "找回密码｜NUR LEARN",
  description: "通过注册邮箱接收密码重置链接。",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
