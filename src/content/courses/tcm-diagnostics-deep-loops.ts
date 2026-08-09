import type {
  AssessmentItemDefinition,
  CaseDefinition,
  KnowledgePointDefinition,
  SourceReference,
  StructuralAssistanceRule,
} from "@/types/learning";

const editorialSourceId = "source-tcm-deep-loops-editorial";

export const deepLoopSourceIds = {
  tongueTextbook: "source-tcm-tongue-textbook-pages",
  tongueReview: "source-tcm-tongue-teacher-review",
  coldHeatTextbook: "source-tcm-cold-heat-textbook-pages",
  coldHeatReview: "source-tcm-cold-heat-teacher-review",
  pulseTextbook: "source-tcm-pulse-textbook-pages",
  pulseReview: "source-tcm-pulse-teacher-review",
  exteriorInteriorTextbook: "source-tcm-exterior-interior-textbook-pages",
  exteriorInteriorReview: "source-tcm-exterior-interior-teacher-review",
  spleenTextbook: "source-tcm-spleen-textbook-pages",
  spleenReview: "source-tcm-spleen-teacher-review",
  spleenSlide: "source-tcm-spleen-teacher-slide",
  editorial: editorialSourceId,
} as const;

export const deepLoopSources = [
  {
    id: deepLoopSourceIds.tongueTextbook,
    order: 15,
    role: "knowledge-reference",
    type: "textbook",
    authority: "publisher",
    scope: "current-offering",
    displayLabel: "教材 · 腐腻苔与舌象合参",
    status: "verified",
    missingLabel: null,
    citation: {
      label: "《中医诊断学》第3版 · 第37、39页",
      edition: "上海科学技术出版社，2018年5月第3版",
      page: "37、39",
      slide: null,
      academicYear: null,
      url: null,
    },
    verifiedAt: "2026-07-19",
    materialArtifactIds: ["artifact-tcm-diagnostics-textbook-third"],
    locators: [
      { id: "locator-tcm-tongue-p37", artifactId: "artifact-tcm-diagnostics-textbook-third", kind: "page", value: "教材印刷页37（PDF页50）", label: "腐苔、腻苔的舌象特征与临床意义" },
      { id: "locator-tcm-tongue-p39", artifactId: "artifact-tcm-diagnostics-textbook-third", kind: "page", value: "教材印刷页39（PDF页52）", label: "舌质舌苔综合分析" },
    ],
  },
  {
    id: deepLoopSourceIds.tongueReview,
    order: 16,
    role: "knowledge-reference",
    type: "review-scope",
    authority: "teacher",
    scope: "current-offering",
    displayLabel: "教师重点 · 腐腻苔与舌象分析",
    status: "verified",
    missingLabel: null,
    citation: { label: "中诊保命重点 · 第1页", edition: null, page: "1（列教材P37、P39）", slide: null, academicYear: "2026 学年下学期", url: null },
    verifiedAt: "2026-07-19",
    materialArtifactIds: ["artifact-tcm-diagnostics-teacher-review"],
    locators: [{ id: "locator-tcm-tongue-review", artifactId: "artifact-tcm-diagnostics-teacher-review", kind: "page", value: "PDF第1页", label: "教师列明P37腐腻苔与P39舌象临床意义" }],
  },
  {
    id: deepLoopSourceIds.coldHeatTextbook,
    order: 17,
    role: "knowledge-reference",
    type: "textbook",
    authority: "publisher",
    scope: "current-offering",
    displayLabel: "教材 · 问寒热",
    status: "verified",
    missingLabel: null,
    citation: { label: "《中医诊断学》第3版 · 第52–53页", edition: "上海科学技术出版社，2018年5月第3版", page: "52–53", slide: null, academicYear: null, url: null },
    verifiedAt: "2026-07-19",
    materialArtifactIds: ["artifact-tcm-diagnostics-textbook-third"],
    locators: [{ id: "locator-tcm-cold-heat-p52-53", artifactId: "artifact-tcm-diagnostics-textbook-third", kind: "page", value: "教材印刷页52–53（PDF页65–66）", label: "恶寒发热、但寒不热、但热不寒、寒热往来" }],
  },
  {
    id: deepLoopSourceIds.coldHeatReview,
    order: 18,
    role: "knowledge-reference",
    type: "review-scope",
    authority: "teacher",
    scope: "current-offering",
    displayLabel: "教师重点 · 恶寒发热类型",
    status: "verified",
    missingLabel: null,
    citation: { label: "中诊保命重点 · 第1页", edition: null, page: "1（列教材P52–53）", slide: null, academicYear: "2026 学年下学期", url: null },
    verifiedAt: "2026-07-19",
    materialArtifactIds: ["artifact-tcm-diagnostics-teacher-review"],
    locators: [{ id: "locator-tcm-cold-heat-review", artifactId: "artifact-tcm-diagnostics-teacher-review", kind: "page", value: "PDF第1页", label: "教师列明恶寒发热三种类型及但热不寒分类" }],
  },
  {
    id: deepLoopSourceIds.pulseTextbook,
    order: 19,
    role: "knowledge-reference",
    type: "textbook",
    authority: "publisher",
    scope: "current-offering",
    displayLabel: "教材 · 常见病脉",
    status: "verified",
    missingLabel: null,
    citation: { label: "《中医诊断学》第3版 · 第69、71、73、79页", edition: "上海科学技术出版社，2018年5月第3版", page: "69、71、73、79", slide: null, academicYear: null, url: null },
    verifiedAt: "2026-07-19",
    materialArtifactIds: ["artifact-tcm-diagnostics-textbook-third"],
    locators: [{ id: "locator-tcm-pulse-pages", artifactId: "artifact-tcm-diagnostics-textbook-third", kind: "page", value: "教材印刷页69、71、73、79（PDF页82、84、86、92）", label: "诊脉方法、正常脉、病脉与脉象鉴别" }],
  },
  {
    id: deepLoopSourceIds.pulseReview,
    order: 20,
    role: "knowledge-reference",
    type: "review-scope",
    authority: "teacher",
    scope: "current-offering",
    displayLabel: "教师重点 · 病脉与鉴别",
    status: "verified",
    missingLabel: null,
    citation: { label: "中诊保命重点 · 第2页", edition: null, page: "2（列教材P69、P71、P73、P79）", slide: null, academicYear: "2026 学年下学期", url: null },
    verifiedAt: "2026-07-19",
    materialArtifactIds: ["artifact-tcm-diagnostics-teacher-review"],
    locators: [{ id: "locator-tcm-pulse-review", artifactId: "artifact-tcm-diagnostics-teacher-review", kind: "page", value: "PDF第2页", label: "教师列明寸关尺、正常脉、病脉及鉴别" }],
  },
  {
    id: deepLoopSourceIds.exteriorInteriorTextbook,
    order: 21,
    role: "knowledge-reference",
    type: "textbook",
    authority: "publisher",
    scope: "current-offering",
    displayLabel: "教材 · 表里辨证",
    status: "verified",
    missingLabel: null,
    citation: { label: "《中医诊断学》第3版 · 第89–91页", edition: "上海科学技术出版社，2018年5月第3版", page: "89–91", slide: null, academicYear: null, url: null },
    verifiedAt: "2026-07-19",
    materialArtifactIds: ["artifact-tcm-diagnostics-textbook-third"],
    locators: [{ id: "locator-tcm-exterior-interior-p89-91", artifactId: "artifact-tcm-diagnostics-textbook-third", kind: "page", value: "教材印刷页89–91（PDF页102–104）", label: "八纲概念、表证里证及鉴别" }],
  },
  {
    id: deepLoopSourceIds.exteriorInteriorReview,
    order: 22,
    role: "knowledge-reference",
    type: "review-scope",
    authority: "teacher",
    scope: "current-offering",
    displayLabel: "教师重点 · 表证与半表半里",
    status: "verified",
    missingLabel: null,
    citation: { label: "中诊保命重点 · 第2页", edition: null, page: "2", slide: null, academicYear: "2026 学年下学期", url: null },
    verifiedAt: "2026-07-19",
    materialArtifactIds: ["artifact-tcm-diagnostics-teacher-review"],
    locators: [{ id: "locator-tcm-exterior-interior-review", artifactId: "artifact-tcm-diagnostics-teacher-review", kind: "page", value: "PDF第2页", label: "教师列明表证、半表半里的概念和临床表现（问答）" }],
  },
  {
    id: deepLoopSourceIds.spleenTextbook,
    order: 23,
    role: "knowledge-reference",
    type: "textbook",
    authority: "publisher",
    scope: "current-offering",
    displayLabel: "教材 · 脾气虚与脾阳虚",
    status: "verified",
    missingLabel: null,
    citation: { label: "《中医诊断学》第3版 · 第121–123页", edition: "上海科学技术出版社，2018年5月第3版", page: "121–123", slide: null, academicYear: null, url: null },
    verifiedAt: "2026-07-19",
    materialArtifactIds: ["artifact-tcm-diagnostics-textbook-third"],
    locators: [{ id: "locator-tcm-spleen-p121-123", artifactId: "artifact-tcm-diagnostics-textbook-third", kind: "page", value: "教材印刷页121–123（PDF页134–136）", label: "脾气虚、脾阳虚及相关证候鉴别" }],
  },
  {
    id: deepLoopSourceIds.spleenReview,
    order: 24,
    role: "knowledge-reference",
    type: "review-scope",
    authority: "teacher",
    scope: "current-offering",
    displayLabel: "教师重点 · 脾阳虚病案",
    status: "verified",
    missingLabel: null,
    citation: { label: "中诊保命重点 · 第2页", edition: null, page: "2（列教材P122）", slide: null, academicYear: "2026 学年下学期", url: null },
    verifiedAt: "2026-07-19",
    materialArtifactIds: ["artifact-tcm-diagnostics-teacher-review"],
    locators: [{ id: "locator-tcm-spleen-review", artifactId: "artifact-tcm-diagnostics-teacher-review", kind: "page", value: "PDF第2页", label: "教师明确列出脾阳虚证病案分析" }],
  },
  {
    id: deepLoopSourceIds.spleenSlide,
    order: 25,
    role: "knowledge-reference",
    type: "teacher-slide",
    authority: "teacher",
    scope: "current-offering",
    displayLabel: "教师课件 · 脾胃重点",
    status: "available",
    missingLabel: null,
    citation: { label: "20240614_脾胃 锐化打印", edition: null, page: "1–17", slide: null, academicYear: "2026 学年下学期", url: null },
    verifiedAt: null,
    materialArtifactIds: ["artifact-tcm-diagnostics-spleen-slide"],
    locators: [{ id: "locator-tcm-spleen-slide-document", artifactId: "artifact-tcm-diagnostics-spleen-slide", kind: "page", value: "PDF页1–17", label: "锐化打印课件；逐页转录仍待审核" }],
  },
  {
    id: editorialSourceId,
    order: 26,
    role: "knowledge-reference",
    type: "editorial",
    authority: "nur-editorial",
    scope: "general-reference",
    displayLabel: "NUR · 五个证据推理循环",
    status: "available",
    missingLabel: null,
    citation: { label: "NUR LEARN 结构化教学与评分边界", edition: "2026-07-19", page: null, slide: null, academicYear: null, url: null },
    verifiedAt: null,
  },
] as const satisfies readonly SourceReference[];

