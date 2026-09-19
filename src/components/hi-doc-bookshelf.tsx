"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  BookOpen,
  CircleAlert,
  FileUp,
  Loader2,
  RotateCcw,
  Snowflake,
  Trash2,
} from "lucide-react";
import type { MembershipTier } from "@/types/auth";
import type { HiDocApiFailure, HiDocShelf, HiDocTextbookView } from "@/types/hidoc";
import { getMembershipTierLabel } from "@/lib/membership";
import { V2Badge } from "@/components/ui/v2/badge";
import { V2Button } from "@/components/ui/v2/button";
import styles from "./hi-doc.module.css";

type HiDocBookshelfProps = {
  initialShelf: HiDocShelf;
  tier: MembershipTier;
};

type ShelfResponse = { ok: true; shelf: HiDocShelf } | HiDocApiFailure;

function formatSize(sizeBytes: number): string {
  if (sizeBytes >= 1024 * 1024) {
    return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(sizeBytes / 1024))} KB`;
}

function describeState(textbook: HiDocTextbookView): string {
  switch (textbook.status) {
    case "uploaded":
      return "未识别目录 · 进入教材可识别";
    case "toc_ready":
      return textbook.chapterCount > 0
        ? `目录已识别 · ${textbook.chapterCount} 章`
        : "目录已识别";
    case "extracting":
      return "知识点萃取中";
    case "ready":
      return "已就绪";
    case "failed":
      return "处理失败";
  }
}

export function HiDocBookshelf({ initialShelf, tier }: HiDocBookshelfProps) {
  const [shelf, setShelf] = useState(initialShelf);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"upload" | "delete" | "activate" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeTextbooks = shelf.textbooks.filter((textbook) => !textbook.isFrozen);
  const frozenTextbooks = shelf.textbooks.filter((textbook) => textbook.isFrozen);

  async function readShelfResponse(response: Response): Promise<string | null> {
    let payload: ShelfResponse;
    try {
      payload = (await response.json()) as ShelfResponse;
    } catch {
      return "服务返回异常，请稍后重试。";
    }
    if (payload.ok) {
      setShelf(payload.shelf);
      return null;
    }
    return payload.error;
  }

  async function onUpload() {
    if (!file || busy !== null) {
      return;
    }
    setBusy("upload");
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (title.trim()) {
        formData.append("title", title.trim());
      }
      const response = await fetch("/api/hidoc/textbooks", { method: "POST", body: formData });
      const failureMessage = await readShelfResponse(response);
      if (failureMessage) {
        setError(failureMessage);
        return;
      }
      setFile(null);
      setTitle("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setError("上传失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setBusy(null);
    }
  }

  async function onDelete(textbook: HiDocTextbookView) {
    if (busy !== null) {
      return;
    }
    const confirmed = window.confirm(
      `删除《${textbook.title}》后，服务器上的文件会立即移除，当月名额同时释放。确定删除？`,
    );
    if (!confirmed) {
      return;
    }
    setBusy("delete");
    setError(null);
    try {
      const response = await fetch(`/api/hidoc/textbooks?id=${encodeURIComponent(textbook.id)}`, {
        method: "DELETE",
      });
      const failureMessage = await readShelfResponse(response);
      if (failureMessage) {
        setError(failureMessage);
      }
    } catch {
      setError("删除失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setBusy(null);
    }
  }

  async function onActivate(textbook: HiDocTextbookView) {
    if (busy !== null) {
      return;
    }
    setBusy("activate");
    setError(null);
    try {
      const response = await fetch("/api/hidoc/textbooks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: textbook.id, action: "activate" }),
      });
      const failureMessage = await readShelfResponse(response);
      if (failureMessage) {
        setError(failureMessage);
      }
    } catch {
      setError("重新激活失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className={styles.shelfLayout}>
      <section className={styles.quotaPanel} aria-label="本月教材名额">
        <div className={styles.quotaCopy}>
          <p className={styles.quotaLabel}>本月名额 · {shelf.quota.month}</p>
          <p className={styles.quotaValue}>
            {shelf.quota.used}
            <span>/{shelf.quota.limit} 已用</span>
          </p>
          <p className={styles.quotaNote}>
            当前档位 {getMembershipTierLabel(tier)} · 名额仅当月有效，下月 1 日刷新；删除教材立即释放名额。
          </p>
        </div>
        <div className={styles.quotaCells} aria-hidden="true">
          {Array.from({ length: shelf.quota.limit }, (_, index) => (
            <span
              key={index}
              className={index < shelf.quota.used ? styles.quotaCellUsed : styles.quotaCell}
            />
          ))}
        </div>
      </section>

      <section className={styles.uploadPanel} aria-labelledby="hidoc-upload-title">
        <div className={styles.panelHead}>
          <h2 id="hidoc-upload-title">上传教材</h2>
          <p>文字版 PDF · 单本不超过 1500 页 · 教材仅本人可见</p>
        </div>
        <div className={styles.uploadRow}>
          <label className={styles.filePicker}>
            <FileUp aria-hidden="true" size={18} strokeWidth={1.5} />
            <span className={styles.filePickerText}>{file ? file.name : "选择 PDF 文件"}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className={styles.fileInput}
              disabled={busy !== null}
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
          <input
            className={styles.titleInput}
            type="text"
            value={title}
            maxLength={120}
            placeholder="教材标题（可选，默认取文件名）"
            aria-label="教材标题（可选）"
            disabled={busy !== null}
            onChange={(event) => setTitle(event.target.value)}
          />
          <V2Button className={styles.v2Button} disabled={!file || busy !== null} onClick={onUpload}>
            {busy === "upload" ? (
              <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
            ) : null}
            {busy === "upload" ? "上传并检测中" : "上传教材"}
          </V2Button>
        </div>
        <p className={styles.uploadHint}>
          上传即检测文字层：扫描版 PDF 会明确拒绝并提示，暂不做 OCR；目录识别与知识点萃取在后续版本开放。
        </p>
        {error ? (
          <p className={styles.errorBox} role="alert">
            <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
            <span>{error}</span>
          </p>
        ) : null}
      </section>

      <section className={styles.textbookSection} aria-labelledby="hidoc-active-title">
        <div className={styles.sectionHead}>
          <h2 id="hidoc-active-title">本月在用</h2>
          <span>{activeTextbooks.length} 本</span>
        </div>
        {activeTextbooks.length === 0 ? (
          <p className={styles.emptyState}>本月还没有激活的教材。上传一本文字版 PDF 开始。</p>
        ) : (
          <ul className={styles.textbookList}>
            {activeTextbooks.map((textbook) => (
              <li key={textbook.id} className={styles.textbookCard}>
                <div className={styles.textbookMain}>
                  <p className={styles.textbookTitle}>
                    <Link href={`/learn/hi-doc/t/${textbook.id}`}>{textbook.title}</Link>
                  </p>
                  <p className={styles.textbookMeta}>
                    {textbook.fileName} · {textbook.pageCount} 页 · {formatSize(textbook.sizeBytes)} · 上传于{" "}
                    {textbook.createdAt.slice(0, 10)}
                  </p>
                  <V2Badge variant="muted" className={styles.stateBadge}>
                    {describeState(textbook)}
                  </V2Badge>
                </div>
                <div className={styles.textbookActions}>
                  <Link className={styles.ghostButton} href={`/learn/hi-doc/t/${textbook.id}`}>
                    <BookOpen aria-hidden="true" size={15} strokeWidth={1.6} />
                    进入教材
                  </Link>
                  <button
                    type="button"
                    className={styles.ghostButton}
                    disabled={busy !== null}
                    onClick={() => onDelete(textbook)}
                  >
                    <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
                    删除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {frozenTextbooks.length > 0 ? (
        <section className={styles.textbookSection} aria-labelledby="hidoc-frozen-title">
          <div className={styles.sectionHead}>
            <h2 id="hidoc-frozen-title">已冻结</h2>
            <span>{frozenTextbooks.length} 本</span>
          </div>
          <p className={styles.frozenHint}>
            这些教材属于更早的月份（激活月）：教材没有被删除，但需要重新激活才会占用本月名额。
          </p>
          <ul className={styles.textbookList}>
            {frozenTextbooks.map((textbook) => (
              <li key={textbook.id} className={`${styles.textbookCard} ${styles.textbookCardFrozen}`}>
                <div className={styles.textbookMain}>
                  <p className={styles.textbookTitle}>
                    <Snowflake aria-hidden="true" size={15} strokeWidth={1.6} />
                    {textbook.title}
                  </p>
                  <p className={styles.textbookMeta}>
                    {textbook.fileName} · {textbook.pageCount} 页 · {formatSize(textbook.sizeBytes)} · 激活月{" "}
                    {textbook.activeMonth}
                  </p>
                  <V2Badge variant="muted" className={styles.stateBadge}>
                    已冻结 · 重新激活将占用本月名额
                  </V2Badge>
                </div>
                <div className={styles.textbookActions}>
                  <button
                    type="button"
                    className={styles.ghostButton}
                    disabled={busy !== null}
                    onClick={() => onActivate(textbook)}
                  >
                    {busy === "activate" ? (
                      <Loader2 className={styles.spin} aria-hidden="true" size={15} strokeWidth={1.8} />
                    ) : (
                      <RotateCcw aria-hidden="true" size={15} strokeWidth={1.6} />
                    )}
                    重新激活
                  </button>
                  <button
                    type="button"
                    className={styles.ghostButton}
                    disabled={busy !== null}
                    onClick={() => onDelete(textbook)}
                  >
                    <Trash2 aria-hidden="true" size={15} strokeWidth={1.6} />
                    删除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className={styles.footNote}>
        Hi doc 教材存于服务器且仅本人可见；建议同时保留本地副本。返回{" "}
        <Link href="/learn">学习首页</Link>。
      </p>
    </div>
  );
}