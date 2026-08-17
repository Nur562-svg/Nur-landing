"use client";

import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CircleX,
  FileStack,
  PenLine,
  X,
} from "lucide-react";
import type { CourseDefinition, FsrsCriterionState, LearnerAttemptRecord } from "@/types/learning";
import { useLearningMemory } from "@/hooks/use-learning-memory";
import { useWrongQuestionCenter } from "@/hooks/use-wrong-questions";
import {
  clearResolvedConflicts,
  resolveAllSyncConflicts,
  resolveSyncConflict,
  triggerLearnerStateSync,
  performReliableLoginMerge,
  type SyncConflictResolution,
} from "@/lib/learner-state-sync";
import { useSyncConflicts } from "@/hooks/use-sync-conflicts";
import { SyncStatusBadge } from "./sync-status-badge";
import { getAdmissionSyncConsents, setAdmissionSyncConsent } from "@/lib/material-admission";
import { useSyncStatus } from "@/hooks/use-sync-status";
import { useSession } from "@/hooks/use-session";
import {
  buildLearnerExportFilename,
  collectLearnerDataExportFromBrowser,
  downloadLearnerExport,
} from "@/lib/export-learner-data";
import type { UserQuotas } from "@/lib/quotas";
import { NurAgentDock } from "./nur-agent-dock";
import styles from "./learning-dashboard.module.css";

const PROFILE_STORAGE_KEY = "nur-learn:profile:v1";
const PRIVATE_CONSENT_KEY = "nur-learn:private-admission-consent:v1";

const DEFAULT_PROFILE: StoredProfile = {
  studentName: "张同学",
  major: "中西医结合临床",
  avatarSrc: null,
};

type StoredProfile = {
  studentName: string;
  major: string;
  avatarSrc: string | null;
};

/** 仅在客户端调用；服务端返回默认值。 */
function readStoredProfile(): StoredProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      studentName: typeof parsed.studentName === "string" ? parsed.studentName : DEFAULT_PROFILE.studentName,
      major: typeof parsed.major === "string" ? parsed.major : DEFAULT_PROFILE.major,
      avatarSrc: typeof parsed.avatarSrc === "string" ? parsed.avatarSrc : null,
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function saveProfile(profile: StoredProfile): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // storage unavailable
  }
}

const DAY_NAMES = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

const FSRS_STATE_LABELS: Record<FsrsCriterionState["state"], string> = {
  new: "未开始",
  learning: "学习中",
  review: "复习中",
  relearning: "重学中",
};

function formatFsrsSnapshot(snapshot: FsrsCriterionState): string {
  const date = snapshot.lastReviewAt ? snapshot.lastReviewAt.slice(0, 10) : "无记录";
  return `${FSRS_STATE_LABELS[snapshot.state]} · 稳定度 ${snapshot.stability.toFixed(1)} · 遗忘 ${snapshot.lapses} 次 · ${date}`;
}

function formatAttemptSnapshot(snapshot: LearnerAttemptRecord): string {
  const excerpt = snapshot.confirmedText.length > 16
    ? `${snapshot.confirmedText.slice(0, 16)}…`
    : snapshot.confirmedText;
  return `${snapshot.confirmedAt.slice(0, 10)} · ${excerpt}`;
}

function computeWeekDays(): { day: string; date: string; today: boolean }[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ...
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return {
      day: DAY_NAMES[d.getDay()],
      date: `${month}/${day}`,
      today: d.toDateString() === today.toDateString(),
    };
  });
}

const reasoningSteps = [
  {
    index: "01",
    title: "四诊证据",
    description: "先标记最关键的三条信息",
  },
  {
    index: "02",
    title: "病机判断",
    description: "归纳病机，明确关键病位与病性",
  },
  {
    index: "03",
    title: "证型选择",
    description: "筛选最可能的证型并说明依据",
  },
  {
    index: "04",
    title: "鉴别排除",
    description: "排除相似证型，巩固诊断依据",
  },
];

type JumpTarget = "workspace" | "dual-lens" | "reasoning" | "review";

type LearningDashboardProps = {
  courses?: readonly CourseDefinition[];
};

