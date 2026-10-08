"use client";

import { useEffect, useMemo, useState } from "react";

import type { ClewLessonView, ClewReviewItemStudyView } from "@/types/clew";
import { parseClewLessonSelfTest } from "@/lib/clew/lesson-heuristic";
import { readSelfCheckRecord, writeSelfCheckRecord } from "@/lib/clew/study-preferences";

/** 自测标记：「会了」/「还需看」（标记存浏览器本地，按知识点 + 讲义版本恢复）。 */
export type SelfCheckMark = "ok" | "shaky";
type SelfCheckStored = {
  lessonGeneratedAt: string;
  marks: Record<string, SelfCheckMark>;
};

/**
 * 「评」自测 + 复习打分行为 hook（设计评审 P1-B 第四刀：从 clew-study.tsx 纯搬移，行为不变）。
 * 拥有：自测标记/揭示态/只看还需看过滤/提交（统一学习事件流 + FSRS 复习调度）/复习条目与打分三键。
 * 依赖注入：knowledgePointId（提交与复习路由）、lesson（自测题解析 + 版本比对 + 提交守卫）、
 * initialReviewItem（服务端注入该知识点的复习条目——组件按 KP remount，挂载即初值）、
 * activeProfileName（「不进复习调度」提示文案）、onAssessComplete（「评」环节完成 → 脊柱与
 * 学习会话归父级；在服务端确认提交成功后、写结果提示前调用——时序与搬移前一致）。
 */
