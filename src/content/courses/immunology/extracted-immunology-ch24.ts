import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第24章 免疫学检测技术 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：12 题（含 A2 病例题 2 道）
 * - 问答题（short-answer）：2 题
 * - 独立记分题合计：20 题（须等于本文件预算 20）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、填空题 5、选择题 A1 36 + A2 15 + B1 52~71、问答题 3；
 *   本文件按 20 道预算等比取材并在原书顺序内取满。A2 病例题按项目规约与 A1 一起映射为
 *   a1-single。B 型配伍题本书一般无，本章按规约不并入独立记分题。检测技术侧重方法→用途
 *   对应（直接/间接凝集、单向琼脂扩散、ELISA、ELISPOT、免疫荧光、胶体金、Coombs 等），
 *   OCR 错字与双栏错序已按免疫学医学语义恢复，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch24-immunology-diagnostics";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第24章 免疫学检测技术 习题（核对PDF 第270–279页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch24-immunology-diagnostics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：凝集反应",
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
        "凝集反应",
        "凝集反应：颗粒性抗原与相应的抗体在电解质存在的条件下结合，形成肉眼可见的凝集团块的现象。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：沉淀反应",
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
        "沉淀反应",
        "沉淀反应：可溶性抗原与相应抗体结合后，在适当电解质存在条件下形成肉眼可见沉淀物的反应，可在细试管内进行（环状沉淀），也可用琼脂做支持物进行。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：ELISA",
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
        "ELISA（酶联免疫吸附试验）",
        "ELISA 即酶联免疫吸附试验。基本方法是将已知抗原或抗体吸附在固相载体表面，捕获待测的抗体或抗原，再应用酶标记的抗抗体或特异性抗体与之结合，加底物显色，定性或定量检测抗原或抗体的含量。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），12 道（含 A2 病例题 2 道） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "诊断布氏菌病的瑞特试验（Wright）属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "反向间接凝集",
      "间接凝集",
      "直接凝集",
      "协同凝集",
      "间接凝集抑制",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "直接凝集",
        "瑞特试验用布氏菌体如有鞭毛、颗粒性抗原与相应抗体直接结合发生凝集，属直接凝集反应。原书 A1 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "免疫标记技术的示踪物质不包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "荧光素",
      "免疫毒素",
      "酶",
      "化学发光物质",
      "放射性同位素",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "免疫毒素",
        "免疫标记技术的常用示踪物为酶、荧光素、放射性核素、化学发光物质及胶体金等；免疫毒素是抗体与毒素的偶联物，不属于示踪物质。原书 A1 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪项反应不属于体外抗原-抗体反应",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "沉淀反应",
      "凝集反应",
      "ELISA",
      "PCR",
      "免疫荧光技术",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "PCR",
        "PCR（聚合酶链反应）扩增核酸，不是体外抗原-抗体反应；沉淀、凝集反应、ELISA、免疫荧光均属 Ag-Ab 反应。原书 A1 答案第 3 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不能用于检测 B 细胞的试验是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "ELISPOT",
      "EA花环",
      "溶血空斑试验",
      "LPS促淋巴细胞转化",
      "ConA促淋巴细胞转化",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "ConA促淋巴细胞转化",
        "ConA 是 T 细胞有丝分裂原，主要刺激 T 细胞增殖，故不能用于检测 B 细胞；ELISPOT、EA 花环、溶血空斑、LPS 促转化（B 细胞丝裂原）均可检测 B 细胞。原书 A1 答案第 5 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "PHA 刺激的淋巴细胞转化试验用于检测",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "APC的功能",
      "吞噬细胞功能",
      "B细胞免疫功能",
      "T细胞免疫功能",
      "补体的功能",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "T细胞免疫功能",
        "PHA 是 T 细胞有丝分裂原，PHA 刺激的淋巴细胞转化试验反映 T 细胞免疫功能。原书 A1 答案第 7 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1006",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "测定淋巴细胞功能可采用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "凝集反应",
      "淋巴细胞转化试验",
      "沉淀反应",
      "免疫酶技术",
      "荧光抗体技术",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "淋巴细胞转化试验",
        "淋巴细胞转化试验（增殖试验）用于测定淋巴细胞功能。原书 A1 答案第 9 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1007",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可用于定量检测病人血清补体 C3 的方法是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "直接凝集试验",
      "双向琼脂扩散",
      "单向琼脂扩散",
      "免疫荧光",
      "补体结合试验",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "单向琼脂扩散",
        "单向琼脂扩散（Mancini 法）为定量沉淀反应，可用于定量检测血清补体 C3（可溶性蛋白）含量。原书 A1 答案第 12 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1008",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "鉴定 T 细胞亚群的方法是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "ELISA",
      "ELISPOT",
      "间接凝集试验",
      "免疫荧光法",
      "沉淀反应",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "免疫荧光法",
        "用抗不同 CD 分子的荧光抗体（如 anti-CD4/CD8）经免疫荧光或流式可鉴定 T 细胞亚群。原书 A1 答案第 17 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1009",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可与抗原肽-MHC 分子四聚体结合的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "NK细胞",
      "巨噬细胞",
      "抗原特异性B淋巴细胞",
      "DC细胞",
      "抗原特异性T淋巴细胞",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抗原特异性T淋巴细胞",
        "抗原肽-MHC 四聚体通过 TCR 特异性结合抗原特异性 T 淋巴细胞（CD8+T 或 CD4+T），可用流式计数其频率。原书 A1 答案第 31 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1010",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列方法中属于对抗原进行组织定位的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "免疫荧光技术",
      "Northern blot",
      "Western blot",
      "Southern blot",
      "溶血空斑试验",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "免疫荧光技术",
        "免疫荧光技术（组织/细胞免疫组化）可用于组织中抗原的定位检测；Northern/Western/Southern blot 及溶血空斑分别用于 RNA、蛋白质、DNA 定量及抗体形成细胞检测。原书 A1 答案第 35 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1011",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "患者，女性，33岁，已婚，近日感乏力、恶心，偶有呕吐；无发热及卡他症状，停经月余，用早早孕试剂自测结果阳性。该检测方法属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "免疫印迹技术",
      "ELISA",
      "免疫胶体金技术",
      "免疫荧光技术",
      "免疫组化技术",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "免疫胶体金技术",
        "早早孕试纸利用胶体金标记抗体与尿液 HCG 结合显色，属免疫胶体金技术。原书 A2 答案第 38 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-a1012",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "患儿，6岁，经常头晕乏力，眼睑苍白，体检可触及肿大的脾脏，疑为免疫性溶血性贫血，拟作 Coombs 试验。该试验属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "凝集反应",
      "沉淀反应",
      "ELISA",
      "免疫组化技术",
      "免疫放射技术",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "凝集反应",
        "Coombs（抗球蛋白）试验是检测细胞表面不完全抗体的间接凝集反应，用于免疫性溶血性贫血等的检测。原书 A2 答案第 42 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），3 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch24-immunology-diagnostics-fill001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "影响抗原抗体反应的因素包括___。",
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
        "电解质、温度、酸碱度",
        "抗原抗体反应受电解质、温度和酸碱度（pH）三方面因素影响。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-fill002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "抗体的亲和力越高，则与抗原的解离度___。",
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
        "越低",
        "抗体亲和力越高，其与抗原结合越牢固，解离度越低。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-fill003",
    order: 18,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "常用的免疫标记物有___和___等。",
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
        "酶、荧光素、放射性核素、化学发光物质、胶体金",
        "常用免疫标记物包括酶、荧光素、放射性核素（同位素）、化学发光物质及胶体金等。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch24-immunology-diagnostics-short001",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述体外抗原抗体反应的特点。",
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
        "体外抗原抗体反应的特点",
        "①高度特异性：抗原与相应抗体结合高度专一；②是表面化学基团之间的可逆结合；③需要适宜的抗原抗体浓度和比例（等价带等）；④反应分为特异性结合阶段和可见反应阶段两个阶段。原书问答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch24-immunology-diagnostics-short002",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "测定 T 细胞功能的方法有哪些？",
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
        "测定 T 细胞功能的方法",
        "（1）T 细胞增殖试验：①3H-TdR 掺入法；②MTT 法。（2）细胞毒性试验：①51Cr 释放法；②乳酸脱氢酶（LDH）释放法；③凋亡细胞检测法。（3）检测细胞因子（如 ELISPOT 等）。原书问答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 本书一般无 B 型配伍题；保持空数组 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];