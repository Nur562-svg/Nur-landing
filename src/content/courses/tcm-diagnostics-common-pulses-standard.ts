/**
 * 标准层 · 脉诊 · 常见病脉
 * 完整 lesson + 双镜三关系 + 名词/简答写作进记忆。
 * 明确不是完整闭环：无四阶段 case-reasoning。
 */
import type {
  AssessmentItemDefinition,
  KnowledgeLessonDefinition,
  KnowledgePointDefinition,
  LearningMemoryCriterionDefinition,
  LensContent,
} from "@/types/learning";
import { deepLoopSourceIds } from "@/content/courses/tcm-diagnostics-deep-loops";
import { completeKnowledgePointItems } from "@/content/courses/tcm-diagnostics-question-bank-groups";
import { questionBankKnowledgePointItems } from "@/content/courses/tcm-diagnostics-question-bank";

export const commonPulsesSourceIds = {
  textbook: deepLoopSourceIds.pulseTextbook,
  teacherReview: deepLoopSourceIds.pulseReview,
  whitebook: "source-tcm-diagnostics-whitebook",
  editorial: deepLoopSourceIds.editorial,
} as const;

const allPrimary = [
  commonPulsesSourceIds.textbook,
  commonPulsesSourceIds.teacherReview,
  commonPulsesSourceIds.whitebook,
] as const;

const allWithEditorial = [
  ...allPrimary,
  commonPulsesSourceIds.editorial,
] as const;

export const commonPulsesTcmLens: LensContent = {
  id: "lens-common-pulses-tcm",
  perspective: "tcm",
  title: "中医视角",
  status: "verified",
  explanation:
    "病脉先按位、数、形、势描述可触特征，再命名并讨论主病。浮沉主脉位，迟数主至数；洪脉以脉体宽大、来盛去衰为核心。均须结合有力无力、寸关尺分布与兼症，避免见一脉即定一证。",
  clinicalObservations: [
    "轻取即得或重按始得（浮沉）",
    "平息条件下一息至数（迟数）",
    "脉体宽窄、来势去势（形与势）",
    "有力无力及兼症、寸关尺分布",
  ],
  missingLabel: null,
  sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.teacherReview],
};

export const commonPulsesModernLens: LensContent = {
  id: "lens-common-pulses-modern",
  perspective: "modern-medicine",
  title: "现代医学视角",
  status: "available",
  explanation:
    "脉搏记录应注明静息/运动状态、测量时长、节律、频率及发热、情绪、药物等影响因素。触诊脉象与现代脉搏指标可对照描述，但并非同一概念，不能用单一脉率替代中医脉象辨证。",
  clinicalObservations: [
    "静息与运动状态",
    "测量时长与每分频率",
    "节律是否规则",
    "发热、情绪、药物等影响",
  ],
  missingLabel: null,
  sourceIds: [commonPulsesSourceIds.editorial],
};

/** 保留 deep-loop memory id，历史 attempt / assistanceRules 不断链 */
export const commonPulsesLearningMemoryCriteria = [
  {
    id: "common-pulses-memory-evidence",
    order: 1,
    label: "脉象四维",
    detail: "能按位、数、形、势描述脉象，并写出有力无力等关键修饰。",
  },
  {
    id: "common-pulses-memory-reasoning",
    order: 2,
    label: "脉证合参",
    detail: "能先写脉象再结合兼症与条件推主病方向，不机械套用。",
  },
  {
    id: "common-pulses-memory-boundary",
    order: 3,
    label: "测量边界",
    detail: "能说明诊脉条件限制，并写明脉象不可直接等同于单一脉率或血压。",
  },
] as const satisfies readonly LearningMemoryCriterionDefinition[];

