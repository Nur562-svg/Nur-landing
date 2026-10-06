import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * ZCODE-M6-B：跨 KP 跳转建议（D10）——确定性匹配纯函数。
 * 锁定：标题命中优先 / 术语命中（长度门槛）/ 排除当前 KP / 去重 / 上限 2 / 空回答零命中 / 不硬凑。
 */

describe("跨 KP 跳转建议匹配（matchClewKpSuggestions）", async () => {
  const { matchClewKpSuggestions, MAX_KP_SUGGESTIONS } = await import("@/lib/clew/kp-suggestions");

  const candidates = [
    { kpId: "kp-1", title: "胸骨角", keyTerms: ["胸骨角", "计数标志"], href: "/learn/clew/t/tb/c/1?kp=kp-1" },
    { kpId: "kp-2", title: "人体解剖姿势", keyTerms: ["解剖姿势", "标准姿势"], href: "/learn/clew/t/tb/c/1?kp=kp-2" },
    { kpId: "kp-3", title: "呼吸系统", keyTerms: ["肺", "气管"], href: "/learn/clew/t/tb/c/2?kp=kp-3" },
  ];

  it("回答提到其他 KP 标题 → 命中并排除当前 KP", () => {
    const hits = matchClewKpSuggestions(
      "人体解剖姿势是描述方位的基础，先明确标准姿势。",
      candidates,
      "kp-1",
    );
    assert.equal(hits.length, 1);
    assert.equal(hits[0].kpId, "kp-2");
  });

  it("当前 KP 自身不命中（即使回答复述其标题/术语）", () => {
    const hits = matchClewKpSuggestions(
      "胸骨角是重要的计数标志。",
      candidates,
      "kp-1",
    );
    assert.equal(hits.length, 0);
  });

  it("术语命中（标题未出现）→ 命中", () => {
    const hits = matchClewKpSuggestions(
      "气管软骨的分布与肺段结构相关。",
      candidates,
      "kp-1",
    );
    assert.equal(hits.length, 1);
    assert.equal(hits[0].kpId, "kp-3");
  });

  it("单字术语不参与匹配（长度门槛挡虚词误命中）", () => {
    const hits = matchClewKpSuggestions(
      "这与上述内容一致。",
      [{ kpId: "kp-9", title: "无关知识点", keyTerms: ["述"], href: "/x" }],
      "kp-1",
    );
    assert.equal(hits.length, 0);
  });

  it("上限 2 条；标题命中优先于术语", () => {
    const many = [
      ...candidates,
      { kpId: "kp-4", title: "肺段", keyTerms: ["肺"], href: "/y" },
    ];
    const hits = matchClewKpSuggestions(
      "人体解剖姿势与呼吸系统、肺段都有关联，肺也很重要。",
      many,
      "kp-1",
    );
    assert.equal(hits.length, MAX_KP_SUGGESTIONS);
    assert.equal(hits[0].kpId, "kp-2"); // 标题命中排最前
  });

  it("空回答与不相关回答零命中（不硬凑）", () => {
    assert.equal(matchClewKpSuggestions("", candidates, "kp-1").length, 0);
    assert.equal(matchClewKpSuggestions("这是别的学科内容。", candidates, "kp-1").length, 0);
  });
});
