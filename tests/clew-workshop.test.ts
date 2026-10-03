import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Clew M6：课题工作坊规则、确定性检索与配额

describe("Clew workshop rules", async () => {
  const {
    CLEW_WORKSHOP_LIMITS,
    CLEW_WORKSHOP_MAX_PAGE_COUNT,
    CLEW_WORKSHOP_MAX_TEXT_LINES,
    CLEW_WORKSHOP_TEXT_LINES_PER_PAGE,
    buildClewWorkshopFileLimitMessage,
    buildClewWorkshopLimitMessage,
    decodeClewWorkshopText,
    getClewWorkshopLimits,
    clewWorkshopTextPagesFromLines,
    validateClewWorkshopFileName,
    validateClewWorkshopNote,
    validateClewWorkshopTitle,
  } = await import("../src/lib/clew/workshop-rules");

  it("四档工作坊限额：free 1/3、basic 3/10、pro 10/20、max 30/30", () => {
    assert.deepEqual(CLEW_WORKSHOP_LIMITS.free, { workshops: 1, filesPerWorkshop: 3 });
    assert.deepEqual(CLEW_WORKSHOP_LIMITS.basic, { workshops: 3, filesPerWorkshop: 10 });
    assert.deepEqual(CLEW_WORKSHOP_LIMITS.pro, { workshops: 10, filesPerWorkshop: 20 });
    assert.deepEqual(CLEW_WORKSHOP_LIMITS.max, { workshops: 30, filesPerWorkshop: 30 });
    assert.deepEqual(getClewWorkshopLimits("basic"), { workshops: 3, filesPerWorkshop: 10 });
  });

  it("单文件页数上限 100 页；文本按 40 行/页折算", () => {
    assert.equal(CLEW_WORKSHOP_MAX_PAGE_COUNT, 100);
    assert.equal(CLEW_WORKSHOP_TEXT_LINES_PER_PAGE, 40);
    assert.equal(CLEW_WORKSHOP_MAX_TEXT_LINES, 4000);
    assert.equal(clewWorkshopTextPagesFromLines(0), 1);
    assert.equal(clewWorkshopTextPagesFromLines(40), 1);
    assert.equal(clewWorkshopTextPagesFromLines(41), 2);
    assert.equal(clewWorkshopTextPagesFromLines(4000), 100);
  });

  it("文件名识别：pdf 与 md/markdown/txt 放行", () => {
    assert.deepEqual(validateClewWorkshopFileName("笔记.pdf"), { ok: true, kind: "pdf" });
    assert.deepEqual(validateClewWorkshopFileName("notes.MD"), { ok: true, kind: "text" });
    assert.deepEqual(validateClewWorkshopFileName("a.markdown"), { ok: true, kind: "text" });
    assert.deepEqual(validateClewWorkshopFileName("a.txt"), { ok: true, kind: "text" });
  });

  it("图片材料明确拒绝并说明 OCR 后置原因", () => {
    for (const name of ["scan.png", "photo.JPG", "x.jpeg", "x.webp"]) {
      const result = validateClewWorkshopFileName(name);
      assert.equal(result.ok, false, name);
      if (!result.ok) {
        assert.match(result.reason, /OCR/);
        assert.match(result.reason, /后续开放/);
      }
    }
  });

  it("其它格式如实拒绝，不冒充支持", () => {
    const result = validateClewWorkshopFileName("slides.pptx");
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.reason, /只支持带文字层的 PDF/);
    }
    assert.equal(validateClewWorkshopFileName("   ").ok, false);
  });

  it("文本解码：UTF-8 严格解码、BOM 去除、\\r\\n 归一", () => {
    const bytes = new TextEncoder().encode("﻿第一行\r\n第二行\r第三行");
    const result = decodeClewWorkshopText(bytes);
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.text.startsWith("﻿"), false);
      assert.equal(result.text, "第一行\n第二行\n第三行");
      assert.equal(result.lineCount, 3);
    }
  });

  it("非 UTF-8 字节如实报错，不猜测编码", () => {
    // 0xB5 0xE3 是 GBK 的「半」；fatal 模式下必抛
    const result = decodeClewWorkshopText(new Uint8Array([0xb5, 0xe3, 0xb8, 0xbd]));
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.reason, /UTF-8/);
    }
  });

  it("空文本与超行数文本拒绝并给出页数折算原因", () => {
    assert.equal(decodeClewWorkshopText(new TextEncoder().encode("  \n ")).ok, false);
    const tooLong = new TextEncoder().encode(Array.from({ length: 4001 }, (_, i) => `第${i}行`).join("\n"));
    const result = decodeClewWorkshopText(tooLong);
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.reason, /4001 行/);
      assert.match(result.reason, /100 页/);
    }
  });

  it("标题/说明校验：去空白、超长拒绝", () => {
    assert.deepEqual(validateClewWorkshopTitle("  心衰专题 "), { ok: true, value: "心衰专题" });
    assert.equal(validateClewWorkshopTitle("").ok, false);
    assert.equal(validateClewWorkshopTitle(123).ok, false);
    assert.equal(validateClewWorkshopTitle("x".repeat(61)).ok, false);
    assert.deepEqual(validateClewWorkshopNote(undefined), { ok: true, value: null });
    assert.deepEqual(validateClewWorkshopNote("   "), { ok: true, value: null });
    assert.equal(validateClewWorkshopNote("x".repeat(501)).ok, false);
  });

  it("限额原因文案写出已用/上限，不静默放行", () => {
    assert.match(buildClewWorkshopLimitMessage(1, 1), /1\/1/);
    assert.match(buildClewWorkshopLimitMessage(1, 1), /升级会员档位/);
    assert.match(buildClewWorkshopFileLimitMessage(3, 3), /3\/3/);
  });
});

