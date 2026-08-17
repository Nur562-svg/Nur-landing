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

export const exteriorInteriorCaseId = "case-exterior-interior-reasoning";

export const exteriorInteriorSourceIds = {
  textbook: deepLoopSourceIds.exteriorInteriorTextbook,
  teacherReview: deepLoopSourceIds.exteriorInteriorReview,
  editorial: deepLoopSourceIds.editorial,
} as const;

export const exteriorInteriorTcmLens: LensContent = {
  id: "lens-exterior-interior-tcm",
  perspective: "tcm",
  title: "中医视角",
  status: "verified",
  explanation:
    "按第三版教材，表里辨证判断病位浅深：表证多见新起、恶寒发热、头身痛、鼻塞、脉浮等；里证范围广，须结合脏腑、气血津液等内部病变证据。还要追踪由表入里、由里出表，并与表里同病、半表半里仔细划界。",
  clinicalObservations: [
    "起病急缓与病程新久",
    "恶寒发热、头身痛、鼻塞与脉浮等表位线索",
    "神志、脘腹、二便饮食等里位线索",
    "舌脉及证候前后变化（转化/兼夹）",
  ],
  missingLabel: null,
  sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
};

export const exteriorInteriorModernLens: LensContent = {
  id: "lens-exterior-interior-modern",
  perspective: "modern-medicine",
  title: "现代医学视角",
  status: "available",
  explanation:
    "病程时间轴、系统症状与危险信号有助于描述外感/内伤样进展与安全评估，但解剖学的体表与内脏位置、西医部位诊断不能直接替代八纲表里。",
  clinicalObservations: [
    "起病时间与进展节奏",
    "局部与全身症状组合",
    "生命体征与危险信号",
    "治疗后变化与需进一步评估的线索",
  ],
  missingLabel: null,
  sourceIds: [exteriorInteriorSourceIds.editorial],
};

