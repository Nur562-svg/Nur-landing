import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第39章 抗菌药物概述 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：6 题
 * - 填空题（fill）：0 题（填空题 4 题因预算未纳入，fillItems 为空数组）
 * - 选择题（a1-single）：2 题（含 A1 型、A2 型病例题；本章取样均为 A1 型）
 * - 问答题（short-answer）：0 题（简答题 5 题因预算未纳入，shortItems 为空数组）
 * - B1 配伍题：0 组（本章原书 2 组共 8 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：8 题（须等于本文件预算 8）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 6、填空题 4、选择题（A1 型 7 + B1 型 2 组共 8 小题）
 *   与简答题 5；本文件按 8 道预算取材：名词解释全取 6、A1 型题取第 1–2 题；填空题、
 *   B1 型题（8～15）与简答题因预算未纳入。正确项对齐章末参考答案键号（A1 型题
 *   1.C、2.B；本文件答案键号自 1–15 连续编号），选项已随机重排并同步
 *   correctChoiceIndex。OCR 错字与符号已按药理学医学语义恢复（如 B-内酰胺类→
 *   β-内酰胺类、氯莓素/氯霉素→氯霉素、LD₅₀/ED₅₀ 恢复、多黏菌素 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch39-antimicrobial-overview";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第39章 抗菌药物概述 习题（核对PDF 第256–261页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch39-antimicrobial-overview-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗生素",
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
        "由各种微生物（包括细菌、真菌、放线菌属）产生的，能杀灭或抑制其他微生物的物质。",
        "抗生素是微生物产生的代谢产物，分子量较低（<5000D），低浓度时能杀灭或抑制其他病原微生物，包括天然抗生素和人工半合成抗生素两类。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch39-antimicrobial-overview-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：首次接触效应",
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
        "抗菌药物在初次接触细菌时有强大的抗菌效应，再度接触时不再出现该强大效应，或连续与细菌接触后抗菌效应不再明显增强，需要间隔相当时间（数小时）以后，才会再起作用。",
        "氨基糖苷类抗生素具有明显的首次接触效应。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch39-antimicrobial-overview-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗菌活性",
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
        "药物抑制或杀灭细菌的能力。",
        "抗菌活性可用体内和体外两种方法测定，体外抗菌活性常用最低抑菌浓度（MIC）和最低杀菌浓度（MBC）表示。原书名词解释第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch39-antimicrobial-overview-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：MIC",
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
        "药物能够抑制培养基内细菌生长的最低浓度。",
        "最低抑菌浓度（MIC）为体外培养细菌18～24小时后能抑制培养基内病原菌生长的最低药物浓度。原书名词解释第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch39-antimicrobial-overview-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：MBC",
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
        "药物能够杀灭培养基内细菌的最低浓度。",
        "最低杀菌浓度（MBC）为能够杀灭培养基内细菌或使细菌数减少99.9%的最低药物浓度。原书名词解释第 5 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch39-antimicrobial-overview-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：多重耐药",
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
        "细菌对多种抗菌药物耐药称为多重耐药（multi-drug resistance，MDR），又名多药耐药。",
        "多重耐药菌的播散是临床抗感染治疗的严重问题，需严格掌握抗菌药物应用适应证、加强医院内消毒隔离等措施加以控制。原书名词解释第 6 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill）：本章填空题 4 题因预算未纳入，导出空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 选择题（a1-single），2 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch39-antimicrobial-overview-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗菌药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "专指用于预防细菌性感染的药物",
      "对病原菌有杀灭或抑制作用的药物",
      "仅对病原菌有杀灭作用的药物",
      "仅对病原菌有抑制作用的药物",
      "专指治疗细菌性感染的药物",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "对病原菌有杀灭或抑制作用的药物",
        "抗菌药能抑制或杀灭细菌，用于预防和治疗细菌性感染，包括人工合成抗菌药（喹诺酮类等）和抗生素。原书 A1 型题第 1 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch39-antimicrobial-overview-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗菌谱是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "药物的抗菌范围",
      "药物的治疗指数",
      "药物的抗菌能力",
      "抗菌药的治疗效果",
      "抗菌药的适应证",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "药物的抗菌范围",
        "抗菌谱指抗菌药抑制或杀灭病原微生物的范围，包括广谱和窄谱两种。原书 A1 型题第 2 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer）：本章简答题 5 题因预算未纳入，导出空数组 */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题：本章原书 2 组共 8 小题，完整组超出剩余预算，未取样，导出空数组 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
