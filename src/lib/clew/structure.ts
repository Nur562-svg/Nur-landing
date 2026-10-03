/**
 * Clew 两层知识结构（ZCODE-M2 Phase 2，知纲模式，纯函数可测试）。
 * Chapter → KP → KP 内部结构（定义/公式/推导/案例）；
 * 三视图（初学/复习/备考）从同一事实基础派生，不重新生成事实。
 */

export type ClewContentItem = {
  id: string;
  type: "definition" | "formula" | "derivation" | "example" | "comparison" | "summary";
  title: string;
  content: string;
  order: number;
  evidenceId?: string;
};

/** 三视图（派生视图，不引入新事实）。 */
export type ClewThreeViews = {
  /** 完整笔记，包含所有推导与案例。 */
  firstStudy: string;
  /** 复习视图，折叠详细推导与案例。 */
  review: string;
  /** 备考视图，最大压缩。 */
  exam: string;
};

/** 知识点完整数据包（知纲 KnowledgePackage 的 Clew 适配）。 */
export type ClewKnowledgePackage = {
  kpId: string;
  contentItems: ClewContentItem[];
  views: ClewThreeViews;
  versions: {
    evidenceVersion: number;
    structureVersion: number;
    noteVersion: number;
  };
};

const ITEM_LABELS: Record<ClewContentItem["type"], string> = {
  definition: "定义",
  formula: "公式",
  derivation: "推导",
  example: "案例",
  comparison: "对比",
  summary: "要点",
};

function renderItem(item: ClewContentItem): string {
  return `**${ITEM_LABELS[item.type]} · ${item.title}**\n\n${item.content}`;
}

/** 复习视图保留的条目类型（折叠 derivation/example）。 */
const REVIEW_TYPES: ReadonlySet<ClewContentItem["type"]> = new Set([
  "definition",
  "formula",
  "comparison",
  "summary",
]);

/** 备考视图只保留最大压缩的高价值条目。 */
const EXAM_TYPES: ReadonlySet<ClewContentItem["type"]> = new Set([
  "formula",
  "summary",
  "comparison",
]);

/**
 * 从同一批内容条目派生三视图：
 * firstStudy 全量；review 保留 definition/formula/comparison/summary（推导与案例折叠为标题行）；
 * exam 只保留 formula/summary/comparison。
 */
export function deriveThreeViews(contentItems: readonly ClewContentItem[]): ClewThreeViews {
  const ordered = [...contentItems].sort((a, b) => a.order - b.order);

  const firstStudy = ordered.map(renderItem).join("\n\n---\n\n");

  const reviewParts: string[] = [];
  const examParts: string[] = [];
  for (const item of ordered) {
    if (REVIEW_TYPES.has(item.type)) {
      reviewParts.push(renderItem(item));
    } else {
      reviewParts.push(`**${ITEM_LABELS[item.type]} · ${item.title}**（复习时展开）`);
    }
    if (EXAM_TYPES.has(item.type)) {
      examParts.push(renderItem(item));
    }
  }

  return {
    firstStudy,
    review: reviewParts.join("\n\n---\n\n"),
    exam: examParts.join("\n\n---\n\n"),
  };
}

/** 组装知识点数据包（含版本追踪；视图从条目派生）。 */
export function buildKnowledgePackage(
  kpId: string,
  contentItems: readonly ClewContentItem[],
  versions?: Partial<ClewKnowledgePackage["versions"]>,
): ClewKnowledgePackage {
  return {
    kpId,
    contentItems: [...contentItems].sort((a, b) => a.order - b.order),
    views: deriveThreeViews(contentItems),
    versions: {
      evidenceVersion: versions?.evidenceVersion ?? 1,
      structureVersion: versions?.structureVersion ?? 1,
      noteVersion: versions?.noteVersion ?? 1,
    },
  };
}
