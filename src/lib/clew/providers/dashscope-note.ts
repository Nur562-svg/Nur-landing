import "server-only";

import type { ClewNoteModelInput } from "../note-heuristic";
import { ClewNoteProviderError, type ClewNoteProvider } from "../note-provider";
import { streamChatCompletion } from "./chat-transport";
import type { ResolvedClewModelConfig } from "./model-config";

/**
 * 学霸笔记适配器（OpenAI 兼容 chat/completions，流式 markdown 输出；ZCODE-M4 起接收任务级解析配置）。
 * 只汇总给定的讲义要点、划重点、批注与追问；没提供的（例如某知识点没有追问）就如实略去，不得编造。
 */

const requestTimeoutMs = 240_000;
const maxOutputTokens = 4000;

function buildPrompt(input: ClewNoteModelInput): string {
  const requiredShape = [
    "## 章首导读",
    "（2–4 句：本章覆盖范围、知识点数量、学习重点概览；只依据给定信息）",
    "## 知识点笔记",
    "### {序号}. {知识点标题}",
    "**核心定义**：（2–4 句）",
    "**要点**：",
    "- （3–6 条，来自该知识点的讲义要点；讲义缺失就写「该知识点尚未生成讲义」）",
    "**易错点**：",
    "- （2–4 条，来自该知识点的讲义易错点；讲义缺失就写「尚未生成讲义，无法汇总易错点」）",
    "**我的划重点**：（仅当该知识点提供了划重点时输出；引用原文并保留批注）",
    "**我的批注**：（仅当提供了批注时输出）",
    "**追问中暴露的问题**：（仅当提供了学习者追问时输出；只列真实问题，不得虚构）",
    "## 自测题汇总",
    "- 【{序号} {知识点标题}】{题干与参考答案}（逐条汇总各讲义自测题）",
  ].join("\n");

  return [
    "你是 Ariadne「Clew」的章级学霸笔记编写器。把学习者在某一章留下的学习痕迹汇总成一份可复习、可下载的中文笔记。",
    "输出要求（必须严格遵守，不要输出代码围栏，不要结构之外的寒暄）：",
    requiredShape,
    "约束：",
    "- 只使用给定的信息（知识点说明、讲义小节、划重点、批注、追问原文、自测题）。",
    "- 学习者没有提供的内容：划重点、批注、追问、讲义缺失的小节必须整段略去或如实说明，不得编造「你曾问到…」「你标记了…」。",
    "- 引用位置时写清页码（如「第 12 页」），不得编造页码，也不得声称教师强调过某内容。",
    "- 中医与现代医学表述分别说明，不要直接等同。",
    "- 自测题汇总必须覆盖所有提供了讲义的题目；没有讲义时写「本章暂无讲义自测题」。",
    `章级上下文：${JSON.stringify(input)}`,
  ].join("\n");
}

export function createDashScopeClewNoteProvider(
  config: ResolvedClewModelConfig,
): ClewNoteProvider {
  return {
    id: config.provider,
    model: config.model,
    async generateNote(input, onDelta) {
      try {
        return await streamChatCompletion({
          config,
          messages: [
            {
              role: "system",
              content:
                "只汇总给定的讲义要点、划重点、批注与追问原文；未提供的内容整段略去，绝不编造学习者行为或教师强调。",
            },
            { role: "user", content: buildPrompt(input) },
          ],
          onDelta,
          temperature: 0.3,
          maxOutputTokens,
          timeoutMs: requestTimeoutMs,
        });
      } catch (error) {
        throw new ClewNoteProviderError(
          error instanceof Error ? error.message : "学霸笔记模型调用失败",
        );
      }
    },
  };
}