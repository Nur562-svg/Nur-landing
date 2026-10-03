"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CircleAlert,
  CornerDownLeft,
  Loader2,
  MessageSquareText,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import type {
  ClewChapterStudyView,
  ClewChatEvent,
  ClewChatMessage,
  ClewKnowledgePointStudySummary,
  ClewKnowledgePointStudyView,
  ClewLessonEvent,
  ClewLessonStyle,
  ClewLessonView,
} from "@/types/clew";
import { LOOP_PROFILES, type LoopProfileId, type LoopStage } from "@/types/loop-profile";
import { consumeClewSse, readClewFailure } from "@/lib/clew/client-api";
import {
  CLEW_LESSON_STYLES,
  CLEW_LESSON_STYLE_LABELS,
  describeClewLessonGenerator,
  isClewLessonStyle,
  parseClewLessonSelfTest,
} from "@/lib/clew/lesson-heuristic";
import { formatClewPageRange, formatClewSourcePage } from "@/lib/clew/source-label";
import { resolveClewGuide } from "@/lib/clew/step-guide";
import {
  CLEW_LESSON_VARIANT_SHORT_LABELS,
  CLEW_LESSON_VARIANTS,
  deriveClewLessonVariant,
  isClewLessonVariant,
  type ClewLessonVariant,
} from "@/lib/clew/lesson-variants";
import { V2Button } from "@/components/ui/v2/button";
import { ClewHighlightLayer } from "./clew-highlights";
import {
  ClewLoopProfileBadge,
  ClewStageSpine,
  type ClewStageSpineItem,
  type ClewStageSpineState,
} from "./clew-loop-profile";
import { ClewMarkdown } from "./clew-markdown";
import { ClewGraph } from "./clew-graph";
import { ClewNotePanel } from "./clew-note";
import { ClewPathGuide } from "./clew-path-guide";
import styles from "./clew.module.css";

/**
 * Clew 学习页（客户端）：左侧知识点列表 + 竖向闭环脊柱 + 讲义（SSE 生成/流式预览）+ 划重点层 + 自测（评）+ 讲解追问（SSE 流式）+ 章级学霸笔记。
 * 所有生成都走服务端 API；这里只负责展示、确认覆盖与事件解析。
 * 体验补丁（2026-10-02）：环节脊柱 = 真实动作入口（能点的都真的做事，未建的不装）；「讲解追问」品牌化为「问 Clew」；生成时可显式选择讲解风格。
 */

type ClewStudyRoomProps = {
  textbookId: string;
  chapter: ClewChapterStudyView;
  selected: ClewKnowledgePointStudyView;
};

const statusLabels: Record<ClewChapterStudyView["chapter"]["status"], string> = {
  pending: "未萃取",
  extracting: "萃取中",
  extracted: "已萃取",
  failed: "萃取失败",
};

/** 学习页显示模式（ZCODE-M3 Phase 4）：focus = 单任务（追问下置）；workspace = 工作台三栏。 */
type ClewStudyMode = "focus" | "workspace";
const STUDY_MODE_STORAGE_KEY = "nur-learn:clew-study-mode";
/** 讲解风格偏好（浏览器本地；生成时显式发送，并由服务端更新账户默认）。 */
const LESSON_STYLE_STORAGE_KEY = "nur-learn:clew-lesson-style";
/** 讲义视图偏好（初学/复习/备考；仅影响正文显示文本，同一份讲义确定性派生）。 */
const LESSON_VARIANT_STORAGE_KEY = "nur-learn:clew-lesson-view";
/** 自测标记存储键前缀（按知识点隔离；换讲义版本自动重置）。 */
const SELF_CHECK_STORAGE_PREFIX = "nur-learn:clew-selfcheck:";

type SelfCheckMark = "ok" | "shaky";
type SelfCheckStored = {
  lessonGeneratedAt: string;
  marks: Record<string, SelfCheckMark>;
};

