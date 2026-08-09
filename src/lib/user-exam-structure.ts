import type {
  ExamBlueprint,
  UserExamStructure,
  UserExamStructureRow,
} from "@/types/learning";

export const maxUserExamStructureRows = 12;

function roundPoints(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isUserExamStructureRow(value: unknown): value is UserExamStructureRow {
  if (!isRecord(value)) {
    return false;
  }

  return typeof value.id === "string"
    && typeof value.label === "string"
    && typeof value.count === "number"
    && typeof value.pointsEach === "number";
}

export function createExamRowsFromBlueprint(
  blueprint: ExamBlueprint,
): UserExamStructureRow[] {
  return [...blueprint.rows]
    .sort((left, right) => left.order - right.order)
    .map((row) => ({
      id: row.id,
      label: row.label,
      count: row.count,
      pointsEach: row.pointsEach,
    }));
}

export function calculateUserExamStructureTotal(
  rows: readonly UserExamStructureRow[],
): number {
  return roundPoints(rows.reduce(
    (total, row) => total + row.count * row.pointsEach,
    0,
  ));
}

export function validateUserExamStructureRows(
  rows: readonly UserExamStructureRow[],
): string[] {
  const issues: string[] = [];

  if (rows.length === 0) {
    issues.push("至少保留一个题型。");
  }
  if (rows.length > maxUserExamStructureRows) {
    issues.push(`最多设置 ${maxUserExamStructureRows} 个题型。`);
  }

  const ids = new Set<string>();
  rows.forEach((row, index) => {
    const rowLabel = `第 ${index + 1} 行`;
    if (row.id.trim().length === 0 || ids.has(row.id)) {
      issues.push(`${rowLabel}的内部标识无效。`);
    }
    ids.add(row.id);

    if (row.label.trim().length === 0) {
      issues.push(`${rowLabel}需要填写题型名称。`);
    }
    if (!Number.isInteger(row.count) || row.count < 1) {
      issues.push(`${rowLabel}的题数必须是正整数。`);
    }
    if (!Number.isFinite(row.pointsEach) || row.pointsEach <= 0) {
      issues.push(`${rowLabel}的每题分值必须大于 0。`);
    }
  });

  return issues;
}

export function getUserExamStructureStorageKey(courseId: string): string {
  return `nur-learn:user-exam-structure:v1:${courseId}`;
}

export function createUserExamStructure(
  courseId: string,
  label: string,
  rows: readonly UserExamStructureRow[],
): UserExamStructure {
  return {
    version: 1,
    courseId,
    label: label.trim() || "我的考试结构",
    rows: rows.map((row) => ({ ...row, label: row.label.trim() })),
    updatedAt: new Date().toISOString(),
  };
}

export function parseUserExamStructure(
  value: unknown,
  courseId: string,
): UserExamStructure | null {
  if (!isRecord(value)
    || value.version !== 1
    || value.courseId !== courseId
    || typeof value.label !== "string"
    || value.label.trim().length === 0
    || typeof value.updatedAt !== "string"
    || Number.isNaN(Date.parse(value.updatedAt))
    || !Array.isArray(value.rows)
    || !value.rows.every(isUserExamStructureRow)
  ) {
    return null;
  }

  const rows = value.rows.map((row) => ({ ...row }));
  if (validateUserExamStructureRows(rows).length > 0) {
    return null;
  }

  return {
    version: 1,
    courseId,
    label: value.label.trim(),
    rows,
    updatedAt: value.updatedAt,
  };
}
