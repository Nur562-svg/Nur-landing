/**
 * Hi doc M6 课题工作坊材料检索（纯函数，确定性关键词检索；MVP 不引向量库）。
 * 分词规则：拉丁/数字按连续串取词（≥2 字符）；中文连续段取整段（≤10 字）+ 全部二字滑窗。
 * 命中评分确定性：按「命中词种数 ↓、命中次数 ↓、片段序 ↑」排序，同分结果稳定。
 * 检索不到就如实返回空命中，调用方据此说明「材料里没有相关内容」，绝不编造材料内容或页码。
 */

/** 单条检索片段（PDF 按页；文本按 40 行一块）。 */
export type HiDocWorkshopSegment = {
  fileId: string;
  fileName: string;
  /** PDF 页码（1 起）；文本材料为 null。 */
  page: number | null;
  /** 文本材料的行号区间（1 起，含端点）；PDF 为 null。 */
  lineStart: number | null;
  lineEnd: number | null;
  text: string;
};

/** 命中片段（进入答疑上下文与引用列表）。 */
export type HiDocWorkshopSearchHit = {
  fileId: string;
  fileName: string;
  /** 中文定位标签：「第 3 页」/「第 41–80 行」。 */
  locator: string;
  /** 命中处附近的原文摘录（截断，供模型引用与前端展示）。 */
  excerpt: string;
  matchedTerms: string[];
  score: number;
};

/** 进入上下文与结果载荷的命中片段数上限。 */
export const HIDOC_WORKSHOP_MAX_HITS = 8;
/** 每条命中片段摘录长度上限。 */
export const HIDOC_WORKSHOP_HIT_EXCERPT_CHARS = 600;
/** 文本分块的行数（与行/页折算比一致：一块 ≈ 1 页）。 */
export const HIDOC_WORKSHOP_TEXT_CHUNK_LINES = 40;

/** 中文停用/虚词（确定性小表；只过滤提问里的口语虚词，不影响材料原文）。 */
const QUESTION_STOPWORDS = new Set([
  "什么", "怎么", "怎样", "如何", "为什么", "哪些", "哪个", "是不是", "有没有",
  "请问", "一下", "材料", "里面", "提到", "讲到", "关于", "对于", "这个", "那个",
  "我们", "你们", "它们", "可以", "应该", "还是", "就是", "出现", "称为",
]);

function isCjk(char: string): boolean {
  return /[一-鿿㐀-䶿]/.test(char);
}

/**
 * 提问分词：拉丁/数字词（≥2 字符，小写化）+ 中文整段（2–10 字）+ 中文二字滑窗。
 * 去停用词；输出确定性去重（按首次出现序）。
 */
export function tokenizeHiDocWorkshopQuery(question: string): string[] {
  const tokens: string[] = [];
  const seen = new Set<string>();
  const push = (token: string) => {
    if (token.length < 2 || seen.has(token) || QUESTION_STOPWORDS.has(token)) {
      return;
    }
    seen.add(token);
    tokens.push(token);
  };

  const asciiRuns = question.toLowerCase().match(/[a-z0-9][a-z0-9.+-]*/g) ?? [];
  for (const run of asciiRuns) {
    push(run);
  }

  const cjkRuns = question.match(/[一-鿿㐀-䶿]+/g) ?? [];
  for (const run of cjkRuns) {
    if (run.length >= 2 && run.length <= 10 && !QUESTION_STOPWORDS.has(run)) {
      push(run);
    }
    for (let index = 0; index + 2 <= run.length; index += 1) {
      push(run.slice(index, index + 2));
    }
  }
  return tokens;
}

/** 片段定位标签。 */
export function describeHiDocWorkshopSegmentLocator(segment: {
  page: number | null;
  lineStart: number | null;
  lineEnd: number | null;
}): string {
  if (segment.page !== null) {
    return `第 ${segment.page} 页`;
  }
  if (segment.lineStart !== null && segment.lineEnd !== null) {
    return segment.lineStart === segment.lineEnd
      ? `第 ${segment.lineStart} 行`
      : `第 ${segment.lineStart}–${segment.lineEnd} 行`;
  }
  return "位置未知";
}

