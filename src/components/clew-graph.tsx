"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ClewKnowledgePointStudySummary } from "@/types/clew";
import { buildClewKpGraph, type ClewGraphEdge } from "@/lib/clew/knowledge-graph";
import { ClewGraphFigure } from "./clew-graph-figure";
import styles from "./clew.module.css";

/**
 * Clew 章级知识结构（图谱改良，2026-10-05 讨论定案）：
 * 默认 = 先修链列表（每行 = 知识点 → 先修状态 → 术语关联；点行跳转 KP），
 * 关系边 ≥3 时可切换到 SVG 关系图（节点按掌握状态着色）。
 * 设计依据：概念图证据在「自己构建」，只读图偏导航/元认知；多数时刻要的是「下一步」而非全景
 * （Khan/Duolingo 实践 + Obsidian local graph 共识），故列表为默认、图为可选。
 * 纪律不变：关系来自 buildClewKpGraph 程序校验；未匹配/成环如实展示，不伪造。
 */

type ClewGraphProps = {
  knowledgePoints: readonly ClewKnowledgePointStudySummary[];
  activeKpId: string;
  textbookId: string;
  chapterOrder: number;
};

/** 先修边的掌握状态（节点级）：hasLesson = 已学过（浅证据，如实命名）。 */
function prerequisiteStates(
  edges: readonly ClewGraphEdge[],
  nodes: readonly ClewKnowledgePointStudySummary[],
): Map<string, { title: string; hasLesson: boolean }[]> {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const map = new Map<string, { title: string; hasLesson: boolean }[]>();
  for (const edge of edges) {
    if (edge.kind !== "prerequisite") {
      continue;
    }
    const target = byId.get(edge.from);
    if (!target) {
      continue;
    }
    const list = map.get(edge.to) ?? [];
    list.push({ title: target.title, hasLesson: target.hasLesson });
    map.set(edge.to, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.title.localeCompare(b.title, "zh-Hans-CN"));
  }
  return map;
}

function termNeighborCount(edges: readonly ClewGraphEdge[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const edge of edges) {
    if (edge.kind !== "term") {
      continue;
    }
    counts.set(edge.from, (counts.get(edge.from) ?? 0) + 1);
    counts.set(edge.to, (counts.get(edge.to) ?? 0) + 1);
  }
  return counts;
}

export function ClewGraph({ knowledgePoints, activeKpId, textbookId, chapterOrder }: ClewGraphProps) {
  const [showFigure, setShowFigure] = useState(false);
  const graph = useMemo(() => buildClewKpGraph(knowledgePoints), [knowledgePoints]);
  const { stats } = graph;
  const prereqStates = useMemo(() => prerequisiteStates(graph.edges, graph.nodes), [graph]);
  const termCounts = useMemo(() => termNeighborCount(graph.edges), [graph]);
  const totalEdges = stats.prerequisiteEdges + stats.termEdges;
  const graphWorthIt = totalEdges >= 3;

  if (knowledgePoints.length === 0) {
    return (
      <section className={styles.graphPanel} aria-labelledby="clew-graph-title">
        <div className={styles.panelHead}>
          <h2 id="clew-graph-title">本章知识结构</h2>
        </div>
        <p className={styles.graphEmpty}>本章还没有知识点。</p>
      </section>
    );
  }

  return (
    <section className={styles.graphPanel} aria-labelledby="clew-graph-title">
      <div className={styles.panelHead}>
        <h2 id="clew-graph-title">本章知识结构</h2>
        <p>
          {graph.nodes.length} 个知识点 · 先修 {stats.prerequisiteEdges} 条 · 术语关联 {stats.termEdges} 条
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

      {showFigure && graphWorthIt ? (
        <ClewGraphFigure
          graph={graph}
          activeKpId={activeKpId}
          textbookId={textbookId}
          chapterOrder={chapterOrder}
        />
      ) : (
        <ul className={styles.structureList} aria-label="本章知识点先修链">
          {graph.nodes.map((node) => {
            const prerequisites = prereqStates.get(node.id) ?? [];
            const termCount = termCounts.get(node.id) ?? 0;
            const unlearned = prerequisites.filter((item) => !item.hasLesson);
            return (
              <li key={node.id} className={node.id === activeKpId ? styles.structureRowActive : undefined}>
                <Link
                  className={styles.structureRow}
                  href={`/learn/clew/t/${textbookId}/c/${chapterOrder}?kp=${node.id}`}
                  aria-current={node.id === activeKpId ? "true" : undefined}
                >
                  <span className={styles.structureIndex}>{String(node.order).padStart(2, "0")}</span>
                  <span className={styles.structureMain}>
                    <span className={styles.structureTitle}>
                      {node.title}
                      {node.hasLesson ? <em className={styles.structureLearned}>已学过</em> : null}
                    </span>
                    <span className={styles.structureMeta}>
                      {prerequisites.length === 0
                        ? "无同章先修"
                        : `先修 ${prerequisites.length} 条：${prerequisites
                            .map((item) => (item.hasLesson ? `✓${item.title}` : `○${item.title}`))
                            .join("、")}`}
                      {termCount > 0 ? ` · 术语关联 ${termCount} 处` : ""}
                    </span>
                  </span>
                  {unlearned.length > 0 ? (
                    <span className={styles.structureGap}>先修未学 {unlearned.length}</span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div className={styles.structureFoot}>
        {graphWorthIt ? (
          <button
            type="button"
            className={styles.lessonFoldToggle}
            onClick={() => setShowFigure((current) => !current)}
          >
            {showFigure ? "回到先修链列表" : "查看关系图"}
          </button>
        ) : totalEdges > 0 ? (
          <span className={styles.structureFootNote}>关系较少，以列表呈现更清楚。</span>
        ) : (
          <span className={styles.structureFootNote}>本章知识点之间暂无程序可确认的先修/术语关系。</span>
        )}
      </div>
    </section>
  );
}
