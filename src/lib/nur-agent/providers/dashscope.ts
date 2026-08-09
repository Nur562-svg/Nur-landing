import "server-only";

import type { ResolvedNurAgentContext } from "../context";
import {
  NurAgentProviderError,
  type NurAgentProvider,
  type NurAgentProviderEvaluation,
} from "../provider";

const defaultDashScopeBaseUrl =
  "https://dashscope.aliyuncs.com/compatible-mode/v1";

function resolveChatCompletionsUrl(baseUrl: string): string {
  const url = new URL(baseUrl);
  if (
    url.protocol !== "https:" ||
    (url.hostname !== "dashscope.aliyuncs.com" &&
      !url.hostname.endsWith(".aliyuncs.com"))
  ) {
    throw new NurAgentProviderError(
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

function extractToolArguments(value: unknown, expectedToolName: string): string {
  if (!isRecord(value) || !Array.isArray(value.choices)) {
    throw new NurAgentProviderError("DashScope response did not contain choices");
  }
  const firstChoice = value.choices[0];
  if (
    !isRecord(firstChoice) ||
    !isRecord(firstChoice.message) ||
    !Array.isArray(firstChoice.message.tool_calls) ||
    firstChoice.message.tool_calls.length !== 1
  ) {
    throw new NurAgentProviderError(
      "DashScope response did not contain the required nur-agent tool call",
    );
  }
  const toolCall = firstChoice.message.tool_calls[0];
  if (
    !isRecord(toolCall) ||
    !isRecord(toolCall.function) ||
    toolCall.function.name !== expectedToolName ||
    typeof toolCall.function.arguments !== "string"
  ) {
    throw new NurAgentProviderError("DashScope returned an invalid nur-agent tool call");
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
      throw new NurAgentProviderError(
        `DashScope returned incomplete JSON (${trimmed.length} characters)`,
      );
    }
    try {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    } catch {
      throw new NurAgentProviderError(
        `DashScope returned malformed JSON (${trimmed.length} characters)`,
      );
    }
  }
}

function readStringArray(value: unknown): string[] | null {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : null;
}

function parseProviderEvaluation(value: unknown): NurAgentProviderEvaluation {
  if (!isRecord(value)) {
    throw new NurAgentProviderError("DashScope returned an invalid Agent result");
  }
  const missingCriterionIds = readStringArray(value.missingCriterionIds);
  if (
    !missingCriterionIds ||
    (value.nextStepCriterionId !== null && typeof value.nextStepCriterionId !== "string") ||
    (value.rewriteCriterionId !== null && typeof value.rewriteCriterionId !== "string") ||
    !Array.isArray(value.historyRelations)
  ) {
    throw new NurAgentProviderError("DashScope returned an invalid Agent result");
  }
  const historyRelations = value.historyRelations.map((relation) => {
    if (!isRecord(relation) || typeof relation.criterionId !== "string") {
      throw new NurAgentProviderError("DashScope returned an invalid history relation");
    }
    const relatedAttemptIds = readStringArray(relation.relatedAttemptIds);
    if (!relatedAttemptIds) {
      throw new NurAgentProviderError("DashScope returned an invalid history relation");
    }
    return { criterionId: relation.criterionId, relatedAttemptIds };
  });

  // Extended fields for typed tools (optional, for model-assisted proposals)
  const rewriteSuggestions = Array.isArray(value.rewriteSuggestions)
    ? value.rewriteSuggestions
        .filter(
          (s: unknown): s is Record<string, unknown> =>
            isRecord(s) &&
            typeof s.criterionId === "string" &&
            typeof s.rewrittenText === "string" &&
            typeof s.rationale === "string",
        )
        .map((s) => ({
          criterionId: s.criterionId,
          rewrittenText: String(s.rewrittenText).slice(0, 2000),
          rationale: String(s.rationale).slice(0, 600),
          confidence: typeof s.confidence === "number" ? Math.max(0, Math.min(1, s.confidence)) : 0.5,
        }))
    : undefined;

  const favoriteProposals = Array.isArray(value.favoriteProposals)
    ? value.favoriteProposals
        .filter(
          (f: unknown): f is Record<string, unknown> =>
            isRecord(f) &&
            typeof f.memoryCriterionId === "string" &&
            typeof f.label === "string" &&
            typeof f.rationale === "string",
        )
        .map((f) => ({
          memoryCriterionId: f.memoryCriterionId,
          label: String(f.label),
          rationale: String(f.rationale).slice(0, 600),
        }))
    : undefined;

  const reviewProposals = Array.isArray(value.reviewProposals)
    ? value.reviewProposals
        .filter(
          (r: unknown): r is Record<string, unknown> =>
            isRecord(r) &&
            typeof r.memoryCriterionId === "string" &&
            typeof r.label === "string" &&
            typeof r.rationale === "string",
        )
        .map((r) => ({
          memoryCriterionId: r.memoryCriterionId,
          label: String(r.label),
          rationale: String(r.rationale).slice(0, 600),
        }))
    : undefined;

  const sourceComparisons = Array.isArray(value.sourceComparisons)
    ? value.sourceComparisons
        .filter(
          (s: unknown): s is Record<string, unknown> =>
            isRecord(s) &&
            typeof s.sourceId === "string" &&
            typeof s.note === "string" &&
            typeof s.relationshipLabel === "string",
        )
        .map((s) => ({
          sourceId: s.sourceId,
          note: String(s.note).slice(0, 600),
          relationshipLabel: (s.relationshipLabel === "可关联" || s.relationshipLabel === "帮助理解" || s.relationshipLabel === "不可直接等同")
            ? s.relationshipLabel
            : "可关联",
        }))
    : undefined;

  return {
    missingCriterionIds,
    nextStepCriterionId: value.nextStepCriterionId ?? null,
    historyRelations,
    rewriteCriterionId: value.rewriteCriterionId ?? null,
    rewriteSuggestions,
    favoriteProposals,
    reviewProposals,
    sourceComparisons,
  } as NurAgentProviderEvaluation;
}

function buildSchema(context: ResolvedNurAgentContext) {
  const criterionIds = context.criteria.map((c) => c.id);
  const attemptIds = context.confirmedHistory.map((a) => a.attemptId);
  const base = {
    type: "object",
    additionalProperties: false,
    properties: {
      missingCriterionIds: {
        type: "array",
        uniqueItems: true,
        items: { type: "string", enum: criterionIds },
      },
      nextStepCriterionId: {
        anyOf: [{ type: "string", enum: criterionIds }, { type: "null" }],
      },
      historyRelations: {
        type: "array",
        maxItems: context.criteria.length,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            criterionId: { type: "string", enum: criterionIds },
            relatedAttemptIds: {
              type: "array",
              uniqueItems: true,
              items:
                attemptIds.length > 0
                  ? { type: "string", enum: attemptIds }
                  : { type: "string", maxLength: 0 },
            },
          },
          required: ["criterionId", "relatedAttemptIds"],
        },
      },
      rewriteCriterionId: {
        anyOf: [{ type: "string", enum: criterionIds }, { type: "null" }],
      },
      // Typed tool proposals (narrow, model returns suggestions only)
      rewriteSuggestions: {
        type: "array",
        maxItems: 6,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            criterionId: { type: "string", enum: criterionIds },
            rewrittenText: { type: "string", minLength: 1, maxLength: 2000 },
            rationale: { type: "string", minLength: 1, maxLength: 600 },
            confidence: { type: "number", minimum: 0, maximum: 1 },
          },
          required: ["criterionId", "rewrittenText", "rationale"],
        },
      },
      // New typed learning tools for private + official units (Qwen proposals only)
      favoriteProposals: {
        type: "array",
        maxItems: 8,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            memoryCriterionId: { type: "string" },
            label: { type: "string", minLength: 1 },
            rationale: { type: "string", minLength: 1, maxLength: 600 },
          },
          required: ["memoryCriterionId", "label", "rationale"],
        },
      },
      reviewProposals: {
        type: "array",
        maxItems: 4,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            memoryCriterionId: { type: "string" },
            label: { type: "string", minLength: 1 },
            rationale: { type: "string", minLength: 1, maxLength: 600 },
          },
          required: ["memoryCriterionId", "label", "rationale"],
        },
      },
      sourceComparisons: {
        type: "array",
        maxItems: 6,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            sourceId: { type: "string" },
            note: { type: "string", minLength: 1, maxLength: 600 },
            relationshipLabel: { type: "string", enum: ["可关联", "帮助理解", "不可直接等同"] },
          },
          required: ["sourceId", "note", "relationshipLabel"],
        },
      },
    },
    required: [
      "missingCriterionIds",
      "nextStepCriterionId",
      "historyRelations",
      "rewriteCriterionId",
    ],
  };
  return base;
}

