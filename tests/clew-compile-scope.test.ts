import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ZCODE-M3 Phase 3：编译范围过滤与指纹决策（纯函数）

describe("Clew compile scope", async () => {
  const { filterCompileChapters, resolveCompileScope } = await import("@/lib/clew/compile-scope");

  const chapters = [
    { id: "c1", order: 1, title: "已萃取", status: "extracted" as const },
    { id: "c2", order: 2, title: "未萃取", status: "pending" as const },
    { id: "c3", order: 3, title: "失败", status: "failed" as const },
    { id: "c4", order: 4, title: "萃取中", status: "extracting" as const },
  ];

  it("pending 过滤：pending + failed 计入，extracted/extracting 排除", () => {
    const pending = filterCompileChapters(chapters, "pending");
    assert.deepEqual(pending.map((chapter) => chapter.id), ["c2", "c3"]);
  });

  it("all 范围返回全部章节（副本，不共享引用数组）", () => {
    const all = filterCompileChapters(chapters, "all");
    assert.equal(all.length, 4);
    assert.notEqual(all, chapters);
  });

  it("无待编译章节返回空数组", () => {
    const pending = filterCompileChapters(
      chapters.filter((chapter) => chapter.status === "extracted"),
      "pending",
    );
    assert.deepEqual(pending, []);
  });

  it("指纹相同 / 缺失：沿用请求的 scope，不强制", () => {
    assert.deepEqual(resolveCompileScope("pending", "fp-1", "fp-1"), { scope: "pending" });
    assert.deepEqual(resolveCompileScope("all", "fp-1", "fp-1"), { scope: "all" });
    assert.deepEqual(resolveCompileScope("pending", "", "fp-1"), { scope: "pending" });
    assert.deepEqual(resolveCompileScope("pending", "fp-1", null), { scope: "pending" });
    assert.deepEqual(resolveCompileScope("pending", null, null), { scope: "pending" });
  });

  it("指纹不同：强制 all 并给出提示文案", () => {
    const resolved = resolveCompileScope("pending", "fp-old", "fp-new");
    assert.equal(resolved.scope, "all");
    assert.equal(resolved.forcedNote, "检测到教材内容已变化，本次改为全量编译。");
    // 已请求 all 时同样保持 all（无额外提示）
    assert.deepEqual(resolveCompileScope("all", "fp-old", "fp-new"), {
      scope: "all",
      forcedNote: "检测到教材内容已变化，本次改为全量编译。",
    });
  });

  it("空字符串指纹 trim 后视为缺失", () => {
    assert.deepEqual(resolveCompileScope("pending", "   ", "fp-1"), { scope: "pending" });
  });
});