describe("Clew workshop search", async () => {
  const {
    buildClewWorkshopNoHitAnswer,
    buildClewWorkshopPdfSegments,
    buildClewWorkshopTextSegments,
    describeClewWorkshopSegmentLocator,
    matchClewWorkshopKnowledgePoints,
    searchClewWorkshopSegments,
    tokenizeClewWorkshopQuery,
  } = await import("../src/lib/clew/workshop-search");

  it("分词：拉丁词小写化、中文整段 + 二字滑窗、停用词过滤、去重", () => {
    const tokens = tokenizeClewWorkshopQuery("请问 Heart Failure 的机制是什么？");
    assert.ok(tokens.includes("heart"));
    assert.ok(tokens.includes("failure"));
    assert.ok(!tokens.includes("什么"));
    assert.ok(!tokens.includes("请问"));
    // 「的机制」整段被停用词「什么」之外的部分正常入词；滑窗产出二字词
    const mech = tokenizeClewWorkshopQuery("心力衰竭");
    assert.ok(mech.includes("心力衰竭"));
    assert.ok(mech.includes("心力"));
    assert.ok(mech.includes("衰竭"));
    // 去重
    assert.equal(new Set(mech).size, mech.length);
  });

  it("片段定位：PDF 用页码，文本用行号区间", () => {
    assert.equal(describeClewWorkshopSegmentLocator({ page: 12, lineStart: null, lineEnd: null }), "第 12 页");
    assert.equal(
      describeClewWorkshopSegmentLocator({ page: null, lineStart: 41, lineEnd: 80 }),
      "第 41–80 行",
    );
    assert.equal(
      describeClewWorkshopSegmentLocator({ page: null, lineStart: 7, lineEnd: 7 }),
      "第 7 行",
    );
    assert.equal(
      describeClewWorkshopSegmentLocator({ page: null, lineStart: null, lineEnd: null }),
      "位置未知",
    );
  });

  it("PDF 片段每页一条，空白页跳过；文本片段每 40 行一条", () => {
    const pdfSegments = buildClewWorkshopPdfSegments("f1", "教材.pdf", [
      { pageNumber: 1, text: "  心力衰竭是各种心脏疾病的终末阶段。 " },
      { pageNumber: 2, text: "   " },
      { pageNumber: 3, text: "治疗以利尿剂为基础。" },
    ]);
    assert.equal(pdfSegments.length, 2);
    assert.equal(pdfSegments[0].page, 1);
    assert.equal(pdfSegments[1].page, 3);

    const text = Array.from({ length: 85 }, (_, i) => `第${i + 1}行内容`).join("\n");
    const textSegments = buildClewWorkshopTextSegments("f2", "笔记.md", text);
    assert.equal(textSegments.length, 3);
    assert.deepEqual([textSegments[0].lineStart, textSegments[0].lineEnd], [1, 40]);
    assert.deepEqual([textSegments[2].lineStart, textSegments[2].lineEnd], [81, 85]);
  });

  it("检索命中：按词种数排序，命中片段带材料名与定位", () => {
    const segments = [
      ...buildClewWorkshopPdfSegments("f1", "内科学.pdf", [
        { pageNumber: 5, text: "心力衰竭的代偿机制包括 Frank-Starling 机制与心室重构。" },
        { pageNumber: 9, text: "肺炎链球菌是社区获得性肺炎最常见的病原体。" },
      ]),
      ...buildClewWorkshopTextSegments("f2", "笔记.md", "心力衰竭 利尿剂\n心力衰竭 强心\n"),
    ];
    const hits = searchClewWorkshopSegments(segments, "心力衰竭的代偿机制是什么？");
    assert.ok(hits.length >= 2);
    // 「代偿机制」词种更多的 PDF 第 5 页应排最前
    assert.equal(hits[0].fileName, "内科学.pdf");
    assert.equal(hits[0].locator, "第 5 页");
    assert.ok(hits[0].matchedTerms.length > 0);
    assert.ok(hits[0].excerpt.includes("心力衰竭"));
  });

  it("检索未命中：返回空数组，调用方给出固定如实文案", () => {
    const segments = buildClewWorkshopTextSegments("f1", "笔记.md", "全在讲生理学的稳态。\n");
    const hits = searchClewWorkshopSegments(segments, "量子力学的基本原理");
    assert.deepEqual(hits, []);
    const answer = buildClewWorkshopNoHitAnswer("心衰专题");
    assert.match(answer, /没有检索到/);
    assert.match(answer, /没有调用模型/);
    assert.match(answer, /心衰专题/);
  });

  it("相邻二字滑窗叠合命中不算数（的基+基本 同窗口不凑成两词）", () => {
    // 真实案例：提问「量子力学的基本原理是什么」叠合命中材料里的「的基本病因」
    const segments = buildClewWorkshopPdfSegments("f1", "讲义.pdf", [
      { pageNumber: 1, text: "心力衰竭的基本病因包括原发性心肌损害。常见诱因有感染。" },
    ]);
    assert.deepEqual(searchClewWorkshopSegments(segments, "量子力学的基本原理是什么？"), []);
    // 但分散的两处真实二字命中仍算数
    const spread = buildClewWorkshopPdfSegments("f2", "讲义.pdf", [
      { pageNumber: 1, text: "心律失常可见于各种人群。鉴别诊断需要结合心电图。" },
    ]);
    const hits = searchClewWorkshopSegments(spread, "心律失常的鉴别");
    assert.ok(hits.length >= 1);
  });

  it("空提问或空材料直接零命中", () => {
    const segments = buildClewWorkshopTextSegments("f1", "笔记.md", "一些内容\n");
    assert.deepEqual(searchClewWorkshopSegments(segments, "？？？"), []);
    assert.deepEqual(searchClewWorkshopSegments([], "心力衰竭"), []);
  });

  it("只读关联教材知识点：标题命中即关联，关联不到返回空", () => {
    const kps = [
      { id: "kp1", title: "心力衰竭的代偿机制", textbookTitle: "生理学" },
      { id: "kp2", title: "舌诊基本原理", textbookTitle: "中医诊断学" },
    ];
    const matched = matchClewWorkshopKnowledgePoints(kps, "心力衰竭代偿机制包括哪些？");
    assert.deepEqual(matched.map((m) => m.id), ["kp1"]);
    assert.deepEqual(matchClewWorkshopKnowledgePoints(kps, "完全无关的话题xyz"), []);
  });
});

describe("Clew workshop quota resource", async () => {
  const { TIER_QUOTAS, getQuotaLabel } = await import("../src/lib/quotas");

  it("clewWorkshopChats 四档：free 30 / basic 200 / pro·max unlimited", () => {
    assert.equal(TIER_QUOTAS.free.clewWorkshopChats, 30);
    assert.equal(TIER_QUOTAS.basic.clewWorkshopChats, 200);
    assert.equal(TIER_QUOTAS.pro.clewWorkshopChats, "unlimited");
    assert.equal(TIER_QUOTAS.max.clewWorkshopChats, "unlimited");
  });

  it("额度标签为中文且标明模型计费", () => {
    assert.equal(getQuotaLabel("clewWorkshopChats"), "Clew 课题工作坊答疑（模型）");
  });
});