type EvidenceGroupInput = {
  title: string;
  detail: string;
  prompts: readonly { label: string; question: string }[];
};

type DeepLoopConfig = {
  key: string;
  id: string;
  slug: string;
  order: number;
  title: string;
  note: string;
  evidenceFramework: readonly string[];
  primarySourceIds: readonly string[];
  tcmExplanation: string;
  tcmObservations: readonly string[];
  modernExplanation: string;
  modernObservations: readonly string[];
  memory: readonly [string, string, string, string, string, string];
  evidenceGroups: readonly EvidenceGroupInput[];
  practicePrompt: string;
  answerFramework: readonly string[];
  reasoningDetail: string;
  transfer: {
    title: string;
    prompt: string;
    evidenceLabels: readonly string[];
    reasoningSteps: readonly string[];
    boundaryNote: string;
  } | null;
  caseId?: string;
  assessmentPrompt: string;
  assessmentAnswer: readonly string[];
  assessmentSignals: readonly [readonly (readonly string[])[], readonly (readonly string[])[], readonly (readonly string[])[]];
};

function createRules(
  key: string,
  signals: DeepLoopConfig["assessmentSignals"],
): readonly StructuralAssistanceRule[] {
  return [
    {
      criterionId: `${key}-score-evidence`,
      memoryCriterionId: `${key}-memory-evidence`,
      signalGroups: signals[0],
      nextStepPrompt: "先补齐题干要求的关键证据与鉴别点。",
      rewriteSuggestion: "先列出关键观察证据，再标明哪些表现支持或不支持各候选。",
    },
    {
      criterionId: `${key}-score-reasoning`,
      memoryCriterionId: `${key}-memory-reasoning`,
      signalGroups: signals[1],
      nextStepPrompt: "把结论改写为“证据 → 病位/病性或机制 → 判断”。",
      rewriteSuggestion: "用证据链说明为何得到该判断，并写出最关键的鉴别依据。",
    },
    {
      criterionId: `${key}-score-boundary`,
      memoryCriterionId: `${key}-memory-boundary`,
      signalGroups: signals[2],
      nextStepPrompt: "补出四诊合参、测量条件或结论边界。",
      rewriteSuggestion: "说明单一观察不能独立定证，需结合其他证据复核，并保持两种医学视角分别论证。",
    },
  ];
}

