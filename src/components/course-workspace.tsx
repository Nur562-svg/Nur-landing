"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileText,
  Layers3,
  Plus,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Target,
  Trash2,
  X,
} from "lucide-react";
import {
  selectAvailableSourceCount,
  selectChapterWorkspaceView,
  selectExamPrioritySummary,
  selectExamSummaryRows,
  selectFirstIncompleteKnowledgePoint,
  selectCaseReasoningHref,
  selectKnowledgePointById,
  selectKnowledgePointHref,
  selectLearningRoutes,
  selectOrderedSources,
  selectPrimaryCaseForKnowledgePoint,
  selectSubjectiveWritingHref,
  selectSubjectiveWritingItems,
  selectVersionDimensionLabel,
  selectVisibleChapterViews,
  type ChapterWorkspaceView,
} from "@/lib/course-selectors";
import {
  calculateUserExamStructureTotal,
  createExamRowsFromBlueprint,
  createUserExamStructure,
  getUserExamStructureStorageKey,
  maxUserExamStructureRows,
  parseUserExamStructure,
  validateUserExamStructureRows,
} from "@/lib/user-exam-structure";
import type {
  CourseDefinition,
  CourseScope,
  LearnerCourseState,
  LearningRouteId,
  UserExamStructure,
  UserExamStructureRow,
} from "@/types/learning";
import { NurAgentDock } from "./nur-agent-dock";
import styles from "./course-workspace.module.css";

type CourseWorkspaceProps = {
  course: CourseDefinition;
  learnerState: LearnerCourseState;
};

type SessionTarget = {
  knowledgePointId: string | null;
  label: string;
};

const userExamStructureChangeEvent = "nur-learn:user-exam-structure-change";

function subscribeToUserExamStructure(onStoreChange: () => void): () => void {
  const handleStoreChange = () => onStoreChange();
  window.addEventListener("storage", handleStoreChange);
  window.addEventListener(userExamStructureChangeEvent, handleStoreChange);
  return () => {
    window.removeEventListener("storage", handleStoreChange);
    window.removeEventListener(userExamStructureChangeEvent, handleStoreChange);
  };
}

function StudySessionIcon({ routeId }: { routeId: LearningRouteId }) {
  if (routeId === "understand") {
    return <BookOpenText aria-hidden="true" size={21} />;
  }
  if (routeId === "express") {
    return <FileText aria-hidden="true" size={21} />;
  }
  return <Target aria-hidden="true" size={21} />;
}

