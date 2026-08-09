import { describe, it } from "node:test";
import assert from "node:assert";
import type { UserExamStructureRow } from "@/types/learning";
import {
  calculateUserExamStructureTotal,
  validateUserExamStructureRows,
  parseUserExamStructure,
  createUserExamStructure,
  maxUserExamStructureRows,
} from "@/lib/user-exam-structure";

function makeRow(overrides: Partial<UserExamStructureRow> = {}): UserExamStructureRow {
  return {
    id: "row-1",
    label: "单选题",
    count: 30,
    pointsEach: 1,
    ...overrides,
  };
}

describe("calculateUserExamStructureTotal", () => {
  it("returns 0 for empty rows", () => {
    assert.strictEqual(calculateUserExamStructureTotal([]), 0);
  });

  it("calculates correct total for multiple rows", () => {
    const rows: UserExamStructureRow[] = [
      { id: "r1", label: "单选", count: 30, pointsEach: 1 },
      { id: "r2", label: "多选", count: 10, pointsEach: 2 },
      { id: "r3", label: "简答", count: 5, pointsEach: 5 },
    ];
    // 30*1 + 10*2 + 5*5 = 30 + 20 + 25 = 75
    assert.strictEqual(calculateUserExamStructureTotal(rows), 75);
  });

  it("handles fractional points correctly", () => {
    const rows: UserExamStructureRow[] = [
      { id: "r1", label: "A", count: 3, pointsEach: 1.5 },
    ];
    assert.strictEqual(calculateUserExamStructureTotal(rows), 4.5);
  });
});

describe("validateUserExamStructureRows", () => {
  it("accepts valid rows", () => {
    const issues = validateUserExamStructureRows([makeRow()]);
    assert.strictEqual(issues.length, 0);
  });

  it("rejects empty rows array", () => {
    const issues = validateUserExamStructureRows([]);
    assert.ok(issues.some((i) => i.includes("至少保留一个题型")));
  });

  it("rejects too many rows", () => {
    const rows = Array.from({ length: maxUserExamStructureRows + 1 }, (_, i) =>
      makeRow({ id: `row-${i}`, label: `T${i}` }),
    );
    const issues = validateUserExamStructureRows(rows);
    assert.ok(issues.some((i) => i.includes("最多设置")));
  });

  it("rejects empty row id", () => {
    const issues = validateUserExamStructureRows([makeRow({ id: "" })]);
    assert.ok(issues.some((i) => i.includes("标识无效")));
  });

  it("rejects duplicate row ids", () => {
    const issues = validateUserExamStructureRows([
      makeRow({ id: "same" }),
      makeRow({ id: "same", label: "Other" }),
    ]);
    assert.ok(issues.some((i) => i.includes("标识无效")));
  });

  it("rejects empty label", () => {
    const issues = validateUserExamStructureRows([makeRow({ label: "" })]);
    assert.ok(issues.some((i) => i.includes("题型名称")));
  });

  it("rejects non-positive count", () => {
    const issues = validateUserExamStructureRows([makeRow({ count: 0 })]);
    assert.ok(issues.some((i) => i.includes("题数必须是正整数")));
  });

  it("rejects non-integer count", () => {
    const issues = validateUserExamStructureRows([makeRow({ count: 1.5 })]);
    assert.ok(issues.some((i) => i.includes("题数必须是正整数")));
  });

  it("rejects zero pointsEach", () => {
    const issues = validateUserExamStructureRows([makeRow({ pointsEach: 0 })]);
    assert.ok(issues.some((i) => i.includes("每题分值必须大于 0")));
  });

  it("rejects negative pointsEach", () => {
    const issues = validateUserExamStructureRows([makeRow({ pointsEach: -1 })]);
    assert.ok(issues.some((i) => i.includes("每题分值必须大于 0")));
  });

  it("rejects NaN pointsEach", () => {
    const issues = validateUserExamStructureRows([makeRow({ pointsEach: Number.NaN })]);
    assert.ok(issues.some((i) => i.includes("每题分值必须大于 0")));
  });
});

describe("createUserExamStructure", () => {
  it("creates structure with trimmed label", () => {
    const structure = createUserExamStructure("course-1", "  我的结构  ", [makeRow()]);
    assert.strictEqual(structure.courseId, "course-1");
    assert.strictEqual(structure.label, "我的结构");
    assert.strictEqual(structure.version, 1);
    assert.ok(structure.updatedAt);
  });

  it("uses default label when empty", () => {
    const structure = createUserExamStructure("course-1", "", [makeRow()]);
    assert.strictEqual(structure.label, "我的考试结构");
  });
});

describe("parseUserExamStructure", () => {
  it("returns null for non-object", () => {
    assert.strictEqual(parseUserExamStructure("string", "c1"), null);
    assert.strictEqual(parseUserExamStructure(42, "c1"), null);
    assert.strictEqual(parseUserExamStructure(null, "c1"), null);
  });

  it("returns null for wrong version", () => {
    assert.strictEqual(parseUserExamStructure({ version: 2, courseId: "c1", label: "L", updatedAt: new Date().toISOString(), rows: [] }, "c1"), null);
  });

  it("returns null for wrong courseId", () => {
    assert.strictEqual(parseUserExamStructure({ version: 1, courseId: "wrong", label: "L", updatedAt: new Date().toISOString(), rows: [makeRow()] }, "c1"), null);
  });

  it("returns null for empty label", () => {
    assert.strictEqual(parseUserExamStructure({ version: 1, courseId: "c1", label: "  ", updatedAt: new Date().toISOString(), rows: [makeRow()] }, "c1"), null);
  });

  it("returns null for invalid date", () => {
    assert.strictEqual(parseUserExamStructure({ version: 1, courseId: "c1", label: "L", updatedAt: "not-a-date", rows: [makeRow()] }, "c1"), null);
  });

  it("returns null when row validation fails", () => {
    assert.strictEqual(parseUserExamStructure({
      version: 1,
      courseId: "c1",
      label: "L",
      updatedAt: new Date().toISOString(),
      rows: [{ id: "", label: "", count: 0, pointsEach: 0 }],
    }, "c1"), null);
  });

  it("parses valid structure", () => {
    const input = {
      version: 1,
      courseId: "c1",
      label: "Test",
      updatedAt: "2026-08-01T00:00:00.000Z",
      rows: [{ id: "r1", label: "单选", count: 30, pointsEach: 1 }],
    };
    const result = parseUserExamStructure(input, "c1");
    assert.ok(result !== null);
    assert.strictEqual(result.label, "Test");
    assert.strictEqual(result.rows.length, 1);
  });
});
