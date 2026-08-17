import { describe, it } from "node:test";
import assert from "node:assert";
import { mergeRewriteIntoDraft } from "@/lib/agent-rewrite-merge";

describe("mergeRewriteIntoDraft", () => {
  it("fully replaces an empty or very short draft", () => {
    assert.deepStrictEqual(mergeRewriteIntoDraft("", "补充内容"), {
      merged: "补充内容",
      mode: "replace",
    });
    assert.deepStrictEqual(mergeRewriteIntoDraft("太短。", "补充内容"), {
      merged: "补充内容",
      mode: "replace",
    });
  });

  it("fully replaces an unrelated draft but keeps a related draft's sentences", () => {
    const unrelated = "今天天气很好，我们去公园散步，还买了冰淇淋，玩得很开心。";
    const result = mergeRewriteIntoDraft(unrelated, "消谷善饥是指食欲过于旺盛、食量增多，食后不久即感饥饿。");
    assert.strictEqual(result.mode, "replace");
    assert.strictEqual(result.merged, "消谷善饥是指食欲过于旺盛、食量增多，食后不久即感饥饿。");
  });

  it("inserts the proposal after the most relevant sentence while keeping the original", () => {
    const draft = "消谷善饥的病人食欲旺盛。中医认为与胃火有关。需要结合四诊复核。";
    const proposal = "消谷善饥又称多食易饥，需与消渴等兼症鉴别方向复核。";
    const result = mergeRewriteIntoDraft(draft, proposal);
    assert.strictEqual(result.mode, "insert");
    // 学生原句全部保留
    for (const sentence of ["消谷善饥的病人食欲旺盛。", "中医认为与胃火有关。", "需要结合四诊复核。"]) {
      assert.ok(result.merged.includes(sentence), `missing original sentence: ${sentence}`);
    }
    // 提案作为补充插入
    assert.ok(result.merged.includes(proposal));
    assert.ok(result.merged.includes("【Agent 补充"));
    // 补充插入在最相关句（含「消谷善饥」）之后，而不是开头
    assert.ok(result.merged.indexOf(proposal) > result.merged.indexOf("消谷善饥的病人食欲旺盛。"));
  });

  it("appends as a labeled insert for a related punctuation-less draft", () => {
    const draft = "消谷善饥病人表现为食欲旺盛食量增多且食后不久即感饥饿";
    const proposal = "消谷善饥的规范定义要素：食欲过于旺盛、食量增多、食后不久即饥饿。";
    const result = mergeRewriteIntoDraft(draft, proposal);
    assert.strictEqual(result.mode, "insert");
    assert.ok(result.merged.includes(draft), "original punctuation-less draft must be preserved");
    assert.ok(result.merged.includes("【Agent 补充"));
    assert.ok(result.merged.includes(proposal));
  });

  it("replaces an unrelated punctuation-less draft", () => {
    const draft = "一行与提案完全无关的较长回答文本用于验证无关时整体替换的行为逻辑";
    const proposal = "消谷善饥的规范定义要素：食欲过于旺盛、食量增多、食后不久即饥饿。";
    const result = mergeRewriteIntoDraft(draft, proposal);
    assert.strictEqual(result.mode, "replace");
    assert.strictEqual(result.merged, proposal);
  });

  it("always inserts a short supplement proposal even without lexical overlap", () => {
    const draft = "消谷善饥是指病人食欲过于旺盛、进食增多，但食后不久又感饥饿的表现。中医多认为与胃火炽盛有关。";
    const proposal = "该表现又称多食易饥。";
    const result = mergeRewriteIntoDraft(draft, proposal);
    assert.strictEqual(result.mode, "insert");
    for (const sentence of ["消谷善饥是指病人食欲过于旺盛、进食增多，但食后不久又感饥饿的表现。", "中医多认为与胃火炽盛有关。"]) {
      assert.ok(result.merged.includes(sentence), `missing original sentence: ${sentence}`);
    }
    assert.ok(result.merged.includes(proposal));
  });
});
