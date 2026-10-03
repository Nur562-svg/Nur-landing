// 与 payment/service.ts、unified-events.ts 同一约定：注释标注 server-only（只被服务端
// API 引用），不写 `import "server-only"`，使 node:test 可导入做隔离 SQLite 验证。
import { prisma } from "@/lib/prisma";
import { appendUnifiedLearningEvents } from "@/lib/unified-events";
import { isLoopProfileId } from "@/types/loop-profile";
import type { UnifiedLearningEventInput } from "@/types/unified-learning";

/**
 * Clew 自测（「评」环节的最小实现，2026-10-02 体验补丁）。
 * 学员在讲义「自测题」上自评「会了 / 还需看」；标记「还需看」的题目以 `wrong-question-added`
 * 事件写入统一学习事件流，作为后续错题中心与复习调度的数据基础。
 * 幂等：同 KP 同一份讲义（generatedAt）的同一题只记一次（sourceKey 去重）。
 */

export type ClewSelfCheckItemInput = {
  /** 讲义内题号（1 起，与 parseClewLessonSelfTest 的 index 对应）。 */
  index: number;
  /** 是否标记「还需看」。 */
  shaky: boolean;
};

export type ClewSelfCheckOutcome =
  | { ok: true; recorded: number }
  | { ok: false; status: number; code: "not-found" | "invalid-request"; message: string };

/** 一次最多提交的题数（讲义自测题远小于此，防滥用）。 */
const CLEW_SELF_CHECK_MAX_ITEMS = 20;

export async function recordClewSelfCheck(input: {
  userId: string;
  kpId: string;
  /** 讲义生成时间（区分讲义版本，重新生成后已标记的问题重新计）；缺省 v1。 */
  lessonGeneratedAt?: string;
  items: readonly ClewSelfCheckItemInput[];
}): Promise<ClewSelfCheckOutcome> {
  if (input.items.length > CLEW_SELF_CHECK_MAX_ITEMS) {
    return {
      ok: false,
      status: 400,
      code: "invalid-request",
      message: `一次最多提交 ${CLEW_SELF_CHECK_MAX_ITEMS} 道自测。`,
    };
  }
  for (const item of input.items) {
    if (
      !Number.isInteger(item.index) ||
      item.index < 1 ||
      item.index > 99 ||
      typeof item.shaky !== "boolean"
    ) {
      return { ok: false, status: 400, code: "invalid-request", message: "自测提交格式不正确。" };
    }
  }

  const kp = await prisma.clewKnowledgePoint.findFirst({
    where: { id: input.kpId, chapter: { textbook: { userId: input.userId, deletedAt: null } } },
    select: { id: true, loopProfileId: true },
  });
  if (!kp) {
    return { ok: false, status: 404, code: "not-found", message: "知识点不存在或教材已删除。" };
  }

  const profileId = isLoopProfileId(kp.loopProfileId) ? kp.loopProfileId : "full-loop";
  const version = input.lessonGeneratedAt?.trim() || "v1";
  const now = new Date().toISOString();
  const events: UnifiedLearningEventInput[] = input.items
    .filter((item) => item.shaky)
    .map((item) => ({
      contentType: "clew-kp",
      contentId: kp.id,
      profileId,
      stage: "assess",
      eventType: "wrong-question-added",
      payload: { kind: "wrong-question", questionId: `${kp.id}#selftest-${item.index}`, source: "clew" },
      sourceKey: `clew-selftest:${kp.id}:${version}:${item.index}`,
      timestamp: now,
    }));

  await appendUnifiedLearningEvents(input.userId, events);
  return { ok: true, recorded: events.length };
}
