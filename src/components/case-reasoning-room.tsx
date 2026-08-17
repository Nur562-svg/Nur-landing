"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  FileCheck2,
  GitBranch,
  Lightbulb,
  RefreshCw,
  ShieldCheck,
  Target,
} from "lucide-react";
import { useLearningMemory } from "@/hooks/use-learning-memory";
import { recordConfirmedAttempt } from "@/lib/learning-memory";
import { mergeRewriteIntoDraft } from "@/lib/agent-rewrite-merge";
import type {
  CaseDefinition,
  CaseEvidenceRole,
  CaseReasoningStage,
  CaseScoringPerspective,
  ChapterDefinition,
  CourseDefinition,
  LearnerCourseState,
  KnowledgePointDefinition,
  SourceAuthority,
  SourceReference,
} from "@/types/learning";
import {
  selectKnowledgePointHref,
  selectCaseReasoningHref,
  selectSubjectiveWritingHref,
  selectSubjectiveWritingItems,
} from "@/lib/course-selectors";
import {
  CurrentAnswerAssistance,
  LearningMemoryPanel,
} from "./learning-memory-panel";
import { NurAgentDock } from "./nur-agent-dock";
import styles from "./case-reasoning-room.module.css";

type CaseReasoningRoomProps = {
  course: CourseDefinition;
  chapter: ChapterDefinition;
  knowledgePoint: KnowledgePointDefinition;
  learnerState: LearnerCourseState;
  caseDefinition: CaseDefinition;
  referenceSources: readonly SourceReference[];
};

const stageLabels: Readonly<Record<CaseReasoningStage, string>> = {
  evidence: "证据分组",
  mechanism: "病机方向",
  syndrome: "暂定证型",
  differential: "鉴别排除",
};

const stageEnglishLabels: Readonly<Record<CaseReasoningStage, string>> = {
  evidence: "EVIDENCE",
  mechanism: "MECHANISM",
  syndrome: "SYNDROME",
  differential: "DIFFERENTIAL",
};

const perspectiveLabels: Readonly<Record<CaseScoringPerspective, string>> = {
  "shared-evidence": "共享证据",
  tcm: "中医",
  "modern-medicine": "现代医学",
  boundary: "关系边界",
};

const evidenceRoleLabels: Readonly<Record<CaseEvidenceRole, string>> = {
  key: "关键证据",
  supporting: "支持证据",
  missing: "缺失信息",
};

const sourceAuthorityLabels: Readonly<Record<SourceAuthority, string>> = {
  publisher: "出版教材",
  school: "学校材料",
  teacher: "任课教师",
  student: "学生整理",
  "nur-editorial": "NUR 平台",
  "clinical-authority": "公开临床权威",
};