function createDeepLoop(config: DeepLoopConfig): {
  point: KnowledgePointDefinition;
  assessment: AssessmentItemDefinition;
} {
  const allSourceIds = [...config.primarySourceIds, editorialSourceId];
  const tcmLensId = `lens-${config.key}-tcm`;
  const modernLensId = `lens-${config.key}-modern`;
  const assessmentId = `assessment-${config.key}-short`;
  const lesson = {
    id: `lesson-${config.key}`,
    status: "available" as const,
    eyebrow: "证据 → 鉴别 → 输出 → 迁移",
    objective: `完成${config.title}的证据组织、鉴别表达与迁移。`,
    durationMinutes: 24,
    sections: [
      { id: "evidence" as const, order: 1, indexLabel: "01", title: "取证", detail: "先记录可观察事实，不从单一标签跳到结论。" },
      { id: "compare" as const, order: 2, indexLabel: "02", title: "鉴别", detail: "把共同点、差异点和反证并排比较。" },
      { id: "output" as const, order: 3, indexLabel: "03", title: "输出", detail: "按评分结构写出完整推理链。" },
      { id: "transfer" as const, order: 4, indexLabel: "04", title: "迁移", detail: "换一组证据复用同一判断框架。" },
    ],
    evidenceGroups: config.evidenceGroups.map((group, groupIndex) => ({
      id: `evidence-${config.key}-${groupIndex + 1}`,
      order: groupIndex + 1,
      title: group.title,
      detail: group.detail,
      prompts: group.prompts.map((prompt, promptIndex) => ({
        id: `prompt-${config.key}-${groupIndex + 1}-${promptIndex + 1}`,
        label: prompt.label,
        question: prompt.question,
      })),
      sourceIds: config.primarySourceIds,
    })),
    lensBlocks: [
      {
        id: `reasoning-${config.key}-tcm`,
        perspective: "tcm" as const,
        status: "verified" as const,
        eyebrow: "中医推理",
        title: "从四诊证据到证候判断",
        summary: config.tcmExplanation,
        reasoningSteps: config.answerFramework,
        boundaryNote: "教材结论必须建立在四诊合参上；单一舌、脉或症状不能机械定证。",
        sourceIds: config.primarySourceIds,
      },
      {
        id: `reasoning-${config.key}-modern`,
        perspective: "modern-medicine" as const,
        status: "available" as const,
        eyebrow: "现代观察",
        title: "记录条件、症状组合与安全复核",
        summary: config.modernExplanation,
        reasoningSteps: ["确认观察或测量条件", "按症状组合提出复核方向", "识别需要进一步评估的线索"],
        boundaryNote: "现代医学观察帮助提高证据质量，但不把中医证候直接等同于现代疾病。",
        sourceIds: [editorialSourceId],
      },
    ],
    scoring: {
      id: `practice-scoring-${config.key}`,
      status: "available" as const,
      authority: "nur-platform" as const,
      title: "NUR 结构评分",
      totalPoints: 5,
      notice: "这是平台结构训练，不代表任课教师的真实给分规则；教师评分标准仍待导入。",
      prompt: config.practicePrompt,
      answerFramework: config.answerFramework,
      criteria: [
        { id: `practice-${config.key}-evidence`, order: 1, perspective: "tcm" as const, label: "证据完整", detail: "写出关键观察与鉴别点。", points: 2 },
        { id: `practice-${config.key}-reasoning`, order: 2, perspective: "tcm" as const, label: "推理连贯", detail: config.reasoningDetail, points: 2 },
        { id: `practice-${config.key}-boundary`, order: 3, perspective: "boundary" as const, label: "边界清楚", detail: "写出合参、复核或不可直接等同的边界。", points: 1 },
      ],
      sourceIds: allSourceIds,
    },
    transferCaseId: config.caseId ?? null,
    transferExercise: config.transfer ? {
      id: `transfer-${config.key}`,
      ...config.transfer,
      sourceIds: allSourceIds,
    } : null,
    sourceIds: allSourceIds,
  };

  const memoryCriteria = [
    { id: `${config.key}-memory-evidence`, order: 1, label: config.memory[0], detail: config.memory[1] },
    { id: `${config.key}-memory-reasoning`, order: 2, label: config.memory[2], detail: config.memory[3] },
    { id: `${config.key}-memory-boundary`, order: 3, label: config.memory[4], detail: config.memory[5] },
  ];

  return {
    point: {
      id: config.id,
      slug: config.slug,
      order: config.order,
      title: config.title,
      note: config.note,
      emphasis: "高频",
      contentStatus: "available",
      evidenceFramework: config.evidenceFramework,
      lenses: [
        { id: tcmLensId, perspective: "tcm", title: "中医视角", status: "verified", explanation: config.tcmExplanation, clinicalObservations: config.tcmObservations, missingLabel: null, sourceIds: config.primarySourceIds },
        { id: modernLensId, perspective: "modern-medicine", title: "现代医学视角", status: "available", explanation: config.modernExplanation, clinicalObservations: config.modernObservations, missingLabel: null, sourceIds: [editorialSourceId] },
      ],
      relationships: [
        { id: `relationship-${config.key}-related`, fromLensId: tcmLensId, toLensId: modernLensId, label: "related", status: "available", note: "两种视角可共享规范采集的症状、体征与时间变化。", sourceIds: allSourceIds },
        { id: `relationship-${config.key}-aid`, fromLensId: tcmLensId, toLensId: modernLensId, label: "learning-aid", status: "available", note: "现代观察中的条件控制与复核意识可帮助提高证据描述质量。", sourceIds: [editorialSourceId] },
        { id: `relationship-${config.key}-not-equivalent`, fromLensId: tcmLensId, toLensId: modernLensId, label: "not-equivalent", status: "available", note: "中医证候与现代疾病或测量指标不是一一对应，结论必须分别论证。", sourceIds: [editorialSourceId] },
      ],
      learningMemoryCriteria: memoryCriteria,
      sourceIds: allSourceIds,
      learningTaskIds: [],
      assessmentItemIds: [assessmentId],
      caseIds: config.caseId ? [config.caseId] : [],
      lesson,
    },
    assessment: {
      id: assessmentId,
      order: 1,
      knowledgePointId: config.id,
      questionKind: "short-answer",
      status: "available",
      prompt: config.assessmentPrompt,
      promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: `${config.title}主观表达训练`, note: "依据教材与教师重点重组，不冒充原题。", sourceIds: allSourceIds },
      answer: { status: "available", authority: "nur-platform", confidence: "source-cross-checked", content: config.assessmentAnswer, notice: "答案内容由教材页码交叉核对，表达结构由 NUR 整理；不是教师标准答案。", sourceIds: allSourceIds },
      scoring: {
        id: `scoring-${config.key}-short`,
        standardVersion: "nur-structure-v1",
        status: "available",
        authority: "nur-platform",
        title: "NUR 主观题结构评分",
        totalPoints: 6,
        suggestedCharacters: 220,
        notice: "仅用于结构训练；任课教师的真实评分点仍待确认。",
        answerFramework: config.assessmentAnswer,
        criteria: [
          { id: `${config.key}-score-evidence`, order: 1, perspective: "tcm", label: "证据与特征", detail: "关键表现完整且有鉴别价值。", points: 2 },
          { id: `${config.key}-score-reasoning`, order: 2, perspective: "tcm", label: "推理与鉴别", detail: config.reasoningDetail, points: 2 },
          { id: `${config.key}-score-boundary`, order: 3, perspective: "boundary", label: "合参与边界", detail: "说明复核条件、四诊合参或不可直接等同。", points: 2 },
        ],
        assistanceRules: createRules(config.key, config.assessmentSignals),
        sourceIds: allSourceIds,
      },
      sourceIds: allSourceIds,
    },
  };
}

