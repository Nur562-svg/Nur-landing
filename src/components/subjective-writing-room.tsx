"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  FileCheck2,
  FileText,
  Lightbulb,
  PenLine,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useLearningMemory } from "@/hooks/use-learning-memory";
import { recordConfirmedAttempt } from "@/lib/learning-memory";
import {
  selectCaseReasoningHref,
  selectPrimaryCaseForKnowledgePoint,
  selectSubjectiveWritingHref,
} from "@/lib/course-selectors";
import type {
  AssessmentAnswerConfidence,
  AssessmentAnswerAuthority,
  AssessmentItemDefinition,
  ChapterDefinition,
  CourseDefinition,
  LearnerCourseState,
  KnowledgePointDefinition,
  ScoringPerspective,
  SourceAuthority,
  SourceReference,
} from "@/types/learning";
import {
  CurrentAnswerAssistance,
  LearningMemoryPanel,
} from "./learning-memory-panel";
import { NurAgentDock } from "./nur-agent-dock";
import styles from "./subjective-writing-room.module.css";

type SubjectiveWritingRoomProps = {
  course: CourseDefinition;
  chapter: ChapterDefinition;
  knowledgePoint: KnowledgePointDefinition;
  learnerState: LearnerCourseState;
  writingItems: readonly AssessmentItemDefinition[];
  sourceCandidates: readonly AssessmentItemDefinition[];
  referenceSources: readonly SourceReference[];
};

const questionKindLabels = {
  term: "名词解释",
  "short-answer": "简答题",
} as const;

const perspectiveLabels: Readonly<Record<ScoringPerspective, string>> = {
  tcm: "中医",
  "modern-medicine": "现代医学",
  boundary: "关系边界",
};

const sourceAuthorityLabels: Readonly<Record<SourceAuthority, string>> = {
  publisher: "出版教材",
  school: "学校材料",
  teacher: "任课教师",
  student: "学生整理",
  "nur-editorial": "NUR 平台",
  "clinical-authority": "公开临床权威",
};

const confidenceLabels: Readonly<Record<AssessmentAnswerConfidence, string>> = {
  missing: "未提供",
  unverified: "待核验",
  "source-cross-checked": "来源交叉核对",
  verified: "已核验",
};

const answerAuthorityLabels: Readonly<Record<AssessmentAnswerAuthority, string>> = {
  "nur-platform": "NUR 结构参考",
  "course-teacher": "任课教师答案",
  "published-answer": "来源所附参考答案",
  "student-compiled": "学生整理参考",
};

function toggleValue(values: readonly string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}


// Smart merge for Path B (per user rule):
// - Normal case: keep user complete sentences + insert proposal as supplement.
// - Full replace when unrelated: discard original completely.
// This is client heuristic; real intelligence lives in the Agent model + future improvements.
function computeSmartMerge(current: string, proposalText: string, criterionId: string) {
  const cur = (current || "").trim();
  if (!cur || cur.length < 25) {
    return { 
      merged: proposalText, 
      kept: "", 
      added: proposalText, 
      before: "", 
      supplement: proposalText, 
      after: "", 
      isFullReplace: true,
      criterionId 
    };
  }

  // Relevance using Chinese-friendly tokens
  const curLower = cur.toLowerCase();
  const propLower = (proposalText || "").toLowerCase();
  const userTokens = curLower.split(/[^\u4e00-\u9fa5a-z0-9]+/).filter(w => w.length > 1);
  let overlap = 0;
  for (const t of userTokens) {
    if (propLower.includes(t)) overlap += 1;
  }
  const relevance = overlap / Math.max(userTokens.length, 3);

  if (relevance < 0.06) {
    // Unrelated -> full replace (original must be discarded)
    return { 
      merged: proposalText, 
      kept: "", 
      added: proposalText, 
      before: "", 
      supplement: proposalText, 
      after: "", 
      isFullReplace: true,
      criterionId 
    };
  }

  // Smart insertion: split into sentences (Chinese . ! ? and newlines)
  const sentenceRegex = /([^。！？.!?\n]+[。！？.!?\n]*)/g;
  const sentences: string[] = [];
  let match;
  while ((match = sentenceRegex.exec(cur)) !== null) {
    const s = match[1].trim();
    if (s.length > 3) sentences.push(s);
  }
  if (sentences.length === 0) {
    const added = "\n\n【Agent 补充建议】\n" + proposalText.trim();
    return { merged: cur + added, kept: cur, added, before: cur, supplement: added, after: "", criterionId };
  }

  // Score each sentence for relevance to proposal
  let bestIdx = 0;
  let bestScore = -1;
  sentences.forEach((s, i) => {
    const sLower = s.toLowerCase();
    let score = 0;
    userTokens.forEach(t => {
      if (sLower.includes(t) && propLower.includes(t)) score += t.length;
    });
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  });

  // Insert supplement right after the most relevant sentence user wrote (as targeted supplement)
  const beforeArr = sentences.slice(0, bestIdx + 1);
  const afterArr = sentences.slice(bestIdx + 1);
  const before = beforeArr.join("");
  const after = afterArr.join("");
  const supplement = "\n【Agent 补充（针对上面这段）】\n" + proposalText.trim();

  const merged = before + supplement + after;
  return { merged, kept: cur, added: supplement, before, supplement, after, criterionId };
}

