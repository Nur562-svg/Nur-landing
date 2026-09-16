"use client";

import Link from "next/link";
import { useState } from "react";
import { CircleAlert, Loader2, Pencil, Plus, RotateCcw, Save, ScanSearch, Trash2, X } from "lucide-react";
import type {
  HiDocApiFailure,
  HiDocChapterSource,
  HiDocChapterView,
  HiDocTextbookDetail,
  HiDocTocEvent,
} from "@/types/hidoc";
import styles from "./hi-doc.module.css";

/**
 * Hi doc 教材详情（客户端）：目录识别（SSE 进度）+ 章节树 + 手动修正。
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
            目录识别只读取书签与目录页文字，不改动 PDF 本身；知识点萃取将在 M3 开放。
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
            <button
              type="button"
              className={styles.primaryButton}
              disabled={recognizing}
              onClick={onRecognize}
            >
              {recognizing ? (
                <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
              ) : (
                <ScanSearch aria-hidden="true" size={16} strokeWidth={1.6} />
              )}
              {recognizing ? "识别中" : chapters.length > 0 ? "重新识别目录" : "识别目录"}
            </button>
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
              <button type="button" className={styles.primaryButton} disabled={saving} onClick={onSave}>
                {saving ? (
                  <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
                ) : (
                  <Save aria-hidden="true" size={16} strokeWidth={1.6} />
                )}
                保存章节
              </button>
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
            {chapters.map((chapter) => (
              <li key={chapter.id} className={styles.chapterRow}>
                <span className={styles.chapterIndex}>{String(chapter.order).padStart(2, "0")}</span>
                <span className={styles.chapterMain}>
                  <span className={styles.chapterTitle}>{chapter.title}</span>
                  <span className={styles.chapterMeta}>
                    第 {chapter.pageStart}–{chapter.pageEnd} 页 · 来源：{sourceLabels[chapter.source]}
                  </span>
                </span>
              </li>
            ))}
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
        <RotateCcw aria-hidden="true" size={13} strokeWidth={1.6} /> 重新识别会覆盖当前章节列表；人工修正后请勿随意重跑。
        返回 <Link href="/learn/hi-doc">Hi doc 书架</Link>。
      </p>
    </div>
  );
}