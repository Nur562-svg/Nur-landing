import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * ZCODE-M6-D（任务书 §七 D-1）：页码引用核验管线 + 证据原子上下文。
 * 锁定：
 * - splitExcerptPages：按【PDF 第 N 页】切分；空页跳过；无标记返回空映射；
 * - verifyCitations：命中/失配/全半角规范化/虚词排除/空输入/页码越界按失配；
 * - loadClewKpEvidenceContext：isPrimary 优先、无绑定返回 null、字符预算截断。
 * 证据上下文部分用隔离 SQLite（mkdtemp + DATABASE_URL + prisma db push），不碰 prisma/dev.db。
 */

// —— 必须在 import 服务模块之前：隔离数据库 ——
const testDir = mkdtempSync(path.join(tmpdir(), "nur-clew-citation-"));
process.env.DATABASE_URL = `file:${path.join(testDir, "test.db")}`;
execSync("npx prisma db push", { stdio: "pipe", cwd: process.cwd(), env: { ...process.env } });

process.on("exit", () => {
  try {
    rmSync(testDir, { recursive: true, force: true });
  } catch {
    // 清理失败不影响测试结果
  }
});

const EXCERPT = [
  "【PDF 第 3 页】",
  "总体（population）是同质个体某指标值的集合。同质个体之间的变异称为个体变异。",
  "【PDF 第 4 页】",
  "从总体中抽取部分个体的过程称为抽样。",
].join("\n");

describe("splitExcerptPages（纯函数）", async () => {
  const { splitExcerptPages } = await import("@/lib/clew/citation-verify");

  it("按【PDF 第 N 页】切分为页码到文本的映射", () => {
    const pageMap = splitExcerptPages(EXCERPT);
    assert.equal(pageMap.size, 2);
    assert.match(pageMap.get(3) ?? "", /同质个体某指标值的集合/);
    assert.match(pageMap.get(4) ?? "", /抽样/);
    assert.equal((pageMap.get(3) ?? "").includes("抽样"), false);
  });

  it("无页码标记返回空映射；空页跳过", () => {
    assert.equal(splitExcerptPages("没有任何标记的文本").size, 0);
    assert.equal(splitExcerptPages("").size, 0);
    const withEmpty = "【PDF 第 1 页】\n【PDF 第 2 页】\n只有第 2 页有内容。";
    const pageMap = splitExcerptPages(withEmpty);
    assert.equal(pageMap.size, 1);
    assert.ok(pageMap.has(2));
  });
});

describe("verifyCitations（纯函数）", async () => {
  const { verifyCitations, splitExcerptPages } = await import("@/lib/clew/citation-verify");
  const pageMap = splitExcerptPages(EXCERPT);

  it("页内关键词命中即过（含标点与页面标记句）", () => {
    const content = [
      "总体是同质个体某指标值的集合（第 3 页）。",
      "这一页还介绍了个体变异的概念（第 3 页）。",
    ].join("\n");
    const result = verifyCitations(content, pageMap);
    assert.equal(result.checked, 2);
    assert.deepEqual(result.issues, []);
  });

  it("编造引用（页内无相关内容）→ issue", () => {
    const content = "胰腺的内分泌功能主要是胰岛素调节（第 3 页）。";
    const result = verifyCitations(content, pageMap);
    assert.equal(result.checked, 1);
    assert.equal(result.issues.length, 1);
    assert.equal(result.issues[0].page, 3);
    assert.match(result.issues[0].sentence, /胰岛素/);
  });

  it("页码不在原文页集 → 按失配处理（不静默放过）", () => {
    const content = "总体是同质个体某指标值的集合（第 99 页）。";
    const result = verifyCitations(content, pageMap);
    assert.equal(result.checked, 1);
    assert.equal(result.issues.length, 1);
    assert.equal(result.issues[0].page, 99);
  });

  it("全角数字与空白折叠规范化后仍可核验", () => {
    const content = "总体是同质个体某指标值的集合（第 ３ 页）。";
    const result = verifyCitations(content, pageMap);
    assert.equal(result.checked, 1);
    assert.deepEqual(result.issues, []);
  });

  it("区间引用：任一页命中即过", () => {
    const content = "从总体中抽取部分个体的过程（第 3-4 页）。";
    const result = verifyCitations(content, pageMap);
    assert.deepEqual(result.issues, []);
  });

  it("无页码的句子不进入核验（不猜测）", () => {
    const result = verifyCitations("这一句没有引用任何页码。", pageMap);
    assert.equal(result.checked, 0);
    assert.deepEqual(result.issues, []);
  });

  it("空输入安全", () => {
    const result = verifyCitations("", pageMap);
    assert.equal(result.checked, 0);
    assert.deepEqual(result.issues, []);
  });

  it("虚词切块提取 2 字实词：滑窗不命中但虚词块命中时仍通过（D-1 规定算法）", () => {
    // 页文本只有「预后」这个词与句面重合（3 字滑窗无一命中），靠去虚词后的 2 字块「预后」命中
    const pageMap2 = splitExcerptPages("【PDF 第 1 页】\n多数患者预后良好，少数较差。");
    const content = "该病的预后与分期有关（第 1 页）。";
    const result = verifyCitations(content, pageMap2);
    assert.deepEqual(result.issues, []);
    assert.equal(result.checked, 1);
  });

  it("同句多引用逐一核验：一真一假只标假的那条（不以句为单位放行）", () => {
    const content = "总体是同质个体某指标值的集合（第 3 页），而胰腺的内分泌功能主要由胰岛素调节（第 4 页）。";
    const result = verifyCitations(content, pageMap);
    assert.equal(result.checked, 2);
    assert.equal(result.issues.length, 1);
    assert.equal(result.issues[0].page, 4);
    assert.match(result.issues[0].sentence, /胰腺/);
    assert.equal(result.issues[0].sentence.includes("总体是同质"), false);
  });

  it("checked 只计实际执行匹配的引用（孤立标记行不计入）", () => {
    const content = "【PDF 第 3 页】\n总体是集合（第 3 页）。";
    const result = verifyCitations(content, pageMap);
    assert.equal(result.checked, 1);
    assert.deepEqual(result.issues, []);
  });

  it("【PDF 第 N 页】原样标记带实词段时同样被核验", () => {
    const content = "【PDF 第 3 页】总体（population）是同质个体某指标值的集合。";
    const result = verifyCitations(content, pageMap);
    assert.equal(result.checked, 1);
    assert.deepEqual(result.issues, []);
  });

  it("前置形态（第 X 页指出：……）核验引用后文本段", () => {
    const content = "第 3 页明确指出：总体（population）是同质个体某指标值的集合。";
    const result = verifyCitations(content, pageMap);
    assert.equal(result.checked, 1);
    assert.deepEqual(result.issues, []);
  });

  it("markdown 加粗页码（**第 X 页**）不产生装饰残片，后文命中即过", () => {
    const content = "同样在**第 3 页**，教材明确指出总体（population）是同质个体某指标值的集合。";
    const result = verifyCitations(content, pageMap);
    assert.equal(result.checked, 1);
    assert.deepEqual(result.issues, []);
  });
});