function buildPrompt(context: ResolvedNurAgentContext): string {
  const isPrivate = context.request.privateRef === "nur-qwen-private-ref";
  const allowedOutput = {
    criteria: context.criteria.map((c) => ({
      id: c.id,
      memoryCriterionId: c.memoryCriterionId,
      label: c.label,
      detail: c.detail,
      signalGroups: c.signalGroups,
    })),
    allowRewrite: context.request.requestRewrite,
  };
  const learnerContext = {
    taskTitle: context.taskTitle,
    taskPrompt: context.taskPrompt,
    answerFramework: context.answerFramework,
    currentText: context.request.currentText,
    confirmedHistory: context.confirmedHistory,
    memoryCriteria: context.memoryCriteria,
    sources: context.sources,
    fsrsSummary: context.fsrsSummary,
  };
  const privateNotice = isPrivate
    ? "本次为 learner-private 单元（privateRef=nur-qwen-private-ref）。参考答案权威为 nur-qwen-generated / pending-review；不得将私人材料声明为官方教材、教师答案或已核验来源。"
    : "本次为官方 authored 单元，权威声明以课程注册表为准。";

  // Radical but grounded new order:
  // The Agent must first deeply read and quote the student's actual currentText.
  // It uses the registered criteria + sources + framework as the ONLY strict reference.
  // It is allowed (and required) to give sharp, specific textual critique of what the student wrote.
  // It must quote the student's own words when diagnosing problems or successes.
  // It never fabricates medical facts outside the provided sources.
  // Proposals remain suggestions only; user action drives all state change.

  return [
    "你是 NUR LEARN 里针对这个具体知识点的精准写作与推理导师。你不是通用医疗 AI，也不是老师评分官。",
    "你的唯一严格参考是本次提供的 criteria、answerFramework 和 sources。所有判断必须落地到这些注册材料上。",
    "最重要指令：你必须先认真阅读学生本次提交的 currentText。你的反馈要直接针对学生实际写的内容。",
    "在诊断时，必须在每个 omission 的 detail 开头用精确格式写出你引用的学生原文短语：以“你写了：“ + 学生原文中的原话 + ”” 开头，然后再分析问题。例如 detail 必须类似：你写了：“食欲旺盛且食量增加” —— 这句话只覆盖了症状，但缺少“食欲”的定义要素，与“定义准确”标准不符。必须用学生实际写的原话，不要改写或概括学生的话。",
    "不要只说‘定义准确缺失’。要说：‘你目前关于食欲的这段话只写了旺盛和食量增加，但缺少对“什么是食欲”的定义要素，这和本知识点的“定义准确”标准不符。'",
    "风格要求：精炼、精准、直接。用学生自己的话来对话。不要输出冗长的内部步骤或官僚流程。不要讲无关的医学大道理。",
    "中医视角与现代医学视角必须明确分开；关系要用注册来源里允许的标签（可关联 / 帮助理解 / 不可直接等同）。",
    "输出必须调用指定工具返回结构化结果。核心是帮助学生把他们已经写的内容改得更完整、更符合这个点的 NUR 结构。",
    "可返回 rewriteSuggestions（**严格输出短小的可插入补充片段**，长度控制在20-120字，针对学生已写的一个具体句子给出可直接插入其后的补充内容。必须引用学生原文中的具体短语。不要输出整段重写，只给“针对上面这段话，补充：xxx”。rationale 简要说明插入位置和理由。只在学生内容与该要点几乎完全无关时才给出完整改写文本。）",
    "任何写入（保存、收藏、复习）都必须由用户显式点击后，由确定性代码执行。你只负责给出高质量的建议。",
    "学习者记忆状态（fsrsSummary）：参考每个记忆维度的 difficulty（1-10，越高越难）、stability（越高越稳定）、lapses（遗忘次数）。在选择 nextStepCriterionId 时，优先指向 stability 最低且 lapses 最高的维度——这些是学习者最薄弱的地方。如果某维度 stability > 10 且 reps >= 3，可以在 nextStep 中降低其优先级。这些只是建议权重，不改变你已有的结构检查逻辑。",
    privateNotice,
    "严格禁止：使用外部知识、编造教材内容、给出临床诊断建议、直接修改学生状态。",
    `允许的结构（仅能使用这些 id）：${JSON.stringify(allowedOutput)}`,
    `完整只读上下文（包含学生真实作答 currentText）：${JSON.stringify(learnerContext)}`,
    "请基于学生实际写的内容，给出尖锐但有根据的分析和提案。",
  ].join("\n\n");
}