export const commonPulsesLesson = {
  id: "lesson-common-pulses",
  status: "available",
  eyebrow: "PULSE · 位·数·形·势",
  objective:
    "用位、数、形、势组织常见病脉证据，完成浮沉迟数与洪脉的描述—命名—主病链，并明确中医脉象与现代脉搏记录的边界。",
  durationMinutes: 28,
  sections: [
    { id: "evidence", order: 1, indexLabel: "01", title: "取证", detail: "先写可触特征，不急于命名" },
    { id: "compare", order: 2, indexLabel: "02", title: "对照", detail: "中医脉象与现代脉搏条件" },
    { id: "output", order: 3, indexLabel: "03", title: "输出", detail: "名词与简答按结构成句" },
    { id: "transfer", order: 4, indexLabel: "04", title: "迁移", detail: "先描述后命名的触诊记录" },
  ],
  evidenceGroups: [
    {
      id: "evidence-common-pulses-position-rate",
      order: 1,
      title: "定位与计数",
      detail: "先确定脉位和至数。",
      prompts: [
        { id: "prompt-pulse-float-sink", label: "浮沉", question: "轻取、中取、重按分别怎样？是否轻取即得或重按始得？" },
        { id: "prompt-pulse-rate", label: "迟数", question: "在平息条件下一息多少至？迟、数如何判断？" },
        { id: "prompt-pulse-rest", label: "条件", question: "是否静息？情绪、运动、药物有无影响？" },
      ],
      sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.teacherReview],
    },
    {
      id: "evidence-common-pulses-form-force",
      order: 2,
      title: "形态与力量",
      detail: "再描述形和势，并标有力无力。",
      prompts: [
        { id: "prompt-pulse-form", label: "形", question: "脉体宽窄、长短与流利度怎样？" },
        { id: "prompt-pulse-force", label: "势", question: "来势去势如何？有力还是无力？" },
        { id: "prompt-pulse-flooding", label: "洪脉线索", question: "是否脉体宽大、来盛去衰？" },
      ],
      sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.teacherReview],
    },
    {
      id: "evidence-common-pulses-combine",
      order: 3,
      title: "合参与复核",
      detail: "把脉象放回患者状态与四诊。",
      prompts: [
        { id: "prompt-pulse-cun-guan-chi", label: "分部", question: "寸关尺分布有无差异？" },
        { id: "prompt-pulse-symptoms", label: "兼症", question: "寒热、汗、疼痛、口渴和舌象提供什么复核？" },
        { id: "prompt-pulse-limit", label: "局限", question: "单次触诊还缺哪些证据？技术或状态是否影响？" },
      ],
      sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.editorial],
    },
  ],
  lensBlocks: [
    {
      id: "reasoning-common-pulses-tcm",
      perspective: "tcm",
      status: "verified",
      eyebrow: "中医推理",
      title: "从触诊证据到主病方向",
      summary:
        "先完成位、数、形、势描述，再命名浮、沉、迟、数或洪脉等，最后结合有力无力与兼症提出主病方向，并保留四诊合参。",
      reasoningSteps: [
        "按位、数、形、势重写触诊记录",
        "命名候选脉象（浮沉迟数、洪脉等）",
        "结合有力无力与兼症收紧主病方向",
        "说明单脉不能独立定证",
      ],
      boundaryNote: "教材结论必须建立在四诊合参上；单一脉象不能机械定证。",
      sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.teacherReview],
    },
    {
      id: "reasoning-common-pulses-modern",
      perspective: "modern-medicine",
      status: "available",
      eyebrow: "现代观察",
      title: "条件、频率节律与影响因素",
      summary:
        "规范记录静息状态、时长、节律与频率，并标注发热、情绪、药物等影响；这些提高描述质量，但不把中医脉象直接等同于现代指标。",
      reasoningSteps: [
        "确认测量条件是否可比",
        "分别记录频率与节律",
        "列出可能干扰因素",
        "需要时提出进一步评估方向",
      ],
      boundaryNote: "现代脉搏指标帮助提高证据质量，不能替代中医脉象辨证。",
      sourceIds: [commonPulsesSourceIds.editorial],
    },
  ],
  scoring: {
    id: "practice-scoring-common-pulses",
    status: "available",
    authority: "nur-platform",
    title: "NUR 结构评分",
    totalPoints: 5,
    notice: "这是平台结构训练，不代表任课教师的真实给分规则；教师评分标准仍待导入。",
    prompt: "用“位、数、形、势”比较浮、沉、迟、数与洪脉，并说明主病判断边界。",
    answerFramework: [
      "分别写浮沉的脉位和迟数的至数",
      "写洪脉脉体宽大、来盛去衰的形势",
      "结合有力无力、兼症及诊脉条件判断主病",
    ],
    criteria: [
      {
        id: "practice-common-pulses-evidence",
        order: 1,
        perspective: "tcm",
        label: "证据完整",
        detail: "写出位、数、形、势与关键鉴别点。",
        points: 2,
      },
      {
        id: "practice-common-pulses-reasoning",
        order: 2,
        perspective: "tcm",
        label: "推理连贯",
        detail: "能把四维与有力无力组合，避免见一脉即定一证。",
        points: 2,
      },
      {
        id: "practice-common-pulses-boundary",
        order: 3,
        perspective: "boundary",
        label: "边界清楚",
        detail: "写出诊脉条件、四诊合参或不可直接等同。",
        points: 1,
      },
    ],
    sourceIds: [...allWithEditorial],
  },
  transferCaseId: null,
  transferExercise: {
    id: "transfer-common-pulses",
    title: "先描述，后命名",
    prompt:
      "记录为“轻取即得，脉体宽大，来势盛而去势渐衰，数而有力”。请按四维重写并列出需要核对的兼症。",
    evidenceLabels: ["轻取即得", "脉体宽大", "来盛去衰", "数而有力"],
    reasoningSteps: [
      "拆分位、数、形、势",
      "命名候选脉象",
      "结合有力无力",
      "补齐寒热汗舌等证据",
    ],
    boundaryNote: "单次触诊受状态与技术影响，不能把中医脉象直接等同于现代脉率或血压。",
    sourceIds: [...allWithEditorial],
  },
  sourceIds: [...allWithEditorial],
} as const satisfies KnowledgeLessonDefinition;

