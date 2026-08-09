import type {
  CourseBuildPrivateOverlayInput,
  PrivateMaterialAnalysisProviderPlan,
  PrivateMaterialAnalysisQuestionPlan,
  PrivateMaterialAnalysisTopicPlan,
} from "@/types/course-builder";

const stableIdPattern = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,179}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasOnlyKeys(value: Record<string, unknown>, keys: readonly string[]) {
  const allowed = new Set(keys);
  return Object.keys(value).every((key) => allowed.has(key));
}

function isText(value: unknown, maximumLength: number): value is string {
  return typeof value === "string"
    && value.trim().length > 0
    && value.length <= maximumLength;
}

function parseIdList(value: unknown, maximumCount: number): string[] {
  if (!Array.isArray(value)
    || value.length < 1
    || value.length > maximumCount
    || !value.every((item) => typeof item === "string" && stableIdPattern.test(item))
  ) {
    throw new Error("Private material analysis returned an invalid excerpt ID list");
  }
  return [...value];
}

function parseTopic(value: unknown, maximumExcerptCount: number): PrivateMaterialAnalysisTopicPlan {
  if (!isRecord(value)
    || !hasOnlyKeys(value, ["id", "label", "rationale", "excerptIds"])
    || typeof value.id !== "string"
    || !stableIdPattern.test(value.id)
    || !isText(value.label, 160)
    || !isText(value.rationale, 600)
  ) {
    throw new Error("Private material analysis returned an invalid topic group");
  }
  return {
    id: value.id,
    label: value.label,
    rationale: value.rationale,
    excerptIds: parseIdList(value.excerptIds, maximumExcerptCount),
  };
}

function parseQuestion(
  value: unknown,
  maximumExcerptCount: number,
): PrivateMaterialAnalysisQuestionPlan {
  if (!isRecord(value)
    || !hasOnlyKeys(value, [
      "id",
      "topicId",
      "sourceExcerptIds",
      "normalizedPrompt",
      "questionKind",
      "sourceAnswerStatus",
      "answerDraft",
    ])
    || typeof value.id !== "string"
    || !stableIdPattern.test(value.id)
    || typeof value.topicId !== "string"
    || !stableIdPattern.test(value.topicId)
    || !isText(value.normalizedPrompt, 800)
    || !["short-answer", "term-explanation", "other-subjective"].includes(String(value.questionKind))
    || !["missing", "candidate-present-pending-review"].includes(String(value.sourceAnswerStatus))
    || !isRecord(value.answerDraft)
    || !hasOnlyKeys(value.answerDraft, [
      "referenceAnswer",
      "structurePoints",
      "uncertaintyNote",
    ])
    || !isText(value.answerDraft.referenceAnswer, 1800)
    || !Array.isArray(value.answerDraft.structurePoints)
    || value.answerDraft.structurePoints.length < 1
    || value.answerDraft.structurePoints.length > 10
    || !value.answerDraft.structurePoints.every((item) => isText(item, 240))
    || !isText(value.answerDraft.uncertaintyNote, 600)
  ) {
    throw new Error("Private material analysis returned an invalid question candidate");
  }
  return {
    id: value.id,
    topicId: value.topicId,
    sourceExcerptIds: parseIdList(value.sourceExcerptIds, maximumExcerptCount),
    normalizedPrompt: value.normalizedPrompt,
    questionKind: value.questionKind as PrivateMaterialAnalysisQuestionPlan["questionKind"],
    sourceAnswerStatus: value.sourceAnswerStatus as PrivateMaterialAnalysisQuestionPlan["sourceAnswerStatus"],
    answerDraft: {
      referenceAnswer: value.answerDraft.referenceAnswer,
      structurePoints: [...value.answerDraft.structurePoints] as string[],
      uncertaintyNote: value.answerDraft.uncertaintyNote,
    },
  };
}

