"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flag,
  FileText,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import type {
  MockExamAnswer,
  MockExamPaper,
  MockExamReport,
  MockExamSession,
} from "@/types/mock-exam";
import type { CourseDefinition } from "@/types/learning";
import {
  abandonMockExamSession,
  buildMockExamReport,
  completeMockExamSession,
  createInitialAnswers,
  createMockExamPaper,
  recordMockExamAnswer,
} from "@/lib/mock-exam";
import {
  getActiveMockExamPaperSnapshot,
  getMockExamSessionsSnapshot,
  parseMockExamSessionsSnapshot,
  saveActiveMockExamPaper,
  saveMockExamSession,
  subscribeToActiveMockExamPaper,
  subscribeToMockExamSessions,
} from "@/lib/mock-exam-store";
import { selectKnowledgePointById } from "@/lib/course-selectors";
import styles from "./mock-exam-room.module.css";
import { SyncStatusBadge } from "./sync-status-badge";

const CHOICE_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

type MockExamStage = "ready" | "running" | "report";

type MockExamRoomProps = {
  course: CourseDefinition;
};

export function MockExamRoom({ course }: MockExamRoomProps) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [stage, setStage] = useState<MockExamStage>("ready");
  const [paper, setPaper] = useState<MockExamPaper | null>(null);
  const [answers, setAnswers] = useState<MockExamAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [report, setReport] = useState<MockExamReport | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  // 历史模考 <SyncStatusBadge />通过 useSyncExternalStore 订阅 localStorage：SSR 快照为 null，
  // 避免 hydration mismatch；保存后通过自定义事件刷新。
  const storedSessionsJson = useSyncExternalStore(
    subscribeToMockExamSessions,
    () => getMockExamSessionsSnapshot(),
    () => null,
  );
  const history = useMemo<MockExamSession[]>(() => {
    if (!storedSessionsJson) {
      return [];
    }
    return parseMockExamSessionsSnapshot(storedSessionsJson, course.id);
  }, [storedSessionsJson, course.id]);

  // 进行中的卷子同样通过 useSyncExternalStore 订阅（SSR 快照为 null）：
  // 只在准备页显式“继续”时恢复，避免 SSR/CSR 结构不一致。
  const activePaperJson = useSyncExternalStore(
    subscribeToActiveMockExamPaper,
    () => getActiveMockExamPaperSnapshot(),
    () => null,
  );
  const hasActivePaper = useMemo(() => {
    if (!activePaperJson || stage !== "ready") {
      return false;
    }
    try {
      const parsed = JSON.parse(activePaperJson) as { courseId?: unknown };
      return parsed.courseId === course.id;
    } catch {
      return false;
    }
  }, [activePaperJson, course.id, stage]);

  const answerById = useMemo(
    () => new Map(answers.map((answer) => [answer.itemId, answer])),
    [answers],
  );

  useEffect(() => {
    if (stage !== "running" || !paper) {
      return;
    }
    timerRef.current = setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stage, paper, setElapsedSeconds]);

  const remainingSeconds = paper ? paper.durationMinutes * 60 - elapsedSeconds : 0;
  const remainingMinutes = Math.max(0, Math.floor(remainingSeconds / 60));
  const remainingSecondsPart = Math.max(0, remainingSeconds % 60);

  function startExam() {
    const nextPaper = createMockExamPaper(course);
    setPaper(nextPaper);
    setAnswers(createInitialAnswers(nextPaper.items));
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setConfirmSubmit(false);
    setReport(null);
    saveActiveMockExamPaper(nextPaper);
    setStage("running");
  }

  function chooseAnswer(selectedIndex: number | null, text: string) {
    if (!paper) {
      return;
    }
    const item = paper.items[currentIndex];
    const next = recordMockExamAnswer(answers, item, { selectedIndex, text });
    setAnswers(next);
  }

  function finishExam(abandoned: boolean) {
    if (!paper) {
      return;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    saveActiveMockExamPaper(null);
    const baseSession: MockExamSession = {
      version: 1,
      sessionId: paper.sessionId,
      courseId: paper.courseId,
      courseTitle: paper.courseTitle,
      blueprintId: paper.blueprintId,
      startedAt: paper.createdAt,
      completedAt: null,
      durationMinutes: paper.durationMinutes,
      answers: [],
      objectiveEarnedPoints: 0,
      objectiveTotalPoints: 0,
      pendingReviewItemIds: [],
      abandoned,
    };
    const session = abandoned
      ? abandonMockExamSession(baseSession, paper, answers)
      : completeMockExamSession(baseSession, paper, answers);
    saveMockExamSession(session);
    setReport(buildMockExamReport(paper, session));
    setStage("report");
  }

  function resetExam() {
    setPaper(null);
    setAnswers([]);
    setCurrentIndex(0);
    setReport(null);
    setElapsedSeconds(0);
    setConfirmSubmit(false);
    setStage("ready");
  }

  // 继续进行中的模考 <SyncStatusBadge />：以确定性组卷重建题目，作答从空白开始（作答不持久化），
  // sessionId 与倒计时沿用原卷，避免重复会话。
  function resumeExam() {
    if (!activePaperJson) {
      return;
    }
    try {
      const active = JSON.parse(activePaperJson) as MockExamPaper;
      if (active.courseId !== course.id) {
        return;
      }
      const resumed = createMockExamPaper(course);
      setPaper({ ...active, items: resumed.items, rows: resumed.rows, createdAt: active.createdAt });
      setAnswers(createInitialAnswers(resumed.items));
      setCurrentIndex(0);
      setReport(null);
      setElapsedSeconds(Math.min(
        Math.floor((Date.now() - Date.parse(active.createdAt)) / 1000),
        active.durationMinutes * 60,
      ));
      setConfirmSubmit(false);
      setStage("running");
    } catch {
      // 快照损坏时按新模考 <SyncStatusBadge />处理
      startExam();
    }
  }

  // 放弃进行中的模考 <SyncStatusBadge />并开始新卷：清除 active 快照，重新组卷。
  function discardActiveAndStart() {
    saveActiveMockExamPaper(null);
    startExam();
  }

  if (stage === "report" && report && paper) {
    return (
      <ReportView
        course={course}
        paper={paper}
        report={report}
        onRestart={resetExam}
      />
    );
  }

  if (stage === "running" && paper) {
    const item = paper.items[currentIndex];
    const answer = item ? answerById.get(item.itemId) : undefined;
    const answeredCount = answers.filter(
      (a) => a.status === "auto-graded" || a.status === "pending-review",
    ).length;

    return (
      <main className={styles.container}>
        <header className={styles.header}>
          <Link className={styles.backLink} href={`/courses/${course.slug}`}>
            <ArrowLeft size={16} /> 返回课程工作台
          </Link>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>{course.title} · 模考</h1>
              <p className={styles.subtitle}>{paper.blueprintTitle} <SyncStatusBadge /></p>
            </div>
            <div className={styles.timer}>
              <Clock3 size={16} aria-hidden="true" />
              <strong>
                {remainingMinutes}:{String(remainingSecondsPart).padStart(2, "0")}
              </strong>
              <span>剩余</span>
            </div>
          </div>
          <div className={styles.progressBar}>
            <progress max={paper.items.length} value={answeredCount} />
            <span>
              {answeredCount} / {paper.items.length} 已作答
            </span>
          </div>
        </header>

        {paper.shortfalls.length > 0 ? (
          <aside className={styles.shortfallNotice}>
            <Flag size={15} aria-hidden="true" />
            <span>{paper.notice}</span>
          </aside>
        ) : null}

        <div className={styles.workspace}>
          <div className={styles.questionArea}>
            {item ? (
              <>
                <div className={styles.questionMeta}>
                  <span className={styles.kindTag}>{item.questionKind}</span>
                  {item.groupId ? (
                    <span className={styles.groupTag}>
                      {item.sharedChoices ? "共用备选答案配伍" : "共用题干题组"}
                    </span>
                  ) : null}
                  <span className={styles.pointsTag}>{item.points} 分</span>
                  <span className={styles.questionCounter}>
                    第 {currentIndex + 1} / {paper.items.length} 题
                  </span>
                </div>
                {item.groupPrompt ? (
                  <div className={styles.sharedStem}>
                    <strong>共享题干</strong>
                    <p>{item.groupPrompt}</p>
                  </div>
                ) : null}
                <h2 className={styles.prompt}>{item.prompt}</h2>
                {(() => {
                  const kp = selectKnowledgePointById(course, item.knowledgePointId);
                  return kp ? (
                    <p className={styles.knowledgePoint}>所属知识点：{kp.title}</p>
                  ) : null;
                })()}

                {item.automaticallyScored ? (
                  <div className={styles.choices}>
                    {item.sharedChoices ? (
                      <p className={styles.sharedChoicesHint}>
                        共用备选答案：每小问选择一个最合适的选项，同一选项可被重复选择。
                      </p>
                    ) : null}
                    {item.choices.map((choice, index) => {
                      const selected = answer?.selectedIndex === index;
                      const submitted = answer?.status === "auto-graded";
                      const correct = answer?.isCorrect === true;
                      const wrong = answer?.isCorrect === false;
                      return (
                        <button
                          key={index}
                          type="button"
                          className={[
                            styles.choice,
                            selected ? styles.choiceSelected : "",
                            submitted && correct ? styles.choiceCorrect : "",
                            submitted && wrong && selected ? styles.choiceWrong : "",
                          ].join(" ")}
                          onClick={() => chooseAnswer(index, "")}
                          disabled={submitted}
                        >
                          <span className={styles.choiceLabel}>{CHOICE_LABELS[index]}</span>
                          <span>{choice}</span>
                          {submitted && correct ? <Check size={16} aria-hidden="true" /> : null}
                          {submitted && wrong && selected ? <X size={16} aria-hidden="true" /> : null}
                        </button>
                      );
                    })}
                    {answer?.status === "auto-graded" ? (
                      <p className={answer.isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}>
                        {answer.isCorrect ? "判定正确" : `判定错误 · 正确答案 ${CHOICE_LABELS[item.correctChoiceIndex ?? 0]}`}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div className={styles.subjectiveArea}>
                    <label className={styles.textareaLabel} htmlFor="mock-exam-answer">
                      {answer?.status === "pending-review" ? "已作答（待核对）" : "请输入作答（提交后进入待核对清单，不做自动判分）"}
                    </label>
                    <textarea
                      id="mock-exam-answer"
                      className={styles.answerTextarea}
                      value={answer?.text ?? ""}
                      onChange={(event) => chooseAnswer(null, event.currentTarget.value)}
                      placeholder="按 NUR 作答结构组织：定义 → 推理 → 边界。"
                      rows={8}
                    />
                    {answer?.status === "pending-review" ? (
                      <p className={styles.feedbackPending}>
                        已进入待核对清单；主观题不会伪装成自动评分。
                      </p>
                    ) : null}
                  </div>
                )}
              </>
            ) : null}
          </div>

          <aside className={styles.navigator}>
            <div className={styles.navigatorHeading}>
              <span>题号导航</span>
              <small>{answeredCount} 已答</small>
            </div>
            <div className={styles.numberGrid}>
              {paper.items.map((paperItem, index) => {
                const itemAnswer = answerById.get(paperItem.itemId);
                const done = itemAnswer?.status === "auto-graded"
                  || itemAnswer?.status === "pending-review";
                const correct = itemAnswer?.isCorrect === true;
                const wrong = itemAnswer?.isCorrect === false;
                return (
                  <button
                    key={paperItem.itemId}
                    type="button"
                    className={[
                      styles.numberButton,
                      index === currentIndex ? styles.numberCurrent : "",
                      done ? styles.numberDone : "",
                      correct ? styles.numberCorrect : "",
                      wrong ? styles.numberWrong : "",
                    ].join(" ")}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`第 ${index + 1} 题${done ? "（已作答）" : ""}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <div className={styles.navigatorFooter}>
              <button
                type="button"
                className={styles.prevButton}
                onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={15} aria-hidden="true" /> 上一题
              </button>
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => setCurrentIndex((index) => Math.min(paper.items.length - 1, index + 1))}
                disabled={currentIndex >= paper.items.length - 1}
              >
                下一题 <ChevronRight size={15} aria-hidden="true" />
              </button>
            </div>
          </aside>
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.abandonButton} onClick={() => setConfirmSubmit(true)}>
            <Flag size={15} aria-hidden="true" /> 交卷
          </button>
          <span className={styles.footerHint}>
            客观题即时判定；主观题计入待核对清单
          </span>
        </footer>

        {confirmSubmit ? (
          <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setConfirmSubmit(false)}>
            <section
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="submit-dialog-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <h3 id="submit-dialog-title">确认交卷？</h3>
              <p>
                已作答 {answeredCount} / {paper.items.length} 题。客观题立即判定；未作答题目不计分。
              </p>
              <div className={styles.modalActions}>
                <button type="button" className={styles.modalSecondary} onClick={() => setConfirmSubmit(false)}>
                  继续答题
                </button>
                <button type="button" className={styles.modalPrimary} onClick={() => finishExam(false)}>
                  <Send size={15} aria-hidden="true" /> 确认交卷
                </button>
                <button
                  type="button"
                  className={styles.modalDanger}
                  onClick={() => finishExam(true)}
                  title="提前结束并保存当前结果"
                >
                  放弃并保存
                </button>
              </div>
            </section>
          </div>
        ) : null}
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.backLink} href={`/courses/${course.slug}`}>
          <ArrowLeft size={16} /> 返回课程工作台
        </Link>
        <h1 className={styles.title}>{course.title} · 模考 <SyncStatusBadge /></h1>
        <p className={styles.subtitle}>
          按课程已核实考试蓝图组卷；题库不足的部分如实说明，不伪造题目。
        </p>
      </header>

      <section className={styles.blueprintCard}>
        <div className={styles.blueprintHeading}>
          <div>
            <h2>{course.examBlueprint.title}</h2>
            <p>
              {course.examBlueprint.scope.school} · {course.examBlueprint.scope.program} ·{" "}
              {course.examBlueprint.scope.learnerYear} · {course.examBlueprint.scope.academicYear} ·{" "}
              {course.examBlueprint.scope.semester}
            </p>
          </div>
          <strong>{course.examBlueprint.totalPoints} 分</strong>
        </div>
        <div className={styles.blueprintRows}>
          {course.examBlueprint.rows.map((row) => (
            <div className={styles.blueprintRow} key={row.id}>
              <span className={styles.rowLabel}>{row.label}</span>
              <span className={styles.rowCount}>{row.count} 题</span>
              <span className={styles.rowPoints}>{row.pointsEach} 分/题 · 共 {row.totalPoints} 分</span>
            </div>
          ))}
        </div>
        {course.examBlueprint.priorityNotice ? (
          <p className={styles.priorityNotice}>
            <strong>{course.examBlueprint.priorityNotice.lead}</strong>{" "}
            {course.examBlueprint.priorityNotice.questionKinds.join("、")}；{course.examBlueprint.priorityNotice.guidance}
          </p>
        ) : null}
      </section>

      <section className={styles.honestyCard}>
        <h3>模考 <SyncStatusBadge />边界说明</h3>
        <ul>
          <li>客观题按题库指定答案自动判定；答案来源不冒充学校或教师。</li>
          <li>主观题（名词解释、简答、案例、填空）进入待核对清单，不自动判分。</li>
          <li>题库不足的题型如实显示缺口，本次不会补造题目。</li>
          <li>作答记录仅保存在此浏览器，用于能力报告与复习建议。</li>
        </ul>
      </section>

      {hasActivePaper ? (
        <section className={styles.resumeCard} aria-label="未完成模考 <SyncStatusBadge />">
          <div>
            <strong>检测到未完成的模考 <SyncStatusBadge /></strong>
            <p>倒计时与已用时长会按原卷恢复；已作答内容不持久化，继续后从第一题重新作答。</p>
          </div>
          <div className={styles.resumeActions}>
            <button type="button" className={styles.resumeButton} onClick={resumeExam}>
              继续模考 <SyncStatusBadge /> <ArrowRight size={15} aria-hidden="true" />
            </button>
            <button type="button" className={styles.discardButton} onClick={discardActiveAndStart}>
              放弃并重新开始
            </button>
          </div>
        </section>
      ) : null}

      <div className={styles.startRow}>
        <button type="button" className={styles.startButton} onClick={startExam}>
          开始模考 <SyncStatusBadge /> <ArrowRight size={17} aria-hidden="true" />
        </button>
        <span className={styles.startHint}>建议时长 {120} 分钟</span>
      </div>

      {history.length > 0 ? (
        <section className={styles.historySection}>
          <div className={styles.historyHeading}>
            <h3>历史模考 <SyncStatusBadge /></h3>
            <small>本浏览器保存</small>
          </div>
          <ul className={styles.historyList}>
            {[...history].reverse().map((session) => (
              <li key={session.sessionId}>
                <div>
                  <strong>{session.abandoned ? "提前结束" : "已完成"}</strong>
                  <span>
                    {new Date(session.completedAt ?? session.startedAt).toLocaleString("zh-CN")}
                  </span>
                </div>
                <span>
                  客观题 {session.objectiveEarnedPoints} / {session.objectiveTotalPoints} 分
                  {session.pendingReviewItemIds.length > 0
                    ? ` · ${session.pendingReviewItemIds.length} 题待核对`
                    : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

function ReportView({
  course,
  paper,
  report,
  onRestart,
}: {
  course: CourseDefinition;
  paper: MockExamPaper;
  report: MockExamReport;
  onRestart: () => void;
}) {
  const percent = Math.round(report.objectiveScore.ratio * 100);
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.backLink} href={`/courses/${course.slug}`}>
          <ArrowLeft size={16} /> 返回课程工作台
        </Link>
        <h1 className={styles.title}>{course.title} · 能力报告</h1>
        <p className={styles.subtitle}>{report.blueprintTitle} · 完成于 {new Date(report.completedAt).toLocaleString("zh-CN")}</p>
      </header>

      <section className={styles.scoreCard}>
        <div className={styles.scoreMain}>
          <span className={styles.scoreLabel}>客观题得分</span>
          <strong className={styles.scoreValue}>
            {report.objectiveScore.earned}
            <small> / {report.objectiveScore.total} 分</small>
          </strong>
          <span className={styles.scorePercent}>{percent}%</span>
        </div>
        <progress className={styles.scoreProgress} max={report.objectiveScore.total} value={report.objectiveScore.earned} />
        <p className={styles.scoreHint}>
          只统计可自动判定的客观题；主观题得分以教师/来源核对为准。
        </p>
      </section>

      {paper.shortfalls.length > 0 ? (
        <aside className={styles.shortfallNotice}>
          <Flag size={15} aria-hidden="true" />
          <span>
            题库不足：{paper.shortfalls.map((s) => `${s.label}缺 ${s.required - s.available} 题`).join("；")}。
            本次报告只覆盖现有题目。
          </span>
        </aside>
      ) : null}

      <section className={styles.breakdownSection}>
        <div className={styles.sectionHeading}>
          <h2>题型明细</h2>
          <small>已答 / 自动判定 / 答对</small>
        </div>
        <table className={styles.breakdownTable}>
          <thead>
            <tr>
              <th>题型</th>
              <th>组卷</th>
              <th>已答</th>
              <th>自动判定</th>
              <th>答对</th>
              <th>得分</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {report.rows.map((row) => (
              <tr key={row.rowId}>
                <td>{row.label}</td>
                <td>{row.includedCount} / {row.requiredCount}</td>
                <td>{row.answeredCount}</td>
                <td>{row.autoGradedCount}</td>
                <td>{row.autoCorrectCount}</td>
                <td>{row.earnedPoints} / {row.maxPoints}</td>
                <td>
                  <span
                    className={[
                      styles.rowStatus,
                      row.status === "empty" ? styles.rowStatusEmpty : "",
                      row.status === "partial" ? styles.rowStatusPartial : "",
                      row.status === "complete" ? styles.rowStatusComplete : "",
                      row.status === "skipped" ? styles.rowStatusSkipped : "",
                    ].join(" ")}
                  >
                    {row.status === "complete" ? "完整" : row.status === "partial" ? "部分" : row.status === "empty" ? "缺题" : "未作答"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {report.pendingReview.length > 0 ? (
        <section className={styles.pendingSection}>
          <div className={styles.sectionHeading}>
            <h2>主观题待核对</h2>
            <small>{report.pendingReview.length} 题已作答，等待来源核对</small>
          </div>
          <ul className={styles.pendingList}>
            {report.pendingReview.map((pending) => (
              <li key={pending.itemId}>
                <FileText size={15} aria-hidden="true" />
                <div>
                  <strong>{pending.label} · {pending.points} 分</strong>
                  <p>{pending.prompt}</p>
                </div>
                <span className={styles.pendingBadge}>待核对</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className={styles.reportNotice}>{report.notice}</p>

      <div className={styles.reportActions}>
        <button type="button" className={styles.startButton} onClick={onRestart}>
          <RotateCcw size={16} aria-hidden="true" /> 再来一次
        </button>
        <Link className={styles.reportLink} href={`/courses/${course.slug}/question-bank`}>
          去题库补练 <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
