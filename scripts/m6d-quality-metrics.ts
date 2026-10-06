/**
 * ZCODE-M6-D 质量对照三指标（任务书 §七 D-5；只读脚本，不改任何状态）。
 *
 * 用法：
 *   node --require ./tests/helpers/css-cjs-stub.cjs --import tsx \
 *     scripts/m6d-quality-metrics.ts [baseline|post|both]
 *
 * 指标：
 * 1. 结构完整性：讲义按当轮 rubric 的各节齐备率（baseline=旧四节，post=新六节），
 *    笔记按必备三节（章首导读/知识点笔记/自测题汇总）+ 新节出现情况；
 * 2. 页码引用核验：verifyCitations 对照该 KP 原文片段（+ 绑定原子）的失配率（同一校验器，前后可比）；
 * 3. 盲评：本脚本产出打乱标签的盲评包（quality-blind-packet.md），打分由 Nur/Hermes 双盲或评审面板完成。
 *
 * 产物：docs/design-references/m6-probe/quality-metrics.json + quality-blind-packet.md
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";

type Phase = "baseline" | "post";
type LessonArtifact = {
  phase: Phase;
  kpId: string;
  kpTitle: string;
  ok: boolean;
  latencyMs?: number;
  notes?: string[];
  contentMd?: string | null;
  error?: string;
};
type ChatArtifact = {
  phase: Phase;
  kpId: string;
  rounds: { question: string; ok: boolean; answer?: string | null; notes?: string[]; latencyMs?: number }[];
};

const which = (process.argv[2] ?? "both") as Phase | "both";
if (which !== "baseline" && which !== "post" && which !== "both") {
  console.error("用法：node --require ./tests/helpers/css-cjs-stub.cjs --import tsx scripts/m6d-quality-metrics.ts [baseline|post|both]");
  process.exit(1);
}

const envText = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
for (const line of envText.split("\n")) {
  const t = line.trim();
  if (!t || t.startsWith("#") || !t.includes("=")) continue;
  const i = t.indexOf("=")!;
  if (process.env[t.slice(0, i).trim()] === undefined) process.env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
}

const OLD_SECTIONS = ["定义", "要点", "易错点", "自测题"];
const NEW_SECTIONS = ["定义", "机制机理", "易混辨析", "要点", "易错点", "自测题"];

async function main(): Promise<void> {
  const { verifyCitations, splitExcerptPages } = await import("@/lib/clew/citation-verify");
  const { inspectLessonMarkdown } = await import("@/lib/clew/lesson-heuristic");
  const { validateGeneratedNote } = await import("@/lib/clew/note-heuristic");
  const { prisma } = await import("@/lib/prisma");

  const readArtifact = <T,>(phase: Phase, name: string): T | null => {
    const url = new URL(`../docs/design-references/m6-probe/quality-${phase}/${name}`, import.meta.url);
    if (!existsSync(url)) return null;
    return JSON.parse(readFileSync(url, "utf8")) as T;
  };

  const metricForPhase = async (phase: Phase) => {
  const dir = new URL(`../docs/design-references/m6-probe/quality-${phase}/`, import.meta.url);
  const files = existsSync(dir) ? readdirSync(dir) : [];
  const lessons: LessonArtifact[] = files
    .filter((f) => f.startsWith("lesson.") && f.endsWith(".json"))
    .map((f) => readArtifact<LessonArtifact>(phase, f))
    .filter((a): a is LessonArtifact => a !== null);
  const chats: ChatArtifact[] = files
    .filter((f) => f.startsWith("chat.") && f.endsWith(".json"))
    .map((f) => readArtifact<ChatArtifact>(phase, f))
    .filter((a): a is ChatArtifact => a !== null);

  const rubric = phase === "baseline" ? OLD_SECTIONS : NEW_SECTIONS;
  const lessonRows = [];
  for (const artifact of lessons) {
    if (!artifact.ok || !artifact.contentMd) {
      lessonRows.push({ kpId: artifact.kpId, ok: false, error: artifact.error ?? "无输出" });
      continue;
    }
    const structure = inspectLessonMarkdown(artifact.contentMd);
    const presentInRubric = rubric.filter((section) => structure.present.includes(section as never));
    const lesson = await prisma.clewLesson.findUnique({ where: { kpId: artifact.kpId }, select: { sourceExcerpt: true } });
    const pageMap = splitExcerptPages(lesson?.sourceExcerpt ?? "");
    const verification = verifyCitations(artifact.contentMd, pageMap);
    lessonRows.push({
      kpId: artifact.kpId,
      kpTitle: artifact.kpTitle,
      ok: true,
      rubric,
      sectionsPresent: structure.present,
      sectionsComplete: `${presentInRubric.length}/${rubric.length}`,
      selfTestCount: structure.selfTestCount,
      citationChecked: verification.checked,
      citationIssues: verification.issues.length,
      citationIssueSentences: verification.issues.map((issue) => `（第 ${issue.page} 页）${issue.sentence.slice(0, 50)}`),
      latencyMs: artifact.latencyMs,
      retryOrCitationNotes: (artifact.notes ?? []).filter((note) => note.includes("重试") || note.includes("页码引用")),
    });
  }

  const noteFiles = files.filter((f) => f.startsWith("note.") && f.endsWith(".json"));
  const noteRows = noteFiles.map((f) => {
    const artifact = readArtifact<{ phase: Phase; label: string; ok: boolean; contentMd?: string; latencyMs?: number }>(phase, f);
    if (!artifact?.ok || !artifact.contentMd) return { file: f, ok: false };
    const markdown = artifact.contentMd;
    return {
      file: f,
      label: artifact.label,
      ok: true,
      noteStructureValid: validateGeneratedNote(markdown).ok,
      sections: {
        overview: markdown.includes("## 章首导读"),
        points: markdown.includes("## 知识点笔记"),
        comparison: markdown.includes("## 易混概念对比"),
        pitfallList: markdown.includes("## 易错清单"),
        memoryHooks: markdown.includes("## 记忆钩"),
        reviewReminder: markdown.includes("## 复习提醒"),
        selfTest: markdown.includes("## 自测题汇总"),
      },
      latencyMs: artifact.latencyMs,
    };
  });

  const chatRows = chats.map((artifact) => ({
    kpId: artifact.kpId,
    rounds: artifact.rounds.map((round) => ({
      question: round.question,
      ok: round.ok,
      answerChars: round.answer?.length ?? 0,
      latencyMs: round.latencyMs,
      notes: round.notes ?? [],
    })),
  }));

  return { phase, lessons: lessonRows, notes: noteRows, chats: chatRows };
};

const metrics: Record<string, unknown> = { generatedAt: new Date().toISOString(), phases: {} };
const phases: Phase[] = which === "both" ? (["baseline", "post"] as Phase[]) : [which];
for (const phase of phases) {
  (metrics.phases as Record<string, unknown>)[phase] = await metricForPhase(phase);
}

const metricsOut = new URL("../docs/design-references/m6-probe/quality-metrics.json", import.meta.url);
writeFileSync(metricsOut, JSON.stringify(metrics, null, 2));
console.log(`指标已写入：${metricsOut.pathname}`);

// ---- 盲评包（两轮都存在时才生成）----
if (which === "both") {
  const loadLesson = (phase: Phase, kpId: string): string | null =>
    readArtifact<LessonArtifact>(phase, `lesson.${kpId}.json`)?.contentMd ?? null;
  const loadChat = (phase: Phase, kpId: string): string | null => {
    const artifact = readArtifact<ChatArtifact>(phase, `chat.${kpId}.json`);
    return artifact?.rounds.map((round) => `问：${round.question}\n答：${round.answer ?? "（失败）"}`).join("\n\n") ?? null;
  };

  const KP_IDS = ["v4qa-kp-01", "v4qa-kp-02", "cmuprmns8000m5epxbr12r1gq", "cmuprmns7000l5epxg7dmdx95", "cmuprmns8000n5epx1br2dnro"];
  // 确定性打乱（无随机源：按 kpId 排序 + 相位交替），标签剥离后无法从顺序推断相位
  const order = [...KP_IDS].sort();
  const lines: string[] = [
    "# M6-D 讲义/问答盲评包（标签已剥离；样本 ID 与相位映射见 Hermes 复核者单独持有）",
    "",
    "评分维度（每样本 1–5 分）：A 结构可读性 B 机制解释深度 C 易混辨析有用性 D 自测题可答性 E 引用可核查性",
    "",
  ];
  const mapping: unknown[] = [];
  let sampleNo = 0;
  for (const kpId of order) {
    for (const phase of ["baseline", "post"] as Phase[]) {
      sampleNo += 1;
      const neutralId = `S${String(sampleNo).padStart(2, "0")}`;
      const lesson = loadLesson(phase, kpId);
      const chat = loadChat(phase, kpId);
      lines.push(`---`, `## ${neutralId}（讲义）`, "", lesson ?? "（缺失）", "");
      if (chat) {
        lines.push(`## ${neutralId}-Q（同一来源的一轮问答）`, "", chat, "");
      }
      mapping.push({ neutralId, phase, kpId });
    }
  }
  const packetOut = new URL("../docs/design-references/m6-probe/quality-blind-packet.md", import.meta.url);
  writeFileSync(packetOut, lines.join("\n"));
  writeFileSync(
    new URL("../docs/design-references/m6-probe/quality-blind-key.json", import.meta.url),
    JSON.stringify(mapping, null, 2),
  );
  console.log(`盲评包：${packetOut.pathname}（映射另存 quality-blind-key.json，复核者持有）`);
}

  await prisma.$disconnect();
  process.exit(0);
}

void main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
