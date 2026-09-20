/**
 * ⌘K 站内检索索引（R4）：纯函数、无 React、无网络、无磁盘。
 *
 * 边界：
 * - 课程/章节/知识点条目只经 course-selectors 选择器与课程对象公开字段构建，
 *   不直读 content 文件、不搜题目正文（题库全文检索是后端事，本期明确不做）；
 * - Hi doc 教材章节条目由调用方传入书架内存数据，本模块不发起请求、不上送、不写盘；
 * - 学习者私人数据（错题/记忆/作答）不进入索引。
 *
 * bundle 约束（实测教训，勿回退）：在客户端组件顶层 `import publishedCourses`
 * 会把整个课程树（含 9k+ 题库 item，≈9.5MB layout chunk）打进客户端 bundle。
 * 因此课程索引必须以「字段裁剪」方式构建：服务端薄适配层（(workspace)/layout.tsx）
 * 先经 selectCourseSearchSource 把 CourseDefinition 投影为只含 title/slug/note/href
 * 级字段的 CourseSearchSource，再把 CourseSearchSource[] 传给客户端组件；
 * 客户端在 useMemo 里调用 buildCourseSearchEntries 生成条目。
 */
import type { CourseDefinition } from "@/types/learning";
import { isPublishedCourseSlug } from "@/lib/course-publication";

/** 检索条目分组（展示顺序固定，见 SEARCH_GROUP_ORDER）。 */
export type SearchEntryGroup = "course" | "bank" | "shelf" | "page";

export type SearchEntry = {
  id: string;
  /** 主显示文本（章节名 / 知识点名 / 教材章节 / 页面名）。 */
  label: string;
  /** 次级说明（所属课程 / 章节 / 状态），可选。 */
  hint?: string;
  href: string;
  group: SearchEntryGroup;
  /** 参与匹配的原始文本（label + 归属名等），匹配前各自 normalize。 */
  keywords: readonly string[];
};

export const SEARCH_GROUP_LABELS: Record<SearchEntryGroup, string> = {
  course: "官方课程",
  bank: "题库",
  shelf: "书架教材",
  page: "页面",
};

export const SEARCH_GROUP_ORDER: readonly SearchEntryGroup[] = [
  "course",
  "bank",
  "shelf",
  "page",
];

/** 每组最多展示条数；超出截断并提示输入更精确的关键词。 */
export const SEARCH_GROUP_LIMIT = 8;

/** 轻量归一化：NFKC（全半角折叠）+ 小写 + 去空白。不引入拼音等外部依赖。 */
export function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").toLowerCase().replace(/\s+/g, "");
}

/**
 * 课程检索输入：CourseDefinition 的最小字段裁剪投影（服务端在传入客户端前完成）。
 * 只保留构建条目所需的 title/slug/note 级字段：
 * - 不带 assessmentItems / sources / examBlueprint 等重型字段；
 * - 不带任何长 id（条目 id 由 slug 派生），不带 chapter.focus（匹配仅按 title + note）；
 * - KP 的所属章节名在投影时预计算（chapterTitle），避免下发 chapter.knowledgePointIds 全量 id 数组；
 * - `hasLesson` 由 course 对象直接判定（lesson 非 null），不触发路由。
 */
export type CourseSearchSource = Pick<
  CourseDefinition,
  "slug" | "title" | "catalogLabel"
> & {
  chapters: readonly Pick<
    CourseDefinition["chapters"][number],
    "slug" | "indexLabel" | "title"
  >[];
  knowledgePoints: readonly (Pick<
    CourseDefinition["knowledgePoints"][number],
    "slug" | "title" | "note"
  > & { hasLesson: boolean; chapterTitle: string | null })[];
};

/** 从 CourseDefinition 裁剪出检索输入（纯函数；服务端薄适配层调用）。 */
export function selectCourseSearchSource(course: CourseDefinition): CourseSearchSource {
  const chapterTitleByPointId = new Map<string, string>();
  for (const chapter of course.chapters) {
    for (const pointId of chapter.knowledgePointIds) {
      chapterTitleByPointId.set(pointId, chapter.title);
    }
  }
  return {
    slug: course.slug,
    title: course.title,
    catalogLabel: course.catalogLabel,
    chapters: course.chapters.map((chapter) => ({
      slug: chapter.slug,
      indexLabel: chapter.indexLabel,
      title: chapter.title,
    })),
    knowledgePoints: course.knowledgePoints.map((point) => ({
      slug: point.slug,
      title: point.title,
      note: point.note,
      hasLesson: point.lesson !== null,
      chapterTitle: chapterTitleByPointId.get(point.id) ?? null,
    })),
  };
}

/**
 * 课程条目：章节（每门课每章）+ 知识点（仅闭环课）。
 * - 章节 href 沿用现有路由口径：闭环课走课程工作台 `/courses/{slug}`
 *   （章节目录为页内状态、无独立路由），题库课走 `/courses/{slug}/question-bank/{chapterSlug}`；
 * - 题库课（`*-qb`，lesson 全为 null）的 KP 没有讲义页，不出知识点条目。
 */
