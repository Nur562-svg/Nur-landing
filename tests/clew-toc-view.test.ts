import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ZCODE-M3 Phase 0：spine 确认章与 recognition 严格解析解耦 + strategy 写入回落

describe("Clew toc view parsing", async () => {
  const {
    parseClewRecognition,
    parseClewSpineConfirmedAt,
    toClewTextbookView,
  } = await import("@/lib/clew/textbook-view");

  const baseRow = {
    id: "t1",
    title: "教材",
    fileName: "book.pdf",
    sizeBytes: 1024,
    pageCount: 100,
    hasTextLayer: true,
    status: "toc_ready",
    activeMonth: "2026-10",
    createdAt: new Date("2026-10-01T00:00:00.000Z"),
    _count: { chapters: 3 },
  };

  it("非法 strategy + 合法 spineConfirmedAt：recognition 为 null，spine 仍可读到（解耦）", () => {
    const toc = {
      strategy: "manual", // 白名单外（种子/历史数据）
      chapterCount: 3,
      notes: [],
      recognizedAt: "2026-09-30T00:00:00.000Z",
      spineConfirmedAt: "2026-09-30T01:00:00.000Z",
    };
    assert.equal(parseClewRecognition(toc), null);
    assert.equal(parseClewSpineConfirmedAt(toc), "2026-09-30T01:00:00.000Z");

    const view = toClewTextbookView({ ...baseRow, toc }, "2026-10");
    assert.equal(view.recognition, null);
    assert.equal(view.spineConfirmedAt, "2026-09-30T01:00:00.000Z");
  });

  it("合法 recognition：行为与现状完全一致（回归）", () => {
    const toc = {
      strategy: "toc-page",
      chapterCount: 3,
      notes: ["一条说明"],
      recognizedAt: "2026-09-30T00:00:00.000Z",
      spineConfirmedAt: "2026-09-30T02:00:00.000Z",
    };
    const recognition = parseClewRecognition(toc);
    assert.deepEqual(recognition, {
      strategy: "toc-page",
      chapterCount: 3,
      notes: ["一条说明"],
      recognizedAt: "2026-09-30T00:00:00.000Z",
      spineConfirmedAt: "2026-09-30T02:00:00.000Z",
    });

    const view = toClewTextbookView({ ...baseRow, toc }, "2026-10");
    assert.deepEqual(view.recognition, recognition);
    assert.equal(view.spineConfirmedAt, "2026-09-30T02:00:00.000Z");
  });

  it("合法 recognition 但无确认章：spineConfirmedAt 为 null（未确认不让萃取）", () => {
    const toc = {
      strategy: "outline",
      chapterCount: 2,
      notes: [],
      recognizedAt: "2026-09-30T00:00:00.000Z",
    };
    const view = toClewTextbookView({ ...baseRow, toc }, "2026-10");
    assert.equal(view.recognition?.strategy, "outline");
    assert.equal(view.spineConfirmedAt, null);
  });

  it("toc 为 null / 非对象 / 确认章非字符串：spine 一律 null，不猜测", () => {
    assert.equal(parseClewSpineConfirmedAt(null), null);
    assert.equal(parseClewSpineConfirmedAt("manual"), null);
    assert.equal(parseClewSpineConfirmedAt({ spineConfirmedAt: 123 }), null);
    assert.equal(parseClewSpineConfirmedAt({ spineConfirmedAt: "" }), null);
    assert.equal(toClewTextbookView({ ...baseRow, toc: null }, "2026-10").spineConfirmedAt, null);
  });

  it("写入回落：非法 strategy 的 previousToc 会被白名单挡下（tocStrategyWhitelist 契约）", async () => {
    const { tocStrategyWhitelist } = await import("@/lib/clew/textbook-view");
    assert.deepEqual(tocStrategyWhitelist, ["outline", "toc-page", "model", "none", "docx-heading"]);
    assert.equal(tocStrategyWhitelist.includes("manual"), false);
    // 合法值透传后仍能被 parseClewRecognition 接受（自愈闭环成立）
    for (const strategy of tocStrategyWhitelist) {
      const parsed = parseClewRecognition({
        strategy,
        chapterCount: 1,
        notes: [],
        recognizedAt: "2026-09-30T00:00:00.000Z",
      });
      assert.equal(parsed?.strategy, strategy);
    }
  });
});
