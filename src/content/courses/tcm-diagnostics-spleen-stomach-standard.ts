/**
 * 标准层 · 脏腑辨证 · 脾胃病辨证
 * 完整 lesson + 双镜三关系 + 名词「脾阳虚证」/简答写作进记忆。
 * 明确不是完整闭环：不扩写既有合成 case；不新增 case 步骤/评分。
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

/** 与 deep-loops 中 spleenReasoningCase.id 一致；本轮仅挂载，不改 case 本体 */
export const spleenStomachCaseId = "case-spleen-qi-yang-differential";

export const spleenStomachSourceIds = {
  textbook: deepLoopSourceIds.spleenTextbook,
  teacherReview: deepLoopSourceIds.spleenReview,
  slide: deepLoopSourceIds.spleenSlide,
  editorial: deepLoopSourceIds.editorial,
} as const;

const allPrimary = [
  spleenStomachSourceIds.textbook,
  spleenStomachSourceIds.teacherReview,
  spleenStomachSourceIds.slide,
] as const;

const allWithEditorial = [
  ...allPrimary,
  spleenStomachSourceIds.editorial,
] as const;

export const spleenStomachTcmLens: LensContent = {
  id: "lens-spleen-qi-yang-tcm",
  perspective: "tcm",
  title: "中医视角",
  status: "verified",
  explanation:
    "脾气虚与脾阳虚均可见食少、腹胀、便溏、神疲乏力。脾阳虚是在脾气虚基础上兼见温煦失职与寒湿表现；鉴别关键是腹痛绵绵喜温喜按、畏寒肢冷、口泛清水、水肿及舌淡胖润、脉沉迟无力等。",
  clinicalObservations: [
    "食少腹胀、便溏乏力",
    "畏寒肢冷与喜温喜按",
    "口泛清水或水肿",
    "舌淡胖润与沉迟无力脉",
  ],
  missingLabel: null,
  sourceIds: [
    spleenStomachSourceIds.textbook,
    spleenStomachSourceIds.teacherReview,
    spleenStomachSourceIds.slide,
  ],
};

export const spleenStomachModernLens: LensContent = {
  id: "lens-spleen-qi-yang-modern",
  perspective: "modern-medicine",
  title: "现代医学视角",
  status: "available",
  explanation:
    "食欲下降、腹胀、慢性腹泻、体重变化和水肿需要按时间、严重程度及警示表现记录，并考虑进一步评估；不能从这些症状直接反推中医证候或完成西医诊断。",
  clinicalObservations: [
    "腹泻频次与性状",
    "体重和营养状态",
    "水肿分布",
    "便血、脱水、持续疼痛等警示",
  ],
  missingLabel: null,
  sourceIds: [spleenStomachSourceIds.editorial],
};

/** 保留 deep-loop memory id，历史 attempt / case assistanceRules 不断链 */
export const spleenStomachLearningMemoryCriteria = [
  {
    id: "spleen-qi-yang-memory-evidence",
    order: 1,
    label: "共性与差异",
    detail: "能先写两证共同的脾失健运，再找寒象与水湿增量。",
  },
  {
    id: "spleen-qi-yang-memory-reasoning",
    order: 2,
    label: "鉴别推理",
    detail: "能用温煦失职和寒湿证据支持脾阳虚证。",
  },
  {
    id: "spleen-qi-yang-memory-boundary",
    order: 3,
    label: "安全边界",
    detail: "能补齐舌脉、病程与需要进一步评估的警示，并说明证候不可直接等同西医病名。",
  },
] as const satisfies readonly LearningMemoryCriterionDefinition[];

