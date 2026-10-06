import "server-only";

import {
  ClewLessonProviderError,
  type ClewLessonModelInput,
  type ClewLessonProvider,
} from "../lesson-provider";
import { CLEW_LESSON_SELF_TEST_COUNT } from "../lesson-heuristic";
import type { ClewLessonStyle } from "@/types/clew";
import { isClewDocx } from "../source-label";
import { streamChatCompletion } from "./chat-transport";
import type { ResolvedClewModelConfig } from "./model-config";

/**
 * DashScope 讲义生成适配器（OpenAI 兼容 chat/completions，流式 markdown 输出）。
 * 输入是知识点信息 + 带【PDF 第 X 页】标记的教材原文片段；只依据片段讲解，片段没覆盖就如实说明。
 */

const requestTimeoutMs = 180_000;
const maxOutputTokens = 3000;

/** 各讲解风格的输出指令（小节骨架固定为 定义/要点/易错点/自测题，风格只改变表达方式）。 */
const STYLE_INSTRUCTIONS: Record<ClewLessonStyle, string[]> = {
  "zh-primary": [
    "讲解风格：中文为主；专业术语首次出现时标注原文（如英文/拉丁文）。",
  ],
  "exam-cram": [
    "讲解风格「考点速记」（面向期末考试冲刺）：",
    "- 「定义」压缩到 1–3 句；「要点」改写为 3–5 条高频考点短句（每条 ≤ 30 字）；",
    "- 「易错点」聚焦命题陷阱与易混点；自测题 3 道偏记忆与辨析型。",
  ],
  socratic: [
    "讲解风格「引导追问」（不直接灌输结论，用问题链引导理解）：",
    "- 「要点」部分用 3–5 个逐步深入的问题组织（每问一行），每个问题后跟一行「提示：」（只给思考方向，不给完整答案）；",
    "- 「定义」仍给准确简短表述；「易错点」写成 2–3 个反问句；自测题 3 道为开放性思考题并给出要点式参考答案。",
  ],
  "en-primary": [
    "讲解风格「英文为主」：小节标题保持中文（定义/要点/易错点/自测题），正文以英文撰写；",
    "专业术语首次出现写「English term（中文）」，自测题题干用英文、参考答案附中文要点。",
  ],
};

function buildPrompt(input: ClewLessonModelInput): string {
  const requiredShape = [
    "## 定义",
    "（2–5 句，只依据原文片段与本知识点说明）",
    "## 机制机理",
    "（2–4 句：为什么会这样——机制、原理或因果链；只依据原文片段，片段未覆盖写「教材本页未展开」）",
    "## 易混辨析",
    "（≥1 组易混概念对比：每个概念的关键区别各写一句；本页确无易混概念，本节也必须存在并只写「本页未涉及」）",
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
    "你是 Ariadne「Clew」的讲义编写器。基于给定的教材原文片段与知识点信息，写一份结构化中文讲义。",
    "输出要求（必须严格遵守，不要输出代码围栏，不要结构之外的寒暄）：",
    requiredShape,
    `自测题必须恰好 ${CLEW_LESSON_SELF_TEST_COUNT} 道，每题都给出参考答案；答案必须能从本讲义正文推出，不得引入正文没有的信息。`,
    ...STYLE_INSTRUCTIONS[input.style],
    "约束：",
    "- 只能使用给定原文片段中的信息；片段未覆盖的内容，写「教材本页未展开」，不得补充教材外知识。",
    isClewDocx(input.fileName ?? "")
      ? "- 这份教材没有印刷页码。引用时只写「页码待确认」，不得写成「第 N 页」，也不得声称教师强调过某内容。"
      : "- 引用位置时写清页码（如「第 12 页」），不得编造页码或声称教师强调过某内容。页码引用必须与该页支撑的具体表述写在同一句内（如「……是因为 X（第 12 页）」或「第 12 页指出：……」），不得只写「选择题1、3)」这类裸编号引用。页码只标注原文片段中可对照核验的表述；由知识点说明引申的概括、易错点分析与自测参考答案若不是原文片段的用词，不要挂页码——宁可不引用，不得给无法对照核验的表述标页码。",
    "- 中医与现代医学表述分别说明，不要直接等同。",
    ...(input.prerequisiteSummaries && input.prerequisiteSummaries.length > 0
      ? [
          "先修知识点讲义摘要（仅作背景帮助理解，不得直接引用为出处，其中页码不是本知识点的可引用页码）：",
          ...input.prerequisiteSummaries.map((summary) =>
            [
              `### ${summary.title}`,
              `定义：${summary.definition}`,
              ...summary.keyPoints.map((point) => `- ${point}`),
            ].join("\n"),
          ),
        ]
      : []),
    `知识点信息：${JSON.stringify({
      textbookTitle: input.textbookTitle,
      chapterTitle: input.chapterTitle,
      title: input.knowledgePoint.title,
      description: input.knowledgePoint.description,
      keyTerms: input.knowledgePoint.keyTerms,
      prerequisites: input.knowledgePoint.prerequisites,
      sourcePage: isClewDocx(input.fileName ?? "") ? "页码待确认" : input.knowledgePoint.sourcePage,
    })}`,
    `教材原文片段（引用页码以此为准）：${input.sourceExcerpt}`,
    ...(input.evidenceAtoms && input.evidenceAtoms.length > 0
      ? [
          "本章证据原子（页码溯源的原文摘录；仅作背景帮助理解，不得直接引用为出处，引用页码仍以上方原文片段为准）：",
          ...input.evidenceAtoms.map((atom) => `【第 ${atom.page} 页】${atom.text}`),
        ]
      : []),
    ...(input.retryFeedback
      ? [`注意：上一次输出未通过校验（${input.retryFeedback}）。请严格按上述小节骨架重新输出完整讲义，六个小节缺一不可。`]
      : []),
  ].join("\n");
}

/** 供测试锁定 prompt 形态（缺省路径/增强路径/重试路径）。 */
export function buildClewLessonPrompt(input: ClewLessonModelInput): string {
  return buildPrompt(input);
}

export function createDashScopeClewLessonProvider(
  config: ResolvedClewModelConfig,
): ClewLessonProvider {
  return {
    id: config.provider,
    model: config.model,
    async generateLesson(input, onDelta) {
      try {
        return await streamChatCompletion({
          config,
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
        throw new ClewLessonProviderError(
          error instanceof Error ? error.message : "讲义生成模型调用失败",
        );
      }
    },
  };
}