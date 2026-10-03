"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  CircleAlert,
  CornerDownLeft,
  FileText,
  FileUp,
  Loader2,
  MessageSquareText,
  Trash2,
} from "lucide-react";
import type {
  ClewApiFailure,
  ClewChatMessage,
  ClewWorkshopChatEvent,
  ClewWorkshopCitation,
  ClewWorkshopDetailView,
  ClewWorkshopFileView,
} from "@/types/clew";
import { consumeClewSse, readClewFailure } from "@/lib/clew/client-api";
import { resolveClewGuide } from "@/lib/clew/step-guide";
import { ClewMarkdown } from "./clew-markdown";
import { ClewPathGuide } from "./clew-path-guide";
import { V2Badge } from "@/components/ui/v2/badge";
import { V2Button } from "@/components/ui/v2/button";
import styles from "./clew.module.css";

/**
 * Clew 课题工作坊房间（客户端）：材料上传/清单/删除 + 就材料追问（SSE 流式，命中片段如实展示）。
 * 所有校验与检索都在服务端；这里只负责展示与事件解析。
 */

type ClewWorkshopRoomProps = {
  initialDetail: ClewWorkshopDetailView;
};

type DetailResponse = { ok: true; detail: ClewWorkshopDetailView } | ClewApiFailure;

