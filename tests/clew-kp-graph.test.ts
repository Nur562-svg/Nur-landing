import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * ZCODE-M4 Phase 2：章级知识图谱构建与布局（纯函数）。
 * 知纲纪律：先修/术语关系必须经程序校验（trim 全等匹配、自环丢弃、去重、DFS 三色环检测）；
 * 布局确定性（同输入必得同输出）；未匹配先修如实计数并忽略。
 */

function kp(
  id: string,
  order: number,
  title: string,
  keyTerms: string[],
  prerequisites: string[],
) {
  return { id, order, title, keyTerms, prerequisites };
}

describe("Clew 章级知识图谱构建", async () => {
  const { buildClewKpGraph, layoutClewKpGraph } = await import(
    "../src/lib/clew/knowledge-graph"
  );

  it("先修边：trim 后全等匹配；术语边：交集非空出边且记录共享术语", () => {
    const graph = buildClewKpGraph([
      kp("a", 1, "营气", ["营气", "卫气"], []),
      kp("b", 2, "气血津液", [" 卫气 ", "津液", ""], ["营气"]),
      kp("c", 3, "辨证", ["x", "营气"], [" 气血津液"]),
    ]);

    assert.deepEqual(
      graph.edges
        .filter((edge) => edge.kind === "prerequisite")
        .map((edge) => [edge.from, edge.to]),
      [
        ["a", "b"],
        ["b", "c"],
      ],
    );
    const termEdges = graph.edges.filter((edge) => edge.kind === "term");
    assert.equal(termEdges.length, 2);
    const shared = new Map(
      termEdges.map((edge) => [`${edge.from}:${edge.to}`, edge.sharedTerms]),
    );
    assert.deepEqual(shared.get("a:b"), ["卫气"]);
    assert.deepEqual(shared.get("a:c"), ["营气"]);
    assert.equal(graph.stats.unmatchedPrerequisites, 0);
  });

  it("未匹配先修如实计数并忽略；自环丢弃；同对同 kind 去重；同对两种边都保留", () => {
    const graph = buildClewKpGraph([
      kp("a", 1, "A", ["t1", "t2"], ["B", " B", "A", "不存在的知识点"]),
      kp("b", 2, "B", ["t1"], []),
    ]);
    // 先修边 a←b 一条（重复一条被丢弃）；自环 1；未匹配 1
    const prereq = graph.edges.filter((edge) => edge.kind === "prerequisite");
    assert.equal(prereq.length, 1);
    assert.deepEqual([prereq[0].from, prereq[0].to], ["b", "a"]);
    assert.equal(graph.stats.droppedDuplicateEdges, 1);
    assert.equal(graph.stats.droppedSelfEdges, 1);
    assert.equal(graph.stats.unmatchedPrerequisites, 1);
    // 术语边 a-b 保留（与先修边语义不同）
    assert.equal(graph.edges.filter((edge) => edge.kind === "term").length, 1);
  });

  it("大小写敏感：ABC 与 abc 无交集；空术语被过滤", () => {
    const graph = buildClewKpGraph([
      kp("a", 1, "A", ["ABC", ""], []),
      kp("b", 2, "B", ["abc"], []),
    ]);
    assert.equal(graph.edges.length, 0);
    assert.equal(graph.stats.termEdges, 0);
  });

  it("环检测：A→C→B→A 删除 to.order 最大的先修边，图变无环", () => {
    const graph = buildClewKpGraph([
      kp("a", 1, "A", [], ["B"]),
      kp("b", 2, "B", [], ["C"]),
      kp("c", 3, "C", [], ["A"]),
    ]);
    assert.equal(graph.stats.droppedCycleEdges, 1);
    // 被删的是 a→c（to.order=3 最大）
    const prereq = graph.edges.filter((edge) => edge.kind === "prerequisite");
    assert.deepEqual(
      prereq.map((edge) => [edge.from, edge.to]),
      [
        ["b", "a"],
        ["c", "b"],
      ],
    );
    // stats 与 edges 自洽
    assert.equal(
      graph.stats.prerequisiteEdges + graph.stats.termEdges,
      graph.edges.length,
    );
  });

  it("输出次序稳定：nodes 按 order 升序，edges 按 (from.order, to.order, kind)", () => {
    const input = [
      kp("c", 3, "C", ["t"], ["A"]),
      kp("a", 1, "A", ["t"], []),
      kp("b", 2, "B", ["t"], []),
    ];
    const graph = buildClewKpGraph(input);
    assert.deepEqual(
      graph.nodes.map((node) => node.id),
      ["a", "b", "c"],
    );
    // 排序 = (from.order, to.order, kind)，先修边(rank 0)先于同对术语边(rank 1)
    assert.deepEqual(
      graph.edges.map((edge) => [edge.from, edge.to, edge.kind]),
      [
        ["a", "b", "term"],
        ["a", "c", "prerequisite"],
        ["a", "c", "term"],
        ["b", "c", "term"],
      ],
    );
    // 同输入必得同输出
    assert.deepEqual(buildClewKpGraph(input), graph);
  });

  it("布局：无先修者 layer 0、最长路径分层、坐标有限、同输入两次 deepEqual", () => {
    const input = [
      kp("a", 1, "A", [], []),
      kp("b", 2, "B", [], ["A"]),
      kp("c", 3, "C", [], ["B"]),
      kp("d", 4, "D", [], ["A"]),
    ];
    const graph = buildClewKpGraph(input);
    const layout1 = layoutClewKpGraph(graph);
    const layout2 = layoutClewKpGraph(graph);
    assert.deepEqual(layout1, layout2);

    const byId = new Map(layout1.nodes.map((node) => [node.id, node]));
    assert.equal(byId.get("a")?.layer, 0);
    assert.equal(byId.get("b")?.layer, 1);
    assert.equal(byId.get("c")?.layer, 2);
    assert.equal(byId.get("d")?.layer, 1);
    assert.equal(byId.get("a")?.y, 60);
    assert.equal(byId.get("b")?.y, 60);
    assert.equal(byId.get("d")?.y, 156);
    for (const node of layout1.nodes) {
      assert.ok(Number.isFinite(node.x));
      assert.ok(Number.isFinite(node.y));
    }
    assert.equal(layout1.width, Math.max(560, 3 * 220 + 160));
    // 第 1 层有 2 个节点 → height = 2*96 + 120
    assert.equal(layout1.height, 2 * 96 + 120);
  });

  it("单节点与空数组不抛错", () => {
    const single = buildClewKpGraph([kp("a", 1, "A", ["t"], [])]);
    const singleLayout = layoutClewKpGraph(single);
    assert.equal(singleLayout.nodes.length, 1);
    assert.ok(Number.isFinite(singleLayout.width));
    const empty = buildClewKpGraph([]);
    assert.deepEqual(empty.edges, []);
    const emptyLayout = layoutClewKpGraph(empty);
    assert.equal(emptyLayout.nodes.length, 0);
    assert.ok(Number.isFinite(emptyLayout.width));
    assert.ok(Number.isFinite(emptyLayout.height));
  });
});
