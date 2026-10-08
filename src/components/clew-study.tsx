"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  CircleAlert,
  Copy,
  CornerDownLeft,
  Loader2,
  RefreshCw,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import type {
  ClewChapterStudyView,
  ClewKnowledgePointStudySummary,
  ClewKnowledgePointStudyView,
} from "@/types/clew";
import { LOOP_PROFILES, type LoopProfileId, type LoopStage } from "@/types/loop-profile";
import { readClewFailure } from "@/lib/clew/client-api";
import { CLEW_CHAT_SCOPES, CLEW_CHAT_SCOPE_LABELS } from "@/lib/clew/chat-scope";
import {
  CLEW_LESSON_STYLES,
  CLEW_LESSON_STYLE_LABELS,
  CLEW_LESSON_STYLE_SHORT_LABELS,
  describeClewLessonGenerator,
} from "@/lib/clew/lesson-heuristic";
import { formatClewKpPageLabel, formatClewPageRange, isClewDocx } from "@/lib/clew/source-label";
import { resolveClewGuide } from "@/lib/clew/step-guide";
import { useStudyAssessment } from "@/hooks/use-study-assessment";
import { useStudyChat } from "@/hooks/use-study-chat";
import { useStudyLesson } from "@/hooks/use-study-lesson";
import { useStudyPractice } from "@/hooks/use-study-practice";
import {
  CLEW_LESSON_VARIANT_LABELS,
  CLEW_LESSON_VARIANT_SHORT_LABELS,
  CLEW_LESSON_VARIANTS,
  deriveClewLessonVariant,
} from "@/lib/clew/lesson-variants";
import { V2Button } from "@/components/ui/v2/button";
import {
  STUDY_MODE_STORAGE_KEY,
  readStoredValue,
  writeStoredValue,
} from "@/lib/clew/study-preferences";
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
 * Clew 学习页（客户端，v4 Quiet 换装）：文档主列（面包屑 → 文档标题 → 教材路径线 → 视图 tabs →
 * 讲义正文 → 自测 → 划重点/笔记/图谱）+ 右栏「问 Clew」；本章知识点列表经 portal 并入壳侧栏
 * （docs/DESIGN_V4.md §四/P1-6）。所有生成都走服务端 API；这里只负责展示、确认覆盖与事件解析。
 * 体验补丁（2026-10-02）：环节脊柱 = 真实动作入口（能点的都真的做事，未建的不装）；「讲解追问」品牌化为「问 Clew」。
 * ZCODE-M5（2026-10-05）：自测「还需看」进入 FSRS 复习调度——自测面板底部出现轻量三键打分
 * （再来一次/有点难/记住了 → again/hard/good，PATCH /api/clew/reviews/[id]），成功后行内确认并从
 * 「我的学习 · 今日复习」到期列表消失；脊柱「复」节点点亮为跳转「我的学习」聚合面。
 * v4（2026-10-04）：AI 回答下方复制/重新生成小图标行——重新生成 = 对同一条提问重新请求一次，
 * 计入一次问答配额，结果追加为新回答，不静默覆盖历史（§五 P2 语义）。
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
/** 讲义折叠高度帽（交互批；px。长文默认收进帽内，展开/收起不卸载 DOM，划重点层零影响）。 */
const LESSON_FOLD_MAX_HEIGHT = 560;

