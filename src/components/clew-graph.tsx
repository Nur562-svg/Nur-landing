"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { ClewKnowledgePointStudySummary } from "@/types/clew";
import {
  buildClewKpGraph,
  layoutClewKpGraph,
  type ClewGraphEdge,
} from "@/lib/clew/knowledge-graph";
import styles from "./clew.module.css";

/**
 * Clew 章级知识图谱（ZCODE-M4 Phase 2，纯 SVG 只读展示）：
 * 先修边 = 实线箭头，术语边 = 虚线；节点可点击跳转对应 KP 学习页（复用既有 URL 形态）。
 * 纪律：只读（不支持拖节点、手动加删边）；关系来自 buildClewKpGraph 的程序校验结果；
 * 未匹配/成环等被忽略的关系如实展示，不伪造。
 */

type ClewGraphProps = {
  knowledgePoints: readonly ClewKnowledgePointStudySummary[];
  activeKpId: string;
  textbookId: string;
  chapterOrder: number;
};

const NODE_RADIUS = 14;
const NODE_TITLE_MAX_CHARS = 10;

function formatNodeTitle(title: string): string {
  return title.length > NODE_TITLE_MAX_CHARS
    ? `${title.slice(0, NODE_TITLE_MAX_CHARS)}…`
    : title;
}

/** 把边端点收缩到节点圆外，避免线压住圆点。 */
function trimmedLine(x1: number, y1: number, x2: number, y2: number): {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} {
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

export function ClewGraph({ knowledgePoints, activeKpId, textbookId, chapterOrder }: ClewGraphProps) {
  const graph = useMemo(() => buildClewKpGraph(knowledgePoints), [knowledgePoints]);
  const layout = useMemo(() => layoutClewKpGraph(graph), [graph]);
  const { stats } = graph;

  const titleById = useMemo(
    () => new Map(graph.nodes.map((node) => [node.id, node.title])),
    [graph.nodes],
  );

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

  if (knowledgePoints.length < 2) {
    return (
      <section className={styles.graphPanel} aria-labelledby="clew-graph-title">
        <div className={styles.panelHead}>
          <h2 id="clew-graph-title">知识图谱</h2>
        </div>
        <p className={styles.graphEmpty}>
          本章只有 {knowledgePoints.length} 个知识点，暂无可视化关系。
        </p>
      </section>
    );
  }

  return (
    <section className={styles.graphPanel} aria-labelledby="clew-graph-title">
      <div className={styles.panelHead}>
        <h2 id="clew-graph-title">知识图谱</h2>
        <p>
          {graph.nodes.length} 个知识点 · 先修 {stats.prerequisiteEdges} 条 · 术语关联{" "}
          {stats.termEdges} 条
        </p>
      </div>

      {stats.unmatchedPrerequisites > 0 ? (
        <p className={styles.graphHonest}>
          {stats.unmatchedPrerequisites} 条先修引用未匹配到同章知识点，已忽略。
        </p>
      ) : null}
      {stats.droppedCycleEdges > 0 ? (
        <p className={styles.graphHonest}>已删除 {stats.droppedCycleEdges} 条成环先修边。</p>
      ) : null}

      <figure className={styles.graphFigure}>
        <svg
          className={styles.graphSvg}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          role="img"
          aria-label={`本章知识点关系图（只读）：${graph.nodes.length} 个知识点，先修 ${stats.prerequisiteEdges} 条，术语关联 ${stats.termEdges} 条`}
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
                  aria-label={`知识点 ${node.title}，先修 ${prerequisiteCount} 条，术语关联 ${termCount} 条`}
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
          图谱为只读派生：实线箭头为先修关系，虚线为共享术语（数字为共享数）；点击节点跳转对应知识点学习页。
        </figcaption>
      </figure>

      <ul className={styles.graphRelationList} aria-label="知识点关系清单">
        {graph.edges.map((edge) => {
          const fromTitle = titleById.get(edge.from) ?? edge.from;
          const toTitle = titleById.get(edge.to) ?? edge.to;
          return (
            <li key={`${edge.kind}:${edge.from}:${edge.to}`}>
              {edge.kind === "prerequisite"
                ? `「${fromTitle}」先修于「${toTitle}」`
                : `「${fromTitle}」与「${toTitle}」共享术语：${(edge.sharedTerms ?? []).join("、")}`}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