export function SubjectiveWritingRoom({
  course,
  chapter,
  knowledgePoint,
  learnerState,
  writingItems,
  sourceCandidates,
  referenceSources,
}: SubjectiveWritingRoomProps) {
  const firstItem = writingItems[0];
  if (!firstItem) {
    throw new Error(`Knowledge point has no subjective-writing items: ${knowledgePoint.id}`);
  }

  const [activeItemId, setActiveItemId] = useState(firstItem.id);
  const [drafts, setDrafts] = useState<Readonly<Record<string, string>>>({});
  const [revisions, setRevisions] = useState<Readonly<Record<string, string>>>({});
  const draftTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedCriteria, setSelectedCriteria] = useState<Readonly<Record<string, readonly string[]>>>({});
  const [revealedAnswerIds, setRevealedAnswerIds] = useState<readonly string[]>([]);
  const [confirmedItemIds, setConfirmedItemIds] = useState<readonly string[]>([]);
  const [confirmedSignatures, setConfirmedSignatures] = useState<Readonly<Record<string, string>>>({});
  const [accountOpen, setAccountOpen] = useState(false);
  const [pendingMerge, setPendingMerge] = useState<null | {
    merged: string;
    kept: string;
    added: string;
    before?: string;
    supplement?: string;
    after?: string;
    isFullReplace?: boolean;
    criterionId: string;
  }>(null);
  const [editedSupplement, setEditedSupplement] = useState<string | null>(null);
  const memoryState = useLearningMemory();
