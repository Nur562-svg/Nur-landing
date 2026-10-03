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
