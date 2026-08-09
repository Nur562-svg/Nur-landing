import "server-only";

import type { ResolvedNurAgentContext } from "../context";
import {
  NurAgentProviderError,
  type NurAgentProvider,
  type NurAgentProviderEvaluation,
} from "../provider";

const xaiResponsesUrl = "https://api.x.ai/v1/responses";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readStringArray(value: unknown): string[] | null {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : null;
}

function parseProviderEvaluation(value: unknown): NurAgentProviderEvaluation {
  if (!isRecord(value)) {
    throw new NurAgentProviderError("xAI returned an invalid Agent result");
  }
  const missingCriterionIds = readStringArray(value.missingCriterionIds);
  if (!missingCriterionIds
    || (value.nextStepCriterionId !== null && typeof value.nextStepCriterionId !== "string")
    || (value.rewriteCriterionId !== null && typeof value.rewriteCriterionId !== "string")
    || !Array.isArray(value.historyRelations)
  ) {
    throw new NurAgentProviderError("xAI returned an invalid Agent result");
  }
  const historyRelations = value.historyRelations.map((relation) => {
    if (!isRecord(relation) || typeof relation.criterionId !== "string") {
      throw new NurAgentProviderError("xAI returned an invalid history relation");
    }
    const relatedAttemptIds = readStringArray(relation.relatedAttemptIds);
    if (!relatedAttemptIds) {
      throw new NurAgentProviderError("xAI returned an invalid history relation");
    }
    return { criterionId: relation.criterionId, relatedAttemptIds };
  });
  return {
    missingCriterionIds,
    nextStepCriterionId: value.nextStepCriterionId,
    historyRelations,
    rewriteCriterionId: value.rewriteCriterionId,
  };
}

function extractOutputText(value: unknown): string {
  if (!isRecord(value) || !Array.isArray(value.output)) {
    throw new NurAgentProviderError("xAI response did not contain output");
  }
  for (const item of value.output) {
    if (!isRecord(item) || item.type !== "message" || !Array.isArray(item.content)) {
      continue;
    }
    for (const content of item.content) {
      if (isRecord(content) && content.type === "output_text" && typeof content.text === "string") {
        return content.text;
      }
    }
  }
  throw new NurAgentProviderError("xAI response did not contain structured text");
}

function buildSchema(context: ResolvedNurAgentContext): Record<string, unknown> {
  const criterionIds = context.criteria.map((criterion) => criterion.id);
  const attemptIds = context.confirmedHistory.map((attempt) => attempt.attemptId);
  return {
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
              items: attemptIds.length > 0
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
    },
    required: [
      "missingCriterionIds",
      "nextStepCriterionId",
      "historyRelations",
      "rewriteCriterionId",
    ],
  };
}

function buildPrompt(context: ResolvedNurAgentContext): string {
  const allowedOutput = {
    criteria: context.criteria.map((criterion) => ({
      id: criterion.id,
      memoryCriterionId: criterion.memoryCriterionId,
      label: criterion.label,
      detail: criterion.detail,
      signalGroups: criterion.signalGroups,
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
  };
  return [
    "你是 NUR LEARN 的受限结构学习 Agent。只判断答案是否覆盖给定结构，不判断医学事实真伪，不作临床诊断，不冒充任课教师评分或标准答案。",
    "中医推理、现代医学评估与二者关系边界必须分别处理；不得把证候和现代疾病直接等同。",
    "只能返回给定 criterion id 和 confirmed attempt id。最多选择一个下一步。只有 allowRewrite 为 true 时才可选择一个 rewrite criterion；否则必须返回 null。不得使用网页、工具、文件或外部知识。",
    `允许的结构：${JSON.stringify(allowedOutput)}`,
    `本次只读上下文：${JSON.stringify(learnerContext)}`,
  ].join("\n\n");
}

export function createXaiNurAgentProvider(
  apiKey: string,
  model: string,
): NurAgentProvider {
  return {
    id: "xai",
    model,
    async evaluate(context) {
      const response = await fetch(xaiResponsesUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          store: false,
          input: buildPrompt(context),
          max_output_tokens: 900,
          text: {
            format: {
              type: "json_schema",
              name: "nur_agent_structural_review",
              schema: buildSchema(context),
              strict: true,
            },
          },
        }),
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) {
        throw new NurAgentProviderError(`xAI request failed with status ${response.status}`);
      }
      const payload: unknown = await response.json();
      const outputText = extractOutputText(payload);
      try {
        return parseProviderEvaluation(JSON.parse(outputText));
      } catch (error) {
        if (error instanceof NurAgentProviderError) {
          throw error;
        }
        throw new NurAgentProviderError("xAI returned malformed structured JSON");
      }
    },
  };
}