export const commonPulsesAssessmentItemIds = {
  short: "assessment-common-pulses-short",
  whitebook: "assessment-common-pulses-whitebook",
  termFlooding: "assessment-writing-common-pulses-term-flooding",
} as const;

/** 保留 deep 简答 id/scoring id；白皮无答案候选一并迁出，避免与 deepAssessmentItems 重复 */
export const commonPulsesAssessmentItems = [
  {
    id: commonPulsesAssessmentItemIds.short,
    order: 1,
    knowledgePointId: "kp-pulse-common",
    questionKind: "short-answer",
    status: "available",
    prompt: "简述洪脉的脉象特点、常见临床意义及判断边界。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "常见病脉主观表达训练",
      note: "依据教材与教师重点重组，不冒充原题。",
      sourceIds: [...allWithEditorial],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "source-cross-checked",
      content: [
        "洪脉的核心特征是脉体宽大，充实有力，来势盛而去势渐衰。",
        "多从热盛等方向分析；若脉洪大而无力，则须结合病程与正气状态另作判断。",
        "应在平息、规范诊脉条件下结合寒热、汗、口渴和舌象，不能只凭脉率或单一脉象定证。",
      ],
      notice: "答案内容由教材页码交叉核对，表达结构由 NUR 整理；不是教师标准答案。",
      sourceIds: [...allWithEditorial],
    },
    scoring: {
      id: "scoring-common-pulses-short",
      standardVersion: "nur-structure-v1",
      status: "available",
      authority: "nur-platform",
      title: "NUR 主观题结构评分",
      totalPoints: 6,
      suggestedCharacters: 220,
      notice: "仅用于结构训练；任课教师的真实评分点仍待确认。",
      answerFramework: [
        "洪脉形势特征",
        "常见意义与无力时的另判",
        "诊脉条件与四诊合参边界",
      ],
      criteria: [
        {
          id: "common-pulses-score-evidence",
          order: 1,
          perspective: "tcm",
          label: "证据与特征",
          detail: "写出脉体宽大、来盛去衰等关键特征。",
          points: 2,
        },
        {
          id: "common-pulses-score-reasoning",
          order: 2,
          perspective: "tcm",
          label: "推理与鉴别",
          detail: "能把位、数、形、势与有力无力组合，避免见一脉即定一证。",
          points: 2,
        },
        {
          id: "common-pulses-score-boundary",
          order: 3,
          perspective: "boundary",
          label: "合参与边界",
          detail: "说明诊脉条件、四诊合参或脉象不可直接等同脉率。",
          points: 2,
        },
      ],
      assistanceRules: [
        {
          criterionId: "common-pulses-score-evidence",
          memoryCriterionId: "common-pulses-memory-evidence",
          signalGroups: [
            ["宽大", "有力"],
            ["来盛", "去衰"],
          ],
          nextStepPrompt: "先补齐洪脉的形势特征（宽大、来盛去衰）。",
          rewriteSuggestion: "先写脉体宽大、充实有力、来盛去衰，再谈主病。",
        },
        {
          criterionId: "common-pulses-score-reasoning",
          memoryCriterionId: "common-pulses-memory-reasoning",
          signalGroups: [
            ["热", "有力"],
            ["无力", "病程"],
          ],
          nextStepPrompt: "把结论改写为“特征 → 主病方向 → 无力时的另判”。",
          rewriteSuggestion: "有力时多从热盛方向分析；洪大无力则结合病程与正气另判。",
        },
        {
          criterionId: "common-pulses-score-boundary",
          memoryCriterionId: "common-pulses-memory-boundary",
          signalGroups: [
            ["平息", "兼症", "舌"],
            ["不能", "脉率"],
          ],
          nextStepPrompt: "补出诊脉条件、四诊合参或不可直接等同。",
          rewriteSuggestion: "在平息条件下诊脉，结合寒热汗舌；不能只凭脉率或单脉定证。",
        },
      ],
      sourceIds: [...allWithEditorial],
    },
    sourceIds: [...allWithEditorial],
  },
  {
    id: commonPulsesAssessmentItemIds.whitebook,
    order: 2,
    knowledgePointId: "kp-pulse-common",
    questionKind: "short-answer",
    status: "available",
    prompt: "简述洪脉的脉象特点和临床意义。",
    promptSource: {
      authority: "school",
      wording: "source-verbatim",
      locator: "学校白皮题库 · 简答题",
      note: "保留来源原题措辞；材料未附可验证答案。",
      sourceIds: [commonPulsesSourceIds.whitebook],
    },
    answer: {
      status: "missing",
      authority: null,
      confidence: "missing",
      content: null,
      notice: "原材料未提供可验证标准答案，不能把 NUR 结构稿冒充学校答案。",
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [commonPulsesSourceIds.whitebook],
  },
  {
    id: commonPulsesAssessmentItemIds.termFlooding,
    order: 20,
    knowledgePointId: "kp-pulse-common",
    questionKind: "term",
    status: "available",
    prompt: "洪脉",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "NUR LEARN · 常见病脉 名词解释训练",
      note: "依据教材印刷页与教师重点改编的 NUR 结构化名词解释；不冒充原题或教师标准答案。",
      sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.teacherReview],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "source-cross-checked",
      content: [
        "洪脉指脉体宽大、充实有力，来势盛而去势渐衰的脉象。多从热盛等方向分析，须结合有力无力、兼症与诊脉条件；洪大无力时不可机械套用，亦不能把脉象直接等同于单一脉率。",
      ],
      notice: "NUR 改编参考答案，依据教材与教师重点交叉核对；不是教师标准答案。",
      sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.teacherReview],
    },
    scoring: {
      id: "scoring-common-pulses-term",
      standardVersion: "nur-term-v1",
      status: "available",
      authority: "nur-platform",
      title: "NUR 名词解释结构评分",
      totalPoints: 6,
      suggestedCharacters: 120,
      notice: "仅用于结构训练；任课教师的真实评分点仍待确认。",
      answerFramework: ["形势特征（宽大、来盛去衰）", "常见意义方向", "合参与测量边界"],
      criteria: [
        {
          id: "common-pulses-term-def",
          order: 1,
          perspective: "tcm",
          label: "定义准确",
          detail: "写出脉体宽大、来盛去衰等核心特征。",
          points: 2,
        },
        {
          id: "common-pulses-term-meaning",
          order: 2,
          perspective: "tcm",
          label: "意义要点",
          detail: "提及热盛等常见分析方向，或无力时另判。",
          points: 2,
        },
        {
          id: "common-pulses-term-boundary",
          order: 3,
          perspective: "boundary",
          label: "合参与边界",
          detail: "说明需兼症合参，并注意不可直接等同脉率。",
          points: 2,
        },
      ],
      assistanceRules: [
        {
          criterionId: "common-pulses-term-def",
          memoryCriterionId: "common-pulses-memory-evidence",
          signalGroups: [
            ["宽大", "洪"],
            ["来盛", "去衰"],
          ],
          nextStepPrompt: "先写洪脉可触的形势特征。",
          rewriteSuggestion: "洪脉：脉体宽大，来势盛而去势渐衰。",
        },
        {
          criterionId: "common-pulses-term-meaning",
          memoryCriterionId: "common-pulses-memory-reasoning",
          signalGroups: [
            ["热", "主病"],
            ["无力", "正气"],
          ],
          nextStepPrompt: "补出常见意义方向，并点明无力时不可机械套用。",
          rewriteSuggestion: "多从热盛方向分析；洪大无力须结合病程与正气另判。",
        },
        {
          criterionId: "common-pulses-term-boundary",
          memoryCriterionId: "common-pulses-memory-boundary",
          signalGroups: [
            ["兼症", "合参"],
            ["脉率", "不能", "不可直接等同"],
          ],
          nextStepPrompt: "补出四诊合参或与现代脉率的边界。",
          rewriteSuggestion: "须结合兼症诊脉条件；脉象不可直接等同单一脉率。",
        },
      ],
      sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.teacherReview, commonPulsesSourceIds.editorial],
    },
    sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.teacherReview, commonPulsesSourceIds.editorial],
  },
] as const satisfies readonly AssessmentItemDefinition[];