describe("loadClewKpEvidenceContext（隔离 SQLite）", async () => {
  const { prisma } = await import("@/lib/prisma");
  const { loadClewKpEvidenceContext } = await import("@/lib/clew/evidence-context");

  it("种子：用户 + 教材树 + 证据原子 + 绑定", async () => {
    await prisma.user.create({
      data: { id: "u-ev", email: "evidence@test.dev", passwordHash: "x", displayName: "Evidence" },
    });
    await prisma.clewTextbook.create({
      data: {
        id: "tb-ev",
        userId: "u-ev",
        title: "证据教材",
        fileName: "book.pdf",
        storageKey: "clew/u-ev/tb-ev/book.pdf",
        sizeBytes: 1024,
        pageCount: 10,
        activeMonth: "2026-10",
      },
    });
    await prisma.clewChapter.create({
      data: { id: "ch-ev", textbookId: "tb-ev", order: 1, title: "第一章", pageStart: 1, pageEnd: 10, source: "outline" },
    });
    await prisma.clewKnowledgePoint.create({
      data: {
        id: "kp-ev",
        chapterId: "ch-ev",
        order: 1,
        title: "证据知识点",
        description: "证据原子上下文测试",
        keyTerms: [],
        prerequisites: [],
        sourcePage: 3,
      },
    });
    for (const [atomId, pageNumber] of [["atom-a", 3], ["atom-b", 4], ["atom-c", 5]] as const) {
      await prisma.clewEvidenceAtom.create({
        data: { id: atomId, textbookId: "tb-ev", chapterId: "ch-ev", pageNumber, text: `第 ${pageNumber} 页的原文内容，用于证据原子上下文测试。`.repeat(6) },
      });
    }
    await prisma.clewKnowledgePointEvidence.create({
      data: { kpId: "kp-ev", evidenceId: "atom-b", isPrimary: false },
    });
    await prisma.clewKnowledgePointEvidence.create({
      data: { kpId: "kp-ev", evidenceId: "atom-a", isPrimary: true },
    });
  });

  it("无绑定返回 null（有则增强、无则不变）", async () => {
    const result = await loadClewKpEvidenceContext("kp-不存在");
    assert.equal(result, null);
  });

  it("isPrimary 优先返回并带页码；无 relevanceScore 时序稳定", async () => {
    const atoms = await loadClewKpEvidenceContext("kp-ev");
    assert.ok(atoms);
    assert.equal(atoms.length, 2);
    assert.equal(atoms[0].page, 3);
    assert.equal(atoms[1].page, 4);
    assert.match(atoms[0].text, /第 3 页的原文内容/);
  });

  it("总字符预算截断（maxChars 生效）", async () => {
    const atoms = await loadClewKpEvidenceContext("kp-ev", { maxChars: 160 });
    assert.ok(atoms);
    const total = atoms.reduce((sum, atom) => sum + atom.text.length, 0);
    assert.ok(total <= 160 + atoms.length, `总长 ${total} 应贴近预算 160`);
    assert.ok(atoms[0].text.length <= 132); // 单原子 ≈ 160/5=32 字 + 省略号内余量
  });

  it("relevanceScore 降序：非主证据中分高者排前", async () => {
    // 在 kp-ev 上补一条高分的 atom-c 绑定（非主）：主证据仍最前，其后按分值降序
    await prisma.clewKnowledgePointEvidence.create({
      data: { kpId: "kp-ev", evidenceId: "atom-c", isPrimary: false, relevanceScore: 0.9 },
    });
    const atoms = await loadClewKpEvidenceContext("kp-ev", { maxAtoms: 5, maxChars: 4000 });
    assert.ok(atoms);
    assert.equal(atoms[0].page, 3); // isPrimary 仍最前
    assert.equal(atoms[1].page, 5); // relevanceScore 0.9 次之
    assert.equal(atoms[2].page, 4); // 无分者最后
  });
});
