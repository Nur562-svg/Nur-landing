"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") console.error("NUR LEARN global error:", error);
  }, [error]);

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h2 className="text-xl mb-2">出现问题</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {error.message || "页面渲染遇到错误，已记录。"} 
        （演示环境不影响本地学习记忆。）
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-1 border text-sm"
      >
        重试
      </button>
    </div>
  );
}
