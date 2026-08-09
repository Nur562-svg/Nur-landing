import "server-only";

import type {
  CourseBuildPlan,
  CourseBuildPrivateOverlayInput,
  CourseBuildPrivateOverlayPlan,
  PrivateMaterialAnalysisProviderPlan,
} from "@/types/course-builder";
import type { ResolvedCourseBuildPack } from "../packs";
import {
  CourseBuilderProviderError,
  type CourseBuilderProvider,
} from "../provider";
import {
  assertValidPrivateOverlayCourseBuildPlan,
  parseCourseBuildPlan,
  parsePrivateOverlayCourseBuildPlan,
} from "../plan-validation";
import {
  assertValidPrivateMaterialAnalysisProviderPlan,
  normalizePrivateMaterialAnalysisProviderPlan,
  parsePrivateMaterialAnalysisProviderPlan,
} from "../private-analysis-validation";

const defaultDashScopeBaseUrl =
  "https://dashscope.aliyuncs.com/compatible-mode/v1";

function resolveChatCompletionsUrl(baseUrl: string): string {
  const url = new URL(baseUrl);
  if (url.protocol !== "https:"
    || (url.hostname !== "dashscope.aliyuncs.com"
      && !url.hostname.endsWith(".aliyuncs.com"))
  ) {
    throw new CourseBuilderProviderError(
      "DashScope base URL must use HTTPS on an aliyuncs.com host",
    );
  }
  const path = url.pathname.replace(/\/+$/, "");
  url.pathname = path.endsWith("/chat/completions")
    ? path
    : `${path}/chat/completions`;
  url.search = "";
  url.hash = "";
  return url.toString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function extractOutputText(value: unknown): string {
  if (!isRecord(value) || !Array.isArray(value.choices)) {
    throw new CourseBuilderProviderError("DashScope response did not contain choices");
  }
  const firstChoice = value.choices[0];
  if (!isRecord(firstChoice)
    || !isRecord(firstChoice.message)
    || typeof firstChoice.message.content !== "string"
  ) {
    throw new CourseBuilderProviderError("DashScope response did not contain plan text");
  }
  return firstChoice.message.content;
}

function extractToolArguments(value: unknown, expectedToolName: string): string {
  if (!isRecord(value) || !Array.isArray(value.choices)) {
    throw new CourseBuilderProviderError("DashScope response did not contain choices");
  }
  const firstChoice = value.choices[0];
  if (!isRecord(firstChoice)
    || !isRecord(firstChoice.message)
    || !Array.isArray(firstChoice.message.tool_calls)
    || firstChoice.message.tool_calls.length !== 1
  ) {
    throw new CourseBuilderProviderError("DashScope response did not contain the required analysis tool call");
  }
  const toolCall = firstChoice.message.tool_calls[0];
  if (!isRecord(toolCall)
    || !isRecord(toolCall.function)
    || toolCall.function.name !== expectedToolName
    || typeof toolCall.function.arguments !== "string"
  ) {
    throw new CourseBuilderProviderError("DashScope returned an invalid analysis tool call");
  }
  return toolCall.function.arguments;
}

function parseJsonObjectText(outputText: string): unknown {
  const trimmed = outputText.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    if (firstBrace < 0 || lastBrace <= firstBrace) {
      throw new CourseBuilderProviderError(
        `DashScope returned incomplete JSON (${trimmed.length} characters)`,
      );
    }
    try {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    } catch {
      throw new CourseBuilderProviderError(
        `DashScope returned malformed JSON (${trimmed.length} characters)`,
      );
    }
  }
}

