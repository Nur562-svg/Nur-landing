// 题库课程边界问题分析：量化 order 重复 / B1 组超员 / groupPrompt 违规
import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "../src/types/learning";

const SUBJECTS = [
  "physiology", "diagnostics", "medical-genetics", "human-anatomy", "biochemistry",
  "histology-embryology", "cell-biology", "immunology", "microbiology", "neurology",
  "pharmacology", "topographic-anatomy", "pathology", "tcm-diagnostics-bank", "radiology-bank",
];
const EXPORT_BASE: Record<string, string> = {
  "cell-biology": "cellBio", "medical-genetics": "medicalGenetics",
  "human-anatomy": "humanAnatomy", "histology-embryology": "histologyEmbryology",
  "topographic-anatomy": "topographicAnatomy", "tcm-diagnostics-bank": "tcmDiagnosticsBank",
  "radiology-bank": "radiologyBank",
};

async function main() {
  for (const key of SUBJECTS) {
    const base = EXPORT_BASE[key] ?? key;
    const mod = await import(`../src/content/courses/${key}/index`);
    const items: AssessmentItemDefinition[] = mod[`${base}ExtractedItems`];
    const groups: AssessmentItemGroupDefinition[] = mod[`${base}ExtractedGroups`] ?? [];

    // 1) 每 kp 的 order 唯一性/递增问题
    const byKp = new Map<string, AssessmentItemDefinition[]>();
    for (const it of items) {
      const list = byKp.get(it.knowledgePointId) ?? [];
      list.push(it);
      byKp.set(it.knowledgePointId, list);
    }
    let orderIssues = 0;
    for (const [, list] of byKp) {
      const orders = list.map((i) => i.order);
      const uniq = new Set(orders).size === orders.length;
      const asc = orders.every((o, idx) => o === idx + 1);
      if (!uniq || !asc) orderIssues++;
    }

    // 2) 组问题
    const over4 = groups.filter((g) => g.members.length > 4);
    const b1WithPrompt = groups.filter((g) => g.questionKind === "b1" && g.groupPrompt !== null);
    const membersOrderBad = groups.filter((g) => {
      const o = g.members.map((m) => m.order);
      return !(new Set(o).size === o.length && o.every((v, i) => v === i + 1));
    });

    console.log(
      `${key.padEnd(22)} kp秩序问题 ${String(orderIssues).padStart(2)} · 组超4员 ${String(over4.length).padStart(3)} · B1带groupPrompt ${String(b1WithPrompt.length).padStart(2)} · 组内order乱 ${String(membersOrderBad.length).padStart(2)}`,
    );
    if (b1WithPrompt.length > 0) {
      const g = b1WithPrompt[0];
      console.log(`   样本 groupPrompt: ${String(g.groupPrompt).slice(0, 80)}`);
      console.log(`   成员首题 prompt: ${g.members[0]?.prompt.slice(0, 60)}`);
    }
  }
}
main();