export const spleenStomachLesson = {
  id: "lesson-spleen-qi-yang",
  status: "available",
  eyebrow: "SPLEEN · 共性 → 寒象增量",
  objective:
    "以脾失健运为共同基础，完成脾气虚与脾阳虚证的证据分组与鉴别表达，并保留现代安全评估与关系边界。",
  durationMinutes: 28,
  sections: [
    { id: "evidence", order: 1, indexLabel: "01", title: "取证", detail: "先写共性，再写寒象增量" },
    { id: "compare", order: 2, indexLabel: "02", title: "对照", detail: "气虚/阳虚与中西边界" },
    { id: "output", order: 3, indexLabel: "03", title: "输出", detail: "名词与简答按结构成句" },
    { id: "transfer", order: 4, indexLabel: "04", title: "迁移", detail: "短证据链复用鉴别框架" },
  ],
  evidenceGroups: [
    {
      id: "evidence-spleen-common",
      order: 1,
      title: "先找共性",
      detail: "确认脾失健运的核心证据。",
      prompts: [
        { id: "prompt-spleen-diet", label: "饮食腹部", question: "食欲、食量、食后腹胀和腹痛怎样？" },
        { id: "prompt-spleen-stool", label: "二便体力", question: "大便、神疲乏力和面色怎样？" },
        { id: "prompt-spleen-course", label: "病程", question: "起病缓急、病程长短如何？" },
      ],
      sourceIds: [spleenStomachSourceIds.textbook, spleenStomachSourceIds.teacherReview],
    },
    {
      id: "evidence-spleen-cold",
      order: 2,
      title: "再找寒象",
      detail: "决定是否从气虚进一步判断阳虚。",
      prompts: [
        { id: "prompt-spleen-warmth", label: "温煦", question: "有无畏寒肢冷、喜温喜按？" },
        { id: "prompt-spleen-fluid", label: "水湿", question: "有无口泛清水、水肿或白带清稀？" },
        { id: "prompt-spleen-pain", label: "腹痛", question: "腹痛是否绵绵、喜温喜按？" },
      ],
      sourceIds: [spleenStomachSourceIds.textbook, spleenStomachSourceIds.teacherReview],
    },
    {
      id: "evidence-spleen-review",
      order: 3,
      title: "四诊与安全复核",
      detail: "用舌脉收紧结论，并列出警示待补。",
      prompts: [
        { id: "prompt-spleen-tongue", label: "舌", question: "舌色、舌体、润燥与苔怎样？" },
        { id: "prompt-spleen-pulse", label: "脉", question: "脉的沉迟强弱如何？" },
        { id: "prompt-spleen-safety", label: "警示", question: "体重、便血、脱水、持续剧痛是否已问？" },
      ],
      sourceIds: [spleenStomachSourceIds.textbook, spleenStomachSourceIds.editorial],
    },
  ],
  lensBlocks: [
    {
      id: "reasoning-spleen-qi-yang-tcm",
      perspective: "tcm",
      status: "verified",
      eyebrow: "中医推理",
      title: "从共性到寒象增量",
      summary:
        "先确认运化失健共性，再以温煦失职与水湿证据支持脾阳虚证，并用舌脉与病程复核，排除“仅脾气虚”的不足解释。",
      reasoningSteps: [
        "归纳脾失健运共性",
        "列出寒象与水湿增量",
        "提出脾阳虚证并紧跟支持证据",
        "说明为何不只判脾气虚",
      ],
      boundaryNote: "证候判断必须四诊合参；教材页码与教师病案重点交叉核对，不是任课教师标准答案。",
      sourceIds: [spleenStomachSourceIds.textbook, spleenStomachSourceIds.teacherReview],
    },
    {
      id: "reasoning-spleen-qi-yang-modern",
      perspective: "modern-medicine",
      status: "available",
      eyebrow: "现代观察",
      title: "病程、营养与警示",
      summary:
        "按时间与严重程度记录腹泻、体重、水肿，并识别便血、脱水、持续疼痛等需要进一步评估的线索；不把中医证候直接等同现代疾病。",
      reasoningSteps: [
        "整理症状时间轴与严重程度",
        "记录营养与水肿线索",
        "标出警示与待查项",
        "与中医结论分别表述",
      ],
      boundaryNote: "现代评估帮助提高安全意识，不能从症状组合直接反推中医证名。",
      sourceIds: [spleenStomachSourceIds.editorial],
    },
  ],
  scoring: {
    id: "practice-scoring-spleen-qi-yang",
    status: "available",
    authority: "nur-platform",
    title: "NUR 结构评分",
    totalPoints: 5,
    notice: "这是平台结构训练，不代表任课教师的真实给分规则；教师评分标准仍待导入。",
    prompt: "比较脾气虚与脾阳虚的共同点和鉴别点，并说明如何取证。",
    answerFramework: [
      "先写食少腹胀、便溏乏力等共同的脾失健运表现",
      "再以畏寒肢冷、喜温喜按、水湿、舌淡胖润和脉沉迟无力支持阳虚",
      "最后补充病程、警示表现并列出需要排除的相近证候",
    ],
    criteria: [
      {
        id: "practice-spleen-qi-yang-evidence",
        order: 1,
        perspective: "tcm",
        label: "证据完整",
        detail: "写出共性与寒象鉴别点。",
        points: 2,
      },
      {
        id: "practice-spleen-qi-yang-reasoning",
        order: 2,
        perspective: "tcm",
        label: "推理连贯",
        detail: "能以共同基础加寒象增量完成鉴别。",
        points: 2,
      },
      {
        id: "practice-spleen-qi-yang-boundary",
        order: 3,
        perspective: "boundary",
        label: "边界清楚",
        detail: "写出舌脉合参、警示或不可直接等同。",
        points: 1,
      },
    ],
    sourceIds: [...allWithEditorial],
  },
  /** 校验：transferCaseId 与 transferExercise 必须恰好其一。挂载既有合成 case 路由，不并行短迁移。 */
  transferCaseId: spleenStomachCaseId,
  transferExercise: null,
  sourceIds: [...allWithEditorial],
} as const satisfies KnowledgeLessonDefinition;

