import "server-only";

import { registeredCourses } from "@/content/courses";
import { materialCatalog } from "@/content/materials";
import { validateCourseDefinition } from "@/lib/course-validation";
import type {
  CourseBuildCoverage,
  CourseBuildIssue,
  CourseBuildPlan,
  CourseBuildProviderAssist,
  CourseBuildRequest,
  CourseBuildResult,
  CourseBuildSourceCoverage,
  CourseBuildStep,
  CourseDraft,
  KnownPackCourseBuildRequest,
  PrivateOverlayCourseBuildRequest,
  CourseBuildPrivateOverlayResult,
  OfficialPackBatchCompileResult,
  PrivateMaterialAnalysisRequest,
  PrivateMaterialAnalysisResult,
} from "@/types/course-builder";
import type {
  ContentStatus,
  CourseDefinition,
  QuestionKind,
  SourceAuthority,
} from "@/types/learning";
import {
  createBaselineCourseBuildPlan,
  getCourseBuildPack,
  type ResolvedCourseBuildPack,
} from "./packs";
import type { CourseBuilderProvider } from "./provider";
import {
  assertValidCourseBuildPlan,
  assertValidPrivateOverlayCourseBuildPlan,
} from "./plan-validation";
import { createDashScopeCourseBuilderProvider } from "./providers/dashscope";
import {
  countPrivateOverlayCharacters,
  digestPrivateOverlay,
  maximumPrivateOverlayCharacterCount,
  maximumPrivateOverlayExcerptCount,
} from "./private-overlay-contract";
import {
  compileOfficialCourseMaterialPack,
  createOfficialPackBatchCompileRequest,
} from "./official-pack";
import { assertValidPrivateMaterialAnalysisProviderPlan } from "./private-analysis-validation";

export class CourseBuildExecutionError extends Error {
  constructor(
    readonly code:
      | "authorization-invalid"
      | "authorization-consumed"
      | "private-overlay-rejected"
      | "provider-unavailable"
      | "provider-failed",
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "CourseBuildExecutionError";
  }
}

const consumedPrivateTransferAuthorizationIds = new Set<string>();

const sourceAuthorities: readonly SourceAuthority[] = [
  "publisher",
  "school",
  "teacher",
  "student",
  "nur-editorial",
  "clinical-authority",
];

const contentStatuses: readonly ContentStatus[] = [
  "pending",
  "demo",
  "available",
  "verified",
];

export function getConfiguredCourseBuilderProvider(): CourseBuilderProvider | null {
  const apiKey = process.env.DASHSCOPE_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  const providerId = process.env.NUR_COURSE_BUILDER_PROVIDER?.trim() || "dashscope";
  if (providerId !== "dashscope") {
    return null;
  }
  return createDashScopeCourseBuilderProvider(
    apiKey,
    process.env.NUR_COURSE_BUILDER_MODEL?.trim() || "qwen3.7-plus",
    process.env.DASHSCOPE_BASE_URL?.trim(),
  );
}

function compileCourse(
  pack: ResolvedCourseBuildPack,
  plan: CourseBuildPlan,
): CourseDefinition {
  const chapterPlanById = new Map(plan.chapterPlans.map((item) => [item.chapterId, item]));
  const pointPlanById = new Map(plan.knowledgePointPlans.map((item) => [
    item.knowledgePointId,
    item,
  ]));
  return {
    ...pack.course,
    title: plan.courseTitle,
    catalogLabel: plan.catalogLabel,
    description: plan.description,
    curriculumMode: plan.curriculumMode,
    chapters: pack.course.chapters.map((chapter) => ({
      ...chapter,
      focus: chapterPlanById.get(chapter.id)?.focus ?? chapter.focus,
    })),
    knowledgePoints: pack.course.knowledgePoints.map((point) => {
      const pointPlan = pointPlanById.get(point.id);
      return {
        ...point,
        note: pointPlan?.note ?? point.note,
        emphasis: pointPlan?.emphasis ?? point.emphasis,
      };
    }),
  };
}

function countByStatus(course: CourseDefinition): Readonly<Record<ContentStatus, number>> {
  return Object.fromEntries(contentStatuses.map((status) => [
    status,
    course.knowledgePoints.filter((point) => point.contentStatus === status).length,
  ])) as Readonly<Record<ContentStatus, number>>;
}

