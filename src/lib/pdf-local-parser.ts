import type {
  DocxSemanticBlock,
  MaterialDocxParseResult,
  MaterialParsingIssue,
} from "@/types/material-parsing";

const maximumBlockCount = 240;
const maximumCharacterCount = 160_000;
const maximumPageCount = 40;
const pdfjsLibraryVersion = "5.x";

export function pdfPageItemsToParagraphs(
  items: readonly { str?: string; hasEOL?: boolean }[],
): string[] {
  const lines: string[] = [];
  let line = "";
  for (const item of items) {
    if (typeof item.str !== "string") {
      continue;
    }
    line += item.str;
    if (item.hasEOL) {
      lines.push(line.replace(/\s+/g, " ").trim());
      line = "";
    }
  }
  if (line.trim()) {
    lines.push(line.replace(/\s+/g, " ").trim());
  }

  const paragraphs: string[] = [];
  let current = "";
  for (const entry of lines) {
    if (!entry) {
      if (current) {
        paragraphs.push(current);
        current = "";
      }
      continue;
    }
    current = current ? `${current} ${entry}` : entry;
  }
  if (current) {
    paragraphs.push(current);
  }
  return paragraphs.filter((paragraph) => paragraph.length > 0);
}

function emptyPdfResult(issues: readonly MaterialParsingIssue[]): MaterialDocxParseResult {
  return {
    parser: {
      id: "browser-pdf-text-v1",
      library: "pdfjs",
      libraryVersion: pdfjsLibraryVersion,
    },
    blockCount: 0,
    characterCount: 0,
    ignoredImageCount: 0,
    pageCount: 0,
    blocks: [],
    issues,
  };
}

export async function parsePdfLocally(file: File): Promise<MaterialDocxParseResult> {
  if (!file.name.toLowerCase().endsWith(".pdf")) {
    return emptyPdfResult([{
      id: "unsupported-file",
      severity: "blocking",
      code: "unsupported-file",
      message: "当前 PDF 解析只接受 .pdf。",
    }]);
  }

  const pdfjs = await import("pdfjs-dist");
  // CVE-2026-16633: never enable PDF scripting in the browser host page.
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  let documentProxy;
  try {
    documentProxy = await pdfjs.getDocument({
      data: new Uint8Array(await file.arrayBuffer()),
      // Text extraction only — do not attach PDFScriptingManager / annotation JS.
      enableXfa: false,
      useSystemFonts: true,
    }).promise;
  } catch (error) {
    return emptyPdfResult([{
      id: "parser-message-1",
      severity: "blocking",
      code: "parser-message",
      message: `PDF 无法打开：${error instanceof Error ? error.message : "unknown error"}`,
    }]);
  }

  const pageLimit = Math.min(documentProxy.numPages, maximumPageCount);
  const blocks: DocxSemanticBlock[] = [];
  let characterCount = 0;
  let truncated = false;
  const issues: MaterialParsingIssue[] = [];

  for (let pageNumber = 1; pageNumber <= pageLimit; pageNumber += 1) {
    const page = await documentProxy.getPage(pageNumber);
    const textContent = await page.getTextContent({ includeMarkedContent: false });
    const paragraphs = pdfPageItemsToParagraphs(
      textContent.items as readonly { str?: string; hasEOL?: boolean }[],
    );
    for (const paragraph of paragraphs) {
      if (blocks.length >= maximumBlockCount || characterCount + paragraph.length > maximumCharacterCount) {
        truncated = true;
        break;
      }
      if (paragraphs[0] === paragraph) {
        const headingOrder = blocks.length + 1;
        const headingText = `第${pageNumber}页`;
        blocks.push({
          id: `pdf-block-${String(headingOrder).padStart(3, "0")}`,
          order: headingOrder,
          kind: "heading",
          headingLevel: 2,
          text: headingText,
          editedText: headingText,
          locator: {
            kind: "pdf-text-block",
            label: `PDF 第${pageNumber}页 · 标题`,
            blockIndex: headingOrder,
            pageNumber,
          },
          decision: "pending-review",
        });
        characterCount += headingText.length;
      }
      if (blocks.length >= maximumBlockCount || characterCount + paragraph.length > maximumCharacterCount) {
        truncated = true;
        break;
      }
      const order = blocks.length + 1;
      blocks.push({
        id: `pdf-block-${String(order).padStart(3, "0")}`,
        order,
        kind: "paragraph",
        headingLevel: null,
        text: paragraph,
        editedText: paragraph,
        locator: {
          kind: "pdf-text-block",
          label: `PDF 第${pageNumber}页 · 块 ${String(order).padStart(3, "0")}`,
          blockIndex: order,
          pageNumber,
        },
        decision: "pending-review",
      });
      characterCount += paragraph.length;
    }
    if (truncated) {
      break;
    }
  }

  if (documentProxy.numPages > maximumPageCount) {
    issues.push({
      id: "page-limit",
      severity: "review",
      code: "block-limit",
      message: `PDF 共 ${documentProxy.numPages} 页，本试点只读取前 ${maximumPageCount} 页文字层。`,
    });
  }
  if (truncated) {
    issues.push({
      id: "block-limit",
      severity: "review",
      code: "block-limit",
      message: `预览已在 ${maximumBlockCount} 个语义块或 ${maximumCharacterCount.toLocaleString("zh-CN")} 字符边界停止。`,
    });
  }
  if (blocks.length === 0) {
    issues.push({
      id: "scan-or-empty-text-layer",
      severity: "blocking",
      code: "scan-or-empty-text-layer",
      message: "未提取到文字层。扫描件/纯图片 PDF 需要 OCR，本阶段不做，请改用文字版 PDF 或 Word。",
    });
  } else {
    issues.push({
      id: "revision-state-pending",
      severity: "review",
      code: "revision-state-pending",
      message: "PDF 文字层顺序可能与版面不完全一致；摘录只作 learner-private 待审候选。未做 OCR。",
    });
  }

  return {
    parser: {
      id: "browser-pdf-text-v1",
      library: "pdfjs",
      libraryVersion: pdfjs.version || pdfjsLibraryVersion,
    },
    blockCount: blocks.length,
    characterCount,
    ignoredImageCount: 0,
    pageCount: documentProxy.numPages,
    blocks,
    issues,
  };
}