export const exteriorInteriorLesson = {
  id: "lesson-exterior-interior",
  status: "available",
  eyebrow: "EIGHT PRINCIPLES · EXTERIOR–INTERIOR",
  objective:
    "把表里辨证拆成可核对证据：界定表证与里证，识别转化与兼夹边界，分别写出中医病位推理与现代病程/系统观察，并明确二者不可直接等同。",
  durationMinutes: 45,
  sections: [
    { id: "evidence", order: 1, indexLabel: "01", title: "取证", detail: "病程·表症·里症·转化轴" },
    { id: "compare", order: 2, indexLabel: "02", title: "对照", detail: "表里界定与中西边界" },
    { id: "output", order: 3, indexLabel: "03", title: "输出", detail: "按结构点成句" },
    { id: "transfer", order: 4, indexLabel: "04", title: "迁移", detail: "回到案例复核" },
  ],
  evidenceGroups: [
    {
      id: "evidence-exterior-interior-course",
      order: 1,
      title: "病程与起势",
      detail: "先建立时间轴，再谈病位深浅，不从单一症状跳到结论。",
      prompts: [
        { id: "prompt-onset", label: "起病", question: "起病急缓如何？有无明显诱因？" },
        { id: "prompt-duration", label: "新久", question: "病程偏新还是偏久？前后有无阶段变化？" },
        { id: "prompt-trend", label: "趋势", question: "症状是向外透达、向内加重，还是表里并见？" },
      ],
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    {
      id: "evidence-exterior-interior-exterior-clues",
      order: 2,
      title: "表位线索",
      detail: "用可观察的表证组合建立浅位候选，而不是背一个标签。",
      prompts: [
        { id: "prompt-chills-fever", label: "寒热", question: "有无恶寒发热并见？轻重如何？" },
        { id: "prompt-head-body", label: "头身", question: "有无头痛、身痛、肢节酸楚？" },
        { id: "prompt-nose-pulse", label: "鼻脉", question: "有无鼻塞喷嚏？脉是否偏浮？" },
      ],
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    {
      id: "evidence-exterior-interior-interior-clues",
      order: 3,
      title: "里位与四诊复核",
      detail: "寻找脏腑内部病变证据，并用舌脉收紧或反驳。",
      prompts: [
        { id: "prompt-organs", label: "脏腑", question: "神志、脘腹、饮食、二便有何异常？" },
        { id: "prompt-tongue-pulse", label: "舌脉", question: "舌象与脉象如何支持或反驳表/里？" },
        { id: "prompt-lack", label: "缺口", question: "当前还缺哪些四诊资料不能定病位？" },
      ],
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    {
      id: "evidence-exterior-interior-transform",
      order: 4,
      title: "转化、兼夹与现代边界",
      detail: "静态分类之后看趋势；并把现代时间轴观察分开写。",
      prompts: [
        { id: "prompt-enter-interior", label: "入里", question: "恶寒是否减轻而里热、口渴、烦躁等是否加重？" },
        { id: "prompt-same-disease", label: "同病/半表半里", question: "是表证未解又见里证，还是寒热往来类半表半里表现？" },
        { id: "prompt-modern-timeline", label: "现代观察", question: "起病时间、系统症状与危险信号如何记录？能否直接当解剖内外？" },
      ],
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.editorial],
    },
  ],
  lensBlocks: [
    {
      id: "reasoning-exterior-interior-tcm",
      perspective: "tcm",
      status: "verified",
      eyebrow: "TCM REASONING · TEXTBOOK VERIFIED",
      title: "从病程与证据组合进入病位判断",
      summary:
        "教材强调表里辨证的核心是病位浅深：表证多新起、正邪争于浅表；里证须有内部病变证据。转化看前后证据变化；表里同病与半表半里概念不同，不可混贴标签。",
      reasoningSteps: [
        "先按病程新久与主症建立表位/里位候选，不孤立报证名。",
        "表证常见恶寒发热、头身痛、鼻塞、苔薄、脉浮等组合；具体随邪气与体质而异。",
        "里证应写出脏腑、气血津液等内部证据，并用舌脉复核。",
        "转化用时间轴：由表入里或由里出表；表里同病是表证未解又见里证；半表半里另有往来类特征，三者分写。",
      ],
      boundaryNote: "教材P89–91与教师重点已核对；任课教师主观题逐项采分标准尚未提供。",
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    {
      id: "reasoning-exterior-interior-modern",
      perspective: "modern-medicine",
      status: "available",
      eyebrow: "MODERN OBSERVATION · COURSE & SYSTEMS",
      title: "从时间轴与系统症状做安全评估",
      summary:
        "现代部分训练的是病程记录、系统症状组合与危险信号识别，而不是用解剖内外或西医诊断替换八纲表里。",
      reasoningSteps: [
        "按时间点记录起病、加重与缓解，区分外感样急性过程与内伤样迁延过程（仅作观察框架）。",
        "按系统罗列症状，并标出需要进一步评估的警示（神志、呼吸、循环、脱水等）。",
        "明确：体表/内脏解剖位置与八纲表里不是一一对应。",
      ],
      boundaryNote: "病程与系统观察帮助理解证据质量；中医表里证候与现代疾病/部位诊断不可直接等同。",
      sourceIds: [exteriorInteriorSourceIds.editorial],
    },
  ],
  scoring: {
    id: "scoring-exterior-interior-integrated-answer",
    status: "available",
    authority: "nur-platform",
    title: "中西医并列作答训练",
    totalPoints: 10,
    notice:
      "这是 NUR 平台训练量表，不代表任课教师真实题目或评分标准；接入课程资料后再校准。",
    prompt:
      "患者初起恶寒发热、无汗头痛两日，今日恶寒减轻而高热口渴、烦躁；舌脉记录不完整。请补写仍需证据，并分别说明中医表里/转化方向与现代病程–系统评估，写明关系边界。",
    answerFramework: [
      "先补证据：病程前后 → 表位线索 → 里位线索 → 舌脉缺口。",
      "中医部分：初起偏表 → 后续入里倾向 → 是否同病/半表半里需另证 → 仍须四诊合参。",
      "现代部分：时间轴、热势与警示 → 需补生命体征/必要检查 → 不作确定诊断。",
      "边界句：两套解释并列，八纲表里与解剖内外/疾病诊断不可直接等同。",
    ],
    criteria: [
      {
        id: "score-ei-tcm-evidence",
        order: 1,
        perspective: "tcm",
        label: "中医证据完整",
        detail: "写出病程、表症、里症及舌脉缺口等关键证据。",
        points: 2,
      },
      {
        id: "score-ei-tcm-reasoning",
        order: 2,
        perspective: "tcm",
        label: "中医推理成链",
        detail: "由证据推到表/里或转化方向，不只报名称。",
        points: 2,
      },
      {
        id: "score-ei-modern-timeline",
        order: 3,
        perspective: "modern-medicine",
        label: "现代时间轴与系统",
        detail: "写出起病进展、系统症状或需评估的安全线索。",
        points: 2,
      },
      {
        id: "score-ei-modern-limit",
        order: 4,
        perspective: "modern-medicine",
        label: "现代局限与下一步",
        detail: "说明资料不足与需要进一步评估的内容。",
        points: 2,
      },
      {
        id: "score-ei-boundary",
        order: 5,
        perspective: "boundary",
        label: "关系边界清楚",
        detail: "明确可关联与帮助理解之处，同时写明不可直接等同。",
        points: 2,
      },
    ],
    sourceIds: [
      exteriorInteriorSourceIds.textbook,
      exteriorInteriorSourceIds.teacherReview,
      exteriorInteriorSourceIds.editorial,
    ],
  },
  transferCaseId: exteriorInteriorCaseId,
  transferExercise: null,
  sourceIds: [
    exteriorInteriorSourceIds.textbook,
    exteriorInteriorSourceIds.teacherReview,
    exteriorInteriorSourceIds.editorial,
  ],
} satisfies KnowledgeLessonDefinition;

export const exteriorInteriorLearningMemoryCriteria = [
  {
    id: "memory-exterior-interior-definition",
    order: 1,
    label: "表里界定不清",
    detail: "作答常把表里说成解剖内外，或说不清病位浅深与证据依据。",
  },
  {
    id: "memory-exterior-interior-evidence",
    order: 2,
    label: "表里证据分组不完整",
    detail: "常漏掉病程、表症组合、里症或舌脉复核中的一整块。",
  },
  {
    id: "memory-exterior-interior-transformation",
    order: 3,
    label: "转化与兼夹标签混用",
    detail: "由表入里、表里同病、半表半里未分写，或缺少前后证据变化。",
  },
  {
    id: "memory-exterior-interior-modern",
    order: 4,
    label: "现代病程与系统观察缺失",
    detail: "没有独立写出时间轴、系统症状或安全评估线索。",
  },
  {
    id: "memory-exterior-interior-boundary",
    order: 5,
    label: "关系边界缺失",
    detail: "没有写明八纲表里与解剖内外/现代疾病诊断不可直接等同。",
  },
  {
    id: "exterior-interior-memory-evidence",
    order: 6,
    label: "表里证据",
    detail: "能用病程、寒热、内脏症状和舌脉区分表里。",
  },
  {
    id: "exterior-interior-memory-reasoning",
    order: 7,
    label: "转化推理",
    detail: "能说明由表入里或由里出表的证据变化。",
  },
  {
    id: "exterior-interior-memory-boundary",
    order: 8,
    label: "概念边界",
    detail: "能说明八纲表里不等同于解剖内外。",
  },
] as const satisfies readonly LearningMemoryCriterionDefinition[];

export const exteriorInteriorAssessmentItemIds = {
  termHalfExterior: "assessment-writing-exterior-interior-term",
  shortStructure: "assessment-writing-exterior-interior-structure-short-answer",
} as const;

export const exteriorInteriorAssessmentItems = [
  {
    id: exteriorInteriorAssessmentItemIds.termHalfExterior,
    order: 20,
    knowledgePointId: "kp-eight-principles-exterior-interior",
    questionKind: "term",
    status: "available",
    prompt: "半表半里证",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "NUR LEARN · 表里辨证 名词解释训练",
      note: "依据教材P89–91与教师重点（表证、半表半里）改编的 NUR 结构化名词解释训练题。",
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "source-cross-checked",
      content: [
        "半表半里证指病邪既不在表、又未全入里，邪正分争于表里之间的一类证候。典型可见寒热往来，并常兼胸胁苦满、默默不欲饮食、心烦喜呕等。须与单纯表证、里证及表里同病区分，并结合舌脉与兼症合参，不能仅凭“往来”二字定证。",
      ],
      notice: "NUR 改编参考答案，依据教材P89–91及教师重点交叉核对；不是教师标准答案。",
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    scoring: {
      id: "scoring-exterior-interior-term",
      standardVersion: "nur-term-v1",
      status: "available",
      authority: "nur-platform",
      title: "NUR 名词解释结构评分",
      totalPoints: 6,
      suggestedCharacters: 130,
      notice: "仅用于结构训练；任课教师的真实评分点仍待确认。",
      answerFramework: ["病位界定（不在表未全入里）", "典型表现与意义", "与表/里/同病鉴别及合参"],
      criteria: [
        {
          id: "ei-term-def",
          order: 1,
          perspective: "tcm",
          label: "定义准确",
          detail: "写出邪在表里之间、既不在表又未全入里的病位特征。",
          points: 2,
        },
        {
          id: "ei-term-features",
          order: 2,
          perspective: "tcm",
          label: "表现要点",
          detail: "提及寒热往来及常见兼症方向。",
          points: 2,
        },
        {
          id: "ei-term-boundary",
          order: 3,
          perspective: "boundary",
          label: "鉴别与合参",
          detail: "说明与表证、里证、表里同病的区分，并强调四诊合参。",
          points: 2,
        },
      ],
      assistanceRules: [
        {
          criterionId: "ei-term-def",
          memoryCriterionId: "memory-exterior-interior-definition",
          signalGroups: [["半表半里", "表里之间"], ["不在表", "未全入里", "未入里"]],
          nextStepPrompt: "先写清病位：邪既不在表、又未全入里。",
          rewriteSuggestion: "半表半里证指病邪既不在表、又未全入里，邪正分争于表里之间。",
        },
        {
          criterionId: "ei-term-features",
          memoryCriterionId: "memory-exterior-interior-evidence",
          signalGroups: [["寒热往来", "往来"], ["胸胁", "心烦", "喜呕", "默默"]],
          nextStepPrompt: "补写典型表现，不要只背病位四个字。",
          rewriteSuggestion: "典型可见寒热往来，并常兼胸胁苦满、默默不欲饮食、心烦喜呕等。",
        },
        {
          criterionId: "ei-term-boundary",
          memoryCriterionId: "memory-exterior-interior-transformation",
          signalGroups: [["表证", "里证", "同病"], ["合参", "舌脉", "不能", "鉴别"]],
          nextStepPrompt: "说明与表/里/同病的区分，并强调合参。",
          rewriteSuggestion: "须与单纯表证、里证及表里同病区分，并结合舌脉兼症合参，不能仅凭往来定证。",
        },
      ],
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
  },
  {
    id: exteriorInteriorAssessmentItemIds.shortStructure,
    order: 21,
    knowledgePointId: "kp-eight-principles-exterior-interior",
    questionKind: "short-answer",
    status: "available",
    prompt:
      "简述表证与里证的界定与鉴别要点，说明表里转化及兼夹（含表里同病与半表半里）的边界意识，并写出与现代病程–系统观察的可关联与不可直接等同。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "NUR LEARN · 表里辨证 简答训练",
      note: "依据教材P89–91、教师复习范围改编的 NUR 结构化简答训练题。",
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "source-cross-checked",
      content: [
        "表里辨证判断病位浅深。表证多新起，常见恶寒发热、头身痛、鼻塞、苔薄、脉浮等；里证须有脏腑气血津液等内部病变证据，并结合舌脉。鉴别应对照有无典型表症组合、内部症状、病程与舌脉，不能只凭单一症状。转化看前后证据变化（如表邪入里则表症减而里热等增）；表里同病是表证未解又见里证；半表半里以邪在表里之间、寒热往来等为特征，三者不可混用。现代可记录起病时间轴、系统症状与危险信号以助观察，但解剖内外与疾病诊断与八纲表里不可直接等同。",
      ],
      notice: "NUR 改编参考答案，依据教材与教师重点交叉核对；不是教师标准答案。",
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    scoring: {
      id: "scoring-exterior-interior-structure-short",
      standardVersion: "nur-structure-v1",
      status: "available",
      authority: "nur-platform",
      title: "NUR 简答结构评分",
      totalPoints: 10,
      suggestedCharacters: 300,
      notice: "仅用于结构训练；任课教师的真实评分点仍待确认。",
      answerFramework: ["表里界定与证据", "鉴别与转化/兼夹边界", "现代观察与关系边界"],
      criteria: [
        {
          id: "ei-short-definition",
          order: 1,
          perspective: "tcm",
          label: "界定清楚",
          detail: "写出表/里病位浅深及各自关键证据方向。",
          points: 2,
        },
        {
          id: "ei-short-differential",
          order: 2,
          perspective: "tcm",
          label: "鉴别成链",
          detail: "用病程、表症、里症、舌脉对照，不只报名称。",
          points: 2,
        },
        {
          id: "ei-short-transform",
          order: 3,
          perspective: "tcm",
          label: "转化与兼夹边界",
          detail: "分写入里/出表、表里同病、半表半里，不混标签。",
          points: 2,
        },
        {
          id: "ei-short-modern",
          order: 4,
          perspective: "modern-medicine",
          label: "现代观察独立",
          detail: "写出时间轴、系统症状或安全线索。",
          points: 2,
        },
        {
          id: "ei-short-boundary",
          order: 5,
          perspective: "boundary",
          label: "关系边界清楚",
          detail: "明确可关联与帮助理解，同时写明不可直接等同。",
          points: 2,
        },
      ],
      assistanceRules: [
        {
          criterionId: "ei-short-definition",
          memoryCriterionId: "memory-exterior-interior-definition",
          signalGroups: [
            ["表证", "里证", "浅深", "病位"],
            ["新起", "恶寒发热", "脉浮", "脏腑"],
          ],
          nextStepPrompt: "先分别界定表证与里证的病位与证据方向。",
          rewriteSuggestion: "表里辨证判断病位浅深：表证多新起、正邪争于浅表；里证须有内部脏腑等病变证据。",
        },
        {
          criterionId: "ei-short-differential",
          memoryCriterionId: "memory-exterior-interior-evidence",
          signalGroups: [
            ["病程", "表症", "里症"],
            ["舌脉", "鉴别", "对照"],
          ],
          nextStepPrompt: "用病程+表症组合+里症+舌脉写成对照句。",
          rewriteSuggestion: "鉴别应对照病程新久、有无恶寒发热头身痛脉浮等表症组合、内部症状及舌脉，不能只凭单一表现。",
        },
        {
          criterionId: "ei-short-transform",
          memoryCriterionId: "memory-exterior-interior-transformation",
          signalGroups: [
            ["入里", "出表", "转化"],
            ["同病", "半表半里", "往来"],
          ],
          nextStepPrompt: "分写转化、表里同病与半表半里，不要混成一个词。",
          rewriteSuggestion: "转化看前后证据变化；表里同病是表证未解又见里证；半表半里以邪在表里之间、寒热往来等为特征。",
        },
        {
          criterionId: "ei-short-modern",
          memoryCriterionId: "memory-exterior-interior-modern",
          signalGroups: [
            ["时间", "病程", "起病"],
            ["系统", "警示", "体征", "评估"],
          ],
          nextStepPrompt: "单独写出现代时间轴与系统/安全观察，不要与证名混写。",
          rewriteSuggestion: "现代可按时间轴记录起病与进展，并按系统罗列症状、标出危险信号与需进一步评估的项目。",
        },
        {
          criterionId: "ei-short-boundary",
          memoryCriterionId: "memory-exterior-interior-boundary",
          signalGroups: [
            ["不可直接等同", "不能直接等同"],
            ["解剖", "内外", "部位", "疾病"],
          ],
          nextStepPrompt: "补一句说明八纲表里与解剖内外/疾病诊断的关系边界。",
          rewriteSuggestion: "病程与系统观察可与表里证据相互参考，但八纲表里与解剖学内外位置或现代疾病诊断不可直接等同。",
        },
      ],
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
  },
] as const satisfies readonly AssessmentItemDefinition[];

export const exteriorInteriorReasoningCase = {
  id: exteriorInteriorCaseId,
  order: 5,
  knowledgePointIds: ["kp-eight-principles-exterior-interior"],
  status: "available",
  eyebrow: "CASE REASONING · LOCATION AND TRANSITION",
  title: "前后证据变化不能只贴一个表里标签",
  stem:
    "患者男，28岁。两日前受凉后恶寒发热、无汗、头痛、鼻塞、脉浮；自服感冒药。今日恶寒明显减轻，反见高热、口渴欲饮、心烦少寐，大便两日未行。舌象记录不完整，仅写“苔略黄”；未测体温曲线，未做实验室检查。家属问：是不是还在表？还是已经入里？",
  promptSource: {
    authority: "nur-editorial",
    wording: "nur-adapted",
    locator: "NUR LEARN · 表里辨证案例迁移",
    note: "案例由 NUR 根据教材P89–91与教师重点组织的合成记录，不是学校原题或真实患者诊断。",
    sourceIds: [
      exteriorInteriorSourceIds.textbook,
      exteriorInteriorSourceIds.teacherReview,
      exteriorInteriorSourceIds.editorial,
    ],
  },
  evidence: [
    {
      id: "case-ei-day0-exterior",
      order: 1,
      label: "初起表位组合",
      detail: "恶寒发热、无汗、头痛、鼻塞、脉浮",
      role: "key",
      requiredForReasoning: true,
    },
    {
      id: "case-ei-day2-interior-shift",
      order: 2,
      label: "两日后变化",
      detail: "恶寒减、高热、口渴、心烦、便结",
      role: "key",
      requiredForReasoning: true,
    },
    {
      id: "case-ei-tongue-partial",
      order: 3,
      label: "舌象不完整",
      detail: "仅苔略黄，舌质未记",
      role: "supporting",
      requiredForReasoning: true,
    },
    {
      id: "case-ei-pulse-day0",
      order: 4,
      label: "初起脉浮",
      detail: "支持早期浅位线索",
      role: "supporting",
      requiredForReasoning: true,
    },
    {
      id: "case-ei-pulse-day2-missing",
      order: 5,
      label: "后续脉象缺失",
      detail: "今日脉象未记",
      role: "missing",
      requiredForReasoning: true,
    },
    {
      id: "case-ei-vitals-missing",
      order: 6,
      label: "体温曲线与实验室缺失",
      detail: "无连续体温与检查数据",
      role: "missing",
      requiredForReasoning: true,
    },
    {
      id: "case-ei-meds",
      order: 7,
      label: "已自服感冒药",
      detail: "可能影响寒热与汗出表现",
      role: "supporting",
      requiredForReasoning: false,
    },
    {
      id: "case-ei-question-label",
      order: 8,
      label: "家属标签压力",
      detail: "急问“还在表还是入里”，容易诱导过早贴单一标签",
      role: "supporting",
      requiredForReasoning: false,
    },
  ],
  reasoningSteps: [
    {
      id: "case-ei-step-evidence",
      order: 1,
      stage: "evidence",
      label: "证据分组",
      prompt: "把现有表现按初起证据、两日后证据、缺失信息与可能干扰重新组织。",
      placeholder: "例如：D0……；D2……；仍缺……；干扰……",
      minimumCharacters: 70,
      answerFramework: [
        "D0：恶寒发热、无汗头痛鼻塞、脉浮。",
        "D2：恶寒减、高热口渴心烦、便结；苔略黄。",
        "缺失：完整舌质、今日脉、体温曲线与实验室；干扰：自服药。",
      ],
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    {
      id: "case-ei-step-mechanism",
      order: 2,
      stage: "mechanism",
      label: "病机与评估方向",
      prompt: "分别写出中医病位/转化方向和现代病程–系统评估方向，不要先报确定证名或疾病名。",
      placeholder: "中医：初起偏表……今日……；现代：时间轴与警示……",
      minimumCharacters: 90,
      answerFramework: [
        "中医：D0 更支持表位受邪；D2 表寒减轻而里热征象增多，倾向由表入里，是否表证未尽需看残留表症。",
        "现代：急性起病后热势与口渴、便结需按时间轴与系统症状评估，并识别需补的生命体征与检查。",
        "两条链共享病程记录，但判断依据与结论边界分别成立。",
      ],
      sourceIds: [
        exteriorInteriorSourceIds.textbook,
        exteriorInteriorSourceIds.teacherReview,
        exteriorInteriorSourceIds.editorial,
      ],
    },
    {
      id: "case-ei-step-syndrome",
      order: 3,
      stage: "syndrome",
      label: "暂定病位结论",
      prompt: "给出当前能支持到什么程度的表里/转化方向，并主动写明不能下确定结论的原因。",
      placeholder: "现有证据更支持……；因为缺少……只能暂定……",
      minimumCharacters: 70,
      answerFramework: [
        "现有前后对比更支持“初起在表、目前向里热方向转化”的暂定判断。",
        "舌脉不全、有无残留表症未核实，故不能写成最终单一证型。",
        "本案亦不能仅凭口渴便结直接定为半表半里或表里同病。",
      ],
      sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
    },
    {
      id: "case-ei-step-differential",
      order: 4,
      stage: "differential",
      label: "鉴别排除与边界",
      prompt: "排除至少一个容易被带偏的标签，并分别写出中医复核、现代评估与关系边界。",
      placeholder: "不能仅凭……仍判在表/直接半表半里；需要……；现代应……；二者不可……",
      minimumCharacters: 110,
      answerFramework: [
        "不能因“还有一点不适”就坚持还在表，也不能把恶寒已减后的高热口渴直接叫半表半里（缺往来等特征）。",
        "中医需补完整舌脉、核对有无残留表症与汗出；现代需测体温曲线、评估脱水/感染警示并安排必要检查。",
        "八纲表里与解剖内外、西医疾病诊断不可直接等同；本案例只训练推理结构。",
      ],
      sourceIds: [
        exteriorInteriorSourceIds.textbook,
        exteriorInteriorSourceIds.teacherReview,
        exteriorInteriorSourceIds.editorial,
      ],
    },
  ],
  answer: {
    authority: "nur-platform",
    confidence: "source-cross-checked",
    notice:
      "结构参考由 NUR 按已接入资料交叉核对，用于发现推理断点；不是学校标准答案、教师批改答案或医疗诊断。",
    sourceIds: [
      exteriorInteriorSourceIds.textbook,
      exteriorInteriorSourceIds.teacherReview,
      exteriorInteriorSourceIds.editorial,
    ],
  },
  scoring: {
    id: "scoring-case-exterior-interior-reasoning",
    standardVersion: "nur-case-v1",
    status: "available",
    authority: "nur-platform",
    title: "NUR 推理链自核量表",
    totalPoints: 10,
    notice:
      "该10分仅表示平台推理训练结构，不代表本课程案例题真实采分点；教师评分标准仍待提供。",
    criteria: [
      {
        id: "case-ei-score-evidence",
        order: 1,
        stage: "evidence",
        perspective: "shared-evidence",
        label: "证据分组完整",
        detail: "区分初起证据、后续变化、缺失信息与干扰。",
        points: 2,
      },
      {
        id: "case-ei-score-mechanism",
        order: 2,
        stage: "mechanism",
        perspective: "tcm",
        label: "转化推理成链",
        detail: "由前后证据写到表→入里方向，并说明仍需合参。",
        points: 2,
      },
      {
        id: "case-ei-score-syndrome",
        order: 3,
        stage: "syndrome",
        perspective: "tcm",
        label: "结论强度恰当",
        detail: "给出暂定病位/转化方向，同时主动限制结论。",
        points: 2,
      },
      {
        id: "case-ei-score-modern",
        order: 4,
        stage: "differential",
        perspective: "modern-medicine",
        label: "现代评估独立",
        detail: "把时间轴、热势与缺失检查写成待评估，不以单一症状下诊断。",
        points: 2,
      },
      {
        id: "case-ei-score-boundary",
        order: 5,
        stage: "differential",
        perspective: "boundary",
        label: "鉴别与边界明确",
        detail: "排除仍在表/半表半里等易混标签，并明确中医与现代不可直接等同。",
        points: 2,
      },
    ],
    assistanceRules: [
      {
        criterionId: "case-ei-score-evidence",
        memoryCriterionId: "memory-exterior-interior-evidence",
        signalGroups: [
          ["恶寒", "发热", "无汗", "头痛", "鼻塞", "脉浮"],
          ["口渴", "心烦", "便", "高热"],
          ["缺", "舌", "脉", "体温", "实验室"],
        ],
        nextStepPrompt: "先把 D0、D2、缺失与干扰分成组，再限制结论强度。",
        rewriteSuggestion:
          "现有证据应分为初起表位组合、两日后里热倾向变化、缺失信息（舌脉与检查）与自服药干扰。",
      },
      {
        criterionId: "case-ei-score-mechanism",
        memoryCriterionId: "memory-exterior-interior-transformation",
        signalGroups: [
          ["表", "入里", "转化"],
          ["恶寒减", "里热", "合参"],
        ],
        nextStepPrompt: "用前后对比说明为何倾向由表入里，并保留合参。",
        rewriteSuggestion:
          "D0 表症组合支持浅位受邪；D2 恶寒减而高热口渴心烦便结增多，倾向入里，仍须补舌脉与残留表症。",
      },
      {
        criterionId: "case-ei-score-syndrome",
        memoryCriterionId: "memory-exterior-interior-definition",
        signalGroups: [
          ["暂定", "方向", "支持"],
          ["不能", "缺少", "舌", "脉", "定证"],
        ],
        nextStepPrompt: "把“支持什么病位/转化方向”和“为什么还不能定证”写在同一段。",
        rewriteSuggestion:
          "现有证据仅支持初起在表、目前向里热转化的暂定方向；因舌脉与检查未补全，不能写成最终单一证型。",
      },
      {
        criterionId: "case-ei-score-modern",
        memoryCriterionId: "memory-exterior-interior-modern",
        signalGroups: [
          ["体温", "时间", "曲线"],
          ["评估", "警示", "检查", "脱水", "感染"],
        ],
        nextStepPrompt: "把热势与缺失数据写成待评估组合，并说明下一步。",
        rewriteSuggestion:
          "高热、口渴与便结应按时间轴与系统症状评估，补测体温曲线与必要检查，而不能据单一症状下现代诊断。",
      },
      {
        criterionId: "case-ei-score-boundary",
        memoryCriterionId: "memory-exterior-interior-boundary",
        signalGroups: [
          ["不可直接等同", "不能直接等同", "解剖"],
          ["半表半里", "还在表", "不能仅凭"],
        ],
        nextStepPrompt: "排除一个易混标签，再写中医复核、现代评估与不可直接等同。",
        rewriteSuggestion:
          "不能因家属追问就坚持还在表，也不能在无往来特征时称半表半里；八纲表里与解剖内外/疾病诊断不可直接等同。",
      },
    ],
    sourceIds: [
      exteriorInteriorSourceIds.textbook,
      exteriorInteriorSourceIds.teacherReview,
      exteriorInteriorSourceIds.editorial,
    ],
  },
  boundaryNote:
    "本案例仅用于学习推理结构，不提供临床诊断、个人医疗建议或任课教师真实评分。",
  sourceIds: [
    exteriorInteriorSourceIds.textbook,
    exteriorInteriorSourceIds.teacherReview,
    exteriorInteriorSourceIds.editorial,
  ],
} satisfies CaseDefinition;

export function buildExteriorInteriorKnowledgePoint(
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
    "kp-eight-principles-exterior-interior",
    "exterior-interior",
    1,
    "表里辨证",
    "表证、里证及表里转化",
    "高频",
    {
      contentStatus: "available",
      evidenceFramework: [
        "病程与起势",
        "表位线索",
        "里位与四诊复核",
        "转化、兼夹与现代边界",
      ],
      lenses: [exteriorInteriorTcmLens, exteriorInteriorModernLens],
      relationships: [
        {
          id: "relationship-exterior-interior-related",
          fromLensId: exteriorInteriorTcmLens.id,
          toLensId: exteriorInteriorModernLens.id,
          label: "related",
          status: "available",
          note: "两种视角共享可规范采集的起病时间、寒热变化、系统症状与治疗后进展等原始观察证据。",
          sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.teacherReview],
        },
        {
          id: "relationship-exterior-interior-learning-aid",
          fromLensId: exteriorInteriorTcmLens.id,
          toLensId: exteriorInteriorModernLens.id,
          label: "learning-aid",
          status: "available",
          note: "现代病程时间轴与危险信号进入 NUR 作答及评分训练，帮助把证据描述得更完整。",
          sourceIds: [exteriorInteriorSourceIds.editorial],
        },
        {
          id: "relationship-exterior-interior-not-equivalent",
          fromLensId: exteriorInteriorTcmLens.id,
          toLensId: exteriorInteriorModernLens.id,
          label: "not-equivalent",
          status: "available",
          note: "八纲表里是中医病位判断，与解剖学体表/内脏二分或现代疾病部位诊断不是一一对应，必须分别论证和评分。",
          sourceIds: [exteriorInteriorSourceIds.textbook, exteriorInteriorSourceIds.editorial],
        },
      ],
      learningMemoryCriteria: exteriorInteriorLearningMemoryCriteria,
      sourceIds: [
        exteriorInteriorSourceIds.textbook,
        exteriorInteriorSourceIds.teacherReview,
        exteriorInteriorSourceIds.editorial,
      ],
      assessmentItemIds: [
        "assessment-exterior-interior-short",
        "assessment-exterior-interior-whitebook",
        ...(questionBankKnowledgePointItems["kp-eight-principles-exterior-interior"] ?? []),
        ...(completeKnowledgePointItems["kp-eight-principles-exterior-interior"] ?? []),
        exteriorInteriorAssessmentItemIds.termHalfExterior,
        exteriorInteriorAssessmentItemIds.shortStructure,
      ],
      caseIds: [exteriorInteriorCaseId],
      lesson: exteriorInteriorLesson,
    },
  );
}
