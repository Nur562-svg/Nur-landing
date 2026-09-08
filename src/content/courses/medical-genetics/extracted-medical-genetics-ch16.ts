import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学遗传学 学习指导与习题集（第4版）— 第16章 肿瘤与遗传 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：6 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：3 题（A1 型 2、A2 型 1）
 * - 简答题：2 题（本章原书无病例型题目）
 * - B1 共用备选答案配伍题：1 组、共 5 个成员
 * - 独立记分题合计：16 题（含 B1 组成员；等于本文件预算 16）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依序含名词解释 6、A1 型选择题 10、A2 型选择题 2、
 *   B1 共用备选答案配伍题 2 组（13–17 题、18–20 题）、简答题 6，本章无病例题。
 *   按 16 道预算等比取样并依原书顺序覆盖各题型：全部 6 道名词解释、A1 第 1、2 题
 *   （家族性肿瘤综合征特征、首个被克隆的人类癌基因，原书答案 1.B 2.A 对齐）、A2 第 11 题
 *   （Ph染色体/BCR-ABL 病例型单选题）、B1 第一组（13–17 题共用备选答案）全部 5 个成员，
 *   以及简答第 1、2 题。所有选择题正确项逐一对齐源参考答案并随机重排选项、同步
 *   correctChoiceIndex（0 起）。OCR 错字已按医学语义恢复（如“t(9;2l)(q34;qll)”→
 *   t(9;22)(q34;q11)、“甩″→ 组、“虐″→ 基因、“g″→ 9 等）。癌基因/抑癌基因名
 *   （RB1/TP53/RET/APC/VHL/MYC/KRAS 等）、遗传性肿瘤综合征名及数值均按原值保留，未捏造。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "medical-genetics-ch16-tumor-and-genetics";
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第16章 肿瘤与遗传 复习思考题 习题（PDF 第98–101页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：基因组不稳定性（genomic instability）",
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
        "基因组不稳定性",
        "基因组不稳定性（genomic instability）是指因 DNA 复制异常所致的 DNA 序列改变，以及因染色体分离等异常所致的染色体畸变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：癌基因（oncogene）",
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
        "癌基因",
        "癌基因（oncogene）是指能够促进细胞异常分裂、增殖或转化的突变原癌基因（proto-oncogene）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：抑癌基因（tumor suppressor gene, TSG）",
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
        "抑癌基因",
        "抑癌基因（tumor suppressor gene，TSG）是指在正常细胞中存在的，对细胞的增殖、分裂和分化等起负调控作用的一类基因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：家族性肿瘤综合征（cancer family syndrome）",
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
        "家族性肿瘤综合征",
        "家族性肿瘤综合征（cancer family syndrome）是指某些特异类型的癌症（如 2 型 Lynch 综合征）在某些家族中存在家族聚集性的现象。家族性肿瘤综合征多半源于亲代的单个显性基因突变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肿瘤基因组学（cancer genomics）",
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
        "肿瘤基因组学",
        "肿瘤基因组学（cancer genomics）是指在整个基因组的水平上研究肿瘤发生发展的分子基础的学科。其最终目标是揭示各种肿瘤发生发展的分子机制，并为肿瘤个体化医疗的建立和完善奠定基础。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：靶向治疗（肿瘤个性化治疗，targeted therapy）",
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
        "靶向治疗",
        "靶向治疗（targeted therapy）又可称“肿瘤个性化治疗”，是指针对个体独特的基因组信息，利用药物阻断对肿瘤形成和生长起关键作用的分子，从而达到抑制肿瘤形成和生长的治疗作用。靶向治疗避免了对体内正常快速增殖细胞的抑制作用，减少了治疗的不良反应，是个性化医学的重要组成部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "家族性肿瘤综合征不具有以下哪一项特征？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "多基因遗传",
      "家族聚集性",
      "发病早",
      "双侧",
      "多发",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多基因遗传",
        "原书 A1 型选择题第 1 题参考答案为 B，即“多基因遗传”。家族性肿瘤综合征具有家族聚集性、发病早、多发、双侧等特点，且多半源于亲代的单个显性基因突变，并非多基因遗传。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "第一个被克隆的人类癌基因是？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["SRC", "RB1", "MYC", "RAS", "TP53"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "RB1",
        "原书 A1 型选择题第 2 题参考答案为 A，即 RB1。选项已随机重排，正确项为 RB1（按源参考答案；各选项所涉癌基因/抑癌基因名 SRC、MYC、RAS、TP53 均按原值保留）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某女性患者，35 岁，反复低热，脾大，粒细胞增多且不成熟，嗜碱性粒细胞增多，Ph 染色体(+)，BCR/ABL(+)。其最可能的诊断是？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "急性淋巴细胞白血病",
      "慢性淋巴细胞白血病",
      "急性混合细胞白血病",
      "慢性髓细胞性白血病",
      "急性髓细胞性白血病",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "慢性髓细胞性白血病",
        "原书 A2 型选择题第 11 题参考答案为 D，即慢性髓细胞性白血病（chronic myelocytic leukemia，CML）。该患者 Ph 染色体(+)、BCR/ABL(+)，脾大、粒细胞增多不成熟、嗜碱性粒细胞增多，符合 CML 的特征，Ph 染色体为其特异性标记染色体。",
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
    id: "ext-medical-genetics-ch16-tumor-and-genetics-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "举例说明特异性标记染色体与肿瘤发生的意义。",
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
        "特异性标记染色体与肿瘤发生的意义",
        "例如费城染色体（Ph 染色体，或称“Ph 小体”）是慢性髓细胞性白血病（chronic myelocytic leukemia，CML）的特异性标记染色体（marker chromosome）。超过 90% 的 CML 患者具有 Ph 染色体，可作为本病的诊断依据；另外，Ph 染色体先于临床症状出现，故可用于 CML 的早期诊断。特异型标记染色体的出现是肿瘤克隆性及其来源的标志，对肿瘤的诊断、分型与早期发现具有重要意义。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "癌基因的分类及激活机制是什么？",
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
        "癌基因的分类及激活机制",
        "（1）癌基因的功能分类：生长因子、生长因子受体、信号转导分子、DNA 结合蛋白和转录因子、细胞周期抑制因子、凋亡抑制因子等。",
        "（2）癌基因的激活机制包括：①遗传学水平上的激活机制：基因扩增、启动子插入、点突变、染色体易位与重排；②表观遗传学水平上的激活机制：DNA 去甲基化、非编码 RNA 调控异常、组蛋白乙酰化。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 5 成员（原书 13–17 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-medical-genetics-ch16-tumor-and-genetics-b001",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt:
      "（原书 13–17 题共用备选答案）下列为 5 个肿瘤相关基因：RB1、RET、APC、TP53、VHL。请找出各遗传性肿瘤/综合征的主要致病基因（备选答案可重复选用，本题 5 小题各对应一个基因）。",
    sharedChoices: ["RB1", "RET", "APC", "TP53", "VHL"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-medical-genetics-ch16-tumor-and-genetics-b001m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "遗传性视网膜母细胞瘤的主要致病基因是",
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
            "RB1",
            "原书 B1 型第 13 题参考答案为 A，即 RB1。遗传性视网膜母细胞瘤的主要致病基因是抑癌基因 RB1。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch16-tumor-and-genetics-b001m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "2 型多发性内分泌腺瘤（MEN 2A）的主要致病基因是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 1,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "RET",
            "原书 B1 型第 14 题参考答案为 B，即 RET。2 型多发性内分泌腺瘤（MEN 2A）的主要致病基因是原癌基因 RET。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch16-tumor-and-genetics-b001m3",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "家族性腺瘤性息肉（FAP）的主要致病基因是",
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
            "APC",
            "原书 B1 型第 15 题参考答案为 C，即 APC。家族性腺瘤性息肉（FAP）的主要致病基因是抑癌基因 APC。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch16-tumor-and-genetics-b001m4",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "Li-Fraumeni 综合征的主要致病基因是",
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
            "TP53",
            "原书 B1 型第 16 题参考答案为 D，即 TP53。Li-Fraumeni 综合征的主要致病基因是抑癌基因 TP53。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch16-tumor-and-genetics-b001m5",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "von Hippel-Lindau 综合征的主要致病基因是",
        promptSource: {
          authority: "nur-editorial",
          wording: "nur-adapted",
          locator: locatorBase,
          note: promptNote,
          sourceIds: [],
        },
        correctChoiceIndex: 4,
        answer: {
          status: "available",
          authority: "nur-platform",
          confidence: "unverified",
          content: [
            "VHL",
            "原书 B1 型第 17 题参考答案为 E，即 VHL。von Hippel-Lindau 综合征的主要致病基因是抑癌基因 VHL。",
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
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];