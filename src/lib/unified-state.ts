// 与 payment/service.ts、unified-events.ts 同一约定：注释标注 server-only（只被服务端
// 页面/API 引用），不写 `import "server-only"`，使 node:test 可导入做隔离 SQLite 验证。
import { prisma } from "@/lib/prisma";
import { publishedCourses } from "@/content/courses";
import { isLoopProfileId, LOOP_PROFILES, type LoopProfileId, type LoopStage } from "@/types/loop-profile";
import { LOOP_STAGE_DISPLAY } from "@/lib/loop-profile";
import type {
  UnifiedContinueTarget,
  UnifiedFeedItem,
} from "@/types/unified-learning";

/**
 * 统一读取层（ZCODE-M3 Phase 2，server-only）。
 * 把 UnifiedLearningEvent 流解析为「学习动态」展示项与「继续上次学习」深链；
 * 标签只从既有注册表/用户数据解析，解析不到就如实回落「已删除的内容」，不编造。
 */

type OfficialKpLookup = {
  courseTitle: string;
  courseSlug: string;
  kpTitle: string;
  kpSlug: string;
};

let officialKpLookupCache: Map<string, OfficialKpLookup> | null = null;

function getOfficialKpLookup(): Map<string, OfficialKpLookup> {
  if (officialKpLookupCache) {
    return officialKpLookupCache;
  }
  const lookup = new Map<string, OfficialKpLookup>();
  for (const course of publishedCourses) {
    for (const kp of course.knowledgePoints) {
      if (!lookup.has(kp.id)) {
        lookup.set(kp.id, {
          courseTitle: course.title,
          courseSlug: course.slug,
          kpTitle: kp.title,
          kpSlug: kp.slug,
        });
      }
    }
  }
  officialKpLookupCache = lookup;
  return lookup;
}

type QbChapterLookup = { courseTitle: string; chapterTitle: string };

let qbChapterLookupCache: Map<string, QbChapterLookup> | null = null;

function getQbChapterLookup(): Map<string, QbChapterLookup> {
  if (qbChapterLookupCache) {
    return qbChapterLookupCache;
  }
  const lookup = new Map<string, QbChapterLookup>();
  for (const course of publishedCourses) {
    for (const chapter of course.chapters) {
      lookup.set(`${course.slug}/${chapter.slug}`, {
        courseTitle: course.title,
        chapterTitle: chapter.title,
      });
    }
  }
  qbChapterLookupCache = lookup;
  return lookup;
}

function stageDisplayName(stage: string): string {
  return (LOOP_STAGE_DISPLAY as Record<string, { name: string }>)[stage]?.name ?? stage;
}

function eventSummary(eventType: string, stage: string): string {
  switch (eventType) {
    case "attempt-confirmed":
      return "完成了一次练习";
    case "stage-entered":
      return `进入环节「${stageDisplayName(stage)}」`;
    case "stage-completed":
      return `完成环节「${stageDisplayName(stage)}」`;
    case "session-started":
      return "开始学习";
    case "session-completed":
      return "完成学习";
    case "wrong-question-added":
      return "自测标记了需要再看的问题";
    case "review-scheduled":
      return "安排了一次复习";
    case "review-completed":
      return "完成了一次复习打分";
    default:
      return eventType;
  }
}

/** Clew 知识点归属（KP → 章 → 教材），一次批量解析。 */
async function loadClewKpContext(
  userId: string,
  kpIds: readonly string[],
): Promise<Map<string, { kpTitle: string; textbookTitle: string; href: string }>> {
  const map = new Map<string, { kpTitle: string; textbookTitle: string; href: string }>();
  if (kpIds.length === 0) {
    return map;
  }
  const rows = await prisma.clewKnowledgePoint.findMany({
    where: {
      id: { in: [...kpIds] },
      chapter: { textbook: { userId, deletedAt: null } },
    },
    select: {
      id: true,
      title: true,
      chapter: {
        select: {
          order: true,
          textbook: { select: { id: true, title: true } },
        },
      },
    },
  });
  for (const row of rows) {
    map.set(row.id, {
      kpTitle: row.title,
      textbookTitle: row.chapter.textbook.title,
      href: `/learn/clew/t/${row.chapter.textbook.id}/c/${row.chapter.order}?kp=${row.id}`,
    });
  }
  return map;
}

