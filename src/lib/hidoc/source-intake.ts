/**
 * Hi doc local intake. PDF stays on pdf.js text extraction (same library and
 * text-item joining as the existing text-layer path). DOCX uses mammoth.
 * Scans, images, and legacy .doc are refused out loud. Missing DOCX pages
 * stay 待确认 — this module does not invent a page count.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { pdfPageItemsToParagraphs } from "@/lib/pdf-local-parser";
import type { HiDocChapterDraft } from "./toc-heuristic";
import { HIDOC_DOCX_PAGE_COUNT_PLACEHOLDER } from "./source-label";

const MIN_TEXT_LENGTH = 20;
const PDF_WORKER_RELATIVE_PATH = path.join(
  "node_modules",
  "pdfjs-dist",
  "legacy",
  "build",
  "pdf.worker.mjs",
);

export type HiDocSourceSuccess = {
  ok: true;
  kind: "pdf" | "docx";
  text: string;
  /** null for DOCX: there is no printed page count to report. */
  pageCount: number | null;
  html: string;
};

export type HiDocSourceFailure = {
  ok: false;
  code: "invalid-file" | "unsupported-scan" | "pdf-unreadable";
  message: string;
};

export type HiDocSourceRead = HiDocSourceSuccess | HiDocSourceFailure;

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function compactLength(value: string): number {
  return value.replace(/\s+/g, "").length;
}

function failure(code: HiDocSourceFailure["code"], message: string): HiDocSourceFailure {
  return { ok: false, code, message };
}

async function readPdf(bytes: Uint8Array): Promise<HiDocSourceRead> {
  const workerPath = path.join(process.cwd(), PDF_WORKER_RELATIVE_PATH);
  if (!existsSync(workerPath)) {
    return failure("pdf-unreadable", "服务端 PDF 组件未就绪（缺少 pdf.worker.mjs），本次操作已中止。");
  }

  let release: (() => Promise<void>) | null = null;
  try {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    pdfjs.GlobalWorkerOptions.workerSrc = pathToFileURL(workerPath).href;
    const loadingTask = pdfjs.getDocument({
      data: bytes.slice(),
      enableXfa: false,
      useSystemFonts: true,
      disableFontFace: true,
    });
    const document = await loadingTask.promise;
    release = () => loadingTask.destroy();
    const paragraphs: string[] = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const textContent = await page.getTextContent({ includeMarkedContent: false });
      paragraphs.push(...pdfPageItemsToParagraphs(
        textContent.items as readonly { str?: string; hasEOL?: boolean }[],
      ));
    }
    const text = paragraphs.join("\n").trim();
    if (compactLength(text) < MIN_TEXT_LENGTH) {
      return failure(
        "unsupported-scan",
        "未检测到文字层：暂不支持扫描版或纯图片 PDF。请上传带文字层的电子版 PDF 或 DOCX。",
      );
    }
    return { ok: true, kind: "pdf", text, pageCount: document.numPages, html: "" };
  } catch (error) {
    return failure(
      "pdf-unreadable",
      `PDF 无法打开：${error instanceof Error ? error.message : "未知错误"}`,
    );
  } finally {
    await release?.();
  }
}

async function readDocx(bytes: Uint8Array): Promise<HiDocSourceRead> {
  try {
    const mammoth = await import("mammoth");
    const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    // Node mammoth reads `buffer`; the browser build reads `arrayBuffer`. Pass both.
    const conversion = await mammoth.convertToHtml({
      arrayBuffer,
      buffer: Buffer.from(bytes),
    } as { arrayBuffer: ArrayBuffer });
    const html = conversion.value;
    const text = stripTags(html);
    if (compactLength(text) < MIN_TEXT_LENGTH) {
      return failure(
        "unsupported-scan",
        "未提取到文字：这份 DOCX 可能是扫描件、纯图片或空文档，已拒绝。请换一份带文字的 DOCX 或 PDF。",
      );
    }
    return { ok: true, kind: "docx", text, pageCount: null, html };
  } catch (error) {
    return failure(
      "pdf-unreadable",
      `DOCX 无法打开：${error instanceof Error ? error.message : "未知错误"}`,
    );
  }
}

export async function readHiDocSource(fileName: string, bytes: Uint8Array): Promise<HiDocSourceRead> {
  const lower = fileName.trim().toLowerCase();
  if (lower.endsWith(".doc") && !lower.endsWith(".docx")) {
    return failure("invalid-file", "暂不支持旧版 Word（.doc）。请另存为 .docx 后再上传。");
  }
  if (/\.(png|jpe?g|gif|webp|bmp|tif|tiff|heic)$/.test(lower)) {
    return failure("unsupported-scan", "图片无法读取文字，已拒绝。请上传带文字层的 PDF 或 DOCX，扫描件暂不支持。");
  }
  if (lower.endsWith(".pdf")) {
    return readPdf(bytes);
  }
  if (lower.endsWith(".docx")) {
    return readDocx(bytes);
  }
  return failure("invalid-file", "只接受文字版 PDF（.pdf）或 Word（.docx）。");
}

function headingTitles(html: string): string[] {
  const titles: string[] = [];
  const pattern = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  for (const match of html.matchAll(pattern)) {
    const title = stripTags(match[2] ?? "");
    if (title) {
      titles.push(title);
    }
  }
  return titles;
}

/**
 * Chapter titles from mammoth HTML. Every chapter keeps the schema placeholder
 * page range; callers must label that range 待确认.
 */
export function chaptersFromDocxHtml(html: string, fallbackTitle: string): HiDocChapterDraft[] {
  const titles = headingTitles(html);
  const used = titles.length > 0 ? titles : [fallbackTitle.trim() || "正文"];
  return used.slice(0, 200).map((title) => ({
    title,
    pageStart: HIDOC_DOCX_PAGE_COUNT_PLACEHOLDER,
    pageEnd: HIDOC_DOCX_PAGE_COUNT_PLACEHOLDER,
  }));
}

/** Prefer the heading section that matches the chapter title; otherwise the whole document. */
export function sliceDocxChapter(html: string, chapterTitle: string): string {
  const needle = chapterTitle.replace(/\s+/g, "");
  const pattern = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const marks = [...html.matchAll(pattern)];
  if (marks.length === 0 || !needle) {
    return stripTags(html);
  }
  for (let index = 0; index < marks.length; index += 1) {
    const mark = marks[index];
    const title = stripTags(mark[2] ?? "").replace(/\s+/g, "");
    if (title !== needle) {
      continue;
    }
    const start = mark.index ?? 0;
    const end = index + 1 < marks.length ? (marks[index + 1].index ?? html.length) : html.length;
    return stripTags(html.slice(start, end));
  }
  return stripTags(html);
}
