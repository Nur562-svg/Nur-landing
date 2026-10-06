import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * ZCODE-M6-A：Clew 自教材练习（生成校验 + 判分 + practice-wrong FSRS 回流）。
 * 锁定：
 * - 结构校验拒收缺件/非法题组（六件套、题型分布、页码溯源）；
 * - A1 服务端确定性判分（正确/错误）、fill 自评映射；
 * - 答错 → practice-wrong 复习条目（dueAt=now）+ review-scheduled；再错 → again 前移；答对 → good 前移；
 * - exploration（fsrsEnabled=false）作答照记、不建条目；
 * - 跨用户作答 404；配额不足 503（生成前拦截，不发模型调用）；
 * - 题组视图不提前泄漏 A1 答案，fill 先见参考答案。
 * 隔离 SQLite（mkdtemp + DATABASE_URL + prisma db push），不碰 prisma/dev.db。
 */

// —— 必须在 import 服务模块之前：隔离数据库 ——
const testDir = mkdtempSync(path.join(tmpdir(), "nur-clew-practice-"));
process.env.DATABASE_URL = `file:${path.join(testDir, "test.db")}`;

execSync("npx prisma db push", { stdio: "pipe", cwd: process.cwd(), env: { ...process.env } });

process.on("exit", () => {
  try {
    rmSync(testDir, { recursive: true, force: true });
  } catch {
    // 清理失败不影响测试结果
  }
});

const EXCERPT = "【PDF 第 1 页】\n1. 家庭中子女数是离散型的定量变量。答：对。\n2. 同质个体之间的变异称为个体变异。答：对。\n";

describe("Clew 练习题结构校验（纯函数）", async () => {
  const { validateClewPracticeQuestions } = await import("@/lib/clew/practice-validation");

  const validA1 = (index: number) => ({
    kind: "a1",
    stem: `题干 ${index}`,
    choices: ["甲", "乙", "丙", "丁"],
    answerIndex: 0,
    explanation: "依据原文。",
    sourcePage: 1,
  });
  const validFill = (index: number) => ({
    kind: "fill",
    stem: `填空 ${index}`,
    answerText: "个体变异",
    explanation: "依据原文。",
    sourcePage: 1,
  });

  it("合法题组（A1×4 + 填空×2）通过", () => {
    const result = validateClewPracticeQuestions(
      { questions: [validA1(1), validA1(2), validA1(3), validA1(4), validFill(1), validFill(2)] },
      [1, 2],
    );
    assert.equal(result.ok, true);
  });

  it("缺解析拒收", () => {
    const broken = { ...validA1(1), explanation: "" };
    const result = validateClewPracticeQuestions(
      { questions: [broken, validA1(2), validA1(3), validA1(4), validFill(1), validFill(2)] },
      [1],
    );
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.reason, /解析/);
  });

  it("页码引用越界拒收（页码溯源核验）", () => {
    const broken = { ...validA1(1), sourcePage: 9 };
    const result = validateClewPracticeQuestions(
      { questions: [broken, validA1(2), validA1(3), validA1(4), validFill(1), validFill(2)] },
      [1],
    );
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.reason, /页码/);
  });

  it("answerIndex 非法拒收", () => {
    const broken = { ...validA1(1), answerIndex: 7 };
    const result = validateClewPracticeQuestions(
      { questions: [broken, validA1(2), validA1(3), validA1(4), validFill(1), validFill(2)] },
      [1],
    );
    assert.equal(result.ok, false);
  });

  it("题数/题型分布不符拒收", () => {
    const result = validateClewPracticeQuestions(
      { questions: [validA1(1), validA1(2), validA1(3), validA1(4), validFill(1)] },
      [1],
    );
    assert.equal(result.ok, false);
  });
});

