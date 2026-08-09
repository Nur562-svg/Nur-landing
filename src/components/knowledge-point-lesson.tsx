"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  ExternalLink,
  FileCheck2,
  Layers3,
  Lightbulb,
  PenLine,
  ShieldCheck,
  Target,
} from "lucide-react";
import type {
  CaseDefinition,
  ChapterDefinition,
  CourseDefinition,
  KnowledgePointDefinition,
  LearnerCourseState,
  LensRelationship,
  LessonSectionId,
  ScoringPerspective,
  SourceReference,
  SourceType,
} from "@/types/learning";
import styles from "./knowledge-point-lesson.module.css";
import { NurAgentDock } from "./nur-agent-dock";

type KnowledgePointLessonProps = {
  course: CourseDefinition;
  chapter: ChapterDefinition;
  knowledgePoint: KnowledgePointDefinition;
  learnerState: LearnerCourseState;
  referenceSources: readonly SourceReference[];
  transferCase: CaseDefinition | null;
};

const relationshipLabels: Readonly<Record<LensRelationship, string>> = {
  related: "可关联",
  "learning-aid": "帮助理解",
  "not-equivalent": "不可直接等同",
};

const perspectiveLabels: Readonly<Record<ScoringPerspective, string>> = {
  tcm: "中医",
  "modern-medicine": "现代医学",
  boundary: "关系边界",
};

const sourceTypeLabels: Readonly<Record<SourceType, string>> = {
  textbook: "课程教材",
  "teacher-slide": "教师课件",
  "review-scope": "教师复习范围",
  "past-exam": "历史试卷",
  "question-bank": "题库资料",
  "answer-key": "答案资料",
  "study-note": "复习资料",
  "experiment-manual": "实验讲义",
  "image-set": "识图资料",
  transcription: "OCR 转录",
  "grading-rubric": "教师评分标准",
  editorial: "NUR 内容结构",
  "clinical-reference": "公开临床参考",
};

