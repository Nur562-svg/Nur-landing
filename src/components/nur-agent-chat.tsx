"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isTextUIPart, isToolUIPart, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FsrsCriterionSummary } from "@/types/nur-agent";
import styles from "./nur-agent-chat.module.css";
import { recordAgentCallUsage } from "@/lib/quotas";

type TaskContext = {
  version: 1;
  previousRunId: string | null;
  courseId: string;
  courseSlug: string;
  courseVersionId: string;
  offeringId: string;
  knowledgePointId: string;
  surface: "subjective-writing" | "case-reasoning";
  taskId: string;
  segmentId: string | null;
  requestRewrite: boolean;
  confirmedHistory: readonly {
    attemptId: string;
    surface: "subjective-writing" | "case-reasoning";
    taskId: string;
    segmentId: string | null;
    confirmedText: string;
  }[];
  privateRef?: "nur-qwen-private-ref" | null;
} | null;

type NurAgentChatProps = {
  courseSlug: string | null;
  knowledgePointId: string | null;
  fsrsSummary: readonly FsrsCriterionSummary[] | null;
  currentText: string | null;
  taskContext: TaskContext;
};

function ToolResultCard({ output }: { output: unknown }) {
  const result = (output ?? {}) as Record<string, unknown>;
  const omissions = Array.isArray(result.omissions) ? result.omissions : [];
  const nextStep = result.nextStep as { prompt: string } | null;
  const rewriteProposals = Array.isArray(result.rewriteProposals)
    ? result.rewriteProposals
    : [];
  const reviewProposals = Array.isArray(result.reviewProposals)
    ? result.reviewProposals
    : [];

  if (result.error) {
    return (
      <div className={styles.toolCard}>
        <div className={styles.toolCardHeader}>
          <span className={styles.toolCardTitle}>结构分析</span>
        </div>
        <p className={styles.toolError}>{result.error as string}</p>
      </div>
    );
  }

  return (
    <div className={styles.toolCard}>
      <div className={styles.toolCardHeader}>
        <span className={styles.toolCardTitle}>结构分析结果</span>
      </div>
      {omissions.length > 0 ? (
        <div className={styles.toolSection}>
          <h4>遗漏项（{omissions.length}）</h4>
          <ul>
            {omissions.map((om: { label: string; detail: string }, i: number) => (
              <li key={i}>
                <strong>{om.label}</strong>
                <span>{om.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.toolOk}>未发现结构遗漏。</p>
      )}
      {nextStep ? (
        <div className={styles.toolSection}>
          <h4>下一步</h4>
          <p>{nextStep.prompt}</p>
        </div>
      ) : null}
      {rewriteProposals.length > 0 ? (
        <div className={styles.toolSection}>
          <h4>改写建议</h4>
          {rewriteProposals.map(
            (rp: { rationale: string; rewrittenText: string }, i: number) => (
              <div key={i} className={styles.rewriteProposal}>
                <p className={styles.rationale}>{rp.rationale}</p>
                <pre className={styles.rewriteText}>{rp.rewrittenText}</pre>
              </div>
            ),
          )}
        </div>
      ) : null}
      {reviewProposals.length > 0 ? (
        <div className={styles.toolSection}>
          <h4>复习建议</h4>
          <ul>
            {reviewProposals.map(
              (rv: { label: string; rationale: string }, i: number) => (
                <li key={i}>
                  <strong>{rv.label}</strong>
                  <span>{rv.rationale}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const textParts = message.parts.filter(isTextUIPart);
  const toolParts = message.parts.filter(isToolUIPart);
  const text = textParts.map((p) => p.text).join("");

  return (
    <div className={isUser ? styles.userMessage : styles.assistantMessage}>
      {text ? <div className={styles.bubble}>{text}</div> : null}
      {toolParts.map((tp, i) => {
        const invocation = tp as unknown as {
          toolCallId: string;
          state: string;
          output?: unknown;
          input?: unknown;
          toolName?: string;
        };
        if (invocation.state === "output-available" && invocation.output) {
          return (
            <ToolResultCard
              key={invocation.toolCallId ?? i}
              output={invocation.output}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export function NurAgentChat(props: NurAgentChatProps) {
  const { courseSlug, knowledgePointId, fsrsSummary, currentText, taskContext } = props;
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/nur-agent/chat",
        body: {
          courseSlug: courseSlug ?? undefined,
          knowledgePointId: knowledgePointId ?? undefined,
          fsrsSummary,
          currentText,
          taskContext,
        },
      }),
    [courseSlug, knowledgePointId, fsrsSummary, currentText, taskContext],
  );

  const { messages, sendMessage, status, error, stop } = useChat({ transport });
  const isLoading = status === "submitted" || status === "streaming";
  const isThinking = status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status, isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    recordAgentCallUsage();
    sendMessage({ text: input.trim() });
    setInput("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.messageList} ref={scrollRef}>
        {messages.length === 0 ? (
          <div className={styles.empty}>
            <p>问任何医学或学习相关问题。</p>
            <p className={styles.emptyHint}>
              例如：&ldquo;什么是细胞膜？&rdquo;、&ldquo;舌质淡白什么意思？&rdquo;、&ldquo;帮我检查答案&rdquo;
            </p>
          </div>
        ) : (
          messages.map((m) => <ChatMessage key={m.id} message={m} />)
        )}
        {isThinking ? (
          <div className={styles.assistantMessage}>
            <div className={styles.thinking}>
              <span className={styles.thinkingOrbs}>
                <span className={styles.thinkingOrb} />
                <span className={styles.thinkingOrb} />
                <span className={styles.thinkingOrb} />
              </span>
            </div>
          </div>
        ) : null}
        {error ? (
          <div className={styles.error}>
            <p>请求失败：{error.message}</p>
          </div>
        ) : null}
      </div>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="问任何问题..."
          disabled={isLoading}
          type="text"
        />
        {isLoading ? (
          <button type="button" className={styles.stopButton} onClick={stop}>
            停止
          </button>
        ) : (
          <button type="submit" className={styles.sendButton} disabled={!input.trim()}>
            发送
          </button>
        )}
      </form>
    </div>
  );
}