function buildPlanningContext(
  pack: ResolvedCourseBuildPack,
  baselinePlan: CourseBuildPlan,
) {
  const { course } = pack;
  return {
    materialPack: pack.summary,
    courseIdentity: {
      id: course.id,
      slug: course.slug,
      title: course.title,
      classification: course.classification,
      curriculumMode: course.curriculumMode,
      version: course.version,
      examBlueprint: course.examBlueprint,
    },
    sources: course.sources.map((source) => ({
      id: source.id,
      displayLabel: source.displayLabel,
      role: source.role,
      type: source.type,
      authority: source.authority,
      scope: source.scope,
      status: source.status,
      citation: source.citation,
      missingLabel: source.missingLabel,
    })),
    chapters: course.chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      focus: chapter.focus,
      knowledgePoints: chapter.knowledgePointIds.map((knowledgePointId) => {
        const point = course.knowledgePoints.find((candidate) => (
          candidate.id === knowledgePointId
        ));
        return point ? {
          id: point.id,
          title: point.title,
          note: point.note,
          emphasis: point.emphasis,
          contentStatus: point.contentStatus,
          sourceIds: point.sourceIds,
          hasDetailedLesson: point.lesson !== null,
        } : null;
      }).filter((point) => point !== null),
    })),
    assessmentInventory: course.assessmentItems.map((item) => ({
      id: item.id,
      knowledgePointId: item.knowledgePointId,
      questionKind: item.questionKind,
      status: item.status,
      promptAuthority: item.promptSource.authority,
      answerStatus: item.answer.status,
      scoringAuthority: item.scoring?.authority ?? null,
      sourceIds: item.sourceIds,
    })),
    caseInventory: course.cases.map((item) => ({
      id: item.id,
      knowledgePointIds: item.knowledgePointIds,
      status: item.status,
      promptAuthority: item.promptSource.authority,
      scoringAuthority: item.scoring.authority,
      sourceIds: item.sourceIds,
    })),
    requiredOutputTemplate: baselinePlan,
  };
}

function buildPrompt(
  pack: ResolvedCourseBuildPack,
  baselinePlan: CourseBuildPlan,
): string {
  return [
    "你是 NUR LEARN Course Builder 的受限课程规划器。你只能在已经声明的课程、章节、知识点和来源 ID 内整理课程计划。",
    "不得新增来源、页码、教师重点、答案、评分标准或医学事实。pending 来源必须标为 review 或 exclude，不能标为 use。不得改变 curriculumMode。",
    "必须保留每个 chapterId、knowledgePointId、sourceId，且各出现一次。priorityKnowledgePointIds 只能引用已知知识点。",
    "请返回一个 JSON 对象，字段和 requiredOutputTemplate 完全一致。不要返回 Markdown、解释或代码围栏。",
    `只读构建上下文：${JSON.stringify(buildPlanningContext(pack, baselinePlan))}`,
  ].join("\n\n");
}

function buildPrivateOverlayPrompt(
  pack: ResolvedCourseBuildPack,
  overlay: CourseBuildPrivateOverlayInput,
): string {
  const knowledgePoint = pack.course.knowledgePoints.find((point) => (
    point.id === overlay.knowledgePointId
  ));
  const outputTemplate: CourseBuildPrivateOverlayPlan = {
    version: 1,
    overlayId: overlay.overlayId,
    courseId: overlay.courseId,
    knowledgePointId: overlay.knowledgePointId,
    decisions: overlay.excerpts.map((excerpt) => ({
      excerptId: excerpt.id,
      disposition: "review",
      learningUse: "说明这条摘录在固定知识点学习中的描述性用途。",
      reviewNote: "说明为何需要继续人工核对；不得补造课程事实或答案。",
    })),
  };
  const context = {
    target: {
      courseId: pack.course.id,
      courseTitle: pack.course.title,
      knowledgePointId: overlay.knowledgePointId,
      knowledgePointTitle: knowledgePoint?.title ?? "待确认知识点",
    },
    sourceBoundary: overlay.source,
    excerpts: overlay.excerpts.map((excerpt) => ({
      id: excerpt.id,
      locator: excerpt.locator,
      sectionId: excerpt.sectionId,
      sectionTitle: excerpt.sectionTitle,
      kind: excerpt.kind,
      text: excerpt.text,
    })),
    requiredOutputTemplate: outputTemplate,
  };
  return [
    "你是 NUR LEARN 的受限私人摘录规划器。只能逐条判断已知 excerptId 为 use、review 或 exclude，并说明固定知识点中的描述性学习用途与人工审核提示。",
    "不得新增或修改 overlayId、courseId、knowledgePointId、excerptId；不得生成来源、页码、答案、教师重点、评分标准、课程事实或发布状态。learner-private 与 pending-review 永远不能升级。",
    "每个已知 excerptId 必须且只能出现一次。请返回字段与 requiredOutputTemplate 完全一致的 JSON 对象，不要返回 Markdown、解释或代码围栏。",
    `最小传输上下文：${JSON.stringify(context)}`,
  ].join("\n\n");
}