export function parsePrivateMaterialAnalysisProviderPlan(
  value: unknown,
): PrivateMaterialAnalysisProviderPlan {
  if (!isRecord(value)
    || !hasOnlyKeys(value, [
      "version",
      "overlayId",
      "courseId",
      "knowledgePointId",
      "coverage",
      "topics",
      "questions",
      "unmapped",
      "conflicts",
      "missingFacts",
    ])
    || value.version !== 1
    || typeof value.overlayId !== "string"
    || !stableIdPattern.test(value.overlayId)
    || typeof value.courseId !== "string"
    || !stableIdPattern.test(value.courseId)
    || typeof value.knowledgePointId !== "string"
    || !stableIdPattern.test(value.knowledgePointId)
    || !isRecord(value.coverage)
    || !hasOnlyKeys(value.coverage, ["status", "compilationReadiness", "summary"])
    || !["partial", "ready-for-compilation", "unmapped"].includes(String(value.coverage.status))
    || ![
      "insufficient-for-full-course",
      "candidate-ready-for-optional-compilation",
    ].includes(String(value.coverage.compilationReadiness))
    || !isText(value.coverage.summary, 800)
    || !Array.isArray(value.topics)
    || value.topics.length > 40
    || !Array.isArray(value.questions)
    || value.questions.length > 80
    || !Array.isArray(value.unmapped)
    || value.unmapped.length > 80
    || !Array.isArray(value.conflicts)
    || value.conflicts.length > 24
    || !Array.isArray(value.missingFacts)
    || value.missingFacts.length > 24
    || !value.missingFacts.every((item) => isText(item, 400))
  ) {
    throw new Error("Private material analysis returned an invalid root object");
  }

  const topics = value.topics.map((item) => parseTopic(item, 80));
  const questions = value.questions.map((item) => parseQuestion(item, 80));
  const unmapped = value.unmapped.map((item) => {
    if (!isRecord(item)
      || !hasOnlyKeys(item, ["excerptId", "reason"])
      || typeof item.excerptId !== "string"
      || !stableIdPattern.test(item.excerptId)
      || !isText(item.reason, 600)
    ) {
      throw new Error("Private material analysis returned an invalid unmapped excerpt");
    }
    return { excerptId: item.excerptId, reason: item.reason };
  });
  const conflicts = value.conflicts.map((item) => {
    if (!isRecord(item)
      || !hasOnlyKeys(item, ["excerptIds", "description"])
      || !isText(item.description, 800)
    ) {
      throw new Error("Private material analysis returned an invalid conflict");
    }
    return {
      excerptIds: parseIdList(item.excerptIds, 80),
      description: item.description,
    };
  });

  return {
    version: 1,
    overlayId: value.overlayId,
    courseId: value.courseId,
    knowledgePointId: value.knowledgePointId,
    coverage: {
      status: value.coverage.status as PrivateMaterialAnalysisProviderPlan["coverage"]["status"],
      compilationReadiness: value.coverage.compilationReadiness as PrivateMaterialAnalysisProviderPlan["coverage"]["compilationReadiness"],
      summary: value.coverage.summary,
    },
    topics,
    questions,
    unmapped,
    conflicts,
    missingFacts: [...value.missingFacts] as string[],
  };
}

function isUnique(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}

function hasExactSet(actual: readonly string[], expected: readonly string[]): boolean {
  return isUnique(actual)
    && actual.length === expected.length
    && expected.every((id) => actual.includes(id));
}

export function assertValidPrivateMaterialAnalysisProviderPlan(
  plan: PrivateMaterialAnalysisProviderPlan,
  overlay: CourseBuildPrivateOverlayInput,
): void {
  const expectedExcerptIds = overlay.excerpts.map((excerpt) => excerpt.id);
  const topicIds = plan.topics.map((topic) => topic.id);
  const questionIds = plan.questions.map((question) => question.id);
  const mappedExcerptIds = plan.questions.flatMap((question) => question.sourceExcerptIds);
  const groupedExcerptIds = plan.topics.flatMap((topic) => topic.excerptIds);
  const unmappedExcerptIds = plan.unmapped.map((item) => item.excerptId);

  if (plan.overlayId !== overlay.overlayId
    || plan.courseId !== overlay.courseId
    || plan.knowledgePointId !== overlay.knowledgePointId
  ) {
    throw new Error("Private material analysis changed a protected target identity");
  }
  if (!isUnique(topicIds)) {
    throw new Error("Private material analysis returned duplicate topic IDs");
  }
  if (!isUnique(questionIds)) {
    throw new Error("Private material analysis returned duplicate question IDs");
  }
  if (!isUnique(mappedExcerptIds)) {
    throw new Error("Private material analysis mapped an excerpt more than once");
  }
  if (!isUnique(unmappedExcerptIds)) {
    throw new Error("Private material analysis returned a duplicate unmapped excerpt");
  }
  if (!hasExactSet([...mappedExcerptIds, ...unmappedExcerptIds], expectedExcerptIds)) {
    throw new Error("Private material analysis omitted or duplicated an authorized excerpt");
  }
  if (!hasExactSet(groupedExcerptIds, mappedExcerptIds)) {
    throw new Error("Private material analysis returned inconsistent topic excerpt coverage");
  }

  const topicById = new Map(plan.topics.map((topic) => [topic.id, topic]));
  plan.questions.forEach((question) => {
    const topic = topicById.get(question.topicId);
    if (!topic || question.sourceExcerptIds.some((id) => !topic.excerptIds.includes(id))) {
      throw new Error("Private material analysis returned an invalid question/topic mapping");
    }
  });

  const expectedSet = new Set(expectedExcerptIds);
  plan.conflicts.forEach((conflict) => {
    if (!isUnique(conflict.excerptIds)
      || conflict.excerptIds.some((id) => !expectedSet.has(id))
    ) {
      throw new Error("Private material analysis returned an unknown conflict excerpt");
    }
  });

  if ((plan.questions.length === 0 && plan.coverage.status !== "unmapped")
    || (plan.questions.length > 0 && plan.coverage.status === "unmapped")
  ) {
    throw new Error("Private material analysis returned inconsistent coverage");
  }
}

