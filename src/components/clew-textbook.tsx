"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BookOpenCheck,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  GripVertical,
  Loader2,
  Merge,
  Pencil,
  Plus,
  RotateCcw,
  ScanSearch,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import type {
  ClewApiFailure,
  ClewChapterSource,
  ClewChapterStatus,
  ClewChapterView,
  ClewCompileEvent,
  ClewExtractEvent,
  ClewKnowledgePointView,
  ClewTextbookDetail,
  ClewTocEvent,
} from "@/types/clew";
import { isClewDocx, formatClewExtent, formatClewPageRange, formatClewSourcePage } from "@/lib/clew/source-label";
import { resolveClewGuide } from "@/lib/clew/step-guide";
import { V2Button } from "@/components/ui/v2/button";
import { ClewPathGuide } from "./clew-path-guide";
import styles from "./clew.module.css";

/**
 * Clew 教材详情（客户端）：目录识别（SSE 进度）+ 章节树 + 手动修正 + 知识点萃取。
 * 所有状态变更都经服务端 API；这里只负责展示与提交。
 */

type ClewTextbookDetailProps = {
  initialDetail: ClewTextbookDetail;
};

type ChapterDraftRow = {
  key: string;
  title: string;
  pageStart: string;
  pageEnd: string;
};

const sourceLabels: Record<ClewChapterSource, string> = {
  outline: "PDF 书签",
  "toc-page": "目录页识别",
  model: "模型解析",
  manual: "人工修正",
  "docx-heading": "DOCX 标题（页码待确认）",
};

const strategyLabels: Record<string, string> = {
  outline: "PDF 书签",
  "toc-page": "印刷目录页",
  model: "模型解析",
  none: "未识别",
  "docx-heading": "DOCX 标题",
};

const chapterStatusLabels: Record<ClewChapterStatus, string> = {
  pending: "未萃取",
  extracting: "萃取中",
  extracted: "已萃取",
  failed: "萃取失败",
};

const compileStateLabels: Record<string, string> = {
  uploaded: "尚未编译",
  toc_ready: "目录已识别",
  chapters_ready: "章节已确认",
  extracting: "编译中断（可继续）",
  ready: "编译完成",
  failed: "编译失败",
};

/** 相对时间（编译缓存「上次编译」行用）。 */
function formatRelativeTime(iso: string, nowMs: number = Date.now()): string {
  const at = Date.parse(iso);
  if (Number.isNaN(at)) {
    return "";
  }
  const minutes = Math.floor(Math.max(0, nowMs - at) / 60_000);
  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  return `${Math.floor(hours / 24)} 天前`;
}

function toDraftRows(chapters: readonly ClewChapterView[]): ChapterDraftRow[] {
  return chapters.map((chapter) => ({
    key: chapter.id,
    title: chapter.title,
    pageStart: String(chapter.pageStart),
    pageEnd: String(chapter.pageEnd),
  }));
}