function buildPrivateMaterialAnalysisPrompt(
  overlay: CourseBuildPrivateOverlayInput,
  target: { courseTitle: string; knowledgePointTitle: string },
): string {
  const requiredOutputShape: PrivateMaterialAnalysisProviderPlan = {
    version: 1,
    overlayId: overlay.overlayId,
    courseId: overlay.courseId,
    knowledgePointId: overlay.knowledgePointId,
    coverage: {
      status: "partial",
      compilationReadiness: "insufficient-for-full-course",
      summary: "说明这些私人材料目前能支持什么学习，以及为什么不能据此声称完整课程覆盖。",
    },
    topics: [{
      id: "topic-001",
      label: "候选主题",
      rationale: "说明分组依据，不声称这是官方章节。",
      excerptIds: [overlay.excerpts[0]?.id ?? "excerpt-id"],
    }],
    questions: [{
      id: "question-001",
      topicId: "topic-001",
      sourceExcerptIds: [overlay.excerpts[0]?.id ?? "excerpt-id"],
      normalizedPrompt: "标准化后的主观题题干",
      questionKind: "short-answer",
      sourceAnswerStatus: "missing",
      answerDraft: {
        referenceAnswer: "结构完整、适合考试书写的参考答案草稿",
        structurePoints: ["结构要点"],
        uncertaintyNote: "指出缺失来源答案、评分标准或需人工核对之处。",
      },
    }],
    unmapped: [],
    conflicts: [],
    missingFacts: ["来源标准答案与当前教师评分标准待提供"],
  };
  const context = {
    target: {
      courseId: overlay.courseId,
      courseTitle: target.courseTitle,
      knowledgePointId: overlay.knowledgePointId,
      knowledgePointTitle: target.knowledgePointTitle,
      targetAuthority: "declared-target-only",
    },
    sourceBoundary: overlay.source,
    privacyBoundary: overlay.privacy,
    excerpts: overlay.excerpts.map((excerpt) => ({
      id: excerpt.id,
      locator: excerpt.locator,
      sectionId: excerpt.sectionId,
      sectionTitle: excerpt.sectionTitle,
      kind: excerpt.kind,
      text: excerpt.text,
    })),
    requiredOutputShape,
  };
  return [
    "你是 NUR LEARN 的受限私人材料分析器。请把已明确授权的摘录标准化、去重、分组为候选主题与主观题，并为每道去重后的题生成一份结构完整、适合考试书写的 NUR/Qwen 参考答案草稿。",
    "每个输入 excerptId 必须且只能进入一个 question.sourceExcerptIds 或 unmapped；去重题可合并多个 excerptId。每个已映射 excerptId 还必须且只能进入一个 topic.excerptIds。不得新增未知 excerptId。",
    "topic 只是私人候选分组，不是官方章节。不得修改 courseId、knowledgePointId、overlayId，不得创建学校答案、教材标准答案、教师 rubric、当前教师采分点、来源页码、课程发布状态或其他权威升级。",
    "若摘录只有题干，sourceAnswerStatus 必须为 missing。即使摘录疑似同时包含答案，也只能标 candidate-present-pending-review。所有 answerDraft 都只是生成草稿，不能在文本中冒充来源答案。",
    "纯文档标题、章节标题或不能独立成为题目的摘录应进入 unmapped，不得为它生成问题或参考答案。每道 referenceAnswer 控制在 60–180 个中文字符，structurePoints 只保留 3–5 个短要点，以确保 20 题场景返回完整 JSON。",
    "嵌套项也必须严格遵循这些字段：coverage={status,compilationReadiness,summary}；topic={id,label,rationale,excerptIds}；question={id,topicId,sourceExcerptIds,normalizedPrompt,questionKind,sourceAnswerStatus,answerDraft}；answerDraft={referenceAnswer,structurePoints,uncertaintyNote}；unmapped 项={excerptId,reason}；conflict 项={excerptIds,description}；missingFacts 只能是字符串数组。不得给任何对象增加 title、text、status、confidence 等额外字段。",
    "coverage 有可学习题目时默认 partial / insufficient-for-full-course；没有任何可可靠映射的题目时才使用 unmapped。材料不足是结果，不是失败。",
    "referenceAnswer 应紧扣题干、控制在必要长度，避免重复扩写；structurePoints 提供可用于本地精简/展开视图的结构。所有根字段和嵌套字段必须与 requiredOutputShape 完全一致；可增加数组项目但不可增加字段。只返回 JSON，不要 Markdown、解释或代码围栏。",
    `最小传输上下文：${JSON.stringify(context)}`,
  ].join("\n\n");
}

