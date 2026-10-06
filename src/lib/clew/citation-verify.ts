/**
 * Clew 页码引用核验（ZCODE-M6-D，任务书 §七 D-1；纯函数，可测试，无 server-only）。
 *
 * 把模型输出里声明「第 X 页」/【PDF 第 X 页】的引用，对照教材原文片段（按页切分后的
 * 对应页文本）做包含匹配：同句多引用逐一核验（不以句为单位放行）；每条引用取其
 * 「前文本段 ∪ 后文本段」做关键词匹配（兼容「……（第 X 页）」后置与「第 X 页指出：…」
 * 前置两种行文），任一侧命中 ≥1 关键词即过；两侧全部 0 命中 → issue（如实标注，不改写正文）。
 *
 * 关键词 = 虚词切块（任务书 D-1 规定算法：≥2 字、去「的/是/在/与」等）∪ 标点段 3 字滑窗
 * （宽松阈值，任务书 §七 风险表）。并集两者：滑窗容忍「是非题第4题」对页内「一、是非题」
 * 的转述差，虚词切块保证「预后」这类 2 字实词可单独命中。失败模式偏向「多标注」而非
 * 「漏标注」——失配只标注、重试后仍失配不改写不阻断，诚实优先。
 *
 * 如实边界（首版局限）：OCR 异体字（⼀ vs 一）不做映射；全半角与空白折叠做规范化；
 * 没写页码的叙述不在核验范围（不猜测）。
 */

/** 单条引用失配（页码 + 该引用对应的文本段），调用方据此生成对用户的标注文案。 */
export type ClewCitationIssue = {
  page: number;
  /** 失配文本段（截断到 120 字，用于 notes 展示）。 */
  sentence: string;
};

export type ClewCitationVerification = {
  /** 实际执行了包含匹配的引用数（无关键词/无页码的引用不计入；0 = 无可核验引用）。 */
  checked: number;
  issues: ClewCitationIssue[];
};

/** 页码标记形态：【PDF 第 N 页】（原文片段自带）与「第 N 页」（模型行文引用）。 */
const PAGE_MARKER = /【PDF 第 (\d+) 页】/g;
/**
 * 行文引用（在规范化文本上匹配——全角数字/空白已折叠）。合并正则：
 * - 【PDF第N页】标记形态（整体为一个匹配，page=m[1]）；
 * - 第N页 / 第N–M页 行内引用（page=m[2]，区间 m[3]）。
 * 合并匹配保证「【PDF」前缀不会作为悬空残段进入关键词。
 */
const INLINE_CITATION = /【PDF第(\d{1,3})页】|第(\d{1,3})(?:[-–—~](\d{1,3}))?页/g;

type InlineCitation = { start: number; end: number; index: number; length: number };

function parseInlineCitations(normalizedSentence: string): InlineCitation[] {
  return Array.from(normalizedSentence.matchAll(INLINE_CITATION)).map((match) => ({
    start: match[1] !== undefined ? Number.parseInt(match[1], 10) : Number.parseInt(match[2], 10),
    end:
      match[1] !== undefined
        ? Number.parseInt(match[1], 10)
        : match[3] !== undefined
          ? Number.parseInt(match[3], 10)
          : Number.parseInt(match[2], 10),
    index: match.index ?? 0,
    length: match[0].length,
  }));
}

/** 虚词/常见功能字（D-1 规定的排除表；切块时作为分隔符）。 */
const STOPWORD_CHARS = "的是在与和或及了为对从被把中之于其这那又就还都等有要会可以上下不无便才则而且并且或者但是因此所以由于以及通过根据按照如果虽然然而";
/** 标点/符号（切段分隔符；类内已转义 ] 与 -）。 */
const SPLIT_CHARS = "，。、；：！？（）()【】《》「」『』“”‘’·—–\\-~～/\\|,.:;!?<>{}\\[\\]\"'`*#_>+=&@%$^";

/** 原文片段（带【PDF 第 N 页】标记）→ 页码到该页文本的映射（纯函数）。 */
export function splitExcerptPages(excerpt: string): Map<number, string> {
  const pageMap = new Map<number, string>();
  const matches = Array.from(excerpt.matchAll(PAGE_MARKER));
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const page = Number.parseInt(match[1], 10);
    if (!Number.isInteger(page)) {
      continue;
    }
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? excerpt.length) : excerpt.length;
    const text = excerpt.slice(start, end).trim();
    if (text.length === 0) {
      continue;
    }
    pageMap.set(page, text);
  }
  return pageMap;
}

/**
 * 规范化：全角 ASCII/标点 → 半角，全部空白删除（中文包含匹配不依赖空白）；
 * markdown 装饰符（* _ ` ~）一并删除——「**第 3 页**」加粗不该让引用段带上星号残片。
 * 导出供上下文去重复用。
 */
