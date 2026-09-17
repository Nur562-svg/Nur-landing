"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  CircleAlert,
  CornerDownLeft,
  Loader2,
  MessageSquareText,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import type {
  HiDocApiFailure,
  HiDocChapterStudyView,
  HiDocChatEvent,
  HiDocChatMessage,
  HiDocKnowledgePointStudySummary,
  HiDocKnowledgePointStudyView,
  HiDocLessonEvent,
  HiDocLessonView,
} from "@/types/hidoc";
import { describeHiDocLessonGenerator } from "@/lib/hidoc/lesson-heuristic";
import { HiDocMarkdown } from "./hi-doc-markdown";
import styles from "./hi-doc.module.css";

/**
 * Hi doc 学习页（客户端）：左侧知识点列表 + 右侧讲义（SSE 生成/流式预览）+ 底部讲解追问（SSE 流式）。
 * 所有生成都走服务端 API；这里只负责展示、确认覆盖与事件解析。
 */

type HiDocStudyRoomProps = {
  textbookId: string;
  chapter: HiDocChapterStudyView;
  selected: HiDocKnowledgePointStudyView;
};

const statusLabels: Record<HiDocChapterStudyView["chapter"]["status"], string> = {
  pending: "未萃取",
  extracting: "萃取中",
  extracted: "已萃取",
  failed: "萃取失败",
};

function readFailure(payload: unknown): string {
  const candidate = payload as HiDocApiFailure | null;
  return candidate?.error ?? "服务返回异常，请稍后重试。";
}