export const spleenStomachAssessmentItemIds = {
  short: "assessment-spleen-qi-yang-short",
  termYangDeficiency: "assessment-writing-spleen-term-yang-deficiency",
} as const;

export const spleenStomachAssessmentItems = [
  {
    id: spleenStomachAssessmentItemIds.short,
    order: 1,
    knowledgePointId: "kp-organs-spleen-stomach",
    questionKind: "short-answer",
    status: "available",
    prompt: "比较脾气虚证与脾阳虚证的共同表现和主要鉴别点。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "脾胃病辨证主观表达训练",
      note: "依据教材与教师重点重组，不冒充原题。",
      sourceIds: [...allWithEditorial],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "source-cross-checked",
      content: [
        "两证均以脾失健运为基础，可见食少、腹胀、便溏、神疲乏力、面色少华等。",
        "脾阳虚较脾气虚多见温煦失职的寒象，如腹痛绵绵喜温喜按、畏寒肢冷、口泛清水，并可见水湿停聚。",
        "舌淡胖嫩而润、苔白滑，脉沉迟无力等更支持脾阳虚；仍应结合病程和其他四诊资料鉴别，并关注需要进一步评估的警示。",
      ],
      notice: "答案内容由教材页码交叉核对，表达结构由 NUR 整理；不是教师标准答案。",
      sourceIds: [...allWithEditorial],
    },
    scoring: {
      id: "scoring-spleen-qi-yang-short",
      standardVersion: "nur-structure-v1",
      status: "available",
      authority: "nur-platform",
      title: "NUR 主观题结构评分",
      totalPoints: 6,
      suggestedCharacters: 220,
      notice: "仅用于结构训练；任课教师的真实评分点仍待确认。",
      answerFramework: [
        "共同的脾失健运表现",
        "寒象与水湿鉴别点",
        "舌脉合参与安全边界",
      ],
      criteria: [
        {
          id: "spleen-qi-yang-score-evidence",
          order: 1,
          perspective: "tcm",
          label: "证据与特征",
          detail: "共同表现与鉴别寒象完整。",
          points: 2,
        },
        {
          id: "spleen-qi-yang-score-reasoning",
          order: 2,
          perspective: "tcm",
          label: "推理与鉴别",
          detail: "能以共同基础加寒象增量完成鉴别。",
          points: 2,
        },
        {
          id: "spleen-qi-yang-score-boundary",
          order: 3,
          perspective: "boundary",
          label: "合参与边界",
          detail: "说明舌脉、病程或警示与不可直接等同。",
          points: 2,
        },
      ],
      assistanceRules: [
        {
          criterionId: "spleen-qi-yang-score-evidence",
          memoryCriterionId: "spleen-qi-yang-memory-evidence",
          signalGroups: [
            ["食少", "腹胀"],
            ["便溏", "乏力"],
          ],
          nextStepPrompt: "先补齐两证共同的脾失健运表现。",
          rewriteSuggestion: "先列食少、腹胀、便溏、乏力等共性，再写寒象。",
        },
        {
          criterionId: "spleen-qi-yang-score-reasoning",
          memoryCriterionId: "spleen-qi-yang-memory-reasoning",
          signalGroups: [
            ["畏寒", "喜温"],
            ["水湿", "舌淡", "沉迟"],
          ],
          nextStepPrompt: "用温煦失职和水湿证据支持脾阳虚。",
          rewriteSuggestion: "以畏寒喜温、口泛清水、舌淡胖润、脉沉迟无力等作为阳虚增量。",
        },
        {
          criterionId: "spleen-qi-yang-score-boundary",
          memoryCriterionId: "spleen-qi-yang-memory-boundary",
          signalGroups: [
            ["四诊", "病程"],
            ["警示", "不能"],
          ],
          nextStepPrompt: "补出舌脉合参、警示或不可直接等同。",
          rewriteSuggestion: "结合舌脉病程；便血、脱水、剧痛等需进一步评估，证候不可直接等同西医病名。",
        },
      ],
      sourceIds: [...allWithEditorial],
    },
    sourceIds: [...allWithEditorial],
  },
  {
    id: spleenStomachAssessmentItemIds.termYangDeficiency,
    order: 20,
    knowledgePointId: "kp-organs-spleen-stomach",
    questionKind: "term",
    status: "available",
    prompt: "脾阳虚证",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "NUR LEARN · 脾胃病辨证 名词解释训练",
      note: "依据教材印刷页与教师病案重点改编的 NUR 结构化名词解释；不冒充原题或教师标准答案。",
      sourceIds: [spleenStomachSourceIds.textbook, spleenStomachSourceIds.teacherReview],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "source-cross-checked",
      content: [
        "脾阳虚证指脾阳不足，温煦与运化失职所表现的证候。在食少、腹胀、便溏、乏力等脾失健运基础上，多见腹痛绵绵喜温喜按、畏寒肢冷、口泛清水或水肿，舌淡胖润、脉沉迟无力等。须与脾气虚鉴别，并四诊合参；证候结论不替代现代医学诊断。",
      ],
      notice: "NUR 改编参考答案，依据教材与教师重点交叉核对；不是教师标准答案。",
      sourceIds: [spleenStomachSourceIds.textbook, spleenStomachSourceIds.teacherReview],
    },
    scoring: {
      id: "scoring-spleen-term",
      standardVersion: "nur-term-v1",
      status: "available",
      authority: "nur-platform",
      title: "NUR 名词解释结构评分",
      totalPoints: 6,
      suggestedCharacters: 130,
      notice: "仅用于结构训练；任课教师的真实评分点仍待确认。",
      answerFramework: [
        "定义（脾阳不足、温煦运化失职）",
        "共性 + 寒象/水湿要点",
        "舌脉合参与鉴别/安全边界",
      ],
      criteria: [
        {
          id: "spleen-term-def",
          order: 1,
          perspective: "tcm",
          label: "定义准确",
          detail: "点明脾阳不足及温煦、运化失职。",
          points: 2,
        },
        {
          id: "spleen-term-meaning",
          order: 2,
          perspective: "tcm",
          label: "证候要点",
          detail: "写出运化失健共性与寒象/水湿增量。",
          points: 2,
        },
        {
          id: "spleen-term-boundary",
          order: 3,
          perspective: "boundary",
          label: "鉴别与边界",
          detail: "提及与脾气虚鉴别、舌脉合参或不可直接等同。",
          points: 2,
        },
      ],
      assistanceRules: [
        {
          criterionId: "spleen-term-def",
          memoryCriterionId: "spleen-qi-yang-memory-reasoning",
          signalGroups: [
            ["脾阳", "阳虚"],
            ["温煦", "运化"],
          ],
          nextStepPrompt: "先用一句话定义脾阳虚证。",
          rewriteSuggestion: "脾阳虚证：脾阳不足，温煦与运化失职的证候。",
        },
        {
          criterionId: "spleen-term-meaning",
          memoryCriterionId: "spleen-qi-yang-memory-evidence",
          signalGroups: [
            ["食少", "便溏"],
            ["畏寒", "喜温", "口泛清水"],
          ],
          nextStepPrompt: "补出共性表现与寒象增量。",
          rewriteSuggestion: "共性如食少腹胀便溏乏力；增量如畏寒喜温、口泛清水等。",
        },
        {
          criterionId: "spleen-term-boundary",
          memoryCriterionId: "spleen-qi-yang-memory-boundary",
          signalGroups: [
            ["脾气虚", "鉴别"],
            ["舌", "脉", "不能", "不可直接等同"],
          ],
          nextStepPrompt: "补出与脾气虚鉴别、舌脉或安全边界。",
          rewriteSuggestion: "须与脾气虚鉴别并四诊合参；证候不可直接等同西医病名。",
        },
      ],
      sourceIds: [
        spleenStomachSourceIds.textbook,
        spleenStomachSourceIds.teacherReview,
        spleenStomachSourceIds.editorial,
      ],
    },
    sourceIds: [
      spleenStomachSourceIds.textbook,
      spleenStomachSourceIds.teacherReview,
      spleenStomachSourceIds.editorial,
    ],
  },
] as const satisfies readonly AssessmentItemDefinition[];

