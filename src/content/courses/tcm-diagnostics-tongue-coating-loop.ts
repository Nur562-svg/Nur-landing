import type {
  AssessmentItemDefinition,
  CaseDefinition,
  KnowledgeLessonDefinition,
  LearningMemoryCriterionDefinition,
  LensContent,
  KnowledgePointDefinition,
} from "@/types/learning";
import { deepLoopSourceIds } from "@/content/courses/tcm-diagnostics-deep-loops";
import {
  completeKnowledgePointItems,
} from "@/content/courses/tcm-diagnostics-question-bank-groups";
import {
  questionBankKnowledgePointItems,
} from "@/content/courses/tcm-diagnostics-question-bank";

export const tongueCoatingCaseId = "case-tongue-coating-reasoning";

export const tongueCoatingSourceIds = {
  textbook: deepLoopSourceIds.tongueTextbook,
  teacherReview: deepLoopSourceIds.tongueReview,
  editorial: deepLoopSourceIds.editorial,
} as const;

export const tongueCoatingTcmLens: LensContent = {
  id: "lens-tongue-coating-tcm",
  perspective: "tcm",
  title: "中医视角",
  status: "verified",
  explanation:
    "按第三版教材先描述舌苔的颗粒粗细、疏密、厚薄及是否刮之易去，再鉴别腐苔与腻苔，并结合舌质、兼症与病程合参，判断食积、痰湿等方向。",
  clinicalObservations: [
    "苔质颗粒粗细、疏密与黏着程度",
    "刮之是否易去",
    "苔色、厚薄与润燥",
    "舌质舌苔合参及兼症复核",
  ],
  missingLabel: null,
  sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
};

export const tongueCoatingModernLens: LensContent = {
  id: "lens-tongue-coating-modern",
  perspective: "modern-medicine",
  title: "现代医学视角",
  status: "available",
  explanation:
    "舌面记录需控制光线、白平衡、饮食或药物染色、口腔清洁与观察时点，并关注可重复性；这些条件只提高观察可靠性，不能把单一舌象直接等同于中医证候或现代疾病。",
  clinicalObservations: [
    "自然光与白平衡",
    "饮食、药物或染色干扰",
    "口腔清洁与观察时间点",
    "连续观察的一致性",
  ],
  missingLabel: null,
  sourceIds: [tongueCoatingSourceIds.editorial],
};

