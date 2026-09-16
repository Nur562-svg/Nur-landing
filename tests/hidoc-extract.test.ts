import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Hi doc M3：知识点萃取 payload 校验、先修归一化与章节模型文本构建

describe("Hi doc knowledge point payload parsing", async () => {
  const {
    HIDOC_MAX_KNOWLEDGE_POINTS_PER_CHAPTER,
    buildChapterModelText,
    parseModelKnowledgePointsPayload,
  } = await import("../src/lib/hidoc/extraction-heuristic");

  const validPoint = {
    title: "四诊合参",
    description: "望闻问切四诊互相印证、综合判断的诊察原则。",
    keyTerms: ["望诊", "闻诊"],
    prerequisites: [],
    sourcePage: 3,
  };

  it("合法条目通过校验并保留字段", () => {
    const result = parseModelKnowledgePointsPayload({ knowledgePoints: [validPoint] }, 3, 6);
    assert.equal(result.knowledgePoints.length, 1);
    assert.equal(result.knowledgePoints[0].title, "四诊合参");
    assert.equal(result.knowledgePoints[0].sourcePage, 3);
    assert.deepEqual(result.knowledgePoints[0].keyTerms, ["望诊", "闻诊"]);
    assert.equal(result.droppedCount, 0);
  });

  it("页码越界条目被丢弃并计数（不猜测页码）", () => {
    const result = parseModelKnowledgePointsPayload(
      {
        knowledgePoints: [
          validPoint,
          { ...validPoint, title: "越界点", sourcePage: 7 },
          { ...validPoint, title: "低界点", sourcePage: 2 },
          { ...validPoint, title: "小数页", sourcePage: 3.5 },
        ],
      },
      3,
      6,
    );
    assert.equal(result.knowledgePoints.length, 1);
    assert.equal(result.droppedCount, 3);
  });

  it("字段缺失/类型错误/超长条目被丢弃", () => {
    const result = parseModelKnowledgePointsPayload(
      {
        knowledgePoints: [
          { ...validPoint, title: "" },
          { ...validPoint, description: "x".repeat(1001) },
          { ...validPoint, keyTerms: "not-array" },
          { ...validPoint, prerequisites: [42] },
          { ...validPoint, keyTerms: ["x".repeat(81)] },
          "not-an-object",
        ],
      },
      3,
      6,
    );
    assert.equal(result.knowledgePoints.length, 0);
    assert.equal(result.droppedCount, 6);
  });

  it("同章重复（页码+标题）只保留第一条", () => {
    const result = parseModelKnowledgePointsPayload(
      { knowledgePoints: [validPoint, validPoint] },
      3,
      6,
    );
    assert.equal(result.knowledgePoints.length, 1);
    assert.equal(result.droppedCount, 1);
  });

  it("超出单章上限时截断并计数", () => {
    const points = Array.from({ length: HIDOC_MAX_KNOWLEDGE_POINTS_PER_CHAPTER + 3 }, (_, index) => ({
      ...validPoint,
      title: `知识点${index + 1}`,
      sourcePage: 3,
    }));
    const result = parseModelKnowledgePointsPayload({ knowledgePoints: points }, 3, 6);
    assert.equal(result.knowledgePoints.length, HIDOC_MAX_KNOWLEDGE_POINTS_PER_CHAPTER);
    assert.equal(result.droppedCount, 3);
  });

  it("先修引用只保留同批次能对上的标题（自引用与不存在引用被丢弃）", () => {
    const result = parseModelKnowledgePointsPayload(
      {
        knowledgePoints: [
          { ...validPoint, prerequisites: ["病性辨证", "不存在的点"] },
          { ...validPoint, title: "病性辨证", sourcePage: 4, prerequisites: ["四诊合参"] },
          { ...validPoint, title: "自引用点", sourcePage: 5, prerequisites: ["自引用点"] },
        ],
      },
      3,
      6,
    );
    assert.equal(result.knowledgePoints.length, 3);
    assert.deepEqual(result.knowledgePoints[0].prerequisites, ["病性辨证"]);
    assert.deepEqual(result.knowledgePoints[1].prerequisites, ["四诊合参"]);
    assert.deepEqual(result.knowledgePoints[2].prerequisites, []);
    assert.equal(result.droppedPrerequisiteCount, 2);
  });

  it("非对象输入返回空结果（不抛异常）", () => {
    assert.deepEqual(parseModelKnowledgePointsPayload(null, 3, 6).knowledgePoints, []);
    assert.deepEqual(parseModelKnowledgePointsPayload({ knowledgePoints: "x" }, 3, 6).knowledgePoints, []);
    assert.deepEqual(parseModelKnowledgePointsPayload([], 3, 6).knowledgePoints, []);
  });

  it("章节模型文本带页标记且按上限截断", () => {
    const pages = [
      { pageNumber: 3, lines: ["第一章 绪论", "正文第一行"] },
      { pageNumber: 4, lines: ["正文第二行"] },
    ];
    const full = buildChapterModelText(pages);
    assert.ok(full.text.includes("【PDF 第 3 页】"));
    assert.ok(full.text.includes("【PDF 第 4 页】"));
    assert.ok(full.text.includes("正文第二行"));
    assert.equal(full.truncated, false);

    const tiny = buildChapterModelText(pages, 30);
    assert.equal(tiny.truncated, true);
    assert.ok(tiny.text.length <= 30);
    assert.ok(tiny.text.includes("【PDF 第 3 页】"));
  });
});

describe("Hi doc extract quota", async () => {
  const { TIER_QUOTAS, computeItem, canUseResource, getQuotaLabel } = await import("../src/lib/quotas");

  it("知识点萃取额度：free 5 / basic 20 / pro 与 max 无限", () => {
    assert.equal(TIER_QUOTAS.free.hidocExtracts, 5);
    assert.equal(TIER_QUOTAS.basic.hidocExtracts, 20);
    assert.equal(TIER_QUOTAS.pro.hidocExtracts, "unlimited");
    assert.equal(TIER_QUOTAS.max.hidocExtracts, "unlimited");
  });

  it("额度边界与标签", () => {
    assert.equal(canUseResource(computeItem(5, 5)), false);
    assert.equal(canUseResource(computeItem(4, 5)), true);
    assert.match(getQuotaLabel("hidocExtracts"), /知识点萃取/);
  });
});