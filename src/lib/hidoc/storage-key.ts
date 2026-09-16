/**
 * Hi doc 存储键（纯函数：可测试、不依赖任何存储实现）。
 * storageKey 是与存储位置无关的不透明键，本地磁盘卷与 OSS 适配后语义一致。
 */

const KEY_PREFIX = "hidoc";
const SAFE_FILE_NAME_FALLBACK = "textbook.pdf";
const MAX_FILE_NAME_LENGTH = 120;

/** 存储键段（userId / textbookId）：只保留字母、数字、下划线与连字符。 */
export function sanitizeHiDocSegment(segment: string): string {
  return String(segment).replace(/[^A-Za-z0-9_-]/g, "");
}

/** 文件名净化：去掉任何路径成分，只保留文件名本体，避免目录穿越。 */
export function sanitizeHiDocFileName(fileName: string): string {
  const base = fileName.split(/[\\/]/).pop() ?? "";
  const cleaned = base
    .replace(/[^\p{L}\p{N}._-]+/gu, "_")
    .replace(/^[.\s]+/, "")
    .slice(0, MAX_FILE_NAME_LENGTH);
  return cleaned.length > 0 ? cleaned : SAFE_FILE_NAME_FALLBACK;
}

/** 生成教材存储键：hidoc/{userId}/{textbookId}/{fileName}（目录按 userId 隔离）。 */
export function buildHiDocStorageKey(
  userId: string,
  textbookId: string,
  fileName: string,
): string {
  return [
    KEY_PREFIX,
    sanitizeHiDocSegment(userId),
    sanitizeHiDocSegment(textbookId),
    sanitizeHiDocFileName(fileName),
  ].join("/");
}

/** 存储键安全校验：禁止空段、绝对路径、反斜杠、`..` 与 NUL。存储驱动落盘前必须通过。 */
export function isSafeHiDocStorageKey(key: string): boolean {
  if (!key || key.startsWith("/") || key.includes("\\") || key.includes("\0")) {
    return false;
  }
  return key.split("/").every((segment) => segment.length > 0 && segment !== "." && segment !== "..");
}