/** PDF 文字层 → 片段（每页一条；空白页跳过）。 */
export function buildHiDocWorkshopPdfSegments(
  fileId: string,
  fileName: string,
  pages: readonly { pageNumber: number; text: string }[],
): HiDocWorkshopSegment[] {
  const segments: HiDocWorkshopSegment[] = [];
  for (const page of pages) {
    const text = page.text.replace(/\s+/g, " ").trim();
    if (text.length === 0) {
      continue;
    }
    segments.push({ fileId, fileName, page: page.pageNumber, lineStart: null, lineEnd: null, text });
  }
  return segments;
}

/** 文本材料 → 片段（每 40 行一条；空白行不单独成块）。 */
export function buildHiDocWorkshopTextSegments(
  fileId: string,
  fileName: string,
  text: string,
): HiDocWorkshopSegment[] {
  const lines = text.split("\n");
  const segments: HiDocWorkshopSegment[] = [];
  for (let start = 0; start < lines.length; start += HIDOC_WORKSHOP_TEXT_CHUNK_LINES) {
    const chunk = lines.slice(start, start + HIDOC_WORKSHOP_TEXT_CHUNK_LINES);
    const chunkText = chunk.join("\n").replace(/[ \t]+/g, " ").trim();
    if (chunkText.length === 0) {
      continue;
    }
    segments.push({
      fileId,
      fileName,
      page: null,
      lineStart: start + 1,
      lineEnd: Math.min(start + HIDOC_WORKSHOP_TEXT_CHUNK_LINES, lines.length),
      text: chunkText,
    });
  }
  return segments;
}

function countOccurrences(haystack: string, needle: string): number {
  let count = 0;
  let index = haystack.indexOf(needle);
  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }
  return count;
}

