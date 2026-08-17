"use client";

import { useEffect } from "react";
import { RouteErrorFallback } from "@/components/route-error-fallback";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("NUR LEARN global-error:", error);
    }
  }, [error]);

  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, background: "#faf7f2" }}>
        <RouteErrorFallback
          title="系统暂时无法显示"
          description="根布局出现问题。本地学习记录仍在本机；请重试，或稍后从学习首页进入。"
          reset={reset}
        />
      </body>
    </html>
  );
}
