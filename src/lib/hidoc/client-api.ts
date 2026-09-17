import type { HiDocApiFailure } from "@/types/hidoc";

/**
 * Hi doc 客户端请求小工具（讲义 / 讲解 / 划重点 / 学霸笔记共用）：
 * SSE 行解析与失败响应读取。事件语义由各调用方判断。
 */

/** 从失败响应体里读取中文原因（读不出时给统一提示）。 */
export function readHiDocFailure(payload: unknown): string {
  const candidate = payload as HiDocApiFailure | null;
  return candidate?.error ?? "服务返回异常，请稍后重试。";
}

export async function consumeHiDocSse(
  response: Response,
  onEvent: (event: unknown) => void,
): Promise<void> {
  if (!response.body) {
    onEvent({ type: "error", code: "server-error", error: "服务没有返回数据流，请稍后重试。" });
    return;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";
    for (const part of parts) {
      const dataLine = part.split("\n").find((line) => line.startsWith("data: "));
      if (!dataLine) {
        continue;
      }
      try {
        onEvent(JSON.parse(dataLine.slice(6)));
      } catch {
        // 忽略无法解析的行
      }
    }
  }
}