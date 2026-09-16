import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

/**
 * Hi doc 服务端 PDF 运行时（server-only）：统一 pdfjs 加载与 worker 解析。
 * pdfjs 在 Node 下用「fake worker」：库本体可以被 webpack 打包，但 worker 是独立文件，
 * 必须把 GlobalWorkerOptions.workerSrc 指到 node_modules 里的真实 pdf.worker.mjs
 * （打包后的默认相对路径会失效）。该文件通过 next.config.ts 的 outputFileTracingIncludes
 * 进入 standalone 产物。
 *
 * 安全约束：只读结构/文字层，不渲染、不启用 PDF 脚本（enableXfa: false）。
 */

const PDF_WORKER_RELATIVE_PATH = path.join(
  "node_modules",
  "pdfjs-dist",
  "legacy",
  "build",
  "pdf.worker.mjs",
);

type PdfjsModule = typeof import("pdfjs-dist/legacy/build/pdf.mjs");
type PdfLoadingTask = ReturnType<PdfjsModule["getDocument"]>;
/** 已打开的 PDF 文档（pdfjs PDFDocumentProxy）。 */
export type HiDocPdfDocument = Awaited<PdfLoadingTask["promise"]>;

export type HiDocPdfRuntime =
  | { ok: true; document: HiDocPdfDocument; release: () => Promise<void> }
  | { ok: false; code: "pdf-unreadable" | "probe-unavailable"; message: string };

function resolvePdfWorkerSrc(): string | null {
  const workerPath = path.join(process.cwd(), PDF_WORKER_RELATIVE_PATH);
  return existsSync(workerPath) ? pathToFileURL(workerPath).href : null;
}

export async function openHiDocPdf(data: Uint8Array): Promise<HiDocPdfRuntime> {
  const workerSrc = resolvePdfWorkerSrc();
  if (!workerSrc) {
    return {
      ok: false,
      code: "probe-unavailable",
      message: "服务端 PDF 组件未就绪（缺少 pdf.worker.mjs），本次操作已中止。",
    };
  }

  try {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    const loadingTask = pdfjs.getDocument({
      data,
      enableXfa: false,
      useSystemFonts: true,
      disableFontFace: true,
    });
    const document = await loadingTask.promise;
    return { ok: true, document, release: () => loadingTask.destroy() };
  } catch (error) {
    return {
      ok: false,
      code: "pdf-unreadable",
      message: `PDF 无法打开：${error instanceof Error ? error.message : "未知错误"}`,
    };
  }
}

/** 书签条目（PDF 自带 outline）；pageNumber 为 null 表示目标页无法解析。 */
export type HiDocPdfOutlineEntry = {
  title: string;
  level: number;
  pageNumber: number | null;
};

/** 单页文字层（按行切分，供目录页解析使用）。 */
export type HiDocPdfPageText = {
  pageNumber: number;
  lines: string[];
};

function isRefProxy(value: unknown): value is { num: number; gen: number } {
  return (
    typeof value === "object"
    && value !== null
    && typeof (value as { num?: unknown }).num === "number"
    && typeof (value as { gen?: unknown }).gen === "number"
  );
}

async function resolveDestinationPageNumber(
  document: HiDocPdfDocument,
  dest: unknown,
): Promise<number | null> {
  try {
    let explicitDest: unknown = dest;
    if (typeof dest === "string") {
      explicitDest = await document.getDestination(dest);
    }
    if (!Array.isArray(explicitDest) || explicitDest.length === 0) {
      return null;
    }
    const ref = explicitDest[0];
    if (!isRefProxy(ref)) {
      return null;
    }
    const pageIndex = await document.getPageIndex(ref);
    return typeof pageIndex === "number" && pageIndex >= 0 ? pageIndex + 1 : null;
  } catch {
    return null;
  }
}

export async function readHiDocPdfOutline(
  document: HiDocPdfDocument,
): Promise<HiDocPdfOutlineEntry[]> {
  // pdfjs 类型标注为数组，但运行时可能返回 null（无书签）。
  let outline: Awaited<ReturnType<HiDocPdfDocument["getOutline"]>> | null = null;
  try {
    outline = await document.getOutline();
  } catch {
    return [];
  }
  if (!outline || outline.length === 0) {
    return [];
  }

  const entries: HiDocPdfOutlineEntry[] = [];
  const maxEntries = 500;

  const walk = async (
    items: NonNullable<typeof outline>,
    level: number,
  ): Promise<void> => {
    for (const item of items) {
      if (entries.length >= maxEntries) {
        return;
      }
      const title = typeof item.title === "string" ? item.title.trim() : "";
      if (title) {
        entries.push({
          title,
          level,
          pageNumber: await resolveDestinationPageNumber(document, item.dest),
        });
      }
      if (item.items && item.items.length > 0) {
        await walk(item.items, level + 1);
      }
    }
  };

  await walk(outline, 1);
  return entries;
}

/** 读取前 N 页文字层（按行），用于目录页启发式与模型输入。 */
export async function readHiDocPdfPageTexts(
  document: HiDocPdfDocument,
  options: { maxPages: number; itemsToLines: (items: readonly { str?: string; hasEOL?: boolean }[]) => string[] },
): Promise<HiDocPdfPageText[]> {
  const pageLimit = Math.max(1, Math.min(document.numPages, options.maxPages));
  const pages: HiDocPdfPageText[] = [];
  for (let pageNumber = 1; pageNumber <= pageLimit; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const textContent = await page.getTextContent({ includeMarkedContent: false });
    pages.push({
      pageNumber,
      lines: options.itemsToLines(
        textContent.items as readonly { str?: string; hasEOL?: boolean }[],
      ),
    });
  }
  return pages;
}