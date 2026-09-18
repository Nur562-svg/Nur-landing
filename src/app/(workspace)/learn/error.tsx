"use client";

import { useEffect } from "react";
import { RouteErrorFallback } from "@/components/route-error-fallback";

export default function LearnError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("NUR LEARN learn error:", error);
    }
  }, [error]);

  return (
    <RouteErrorFallback
      title="学习页暂时无法显示"
      description="周学习主页或建课入口遇到问题。本地进度仍保留；可重试或返回首页。"
      reset={reset}
    />
  );
}