export const tongueCoatingLesson = {
  id: "lesson-tongue-coating",
  status: "available",
  eyebrow: "TONGUE · EVIDENCE TO ANSWER",
  objective:
    "把望舌苔拆成可核对证据，完成腐苔与腻苔鉴别，分别写出中医合参推理与现代观察条件，并在作答中明确二者边界。",
  durationMinutes: 45,
  sections: [
    { id: "evidence", order: 1, indexLabel: "01", title: "取证", detail: "先描述苔质再命名" },
    { id: "compare", order: 2, indexLabel: "02", title: "对照", detail: "腐腻鉴别与中西边界" },
    { id: "output", order: 3, indexLabel: "03", title: "输出", detail: "按结构点成句" },
    { id: "transfer", order: 4, indexLabel: "04", title: "迁移", detail: "回到案例复核" },
  ],
  evidenceGroups: [
    {
      id: "evidence-tongue-coating-texture",
      order: 1,
      title: "苔质颗粒与黏着",
      detail: "先写可观察的颗粒、疏密与刮除特征，不急于命名。",
      prompts: [
        { id: "prompt-particles", label: "颗粒", question: "颗粒粗大疏松，还是细腻致密？" },
        { id: "prompt-adhesion", label: "黏着刮除", question: "苔面是否黏着、刮之是否易去？" },
        { id: "prompt-thickness", label: "厚薄", question: "苔的厚薄如何？" },
      ],
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    {
      id: "evidence-tongue-coating-color-moisture",
      order: 2,
      title: "苔色与润燥",
      detail: "颜色与津液状态帮助收紧意义判断。",
      prompts: [
        { id: "prompt-color", label: "苔色", question: "白、黄、灰黑或其他？" },
        { id: "prompt-moisture", label: "润燥", question: "润、滑、燥或糙？" },
        { id: "prompt-root", label: "有根无根", question: "苔是否有根、是否剥落？" },
      ],
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    {
      id: "evidence-tongue-coating-body",
      order: 3,
      title: "舌质与兼症合参",
      detail: "不把苔质从整体舌象和全身证据中拆开。",
      prompts: [
        { id: "prompt-tongue-body", label: "舌质", question: "舌色、舌形、舌态提供什么复核？" },
        { id: "prompt-symptoms", label: "兼症", question: "脘腹、痰涎、纳食、二便等如何？" },
        { id: "prompt-course", label: "病程", question: "舌象是否动态变化？" },
      ],
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    {
      id: "evidence-tongue-coating-conditions",
      order: 4,
      title: "观察条件与边界",
      detail: "排除非病理干扰，并识别记录局限。",
      prompts: [
        { id: "prompt-light-food", label: "光线饮食", question: "观察前是否进食、刷舌、染色食物或服药？" },
        { id: "prompt-photo", label: "记录方式", question: "是床旁直视还是照片？条件是否可比？" },
        { id: "prompt-limit", label: "局限", question: "单次舌象还缺哪些四诊证据？" },
      ],
      sourceIds: [tongueCoatingSourceIds.editorial, tongueCoatingSourceIds.teacherReview],
    },
  ],
  lensBlocks: [
    {
      id: "reasoning-tongue-coating-tcm",
      perspective: "tcm",
      status: "verified",
      eyebrow: "TCM REASONING · TEXTBOOK VERIFIED",
      title: "从苔质证据进入腐腻鉴别",
      summary:
        "教材强调腐苔颗粒较大而疏松、刮之较易去，腻苔颗粒细腻致密、刮之难去；二者均可与食积、痰湿相关，但必须结合舌质与兼症合参。",
      reasoningSteps: [
        "先按颗粒粗细、疏密、黏着与刮除特征描述，再命名腐苔或腻苔。",
        "腐苔多从食积、痰浊等方向分析；腻苔多从湿浊、痰饮、食积等方向分析，仍须看苔色厚薄。",
        "舌色、舌形、兼症与病程是定方向的关键复核，不能见一苔即定一证。",
        "最终结论仍需四诊合参，并主动写出仍缺的证据。",
      ],
      boundaryNote: "教材P37、P39与教师重点已核对；任课教师主观题逐项采分标准尚未提供。",
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    {
      id: "reasoning-tongue-coating-modern",
      perspective: "modern-medicine",
      status: "available",
      eyebrow: "MODERN OBSERVATION · CONDITIONS",
      title: "从记录条件提出可重复观察",
      summary:
        "现代部分训练的是观察条件控制与可重复记录，而不是用舌面外观直接下现代疾病诊断。",
      reasoningSteps: [
        "固定光线、角度与时间点，并记录是否染色或刚进食。",
        "区分一次性照片与连续床旁观察的证据强度。",
        "把“需要复查/需补问”写清楚，避免把干扰因素当成病理性苔质。",
      ],
      boundaryNote: "观察条件只帮助理解证据质量；中医苔质判断与现代黏膜/感染诊断不可直接等同。",
      sourceIds: [tongueCoatingSourceIds.editorial],
    },
  ],
  scoring: {
    id: "scoring-tongue-coating-integrated-answer",
    status: "available",
    authority: "nur-platform",
    title: "中西医并列作答训练",
    totalPoints: 10,
    notice:
      "这是 NUR 平台训练量表，不代表任课教师真实题目或评分标准；接入课程资料后再校准。",
    prompt:
      "一份舌象记录写：“苔厚，颗粒细密，苔面黏着，刮之不易去，苔色略黄；舌质尚未描述。”请补写仍需观察的证据，并分别说明中医腐腻鉴别方向与现代观察条件复核。",
    answerFramework: [
      "先补证据：颗粒/疏密/刮除 → 苔色厚薄润燥 → 舌质与兼症 → 观察条件。",
      "中医部分：更支持腻苔方向 → 湿浊/痰食可能 → 仍需舌质与四诊合参。",
      "现代部分：光线、饮食染色、清洁与时点 → 是否可重复 → 不能据此下疾病诊断。",
      "边界句：两套解释并列，证候与疾病/照片表现不可直接等同。",
    ],
    criteria: [
      {
        id: "score-tongue-tcm-evidence",
        order: 1,
        perspective: "tcm",
        label: "中医证据完整",
        detail: "写出颗粒、黏着/刮除、厚薄等关键苔质证据，并点出舌质或兼症缺口。",
        points: 2,
      },
      {
        id: "score-tongue-tcm-reasoning",
        order: 2,
        perspective: "tcm",
        label: "中医推理成链",
        detail: "由特征推到腐腻鉴别与病理方向，不只报名称。",
        points: 2,
      },
      {
        id: "score-tongue-modern-conditions",
        order: 3,
        perspective: "modern-medicine",
        label: "现代观察条件",
        detail: "写出光线、染色、清洁或时点等影响记录可靠性的条件。",
        points: 2,
      },
      {
        id: "score-tongue-modern-limit",
        order: 4,
        perspective: "modern-medicine",
        label: "现代局限与下一步",
        detail: "说明单次记录的局限与需要复查或补问的内容。",
        points: 2,
      },
      {
        id: "score-tongue-boundary",
        order: 5,
        perspective: "boundary",
        label: "关系边界清楚",
        detail: "明确可关联与帮助理解之处，同时写明不可直接等同。",
        points: 2,
      },
    ],
    sourceIds: [
      tongueCoatingSourceIds.textbook,
      tongueCoatingSourceIds.teacherReview,
      tongueCoatingSourceIds.editorial,
    ],
  },
  transferCaseId: tongueCoatingCaseId,
  transferExercise: null,
  sourceIds: [
    tongueCoatingSourceIds.textbook,
    tongueCoatingSourceIds.teacherReview,
    tongueCoatingSourceIds.editorial,
  ],
} satisfies KnowledgeLessonDefinition;

export const tongueCoatingLearningMemoryCriteria = [
  {
    id: "memory-tongue-coating-features",
    order: 1,
    label: "苔质特征描述不完整",
    detail: "作答常漏掉颗粒粗细、疏密、黏着或刮之是否易去等关键特征。",
  },
  {
    id: "memory-tongue-coating-differential",
    order: 2,
    label: "腐腻鉴别链断裂",
    detail: "没有先写对比特征再命名，或腐苔与腻苔的关键差异写不清。",
  },
  {
    id: "memory-tongue-coating-direction",
    order: 3,
    label: "病理方向缺少连接",
    detail: "从苔质特征到食积、痰湿等方向的中间论证没有写成完整句。",
  },
  {
    id: "memory-tongue-coating-combined",
    order: 4,
    label: "合参与复核不足",
    detail: "常只写苔质而漏掉舌质、兼症、病程等四诊合参。",
  },
  {
    id: "memory-tongue-coating-boundary",
    order: 5,
    label: "观察条件与关系边界缺失",
    detail: "没有说明染色/光线限制，或没有写明中医苔质与现代记录/疾病不可直接等同。",
  },
  {
    id: "tongue-coating-memory-evidence",
    order: 6,
    label: "舌象证据",
    detail: "能描述颗粒、疏密、黏着与刮除特征。",
  },
  {
    id: "tongue-coating-memory-reasoning",
    order: 7,
    label: "腐腻鉴别",
    detail: "能从特征推到食积、痰湿等方向并保留合参。",
  },
  {
    id: "tongue-coating-memory-boundary",
    order: 8,
    label: "观察边界",
    detail: "能说明染色、光线和单一舌象的限制。",
  },
] as const satisfies readonly LearningMemoryCriterionDefinition[];

export const tongueCoatingAssessmentItemIds = {
  termFur: "assessment-writing-tongue-coating-term-mouldy",
  shortStructure: "assessment-writing-tongue-coating-structure-short-answer",
} as const;

export const tongueCoatingAssessmentItems = [
  {
    id: tongueCoatingAssessmentItemIds.termFur,
    order: 20,
    knowledgePointId: "kp-tongue-coating",
    questionKind: "term",
    status: "available",
    prompt: "腐苔",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "NUR LEARN · 望舌苔 名词解释训练",
      note: "依据教材P37与教师重点改编的 NUR 结构化名词解释训练题。",
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "source-cross-checked",
      content: [
        "腐苔指苔质颗粒较大、疏松如豆腐渣堆积于舌面，刮之较易去。多从食积、痰浊等方向分析，须结合舌质、苔色厚薄与兼症合参，并排除染色等观察干扰。",
      ],
      notice: "NUR 改编参考答案，依据教材P37及教师重点交叉核对；不是教师标准答案。",
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    scoring: {
      id: "scoring-tongue-coating-term",
      standardVersion: "nur-term-v1",
      status: "available",
      authority: "nur-platform",
      title: "NUR 名词解释结构评分",
      totalPoints: 6,
      suggestedCharacters: 120,
      notice: "仅用于结构训练；任课教师的真实评分点仍待确认。",
      answerFramework: ["形态特征（颗粒、疏松、刮之易去）", "常见意义方向", "合参与观察边界"],
      criteria: [
        {
          id: "tongue-term-def",
          order: 1,
          perspective: "tcm",
          label: "定义准确",
          detail: "写出颗粒较大、疏松、刮之较易去等核心特征。",
          points: 2,
        },
        {
          id: "tongue-term-meaning",
          order: 2,
          perspective: "tcm",
          label: "意义要点",
          detail: "提及食积、痰浊等常见分析方向。",
          points: 2,
        },
        {
          id: "tongue-term-boundary",
          order: 3,
          perspective: "boundary",
          label: "合参与边界",
          detail: "说明需舌质兼症合参，并注意染色等干扰。",
          points: 2,
        },
      ],
      assistanceRules: [
        {
          criterionId: "tongue-term-def",
          memoryCriterionId: "memory-tongue-coating-features",
          signalGroups: [["颗粒", "疏松", "豆腐渣"], ["刮", "易去"]],
          nextStepPrompt: "先写清颗粒粗大疏松、刮之较易去的形态特征。",
          rewriteSuggestion: "腐苔颗粒较大、疏松如豆腐渣堆积，刮之较易去。",
        },
        {
          criterionId: "tongue-term-meaning",
          memoryCriterionId: "memory-tongue-coating-direction",
          signalGroups: [["食积", "痰浊", "痰"], ["意义", "提示"]],
          nextStepPrompt: "补写常见病理方向，不要只背形态。",
          rewriteSuggestion: "多从食积、痰浊等方向分析，具体仍须结合苔色与全身证据。",
        },
        {
          criterionId: "tongue-term-boundary",
          memoryCriterionId: "memory-tongue-coating-boundary",
          signalGroups: [["合参", "舌质", "兼症"], ["染色", "不能", "干扰"]],
          nextStepPrompt: "说明合参要求与观察干扰边界。",
          rewriteSuggestion: "须结合舌质与兼症合参，并排除食物染色、光线等干扰，不能见腐苔即定一证。",
        },
      ],
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
  },
  {
    id: tongueCoatingAssessmentItemIds.shortStructure,
    order: 21,
    knowledgePointId: "kp-tongue-coating",
    questionKind: "short-answer",
    status: "available",
    prompt:
      "简述腐苔与腻苔的舌象特征鉴别、常见意义及合参要点，并说明现代舌面记录条件与中医判断的关系边界。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "NUR LEARN · 望舌苔 简答训练",
      note: "依据教材P37、P39、教师复习范围改编的 NUR 结构化简答训练题。",
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "source-cross-checked",
      content: [
        "腐苔颗粒较大而疏松、刮之较易去；腻苔颗粒细腻致密、黏着而刮之不易去。腐苔多从食积、痰浊方向分析，腻苔多从湿浊、痰饮、食积方向分析，均须结合苔色厚薄。判断时合参舌质、兼症与病程，并控制光线、饮食染色与观察时点。中医苔质判断与现代黏膜/疾病诊断及单次照片表现可相互参考，但不可直接等同。",
      ],
      notice: "NUR 改编参考答案，依据教材与教师重点交叉核对；不是教师标准答案。",
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    scoring: {
      id: "scoring-tongue-coating-structure-short",
      standardVersion: "nur-structure-v1",
      status: "available",
      authority: "nur-platform",
      title: "NUR 简答结构评分",
      totalPoints: 10,
      suggestedCharacters: 280,
      notice: "仅用于结构训练；任课教师的真实评分点仍待确认。",
      answerFramework: ["腐腻特征鉴别", "常见意义方向", "合参与现代观察边界"],
      criteria: [
        {
          id: "tongue-short-features",
          order: 1,
          perspective: "tcm",
          label: "特征鉴别完整",
          detail: "写出腐腻在颗粒、疏密、黏着/刮除上的对比。",
          points: 2,
        },
        {
          id: "tongue-short-reasoning",
          order: 2,
          perspective: "tcm",
          label: "意义推理成链",
          detail: "由特征写到食积/痰湿等方向，不只报名称。",
          points: 2,
        },
        {
          id: "tongue-short-combined",
          order: 3,
          perspective: "tcm",
          label: "合参清楚",
          detail: "写出舌质、兼症或病程复核。",
          points: 2,
        },
        {
          id: "tongue-short-modern",
          order: 4,
          perspective: "modern-medicine",
          label: "现代观察条件",
          detail: "写出光线、染色、清洁或时点等条件。",
          points: 2,
        },
        {
          id: "tongue-short-boundary",
          order: 5,
          perspective: "boundary",
          label: "关系边界清楚",
          detail: "明确可关联与帮助理解，同时写明不可直接等同。",
          points: 2,
        },
      ],
      assistanceRules: [
        {
          criterionId: "tongue-short-features",
          memoryCriterionId: "memory-tongue-coating-differential",
          signalGroups: [
            ["腐", "腻"],
            ["颗粒", "疏松", "细腻", "黏着", "刮"],
          ],
          nextStepPrompt: "用对比句写清腐苔与腻苔的关键形态差异。",
          rewriteSuggestion: "腐苔颗粒较大疏松、刮之较易去；腻苔颗粒细腻致密、黏着而刮之不易去。",
        },
        {
          criterionId: "tongue-short-reasoning",
          memoryCriterionId: "memory-tongue-coating-direction",
          signalGroups: [
            ["食积", "痰", "湿"],
            ["方向", "提示", "分析"],
          ],
          nextStepPrompt: "由特征推到常见病理方向，并保留“仍须结合”的语气。",
          rewriteSuggestion: "腐苔多从食积、痰浊方向分析；腻苔多从湿浊、痰饮、食积方向分析，具体仍看苔色厚薄。",
        },
        {
          criterionId: "tongue-short-combined",
          memoryCriterionId: "memory-tongue-coating-combined",
          signalGroups: [
            ["舌质", "兼症", "四诊"],
            ["合参", "病程"],
          ],
          nextStepPrompt: "补写舌质或兼症复核，不要只写苔质。",
          rewriteSuggestion: "判断时须合参舌色舌形、脘腹痰涎纳食二便及病程变化。",
        },
        {
          criterionId: "tongue-short-modern",
          memoryCriterionId: "memory-tongue-coating-boundary",
          signalGroups: [
            ["光线", "染色", "清洁", "时点"],
            ["照片", "可重复"],
          ],
          nextStepPrompt: "单独写出现代记录条件，不要与中医证候混写。",
          rewriteSuggestion: "记录时需控制光线与白平衡，询问近期饮食药物染色，并固定观察时点以提高可重复性。",
        },
        {
          criterionId: "tongue-short-boundary",
          memoryCriterionId: "memory-tongue-coating-boundary",
          signalGroups: [
            ["不可直接等同", "不能直接等同"],
            ["复核", "合参", "不能"],
          ],
          nextStepPrompt: "补一句说明中医苔质与现代记录/疾病的关系边界。",
          rewriteSuggestion: "中医腐腻判断可与规范舌面记录相互参考，但证候结论与现代疾病或单次照片表现不可直接等同。",
        },
      ],
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
  },
] as const satisfies readonly AssessmentItemDefinition[];

export const tongueCoatingReasoningCase = {
  id: tongueCoatingCaseId,
  order: 4,
  knowledgePointIds: ["kp-tongue-coating"],
  status: "available",
  eyebrow: "CASE REASONING · FIND THE BROKEN LINK",
  title: "一份舌象记录不能直接定证",
  stem:
    "实习记录写：患者舌苔厚，颗粒细密，苔面黏着，刮之不易去，苔色微黄；诉近期脘腹胀满、口黏、纳呆。舌质颜色与舌形未记，脉象未及。照片拍摄于餐后，光线偏黄。",
  promptSource: {
    authority: "nur-editorial",
    wording: "nur-adapted",
    locator: "NUR LEARN · 望舌苔案例迁移",
    note: "案例由 NUR 根据教材P37、P39与教师重点组织的合成记录，不是学校原题或真实患者诊断。",
    sourceIds: [
      tongueCoatingSourceIds.textbook,
      tongueCoatingSourceIds.teacherReview,
      tongueCoatingSourceIds.editorial,
    ],
  },
  evidence: [
    {
      id: "case-tongue-particles",
      order: 1,
      label: "颗粒细密",
      detail: "记录明确写颗粒细密",
      role: "key",
      requiredForReasoning: true,
    },
    {
      id: "case-tongue-adhesion",
      order: 2,
      label: "黏着难刮",
      detail: "苔面黏着，刮之不易去",
      role: "key",
      requiredForReasoning: true,
    },
    {
      id: "case-tongue-thick-yellow",
      order: 3,
      label: "厚苔微黄",
      detail: "苔厚、色微黄",
      role: "supporting",
      requiredForReasoning: true,
    },
    {
      id: "case-tongue-symptoms",
      order: 4,
      label: "脘胀口黏纳呆",
      detail: "支持湿浊/食滞方向的兼症",
      role: "supporting",
      requiredForReasoning: true,
    },
    {
      id: "case-tongue-body-missing",
      order: 5,
      label: "舌质缺失",
      detail: "舌色舌形未记",
      role: "missing",
      requiredForReasoning: true,
    },
    {
      id: "case-tongue-pulse-missing",
      order: 6,
      label: "脉象缺失",
      detail: "脉象未及",
      role: "missing",
      requiredForReasoning: true,
    },
    {
      id: "case-tongue-photo-bias",
      order: 7,
      label: "餐后黄光照片",
      detail: "观察条件可能干扰苔色与厚薄判断",
      role: "supporting",
      requiredForReasoning: true,
    },
    {
      id: "case-tongue-course",
      order: 8,
      label: "动态未提供",
      detail: "是否持续、是否可复查未知",
      role: "missing",
      requiredForReasoning: false,
    },
  ],
  reasoningSteps: [
    {
      id: "case-tongue-step-evidence",
      order: 1,
      stage: "evidence",
      label: "证据分组",
      prompt: "把现有表现按苔质特征、兼症、缺失信息与观察干扰重新组织。",
      placeholder: "例如：苔质……兼症……仍缺……干扰……",
      minimumCharacters: 70,
      answerFramework: [
        "苔质：厚、颗粒细密、黏着难刮、微黄。",
        "兼症：脘胀、口黏、纳呆。",
        "缺失：舌质、脉象、动态复查；干扰：餐后、光线偏黄。",
      ],
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    {
      id: "case-tongue-step-mechanism",
      order: 2,
      stage: "mechanism",
      label: "鉴别与评估方向",
      prompt: "分别写出中医腐腻鉴别方向和现代观察条件复核，不要先报确定证名。",
      placeholder: "中医：更支持腻苔……；现代：餐后黄光需……",
      minimumCharacters: 90,
      answerFramework: [
        "中医：细密黏着难刮更支持腻苔而非腐苔；兼症提示湿浊/食滞方向，仍需舌质脉象合参。",
        "现代：餐后与偏黄光线可能影响苔色厚薄观感，应在标准条件下复查。",
        "两条链共享记录，但判断依据与结论边界分别成立。",
      ],
      sourceIds: [
        tongueCoatingSourceIds.textbook,
        tongueCoatingSourceIds.teacherReview,
        tongueCoatingSourceIds.editorial,
      ],
    },
    {
      id: "case-tongue-step-syndrome",
      order: 3,
      stage: "syndrome",
      label: "暂定判断",
      prompt: "给出当前能支持到什么程度的中医方向，并主动写明不能下确定结论的原因。",
      placeholder: "现有证据更支持……；因为缺少……只能暂定……",
      minimumCharacters: 70,
      answerFramework: [
        "现有苔质+兼症更支持腻苔、湿浊或食滞方向。",
        "舌质脉象未补全，且存在观察干扰，故不能写成最终证型。",
        "微黄厚苔也不能单独证明热或湿热已成定局。",
      ],
      sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
    },
    {
      id: "case-tongue-step-differential",
      order: 4,
      stage: "differential",
      label: "鉴别排除与边界",
      prompt: "排除至少一个容易被带偏的方向，并分别写出中医复核、现代条件与关系边界。",
      placeholder: "不能仅凭……判断腐苔/某证；需要……；现代应……；二者不可……",
      minimumCharacters: 110,
      answerFramework: [
        "不能因“厚苔”或照片发黄就判腐苔或直接定湿热证；腐苔应具备疏松易刮等特征。",
        "中医需补舌质、脉象与标准条件下的苔质复查；现代需排除餐后染色与光线偏差后重记。",
        "中医证候与现代黏膜/疾病判断及单次照片表现不可直接等同。",
      ],
      sourceIds: [
        tongueCoatingSourceIds.textbook,
        tongueCoatingSourceIds.teacherReview,
        tongueCoatingSourceIds.editorial,
      ],
    },
  ],
  answer: {
    authority: "nur-platform",
    confidence: "source-cross-checked",
    notice:
      "结构参考由 NUR 按已接入资料交叉核对，用于发现推理断点；不是学校标准答案、教师批改答案或医疗诊断。",
    sourceIds: [
      tongueCoatingSourceIds.textbook,
      tongueCoatingSourceIds.teacherReview,
      tongueCoatingSourceIds.editorial,
    ],
  },
  scoring: {
    id: "scoring-case-tongue-coating-reasoning",
    standardVersion: "nur-case-v1",
    status: "available",
    authority: "nur-platform",
    title: "NUR 推理链自核量表",
    totalPoints: 10,
    notice:
      "该10分仅表示平台推理训练结构，不代表本课程案例题真实采分点；教师评分标准仍待提供。",
    criteria: [
      {
        id: "case-tongue-score-evidence",
        order: 1,
        stage: "evidence",
        perspective: "shared-evidence",
        label: "证据分组完整",
        detail: "区分苔质特征、兼症、缺失信息与观察干扰。",
        points: 2,
      },
      {
        id: "case-tongue-score-mechanism",
        order: 2,
        stage: "mechanism",
        perspective: "tcm",
        label: "鉴别推理成链",
        detail: "由特征写到腻苔/湿浊方向，并说明仍需合参。",
        points: 2,
      },
      {
        id: "case-tongue-score-syndrome",
        order: 3,
        stage: "syndrome",
        perspective: "tcm",
        label: "结论强度恰当",
        detail: "给出暂定方向，同时主动限制结论。",
        points: 2,
      },
      {
        id: "case-tongue-score-modern",
        order: 4,
        stage: "differential",
        perspective: "modern-medicine",
        label: "观察条件独立",
        detail: "把餐后、光线等条件写成需要复核的干扰，不以照片直接定论。",
        points: 2,
      },
      {
        id: "case-tongue-score-boundary",
        order: 5,
        stage: "differential",
        perspective: "boundary",
        label: "鉴别与边界明确",
        detail: "排除腐苔等易混方向，并明确中医与现代不可直接等同。",
        points: 2,
      },
    ],
    assistanceRules: [
      {
        criterionId: "case-tongue-score-evidence",
        memoryCriterionId: "memory-tongue-coating-features",
        signalGroups: [
          ["细密", "黏着", "刮", "厚", "黄"],
          ["脘", "口黏", "纳呆"],
          ["缺", "舌质", "脉", "餐后", "光线"],
        ],
        nextStepPrompt: "先把苔质、兼症、缺失与干扰分成组，再限制结论强度。",
        rewriteSuggestion:
          "现有证据应分为苔质特征、兼症、缺失信息（舌质脉象）与观察干扰（餐后黄光）四组。",
      },
      {
        criterionId: "case-tongue-score-mechanism",
        memoryCriterionId: "memory-tongue-coating-differential",
        signalGroups: [
          ["腻", "腐", "细密", "难刮"],
          ["湿", "食滞", "合参"],
        ],
        nextStepPrompt: "用对比说明为何更支持腻苔而非腐苔，并保留合参。",
        rewriteSuggestion:
          "细密黏着难刮更支持腻苔；腐苔应偏疏松易刮。兼症提示湿浊/食滞方向，仍需舌质脉象合参。",
      },
      {
        criterionId: "case-tongue-score-syndrome",
        memoryCriterionId: "memory-tongue-coating-combined",
        signalGroups: [
          ["暂定", "方向", "支持"],
          ["不能", "缺少", "舌质", "脉"],
        ],
        nextStepPrompt: "把“支持什么方向”和“为什么还不能定证”写在同一段。",
        rewriteSuggestion:
          "现有证据仅支持腻苔伴湿浊/食滞的暂定方向；因舌质脉象与标准观察条件未补全，不能写成最终证型。",
      },
      {
        criterionId: "case-tongue-score-modern",
        memoryCriterionId: "memory-tongue-coating-boundary",
        signalGroups: [
          ["餐后", "光线", "黄", "照片"],
          ["复查", "条件", "染色"],
        ],
        nextStepPrompt: "把餐后与光线写成待复核条件，并说明下一步如何重记。",
        rewriteSuggestion:
          "餐后与偏黄光线可能干扰苔色厚薄观感，应在清洁口腔、自然光下按统一时点复查，而不能据单次照片定论。",
      },
      {
        criterionId: "case-tongue-score-boundary",
        memoryCriterionId: "memory-tongue-coating-boundary",
        signalGroups: [
          ["不可直接等同", "不能直接等同", "分别"],
          ["腐苔", "不能仅凭", "下一步"],
        ],
        nextStepPrompt: "排除一个易混方向，再写中医复核、现代条件与不可直接等同。",
        rewriteSuggestion:
          "不能仅凭厚苔或照片发黄判腐苔或定湿热证；中医需补舌质脉象，现代需标准条件重记，二者结论不可直接等同。",
      },
    ],
    sourceIds: [
      tongueCoatingSourceIds.textbook,
      tongueCoatingSourceIds.teacherReview,
      tongueCoatingSourceIds.editorial,
    ],
  },
  boundaryNote:
    "本案例仅用于学习推理结构，不提供临床诊断、个人医疗建议或任课教师真实评分。",
  sourceIds: [
    tongueCoatingSourceIds.textbook,
    tongueCoatingSourceIds.teacherReview,
    tongueCoatingSourceIds.editorial,
  ],
} satisfies CaseDefinition;

export function buildTongueCoatingKnowledgePoint(
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
    "kp-tongue-coating",
    "tongue-coating",
    3,
    "望舌苔",
    "舌质舌苔合参，重点鉴别腐苔与腻苔",
    "高频",
    {
      contentStatus: "available",
      evidenceFramework: [
        "苔质颗粒与黏着刮除",
        "苔色厚薄润燥",
        "舌质与兼症合参",
        "观察条件与边界",
      ],
      lenses: [tongueCoatingTcmLens, tongueCoatingModernLens],
      relationships: [
        {
          id: "relationship-tongue-coating-related",
          fromLensId: tongueCoatingTcmLens.id,
          toLensId: tongueCoatingModernLens.id,
          label: "related",
          status: "available",
          note: "两种视角共享可规范采集的舌面形态、厚薄与时间变化等原始观察证据。",
          sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.teacherReview],
        },
        {
          id: "relationship-tongue-coating-learning-aid",
          fromLensId: tongueCoatingTcmLens.id,
          toLensId: tongueCoatingModernLens.id,
          label: "learning-aid",
          status: "available",
          note: "现代观察中的光线、染色与可重复记录进入 NUR 作答及评分训练，帮助把证据描述得更完整。",
          sourceIds: [tongueCoatingSourceIds.editorial],
        },
        {
          id: "relationship-tongue-coating-not-equivalent",
          fromLensId: tongueCoatingTcmLens.id,
          toLensId: tongueCoatingModernLens.id,
          label: "not-equivalent",
          status: "available",
          note: "中医腐腻苔判断与现代黏膜表现、感染或单次照片记录不是一一对应，必须分别论证和评分。",
          sourceIds: [tongueCoatingSourceIds.textbook, tongueCoatingSourceIds.editorial],
        },
      ],
      learningMemoryCriteria: tongueCoatingLearningMemoryCriteria,
      sourceIds: [
        tongueCoatingSourceIds.textbook,
        tongueCoatingSourceIds.teacherReview,
        tongueCoatingSourceIds.editorial,
      ],
      assessmentItemIds: [
        "assessment-tongue-coating-short",
        "assessment-tongue-coating-whitebook",
        ...(questionBankKnowledgePointItems["kp-tongue-coating"] ?? []),
        ...(completeKnowledgePointItems["kp-tongue-coating"] ?? []),
        tongueCoatingAssessmentItemIds.termFur,
        tongueCoatingAssessmentItemIds.shortStructure,
      ],
      caseIds: [tongueCoatingCaseId],
      lesson: tongueCoatingLesson,
    },
  );
}
