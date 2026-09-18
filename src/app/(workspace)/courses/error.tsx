"use client";

import { useEffect } from "react";
import { RouteErrorFallback } from "@/components/route-error-fallback";

export default function CoursesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("NUR LEARN courses error:", error);
    }
  }, [error]);

  return (
    <RouteErrorFallback
      title="课程学习页暂时无法显示"
      description="课程工作台、知识点、写作室或案例室遇到问题。本地草稿与作答记录仍保留；可重试或返回学习首页。"
      reset={reset}
    />
  );
}
