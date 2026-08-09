import type { CourseDefinition } from "@/types/learning";
import type { KnowledgePointDefinition } from "@/types/learning";
import type { SourceReference } from "@/types/learning";
import { selectSourcesByIds } from "@/lib/course-selectors";

export type ChatContext = {
  courseTitle: string;
  knowledgePointTitle: string;
  knowledgePointNote: string;
  evidenceFramework: readonly string[];
  lenses: readonly {
    perspective: string;
    title: string;
    explanation: string;
    observations: readonly string[];
  }[];
  relationships: readonly { label: string; note: string }[];
  sources: readonly { label: string; citation: string }[];
  lessonObjective: string | null;
  lensBlocks: readonly {
    perspective: string;
    title: string;
    summary: string;
    steps: readonly string[];
    boundaryNote: string;
  }[];
};

const RELATIONSHIP_LABELS: Record<string, string> = {
  related: "可关联",
  "learning-aid": "帮助理解",
  "not-equivalent": "不可直接等同",
};

function buildSourceCitation(source: SourceReference): { label: string; citation: string } | null {
  if (source.status === "pending" || !source.citation) {
    return null;
  }
  const c = source.citation;
  const parts: string[] = [c.label];
  if (c.edition) {
    parts.push(c.edition);
  }
  if (c.page) {
    parts.push(`第${c.page}页`);
  }
  if (c.slide) {
    parts.push(`幻灯片${c.slide}`);
  }
  if (c.academicYear) {
    parts.push(c.academicYear);
  }
  return {
    label: source.displayLabel,
    citation: parts.join(" · "),
  };
}

export function buildChatContext(
  course: CourseDefinition,
  kp: KnowledgePointDefinition,
): ChatContext {
  const lesson = kp.lesson;

  const sourceIds = [
    ...kp.sourceIds,
    ...(lesson?.sourceIds ?? []),
  ];
  const resolvedSources = selectSourcesByIds(course, sourceIds);
  const sources = resolvedSources
    .map(buildSourceCitation)
    .filter((s): s is { label: string; citation: string } => s !== null);

  const lenses = kp.lenses
    .filter((lens) => lens.status !== "pending")
    .map((lens) => ({
      perspective: lens.perspective,
      title: lens.title,
      explanation: lens.explanation,
      observations: lens.clinicalObservations,
    }));

  const relationships = kp.relationships.map((rel) => ({
    label: RELATIONSHIP_LABELS[rel.label] ?? rel.label,
    note: rel.note,
  }));

  const lensBlocks = (lesson?.lensBlocks ?? []).map((block) => ({
    perspective: block.perspective,
    title: block.title,
    summary: block.summary,
    steps: block.reasoningSteps,
    boundaryNote: block.boundaryNote,
  }));

  return {
    courseTitle: course.title,
    knowledgePointTitle: kp.title,
    knowledgePointNote: kp.note,
    evidenceFramework: kp.evidenceFramework,
    lenses,
    relationships,
    sources,
    lessonObjective: lesson?.objective ?? null,
    lensBlocks,
  };
}
