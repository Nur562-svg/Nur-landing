import { describe, it } from "node:test";
import assert from "node:assert";
import {
  buildMockExamReport,
  completeMockExamSession,
  createInitialAnswers,
  createMockExamPaper,
  recordMockExamAnswer,
} from "@/lib/mock-exam";
import { registeredCourses } from "@/content/courses";
import type { MockExamSession } from "@/types/mock-exam";

const tcmCourse = registeredCourses.find((course) => course.id === "course-tcm-diagnostics");

describe("createMockExamPaper", () => {
  it("composes a complete 100-point paper with no shortfalls", () => {
    assert.ok(tcmCourse);
    const paper = createMockExamPaper(tcmCourse);
    assert.strictEqual(paper.version, 1);
    assert.strictEqual(paper.blueprintId, "exam-blueprint-tcm-diagnostics-final");
    assert.match(paper.sessionId, /^mock-exam-/);
    // 2026-08-06：B1/B2 语义经用户口头确认后，题库补齐至 60 题、100 分完整组卷。
    assert.strictEqual(paper.items.length, 60);
    assert.strictEqual(paper.totalPoints, 100);
    assert.strictEqual(paper.complete, true);
    assert.deepStrictEqual(paper.shortfalls, []);
    // 每行按蓝图完整组卷
    const expectedRows: Record<string, number> = {
      "a1-single": 30,
      b1: 10,
      b2: 5,
      fill: 5,
      term: 5,
      "short-answer": 3,
      case: 2,
    };
    for (const row of paper.rows) {
      assert.strictEqual(row.status, "complete", `${row.kind} 行应完整组卷`);
      assert.strictEqual(row.includedCount, expectedRows[row.kind]);
      assert.strictEqual(row.includedPoints, row.requiredPoints);
    }
  });

  it("orders items by blueprint rows and breadth-first knowledge points", () => {
    assert.ok(tcmCourse);
    const paper = createMockExamPaper(tcmCourse);
    const orders = paper.items.map((item) => item.order);
    assert.deepStrictEqual(orders, [...orders].sort((a, b) => a - b));
    // A1 30 题覆盖 9 个知识点（广度优先 + 回填）
    const a1Items = paper.items.filter((item) => item.questionKind === "a1-single");
    const knowledgePointIds = new Set(a1Items.map((item) => item.knowledgePointId));
    assert.strictEqual(knowledgePointIds.size, 9);
    assert.strictEqual(a1Items.length, 30);
  });

  it("carries B1/B2 group context onto paper items", () => {
    assert.ok(tcmCourse);
    const paper = createMockExamPaper(tcmCourse);
    const b1Items = paper.items.filter((item) => item.questionKind === "b1");
    const b2Items = paper.items.filter((item) => item.questionKind === "b2");
    assert.strictEqual(b1Items.length, 10);
    assert.strictEqual(b2Items.length, 5);
    for (const item of b1Items) {
      assert.ok(item.groupId);
      assert.ok(item.sharedChoices && item.sharedChoices.length >= 2);
      assert.strictEqual(item.automaticallyScored, true);
      assert.strictEqual(item.choices.length, item.sharedChoices!.length);
    }
    for (const item of b2Items) {
      assert.ok(item.groupId);
      assert.ok(item.groupPrompt && item.groupPrompt.length > 0);
      assert.strictEqual(item.automaticallyScored, true);
      assert.ok(item.choices.length >= 2);
    }
  });
});

describe("mock exam answering and reporting", () => {
  it("auto-grades objective items and defers subjective items honestly", () => {
    assert.ok(tcmCourse);
    const paper = createMockExamPaper(tcmCourse);
    const answers = createInitialAnswers(paper.items);
    const a1Items = paper.items.filter((item) => item.questionKind === "a1-single");
    const b1Items = paper.items.filter((item) => item.questionKind === "b1");
    const fillItems = paper.items.filter((item) => item.questionKind === "fill");
    assert.strictEqual(a1Items.length, 30);
    assert.strictEqual(fillItems.length, 5);

    // A1 第一题答对
    const a1 = a1Items[0];
    const afterCorrect = recordMockExamAnswer(
      answers,
      a1,
      { selectedIndex: a1.correctChoiceIndex, text: "" },
    );
    const a1Answer = afterCorrect.find((a) => a.itemId === a1.itemId);
    assert.strictEqual(a1Answer?.status, "auto-graded");
    assert.strictEqual(a1Answer?.isCorrect, true);

    // A1 第二题答错
    const a1Wrong = a1Items[1];
    const wrongIndex = a1Wrong.correctChoiceIndex === 0 ? 1 : 0;
    const afterWrong = recordMockExamAnswer(
      afterCorrect,
      a1Wrong,
      { selectedIndex: wrongIndex, text: "" },
    );
    assert.strictEqual(
      afterWrong.find((a) => a.itemId === a1Wrong.itemId)?.isCorrect,
      false,
    );

    // B1 成员用共享选项作答并自动判定
    const b1 = b1Items[0];
    const afterB1 = recordMockExamAnswer(
      afterWrong,
      b1,
      { selectedIndex: b1.correctChoiceIndex, text: "" },
    );
    const b1Answer = afterB1.find((a) => a.itemId === b1.itemId);
    assert.strictEqual(b1Answer?.status, "auto-graded");
    assert.strictEqual(b1Answer?.isCorrect, true);

    // 填空主观题 → pending-review，不做自动判定
    const fill = fillItems[0];
    const afterFill = recordMockExamAnswer(
      afterB1,
      fill,
      { selectedIndex: null, text: "数脉" },
    );
    const fillAnswer = afterFill.find((a) => a.itemId === fill.itemId);
    assert.strictEqual(fillAnswer?.status, "pending-review");
    assert.strictEqual(fillAnswer?.isCorrect, null);

    const session: MockExamSession = {
      version: 1,
      sessionId: paper.sessionId,
      courseId: paper.courseId,
      courseTitle: paper.courseTitle,
      blueprintId: paper.blueprintId,
      startedAt: paper.createdAt,
      completedAt: null,
      durationMinutes: paper.durationMinutes,
      answers: [],
      objectiveEarnedPoints: 0,
      objectiveTotalPoints: 0,
      pendingReviewItemIds: [],
      abandoned: false,
    };
    const completed = completeMockExamSession(session, paper, afterFill);
    assert.strictEqual(completed.objectiveEarnedPoints, 2); // 答对 1 题 A1 + 1 题 B1
    assert.strictEqual(completed.objectiveTotalPoints, 45); // A1 30 + B1 10 + B2 5
    assert.ok(completed.pendingReviewItemIds.includes(fill.itemId));

    const report = buildMockExamReport(paper, completed);
    assert.strictEqual(report.objectiveScore.earned, 2);
    assert.strictEqual(report.objectiveScore.total, 45);
    assert.strictEqual(report.rows.length, 7);
    assert.ok(report.pendingReview.length > 0);
    assert.ok(!report.notice.includes("题库不足"));
  });
});