function buildPrivateMaterialAnalysisSchema(
  overlay: CourseBuildPrivateOverlayInput,
): Record<string, unknown> {
  const excerptIds = overlay.excerpts.map((excerpt) => excerpt.id);
  const idSchema = {
    type: "string",
    pattern: "^[A-Za-z0-9][A-Za-z0-9._:-]{0,179}$",
  };
  const excerptIdSchema = {
    type: "string",
    enum: excerptIds,
  };
  return {
    type: "object",
    additionalProperties: false,
    required: [
      "version",
      "overlayId",
      "courseId",
      "knowledgePointId",
      "coverage",
      "topics",
      "questions",
      "unmapped",
      "conflicts",
      "missingFacts",
    ],
    properties: {
      version: { type: "integer", enum: [1] },
      overlayId: { type: "string", enum: [overlay.overlayId] },
      courseId: { type: "string", enum: [overlay.courseId] },
      knowledgePointId: { type: "string", enum: [overlay.knowledgePointId] },
      coverage: {
        type: "object",
        additionalProperties: false,
        required: ["status", "compilationReadiness", "summary"],
        properties: {
          status: {
            type: "string",
            enum: ["partial", "ready-for-compilation", "unmapped"],
          },
          compilationReadiness: {
            type: "string",
            enum: [
              "insufficient-for-full-course",
              "candidate-ready-for-optional-compilation",
            ],
          },
          summary: { type: "string", minLength: 1, maxLength: 800 },
        },
      },
      topics: {
        type: "array",
        maxItems: 40,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "label", "rationale", "excerptIds"],
          properties: {
            id: idSchema,
            label: { type: "string", minLength: 1, maxLength: 160 },
            rationale: { type: "string", minLength: 1, maxLength: 600 },
            excerptIds: {
              type: "array",
              minItems: 1,
              maxItems: 80,
              uniqueItems: true,
              items: excerptIdSchema,
            },
          },
        },
      },
      questions: {
        type: "array",
        maxItems: 80,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "id",
            "topicId",
            "sourceExcerptIds",
            "normalizedPrompt",
            "questionKind",
            "sourceAnswerStatus",
            "answerDraft",
          ],
          properties: {
            id: idSchema,
            topicId: idSchema,
            sourceExcerptIds: {
              type: "array",
              minItems: 1,
              maxItems: 80,
              uniqueItems: true,
              items: excerptIdSchema,
            },
            normalizedPrompt: { type: "string", minLength: 1, maxLength: 800 },
            questionKind: {
              type: "string",
              enum: ["short-answer", "term-explanation", "other-subjective"],
            },
            sourceAnswerStatus: {
              type: "string",
              enum: ["missing", "candidate-present-pending-review"],
            },
            answerDraft: {
              type: "object",
              additionalProperties: false,
              required: ["referenceAnswer", "structurePoints", "uncertaintyNote"],
              properties: {
                referenceAnswer: { type: "string", minLength: 1, maxLength: 1800 },
                structurePoints: {
                  type: "array",
                  minItems: 1,
                  maxItems: 10,
                  items: { type: "string", minLength: 1, maxLength: 240 },
                },
                uncertaintyNote: { type: "string", minLength: 1, maxLength: 600 },
              },
            },
          },
        },
      },
      unmapped: {
        type: "array",
        maxItems: 80,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["excerptId", "reason"],
          properties: {
            excerptId: excerptIdSchema,
            reason: { type: "string", minLength: 1, maxLength: 600 },
          },
        },
      },
      conflicts: {
        type: "array",
        maxItems: 24,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["excerptIds", "description"],
          properties: {
            excerptIds: {
              type: "array",
              minItems: 1,
              maxItems: 80,
              uniqueItems: true,
              items: excerptIdSchema,
            },
            description: { type: "string", minLength: 1, maxLength: 800 },
          },
        },
      },
      missingFacts: {
        type: "array",
        maxItems: 24,
        items: { type: "string", minLength: 1, maxLength: 400 },
      },
    },
  };
}

