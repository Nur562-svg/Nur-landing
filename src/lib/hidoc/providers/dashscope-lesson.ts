import "server-only";

import {
  HiDocLessonProviderError,
  type HiDocLessonModelInput,
  type HiDocLessonProvider,
} from "../lesson-provider";
import { HIDOC_LESSON_SELF_TEST_COUNT, HIDOC_LESSON_STYLE_LABELS } from "../lesson-heuristic";
import { isHiDocDocx } from "../source-label";
import { streamDashScopeChatCompletion } from "./dashscope-stream";

/**
 * DashScope 讲义生成适配器（OpenAI 兼容 chat/completions，流式 markdown 输出）。
 * 输入是知识点信息 + 带【PDF 第 X 页】标记的教材原文片段；只依据片段讲解，片段没覆盖就如实说明。
 */

const requestTimeoutMs = 180_000;
const maxOutputTokens = 3000;

function buildPrompt(input: HiDocLessonModelInput): string {
  const requiredShape = [
    "## 定义",
    "（2–5 句，只依据原文片段与本知识点说明）",
    "## 要点",
    "- （3–6 条要点，每条一句话）",
    "## 易错点",
    "- （2–4 条学生常见混淆或适用条件限制）",
    "## 自测题",
    `1. （题干）`,
    "   参考答案：（答案）",
    `2. （题干）`,
    "   参考答案：（答案）",
    `3. （题干）`,
    "   参考答案：（答案）",
  ].join("\n");

  return [
    "你是 NUR LEARN「Hi doc」的讲义编写器。基于给定的教材原文片段与知识点信息，写一份结构化中文讲义。",
    "输出要求（必须严格遵守，不要输出代码围栏，不要结构之外的寒暄）：",
    requiredShape,
    `自测题必须恰好 ${HIDOC_LESSON_SELF_TEST_COUNT} 道，每题都给出参考答案。`,
    `讲解风格：${HIDOC_LESSON_STYLE_LABELS[input.style]}。`,
    "约束：",
    "- 只能使用给定原文片段中的信息；片段未覆盖的内容，写「教材本页未展开」，不得补充教材外知识。",
    isHiDocDocx(input.fileName ?? "")
      ? "- 这份教材没有印刷页码。引用时只写「页码待确认」，不得写成「第 N 页」，也不得声称教师强调过某内容。"
      : "- 引用位置时写清页码（如「第 12 页」），不得编造页码或声称教师强调过某内容。",
    "- 中医与现代医学表述分别说明，不要直接等同。",
    `知识点信息：${JSON.stringify({
      textbookTitle: input.textbookTitle,
      chapterTitle: input.chapterTitle,
      title: input.knowledgePoint.title,
      description: input.knowledgePoint.description,
      keyTerms: input.knowledgePoint.keyTerms,
      prerequisites: input.knowledgePoint.prerequisites,
      sourcePage: isHiDocDocx(input.fileName ?? "") ? "页码待确认" : input.knowledgePoint.sourcePage,
    })}`,
    `教材原文片段（引用页码以此为准）：${input.sourceExcerpt}`,
  ].join("\n");
}

export function createDashScopeHiDocLessonProvider(
  apiKey: string,
  model: string,
  baseUrl?: string,
): HiDocLessonProvider {
  return {
    id: "dashscope",
    model,
    async generateLesson(input, onDelta) {
      try {
        return await streamDashScopeChatCompletion({
          apiKey,
          model,
          baseUrl,
          messages: [
            {
              role: "system",
              content:
                "只依据给定教材原文片段撰写结构化讲义 markdown；片段未覆盖即写「教材本页未展开」，不得编造。",
            },
            { role: "user", content: buildPrompt(input) },
          ],
          onDelta,
          temperature: 0.3,
          maxOutputTokens,
          timeoutMs: requestTimeoutMs,
        });
      } catch (error) {
        throw new HiDocLessonProviderError(
          error instanceof Error ? error.message : "讲义生成模型调用失败",
        );
      }
    },
  };
}