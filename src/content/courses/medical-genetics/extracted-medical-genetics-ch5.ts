import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学遗传学 学习指导与习题集（第4版）— 第5章 多基因病的遗传 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：8 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：5 题
 * - 简答题 / 病例（映射 short-answer 或 case）：2 题（均为 short-answer）
 * - B1 共用备选答案配伍题：2 组、共 4 个成员
 * - 独立记分题合计：19 题（含 B1 组成员；须等于本文件预算 19）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依序含名词解释 8、A1 型选择题 10、A2 型（病例/计算型选择题）4、
 *   B1 配伍 2 组（15~16、17~21 各共用一套备选答案）、简答题 4；本章无 X 型多选，
 *   亦无独立非选择型的病案/遗传咨询计算题，故按规约本章不产出 case 题型。本文件按
 *   19 道预算依原书顺序等比取材：全部 8 道名词解释、代表性 A1/A2 选择题 5 道（含
 *   群体易患性阈值关系、精神分裂症、多基因遗传特点、先天性幽门狭窄与唇腭裂的复发
 *   风险计算）、B1 两组各取代表性成员（Q15/Q16、Q19/Q21）、简答题 2 道。所有选择题
 *   正确项逐一对齐源参考答案（Q2=A、Q3=A、Q6=E、Q13=C、Q14=D、Q15=C、Q16=D、
 *   Q19=A、Q21=C）。A1/A2 计算类均为选择题，按规约映射为 a1-single；选项顺序已
 *   随机重排并同步 correctChoiceIndex（0 起）。遗传率（80%、70%、76%）、群体发病率
 *   （0.0016、0.36%、0.17%、0.005/0.001）、遗传度/阈值/易患性均值关系、以及“一级
 *   亲属复发风险≈√群体发病率”的阈值模型（如 √0.0016=0.04、√0.0017≈4%）等数值与
 *   阈值推论均按原值保留，未捏造。OCR 错字已按语义恢复（如“—致性”→一致性、
 *   “幺患性/易戚性”→易患性、“质fi/数fl 性状”→质量/数量性状、家族聚集“倾ft”→倾向、
 *   “关闭”→类似 等）。同源 B1 共用备选答案未改动。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "medical-genetics-ch5-polygenic-inheritance";
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第5章 多基因病的遗传 复习思考题 习题（PDF 第32–36页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），8 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：质量性状（qualitative trait）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "质量性状",
        "质量性状（qualitative trait；qualitative character）是指由一对或几对基因控制，不易受环境影响，表现为非连续变异的性状。质量性状呈单基因遗传方式。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：数量性状（quantitative trait）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "数量性状",
        "数量性状（quantitative trait；quantitative character）是指由多个基因控制，易受环境影响，呈现连续变异的性状。数量性状呈多基因遗传方式。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：易感性（susceptibility）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "易感性",
        "易感性（susceptibility）即遗传因素决定一个个体罹患多基因病的风险。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：易患性（liability）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "易患性",
        "易患性（liability）是指遗传因素和环境因素共同作用，决定个体罹患某种多基因病的风险，即易感性＋环境因素＝易患性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：加性效应（additive effect）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "加性效应",
        "加性效应（additive effect）是指多基因病常由多对微效基因控制，多对微效基因的作用积累之后，可以形成明显的生物学效应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：回归现象（regression）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "回归现象",
        "回归现象（regression）是指数量性状在遗传过程中，子代将向群体的平均值靠拢的现象。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：遗传率（heritability）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "遗传率",
        "遗传率（heritability）即在多基因病形成的过程中，遗传因素的贡献大小。遗传率分为广义遗传率和狭义遗传率。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：一致性（concordance）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "一致性",
        "一致性（concordance）用于形容两个亲属均表现有某种质量性状，或均表现有某种数量性状，相对于不一致性（discordance）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），5 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-a1001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "一种多基因病的群体易患性平均值与阈值的关系是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "群体易患性平均值与阈值越近，表明易患性低、阈值低，群体患病率高",
      "群体易患性平均值与阈值越近，表明易患性高、阈值高，群体患病率高",
      "群体易患性平均值与阈值越近，表明易患性高、阈值低，群体患病率高",
      "群体易患性平均值与阈值越近，表明易患性高、阈值高，群体患病率低",
      "群体易患性平均值与阈值越近，表明易患性低、阈值低，群体患病率低",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "群体易患性平均值与阈值越近，表明易患性高、阈值低，群体患病率高",
        "原书 A1 型选择题答案第二题为 A。群体易患性平均值与阈值越近，表明群体易患性平均值越高、阈值越低，则群体的患病率越高；反之则患病率越低。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-a1002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "精神分裂症属于多基因病，群体发病率为 0.0016，遗传率为 80%，由此计算得到患者一级亲属的复发风险为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["0.001", "0.004", "0.016", "0.04", "0.01"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "0.04",
        "原书 A1 型选择题答案第三题为 A，即 0.04。精神分裂症群体发病率为 0.0016、遗传率 80%，患者一级亲属复发风险近似等于群体发病率的平方根，即 √0.0016 = 0.04。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-a1003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于多基因遗传方式的特点，下列哪种说法不正确？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "两个极端变异的个体杂交后，子一代都是中间类型",
      "两个中间类型的子一代杂交后，子二代大部分亦是中间类型",
      "在一个随机杂交的群体中，变异范围广泛",
      "多基因遗传性状是环境因素和遗传基础共同作用的结果",
      "随机杂交的群体中，不会产生极端个体",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "随机杂交的群体中，不会产生极端个体",
        "原书 A1 型选择题答案第六题为 E。在随机杂交的群体中多基因遗传仍可能产生极端个体（极端变异个体仍会出现遗传），故“不会产生极端个体”的说法不正确；A–D 均为多基因遗传方式的特点。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-a1004",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "先天性幽门狭窄是一种多基因病，群体中男性发病率为 0.005，女性发病率为 0.001。下列哪一种情况下，子女的再现风险高？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "男患的女儿",
      "女患的儿子及女儿",
      "女患的儿子",
      "男患的儿子",
      "女患的女儿",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "女患的儿子",
        "原书 A2 型选择题答案第十三题为 C，即“女患的儿子”。先天性幽门狭窄男性发病率（0.005）高于女性（0.001），女性一侧发病率低、易患性阈值高；女性一旦患病说明其携带的易感基因更多、病情较极端，其后代再现风险高，其中男性发病倾向更高，故“女患的儿子”再现风险最高。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-a1005",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "唇裂合并腭裂的遗传率为 76%。在我国，该病的发病率约为 0.17%，患者的一级亲属的再现风险约为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["1/2", "4%", "40%", "0.4%", "1/4"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "4%",
        "原书 A2 型选择题答案第十四题为 D，即 4%。唇裂合并腭裂群体发病率约 0.17%，患者一级亲属再现风险近似为群体发病率的平方根，即 √0.0017 ≈ 0.041 ≈ 4%。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-short001",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述多基因遗传的特点。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多基因遗传的特点",
        "多基因遗传方式具有以下特点：①发病有家族聚集倾向，但无明显的遗传方式；②发病率有种族或民族差异；③近亲婚配时，子女的发病风险也增高；④患者双亲与患者同胞、子女的亲缘系数相同，有相同的发病风险；⑤随亲属级别的降低，患者亲属发病风险迅速下降。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-short002",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "比较质量性状和数量性状的异同点。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "质量性状与数量性状的异同",
        "共同之处：两者都有一定的遗传基础，常表现有家族聚集性。不同之处：质量性状（单基因遗传）由一对等位基因决定，遗传方式较为明显，有显性或隐性之分；群体变异曲线为不连续分布、呈 2～3 个峰，表型和基因型对应明显，显性和隐性表型比例按 1/2 或 1/4 规律遗传。数量性状由多对微效基因和环境因素共同决定，遗传方式不明确；群体变异曲线为单峰正态分布，表现为连续变异。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例 / 病案分析（case）：本章无独立非选择型病案/遗传咨询计算题 */
const caseItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，2 组 × 各 2 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-b001",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "由环境决定",
      "由主基因决定",
      "由2对或以上微效基因决定，具有加性效应",
      "基因型和表型之间的对应关系明显",
      "由一对显性基因决定",
    ],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-medical-genetics-ch5-polygenic-inheritance-b001m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "数量遗传的特征是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 2,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "由2对或以上微效基因决定，具有加性效应",
            "原书 B1 型题第 15 题为 C，即数量遗传的特征是“由 2 对或以上微效基因决定，具有加性效应”。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch5-polygenic-inheritance-b001m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "质量遗传的特征是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 3,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "基因型和表型之间的对应关系明显",
            "原书 B1 型题第 16 题为 D，即质量遗传的特征是“基因型和表型之间的对应关系明显”。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
    ],
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch5-polygenic-inheritance-b002",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "Falconer 公式",
      "Holzinger 公式",
      "Edwards 公式",
      "Carter 效应",
      "Galton 理论",
    ],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-medical-genetics-ch5-polygenic-inheritance-b002m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "已知先证者亲属的患病率和一般人群的患病率，计算遗传率的公式是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 0,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "Falconer 公式",
            "原书 B1 型题第 19 题为 A，即 Falconer 公式。当已知先证者亲属的患病率和一般人群的患病率时，用 Falconer 公式计算遗传率。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch5-polygenic-inheritance-b002m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt:
          "当群体患病率在 0.1%～1%，遗传率在 70%～80% 之间，计算患者的一级亲属的再现风险可以利用",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 2,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "Edwards 公式",
            "原书 B1 型题第 21 题为 C，即 Edwards 公式。当群体患病率在 0.1%～1%、遗传率在 70%～80% 之间时，可利用 Edwards 公式推算患者一级亲属的再现风险。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
    ],
    sourceIds: [],
  },
];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];