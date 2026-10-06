import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * ZCODE-M6 补遗：DOCX 知识点人工页码标注（「有页码用页码，没有的人工标」）。
 * 锁定：
 * - formatClewKpPageLabel：PDF 原样；DOCX 未标注「页码待确认」；DOCX 标注「第 N 页 · 你标注的」（限定词不可丢）；
 * - annotateClewKpSourcePage：DOCX 可标/可清；PDF 明确 400（页码自动溯源，人工标注只会降可信度）；
 *   非整数/越界页码 400；跨用户/已删 404。
 * 隔离 SQLite（mkdtemp + DATABASE_URL + prisma db push），不碰 prisma/dev.db。
 */

// —— 必须在 import 服务模块之前：隔离数据库 ——
const testDir = mkdtempSync(path.join(tmpdir(), "nur-clew-kp-page-"));
process.env.DATABASE_URL = `file:${path.join(testDir, "test.db")}`;
execSync("npx prisma db push", { stdio: "pipe", cwd: process.cwd(), env: { ...process.env } });

process.on("exit", () => {
  try {
    rmSync(testDir, { recursive: true, force: true });
  } catch {
    // 清理失败不影响测试结果
  }
});

describe("formatClewKpPageLabel（纯函数）", async () => {
  const { formatClewKpPageLabel } = await import("@/lib/clew/source-label");

  it("PDF：文字层页码原样（不受标注旗标影响）", () => {
    assert.equal(formatClewKpPageLabel("book.pdf", 12, false), "第 12 页");
    assert.equal(formatClewKpPageLabel("book.pdf", 12, true), "第 12 页");
  });

  it("DOCX：未标注 = 页码待确认；标注 = 第 N 页 · 你标注的（限定词锁定）", () => {
    assert.equal(formatClewKpPageLabel("book.docx", 1, false), "页码待确认");
    assert.equal(formatClewKpPageLabel("book.docx", 33, true), "第 33 页 · 你标注的");
  });
});

describe("annotateClewKpSourcePage（隔离 SQLite）", async () => {
  const { prisma } = await import("@/lib/prisma");
  const { annotateClewKpSourcePage } = await import("@/lib/clew/knowledge-points");

  it("种子：用户 + DOCX 教材 + PDF 教材 + 各一个 KP", async () => {
    await prisma.user.create({
      data: { id: "u-page", email: "kp-page@test.dev", passwordHash: "x", displayName: "Page" },
    });
    for (const [tbId, fileName] of [["tb-docx", "解剖.docx"], ["tb-pdf", "book.pdf"]] as const) {
      await prisma.clewTextbook.create({
        data: {
          id: tbId,
          userId: "u-page",
          title: tbId,
          fileName,
          storageKey: `clew/u-page/${tbId}/${fileName}`,
          sizeBytes: 1024,
          pageCount: 10,
          activeMonth: "2026-10",
        },
      });
      await prisma.clewChapter.create({
        data: { id: `ch-${tbId}`, textbookId: tbId, order: 1, title: "第一章", pageStart: 1, pageEnd: 10, source: "outline" },
      });
      await prisma.clewKnowledgePoint.create({
        data: {
          id: `kp-${tbId}`,
          chapterId: `ch-${tbId}`,
          order: 1,
          title: "测试知识点",
          description: "d",
          keyTerms: [],
          prerequisites: [],
          sourcePage: 1,
        },
      });
    }
  });

  it("DOCX 标注：sourcePage 与旗标同时落库", async () => {
    const result = await annotateClewKpSourcePage("u-page", "kp-tb-docx", 33);
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.sourcePage, 33);
    assert.equal(result.sourcePageAnnotated, true);
  });

  it("DOCX 清除标注：旗标回落 false（保留页码数值）", async () => {
    const result = await annotateClewKpSourcePage("u-page", "kp-tb-docx", null);
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.sourcePage, 33);
    assert.equal(result.sourcePageAnnotated, false);
  });

  it("PDF 拒绝标注：400（文字层页码自动溯源）", async () => {
    const result = await annotateClewKpSourcePage("u-page", "kp-tb-pdf", 5);
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.status, 400);
    assert.match(result.message, /文字层页码/);
  });

  it("非法页码（0 / 非整数）400", async () => {
    for (const page of [0, -3, 1.5]) {
      const result = await annotateClewKpSourcePage("u-page", "kp-tb-docx", page);
      assert.equal(result.ok, false);
      if (!result.ok) assert.equal(result.status, 400);
    }
  });

  it("跨用户 KP 404", async () => {
    const result = await annotateClewKpSourcePage("other-user", "kp-tb-docx", 3);
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.status, 404);
  });
});

describe("练习题无页码模式校验（纯函数补遗）", async () => {
  const { validateClewPracticeQuestions } = await import("@/lib/clew/practice-validation");

  const pagelessA1 = (index: number) => ({
    kind: "a1",
    stem: `题干 ${index}`,
    choices: ["甲", "乙", "丙", "丁"],
    answerIndex: 0,
    explanation: "依据本章原文。",
  });
  const pagelessFill = (index: number) => ({
    kind: "fill",
    stem: `填空 ${index}`,
    answerText: "答案",
    explanation: "依据本章原文。",
  });

  it("无页码模式（excerptPages=null）：模型不带 sourcePage 也通过，服务端记 0", () => {
    const result = validateClewPracticeQuestions(
      { questions: [pagelessA1(1), pagelessA1(2), pagelessA1(3), pagelessA1(4), pagelessFill(1), pagelessFill(2)] },
      null,
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.ok(result.questions.every((question) => question.sourcePage === 0));
  });

  it("无页码模式：模型违规带的 sourcePage 被忽略（不因越界拒收——字段不属于该模式契约）", () => {
    const withPage = { ...pagelessA1(1), sourcePage: 99 };
    const result = validateClewPracticeQuestions(
      { questions: [withPage, pagelessA1(2), pagelessA1(3), pagelessA1(4), pagelessFill(1), pagelessFill(2)] },
      null,
    );
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.ok(result.questions.every((question) => question.sourcePage === 0));
  });

  it("有页码模式回归：页码越界仍拒收（行为不变）", () => {
    const valid = (index: number) => ({ ...pagelessA1(index), sourcePage: 1 });
    const broken = { ...valid(1), sourcePage: 9 };
    const result = validateClewPracticeQuestions(
      { questions: [broken, valid(2), valid(3), valid(4), { ...pagelessFill(1), sourcePage: 1 }, { ...pagelessFill(2), sourcePage: 1 }] },
      [1],
    );
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.reason, /页码/);
  });
});