/** 截取命中处附近的摘录（以第一个命中词为中心，前后各留约一半窗口）。 */
function buildExcerpt(text: string, terms: readonly string[]): string {
  let firstIndex = -1;
  for (const term of terms) {
    const index = text.indexOf(term);
    if (index !== -1 && (firstIndex === -1 || index < firstIndex)) {
      firstIndex = index;
    }
  }
  if (text.length <= HIDOC_WORKSHOP_HIT_EXCERPT_CHARS) {
    return text;
  }
  const half = Math.floor(HIDOC_WORKSHOP_HIT_EXCERPT_CHARS / 2);
  const start = Math.max(0, (firstIndex === -1 ? 0 : firstIndex - half));
  const end = Math.min(text.length, start + HIDOC_WORKSHOP_HIT_EXCERPT_CHARS);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

/** 提问是否含长词线索：词表有 ≥3 字词，或存在 ≥3 字的中文连续段（超长段不产生整段词，但仍是长提问）。 */
function queryHasLongTerm(question: string, terms: readonly string[]): boolean {
  if (terms.some((term) => term.length >= 3)) {
    return true;
  }
  return (question.match(/[一-鿿㐀-䶿]+/g) ?? []).some((run) => run.length >= 3);
}

/**
 * 确定性关键词检索：返回按评分排序的命中片段（最多 maxHits 条）。
 * 没有命中返回空数组——调用方必须如实说明「材料里没有相关内容」。
 * 命中门槛：提问含长词（≥3 字）时，单个二字滑窗命中不算数（「学的」「的是」类噪声太多），
 * 需命中至少一个长词，或 ≥2 个不同词且覆盖 ≥4 字（相邻滑窗叠合命中只算一个窗口）；
 * 纯二字提问（如「心火」）仍允许单词命中。
 */
export function searchHiDocWorkshopSegments(
  segments: readonly HiDocWorkshopSegment[],
  question: string,
  maxHits: number = HIDOC_WORKSHOP_MAX_HITS,
): HiDocWorkshopSearchHit[] {
  const terms = tokenizeHiDocWorkshopQuery(question);
  if (terms.length === 0 || segments.length === 0) {
    return [];
  }
  const hasLongTerm = queryHasLongTerm(question, terms);

  const hits: HiDocWorkshopSearchHit[] = [];
  segments.forEach((segment, segmentIndex) => {
    const haystack = segment.text;
    const matchedTerms: string[] = [];
    let occurrences = 0;
    // 记录命中覆盖的字符位置（二字滑窗叠合命中只算一个窗口，避免「的基+基本」凑数）
    const covered = new Set<number>();
    for (const term of terms) {
      const count = countOccurrences(haystack, term);
      if (count > 0) {
        matchedTerms.push(term);
        occurrences += Math.min(count, 5);
        let index = haystack.indexOf(term);
        while (index !== -1) {
          for (let offset = 0; offset < term.length; offset += 1) {
            covered.add(index + offset);
          }
          index = haystack.indexOf(term, index + term.length);
        }
      }
    }
    const hasLongMatch = matchedTerms.some((term) => term.length >= 3);
    const isHit = hasLongTerm
      ? hasLongMatch || (matchedTerms.length >= 2 && covered.size >= 4)
      : matchedTerms.length >= 1;
    if (!isHit) {
      return;
    }
    hits.push({
      fileId: segment.fileId,
      fileName: segment.fileName,
      locator: describeHiDocWorkshopSegmentLocator(segment),
      excerpt: buildExcerpt(segment.text, matchedTerms),
      matchedTerms,
      // 评分 = 命中词种数 × 100 + 命中次数（封顶）；segmentIndex 用于同分稳定排序
      score: matchedTerms.length * 100 + occurrences,
    });
    void segmentIndex;
  });

  return hits
    .map((hit, index) => ({ hit, index }))
    .sort((a, b) => b.hit.score - a.hit.score || a.index - b.index)
    .slice(0, Math.max(1, maxHits))
    .map(({ hit }) => hit);
}

/**
 * 只读关联该用户自己的教材知识点标题：提问分词命中知识点标题（或标题整段包含提问中的中文长词）即关联。
 * 关联不到返回空数组，调用方如实不关联；只读不写。
 */
export function matchHiDocWorkshopKnowledgePoints(
  knowledgePointTitles: readonly { id: string; title: string; textbookTitle: string }[],
  question: string,
  maxMatches = 5,
): { id: string; title: string; textbookTitle: string }[] {
  const terms = tokenizeHiDocWorkshopQuery(question);
  if (terms.length === 0) {
    return [];
  }
  const hasLongTerm = queryHasLongTerm(question, terms);
  const matches: { id: string; title: string; textbookTitle: string; score: number; index: number }[] = [];
  knowledgePointTitles.forEach((kp, index) => {
    let score = 0;
    for (const term of terms) {
      if (kp.title.includes(term)) {
        // 命中整段长词权重更高
        score += term.length >= 3 ? 2 : 1;
      }
    }
    // 与片段检索同一门槛：提问含长词时，单个二字滑窗命中不足以关联
    const isMatch = hasLongTerm ? score >= 2 : score >= 1;
    if (isMatch) {
      matches.push({ ...kp, score, index });
    }
  });
  return matches
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, Math.max(1, maxMatches))
    .map(({ id, title, textbookTitle }) => ({ id, title, textbookTitle }));
}

/** 检索零命中时的固定回答（确定性文案，不调用模型、不占模型额度）。 */
export function buildHiDocWorkshopNoHitAnswer(workshopTitle: string): string {
  return [
    `这份课题（${workshopTitle}）的材料里没有检索到与你问题相关的内容。`,
    "我没有调用模型作答，以免编造材料里不存在的内容。",
    "可以尝试：换一种问法（用材料中的原词）、补充上传相关材料，或到对应教材的知识点里追问。",
  ].join("\n");
}