function buildCoverage(course: CourseDefinition): CourseBuildCoverage {
  const questionKinds = Array.from(new Set(course.assessmentItems.map((item) => item.questionKind)));
  return {
    chapterCount: course.chapters.length,
    knowledgePointCount: course.knowledgePoints.length,
    detailedLessonCount: course.knowledgePoints.filter((point) => point.lesson !== null).length,
    assessmentCount: course.assessmentItems.length,
    caseCount: course.cases.length,
    pendingAnswerCount: course.assessmentItems.filter((item) => item.answer.status === "missing").length,
    contentStatusCounts: countByStatus(course),
    assessmentKindCounts: questionKinds.map((kind) => ({
      kind: kind as QuestionKind,
      count: course.assessmentItems.filter((item) => item.questionKind === kind).length,
    })),
  };
}

function buildSourceCoverage(course: CourseDefinition): CourseBuildSourceCoverage {
  return {
    total: course.sources.length,
    verified: course.sources.filter((source) => source.status === "verified").length,
    available: course.sources.filter((source) => source.status === "available").length,
    pending: course.sources.filter((source) => source.status === "pending").length,
    byAuthority: sourceAuthorities.flatMap((authority) => {
      const count = course.sources.filter((source) => source.authority === authority).length;
      return count > 0 ? [{ authority, count }] : [];
    }),
  };
}

function buildIssues(
  course: CourseDefinition,
  providerAssist: CourseBuildProviderAssist,
  privateOverlay: CourseBuildPrivateOverlayResult | null,
  officialPackCompilation: OfficialPackBatchCompileResult,
): CourseBuildIssue[] {
  const validation = validateCourseDefinition(course, materialCatalog);
  const issues: CourseBuildIssue[] = validation.issues.map((issue, index) => ({
    id: `course-validation-${index + 1}`,
    severity: "blocking",
    code: "course-validation",
    path: issue.path,
    title: "课程数据未通过校验",
    detail: issue.message,
    sourceIds: [],
  }));

  officialPackCompilation.validation.issues.forEach((issue, index) => {
    issues.push({
      id: `official-pack-validation-${index + 1}`,
      severity: "blocking",
      code: "official-pack-validation",
      path: `officialMaterialPack.${issue.path}`,
      title: "官方材料包未通过校验",
      detail: issue.message,
      sourceIds: [],
    });
  });

  course.sources.filter((source) => source.status === "pending").forEach((source) => {
    issues.push({
      id: `pending-source-${source.id}`,
      severity: "review",
      code: source.type === "grading-rubric"
        ? "teacher-authority-gap"
        : "pending-source",
      path: `sources.${source.id}`,
      title: source.type === "grading-rubric" ? "教师评分标准仍缺失" : `${source.displayLabel}待导入`,
      detail: source.missingLabel,
      sourceIds: [source.id],
    });
  });

  const missingLessonCount = course.knowledgePoints.filter((point) => point.lesson === null).length;
  if (missingLessonCount > 0) {
    issues.push({
      id: "lesson-coverage-gap",
      severity: "review",
      code: "lesson-coverage",
      path: "knowledgePoints.lesson",
      title: `${missingLessonCount} 个知识点尚无深层学习闭环`,
      detail: "课程目录可以完整输出，但缺少可定位证据的知识点必须继续保持演示或待确认，不能由模型补写为来源事实。",
      sourceIds: [],
    });
  }

  const pendingAnswerItems = course.assessmentItems.filter((item) => item.answer.status === "missing");
  if (pendingAnswerItems.length > 0) {
    issues.push({
      id: "assessment-answer-gap",
      severity: "review",
      code: "answer-gap",
      path: "assessmentItems.answer",
      title: `${pendingAnswerItems.length} 道来源原题缺少可核答案`,
      detail: "保留题干和来源定位，但不得显示模型推测的标准答案。",
      sourceIds: pendingAnswerItems.flatMap((item) => item.sourceIds),
    });
  }

  if (providerAssist.status === "failed") {
    issues.push({
      id: "provider-fallback",
      severity: "notice",
      code: "provider-fallback",
      path: "providerAssist",
      title: "云端规划失败，已回退到本地基准",
      detail: "课程校验、来源边界和人工审核仍可继续，本次没有伪造模型结果。",
      sourceIds: [],
    });
  }

  if (privateOverlay) {
    const useCount = privateOverlay.decisions.filter((decision) => (
      decision.disposition === "use"
    )).length;
    const reviewCount = privateOverlay.decisions.filter((decision) => (
      decision.disposition === "review"
    )).length;
    const excludeCount = privateOverlay.decisions.filter((decision) => (
      decision.disposition === "exclude"
    )).length;
    issues.push({
      id: "private-overlay-authority-review",
      severity: "review",
      code: "private-overlay-review",
      path: "privateOverlay.authorityReviewStatus",
      title: "私人摘录仍需人工权威复核",
      detail: `${useCount} 条建议使用、${reviewCount} 条建议待审、${excludeCount} 条建议排除；全部仍为 learner-private / pending-review，不进入官方发布。`,
      sourceIds: [],
    });
  }

  return issues;
}

