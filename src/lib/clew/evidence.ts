/**
 * Clew 证据绑定（ZCODE-M2 Phase 2，知纲模式，纯函数可测试）。
 * 每个知识点绑定原文证据（页码 + 引用文本）；证据是不可修改的学习内容「真源」。
 * 章节文字带【PDF 第 X 页】页标记（buildChapterModelText 的输出格式）。
 */

export type ClewEvidenceAtom = {
  id: string;
  textbookId: string;
  chapterId: string;
  pageNumber: number;
  /** 原文文本。 */
  text: string;
  contextBefore?: string;
  contextAfter?: string;
};

/** 知识点-证据绑定。 */
export type ClewKnowledgePointEvidence = {
  kpId: string;
  evidenceIds: string[];
  /** 主要证据（最相关的一页）。 */
  primaryEvidenceId: string;
};

const PAGE_MARKER = /【PDF 第 (\d+) 页】/g;

/** 从带页标记的章节文本中按页切出证据原子（每页一条）。 */
export function extractEvidenceAtoms(
  chapterText: string,
  chapter: { textbookId: string; chapterId: string },
): ClewEvidenceAtom[] {
  const atoms: ClewEvidenceAtom[] = [];
  const matches = Array.from(chapterText.matchAll(PAGE_MARKER));
  for (let index = 0; index < matches.length; index++) {
    const match = matches[index];
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? chapterText.length) : chapterText.length;
    const pageNumber = Number.parseInt(match[1], 10);
    if (!Number.isInteger(pageNumber)) {
      continue;
    }
    const text = chapterText.slice(start, end).trim();
    if (text.length === 0) {
      continue;
    }
    atoms.push({
      id: `${chapter.chapterId}:p${pageNumber}`,
      textbookId: chapter.textbookId,
      chapterId: chapter.chapterId,
      pageNumber,
      text,
    });
  }
  return atoms;
}

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .replace(/\s+/g, "")
      .split(/[,，、;；。：:（）()【】\s]+/)
      .filter((token) => token.length > 0),
  );
}

/** 简化 Jaccard 相似度（字符 bigram），用于 KP ↔ 页面证据的相关度评分。 */
function bigramSimilarity(a: string, b: string): number {
  const normalize = (value: string) => value.replace(/\s+/g, "");
  const left = normalize(a);
  const right = normalize(b);
  if (left.length < 2 || right.length < 2) {
    return 0;
  }
  const grams = (value: string) => {
    const set = new Set<string>();
    for (let i = 0; i < value.length - 1; i++) {
      set.add(value.slice(i, i + 2));
    }
    return set;
  };
  const leftGrams = grams(left);
  const rightGrams = grams(right);
  let intersection = 0;
  for (const gram of leftGrams) {
    if (rightGrams.has(gram)) {
      intersection += 1;
    }
  }
  return intersection / (leftGrams.size + rightGrams.size - intersection);
}

export type ClewKnowledgePointLike = {
  id: string;
  title: string;
  description?: string;
  keyTerms?: readonly string[];
  sourcePage?: number;
};

/**
 * 将 KP 与最相关的证据原子关联：
 * 标题 + 术语 + 描述 与每页文本的相似度加权，页码一致时显著加权（页码是萃取时的强信号）。
 */
export function linkKnowledgePointToEvidence(
  kp: ClewKnowledgePointLike,
  evidenceAtoms: readonly ClewEvidenceAtom[],
): ClewKnowledgePointEvidence {
  const scored = evidenceAtoms.map((atom) => {
    let score = bigramSimilarity(kp.title, atom.text);
    for (const term of kp.keyTerms ?? []) {
      if (term && atom.text.includes(term)) {
        score += 0.05;
      }
    }
    if (kp.description) {
      score += 0.5 * bigramSimilarity(kp.description, atom.text);
    }
    if (typeof kp.sourcePage === "number" && atom.pageNumber === kp.sourcePage) {
      score += 1;
    }
    return { atom, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const related = scored.filter((entry) => entry.score > 0).slice(0, 3);

  if (related.length === 0) {
    return { kpId: kp.id, evidenceIds: [], primaryEvidenceId: "" };
  }

  // 主要证据 = 得分最高；其余按页码升序作为辅助证据
  const primary = related[0];
  const others = related.slice(1).sort((a, b) => a.atom.pageNumber - b.atom.pageNumber);
  return {
    kpId: kp.id,
    evidenceIds: [primary.atom.id, ...others.map((entry) => entry.atom.id)],
    primaryEvidenceId: primary.atom.id,
  };
}