const activeItem = writingItems.find((item) => item.id === activeItemId) ?? firstItem;
  const activeScoring = activeItem.scoring;
  if (!activeScoring) {
    throw new Error(`Writing item has no scoring definition: ${activeItem.id}`);
  }

  const activeDraft = drafts[activeItem.id] ?? "";
  const activeRevision = revisions[activeItem.id] ?? "";
  const activeCriterionIds = selectedCriteria[activeItem.id] ?? [];
  const answerRevealed = revealedAnswerIds.includes(activeItem.id);
  const targetLength = activeScoring.suggestedCharacters;
  const activeAnswerText = activeRevision.trim().length > 0 ? activeRevision : activeDraft;
  const activeSignature = `${activeAnswerText.trim()}|${[...activeCriterionIds].sort().join(",")}`;
  const currentVersionConfirmed = confirmedSignatures[activeItem.id] === activeSignature;
  const selectedScore = activeScoring.criteria
    .filter((criterion) => activeCriterionIds.includes(criterion.id))
    .reduce((total, criterion) => total + criterion.points, 0);
  const missingCriteria = activeScoring.criteria.filter((criterion) => (
    !activeCriterionIds.includes(criterion.id)
  ));
  const completedSteps = [
    activeDraft.trim().length > 0,
    answerRevealed,
    confirmedItemIds.includes(activeItem.id),
    activeRevision.trim().length > 0 && currentVersionConfirmed,
  ].filter(Boolean).length;
  const activeProgress = completedSteps * 25;
  const activeSourceIds = new Set(activeItem.sourceIds);
  const activeSources = referenceSources.filter((source) => activeSourceIds.has(source.id));
  const currentItemIndex = writingItems.findIndex((item) => item.id === activeItem.id);
  const nextItem = writingItems[currentItemIndex + 1] ?? writingItems[0];
  const writingHref = selectSubjectiveWritingHref(course, knowledgePoint);
  const caseHref = selectPrimaryCaseForKnowledgePoint(course, knowledgePoint.id)
    ? selectCaseReasoningHref(course, knowledgePoint)
    : null;
  const isWesternPrimary = course.curriculumMode === "western-primary";
  const courseHomeHref = `/courses/${course.slug}`;
  const courseHomeLabel = "课程工作台";

  function selectItem(itemId: string) {
    setActiveItemId(itemId);
    window.scrollTo({ top: 300, behavior: "smooth" });
  }

  function toggleCriterion(criterionId: string) {
    setSelectedCriteria((current) => ({
      ...current,
      [activeItem.id]: toggleValue(current[activeItem.id] ?? [], criterionId),
    }));
  }

  function revealAnswer() {
    if (activeAnswerText.trim().length === 0) {
      return;
    }
    setRevealedAnswerIds((current) => (
      current.includes(activeItem.id) ? current : [...current, activeItem.id]
    ));
  }

  function confirmAttempt() {
    if (!activeScoring || !answerRevealed || activeAnswerText.trim().length === 0) {
      return;
    }
    const rulesByCriterionId = new Map(
      activeScoring.assistanceRules.map((rule) => [rule.criterionId, rule]),
    );
    const criterionResults = activeScoring.criteria.map((criterion) => {
      const rule = rulesByCriterionId.get(criterion.id);
      if (!rule) {
        throw new Error(`Missing assistance rule for criterion: ${criterion.id}`);
      }
      return {
        criterionId: criterion.id,
        memoryCriterionId: rule.memoryCriterionId,
        status: activeCriterionIds.includes(criterion.id) ? "present" as const : "missing" as const,
      };
    });
    recordConfirmedAttempt({
      courseId: course.id,
      courseVersionId: course.version.id,
      offeringId: course.examBlueprint.id,
      knowledgePointId: knowledgePoint.id,
      surface: "subjective-writing",
      taskId: activeItem.id,
      segmentId: null,
      confirmedText: activeAnswerText,
      scoringStandard: {
        id: activeScoring.id,
        version: activeScoring.standardVersion,
        authority: activeScoring.authority,
      },
      criterionResults,
      answerConfidence: "unverified",
    });
    setConfirmedItemIds((current) => current.includes(activeItem.id)
      ? current
      : [...current, activeItem.id]);
    setConfirmedSignatures((current) => ({ ...current, [activeItem.id]: activeSignature }));
  }

  return (
    <main className={styles.appShell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/learn" aria-label="返回 NUR LEARN 学习首页">
          NUR LEARN
        </Link>

        <nav className={styles.navigation} aria-label="主导航">
          <Link href="/learn">本周</Link>
          <Link className={styles.navActive} href={courseHomeHref}>课程</Link>
        </nav>

        <div className={styles.accountArea}>
          <button
            className={styles.accountButton}
            type="button"
            aria-label={`打开${learnerState.profile.displayName}的学习账户`}
            aria-expanded={accountOpen}
            aria-controls="writing-account-panel"
            onClick={() => setAccountOpen((current) => !current)}
          >
            <span className={styles.avatar} aria-hidden="true">{learnerState.profile.avatarLabel}</span>
            <span>{learnerState.profile.displayName}</span>
            <ChevronDown aria-hidden="true" size={16} strokeWidth={1.6} />
          </button>
          {accountOpen ? (
            <section className={styles.accountPanel} id="writing-account-panel" aria-label="学习账户">
              <div>
                <span>学习身份</span>
                <strong>{learnerState.profile.displayName}</strong>
                <p>{learnerState.profile.major}</p>
              </div>
              <Link href={courseHomeHref}>
                回到{courseHomeLabel} <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </section>
          ) : null}
        </div>
      </header>

      <div className={styles.workspace}>
        <div className={styles.ghostWordmark} aria-hidden="true">WRITE</div>

        <div className={styles.breadcrumbs}>
          <Link href={`/courses/${course.slug}/knowledge-points/${knowledgePoint.slug}`}>
            <ArrowLeft aria-hidden="true" size={16} /> {knowledgePoint.title}
          </Link>
          <span>/</span>
          <span>{chapter.title}</span>
          <span>/</span>
          <strong>主观题写作训练室</strong>
        </div>

        <section className={styles.hero} aria-labelledby="writing-room-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>SUBJECTIVE WRITING · COMPLETE ANSWERS</p>
            <h1 id="writing-room-title">主观题<span> · </span>写作训练室</h1>
            <p>{isWesternPrimary
              ? `沿用“${knowledgePoint.title}”的概念与机制证据，把关键词扩成对象、状态、生理意义和边界齐全的可核对答案。`
              : `沿用“${knowledgePoint.title}”的证据与双视角推理，把关键词扩成定义、推理与边界齐全的可核对答案。`}</p>
            <div className={styles.heroMeta}>
              <span>{course.title}</span>
              <span>{knowledgePoint.title}</span>
              <span>名词解释 + 简答题</span>
            </div>
          </div>
          <div className={styles.heroProgress}>
            <div>
              <span>当前题完成度</span>
              <strong>{activeProgress}<small>%</small></strong>
            </div>
            <progress max={100} value={activeProgress} aria-label={`当前题完成度 ${activeProgress}%`} />
            <p><b>{completedSteps}</b> / 4 个写作步骤已完成</p>
            <div className={styles.heroNotice}>
              <CircleAlert aria-hidden="true" size={18} strokeWidth={1.6} />
              <span>教师主观题真实采分点尚未提供；本页只使用清楚标注的 NUR 平台自核量表。</span>
            </div>
          </div>
        </section>

        <div className={styles.roomGrid}>
          <aside className={styles.questionRail} aria-label="本次写作题目">
            <div className={styles.railHeading}>
              <span>01</span>
              <div><small>WRITING SET</small><h2>本次两题</h2></div>
            </div>
            <div className={styles.questionTabs} role="tablist" aria-label="切换写作题目">
              {writingItems.map((item, index) => {
                const active = item.id === activeItem.id;
                const itemDraft = drafts[item.id] ?? "";
                const itemRevision = revisions[item.id] ?? "";
                const started = itemDraft.trim().length > 0 || itemRevision.trim().length > 0;
                return (
                  <button
                    className={active ? styles.questionActive : ""}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    key={item.id}
                    onClick={() => selectItem(item.id)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <small>{questionKindLabels[item.questionKind as keyof typeof questionKindLabels]}</small>
                      <strong>{item.prompt}</strong>
                    </div>
                    <b>{started ? "进行中" : "待作答"}</b>
                  </button>
                );
              })}
            </div>

            <section className={styles.candidateEvidence}>
              <div><FileText aria-hidden="true" size={17} strokeWidth={1.5} /><h3>来源题干与答案分开建模</h3></div>
              <p>{isWesternPrimary
                ? "以下题干只证明各自来源；所附参考答案、缺失答案与当前教师评分权威分别显示。"
                : "以下原题仅作为来源证据；因未附可核验答案，不显示为标准答案。"}</p>
              <ol>
                {sourceCandidates.map((item) => (
                  <li key={item.id}>
                    <span>{item.promptSource.locator}</span>
                    <p>{item.prompt}</p>
                    <b>答案{confidenceLabels[item.answer.confidence]}</b>
                  </li>
                ))}
              </ol>
            </section>
          </aside>

          <section className={styles.writingDesk} aria-live="polite">
            <div className={styles.promptHeader}>
              <div>
                <span>{questionKindLabels[activeItem.questionKind as keyof typeof questionKindLabels]}</span>
                <span>{activeItem.promptSource.wording === "nur-adapted" ? "NUR 题型改写" : "来源原题"}</span>
              </div>
              <small>QUESTION {String(currentItemIndex + 1).padStart(2, "0")}</small>
            </div>
            <article className={styles.promptCard}>
              <p>{activeItem.prompt}</p>
              <div>
                <ShieldCheck aria-hidden="true" size={17} strokeWidth={1.6} />
                <span>{activeItem.promptSource.note}</span>
              </div>
            </article>

            <nav className={styles.writingSteps} aria-label="写作训练步骤">
              <span data-complete={activeDraft.trim().length > 0}>01 审题成文</span>
              <span data-complete={answerRevealed}>02 开始自核</span>
              <span data-complete={confirmedItemIds.includes(activeItem.id)}>03 确认保存</span>
              <span data-complete={activeRevision.trim().length > 0 && currentVersionConfirmed}>04 聚焦重写</span>
            </nav>

            <section className={styles.draftSection}>
              <div className={styles.sectionHeading}>
                <div><PenLine aria-hidden="true" size={19} strokeWidth={1.5} /><h2>第一稿</h2></div>
                <span>{activeDraft.trim().length} / 建议 {targetLength} 字以上</span>
              </div>
              <textarea
                ref={draftTextareaRef}
                value={activeDraft}
                onChange={(event) => setDrafts((current) => ({
                  ...current,
                  [activeItem.id]: event.target.value,
                }))}
                aria-label={`${questionKindLabels[activeItem.questionKind as keyof typeof questionKindLabels]}第一稿`}
                placeholder="先独立写。把定义、证据、推理或边界写成完整句子，不只堆关键词……"
              />
            </section>

            <NurAgentDock
              state={memoryState}
              courseId={course.id}
              courseSlug={course.slug}
              courseVersionId={course.version.id}
              offeringId={course.examBlueprint.id}
              knowledgePointId={knowledgePoint.id}
              surface="subjective-writing"
              taskId={activeItem.id}
              segmentId={null}
              currentText={activeAnswerText}
              selfCheckStarted={answerRevealed}
              onApplyRewrite={(text) => {
                // Radical direct one-click: immediately apply smart merge into live draft (quotes + acts on what student actually wrote)
                const merge = computeSmartMerge(activeDraft, text, "");
                const finalSupplement = merge.supplement ?? merge.added ?? "";
                let finalMerged: string;
                if (merge.isFullReplace || !(merge.before ?? merge.kept)) {
                  finalMerged = finalSupplement;
                } else {
                  const before = merge.before ?? merge.kept ?? "";
                  const after = merge.after ?? "";
                  finalMerged = before + finalSupplement + after;
                }
                setDrafts((current) => ({ ...current, [activeItem.id]: finalMerged }));
                setTimeout(() => {
                  const ta = draftTextareaRef.current;
                  if (ta) {
                    ta.focus();
                    ta.scrollIntoView({ behavior: "smooth", block: "center" });
                    ta.setSelectionRange(finalMerged.length, finalMerged.length);
                  }
                }, 40);
              }}
            />

            {pendingMerge ? (
              <div style={{ margin: "8px 0 12px", padding: "10px 12px", background: "#fffaf0", border: "1px solid #e8d2b8", borderRadius: "4px" }}>
                {pendingMerge.isFullReplace || !(pendingMerge.before ?? pendingMerge.kept) ? (
                  <div style={{ fontSize: "12px", fontWeight: 500, marginBottom: 6, color: "#c45a5a" }}>
                    将完全替换你的当前答案（因与本要点内容几乎无关）
                  </div>
                ) : (
                  <div style={{ fontSize: "12px", fontWeight: 500, marginBottom: 6 }}>
                    预览：黑色 = 你自己写的完整句子（优先保留）；红色 = Agent 补充插入内容
                  </div>
                )}
                <div style={{ whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.55" }}>
                  {!(pendingMerge.isFullReplace || !(pendingMerge.before ?? pendingMerge.kept)) && (
                    <span>{pendingMerge.before ?? pendingMerge.kept}</span>
                  )}
                  <textarea
                    value={editedSupplement ?? (pendingMerge.supplement ?? pendingMerge.added ?? "")}
                    onChange={(e) => setEditedSupplement(e.target.value)}
                    style={{ 
                      color: "#c45a5a", 
                      background: "#fff0e6", 
                      padding: "2px 4px", 
                      border: "1px solid #d4a57a", 
                      borderRadius: "2px",
                      fontSize: "14px",
                      lineHeight: "1.55",
                      width: "100%",
                      minHeight: "60px",
                      resize: "vertical",
                      margin: "4px 0"
                    }}
                    placeholder={pendingMerge.isFullReplace ? "可直接微调替换内容" : "可直接微调 Agent 补充内容"}
                  />
                  {!(pendingMerge.isFullReplace || !(pendingMerge.before ?? pendingMerge.kept)) && (
                    <span>{pendingMerge.after ?? ""}</span>
                  )}
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      const finalSupplement = editedSupplement ?? (pendingMerge.supplement ?? pendingMerge.added ?? "");
                      let finalMerged;
                      if (pendingMerge.isFullReplace || !(pendingMerge.before ?? pendingMerge.kept)) {
                        // Full replace: discard original completely
                        finalMerged = finalSupplement;
                      } else {
                        const before = pendingMerge.before ?? pendingMerge.kept ?? "";
                        const after = pendingMerge.after ?? "";
                        finalMerged = before + finalSupplement + after;
                      }
                      setDrafts(current => ({ ...current, [activeItem.id]: finalMerged }));
                      const finalText = finalMerged;
                      setPendingMerge(null);
                      setEditedSupplement(null);
                      setTimeout(() => {
                        const ta = draftTextareaRef.current;
                        if (ta) {
                          ta.focus();
                          ta.scrollIntoView({ behavior: "smooth", block: "center" });
                          ta.setSelectionRange(finalText.length, finalText.length);
                        }
                      }, 40);
                    }}
                  >
                    确认应用此合并
                  </button>
                  <button type="button" onClick={() => { setPendingMerge(null); setEditedSupplement(null); }}>取消</button>
                </div>
              </div>
            ) : null}

            <CurrentAnswerAssistance
              text={activeAnswerText}
              suggestedCharacters={targetLength}
              selfCheckStarted={answerRevealed}
              rules={activeScoring.assistanceRules}
              criterionLabels={activeScoring.criteria}
              state={memoryState}
            />

            <section className={styles.frameworkSection}>
              <div className={styles.sectionHeading}>
                <div><Lightbulb aria-hidden="true" size={19} strokeWidth={1.5} /><h2>结构参考</h2></div>
                <span>{confidenceLabels[activeItem.answer.confidence]}</span>
              </div>
              {answerRevealed && activeItem.answer.status === "available" ? (
                <div className={styles.answerReveal}>
                  <ol>
                    {activeItem.answer.content.map((step, index) => (
                      <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>
                    ))}
                  </ol>
                  <p><CircleAlert aria-hidden="true" size={16} />{activeItem.answer.notice}</p>
                </div>
              ) : (
                <button type="button" disabled={activeAnswerText.trim().length === 0} onClick={revealAnswer} aria-label="显示参考结构与答案">
                  <span>{activeAnswerText.trim().length === 0
                    ? "先写下作答，再开始自核"
                    : activeAnswerText.trim().length < targetLength
                      ? "未到建议字数，也可现在开始自核"
                      : "开始自核并展开结构参考"}</span>
                  <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
                </button>
              )}
            </section>

            <section className={styles.rubricSection}>
              <div className={styles.rubricHeading}>
                <div><FileCheck2 aria-hidden="true" size={19} strokeWidth={1.5} /><h2>{activeScoring.title}</h2></div>
                <strong>{selectedScore}<small> / {activeScoring.totalPoints}</small></strong>
              </div>
              <p className={styles.rubricNotice}>{activeScoring.notice}</p>
              <div className={styles.rubricList}>
                {activeScoring.criteria.map((criterion) => {
                  const selected = activeCriterionIds.includes(criterion.id);
                  return (
                    <button
                      className={selected ? styles.rubricSelected : ""}
                      type="button"
                      key={criterion.id}
                      aria-pressed={selected}
                      onClick={() => toggleCriterion(criterion.id)}
                    >
                      <span className={styles.rubricCheck} aria-hidden="true">{selected ? <Check size={14} strokeWidth={2.2} /> : null}</span>
                      <span className={styles.rubricPerspective} data-perspective={criterion.perspective}>{perspectiveLabels[criterion.perspective]}</span>
                      <span className={styles.rubricCopy}><strong>{criterion.label}</strong><small>{criterion.detail}</small></span>
                      <b>+{criterion.points}</b>
                    </button>
                  );
                })}
              </div>
              <div className={styles.revisionTarget}>
                <RefreshCw aria-hidden="true" size={17} strokeWidth={1.5} />
                <div>
                  <strong>{missingCriteria.length === 0 ? "当前量表已全部自核" : `改写时补足 ${missingCriteria.length} 个要点`}</strong>
                  <p>{missingCriteria.length === 0
                    ? "再检查是否真的在答案中写成完整句，而不是只勾选了标签。"
                    : missingCriteria.map((criterion) => criterion.label).join(" · ")}</p>
                </div>
              </div>
            </section>

            <section className={styles.rewriteSection}>
              <div className={styles.sectionHeading}>
                <div><RefreshCw aria-hidden="true" size={19} strokeWidth={1.5} /><h2>完整改写</h2></div>
                <span>{activeRevision.trim().length} / 建议 {targetLength} 字以上</span>
              </div>
              <textarea
                value={activeRevision}
                onChange={(event) => setRevisions((current) => ({
                  ...current,
                  [activeItem.id]: event.target.value,
                }))}
                aria-label={`${questionKindLabels[activeItem.questionKind as keyof typeof questionKindLabels]}完整改写`}
                placeholder="根据未覆盖采分点重写一遍；保留完整句、推理连接词和必要边界……"
              />
            </section>

            <section className={styles.confirmationSection} aria-live="polite">
              <div>
                <ShieldCheck aria-hidden="true" size={19} strokeWidth={1.5} />
                <div>
                  <h2>确认本次自核版本</h2>
                  <p>只保存当前答案和你的逐项自核；未勾选项按本次自核记为缺失。草稿与自动提示不会进入历史。</p>
                </div>
              </div>
              <button
                type="button"
                disabled={!answerRevealed || activeAnswerText.trim().length === 0 || currentVersionConfirmed}
                onClick={confirmAttempt}
              >
                {currentVersionConfirmed
                  ? "当前版本已确认保存"
                  : confirmedItemIds.includes(activeItem.id)
                    ? "确认保存当前改写"
                    : "完成自核并确认保存"}
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </section>

            <footer className={styles.deskFooter}>
              <Link href={`/courses/${course.slug}/knowledge-points/${knowledgePoint.slug}`}>
                <ArrowLeft aria-hidden="true" size={18} /> 返回知识点输出
              </Link>
              <button type="button" onClick={() => selectItem(nextItem.id)}>
                {currentItemIndex === writingItems.length - 1 ? "回到第一题" : "继续下一题"}
                <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
              </button>
            </footer>
          </section>

          <aside className={styles.insightRail} aria-label="题目来源与答案状态">
            <section>
              <div className={styles.cardHeading}><ShieldCheck aria-hidden="true" size={18} strokeWidth={1.5} /><h2>题目来源</h2></div>
              <dl>
                <div><dt>出题权威</dt><dd>{sourceAuthorityLabels[activeItem.promptSource.authority]}</dd></div>
                <div><dt>题干状态</dt><dd>{activeItem.promptSource.wording === "nur-adapted" ? "平台改写" : "来源原文"}</dd></div>
              </dl>
              <p>{activeItem.promptSource.locator}</p>
            </section>

            <section>
              <div className={styles.cardHeading}><FileCheck2 aria-hidden="true" size={18} strokeWidth={1.5} /><h2>答案权威</h2></div>
              <dl>
                <div><dt>当前提供</dt><dd>{activeItem.answer.status === "available"
                  ? answerAuthorityLabels[activeItem.answer.authority]
                  : activeItem.answer.status === "conflict"
                    ? "答案冲突"
                    : "未提供"}</dd></div>
                <div><dt>置信状态</dt><dd>{confidenceLabels[activeItem.answer.confidence]}</dd></div>
                <div><dt>教师采分</dt><dd className={styles.pending}>待提供</dd></div>
              </dl>
              <p>{activeItem.answer.notice}</p>
            </section>

            <section>
              <div className={styles.cardHeading}><FileText aria-hidden="true" size={18} strokeWidth={1.5} /><h2>本题引用</h2><span>{activeSources.length}</span></div>
              <ul>
                {activeSources.map((source) => (
                  <li key={source.id}>
                    <div><span>{sourceAuthorityLabels[source.authority]}</span><strong>{source.displayLabel}</strong></div>
                    <b>{source.status === "pending" ? source.missingLabel : source.status === "verified" ? "已核验" : "已接入"}</b>
                  </li>
                ))}
              </ul>
              <p>来源只证明其对应内容；学校题干、教材事实、临床参考和 NUR 评分不会被合并成同一种权威。</p>
            </section>
            <LearningMemoryPanel
              state={memoryState}
              courseId={course.id}
              knowledgePoint={knowledgePoint}
              surface="subjective-writing"
              taskId={activeItem.id}
              segmentId={null}
              writingHref={writingHref}
              caseHref={caseHref}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