function buildSteps(
  course: CourseDefinition,
  providerAssist: CourseBuildProviderAssist,
  issues: readonly CourseBuildIssue[],
  privateOverlay: CourseBuildPrivateOverlayResult | null,
): CourseBuildStep[] {
  const pendingSourceCount = course.sources.filter((source) => source.status === "pending").length;
  const blockingCount = issues.filter((issue) => issue.severity === "blocking").length;
  return [
    {
      id: "resolve-materials",
      order: 1,
      label: "解析材料包",
      status: "completed",
      summary: privateOverlay
        ? `已绑定 ${course.sources.length} 条官方来源与 ${privateOverlay.excerptCount} 条获准私人摘录；原始 DOCX 未进入请求。`
        : `已解析 ${course.sources.length} 条来源记录，原件未进入浏览器静态资源。`,
    },
    {
      id: "separate-authority",
      order: 2,
      label: "分离来源权威",
      status: pendingSourceCount > 0 ? "attention" : "completed",
      summary: pendingSourceCount > 0
        ? `${pendingSourceCount} 条来源保持待确认，未参与事实升级。`
        : "全部来源均具有明确状态与权威范围。",
    },
    {
      id: "plan-course",
      order: 3,
      label: "规划课程结构",
      status: providerAssist.status === "failed" ? "attention" : "completed",
      summary: providerAssist.notice,
    },
    {
      id: "compile-draft",
      order: 4,
      label: "编译 typed draft",
      status: "completed",
      summary: `已生成 ${course.chapters.length} 章、${course.knowledgePoints.length} 个知识点的完整课程数据。`,
    },
    {
      id: "validate-draft",
      order: 5,
      label: "执行确定性校验",
      status: blockingCount > 0 ? "failed" : issues.length > 0 ? "attention" : "completed",
      summary: blockingCount > 0
        ? `${blockingCount} 项阻断问题需要修复。`
        : "类型、引用、顺序、考试总分与权威边界已通过硬校验；内容缺口交给人工审核。",
    },
  ];
}

async function createPlan(
  request: KnownPackCourseBuildRequest,
  pack: ResolvedCourseBuildPack,
  provider: CourseBuilderProvider | null,
): Promise<{ plan: CourseBuildPlan; providerAssist: CourseBuildProviderAssist }> {
  const baselinePlan = createBaselineCourseBuildPlan(pack);
  assertValidCourseBuildPlan(baselinePlan, pack);

  if (request.mode === "baseline-only") {
    return {
      plan: baselinePlan,
      providerAssist: {
        status: "skipped",
        provider: provider ? { id: provider.id, model: provider.model } : null,
        notice: "本次按用户选择跳过云端模型，使用可复现的已核对基准计划。",
      },
    };
  }
  if (!provider) {
    return {
      plan: baselinePlan,
      providerAssist: {
        status: "not-configured",
        provider: null,
        notice: "DashScope 尚未配置；本次使用可复现的已核对基准计划，未声称产生 Qwen 结果。",
      },
    };
  }

  const providerIdentity = { id: provider.id, model: provider.model };
  try {
    const providerPlan = await provider.createPlan(pack, baselinePlan);
    assertValidCourseBuildPlan(providerPlan, pack);
    return {
      plan: providerPlan,
      providerAssist: {
        status: "used",
        provider: providerIdentity,
        notice: "Qwen 只规划允许字段；来源状态、课程引用和发布资格仍由 NUR 本地校验器决定。",
      },
    };
  } catch {
    return {
      plan: baselinePlan,
      providerAssist: {
        status: "failed",
        provider: providerIdentity,
        notice: "Qwen 本次规划未通过 provider 或本地边界校验，已自动使用已核对基准计划。",
      },
    };
  }
}