export function normalizePrivateMaterialAnalysisProviderPlan(
  plan: PrivateMaterialAnalysisProviderPlan,
  overlay: CourseBuildPrivateOverlayInput,
): PrivateMaterialAnalysisProviderPlan {
  const expectedExcerptIds = new Set(overlay.excerpts.map((excerpt) => excerpt.id));
  const headingExcerptIds = new Set(
    overlay.excerpts
      .filter((excerpt) => excerpt.kind === "heading")
      .map((excerpt) => excerpt.id),
  );
  const returnedExcerptIds = [
    ...plan.topics.flatMap((topic) => topic.excerptIds),
    ...plan.questions.flatMap((question) => question.sourceExcerptIds),
    ...plan.unmapped.map((item) => item.excerptId),
    ...plan.conflicts.flatMap((conflict) => conflict.excerptIds),
  ];
  if (returnedExcerptIds.some((excerptId) => !expectedExcerptIds.has(excerptId))) {
    throw new Error("Private material analysis returned an unknown excerpt ID");
  }

  const assignedExcerptIds = new Set<string>();
  const questions = plan.questions
    .map((question) => {
      const sourceExcerptIds = question.sourceExcerptIds.filter((excerptId) => {
        if (headingExcerptIds.has(excerptId) || assignedExcerptIds.has(excerptId)) {
          return false;
        }
        assignedExcerptIds.add(excerptId);
        return true;
      });
      return { ...question, sourceExcerptIds };
    })
    .filter((question) => question.sourceExcerptIds.length > 0);
  const referencedTopicIds = new Set(questions.map((question) => question.topicId));
  const topics = plan.topics
    .filter((topic) => referencedTopicIds.has(topic.id))
    .map((topic) => ({
      ...topic,
      excerptIds: questions
        .filter((question) => question.topicId === topic.id)
        .flatMap((question) => question.sourceExcerptIds),
    }));
  const providerUnmapped = plan.unmapped.filter((item) => {
    if (headingExcerptIds.has(item.excerptId) || assignedExcerptIds.has(item.excerptId)) {
      return false;
    }
    assignedExcerptIds.add(item.excerptId);
    return true;
  });
  const unmapped = [
    ...providerUnmapped,
    ...overlay.excerpts
      .filter((excerpt) => (
        !headingExcerptIds.has(excerpt.id) && !assignedExcerptIds.has(excerpt.id)
      ))
      .map((excerpt) => ({
        excerptId: excerpt.id,
        reason: "Qwen 未能稳定地把这条摘录映射到唯一题目；已降级为待人工核对的 unmapped，而不是补造关系。",
      })),
    ...overlay.excerpts
      .filter((excerpt) => headingExcerptIds.has(excerpt.id))
      .map((excerpt) => ({
        excerptId: excerpt.id,
        reason: "本地确定性规则：标题只作为结构线索，不生成问题或参考答案。",
      })),
  ];

  return {
    ...plan,
    coverage: {
      ...plan.coverage,
      status: questions.length > 0 ? "partial" : "unmapped",
      compilationReadiness: "insufficient-for-full-course",
    },
    topics,
    questions,
    unmapped,
  };
}