const tongue = createDeepLoop({
  key: "tongue-coating",
  id: "kp-tongue-coating",
  slug: "tongue-coating",
  order: 3,
  title: "望舌苔",
  note: "舌质舌苔合参，重点鉴别腐苔与腻苔",
  evidenceFramework: ["苔质颗粒与疏密", "是否刮之易去", "舌质与苔色", "兼症与动态变化"],
  primarySourceIds: [deepLoopSourceIds.tongueTextbook, deepLoopSourceIds.tongueReview],
  tcmExplanation: "先分辨舌苔颗粒粗细、疏密、厚薄及是否刮之易去，再把苔质与舌色、舌形及全身证据合参。腐苔颗粒较大而疏松，腻苔颗粒细腻致密、刮之难去。",
  tcmObservations: ["腐苔颗粒较大、疏松", "腻苔颗粒细腻、致密黏着", "苔色、厚薄与津液状态", "舌质舌苔合参"],
  modernExplanation: "舌象记录首先要控制光线、饮食染色、口腔清洁与拍摄条件，并关注可重复性；这些条件只帮助提高观察可靠性。",
  modernObservations: ["自然光与白平衡", "饮食或药物染色", "口腔清洁和时间点", "连续观察的一致性"],
  memory: ["舌象证据", "能描述颗粒、疏密、黏着与刮除特征。", "腐腻鉴别", "能从特征推到食积、痰湿等方向并保留合参。", "观察边界", "能说明染色、光线和单一舌象的限制。"],
  evidenceGroups: [
    { title: "看苔质", detail: "先描述再命名。", prompts: [{ label: "颗粒", question: "颗粒粗大疏松，还是细腻致密？" }, { label: "黏着", question: "苔面是否黏着、刮之是否易去？" }] },
    { title: "看组合", detail: "不把苔质从整体舌象中拆开。", prompts: [{ label: "苔色厚薄", question: "颜色、厚薄与润燥怎样？" }, { label: "舌质", question: "舌色、舌形、舌态提供什么复核？" }] },
    { title: "看条件", detail: "排除非病理观察干扰。", prompts: [{ label: "时间与饮食", question: "观察前是否进食、刷舌或服药？" }, { label: "动态", question: "复查时舌象是否保持一致？" }] },
  ],
  practicePrompt: "如何鉴别腐苔与腻苔，并说明为什么必须舌质舌苔合参？",
  answerFramework: ["先写腐苔与腻苔的颗粒、疏密及黏着差异", "再写各自常提示的病理方向", "最后结合舌质、兼症和观察条件复核"],
  reasoningDetail: "能由苔质特征推到相应病理方向，并用舌质和兼症复核。",
  transfer: { title: "换一张舌象记录", prompt: "一份记录写“苔厚、颗粒细密、黏着不易刮去”，请先命名苔质，再列出需要补问与复核的证据。", evidenceLabels: ["颗粒细密", "黏着难去", "苔厚", "舌质与兼症待补"], reasoningSteps: ["按形态命名", "提出病理方向", "补齐舌质与全身证据", "排除染色和观察干扰"], boundaryNote: "照片或单次观察不能替代规范舌诊与四诊合参。" },
  assessmentPrompt: "简述腐苔与腻苔的舌象特征、常见意义及合参要点。",
  assessmentAnswer: ["腐苔表现为苔质颗粒较大、疏松而如豆腐渣堆积，刮之较易去；腻苔颗粒细腻致密、融合黏着，刮之不易去。", "腐苔多从食积、痰浊等方向分析；腻苔多从湿浊、痰饮、食积等方向分析，具体仍须结合苔色厚薄。", "判断时合参舌质、兼症和病程，并排除食物染色、光线与口腔清洁等干扰。"],
  assessmentSignals: [[ ["颗粒", "疏松"], ["细腻", "黏着"] ], [ ["食积", "痰"], ["湿", "合参"] ], [ ["舌质", "四诊"], ["染色", "光线", "不能"] ]],
});