export function createDashScopeNurAgentProvider(
  apiKey: string,
  model: string,
  baseUrl = defaultDashScopeBaseUrl,
): NurAgentProvider {
  const chatCompletionsUrl = resolveChatCompletionsUrl(baseUrl);
  const toolName = "nur_agent_structural_review";

  return {
    id: "dashscope",
    model,
    async evaluate(context) {
      const schema = buildSchema(context);
      const prompt = buildPrompt(context);
      const system = context.request.privateRef === "nur-qwen-private-ref"
        ? "你是 NUR LEARN 针对这个知识点的精准写作导师。必须先阅读并引用学生 currentText 中的具体句子进行分析。使用注册的 criteria 和 sources 作为严格参考。给出尖锐、直接、基于学生原文的结构建议。所有建议都是 proposal，写入由用户和确定性代码负责。返回严格 JSON tool call。"
        : "你是 NUR LEARN 针对这个知识点的精准写作导师。必须先阅读并引用学生 currentText 中的具体句子进行分析。使用注册的 criteria 和 sources 作为严格参考。给出精炼、直接的反馈。rewriteSuggestions 必须是短小（20-120字）的可直接插入片段，而非整段。返回严格 JSON tool call。";

      const response = await fetch(chatCompletionsUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: system },
            { role: "user", content: prompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: toolName,
                description:
                  "提交受限的 NUR Agent 结构审查结果（包括核心 omissions/next/history/rewrite + typed proposals for favorites/review/source）。模型只返回建议，不执行任何状态变更。",
                parameters: schema,
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: toolName },
          },
          enable_thinking: false,
          temperature: 0.1,
          max_completion_tokens: 4000,
        }),
        signal: AbortSignal.timeout(60000),
      });
      if (!response.ok) {
        throw new NurAgentProviderError(
          `DashScope request failed with status ${response.status}`,
        );
      }
      const payload: unknown = await response.json();
      try {
        const argsText = extractToolArguments(payload, toolName);
        const parsed = parseJsonObjectText(argsText);
        return parseProviderEvaluation(parsed);
      } catch (error) {
        if (error instanceof NurAgentProviderError) {
          throw error;
        }
        if (error instanceof Error) {
          throw new NurAgentProviderError(error.message);
        }
        throw new NurAgentProviderError(
          "DashScope returned an invalid nur-agent tool call",
        );
      }
    },
  };
}
