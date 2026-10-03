import {
  CLEW_LESSON_SECTIONS,
  collectLessonSectionBodies,
  isSectionHeading,
  type ClewLessonSection,
} from "./lesson-heuristic";

/**
 * Clew 讲义三视图派生（ZCODE-M4 Phase 1，知纲模式）：
 * 同一份讲义 markdown 确定性地派生「初学（完整）/ 复习（折叠自测答案）/ 备考（要点压缩）」。
 * 铁律：纯函数、零模型调用、零网络请求、不重新生成事实；同一 (markdown, variant) 多次派生逐字节相同。
 * 小节定位复用 lesson-heuristic 的既有解析（isSectionHeading / collectLessonSectionBodies），不另建解析。
 * 仅供客户端直接 import（client-safe），不得引入 server-only。
 */

export type ClewLessonVariant = "full" | "review" | "exam";

export const CLEW_LESSON_VARIANTS: readonly ClewLessonVariant[] = ["full", "review", "exam"];

export const CLEW_LESSON_VARIANT_LABELS: Record<ClewLessonVariant, string> = {
  full: "初学 · 完整版",
  review: "复习 · 折叠自测答案",
  exam: "备考 · 要点压缩",
};

/** 分段控件简称（完整标签见 CLEW_LESSON_VARIANT_LABELS）。 */
export const CLEW_LESSON_VARIANT_SHORT_LABELS: Record<ClewLessonVariant, string> = {
  full: "初学",
  review: "复习",
  exam: "备考",
};

export function isClewLessonVariant(value: unknown): value is ClewLessonVariant {
  return typeof value === "string" && (CLEW_LESSON_VARIANTS as readonly string[]).includes(value);
}

const REVIEW_NOTE =
  "复习视图：保留题干、折叠参考答案——在下方「自测」面板回忆作答后核对（同一份讲义派生，未重新生成）。";
const EXAM_NOTE =
  "备考视图：由同一讲义压缩派生（定义保留首句、自测题移到下方「自测」面板），未重新生成事实。";

/** 整行即参考答案行（允许缩进与 `**` 包裹；与 parseClewLessonSelfTest 的答案行判定同一形态）。 */
const ANSWER_LINE = /^\s*(?:\*\*)?参考答案\s*[:：]/;

/** 题干行内联答案形态（题干在前、参考答案在后；与 parseClewLessonSelfTest 的内联判定同一形态）。 */
const INLINE_ANSWER = /^(.*?)(?:\*\*)?参考答案\s*[:：]/;

/** 备考视图「定义」截句：到第一个「。」含；无「。」整行保留。 */
function truncateToFirstSentence(line: string): string {
  const index = line.indexOf("。");
  return index >= 0 ? line.slice(0, index + 1) : line;
}

/**
 * 派生讲义视图。仅作用于讲义 markdown：页首引用块与「定义/要点/易错点」不受影响
 * （除 exam 的定义截句）；自测面板始终从完整讲义解析，视图只影响正文显示文本。
 */
export function deriveClewLessonVariant(
  markdown: string,
  variant: ClewLessonVariant,
): { contentMd: string; note: string } {
  if (variant === "full") {
    return { contentMd: markdown, note: "" };
  }

  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const sectionBodies = collectLessonSectionBodies(lines);
  const hasSelfTest = sectionBodies.has("自测题");
  const hasDefinition = sectionBodies.has("定义");
  const hasWork = variant === "review" ? hasSelfTest : hasSelfTest || hasDefinition;
  if (!hasWork) {
    // 无小节可变换：原样返回（保持字节不变，幂等）
    return { contentMd: markdown, note: variant === "review" ? REVIEW_NOTE : EXAM_NOTE };
  }

  const out: string[] = [];
  let current: ClewLessonSection | null = null;
  for (const line of lines) {
    const matched = CLEW_LESSON_SECTIONS.find((title) => isSectionHeading(line, title));
    if (matched) {
      current = matched;
      if (variant === "exam" && matched === "自测题") {
        continue; // 备考视图：整个小节（含标题行）删除
      }
      out.push(line);
      continue;
    }
    if (variant === "exam" && current === "自测题") {
      continue;
    }
    if (variant === "review" && current === "自测题") {
      const trimmedRight = line.trimEnd();
      if (ANSWER_LINE.test(trimmedRight)) {
        continue; // 整行删除
      }
      const inline = trimmedRight.match(INLINE_ANSWER);
      if (inline && inline[1].trim().length > 0) {
        out.push(inline[1].trimEnd()); // 题干保留，删除「参考答案」起至行尾
        continue;
      }
      out.push(line);
      continue;
    }
    if (variant === "exam" && current === "定义") {
      out.push(line.trim().length === 0 ? line : truncateToFirstSentence(line));
      continue;
    }
    out.push(line);
  }

  return {
    contentMd: out.join("\n"),
    note: variant === "review" ? REVIEW_NOTE : EXAM_NOTE,
  };
}
