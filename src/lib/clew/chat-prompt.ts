import type { ClewChatMessage, ClewLessonStyle } from "@/types/clew";
import { CLEW_LESSON_STYLE_LABELS } from "./lesson-heuristic";
import { formatClewSourcePage, isClewDocx } from "./source-label";
import { CLEW_CHAT_MESSAGE_MAX_CHARS, trimClewChatHistory } from "./conversation";

/**
 * Clew 讲解对话提示词（纯函数，可测试）。
 * 与官方课程闭环不同：Clew 生成物按通用 AI 产品呈现，不挂官方课的证据分级标签；
 * 但边界仍然声明清楚（不是教师评分、不做临床诊断、超出教材原文要明确标注）。
 */

export type ClewChatContext = {
  textbookTitle: string;
  chapterTitle: string;
  knowledgePoint: {
    title: string;
    description: string;
    keyTerms: readonly string[];
    prerequisites: readonly string[];
    sourcePage: number;
  };
  /** 同章已萃取知识点标题（含当前知识点）。 */
  chapterKnowledgePointTitles: readonly string[];
  lessonMarkdown: string | null;
  sourceExcerpt: string | null;
  fileName?: string;
  style: ClewLessonStyle;
};

export type ClewChatModelMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/** 原文片段进入提示词的长度上限（讲义已保存片段，避免整章塞入）。 */
export const CLEW_CHAT_EXCERPT_MAX_CHARS = 4000;
/** 讲义进入提示词的长度上限。 */
export const CLEW_CHAT_LESSON_MAX_CHARS = 4000;

function clip(text: string, maxChars: number): string {
  return text.length > maxChars ? `${text.slice(0, maxChars)}\n…（已截断）` : text;
}

export function buildClewChatSystemPrompt(context: ClewChatContext): string {
  const knowledgePoint = context.knowledgePoint;
  const docx = isClewDocx(context.fileName ?? "");
  const locator = formatClewSourcePage(context.fileName ?? "", knowledgePoint.sourcePage);
  const excerpt = context.sourceExcerpt
    ? clip(context.sourceExcerpt, CLEW_CHAT_EXCERPT_MAX_CHARS)
    : "（未取得本知识点的教材原文片段）";
  const lesson = context.lessonMarkdown
    ? clip(context.lessonMarkdown, CLEW_CHAT_LESSON_MAX_CHARS)
    : "（该知识点尚未生成讲义）";

  return [
    "你是 Ariadne「Clew」里的学习搭档（语气：生动、有人味、像 Grok——直接、机敏、偶尔一点幽默，但不油腻）。",
    "你正在陪学生啃这份用户私有教材的一个具体知识点：先把话说清楚，再把原文钉死。",
    "边界规则（硬约束，幽默也不能破）：",
    "- 你是 AI 学习搭档，不是任课教师：不代替教师评分，不预测考试分数。",
    "- 不做临床诊断、不给个体化医疗建议；学生问「这个诊断对不对」时按教材原文解释结构，不做临床判断。",
    "- 中医与现代医学表述分别说明，不要直接等同；不确定就直说不确定。",
    "- 回答必须回源：优先依据下方教材原文片段与讲义；超出范围时，在回答开头标注「以下为通用医学知识，非本教材内容」。",
    docx
      ? `- 讲解风格：${CLEW_LESSON_STYLE_LABELS[context.style]}；这份教材没有印刷页码，引用时写「页码待确认」，不得写成「第 N 页」。`
      : `- 讲解风格：${CLEW_LESSON_STYLE_LABELS[context.style]}；引用教材时写清页码（如「${locator}」）。`,
    "- 回答使用中文：可以说人话、用短比喻帮助学生记住，但禁止空泛鸡汤；可用小标题与短列表，不要表格或代码块。",
    "- 不得声称教师强调过某内容，也不得编造教材页码。",
    "",
    `教材：《${context.textbookTitle}》`,
    `章节：${context.chapterTitle}`,
    `当前知识点：${knowledgePoint.title}（${locator}）`,
    `知识点说明：${knowledgePoint.description}`,
    knowledgePoint.keyTerms.length > 0 ? `关键术语：${knowledgePoint.keyTerms.join("、")}` : "关键术语：（未标注）",
    knowledgePoint.prerequisites.length > 0
      ? `先修知识点：${knowledgePoint.prerequisites.join("、")}`
      : "先修知识点：（未标注）",
    `本章知识点清单：${context.chapterKnowledgePointTitles.join("；") || "（本章暂无其它知识点）"}`,
    "",
    docx
      ? "本知识点教材原文片段（页码待确认，不要编造页码）："
      : "本知识点教材原文片段（带【PDF 第 X 页】标记，引用时以这里的页码为准）：",
    excerpt,
    "",
    "本知识点讲义（如已生成）：",
    lesson,
  ].join("\n");
}

/** 组装模型消息：system + 最近历史 + 本轮提问（历史由服务端从库中读取，不接受客户端注入）。 */
export function buildClewChatModelMessages(
  context: ClewChatContext,
  history: readonly ClewChatMessage[],
  userMessage: string,
): ClewChatModelMessage[] {
  const trimmed = trimClewChatHistory(history);
  return [
    { role: "system", content: buildClewChatSystemPrompt(context) },
    ...trimmed.map((message) => ({
      role: message.role,
      content: clip(message.content, CLEW_CHAT_MESSAGE_MAX_CHARS),
    })),
    { role: "user", content: userMessage },
  ];
}