export function buildCourseSearchEntries(
  courses: readonly CourseSearchSource[],
): readonly SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const course of courses) {
    if (!isPublishedCourseSlug(course.slug)) {
      continue;
    }
    const authored = course.knowledgePoints.some((point) => point.hasLesson);
    const group: SearchEntryGroup = authored ? "course" : "bank";
    const courseHref = `/courses/${course.slug}`;

    for (const chapter of course.chapters) {
      entries.push({
        id: `${group}-chapter-${course.slug}-${chapter.slug}`,
        label: chapter.title,
        hint: authored
          ? `${course.title} · 第 ${chapter.indexLabel} 章`
          : `${course.title} · 题库`,
        href: authored
          ? courseHref
          : `/courses/${course.slug}/question-bank/${chapter.slug}`,
        group,
        keywords: [chapter.title, course.title, course.catalogLabel],
      });
    }

    if (authored) {
      for (const point of course.knowledgePoints) {
        if (!point.hasLesson) {
          continue;
        }
        entries.push({
          id: `course-kp-${course.slug}-${point.slug}`,
          label: point.title,
          hint: point.chapterTitle ? `${course.title} · ${point.chapterTitle}` : course.title,
          href: `/courses/${course.slug}/knowledge-points/${point.slug}`,
          group,
          keywords: [point.title, point.note, course.title, course.catalogLabel],
        });
      }
    }
  }
  return entries;
}

/** 书架教材输入（HiDocTextbookView 的最小裁剪；私有数据，仅存在于客户端内存）。 */
export type ShelfChapterInput = {
  id: string;
  title: string;
  chapterCount: number;
  isFrozen: boolean;
};

/**
 * Hi doc 教材章节条目：每章一条，跳 `/learn/hi-doc/t/{id}/c/{n}`。
 * 书架列表只含 chapterCount（无章节标题，且不新增网络请求），
 * 故条目以「教材名 · 第 N 章」呈现、按教材名参与匹配；按教材名检索可直接到达任一章节。
 */
export function buildShelfChapterEntries(
  textbooks: readonly ShelfChapterInput[],
): readonly SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const book of textbooks) {
    for (let chapterIndex = 1; chapterIndex <= book.chapterCount; chapterIndex += 1) {
      entries.push({
        id: `shelf-chapter-${book.id}-${chapterIndex}`,
        label: `${book.title} · 第 ${chapterIndex} 章`,
        hint: book.isFrozen ? "书架教材 · 已冻结" : "书架教材",
        href: `/learn/hi-doc/t/${book.id}/c/${chapterIndex}`,
        group: "shelf",
        keywords: [book.title],
      });
    }
  }
  return entries;
}

export type PageEntryInput = {
  id: string;
  label: string;
  href: string;
};

/** 页面入口条目：保留 R1 的全部静态入口。 */
export function buildPageEntries(
  pages: readonly PageEntryInput[],
): readonly SearchEntry[] {
  return pages.map((page) => ({
    id: `page-${page.id}`,
    label: page.label,
    href: page.href,
    group: "page",
    keywords: [page.label],
  }));
}

/** 单条命中判定：normalize 后对任一 keyword 做 includes。 */
export function entryMatchesQuery(entry: SearchEntry, normalizedQuery: string): boolean {
  return entry.keywords.some((keyword) => (
    normalizeSearchText(keyword).includes(normalizedQuery)
  ));
}

export type SearchResultGroup = {
  group: SearchEntryGroup;
  label: string;
  items: readonly SearchEntry[];
  /** 本组被截断隐藏的条数（>0 时展示「还有 N 条」提示）。 */
  overflow: number;
};

/**
 * 检索：空查询返回全部条目（仍按组截断）；非空查询按 includes 过滤。
 * 返回的组按 SEARCH_GROUP_ORDER 排序，空组不返回。
 */
export function searchEntries(
  entries: readonly SearchEntry[],
  query: string,
  limitPerGroup: number = SEARCH_GROUP_LIMIT,
): readonly SearchResultGroup[] {
  const normalized = normalizeSearchText(query.trim());
  const matched = normalized.length === 0
    ? entries
    : entries.filter((entry) => entryMatchesQuery(entry, normalized));

  return SEARCH_GROUP_ORDER
    .map((group) => {
      const all = matched.filter((entry) => entry.group === group);
      return {
        group,
        label: SEARCH_GROUP_LABELS[group],
        items: all.slice(0, limitPerGroup),
        overflow: Math.max(0, all.length - limitPerGroup),
      };
    })
    .filter((group) => group.items.length > 0);
}

/** 展平分组结果（键盘 ↑↓/Enter 高亮导航按此顺序）。 */
export function flattenSearchGroups(
  groups: readonly SearchResultGroup[],
): readonly SearchEntry[] {
  return groups.flatMap((group) => group.items);
}