const coldHeat = createDeepLoop({
  key: "cold-heat-inquiry",
  id: "kp-inquiry-cold-heat",
  slug: "cold-and-heat",
  order: 1,
  title: "问寒热",
  note: "恶寒发热及四种寒热类型",
  evidenceFramework: ["寒热是否并见", "轻重与先后", "持续或往来", "汗、痛、口渴与舌脉"],
  primarySourceIds: [deepLoopSourceIds.coldHeatTextbook, deepLoopSourceIds.coldHeatReview, "source-tcm-diagnostics-past-exams"],
  tcmExplanation: "问寒热先分恶寒发热、但寒不热、但热不寒、寒热往来，再依据轻重、先后、持续方式及兼症判断表里寒热与邪正状态。",
  tcmObservations: ["恶寒与发热是否同时出现", "恶寒重发热轻或相反", "壮热、潮热、微热", "寒热往来的规律"],
  modernExplanation: "应区分主观畏寒与实测体温，记录起病时间、热型、用药反应和危险伴随表现；这些信息用于安全评估，不等同于八纲结论。",
  modernObservations: ["主观寒冷感与实测体温", "起病和热型时间轴", "退热药或环境影响", "意识、呼吸、脱水等警示线索"],
  memory: ["寒热分型", "能先按并见、单见或往来分型。", "邪正推理", "能结合轻重、时间与兼症解释病位病性。", "测量边界", "能区分主观感觉、实测体温与中医寒热。"],
  evidenceGroups: [
    { title: "先分并见", detail: "确定寒与热的组合方式。", prompts: [{ label: "并见", question: "恶寒与发热是否同时存在？" }, { label: "单见", question: "是否只有寒或只有热？" }] },
    { title: "再看节律", detail: "轻重与时间模式决定分类。", prompts: [{ label: "轻重", question: "恶寒和发热哪一项更重？" }, { label: "节律", question: "持续、潮作还是交替往来？" }] },
    { title: "最后合参", detail: "用兼症收紧判断。", prompts: [{ label: "汗痛", question: "有无汗、头身痛或鼻塞？" }, { label: "津液舌脉", question: "口渴、二便、舌脉如何？" }] },
  ],
  practicePrompt: "说明恶寒发热的含义、常见类型及取证顺序。",
  answerFramework: ["定义恶寒与发热并见", "按恶寒重发热轻、发热重恶寒轻、发热轻而恶风分型", "结合汗、疼痛、口渴和舌脉判断并复核"],
  reasoningDetail: "能从寒热组合、轻重和节律推到病位病性方向。",
  transfer: { title: "重建寒热时间轴", prompt: "患者诉先恶寒，继而发热，体温最高39℃，伴无汗头痛。请把主观感受、实测数据与中医分型分层记录。", evidenceLabels: ["先恶寒后发热", "39℃", "无汗", "头痛"], reasoningSteps: ["区分主观与实测证据", "确定寒热组合", "结合汗痛提出方向", "补问病程与舌脉"], boundaryNote: "体温数值不能直接替代中医寒热辨证；持续高热或危险伴随表现需及时评估。" },
  assessmentPrompt: "何谓恶寒发热？其辨证意义、产生机理和常见类型是什么？",
  assessmentAnswer: ["恶寒发热指患者恶寒与发热同时出现，是表证常见的寒热表现。", "其形成与外邪袭表、卫阳被遏及正邪相争有关；轻重差异可提示邪气性质与邪正状态。", "常分恶寒重发热轻、发热重恶寒轻、发热轻而恶风三类，并结合汗、头身痛、口渴和舌脉复核。"],
  assessmentSignals: [[ ["恶寒", "发热"], ["同时", "并见"] ], [ ["卫阳", "外邪"], ["三", "类型", "恶风"] ], [ ["体温", "主观", "四诊"], ["不能", "复核"] ]],
});

const pulse = createDeepLoop({
  key: "common-pulses",
  id: "kp-pulse-common",
  slug: "common-pulses",
  order: 3,
  title: "常见病脉",
  note: "浮沉迟数与洪脉，先脉象后主病",
  evidenceFramework: ["浮沉位置", "迟数频率", "强弱与形态", "诊脉条件与兼症"],
  primarySourceIds: [deepLoopSourceIds.pulseTextbook, deepLoopSourceIds.pulseReview, "source-tcm-diagnostics-whitebook"],
  tcmExplanation: "病脉学习先写可触知的位、数、形、势，再谈主病。浮沉反映脉位，迟数反映至数，洪脉以脉体宽大、来盛去衰为核心，均须结合有力无力及兼症。",
  tcmObservations: ["轻取即得或重按始得", "一息至数", "脉体宽窄与来去之势", "有力无力及寸关尺分布"],
  modernExplanation: "记录脉搏应注明静息状态、测量时长、节律、频率和影响因素；触诊脉象与现代脉搏指标相关但并非同一概念。",
  modernObservations: ["静息与运动状态", "测量时长和频率", "节律是否规则", "发热、情绪、药物等影响"],
  memory: ["脉象四维", "能按位、数、形、势描述脉象。", "脉证合参", "能先写脉象再结合有力无力与兼症推主病。", "测量边界", "能说明诊脉条件及脉象不等同于单一脉率。"],
  evidenceGroups: [
    { title: "定位与计数", detail: "先确定脉位和至数。", prompts: [{ label: "浮沉", question: "轻取、中取、重按分别怎样？" }, { label: "迟数", question: "在平息条件下一息多少至？" }] },
    { title: "形态与力量", detail: "再描述形和势。", prompts: [{ label: "形", question: "脉体宽窄、长短与流利度怎样？" }, { label: "势", question: "来势去势及有力无力怎样？" }] },
    { title: "合参条件", detail: "把脉象放回患者状态。", prompts: [{ label: "条件", question: "是否静息，情绪、运动、药物有无影响？" }, { label: "兼症", question: "寒热、汗、疼痛和舌象提供什么复核？" }] },
  ],
  practicePrompt: "用“位、数、形、势”比较浮、沉、迟、数与洪脉，并说明主病判断边界。",
  answerFramework: ["分别写浮沉的脉位和迟数的至数", "写洪脉脉体宽大、来盛去衰的形势", "结合有力无力、兼症及诊脉条件判断主病"],
  reasoningDetail: "能把位、数、形、势与有力无力组合，避免见一脉即定一证。",
  transfer: { title: "先描述，后命名", prompt: "记录为“轻取即得，脉体宽大，来势盛而去势渐衰，数而有力”。请按四维重写并列出需要核对的兼症。", evidenceLabels: ["轻取即得", "脉体宽大", "来盛去衰", "数而有力"], reasoningSteps: ["拆分位数形势", "命名候选脉象", "结合有力无力", "补齐寒热汗舌等证据"], boundaryNote: "单次触诊受状态与技术影响，不能把中医脉象直接等同于现代脉率或血压。" },
  assessmentPrompt: "简述洪脉的脉象特点、常见临床意义及判断边界。",
  assessmentAnswer: ["洪脉的核心特征是脉体宽大，充实有力，来势盛而去势渐衰。", "多从阳明气分热盛等方向分析；若脉洪大而无力，则须结合病程与正气状态另作判断。", "应在平息、规范诊脉条件下结合寒热、汗、口渴和舌象，不能只凭脉率或单一脉象定证。"],
  assessmentSignals: [[ ["宽大", "有力"], ["来盛", "去衰"] ], [ ["热", "阳明", "气分"], ["无力", "病程"] ], [ ["平息", "兼症", "舌"], ["不能", "脉率"] ]],
});

