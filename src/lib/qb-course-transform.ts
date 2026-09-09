/**
 * 题库课程边界转换（供 generate-qb-course 生成的课程定义引用）。
 *
 * 职责：把 extracted 题库底稿转换为可通过课程注册表校验的课程数据，且**不修改底稿文件**：
 * 1. 来源补充：底稿按提取契约 sourceIds 为空，课程校验要求非空 → 统一挂教材来源；
 * 2. 知识点内 order 重排：多文件知识点（如诊断学一 KP 跨多文件）的题 order 会重复，
 *    按课程数组序在每个知识点内重排为 1..N（校验要求唯一+严格递增）；
 * 3. B1 组共用题干（groupPrompt）：B1 契约要求 groupPrompt 为 null，但部分提取组把
 *    共用题干放进了 groupPrompt（内容有语义）→ 并入每个成员 prompt 后置空；
 * 4. B1/B2 组拆分成 ≤4 成员（校验硬上限），成员保持原 order（原为组内/文件内递增）；
 * 5. 组 order 按输出序重排（校验要求组间唯一+递增）。
 */
import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

type AnyItem = AssessmentItemDefinition;
type AnyGroup = AssessmentItemGroupDefinition;

function enrichItem(it: AnyItem, sourceId: string): AnyItem {
  return {
    ...it,
    promptSource: { ...it.promptSource, sourceIds: [sourceId] },
    answer: it.answer.status === "available"
      ? { ...it.answer, sourceIds: [sourceId] }
      : it.answer,
  };
}

/** 把组均匀拆成 ≤4 成员的多个子组。 */
function splitParts(members: readonly AnyItem[]): AnyItem[][] {
  if (members.length <= 4) return [members as AnyItem[]];
  const parts = Math.ceil(members.length / 4);
  const base = Math.floor(members.length / parts);
  const extra = members.length % parts;
  const out: AnyItem[][] = [];
  let idx = 0;
  for (let p = 0; p < parts; p++) {
    const size = base + (p < extra ? 1 : 0);
    out.push(members.slice(idx, idx + size) as AnyItem[]);
    idx += size;
  }
  return out;
}

export function buildQbCourseAssessmentData(
  items: readonly AnyItem[],
  groups: readonly AnyGroup[],
  sourceId: string,
): { items: AnyItem[]; groups: AnyGroup[] } {
  // 1) 顶层题：per-kp order 重排（保持课程数组序）+ 来源补充
  const orderState: Record<string, number> = {};
  const itemsOut = items.map((it) => {
    const n = (orderState[it.knowledgePointId] =
      (orderState[it.knowledgePointId] ?? 0) + 1);
    return { ...enrichItem(it, sourceId), order: n };
  });

  // 2) 组：B1 剥离 groupPrompt（并入成员 prompt）→ 拆分 >4 → 组 order 重排
  const groupsOut: AnyGroup[] = [];
  groups.forEach((g) => {
    const base: AnyGroup =
      g.questionKind === "b1" && g.groupPrompt !== null
        ? {
            ...g,
            groupPrompt: null,
            members: g.members.map((m) => ({
              ...m,
              prompt: `${g.groupPrompt}\n${m.prompt}`,
            })),
          }
        : g;

    const parts = splitParts(base.members);
    parts.forEach((members, pi) => {
      groupsOut.push({
        ...base,
        id: pi === 0 ? base.id : `${base.id}-part${pi + 1}`,
        order: groupsOut.length + 1,
        promptSource: { ...base.promptSource, sourceIds: [sourceId] },
        members: members.map((m) => enrichItem(m, sourceId)),
      });
    });
  });

  return { items: itemsOut, groups: groupsOut };
}
