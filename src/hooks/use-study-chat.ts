"use client";

import { useEffect, useRef, useState } from "react";

import { consumeClewSse, readClewFailure } from "@/lib/clew/client-api";
import { isClewChatScope } from "@/lib/clew/chat-scope";
import type {
  ClewChatEvent,
  ClewChatMessage,
  ClewChatScope,
  ClewLessonStyle,
} from "@/types/clew";
import {
  CHAT_INTENSITY_STORAGE_KEY,
  CHAT_SCOPE_STORAGE_KEY,
  readStoredValue,
  writeStoredValue,
} from "@/lib/clew/study-preferences";

/**
 * 「问 Clew」行为 hook（设计评审 P1-B 第一刀：从 clew-study.tsx 纯搬移，行为不变）。
 * 状态/事件解析/持久化与搬移前逐字一致；视图层（clew-study.tsx）只消费返回值。
 * 依赖注入：knowledgePointId（提问路由）、lessonStyle（每轮显式发送，服务端记账户默认）、
 * initialMessages（服务端注入的历史——组件按 KP remount，挂载即初值）。
 */
export function useStudyChat(options: {
  knowledgePointId: string;
  lessonStyle: ClewLessonStyle;
  initialMessages: ClewChatMessage[];
}) {
  const { knowledgePointId, lessonStyle, initialMessages } = options;

  const [messages, setMessages] = useState<ClewChatMessage[]>(initialMessages);
  const [chatDraft, setChatDraft] = useState("");
  const [chatError, setChatError] = useState<string | null>(null);
  const [chatNotes, setChatNotes] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [chatChipOpen, setChatChipOpen] = useState(false);
  /** 讲解「依据范围」（批 3；首渲染缺省避免 hydration mismatch，挂载后读本机偏好）。 */
  const [chatScope, setChatScope] = useState<ClewChatScope>("lesson+source");
  /** 流式前的真实阶段文案（SSE status 里程碑；首个 delta 到达即让位给正文）。 */
  const [chatStatus, setChatStatus] = useState<string | null>(null);
  /** ZCODE-M6（D8）：问 Clew 思考强度（standard 缺省 / deep=Pro·Max，服务端校验）。 */
  const [chatIntensity, setChatIntensity] = useState<"standard" | "deep">("standard");
  /** ZCODE-M6（D10）：跨 KP 跳转建议（回答结束后服务端确定性匹配；发送新问题时清空）。 */
  const [chatSuggestions, setChatSuggestions] = useState<{ kpId: string; title: string; href: string }[]>([]);
  /** 讲解设置弹出面板（风格 + 依据范围的单入口）。 */
  const [chatSettingsOpen, setChatSettingsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const chatListRef = useRef<HTMLDivElement>(null);

  // 依据范围偏好：本机记住上次选择（非法值回落缺省讲义+原文；localStorage 不可用时保持缺省）
  useEffect(() => {
    try {
      const stored = readStoredValue(CHAT_SCOPE_STORAGE_KEY);
      if (isClewChatScope(stored)) {
        setChatScope(stored);
      }
    } catch {
      // localStorage 不可用时保持默认 lesson+source
    }
  }, []);

  // 思考强度偏好：本机记住上次选择（非法值回落标准档）
  useEffect(() => {
    try {
      const stored = readStoredValue(CHAT_INTENSITY_STORAGE_KEY);
      if (stored === "standard" || stored === "deep") {
        setChatIntensity(stored);
      }
    } catch {
      // localStorage 不可用时保持标准档
    }
  }, []);

  // 讲解设置面板：Escape 关闭 + 点外部关闭
  useEffect(() => {
    if (!chatSettingsOpen) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setChatSettingsOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest(`[data-chat-settings-wrap]`)) {
        setChatSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [chatSettingsOpen]);

  function onSwitchChatScope(scope: ClewChatScope): void {
    setChatScope(scope);
    try {
      writeStoredValue(CHAT_SCOPE_STORAGE_KEY, scope);
    } catch {
      // 持久化失败不影响本次切换
    }
  }

  function onSwitchChatIntensity(intensity: "standard" | "deep"): void {
    setChatIntensity(intensity);
    try {
      writeStoredValue(CHAT_INTENSITY_STORAGE_KEY, intensity);
    } catch {
      // 持久化失败不影响本次切换
    }
  }

  async function sendChat(question: string) {
    if (question.length === 0 || streaming) {
      return;
    }
    setStreaming(true);
    setChatError(null);
    setChatNotes([]);
    setChatStatus(null);
    setChatSuggestions([]);
    setMessages((current) => [
      ...current,
      { role: "user", content: question, createdAt: new Date().toISOString() },
    ]);
    let answer = "";

    try {
      const response = await fetch(`/api/clew/kp/${knowledgePointId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, style: lessonStyle, scope: chatScope, intensity: chatIntensity }),
      });
      if (!response.ok || !response.body) {
        let message = "讲解失败：服务暂时不可用，请稍后重试。";
        try {
          message = readClewFailure(await response.json());
        } catch {
          // 保持默认提示
        }
        setChatError(message);
        return;
      }
      await consumeClewSse(response, (raw) => {
        const event = raw as ClewChatEvent;
        if (event.type === "status") {
          setChatStatus(event.message);
        } else if (event.type === "delta") {
          setChatStatus(null);
          answer += event.text;
          setMessages((current) => {
            const last = current[current.length - 1];
            return last?.role === "assistant"
              ? [...current.slice(0, -1), { ...last, content: answer }]
              : [...current, { role: "assistant", content: answer, createdAt: new Date().toISOString() }];
          });
        } else if (event.type === "result") {
          setChatStatus(null);
          setMessages(event.conversation.messages);
          setChatNotes(event.notes);
        } else if (event.type === "suggestions") {
          setChatSuggestions(event.items);
        } else {
          setChatStatus(null);
          setChatError(event.error);
        }
      });
      if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }
    } catch {
      setChatError("讲解失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setChatStatus(null);
      setStreaming(false);
      if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }
    }
  }

  async function onSendMessage() {
    const question = chatDraft.trim();
    if (question.length === 0 || streaming) {
      return;
    }
    setChatDraft("");
    await sendChat(question);
  }

  /** 「重新生成」（DESIGN_V4 §五 P2 语义）：对同一条提问重新请求一次——计入一次问答配额，
   *  结果作为新回答追加在历史之后，不静默覆盖任何已保存内容。 */
  function onRegenerateAnswer(index: number) {
    if (streaming) {
      return;
    }
    for (let i = index - 1; i >= 0; i -= 1) {
      if (messages[i]?.role === "user") {
        void sendChat(messages[i].content);
        return;
      }
    }
  }

  /** 「复制」= 纯前端复制该回答 markdown（DESIGN_V4 §五）。剪贴板不可用时静默失败。 */
  async function onCopyAnswer(index: number, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      window.setTimeout(() => {
        setCopiedIndex((current) => (current === index ? null : current));
      }, 1600);
    } catch {
      // 隐私模式/权限拒绝：不打断阅读
    }
  }

  return {
    messages,
    setMessages,
    chatDraft,
    setChatDraft,
    chatError,
    chatNotes,
    streaming,
    chatChipOpen,
    setChatChipOpen,
    chatScope,
    chatStatus,
    chatIntensity,
    chatSuggestions,
    chatSettingsOpen,
    setChatSettingsOpen,
    copiedIndex,
    setCopiedIndex,
    chatListRef,
    onSwitchChatScope,
    onSwitchChatIntensity,
    onSendMessage,
    onRegenerateAnswer,
    onCopyAnswer,
  };
}