function toggleValue(values: readonly string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function KnowledgePointLesson({
  course,
  chapter,
  knowledgePoint,
  learnerState,
  referenceSources,
  transferCase,
}: KnowledgePointLessonProps) {
  const lesson = knowledgePoint.lesson;
  if (!lesson) {
    throw new Error(`Knowledge point has no lesson: ${knowledgePoint.id}`);
  }

  const [activeSectionId, setActiveSectionId] = useState<LessonSectionId>("evidence");
  const [visitedSectionIds, setVisitedSectionIds] = useState<readonly LessonSectionId[]>(["evidence"]);
  const [selectedPromptIds, setSelectedPromptIds] = useState<readonly string[]>([]);
  const [answerDraft, setAnswerDraft] = useState("");
  const [selectedCriterionIds, setSelectedCriterionIds] = useState<readonly string[]>([]);
  const [caseRevealed, setCaseRevealed] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const isWesternPrimary = course.curriculumMode === "western-primary";
  const courseHomeHref = `/courses/${course.slug}`;
  const courseHomeLabel = "课程工作台";
  const transferExercise = lesson.transferExercise;
  const transferTitle = transferCase?.title ?? transferExercise?.title ?? "迁移练习";
  const transferPrompt = transferCase?.stem ?? transferExercise?.prompt ?? "";
  const transferEvidenceLabels = transferCase
    ? transferCase.evidence.map((item) => item.label)
    : transferExercise?.evidenceLabels ?? [];
  const transferReasoningSteps = transferCase
    ? transferCase.reasoningSteps.map((step) => ({
      id: step.id,
      label: step.label,
      detail: step.answerFramework[0],
    }))
    : transferExercise?.reasoningSteps.map((step, index) => ({
      id: `${index}-${step}`,
      label: `步骤 ${index + 1}`,
      detail: step,
    })) ?? [];
  const transferBoundaryNote = transferCase?.boundaryNote
    ?? transferExercise?.boundaryNote
    ?? "";

  const orderedSections = useMemo(
    () => [...lesson.sections].sort((left, right) => left.order - right.order),
    [lesson.sections],
  );
  const activeSection = orderedSections.find((section) => section.id === activeSectionId)
    ?? orderedSections[0];
  const activeSectionIndex = orderedSections.findIndex((section) => section.id === activeSection.id);
  const nextSection = orderedSections[activeSectionIndex + 1];
  const totalPrompts = lesson.evidenceGroups.reduce(
    (total, group) => total + group.prompts.length,
    0,
  );
  const selectedScore = lesson.scoring.criteria
    .filter((criterion) => selectedCriterionIds.includes(criterion.id))
    .reduce((total, criterion) => total + criterion.points, 0);
  const completedMilestones = [
    selectedPromptIds.length >= lesson.evidenceGroups.length,
    visitedSectionIds.includes("compare"),
    answerDraft.trim().length >= 60 && selectedCriterionIds.length > 0,
    caseRevealed,
  ].filter(Boolean).length;
  const practiceProgress = completedMilestones * 25;
  const courseMaterialSources = course.sources
    .filter((source) => source.role === "course-material")
    .sort((left, right) => left.order - right.order);
  const resolvedCourseMaterialCount = courseMaterialSources.filter(
    (source) => source.status !== "pending",
  ).length;

  function chooseSection(sectionId: LessonSectionId) {
    setActiveSectionId(sectionId);
    setVisitedSectionIds((current) => (
      current.includes(sectionId) ? current : [...current, sectionId]
    ));
  }

  function continueLesson() {
    if (nextSection) {
      chooseSection(nextSection.id);
      window.scrollTo({ top: 245, behavior: "smooth" });
    }
  }

  return (
    <main className={styles.appShell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/learn" aria-label="返回 NUR LEARN 学习首页">
          NUR LEARN
        </Link>

        <nav className={styles.navigation} aria-label="主导航">
          <Link href="/learn">本周</Link>
          <Link className={styles.navActive} href={courseHomeHref}>
            课程
          </Link>
        </nav>

        <div className={styles.accountArea}>
          <button
            className={styles.accountButton}
            type="button"
            aria-label={`打开${learnerState.profile.displayName}的学习账户`}
            aria-expanded={accountOpen}
            aria-controls="lesson-account-panel"
            onClick={() => setAccountOpen((current) => !current)}
          >
            <span className={styles.avatar} aria-hidden="true">{learnerState.profile.avatarLabel}</span>
            <span>{learnerState.profile.displayName}</span>
            <ChevronDown aria-hidden="true" size={16} strokeWidth={1.6} />
          </button>
          {accountOpen ? (
            <section className={styles.accountPanel} id="lesson-account-panel" aria-label="学习账户">
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
        <div className={styles.ghostWordmark} aria-hidden="true">EVIDENCE</div>

        <div className={styles.breadcrumbs}>
          <Link href={courseHomeHref}>
            <ArrowLeft aria-hidden="true" size={16} /> {course.title} · {courseHomeLabel}
          </Link>
          <span>/</span>
          <span>{chapter.title}</span>
          <span>/</span>
          <strong>{knowledgePoint.title}</strong>
        </div>

        <section className={styles.lessonHero} aria-labelledby="lesson-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{lesson.eyebrow}</p>
            <h1 id="lesson-title">{chapter.title}<span> · </span>{knowledgePoint.title}</h1>
            <p>{lesson.objective}</p>
            <div className={styles.heroMeta}>
              <span>CHAPTER {chapter.indexLabel}</span>
              <span>{knowledgePoint.emphasis}知识点</span>
              <span>{lesson.status === "demo" ? "结构演示内容" : lesson.status === "verified" ? "已核验内容" : "可用内容"}</span>
            </div>
          </div>
          <div className={styles.heroProgress}>
            <div>
              <span>本次学习</span>
              <strong>{lesson.durationMinutes}<small> MIN</small></strong>
            </div>
            <progress max={100} value={practiceProgress} aria-label={`本次学习进度 ${practiceProgress}%`} />
            <p><b>{completedMilestones}</b> / 4 个学习环节已形成证据</p>
            <div className={styles.heroNotice}>
              <CircleAlert aria-hidden="true" size={18} strokeWidth={1.6} />
              <span>{isWesternPrimary
                ? "本知识点以现代生理机制为主；跨体系联系只在有来源且有教学价值时出现。"
                : "现代医学进入平台作答与评分训练；两套结论分别论证。"}</span>
            </div>
          </div>
        </section>

        <nav className={styles.sectionNav} aria-label="知识点学习路径">
          {orderedSections.map((section) => (
            <button
              className={section.id === activeSection.id ? styles.sectionActive : ""}
              type="button"
              key={section.id}
              onClick={() => chooseSection(section.id)}
              aria-current={section.id === activeSection.id ? "step" : undefined}
            >
              <span>{section.indexLabel}</span>
              <strong>{section.title}</strong>
              <small>{section.detail}</small>
            </button>
          ))}
        </nav>

        <div className={styles.contentGrid}>
          <section className={styles.lessonBody} aria-live="polite">
            {activeSection.id === "evidence" ? (
              <div className={styles.sectionPanel}>
                <div className={styles.sectionHeading}>
                  <div>
                    <p>01 · EVIDENCE COLLECTION</p>
                    <h2>{isWesternPrimary ? "先把概念对象与变量变成可核对证据" : "先把“问什么”变成可核对证据"}</h2>
                  </div>
                  <span>{selectedPromptIds.length} / {totalPrompts} 已标记</span>
                </div>
                <p className={styles.sectionLead}>{isWesternPrimary
                  ? "点击你已经辨清的证据。训练目标不是只背定义，而是避免漏掉会改变机制解释的对象、变量和边界。"
                  : "点击你已经补问到的证据。训练目标不是背一个结论，而是避免遗漏会改变推理方向的信息。"}</p>

                <div className={styles.evidenceGrid}>
                  {lesson.evidenceGroups.map((group) => (
                    <article key={group.id}>
                      <div className={styles.groupHeading}>
                        <span>{String(group.order).padStart(2, "0")}</span>
                        <div><h3>{group.title}</h3><p>{group.detail}</p></div>
                      </div>
                      <div className={styles.promptList}>
                        {group.prompts.map((prompt) => {
                          const selected = selectedPromptIds.includes(prompt.id);
                          return (
                            <button
                              className={selected ? styles.promptSelected : ""}
                              type="button"
                              key={prompt.id}
                              onClick={() => setSelectedPromptIds((current) => toggleValue(current, prompt.id))}
                              aria-pressed={selected}
                            >
                              <span aria-hidden="true">{selected ? <Check size={14} strokeWidth={2.2} /> : null}</span>
                              <div><strong>{prompt.label}</strong><small>{prompt.question}</small></div>
                            </button>
                          );
                        })}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {activeSection.id === "compare" ? (
              <div className={styles.sectionPanel}>
                <div className={styles.sectionHeading}>
                  <div>
                    <p>{isWesternPrimary ? "02 · MECHANISM REASONING" : "02 · DUAL-LENS REASONING"}</p>
                    <h2>{isWesternPrimary ? "从对象与变量建立调节机制链" : "共享观察证据，分别建立推理链"}</h2>
                  </div>
                  <span>{isWesternPrimary ? "现代生理学主线" : "双视角并列"}</span>
                </div>
                <p className={styles.sectionLead}>{isWesternPrimary
                  ? "本课程按现代生理学主线展开；教材事实、课堂覆盖、历史题型与平台评分各自保留来源和权威边界。"
                  : "现代医学内容会进入作答与评分，但不被用来替换中医辨证，也不把证候直接翻译成现代疾病。"}</p>

                <div className={styles.lensGrid}>
                  {lesson.lensBlocks.map((block) => (
                    <article
                      className={block.perspective === "tcm" ? styles.tcmLens : styles.modernLens}
                      key={block.id}
                    >
                      <p>{block.eyebrow}</p>
                      <h3>{block.title}</h3>
                      <div className={styles.lensStatus}>
                        {block.status === "demo" ? "内容结构演示" : block.status === "verified" ? (isWesternPrimary ? "教材内容已核验" : "教材与教师范围已核验") : "进入平台评分"}
                      </div>
                      <p className={styles.lensSummary}>{block.summary}</p>
                      <ol>
                        {block.reasoningSteps.map((step, index) => (
                          <li key={step}><span>{index + 1}</span><p>{step}</p></li>
                        ))}
                      </ol>
                      <div className={styles.boundaryNote}>
                        <ShieldCheck aria-hidden="true" size={17} strokeWidth={1.6} />
                        <span>{block.boundaryNote}</span>
                      </div>
                    </article>
                  ))}
                </div>

                {knowledgePoint.relationships.length > 0 ? (
                  <div className={styles.relationshipBlock}>
                    <div><Layers3 aria-hidden="true" size={19} strokeWidth={1.5} /><h3>关系标签</h3></div>
                    <div className={styles.relationshipList}>
                      {knowledgePoint.relationships.map((relationship) => (
                        <article key={relationship.id}>
                          <strong data-relationship={relationship.label}>{relationshipLabels[relationship.label]}</strong>
                          <p>{relationship.note}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {activeSection.id === "output" ? (
              <div className={styles.sectionPanel}>
                <div className={styles.sectionHeading}>
                  <div>
                    <p>03 · ANSWER & SCORE</p>
                    <h2>{isWesternPrimary ? "把机制链写成可核对答案" : "把两条推理链写成可评分答案"}</h2>
                  </div>
                  <span>平台训练 {lesson.scoring.totalPoints} 分</span>
                </div>
                <div className={styles.scoringNotice}>
                  <CircleAlert aria-hidden="true" size={18} strokeWidth={1.6} />
                  <p>{lesson.scoring.notice}</p>
                </div>

                <article className={styles.answerPrompt}>
                  <span>练习题</span>
                  <p>{lesson.scoring.prompt}</p>
                </article>

                <div className={styles.outputGrid}>
                  <div className={styles.answerArea}>
                    <label htmlFor="lesson-answer">你的作答</label>
                    <textarea
                      id="lesson-answer"
                      value={answerDraft}
                      onChange={(event) => setAnswerDraft(event.target.value)}
                      placeholder={isWesternPrimary
                        ? "按“对象 → 变量 → 调节机制 → 生理意义 → 结论边界”组织答案……"
                        : "按“补证据 → 中医分析 → 现代医学分析 → 关系边界”组织答案……"}
                    />
                    <span>{answerDraft.trim().length} 字</span>
                  </div>
                  <aside className={styles.answerFramework}>
                    <div><Lightbulb aria-hidden="true" size={18} strokeWidth={1.5} /><h3>答案骨架</h3></div>
                    <ol>
                      {lesson.scoring.answerFramework.map((item, index) => (
                        <li key={item}><span>{index + 1}</span><p>{item}</p></li>
                      ))}
                    </ol>
                  </aside>
                </div>

                <div className={styles.rubricHeading}>
                  <div><FileCheck2 aria-hidden="true" size={19} strokeWidth={1.5} /><h3>NUR 平台自核采分点</h3></div>
                  <strong>{selectedScore} <small>/ {lesson.scoring.totalPoints}</small></strong>
                </div>
                <div className={styles.rubricList}>
                  {lesson.scoring.criteria.map((criterion) => {
                    const selected = selectedCriterionIds.includes(criterion.id);
                    return (
                      <button
                        className={selected ? styles.rubricSelected : ""}
                        type="button"
                        key={criterion.id}
                        onClick={() => setSelectedCriterionIds((current) => toggleValue(current, criterion.id))}
                        aria-pressed={selected}
                      >
                        <span className={styles.rubricCheck} aria-hidden="true">{selected ? <Check size={14} strokeWidth={2.2} /> : null}</span>
                        <span className={styles.rubricPerspective} data-perspective={criterion.perspective}>
                          {perspectiveLabels[criterion.perspective]}
                        </span>
                        <span className={styles.rubricCopy}><strong>{criterion.label}</strong><small>{criterion.detail}</small></span>
                        <b>+{criterion.points}</b>
                      </button>
                    );
                  })}
                </div>

                <div className={styles.writingRoomEntry}>
                  <div>
                    <PenLine aria-hidden="true" size={20} strokeWidth={1.5} />
                    <div>
                      <span>NEXT · SUBJECTIVE WRITING</span>
                      <h3>把当前输出带进主观题写作训练室</h3>
                      <p>{isWesternPrimary
                        ? "练习“内环境”名词解释与稳态简答；学校题干、所附答案和 NUR 评分权威分开显示。"
                        : "先练“消谷善饥”名词解释，再完成问饮食口味简答；题目来源、答案置信与 NUR 评分权威分开显示。"}</p>
                    </div>
                  </div>
                  <Link href={`/courses/${course.slug}/knowledge-points/${knowledgePoint.slug}/subjective-writing`}>
                    进入写作训练室 <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            ) : null}

            {activeSection.id === "transfer" ? (
              <div className={styles.sectionPanel}>
                <div className={styles.sectionHeading}>
                  <div>
                    <p>{transferCase ? "04 · CASE TRANSFER" : "04 · MECHANISM TRANSFER"}</p>
                    <h2>{transferCase ? "回到案例，复核有没有跳步" : "进入扰动情境，复核机制链有没有跳步"}</h2>
                  </div>
                  <span>{caseRevealed ? "推理链已展开" : "先独立判断"}</span>
                </div>
                <article className={styles.caseCard}>
                  <p>{transferCase ? "CASE STUDY" : "TRANSFER EXERCISE"}</p>
                  <h3>{transferTitle}</h3>
                  <div className={styles.caseStem}>{transferPrompt}</div>
                  <div className={styles.caseEvidence}>
                    {transferEvidenceLabels.map((label) => <span key={label}>{label}</span>)}
                  </div>
                  <button type="button" onClick={() => setCaseRevealed((current) => !current)}>
                    <span>{caseRevealed ? "收起推理链" : "核对完整推理链"}</span>
                    <ArrowRight aria-hidden="true" size={21} strokeWidth={1.4} />
                  </button>
                </article>

                {caseRevealed ? (
                  <div className={styles.reasoningReveal} aria-live="polite">
                    <div><Target aria-hidden="true" size={19} strokeWidth={1.5} /><h3>{transferCase ? "证据到结论的四步链" : "扰动到恢复的推理链"}</h3></div>
                    <ol>
                      {transferReasoningSteps.map((step, index) => (
                        <li key={step.id}><span>{String(index + 1).padStart(2, "0")}</span><p><strong>{step.label}：</strong>{step.detail}</p></li>
                      ))}
                    </ol>
                    <p><ShieldCheck aria-hidden="true" size={17} strokeWidth={1.6} />{transferBoundaryNote}</p>
                  </div>
                ) : null}

                {transferCase ? (
                  <div className={styles.writingRoomEntry}>
                    <div>
                      <Target aria-hidden="true" size={20} strokeWidth={1.5} />
                      <div>
                        <span>NEXT · CASE REASONING</span>
                        <h3>不要只展开答案，亲手补完四段推理链</h3>
                        <p>依次完成证据分组、病机方向、暂定证型与鉴别排除；NUR 只定位断点，不冒充教师案例题采分。</p>
                      </div>
                    </div>
                    <Link href={`/courses/${course.slug}/knowledge-points/${knowledgePoint.slug}/case-reasoning`}>
                      进入案例推理室 <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className={styles.sectionFooter}>
              <Link href={courseHomeHref}><ArrowLeft aria-hidden="true" size={18} /> 返回{courseHomeLabel}</Link>
              {nextSection ? (
                <button type="button" onClick={continueLesson}>
                  继续：{nextSection.title} <ArrowRight aria-hidden="true" size={21} strokeWidth={1.4} />
                </button>
              ) : (
                <Link className={styles.finishLink} href={courseHomeHref}>
                  完成本次学习 <Check aria-hidden="true" size={19} />
                </Link>
              )}
            </div>
          </section>

          <aside className={styles.insightRail} aria-label="知识点学习信息">
            <section className={styles.sessionCard}>
              <div className={styles.cardHeading}>
                <Clock3 aria-hidden="true" size={19} strokeWidth={1.5} />
                <h2>本次证据账本</h2>
                <span>{practiceProgress}%</span>
              </div>
              <progress max={100} value={practiceProgress} aria-label={`证据账本完成 ${practiceProgress}%`} />
              <dl>
                <div><dt>{isWesternPrimary ? "概念证据" : "关键证据"}</dt><dd>{selectedPromptIds.length} / {totalPrompts}</dd></div>
                <div><dt>作答草稿</dt><dd>{answerDraft.trim().length >= 60 ? "已成形" : "待完成"}</dd></div>
                <div><dt>平台自评</dt><dd>{selectedScore} / {lesson.scoring.totalPoints}</dd></div>
                <div><dt>{transferCase ? "案例复核" : "迁移复核"}</dt><dd>{caseRevealed ? "已展开" : "待展开"}</dd></div>
              </dl>
            </section>

            <section className={styles.sourceCard}>
              <div className={styles.cardHeading}>
                <Layers3 aria-hidden="true" size={19} strokeWidth={1.5} />
                <h2>本页内容来源</h2>
                <span>{referenceSources.length} 项</span>
              </div>
              <ul>
                {referenceSources.map((source) => (
                  <li key={source.id}>
                    <div><span>{sourceTypeLabels[source.type]}</span><strong>{source.displayLabel}</strong></div>
                    {source.status === "pending" ? (
                      <b>{source.missingLabel}</b>
                    ) : source.citation.url ? (
                      <a href={source.citation.url} target="_blank" rel="noreferrer" aria-label={`查看来源：${source.citation.label}`}>
                        <ExternalLink aria-hidden="true" size={15} />
                      </a>
                    ) : (
                      <b>{source.status === "verified" ? "已核验" : "已接入"}</b>
                    )}
                  </li>
                ))}
              </ul>
              <p>{isWesternPrimary
                ? "教材支持概念与机制校准；学校白皮、历史题和课堂转录只支持各自范围，不升级为当前教师评分权威。"
                : "教材与教师重点支持中医内容校准；公开临床资料支持现代医学平台训练，二者不作错误等同。"}</p>
            </section>

            <section className={styles.materialCard}>
              <div className={styles.cardHeading}>
                <CircleAlert aria-hidden="true" size={19} strokeWidth={1.5} />
                <h2>课程资料校准</h2>
                <span>{resolvedCourseMaterialCount} / {courseMaterialSources.length}</span>
              </div>
              <ul>
                {courseMaterialSources.map((source) => (
                  <li key={source.id}><span>{source.displayLabel}</span><b>{source.status === "pending" ? source.missingLabel : "已接入"}</b></li>
                ))}
              </ul>
              <p>{isWesternPrimary
                ? "教材与学校白皮已接入；当前任课教师复习范围、正式考试结构和主观题采分点仍待提供。"
                : "四类核心材料已有接入；任课教师原 9 页最终重点与主观题采分点仍待提供。"}</p>
            </section>
          </aside>
        </div>
      </div>
      <NurAgentDock
        surface="knowledge-point"
        courseSlug={course.slug}
        knowledgePointId={knowledgePoint.id}
      />
    </main>
  );
}