export function ClewStudyRoom({ textbookId, chapter, selected }: ClewStudyRoomProps) {
  const knowledgePoint = selected.knowledgePoint;
  const router = useRouter();


  // 讲义生成行为（P1-B 第二刀：状态/流式消费/风格与视图偏好搬入 useStudyLesson，行为不变）
  const {
    lesson,
    lessonDraft,
    lessonLog,
    lessonNotes,
    lessonError,
    generating,
    confirmingRegenerate,
    setConfirmingRegenerate,
    lessonStyle,
    onSelectLessonStyle,
    lessonVariant,
    onSwitchLessonVariant,
    onGenerateLesson,
  } = useStudyLesson({
    knowledgePointId: knowledgePoint.id,
    knowledgePointTitle: knowledgePoint.title,
    initialLesson: selected.lesson,
    onLessonReady,
    onGenerationStart: () => setSelfCheckNote(null),
  });

  // 「问 Clew」行为（P1-B 第一刀：状态/事件解析/持久化搬入 useStudyChat，行为不变）
  const {
    messages,
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
    chatListRef,
    onSwitchChatScope,
    onSwitchChatIntensity,
    onSendMessage,
    onRegenerateAnswer,
    onCopyAnswer,
  } = useStudyChat({ knowledgePointId: knowledgePoint.id, lessonStyle, initialMessages: selected.messages });

  /** 讲义长文折叠（交互批）：默认收进高度帽；DOM 常驻（划重点层零风险），仅 CSS 裁剪。 */
  const [lessonFolded, setLessonFolded] = useState(true);
  const [lessonTooShort, setLessonTooShort] = useState(false);
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

  const activeProfile = LOOP_PROFILES[profileId] ?? LOOP_PROFILES["full-loop"];

  // 「评」自测 + 复习打分行为（P1-B 第四刀：标记/揭示/过滤/提交/FSRS 打分搬入 useStudyAssessment，行为不变）
  const {
    selfTestItems,
    selfCheckMarks,
    selfCheckRevealed,
    selfCheckShakyOnly,
    setSelfCheckShakyOnly,
    selfCheckSubmitting,
    selfCheckNote,
    setSelfCheckNote,
    shakyCount,
    markedCount,
    allMarksDone,
    visibleSelfCheckItems,
    reviewItem,
    reviewRating,
    reviewRateNote,
    onMarkSelfCheck,
    onToggleSelfCheckReveal,
    onRateReview,
  } = useStudyAssessment({
    knowledgePointId: knowledgePoint.id,
    lesson,
    initialReviewItem: selected.reviewItem,
    activeProfileName: activeProfile.name,
    onAssessComplete: () => {
      setCompletedStages((current) => (current.includes("assess") ? current : [...current, "assess"]));
      markSessionStage("assess", { status: "completed", completedAt: new Date().toISOString() });
      setActiveStage("assess");
    },
  });

  // ZCODE-M6：自教材练习（P1-B 第三刀：行为搬入 useStudyPractice；确认态留视图层）
  const [practiceConfirmRegenerate, setPracticeConfirmRegenerate] = useState(false);
  const practicePanelRef = useRef<HTMLElement>(null);
  const {
    practiceSet,
    practiceGenerating,
    practiceLog,
    practiceNotes,
    practiceError,
    practiceWrongOnly,
    setPracticeWrongOnly,
    practiceRevealed,
    setPracticeRevealed,
    practiceAttemptBusy,
    practiceNote,
    onGeneratePractice: generatePractice,
    onPracticeAttempt,
  } = useStudyPractice({
    knowledgePointId: knowledgePoint.id,
    knowledgePointTitle: knowledgePoint.title,
    initialPractice: selected.practice,
  });
  /** 生成入口（视图层包装）：进入生成前复位重生成确认态——原 onGeneratePractice 首行语义。 */
  const onGeneratePractice = (intensity: "standard" | "deep"): Promise<void> => {
    setPracticeConfirmRegenerate(false);
    return generatePractice(intensity);
  };
  /** 键盘流提示（N 无选区时短暂显示）。 */
  const [kbdHint, setKbdHint] = useState<string | null>(null);

  // ZCODE-M6 补遗：DOCX 人工页码标注（KP 级；「有页码用页码，没有的人工标」）。
  // 标注页 = 学生声明的出处（显示「你标注的」，不做文本核验）；PDF 教材不出此入口。
  const [pageAnnotateOpen, setPageAnnotateOpen] = useState(false);
  const [pageAnnotateValue, setPageAnnotateValue] = useState("");
  const [pageAnnotateBusy, setPageAnnotateBusy] = useState(false);
  const [pageAnnotateError, setPageAnnotateError] = useState<string | null>(null);
  const [pageAnnotateNote, setPageAnnotateNote] = useState<string | null>(null);

  // ZCODE-M3 Phase 4：显示模式（localStorage 持久；v4 P0-4 裁决：默认改为工作台（三栏），
  // 已保存 focus 偏好的用户尊重其选择、键沿用不删；首渲染用默认值避免 hydration mismatch）
  const [studyMode, setStudyMode] = useState<ClewStudyMode>("workspace");

  // v4 侧栏上下文 slot：本章知识点列表 portal 进壳侧栏（workspace-shell 的 data-sidebar-context-slot）
  const [railSlot, setRailSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    try {
      const raw = readStoredValue(STUDY_MODE_STORAGE_KEY);
      if (raw === "focus" || raw === "workspace") {
        setStudyMode(raw);
      }
    } catch {
      // localStorage 不可用时保持默认工作台
    }
  }, []);

  useEffect(() => {
    setRailSlot(document.querySelector<HTMLElement>("[data-sidebar-context-slot]"));
  }, []);

  // 页码标注：切换知识点时收起表单并清错误/提示
  useEffect(() => {
    setPageAnnotateOpen(false);
    setPageAnnotateValue("");
    setPageAnnotateError(null);
    setPageAnnotateNote(null);
  }, [knowledgePoint.id]);

  /**
   * DOCX 人工页码标注提交。pageOverride 显式传参（清除 = null）——不读刚 setState 的输入值
   * （React 过期闭包：清除按钮若走输入框旧值，会把旧值重新写库而非清除——审查确认后修正）。
   * 成功后提示：已生成的讲义/练习按旧标注烙定，不随标注自动改写，需重新生成（诚实披露）。
   */
  const submitPageAnnotation = async (pageOverride?: number | null): Promise<void> => {
    const explicit = pageOverride !== undefined;
    const trimmed = explicit ? null : pageAnnotateValue.trim();
    const parsed = explicit ? (pageOverride ?? null) : trimmed && trimmed.length > 0 ? Number(trimmed) : null;
    if (!explicit && trimmed && (!Number.isInteger(parsed) || (parsed ?? 0) < 1)) {
      setPageAnnotateError("页码需要是正整数；留空保存 = 清除标注。");
      return;
    }
    setPageAnnotateBusy(true);
    setPageAnnotateError(null);
    try {
      const res = await fetch(`/api/clew/kp/${knowledgePoint.id}/source-page`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ page: parsed }),
      });
      const payload = (await res.json().catch(() => null)) as { message?: string } | null;
      if (!res.ok) {
        setPageAnnotateError(payload?.message ?? "标注失败，请稍后重试。");
        return;
      }
      setPageAnnotateOpen(false);
      setPageAnnotateValue("");
      setPageAnnotateNote(
        knowledgePoint.sourcePageAnnotated || explicit
          ? "页码标注已更新。已生成的讲义与练习仍按旧标注记录，重新生成后更新。"
          : "页码标注已保存。已生成的讲义与练习仍按旧状态记录，重新生成后更新。",
      );
      router.refresh();
    } catch {
      setPageAnnotateError("网络异常，请稍后重试。");
    } finally {
      setPageAnnotateBusy(false);
    }
  };

  function onSwitchStudyMode(mode: ClewStudyMode): void {
    setStudyMode(mode);
    try {
      writeStoredValue(STUDY_MODE_STORAGE_KEY, mode);
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

  /* ---------------- 讲义三视图（ZCODE-M4 Phase 1：确定性派生，零请求） ---------------- */

  const derivedLesson = useMemo(
    () => (lesson ? deriveClewLessonVariant(lesson.contentMd, lessonVariant) : null),
    [lesson, lessonVariant],
  );
  const lessonVariantNote = derivedLesson?.note ?? "";

  // 讲义折叠测量：内容不足一帽时不显示折叠控件（渲染后实测 scrollHeight，不猜字数）
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const body = lessonBodyRef.current;
      if (!body) {
        setLessonTooShort(true);
        return;
      }
      setLessonTooShort(body.scrollHeight <= LESSON_FOLD_MAX_HEIGHT + 24);
    });
    return () => cancelAnimationFrame(raf);
  }, [lesson, lessonVariant, lessonFolded]);
  const lessonCharCount = derivedLesson?.contentMd.length ?? 0;

  /* ---------------- ZCODE-M6：自教材练习 ---------------- */

  const practiceWrongCount = practiceSet.summary.wrong;
  const visiblePracticeItems = practiceWrongOnly
    ? practiceSet.questions.filter((q) => q.myAttempt !== null && !q.myAttempt.isCorrect)
    : practiceSet.questions;

  /** 生成练习题组（SSE；缺省 deep=deepseek-flash 深度思考计 2 次额度）。 */
  /** 生成/重新生成控制区（覆盖语义：重新生成清空当前题组与作答记录）。 */
  function practiceRegenerateControls() {
    if (practiceGenerating) {
      return (
        <span className={styles.confirmNote}>
          <Loader2 className={styles.spin} aria-hidden="true" size={14} strokeWidth={1.8} /> 生成中…
        </span>
      );
    }
    if (practiceSet.questions.length === 0) {
      return (
        <>
          <V2Button className={styles.v2Button} onClick={() => void onGeneratePractice("deep")}>
            <Sparkles aria-hidden="true" size={16} strokeWidth={1.6} />
            生成练习题（深度）
          </V2Button>
          <button type="button" className={styles.ghostButton} onClick={() => void onGeneratePractice("standard")}>
            标准档生成（省额度）
          </button>
        </>
      );
    }
    if (practiceConfirmRegenerate) {
      // 评审 P0-A：深度/标准两档都必须过确认（原「标准档重生成」绕过确认直接覆盖题组——双标已修）；
      // 「省额度」诚实披露在重生成态同样出现（与首生态文案平行）
      return (
        <>
          <span className={styles.confirmNote}>重新生成将覆盖当前题组并清空作答记录，确认继续？</span>
          <V2Button className={styles.v2Button} onClick={() => void onGeneratePractice("deep")}>
            确认重新生成（深度）
          </V2Button>
          <button type="button" className={styles.ghostButton} onClick={() => void onGeneratePractice("standard")}>
            确认标准档重生成（省额度）
          </button>
          <button type="button" className={styles.ghostButton} onClick={() => setPracticeConfirmRegenerate(false)}>
            取消
          </button>
        </>
      );
    }
    return (
      <button type="button" className={styles.ghostButton} onClick={() => setPracticeConfirmRegenerate(true)}>
        <RefreshCw aria-hidden="true" size={15} strokeWidth={1.6} />
        重新生成
      </button>
    );
  }

  /* ---------------- ZCODE-M6-C：键盘流（RESTRUCTURE §1.1 兑现：J/K 切 KP / E 生成讲义 / N 写批注） ---------------- */

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (
        target
        && (target.tagName === "INPUT"
          || target.tagName === "TEXTAREA"
          || target.isContentEditable
          || target.tagName === "SELECT")
      ) {
        return;
      }
      const key = event.key.toLowerCase();
      if (key === "j" || key === "k") {
        const list = chapter.knowledgePoints;
        const index = list.findIndex((point) => point.id === knowledgePoint.id);
        if (index === -1) {
          return;
        }
        const nextIndex = key === "j" ? index + 1 : index - 1;
        const next = list[nextIndex];
        if (!next) {
          return;
        }
        event.preventDefault();
        router.push(`/learn/clew/t/${textbookId}/c/${chapter.chapter.order}?kp=${next.id}`);
      } else if (key === "e") {
        if (generating) {
          return;
        }
        event.preventDefault();
        if (!lesson) {
          void onGenerateLesson();
        } else {
          setConfirmingRegenerate(true);
          lessonPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (key === "n") {
        // 写批注：有选区时划重点层自身会弹出；N 负责滚到划重点区并提示先选中
        const selection = window.getSelection?.();
        const hasSelection = Boolean(selection && selection.toString().trim().length > 0);
        if (!hasSelection) {
          setKbdHint("先选中讲义文字，松开后即可划重点并写批注。");
          window.setTimeout(() => setKbdHint(null), 2600);
        }
        document.getElementById("highlights")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // handlers 闭包依赖当前渲染态；onGenerateLesson 为组件内函数（随渲染重建），重建订阅即等效最新闭包
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 订阅按 kpId/章节/讲义态重建，onGenerateLesson 每次渲染都是最新闭包
  }, [chapter.knowledgePoints, chapter.chapter.order, knowledgePoint.id, textbookId, generating, lesson, router]);

  /* ---------------- 闭环脊柱（体验补丁：环节 = 真实动作入口） ---------------- */

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
          // ZCODE-M6：练习已接入——按教材原文出题，作答即判分并回流复习调度
          return {
            stage,
            state: baseState,
            hint:
              practiceSet.questions.length > 0
                ? `打开练习（${practiceSet.summary.total} 题${practiceWrongCount > 0 ? `，错 ${practiceWrongCount}` : ""}）`
                : "按教材原文生成一组练习题（A1×4 + 填空×2）",
            onSelect: () =>
              onSpineStageSelect(stage, () =>
                practicePanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
              ),
          };
        case "review":
          // ZCODE-M5：复习调度已接入——聚合面在「我的学习 · 今日复习」（含错题中心 Clew 线）
          return {
            stage,
            state: baseState,
            hint: reviewItem
              ? reviewItem.due
                ? "本知识点已到期待复习——下方自测面板可打分回流"
                : `下次复习 ${new Date(reviewItem.dueAt).toLocaleDateString("zh-CN", { timeZone: "Asia/Shanghai" })}（去「我的学习」看全部排期）`
              : "去「我的学习」看今日复习（到期知识点聚合）",
            onSelect: () =>
              onSpineStageSelect(stage, () => router.push("/learn#today-reviews")),
          };
        default:
          return { stage, state: baseState };
      }
    });
  }

  const spineItems = computeSpineItems();

  // ZCODE-M6 UI 热修②：流式期间末条 assistant 消息只由下方 streaming 块渲染（带光标），
  // 消息循环里剔除，否则同一回答会同时出现两个气泡（流结束才恢复单条）。
  const streamingLastAssistant = streaming && messages[messages.length - 1]?.role === "assistant";
  const renderedMessages = streamingLastAssistant ? messages.slice(0, -1) : messages;

  const guide = resolveClewGuide({
    surface: "study",
    textbookId,
    chapterOrder: chapter.chapter.order,
    hasLesson: Boolean(lesson) || chapter.lessonCount > 0,
    hasNote: Boolean(chapter.note),
  });

  /** 本章知识点列表（v4：portal 注入壳侧栏，替代原页面内 studyAside）。 */
  const kpRail = railSlot
    ? createPortal(
      <nav className={styles.railNav} aria-label="本章知识点列表">
        <p className={styles.railHead}>本章 · 第 {chapter.chapterIndex}/{chapter.chapterTotal} 章</p>
        <p className={styles.railMeta}>
          《{chapter.chapter.title}》 ·{" "}
          {formatClewPageRange(chapter.textbook.fileName, chapter.chapter.pageStart, chapter.chapter.pageEnd)} ·{" "}
          {statusLabels[chapter.chapter.status]}
        </p>
        {chapter.knowledgePoints.length === 0 ? (
          <p className={styles.railEmpty}>
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
                        {formatClewKpPageLabel(chapter.textbook.fileName, point.sourcePage, point.sourcePageAnnotated)} · {point.hasLesson ? "已有讲义" : "未生成讲义"}
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
      </nav>,
      railSlot,
    )
    : null;

  return (
    <div className={styles.studyLayout} data-study-mode={studyMode}>
      {kpRail}

      <section className={styles.studyMain} aria-label="讲义与追问">
        <header className={styles.studyKpHead}>
          <div className={styles.studyKpHeadRow}>
            <p className={styles.studyBreadcrumb}>
              <Link href="/learn/clew">Clew</Link>
              <span className={styles.studyBreadcrumbSep} aria-hidden="true">/</span>
              <Link href={`/learn/clew/t/${textbookId}`}>《{chapter.textbook.title}》</Link>
              <span className={styles.studyBreadcrumbSep} aria-hidden="true">/</span>
              <span>第 {chapter.chapter.order} 章 · {chapter.chapter.title}</span>
            </p>
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
                  title="工作台视图：文档主列 + 右栏 Clew"
                  onClick={() => onSwitchStudyMode("workspace")}
                >
                  工作台
                </button>
              </div>
            </div>
          </div>
          <h1 className={styles.studyKpTitle}>{knowledgePoint.title}</h1>
          <p className={styles.studyKpMeta}>
            {`知识点 ${String(knowledgePoint.order).padStart(2, "0")} · ${formatClewKpPageLabel(chapter.textbook.fileName, knowledgePoint.sourcePage, knowledgePoint.sourcePageAnnotated)}`}
            {isClewDocx(chapter.textbook.fileName) ? (
              <button
                type="button"
                className={styles.pageAnnotateToggle}
                onClick={() => setPageAnnotateOpen((open) => !open)}
              >
                {knowledgePoint.sourcePageAnnotated ? "修改标注" : "标注页码"}
              </button>
            ) : null}
            {knowledgePoint.keyTerms.length > 0 ? ` · 术语：${knowledgePoint.keyTerms.join("、")}` : ""}
            {knowledgePoint.prerequisites.length > 0
              ? ` · 先修：${knowledgePoint.prerequisites.join("、")}`
              : ""}
          </p>
          {isClewDocx(chapter.textbook.fileName) && pageAnnotateOpen ? (
            <form
              className={styles.pageAnnotateForm}
              onSubmit={(event) => {
                event.preventDefault();
                void submitPageAnnotation();
              }}
            >
              <label className={styles.pageAnnotateLabel}>
                本知识点在教材的第
                <input
                  className={styles.pageAnnotateInput}
                  inputMode="numeric"
                  value={pageAnnotateValue}
                  placeholder={knowledgePoint.sourcePageAnnotated ? String(knowledgePoint.sourcePage) : "页码"}
                  onChange={(event) => setPageAnnotateValue(event.target.value)}
                  aria-label="知识点页码"
                  aria-invalid={pageAnnotateError ? true : undefined}
                  aria-describedby={pageAnnotateError ? "clew-page-annotate-error" : undefined}
                />
                页
              </label>
              <button type="submit" className={styles.pageAnnotateToggle} disabled={pageAnnotateBusy}>
                {pageAnnotateBusy ? "保存中…" : "保存"}
              </button>
              <button
                type="button"
                className={styles.pageAnnotateToggle}
                disabled={pageAnnotateBusy}
                onClick={() => setPageAnnotateOpen(false)}
              >
                取消
              </button>
              {knowledgePoint.sourcePageAnnotated ? (
                <button
                  type="button"
                  className={styles.pageAnnotateToggle}
                  disabled={pageAnnotateBusy}
                  onClick={() => void submitPageAnnotation(null)}
                >
                  清除标注
                </button>
              ) : null}
              {pageAnnotateError ? <span className={styles.pageAnnotateError} role="alert" id="clew-page-annotate-error">{pageAnnotateError}</span> : null}
            </form>
          ) : null}
          {pageAnnotateNote ? (
            <p className={styles.pageAnnotateNote} role="status">
              {pageAnnotateNote}
            </p>
          ) : null}
          <p className={styles.studyKpDescription}>{knowledgePoint.description}</p>
        </header>

        <div className={styles.studySpineRail}>
          <ClewStageSpine items={spineItems} />
          <p className={styles.kbdHintRow} aria-hidden="true">
            J / K 切换知识点 · E 生成讲义 · N 写批注（先选中讲义文字）
          </p>
          {kbdHint ? (
            <p className={styles.kbdHintActive} role="status">
              {kbdHint}
            </p>
          ) : null}
        </div>

        <div className={styles.studyContentCol}>
          {/* v4 §四 顺序：面包屑 → 文档标题 → 元信息 → 安静进度线 → 视图 tabs → 讲义正文 */}
          <ClewPathGuide guide={guide} />
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
            </div>

            <div
              className={styles.lessonVariantTabs}
              role="group"
              aria-label="讲义视图（同一份讲义确定性派生）"
            >
              {CLEW_LESSON_VARIANTS.map((variant) => (
                <button
                  key={variant}
                  type="button"
                  aria-pressed={lessonVariant === variant}
                  disabled={generating}
                  title={CLEW_LESSON_VARIANT_LABELS[variant]}
                  onClick={() => onSwitchLessonVariant(variant)}
                >
                  {CLEW_LESSON_VARIANT_SHORT_LABELS[variant]}
                </button>
              ))}
            </div>

            <div className={styles.actionRow}>
              {/* 批 3：讲解风格选择迁至右栏「问 Clew」composer chip 排（与讲解共用同一偏好），此处只作同步显示 */}
              <span className={styles.lessonStyleBadge}>
                风格：{CLEW_LESSON_STYLE_LABELS[lessonStyle]}
              </span>
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
                <div
                  className={[
                    styles.lessonBody,
                    lessonFolded && !lessonTooShort ? styles.lessonBodyClipped : "",
                  ].filter(Boolean).join(" ")}
                  ref={lessonBodyRef}
                >
                  <ClewMarkdown
                    key={`${lesson.generatedAt}:${lessonVariant}`}
                    markdown={derivedLesson.contentMd}
                  />
                </div>
                {!lessonTooShort ? (
                  <button
                    type="button"
                    className={styles.lessonFoldToggle}
                    onClick={() => setLessonFolded((folded) => !folded)}
                  >
                    {lessonFolded
                      ? `展开全篇 · 共 ${lessonCharCount} 字`
                      : "收起讲义"}
                  </button>
                ) : null}
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

                  {/* ZCODE-M5：复习打分三键（该知识点有复习条目时出现；到期才可打分，否则显示排期） */}
                  {reviewItem ? (
                    <div className={styles.reviewRateRow}>
                      {reviewItem.due ? (
                        <>
                          <p className={styles.reviewRateHint}>
                            复习打分：这次重学感觉如何？打分后按遗忘曲线排下次复习，并从「今日到期」消失。
                          </p>
                          <div className={styles.reviewRateButtons} role="group" aria-label="复习打分">
                            <button type="button" disabled={reviewRating} onClick={() => void onRateReview("again")}>
                              再来一次
                            </button>
                            <button type="button" disabled={reviewRating} onClick={() => void onRateReview("hard")}>
                              有点难
                            </button>
                            <button type="button" disabled={reviewRating} onClick={() => void onRateReview("good")}>
                              记住了
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className={styles.reviewRateNext}>
                          复习排期中：下次{" "}
                          {new Date(reviewItem.dueAt).toLocaleString("zh-CN", {
                            hour12: false,
                            timeZone: "Asia/Shanghai",
                          })}
                          （已复习 {reviewItem.reviewCount} 次
                          {reviewItem.lapses > 0 ? ` · 遗忘 ${reviewItem.lapses} 次` : ""}）。
                        </p>
                      )}
                      {reviewRateNote ? (
                        <p className={reviewItem.due ? styles.reviewRateDone : styles.selfCheckNote} role="status">
                          {reviewRateNote}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </>
              )}
            </section>
          ) : null}

          {lesson ? (
            <section
              ref={practicePanelRef}
              id="practice"
              className={styles.selfCheckPanel}
              aria-labelledby="clew-practice-title"
            >
              <div className={styles.panelHead}>
                <h2 id="clew-practice-title">练习</h2>
                {practiceSet.questions.length > 0 ? (
                  <p>
                    {practiceSet.summary.total} 题 · 已作答 {practiceSet.summary.answered}
                    {practiceSet.summary.correct + practiceSet.summary.wrong > 0
                      ? ` · 对 ${practiceSet.summary.correct} 错 ${practiceSet.summary.wrong}`
                      : ""}
                  </p>
                ) : (
                  <p>尚未生成</p>
                )}
              </div>

              {practiceError ? (
                <p className={styles.errorBox} role="alert">
                  <CircleAlert aria-hidden="true" size={16} strokeWidth={1.8} />
                  <span>{practiceError}</span>
                </p>
              ) : null}

              {practiceLog.length > 0 && practiceGenerating ? (
                <ul className={styles.progressLog} aria-label="练习生成进度">
                  {practiceLog.map((line, index) => (
                    <li key={`${index}-${line}`}>{line}</li>
                  ))}
                </ul>
              ) : null}

              {practiceSet.questions.length === 0 ? (
                <>
                  <p className={styles.emptyState}>
                    按该知识点聚合的教材原文生成一组练习：4 道单选（即选即判）+ 2 道填空（对照参考答案自评）；
                    错题自动进入复习调度与错题中心。深度档由 deepseek-flash 深度思考出题（计 2 次额度），标准档计 1 次。
                  </p>
                  <div className={styles.actionRow}>{practiceRegenerateControls()}</div>
                </>
              ) : (
                <>
                  {practiceWrongCount > 0 ? (
                    <div className={styles.selfCheckFilters} role="group" aria-label="练习筛选">
                      <button
                        type="button"
                        aria-pressed={!practiceWrongOnly}
                        onClick={() => setPracticeWrongOnly(false)}
                      >
                        全部
                      </button>
                      <button
                        type="button"
                        aria-pressed={practiceWrongOnly}
                        onClick={() => setPracticeWrongOnly(true)}
                      >
                        只练错题（{practiceWrongCount}）
                      </button>
                    </div>
                  ) : null}

                  <ul className={styles.selfCheckList}>
                    {visiblePracticeItems.map((question) => {
                      const latest = question.myAttempt;
                      if (question.kind === "a1") {
                        const revealed = latest !== null;
                        return (
                          <li
                            key={question.id}
                            className={styles.selfCheckItem}
                            data-mark={latest ? (latest.isCorrect ? "ok" : "shaky") : "idle"}
                          >
                            <p className={styles.selfCheckQuestion}>
                              <span className={styles.selfCheckIndex}>
                                {String(question.order).padStart(2, "0")}
                              </span>
                              {question.stem}
                            </p>
                            <div className={styles.practiceChoices} role="group" aria-label="选项">
                              {(question.choices ?? []).map((choice, index) => {
                                const chosen = latest?.selectedIndex === index;
                                const isCorrectOne = revealed && latest?.correctIndex === index;
                                const chosenWrong = chosen && revealed && !latest?.isCorrect;
                                return (
                                  <button
                                    key={index}
                                    type="button"
                                    className={[
                                      styles.practiceChoice,
                                      isCorrectOne ? styles.practiceChoiceCorrect : "",
                                      chosenWrong ? styles.practiceChoiceWrong : "",
                                    ].filter(Boolean).join(" ")}
                                    aria-pressed={chosen}
                                    disabled={practiceAttemptBusy !== null}
                                    onClick={() => void onPracticeAttempt(question, { selectedIndex: index })}
                                  >
                                    <span className={styles.practiceChoiceIndex}>
                                      {String.fromCharCode(65 + index)}
                                    </span>
                                    <span>{choice}</span>
                                    {isCorrectOne ? <span aria-hidden="true">✓</span> : null}
                                    {chosenWrong ? <span aria-hidden="true">✗</span> : null}
                                  </button>
                                );
                              })}
                            </div>
                            {revealed && latest ? (
                              <p className={styles.selfCheckAnswer}>
                                {latest.isCorrect
                                  ? "回答正确。"
                                  : `正确答案：${String.fromCharCode(65 + (latest.correctIndex ?? 0))}。`}
                                {latest.explanation}
                              </p>
                            ) : null}
                          </li>
                        );
                      }
                      const revealed = Boolean(practiceRevealed[question.id]) || latest !== null;
                      return (
                        <li
                          key={question.id}
                          className={styles.selfCheckItem}
                          data-mark={latest ? (latest.isCorrect ? "ok" : "shaky") : "idle"}
                        >
                          <p className={styles.selfCheckQuestion}>
                            <span className={styles.selfCheckIndex}>
                              {String(question.order).padStart(2, "0")}
                            </span>
                            {question.stem}
                          </p>
                          <div className={styles.selfCheckActions}>
                            <button
                              type="button"
                              className={styles.ghostButton}
                              onClick={() =>
                                setPracticeRevealed((current) => ({
                                  ...current,
                                  [question.id]: !current[question.id],
                                }))
                              }
                            >
                              {revealed ? "收起参考答案" : "显示参考答案"}
                            </button>
                            <button
                              type="button"
                              className={styles.selfCheckMarkOk}
                              aria-pressed={latest?.selfRating === "correct"}
                              disabled={practiceAttemptBusy !== null}
                              onClick={() => void onPracticeAttempt(question, { selfRating: "correct" })}
                            >
                              我答对了
                            </button>
                            <button
                              type="button"
                              className={styles.selfCheckMarkShaky}
                              aria-pressed={latest?.selfRating === "wrong"}
                              disabled={practiceAttemptBusy !== null}
                              onClick={() => void onPracticeAttempt(question, { selfRating: "wrong" })}
                            >
                              我答错了
                            </button>
                          </div>
                          {revealed ? (
                            <p className={styles.selfCheckAnswer}>
                              参考答案：{question.answerText}。{question.explanation}
                            </p>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>

                  {practiceWrongOnly && visiblePracticeItems.length === 0 ? (
                    <p className={styles.selfCheckNote}>错题已全部订正——切回「全部」巩固，或重新生成题组。</p>
                  ) : null}

                  {practiceNote ? (
                    <p className={styles.selfCheckNote} role="status">
                      {practiceNote}
                    </p>
                  ) : null}

                  {practiceNotes.length > 0 ? (
                    <ul className={styles.noteList} aria-label="练习说明">
                      {practiceNotes.map((note, index) => (
                        <li key={`${index}-${note}`}>{note}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className={styles.actionRow}>{practiceRegenerateControls()}</div>
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
          <div className={styles.chatHead}>
            <h2 id="clew-chat-title">问 Clew</h2>
            <span
              className={styles.chatStatusDot}
              aria-hidden="true"
              title="AI 讲解，可能出错；请对照教材原文与讲义核对"
            />
          </div>
          <p className={styles.chatHeadNote}>AI 讲解，可能出错；请对照教材原文与讲义核对</p>

          <div className={styles.chatList} ref={chatListRef} aria-live="polite">
            {renderedMessages.length === 0 ? (
              <p className={styles.chatEmpty}>
                问 Clew：就这个知识点继续问，例如：「这一页的要点我记混了，怎么区分？」「为什么这里不能直接等同？」
              </p>
            ) : (
              renderedMessages.map((message, index) => (
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
                  {message.role === "assistant" ? (
                    <div className={styles.chatMsgActions}>
                      <button
                        type="button"
                        className={styles.chatMsgAction}
                        title={copiedIndex === index ? "已复制" : "复制这条回答"}
                        aria-label="复制这条回答"
                        disabled={streaming}
                        onClick={() => void onCopyAnswer(index, message.content)}
                      >
                        {copiedIndex === index ? (
                          <Check aria-hidden="true" size={14} strokeWidth={1.7} />
                        ) : (
                          <Copy aria-hidden="true" size={14} strokeWidth={1.6} />
                        )}
                      </button>
                      <button
                        type="button"
                        className={styles.chatMsgAction}
                        title="重新生成：对同一条提问重新请求一次（计一次问答配额，追加为新回答）"
                        aria-label="重新生成这条回答"
                        disabled={streaming}
                        onClick={() => onRegenerateAnswer(index)}
                      >
                        <RefreshCw aria-hidden="true" size={14} strokeWidth={1.6} />
                      </button>
                    </div>
                  ) : null}
                </div>
              ))
            )}
            {streaming ? (
              <div className={styles.chatRowAssistant}>
                <p className={styles.chatRole}>Clew 讲解</p>
                {messages[messages.length - 1]?.role === "assistant" ? (
                  <div className={styles.chatBubble}>
                    <div className={styles.chatMarkdown}>
                      <ClewMarkdown markdown={messages[messages.length - 1].content} />
                    </div>
                    <span className={styles.streamCaret} aria-hidden="true" />
                  </div>
                ) : (
                  <p className={styles.chatStatusLine} role="status">
                    <span className={styles.chatStatusBreath} aria-hidden="true" />
                    {chatStatus ?? "正在思考…"}
                  </p>
                )}
              </div>
            ) : null}
          </div>

          {chatError ? (
            <p className={styles.errorBox} role="alert" id="clew-chat-error">
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

          {/* D10 跨 KP 跳转建议：确定性匹配本书其他知识点，命中才渲染 */}
          {chatSuggestions.length > 0 && !streaming ? (
            <div className={styles.chatSuggestRow} aria-label="相关知识点">
              <span className={styles.chatSuggestLabel}>相关知识点</span>
              {chatSuggestions.map((suggestion) => (
                <Link key={suggestion.kpId} className={styles.chatSuggestChip} href={suggestion.href}>
                  {suggestion.title} →
                </Link>
              ))}
            </div>
          ) : null}

          {/* 讲解设置：单入口安静控制（对齐 ChatGPT/Claude composer 语言），选项收进弹出面板 */}
          <div className={styles.chatSettingsWrap} data-chat-settings-wrap="true">
            {chatSettingsOpen ? (
              <div className={styles.chatSettingsPanel} role="dialog" aria-label="讲解设置">
                <p className={styles.chatSettingsHead}>讲解风格</p>
                <div role="radiogroup" aria-label="讲解风格">
                  {CLEW_LESSON_STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      role="radio"
                      aria-checked={lessonStyle === style}
                      className={lessonStyle === style ? styles.chatOptionActive : styles.chatOption}
                      disabled={streaming}
                      onClick={() => onSelectLessonStyle(style)}
                    >
                      <span className={styles.chatOptionName}>{CLEW_LESSON_STYLE_LABELS[style]}</span>
                      {lessonStyle === style ? (
                        <Check aria-hidden="true" size={14} strokeWidth={1.8} />
                      ) : null}
                    </button>
                  ))}
                </div>
                <p className={styles.chatSettingsHead}>依据范围</p>
                <div role="radiogroup" aria-label="依据范围">
                  {CLEW_CHAT_SCOPES.map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      role="radio"
                      aria-checked={chatScope === scope}
                      className={chatScope === scope ? styles.chatOptionActive : styles.chatOption}
                      disabled={streaming}
                      onClick={() => onSwitchChatScope(scope)}
                    >
                      <span className={styles.chatOptionName}>{CLEW_CHAT_SCOPE_LABELS[scope]}</span>
                      {chatScope === scope ? (
                        <Check aria-hidden="true" size={14} strokeWidth={1.8} />
                      ) : null}
                    </button>
                  ))}
                </div>
                <p className={styles.chatSettingsHead}>思考强度</p>
                <div role="radiogroup" aria-label="思考强度">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={chatIntensity === "standard"}
                    className={chatIntensity === "standard" ? styles.chatOptionActive : styles.chatOption}
                    disabled={streaming}
                    onClick={() => onSwitchChatIntensity("standard")}
                  >
                    <span className={styles.chatOptionName}>标准（快速回答）</span>
                    {chatIntensity === "standard" ? (
                      <Check aria-hidden="true" size={14} strokeWidth={1.8} />
                    ) : null}
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={chatIntensity === "deep"}
                    className={chatIntensity === "deep" ? styles.chatOptionActive : styles.chatOption}
                    disabled={streaming}
                    onClick={() => onSwitchChatIntensity("deep")}
                  >
                    <span className={styles.chatOptionName}>深度思考（较慢 · Pro/Max · 计 2 次额度）</span>
                    {chatIntensity === "deep" ? (
                      <Check aria-hidden="true" size={14} strokeWidth={1.8} />
                    ) : null}
                  </button>
                </div>
                <p className={styles.chatSettingsHint}>
                  风格、依据与思考强度对本轮之后的讲解生效；风格选择会记为账户默认。
                </p>
              </div>
            ) : null}
            <button
              type="button"
              className={styles.chatSettingsButton}
              aria-haspopup="dialog"
              aria-expanded={chatSettingsOpen}
              onClick={() => setChatSettingsOpen((open) => !open)}
            >
              <SlidersHorizontal aria-hidden="true" size={13} strokeWidth={1.6} />
              <span>
                {CLEW_LESSON_STYLE_SHORT_LABELS[lessonStyle]} · {CLEW_CHAT_SCOPE_LABELS[chatScope]} ·{" "}
                {chatIntensity === "deep" ? "深度" : "标准"}
              </span>
            </button>
          </div>

          {/* Page Chat 固化：追问只对当前 KP 提问（服务端 chat-prompt 已注入该 KP 的标题/页码/说明），chip 负责显式标注 */}
          <button
            type="button"
            className={styles.chatContextChip}
            aria-expanded={chatChipOpen}
            onClick={() => setChatChipOpen((open) => !open)}
            title={knowledgePoint.description}
          >
            当前知识点：{knowledgePoint.title} · {formatClewKpPageLabel(chapter.textbook.fileName, knowledgePoint.sourcePage, knowledgePoint.sourcePageAnnotated)}
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
              <input
                className={styles.chatInput}
                type="text"
                value={chatDraft}
                maxLength={1000}
                placeholder="就这个知识点继续问…"
                aria-label="追问（Enter 发送）"
                aria-describedby={chatError ? "clew-chat-error" : undefined}
                disabled={streaming}
                onChange={(event) => setChatDraft(event.target.value)}
                onKeyDown={(event) => {
                  // 评审 P0-A：IME 守卫（对齐课题房间）——中文输入法选词回车不发送
                  if (event.key === "Enter" && (event.nativeEvent.isComposing || event.keyCode === 229)) {
                    event.preventDefault();
                  }
                }}
              />
            </label>
            <button
              type="submit"
              className={styles.chatSendButton}
              disabled={streaming || chatDraft.trim().length === 0}
              aria-label={streaming ? "回答中" : "发送"}
            >
              {streaming ? (
                <Loader2 className={styles.spin} aria-hidden="true" size={16} strokeWidth={1.8} />
              ) : (
                <CornerDownLeft aria-hidden="true" size={16} strokeWidth={1.6} />
              )}
            </button>
          </form>
        </section>

      </aside>
    </div>
  );
}