export function createDashScopeCourseBuilderProvider(
  apiKey: string,
  model: string,
  baseUrl = defaultDashScopeBaseUrl,
): CourseBuilderProvider {
  const chatCompletionsUrl = resolveChatCompletionsUrl(baseUrl);

  async function requestJsonPlan<T>(
    systemContent: string,
    prompt: string,
    parse: (value: unknown) => T,
  ): Promise<T> {
    const response = await fetch(chatCompletionsUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
        enable_thinking: false,
        temperature: 0.1,
        max_tokens: 14000,
      }),
      signal: AbortSignal.timeout(120000),
    });
    if (!response.ok) {
      throw new CourseBuilderProviderError(
        `DashScope request failed with status ${response.status}`,
      );
    }
    const payload: unknown = await response.json();
    const outputText = extractOutputText(payload);
    try {
      return parse(parseJsonObjectText(outputText));
    } catch (error) {
      if (error instanceof CourseBuilderProviderError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new CourseBuilderProviderError(error.message);
      }
      throw new CourseBuilderProviderError(
        "DashScope returned malformed Course Builder JSON",
      );
    }
  }

  async function requestPrivateAnalysisPlan(
    overlay: CourseBuildPrivateOverlayInput,
    target: { courseTitle: string; knowledgePointTitle: string },
  ): Promise<PrivateMaterialAnalysisProviderPlan> {
    const toolName = "submit_private_material_analysis";
    const response = await fetch(chatCompletionsUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "只分析给定私人摘录；必须调用指定函数提交草稿。生成答案永远是 NUR/Qwen 待复核草稿，不得升级来源、答案、评分或课程权威。",
          },
          { role: "user", content: buildPrivateMaterialAnalysisPrompt(overlay, target) },
        ],
        tools: [{
          type: "function",
          function: {
            name: toolName,
            description: "提交一次受限的私人材料拆解草稿；这只是只读结构化返回，不执行任何状态变更。",
            parameters: buildPrivateMaterialAnalysisSchema(overlay),
          },
        }],
        tool_choice: {
          type: "function",
          function: { name: toolName },
        },
        enable_thinking: false,
        temperature: 0.1,
        max_completion_tokens: 14000,
      }),
      signal: AbortSignal.timeout(120000),
    });
    if (!response.ok) {
      throw new CourseBuilderProviderError(
        `DashScope request failed with status ${response.status}`,
      );
    }
    const payload: unknown = await response.json();
    try {
      const plan = normalizePrivateMaterialAnalysisProviderPlan(
        parsePrivateMaterialAnalysisProviderPlan(
          parseJsonObjectText(extractToolArguments(payload, toolName)),
        ),
        overlay,
      );
      assertValidPrivateMaterialAnalysisProviderPlan(plan, overlay);
      return plan;
    } catch (error) {
      if (error instanceof CourseBuilderProviderError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new CourseBuilderProviderError(error.message);
      }
      throw new CourseBuilderProviderError(
        "DashScope returned an invalid private material analysis tool call",
      );
    }
  }

  return {
    id: "dashscope",
    model,
    async createPlan(pack, baselinePlan) {
      return requestJsonPlan(
        "只根据给定材料边界生成严格 JSON 课程计划；缺失事实必须保留待确认。",
        buildPrompt(pack, baselinePlan),
        parseCourseBuildPlan,
      );
    },
    async createPrivateOverlayPlan(pack, overlay) {
      const plan = await requestJsonPlan(
        "只逐条分类给定私人摘录并返回严格 JSON；不得新增事实、答案、ID 或权威升级。",
        buildPrivateOverlayPrompt(pack, overlay),
        parsePrivateOverlayCourseBuildPlan,
      );
      assertValidPrivateOverlayCourseBuildPlan(plan, overlay);
      return plan;
    },
    async analyzePrivateMaterial(overlay, target) {
      return requestPrivateAnalysisPlan(overlay, target);
    },
  };
}
