// 与 payment/service.ts 同一约定：注释标注 server-only（只被服务端 API 引用），
// 不写 `import "server-only"`，使 node:test 可导入做隔离 SQLite 验证。
import { prisma } from "@/lib/prisma";

/**
 * 跨 KP 跳转建议（ZCODE-M6，D10，Nur 2026-10-06 提出）。
 * 场景：在「胸骨角」问「人体解剖姿势」，回答结束后建议「相关知识点：人体解剖姿势 → 跳转」。
 * 确定性实现（反幻觉）：拿本书其他知识点的标题与术语对回答文本做包含匹配——
 * **不做模型自报链接**；导航必须可验证。命中不到就不渲染，绝不硬凑。
 */

export type ClewKpSuggestionCandidate = {
  kpId: string;
  title: string;
  keyTerms: readonly string[];
  /** 深链（服务端拼好：/learn/clew/t/{textbookId}/c/{chapterOrder}?kp={kpId}）。 */
  href: string;
};

export type ClewKpSuggestion = {
  kpId: string;
  title: string;
  href: string;
};

/** 术语参与匹配的最小长度（避开「的」「是」这类虚词误命中）。 */
const MIN_TERM_CHARS = 2;
/** 每条回答至多的建议数（克制，不刷屏）。 */
export const MAX_KP_SUGGESTIONS = 2;

/** 纯匹配核心（供测试）：标题全命中优先，术语次之；排除当前 KP；去重；截断。 */
export function matchClewKpSuggestions(
  answerText: string,
  candidates: readonly ClewKpSuggestionCandidate[],
  excludeKpId: string,
): ClewKpSuggestion[] {
  if (answerText.trim().length === 0) {
    return [];
  }
  const hits: ClewKpSuggestion[] = [];
  const seen = new Set<string>();
  // 标题命中优先（权重：标题 > 术语），保持 candidates 原序稳定
  const titleHits = candidates.filter(
    (candidate) => candidate.kpId !== excludeKpId && answerText.includes(candidate.title),
  );
  for (const candidate of titleHits) {
    if (!seen.has(candidate.kpId)) {
      seen.add(candidate.kpId);
      hits.push({ kpId: candidate.kpId, title: candidate.title, href: candidate.href });
    }
  }
  if (hits.length >= MAX_KP_SUGGESTIONS) {
    return hits.slice(0, MAX_KP_SUGGESTIONS);
  }
  for (const candidate of candidates) {
    if (candidate.kpId === excludeKpId || seen.has(candidate.kpId)) {
      continue;
    }
    const termHit = candidate.keyTerms.find(
      (term) => term.trim().length >= MIN_TERM_CHARS && answerText.includes(term.trim()),
    );
    if (termHit) {
      seen.add(candidate.kpId);
      hits.push({ kpId: candidate.kpId, title: candidate.title, href: candidate.href });
      if (hits.length >= MAX_KP_SUGGESTIONS) {
        break;
      }
    }
  }
  return hits;
}

/** 服务端计算：本书全部其他 KP 作为候选（跨章），按当前 KP 归属校验。 */
export async function computeClewKpSuggestions(
  userId: string,
  kpId: string,
  answerText: string,
): Promise<ClewKpSuggestion[]> {
  const current = await prisma.clewKnowledgePoint.findFirst({
    where: { id: kpId, chapter: { textbook: { userId, deletedAt: null } } },
    select: { id: true, chapter: { select: { textbookId: true } } },
  });
  if (!current) {
    return [];
  }
  const rows = await prisma.clewKnowledgePoint.findMany({
    where: { chapter: { textbookId: current.chapter.textbookId } },
    select: {
      id: true,
      title: true,
      keyTerms: true,
      chapter: { select: { order: true } },
    },
  });
  const candidates: ClewKpSuggestionCandidate[] = rows.map((row) => ({
    kpId: row.id,
    title: row.title,
    keyTerms: Array.isArray(row.keyTerms) ? (row.keyTerms as string[]) : [],
    href: `/learn/clew/t/${current.chapter.textbookId}/c/${row.chapter.order}?kp=${row.id}`,
  }));
  return matchClewKpSuggestions(answerText, candidates, kpId);
}