export function normalizeText(value: string): string {
  let result = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    result += code === 0x3000
      ? " "
      : code >= 0xff01 && code <= 0xff5e
        ? String.fromCharCode(code - 0xfee0)
        : char;
  }
  return result.replace(/[*_`~]/g, "").replace(/\s+/g, "");
}

/**
 * 从规范化文本段提取候选关键词（并集）：
 * 1. 虚词切块（D-1 规定算法）：按虚词/标点切分，保留 ≥2 字块；
 * 2. 标点段 3 字滑窗（宽松阈值）：段（≥3 字）的全部 3 字窗口。
 * 去重返回（任一候选命中即过，顺序不影响结论）。
 */
function extractKeywordChunks(normalizedSegment: string): string[] {
  const splitter = new RegExp(`[${STOPWORD_CHARS}${SPLIT_CHARS}]`);
  const candidates = new Set<string>();
  for (const chunk of normalizedSegment.split(splitter)) {
    if (chunk.length >= 2) {
      candidates.add(chunk);
    }
  }
  for (const segment of normalizedSegment.split(new RegExp(`[${SPLIT_CHARS}]`))) {
    if (segment.length < 3) {
      continue;
    }
    for (let start = 0; start + 3 <= segment.length; start += 1) {
      candidates.add(segment.slice(start, start + 3));
    }
  }
  return [...candidates];
}

/**
 * 核验 contentMd 中带页码的引用：每条引用只核验它前面的文本段。
 * - 页码不在 pageMap → issue（无法核验的页码按失配处理，不静默放过）；
 * - 区间引用（第 12–13 页）：任一页命中即过；全部 0 命中 → issue（page 记起始页）；
 * - 引用前无实词（如孤立的【PDF 第 N 页】标记行）→ 无声明可核验，跳过不计入 checked。
 */
export function verifyCitations(contentMd: string, pageMap: Map<number, string>): ClewCitationVerification {
  // 句级切分只为控制段窗口大小；引用核验以「引用前的文本段」为单位（同句多引用逐一核验）
  const sentences = contentMd
    .replace(/\r\n/g, "\n")
    .split(/(?<=[。！？!?；;])|\n/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);

  const normalizedPages = new Map<number, string>();
  for (const [page, text] of pageMap) {
    normalizedPages.set(page, normalizeText(text));
  }

  const issues: ClewCitationIssue[] = [];
  let checked = 0;

  for (const sentence of sentences) {
    const normalizedSentence = normalizeText(sentence);
    const matches = parseInlineCitations(normalizedSentence);
    if (matches.length === 0) {
      continue;
    }
    // 逐引用核验：后置形态（……（第 X 页））核验引用前文本段；前置形态（第 X 页指出：……）
    // 或标记形态（【PDF 第 N 页】内容……）核验引用后文本段——**前或任一侧命中即过**，
    // 两侧都 0 命中才判失配（容忍「第 X 页明确指出：」引出后文的写法）。
    let segmentStart = 0;
    for (let m = 0; m < matches.length; m += 1) {
      const citation = matches[m];
      const start = citation.start;
      const end = citation.end;
      const matchEnd = citation.index + citation.length;
      const beforeSegment = normalizedSentence.slice(segmentStart, citation.index);
      const afterEnd = m + 1 < matches.length ? matches[m + 1].index : normalizedSentence.length;
      const afterSegment = normalizedSentence.slice(matchEnd, afterEnd);
      segmentStart = matchEnd;

      const beforeChunks = extractKeywordChunks(beforeSegment);
      const afterChunks = extractKeywordChunks(afterSegment);
      if (beforeChunks.length === 0 && afterChunks.length === 0) {
        continue; // 两侧都无实词（孤立标记/纯装饰），无声明可核验，不计入 checked
      }
      checked += 1;
      const hits = (chunks: string[], pageText: string): boolean => chunks.some((chunk) => pageText.includes(chunk));
      let matched = false;
      for (let page = start; page <= end && page <= start + 50; page += 1) {
        const pageText = normalizedPages.get(page);
        if (pageText === undefined) {
          continue;
        }
        if (hits(beforeChunks, pageText) || hits(afterChunks, pageText)) {
          matched = true;
          break;
        }
      }
      if (!matched) {
        // 失配段取实词更丰富的一侧展示（更接近该引用真正「声称」的内容）
        const segment = beforeChunks.length >= afterChunks.length ? beforeSegment : afterSegment;
        issues.push({
          page: start,
          sentence: segment.length > 120 ? `${segment.slice(0, 120)}…` : segment,
        });
      }
    }
  }

  return { checked, issues };
}
