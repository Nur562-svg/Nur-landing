import "server-only";

import { prisma } from "@/lib/prisma";

/**
 * Clew 知识点证据原子上下文（ZCODE-M6-D，任务书 §七 D-1；server-only）。
 * 按 KP 绑定读取 ClewEvidenceAtom（isPrimary 优先、relevanceScore 降序），
 * 供讲义/问答的上下文加宽（D-2/D-4）。**有则增强、无则返回 null**——调用方
 * 回落既有上下文路径，不造数据（v4qa 教材 0 原子 0 绑定时行为与改造前逐字一致）。
 */

export type ClewKpEvidenceAtomContext = {
  /** 证据原子所在教材页序（1 起，与 KP sourcePage 同源）。 */
  page: number;
  /** 原文文本（超预算截断并如实带省略号）。 */
  text: string;
};

export type ClewKpEvidenceContextOptions = {
  /** 最多取多少个原子（默认 5）。 */
  maxAtoms?: number;
  /** 全部原子正文的总字符预算（默认 2000；单原子 ≈ maxChars/maxAtoms）。 */
  maxChars?: number;
};

export async function loadClewKpEvidenceContext(
  kpId: string,
  options: ClewKpEvidenceContextOptions = {},
): Promise<ClewKpEvidenceAtomContext[] | null> {
  const maxAtoms = Math.min(Math.max(options.maxAtoms ?? 5, 1), 20);
  const maxChars = Math.min(Math.max(options.maxChars ?? 2000, 100), 8000);
  const perAtomChars = Math.max(Math.floor(maxChars / maxAtoms), 100);

  const rows = await prisma.clewKnowledgePointEvidence.findMany({
    where: { kpId },
    orderBy: [{ isPrimary: "desc" }, { relevanceScore: "desc" }, { createdAt: "asc" }],
    take: maxAtoms,
    select: { evidence: { select: { pageNumber: true, text: true } } },
  });
  if (rows.length === 0) {
    return null;
  }

  const atoms: ClewKpEvidenceAtomContext[] = [];
  let budget = maxChars;
  for (const row of rows) {
    if (budget <= 0) {
      break;
    }
    const clip = Math.min(perAtomChars, budget);
    const text = row.evidence.text.length > clip ? `${row.evidence.text.slice(0, clip)}…` : row.evidence.text;
    budget -= text.length;
    atoms.push({ page: row.evidence.pageNumber, text });
  }
  return atoms;
}
