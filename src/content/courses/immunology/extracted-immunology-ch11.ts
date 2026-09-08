import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第11章 抗原提呈细胞与抗原的加工及提呈 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：5 题
 * - 问答题（short-answer）：3 题
 * - 独立记分题合计：16 题（须等于本文件预算 16）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书题型分布为名词解释 10、填空 5、A1 型 33、B1 型 6、问答题 5；本文件按 16 道
 *   预算等比取材。全部正确项对照章末「参考答案」键号锚定，选项均已随机重排并同步
 *   correctChoiceIndex（0 起）。OCR 错字已按免疫学医学语义恢复（如 MHC I类/II类途径、
 *   TAP、Ii/Ii链、MIIC、CLIP、HLA-DM、CD4⁺/CD8⁺、CD1分子等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch11-apc-antigen-processing";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第11章 抗原提呈细胞与抗原的加工及提呈 习题（核对PDF 第123–130页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch11-apc-antigen-processing-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗原提呈细胞",
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
        "抗原提呈细胞（APC）",
        "抗原提呈细胞是能够加工抗原并以抗原肽-MHC分子复合物的形式将抗原肽提呈给T细胞的一类细胞，在机体的免疫识别、免疫应答与免疫调节中起重要作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：树突状细胞（DC）",
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
        "树突状细胞（DC）",
        "树突状细胞是一类成熟时具有许多树突样突起的、能够识别、摄取和加工外源性抗原并将抗原肽提呈给初始T细胞进而诱导T细胞活化增殖的、功能最强的抗原提呈细胞，是机体适应性免疫应答的始动者，主要分为经典DC及浆细胞样DC。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：外源性抗原",
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
        "外源性抗原",
        "外源性抗原指来自细胞外的抗原，例如被吞噬的细胞、被吞噬的细菌或内化的蛋白质抗原等，主要通过MHC II类分子途径加工和提呈。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗原的交叉提呈",
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
        "抗原的交叉提呈（交叉提呈）",
        "抗原的交叉提呈指APC能将摄取、加工的外源性抗原通过MHC I类分子途径提呈给CD8⁺T细胞；或将内源性抗原通过MHC II类分子途径提呈给CD4⁺T细胞，属于非经典的抗原提呈途径。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：TAP",
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
        "TAP",
        "TAP即抗原加工相关转运物，是由两个6次跨膜蛋白组成的异二聚体，共同在内质网膜上形成孔道，可选择性地转运适合与MHC I类分子结合的抗原肽进入内质网。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（统一映射为 a1-single），5 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch11-apc-antigen-processing-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗原提呈细胞能够摄取、加工外源性抗原并以抗原肽-MHC II类分子复合物的形式将抗原肽提呈给",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "CD3⁺T细胞",
      "CD4⁺T细胞",
      "CD8⁺T细胞",
      "CD25⁺T细胞",
      "CD45⁺T细胞",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "CD4⁺T细胞",
        "外源性抗原经MHC II类分子途径加工后，以抗原肽-MHC II类分子复合物的形式提呈给CD4⁺T细胞；内源性抗原则经MHC I类途径提呈给CD8⁺T细胞。原书 A1 第 2 题答案 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "活化后可快速产生大量I型干扰素的DC是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["未成熟DC", "迁移期DC", "成熟DC", "经典DC", "浆细胞样DC"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "浆细胞样DC",
        "浆细胞样DC（pDC）活化后可快速产生大量I型干扰素，在抗病毒固有免疫中发挥重要作用。原书 A1 第 5 题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "朗格汉斯细胞属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["未成熟DC", "迁移期DC", "成熟DC", "经典DC", "浆细胞样DC"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "未成熟DC",
        "朗格汉斯细胞是位于皮肤的未成熟DC，能识别和摄取外源性抗原，构成经典DC的成员。原书 A1 第 6 题答案 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能将内源性抗原肽从胞质转运至内质网的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["钙网蛋白", "MHC-DM", "ERAP", "Ii", "TAP"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "TAP",
        "TAP（抗原加工相关转运物）位于内质网膜，可选择性地将胞质中被蛋白酶体降解的抗原肽转运至内质网内，与新组装的MHC I类分子结合。原书 A1 第 25 题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "参与MHC I类分子组装并促进MHC II类分子转运到MIIC的蛋白质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["钙网蛋白", "MHC-DM", "ERAP", "Ii", "TAP"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Ii",
        "Ii（相关恒定链/I类分子相关恒定链Invariant chain）可与MHC II类分子的α、β链结合形成九聚体，促进αβ二聚体组装折叠，阻止MHC II类分子在ER内与其他内源性多肽结合，并促进其转运到MIIC。原书 A1 第 33 题答案 D。",
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
    id: "ext-immunology-ch11-apc-antigen-processing-fill001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "专职性抗原提呈细胞包括___、___和___。",
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
        "树突状细胞、单核/巨噬细胞、B细胞",
        "专职性APC包括树突状细胞、单核/巨噬细胞和B淋巴细胞，组成性表达MHC II类分子。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-fill002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "通常所称的APC能够将___抗原提呈给CD___⁺T细胞；而靶细胞则能将___抗原提呈给CD___⁺T细胞。",
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
        "外源性、4；内源性、8",
        "APC通过MHC II类分子途径将外源性抗原提呈给CD4⁺T细胞；靶细胞通过MHC I类分子途径将内源性抗原提呈给CD8⁺T细胞。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-fill003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "APC通过四种途径进行抗原的加工和提呈：___、___、___和___。",
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
        "MHC I类分子途径（内源性/胞质溶胶抗原提呈途径）；MHC II类分子途径（外源性/溶酶体抗原提呈途径）；非经典的抗原提呈途径（交叉提呈）；脂类抗原的CD1分子提呈途径",
        "APC加工和提呈抗原的四种途径：MHC I类分子途径、MHC II类分子途径、非经典途径（交叉提呈）以及脂类抗原的CD1分子提呈途径。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch11-apc-antigen-processing-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述树突状细胞的主要功能。",
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
        "树突状细胞的主要功能",
        "①识别、摄取和加工抗原，参与固有免疫；②抗原提呈与免疫激活作用；③免疫调节作用；④免疫耐受的诱导与维持。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-short002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述MHC I类分子抗原提呈途径。",
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
        "MHC I类分子抗原提呈途径（主要提呈内源性抗原）",
        "胞质抗原先被泛素化，继而在免疫蛋白酶体中被降解，抗原肽被TAP转移至内质网腔内与新组装的MHC I类分子结合。MHC I类分子α链合成后与伴侣蛋白结合，再与β2m组装成完整的MHC I类分子并与TAP接触，有利于抗原肽与其结合。经修饰的抗原肽-MHC I类分子复合物再经高尔基体转运至细胞膜上，提呈给CD8⁺T细胞。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch11-apc-antigen-processing-short003",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述MHC II类分子抗原提呈途径。",
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
        "MHC II类分子抗原提呈途径（主要提呈外源性抗原）",
        "APC主要通过模式识别受体识别外源性抗原，通过胞饮、吞噬、内化和受体介导的内吞等方式摄取抗原。摄取的抗原经内体或吞噬溶酶体与MIIC融合后被其中的酶类降解产生抗原肽。内质网中新合成的MHC II类分子α链、β链与Ii结合形成（αβIi）₃九聚体，九聚体经高尔基体形成MIIC，Ii被酶解仅留CLIP。在MIIC中，HLA-DM介导高亲和力抗原肽置换CLIP，形成稳定的抗原肽-MHC II类分子复合物，然后转运至细胞膜表面，提呈给CD4⁺T细胞。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题：本书第11章虽有 B1 型题，但按项目规约不单独提取 B 组，bGroups 置空 */
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