export function ClewTextbookDetailView({ initialDetail }: ClewTextbookDetailProps) {
  const [detail, setDetail] = useState(initialDetail);
  const [progressLog, setProgressLog] = useState<string[]>([]);
  const [recognizing, setRecognizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [draftRows, setDraftRows] = useState<ChapterDraftRow[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [dragKey, setDragKey] = useState<string | null>(null);

  // 知识点萃取状态
  const [extractingOrder, setExtractingOrder] = useState<number | null>(null);
  const [extractLog, setExtractLog] = useState<string[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
  const [chapterKnowledgePoints, setChapterKnowledgePoints] = useState<Record<number, ClewKnowledgePointView[]>>({});

  // ZCODE-M3 Phase 3：全书编译（scope + 指纹 + 跨刷新续存）
  const [compileCache, setCompileCache] = useState<{ state: string; updatedAt: string } | null>(null);
  const [compiling, setCompiling] = useState(false);
  const [compileLog, setCompileLog] = useState<string[]>([]);
  const [compileDone, setCompileDone] = useState<string | null>(null);
  const [compileError, setCompileError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch(`/api/clew/textbooks/${initialDetail.textbook.id}/compile`);
        if (!response.ok) {
          return;
        }
        const payload = (await response.json()) as {
          ok: boolean;
          cache: { state: string; updatedAt: string } | null;
        };
        if (!cancelled && payload.ok) {
          setCompileCache(payload.cache);
        }
      } catch {
        // 编译缓存读取失败不阻塞页面（「上次编译」行缺省不显示）
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialDetail.textbook.id]);

  /** 编译后刷新章节状态与编译缓存（跨刷新续存的内存版）。 */
  async function refreshAfterCompile(): Promise<void> {
    try {
      const [detailResponse, cacheResponse] = await Promise.all([
        fetch(`/api/clew/textbooks/${initialDetail.textbook.id}`),
        fetch(`/api/clew/textbooks/${initialDetail.textbook.id}/compile`),
      ]);
      if (detailResponse.ok) {
        const payload = (await detailResponse.json()) as { ok: boolean; detail: ClewTextbookDetail };
        if (payload.ok) {
          setDetail(payload.detail);
        }
      }
      if (cacheResponse.ok) {
        const payload = (await cacheResponse.json()) as {
          ok: boolean;
          cache: { state: string; updatedAt: string } | null;
        };
        if (payload.ok) {
          setCompileCache(payload.cache);
        }
      }
    } catch {
      // 刷新失败保留现有状态；用户手动刷新页面仍能看到最新
    }
  }

  /** 编译全书（SSE：progress 文字流 → chapter 逐章 → done 汇总）。 */
  async function onCompile(scope: "pending" | "all") {
    if (compiling || editing) {
      return;
    }
    setCompiling(true);
    setCompileError(null);
    setCompileDone(null);
    setCompileLog([scope === "pending" ? "开始编译待萃取章节…" : "开始全量重新编译…"]);

    try {
      const response = await fetch(`/api/clew/textbooks/${textbook.id}/compile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope }),
      });
      await consumeSse(response, (raw) => {
        const event = raw as ClewCompileEvent;
        if (event.type === "progress") {
          setCompileLog((log) => [...log, event.progress.currentStep ?? event.progress.error ?? ""]);
        } else if (event.type === "chapter") {
          setCompileLog((log) => [
            ...log,
            event.outcome.ok
              ? `第 ${event.outcome.chapterOrder} 章《${event.outcome.chapterTitle}》：成功（${event.outcome.knowledgePointCount} 个知识点）`
              : `第 ${event.outcome.chapterOrder} 章《${event.outcome.chapterTitle}》：失败——${event.outcome.error ?? "未知错误"}`,
          ]);
        } else if (event.type === "done") {
          setCompileLog((log) => [...log, ...(event.notes.length > 0 ? event.notes.map((note) => `提示：${note}`) : [])]);
          setCompileDone(
            event.state === "ready"
              ? `编译完成：${event.succeededChapters} 章成功，共 ${event.knowledgePointCount} 个知识点${
                  event.failedChapters > 0 ? `；${event.failedChapters} 章失败已隔离` : ""
                }。`
              : "编译失败：本次没有章节成功，可到章节列表单独重试。",
          );
        } else {
          setCompileError(event.error);
        }
      });
      await refreshAfterCompile();
    } catch {
      setCompileError("编译失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setCompiling(false);
    }
  }

  const { textbook, chapters } = detail;
  const recognition = textbook.recognition;

  async function readFailure(response: Response): Promise<string> {
    try {
      const payload = (await response.json()) as ClewApiFailure;
      return payload.error ?? "服务返回异常，请稍后重试。";
    } catch {
      return "服务返回异常，请稍后重试。";
    }
  }

  async function onRecognize() {
    if (recognizing) {
      return;
    }
    setRecognizing(true);
    setError(null);
    setProgressLog([]);

    try {
      const response = await fetch(`/api/clew/textbooks/${textbook.id}/toc`, { method: "POST" });
      if (!response.ok || !response.body) {
        setError(await readFailure(response));
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          const dataLine = part.split("\n").find((line) => line.startsWith("data: "));
          if (!dataLine) {
            continue;
          }
          let event: ClewTocEvent;
          try {
            event = JSON.parse(dataLine.slice(6)) as ClewTocEvent;
          } catch {
            continue;
          }
          if (event.type === "progress") {
            setProgressLog((log) => [...log, event.message]);
          } else if (event.type === "result") {
            setDetail(event.detail);
          } else {
            setError(event.error);
          }
        }
      }
    } catch {
      setError("目录识别失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setRecognizing(false);
      setEditing(false);
    }
  }

  function onStartEdit() {
    setDraftRows(toDraftRows(chapters));
    setEditing(true);
    setError(null);
  }

  /** SSE 行解析（目录识别与知识点萃取共用）。 */
  async function consumeSse(
    response: Response,
    onEvent: (event: unknown) => void,
  ): Promise<void> {
    if (!response.ok || !response.body) {
      setError(await readFailure(response));
      return;
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";
      for (const part of parts) {
        const dataLine = part.split("\n").find((line) => line.startsWith("data: "));
        if (!dataLine) {
          continue;
        }
        try {
          onEvent(JSON.parse(dataLine.slice(6)));
        } catch {
          // 忽略无法解析的行
        }
      }
    }
  }

  /** 单章知识点萃取（SSE：进度 → 逐知识点 → 结果）。 */
  async function onExtractChapter(chapter: ClewChapterView) {
    if (extractingOrder !== null || editing) {
      return;
    }
    setExtractingOrder(chapter.order);
    setError(null);
    setExtractLog([`开始萃取《${chapter.title}》…`]);

    try {
      const response = await fetch(
        `/api/clew/textbooks/${textbook.id}/chapters/${chapter.order}/extract`,
        { method: "POST" },
      );
      await consumeSse(response, (raw) => {
        const event = raw as ClewExtractEvent;
        if (event.type === "progress") {
          setExtractLog((log) => [...log, event.message]);
        } else if (event.type === "kp") {
          setChapterKnowledgePoints((current) => ({
            ...current,
            [chapter.order]: [...(current[chapter.order] ?? []), event.knowledgePoint],
          }));
        } else if (event.type === "result") {
          setChapterKnowledgePoints((current) => ({
            ...current,
            [chapter.order]: event.result.knowledgePoints,
          }));
          setDetail((current) => ({
            ...current,
            chapters: current.chapters.map((row) =>
              row.order === event.result.chapter.order ? event.result.chapter : row,
            ),
          }));
          setExpandedOrders((current) => new Set(current).add(chapter.order));
          setExtractLog((log) => [...log, ...event.result.notes]);
        } else {
          setError(event.error);
        }
      });
    } catch {
      setError("知识点萃取失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setExtractingOrder(null);
    }
  }

  /** 展开章节：首次展开时按需拉取知识点。 */
  async function onToggleChapter(chapter: ClewChapterView) {
    const next = new Set(expandedOrders);
    if (next.has(chapter.order)) {
      next.delete(chapter.order);
      setExpandedOrders(next);
      return;
    }
    next.add(chapter.order);
    setExpandedOrders(next);
    if (chapterKnowledgePoints[chapter.order] === undefined && chapter.knowledgePointCount > 0) {
      try {
        const response = await fetch(
          `/api/clew/textbooks/${textbook.id}/chapters/${chapter.order}`,
        );
        const payload = (await response.json()) as
          | { ok: true; knowledgePoints: ClewKnowledgePointView[] }
          | ClewApiFailure;
        if (payload.ok) {
          setChapterKnowledgePoints((current) => ({
            ...current,
            [chapter.order]: payload.knowledgePoints,
          }));
        } else {
          setError(payload.error);
        }
      } catch {
        setError("知识点读取失败：网络或服务暂时不可用，请稍后重试。");
      }
    }
  }

  function updateRow(key: string, patch: Partial<ChapterDraftRow>) {
    setDraftRows((rows) => rows.map((row) => (row.key === key ? { ...row, ...patch } : row)));
  }

  const docx = isClewDocx(textbook.fileName);

  function onAddRow() {
    setDraftRows((rows) => {
      const last = rows[rows.length - 1];
      const start = docx ? 1 : (last ? Number.parseInt(last.pageEnd, 10) + 1 : 1);
      const end = docx ? 1 : Math.min(start, textbook.pageCount);
      return [
        ...rows,
        {
          key: `new-${Date.now()}-${rows.length}`,
          title: "",
          pageStart: String(start),
          pageEnd: String(end),
        },
      ];
    });
  }

  /** 最后一章已经到书末时，没有可新增的页码空间。DOCX 不靠页码分段。 */
  const lastDraftEnd = draftRows.length > 0
    ? Number.parseInt(draftRows[draftRows.length - 1].pageEnd, 10)
    : 0;
  const canAddChapter = docx || !Number.isFinite(lastDraftEnd) || lastDraftEnd < textbook.pageCount;

  /** SpineEditor 确认：校验并保存章节结构 + 盖确认章；确认后服务端才放行知识点萃取。 */
  async function onConfirm(rows: ChapterDraftRow[]) {
    if (confirming || rows.length === 0) {
      return;
    }
    setConfirming(true);
    setError(null);
    try {
      const response = await fetch(`/api/clew/textbooks/${textbook.id}/toc/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapters: rows.map((row) => ({
            title: row.title.trim(),
            pageStart: Number.parseInt(row.pageStart, 10),
            pageEnd: Number.parseInt(row.pageEnd, 10),
          })),
        }),
      });
      if (!response.ok) {
        setError(await readFailure(response));
        return;
      }
      const payload = (await response.json()) as { ok: true; detail: ClewTextbookDetail };
      setDetail(payload.detail);
      setEditing(false);
    } catch {
      setError("章节结构确认失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setConfirming(false);
      setDragKey(null);
    }
  }

  /** 拖拽排序：把 fromKey 行移动到 toKey 行的位置（仅编辑草稿内；PDF 保存时仍按起始页校验）。 */
  function reorderRows(fromKey: string, toKey: string) {
    setDraftRows((rows) => {
      const from = rows.findIndex((row) => row.key === fromKey);
      const to = rows.findIndex((row) => row.key === toKey);
      if (from < 0 || to < 0 || from === to) {
        return rows;
      }
      const next = [...rows];
      const [moved] = next.splice(from, 1);
      if (!moved) {
        return rows;
      }
      next.splice(to, 0, moved);
      return next;
    });
  }

  /** 相邻合并：把第 index 章并入上一章（PDF 扩页码范围；DOCX 无页码，拼接标题保持可见）。 */
  function mergeIntoPrevious(index: number) {
    setDraftRows((rows) => {
      if (index <= 0 || index >= rows.length) {
        return rows;
      }
      const previous = rows[index - 1];
      const current = rows[index];
      if (!previous || !current) {
        return rows;
      }
      const merged: ChapterDraftRow = docx
        ? { ...previous, title: `${previous.title}／${current.title}`.slice(0, 200) }
        : { ...previous, pageEnd: current.pageEnd };
      return [...rows.slice(0, index - 1), merged, ...rows.slice(index + 1)];
    });
  }

  const extractedCount = chapters.filter((chapter) => chapter.knowledgePointCount > 0 || chapter.status === "extracted").length;
  // ZCODE-M3：待编译章（pending | failed 计入重试范围）
  const pendingCompileCount = chapters.filter(
    (chapter) => chapter.status === "pending" || chapter.status === "failed",
  ).length;
  const compileButtonLabel = compiling
    ? "编译中"
    : compileCache?.state === "extracting"
      ? "继续编译"
      : pendingCompileCount > 0
        ? "编译全书"
        : "重新编译全部";
  const compileScope: "pending" | "all" = pendingCompileCount > 0 || compileCache?.state === "extracting" ? "pending" : "all";
  // SpineEditor：结构确认章；识别/修正会重置，未确认前萃取入口禁用
  const spineConfirmed = Boolean(textbook.spineConfirmedAt);
  const dirty = JSON.stringify(draftRows) !== JSON.stringify(toDraftRows(chapters));
  const guide = resolveClewGuide({
    surface: "textbook",
    textbookId: textbook.id,
    chapterCount: chapters.length,
    extractedCount,
    editing,
    chapterOrder: chapters[0]?.order ?? 1,
  });

  return (
    <div className={styles.shelfLayout}>
      <ClewPathGuide guide={guide} />
      <section className={styles.quotaPanel} aria-label="教材信息">
        <div className={styles.quotaCopy}>
          <p className={styles.quotaLabel}>教材信息</p>
          <p className={styles.quotaNote}>
            {textbook.fileName} · {formatClewExtent(textbook.fileName, textbook.pageCount)} · 章节 {textbook.chapterCount} 个
            {textbook.isFrozen ? ` · 已冻结（激活月 ${textbook.activeMonth}）` : ""}
          </p>
          <p className={styles.quotaNote}>
            目录识别只读取书签与目录页文字，不改动 PDF 本身；萃取出的知识点可点进学习页生成讲义并追问。
          </p>
        </div>
      </section>

      <section className={styles.uploadPanel} id="recognize" aria-labelledby="clew-recognize-title">
        <div className={styles.panelHead}>
          <h2 id="clew-recognize-title">目录识别</h2>
          <p>
            {recognition
              ? `上次识别：${strategyLabels[recognition.strategy] ?? recognition.strategy} · ${recognition.chapterCount} 章`
              : "尚未识别"}
            {chapters.length > 0 ? ` · ${spineConfirmed ? "章节结构已确认" : "章节结构待确认"}` : ""}
          </p>
        </div>
        <div className={styles.actionRow}>
          {!editing ? (
            <>
              <V2Button
                className={styles.v2Button}
                disabled={recognizing}
                onClick={onRecognize}
              >
                {recognizing ? (
                  <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
                ) : (
                  <ScanSearch aria-hidden="true" size={16} strokeWidth={1.6} />
                )}
                {recognizing ? "识别中" : chapters.length > 0 ? "重新识别目录" : "识别目录"}
              </V2Button>
              <button
                type="button"
                className={styles.ghostButton}
                disabled={recognizing || chapters.length === 0}
                onClick={onStartEdit}
              >
                <Pencil aria-hidden="true" size={15} strokeWidth={1.6} />
                手动修正章节
              </button>
              {chapters.length > 0 && !spineConfirmed ? (
                <V2Button
                  className={styles.v2Button}
                  disabled={confirming || recognizing}
                  onClick={() => onConfirm(toDraftRows(chapters))}
                >
                  {confirming ? (
                    <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
                  ) : (
                    <Sparkles aria-hidden="true" size={16} strokeWidth={1.6} />
                  )}
                  确认章节结构并开始萃取
                </V2Button>
              ) : null}
            </>
          ) : null}
        </div>

        {progressLog.length > 0 ? (
          <ul className={styles.progressLog} aria-label="识别进度">
            {progressLog.map((line, index) => (
              <li key={`${index}-${line}`}>{line}</li>
            ))}
          </ul>
        ) : null}

        {recognition && recognition.notes.length > 0 && !recognizing ? (
          <ul className={styles.noteList} aria-label="识别说明">
            {recognition.notes.map((note, index) => (
              <li key={`${index}-${note}`}>{note}</li>
            ))}
          </ul>
        ) : null}

        {error ? (
          <p className={styles.errorBox} role="alert">
            <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
            <span>{error}</span>
          </p>
        ) : null}
      </section>

      {!editing && spineConfirmed ? (
        <section className={styles.uploadPanel} id="compile" aria-labelledby="clew-compile-title">
          <div className={styles.panelHead}>
            <h2 id="clew-compile-title">编译全书</h2>
            <p>
              {compileCache
                ? `上次编译：${compileStateLabels[compileCache.state] ?? compileCache.state} · ${formatRelativeTime(compileCache.updatedAt)}`
                : "尚未编译"}
            </p>
          </div>
          <div className={styles.actionRow}>
            <V2Button
              className={styles.v2Button}
              disabled={compiling || recognizing || extractingOrder !== null}
              onClick={() => onCompile(compileScope)}
            >
              {compiling ? (
                <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
              ) : (
                <BookOpenCheck aria-hidden="true" size={16} strokeWidth={1.6} />
              )}
              {compileButtonLabel}
            </V2Button>
            <span className={styles.quotaNote}>
              {pendingCompileCount > 0
                ? `待编译 ${pendingCompileCount} 章 · 预计消耗 ${pendingCompileCount} 次模型调用`
                : "全部章节已萃取"}
            </span>
          </div>

          {compileLog.length > 0 && (compiling || compileDone || compileError) ? (
            <ul className={styles.progressLog} aria-label="编译进度">
              {compileLog.map((line, index) => (
                <li key={`${index}-${line}`}>{line}</li>
              ))}
            </ul>
          ) : null}

          {compileDone ? (
            <p className={styles.quotaNote} role="status">
              {compileDone}
              {chapters.some((chapter) => chapter.status === "failed") ? (
                <>
                  {" "}
                  <Link href="#extract">到章节列表对失败章单独重试</Link>。
                </>
              ) : null}
            </p>
          ) : null}

          {compileError ? (
            <p className={styles.errorBox} role="alert">
              <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
              <span>{compileError}</span>
            </p>
          ) : null}
        </section>
      ) : null}

      <section className={styles.textbookSection} id="chapters" aria-labelledby="clew-chapters-title">
        <div className={styles.sectionHead}>
          <h2 id="clew-chapters-title">章节树</h2>
          <span>{chapters.length} 章</span>
        </div>

        {!editing && chapters.length > 0 && !spineConfirmed ? (
          <p className={styles.emptyState} data-spine-unconfirmed="true">
            请先确认章节结构：核对/合并章节后点上方「确认章节结构并开始萃取」，确认前萃取入口不可用。
          </p>
        ) : null}

        {chapters.length === 0 ? (
          <p className={styles.emptyState}>
            还没有章节。点「识别目录」。PDF 走书签或目录页；DOCX 走标题，页码保持待确认。识别不到时可手动录入。
          </p>
        ) : editing ? (
          <ul className={styles.textbookList}>
            {draftRows.map((row, index) => (
              <li
                key={row.key}
                className={styles.chapterEditRow}
                draggable={dragKey === row.key}
                onDragStart={() => setDragKey(row.key)}
                onDragEnd={() => setDragKey(null)}
                onDragOver={(event) => {
                  if (dragKey && dragKey !== row.key) event.preventDefault();
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  if (dragKey && dragKey !== row.key) reorderRows(dragKey, row.key);
                  setDragKey(null);
                }}
              >
                {index > 0 ? (
                  <div className={styles.chapterMergeBar}>
                    <button
                      type="button"
                      className={styles.chapterMergeButton}
                      disabled={confirming}
                      onClick={() => mergeIntoPrevious(index)}
                    >
                      <Merge aria-hidden="true" size={13} strokeWidth={1.6} />
                      {docx ? "并入上一章（拼接标题）" : "并入上一章（扩页码范围）"}
                    </button>
                  </div>
                ) : null}
                <span
                  className={styles.chapterGrip}
                  aria-hidden="true"
                  onMouseDown={() => setDragKey(row.key)}
                  onTouchStart={() => setDragKey(row.key)}
                >
                  <GripVertical size={15} strokeWidth={1.6} />
                </span>
                <span className={styles.chapterIndex}>{String(index + 1).padStart(2, "0")}</span>
                <input
                  className={styles.chapterTitleInput}
                  type="text"
                  value={row.title}
                  maxLength={200}
                  placeholder="章节标题"
                  aria-label={`第 ${index + 1} 章标题`}
                  onChange={(event) => updateRow(row.key, { title: event.target.value })}
                />
                {docx ? (
                  <span className={styles.chapterPageDash}>页码待确认</span>
                ) : (
                  <>
                    <input
                      className={styles.chapterPageInput}
                      type="number"
                      min={1}
                      max={textbook.pageCount}
                      value={row.pageStart}
                      aria-label={`第 ${index + 1} 章起始页`}
                      onChange={(event) => updateRow(row.key, { pageStart: event.target.value })}
                    />
                    <span className={styles.chapterPageDash}>–</span>
                    <input
                      className={styles.chapterPageInput}
                      type="number"
                      min={1}
                      max={textbook.pageCount}
                      value={row.pageEnd}
                      aria-label={`第 ${index + 1} 章结束页`}
                      onChange={(event) => updateRow(row.key, { pageEnd: event.target.value })}
                    />
                  </>
                )}
                <button
                  type="button"
                  className={styles.ghostButton}
                  aria-label={`删除第 ${index + 1} 章`}
                  disabled={confirming}
                  onClick={() => setDraftRows((rows) => rows.filter((item) => item.key !== row.key))}
                >
                  <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.textbookList} id="extract">
            {chapters.map((chapter) => {
              const isExtracting = extractingOrder === chapter.order;
              const isExpanded = expandedOrders.has(chapter.order);
              const knowledgePoints = chapterKnowledgePoints[chapter.order];
              return (
                <li key={chapter.id} className={styles.chapterRowBlock}>
                  <div className={styles.chapterRow}>
                    <button
                      type="button"
                      className={styles.chapterToggle}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? "收起" : "展开"}《${chapter.title}》的知识点`}
                      disabled={chapter.knowledgePointCount === 0}
                      onClick={() => onToggleChapter(chapter)}
                    >
                      {isExpanded ? (
                        <ChevronDown aria-hidden="true" size={15} strokeWidth={1.6} />
                      ) : (
                        <ChevronRight aria-hidden="true" size={15} strokeWidth={1.6} />
                      )}
                    </button>
                    <span className={styles.chapterIndex}>{String(chapter.order).padStart(2, "0")}</span>
                    <span className={styles.chapterMain}>
                      <span className={styles.chapterTitle}>{chapter.title}</span>
                      <span className={styles.chapterMeta}>
                        {formatClewPageRange(textbook.fileName, chapter.pageStart, chapter.pageEnd)} · 来源：{sourceLabels[chapter.source]} ·{" "}
                        {chapterStatusLabels[chapter.status]}
                        {chapter.knowledgePointCount > 0 ? `（${chapter.knowledgePointCount} 个知识点）` : ""}
                      </span>
                    </span>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      disabled={!spineConfirmed || extractingOrder !== null || recognizing || compiling}
                      title={spineConfirmed ? undefined : "请先确认章节结构"}
                      onClick={() => onExtractChapter(chapter)}
                    >
                      {isExtracting ? (
                        <Loader2 className={styles.spin} aria-hidden="true" size={15} strokeWidth={1.8} />
                      ) : (
                        <Sparkles aria-hidden="true" size={15} strokeWidth={1.6} />
                      )}
                      {isExtracting
                        ? "萃取中"
                        : chapter.knowledgePointCount > 0
                        ? "重新萃取"
                        : "萃取知识点"}
                    </button>
                  </div>

                  {isExtracting && extractLog.length > 0 ? (
                    <ul className={styles.progressLog} aria-label="萃取进度">
                      {extractLog.map((line, index) => (
                        <li key={`${index}-${line}`}>{line}</li>
                      ))}
                    </ul>
                  ) : null}

                  {isExpanded && knowledgePoints && knowledgePoints.length > 0 ? (
                    <ul className={styles.kpList} aria-label="知识点">
                      {knowledgePoints.map((knowledgePoint) => (
                        <li key={knowledgePoint.id} className={styles.kpItem}>
                          <p className={styles.kpTitle}>
                            <Link
                              href={`/learn/clew/t/${textbook.id}/c/${chapter.order}?kp=${knowledgePoint.id}`}
                            >
                              {String(knowledgePoint.order).padStart(2, "0")} · {knowledgePoint.title}
                            </Link>
                            <span className={styles.kpPage}>{formatClewSourcePage(textbook.fileName, knowledgePoint.sourcePage)}</span>
                          </p>
                          <p className={styles.kpDescription}>{knowledgePoint.description}</p>
                          {knowledgePoint.keyTerms.length > 0 ? (
                            <p className={styles.kpTerms}>术语：{knowledgePoint.keyTerms.join("、")}</p>
                          ) : null}
                          {knowledgePoint.prerequisites.length > 0 ? (
                            <p className={styles.kpTerms}>先修：{knowledgePoint.prerequisites.join("、")}</p>
                          ) : null}
                        </li>
                      ))}
                      <li className={styles.kpFootNote}>
                        知识点为模型萃取草稿，页码可溯源；点标题进入学习页生成讲义并追问。
                      </li>
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}

        {editing ? (
          <div className={styles.chapterEditBar}>
            <div className={styles.chapterEditActions}>
              <button
                type="button"
                className={styles.ghostButton}
                disabled={!canAddChapter}
                onClick={onAddRow}
              >
                <Plus aria-hidden="true" size={15} strokeWidth={1.6} />
                新增章节
              </button>
              <span className={styles.quotaNote}>
                {canAddChapter
                  ? "可拖拽 ≡ 调整顺序、合并相邻章节、编辑标题；确认后才能萃取知识点。"
                  : `最后一章已到第 ${textbook.pageCount} 页，没有可新增的页码空间；可先调整现有章节页码。`}
              </span>
            </div>
            <div className={styles.chapterEditActions}>
              <V2Button
                className={styles.v2Button}
                disabled={confirming || draftRows.length === 0}
                onClick={() => onConfirm(draftRows)}
              >
                {confirming ? (
                  <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
                ) : (
                  <Sparkles aria-hidden="true" size={16} strokeWidth={1.6} />
                )}
                {dirty ? "保存修改并萃取" : "确认章节结构并开始萃取"}
              </V2Button>
              <button
                type="button"
                className={styles.ghostButton}
                disabled={confirming}
                onClick={() => setEditing(false)}
              >
                <X aria-hidden="true" size={15} strokeWidth={1.6} />
                放弃修改
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <p className={styles.footNote}>
        <RotateCcw aria-hidden="true" size={13} strokeWidth={1.6} /> 重新识别会覆盖当前章节列表（含已萃取的知识点）；重新萃取会覆盖该章既有知识点。
        返回 <Link href="/learn/clew">Clew 书架</Link>。
      </p>
    </div>
  );
}