/** SSE 行解析（讲义生成与讲解对话共用）。 */
async function consumeSse(
  response: Response,
  onEvent: (event: unknown) => void,
): Promise<void> {
  if (!response.body) {
    onEvent({ type: "error", code: "server-error", error: "服务没有返回数据流，请稍后重试。" });
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

export function HiDocStudyRoom({ textbookId, chapter, selected }: HiDocStudyRoomProps) {
  const knowledgePoint = selected.knowledgePoint;

  const [lesson, setLesson] = useState<HiDocLessonView | null>(selected.lesson);
  const [lessonDraft, setLessonDraft] = useState("");
  const [lessonLog, setLessonLog] = useState<string[]>([]);
  const [lessonNotes, setLessonNotes] = useState<string[]>([]);
  const [lessonError, setLessonError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [confirmingRegenerate, setConfirmingRegenerate] = useState(false);

  const [messages, setMessages] = useState<HiDocChatMessage[]>(selected.messages);
  const [chatDraft, setChatDraft] = useState("");
  const [chatError, setChatError] = useState<string | null>(null);
  const [chatNotes, setChatNotes] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);
  const chatListRef = useRef<HTMLDivElement>(null);

  async function onGenerateLesson() {
    if (generating) {
      return;
    }
    setConfirmingRegenerate(false);
    setGenerating(true);
    setLessonError(null);
    setLessonNotes([]);
    setLessonLog([`开始为「${knowledgePoint.title}」生成讲义…`]);
    setLessonDraft("");

    try {
      const response = await fetch(`/api/hidoc/kp/${knowledgePoint.id}/lesson`, { method: "POST" });
      if (!response.ok || !response.body) {
        let message = "讲义生成失败：服务暂时不可用，请稍后重试。";
        try {
          message = readFailure(await response.json());
        } catch {
          // 保持默认提示
        }
        setLessonError(message);
        setLessonDraft("");
        return;
      }
      await consumeSse(response, (raw) => {
        const event = raw as HiDocLessonEvent;
        if (event.type === "progress") {
          setLessonLog((log) => [...log, event.message]);
        } else if (event.type === "delta") {
          setLessonDraft((draft) => draft + event.text);
        } else if (event.type === "result") {
          setLesson(event.lesson);
          setLessonNotes(event.notes);
          setLessonDraft("");
        } else {
          setLessonError(event.error);
          setLessonDraft("");
        }
      });
    } catch {
      setLessonError("讲义生成失败：网络或服务暂时不可用，请稍后重试。");
      setLessonDraft("");
    } finally {
      setGenerating(false);
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
    setChatDraft("");
    setMessages((current) => [
      ...current,
      { role: "user", content: question, createdAt: new Date().toISOString() },
    ]);
    let answer = "";

    try {
      const response = await fetch(`/api/hidoc/kp/${knowledgePoint.id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      if (!response.ok || !response.body) {
        let message = "讲解失败：服务暂时不可用，请稍后重试。";
        try {
          message = readFailure(await response.json());
        } catch {
          // 保持默认提示
        }
        setChatError(message);
        return;
      }
      await consumeSse(response, (raw) => {
        const event = raw as HiDocChatEvent;
        if (event.type === "delta") {
          answer += event.text;
          setMessages((current) => {
            const last = current[current.length - 1];
            return last?.role === "assistant"
              ? [...current.slice(0, -1), { ...last, content: answer }]
              : [...current, { role: "assistant", content: answer, createdAt: new Date().toISOString() }];
          });
        } else if (event.type === "result") {
          setMessages(event.conversation.messages);
          setChatNotes(event.notes);
        } else {
          setChatError(event.error);
        }
      });
      if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }
    } catch {
      setChatError("讲解失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setStreaming(false);
      if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }
    }
  }

  return (
    <div className={styles.studyLayout}>
      <aside className={styles.studyAside} aria-label="知识点列表">
        <div className={styles.studyAsideHead}>
          <h2>知识点</h2>
          <span>
            {chapter.knowledgePoints.length} 个 · 讲义 {chapter.lessonCount} 份
          </span>
        </div>
        <p className={styles.studyAsideMeta}>
          第 {chapter.chapterIndex}/{chapter.chapterTotal} 章《{chapter.chapter.title}》· 第{" "}
          {chapter.chapter.pageStart}–{chapter.chapter.pageEnd} 页 · {statusLabels[chapter.chapter.status]}
        </p>

        {chapter.knowledgePoints.length === 0 ? (
          <p className={styles.studyAsideEmpty}>
            本章还没有知识点。回到
            <Link href={`/learn/hi-doc/t/${textbookId}`}> 教材详情 </Link>
            对本章运行「萃取知识点」。
          </p>
        ) : (
          <ul className={styles.kpNavList}>
            {chapter.knowledgePoints.map((point: HiDocKnowledgePointStudySummary) => {
              const isActive = point.id === knowledgePoint.id;
              return (
                <li key={point.id}>
                  <Link
                    className={isActive ? styles.kpNavItemActive : styles.kpNavItem}
                    href={`/learn/hi-doc/t/${textbookId}/c/${chapter.chapter.order}?kp=${point.id}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className={styles.kpNavIndex}>{String(point.order).padStart(2, "0")}</span>
                    <span className={styles.kpNavMain}>
                      <span className={styles.kpNavTitle}>{point.title}</span>
                      <span className={styles.kpNavMeta}>
                        第 {point.sourcePage} 页 · {point.hasLesson ? "已有讲义" : "未生成讲义"}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </aside>

      <section className={styles.studyMain} aria-label="讲义与追问">
        <header className={styles.studyKpHead}>
          <p className={styles.kicker}>知识点 {String(knowledgePoint.order).padStart(2, "0")}</p>
          <h2 className={styles.studyKpTitle}>{knowledgePoint.title}</h2>
          <p className={styles.studyKpMeta}>
            教材第 {knowledgePoint.sourcePage} 页
            {knowledgePoint.keyTerms.length > 0 ? ` · 术语：${knowledgePoint.keyTerms.join("、")}` : ""}
            {knowledgePoint.prerequisites.length > 0
              ? ` · 先修：${knowledgePoint.prerequisites.join("、")}`
              : ""}
          </p>
          <p className={styles.studyKpDescription}>{knowledgePoint.description}</p>
        </header>

        <section className={styles.lessonPanel} aria-labelledby="hidoc-lesson-title">
          <div className={styles.panelHead}>
            <h2 id="hidoc-lesson-title">讲义</h2>
            {lesson ? (
              <p>
                {describeHiDocLessonGenerator(lesson.generator)} ·{" "}
                {new Date(lesson.generatedAt).toLocaleString("zh-CN", {
                  hour12: false,
                  timeZone: "Asia/Shanghai",
                })}
              </p>
            ) : (
              <p>尚未生成</p>
            )}
          </div>

          <div className={styles.actionRow}>
            {!generating ? (
              lesson ? (
                confirmingRegenerate ? (
                  <>
                    <span className={styles.confirmNote}>重新生成将覆盖当前讲义，确认继续？</span>
                    <button type="button" className={styles.primaryButton} onClick={onGenerateLesson}>
                      <RefreshCw aria-hidden="true" size={15} strokeWidth={1.6} />
                      确认重新生成
                    </button>
                    <button
                      type="button"
                      className={styles.ghostButton}
                      onClick={() => setConfirmingRegenerate(false)}
                    >
                      取消
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className={styles.ghostButton}
                    onClick={() => setConfirmingRegenerate(true)}
                  >
                    <RefreshCw aria-hidden="true" size={15} strokeWidth={1.6} />
                    重新生成讲义
                  </button>
                )
              ) : (
                <button type="button" className={styles.primaryButton} onClick={onGenerateLesson}>
                  <Sparkles aria-hidden="true" size={16} strokeWidth={1.6} />
                  生成讲义
                </button>
              )
            ) : (
              <span className={styles.confirmNote}>
                <Loader2 className={styles.spin} aria-hidden="true" size={14} strokeWidth={1.8} /> 生成中…
              </span>
            )}
          </div>

          {lessonLog.length > 0 && (generating || lessonNotes.length > 0 || lessonError) ? (
            <ul className={styles.progressLog} aria-label="讲义生成进度">
              {lessonLog.map((line, index) => (
                <li key={`${index}-${line}`}>{line}</li>
              ))}
            </ul>
          ) : null}

          {lessonError ? (
            <p className={styles.errorBox} role="alert">
              <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
              <span>{lessonError}</span>
            </p>
          ) : null}

          {lessonNotes.length > 0 ? (
            <ul className={styles.noteList} aria-label="讲义说明">
              {lessonNotes.map((note, index) => (
                <li key={`${index}-${note}`}>{note}</li>
              ))}
            </ul>
          ) : null}

          {generating && lessonDraft ? (
            <div className={styles.lessonBody} aria-label="讲义生成中预览">
              <HiDocMarkdown markdown={lessonDraft} />
            </div>
          ) : lesson ? (
            <div className={styles.lessonBody}>
              <HiDocMarkdown markdown={lesson.contentMd} />
            </div>
          ) : (
            <p className={styles.emptyState}>
              还没有讲义。点「生成讲义」：已接入模型时按教材原文片段撰写（定义 / 要点 / 易错点 / 自测题 3 道）；
              未接入模型时走确定性整理，并明确标注「未接入模型」。
            </p>
          )}
        </section>

        <section className={styles.chatPanel} aria-labelledby="hidoc-chat-title">
          <div className={styles.panelHead}>
            <h2 id="hidoc-chat-title">
              <MessageSquareText aria-hidden="true" size={17} strokeWidth={1.6} /> 讲解追问
            </h2>
            <p>AI 讲解，可能出错；请对照教材原文与讲义核对</p>
          </div>

          <div className={styles.chatList} ref={chatListRef} aria-live="polite">
            {messages.length === 0 ? (
              <p className={styles.chatEmpty}>
                就这个知识点追问，例如：「这一页的要点我记混了，怎么区分？」「为什么这里不能直接等同？」
              </p>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${index}-${message.createdAt}`}
                  className={message.role === "user" ? styles.chatRowUser : styles.chatRowAssistant}
                >
                  <p className={styles.chatRole}>{message.role === "user" ? "我" : "NUR 讲解"}</p>
                  <div className={styles.chatBubble}>
                    {message.role === "assistant" ? (
                      <div className={styles.chatMarkdown}>
                        <HiDocMarkdown markdown={message.content} />
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
                <p className={styles.chatRole}>NUR 讲解</p>
                <div className={styles.chatBubble}>
                  {messages[messages.length - 1]?.role === "assistant" ? (
                    <div className={styles.chatMarkdown}>
                      <HiDocMarkdown markdown={messages[messages.length - 1].content} />
                    </div>
                  ) : (
                    "正在思考…"
                  )}
                  <span className={styles.streamCaret} aria-hidden="true" />
                </div>
              </div>
            ) : null}
          </div>

          {chatError ? (
            <p className={styles.errorBox} role="alert">
              <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
              <span>{chatError}</span>
            </p>
          ) : null}

          {chatNotes.length > 0 && !streaming ? (
            <ul className={styles.noteList} aria-label="对话说明">
              {chatNotes.map((note, index) => (
                <li key={`${index}-${note}`}>{note}</li>
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
              <span className={styles.chatFieldLabel}>追问（Enter 发送）</span>
              <input
                className={styles.chatInput}
                type="text"
                value={chatDraft}
                maxLength={1000}
                placeholder="就这个知识点继续问…"
                disabled={streaming}
                onChange={(event) => setChatDraft(event.target.value)}
              />
            </label>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={streaming || chatDraft.trim().length === 0}
            >
              {streaming ? (
                <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
              ) : (
                <CornerDownLeft aria-hidden="true" size={16} strokeWidth={1.6} />
              )}
              {streaming ? "回答中" : "发送"}
            </button>
          </form>
        </section>

        <p className={styles.footNote}>
          Hi doc 生成物为 AI 产品内容，不挂官方课的证据分级；知识点为模型萃取草稿，页码可溯源。
          返回 <Link href={`/learn/hi-doc/t/${textbookId}`}>教材详情</Link> 或{" "}
          <Link href="/learn/hi-doc">Hi doc 书架</Link>。
        </p>
      </section>
    </div>
  );
}