const exteriorInterior = createDeepLoop({
  key: "exterior-interior",
  id: "kp-eight-principles-exterior-interior",
  slug: "exterior-interior",
  order: 1,
  title: "表里辨证",
  note: "表证、里证与表里转化",
  evidenceFramework: ["病程新久", "恶寒发热", "内脏症状", "舌脉与转化趋势"],
  primarySourceIds: [deepLoopSourceIds.exteriorInteriorTextbook, deepLoopSourceIds.exteriorInteriorReview, "source-tcm-diagnostics-whitebook", "source-tcm-diagnostics-past-exams"],
  tcmExplanation: "表里辨证判断病位浅深。表证多见新起、恶寒发热、头身痛、鼻塞、脉浮等；里证范围广，须结合脏腑、气血津液等内部病变证据。还要追踪由表入里或由里出表的变化。",
  tcmObservations: ["新起与病程较长", "恶寒发热和头身痛", "脏腑症状与二便饮食", "舌象、脉位及证候转化"],
  modernExplanation: "病程时间轴、系统症状与危险信号有助于描述病情进展，但解剖学的内外位置不能直接替代八纲表里。",
  modernObservations: ["起病时间与进展", "局部和全身症状", "生命体征与危险信号", "治疗后变化"],
  memory: ["表里证据", "能用病程、寒热、内脏症状和舌脉区分表里。", "转化推理", "能说明由表入里或由里出表的证据变化。", "概念边界", "能说明八纲表里不等同于解剖内外。"],
  evidenceGroups: [
    { title: "判断病位", detail: "从病程和主症建立表里候选。", prompts: [{ label: "病程", question: "起病急缓、病程新久怎样？" }, { label: "表证线索", question: "有无恶寒发热、头身痛、鼻塞与脉浮？" }] },
    { title: "寻找里证", detail: "确认内在病变证据。", prompts: [{ label: "脏腑", question: "饮食、胸腹、二便、神志有何异常？" }, { label: "舌脉", question: "舌象和脉象如何支持或反驳？" }] },
    { title: "追踪转化", detail: "静态分类之后还要看趋势。", prompts: [{ label: "入里", question: "恶寒减而里热、口渴等是否加重？" }, { label: "出表", question: "里证减轻并出现向外透达的证据吗？" }] },
  ],
  practicePrompt: "简述表证的特点、临床表现，并说明表里转化如何判断。",
  answerFramework: ["先定义表证并列病程新、恶寒发热、头身痛、鼻塞、脉浮等证据", "再与里证的脏腑内部症状及舌脉比较", "最后用前后证据变化说明表里转化"],
  reasoningDetail: "能由病程与证据组合判断病位，并用时间轴解释转化。",
  transfer: { title: "识别由表入里", prompt: "患者初起恶寒发热、无汗头痛，两日后恶寒消失而高热口渴、烦躁加重。请写出前后证据与病位变化。", evidenceLabels: ["初起恶寒发热", "无汗头痛", "恶寒消失", "高热口渴烦躁"], reasoningSteps: ["分别归纳前后证据", "判断初始病位", "判断后续病位病性", "用变化链说明转化"], boundaryNote: "表里是八纲病位判断，不等同于解剖学的体表与内脏二分。" },
  assessmentPrompt: "简述表证的特点、主要临床表现及与里证鉴别的基本思路。",
  assessmentAnswer: ["表证是六淫等邪气经皮毛、口鼻侵入，正邪相争于浅表所表现的证候，通常起病较急、病程较短。", "常见恶寒发热、头身疼痛、鼻塞喷嚏，舌苔薄白、脉浮等；具体表现随邪气性质和体质而异。", "鉴别里证应结合有无典型表证、内脏症状、舌脉和病程，并追踪证据变化判断表里转化。"],
  assessmentSignals: [[ ["起病", "病程"], ["恶寒发热", "脉浮"] ], [ ["表", "里"], ["脏腑", "转化"] ], [ ["舌脉", "合参"], ["解剖", "不能"] ]],
});

const spleenCaseId = "case-spleen-qi-yang-differential";