function toggleValue(values: readonly string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

/** Agent 改写应用的单槽撤销快照：只记录最近一次应用前的完整文本。 */
type RewriteUndo = {
  stepId: string;
  beforeText: string;
};

export function CaseReasoningRoom({
  course,
  chapter,
  knowledgePoint,
  learnerState,
  caseDefinition,
  referenceSources,
}: CaseReasoningRoomProps) {
  const orderedSteps = useMemo(
    () => [...caseDefinition.reasoningSteps].sort((left, right) => left.order - right.order),
    [caseDefinition.reasoningSteps],
  );
  const firstStep = orderedSteps[0];
  if (!firstStep) {
    throw new Error(`Case has no reasoning steps: ${caseDefinition.id}`);
  }

  const [activeStage, setActiveStage] = useState<CaseReasoningStage>(firstStep.stage);
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<readonly string[]>([]);
  const [drafts, setDrafts] = useState<Readonly<Record<string, string>>>({});
  const [repairs, setRepairs] = useState<Readonly<Record<string, string>>>({});
  const [revealedStages, setRevealedStages] = useState<readonly CaseReasoningStage[]>([]);
  const [selectedCriterionIds, setSelectedCriterionIds] = useState<readonly string[]>([]);
  const [confirmedStageIds, setConfirmedStageIds] = useState<readonly string[]>([]);
  const [confirmedSignatures, setConfirmedSignatures] = useState<Readonly<Record<string, string>>>({});
  const [accountOpen, setAccountOpen] = useState(false);
  // Agent 改写应用的单槽撤销：再次应用覆盖，切换阶段/确认保存后失效。
  const [rewriteUndo, setRewriteUndo] = useState<RewriteUndo | null>(null);
  const memoryState = useLearningMemory();

  const activeStep = orderedSteps.find((step) => step.stage === activeStage) ?? firstStep;
  const activeStepIndex = orderedSteps.findIndex((step) => step.id === activeStep.id);
  const activeDraft = drafts[activeStep.id] ?? "";
  const activeCriteria = caseDefinition.scoring.criteria.filter((criterion) => (
    criterion.stage === activeStep.stage
  ));
  const activeRevealed = revealedStages.includes(activeStep.stage);
  const selectedScore = caseDefinition.scoring.criteria
    .filter((criterion) => selectedCriterionIds.includes(criterion.id))
    .reduce((total, criterion) => total + criterion.points, 0);
  const requiredEvidence = caseDefinition.evidence.filter((item) => item.requiredForReasoning);
  const selectedRequiredEvidence = requiredEvidence.filter((item) => (
    selectedEvidenceIds.includes(item.id)
  ));
  const completedStages = orderedSteps.filter((step) => confirmedStageIds.includes(step.id));
  const revealedMissingCriteria = caseDefinition.scoring.criteria.filter((criterion) => (
    revealedStages.includes(criterion.stage)
    && !selectedCriterionIds.includes(criterion.id)
  ));
  const repairTarget = revealedMissingCriteria[0] ?? null;
  const repairDraft = repairTarget ? repairs[repairTarget.stage] ?? "" : "";
  const activeRepairDraft = repairTarget?.stage === activeStep.stage ? repairDraft : "";
  const activeAnswerText = activeRepairDraft.trim().length > 0
    ? `${activeDraft.trim()}\n\n补写：${activeRepairDraft.trim()}`
    : activeDraft;
  const activeSignature = `${activeAnswerText.trim()}|${activeCriteria
    .filter((criterion) => selectedCriterionIds.includes(criterion.id))
    .map((criterion) => criterion.id)
    .sort()
    .join(",")}`;
  const currentVersionConfirmed = confirmedSignatures[activeStep.id] === activeSignature;
  const progress = completedStages.length * 25;
  const nextStep = orderedSteps[activeStepIndex + 1] ?? null;
  const previousStep = orderedSteps[activeStepIndex - 1] ?? null;
  const teacherRubric = course.sources.find((source) => source.type === "grading-rubric");
  const knowledgePointHref = selectKnowledgePointHref(course, knowledgePoint);
  const writingHref = selectSubjectiveWritingItems(course, knowledgePoint.id).length > 0
    ? selectSubjectiveWritingHref(course, knowledgePoint)
    : null;
  const caseHref = selectCaseReasoningHref(course, knowledgePoint);

  function selectStage(stage: CaseReasoningStage) {
    setActiveStage(stage);
    setRewriteUndo(null);
    window.scrollTo({ top: 310, behavior: "smooth" });
  }

  function revealActiveFramework() {
    if (activeDraft.trim().length === 0) {
      return;
    }
    setRevealedStages((current) => (
      current.includes(activeStep.stage) ? current : [...current, activeStep.stage]
    ));
  }

  function toggleCriterion(criterionId: string) {
    setSelectedCriterionIds((current) => toggleValue(current, criterionId));
    setConfirmedStageIds((current) => current.filter((item) => item !== activeStep.id));
  }

  function confirmActiveStage() {
    if (!activeRevealed || activeAnswerText.trim().length === 0) {
      return;
    }
    const rulesByCriterionId = new Map(
      caseDefinition.scoring.assistanceRules.map((rule) => [rule.criterionId, rule]),
    );
    const criterionResults = activeCriteria.map((criterion) => {
      const rule = rulesByCriterionId.get(criterion.id);
      if (!rule) {
        throw new Error(`Missing assistance rule for criterion: ${criterion.id}`);
      }
      return {
        criterionId: criterion.id,
        memoryCriterionId: rule.memoryCriterionId,
        status: selectedCriterionIds.includes(criterion.id) ? "present" as const : "missing" as const,
      };
    });
    recordConfirmedAttempt({
      courseId: course.id,
      courseVersionId: course.version.id,
      offeringId: course.examBlueprint.id,
      knowledgePointId: knowledgePoint.id,
      surface: "case-reasoning",
      taskId: caseDefinition.id,
      segmentId: activeStep.id,
      confirmedText: activeAnswerText,
      scoringStandard: {
        id: caseDefinition.scoring.id,
        version: caseDefinition.scoring.standardVersion,
        authority: caseDefinition.scoring.authority,
      },
      criterionResults,
      answerConfidence: "unverified",
    });
    setConfirmedStageIds((current) => current.includes(activeStep.id)
      ? current
      : [...current, activeStep.id]);
    setConfirmedSignatures((current) => ({ ...current, [activeStep.id]: activeSignature }));
    setRewriteUndo(null);
  }

  return (
    <main className={styles.appShell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/learn" aria-label="返回 NUR LEARN 学习首页">
          NUR LEARN
        </Link>

        <nav className={styles.navigation} aria-label="主导航">
          <Link href="/learn">本周</Link>
          <Link className={styles.navActive} href={`/courses/${course.slug}`}>课程</Link>
        </nav>

        <div className={styles.accountArea}>
          <button
            className={styles.accountButton}
            type="button"
            aria-label={`打开${learnerState.profile.displayName}的学习账户`}
            aria-expanded={accountOpen}
            aria-controls="case-account-panel"
            onClick={() => setAccountOpen((current) => !current)}
          >
            <span className={styles.avatar} aria-hidden="true">{learnerState.profile.avatarLabel}</span>
            <span>{learnerState.profile.displayName}</span>
            <ChevronDown aria-hidden="true" size={16} strokeWidth={1.6} />
          </button>
          {accountOpen ? (
            <section className={styles.accountPanel} id="case-account-panel" aria-label="学习账户">
              <div>
                <span>学习身份</span>
                <strong>{learnerState.profile.displayName}</strong>
                <p>{learnerState.profile.major}</p>
              </div>
              <Link href={`/courses/${course.slug}`}>
                回到课程工作台 <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </section>
          ) : null}
        </div>
      </header>

      <div className={styles.workspace}>
        <div className={styles.ghostWordmark} aria-hidden="true">REASON</div>

        <div className={styles.breadcrumbs}>
          <Link href={knowledgePointHref}>
            <ArrowLeft aria-hidden="true" size={16} /> {knowledgePoint.title}
          </Link>
          <span>/</span>
          <span>{chapter.title}</span>
          <span>/</span>
          <strong>案例推理训练室</strong>
        </div>

        <nav className={styles.learningPath} aria-label={`${knowledgePoint.title}学习路径`}>
          <Link href={knowledgePointHref}>
            <span>01</span><strong>知识点取证与对照</strong><small>回到知识点</small>
          </Link>
          {writingHref ? (
            <Link href={writingHref}>
              <span>02</span><strong>主观题完整表达</strong><small>进入写作</small>
            </Link>
          ) : null}
          <span className={styles.learningPathCurrent} aria-current="step">
            <span>03</span><strong>案例推理与修复</strong><small>你在这里</small>
          </span>
        </nav>

        <section className={styles.hero} aria-labelledby="case-room-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{caseDefinition.eyebrow}</p>
            <h1 id="case-room-title">案例<span> · </span>推理训练室</h1>
            <p>不从一个症状跳到结论。先分证据，再写病机、暂定证型与鉴别排除，最后只重写真正断裂的步骤。</p>
            <div className={styles.heroMeta}>
              <span>{course.title}</span>
              <span>{knowledgePoint.title}</span>
              <span>四段推理链</span>
            </div>
          </div>
          <div className={styles.heroProgress}>
            <div>
              <span>推理链完成度</span>
              <strong>{progress}<small>%</small></strong>
            </div>
            <progress max={100} value={progress} aria-label={`推理链完成度 ${progress}%`} />
            <p><b>{completedStages.length}</b> / 4 段已完成作答与自核</p>
            <div className={styles.heroNotice}>
              <CircleAlert aria-hidden="true" size={18} strokeWidth={1.6} />
              <span>这是 NUR 推理训练，不是学校原题、教师采分标准或临床诊断。</span>
            </div>
          </div>
        </section>

        <div className={styles.labGrid}>
          <aside className={styles.stageRail} aria-label="案例推理步骤">
            <div className={styles.railHeading}>
              <span>01</span>
              <div><small>REASONING CHAIN</small><h2>四段推理</h2></div>
            </div>
            <div className={styles.stageList} role="tablist" aria-label="切换推理步骤">
              {orderedSteps.map((step) => {
                const complete = confirmedStageIds.includes(step.id);
                return (
                  <button
                    className={step.stage === activeStep.stage ? styles.stageActive : ""}
                    type="button"
                    role="tab"
                    aria-selected={step.stage === activeStep.stage}
                    key={step.id}
                    onClick={() => selectStage(step.stage)}
                  >
                    <span>{String(step.order).padStart(2, "0")}</span>
                    <div><small>{stageEnglishLabels[step.stage]}</small><strong>{step.label}</strong></div>
                    <b>{complete ? "已自核" : (drafts[step.id] ?? "").trim().length > 0 ? "进行中" : "待作答"}</b>
                  </button>
                );
              })}
            </div>

            <section className={styles.evidenceSummary}>
              <div><Target aria-hidden="true" size={17} strokeWidth={1.5} /><h3>证据覆盖</h3></div>
              <strong>{selectedRequiredEvidence.length}<small> / {requiredEvidence.length}</small></strong>
              <p>必须同时看见症状和缺失信息，才能限制结论强度。</p>
            </section>
          </aside>

          <section className={styles.reasoningDesk} aria-live="polite">
            <div className={styles.caseHeader}>
              <div><span>CASE 01</span><span>NUR 适配案例</span></div>
              <small>{caseDefinition.promptSource.locator}</small>
            </div>
            <article className={styles.caseCard}>
              <h2>{caseDefinition.title}</h2>
              <p>{caseDefinition.stem}</p>
              <div><ShieldCheck aria-hidden="true" size={17} strokeWidth={1.6} /><span>{caseDefinition.promptSource.note}</span></div>
            </article>

            <nav className={styles.reasoningSteps} aria-label="当前推理进度">
              {orderedSteps.map((step) => (
                <span
                  key={step.id}
                  data-active={step.stage === activeStep.stage}
                  data-complete={completedStages.some((item) => item.id === step.id)}
                >
                  {String(step.order).padStart(2, "0")} {stageLabels[step.stage]}
                </span>
              ))}
            </nav>

            <section className={styles.activeStage}>
              <div className={styles.sectionHeading}>
                <div>
                  <span>{String(activeStep.order).padStart(2, "0")} · {stageEnglishLabels[activeStep.stage]}</span>
                  <h2>{activeStep.label}</h2>
                </div>
                <b>建议 {activeStep.minimumCharacters} 字以上</b>
              </div>

              {activeStep.stage === "evidence" ? (
                <div className={styles.evidenceGrid} aria-label="选择进入推理链的证据">
                  {caseDefinition.evidence.map((item) => {
                    const selected = selectedEvidenceIds.includes(item.id);
                    return (
                      <button
                        className={selected ? styles.evidenceSelected : ""}
                        type="button"
                        key={item.id}
                        aria-pressed={selected}
                        onClick={() => setSelectedEvidenceIds((current) => toggleValue(current, item.id))}
                      >
                        <span aria-hidden="true">{selected ? <Check size={14} strokeWidth={2.2} /> : null}</span>
                        <div><small data-role={item.role}>{evidenceRoleLabels[item.role]}</small><strong>{item.label}</strong><p>{item.detail}</p></div>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              <article className={styles.stagePrompt}>
                <GitBranch aria-hidden="true" size={19} strokeWidth={1.5} />
                <p>{activeStep.prompt}</p>
              </article>

              <div className={styles.draftArea}>
                <label htmlFor={`case-draft-${activeStep.stage}`}>你的推理</label>
                <textarea
                  id={`case-draft-${activeStep.stage}`}
                  value={activeDraft}
                  onChange={(event) => {
                    setDrafts((current) => ({
                      ...current,
                      [activeStep.id]: event.target.value,
                    }));
                    setConfirmedStageIds((current) => current.filter((item) => item !== activeStep.id));
                  }}
                  placeholder={activeStep.placeholder}
                />
                <span>{activeDraft.trim().length} / 建议 {activeStep.minimumCharacters} 字以上</span>
              </div>

              <CurrentAnswerAssistance
                text={activeAnswerText}
                suggestedCharacters={activeStep.minimumCharacters}
                selfCheckStarted={activeRevealed}
                rules={caseDefinition.scoring.assistanceRules.filter((rule) => (
                  activeCriteria.some((criterion) => criterion.id === rule.criterionId)
                ))}
                criterionLabels={activeCriteria}
                state={memoryState}
              />

              <NurAgentDock
                state={memoryState}
                courseId={course.id}
                courseSlug={course.slug}
                courseVersionId={course.version.id}
                offeringId={course.examBlueprint.id}
                knowledgePointId={knowledgePoint.id}
                surface="case-reasoning"
                taskId={caseDefinition.id}
                segmentId={activeStep.id}
                currentText={activeAnswerText}
                selfCheckStarted={activeRevealed}
                onApplyRewrite={(rewrittenText) => {
                  if (activeDraft.trim().length === 0) return;
                  // 与写作室一致的智能合并：保留学生原句、把提案作为补充插入；
                  // 草稿过短或与提案无关时才整体替换。
                  const { merged } = mergeRewriteIntoDraft(activeDraft, rewrittenText);
                  setRewriteUndo({ stepId: activeStep.id, beforeText: activeDraft });
                  setDrafts((current) => ({ ...current, [activeStep.id]: merged }));
                  // 应用后本步回到未确认状态（与手动编辑行为一致），学生仍需自行自核确认
                  setConfirmedStageIds((current) => current.filter((item) => item !== activeStep.id));
                }}
              />

              {rewriteUndo && rewriteUndo.stepId === activeStep.id ? (
                <div className={styles.rewriteUndoBar}>
                  <span>
                    已应用 Agent 改写；本步仍是<b>未确认</b>状态，需你自核并确认保存。
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setDrafts((current) => ({ ...current, [rewriteUndo.stepId]: rewriteUndo.beforeText }));
                      setRewriteUndo(null);
                    }}
                  >
                    撤销，回到应用前全文
                  </button>
                </div>
              ) : null}

              <section className={styles.frameworkSection}>
                <div className={styles.sectionHeading}>
                  <div><Lightbulb aria-hidden="true" size={19} strokeWidth={1.5} /><h2>本步结构参考</h2></div>
                  <span>{caseDefinition.answer.confidence === "source-cross-checked" ? "来源交叉核对" : "已核验"}</span>
                </div>
                {activeRevealed ? (
                  <div className={styles.frameworkReveal}>
                    <ol>
                      {activeStep.answerFramework.map((item, index) => (
                        <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
                      ))}
                    </ol>
                    <p><CircleAlert aria-hidden="true" size={16} />{caseDefinition.answer.notice}</p>
                  </div>
                ) : (
                  <button type="button" disabled={activeDraft.trim().length === 0} onClick={revealActiveFramework}>
                    <span>{activeDraft.trim().length === 0 ? "先写下本步推理，再核对结构" : "核对本步结构"}</span>
                    <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
                  </button>
                )}
              </section>

              <section className={styles.rubricSection}>
                <div className={styles.rubricHeading}>
                  <div><FileCheck2 aria-hidden="true" size={19} strokeWidth={1.5} /><h2>本步自核</h2></div>
                  <strong>{selectedScore}<small> / {caseDefinition.scoring.totalPoints}</small></strong>
                </div>
                <p>{activeRevealed ? caseDefinition.scoring.notice : "展开结构参考后，再判断自己的答案是否真正覆盖本步标准。"}</p>
                <div className={styles.rubricList}>
                  {activeCriteria.map((criterion) => {
                    const selected = selectedCriterionIds.includes(criterion.id);
                    return (
                      <button
                        className={selected ? styles.rubricSelected : ""}
                        type="button"
                        key={criterion.id}
                        aria-pressed={selected}
                        disabled={!activeRevealed}
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
              </section>

              <section className={styles.confirmationSection} aria-live="polite">
                <div>
                  <ShieldCheck aria-hidden="true" size={19} strokeWidth={1.5} />
                  <div>
                    <h2>确认保存本步自核</h2>
                    <p>只保存当前推理和你的逐项自核；未勾选项按本次自核记为缺失。建议字数不是保存门槛。</p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!activeRevealed || activeAnswerText.trim().length === 0 || currentVersionConfirmed}
                  onClick={confirmActiveStage}
                >
                  {currentVersionConfirmed
                    ? "当前版本已确认保存"
                    : confirmedStageIds.includes(activeStep.id)
                      ? "确认保存当前补写"
                      : "完成自核并确认保存"}
                  <ArrowRight aria-hidden="true" size={18} />
                </button>
              </section>
            </section>

            <footer className={styles.deskFooter}>
              {previousStep ? (
                <button type="button" onClick={() => selectStage(previousStep.stage)}>
                  <ArrowLeft aria-hidden="true" size={18} /> 上一步
                </button>
              ) : (
                <Link href={knowledgePointHref}>
                  <ArrowLeft aria-hidden="true" size={18} /> 返回知识点迁移
                </Link>
              )}
              {nextStep ? (
                <button type="button" onClick={() => selectStage(nextStep.stage)}>
                  继续：{nextStep.label} <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
                </button>
              ) : (
                <Link href={`/courses/${course.slug}`}>
                  回到课程工作台 <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
                </Link>
              )}
            </footer>
          </section>

          <aside className={styles.diagnosticRail} aria-label="推理断点与来源状态">
            <section>
              <div className={styles.cardHeading}><GitBranch aria-hidden="true" size={18} strokeWidth={1.5} /><h2>推理链诊断</h2></div>
              <dl>
                <div><dt>当前自核</dt><dd>{selectedScore} / {caseDefinition.scoring.totalPoints}</dd></div>
                <div><dt>已核步骤</dt><dd>{completedStages.length} / {orderedSteps.length}</dd></div>
                <div><dt>当前断点</dt><dd className={repairTarget ? styles.warning : styles.resolved}>{repairTarget ? stageLabels[repairTarget.stage] : revealedStages.length > 0 ? "暂未标记" : "待开始"}</dd></div>
              </dl>
              <p>断点来自你的逐项自核，不是自动判卷。勾选前请确认答案中真的写出了完整句和依据。</p>
            </section>

            <section className={styles.repairCard}>
              <div className={styles.cardHeading}><RefreshCw aria-hidden="true" size={18} strokeWidth={1.5} /><h2>断点修复</h2></div>
              {repairTarget ? (
                <>
                  <span>{stageLabels[repairTarget.stage]} · {repairTarget.label}</span>
                  <p>{repairTarget.detail}</p>
                  <label htmlFor="case-repair">只重写这一处</label>
                  <textarea
                    id="case-repair"
                    value={repairDraft}
                    onChange={(event) => {
                      setRepairs((current) => ({
                        ...current,
                        [repairTarget.stage]: event.target.value,
                      }));
                      const targetStep = orderedSteps.find((step) => step.stage === repairTarget.stage);
                      if (targetStep) {
                        setConfirmedStageIds((current) => current.filter((item) => item !== targetStep.id));
                      }
                    }}
                    placeholder="补上证据、连接词、反证或边界，不必重抄整份答案……"
                  />
                  <small>{repairDraft.trim().length} / 建议 60 字以上</small>
                </>
              ) : (
                <div className={styles.noRepair}>
                  <Check aria-hidden="true" size={18} strokeWidth={1.8} />
                  <p>{completedStages.length === orderedSteps.length
                    ? "四段推理均已自核。再检查勾选是否与实际文字一致。"
                    : "完成并核对至少一步后，这里会定位最早缺失的推理环节。"}</p>
                </div>
              )}
            </section>

            <section>
              <div className={styles.cardHeading}><ShieldCheck aria-hidden="true" size={18} strokeWidth={1.5} /><h2>权威边界</h2></div>
              <dl>
                <div><dt>案例题干</dt><dd>{sourceAuthorityLabels[caseDefinition.promptSource.authority]}改写</dd></div>
                <div><dt>结构参考</dt><dd>NUR 来源交叉核对</dd></div>
                <div><dt>教师采分</dt><dd className={styles.pending}>{teacherRubric?.status === "pending" ? teacherRubric.missingLabel : "待确认"}</dd></div>
              </dl>
              <p>{caseDefinition.boundaryNote}</p>
            </section>

            <section>
              <div className={styles.cardHeading}><Target aria-hidden="true" size={18} strokeWidth={1.5} /><h2>本案例引用</h2><span>{referenceSources.length}</span></div>
              <ul className={styles.sourceList}>
                {referenceSources.map((source) => (
                  <li key={source.id}>
                    <div><span>{sourceAuthorityLabels[source.authority]}</span><strong>{source.displayLabel}</strong></div>
                    <b>{source.status === "verified" ? "已核验" : source.status === "pending" ? source.missingLabel : "已接入"}</b>
                  </li>
                ))}
              </ul>
              <p>每条来源只支持其对应内容；教材事实、现代评估和 NUR 训练结构不会被合并成一种权威。</p>
            </section>
            <LearningMemoryPanel
              state={memoryState}
              courseId={course.id}
              knowledgePoint={knowledgePoint}
              surface="case-reasoning"
              taskId={caseDefinition.id}
              segmentId={activeStep.id}
              writingHref={writingHref}
              caseHref={caseHref}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