/** 最近学习事件 → 学习动态展示项（timestamp desc）。 */
export async function selectUnifiedLearningFeed(
  userId: string,
  limit = 8,
): Promise<UnifiedFeedItem[]> {
  const rows = await prisma.unifiedLearningEvent.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
    take: limit,
  });
  if (rows.length === 0) {
    return [];
  }

  const clewKpIds = rows
    .filter((row) => row.contentType === "clew-kp")
    .map((row) => row.contentId);
  const clewContext = await loadClewKpContext(userId, clewKpIds);
  const officialLookup = getOfficialKpLookup();
  const qbLookup = getQbChapterLookup();

  const items: UnifiedFeedItem[] = [];
  for (const row of rows) {
    const summary = eventSummary(row.eventType, row.stage);
    const at = row.timestamp.toISOString();
    if (row.contentType === "clew-kp") {
      const context = clewContext.get(row.contentId);
      items.push({
        id: row.id,
        contentType: "clew-kp",
        sourceLabel: "Clew",
        title: context?.kpTitle ?? "已删除的内容",
        detail: context?.textbookTitle ?? "教材已删除",
        summary,
        at,
        href: context?.href ?? null,
      });
    } else if (row.contentType === "official-kp") {
      const context = officialLookup.get(row.contentId);
      items.push({
        id: row.id,
        contentType: "official-kp",
        sourceLabel: "官方课",
        title: context?.kpTitle ?? "已删除的内容",
        detail: context?.courseTitle ?? "课程已删除",
        summary,
        at,
        href: context ? `/courses/${context.courseSlug}/knowledge-points/${context.kpSlug}` : null,
      });
    } else {
      const context = qbLookup.get(row.contentId);
      items.push({
        id: row.id,
        contentType: "qb-chapter",
        sourceLabel: "题库",
        title: context?.chapterTitle ?? "已删除的内容",
        detail: context?.courseTitle ?? "课程已删除",
        summary,
        at,
        href: context ? `/courses/${row.contentId.split("/")[0]}/question-bank/${row.contentId.split("/")[1]}` : null,
      });
    }
  }
  return items;
}

/** 「继续上次学习」：最近一个 active Clew 会话 → 深链 + 当前应处环节。 */
export async function selectContinueLearningTarget(
  userId: string,
): Promise<UnifiedContinueTarget | null> {
  const session = await prisma.clewStudySession.findFirst({
    where: { userId, status: "active", kpId: { not: null } },
    orderBy: { lastActiveAt: "desc" },
    select: { kpId: true, profileId: true, stageStates: true },
  });
  if (!session || !session.kpId) {
    return null;
  }
  // ClewStudySession 与 ClewKnowledgePoint 无 Prisma relation（跨用户聚合表不挂 FK），按 id 二次查询
  const kp = await prisma.clewKnowledgePoint.findFirst({
    where: { id: session.kpId, chapter: { textbook: { userId, deletedAt: null } } },
    select: {
      id: true,
      title: true,
      chapter: {
        select: {
          order: true,
          textbook: { select: { id: true, title: true } },
        },
      },
    },
  });
  if (!kp) {
    return null;
  }

  const profileId: LoopProfileId = isLoopProfileId(session.profileId) ? session.profileId : "full-loop";
  const profile = LOOP_PROFILES[profileId];
  const stages = profile.stages as readonly LoopStage[];

  // 当前应处环节：stageStates 中最后推进（active/completed）环节的下一步；没有推进记录时用 entryStage。
  const stageStates =
    typeof session.stageStates === "object" && session.stageStates !== null
      ? (session.stageStates as Record<string, { status?: string }>)
      : {};
  const progressed = stages
    .map((stage, index) => {
      const state = stageStates[stage];
      const time = state?.status === "active" || state?.status === "completed";
      return { stage, index, time };
    })
    .filter((entry) => entry.time);
  const lastProgressed = progressed[progressed.length - 1];
  const nextStage =
    lastProgressed && stages[lastProgressed.index + 1] !== undefined
      ? stages[lastProgressed.index + 1]
      : lastProgressed?.stage ?? profile.entryStage;

  return {
    href: `/learn/clew/t/${kp.chapter.textbook.id}/c/${kp.chapter.order}?kp=${kp.id}`,
    kpTitle: kp.title,
    textbookTitle: kp.chapter.textbook.title,
    stageLabel: stageDisplayName(nextStage),
  };
}