const spleen = createDeepLoop({
  key: "spleen-qi-yang",
  id: "kp-organs-spleen-stomach",
  slug: "spleen-stomach",
  order: 3,
  title: "脾胃病辨证",
  note: "脾气虚与脾阳虚鉴别，并完成病案推理",
  evidenceFramework: ["运化失健共性", "寒象与温煦不足", "水湿与四肢线索", "舌脉和病程"],
  primarySourceIds: [deepLoopSourceIds.spleenTextbook, deepLoopSourceIds.spleenReview, deepLoopSourceIds.spleenSlide],
  tcmExplanation: "脾气虚与脾阳虚均可见食少、腹胀、便溏、神疲乏力。脾阳虚是在脾气虚基础上兼见温煦失职与寒湿表现，鉴别关键是腹痛绵绵喜温喜按、畏寒肢冷、口泛清水、水肿及舌淡胖润、脉沉迟无力等。",
  tcmObservations: ["食少腹胀、便溏乏力", "畏寒肢冷与喜温喜按", "口泛清水或水肿", "舌淡胖润与沉迟无力脉"],
  modernExplanation: "食欲下降、腹胀、慢性腹泻、体重变化和水肿需要按时间、严重程度及警示表现记录，并考虑进一步评估；不能从这些症状直接反推中医证候。",
  modernObservations: ["腹泻频次与性状", "体重和营养状态", "水肿分布", "便血、脱水、持续疼痛等警示"],
  memory: ["共性与差异", "能先写两证共同的脾失健运，再找寒象。", "鉴别推理", "能用温煦失职和寒湿证据支持脾阳虚。", "安全边界", "能补齐舌脉、病程与需要进一步评估的警示。"],
  evidenceGroups: [
    { title: "先找共性", detail: "确认脾失健运的核心证据。", prompts: [{ label: "饮食腹部", question: "食欲、食量、食后腹胀和腹痛怎样？" }, { label: "二便体力", question: "大便、神疲乏力和面色怎样？" }] },
    { title: "再找寒象", detail: "决定是否从气虚进一步判断阳虚。", prompts: [{ label: "温煦", question: "有无畏寒肢冷、喜温喜按？" }, { label: "水湿", question: "有无口泛清水、水肿或白带清稀？" }] },
    { title: "四诊复核", detail: "用舌脉和病程收紧结论。", prompts: [{ label: "舌", question: "舌色、舌体、润燥与苔怎样？" }, { label: "脉与病程", question: "脉的沉迟强弱及病程进展怎样？" }] },
  ],
  practicePrompt: "比较脾气虚与脾阳虚的共同点和鉴别点，并说明病案中如何取证。",
  answerFramework: ["先写食少腹胀、便溏乏力等共同的脾失健运表现", "再以畏寒肢冷、喜温喜按、水湿、舌淡胖润和脉沉迟无力支持阳虚", "最后补充病程、警示表现并列出需要排除的相近证候"],
  reasoningDetail: "能以共同基础加寒象增量完成脾气虚与脾阳虚鉴别。",
  transfer: null,
  caseId: spleenCaseId,
  assessmentPrompt: "比较脾气虚证与脾阳虚证的共同表现和主要鉴别点。",
  assessmentAnswer: ["两证均以脾失健运为基础，可见食少、腹胀、便溏、神疲乏力、面色少华等。", "脾阳虚较脾气虚多见温煦失职的寒象，如腹痛绵绵喜温喜按、畏寒肢冷、口泛清水，并可见水湿停聚。", "舌淡胖嫩而润、苔白滑，脉沉迟无力等更支持脾阳虚；仍应结合病程和其他四诊资料鉴别。"],
  assessmentSignals: [[ ["食少", "腹胀"], ["便溏", "乏力"] ], [ ["畏寒", "喜温"], ["水湿", "舌淡", "沉迟"] ], [ ["四诊", "病程"], ["警示", "不能"] ]],
});

function createMissingCandidate(
  id: string,
  order: number,
  knowledgePointId: string,
  prompt: string,
  authority: "school",
  locator: string,
  sourceIds: readonly string[],
): AssessmentItemDefinition {
  return {
    id,
    order,
    knowledgePointId,
    questionKind: "short-answer",
    status: "available",
    prompt,
    promptSource: { authority, wording: "source-verbatim", locator, note: "保留来源原题措辞；材料未附可验证答案。", sourceIds },
    answer: { status: "missing", authority: null, confidence: "missing", content: null, notice: "原材料未提供可验证标准答案，不能把 NUR 结构稿冒充学校答案。", sourceIds: [] },
    scoring: null,
    sourceIds,
  };
}

const tongueCandidate = createMissingCandidate("assessment-tongue-coating-whitebook", 2, tongue.point.id, "简述腻苔的舌象特征和形成原因。", "school", "学校白皮题库 · 简答题", ["source-tcm-diagnostics-whitebook"]);
const coldHeatCandidate = createMissingCandidate("assessment-cold-heat-historical", 2, coldHeat.point.id, "何谓恶寒发热？其意义及产生机理是什么？有哪些类型？", "school", "2021–2022学年第一学期期末试卷 · 第60题", ["source-tcm-diagnostics-past-exams"]);
const pulseCandidate = createMissingCandidate("assessment-common-pulses-whitebook", 2, pulse.point.id, "简述洪脉的脉象特点和临床意义。", "school", "学校白皮题库 · 简答题", ["source-tcm-diagnostics-whitebook"]);
const exteriorCandidate = createMissingCandidate("assessment-exterior-interior-whitebook", 2, exteriorInterior.point.id, "简述表证的特点和临床表现。", "school", "学校白皮题库 · 简答题", ["source-tcm-diagnostics-whitebook"]);

export const deepKnowledgePoints = {
  tongue: { ...tongue.point, assessmentItemIds: [tongue.assessment.id, tongueCandidate.id] },
  coldHeat: { ...coldHeat.point, assessmentItemIds: [coldHeat.assessment.id, coldHeatCandidate.id] },
  pulse: { ...pulse.point, assessmentItemIds: [pulse.assessment.id, pulseCandidate.id] },
  exteriorInterior: { ...exteriorInterior.point, assessmentItemIds: [exteriorInterior.assessment.id, exteriorCandidate.id] },
  spleen: spleen.point,
} as const satisfies Record<string, KnowledgePointDefinition>;

export const deepAssessmentItems = [
  tongue.assessment,
  tongueCandidate,
  coldHeat.assessment,
  coldHeatCandidate,
  pulse.assessment,
  pulseCandidate,
  exteriorInterior.assessment,
  exteriorCandidate,
  spleen.assessment,
] as const satisfies readonly AssessmentItemDefinition[];

