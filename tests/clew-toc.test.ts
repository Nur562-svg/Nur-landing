import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Hi doc M2：目录启发式、模型输出校验、章节归一化与手动修正校验

describe("Hi doc printed TOC parsing", async () => {
  const {
    pdfTextItemsToLines,
    parsePrintedTocPages,
    normalizeChapterEntries,
    resolveConsensusOffset,
    pageTextMatchesTitle,
    parseModelChaptersPayload,
    validateManualChapters,
  } = await import("../src/lib/hidoc/toc-heuristic");

  it("pdfjs 文本项按 hasEOL 切成行并折叠空白", () => {
    const lines = pdfTextItemsToLines([
      { str: "第一章", hasEOL: false },
      { str: " 绪论", hasEOL: true },
      { str: "  1", hasEOL: true },
      { str: "第二章 阴阳学说 .... 15", hasEOL: false },
    ]);
    assert.deepEqual(lines, ["第一章 绪论", "1", "第二章 阴阳学说 .... 15"]);
  });

  it("有 transform 时按 Y 基线聚类分行、按 X 排序（无 hasEOL 的真实 PDF）", () => {
    const lines = pdfTextItemsToLines([
      // 同一行（y=700）的两个片段，故意乱序
      { str: "1", transform: [10, 0, 0, 10, 400, 700] },
      { str: "第一章 绪论 ......", transform: [10, 0, 0, 10, 40, 700] },
      // 下一行（y=680），基线轻微偏移 1 单位仍算同一行
      { str: "第二章 方法 ...... 3", transform: [10, 0, 0, 10, 40, 681.4] },
    ]);
    assert.deepEqual(lines, ["第一章 绪论 ......1", "第二章 方法 ...... 3"]);
  });

  it("兼容康熙部首数字（第⼀章）与全角页码", () => {
    // \u2F00 = KANGXI RADICAL ONE：部分 PDF（含印刷/OCR 管线）会把「一」写成部首形式
    const result = parsePrintedTocPages(
      [{ pageNumber: 2, lines: ["\u7B2C\u2F00\u7AE0 \u7EEA\u8BBA ...... \uFF11", "第二章 方法 ...... 3"] }],
      100,
    );
    assert.deepEqual(result.entries, [
      { title: "\u7B2C\u2F00\u7AE0 绪论", pageNumber: 1 },
      { title: "第二章 方法", pageNumber: 3 },
    ]);
  });

  it("解析「第X章 标题 …… 页码」，忽略节级条目与无页码行", () => {
    const result = parsePrintedTocPages(
      [
        {
          pageNumber: 3,
          lines: [
            "目 录",
            "第一章 绪论 ................ 1",
            "第一节 中医学的基本特点 ...... 2",
            "第二章 阴阳学说 ............. 15",
            "第三章 五行学说",  // 无页码 → 忽略
          ],
        },
      ],
      300,
    );
    assert.deepEqual(result.entries, [
      { title: "第一章 绪论", pageNumber: 1 },
      { title: "第二章 阴阳学说", pageNumber: 15 },
    ]);
    assert.equal(result.ignoredCount, 2);
    assert.deepEqual(result.tocPageNumbers, [3]);
  });

  it("页码超出书本范围的行被忽略（不猜测偏移）", () => {
    const result = parsePrintedTocPages(
      [{ pageNumber: 2, lines: ["第一章 绪论 ..... 1", "第二章 远章 ..... 9999"] }],
      200,
    );
    assert.equal(result.entries.length, 1);
    assert.equal(result.ignoredCount, 1);
  });

  it("归一化：排序、补 pageEnd（下一页起始 -1，末章到书末）、去重", () => {
    const { chapters, droppedCount } = normalizeChapterEntries(
      [
        { title: "第二章", pageNumber: 20 },
        { title: "第一章", pageNumber: 5 },
        { title: "第一章", pageNumber: 5 },
        { title: "越界", pageNumber: 0 },
      ],
      50,
    );
    assert.deepEqual(chapters, [
      { title: "第一章", pageStart: 5, pageEnd: 19 },
      { title: "第二章", pageStart: 20, pageEnd: 50 },
    ]);
    assert.equal(droppedCount, 2);
  });

  it("归一化：章节数超上限时截断并计数", () => {
    const entries = Array.from({ length: 12 }, (_, index) => ({
      title: `第${index + 1}章`,
      pageNumber: index + 1,
    }));
    const { chapters, droppedCount } = normalizeChapterEntries(entries, 100, 10);
    assert.equal(chapters.length, 10);
    assert.equal(droppedCount, 2);
  });

  it("页码偏移投票：多数一致者胜出，无一致返回 null", () => {
    assert.equal(resolveConsensusOffset([3, 3, 4]), 3);
    assert.equal(resolveConsensusOffset([null, 5, 5]), 5);
    assert.equal(resolveConsensusOffset([null, null]), null);
    assert.equal(resolveConsensusOffset([]), null);
  });

  it("标题探针匹配（含空白差异）", () => {
    assert.equal(pageTextMatchesTitle(["第一章 绪论"], "第一章 绪论"), true);
    assert.equal(pageTextMatchesTitle(["目 录", "第一章绪论"], "第一章  绪论"), true);
    assert.equal(pageTextMatchesTitle(["完全无关"], "第九章 治法"), false);
  });

  it("模型 JSON 校验：只接受 {chapters:[{title,pageStart}]}，非法条目计数丢弃", () => {
    const ok = parseModelChaptersPayload(
      { chapters: [{ title: "第一章 绪论", pageStart: 1 }, { title: "", pageStart: 3 }, { title: "第三章", pageStart: 0 }] },
      100,
    );
    assert.deepEqual(ok.entries, [{ title: "第一章 绪论", pageNumber: 1 }]);
    assert.equal(ok.droppedCount, 2);
    assert.deepEqual(parseModelChaptersPayload({ chapters: "nope" }, 100).entries, []);
    assert.deepEqual(parseModelChaptersPayload(null, 100).entries, []);
  });

  it("手动修正校验：合法列表按起始页排序", () => {
    const result = validateManualChapters(
      [
        { title: "第二章", pageStart: 20, pageEnd: 39 },
        { title: "第一章", pageStart: 1, pageEnd: 19 },
      ],
      40,
    );
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.deepEqual(result.chapters.map((chapter) => chapter.title), ["第一章", "第二章"]);
    }
  });

  it("手动修正校验：中文原因覆盖空标题/越界/倒序/非数组/空列表", () => {
    const cases: [unknown, RegExp][] = [
      ["nope", /格式不正确/],
      [[], /不能为空/],
      [[{ title: " ", pageStart: 1, pageEnd: 2 }], /缺少标题/],
      [[{ title: "章", pageStart: 1, pageEnd: 99 }], /超出/],
      [[{ title: "章", pageStart: 9, pageEnd: 3 }], /结束页早于起始页/],
      [[{ title: "章", pageStart: 1.5, pageEnd: 3 }], /必须是整数/],
    ];
    for (const [input, pattern] of cases) {
      const result = validateManualChapters(input, 40);
      assert.equal(result.ok, false);
      if (!result.ok) {
        assert.match(result.message, pattern);
      }
    }
  });
});

