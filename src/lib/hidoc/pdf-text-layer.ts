import "server-only";

import { openHiDocPdf } from "./pdf-document";

/**
 * 服务端 PDF 文字层探测（复用 material-intake 的 pdfjs 文字层提取思路，只做检测不做块切分）。
 * 安全约束：只读文字层，不渲染、不启用 PDF 脚本（enableXfa: false）。
 * 无文字层 = 扫描件，M1 明确拒绝并提示，不做 OCR。
 */

/** 采样页上限：首页 + 中部 + 尾页，足以区分文字版与扫描版。 */
const SAMPLE_PAGE_LIMIT = 6;
/** 单页去空白后达到该字符数，即认为存在文字层。 */
const MIN_TEXT_LENGTH_PER_PAGE = 20;

export type HiDocPdfProbe =
  | { ok: true; pageCount: number; hasTextLayer: boolean }
  | { ok: false; code: "pdf-unreadable" | "probe-unavailable"; message: string };

function buildSamplePageNumbers(pageCount: number): number[] {
  const candidates = [1, 2, 3, Math.ceil(pageCount / 2), pageCount];
  const pages = new Set<number>();
  for (const candidate of candidates) {
    if (candidate >= 1 && candidate <= pageCount) {
      pages.add(candidate);
    }
  }
  return [...pages].sort((a, b) => a - b).slice(0, SAMPLE_PAGE_LIMIT);
}

export async function probeHiDocPdf(data: Uint8Array): Promise<HiDocPdfProbe> {
  const runtime = await openHiDocPdf(data);
  if (!runtime.ok) {
    return { ok: false, code: runtime.code, message: runtime.message };
  }

  try {
    const document = runtime.document;
    const pageCount = document.numPages;
    let hasTextLayer = false;
    for (const pageNumber of buildSamplePageNumbers(pageCount)) {
      const page = await document.getPage(pageNumber);
      const textContent = await page.getTextContent({ includeMarkedContent: false });
      const textLength = textContent.items
        .map((item) => ("str" in item && typeof item.str === "string" ? item.str : ""))
        .join("")
        .replace(/\s+/g, "").length;
      if (textLength >= MIN_TEXT_LENGTH_PER_PAGE) {
        hasTextLayer = true;
        break;
      }
    }
    return { ok: true, pageCount, hasTextLayer };
  } catch (error) {
    return {
      ok: false,
      code: "pdf-unreadable",
      message: `PDF 无法打开：${error instanceof Error ? error.message : "未知错误"}`,
    };
  } finally {
    // pdfjs v6：释放文档与 transport 走 loadingTask.destroy()
    await runtime.release();
  }
}