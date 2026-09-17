import type { HiDocChatMessage, HiDocLessonStyle } from "@/types/hidoc";
import { HIDOC_LESSON_STYLE_LABELS } from "./lesson-heuristic";
import { HIDOC_CHAT_MESSAGE_MAX_CHARS, trimHiDocChatHistory } from "./conversation";

/**
 * Hi doc 讲解对话提示词（纯函数，可测试）。
 * 与官方课程闭环不同：Hi doc 生成物按通用 AI 产品呈现，不挂官方课的证据分级标签；
 * 但边界仍然声明清楚（不是教师评分、不做临床诊断、超出教材原文要明确标注）。
 */

export type HiDocChatContext = {
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
  style: HiDocLessonStyle;
};

export type HiDocChatModelMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/** 原文片段进入提示词的长度上限（讲义已保存片段，避免整章塞入）。 */
export const HIDOC_CHAT_EXCERPT_MAX_CHARS = 4000;
/** 讲义进入提示词的长度上限。 */
export const HIDOC_CHAT_LESSON_MAX_CHARS = 4000;

function clip(text: string, maxChars: number): string {
  return text.length > maxChars ? `${text.slice(0, maxChars)}\n…（已截断）` : text;
}

export function buildHiDocChatSystemPrompt(context: HiDocChatContext): string {
  const knowledgePoint = context.knowledgePoint;
  const excerpt = context.sourceExcerpt
    ? clip(context.sourceExcerpt, HIDOC_CHAT_EXCERPT_MAX_CHARS)
    : "（未取得本知识点的教材原文片段）";
  const lesson = context.lessonMarkdown
    ? clip(context.lessonMarkdown, HIDOC_CHAT_LESSON_MAX_CHARS)
    : "（该知识点尚未生成讲义）";

  return [
    "你是 NUR LEARN「Hi doc」里针对这份用户私有教材的讲解助教，正在讲解一个具体知识点。",
    "边界规则：",
    "- 你是 AI 讲解助手，不是任课教师：不代替教师评分，不预测考试分数。",
    "- 不做临床诊断、不给个体化医疗建议；学生问「这个诊断对不对」时按教材原文解释结构，不做临床判断。",
    "- 中医与现代医学表述分别说明，不要直接等同；不确定的地方明确说不确定。",
    "- 回答优先依据下方提供的教材原文片段与讲义；超出该范围时，在回答开头标注「以下为通用医学知识，非本教材内容」。",
    `- 讲解风格：${HIDOC_LESSON_STYLE_LABELS[context.style]}；引用教材时写清页码（如「第 ${knowledgePoint.sourcePage} 页」）。`,
    "- 回答使用中文，简洁、结构清晰；可以用小标题与短列表，但不要使用表格或代码块；不要输出空泛鼓励语。",
    "- 不得声称教师强调过某内容，也不得编造教材页码。",
    "",
    `教材：《${context.textbookTitle}》`,
    `章节：${context.chapterTitle}`,
    `当前知识点：${knowledgePoint.title}（教材第 ${knowledgePoint.sourcePage} 页）`,
    `知识点说明：${knowledgePoint.description}`,
    knowledgePoint.keyTerms.length > 0 ? `关键术语：${knowledgePoint.keyTerms.join("、")}` : "关键术语：（未标注）",
    knowledgePoint.prerequisites.length > 0
      ? `先修知识点：${knowledgePoint.prerequisites.join("、")}`
      : "先修知识点：（未标注）",
    `本章知识点清单：${context.chapterKnowledgePointTitles.join("；") || "（本章暂无其它知识点）"}`,
    "",
    "本知识点教材原文片段（带【PDF 第 X 页】标记，引用时以这里的页码为准）：",
    excerpt,
    "",
    "本知识点讲义（如已生成）：",
    lesson,
  ].join("\n");
}

/** 组装模型消息：system + 最近历史 + 本轮提问（历史由服务端从库中读取，不接受客户端注入）。 */
export function buildHiDocChatModelMessages(
  context: HiDocChatContext,
  history: readonly HiDocChatMessage[],
  userMessage: string,
): HiDocChatModelMessage[] {
  const trimmed = trimHiDocChatHistory(history);
  return [
    { role: "system", content: buildHiDocChatSystemPrompt(context) },
    ...trimmed.map((message) => ({
      role: message.role,
      content: clip(message.content, HIDOC_CHAT_MESSAGE_MAX_CHARS),
    })),
    { role: "user", content: userMessage },
  ];
}