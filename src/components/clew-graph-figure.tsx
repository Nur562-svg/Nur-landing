"use client";

import Link from "next/link";
import { useMemo } from "react";
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
 * （实心 = 已有讲义=已学过；描边 = 未学；加粗环 = 当前知识点）。
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

  return (
    <figure className={styles.graphFigure}>
      <svg
        className={styles.graphSvg}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        role="img"
        aria-label={`本章知识点关系图（只读）：${graph.nodes.length} 个知识点，先修 ${stats.prerequisiteEdges} 条，术语关联 ${stats.termEdges} 条；实心节点为已学过`}
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
          if (edge.kind === "prerequisite") {
            return (
              <line
                key={`${edge.kind}:${edge.from}:${edge.to}`}
                {...line}
                className={styles.graphEdgePrereq}
                markerEnd="url(#clew-graph-arrow)"
              />
            );
          }
          return (
            <g key={`${edge.kind}:${edge.from}:${edge.to}`}>
              <line {...line} className={styles.graphEdgeTerm} />
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
          const prerequisiteCount = incomingPrerequisiteCount.get(node.id) ?? 0;
          const termCount = incidentTermCount.get(node.id) ?? 0;
          return (
            <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
              <Link
                href={`/learn/clew/t/${textbookId}/c/${chapterOrder}?kp=${node.id}`}
                className={styles.graphNodeLink}
                aria-label={`知识点 ${node.title}，${node.hasLesson ? "已学过，" : "未学，"}先修 ${prerequisiteCount} 条，术语关联 ${termCount} 条`}
                aria-current={isActive ? "true" : undefined}
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
        实线箭头 = 先修关系，虚线 = 共享术语（数字为共享数）；实心节点 = 已有讲义（已学过），空心 = 未学，加粗环 = 当前知识点。
      </figcaption>
    </figure>
  );
}
