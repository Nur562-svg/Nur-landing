/**
 * Clew 章级知识图谱构建与布局（ZCODE-M4 Phase 2，纯函数、client-safe）。
 * 知纲纪律：关系必须经程序校验（自环丢弃、去重、环检测），不信任未校验输出；
 * 布局确定性（同输入必得同输出）；只读浏览，不引入任何图形库。
 * 输入 = 学习页 ClewChapterStudyView.knowledgePoints（已含 keyTerms/prerequisites）。
 */

export type ClewGraphEdgeKind = "prerequisite" | "term";

export type ClewGraphNodeInput = {
  id: string;
  order: number;
  title: string;
  keyTerms: readonly string[];
  prerequisites: readonly string[];
};

export type ClewGraphNode = ClewGraphNodeInput;

export type ClewGraphEdge = {
  from: string;
  to: string;
  kind: ClewGraphEdgeKind;
  /** 仅 term 边：两知识点共享的术语（排序去重后）。 */
  sharedTerms?: string[];
};

export type ClewGraphStats = {
  prerequisiteEdges: number;
  termEdges: number;
  /** 先修标题在同章匹配不到 → 如实计数并忽略（不猜）。 */
  unmatchedPrerequisites: number;
  droppedSelfEdges: number;
  droppedDuplicateEdges: number;
  droppedCycleEdges: number;
};

export type ClewKpGraph<T extends ClewGraphNodeInput = ClewGraphNode> = {
  nodes: T[];
  edges: ClewGraphEdge[];
  stats: ClewGraphStats;
};

function normalizeTerms(terms: readonly string[]): string[] {
  return terms
    .map((term) => term.trim())
    .filter((term) => term.length > 0);
}

/** 交集（trim、去空串后比较，大小写敏感）；结果排序保证同输入同输出。 */
function intersectTerms(a: readonly string[], b: readonly string[]): string[] {
  const setB = new Set(normalizeTerms(b));
  const shared = [...new Set(normalizeTerms(a).filter((term) => setB.has(term)))];
  return shared.sort();
}

/** 泛型：nodes 保留输入节点的全部字段（如学习页摘要的 hasLesson）。 */
export function buildClewKpGraph<T extends ClewGraphNodeInput>(kps: readonly T[]): ClewKpGraph<T> {
  const stats: ClewGraphStats = {
    prerequisiteEdges: 0,
    termEdges: 0,
    unmatchedPrerequisites: 0,
    droppedSelfEdges: 0,
    droppedDuplicateEdges: 0,
    droppedCycleEdges: 0,
  };

  // 输出次序稳定：nodes 按 order 升序
  const nodes = [...kps].sort((a, b) => a.order - b.order);
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const nodeByTitle = new Map(nodes.map((node) => [node.title.trim(), node]));

  type PendingEdge = { from: string; to: string; kind: ClewGraphEdgeKind; sharedTerms?: string[] };
  const pending: PendingEdge[] = [];

  // 先修边：prerequisites 里的标题在同章按 trim 后全等匹配；匹配不到如实计数并忽略
  for (const node of nodes) {
    for (const rawTitle of node.prerequisites) {
      const title = rawTitle.trim();
      if (title.length === 0) {
        continue;
      }
      const target = nodeByTitle.get(title);
      if (!target) {
        stats.unmatchedPrerequisites += 1;
        continue;
      }
      if (target.id === node.id) {
        stats.droppedSelfEdges += 1;
        continue;
      }
      pending.push({ from: target.id, to: node.id, kind: "prerequisite" });
    }
  }

  // 术语边：两 KP 的 keyTerms 交集非空 → 无向邻接对出一条边（i<j，from=靠前者）
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const shared = intersectTerms(nodes[i].keyTerms, nodes[j].keyTerms);
      if (shared.length > 0) {
        pending.push({ from: nodes[i].id, to: nodes[j].id, kind: "term", sharedTerms: shared });
      }
    }
  }

  // 同对同 kind 去重（同对既有先修边又有术语边 → 两条都保留，语义不同）
  const seen = new Set<string>();
  let edges: ClewGraphEdge[] = [];
  for (const edge of pending) {
    const key = `${edge.kind}:${edge.from}:${edge.to}`;
    if (seen.has(key)) {
      stats.droppedDuplicateEdges += 1;
      continue;
    }
    seen.add(key);
    edges.push(edge);
  }

  // 环检测（仅先修边；DFS 三色）：删除该环中 to.order 最大的先修边，
  // 并列时删 from.order 最大的，再并列取 from.id 字典序最小者——同输入必得同输出。
  const orderById = new Map(nodes.map((node) => [node.id, node.order]));
  const removeCycleEdges = (): boolean => {
    const adjacency = new Map<string, { to: string; edge: ClewGraphEdge }[]>();
    const prerequisiteEdges = edges.filter((edge) => edge.kind === "prerequisite");
    for (const edge of prerequisiteEdges) {
      const list = adjacency.get(edge.from) ?? [];
      list.push({ to: edge.to, edge });
      adjacency.set(edge.from, list);
    }
    for (const list of adjacency.values()) {
      list.sort((a, b) => (orderById.get(a.to) ?? 0) - (orderById.get(b.to) ?? 0));
    }

    const WHITE = 0;
    const GRAY = 1;
    const BLACK = 2;
    const color = new Map(nodes.map((node) => [node.id, WHITE]));
    const stack: string[] = [];

    const visit = (startId: string): ClewGraphEdge[] | null => {
      color.set(startId, GRAY);
      stack.push(startId);
      for (const { to, edge } of adjacency.get(startId) ?? []) {
        const state = color.get(to) ?? WHITE;
        if (state === GRAY) {
          // 回边 startId→to：环 = 栈中从 to 到 startId 的路径 + 该回边
          const startIndex = stack.indexOf(to);
          if (startIndex < 0) {
            return [edge];
          }
          const cycleEdges: ClewGraphEdge[] = [];
          for (let k = startIndex; k < stack.length - 1; k += 1) {
            const from = stack[k];
            const step = adjacency
              .get(from)
              ?.find((entry) => entry.to === stack[k + 1]);
            if (step) {
              cycleEdges.push(step.edge);
            }
          }
          cycleEdges.push(edge);
          return cycleEdges;
        }
        if (state === WHITE) {
          const found = visit(to);
          if (found) {
            return found;
          }
        }
      }
      stack.pop();
      color.set(startId, BLACK);
      return null;
    };

    for (const node of nodes) {
      if ((color.get(node.id) ?? WHITE) !== WHITE) {
        continue;
      }
      const cycleEdges = visit(node.id);
      if (cycleEdges && cycleEdges.length > 0) {
        const victim = [...cycleEdges].sort((a, b) => {
          const toOrder = (orderById.get(b.to) ?? 0) - (orderById.get(a.to) ?? 0);
          if (toOrder !== 0) {
            return toOrder;
          }
          const fromOrder = (orderById.get(b.from) ?? 0) - (orderById.get(a.from) ?? 0);
          if (fromOrder !== 0) {
            return fromOrder;
          }
          return a.from < b.from ? -1 : a.from > b.from ? 1 : 0;
        })[0];
        edges = edges.filter((edge) => edge !== victim);
        stats.droppedCycleEdges += 1;
        return true;
      }
    }
    return false;
  };
  while (removeCycleEdges()) {
    // 每轮删除一条成环先修边，直至无环（层级布局恒可终止）
  }

  stats.prerequisiteEdges = edges.filter((edge) => edge.kind === "prerequisite").length;
  stats.termEdges = edges.filter((edge) => edge.kind === "term").length;

  // edges 按 (from.order, to.order, kind) 排序：同输入必同输出
  const kindRank = (kind: ClewGraphEdgeKind): number => (kind === "prerequisite" ? 0 : 1);
  edges.sort((a, b) => {
    const fromDiff = (orderById.get(a.from) ?? 0) - (orderById.get(b.from) ?? 0);
    if (fromDiff !== 0) {
      return fromDiff;
    }
    const toDiff = (orderById.get(a.to) ?? 0) - (orderById.get(b.to) ?? 0);
    if (toDiff !== 0) {
      return toDiff;
    }
    return kindRank(a.kind) - kindRank(b.kind);
  });

  return { nodes, edges, stats };
}

