"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ClewKnowledgePointStudySummary } from "@/types/clew";
import {
  layoutClewKpGraph,
  type ClewGraphEdge,
  type ClewKpGraph,
} from "@/lib/clew/knowledge-graph";
import styles from "./clew.module.css";

/**
 * 章级关系图（可选视图，2026-10-05 图谱改良从默认位退到切换位）：
 * 纯 SVG 只读；先修边 = 实线箭头，术语边 = 虚线；节点按掌握状态着色
 * （橄榄实心 = 已有讲义=已学过〔状态色，dataviz V-2〕；描边 = 未学；朱砂加粗环 = 当前知识点）。
 * 悬停节点 → 高亮相邻边与邻居、其余退隐（V-2 邻接高亮）。
 */

const NODE_RADIUS = 14;
const NODE_TITLE_MAX_CHARS = 10;

function formatNodeTitle(title: string): string {
  return title.length > NODE_TITLE_MAX_CHARS
    ? `${title.slice(0, NODE_TITLE_MAX_CHARS)}…`
    : title;
}

/** 把边端点收缩到节点圆外，避免线压住圆点。 */
function trimmedLine(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  if (length <= NODE_RADIUS * 2 + 4) {
    return { x1, y1, x2, y2 };
  }
  const ux = dx / length;
  const uy = dy / length;
  return {
    x1: x1 + ux * (NODE_RADIUS + 2),
    y1: y1 + uy * (NODE_RADIUS + 2),
    x2: x2 - ux * (NODE_RADIUS + 2),
    y2: y2 - uy * (NODE_RADIUS + 2),
  };
}

export function ClewGraphFigure({
  graph,
  activeKpId,
  textbookId,
  chapterOrder,
}: {
  graph: ClewKpGraph<ClewKnowledgePointStudySummary>;
  activeKpId: string;
  textbookId: string;
  chapterOrder: number;
}) {
  const layout = useMemo(() => layoutClewKpGraph(graph), [graph]);
  const { stats } = graph;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /** 邻接表：节点 id → 相邻节点 id 集合（含自身；双向注册）。 */
  const adjacency = useMemo(() => {
    const adjacency = new Map<string, Set<string>>();
    for (const node of graph.nodes) {
      adjacency.set(node.id, new Set([node.id]));
    }
    for (const edge of graph.edges) {
      adjacency.get(edge.from)?.add(edge.to);
      adjacency.get(edge.to)?.add(edge.from);
    }
    return adjacency;
  }, [graph.nodes, graph.edges]);

  const incomingPrerequisiteCount = useMemo(() => {
    const counts = new Map<string, number>();
    for (const edge of graph.edges) {
      if (edge.kind === "prerequisite") {
        counts.set(edge.to, (counts.get(edge.to) ?? 0) + 1);
      }
    }
    return counts;
  }, [graph.edges]);

  const incidentTermCount = useMemo(() => {
    const counts = new Map<string, number>();
    for (const edge of graph.edges) {
      if (edge.kind === "term") {
        counts.set(edge.from, (counts.get(edge.from) ?? 0) + 1);
        counts.set(edge.to, (counts.get(edge.to) ?? 0) + 1);
      }
    }
    return counts;
  }, [graph.edges]);

  // 审查修正：边高亮 = 悬停节点是该边的端点（原实现把 hoveredId 当出边源查询——入边不亮、二跳误亮）
  const isEdgeAdjacent = (from: string, to: string): boolean =>
    hoveredId !== null && (hoveredId === from || hoveredId === to);

  return (
    <figure
      className={styles.graphFigure}
      data-hovering={hoveredId !== null ? "true" : undefined}
      // 键盘焦点离开图谱后复位高亮（审查修正：onFocus 设 hoveredId 无复位会永久驻留）
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHoveredId(null);
        }
      }}
    >
      <svg
        className={styles.graphSvg}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        role="img"
        aria-label={`本章知识点关系图（只读）：${graph.nodes.length} 个知识点，先修 ${stats.prerequisiteEdges} 条，术语关联 ${stats.termEdges} 条；实心节点为已学过`}
        onMouseLeave={() => setHoveredId(null)}
      >
        <defs>
          <marker
            id="clew-graph-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" className={styles.graphArrow} />
          </marker>
        </defs>

        {graph.edges.map((edge: ClewGraphEdge) => {
          const from = layout.nodes.find((node) => node.id === edge.from);
          const to = layout.nodes.find((node) => node.id === edge.to);
          if (!from || !to) {
            return null;
          }
          const line = trimmedLine(from.x, from.y, to.x, to.y);
          const adjacent = isEdgeAdjacent(edge.from, edge.to);
          if (edge.kind === "prerequisite") {
            return (
              <line
                key={`${edge.kind}:${edge.from}:${edge.to}`}
                {...line}
                className={[
                  styles.graphEdgePrereq,
                  adjacent ? styles.graphEdgeAdjacent : "",
                ].join(" ").trim()}
                markerEnd="url(#clew-graph-arrow)"
              />
            );
          }
          return (
            <g key={`${edge.kind}:${edge.from}:${edge.to}`}>
              <line
                {...line}
                className={[
                  styles.graphEdgeTerm,
                  adjacent ? styles.graphEdgeAdjacent : "",
                ].join(" ").trim()}
              />
              {edge.sharedTerms && edge.sharedTerms.length > 0 ? (
                <text
                  className={styles.graphTermCount}
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 6}
                  textAnchor="middle"
                >
                  {edge.sharedTerms.length}
                </text>
              ) : null}
            </g>
          );
        })}

        {layout.nodes.map((node) => {
          const isActive = node.id === activeKpId;
          const isNeighbor = hoveredId !== null && (adjacency.get(hoveredId)?.has(node.id) ?? false);
          const dimmed = hoveredId !== null && hoveredId !== node.id && !isNeighbor;
          const prerequisiteCount = incomingPrerequisiteCount.get(node.id) ?? 0;
          const termCount = incidentTermCount.get(node.id) ?? 0;
          return (
            <g
              key={node.id}
              transform={`translate(${node.x} ${node.y})`}
              className={dimmed ? styles.graphNodeDimmed : undefined}
            >
              <Link
                href={`/learn/clew/t/${textbookId}/c/${chapterOrder}?kp=${node.id}`}
                className={styles.graphNodeLink}
                aria-label={`知识点 ${node.title}，${node.hasLesson ? "已学过，" : "未学，"}先修 ${prerequisiteCount} 条，术语关联 ${termCount} 条`}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={() => setHoveredId(node.id)}
                onFocus={() => setHoveredId(node.id)}
              >
                <title>{node.title}</title>
                <circle
                  r={NODE_RADIUS}
                  className={[
                    styles.graphNodeCircle,
                    node.hasLesson ? styles.graphNodeHasLesson : "",
                    isActive ? styles.graphNodeActive : "",
                  ].join(" ").trim()}
                />
                <text className={styles.graphNodeIndex} y={4} textAnchor="middle">
                  {String(node.order).padStart(2, "0")}
                </text>
                <text
                  className={isActive ? styles.graphNodeTitleActive : styles.graphNodeTitle}
                  y={NODE_RADIUS + 20}
                  textAnchor="middle"
                >
                  {formatNodeTitle(node.title)}
                </text>
              </Link>
            </g>
          );
        })}
      </svg>
      <figcaption className={styles.graphCaption}>
        实线箭头 = 先修关系，虚线 = 共享术语（数字为共享数）；橄榄实心节点 = 已有讲义（已学过），空心 = 未学，朱砂环 = 当前知识点；悬停或聚焦节点可高亮其直接关系。
      </figcaption>
    </figure>
  );
}
