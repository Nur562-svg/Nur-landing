/**
 * Clew 失败隔离与重试（ZCODE-M2 Phase 2，纯函数可测试）。
 * 原则：单章失败不阻塞其他章节（教材编译可部分成功）；
 * 模型调用失败用指数退避重试，重试仍失败则如实上报。
 */

/** 失败状态追踪（编译管线各阶段共用）。 */
export type ClewFailureRecord = {
  chapterId: string;
  kpId?: string;
  stage: "toc" | "extraction" | "lesson" | "note";
  error: string;
  retryCount: number;
  lastRetryAt: string;
};

/** 失败隔离执行器：逐项执行，单项失败记录并继续。 */
export async function executeWithIsolation<T>(
  items: readonly T[],
  executor: (item: T) => Promise<void>,
  onFailure: (item: T, error: Error) => void,
): Promise<{ succeeded: T[]; failed: Array<{ item: T; error: Error }> }> {
  const succeeded: T[] = [];
  const failed: Array<{ item: T; error: Error }> = [];

  for (const item of items) {
    try {
      await executor(item);
      succeeded.push(item);
    } catch (error) {
      const wrapped = error instanceof Error ? error : new Error(String(error));
      failed.push({ item, error: wrapped });
      onFailure(item, wrapped);
    }
  }

  return { succeeded, failed };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/** 指数退避重试（默认 3 次、基准 1s；测试可传 0 加速）。 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000,
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries - 1) {
        await sleep(baseDelayMs * Math.pow(2, attempt));
      }
    }
  }

  throw lastError ?? new Error("retryWithBackoff: 所有重试均失败");
}