export function LearningDashboard({ courses }: LearningDashboardProps) {
  const { user, loading: sessionLoading, logout } = useSession();
  const [activeStep, setActiveStep] = useState(0);
  const [planOpen, setPlanOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  // 初始渲染始终使用 DEFAULT_PROFILE，避免 hydration mismatch；
  // 挂载后从 localStorage 读取实际值。
  const [avatarSrc, setAvatarSrc] = useState<string | null>(DEFAULT_PROFILE.avatarSrc);
  const [studentName, setStudentName] = useState(DEFAULT_PROFILE.studentName);
  const [major, setMajor] = useState(DEFAULT_PROFILE.major);

  // M3 会员配额
  const [quotas, setQuotas] = useState<UserQuotas | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect -- 挂载后从 localStorage 读取实际 profile，避免 hydration mismatch */
  useEffect(() => {
    const stored = readStoredProfile();
    setAvatarSrc(stored.avatarSrc);
    setStudentName(stored.studentName);
    setMajor(stored.major);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  const [saveNotice, setSaveNotice] = useState(false);
  const weekDays = useMemo(() => computeWeekDays(), []);
  const todayInfo = weekDays.find((d) => d.today);
  const todayLabel = todayInfo
    ? `${todayInfo.day} ${todayInfo.date.replace("/", "月")}日`
    : "";
  const firstCourseSlug = courses?.[0]?.slug ?? "tcm-diagnostics";
  const [caseCompleted, setCaseCompleted] = useState(false);
  const memoryState = useLearningMemory();
  const wrongQuestionData = useWrongQuestionCenter(courses ?? []);

  // M2: 可靠登录合并 + 双向同步骨架（使用集中 performReliableLoginMerge）
  // 按 user.email 去重；全量上传 + 下载 + 客户端 merge + 状态更新
  // （仅作守卫、不参与渲染，用 ref 避免 effect 内同步 setState）
  const hasSyncedForUserRef = useRef<string | null>(null);

  const fetchQuotas = async () => {
    try {
      const res = await fetch("/api/auth/quotas", { credentials: "include" });
      if (res.ok) {
        const data = (await res.json()) as { ok?: boolean; quotas?: UserQuotas };
        if (data.ok && data.quotas) setQuotas(data.quotas);
      }
    } catch (e) { /* silent for demo */ }
  };

  useEffect(() => {
    if (!user?.email || hasSyncedForUserRef.current === user.email) return;
    hasSyncedForUserRef.current = user.email;

    void performReliableLoginMerge(user.email);

    // M3: 登录后刷新配额
    // eslint-disable-next-line react-hooks/set-state-in-effect -- setQuotas 位于 await 之后，非同步 setState；规则跨过程分析无法识别
    void fetchQuotas();
  }, [user?.email]);

  // M2 全面优化：网络恢复或标签可见时自动重同步（跨设备友好）
  useEffect(() => {
    if (!user?.email) return;

    const handleOnline = () => {
      triggerLearnerStateSync(true);
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        triggerLearnerStateSync();
      }
    };

    window.addEventListener("online", handleOnline);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("online", handleOnline);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [user?.email]);

  // M3: 当用户存在时确保配额已加载（包括页面直达）
  // （ref 守卫代替 quotas 依赖，避免 effect → setQuotas → effect 级联）
  const quotasLoadedRef = useRef(false);
  useEffect(() => {
    if (!user?.email || quotasLoadedRef.current) return;
    quotasLoadedRef.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- setQuotas 位于 await 之后，非同步 setState；规则跨过程分析无法识别
    void fetchQuotas();
  }, [user?.email]);

  /* Compute real progress stats from learning memory */
  const weeklyAttempts = useMemo(() => {
    const now = new Date();
    const weekStart = new Date(now);
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    weekStart.setDate(now.getDate() + mondayOffset);
    weekStart.setHours(0, 0, 0, 0);
    return memoryState.attempts.filter(
      (a) => new Date(a.confirmedAt) >= weekStart,
    );
  }, [memoryState.attempts]);

  const pendingReviewCount = useMemo(() => (
    memoryState.reviewTasks.filter(
      (t) => t.status === "proposed" || t.status === "accepted",
    ).length
  ), [memoryState.reviewTasks]);

  // M2 优化：使用共享 hook
  const syncStatus = useSyncStatus();

  // M2 冲突可见性：当前账户的未解决同步冲突
  // （快照引用已按原始字符串缓存；列表上限 100，过滤无需 memo）
  const allConflicts = useSyncConflicts();
  const conflicts = user?.email
    ? allConflicts.filter((item) => item.userEmail === user.email)
    : [];

  const handleResolveConflict = (conflictId: string, resolution: SyncConflictResolution) => {
    resolveSyncConflict(conflictId, resolution);
  };

  const handleResolveAllConflicts = (resolution: SyncConflictResolution) => {
    resolveAllSyncConflicts(resolution, user?.email);
  };

  const handleManualSync = () => {
    triggerLearnerStateSync(true);
  };

  // 简单 consent 管理（M2 优化）
  const [consents, setConsents] = useState<Record<string, boolean>>(() => 
    typeof window !== "undefined" ? getAdmissionSyncConsents() : {}
  );

  const toggleConsent = (recordId: string) => {
    const next = !consents[recordId];
    setAdmissionSyncConsent(recordId, next);
    const updated = { ...consents, [recordId]: next };
    if (!next) delete updated[recordId];
    setConsents(updated);
    // 切换后触发一次同步以更新 server
    triggerLearnerStateSync(true);
  };


  const weeklySessionCount = useMemo(() => {
    const daySet = new Set(
      weeklyAttempts.map((a) => a.confirmedAt.slice(0, 10)),
    );
    return daySet.size;
  }, [weeklyAttempts]);

  const persistProfile = useCallback(() => {
    saveProfile({ studentName, major, avatarSrc });
  }, [studentName, major, avatarSrc]);

  function jumpTo(target: JumpTarget) {
    document.getElementById(target)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function continueReasoning() {
    if (caseCompleted) {
      setCaseCompleted(false);
      setActiveStep(0);
      return;
    }

    if (activeStep < reasoningSteps.length - 1) {
      setActiveStep((current) => current + 1);
      return;
    }

    setCaseCompleted(true);
  }

  const nextStep = reasoningSteps[activeStep + 1];
  const primaryActionLabel = caseCompleted
    ? "再练一个辨证案例"
    : nextStep
      ? `继续：${nextStep.title}`
      : "完成本次辨证";


  const handleExportLearnerData = useCallback(() => {
    try {
      const exportData = collectLearnerDataExportFromBrowser({
        account: {
          signedIn: Boolean(user),
          email: user?.email ?? null,
        },
        courses,
      });
      downloadLearnerExport(exportData, buildLearnerExportFilename());
      setExportNotice("本机学习数据快照已开始下载（非官方成绩单）。");
      window.setTimeout(() => setExportNotice(null), 2500);
    } catch (error) {
      setExportNotice(error instanceof Error ? error.message : "导出失败");
      window.setTimeout(() => setExportNotice(null), 3000);
    }
  }, [user, courses]);

  return (
    <main className={styles.appShell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/learn" aria-label="NUR LEARN 首页">
          NUR LEARN
        </Link>

        <nav className={styles.navigation} aria-label="主导航">
          <button className={styles.navActive} type="button" onClick={() => jumpTo("workspace")}>
            本周
          </button>
          <Link href={`/courses/${firstCourseSlug}`}>
            课程
          </Link>
          <Link href="/learn/course-builder">
            建课
          </Link>
          <Link href="/question-bank">
            题库
          </Link>
          <Link href="/wrong-questions">
            错题{wrongQuestionData.totalWrong > 0 ? (
              <span className={styles.navBadge}>{wrongQuestionData.totalWrong}</span>
            ) : null}
          </Link>
          <Link href={`/courses/${firstCourseSlug}/mock-exam`}>
            模考
          </Link>
        </nav>

        <div className={styles.accountArea}>
          {user && <SyncStatusBadge className="mr-2" />}
          <button
            className={styles.accountButton}
            type="button"
            aria-label={`打开${studentName ?? "学习"}账户`}
            aria-expanded={accountOpen}
            aria-controls="account-panel"
            onClick={() => setAccountOpen((current) => !current)}
          >
            <span className={styles.avatar} aria-hidden="true">
              {avatarSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarSrc} alt="" />
              ) : (
                (user?.displayName ?? "N").slice(0, 1).toUpperCase()
              )}
            </span>
            <span className={styles.studentName}>{user?.displayName ?? studentName ?? "张同学"}</span>
            <ChevronDown aria-hidden="true" size={16} strokeWidth={1.6} />
          </button>

          {accountOpen ? (
            <section className={styles.accountPanel} id="account-panel" aria-label="个人资料">
              <div className={styles.accountPanelHeading}>
                <div>
                  <span>学习身份</span>
                  <strong>个人资料</strong>
                </div>
                <button type="button" onClick={() => setAccountOpen(false)} aria-label="关闭个人资料">
                  <X aria-hidden="true" size={18} />
                </button>
              </div>

              {sessionLoading ? (
                <p className={styles.accountHint}>正在读取会话…</p>
              ) : user ? (
                <>
                  <div className={styles.accountSummary}>
                    <span className={styles.accountLabel}>已登录账户</span>
                    <strong className={styles.accountEmail}>{user.email}</strong>
                    <span className={styles.accountTier}>
                      {user.membershipTier === "pro" ? "Pro 会员" : "免费版"}
                    </span>
                    {/* M3 配额展示 */}
            {quotas && (
              <div style={{fontSize: "11px", marginTop: 4, color: "#666", lineHeight: 1.4}}>
                        {Object.entries(quotas.quotas).slice(0, 3).map(([k, q]) => (
                          <div key={k}>
                            {k === "privateMaterials" ? "私人材料" : k === "mockExams" ? "模考" : "构建"}: {q.used} / {q.limit === "unlimited" ? "∞" : q.limit}
                            {q.isOverLimit ? "（已超）" : q.isNearLimit ? "（接近上限）" : ""}
                          </div>
                        ))}
                      </div>
                    )}
                    {user.membershipTier !== "pro" && (
                      <a
                        href="/account/billing"
                        style={{fontSize: "11px", marginTop: 6, padding: "2px 8px", border: "1px solid #c9a36b", borderRadius: 2, background: "#fffaf0", display: "inline-block", textDecoration: "none", color: "#10100f"}}
                      >
                        升级会员
                      </a>
                    )}
                    <a
                      href="/account/billing"
                      style={{fontSize: "12px", marginTop: 6, display: "block", textDecoration: "none", color: "#17659a"}}
                    >
                      会员中心 · {user.membershipTier === "pro" ? "Pro 会员" : user.membershipTier === "lite" ? "Lite 会员" : "免费版"}
                    </a>
                  </div>
                  <button
                    className={styles.accountLogout}
                    type="button"
                    onClick={() => {
                      clearResolvedConflicts(user.email);
                      void logout();
                      setAccountOpen(false);
                    }}
                  >
                    退出登录
                  </button>


                  {/* M2 冲突可见性：同步冲突确认 */}
                  {conflicts.length > 0 ? (
                    <section className={styles.conflictSection} aria-label="同步冲突确认">
                      <p className={styles.conflictHeading}>
                        有 {conflicts.length} 处同步冲突，需要确认
                      </p>
                      <p className={styles.conflictHint}>
                        本机与云端的同一学习记录都在上次合并后更新过，需要你选择保留哪一份。
                      </p>
                      <div className={styles.conflictBulkRow}>
                        <button
                          type="button"
                          className={styles.conflictBulkButton}
                          onClick={() => handleResolveAllConflicts("local")}
                        >
                          全部以本机为准
                        </button>
                        <button
                          type="button"
                          className={styles.conflictBulkButton}
                          onClick={() => handleResolveAllConflicts("server")}
                        >
                          全部以云端为准
                        </button>
                      </div>
                      <ul className={styles.conflictList}>
                        {conflicts.map((conflict) => (
                          <li key={conflict.id} className={styles.conflictItem}>
                            <div className={styles.conflictItemHead}>
                              <span className={styles.conflictItemType}>
                                {conflict.type === "fsrs" ? "FSRS 记忆准则" : "确认作答"}
                              </span>
                              <span className={styles.conflictItemRef} title={conflict.refId}>
                                {conflict.refId}
                              </span>
                            </div>
                            {conflict.type === "fsrs"
                              && conflict.local.kind === "fsrs"
                              && conflict.server.kind === "fsrs" ? (
                              <div className={styles.conflictCompare}>
                                <p><span>本机</span>{formatFsrsSnapshot(conflict.local.fsrs)}</p>
                                <p><span>云端</span>{formatFsrsSnapshot(conflict.server.fsrs)}</p>
                              </div>
                            ) : null}
                            {conflict.type === "attempt"
                              && conflict.local.kind === "attempt"
                              && conflict.server.kind === "attempt" ? (
                              <div className={styles.conflictCompare}>
                                <p><span>本机</span>{formatAttemptSnapshot(conflict.local.attempt)}</p>
                                <p><span>云端</span>{formatAttemptSnapshot(conflict.server.attempt)}</p>
                              </div>
                            ) : null}
                            <div className={styles.conflictItemActions}>
                              <button
                                type="button"
                                onClick={() => handleResolveConflict(conflict.id, "local")}
                              >
                                以本机为准
                              </button>
                              <button
                                type="button"
                                onClick={() => handleResolveConflict(conflict.id, "server")}
                              >
                                以云端为准
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {/* M2 优化：手动同步 + 更完善的 consent 管理 */}
                  <div className={styles.accountLocalSection} style={{marginTop: 8}}>
                    <div style={{display: "flex", gap: 8, alignItems: "center"}}>
                      <button
                        onClick={handleManualSync}
                        className={styles.accountSave}
                        disabled={syncStatus.isSyncing}
                        style={{fontSize: "12px", padding: "4px 10px"}}
                      >
                        {syncStatus.isSyncing ? "同步中..." : "立即同步"}
                      </button>
                      <button
                        onClick={() => {
                          Object.keys(consents).forEach(id => setAdmissionSyncConsent(id, false));
                          setConsents({});
                          triggerLearnerStateSync(true);
                        }}
                        style={{fontSize: "11px"}}
                      >
                        清除所有同意
                      </button>
                    </div>
                    <div style={{fontSize: "11px", marginTop: 6, color: "#666"}}>
                      私人材料同步同意 ({Object.keys(consents).length} 条已启用)
                      <div style={{maxHeight: 90, overflow: "auto", marginTop: 4, fontSize: "10px"}}>
                        {Object.keys(consents).length === 0 ? (
                          <span style={{opacity: 0.7}}>暂无（材料准入时可单独设置同意）</span>
                        ) : Object.entries(consents).map(([id]) => (
                          <label key={id} style={{display: "block", margin: "1px 0"}}>
                            <input type="checkbox" checked onChange={() => toggleConsent(id)} /> {id.slice(0, 28)}...
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.accountGuest}>
                  <p className={styles.accountHint}>
                    登录后学习进度、作答记忆与收藏将绑定账户；当前为本地浏览模式。
                  </p>
                  <Link className={styles.accountLoginLink} href="/login?next=/learn">
                    登录 / 注册
                  </Link>
                </div>
              )}


              <div className={styles.accountExportBlock}>
                <p className={styles.accountHint}>
                  导出当前浏览器中的本机学习数据快照，便于备份；不是官方成绩单，也不含课程原文与密钥。
                </p>
                <button
                  className={styles.accountExportButton}
                  type="button"
                  onClick={handleExportLearnerData}
                >
                  导出学习数据
                </button>
                {exportNotice ? (
                  <p className={styles.accountExportStatus} role="status">{exportNotice}</p>
                ) : null}
              </div>

              {user ? (
                <div className={styles.accountLocalSection}>
                  <span className={styles.accountLocalLabel}>本机资料（演示配置）</span>
                  <label className={styles.avatarEditor}>
                    <input type="file" accept="image/*" onChange={handleAvatarChange} />
                    <span className={styles.avatarLarge} aria-hidden="true">
                      {avatarSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={avatarSrc} alt="" />
                      ) : (
                        "N"
                      )}
                    </span>
                    <span>更换头像</span>
                  </label>
                  <label className={styles.accountField}>
                    <span>称呼</span>
                    <input value={studentName} onChange={(event) => setStudentName(event.target.value)} />
                  </label>
                  <label className={styles.accountField}>
                    <span>专业</span>
                    <input value={major} onChange={(event) => setMajor(event.target.value)} />
                  </label>
                  <button
                    className={styles.accountSave}
                    type="button"
                    onClick={() => {
                      persistProfile();
                      setAccountOpen(false);
                      setSaveNotice(true);
                      setTimeout(() => setSaveNotice(false), 2000);
                    }}
                  >
                    保存资料
                  </button>
                </div>
              ) : null}
            </section>
          ) : null}
          {saveNotice ? (
            <p className={styles.saveNotice} role="status">资料已保存到浏览器</p>
          ) : null}
        </div>
      </header>

      <div className={styles.dashboard} id="workspace">
        <div className={styles.ghostWordmark} aria-hidden="true">
          <span>NUR</span>
          <span>LEARN</span>
        </div>

        <section className={styles.mainColumn} aria-labelledby="page-title">
          <p className={styles.eyebrow}>本周学习&nbsp; · &nbsp;{todayLabel}</p>
          <h1 id="page-title">从证据开始辨证</h1>

          <div className={styles.caseSection}>
            <p className={styles.sectionLabel}>当前案例</p>
            <blockquote className={styles.caseCard}>
              女，22岁。近一周食欲不振，脘腹胀满，便溏，神疲乏力。
            </blockquote>
          </div>

          <div className={styles.reasoningSection} id="reasoning">
            <div className={styles.reasoningHeading}>
              <p className={styles.sectionLabel}>辨证推理流程</p>
              <span aria-live="polite">
                {caseCompleted ? "已完成一条完整推理链" : `第 ${activeStep + 1} / 4 步`}
              </span>
            </div>

            <div className={styles.reasoningFlow}>
              {reasoningSteps.map((step, index) => (
                <div className={styles.flowItem} key={step.index}>
                  <button
                    className={`${styles.reasoningCard} ${index === activeStep ? styles.reasoningCardActive : ""}`}
                    type="button"
                    onClick={() => {
                      setCaseCompleted(false);
                      setActiveStep(index);
                    }}
                    aria-current={index === activeStep ? "step" : undefined}
                  >
                    <span className={styles.stepIndex}>{step.index}</span>
                    <strong>{step.title}</strong>
                    <span className={styles.cardRule} aria-hidden="true" />
                    <small>{step.description}</small>
                  </button>
                  {index < reasoningSteps.length - 1 ? (
                    <ArrowRight className={styles.flowArrow} aria-hidden="true" size={29} strokeWidth={1.35} />
                  ) : null}
                </div>
              ))}
            </div>

            <button className={styles.primaryAction} type="button" onClick={continueReasoning}>
              <span>{primaryActionLabel}</span>
              <ArrowRight aria-hidden="true" size={28} strokeWidth={1.45} />
            </button>
          </div>

          <section className={styles.dualLens} id="dual-lens" aria-labelledby="dual-lens-title">
            <h2 id="dual-lens-title">双视角理解线索</h2>
            <div className={styles.dualLensCard}>
              <article>
                <span className={`${styles.lensMark} ${styles.tcmMark}`}>中</span>
                <div>
                  <h3>中医视角</h3>
                  <p>脾失健运，清阳不升，湿浊内停。</p>
                </div>
              </article>
              <article>
                <span className={`${styles.lensMark} ${styles.westernMark}`}>西</span>
                <div>
                  <h3>现代医学视角</h3>
                  <p>胃肠功能减弱、消化吸收障碍，可能与肠道菌群紊乱相关。</p>
                </div>
              </article>
            </div>
          </section>
        </section>

        <aside className={styles.progressColumn} aria-labelledby="progress-title">
          <h2 id="progress-title">本周进度</h2>

          <div className={styles.progressItem}>
            <span className={styles.progressIcon}>
              <CalendarDays aria-hidden="true" size={25} strokeWidth={1.55} />
            </span>
            <div>
              <p>
                <strong>本周</strong>
                <span><b>{weeklySessionCount}</b> / 4 次</span>
              </p>
              <small>建议每周 3–4 次，每次 30–60 分钟</small>
            </div>
          </div>

          <Link href="/wrong-questions" className={styles.progressItem} id="review">
            <span className={styles.progressIcon}>
              <CircleX aria-hidden="true" size={25} strokeWidth={1.55} />
            </span>
            <div>
              <p>
                <strong>错题待复习</strong>
                <span><b>{wrongQuestionData.totalWrong + pendingReviewCount}</b> 题</span>
              </p>
              <small>
                {wrongQuestionData.totalWrong} 道错题 · {pendingReviewCount} 项复习计划
              </small>
            </div>
          </Link>

          <div className={styles.progressItem}>
            <span className={styles.progressIcon}>
              <PenLine aria-hidden="true" size={25} strokeWidth={1.55} />
            </span>
            <div>
              <p><strong>下一组：名词解释默写</strong></p>
              <small>完成当前案例后开始</small>
            </div>
          </div>

          <Link className={styles.builderEntry} href="/learn/course-builder">
            <span className={styles.progressIcon}>
              <FileStack aria-hidden="true" size={25} strokeWidth={1.55} />
            </span>
            <span>
              <strong>材料建课</strong>
              <small>把来源编译成可审核课程草稿</small>
            </span>
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </Link>

          <button
            className={styles.planToggle}
            type="button"
            aria-expanded={planOpen}
            aria-controls="weekly-plan"
            onClick={() => setPlanOpen((current) => !current)}
          >
            <span>{planOpen ? "收起本周计划" : "查看本周计划"}</span>
            {planOpen ? (
              <ChevronUp aria-hidden="true" size={18} strokeWidth={1.5} />
            ) : (
              <ChevronDown aria-hidden="true" size={18} strokeWidth={1.5} />
            )}
          </button>
        </aside>
      </div>

      {planOpen ? (
        <aside className={styles.planDrawer} id="weekly-plan" aria-label="本周计划">
          <button className={styles.drawerClose} type="button" aria-label="收起本周计划" onClick={() => setPlanOpen(false)}>
            收起 <ChevronUp aria-hidden="true" size={17} strokeWidth={1.4} />
          </button>
          <div className={styles.metricGroup}>
            <div className={styles.metric}>
              <span>本周已完成</span>
              <p><b>{weeklySessionCount}</b><small>次</small></p>
            </div>
            <div className={styles.metric}>
              <span>错题</span>
              <p><b>{wrongQuestionData.totalWrong}</b><small>题</small></p>
            </div>
            <div className={styles.metric}>
              <span>待复习</span>
              <p><b>{pendingReviewCount}</b><small>项</small></p>
            </div>
          </div>

          {wrongQuestionData.weakKnowledgePoints.length > 0 ? (
            <div className={styles.weakKpSection}>
              <p className={styles.weakKpHeading}>弱项知识点 · 回流到本周学习</p>
              <div className={styles.weakKpList}>
                {wrongQuestionData.weakKnowledgePoints.slice(0, 3).map((kp) => {
                  const ratioPercent = Math.round(kp.wrongRatio * 100);
                  const href = kp.hasLesson
                    ? `/courses/${kp.courseSlug}/knowledge-points/${kp.knowledgePointSlug}`
                    : `/courses/${kp.courseSlug}/question-bank`;
                  return (
                    <Link key={`${kp.courseId}:${kp.knowledgePointId}`} href={href} className={styles.weakKpChip}>
                      <span className={styles.weakKpChipTitle}>{kp.knowledgePointTitle}</span>
                      <span className={styles.weakKpChipStat}>
                        {kp.wrongCount} 错 · {ratioPercent}%
                      </span>
                    </Link>
                  );
                })}
              </div>
              <Link href="/wrong-questions" className={styles.weakKpMore}>
                查看全部 {wrongQuestionData.weakKpCount} 个弱项 →
              </Link>
            </div>
          ) : null}

          <div className={styles.weekRhythm}>
            {weekDays.map((item) => (
              <div className={item.today ? styles.today : ""} key={item.date}>
                <strong>{item.day}</strong>
                <span>{item.date}</span>
                <i aria-hidden="true" />
                <small>{item.today ? "今天" : "\u00A0"}</small>
              </div>
            ))}
          </div>
        </aside>
      ) : null}
      <NurAgentDock surface="platform" />
    </main>
  );
}
