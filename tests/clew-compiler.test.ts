import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { ClewCompileProgress } from "@/lib/clew/compiler";

// ZCODE-M2 Phase 1/2：Clew 编译器（失败隔离 / 进度 / 证据绑定 / 两层结构 / 配额门槛）

describe("ClewCompiler", async () => {
  const { ClewCompiler } = await import("@/lib/clew/compiler");
  const { executeWithIsolation, retryWithBackoff } = await import("@/lib/clew/resilience");
  const { extractEvidenceAtoms, linkKnowledgePointToEvidence } = await import("@/lib/clew/evidence");
  const { deriveThreeViews, buildKnowledgePackage } = await import("@/lib/clew/structure");
  const { createClewTools, ClewQuotaExhaustedError, CLEW_AGENT_MAX_STEPS } = await import(
    "@/lib/clew/agent-loop"
  );

  const chapters = [
    { id: "c1", order: 1, title: "绪论" },
    { id: "c2", order: 2, title: "阴阳学说" },
    { id: "c3", order: 3, title: "五行学说" },
  ];

  function buildPorts(options?: { failOrders?: number[] }) {
    const failOrders = new Set(options?.failOrders ?? []);
    const failedMarks: Array<{ chapterId: string; error: string }> = [];
    const boundEvidence: string[] = [];
    return {
      failedMarks,
      boundEvidence,
      ports: {
        async getChapters() {
          return chapters;
        },
        async extractChapter(chapter: { id: string; order: number; title: string }) {
          if (failOrders.has(chapter.order)) {
            throw new Error(`第 ${chapter.order} 章萃取失败（模拟）`);
          }
          return {
            chapter,
            knowledgePoints: [
              {
                title: `${chapter.title}知识点`,
                description: "描述",
                keyTerms: ["术语"],
                prerequisites: [],
                sourcePage: 1,
              },
            ],
            chapterText: `【PDF 第 1 页】\n${chapter.title}的原文内容`,
            notes: [],
          };
        },
        async markChapterFailed(chapterId: string, error: string) {
          failedMarks.push({ chapterId, error });
        },
        async bindEvidence(outcome: { chapter: { id: string } }) {
          boundEvidence.push(outcome.chapter.id);
        },
      },
    };
  }

  it("失败隔离：单章失败不阻塞其他章节，失败章被标记", async () => {
    const { ports, failedMarks, boundEvidence } = buildPorts({ failOrders: [2] });
    const compiler = new ClewCompiler("t1", ports);
    const summary = await compiler.extractAllChapters(() => undefined);

    assert.equal(summary.state, "ready");
    assert.deepEqual(summary.succeededChapters.map((c) => c.order), [1, 3]);
    assert.equal(summary.failedChapters.length, 1);
    assert.equal(summary.failedChapters[0].chapter.order, 2);
    assert.match(summary.failedChapters[0].error, /第 2 章萃取失败/);
    assert.equal(failedMarks.length, 1);
    assert.equal(failedMarks[0].chapterId, "c2");
    // 失败章不做证据绑定
    assert.deepEqual(boundEvidence, ["c1", "c3"]);
    assert.equal(summary.knowledgePointCount, 2);
    assert.deepEqual(
      summary.chapterResults.map((row) => row.ok),
      [true, false, true],
    );
  });

  it("全部失败时状态为 failed 且如实汇总", async () => {
    const { ports } = buildPorts({ failOrders: [1, 2, 3] });
    const compiler = new ClewCompiler("t1", ports);
    const summary = await compiler.extractAllChapters(() => undefined);
    assert.equal(summary.state, "failed");
    assert.equal(summary.succeededChapters.length, 0);
    assert.equal(summary.knowledgePointCount, 0);
  });

  it("进度事件对齐「精读第 N/M 章」心智模型", async () => {
    const { ports } = buildPorts();
    const compiler = new ClewCompiler("t1", ports);
    const events: ClewCompileProgress[] = [];
    const summary = await compiler.extractAllChapters((progress) => events.push(progress));

    assert.ok(events.length >= 4);
    assert.match(events[0].currentStep ?? "", /开始精读全书（共 3 章）/);
    const second = events.find((event) => event.currentChapter === 2);
    assert.match(second?.currentStep ?? "", /精读第 2\/3 章：阴阳学说/);
    const done = events[events.length - 1];
    assert.equal(done.state, "ready");
    assert.match(done.currentStep ?? "", /3\/3 章成功，共 3 个知识点/);
    assert.equal(summary.state, "ready");
  });

  it("没有章节时明确失败（先识别并确认目录）", async () => {
    const ports = { ...buildPorts().ports, getChapters: async () => [] };
    const compiler = new ClewCompiler("t1", ports);
    const events: ClewCompileProgress[] = [];
    const summary = await compiler.extractAllChapters((progress) => events.push(progress));
    assert.equal(summary.state, "failed");
    assert.match(events[0].error ?? "", /没有可萃取的章节/);
  });

  it("单章萃取走同一 ports 路径并绑定证据", async () => {
    const { ports, boundEvidence } = buildPorts();
    const compiler = new ClewCompiler("t1", ports);
    const outcome = await compiler.extractChapter(chapters[0], {
      onProgress: () => undefined,
      onKnowledgePoint: () => undefined,
    });
    assert.equal(outcome.chapter.id, "c1");
    assert.equal(outcome.knowledgePoints.length, 1);
    assert.deepEqual(boundEvidence, ["c1"]);
  });

  it("executeWithIsolation 逐项执行并回报成败", async () => {
    const onFailureCalls: string[] = [];
    const { succeeded, failed } = await executeWithIsolation(
      ["a", "b", "c"],
      async (item) => {
        if (item === "b") {
          throw new Error("boom");
        }
      },
      (item, error) => {
        onFailureCalls.push(`${item}:${error.message}`);
      },
    );
    assert.deepEqual(succeeded, ["a", "c"]);
    assert.equal(failed.length, 1);
    assert.equal(failed[0].item, "b");
    assert.deepEqual(onFailureCalls, ["b:boom"]);
  });

  it("retryWithBackoff 重试成功后返回结果，耗尽后抛最后错误", async () => {
    let attempts = 0;
    const value = await retryWithBackoff(
      async () => {
        attempts += 1;
        if (attempts < 3) {
          throw new Error("transient");
        }
        return "ok";
      },
      3,
      0,
    );
    assert.equal(value, "ok");
    assert.equal(attempts, 3);

    await assert.rejects(
      retryWithBackoff(
        async () => {
          throw new Error("permanent");
        },
        2,
        0,
      ),
      /permanent/,
    );
  });

  it("证据原子按【PDF 第 X 页】标记切页", () => {
    const atoms = extractEvidenceAtoms(
      "【PDF 第 3 页】\n第一页内容。\n\n【PDF 第 4 页】\n第二页内容。",
      { textbookId: "t1", chapterId: "c1" },
    );
    assert.equal(atoms.length, 2);
    assert.equal(atoms[0].pageNumber, 3);
    assert.match(atoms[0].text, /第一页内容/);
    assert.equal(atoms[1].pageNumber, 4);
    assert.equal(atoms[0].id, "c1:p3");
  });

  it("证据关联：sourcePage 一致时作为主证据，标题相似页作辅助", () => {
    const atoms = extractEvidenceAtoms(
      "【PDF 第 10 页】\n阴阳学说的基本概念与对立制约。\n\n【PDF 第 11 页】\n五行的相生相克规律。",
      { textbookId: "t1", chapterId: "c1" },
    );
    const binding = linkKnowledgePointToEvidence(
      {
        id: "kp1",
        title: "阴阳学说",
        description: "阴阳的对立制约",
        keyTerms: ["阴阳"],
        sourcePage: 10,
      },
      atoms,
    );
    assert.equal(binding.kpId, "kp1");
    assert.equal(binding.primaryEvidenceId, "c1:p10");
    assert.equal(binding.evidenceIds[0], "c1:p10");
  });

  it("无相关页时证据绑定如实为空", () => {
    const binding = linkKnowledgePointToEvidence(
      { id: "kp1", title: "完全无关的标题", sourcePage: 99 },
      [{ id: "c1:p1", textbookId: "t1", chapterId: "c1", pageNumber: 1, text: "毫不相干的原文" }],
    );
    assert.deepEqual(binding.evidenceIds, []);
    assert.equal(binding.primaryEvidenceId, "");
  });

  it("三视图派生：firstStudy 全量，review 折叠推导案例，exam 最大压缩", () => {
    const views = deriveThreeViews([
      { id: "i1", type: "definition", title: "阴阳", content: "阴阳是中医的基本概念。", order: 1 },
      { id: "i2", type: "derivation", title: "推导", content: "详细的推导过程。", order: 2 },
      { id: "i3", type: "formula", title: "公式", content: "公式一。", order: 3 },
      { id: "i4", type: "example", title: "案例", content: "临床案例。", order: 4 },
      { id: "i5", type: "summary", title: "要点", content: "要点总结。", order: 5 },
    ]);
    assert.match(views.firstStudy, /详细的推导过程/);
    assert.match(views.firstStudy, /临床案例/);
    assert.match(views.review, /（复习时展开）/);
    assert.ok(!views.review.includes("详细的推导过程"));
    assert.ok(!views.review.includes("临床案例"));
    assert.match(views.exam, /公式/);
    assert.match(views.exam, /要点总结/);
    assert.ok(!views.exam.includes("阴阳是中医的基本概念"));
  });

  it("buildKnowledgePackage 排序条目并携带版本追踪", () => {
    const pkg = buildKnowledgePackage(
      "kp1",
      [
        { id: "i2", type: "summary", title: "要点", content: "内容", order: 2 },
        { id: "i1", type: "definition", title: "定义", content: "内容", order: 1 },
      ],
      { noteVersion: 3 },
    );
    assert.deepEqual(
      pkg.contentItems.map((item) => item.id),
      ["i1", "i2"],
    );
    assert.deepEqual(pkg.versions, { evidenceVersion: 1, structureVersion: 1, noteVersion: 3 });
  });

  it("Agent 工具配额门槛：耗尽后抛 ClewQuotaExhaustedError，规则引擎建议不耗额度", async () => {
    const calls: string[] = [];
    const tools = createClewTools(
      { userId: "u1", quotaRemaining: 1 },
      {
        async extractKnowledgePoints() {
          calls.push("extract");
          return { knowledgePoints: [], notes: [] };
        },
        async generateLesson() {
          calls.push("lesson");
          return { contentMd: "", generator: "test" };
        },
        async answerQuestion() {
          calls.push("chat");
          return { answerMd: "" };
        },
        async generateNote() {
          calls.push("note");
          return { contentMd: "", generator: "test" };
        },
      },
    );

    // 第一次模型消耗型工具正常执行（quotaRemaining: 1 → 0）
    await tools.extractKnowledgePoints.execute({ chapterId: "c1", chapterText: "text" }, {
      toolCallId: "call-1",
      messages: [],
    } as never);
    assert.deepEqual(calls, ["extract"]);

    // 配额耗尽：第二次模型消耗型工具被拒
    await assert.rejects(
      () =>
        Promise.resolve(
          tools.generateLesson.execute(
            { kpId: "kp1", kpTitle: "t", kpDescription: "d", sourceText: "s" },
            { toolCallId: "call-2", messages: [] } as never,
          ),
        ),
      ClewQuotaExhaustedError,
    );
    assert.deepEqual(calls, ["extract"]);

    // 确定性规则引擎（suggestLoopProfile）不消耗配额，仍可用
    const suggestion = await tools.suggestLoopProfile.execute(
      {
        kpTitle: "标题",
        kpDescription: "描述",
        hasPractice: false,
        hasCase: false,
        questionKinds: [],
        estimatedMinutes: 5,
      },
      { toolCallId: "call-3", messages: [] } as never,
    );
    assert.deepEqual(suggestion, { profileId: "concept-mastery", suggestedBy: "rule-engine" });
  });

  it("Agent 步数上限默认 10（成本控制契约）", () => {
    assert.equal(CLEW_AGENT_MAX_STEPS, 10);
  });
});