export function ClewStudyRoom({ textbookId, chapter, selected }: ClewStudyRoomProps) {
  const knowledgePoint = selected.knowledgePoint;
  const router = useRouter();

  const [lesson, setLesson] = useState<ClewLessonView | null>(selected.lesson);
  const [lessonDraft, setLessonDraft] = useState("");
  const [lessonLog, setLessonLog] = useState<string[]>([]);
  const [lessonNotes, setLessonNotes] = useState<string[]>([]);
  const [lessonError, setLessonError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [confirmingRegenerate, setConfirmingRegenerate] = useState(false);
  /** 生成讲义时发送的讲解风格（默认跟随本机最近选择；服务端保存为账户默认）。 */
  const [lessonStyle, setLessonStyle] = useState<ClewLessonStyle>("zh-primary");
  // ZCODE-M4 Phase 1：讲义三视图（首渲染默认值避免 hydration mismatch，挂载后读实际值）
  const [lessonVariant, setLessonVariant] = useState<ClewLessonVariant>("full");

  const [messages, setMessages] = useState<ClewChatMessage[]>(selected.messages);
  const [chatDraft, setChatDraft] = useState("");
  const [chatError, setChatError] = useState<string | null>(null);
  const [chatNotes, setChatNotes] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [chatChipOpen, setChatChipOpen] = useState(false);
  const chatListRef = useRef<HTMLDivElement>(null);
  const lessonBodyRef = useRef<HTMLDivElement>(null);
  const lessonPanelRef = useRef<HTMLElement>(null);
  const selfCheckPanelRef = useRef<HTMLElement>(null);

  // ZCODE-M2 Phase 3：学习闭环 profile（AI 建议只是默认，用户可切换）
  const [profileId, setProfileId] = useState<LoopProfileId>(knowledgePoint.loopProfileId);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  /** 本页切换后的 profile（让左栏小字即时跟上，不等整页刷新）。 */
  const [profileOverride, setProfileOverride] = useState<LoopProfileId | null>(null);

  // ZCODE-M2 Phase 4：学习会话（服务器持久化，跨页面状态连续）
  const [, setSessionId] = useState<string | null>(null);
  const [completedStages, setCompletedStages] = useState<readonly LoopStage[]>(
    selected.lesson ? ["learn"] : [],
  );
  const [activeStage, setActiveStage] = useState<LoopStage | undefined>(undefined);
  const sessionIdRef = useRef<string | null>(null);

  // 体验补丁：「评」自测（标记存浏览器本地；「还需看」提交到统一学习事件流）
  const [selfCheckMarks, setSelfCheckMarks] = useState<Record<string, SelfCheckMark>>({});
  const [selfCheckRevealed, setSelfCheckRevealed] = useState<Record<string, boolean>>({});
  const [selfCheckShakyOnly, setSelfCheckShakyOnly] = useState(false);
  const [selfCheckSubmitting, setSelfCheckSubmitting] = useState(false);
  const [selfCheckNote, setSelfCheckNote] = useState<string | null>(null);

  // ZCODE-M3 Phase 4：显示模式（localStorage 持久，默认 focus；
  // 首渲染用默认值避免 hydration mismatch，挂载后读实际值）
  const [studyMode, setStudyMode] = useState<ClewStudyMode>("focus");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STUDY_MODE_STORAGE_KEY);
      if (raw === "focus" || raw === "workspace") {
        setStudyMode(raw);
      }
    } catch {
      // localStorage 不可用时保持默认 focus
    }
  }, []);

  // 讲解风格偏好：本机记住上次选择；没有记录时跟随当前讲义（都没有则 zh-primary）
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LESSON_STYLE_STORAGE_KEY);
      if (stored && isClewLessonStyle(stored)) {
        setLessonStyle(stored);
      } else if (selected.lesson) {
        setLessonStyle(selected.lesson.style);
      }
    } catch {
      // localStorage 不可用时保持默认
    }
  }, [selected.lesson]);

  // 讲义视图偏好：本机记住上次选择（派生零请求；localStorage 不可用时保持初学）
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LESSON_VARIANT_STORAGE_KEY);
      if (isClewLessonVariant(stored)) {
        setLessonVariant(stored);
      }
    } catch {
      // localStorage 不可用时保持默认 full
    }
  }, []);

  function onSwitchLessonVariant(variant: ClewLessonVariant): void {
    setLessonVariant(variant);
    try {
      window.localStorage.setItem(LESSON_VARIANT_STORAGE_KEY, variant);
    } catch {
      // 持久化失败不影响本次切换
    }
  }

  // 自测标记：按知识点 + 讲义版本恢复；换版本（重新生成）视为新一次自测
  useEffect(() => {
    setSelfCheckMarks({});
    setSelfCheckRevealed({});
    setSelfCheckShakyOnly(false);
    setSelfCheckNote(null);
    if (!lesson) {
      return;
    }
    try {
      const raw = window.localStorage.getItem(`${SELF_CHECK_STORAGE_PREFIX}${knowledgePoint.id}`);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as SelfCheckStored;
      if (
        parsed &&
        parsed.lessonGeneratedAt === lesson.generatedAt &&
        parsed.marks &&
        typeof parsed.marks === "object"
      ) {
        setSelfCheckMarks(parsed.marks);
      }
    } catch {
      // localStorage 不可用 / 数据损坏：从零开始，不猜测
    }
  }, [lesson, knowledgePoint.id]);

  function onSwitchStudyMode(mode: ClewStudyMode): void {
    setStudyMode(mode);
    try {
      window.localStorage.setItem(STUDY_MODE_STORAGE_KEY, mode);
    } catch {
      // 持久化失败不影响本次切换
    }
  }

  useEffect(() => {
    let cancelled = false;
    sessionIdRef.current = null;
    setSessionId(null);
    setCompletedStages(selected.lesson ? ["learn"] : []);
    setActiveStage(undefined);
    void (async () => {
      try {
        const response = await fetch("/api/clew/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            textbookId,
            kpId: knowledgePoint.id,
            chapterId: chapter.chapter.id,
            profileId,
          }),
        });
        const payload = (await response.json()) as {
          ok?: boolean;
          session?: { id: string; stageStates?: Record<string, { status?: string } | undefined> };
        };
        if (!cancelled && response.ok && payload.ok && payload.session) {
          sessionIdRef.current = payload.session.id;
          setSessionId(payload.session.id);
          // 恢复已完成环节（刷新/跨设备状态连续）；已有讲义时「学」视为完成
          const states = payload.session.stageStates ?? {};
          const restored: LoopStage[] = [];
          for (const stage of [
            "learn",
            "practice",
            "assess",
            "diagnose",
            "review",
            "transfer",
          ] as const) {
            if (states[stage]?.status === "completed") {
              restored.push(stage);
            }
          }
          setCompletedStages((current) => {
            const merged = new Set<LoopStage>(current);
            for (const stage of restored) {
              merged.add(stage);
            }
            if (selected.lesson) {
              merged.add("learn");
            }
            return [...merged];
          });
        }
      } catch {
        // 会话写入失败不阻塞学习页（学习行为本身不依赖会话）
      }
    })();
    return () => {
      cancelled = true;
    };
    // profileId 变化不重建会话（切换 profile 时会话由服务端同步）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textbookId, knowledgePoint.id, chapter.chapter.id]);

  /** 记录环节状态到学习会话（失败静默：会话是旁路记录，不阻塞学习）。 */
  function markSessionStage(stage: LoopStage, state: unknown): void {
    const id = sessionIdRef.current;
    if (!id) {
      return;
    }
    void fetch(`/api/clew/sessions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage, state }),
    }).catch(() => undefined);
  }

  async function onChangeProfile(newProfileId: LoopProfileId) {
    setProfileSaving(true);
    setProfileError(null);
    try {
      const response = await fetch(`/api/clew/kp/${knowledgePoint.id}/loop-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: newProfileId }),
      });
      if (!response.ok) {
        let message = "切换学习闭环失败：服务暂时不可用，请稍后重试。";
        try {
          message = readClewFailure(await response.json());
        } catch {
          // 保持默认提示
        }
        setProfileError(message);
        return;
      }
      setProfileId(newProfileId);
      setProfileOverride(newProfileId);
      setActiveStage(LOOP_PROFILES[newProfileId]?.entryStage);
    } catch {
      setProfileError("切换学习闭环失败：网络或服务暂时不可用，请稍后重试。");
    } finally {
      setProfileSaving(false);
    }
  }

  /** 脊柱环节点击：先记录「进入该环节」，再执行真实动作（滚动/展开/跳转）。 */
  function onSpineStageSelect(stage: LoopStage, action?: () => void): void {
    setActiveStage(stage);
    markSessionStage(stage, { status: "active", enteredAt: new Date().toISOString() });
    action?.();
  }

  function onLessonReady(): void {
    setCompletedStages((current) =>
      current.includes("learn") ? current : [...current, "learn"],
    );
    markSessionStage("learn", {
      status: "completed",
      completedAt: new Date().toISOString(),
    });
  }

  function onSelectLessonStyle(next: string): void {
    if (!isClewLessonStyle(next)) {
      return;
    }
    setLessonStyle(next);
    try {
      window.localStorage.setItem(LESSON_STYLE_STORAGE_KEY, next);
    } catch {
      // 持久化失败不影响本次选择
    }
  }

  async function onGenerateLesson() {
    if (generating) {
      return;
    }
    setConfirmingRegenerate(false);
    setGenerating(true);
    setLessonError(null);
    setLessonNotes([]);
    setLessonLog([`开始为「${knowledgePoint.title}」生成讲义（风格：${CLEW_LESSON_STYLE_LABELS[lessonStyle]}）…`]);
    setLessonDraft("");
    setSelfCheckNote(null);

    try {
      const response = await fetch(`/api/clew/kp/${knowledgePoint.id}/lesson`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style: lessonStyle }),
      });
      if (!response.ok || !response.body) {
        let message = "讲义生成失败：服务暂时不可用，请稍后重试。";
        try {
          message = readClewFailure(await response.json());
        } catch {
          // 保持默认提示
        }
        setLessonError(message);
        setLessonDraft("");
        return;
      }
      await consumeClewSse(response, (raw) => {
        const event = raw as ClewLessonEvent;
        if (event.type === "progress") {
          setLessonLog((log) => [...log, event.message]);
        } else if (event.type === "delta") {
          setLessonDraft((draft) => draft + event.text);
        } else if (event.type === "result") {
          setLesson(event.lesson);
          setLessonNotes(event.notes);
          setLessonDraft("");
          onLessonReady();
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
      const response = await fetch(`/api/clew/kp/${knowledgePoint.id}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
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

  /* ---------------- 「评」自测（体验补丁） ---------------- */

  const selfTestItems = useMemo(
    () => (lesson ? parseClewLessonSelfTest(lesson.contentMd) : []),
    [lesson],
  );

  /* ---------------- 讲义三视图（ZCODE-M4 Phase 1：确定性派生，零请求） ---------------- */

  const derivedLesson = useMemo(
    () => (lesson ? deriveClewLessonVariant(lesson.contentMd, lessonVariant) : null),
    [lesson, lessonVariant],
  );
  const lessonVariantNote = derivedLesson?.note ?? "";
  const shakyCount = selfTestItems.filter(
    (item) => selfCheckMarks[String(item.index)] === "shaky",
  ).length;
  const markedCount = selfTestItems.filter(
    (item) => selfCheckMarks[String(item.index)] !== undefined,
  ).length;
  const allMarksDone = selfTestItems.length > 0 && markedCount === selfTestItems.length;
  const visibleSelfCheckItems = selfCheckShakyOnly
    ? selfTestItems.filter((item) => selfCheckMarks[String(item.index)] === "shaky")
    : selfTestItems;

  function persistSelfCheckMarks(next: Record<string, SelfCheckMark>): void {
    setSelfCheckMarks(next);
    if (!lesson) {
      return;
    }
    try {
      const payload: SelfCheckStored = { lessonGeneratedAt: lesson.generatedAt, marks: next };
      window.localStorage.setItem(
        `${SELF_CHECK_STORAGE_PREFIX}${knowledgePoint.id}`,
        JSON.stringify(payload),
      );
    } catch {
      // localStorage 不可用：本次会话内仍生效
    }
  }

  /** 全部标记完成后提交：把「还需看」写入统一学习事件流（幂等），并完成「评」环节。 */
  async function submitSelfCheck(marks: Record<string, SelfCheckMark>): Promise<void> {
    if (!lesson || selfCheckSubmitting) {
      return;
    }
    setSelfCheckSubmitting(true);
    try {
      const response = await fetch(`/api/clew/kp/${knowledgePoint.id}/self-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonGeneratedAt: lesson.generatedAt,
          items: selfTestItems.map((item) => ({
            index: item.index,
            shaky: marks[String(item.index)] === "shaky",
          })),
        }),
      });
      if (!response.ok) {
        setSelfCheckNote("自测记录暂时未能提交（网络或服务问题），本地标记已保留，可稍后改动任意标记重试。");
        return;
      }
      setCompletedStages((current) => (current.includes("assess") ? current : [...current, "assess"]));
      markSessionStage("assess", { status: "completed", completedAt: new Date().toISOString() });
      setActiveStage("assess");
      const shaky = selfTestItems.filter((item) => marks[String(item.index)] === "shaky").length;
      setSelfCheckNote(
        shaky > 0
          ? `已把 ${shaky} 道「还需看」记入学习动态（统一事件流），后续版本据此生成复查清单。`
          : "全部标记「会了」——「评」环节完成。",
      );
    } catch {
      setSelfCheckNote("自测记录暂时未能提交（网络问题），本地标记已保留。");
    } finally {
      setSelfCheckSubmitting(false);
    }
  }

  function onMarkSelfCheck(index: number, mark: SelfCheckMark): void {
    const next = { ...selfCheckMarks, [String(index)]: mark };
    persistSelfCheckMarks(next);
    if (selfTestItems.length > 0 && selfTestItems.every((item) => next[String(item.index)] !== undefined)) {
      void submitSelfCheck(next);
    }
  }

  function onToggleSelfCheckReveal(index: number): void {
    setSelfCheckRevealed((current) => ({
      ...current,
      [String(index)]: !current[String(index)],
    }));
  }

  /* ---------------- 闭环脊柱（体验补丁：环节 = 真实动作入口） ---------------- */

  const activeProfile = LOOP_PROFILES[profileId] ?? LOOP_PROFILES["full-loop"];

  function computeSpineItems(): ClewStageSpineItem[] {
    return activeProfile.stages.map((stage) => {
      const baseState: ClewStageSpineState = completedStages.includes(stage)
        ? "done"
        : stage === (activeStage ?? activeProfile.entryStage)
          ? "current"
          : "todo";
      switch (stage) {
        case "learn":
          return {
            stage,
            state: baseState,
            hint: lesson ? "滚动到讲义" : "滚动到讲义区（先点「生成讲义」）",
            onSelect: () =>
              onSpineStageSelect(stage, () =>
                lessonPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
              ),
          };
        case "assess":
          if (selfTestItems.length > 0) {
            return {
              stage,
              state: baseState,
              hint: `打开自测（${selfTestItems.length} 道，带参考答案）`,
              onSelect: () =>
                onSpineStageSelect(stage, () =>
                  selfCheckPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
                ),
            };
          }
          return {
            stage,
            state: "unavailable",
            hint: lesson
              ? "本讲义未包含自测题——点「重新生成讲义」后可自测"
              : "先生成讲义，才能开始自测",
          };
        case "diagnose":
          if (shakyCount > 0) {
            return {
              stage,
              state: baseState,
              hint: `打开「还需看」清单（${shakyCount} 道）`,
              onSelect: () =>
                onSpineStageSelect(stage, () => {
                  setSelfCheckShakyOnly(true);
                  selfCheckPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }),
            };
          }
          return {
            stage,
            state: "unavailable",
            hint: "自测中标记「还需看」的问题会汇总到这里（复查调度后续版本接入）",
          };
        case "transfer":
          return {
            stage,
            state: baseState,
            hint: "去课题工作坊（对短材料提问）",
            onSelect: () => onSpineStageSelect(stage, () => router.push("/learn/clew/w")),
          };
        case "practice":
          return {
            stage,
            state: "unavailable",
            hint: "练习环节后续版本接入（当前可在题库刷题）",
          };
        case "review":
          return {
            stage,
            state: "unavailable",
            hint: "复习调度后续版本接入（标记的问题已先记入学习动态）",
          };
        default:
          return { stage, state: baseState };
      }
    });
  }

  const spineItems = computeSpineItems();

  const guide = resolveClewGuide({
    surface: "study",
    textbookId,
    chapterOrder: chapter.chapter.order,
    hasLesson: Boolean(lesson) || chapter.lessonCount > 0,
    hasNote: Boolean(chapter.note),
  });

  return (
    <div className={styles.studyLayout} data-study-mode={studyMode}>
      <ClewPathGuide guide={guide} />
      <aside className={styles.studyAside} aria-label="知识点列表">
        <div className={styles.studyAsideHead}>
          <h2>知识点</h2>
          <span>
            {chapter.knowledgePoints.length} 个 · 讲义 {chapter.lessonCount} 份
          </span>
        </div>
        <p className={styles.studyAsideMeta}>
          第 {chapter.chapterIndex}/{chapter.chapterTotal} 章《{chapter.chapter.title}》·{" "}
          {formatClewPageRange(chapter.textbook.fileName, chapter.chapter.pageStart, chapter.chapter.pageEnd)} · {statusLabels[chapter.chapter.status]}
        </p>

        {chapter.knowledgePoints.length === 0 ? (
          <p className={styles.studyAsideEmpty}>
            本章还没有知识点。回到
            <Link href={`/learn/clew/t/${textbookId}`}> 教材详情 </Link>
            对本章运行「萃取知识点」。
          </p>
        ) : (
          <ul className={styles.kpNavList}>
            {chapter.knowledgePoints.map((point: ClewKnowledgePointStudySummary) => {
              const isActive = point.id === knowledgePoint.id;
              const chipProfileId =
                isActive && profileOverride ? profileOverride : point.loopProfileId;
              return (
                <li key={point.id}>
                  <Link
                    className={isActive ? styles.kpNavItemActive : styles.kpNavItem}
                    href={`/learn/clew/t/${textbookId}/c/${chapter.chapter.order}?kp=${point.id}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className={styles.kpNavIndex}>{String(point.order).padStart(2, "0")}</span>
                    <span className={styles.kpNavMain}>
                      <span className={styles.kpNavTitle}>{point.title}</span>
                      <span className={styles.kpNavMeta}>
                        {formatClewSourcePage(chapter.textbook.fileName, point.sourcePage)} · {point.hasLesson ? "已有讲义" : "未生成讲义"}
                      </span>
                      <span className={styles.kpNavProfile}>
                        {LOOP_PROFILES[chipProfileId]?.name ?? "完整闭环"}
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
          <div className={styles.studyKpHeadRow}>
            <p className={styles.kicker}>知识点 {String(knowledgePoint.order).padStart(2, "0")}</p>
            <div className={styles.studyKpHeadActions}>
              <ClewLoopProfileBadge
                profileId={profileId}
                saving={profileSaving}
                error={profileError}
                onChange={onChangeProfile}
              />
              <div className={styles.studyModeToggle} role="group" aria-label="学习页显示模式">
                <button
                  type="button"
                  aria-pressed={studyMode === "focus"}
                  title="单任务视图：讲义与追问上下串联"
                  onClick={() => onSwitchStudyMode("focus")}
                >
                  单任务
                </button>
                <button
                  type="button"
                  aria-pressed={studyMode === "workspace"}
                  title="工作台视图：知识点 / 讲义 / 追问三栏"
                  onClick={() => onSwitchStudyMode("workspace")}
                >
                  工作台
                </button>
              </div>
            </div>
          </div>
          <h2 className={styles.studyKpTitle}>{knowledgePoint.title}</h2>
          <p className={styles.studyKpMeta}>
            {formatClewSourcePage(chapter.textbook.fileName, knowledgePoint.sourcePage)}
            {knowledgePoint.keyTerms.length > 0 ? ` · 术语：${knowledgePoint.keyTerms.join("、")}` : ""}
            {knowledgePoint.prerequisites.length > 0
              ? ` · 先修：${knowledgePoint.prerequisites.join("、")}`
              : ""}
          </p>
          <p className={styles.studyKpDescription}>{knowledgePoint.description}</p>
        </header>

        <div className={styles.studySpineRail}>
          <ClewStageSpine items={spineItems} />
        </div>

        <div className={styles.studyContentCol}>
          <section ref={lessonPanelRef} className={styles.lessonPanel} aria-labelledby="clew-lesson-title">
            <div className={styles.panelHead}>
              <h2 id="clew-lesson-title">讲义</h2>
              {lesson ? (
                <p>
                  {describeClewLessonGenerator(lesson.generator)} ·{" "}
                  {new Date(lesson.generatedAt).toLocaleString("zh-CN", {
                    hour12: false,
                    timeZone: "Asia/Shanghai",
                  })}
                </p>
              ) : (
                <p>尚未生成</p>
              )}
              <div
                className={styles.lessonVariantToggle}
                role="group"
                aria-label="讲义视图（同一份讲义确定性派生）"
              >
                {CLEW_LESSON_VARIANTS.map((variant) => (
                  <button
                    key={variant}
                    type="button"
                    aria-pressed={lessonVariant === variant}
                    disabled={generating}
                    title={variant === "full" ? "完整讲义" : undefined}
                    onClick={() => onSwitchLessonVariant(variant)}
                  >
                    {CLEW_LESSON_VARIANT_SHORT_LABELS[variant]}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.actionRow}>
              <label className={styles.lessonStyleField}>
                <span>讲解风格</span>
                <select
                  className={styles.lessonStyleSelect}
                  value={lessonStyle}
                  disabled={generating}
                  title="生成讲义时发送；选择过的风格会记为账户默认"
                  onChange={(event) => onSelectLessonStyle(event.target.value)}
                >
                  {CLEW_LESSON_STYLES.map((style) => (
                    <option key={style} value={style}>
                      {CLEW_LESSON_STYLE_LABELS[style]}
                    </option>
                  ))}
                </select>
              </label>
              {!generating ? (
                lesson ? (
                  confirmingRegenerate ? (
                    <>
                      <span className={styles.confirmNote}>
                        {lessonStyle !== lesson.style
                          ? `重新生成将按「${CLEW_LESSON_STYLE_LABELS[lessonStyle]}」覆盖当前讲义，确认继续？`
                          : "重新生成将覆盖当前讲义，确认继续？"}
                      </span>
                      <V2Button className={styles.v2Button} onClick={onGenerateLesson}>
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
                      {lessonStyle !== lesson.style ? (
                        <span className={styles.confirmNote}>所选风格与当前讲义不同，重新生成后生效</span>
                      ) : null}
                      <button
                        type="button"
                        className={styles.ghostButton}
                        onClick={() => setConfirmingRegenerate(true)}
                      >
                        <RefreshCw aria-hidden="true" size={15} strokeWidth={1.6} />
                        重新生成讲义
                      </button>
                    </>
                  )
                ) : (
                  <V2Button className={styles.v2Button} onClick={onGenerateLesson}>
                    <Sparkles aria-hidden="true" size={16} strokeWidth={1.6} />
                    生成讲义
                  </V2Button>
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
                <ClewMarkdown markdown={lessonDraft} />
              </div>
            ) : lesson && derivedLesson ? (
              <>
                <div aria-live="polite">
                  {lessonVariantNote ? (
                    <p className={styles.lessonVariantNote}>{lessonVariantNote}</p>
                  ) : null}
                </div>
                <div className={styles.lessonBody} ref={lessonBodyRef}>
                  <ClewMarkdown
                    key={`${lesson.generatedAt}:${lessonVariant}`}
                    markdown={derivedLesson.contentMd}
                  />
                </div>
              </>
            ) : (
              <p className={styles.emptyState}>
                还没有讲义。点「生成讲义」：已接入模型时按教材原文片段撰写（定义 / 要点 / 易错点 / 自测题 3 道，生成后可在下方直接自测）；
                未接入模型时走确定性整理，并明确标注「未接入模型」。
              </p>
            )}
          </section>

          {lesson ? (
            <section
              ref={selfCheckPanelRef}
              className={styles.selfCheckPanel}
              aria-labelledby="clew-selfcheck-title"
            >
              <div className={styles.panelHead}>
                <h2 id="clew-selfcheck-title">自测</h2>
                {selfTestItems.length > 0 ? (
                  <p>
                    {selfTestItems.length} 道 · 已标记 {markedCount} 道
                    {shakyCount > 0 ? ` · 还需看 ${shakyCount} 道` : ""}
                    {allMarksDone ? " · 已完成" : ""}
                  </p>
                ) : (
                  <p>本讲义未包含可解析的自测题</p>
                )}
              </div>

              {selfTestItems.length === 0 ? (
                <p className={styles.emptyState}>
                  本讲义未包含自测题（旧版讲义或结构不完整）。点「重新生成讲义」后即可获得带参考答案的自测题。
                </p>
              ) : (
                <>
                  {shakyCount > 0 ? (
                    <div className={styles.selfCheckFilters} role="group" aria-label="自测筛选">
                      <button
                        type="button"
                        aria-pressed={!selfCheckShakyOnly}
                        onClick={() => setSelfCheckShakyOnly(false)}
                      >
                        全部
                      </button>
                      <button
                        type="button"
                        aria-pressed={selfCheckShakyOnly}
                        onClick={() => setSelfCheckShakyOnly(true)}
                      >
                        只看还需看（{shakyCount}）
                      </button>
                    </div>
                  ) : null}

                  <ul className={styles.selfCheckList}>
                    {visibleSelfCheckItems.map((item) => {
                      const key = String(item.index);
                      const mark = selfCheckMarks[key];
                      const revealed = Boolean(selfCheckRevealed[key]);
                      return (
                        <li key={item.index} className={styles.selfCheckItem} data-mark={mark ?? "idle"}>
                          <p className={styles.selfCheckQuestion}>
                            <span className={styles.selfCheckIndex}>
                              {String(item.index).padStart(2, "0")}
                            </span>
                            {item.question}
                          </p>
                          {revealed && item.answer ? (
                            <p className={styles.selfCheckAnswer}>{item.answer}</p>
                          ) : null}
                          <div className={styles.selfCheckActions}>
                            {item.answer ? (
                              <button
                                type="button"
                                className={styles.ghostButton}
                                onClick={() => onToggleSelfCheckReveal(item.index)}
                              >
                                {revealed ? "收起参考答案" : "显示参考答案"}
                              </button>
                            ) : (
                              <span className={styles.selfCheckNoAnswer}>本讲义未附参考答案（不补写）</span>
                            )}
                            <button
                              type="button"
                              className={styles.selfCheckMarkOk}
                              aria-pressed={mark === "ok"}
                              onClick={() => onMarkSelfCheck(item.index, "ok")}
                            >
                              会了
                            </button>
                            <button
                              type="button"
                              className={styles.selfCheckMarkShaky}
                              aria-pressed={mark === "shaky"}
                              onClick={() => onMarkSelfCheck(item.index, "shaky")}
                            >
                              还需看
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {selfCheckNote ? (
                    <p className={styles.selfCheckNote} role="status">
                      {selfCheckNote}
                    </p>
                  ) : null}
                  {selfCheckSubmitting ? (
                    <p className={styles.selfCheckNote} role="status">
                      <Loader2 className={styles.spin} aria-hidden="true" size={13} strokeWidth={1.8} /> 正在记录自测结果…
                    </p>
                  ) : null}
                </>
              )}
            </section>
          ) : null}

          <div id="highlights">
            <ClewHighlightLayer
              kpId={knowledgePoint.id}
              lessonGeneratedAt={lesson?.generatedAt ?? null}
              initialHighlights={selected.highlights}
              bodyRef={lessonBodyRef}
              regenerating={generating}
              bodyVariant={lessonVariant}
            />
          </div>

          <ClewNotePanel
            textbookId={textbookId}
            textbookTitle={chapter.textbook.title}
            chapter={chapter.chapter}
            initialNote={chapter.note}
            lessonCount={chapter.lessonCount}
            knowledgePointCount={chapter.knowledgePoints.length}
          />

          <ClewGraph
            knowledgePoints={chapter.knowledgePoints}
            activeKpId={knowledgePoint.id}
            textbookId={textbookId}
            chapterOrder={chapter.chapter.order}
          />

          <p className={styles.footNote}>
            Clew 生成物为 AI 产品内容，不挂官方课的证据分级（可关联、帮助理解、不可直接等同只属于官方课）；知识点为模型萃取草稿。DOCX 出处保持待确认。
            返回 <Link href={`/learn/clew/t/${textbookId}`}>教材详情</Link> 或{" "}
            <Link href="/learn/clew">Clew 书架</Link>。
          </p>
        </div>
      </section>

      <aside className={styles.studyAgent} aria-label="Clew 追问">
        <section className={styles.chatPanel} aria-labelledby="clew-chat-title">
          <div className={styles.panelHead}>
            <h2 id="clew-chat-title">
              <MessageSquareText aria-hidden="true" size={17} strokeWidth={1.6} /> 问 Clew
            </h2>
            <p>AI 讲解，可能出错；请对照教材原文与讲义核对</p>
          </div>

          <div className={styles.chatList} ref={chatListRef} aria-live="polite">
            {messages.length === 0 ? (
              <p className={styles.chatEmpty}>
                问 Clew：就这个知识点继续问，例如：「这一页的要点我记混了，怎么区分？」「为什么这里不能直接等同？」
              </p>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${index}-${message.createdAt}`}
                  className={message.role === "user" ? styles.chatRowUser : styles.chatRowAssistant}
                >
                  <p className={styles.chatRole}>{message.role === "user" ? "我" : "Clew 讲解"}</p>
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
                <p className={styles.chatRole}>Clew 讲解</p>
                <div className={styles.chatBubble}>
                  {messages[messages.length - 1]?.role === "assistant" ? (
                    <div className={styles.chatMarkdown}>
                      <ClewMarkdown markdown={messages[messages.length - 1].content} />
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

          {/* Page Chat 固化：追问只对当前 KP 提问（服务端 chat-prompt 已注入该 KP 的标题/页码/说明），chip 负责显式标注 */}
          <button
            type="button"
            className={styles.chatContextChip}
            aria-expanded={chatChipOpen}
            onClick={() => setChatChipOpen((open) => !open)}
            title={knowledgePoint.description}
          >
            当前知识点：{knowledgePoint.title} · 第 {knowledgePoint.sourcePage} 页
          </button>
          {chatChipOpen ? (
            <p className={styles.chatContextDetail}>{knowledgePoint.description}</p>
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
            <V2Button
              className={styles.v2Button}
              type="submit"
              disabled={streaming || chatDraft.trim().length === 0}
            >
              {streaming ? (
                <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
              ) : (
                <CornerDownLeft aria-hidden="true" size={16} strokeWidth={1.6} />
              )}
              {streaming ? "回答中" : "发送"}
            </V2Button>
          </form>
        </section>

      </aside>
    </div>
  );
}