export function buildCommonPulsesKnowledgePoint(
  createDemoKnowledgePoint: (
    id: string,
    slug: string,
    order: number,
    title: string,
    note: string,
    emphasis: KnowledgePointDefinition["emphasis"],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any,
  ) => KnowledgePointDefinition,
): KnowledgePointDefinition {
  return createDemoKnowledgePoint(
    "kp-pulse-common",
    "common-pulses",
    3,
    "常见病脉",
    "浮沉迟数与洪脉，先脉象后主病",
    "高频",
    {
      contentStatus: "available",
      evidenceFramework: [
        "浮沉位置与诊脉条件",
        "迟数至数",
        "形与势（含洪脉）",
        "有力无力与兼症合参",
      ],
      lenses: [commonPulsesTcmLens, commonPulsesModernLens],
      relationships: [
        {
          id: "relationship-common-pulses-related",
          fromLensId: commonPulsesTcmLens.id,
          toLensId: commonPulsesModernLens.id,
          label: "related",
          status: "available",
          note: "两种视角可共享规范采集的频率、节律、状态与时间变化等原始观察证据。",
          sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.teacherReview],
        },
        {
          id: "relationship-common-pulses-learning-aid",
          fromLensId: commonPulsesTcmLens.id,
          toLensId: commonPulsesModernLens.id,
          label: "learning-aid",
          status: "available",
          note: "现代观察中的条件控制与影响因素记录进入 NUR 作答及评分训练，帮助把证据描述得更完整。",
          sourceIds: [commonPulsesSourceIds.editorial],
        },
        {
          id: "relationship-common-pulses-not-equivalent",
          fromLensId: commonPulsesTcmLens.id,
          toLensId: commonPulsesModernLens.id,
          label: "not-equivalent",
          status: "available",
          note: "中医脉象与现代脉搏频率、节律或血压不是一一对应，必须分别论证和评分。",
          sourceIds: [commonPulsesSourceIds.textbook, commonPulsesSourceIds.editorial],
        },
      ],
      learningMemoryCriteria: commonPulsesLearningMemoryCriteria,
      sourceIds: [...allWithEditorial],
      assessmentItemIds: [
        commonPulsesAssessmentItemIds.short,
        commonPulsesAssessmentItemIds.whitebook,
        ...(questionBankKnowledgePointItems["kp-pulse-common"] ?? []),
        ...(completeKnowledgePointItems["kp-pulse-common"] ?? []),
        commonPulsesAssessmentItemIds.termFlooding,
      ],
      caseIds: [],
      lesson: commonPulsesLesson,
    },
  );
}
