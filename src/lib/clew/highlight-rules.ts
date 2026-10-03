import type {
  ClewHighlightAnchor,
  ClewHighlightColor,
  ClewHighlightPaintItem,
  ClewHighlightView,
} from "@/types/clew";

/**
 * Clew 划重点规则层（纯函数，客户端可安全引用）：
 * 四色枚举、输入校验（长度/枚举/上限）、定位锚点解析与失配判定、讲义文本中的定位匹配。
 * 划线定位只依赖确定性字符串匹配，匹配不到就如实进入「未定位」，绝不伪造位置。
 */

export const CLEW_HIGHLIGHT_COLORS: readonly ClewHighlightColor[] = [
  "amber",
  "cinnabar",
  "slate",
  "jade",
];

/** 四色语义标签（低饱和度纸面用色）。 */
export const CLEW_HIGHLIGHT_COLOR_LABELS: Record<ClewHighlightColor, string> = {
  amber: "琥珀",
  cinnabar: "朱砂",
  slate: "黛蓝",
  jade: "青玉",
};

/** 选中文字（去首尾空白后）长度上限。 */
export const CLEW_HIGHLIGHT_QUOTE_MAX_CHARS = 500;
/** 批注长度上限。 */
export const CLEW_HIGHLIGHT_NOTE_MAX_CHARS = 1000;
/** 前后文定位上下文各自的长度上限（超出截取靠近选区的部分）。 */
export const CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS = 80;
/** 每个知识点每个用户的划重点条数上限。 */
export const CLEW_HIGHLIGHT_MAX_PER_KP = 100;

/** 归属校验失败（不存在或不属于当前账户）时的统一中文原因。 */
export const CLEW_HIGHLIGHT_NOT_FOUND_MESSAGE = "划重点不存在或不属于当前账户。";

/** 未知/缺省颜色返回 null（不猜测，由调用方如实报错）。 */
export function parseClewHighlightColor(value: unknown): ClewHighlightColor | null {
  return typeof value === "string" && (CLEW_HIGHLIGHT_COLORS as readonly string[]).includes(value)
    ? (value as ClewHighlightColor)
    : null;
}

export type ClewHighlightValidatedInput = {
  quote: string;
  prefix: string;
  suffix: string;
  color: ClewHighlightColor;
  note: string | null;
};

export type ClewHighlightValidation =
  | { ok: true; value: ClewHighlightValidatedInput }
  | { ok: false; reason: string };

export type ClewHighlightRawInput = {
  quote: unknown;
  prefix: unknown;
  suffix: unknown;
  color: unknown;
  note: unknown;
};

function readContext(prefix: unknown, suffix: unknown): { prefix: string; suffix: string } {
  const read = (value: unknown, tail: boolean): string => {
    if (typeof value !== "string") {
      return "";
    }
    const text = value.replace(/\s+/g, " ").trim();
    if (text.length <= CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS) {
      return text;
    }
    // 保留最靠近选区的一侧（前缀取尾部，后缀取头部）
    return tail ? text.slice(-CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS) : text.slice(0, CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS);
  };
  return { prefix: read(prefix, true), suffix: read(suffix, false) };
}

/** 创建划重点的严格校验：quote 非空且 ≤500、color 属于枚举、note ≤1000、前后文各自限长。 */
export function validateClewHighlightInput(raw: ClewHighlightRawInput): ClewHighlightValidation {
  if (typeof raw.quote !== "string" || raw.quote.trim().length === 0) {
    return { ok: false, reason: "请先在讲义中选中要划重点的文字。" };
  }
  const quote = raw.quote.trim();
  if (quote.length > CLEW_HIGHLIGHT_QUOTE_MAX_CHARS) {
    return {
      ok: false,
      reason: `选中的文字过长（${quote.length} 字），请控制在 ${CLEW_HIGHLIGHT_QUOTE_MAX_CHARS} 字以内。`,
    };
  }
  const color = parseClewHighlightColor(raw.color);
  if (!color) {
    return { ok: false, reason: "划线颜色不在允许的四色之内（琥珀 / 朱砂 / 黛蓝 / 青玉）。" };
  }
  const note = typeof raw.note === "string" ? raw.note.trim() : "";
  if (note.length > CLEW_HIGHLIGHT_NOTE_MAX_CHARS) {
    return {
      ok: false,
      reason: `批注过长（${note.length} 字），请控制在 ${CLEW_HIGHLIGHT_NOTE_MAX_CHARS} 字以内。`,
    };
  }
  const context = readContext(raw.prefix, raw.suffix);
  return {
    ok: true,
    value: { quote, color, note: note.length > 0 ? note : null, ...context },
  };
}

