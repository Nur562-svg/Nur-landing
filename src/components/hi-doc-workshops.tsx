"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CircleAlert, FolderOpen, Loader2, Plus, Trash2 } from "lucide-react";
import type { MembershipTier } from "@/types/auth";
import type { HiDocApiFailure, HiDocWorkshopListView, HiDocWorkshopView } from "@/types/hidoc";
import { getMembershipTierLabel } from "@/lib/membership";
import styles from "./hi-doc.module.css";

/**
 * Hi doc 课题工作坊列表（客户端）：限额 + 新建 + 列表 + 删除。
 * 全部操作走服务端 API；工作坊材料不占教材当月名额。
 */

type HiDocWorkshopListProps = {
  initialList: HiDocWorkshopListView;
  tier: MembershipTier;
};

type ListResponse = { ok: true } & HiDocWorkshopListView | HiDocApiFailure;

export function HiDocWorkshopList({ initialList, tier }: HiDocWorkshopListProps) {
  const [list, setList] = useState(initialList);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<"create" | "delete" | null>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  async function readListResponse(response: Response): Promise<string | null> {
    let payload: ListResponse;
    try {
      payload = (await response.json()) as ListResponse;
    } catch {
      return "服务返回异常，请稍后重试。";
    }
    if (payload.ok) {
      setList({ workshops: payload.workshops, limits: payload.limits });
      return null;
    }
    return payload.error;
  }

  async function onCreate() {
    if (title.trim().length === 0 || busy !== null) {
      return;
    }
    setBusy("create");
    setError(null);
    try {
      const response = await fetch("/api/hidoc/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), note: note.trim() || undefined }),
      });
      const failureMessage = await readListResponse(response);
      if (failureMessage) {
        setError(failureMessage);
        return;
      }
      setTitle("");
      setNote("");
      titleInputRef.current?.focus();
    } catch {
      setError("创建失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setBusy(null);
    }
  }

  async function onDelete(workshop: HiDocWorkshopView) {
    if (busy !== null) {
      return;
    }
    const confirmed = window.confirm(
      `删除课题「${workshop.title}」后，其中的 ${workshop.fileCount} 份材料（服务器文件）与答疑记录会一并删除。确定删除？`,
    );
    if (!confirmed) {
      return;
    }
    setBusy("delete");
    setError(null);
    try {
      const response = await fetch(`/api/hidoc/workshops?id=${encodeURIComponent(workshop.id)}`, {
        method: "DELETE",
      });
      const failureMessage = await readListResponse(response);
      if (failureMessage) {
        setError(failureMessage);
      }
    } catch {
      setError("删除失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className={styles.shelfLayout}>
      <section className={styles.quotaPanel} aria-label="课题工作坊限额">
        <div className={styles.quotaCopy}>
          <p className={styles.quotaLabel}>课题限额 · 当前档位 {getMembershipTierLabel(tier)}</p>
          <p className={styles.quotaValue}>
            {list.limits.workshopUsed}
            <span>/{list.limits.workshopLimit} 个课题</span>
          </p>
          <p className={styles.quotaNote}>
            每个课题最多 {list.limits.filesPerWorkshopLimit} 份材料 · 单份不超过 {list.limits.maxPagesPerFile} 页 ·
            工作坊材料不占教材当月名额。
          </p>
        </div>
      </section>

      <section className={styles.uploadPanel} aria-labelledby="hidoc-workshop-create-title">
        <div className={styles.panelHead}>
          <h2 id="hidoc-workshop-create-title">新建课题</h2>
          <p>围绕一个主题上传短材料（带文字层 PDF / Markdown / 纯文本），然后就材料追问</p>
        </div>
        <div className={styles.uploadRow}>
          <input
            ref={titleInputRef}
            className={styles.titleInput}
            type="text"
            value={title}
            maxLength={60}
            placeholder="课题名称（如：心衰专题）"
            aria-label="课题名称"
            disabled={busy !== null}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            className={styles.titleInput}
            type="text"
            value={note}
            maxLength={500}
            placeholder="课题说明（可选）"
            aria-label="课题说明（可选）"
            disabled={busy !== null}
            onChange={(event) => setNote(event.target.value)}
          />
          <button
            type="button"
            className={styles.primaryButton}
            disabled={title.trim().length === 0 || busy !== null}
            onClick={onCreate}
          >
            {busy === "create" ? (
              <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
            ) : (
              <Plus aria-hidden="true" size={16} strokeWidth={1.8} />
            )}
            {busy === "create" ? "创建中" : "新建课题"}
          </button>
        </div>
        {error ? (
          <p className={styles.errorBox} role="alert">
            <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
            <span>{error}</span>
          </p>
        ) : null}
      </section>

      <section className={styles.textbookSection} aria-labelledby="hidoc-workshop-list-title">
        <div className={styles.sectionHead}>
          <h2 id="hidoc-workshop-list-title">我的课题</h2>
          <span>{list.workshops.length} 个</span>
        </div>
        {list.workshops.length === 0 ? (
          <p className={styles.emptyState}>
            还没有课题。新建一个课题，上传短材料（≤100 页），就能就材料内容追问答疑。
          </p>
        ) : (
          <ul className={styles.textbookList}>
            {list.workshops.map((workshop) => (
              <li key={workshop.id} className={styles.textbookCard}>
                <div className={styles.textbookMain}>
                  <p className={styles.textbookTitle}>
                    <Link href={`/learn/hi-doc/w/${workshop.id}`}>{workshop.title}</Link>
                  </p>
                  <p className={styles.textbookMeta}>
                    {workshop.fileCount} 份材料 · 更新于 {workshop.updatedAt.slice(0, 10)}
                  </p>
                  {workshop.note ? <p className={styles.textbookState}>{workshop.note}</p> : null}
                </div>
                <div className={styles.textbookActions}>
                  <Link className={styles.ghostButton} href={`/learn/hi-doc/w/${workshop.id}`}>
                    <FolderOpen aria-hidden="true" size={15} strokeWidth={1.6} />
                    进入课题
                  </Link>
                  <button
                    type="button"
                    className={styles.ghostButton}
                    disabled={busy !== null}
                    onClick={() => onDelete(workshop)}
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

      <p className={styles.footNote}>
        课题工作坊由原「我的资料」升级而来：材料存服务器且仅本人可见，可跨设备继续。返回{" "}
        <Link href="/learn/hi-doc">教材书架</Link>。
      </p>
    </div>
  );
}
