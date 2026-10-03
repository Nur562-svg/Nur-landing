/**
 * Clew 讲义 markdown 解析（纯函数，客户端可安全引用）。
 * 只支持讲义实际用到的子集：标题 / 段落 / 列表 / 引用 / 粗体 / 行内代码；
 * 渲染端据此构造 React 元素，不使用 dangerouslySetInnerHTML。
 */

export type ClewInlineToken =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "code"; text: string };

export type ClewMarkdownBlock =
  | { kind: "heading"; level: 1 | 2 | 3 | 4; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "quote"; text: string };

const HEADING_PATTERN = /^(#{1,6})\s+(.*)$/;
const UNORDERED_PATTERN = /^\s*[-*+]\s+(.*)$/;
const ORDERED_PATTERN = /^\s*\d{1,2}[.、)）]\s+(.*)$/;
const QUOTE_PATTERN = /^\s*>\s?(.*)$/;
const HR_PATTERN = /^\s*(-{3,}|\*{3,}|_{3,})\s*$/;

function clampHeadingLevel(hashes: string): 1 | 2 | 3 | 4 {
  const level = Math.min(hashes.length, 4);
  return (level < 1 ? 1 : level) as 1 | 2 | 3 | 4;
}

export function parseClewMarkdown(markdown: string): ClewMarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ClewMarkdownBlock[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ kind: "paragraph", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list && list.items.length > 0) {
      blocks.push({ kind: "list", ordered: list.ordered, items: list.items });
    }
    list = null;
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const line of lines) {
    if (line.trim().length === 0) {
      flushAll();
      continue;
    }
    if (HR_PATTERN.test(line)) {
      flushAll();
      continue;
    }

    const heading = line.match(HEADING_PATTERN);
    if (heading) {
      flushAll();
      blocks.push({
        kind: "heading",
        level: clampHeadingLevel(heading[1]),
        text: heading[2].trim(),
      });
      continue;
    }

    const quote = line.match(QUOTE_PATTERN);
    if (quote) {
      flushAll();
      blocks.push({ kind: "quote", text: quote[1].trim() });
      continue;
    }

    const unordered = line.match(UNORDERED_PATTERN);
    const ordered = line.match(ORDERED_PATTERN);
    if (unordered) {
      flushParagraph();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(unordered[1].trim());
      continue;
    }
    if (ordered) {
      flushParagraph();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(ordered[1].trim());
      continue;
    }

    // 列表项的续行（缩进文本，例如「参考答案：…」）并入上一项
    if (list && list.items.length > 0 && /^\s{2,}\S/.test(line)) {
      list.items[list.items.length - 1] = `${list.items[list.items.length - 1]} ${line.trim()}`;
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushAll();
  return blocks;
}

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

export function parseClewInline(text: string): ClewInlineToken[] {
  const tokens: ClewInlineToken[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(INLINE_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      tokens.push({ kind: "text", text: text.slice(lastIndex, index) });
    }
    const raw = match[0];
    if (raw.startsWith("**")) {
      tokens.push({ kind: "bold", text: raw.slice(2, -2) });
    } else {
      tokens.push({ kind: "code", text: raw.slice(1, -1) });
    }
    lastIndex = index + raw.length;
  }
  if (lastIndex < text.length) {
    tokens.push({ kind: "text", text: text.slice(lastIndex) });
  }
  return tokens;
}