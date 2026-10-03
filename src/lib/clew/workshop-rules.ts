import type { MembershipTier } from "@/types/auth";

/**
 * Clew M6 课题工作坊规则（纯函数，无服务器依赖，可被测试直接引用）。
 * 工作坊材料不占教材当月名额；但工作坊数量与每个工作坊的材料数按档位限制。
 * 单文件 ≤100 页：PDF 按真实页数，Markdown/纯文本按行数折算（40 行 ≈ 1 页）。
 * 图片与无文字层 PDF 明确拒绝（OCR 后置，见 docs/HI_DOC_PLAN.md §10），不假装修复、不以占位内容冒充。
 */

/** 工作坊数量与每个工作坊材料数上限（按档位）。 */
export const CLEW_WORKSHOP_LIMITS: Record<
  MembershipTier,
  { workshops: number; filesPerWorkshop: number }
> = {
  free: { workshops: 1, filesPerWorkshop: 3 },
  basic: { workshops: 3, filesPerWorkshop: 10 },
  pro: { workshops: 10, filesPerWorkshop: 20 },
  max: { workshops: 30, filesPerWorkshop: 30 },
};

/** 单个材料页数上限（PDF 真实页数；文本按行数折算）。 */
export const CLEW_WORKSHOP_MAX_PAGE_COUNT = 100;

/** 文本材料行数折算页数的行/页比（40 行 ≈ 1 页）。 */
export const CLEW_WORKSHOP_TEXT_LINES_PER_PAGE = 40;

/** 文本材料行数上限（= 100 页 × 40 行/页）。 */
export const CLEW_WORKSHOP_MAX_TEXT_LINES =
  CLEW_WORKSHOP_MAX_PAGE_COUNT * CLEW_WORKSHOP_TEXT_LINES_PER_PAGE;

/** 工作坊标题/说明长度上限。 */
export const CLEW_WORKSHOP_TITLE_MAX_CHARS = 60;
export const CLEW_WORKSHOP_NOTE_MAX_CHARS = 500;

export type ClewWorkshopFileKind = "pdf" | "text";

const TEXT_FILE_EXTENSIONS = [".md", ".markdown", ".txt"] as const;
const IMAGE_FILE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".tif", ".tiff"] as const;

export function getClewWorkshopLimits(tier: MembershipTier): {
  workshops: number;
  filesPerWorkshop: number;
} {
  return CLEW_WORKSHOP_LIMITS[tier];
}

/** 文本行数 → 折算页数（向上取整，至少 1 页）。 */
export function clewWorkshopTextPagesFromLines(lineCount: number): number {
  if (lineCount <= 0) {
    return 1;
  }
  return Math.ceil(lineCount / CLEW_WORKSHOP_TEXT_LINES_PER_PAGE);
}

/** 工作坊材料文件名校验：识别 PDF / 文本；图片给出明确的 OCR 后置原因；其它格式如实拒绝。 */
export function validateClewWorkshopFileName(
  fileName: string,
): { ok: true; kind: ClewWorkshopFileKind } | { ok: false; reason: string } {
  const lower = fileName.trim().toLowerCase();
  if (lower.length === 0) {
    return { ok: false, reason: "文件名不能为空。" };
  }
  if (lower.endsWith(".pdf")) {
    return { ok: true, kind: "pdf" };
  }
  if (TEXT_FILE_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    return { ok: true, kind: "text" };
  }
  if (IMAGE_FILE_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    return {
      ok: false,
      reason: "暂不支持图片材料：图片与扫描件需要 OCR 识别，该能力后续开放。请上传带文字层的 PDF 或 Markdown/纯文本材料。",
    };
  }
  return {
    ok: false,
    reason: "目前只支持带文字层的 PDF（.pdf）与 Markdown/纯文本（.md/.markdown/.txt）；其它格式暂不支持。",
  };
}

/** 严格按 UTF-8 解码文本材料（含 BOM 处理）；无法解码时如实报错，不猜测编码。 */
export function decodeClewWorkshopText(
  bytes: Uint8Array,
): { ok: true; text: string; lineCount: number } | { ok: false; reason: string } {
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return { ok: false, reason: "文本文件无法按 UTF-8 解码：请另存为 UTF-8 编码后重新上传。" };
  }
  const normalized = text.replace(/^﻿/, "").replace(/\r\n?/g, "\n");
  if (normalized.trim().length === 0) {
    return { ok: false, reason: "文本材料是空文件。" };
  }
  const lineCount = normalized.split("\n").length;
  if (lineCount > CLEW_WORKSHOP_MAX_TEXT_LINES) {
    return {
      ok: false,
      reason: `文本材料共 ${lineCount} 行，折算约 ${clewWorkshopTextPagesFromLines(lineCount)} 页，超过单份 ${CLEW_WORKSHOP_MAX_PAGE_COUNT} 页上限；请拆分后上传。`,
    };
  }
  return { ok: true, text: normalized, lineCount };
}

export function validateClewWorkshopTitle(
  title: unknown,
): { ok: true; value: string } | { ok: false; reason: string } {
  if (typeof title !== "string" || title.trim().length === 0) {
    return { ok: false, reason: "请输入课题名称。" };
  }
  const value = title.trim();
  if (value.length > CLEW_WORKSHOP_TITLE_MAX_CHARS) {
    return {
      ok: false,
      reason: `课题名称过长（${value.length} 字），请控制在 ${CLEW_WORKSHOP_TITLE_MAX_CHARS} 字以内。`,
    };
  }
  return { ok: true, value };
}

export function validateClewWorkshopNote(
  note: unknown,
): { ok: true; value: string | null } | { ok: false; reason: string } {
  if (note === undefined || note === null) {
    return { ok: true, value: null };
  }
  if (typeof note !== "string") {
    return { ok: false, reason: "课题说明格式不正确。" };
  }
  const value = note.trim();
  if (value.length === 0) {
    return { ok: true, value: null };
  }
  if (value.length > CLEW_WORKSHOP_NOTE_MAX_CHARS) {
    return {
      ok: false,
      reason: `课题说明过长（${value.length} 字），请控制在 ${CLEW_WORKSHOP_NOTE_MAX_CHARS} 字以内。`,
    };
  }
  return { ok: true, value };
}

/** 工作坊数量超额的中文原因（503 明确报错，不静默放行）。 */
export function buildClewWorkshopLimitMessage(used: number, limit: number): string {
  return `课题工作坊数量已达当前档位上限（${used}/${limit}）。删除不再需要的课题可腾出位置，或升级会员档位。`;
}

/** 单个工作坊材料数超额的中文原因。 */
export function buildClewWorkshopFileLimitMessage(used: number, limit: number): string {
  return `本课题的材料数量已达当前档位上限（${used}/${limit}）。删除不再需要的材料后可继续上传，或升级会员档位。`;
}