async function assertPrivateOverlayBoundary(
  request: PrivateOverlayCourseBuildRequest,
  pack: ResolvedCourseBuildPack,
  provider: CourseBuilderProvider | null,
): Promise<void> {
  const { privateOverlay, authorization } = request;
  const characterCount = countPrivateOverlayCharacters(privateOverlay);
  const excerptIds = privateOverlay.excerpts.map((excerpt) => excerpt.id);
  const locatorIndexes = privateOverlay.excerpts.map((excerpt) => (
    excerpt.locator.blockIndex
  ));

  if (privateOverlay.courseId !== pack.course.id
    || !pack.course.knowledgePoints.some((point) => (
      point.id === privateOverlay.knowledgePointId
    ))
    || privateOverlay.source.layer !== "learner-private"
    || privateOverlay.source.authorityReviewStatus !== "pending-review"
    || privateOverlay.privacy.declaration !== "none-observed"
    || privateOverlay.privacy.risk !== "none-observed"
  ) {
    throw new CourseBuildExecutionError(
      "private-overlay-rejected",
      "私人摘录的课程、知识点、隐私或权威边界未通过校验。",
      400,
    );
  }
  if (privateOverlay.excerpts.length > maximumPrivateOverlayExcerptCount
    || characterCount > maximumPrivateOverlayCharacterCount
    || new Set(excerptIds).size !== excerptIds.length
    || new Set(locatorIndexes).size !== locatorIndexes.length
  ) {
    throw new CourseBuildExecutionError(
      "private-overlay-rejected",
      "私人摘录超出数量/字符边界，或包含重复 ID。",
      413,
    );
  }

  const digest = await digestPrivateOverlay(privateOverlay);
  if (authorization.overlayId !== privateOverlay.overlayId
    || authorization.courseId !== privateOverlay.courseId
    || authorization.knowledgePointId !== privateOverlay.knowledgePointId
    || authorization.excerptCount !== privateOverlay.excerpts.length
    || authorization.characterCount !== characterCount
    || authorization.contentDigest !== digest
    || authorization.provider !== "dashscope"
    || (provider !== null
      && (provider.id !== authorization.provider || provider.model !== authorization.model))
  ) {
    throw new CourseBuildExecutionError(
      "authorization-invalid",
      "一次性授权与当前摘录、目标或 provider/model 不再匹配，请重新检查并授权。",
      409,
    );
  }
}

function consumePrivateTransferAuthorization(authorizationId: string): void {
  if (consumedPrivateTransferAuthorizationIds.has(authorizationId)) {
    throw new CourseBuildExecutionError(
      "authorization-consumed",
      "这次传输授权已经消费；再次发送前必须重新确认。",
      409,
    );
  }
  consumedPrivateTransferAuthorizationIds.add(authorizationId);
}

