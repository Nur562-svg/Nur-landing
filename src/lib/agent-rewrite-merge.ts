/**
 * Agent 改写提案 → 当前草稿的确定性合并（纯函数）。
 *
 * 边界：只做文本合并，不做任何状态写入。应用与撤销均由
 * 训练室组件在用户显式点击后执行；Agent 只提供提案文本。
 *
 * 合并语义（沿用 2026-07-22 用户确定的规则）：
 * - 草稿为空、过短（< 25 字）或与提案几乎无关 → 全量替换（mode: "replace"）；
 * - 否则按中文句切分，把提案作为「Agent 补充」插入到与提案最相关的句子之后，
 *   保留学生自己写的完整句（mode: "insert"）。
 */

export type RewriteMergeResult = {
  merged: string;
  mode: "insert" | "replace";
};

const minDraftLength = 25;
const unrelatedRelevanceThreshold = 0.06;
/** 不超过该长度的提案视为「补充单句」，与草稿字面是否重叠都只做插入，不整段替换。 */
const shortProposalLength = 20;

function splitSentences(text: string): string[] {
  const sentenceRegex = /([^。！？.!?\n]+[。！？.!?\n]*)/g;
  const sentences: string[] = [];
  let match;
  while ((match = sentenceRegex.exec(text)) !== null) {
    const sentence = match[1]?.trim() ?? "";
    if (sentence.length > 3) {
      sentences.push(sentence);
    }
  }
  return sentences;
}

function bigrams(text: string): Set<string> {
  const normalized = text.toLowerCase().replace(/\s+/g, "");
  const set = new Set<string>();
  for (let i = 0; i < normalized.length - 1; i += 1) {
    set.add(normalized.slice(i, i + 2));
  }
  return set;
}

/**
 * 相关性 = 草稿字符 bigram 出现在提案中的比例。
 * 用 bigram 而不是整词包含：中文草稿按标点切出的「词」往往整句长，
 * 整词包含对自然中文几乎恒为 0（旧实现因此把相关草稿误判为无关并整体替换）。
 */
function relevance(current: string, proposal: string): number {
  const draftBigrams = bigrams(current);
  if (draftBigrams.size === 0) {
    return 0;
  }
  const proposalBigrams = bigrams(proposal);
  let overlap = 0;
  for (const gram of draftBigrams) {
    if (proposalBigrams.has(gram)) {
      overlap += 1;
    }
  }
  return overlap / draftBigrams.size;
}

export function mergeRewriteIntoDraft(
  currentDraft: string,
  proposalText: string,
): RewriteMergeResult {
  const trimmedDraft = (currentDraft || "").trim();
  const trimmedProposal = (proposalText || "").trim();
  if (!trimmedDraft || trimmedDraft.length < minDraftLength) {
    return { merged: trimmedProposal, mode: "replace" };
  }

  // 无法切句（如无标点的中文长句）时保守追加：保留学生原文优先，
  // 因为此时相关性启发式不可靠，整体替换过于激进。
  const sentences = splitSentences(trimmedDraft);
  if (sentences.length === 0) {
    const supplement = "\n\n【Agent 补充建议】\n" + trimmedProposal;
    return { merged: trimmedDraft + supplement, mode: "insert" };
  }

  // 短提案（如 NUR 参考句「又称多食易饥」）只可能是单句补充：
  // 即使与草稿字面不重叠也插入而不是替换，保证「尽量不整段覆盖」。
  const isShortProposal = trimmedProposal.length <= shortProposalLength;
  if (!isShortProposal && relevance(trimmedDraft, trimmedProposal) < unrelatedRelevanceThreshold) {
    return { merged: trimmedProposal, mode: "replace" };
  }

  const proposalBigrams = bigrams(trimmedProposal);
  let bestIndex = 0;
  let bestScore = -1;
  sentences.forEach((sentence, index) => {
    let score = 0;
    for (const gram of bigrams(sentence)) {
      if (proposalBigrams.has(gram)) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  const before = sentences.slice(0, bestIndex + 1).join("");
  const after = sentences.slice(bestIndex + 1).join("");
  const supplement = "\n【Agent 补充（针对上面这段）】\n" + trimmedProposal;
  return { merged: before + supplement + after, mode: "insert" };
}
