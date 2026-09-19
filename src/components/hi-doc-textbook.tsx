"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Loader2,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  ScanSearch,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import type {
  HiDocApiFailure,
  HiDocChapterSource,
  HiDocChapterStatus,
  HiDocChapterView,
  HiDocExtractEvent,
  HiDocKnowledgePointView,
  HiDocTextbookDetail,
  HiDocTocEvent,
} from "@/types/hidoc";
import { V2Button } from "@/components/ui/v2/button";
import styles from "./hi-doc.module.css";

/**
 * Hi doc 教材详情（客户端）：目录识别（SSE 进度）+ 章节树 + 手动修正 + 知识点萃取。
 * 所有状态变更都经服务端 API；这里只负责展示与提交。
 */

type HiDocTextbookDetailProps = {
  initialDetail: HiDocTextbookDetail;
};

type ChapterDraftRow = {
  key: string;
  title: string;
  pageStart: string;
  pageEnd: string;
};

const sourceLabels: Record<HiDocChapterSource, string> = {
  outline: "PDF 书签",
  "toc-page": "目录页识别",
  model: "模型解析",
  manual: "人工修正",
};

const strategyLabels: Record<string, string> = {
  outline: "PDF 书签",
  "toc-page": "印刷目录页",
  model: "模型解析",
  none: "未识别",
};

const chapterStatusLabels: Record<HiDocChapterStatus, string> = {
  pending: "未萃取",
  extracting: "萃取中",
  extracted: "已萃取",
  failed: "萃取失败",
};

function toDraftRows(chapters: readonly HiDocChapterView[]): ChapterDraftRow[] {
  return chapters.map((chapter) => ({
    key: chapter.id,
    title: chapter.title,
    pageStart: String(chapter.pageStart),
    pageEnd: String(chapter.pageEnd),
  }));
}

