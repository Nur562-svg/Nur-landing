import "server-only";

import { streamText, tool, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod/v4";
import { getRequiredCourseBySlug } from "@/content/courses";
import { getCurrentSession } from "@/lib/auth/session";
import { recordServerUsage, checkAndEnforceQuota } from "@/lib/quotas-server";
import { selectKnowledgePointById } from "@/lib/course-selectors";
import { buildChatContext } from "@/lib/nur-agent/chat-context";
import { buildChatSystemPrompt } from "@/lib/nur-agent/chat-prompt";
import { resolveNurAgentContext } from "@/lib/nur-agent/context";
import { parseNurAgentRequest } from "@/lib/nur-agent/request";
import { getConfiguredNurAgentProvider, runNurAgent } from "@/lib/nur-agent/service";
import type { FsrsCriterionSummary } from "@/types/nur-agent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxRequestBytes = 128000;

type TaskContext = {
  version: 1;
  previousRunId: string | null;
  courseId: string;
  courseSlug: string;
  courseVersionId: string;
  offeringId: string;
  knowledgePointId: string;
  surface: "subjective-writing" | "case-reasoning";
  taskId: string;
  segmentId: string | null;
  requestRewrite: boolean;
  confirmedHistory: readonly {
    attemptId: string;
    surface: "subjective-writing" | "case-reasoning";
    taskId: string;
    segmentId: string | null;
    confirmedText: string;
  }[];
  privateRef?: "nur-qwen-private-ref" | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function resolveModelId(): string {
  return (
    process.env.NUR_AGENT_MODEL?.trim() ||
    process.env.NUR_COURSE_BUILDER_MODEL?.trim() ||
    "qwen3.7-plus"
  );
}

function resolveDashScopeClient() {
  const apiKey = process.env.DASHSCOPE_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  const baseURL =
    process.env.DASHSCOPE_BASE_URL?.trim() ||
    "https://dashscope.aliyuncs.com/compatible-mode/v1";
  const customFetch: typeof fetch = async (input, init) => {
    if (init?.body && typeof init.body === "string") {
      try {
        const parsed = JSON.parse(init.body);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          parsed.enable_thinking = false;
          init.body = JSON.stringify(parsed);
        }
      } catch {
        // not JSON, pass through unchanged
      }
    }
    return fetch(input, init);
  };
  return createOpenAI({ baseURL, apiKey, fetch: customFetch });
}

export async function POST(request: Request): Promise<Response> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxRequestBytes) {
    return Response.json(
      { error: "请求体过大" },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > maxRequestBytes) {
      return Response.json(
        { error: "请求体过大" },
        { status: 413 },
      );
    }
    body = JSON.parse(text);
  } catch {
    return Response.json(
      { error: "请求格式无效" },
      { status: 400 },
    );
  }

  if (!isRecord(body)) {
    return Response.json({ error: "请求格式无效" }, { status: 400 });
  }

  const courseSlug = typeof body.courseSlug === "string" ? body.courseSlug : null;
  const knowledgePointId =
    typeof body.knowledgePointId === "string" ? body.knowledgePointId : null;
  const currentText =
    typeof body.currentText === "string" && body.currentText.trim().length > 0
      ? body.currentText
      : null;
  const messages = Array.isArray(body.messages) ? body.messages : null;
  const fsrsSummary =
    body.fsrsSummary === null || body.fsrsSummary === undefined
      ? null
      : Array.isArray(body.fsrsSummary)
        ? (body.fsrsSummary as readonly FsrsCriterionSummary[])
        : null;

  if (!messages) {
    return Response.json(
      { error: "缺少必要参数" },
      { status: 400 },
    );
  }

  // M3 更多门控 + server persist for agent
  let chatContext: ReturnType<typeof buildChatContext> | null = null;
  if (courseSlug && knowledgePointId) {
    let course: ReturnType<typeof getRequiredCourseBySlug>;
    try {
      course = getRequiredCourseBySlug(courseSlug);
    } catch {
      return Response.json({ error: "课程未注册" }, { status: 404 });
    }

    const kp = selectKnowledgePointById(course, knowledgePointId);
    if (!kp) {
      return Response.json(
        { error: "知识点未找到" },
        { status: 404 },
      );
    }
    chatContext = buildChatContext(course, kp);
  }

  const systemPrompt = buildChatSystemPrompt(chatContext, fsrsSummary, currentText);

  const dashscope = resolveDashScopeClient();
  if (!dashscope) {
    return Response.json(
      { error: "DashScope API 未配置；请设置 DASHSCOPE_API_KEY" },
      { status: 503 },
    );
  }

  const modelId = resolveModelId();
  const model = dashscope(modelId);

  const taskContext: TaskContext | null = isRecord(body.taskContext)
    ? (body.taskContext as unknown as TaskContext)
    : null;

  const structuralAnalysisTool = (taskContext && currentText)
    ? tool({
        description:
          "分析学生当前作答的结构完整性。当学生要求检查答案、查看遗漏、或请求结构建议时调用此工具。",
        inputSchema: z.object({
          text: z.string().describe("要分析的学生作答文本"),
        }),
        execute: async ({ text }: { text: string }): Promise<Record<string, unknown>> => {
          try {
            const agentRequest = parseNurAgentRequest({
              ...taskContext,
              currentText: text,
              fsrsSummary,
            });
            const context = resolveNurAgentContext(agentRequest);
            const provider = getConfiguredNurAgentProvider();
            const result = await runNurAgent(context, provider);
            return {
              omissions: result.omissions,
              nextStep: result.nextStep,
              rewriteSuggestion: result.rewriteSuggestion,
              rewriteProposals: result.rewriteProposals ?? [],
              reviewProposals: result.reviewProposals ?? [],
              sources: result.sources,
            };
          } catch {
            return {
              error: "结构分析暂时不可用，请使用结构分析标签页进行独立检查。",
            };
          }
        },
      })
    : undefined;

  try {
    const modelMessages = await convertToModelMessages(messages);
    const result = streamText({
      model,
      system: systemPrompt,
      messages: modelMessages,
      tools: structuralAnalysisTool
        ? { structural_analysis: structuralAnalysisTool }
        : undefined,
      temperature: 0.3,
      maxOutputTokens: 2000,
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return Response.json(
      { error: "流式响应启动失败" },
      { status: 502 },
    );
  }
}
