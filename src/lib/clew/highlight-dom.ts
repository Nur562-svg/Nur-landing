import type { ClewHighlightColor, ClewHighlightPaintItem, ClewHighlightSelection } from "@/types/clew";
import { CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS, findClewQuoteMatch } from "./highlight-rules";

/**
 * Clew 划重点 DOM 定位（仅浏览器端使用）：
 * 在渲染后的讲义 DOM 内用 quote + prefix/suffix 做文本定位，并通过 Range/textNode 包裹 `<mark>`。
 * 禁止 innerHTML 拼接（防注入）：所有操作都走 TreeWalker / splitText / insertBefore。
 */

const MARK_ATTRIBUTE = "data-clew-highlight-id";
const MARK_COLOR_ATTRIBUTE = "data-clew-swatch";

type TextSegment = { node: Text; start: number; end: number };

function collectTextSegments(root: HTMLElement): TextSegment[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const segments: TextSegment[] = [];
  let offset = 0;
  let current = walker.nextNode();
  while (current) {
    const text = current as Text;
    const length = text.data.length;
    if (length > 0) {
      segments.push({ node: text, start: offset, end: offset + length });
      offset += length;
    }
    current = walker.nextNode();
  }
  return segments;
}

/** 清除既有划线：把 <mark> 的文本节点放回原位并合并相邻文本节点（不改动 React 渲染的文本内容）。 */
export function clearClewHighlightMarks(root: HTMLElement): void {
  const marks = root.querySelectorAll(`mark[${MARK_ATTRIBUTE}]`);
  marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) {
      return;
    }
    while (mark.firstChild) {
      parent.insertBefore(mark.firstChild, mark);
    }
    parent.removeChild(mark);
  });
  root.normalize();
}

function wrapRange(
  segments: readonly TextSegment[],
  start: number,
  end: number,
  item: ClewHighlightPaintItem,
  swatchClassName: (color: ClewHighlightColor) => string,
): boolean {
  const affected = segments.filter((segment) => segment.start < end && segment.end > start);
  if (affected.length === 0) {
    return false;
  }
  // 从后往前处理：先切后面的文本节点，前面已取的节点引用保持有效
  for (const segment of [...affected].reverse()) {
    const localStart = Math.max(0, start - segment.start);
    const localEnd = Math.min(segment.end - segment.start, end - segment.start);
    if (localEnd <= localStart) {
      continue;
    }
    let node: Text = segment.node;
    if (localEnd < node.data.length) {
      node.splitText(localEnd);
    }
    if (localStart > 0) {
      node = node.splitText(localStart);
    }
    const parent = node.parentNode;
    if (!parent) {
      continue;
    }
    const mark = document.createElement("mark");
    mark.setAttribute(MARK_ATTRIBUTE, item.id);
    mark.setAttribute(MARK_COLOR_ATTRIBUTE, item.color);
    mark.className = swatchClassName(item.color);
    parent.insertBefore(mark, node);
    mark.appendChild(node);
  }
  return true;
}

export type ClewPaintResult = {
  locatedIds: string[];
  missingIds: string[];
};

/**
 * 逐条定位并划线：定位失败（讲义已更新 / 文本对不上）的条目返回 missingIds，
 * 由 UI 如实放进「未定位」列表，不做任何猜测式定位。
 */
export function paintClewHighlights(
  root: HTMLElement,
  items: readonly ClewHighlightPaintItem[],
  swatchClassName: (color: ClewHighlightColor) => string,
): ClewPaintResult {
  const locatedIds: string[] = [];
  const missingIds: string[] = [];
  for (const item of items) {
    const segments = collectTextSegments(root);
    const fullText = segments.map((segment) => segment.node.data).join("");
    const match = findClewQuoteMatch(fullText, item.quote, item.prefix, item.suffix);
    if (!match || !wrapRange(segments, match.start, match.end, item, swatchClassName)) {
      missingIds.push(item.id);
      continue;
    }
    locatedIds.push(item.id);
  }
  return { locatedIds, missingIds };
}

function normalizeContext(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/** 读取当前选区（必须落在讲义容器内）：quote + 选区前后文，供服务端定位与消歧。 */
export function readClewSelection(root: HTMLElement | null): ClewHighlightSelection | null {
  if (!root) {
    return null;
  }
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
    return null;
  }
  const range = selection.getRangeAt(0);
  const quote = range.toString().trim();
  if (quote.length === 0 || !root.contains(range.commonAncestorContainer)) {
    return null;
  }
  try {
    const before = document.createRange();
    before.selectNodeContents(root);
    before.setEnd(range.startContainer, range.startOffset);
    const after = document.createRange();
    after.selectNodeContents(root);
    after.setStart(range.endContainer, range.endOffset);
    return {
      quote,
      prefix: normalizeContext(before.toString().slice(-CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS)),
      suffix: normalizeContext(after.toString().slice(0, CLEW_HIGHLIGHT_CONTEXT_MAX_CHARS)),
    };
  } catch {
    return null;
  }
}

/** 定位某条划线对应的 <mark>（用于「定位」跳转与编辑气泡定位）。 */
export function findClewHighlightMark(root: HTMLElement, highlightId: string): HTMLElement | null {
  const marks = root.querySelectorAll<HTMLElement>(`mark[${MARK_ATTRIBUTE}]`);
  for (const mark of marks) {
    if (mark.getAttribute(MARK_ATTRIBUTE) === highlightId) {
      return mark;
    }
  }
  return null;
}