export function useStudyAssessment(options: {
  knowledgePointId: string;
  lesson: ClewLessonView | null;
  initialReviewItem: ClewReviewItemStudyView | null;
  activeProfileName: string;
  onAssessComplete: () => void;
}) {
  const { knowledgePointId, lesson, initialReviewItem, activeProfileName, onAssessComplete } = options;

  // 体验补丁：「评」自测（标记存浏览器本地；「还需看」提交到统一学习事件流）
  const [selfCheckMarks, setSelfCheckMarks] = useState<Record<string, SelfCheckMark>>({});
  const [selfCheckRevealed, setSelfCheckRevealed] = useState<Record<string, boolean>>({});
  const [selfCheckShakyOnly, setSelfCheckShakyOnly] = useState(false);
  const [selfCheckSubmitting, setSelfCheckSubmitting] = useState(false);
  const [selfCheckNote, setSelfCheckNote] = useState<string | null>(null);

  // ZCODE-M5：FSRS 复习调度（服务端注入该知识点的复习条目；自测提交/打分后本地刷新）
  const [reviewItem, setReviewItem] = useState<ClewReviewItemStudyView | null>(initialReviewItem);
  const [reviewRating, setReviewRating] = useState(false);
  const [reviewRateNote, setReviewRateNote] = useState<string | null>(null);

  // 自测标记：按知识点 + 讲义版本恢复；换版本（重新生成）视为新一次自测
  useEffect(() => {
    setSelfCheckMarks({});
    setSelfCheckRevealed({});
    setSelfCheckShakyOnly(false);
    setSelfCheckNote(null);
    if (!lesson) {
      return;
    }
    try {
      const parsed = readSelfCheckRecord(knowledgePointId) as SelfCheckStored | null;
      if (!parsed) {
        return;
      }
      if (
        parsed &&
        parsed.lessonGeneratedAt === lesson.generatedAt &&
        parsed.marks &&
        typeof parsed.marks === "object"
      ) {
        setSelfCheckMarks(parsed.marks);
      }
    } catch {
      // localStorage 不可用 / 数据损坏：从零开始，不猜测
    }
  }, [lesson, knowledgePointId]);

  const selfTestItems = useMemo(
    () => (lesson ? parseClewLessonSelfTest(lesson.contentMd) : []),
    [lesson],
  );

  const shakyCount = selfTestItems.filter(
    (item) => selfCheckMarks[String(item.index)] === "shaky",
  ).length;
  const markedCount = selfTestItems.filter(
    (item) => selfCheckMarks[String(item.index)] !== undefined,
  ).length;
  const allMarksDone = selfTestItems.length > 0 && markedCount === selfTestItems.length;
  const visibleSelfCheckItems = selfCheckShakyOnly
    ? selfTestItems.filter((item) => selfCheckMarks[String(item.index)] === "shaky")
    : selfTestItems;

  function persistSelfCheckMarks(next: Record<string, SelfCheckMark>): void {
    setSelfCheckMarks(next);
    if (!lesson) {
      return;
    }
    try {
      const payload: SelfCheckStored = { lessonGeneratedAt: lesson.generatedAt, marks: next };
      writeSelfCheckRecord(knowledgePointId, payload);
    } catch {
      // localStorage 不可用：本次会话内仍生效
    }
  }

  /** 全部标记完成后提交：「还需看」写入统一学习事件流（幂等）+ FSRS 复习调度，并完成「评」环节。 */
  async function submitSelfCheck(marks: Record<string, SelfCheckMark>): Promise<void> {
    if (!lesson || selfCheckSubmitting) {
      return;
    }
    setSelfCheckSubmitting(true);
    try {
      const response = await fetch(`/api/clew/kp/${knowledgePointId}/self-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonGeneratedAt: lesson.generatedAt,
          items: selfTestItems.map((item) => ({
            index: item.index,
            shaky: marks[String(item.index)] === "shaky",
          })),
        }),
      });
      if (!response.ok) {
        setSelfCheckNote("自测记录暂时未能提交（网络或服务问题），本地标记已保留，可稍后改动任意标记重试。");
        return;
      }
      const payload = (await response.json()) as {
        ok?: boolean;
        review?: "created" | "advanced" | "unchanged" | "skipped-profile" | "skipped-no-shaky";
      };
      onAssessComplete();
      const shaky = selfTestItems.filter((item) => marks[String(item.index)] === "shaky").length;
      switch (payload.review) {
        case "created":
          setSelfCheckNote(
            `已把 ${shaky} 道「还需看」记入学习动态，并安排复习（今日到期，可在下方「复习打分」回流）。`,
          );
          break;
        case "advanced":
          setSelfCheckNote("已重新计为「还需看」，复习安排按遗忘曲线前移。");
          break;
        case "unchanged":
          setSelfCheckNote("已记录；本次提交没有改变复习安排。");
          break;
        case "skipped-profile":
          setSelfCheckNote(
            `已把 ${shaky} 道「还需看」记入学习动态；当前闭环（${activeProfileName}）不进复习调度。`,
          );
          break;
        default:
          setSelfCheckNote("全部标记「会了」——「评」环节完成。");
      }
      if (payload.review === "created" || payload.review === "advanced") {
        await refreshReviewItem();
      }
    } catch {
      setSelfCheckNote("自测记录暂时未能提交（网络问题），本地标记已保留。");
    } finally {
      setSelfCheckSubmitting(false);
    }
  }

  /** 自测提交后刷新本知识点的复习条目（服务端按 FSRS 状态返回最新排期）。 */
  async function refreshReviewItem(): Promise<void> {
    try {
      const response = await fetch(`/api/clew/reviews?kp=${knowledgePointId}`, {
        credentials: "include",
      });
      if (!response.ok) {
        return;
      }
      const payload = (await response.json()) as {
        ok?: boolean;
        items?: Array<{ id: string; dueAt: string; reviewCount: number; lapses: number; suspended: boolean }>;
      };
      const item = payload.items?.find((entry) => !entry.suspended) ?? null;
      if (!item) {
        return;
      }
      setReviewItem({
        id: item.id,
        dueAt: item.dueAt,
        due: Date.parse(item.dueAt) <= Date.now(),
        reviewCount: item.reviewCount,
        lapses: item.lapses,
      });
    } catch {
      // 刷新失败不打断自测流程（下次进页面由服务端注入最新状态）
    }
  }

  /** ZCODE-M5：复习打分三键（再来一次/有点难/记住了 → again/hard/good）→ FSRS 前移 + 到期重排。 */
  async function onRateReview(rating: "again" | "hard" | "good"): Promise<void> {
    if (!reviewItem || reviewRating) {
      return;
    }
    setReviewRating(true);
    setReviewRateNote(null);
    try {
      const response = await fetch(`/api/clew/reviews/${reviewItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });
      if (!response.ok) {
        setReviewRateNote("打分暂时未能记录（网络或服务问题），可稍后重试。");
        return;
      }
      const payload = (await response.json()) as {
        ok?: boolean;
        item?: { id: string; dueAt: string; reviewCount: number; lapses: number };
      };
      if (!payload.item) {
        return;
      }
      const dueLabel = new Date(payload.item.dueAt).toLocaleString("zh-CN", {
        hour12: false,
        timeZone: "Asia/Shanghai",
      });
      setReviewItem({
        id: payload.item.id,
        dueAt: payload.item.dueAt,
        due: false,
        reviewCount: payload.item.reviewCount,
        lapses: payload.item.lapses,
      });
      setReviewRateNote(`已记录：下次复习 ${dueLabel}（「我的学习 · 今日复习」同步更新）。`);
    } catch {
      setReviewRateNote("打分暂时未能记录（网络问题），可稍后重试。");
    } finally {
      setReviewRating(false);
    }
  }

  function onMarkSelfCheck(index: number, mark: SelfCheckMark): void {
    const next = { ...selfCheckMarks, [String(index)]: mark };
    persistSelfCheckMarks(next);
    if (selfTestItems.length > 0 && selfTestItems.every((item) => next[String(item.index)] !== undefined)) {
      void submitSelfCheck(next);
    }
  }

  function onToggleSelfCheckReveal(index: number): void {
    setSelfCheckRevealed((current) => ({
      ...current,
      [String(index)]: !current[String(index)],
    }));
  }

  return {
    selfTestItems,
    selfCheckMarks,
    selfCheckRevealed,
    selfCheckShakyOnly,
    setSelfCheckShakyOnly,
    selfCheckSubmitting,
    selfCheckNote,
    setSelfCheckNote,
    shakyCount,
    markedCount,
    allMarksDone,
    visibleSelfCheckItems,
    reviewItem,
    reviewRating,
    reviewRateNote,
    onMarkSelfCheck,
    onToggleSelfCheckReveal,
    onRateReview,
  };
}