function formatSize(sizeBytes: number): string {
  if (sizeBytes >= 1024 * 1024) {
    return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(sizeBytes / 1024))} KB`;
}

function describeFileState(file: ClewWorkshopFileView): string {
  if (file.status === "ready") {
    return "可检索";
  }
  if (file.status === "failed") {
    return file.failureReason ? `失败：${file.failureReason}` : "处理失败";
  }
  return "已上传";
}

export function ClewWorkshopRoom({ initialDetail }: ClewWorkshopRoomProps) {
  const [detail, setDetail] = useState(initialDetail);
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<ClewChatMessage[]>(initialDetail.messages);
  const [chatDraft, setChatDraft] = useState("");
  const [chatError, setChatError] = useState<string | null>(null);
  const [chatNotes, setChatNotes] = useState<string[]>([]);
  const [citations, setCitations] = useState<ClewWorkshopCitation[]>([]);
  const [progressLog, setProgressLog] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);
  const chatListRef = useRef<HTMLDivElement>(null);

  const workshop = detail.workshop;
  const readyFileCount = detail.files.filter((item) => item.status === "ready").length;
  // 流式期间最后一条 assistant 消息由底部流式气泡（带 caret）渲染，列表里不重复出现。
  const streamingTail =
    streaming && messages[messages.length - 1]?.role === "assistant"
      ? messages[messages.length - 1]
      : null;
  const visibleMessages = streamingTail ? messages.slice(0, -1) : messages;

  async function readDetailResponse(response: Response): Promise<string | null> {
    let payload: DetailResponse;
    try {
      payload = (await response.json()) as DetailResponse;
    } catch {
      return "服务返回异常，请稍后重试。";
    }
    if (payload.ok) {
      setDetail(payload.detail);
      return null;
    }
    return payload.error;
  }

  async function onUpload() {
    if (!file || uploading) {
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`/api/clew/workshops/${workshop.id}/files`, {
        method: "POST",
        body: formData,
      });
      const failureMessage = await readDetailResponse(response);
      if (failureMessage) {
        setUploadError(failureMessage);
        return;
      }
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      setUploadError("上传失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setUploading(false);
    }
  }

  async function onDeleteFile(item: ClewWorkshopFileView) {
    if (uploading || streaming) {
      return;
    }
    const confirmed = window.confirm(`从课题中删除材料「${item.fileName}」？服务器上的文件会一并移除。`);
    if (!confirmed) {
      return;
    }
    setUploadError(null);
    try {
      const response = await fetch(
        `/api/clew/workshops/${workshop.id}/files?fileId=${encodeURIComponent(item.id)}`,
        { method: "DELETE" },
      );
      const failureMessage = await readDetailResponse(response);
      if (failureMessage) {
        setUploadError(failureMessage);
      }
    } catch {
      setUploadError("删除失败：网络或服务暂时不可用，请稍后重试。");
    }
  }

  async function onSendMessage() {
    const question = chatDraft.trim();
    if (question.length === 0 || streaming) {
      return;
    }
    setStreaming(true);
    setChatError(null);
    setChatNotes([]);
    setCitations([]);
    setProgressLog([`检索 ${readyFileCount} 份就绪材料…`]);
    setChatDraft("");
    setMessages((current) => [
      ...current,
      { role: "user", content: question, createdAt: new Date().toISOString() },
    ]);
    let answer = "";

    try {
      const response = await fetch(`/api/clew/workshops/${workshop.id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      if (!response.ok || !response.body) {
        let message = "答疑失败：服务暂时不可用，请稍后重试。";
        try {
          message = readClewFailure(await response.json());
        } catch {
          // 保持默认提示
        }
        setChatError(message);
        return;
      }
      await consumeClewSse(response, (raw) => {
        const event = raw as ClewWorkshopChatEvent;
        if (event.type === "progress") {
          setProgressLog((log) => [...log, event.message]);
        } else if (event.type === "delta") {
          answer += event.text;
          setMessages((current) => {
            const last = current[current.length - 1];
            return last?.role === "assistant"
              ? [...current.slice(0, -1), { ...last, content: answer }]
              : [...current, { role: "assistant", content: answer, createdAt: new Date().toISOString() }];
          });
        } else if (event.type === "result") {
          setMessages(event.conversation.messages);
          setCitations(event.citations);
          setChatNotes(event.notes);
        } else {
          setChatError(event.error);
        }
      });
      if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }
    } catch {
      setChatError("答疑失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setStreaming(false);
      if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }
    }
  }

  return (
    <div className={styles.shelfLayout}>
      <ClewPathGuide guide={resolveClewGuide({ surface: "workshop", workshopId: workshop.id })} />
      <section className={styles.uploadPanel} aria-labelledby="clew-workshop-upload-title">
        <div className={styles.panelHead}>
          <h2 id="clew-workshop-upload-title">上传材料</h2>
          <p>
            带文字层 PDF / Markdown / 纯文本 · 单份不超过 {detail.limits.maxPagesPerFile} 页 ·
            本课题 {detail.files.length}/{detail.limits.filesPerWorkshopLimit} 份
          </p>
        </div>
        <div className={styles.uploadRow}>
          <label className={styles.filePicker}>
            <FileUp aria-hidden="true" size={18} strokeWidth={1.5} />
            <span className={styles.filePickerText}>{file ? file.name : "选择材料文件"}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.md,.markdown,.txt,application/pdf,text/plain,text/markdown"
              className={styles.fileInput}
              disabled={uploading || streaming}
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
          </label>
          <V2Button
            className={styles.v2Button}
            disabled={!file || uploading || streaming}
            onClick={onUpload}
          >
            {uploading ? (
              <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
            ) : null}
            {uploading ? "上传并检测中" : "上传材料"}
          </V2Button>
        </div>
        <p className={styles.uploadHint}>
          上传即检测：图片与扫描版（无文字层）PDF 会明确拒绝并说明原因，OCR 能力后续开放；材料存服务器且仅本人可见。
        </p>
        {uploadError ? (
          <p className={styles.errorBox} role="alert">
            <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
            <span>{uploadError}</span>
          </p>
        ) : null}
      </section>

      <section className={styles.textbookSection} aria-labelledby="clew-workshop-files-title">
        <div className={styles.sectionHead}>
          <h2 id="clew-workshop-files-title">课题材料</h2>
          <span>{detail.files.length} 份</span>
        </div>
        {detail.files.length === 0 ? (
          <p className={styles.emptyState}>还没有材料。上传一份短材料后，就可以就材料内容追问。</p>
        ) : (
          <ul className={styles.textbookList}>
            {detail.files.map((item) => (
              <li key={item.id} className={styles.textbookCard}>
                <div className={styles.textbookMain}>
                  <p className={styles.textbookTitle}>
                    <FileText aria-hidden="true" size={15} strokeWidth={1.6} />
                    {item.fileName}
                  </p>
                  <p className={styles.textbookMeta}>
                    {item.pageCount} 页 · {formatSize(item.sizeBytes)} · 上传于 {item.createdAt.slice(0, 10)}
                  </p>
                  <V2Badge variant="muted" className={styles.stateBadge}>
                    {describeFileState(item)}
                  </V2Badge>
                </div>
                <div className={styles.textbookActions}>
                  <button
                    type="button"
                    className={styles.ghostButton}
                    disabled={uploading || streaming}
                    onClick={() => onDeleteFile(item)}
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

      <section className={styles.chatPanel} id="ask" aria-labelledby="clew-workshop-chat-title">
        <div className={styles.panelHead}>
          <h2 id="clew-workshop-chat-title">
            <MessageSquareText aria-hidden="true" size={17} strokeWidth={1.6} />
            就材料追问
          </h2>
          <p>回答只依据命中片段并标注来源；材料里没有的内容会如实说明</p>
        </div>

        <div className={styles.chatList} ref={chatListRef} aria-live="polite">
          {visibleMessages.length === 0 ? (
            <p className={styles.chatEmpty}>
              {readyFileCount > 0
                ? "先提一个问题试试，例如「这份材料讲了哪些重点？」"
                : "请先上传材料，再开始追问。"}
            </p>
          ) : (
            visibleMessages.map((message, index) => (
              <div
                key={`${message.createdAt}-${index}`}
                className={message.role === "user" ? styles.chatRowUser : styles.chatRowAssistant}
              >
                <p className={styles.chatRole}>{message.role === "user" ? "我" : "NUR 答疑"}</p>
                <div className={styles.chatBubble}>
                  {message.role === "assistant" ? (
                    <div className={styles.chatMarkdown}>
                      <ClewMarkdown markdown={message.content} />
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))
          )}
          {streaming ? (
            <div className={styles.chatRowAssistant}>
              <p className={styles.chatRole}>NUR 答疑</p>
              <div className={styles.chatBubble}>
                {streamingTail ? (
                  <div className={styles.chatMarkdown}>
                    <ClewMarkdown markdown={streamingTail.content} />
                  </div>
                ) : (
                  "正在检索材料…"
                )}
                <span className={styles.streamCaret} aria-hidden="true" />
              </div>
            </div>
          ) : null}
        </div>

        {progressLog.length > 0 && streaming ? (
          <ul className={styles.progressLog} aria-label="答疑进度">
            {progressLog.map((entry, index) => (
              <li key={`${index}-${entry}`}>{entry}</li>
            ))}
          </ul>
        ) : null}

        {chatError ? (
          <p className={styles.errorBox} role="alert">
            <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
            <span>{chatError}</span>
          </p>
        ) : null}

        {citations.length > 0 ? (
          <div className={styles.citationPanel} aria-label="本轮命中片段">
            <p className={styles.citationTitle}>本轮命中 {citations.length} 个材料片段</p>
            <ul className={styles.citationList}>
              {citations.map((citation, index) => (
                <li key={`${citation.fileId}-${index}`} className={styles.citationItem}>
                  <p className={styles.citationSource}>
                    {citation.fileName} · {citation.locator}
                  </p>
                  <p className={styles.citationExcerpt}>{citation.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {chatNotes.length > 0 ? (
          <ul className={styles.noteList} aria-label="答疑说明">
            {chatNotes.map((entry, index) => (
              <li key={`${index}-${entry.slice(0, 24)}`}>{entry}</li>
            ))}
          </ul>
        ) : null}

        <form
          className={styles.chatForm}
          onSubmit={(event) => {
            event.preventDefault();
            void onSendMessage();
          }}
        >
          <label className={styles.chatField}>
            <span className={styles.chatFieldLabel}>提问（Enter 发送）</span>
            <textarea
              className={styles.chatInput}
              value={chatDraft}
              maxLength={1000}
              rows={2}
              placeholder={readyFileCount > 0 ? "就这份课题的材料提问…" : "请先上传材料"}
              disabled={streaming || readyFileCount === 0}
              onChange={(event) => setChatDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  void onSendMessage();
                }
              }}
            />
          </label>
          <V2Button
            className={styles.v2Button}
            type="submit"
            disabled={chatDraft.trim().length === 0 || streaming || readyFileCount === 0}
          >
            {streaming ? (
              <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
            ) : (
              <CornerDownLeft aria-hidden="true" size={16} strokeWidth={1.8} />
            )}
            {streaming ? "检索与回答中" : "发送"}
          </V2Button>
        </form>
      </section>

      <p className={styles.footNote}>
        回答只依据本课题材料的命中片段；材料未覆盖的内容会如实说明，不做联网搜索。返回{" "}
        <Link href="/learn/clew/w">课题列表</Link>。
      </p>
    </div>
  );
}