export type ClewHighlightPatch = {
  color?: ClewHighlightColor;
  note?: string | null;
};

export type ClewHighlightPatchValidation =
  | { ok: true; value: ClewHighlightPatch }
  | { ok: false; reason: string };

/** 修改划重点：只接受 color / note 两个字段，至少一个有效。 */
export function validateClewHighlightPatch(raw: { color: unknown; note: unknown }): ClewHighlightPatchValidation {
  const value: ClewHighlightPatch = {};
  if (raw.color !== undefined) {
    const color = parseClewHighlightColor(raw.color);
    if (!color) {
      return { ok: false, reason: "划线颜色不在允许的四色之内（琥珀 / 朱砂 / 黛蓝 / 青玉）。" };
    }
    value.color = color;
  }
  if (raw.note !== undefined) {
    if (raw.note !== null && typeof raw.note !== "string") {
      return { ok: false, reason: "批注格式无效。" };
    }
    const note = typeof raw.note === "string" ? raw.note.trim() : "";
    if (note.length > CLEW_HIGHLIGHT_NOTE_MAX_CHARS) {
      return {
        ok: false,
        reason: `批注过长（${note.length} 字），请控制在 ${CLEW_HIGHLIGHT_NOTE_MAX_CHARS} 字以内。`,
      };
    }
    value.note = note.length > 0 ? note : null;
  }
  if (value.color === undefined && value.note === undefined) {
    return { ok: false, reason: "没有需要修改的内容（可改颜色或批注）。" };
  }
  return { ok: true, value };
}

/** anchor Json 按不可信输入解析：只认 { lessonUpdatedAt: string | null }。 */
export function parseClewHighlightAnchor(value: unknown): ClewHighlightAnchor {
  if (typeof value !== "object" || value === null) {
    return { lessonUpdatedAt: null };
  }
  const candidate = (value as { lessonUpdatedAt?: unknown }).lessonUpdatedAt;
  return { lessonUpdatedAt: typeof candidate === "string" && candidate.length > 0 ? candidate : null };
}

/**
 * 失配判定：创建时的讲义版本与当前讲义不一致（或讲义不存在 / 锚点缺失）→ 未定位。
 * 不做任何猜测式重定位。
 */
export function isClewHighlightStale(
  highlight: Pick<ClewHighlightView, "anchorLessonUpdatedAt">,
  lessonGeneratedAt: string | null,
): boolean {
  if (!lessonGeneratedAt || !highlight.anchorLessonUpdatedAt) {
    return true;
  }
  return highlight.anchorLessonUpdatedAt !== lessonGeneratedAt;
}

/** 每 kp 上限的中文原因（503，不静默放行）。 */
export function buildClewHighlightLimitMessage(limit: number = CLEW_HIGHLIGHT_MAX_PER_KP): string {
  return `本知识点的划重点已达上限（${limit} 条）。请先删除不再需要的划线或批注，再继续划重点。`;
}

/* ---------------- 讲义文本中的定位匹配 ---------------- */

type IndexMap = { normalized: string; map: number[] };

