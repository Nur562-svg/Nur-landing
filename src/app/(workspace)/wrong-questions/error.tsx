"use client";

import { useEffect } from "react";
import { RouteErrorFallback } from "@/components/route-error-fallback";

export default function WrongQuestionsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("NUR LEARN wrong-questions error:", error);
    }
  }, [error]);

  return (
    <RouteErrorFallback
      title="错题中心暂时不可用"
      description="错题聚合页遇到问题。题库与模考记录仍在本机；可重试或返回学习首页。"
      reset={reset}
    />
  );
}