export type ClewGraphLayoutNode<T extends ClewGraphNodeInput = ClewGraphNode> = T & {
  layer: number;
  x: number;
  y: number;
};

export type ClewGraphLayout<T extends ClewGraphNodeInput = ClewGraphNode> = {
  width: number;
  height: number;
  nodes: ClewGraphLayoutNode<T>[];
  edges: ClewGraphEdge[];
};

/** 确定性布局：先修边最长路径分层（layer 0 = 无先修者），同层按 order 升序；不引入力导向。 */
export function layoutClewKpGraph<T extends ClewGraphNodeInput>(graph: ClewKpGraph<T>): ClewGraphLayout<T> {
  const { nodes, edges } = graph;
  const prerequisiteEdges = edges.filter((edge) => edge.kind === "prerequisite");
  const layer = new Map(nodes.map((node) => [node.id, 0]));

  // 最长路径松弛：DAG 上至多 nodes.length 轮收敛
  for (let round = 0; round < nodes.length; round += 1) {
    let changed = false;
    for (const edge of prerequisiteEdges) {
      const next = (layer.get(edge.from) ?? 0) + 1;
      if (next > (layer.get(edge.to) ?? 0)) {
        layer.set(edge.to, next);
        changed = true;
      }
    }
    if (!changed) {
      break;
    }
  }

  const byLayer = new Map<number, T[]>();
  for (const node of nodes) {
    const current = layer.get(node.id) ?? 0;
    const list = byLayer.get(current) ?? [];
    list.push(node);
    byLayer.set(current, list);
  }
  for (const list of byLayer.values()) {
    list.sort((a, b) => a.order - b.order);
  }

  const maxLayer = nodes.length > 0 ? Math.max(...[...byLayer.keys()]) : -1;
  const maxLayerCount = Math.max(0, ...[...byLayer.values()].map((list) => list.length));

  const layoutNodes: ClewGraphLayoutNode<T>[] = nodes.map((node) => {
    const current = layer.get(node.id) ?? 0;
    const indexInLayer = (byLayer.get(current) ?? []).findIndex((item) => item.id === node.id);
    return {
      ...node,
      layer: current,
      x: 80 + current * 220,
      y: 60 + Math.max(0, indexInLayer) * 96,
    };
  });

  return {
    width: Math.max(560, (maxLayer + 1) * 220 + 160),
    height: Math.max(280, maxLayerCount * 96 + 120),
    nodes: layoutNodes,
    edges,
  };
}