/** 去掉全部空白并记录每个非空白字符对应的原文下标（跨块选区的选中文本常带换行，正文纯文本却没有）。 */
function stripWhitespaceWithIndexMap(text: string): IndexMap {
  const map: number[] = [];
  let normalized = "";
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (/\s/.test(char)) {
      continue;
    }
    normalized += char;
    map.push(index);
  }
  return { normalized, map };
}

function collectOccurrences(haystack: string, needle: string): number[] {
  const positions: number[] = [];
  if (needle.length === 0) {
    return positions;
  }
  let from = 0;
  for (;;) {
    const found = haystack.indexOf(needle, from);
    if (found < 0) {
      return positions;
    }
    positions.push(found);
    from = found + 1;
  }
}

export type ClewQuoteMatch = {
  /** 原文（未归一化）中的起始下标（含）。 */
  start: number;
  /** 原文中的结束下标（不含）。 */
  end: number;
};

/**
 * 在讲义纯文本中定位选中文字：先用原文精确匹配，失败再用折叠空白后的文本兜底；
 * 多个候选时用 prefix/suffix 上下文消歧（前缀结尾 / 后缀开头匹配数多者优先，仍相同取最先出现）。
 */
export function findClewQuoteMatch(
  text: string,
  quote: string,
  prefix: string = "",
  suffix: string = "",
): ClewQuoteMatch | null {
  const trimmedQuote = quote.trim();
  if (text.length === 0 || trimmedQuote.length === 0) {
    return null;
  }

  const exact = collectOccurrences(text, trimmedQuote);
  if (exact.length > 0) {
    return pickBestMatch(text, exact, trimmedQuote.length, prefix, suffix);
  }

  // 原文精确匹配失败：去掉空白后再匹配一次（选区跨块时选中文本可能带换行）
  if (!/\s/.test(text) && !/\s/.test(trimmedQuote)) {
    return null;
  }
  const normalized = stripWhitespaceWithIndexMap(text);
  const normalizedQuote = trimmedQuote.replace(/\s+/g, "");
  if (normalizedQuote.length === 0) {
    return null;
  }
  const candidates = collectOccurrences(normalized.normalized, normalizedQuote);
  if (candidates.length === 0) {
    return null;
  }
  const best = pickBestMatch(
    normalized.normalized,
    candidates,
    normalizedQuote.length,
    prefix.replace(/\s+/g, ""),
    suffix.replace(/\s+/g, ""),
  );
  if (!best) {
    return null;
  }
  const rawStart = normalized.map[best.start];
  const rawEnd = normalized.map[Math.min(best.end - 1, normalized.map.length - 1)] + 1;
  if (rawStart === undefined || rawEnd <= rawStart) {
    return null;
  }
  return { start: rawStart, end: rawEnd };
}

function contextScore(
  haystack: string,
  start: number,
  length: number,
  prefix: string,
  suffix: string,
): number {
  let score = 0;
  if (prefix.length > 0 && haystack.slice(Math.max(0, start - prefix.length), start) === prefix) {
    score += 2;
  }
  const end = start + length;
  if (suffix.length > 0 && haystack.slice(end, end + suffix.length) === suffix) {
    score += 2;
  }
  return score;
}

function pickBestMatch(
  haystack: string,
  positions: readonly number[],
  length: number,
  prefix: string,
  suffix: string,
): ClewQuoteMatch | null {
  let best: ClewQuoteMatch | null = null;
  let bestScore = -1;
  for (const start of positions) {
    const score = contextScore(haystack, start, length, prefix, suffix);
    if (score > bestScore) {
      bestScore = score;
      best = { start, end: start + length };
    }
  }
  return best;
}

/** 视图 → 渲染项（仅取定位所需字段）。 */
export function toClewHighlightPaintItems(
  highlights: readonly ClewHighlightView[],
): ClewHighlightPaintItem[] {
  return highlights.map((item) => ({
    id: item.id,
    color: item.color,
    quote: item.quote,
    prefix: item.prefix,
    suffix: item.suffix,
  }));
}