async function assertPrivateMaterialAnalysisBoundary(
  request: PrivateMaterialAnalysisRequest,
  provider: CourseBuilderProvider | null,
): Promise<{
  courseTitle: string;
  knowledgePointTitle: string;
}> {
  const { privateOverlay, authorization } = request;
  const course = registeredCourses.find((candidate) => candidate.id === privateOverlay.courseId);
  const knowledgePoint = course?.knowledgePoints.find((candidate) => (
    candidate.id === privateOverlay.knowledgePointId
  ));
  const characterCount = countPrivateOverlayCharacters(privateOverlay);
  const excerptIds = privateOverlay.excerpts.map((excerpt) => excerpt.id);
  const locatorIndexes = privateOverlay.excerpts.map((excerpt) => (
    excerpt.locator.blockIndex
  ));

  if (!course
    || !knowledgePoint
    || privateOverlay.source.layer !== "learner-private"
    || privateOverlay.source.authorityReviewStatus !== "pending-review"
    || privateOverlay.privacy.declaration !== "none-observed"
    || privateOverlay.privacy.risk !== "none-observed"
  ) {
    throw new CourseBuildExecutionError(
      "private-overlay-rejected",
      "私人材料的课程目标、隐私或 learner-private 权威边界未通过校验。",
      400,
    );
  }
  if (privateOverlay.excerpts.length > maximumPrivateOverlayExcerptCount
    || characterCount > maximumPrivateOverlayCharacterCount
    || new Set(excerptIds).size !== excerptIds.length
    || new Set(locatorIndexes).size !== locatorIndexes.length
  ) {
    throw new CourseBuildExecutionError(
      "private-overlay-rejected",
      "私人材料超出 80 条 / 40,000 字符边界，或包含重复 ID / locator。",
      413,
    );
  }

  const digest = await digestPrivateOverlay(privateOverlay);
  if (authorization.overlayId !== privateOverlay.overlayId
    || authorization.courseId !== privateOverlay.courseId
    || authorization.knowledgePointId !== privateOverlay.knowledgePointId
    || authorization.excerptCount !== privateOverlay.excerpts.length
    || authorization.characterCount !== characterCount
    || authorization.contentDigest !== digest
    || authorization.provider !== "dashscope"
    || (provider !== null
      && (provider.id !== authorization.provider || provider.model !== authorization.model))
  ) {
    throw new CourseBuildExecutionError(
      "authorization-invalid",
      "一次性分析授权与当前摘录、目标或 provider/model 不再匹配，请重新检查并授权。",
      409,
    );
  }

  return {
    courseTitle: course.title,
    knowledgePointTitle: knowledgePoint.title,
  };
}

