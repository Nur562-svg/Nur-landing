import "server-only";

import { buildChapterModelText } from "./extraction-heuristic";
import { openHiDocPdf, readHiDocPdfPageRange } from "./pdf-document";
import { isHiDocDocx } from "./source-label";
import { readHiDocSource, sliceDocxChapter } from "./source-intake";
import { getHiDocStorage } from "./storage";
import { pdfTextItemsToLines } from "./toc-heuristic";

/**
 * Hi doc 知识点原文片段（server-only）：按 sourcePage 定位 PDF 文字层，聚合邻近页并带页标记。
 * 讲义生成与讲解对话共用同一片段来源；读不到就如实返回失败，不伪造原文。
 */

/** 单次片段的字符上限（页标记后）。 */
export const HIDOC_LESSON_EXCERPT_MAX_CHARS = 8000;

/** 以知识点页码为中心的取页跨度（前后各 1 页）。 */
export const HIDOC_LESSON_EXCERPT_PAGE_SPAN = 1;

/** 片段有效性的最小篇幅（去空白字符）。 */
export const HIDOC_EXCERPT_MIN_CHARS = 40;

export type HiDocSourceExcerptResult =
  | { ok: true; excerpt: string; pages: number[]; locatorLabel: string }
  | { ok: false; message: string };

export async function readHiDocKnowledgePointExcerpt(input: {
  storageKey: string;
  fileName?: string;
  chapterTitle?: string;
  sourcePage: number;
  chapterPageStart: number;
  chapterPageEnd: number;
}): Promise<HiDocSourceExcerptResult> {
  let bytes: Uint8Array;
  try {
    bytes = await getHiDocStorage().readObject(input.storageKey);
  } catch (error) {
    console.error("[hidoc] 读取教材文件失败", error);
    return { ok: false, message: "教材文件读取失败，请稍后重试。" };
  }

  if (isHiDocDocx(input.fileName ?? "")) {
    const read = await readHiDocSource(input.fileName ?? "textbook.docx", bytes.slice());
    if (!read.ok) {
      return { ok: false, message: read.message };
    }
    const body = sliceDocxChapter(read.html, input.chapterTitle ?? "").trim();
    const excerpt = `【页码待确认】\n${body}`.slice(0, HIDOC_LESSON_EXCERPT_MAX_CHARS);
    if (excerpt.replace(/\s+/g, "").length < HIDOC_EXCERPT_MIN_CHARS) {
      return { ok: false, message: "DOCX 文字过少，无法作为讲义依据。页码待确认。" };
    }
    return { ok: true, excerpt, pages: [], locatorLabel: "页码待确认" };
  }

  const runtime = await openHiDocPdf(bytes);
  if (!runtime.ok) {
    return { ok: false, message: runtime.message };
  }

  try {
    const fromPage = Math.max(input.chapterPageStart, input.sourcePage - HIDOC_LESSON_EXCERPT_PAGE_SPAN);
    const toPage = Math.min(input.chapterPageEnd, input.sourcePage + HIDOC_LESSON_EXCERPT_PAGE_SPAN);
    const pages = await readHiDocPdfPageRange(runtime.document, {
      fromPage,
      toPage,
      itemsToLines: pdfTextItemsToLines,
    });
    const { text } = buildChapterModelText(pages, HIDOC_LESSON_EXCERPT_MAX_CHARS);
    if (text.replace(/\s+/g, "").length < HIDOC_EXCERPT_MIN_CHARS) {
      return {
        ok: false,
        message: `第 ${fromPage}–${toPage} 页的文字层内容过少，无法作为讲义依据。`,
      };
    }
    const pagesRead = pages.map((page) => page.pageNumber);
    return {
      ok: true,
      excerpt: text,
      pages: pagesRead,
      locatorLabel: `第 ${pagesRead.join("、")} 页`,
    };
  } catch (error) {
    console.error("[hidoc] 读取 PDF 文字层失败", error);
    return { ok: false, message: "PDF 文字层读取失败，请稍后重试。" };
  } finally {
    await runtime.release();
  }
}