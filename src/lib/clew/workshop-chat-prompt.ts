import type { HiDocChatMessage, HiDocWorkshopCitation } from "@/types/hidoc";
import type { HiDocChatModelMessage } from "./chat-prompt";
import { HIDOC_CHAT_MESSAGE_MAX_CHARS, trimHiDocChatHistory } from "./conversation";

/**
 * Hi doc M6 课题工作坊答疑提示词（纯函数，可测试）。
 * 与讲义/笔记不同：工作坊没有启发式兜底——检索不到或模型不可用即如实拒绝；
 * 回答只依据命中的材料片段，引用必须写材料名 + 页码/行号，不得编造材料内容或页码。
 */

export type HiDocWorkshopChatContext = {
  workshopTitle: string;
  /** 命中的材料片段（零命中时不走模型，见 workshops.ts）。 */
  citations: readonly HiDocWorkshopCitation[];
  /** 只读关联到的本人教材知识点（可为空；仅供回答参考，不写课程真相）。 */
  relatedKnowledgePoints: readonly { title: string; textbookTitle: string }[];
  /** 工作坊全部就绪材料的文件名清单（供模型了解材料范围）。 */
  materialFileNames: readonly string[];
};

/** 单条命中片段进入提示词的长度上限。 */
export const HIDOC_WORKSHOP_CITATION_MAX_CHARS = 900;

function clip(text: string, maxChars: number): string {
  return text.length > maxChars ? `${text.slice(0, maxChars)}\n…（已截断）` : text;
}

export function buildHiDocWorkshopChatSystemPrompt(context: HiDocWorkshopChatContext): string {
  const citationLines = context.citations.map(
    (citation, index) =>
      `【片段 ${index + 1}】${citation.fileName} · ${citation.locator}\n${clip(citation.excerpt, HIDOC_WORKSHOP_CITATION_MAX_CHARS)}`,
  );
  const related = context.relatedKnowledgePoints.length > 0
    ? context.relatedKnowledgePoints
      .map((kp) => `《${kp.textbookTitle}》知识点「${kp.title}」`)
      .join("；")
    : "（本次未关联到教材知识点）";

  return [
    "你是 NUR LEARN「Hi doc」课题工作坊里的学习搭档（语气：生动、有人味、像 Grok——直接、机敏，但不油腻）。",
    "你正在就学生自己上传的一组短材料答疑：先把材料说透，再允许一点点轻松。",
    "边界规则（硬约束）：",
    "- 回答只依据下方给出的材料命中片段；片段不足以回答时，明确说「材料里没有相关内容」，不得编造材料内容、页码或行号。",
    "- 引用材料时必须写清来源，格式如「（材料《文件名》第 3 页）」或「（材料《文件名》第 41–80 行）」。",
    "- 你是 AI 学习搭档，不是任课教师：不代替教师评分，不预测考试分数。",
    "- 不做临床诊断、不给个体化医疗建议。",
    "- 中医与现代医学表述分别说明，不要直接等同；不确定就直说不确定。",
    "- 联网搜索尚未接入：不要声称查阅了材料以外的来源；超出材料范围时明确标注「以下为通用医学知识，非本课题材料内容」。",
    "- 回答使用中文：可以说人话，但禁止空泛鸡汤；可用小标题与短列表，不要表格或代码块。",
    "",
    `课题：${context.workshopTitle}`,
    `本课题材料清单：${context.materialFileNames.join("、") || "（暂无材料）"}`,
    "",
    "命中片段（检索自本课题材料，引用以这里的材料名与页码/行号为准）：",
    citationLines.length > 0 ? citationLines.join("\n\n") : "（本次检索没有命中片段）",
    "",
    "关联到的本人教材知识点（只读参考，可能与问题相关）：",
    related,
  ].join("\n");
}

/** 组装模型消息：system + 最近历史 + 本轮提问（历史由服务端从库中读取，不接受客户端注入）。 */
export function buildHiDocWorkshopChatModelMessages(
  context: HiDocWorkshopChatContext,
  history: readonly HiDocChatMessage[],
  question: string,
): HiDocChatModelMessage[] {
  const trimmed = trimHiDocChatHistory(history);
  return [
    { role: "system", content: buildHiDocWorkshopChatSystemPrompt(context) },
    ...trimmed.map((message) => ({
      role: message.role,
      content: clip(message.content, HIDOC_CHAT_MESSAGE_MAX_CHARS),
    })),
    { role: "user", content: question },
  ];
}
