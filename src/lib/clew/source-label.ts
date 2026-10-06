/**
 * Clew file labels safe for client components.
 * DOCX has no printed pages. The database still stores an integer pageCount;
 * screens must use these helpers and say 待确认 instead of that integer.
 */

export function isClewDocx(fileName: string): boolean {
  return fileName.toLowerCase().endsWith(".docx");
}

/** Schema placeholder. Never render this number as a printed page for DOCX. */
export const CLEW_DOCX_PAGE_COUNT_PLACEHOLDER = 1;

export function formatClewExtent(fileName: string, pageCount: number): string {
  if (isClewDocx(fileName)) {
    return "页码待确认";
  }
  return `${pageCount} 页`;
}

export function formatClewPageRange(fileName: string, pageStart: number, pageEnd: number): string {
  if (isClewDocx(fileName)) {
    return "页码待确认";
  }
  return `第 ${pageStart}–${pageEnd} 页`;
}

export function formatClewSourcePage(fileName: string, sourcePage: number): string {
  if (isClewDocx(fileName)) {
    return "页码待确认";
  }
  return `第 ${sourcePage} 页`;
}

/**
 * KP 级页码标签（ZCODE-M6 补遗）：DOCX 学生人工标注页显示「第 N 页 · 你标注的」——
 * 溯源性质是「学生声明的出处」而非教材文字层事实，UI 必须保留「你标注的」限定词。
 */
export function formatClewKpPageLabel(
  fileName: string,
  sourcePage: number,
  sourcePageAnnotated: boolean,
): string {
  if (!isClewDocx(fileName)) {
    return `第 ${sourcePage} 页`;
  }
  return sourcePageAnnotated ? `第 ${sourcePage} 页 · 你标注的` : "页码待确认";
}