export function HiDocTextbookDetailView({ initialDetail }: HiDocTextbookDetailProps) {
  const [detail, setDetail] = useState(initialDetail);
  const [progressLog, setProgressLog] = useState<string[]>([]);
  const [recognizing, setRecognizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [draftRows, setDraftRows] = useState<ChapterDraftRow[]>([]);
  const [saving, setSaving] = useState(false);

  // 知识点萃取状态
  const [extractingOrder, setExtractingOrder] = useState<number | null>(null);
  const [extractLog, setExtractLog] = useState<string[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
  const [chapterKnowledgePoints, setChapterKnowledgePoints] = useState<Record<number, HiDocKnowledgePointView[]>>({});

  const { textbook, chapters } = detail;
  const recognition = textbook.recognition;

  async function readFailure(response: Response): Promise<string> {
    try {
      const payload = (await response.json()) as HiDocApiFailure;
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
      const response = await fetch(`/api/hidoc/textbooks/${textbook.id}/toc`, { method: "POST" });
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
          let event: HiDocTocEvent;
          try {
            event = JSON.parse(dataLine.slice(6)) as HiDocTocEvent;
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
  async function onExtractChapter(chapter: HiDocChapterView) {
    if (extractingOrder !== null || editing) {
      return;
    }
    setExtractingOrder(chapter.order);
    setError(null);
    setExtractLog([`开始萃取《${chapter.title}》…`]);

    try {
      const response = await fetch(
        `/api/hidoc/textbooks/${textbook.id}/chapters/${chapter.order}/extract`,
        { method: "POST" },
      );
      await consumeSse(response, (raw) => {
        const event = raw as HiDocExtractEvent;
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
  async function onToggleChapter(chapter: HiDocChapterView) {
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
          `/api/hidoc/textbooks/${textbook.id}/chapters/${chapter.order}`,
        );
        const payload = (await response.json()) as
          | { ok: true; knowledgePoints: HiDocKnowledgePointView[] }
          | HiDocApiFailure;
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

  function onAddRow() {
    setDraftRows((rows) => {
      const last = rows[rows.length - 1];
      const start = last ? Number.parseInt(last.pageEnd, 10) + 1 : 1;
      return [
        ...rows,
        {
          key: `new-${Date.now()}-${rows.length}`,
          title: "",
          pageStart: String(start),
          pageEnd: String(Math.min(start, textbook.pageCount)),
        },
      ];
    });
  }

  /** 最后一章已经到书末时，没有可新增的页码空间。 */
  const lastDraftEnd = draftRows.length > 0
    ? Number.parseInt(draftRows[draftRows.length - 1].pageEnd, 10)
    : 0;
  const canAddChapter = !Number.isFinite(lastDraftEnd) || lastDraftEnd < textbook.pageCount;

  async function onSave() {
    if (saving) {
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/hidoc/textbooks/${textbook.id}/chapters`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapters: draftRows.map((row) => ({
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
      const payload = (await response.json()) as { ok: true; detail: HiDocTextbookDetail };
      setDetail(payload.detail);
      setEditing(false);
    } catch {
      setError("章节保存失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.shelfLayout}>
      <section className={styles.quotaPanel} aria-label="教材信息">
        <div className={styles.quotaCopy}>
          <p className={styles.quotaLabel}>教材信息</p>
          <p className={styles.quotaNote}>
            {textbook.fileName} · {textbook.pageCount} 页 · 章节 {textbook.chapterCount} 个
            {textbook.isFrozen ? ` · 已冻结（激活月 ${textbook.activeMonth}）` : ""}
          </p>
          <p className={styles.quotaNote}>
            目录识别只读取书签与目录页文字，不改动 PDF 本身；萃取出的知识点可点进学习页生成讲义并追问。
          </p>
        </div>
      </section>

      <section className={styles.uploadPanel} aria-labelledby="hidoc-recognize-title">
        <div className={styles.panelHead}>
          <h2 id="hidoc-recognize-title">目录识别</h2>
          <p>
            {recognition
              ? `上次识别：${strategyLabels[recognition.strategy] ?? recognition.strategy} · ${recognition.chapterCount} 章`
              : "尚未识别"}
          </p>
        </div>
        <div className={styles.actionRow}>
          {!editing ? (
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
          ) : null}
          {!editing ? (
            <button
              type="button"
              className={styles.ghostButton}
              disabled={recognizing || chapters.length === 0}
              onClick={onStartEdit}
            >
              <Pencil aria-hidden="true" size={15} strokeWidth={1.6} />
              手动修正章节
            </button>
          ) : (
            <>
              <V2Button className={styles.v2Button} disabled={saving} onClick={onSave}>
                {saving ? (
                  <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
                ) : (
                  <Save aria-hidden="true" size={16} strokeWidth={1.6} />
                )}
                保存章节
              </V2Button>
              <button
                type="button"
                className={styles.ghostButton}
                disabled={saving}
                onClick={() => setEditing(false)}
              >
                <X aria-hidden="true" size={15} strokeWidth={1.6} />
                取消
              </button>
            </>
          )}
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

      <section className={styles.textbookSection} aria-labelledby="hidoc-chapters-title">
        <div className={styles.sectionHead}>
          <h2 id="hidoc-chapters-title">章节树</h2>
          <span>{chapters.length} 章</span>
        </div>

        {chapters.length === 0 ? (
          <p className={styles.emptyState}>
            还没有章节。点「识别目录」从 PDF 书签或目录页自动识别；识别不到时可手动录入章节。
          </p>
        ) : editing ? (
          <ul className={styles.textbookList}>
            {draftRows.map((row, index) => (
              <li key={row.key} className={styles.chapterEditRow}>
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
                <button
                  type="button"
                  className={styles.ghostButton}
                  aria-label={`删除第 ${index + 1} 章`}
                  onClick={() => setDraftRows((rows) => rows.filter((item) => item.key !== row.key))}
                >
                  <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.textbookList}>
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
                        第 {chapter.pageStart}–{chapter.pageEnd} 页 · 来源：{sourceLabels[chapter.source]} ·{" "}
                        {chapterStatusLabels[chapter.status]}
                        {chapter.knowledgePointCount > 0 ? `（${chapter.knowledgePointCount} 个知识点）` : ""}
                      </span>
                    </span>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      disabled={extractingOrder !== null || recognizing}
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
                              href={`/learn/hi-doc/t/${textbook.id}/c/${chapter.order}?kp=${knowledgePoint.id}`}
                            >
                              {String(knowledgePoint.order).padStart(2, "0")} · {knowledgePoint.title}
                            </Link>
                            <span className={styles.kpPage}>第 {knowledgePoint.sourcePage} 页</span>
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
                ? "保存时按起始页重新排序；改动或新增的章节会标记为「人工修正」。"
                : `最后一章已到第 ${textbook.pageCount} 页，没有可新增的页码空间；可先调整现有章节页码。`}
            </span>
          </div>
        ) : null}
      </section>

      <p className={styles.footNote}>
        <RotateCcw aria-hidden="true" size={13} strokeWidth={1.6} /> 重新识别会覆盖当前章节列表（含已萃取的知识点）；重新萃取会覆盖该章既有知识点。
        返回 <Link href="/learn/hi-doc">Hi doc 书架</Link>。
      </p>
    </div>
  );
}