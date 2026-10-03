import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { RouteLoadingFallback } from "@/components/route-loading-fallback";

export const metadata: Metadata = {
  title: "登录｜Ariadne",
  description: "登录 Ariadne，在授权设备间同步学习状态（需明确同意的范围）。",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<RouteLoadingFallback label="正在打开登录…" />}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
