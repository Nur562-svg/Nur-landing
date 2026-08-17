import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { RouteLoadingFallback } from "@/components/route-loading-fallback";

export const metadata: Metadata = {
  title: "注册｜NUR LEARN",
  description: "注册 NUR LEARN 账号，用于学习状态云同步与会员能力（可选）。",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<RouteLoadingFallback label="正在打开注册…" />}>
      <AuthForm mode="register" />
    </Suspense>
  );
}