export async function runPrivateMaterialAnalysis(
  request: PrivateMaterialAnalysisRequest,
  provider: CourseBuilderProvider | null,
): Promise<PrivateMaterialAnalysisResult> {
  const target = await assertPrivateMaterialAnalysisBoundary(request, provider);
  consumePrivateTransferAuthorization(request.authorization.id);

  if (!provider) {
    throw new CourseBuildExecutionError(
      "provider-unavailable",
      "私人材料分析需要真实 Qwen provider；本次授权已消费，没有回退或伪造分析结果。",
      503,
    );
  }

  let plan;
  try {
    plan = await provider.analyzePrivateMaterial(request.privateOverlay, target);
    assertValidPrivateMaterialAnalysisProviderPlan(plan, request.privateOverlay);
  } catch (error) {
    const failureDetail = error instanceof Error
      ? error.message
      : "unknown provider validation failure";
    throw new CourseBuildExecutionError(
      "provider-failed",
      `Qwen 本次私人材料分析失败或输出未通过严格校验（${failureDetail}）；本次授权已消费，重新分析前需再次授权。`,
      502,
    );
  }

  const excerptById = new Map(request.privateOverlay.excerpts.map((excerpt) => [
    excerpt.id,
    excerpt,
  ]));
  const mappedExcerptIds = plan.questions.flatMap((question) => question.sourceExcerptIds);
  const coverageStatus = plan.questions.length === 0 ? "unmapped" : "partial";
  const learningUnitId = `private-learning-unit-${globalThis.crypto.randomUUID()}`;
  const missingFacts = Array.from(new Set([
    ...plan.missingFacts,
    "来源标准答案与当前评分权威仍需人工确认。",
  ]));

  return {
    version: 1,
    status: "private-material-analysis",
    analysisId: `private-analysis-result-${globalThis.crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    providerAssist: {
      status: "used",
      provider: { id: provider.id, model: provider.model },
      notice: "Qwen 已真实完成私人材料拆解；ID、locator、权威、权限和覆盖降级由 NUR 确定性代码重新校验。",
    },
    authorizationId: request.authorization.id,
    overlayId: request.privateOverlay.overlayId,
    contentDigest: request.authorization.contentDigest,
    excerptCount: request.privateOverlay.excerpts.length,
    characterCount: countPrivateOverlayCharacters(request.privateOverlay),
    coverage: {
      status: coverageStatus,
      compilationReadiness: "insufficient-for-full-course",
      summary: plan.coverage.summary,
      mappedExcerptCount: mappedExcerptIds.length,
      unmappedExcerptCount: plan.unmapped.length,
    },
    learningUnit: {
      version: 1,
      kind: "private-material-learning-unit",
      id: learningUnitId,
      title: `${target.knowledgePointTitle} · 私人导入单元`,
      courseId: request.privateOverlay.courseId,
      courseTitle: target.courseTitle,
      knowledgePointId: request.privateOverlay.knowledgePointId,
      knowledgePointTitle: target.knowledgePointTitle,
      visibility: "private-current-session",
      coverageStatus,
      topics: plan.topics,
      questions: plan.questions.map((question) => ({
        id: question.id,
        topicId: question.topicId,
        sourceExcerptIds: question.sourceExcerptIds,
        sourceLocators: question.sourceExcerptIds.map((excerptId) => {
          const excerpt = excerptById.get(excerptId);
          if (!excerpt) {
            throw new CourseBuildExecutionError(
              "private-overlay-rejected",
              "分析结果引用了未知私人摘录。",
              502,
            );
          }
          return {
            excerptId,
            sectionTitle: excerpt.sectionTitle,
            label: excerpt.locator.label,
            blockIndex: excerpt.locator.blockIndex,
          };
        }),
        normalizedPrompt: question.normalizedPrompt,
        questionKind: question.questionKind,
        promptAuthority: {
          layer: "learner-private",
          status: "pending-review",
        },
        sourceAnswerStatus: question.sourceAnswerStatus,
        generatedReferenceAnswer: {
          label: "NUR / Qwen 生成参考答案 · 尚无来源标准答案",
          authority: "nur-qwen-generated",
          confidence: "generated-pending-review",
          variants: {
            concise: question.answerDraft.structurePoints.join("；"),
            exam: question.answerDraft.referenceAnswer,
            expanded: `${question.answerDraft.referenceAnswer}\n\n作答结构：\n${question.answerDraft.structurePoints.map((point, index) => `${index + 1}. ${point}`).join("\n")}`,
          },
          structurePoints: question.answerDraft.structurePoints,
          uncertaintyNote: question.answerDraft.uncertaintyNote,
        },
        scoringAuthority: "not-provided",
      })),
      unmapped: plan.unmapped,
      conflicts: plan.conflicts.map((conflict) => ({
        ...conflict,
        status: "pending-review",
      })),
      missingFacts,
      rights: {
        publication: "not-authorized",
        materialCatalogMutation: "not-authorized",
        courseRegistryMutation: "not-authorized",
        officialCourseCompilation: "not-authorized",
      },
    },
    authorityNotice: "这是 learner-private / pending-review 私人分析结果。Qwen 参考答案不是学校、教材或教师标准答案，也不包含教师 rubric 或当前采分点。",
    dataHandlingNotice: `本次只发送 ${request.privateOverlay.excerpts.length} 条、${countPrivateOverlayCharacters(request.privateOverlay).toLocaleString("zh-CN")} 字符的获准摘录及其 ID/locator/固定目标；未发送原始文件、文件名、路径、File handle、完整 SHA、未接纳正文、图片原件或 API Key。`,
  };
}

function buildDraftResult(
  pack: ResolvedCourseBuildPack,
  plan: CourseBuildPlan,
  providerAssist: CourseBuildProviderAssist,
  privateOverlay: CourseBuildPrivateOverlayResult | null,
): CourseBuildResult {
  const course = compileCourse(pack, plan);
  const officialPackCompilation = compileOfficialCourseMaterialPack(
    createOfficialPackBatchCompileRequest(pack.officialMaterialPack),
    pack.officialMaterialPack,
    course,
    materialCatalog,
  );
  const issues = buildIssues(
    course,
    providerAssist,
    privateOverlay,
    officialPackCompilation,
  );
  const blockingIssueCount = issues.filter((issue) => issue.severity === "blocking").length;
  const reviewIssueCount = issues.filter((issue) => issue.severity === "review").length;
  const noticeIssueCount = issues.filter((issue) => issue.severity === "notice").length;
  const hasSourceGaps = issues.some((issue) => issue.severity === "review");
  const isPrivateDraft = privateOverlay !== null;
  const draft: CourseDraft = {
    version: 1,
    id: `course-draft-${globalThis.crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    materialPack: pack.summary,
    providerAssist,
    draftKind: isPrivateDraft ? "private-course-draft" : "official-base",
    privateOverlay,
    officialPackCompilation,
    status: blockingIssueCount > 0 ? "blocked" : "ready-for-review",
    publicationReadiness: blockingIssueCount > 0
      ? "invalid"
      : hasSourceGaps ? "source-gaps" : "preview-ready",
    plan,
    course,
    steps: buildSteps(course, providerAssist, issues, privateOverlay),
    coverage: buildCoverage(course),
    sourceCoverage: buildSourceCoverage(course),
    issues,
    validation: {
      valid: blockingIssueCount === 0,
      blockingIssueCount,
      reviewIssueCount,
      noticeIssueCount,
    },
    authorityNotice: isPrivateDraft
      ? "这是 learner-private / pending-review 私人课程草稿。模型的 use/review/exclude 只是描述性规划，不能升级来源、答案、教师评分或发布状态。"
      : "模型只提出课程计划；来源权威、考试结构、答案状态和发布资格由 NUR 硬校验及人工批准决定。",
    dataHandlingNotice: isPrivateDraft
      ? `本次真实使用 DashScope 处理 ${privateOverlay.excerptCount} 条、${privateOverlay.characterCount.toLocaleString("zh-CN")} 字符的获准摘录；未发送原始 DOCX、文件名、路径、File handle、完整 SHA、待审/排除块、图片/OCR 原件、API Key 或无关课程/个人元数据。`
      : providerAssist.status === "used" || providerAssist.status === "failed"
        ? "本次向已配置的 DashScope 服务发送了结构化课程与来源元数据；未发送原始文件二进制、学习者记录或服务端密钥。"
        : "本次只使用仓库内已核对的结构化课程与来源数据，没有向外部模型发送内容。",
  };

  return { version: 1, status: "course-draft", draft };
}

async function runPrivateOverlayBuild(
  request: PrivateOverlayCourseBuildRequest,
  pack: ResolvedCourseBuildPack,
  provider: CourseBuilderProvider | null,
): Promise<CourseBuildResult> {
  const baselinePlan = createBaselineCourseBuildPlan(pack);
  assertValidCourseBuildPlan(baselinePlan, pack);
  await assertPrivateOverlayBoundary(request, pack, provider);
  consumePrivateTransferAuthorization(request.authorization.id);

  if (!provider) {
    throw new CourseBuildExecutionError(
      "provider-unavailable",
      "私人摘录只能使用真实 provider；DashScope 当前不可用，本次没有回退或假装使用摘录。",
      503,
    );
  }

  let privatePlan;
  try {
    privatePlan = await provider.createPrivateOverlayPlan(pack, request.privateOverlay);
    assertValidPrivateOverlayCourseBuildPlan(privatePlan, request.privateOverlay);
  } catch {
    throw new CourseBuildExecutionError(
      "provider-failed",
      "Qwen 本次私人摘录规划失败或未通过本地严格校验；没有回退到官方基准，重新发送前需再次授权。",
      502,
    );
  }

  const privateOverlay: CourseBuildPrivateOverlayResult = {
    overlayId: request.privateOverlay.overlayId,
    courseId: request.privateOverlay.courseId,
    knowledgePointId: request.privateOverlay.knowledgePointId,
    sourceType: request.privateOverlay.source.sourceType,
    declaredAuthority: request.privateOverlay.source.declaredAuthority,
    layer: "learner-private",
    authorityReviewStatus: "pending-review",
    excerptCount: request.privateOverlay.excerpts.length,
    characterCount: countPrivateOverlayCharacters(request.privateOverlay),
    authorizationId: request.authorization.id,
    decisions: privatePlan.decisions,
  };
  return buildDraftResult(
    pack,
    baselinePlan,
    {
      status: "used",
      provider: { id: provider.id, model: provider.model },
      notice: `Qwen 已真实逐条规划 ${privateOverlay.excerptCount} 条私人摘录；课程真相、权威与发布状态仍由本地校验和人工批准决定。`,
    },
    privateOverlay,
  );
}

export async function runCourseBuild(
  request: CourseBuildRequest,
  provider: CourseBuilderProvider | null,
): Promise<CourseBuildResult | null> {
  const packId = request.version === 1
    ? request.materialPackId
    : request.baseMaterialPackId;
  const pack = getCourseBuildPack(packId);
  if (!pack) {
    return null;
  }

  if (request.version === 2) {
    return runPrivateOverlayBuild(request, pack, provider);
  }

  const { plan, providerAssist } = await createPlan(request, pack, provider);
  return buildDraftResult(pack, plan, providerAssist, null);
}