export function buildSpleenStomachKnowledgePoint(
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
    "kp-organs-spleen-stomach",
    "spleen-stomach",
    3,
    "脾胃病辨证",
    "脾气虚与脾阳虚鉴别（标准层；合成病案保留不扩写）",
    "高频",
    {
      contentStatus: "available",
      evidenceFramework: [
        "运化失健共性",
        "寒象与温煦不足",
        "水湿与四肢线索",
        "舌脉、病程与安全边界",
      ],
      lenses: [spleenStomachTcmLens, spleenStomachModernLens],
      relationships: [
        {
          id: "relationship-spleen-qi-yang-related",
          fromLensId: spleenStomachTcmLens.id,
          toLensId: spleenStomachModernLens.id,
          label: "related",
          status: "available",
          note: "两种视角共享可规范采集的食欲、腹胀、腹泻性状、水肿与时间变化等原始观察证据。",
          sourceIds: [spleenStomachSourceIds.textbook, spleenStomachSourceIds.teacherReview],
        },
        {
          id: "relationship-spleen-qi-yang-learning-aid",
          fromLensId: spleenStomachTcmLens.id,
          toLensId: spleenStomachModernLens.id,
          label: "learning-aid",
          status: "available",
          note: "现代病程、营养与警示记录进入 NUR 作答及评分训练，帮助把证据描述得更完整。",
          sourceIds: [spleenStomachSourceIds.editorial],
        },
        {
          id: "relationship-spleen-qi-yang-not-equivalent",
          fromLensId: spleenStomachTcmLens.id,
          toLensId: spleenStomachModernLens.id,
          label: "not-equivalent",
          status: "available",
          note: "脾气虚/脾阳虚证与现代消化系统疾病或营养状态诊断不是一一对应，必须分别论证和评分。",
          sourceIds: [spleenStomachSourceIds.textbook, spleenStomachSourceIds.editorial],
        },
      ],
      learningMemoryCriteria: spleenStomachLearningMemoryCriteria,
      sourceIds: [...allWithEditorial],
      assessmentItemIds: [
        spleenStomachAssessmentItemIds.short,
        ...(questionBankKnowledgePointItems["kp-organs-spleen-stomach"] ?? []),
        ...(completeKnowledgePointItems["kp-organs-spleen-stomach"] ?? []),
        spleenStomachAssessmentItemIds.termYangDeficiency,
      ],
      caseIds: [spleenStomachCaseId],
      lesson: spleenStomachLesson,
    },
  );
}