export function CourseWorkspace({ course, learnerState }: CourseWorkspaceProps) {
  const currentKnowledgePoint = selectKnowledgePointById(
    course,
    learnerState.currentKnowledgePointId,
  );
  if (!currentKnowledgePoint) {
    throw new Error(`Missing current knowledge point: ${learnerState.currentKnowledgePointId}`);
  }

  const [scope, setScope] = useState<CourseScope>("stage");
  const [scopeOpen, setScopeOpen] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState(learnerState.currentChapterId);
  const [activeRouteId, setActiveRouteId] = useState<LearningRouteId>(learnerState.defaultRouteId);
  const [sessionTarget, setSessionTarget] = useState<SessionTarget>({
    knowledgePointId: currentKnowledgePoint.id,
    label: currentKnowledgePoint.title,
  });
  const [sessionOpen, setSessionOpen] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [examEditorOpen, setExamEditorOpen] = useState(false);
  const [examDraftRows, setExamDraftRows] = useState<UserExamStructureRow[]>(
    () => createExamRowsFromBlueprint(course.examBlueprint),
  );
  const [examDraftIssues, setExamDraftIssues] = useState<readonly string[]>([]);
  const examStorageKey = getUserExamStructureStorageKey(course.id);
  const storedExamStructureJson = useSyncExternalStore(
    subscribeToUserExamStructure,
    () => window.localStorage.getItem(examStorageKey),
    () => null,
  );
  const customExamStructure = useMemo<UserExamStructure | null>(() => {
    if (!storedExamStructureJson) {
      return null;
    }
    try {
      return parseUserExamStructure(JSON.parse(storedExamStructureJson), course.id);
    } catch {
      return null;
    }
  }, [course.id, storedExamStructureJson]);

  const visibleChapters = useMemo(
    () => selectVisibleChapterViews(course, learnerState, scope),
    [course, learnerState, scope],
  );
  const currentChapter = selectChapterWorkspaceView(
    course,
    learnerState,
    learnerState.currentChapterId,
  );
  const activeChapter = selectChapterWorkspaceView(course, learnerState, activeChapterId)
    ?? currentChapter;

  if (!activeChapter || !currentChapter) {
    throw new Error(`Missing active chapter: ${activeChapterId}`);
  }

  const learningRoutes = selectLearningRoutes(course);
  const activeRoute = learningRoutes.find((route) => route.id === activeRouteId)
    ?? learningRoutes[0];
  if (!activeRoute) {
    throw new Error(`Course has no learning routes: ${course.id}`);
  }

  const orderedSources = selectOrderedSources(course);
  const examSummaryRows = selectExamSummaryRows(course);
  const examPrioritySummary = selectExamPrioritySummary(course);
  const availableSourceCount = selectAvailableSourceCount(course);
  const activeKnowledgePoint = sessionTarget.knowledgePointId
    ? selectKnowledgePointById(course, sessionTarget.knowledgePointId)
    : undefined;
  const activeUnitLabel = activeKnowledgePoint?.title ?? sessionTarget.label;
  const activeKnowledgePointHref = activeKnowledgePoint?.lesson
    ? selectKnowledgePointHref(course, activeKnowledgePoint)
    : null;
  const activeWritingHref = activeKnowledgePoint
    && selectSubjectiveWritingItems(course, activeKnowledgePoint.id).length > 0
    ? selectSubjectiveWritingHref(course, activeKnowledgePoint)
    : null;
  const activeCaseHref = activeKnowledgePoint
    && selectPrimaryCaseForKnowledgePoint(course, activeKnowledgePoint.id)
    ? selectCaseReasoningHref(course, activeKnowledgePoint)
    : null;
  const activeTaskHref = activeRoute.id === "understand"
    ? activeKnowledgePointHref
    : activeRoute.id === "express"
      ? activeWritingHref
      : activeCaseHref;
  const activeTaskEntryLabel = activeRoute.id === "understand"
    ? "进入知识点学习"
    : activeRoute.id === "express"
      ? "进入写作训练室"
      : "进入案例推理室";
  const currentKnowledgePointHref = currentKnowledgePoint.lesson
    ? selectKnowledgePointHref(course, currentKnowledgePoint)
    : null;
  const currentWritingHref = selectSubjectiveWritingItems(
    course,
    currentKnowledgePoint.id,
  ).length > 0
    ? selectSubjectiveWritingHref(course, currentKnowledgePoint)
    : null;
  const currentCaseHref = selectPrimaryCaseForKnowledgePoint(
    course,
    currentKnowledgePoint.id,
  )
    ? selectCaseReasoningHref(course, currentKnowledgePoint)
    : null;
  const customExamTotal = customExamStructure
    ? calculateUserExamStructureTotal(customExamStructure.rows)
    : null;
  const activeExamTotal = customExamTotal ?? course.examBlueprint.totalPoints;
  const activeExamRows = customExamStructure
    ? customExamStructure.rows.map((row) => ({
        id: row.id,
        label: row.label,
        points: row.count * row.pointsEach,
      }))
    : examSummaryRows;
  const examDraftTotal = calculateUserExamStructureTotal(examDraftRows);

  function chooseScope(nextScope: CourseScope) {
    setScope(nextScope);
    const nextVisible = selectVisibleChapterViews(course, learnerState, nextScope);

    if (!nextVisible.some((chapter) => chapter.id === activeChapterId)) {
      const firstChapter = nextVisible[0];
      if (firstChapter) {
        const firstPoint = firstChapter.knowledgePoints[0];
        setActiveChapterId(firstChapter.id);
        setSessionTarget({
          knowledgePointId: firstPoint?.id ?? null,
          label: firstPoint?.title ?? "章节导学",
        });
      }
    }
  }

  function chooseChapter(chapter: ChapterWorkspaceView) {
    const firstIncomplete = selectFirstIncompleteKnowledgePoint(chapter);
    setActiveChapterId(chapter.id);
    setSessionTarget({
      knowledgePointId: firstIncomplete?.id ?? null,
      label: firstIncomplete?.title ?? "章节导学",
    });
    setSessionStarted(false);
  }

  function chooseKnowledgePoint(knowledgePointId: string) {
    const knowledgePoint = selectKnowledgePointById(course, knowledgePointId);
    if (!knowledgePoint) {
      return;
    }
    setSessionTarget({ knowledgePointId, label: knowledgePoint.title });
    setSessionStarted(false);
  }

  function chooseLearningRoute(routeId: LearningRouteId) {
    setActiveRouteId(routeId);
    setSessionStarted(false);
  }

  function prepareSession(target: SessionTarget) {
    setSessionTarget(target);
    setSessionStarted(false);
    setExamEditorOpen(false);
    setSessionOpen(true);
  }

  function prepareKnowledgePointSession(knowledgePointId: string) {
    const knowledgePoint = selectKnowledgePointById(course, knowledgePointId);
    if (!knowledgePoint) {
      return;
    }
    prepareSession({ knowledgePointId, label: knowledgePoint.title });
  }

  function openExamEditor() {
    const startingRows = customExamStructure?.rows
      ?? createExamRowsFromBlueprint(course.examBlueprint);
    setExamDraftRows(startingRows.map((row) => ({ ...row })));
    setExamDraftIssues([]);
    setSessionOpen(false);
    setExamEditorOpen(true);
  }

  function updateExamDraftRow(
    rowId: string,
    field: "label" | "count" | "pointsEach",
    value: string,
  ) {
    setExamDraftRows((rows) => rows.map((row) => {
      if (row.id !== rowId) {
        return row;
      }
      if (field === "label") {
        return { ...row, label: value };
      }
      return { ...row, [field]: Number(value) };
    }));
    setExamDraftIssues([]);
  }

  function addExamDraftRow() {
    if (examDraftRows.length >= maxUserExamStructureRows) {
      setExamDraftIssues([`最多设置 ${maxUserExamStructureRows} 个题型。`]);
      return;
    }
    setExamDraftRows((rows) => [
      ...rows,
      {
        id: `custom-${Date.now()}-${rows.length + 1}`,
        label: "自定义题型",
        count: 1,
        pointsEach: 1,
      },
    ]);
    setExamDraftIssues([]);
  }

  function removeExamDraftRow(rowId: string) {
    setExamDraftRows((rows) => rows.filter((row) => row.id !== rowId));
    setExamDraftIssues([]);
  }

  function applyExamDraft() {
    const issues = validateUserExamStructureRows(examDraftRows);
    if (issues.length > 0) {
      setExamDraftIssues(issues);
      return;
    }

    const structure = createUserExamStructure(
      course.id,
      "我的考试结构",
      examDraftRows,
    );
    try {
      window.localStorage.setItem(
        examStorageKey,
        JSON.stringify(structure),
      );
    } catch {
      setExamDraftIssues(["浏览器未能保存此方案，请检查本地存储权限后重试。"]);
      return;
    }
    window.dispatchEvent(new Event(userExamStructureChangeEvent));
    setExamDraftIssues([]);
    setExamEditorOpen(false);
  }

  function restoreDefaultExamStructure() {
    window.localStorage.removeItem(examStorageKey);
    window.dispatchEvent(new Event(userExamStructureChangeEvent));
    setExamDraftRows(createExamRowsFromBlueprint(course.examBlueprint));
    setExamDraftIssues([]);
    setExamEditorOpen(false);
  }

  return (
    <main className={styles.appShell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/learn" aria-label="返回 NUR LEARN 学习首页">
          NUR LEARN
        </Link>

        <nav className={styles.navigation} aria-label="主导航">
          <Link href="/learn">本周</Link>
          <Link className={styles.navActive} href={`/courses/${course.slug}`} aria-current="page">
            课程
          </Link>
        </nav>

        <div className={styles.accountArea}>
          <button
            className={styles.accountButton}
            type="button"
            aria-label={`打开${learnerState.profile.displayName}的学习账户`}
            aria-expanded={accountOpen}
            aria-controls="course-account-panel"
            onClick={() => setAccountOpen((current) => !current)}
          >
            <span className={styles.avatar} aria-hidden="true">{learnerState.profile.avatarLabel}</span>
            <span>{learnerState.profile.displayName}</span>
            <ChevronDown aria-hidden="true" size={16} strokeWidth={1.6} />
          </button>
          {accountOpen ? (
            <section className={styles.accountPanel} id="course-account-panel" aria-label="学习账户">
              <div>
                <span>学习身份</span>
                <strong>{learnerState.profile.displayName}</strong>
                <p>{learnerState.profile.major}</p>
              </div>
              <Link href="/learn">回到首页管理资料 <ArrowRight aria-hidden="true" size={18} /></Link>
            </section>
          ) : null}
        </div>
      </header>

      <div className={styles.workspace}>
        <div className={styles.ghostWordmark} aria-hidden="true">{course.ghostWordmark}</div>

        <div className={styles.breadcrumbs}>
          <Link href="/learn"><ArrowLeft aria-hidden="true" size={16} /> 本周学习</Link>
          <span>/</span>
          <span>课程工作台</span>
          <span>/</span>
          <strong>{course.title}</strong>
        </div>

        <section className={styles.courseHero} aria-labelledby="course-title">
          <div className={styles.courseIntro}>
            <p className={styles.eyebrow}>{course.catalogLabel}&nbsp; · &nbsp;{course.classification}</p>
            <h1 id="course-title">{course.title}</h1>
            <p className={styles.courseDescription}>{course.description}</p>
            <div className={styles.courseMeta}>
              <span>
                {selectVersionDimensionLabel(course.version.school)} · {selectVersionDimensionLabel(course.version.program)}
              </span>
              <span>
                {selectVersionDimensionLabel(course.version.learnerYear)} · {selectVersionDimensionLabel(course.version.academicYear)} · {selectVersionDimensionLabel(course.version.semester)}
              </span>
              <span>本阶段：{learnerState.currentStage.label}</span>
              <span>阶段测验：{learnerState.currentStage.assessmentLabel}</span>
            </div>
          </div>

          <div className={styles.courseProgress}>
            <div className={styles.progressHeading}>
              <span>课程进度</span>
              <strong>{learnerState.overallProgress}<small>%</small></strong>
            </div>
            <progress
              className={styles.progressTrack}
              aria-label={`课程进度 ${learnerState.overallProgress}%`}
              max={100}
              value={learnerState.overallProgress}
            />
            <p><b>{learnerState.learnedUnits}</b> / {learnerState.totalUnits} 个学习单元已完成</p>
            {currentKnowledgePointHref ? (
              <Link className={styles.continueLearning} href={currentKnowledgePointHref}>
                <span><small>直接进入学习</small>{currentChapter.title} · {currentKnowledgePoint.title}</span>
                <ArrowRight aria-hidden="true" size={25} strokeWidth={1.4} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => prepareKnowledgePointSession(learnerState.currentKnowledgePointId)}
              >
                <span><small>继续上次学习</small>{currentChapter.title} · {currentKnowledgePoint.title}</span>
                <ArrowRight aria-hidden="true" size={25} strokeWidth={1.4} />
              </button>
            )}
          </div>
        </section>

        {currentKnowledgePointHref ? (
          <section className={styles.guidedPath} id="learning-path" aria-labelledby="learning-path-title">
            <div className={styles.guidedPathIntro}>
              <span>本周唯一学习主线</span>
              <h2 id="learning-path-title">从知识点出发，依次完成输出与推理</h2>
              <p>不需要猜该点哪里：每一步都直接进入可完成的任务，45 分钟安排仍保留为可选计划。</p>
            </div>
            <div className={styles.guidedPathLinks}>
              <Link href={currentKnowledgePointHref}>
                <span>01 · 取证与对照</span>
                <strong>学习 {currentKnowledgePoint.title}</strong>
                <small>进入知识点 <ArrowRight aria-hidden="true" size={14} /></small>
              </Link>
              {currentWritingHref ? (
                <Link href={currentWritingHref}>
                  <span>02 · 主观题输出</span>
                  <strong>练名词解释与简答</strong>
                  <small>进入写作训练 <ArrowRight aria-hidden="true" size={14} /></small>
                </Link>
              ) : null}
              {currentCaseHref ? (
                <Link href={currentCaseHref}>
                  <span>03 · 案例推理</span>
                  <strong>补全四段推理链</strong>
                  <small>进入案例训练 <ArrowRight aria-hidden="true" size={14} /></small>
                </Link>
              ) : null}
            </div>
          </section>
        ) : null}

        <div className={styles.scopeBar}>
          <ScopeSwitcher
            scope={scope}
            onChoose={(next) => {
              chooseScope(next);
              setScopeOpen(false);
            }}
            open={scopeOpen}
            onToggle={() => setScopeOpen((current) => !current)}
            questionBankHref={`/courses/${course.slug}/question-bank`}
          />
          <p><span aria-hidden="true" /> {learnerState.demoLabel}；课程材料已接入，进度仍为演示数据</p>
        </div>

        <div className={styles.contentGrid}>
          <aside className={styles.chapterRail} aria-labelledby="chapter-title">
            <div className={styles.railHeading}>
              <h2 id="chapter-title">章节目录</h2>
              <span>{`${visibleChapters.length} 章`}</span>
            </div>
            <div className={styles.chapterList}>
              {visibleChapters.map((chapter) => (
                <button
                  className={chapter.id === activeChapter.id ? styles.chapterActive : ""}
                  type="button"
                  key={chapter.id}
                  onClick={() => chooseChapter(chapter)}
                  aria-current={chapter.id === activeChapter.id ? "true" : undefined}
                >
                  <span className={styles.chapterIndex}>{chapter.indexLabel}</span>
                  <span className={styles.chapterName}>
                    <strong>{chapter.title}</strong>
                    <small>{chapter.learnedUnits} / {chapter.totalUnits} 单元</small>
                  </span>
                  <span className={styles.chapterPercent}>{chapter.progress}%</span>
                </button>
              ))}
            </div>
          </aside>

          <section className={styles.chapterDetail} aria-labelledby="active-chapter-title">
            <div className={styles.detailHeading}>
              <div>
                <p>CHAPTER {activeChapter.indexLabel}</p>
                <h2 id="active-chapter-title">{activeChapter.title}</h2>
              </div>
              <div className={styles.chapterSummary}>
                <strong>{activeChapter.progress}%</strong>
                <span>{activeChapter.learnedUnits} / {activeChapter.totalUnits} 单元</span>
              </div>
            </div>
            <p className={styles.chapterFocus}>{activeChapter.focus}</p>

            <div className={styles.routeTabs} aria-label="章节学习路径">
                {learningRoutes.map((route) => (
                  <button
                    className={route.id === activeRoute.id ? styles.routeActive : ""}
                    type="button"
                    key={route.id}
                    onClick={() => chooseLearningRoute(route.id)}
                    aria-pressed={route.id === activeRoute.id}
                  >
                    <span>{route.indexLabel}</span>
                    <strong>{route.title}</strong>
                    <small>{route.detail}</small>
                  </button>
                ))}
              </div>

            <div className={styles.unitHeading}>
              <div>
                <h3>
                  {`${activeRoute.title}任务`}
                </h3>
                <small>✓ 表示已完成学习；朱砂底色表示当前选择</small>
              </div>
              <span>{activeRoute.guidance}</span>
            </div>

            <div className={styles.unitList}>
              {activeChapter.knowledgePoints.map((knowledgePoint) => (
                <button
                  className={knowledgePoint.id === sessionTarget.knowledgePointId ? styles.unitActive : ""}
                  type="button"
                  key={knowledgePoint.id}
                  onClick={() => chooseKnowledgePoint(knowledgePoint.id)}
                  aria-pressed={knowledgePoint.id === sessionTarget.knowledgePointId}
                >
                    <span className={styles.unitStatus} aria-hidden="true">
                      {knowledgePoint.completed ? <Check size={14} strokeWidth={2} /> : null}
                    </span>
                    <span className={styles.unitCopy}>
                      <strong>{knowledgePoint.title}</strong>
                      <small>{knowledgePoint.note}</small>
                    </span>
                    <span className={styles.unitMeta}>
                      {knowledgePoint.id === sessionTarget.knowledgePointId ? (
                        <span className={styles.currentSelection}>当前选择</span>
                      ) : null}
                      <span className={styles.frequency}>{knowledgePoint.emphasis}</span>
                    </span>
                    <ArrowRight aria-hidden="true" size={18} strokeWidth={1.4} />
                  </button>
                ))}
            </div>

            <div className={styles.selectedAction}>
              <div>
                <span>已选择</span>
                <strong>{activeChapter.title} · {activeUnitLabel}</strong>
                <small>
                  {activeTaskHref
                    ? `已有真实${activeRoute.title}内容，可直接开始`
                    : `该单元的${activeRoute.title}内容尚未建设`}
                </small>
              </div>
              {activeTaskHref ? (
                <button type="button" onClick={() => prepareSession(sessionTarget)}>
                  查看 45 分钟安排 <ArrowRight aria-hidden="true" size={22} strokeWidth={1.45} />
                </button>
              ) : (
                <Link
                  className={styles.fallbackLink}
                  href={`/courses/${course.slug}/question-bank`}
                >
                  该任务尚未建设，先去题库练习 <ArrowRight aria-hidden="true" size={18} strokeWidth={1.45} />
                </Link>
              )}
            </div>
          </section>

          <aside className={styles.insightRail} aria-label="课程信息">
            <section className={styles.sourceCard}>
              <div className={styles.cardHeading}>
                <Layers3 aria-hidden="true" size={19} strokeWidth={1.5} />
                <h2>材料接入状态</h2>
                <span>{availableSourceCount} / {orderedSources.length}</span>
              </div>
              <ul>
                {orderedSources.map((source) => (
                  <li key={source.id}>
                    <span>{source.displayLabel}</span>
                    <b>{source.status === "pending" ? source.missingLabel : source.citation.label}</b>
                  </li>
                ))}
              </ul>
              <p>四类核心材料均有接入；原 9 页教师最终重点、学生题库答案与教师采分标准仍待补齐。</p>
            </section>

            <section className={styles.examCard}>
              <div className={styles.cardHeading}>
                <Target aria-hidden="true" size={19} strokeWidth={1.5} />
                <h2>试卷结构</h2>
                <span>{activeExamTotal} 分</span>
              </div>
              <div className={styles.examConfigBar}>
                <span>{customExamStructure ? customExamStructure.label : "当前课程默认"}</span>
                <button type="button" onClick={openExamEditor}>
                  <SlidersHorizontal aria-hidden="true" size={14} />
                  {customExamStructure ? "编辑" : "自定义"}
                </button>
              </div>
              <div className={styles.examRows}>
                {activeExamRows.map((row) => (
                  <div key={row.id}>
                    <span>{row.label}</span>
                    <progress
                      aria-label={`${row.label} ${row.points} 分`}
                      max={activeExamTotal}
                      value={row.points}
                    />
                    <strong>{row.points}</strong>
                  </div>
                ))}
              </div>
              {customExamStructure ? (
                <p className={styles.examNotice}>
                  个人方案仅保存在此浏览器，不会改写课程默认结构或历史试卷。
                </p>
              ) : examPrioritySummary ? (
                <p className={styles.examNotice}>
                  {examPrioritySummary.lead} <b>{examPrioritySummary.points} 分</b>，{examPrioritySummary.guidance}
                </p>
              ) : null}
            </section>

            <section className={styles.sessionCard}>
              <div className={styles.cardHeading}>
                <Clock3 aria-hidden="true" size={19} strokeWidth={1.5} />
                <h2>本次建议</h2>
                <span>{learnerState.sessionDurationMinutes} 分钟</span>
              </div>
              <ol>
                {learnerState.sessionSteps.map((step) => (
                  <li key={step.id}>
                    <span>{step.minutes}′</span>
                    <div><strong>{step.title}</strong><small>{step.detail}</small></div>
                  </li>
                ))}
              </ol>
              {activeTaskHref ? (
                <Link className={styles.sessionStartLink} href={activeTaskHref}>
                  <Play aria-hidden="true" size={17} fill="currentColor" />
                  直接开始{activeRoute.title}任务
                  <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
                </Link>
              ) : (
                <Link
                  className={`${styles.sessionStartLink} ${styles.fallbackLink}`}
                  href={`/courses/${course.slug}/question-bank`}
                >
                  该任务尚未建设，先去题库练习
                  <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
                </Link>
              )}

              <Link
                className={`${styles.sessionStartLink} ${styles.examLink}`}
                href={`/courses/${course.slug}/mock-exam`}
              >
                <ClipboardCheck aria-hidden="true" size={17} strokeWidth={1.5} />
                按考试蓝图模考
                <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
              </Link>

              {currentWritingHref || currentCaseHref ? (
                <div className={styles.trainingShortcuts}>
                  <div>
                    <span>专项训练入口</span>
                    <small>{currentKnowledgePoint.title}</small>
                  </div>
                  {currentWritingHref ? (
                    <Link href={currentWritingHref}>
                      <FileText aria-hidden="true" size={17} strokeWidth={1.5} />
                      <span><strong>写作训练室</strong><small>名词解释与简答</small></span>
                      <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
                    </Link>
                  ) : null}
                  {currentCaseHref ? (
                    <Link href={currentCaseHref}>
                      <Target aria-hidden="true" size={17} strokeWidth={1.5} />
                      <span><strong>案例推理室</strong><small>四段推理与断点修复</small></span>
                      <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </section>
          </aside>
        </div>
      </div>

      {sessionOpen ? (
        <div className={styles.sessionBackdrop} role="presentation" onMouseDown={() => setSessionOpen(false)}>
          <aside
            className={styles.sessionDrawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="session-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className={styles.drawerClose} type="button" onClick={() => setSessionOpen(false)} aria-label="关闭学习安排">
              <X aria-hidden="true" size={19} />
            </button>
            <p className={styles.drawerEyebrow}>{learnerState.sessionDurationMinutes} MINUTE STUDY SESSION</p>
            <h2 id="session-title">{sessionStarted ? "学习队列已准备好" : "安排本次学习"}</h2>
            <p className={styles.drawerUnit}>{activeChapter.title} · {activeUnitLabel}</p>

            {sessionStarted ? (
              <div className={styles.readyState} aria-live="polite">
                <span><Check aria-hidden="true" size={24} /></span>
                <h3>从“{activeRoute.title}”开始</h3>
                <p>当前工作台已准备这次 {learnerState.sessionDurationMinutes} 分钟学习队列；可直接进入所选任务。</p>
                {activeTaskHref ? (
                  <Link className={styles.readyLink} href={activeTaskHref}>
                    {activeTaskEntryLabel} <ArrowRight aria-hidden="true" size={19} strokeWidth={1.4} />
                  </Link>
                ) : (
                  <p className={styles.readyUnavailable}>该单元的{activeRoute.title}内容尚未建设，选择已保留。</p>
                )}
              </div>
            ) : (
              <div className={styles.drawerPlan}>
                {learnerState.sessionSteps.map((step) => (
                  <article key={step.id}>
                    <StudySessionIcon routeId={step.routeId} />
                    <div><span>{step.minutes} 分钟</span><strong>{step.drawerTitle}</strong></div>
                  </article>
                ))}
              </div>
            )}

            <button className={styles.drawerAction} type="button" onClick={() => sessionStarted ? setSessionOpen(false) : setSessionStarted(true)}>
              <span>{sessionStarted ? "返回课程工作台" : "确认并开始"}</span>
              <ArrowRight aria-hidden="true" size={24} strokeWidth={1.4} />
            </button>
            <small className={styles.drawerNote}>教材与教师复习范围已接入；学习进度仍为本地演示数据。</small>
          </aside>
        </div>
      ) : null}

      {examEditorOpen ? (
        <div className={styles.sessionBackdrop} role="presentation" onMouseDown={() => setExamEditorOpen(false)}>
          <aside
            className={`${styles.sessionDrawer} ${styles.examDrawer}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exam-editor-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className={styles.drawerClose}
              type="button"
              onClick={() => setExamEditorOpen(false)}
              aria-label="关闭考试结构编辑"
            >
              <X aria-hidden="true" size={19} />
            </button>
            <p className={styles.drawerEyebrow}>PERSONAL EXAM BLUEPRINT</p>
            <h2 id="exam-editor-title">自定义我的考试结构</h2>
            <p className={styles.examDrawerLead}>
              按学校与任课教师的实际要求填写。此方案属于个人配置，不会覆盖课程事实、教师资料或历年试卷。
            </p>

            <div className={styles.examDraftHeading} aria-hidden="true">
              <span>题型</span><span>题数</span><span>每题</span><span>小计</span><span />
            </div>
            <div className={styles.examDraftRows}>
              {examDraftRows.map((row, index) => (
                <article key={row.id}>
                  <label>
                    <span>第 {index + 1} 个题型名称</span>
                    <input
                      type="text"
                      value={row.label}
                      maxLength={24}
                      onChange={(event) => updateExamDraftRow(row.id, "label", event.currentTarget.value)}
                    />
                  </label>
                  <label>
                    <span>{row.label || `第 ${index + 1} 个题型`}题数</span>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={row.count}
                      onChange={(event) => updateExamDraftRow(row.id, "count", event.currentTarget.value)}
                    />
                  </label>
                  <label>
                    <span>{row.label || `第 ${index + 1} 个题型`}每题分值</span>
                    <input
                      type="number"
                      min={0.5}
                      step={0.5}
                      value={row.pointsEach}
                      onChange={(event) => updateExamDraftRow(row.id, "pointsEach", event.currentTarget.value)}
                    />
                  </label>
                  <strong>{Math.round(row.count * row.pointsEach * 100) / 100}</strong>
                  <button
                    type="button"
                    onClick={() => removeExamDraftRow(row.id)}
                    aria-label={`删除${row.label || `第 ${index + 1} 个题型`}`}
                  >
                    <Trash2 aria-hidden="true" size={17} strokeWidth={1.5} />
                  </button>
                </article>
              ))}
            </div>

            <button
              className={styles.addExamRow}
              type="button"
              onClick={addExamDraftRow}
              disabled={examDraftRows.length >= maxUserExamStructureRows}
            >
              <Plus aria-hidden="true" size={17} /> 添加题型
            </button>

            {examDraftIssues.length > 0 ? (
              <ul className={styles.examDraftIssues} aria-live="polite">
                {examDraftIssues.map((issue) => <li key={issue}>{issue}</li>)}
              </ul>
            ) : null}

            <div className={styles.examDraftSummary}>
              <div>
                <span>方案总分</span>
                <strong>{examDraftTotal}<small> 分</small></strong>
              </div>
              <p>
                {examDraftTotal === course.examBlueprint.totalPoints
                  ? `与当前课程默认总分一致（${course.examBlueprint.totalPoints} 分）。`
                  : `与当前课程默认 ${course.examBlueprint.totalPoints} 分不同；仍可按学校实际方案保存。`}
              </p>
            </div>

            <div className={styles.examDrawerActions}>
              {customExamStructure ? (
                <button type="button" onClick={restoreDefaultExamStructure}>
                  <RotateCcw aria-hidden="true" size={17} /> 恢复课程默认
                </button>
              ) : <span />}
              <button type="button" onClick={applyExamDraft}>
                保存为我的方案 <ArrowRight aria-hidden="true" size={21} strokeWidth={1.4} />
              </button>
            </div>
            <small className={styles.drawerNote}>
              当前默认范围：{course.examBlueprint.scope.school} · {course.examBlueprint.scope.program} · {course.examBlueprint.scope.learnerYear} · {course.examBlueprint.scope.academicYear}{course.examBlueprint.scope.semester}；B1、B2 具体语义待任课教师确认。
            </small>
          </aside>
        </div>
      ) : null}
      <NurAgentDock surface="platform" />
    </main>
  );
}

const SCOPE_LABELS: Record<CourseScope, string> = {
  stage: "本阶段",
  all: "全学期",
  weak: "薄弱优先",
  questions: "题库",
};

type ScopeSwitcherProps = {
  scope: CourseScope;
  open: boolean;
  onChoose: (scope: CourseScope) => void;
  onToggle: () => void;
  questionBankHref: string;
};

/**
 * "查看范围"交互触发器。
 * 默认仅显示标签 + 当前选中范围；点击触发器迅速展开/收起 4 个选择项。
 * - 视觉锚点：标签内联显示当前 scope，提供稳定上下文。
 * - 选中后自动收起：避免长期占用视野，强化"快速切换"心智。
 * - 点击外部 / Esc：自动收起，符合常见 dropdown 习惯。
 */
function ScopeSwitcher({
  scope,
  open,
  onChoose,
  onToggle,
  questionBankHref,
}: ScopeSwitcherProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointer(event: MouseEvent) {
      const node = containerRef.current;
      if (!node) return;
      if (!node.contains(event.target as Node)) onToggle();
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onToggle();
    }
    window.addEventListener("mousedown", handlePointer);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("mousedown", handlePointer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onToggle]);

  const choices: Array<{ value: CourseScope; href?: string }> = [
    { value: "stage" },
    { value: "all" },
    { value: "weak" },
    { value: "questions", href: questionBankHref },
  ];

  return (
    <div
      ref={containerRef}
      className={`${styles.scopeSwitcher} ${open ? styles.scopeSwitcherOpen : ""}`}
    >
      <button
        type="button"
        className={styles.scopeTrigger}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="scope-options"
        onClick={onToggle}
      >
        <span className={styles.scopeTriggerLabel}>查看范围</span>
        <strong className={styles.scopeTriggerValue}>{SCOPE_LABELS[scope]}</strong>
        <ChevronRight
          aria-hidden="true"
          size={14}
          strokeWidth={1.6}
          className={styles.scopeTriggerChevron}
        />
      </button>

      <div
        id="scope-options"
        role="menu"
        aria-hidden={!open}
        className={styles.scopeOptions}
      >
        {choices.map((choice) => {
          const isActive = scope === choice.value;
          const className = `${styles.scopeOption} ${isActive ? styles.scopeActive : ""}`;
          if (choice.href) {
            return (
              <Link
                key={choice.value}
                href={choice.href}
                role="menuitem"
                className={className}
                onClick={() => onChoose(choice.value)}
              >
                {SCOPE_LABELS[choice.value]}
              </Link>
            );
          }
          return (
            <button
              key={choice.value}
              type="button"
              role="menuitem"
              className={className}
              onClick={() => onChoose(choice.value)}
            >
              {SCOPE_LABELS[choice.value]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