describe("Clew 练习判分与 practice-wrong FSRS 回流", async () => {
  const { prisma } = await import("@/lib/prisma");
  const { submitClewPracticeAttempt, loadClewPracticeSet, generateClewPractice } = await import("@/lib/clew/practice");

  let qA1: { id: string; correctIndex: number };
  let qFill: { id: string };

  it("种子：用户 + 教材树 + 讲义 + 题组（skill-application KP）", async () => {
    await prisma.user.create({
      data: { id: "u-prac", email: "practice@test.dev", passwordHash: "x", displayName: "Practice" },
    });
    await prisma.user.create({
      data: { id: "u-other", email: "practice-other@test.dev", passwordHash: "x", displayName: "Other" },
    });
    for (const userId of ["u-prac", "u-other"]) {
      await prisma.clewTextbook.create({
        data: {
          id: `tb-${userId}`,
          userId,
          title: "练习教材",
          fileName: "book.pdf",
          storageKey: `clew/${userId}/tb/book.pdf`,
          sizeBytes: 1024,
          pageCount: 10,
          activeMonth: "2026-10",
        },
      });
      await prisma.clewChapter.create({
        data: {
          id: `ch-${userId}`,
          textbookId: `tb-${userId}`,
          order: 1,
          title: "第一章",
          pageStart: 1,
          pageEnd: 10,
          source: "outline",
        },
      });
    }
    await prisma.clewKnowledgePoint.create({
      data: {
        id: "kp-prac",
        chapterId: "ch-u-prac",
        order: 1,
        title: "测试知识点",
        description: "练习判分测试",
        keyTerms: [],
        prerequisites: [],
        sourcePage: 1,
        loopProfileId: "skill-application",
      },
    });
    await prisma.clewKnowledgePoint.create({
      data: {
        id: "kp-explore",
        chapterId: "ch-u-prac",
        order: 2,
        title: "探索知识点",
        description: "fsrsEnabled=false",
        keyTerms: [],
        prerequisites: [],
        sourcePage: 1,
        loopProfileId: "exploration",
      },
    });
    await prisma.clewLesson.create({
      data: { kpId: "kp-prac", contentMd: "# 讲义", style: "zh-primary", generator: "heuristic", sourceExcerpt: EXCERPT },
    });
    await prisma.clewLesson.create({
      data: { kpId: "kp-explore", contentMd: "# 讲义", style: "zh-primary", generator: "heuristic", sourceExcerpt: EXCERPT },
    });

    const q1 = await prisma.clewPracticeQuestion.create({
      data: {
        kpId: "kp-prac",
        order: 1,
        kind: "a1",
        stem: "家庭中子女数属于哪种变量？",
        choices: ["离散型定量变量", "连续型定量变量", "有序分类变量", "无序分类变量"],
        answer: 0,
        explanation: "依据第 1 页是非题 1。",
        sourcePage: 1,
        generator: "model:test",
      },
    });
    const q2 = await prisma.clewPracticeQuestion.create({
      data: {
        kpId: "kp-prac",
        order: 2,
        kind: "fill",
        stem: "同质个体之间的变异称为______。",
        answer: "个体变异",
        explanation: "依据第 1 页是非题 2。",
        sourcePage: 1,
        generator: "model:test",
      },
    });
    qA1 = { id: q1.id, correctIndex: 0 };
    qFill = { id: q2.id };
  });

  it("题组视图：A1 不泄漏正确项、fill 先见参考答案", async () => {
    const view = await loadClewPracticeSet("u-prac", "kp-prac");
    assert.equal(view.ok, true);
    if (!view.ok) return;
    const a1 = view.data.questions.find((q) => q.id === qA1.id);
    const fill = view.data.questions.find((q) => q.id === qFill.id);
    assert.equal(a1?.answerText, null);
    assert.equal(a1?.explanation, null);
    assert.deepEqual(a1?.choices, ["离散型定量变量", "连续型定量变量", "有序分类变量", "无序分类变量"]);
    assert.equal(fill?.answerText, "个体变异");
    assert.equal(fill?.explanation, "依据第 1 页是非题 2。");
    assert.equal(view.data.summary.total, 2);
  });

  it("A1 答错 → 判分 false + practice-wrong 条目（dueAt=now）+ 双事件", async () => {
    const before = Date.now();
    const result = await submitClewPracticeAttempt({
      userId: "u-prac",
      questionId: qA1.id,
      selectedIndex: 1,
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.data.isCorrect, false);
    assert.equal(result.data.correctIndex, 0);
    assert.equal(result.data.review, "created");

    const item = await prisma.clewReviewItem.findUnique({
      where: {
        userId_kpId_sourceKind: { userId: "u-prac", kpId: "kp-prac", sourceKind: "practice-wrong" },
      },
    });
    assert.ok(item);
    assert.equal(item.reviewCount, 0);
    assert.ok(Math.abs(item.dueAt.getTime() - before) < 5000);

    const events = await prisma.unifiedLearningEvent.findMany({ where: { contentId: "kp-prac" } });
    const types = events.map((e) => e.eventType).sort();
    assert.deepEqual(types, ["attempt-confirmed", "review-scheduled"]);
    const attemptEvent = events.find((e) => e.eventType === "attempt-confirmed");
    assert.equal(attemptEvent?.stage, "practice");
  });

  it("再错 → again 前移（lapses+1、dueAt 顺延）+ review-completed 事件", async () => {
    const before = await prisma.clewReviewItem.findUnique({
      where: { userId_kpId_sourceKind: { userId: "u-prac", kpId: "kp-prac", sourceKind: "practice-wrong" } },
    });
    assert.ok(before);
    const result = await submitClewPracticeAttempt({
      userId: "u-prac",
      questionId: qA1.id,
      selectedIndex: 2,
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.data.review, "advanced");

    const after = await prisma.clewReviewItem.findUnique({ where: { id: before.id } });
    assert.ok(after);
    assert.equal(after.reviewCount, 1);
    assert.equal(after.lapses, 1);
    assert.ok(after.dueAt.getTime() > before.dueAt.getTime() - 1);
    assert.ok(
      await prisma.unifiedLearningEvent.findFirst({
        where: { eventType: "review-completed", sourceKey: { contains: `clew-review:${before.id}:practice-rated:` } },
      }),
    );
  });

  it("答对 → good 前移（巩固路径，从今日到期消失）", async () => {
    const before = await prisma.clewReviewItem.findUnique({
      where: { userId_kpId_sourceKind: { userId: "u-prac", kpId: "kp-prac", sourceKind: "practice-wrong" } },
    });
    assert.ok(before);
    const result = await submitClewPracticeAttempt({
      userId: "u-prac",
      questionId: qA1.id,
      selectedIndex: qA1.correctIndex,
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.data.isCorrect, true);
    assert.equal(result.data.review, "advanced");

    const after = await prisma.clewReviewItem.findUnique({ where: { id: before.id } });
    assert.ok(after);
    assert.equal(after.reviewCount, 2);
    assert.equal(after.lapses, 1);
    assert.ok(after.dueAt.getTime() > Date.now(), "good 后 dueAt 应在未来");
  });

  it("fill 自评 wrong → 判分 false（无条目冲突：已有条目走 advanced）", async () => {
    const result = await submitClewPracticeAttempt({
      userId: "u-prac",
      questionId: qFill.id,
      selfRating: "wrong",
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.data.isCorrect, false);
    assert.equal(result.data.answerText, "个体变异");
    assert.equal(result.data.review, "advanced");
  });

  it("fill 非法自评 400；A1 越界序号 400", async () => {
    const bad = await submitClewPracticeAttempt({
      userId: "u-prac",
      questionId: qFill.id,
      selfRating: "perfect",
    });
    assert.equal(bad.ok, false);
    if (!bad.ok) assert.equal(bad.status, 400);

    const badA1 = await submitClewPracticeAttempt({
      userId: "u-prac",
      questionId: qA1.id,
      selectedIndex: 9,
    });
    assert.equal(badA1.ok, false);
    if (!badA1.ok) assert.equal(badA1.status, 400);
  });

  it("跨用户作答 404（不泄漏存在性）", async () => {
    const result = await submitClewPracticeAttempt({
      userId: "u-other",
      questionId: qA1.id,
      selectedIndex: 0,
    });
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.status, 404);
  });

  it("exploration（fsrsEnabled=false）：作答照记、回流 skipped-profile、不建条目", async () => {
    const qExp = await prisma.clewPracticeQuestion.create({
      data: {
        kpId: "kp-explore",
        order: 1,
        kind: "a1",
        stem: "探索题",
        choices: ["甲", "乙", "丙", "丁"],
        answer: 1,
        explanation: "解析。",
        sourcePage: 1,
        generator: "model:test",
      },
    });
    const result = await submitClewPracticeAttempt({
      userId: "u-prac",
      questionId: qExp.id,
      selectedIndex: 2,
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.data.isCorrect, false);
    assert.equal(result.data.review, "skipped-profile");
    assert.equal(await prisma.clewReviewItem.count({ where: { kpId: "kp-explore" } }), 0);
  });

  it("生成前配额拦截：free 档额度用尽 → 503，不发模型调用", async () => {
    await prisma.user.update({
      where: { id: "u-prac" },
      data: { usage: { clewPracticeSets: 5 } }, // free 档 clewPracticeSets=5
    });
    const result = await generateClewPractice({
      userId: "u-prac",
      kpId: "kp-prac",
      intensity: "standard",
      onProgress: () => undefined,
    });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.status, 503);
      assert.equal(result.code, "quota-exceeded");
    }
    // 未覆盖题组（kp-prac 的 2 题原样保留）
    assert.equal(await prisma.clewPracticeQuestion.count({ where: { kpId: "kp-prac" } }), 2);
  });

  it("无讲义的知识点 → 503 明确报错（不编造题）", async () => {
    await prisma.user.update({ where: { id: "u-prac" }, data: { usage: {} } });
    await prisma.clewKnowledgePoint.create({
      data: {
        id: "kp-nolesson",
        chapterId: "ch-u-prac",
        order: 3,
        title: "无讲义知识点",
        description: "",
        keyTerms: [],
        prerequisites: [],
        sourcePage: 2,
        loopProfileId: "skill-application",
      },
    });
    const result = await generateClewPractice({
      userId: "u-prac",
      kpId: "kp-nolesson",
      intensity: "standard",
      onProgress: () => undefined,
    });
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.status, 503);
      assert.match(result.message, /先生成讲义/);
    }
  });
});