describe("Hi doc textbook view mapping", async () => {
  const { parseHiDocRecognition, toHiDocTextbookView } = await import("../src/lib/hidoc/textbook-view");

  it("识别元信息按不可信输入解析", () => {
    assert.deepEqual(
      parseHiDocRecognition({
        strategy: "outline",
        chapterCount: 12,
        notes: ["来源：PDF 书签（一级条目 12 条）。", 42],
        recognizedAt: "2026-09-17T00:00:00.000Z",
      }),
      {
        strategy: "outline",
        chapterCount: 12,
        notes: ["来源：PDF 书签（一级条目 12 条）。"],
        recognizedAt: "2026-09-17T00:00:00.000Z",
      },
    );
    assert.equal(parseHiDocRecognition(null), null);
    assert.equal(parseHiDocRecognition({ strategy: "bogus", chapterCount: 1, recognizedAt: "x" }), null);
  });

  it("视图带章节数与冻结判定", () => {
    const view = toHiDocTextbookView(
      {
        id: "t1",
        title: "教材",
        fileName: "book.pdf",
        sizeBytes: 123,
        pageCount: 79,
        hasTextLayer: true,
        status: "toc_ready",
        activeMonth: "2026-08",
        toc: { strategy: "toc-page", chapterCount: 3, notes: [], recognizedAt: "2026-09-17T00:00:00.000Z" },
        createdAt: new Date("2026-09-01T00:00:00.000Z"),
        _count: { chapters: 3 },
      },
      "2026-09",
    );
    assert.equal(view.chapterCount, 3);
    assert.equal(view.isFrozen, true);
    assert.equal(view.recognition?.strategy, "toc-page");
  });
});

describe("Hi doc parse quota", async () => {
  const { TIER_QUOTAS, canUseResource, computeItem, getQuotaLabel } = await import("../src/lib/quotas");

  it("目录解析额度：free 3 / basic 10 / pro 与 max 无限", () => {
    assert.equal(TIER_QUOTAS.free.hidocParses, 3);
    assert.equal(TIER_QUOTAS.basic.hidocParses, 10);
    assert.equal(TIER_QUOTAS.pro.hidocParses, "unlimited");
    assert.equal(TIER_QUOTAS.max.hidocParses, "unlimited");
  });

  it("额度用尽后 canUseResource 为 false（不静默放行）", () => {
    assert.equal(canUseResource(computeItem(3, 3)), false);
    assert.equal(canUseResource(computeItem(2, 3)), true);
    assert.equal(canUseResource(computeItem(999, "unlimited")), true);
  });

  it("配额标签为中文", () => {
    assert.match(getQuotaLabel("hidocParses"), /Hi doc/);
  });
});