export const spleenReasoningCase = {
  id: spleenCaseId,
  order: 2,
  knowledgePointIds: [spleen.point.id],
  status: "available",
  eyebrow: "病案迁移 · 脾气虚 / 脾阳虚",
  title: "从共同的运化失健中找出寒象增量",
  stem: "患者女，42岁。反复食少、食后腹胀、便溏半年，近两月加重，伴腹部绵绵作痛、喜温喜按，畏寒肢冷，清晨口泛清水。舌淡胖嫩、苔白滑，脉沉迟无力。",
  promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: "依据教材P121–123与教师P122病案重点重组的合成病例", note: "纯合成病例，不来自真实患者或历史试卷。", sourceIds: [deepLoopSourceIds.spleenTextbook, deepLoopSourceIds.spleenReview, editorialSourceId] },
  evidence: [
    { id: "spleen-case-evidence-common", order: 1, label: "脾失健运共性", detail: "食少、食后腹胀、便溏、病程较久。", role: "key", requiredForReasoning: true },
    { id: "spleen-case-evidence-cold", order: 2, label: "温煦失职", detail: "腹痛绵绵、喜温喜按、畏寒肢冷。", role: "key", requiredForReasoning: true },
    { id: "spleen-case-evidence-fluid", order: 3, label: "水湿证据", detail: "清晨口泛清水，舌淡胖嫩、苔白滑。", role: "supporting", requiredForReasoning: true },
    { id: "spleen-case-evidence-pulse", order: 4, label: "脉象复核", detail: "脉沉迟无力，支持里虚寒方向。", role: "supporting", requiredForReasoning: true },
    { id: "spleen-case-evidence-safety", order: 5, label: "安全资料待补", detail: "体重变化、便血、持续剧痛、脱水及相关检查未提供。", role: "missing", requiredForReasoning: false },
  ],
  reasoningSteps: [
    { id: "spleen-case-step-evidence", order: 1, stage: "evidence", label: "整理证据", prompt: "把共同表现、寒象和水湿证据分组。", placeholder: "先只写事实，不急于写证名……", minimumCharacters: 45, answerFramework: ["共同：食少腹胀、便溏", "寒象：喜温喜按、畏寒肢冷", "复核：口泛清水、舌淡胖苔白滑、脉沉迟无力"], sourceIds: [deepLoopSourceIds.spleenTextbook] },
    { id: "spleen-case-step-mechanism", order: 2, stage: "mechanism", label: "解释机制", prompt: "说明脾失健运与温煦失职如何串成一条链。", placeholder: "脾阳不足 → 运化与温煦……", minimumCharacters: 55, answerFramework: ["脾阳不足", "运化失健而食少腹胀便溏", "温煦失职而腹痛喜温、畏寒", "水湿不化而口泛清水、舌胖苔滑"], sourceIds: [deepLoopSourceIds.spleenTextbook] },
    { id: "spleen-case-step-syndrome", order: 3, stage: "syndrome", label: "提出证候", prompt: "给出主证候，并写出最有力的支持证据。", placeholder: "主证候为……，因为……", minimumCharacters: 45, answerFramework: ["主证候：脾阳虚证", "共同的脾气虚表现", "寒象、水湿、舌脉形成增量证据"], sourceIds: [deepLoopSourceIds.spleenTextbook, deepLoopSourceIds.spleenReview] },
    { id: "spleen-case-step-differential", order: 4, stage: "differential", label: "完成鉴别", prompt: "说明为何不只判断为脾气虚，并补出安全评估边界。", placeholder: "若仅为脾气虚……本案多出的……；同时仍需……", minimumCharacters: 65, answerFramework: ["脾气虚可解释食少腹胀便溏乏力", "但不能充分解释明显畏寒、喜温、水湿与沉迟脉", "现代评估需补体重、便血、脱水和持续疼痛等警示"], sourceIds: [deepLoopSourceIds.spleenTextbook, editorialSourceId] },
  ],
  answer: { authority: "nur-platform", confidence: "source-cross-checked", notice: "NUR 参考链由教材和教师重点交叉核对；不是任课教师标准答案。", sourceIds: [deepLoopSourceIds.spleenTextbook, deepLoopSourceIds.spleenReview, editorialSourceId] },
  scoring: {
    id: "scoring-spleen-qi-yang-case",
    standardVersion: "nur-case-v1",
    status: "available",
    authority: "nur-platform",
    title: "脾阳虚病案四阶段评分",
    totalPoints: 10,
    notice: "平台训练分，不代表任课教师真实病案题评分；教师 rubric 仍待导入。",
    criteria: [
      { id: "spleen-case-score-evidence", order: 1, stage: "evidence", perspective: "shared-evidence", label: "证据分组", detail: "共同表现、寒象、水湿与舌脉分组准确。", points: 3 },
      { id: "spleen-case-score-mechanism", order: 2, stage: "mechanism", perspective: "tcm", label: "机制链", detail: "脾阳不足、运化与温煦失职衔接完整。", points: 3 },
      { id: "spleen-case-score-syndrome", order: 3, stage: "syndrome", perspective: "tcm", label: "证候结论", detail: "主证候与支持证据对应。", points: 2 },
      { id: "spleen-case-score-differential", order: 4, stage: "differential", perspective: "boundary", label: "鉴别与边界", detail: "说明为何超出脾气虚，并保留安全评估边界。", points: 2 },
    ],
    assistanceRules: [
      { criterionId: "spleen-case-score-evidence", memoryCriterionId: "spleen-qi-yang-memory-evidence", signalGroups: [["食少", "腹胀", "便溏"], ["畏寒", "喜温"], ["舌淡", "沉迟"]], nextStepPrompt: "把共同表现、寒象和舌脉分成三组。", rewriteSuggestion: "先列脾失健运共性，再列温煦失职和水湿证据。" },
      { criterionId: "spleen-case-score-mechanism", memoryCriterionId: "spleen-qi-yang-memory-reasoning", signalGroups: [["脾阳", "运化"], ["温煦", "水湿"]], nextStepPrompt: "补全“脾阳不足 → 运化/温煦失职 → 症状”的链条。", rewriteSuggestion: "由脾阳不足分别解释食少便溏、畏寒喜温与水湿舌脉。" },
      { criterionId: "spleen-case-score-syndrome", memoryCriterionId: "spleen-qi-yang-memory-reasoning", signalGroups: [["脾阳虚"], ["寒", "水湿"]], nextStepPrompt: "明确主证候，并紧跟最有力的寒象与舌脉证据。", rewriteSuggestion: "主证候为脾阳虚证，关键在脾虚共性之外兼有温煦失职和水湿证据。" },
      { criterionId: "spleen-case-score-differential", memoryCriterionId: "spleen-qi-yang-memory-boundary", signalGroups: [["脾气虚", "鉴别"], ["警示", "评估", "不能"]], nextStepPrompt: "说明为何不止脾气虚，并补出现代安全评估边界。", rewriteSuggestion: "脾气虚不能完整解释明显寒象和沉迟脉；仍需评估体重、便血、脱水等警示。" },
    ],
    sourceIds: [deepLoopSourceIds.spleenTextbook, deepLoopSourceIds.spleenReview, editorialSourceId],
  },
  boundaryNote: "病例为纯合成教学材料；中医证候结论不替代现代医学诊断，出现警示表现需进一步评估。",
  sourceIds: [deepLoopSourceIds.spleenTextbook, deepLoopSourceIds.spleenReview, editorialSourceId],
} as const satisfies CaseDefinition;
