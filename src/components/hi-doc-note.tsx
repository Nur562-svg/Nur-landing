"use client";

import { useState } from "react";
import { CircleAlert, Download, Loader2, NotebookPen, RefreshCw, Sparkles } from "lucide-react";
import type { HiDocChapterView, HiDocNoteEvent, HiDocNoteView } from "@/types/hidoc";
import { consumeHiDocSse, readHiDocFailure } from "@/lib/hidoc/client-api";
import { describeHiDocLessonGenerator } from "@/lib/hidoc/lesson-heuristic";
import { buildHiDocNoteFileName } from "@/lib/hidoc/note-heuristic";
import { V2Button } from "@/components/ui/v2/button";
import { HiDocMarkdown } from "./hi-doc-markdown";
import styles from "./hi-doc.module.css";

/**
 * Hi doc 学霸笔记区块（客户端，章级）：
 * 聚合本章讲义 + 讲解追问 + 划重点/批注，流式生成一份可复习、可下载的 markdown 笔记。
 * 下载走前端 Blob（不落服务器文件存储）；重新生成覆盖旧版本前需确认。
 */

type HiDocNotePanelProps = {
  textbookId: string;
  textbookTitle: string;
  chapter: HiDocChapterView;
  initialNote: HiDocNoteView | null;
  lessonCount: number;
  knowledgePointCount: number;
};

export function HiDocNotePanel({
  textbookId,
  textbookTitle,
  chapter,
  initialNote,
  lessonCount,
  knowledgePointCount,
}: HiDocNotePanelProps) {
  const [note, setNote] = useState<HiDocNoteView | null>(initialNote);
  const [draft, setDraft] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [confirmingRegenerate, setConfirmingRegenerate] = useState(false);

  async function onGenerateNote() {
    if (generating) {
      return;
    }
    setConfirmingRegenerate(false);
    setGenerating(true);
    setError(null);
    setNotes([]);
    setLog([`开始汇总《${chapter.title}》的学霸笔记…`]);
    setDraft("");

    try {
      const response = await fetch(
        `/api/hidoc/textbooks/${textbookId}/chapters/${chapter.order}/note`,
        { method: "POST" },
      );
      if (!response.ok || !response.body) {
        let message = "学霸笔记生成失败：服务暂时不可用，请稍后重试。";
        try {
          message = readHiDocFailure(await response.json());
        } catch {
          // 保持默认提示
        }
        setError(message);
        setDraft("");
        return;
      }
      await consumeHiDocSse(response, (raw) => {
        const event = raw as HiDocNoteEvent;
        if (event.type === "progress") {
          setLog((current) => [...current, event.message]);
        } else if (event.type === "delta") {
          setDraft((current) => current + event.text);
        } else if (event.type === "result") {
          setNote(event.note);
          setNotes(event.notes);
          setDraft("");
        } else {
          setError(event.error);
          setDraft("");
        }
      });
    } catch {
      setError("学霸笔记生成失败：网络或服务暂时不可用，请稍后重试。");
      setDraft("");
    } finally {
      setGenerating(false);
    }
  }

  function onDownloadNote() {
    if (!note) {
      return;
    }
    const blob = new Blob([note.contentMd], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = buildHiDocNoteFileName(textbookTitle, chapter.title);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    // 延迟释放，避免浏览器尚未开始下载就被撤销
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  return (
    <section className={styles.notePanel} id="note" aria-labelledby="hidoc-note-title">
      <div className={styles.panelHead}>
        <h2 id="hidoc-note-title">
          <NotebookPen aria-hidden="true" size={17} strokeWidth={1.6} /> 学霸笔记
        </h2>
        {note ? (
          <p>
            {describeHiDocLessonGenerator(note.generator)} ·{" "}
            {new Date(note.generatedAt).toLocaleString("zh-CN", {
              hour12: false,
              timeZone: "Asia/Shanghai",
            })}
          </p>
        ) : (
          <p>尚未生成</p>
        )}
      </div>
      <p className={styles.highlightHint}>
        汇总本章的讲义要点、讲解追问、划重点与批注（本章 {knowledgePointCount} 个知识点 ·{" "}
        {lessonCount} 份讲义）；只汇总你真实留下的学习痕迹，缺失的小节如实略去。
      </p>

      <div className={styles.actionRow}>
        {!generating ? (
          note ? (
            confirmingRegenerate ? (
              <>
                <span className={styles.confirmNote}>重新生成将覆盖当前学霸笔记，确认继续？</span>
                <V2Button className={styles.v2Button} onClick={() => void onGenerateNote()}>
                  <RefreshCw aria-hidden="true" size={15} strokeWidth={1.6} />
                  确认重新生成
                </V2Button>
                <button
                  type="button"
                  className={styles.ghostButton}
                  onClick={() => setConfirmingRegenerate(false)}
                >
                  取消
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={styles.ghostButton}
                  onClick={() => setConfirmingRegenerate(true)}
                >
                  <RefreshCw aria-hidden="true" size={15} strokeWidth={1.6} />
                  重新生成学霸笔记
                </button>
                <V2Button className={styles.v2Button} onClick={onDownloadNote}>
                  <Download aria-hidden="true" size={15} strokeWidth={1.6} />
                  下载 .md
                </V2Button>
              </>
            )
          ) : (
            <V2Button className={styles.v2Button} onClick={() => void onGenerateNote()}>
              <Sparkles aria-hidden="true" size={16} strokeWidth={1.6} />
              生成学霸笔记
            </V2Button>
          )
        ) : (
          <span className={styles.confirmNote}>
            <Loader2 className={styles.spin} aria-hidden="true" size={14} strokeWidth={1.8} /> 生成中…
          </span>
        )}
      </div>

      {log.length > 0 && (generating || notes.length > 0 || error) ? (
        <ul className={styles.progressLog} aria-label="学霸笔记生成进度">
          {log.map((line, index) => (
            <li key={`${index}-${line}`}>{line}</li>
          ))}
        </ul>
      ) : null}

      {error ? (
        <p className={styles.errorBox} role="alert">
          <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
          <span>{error}</span>
        </p>
      ) : null}

      {notes.length > 0 ? (
        <ul className={styles.noteList} aria-label="学霸笔记说明">
          {notes.map((line, index) => (
            <li key={`${index}-${line}`}>{line}</li>
          ))}
        </ul>
      ) : null}

      {generating && draft ? (
        <div className={styles.lessonBody} aria-label="学霸笔记生成中预览">
          <HiDocMarkdown markdown={draft} />
        </div>
      ) : note ? (
        <div className={styles.lessonBody}>
          <HiDocMarkdown markdown={note.contentMd} />
          <p className={styles.noteDownloadHint}>
            下载的是当前这份笔记（文件名：{buildHiDocNoteFileName(textbookTitle, chapter.title)}
            ）；重新生成后需重新下载。
          </p>
        </div>
      ) : (
        <p className={styles.emptyState}>
          还没有学霸笔记。点「生成学霸笔记」：已接入模型时会把本章讲义、追问与划重点汇总成一份复习笔记；
          未接入模型时走确定性整理，并明确标注「未接入模型」。
        </p>
      )}
    </section>
  );
}