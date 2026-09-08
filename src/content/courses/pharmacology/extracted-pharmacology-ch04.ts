import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第4章 影响药物效应的因素 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：4 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：2 题（含 A1 型 2、A2 型病例题 0）
 * - 问答题（short-answer）：2 题（含简答 2、论述 0）
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：8 题（须等于本文件预算 8）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 9、选择题（A1 型 8，无 A2 型与 B1 型）与简答题 3，
 *   无填空题；本文件按 8 道预算在原书顺序内取材：名词解释取第 1–4 题、选择题取 A1 型
 *   第 1–2 题、简答题取第 1–2 题。A1 映射为 a1-single，正确项对齐章末参考答案键号
 *   （A1 型题 1.D、2.A），选项已随机重排并同步 correctChoiceIndex。OCR 错字已按药理学
 *   医学语义恢复，数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch04-effect-factors";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第4章 影响药物效应的因素 习题（核对PDF 第35–38页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch04-effect-factors-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：特异质反应",
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
        "特异质反应",
        "是一种性质异常的药物反应，通常是有害的，甚至是致命的，多因先天遗传异常（遗传变异）所致，与药物固有药理作用基本一致，反应严重程度与剂量成比例，拮抗药救治可能有效。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch04-effect-factors-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：安慰剂",
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
        "安慰剂",
        "一般指由本身没有特殊药理活性的中性物质（如乳糖、淀粉等）制成的外形似药的制剂；从广义上讲，还包括那些本身没有特殊作用的医疗措施（如假手术等）。安慰剂产生的效应称为安慰剂效应。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch04-effect-factors-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：耐受性",
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
        "耐受性",
        "指机体在连续多次用药后反应性降低，要达到原来反应必须增加剂量；耐受性在停药后可消失，再次连续用药又可发生。原书名词解释第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch04-effect-factors-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：交叉耐受性",
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
        "交叉耐受性",
        "指对一种药物产生耐受性后，应用同一类药物（即使是第一次使用）时也出现耐受性。原书名词解释第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill）：本章原书无填空题，为空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 选择题（a1-single），2 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch04-effect-factors-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有关特异质反应的说法，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "是一种常见的不良反应",
      "通常与遗传变异有关",
      "发生与否取决于药物剂量",
      "是一种免疫反应",
      "多数反应比较轻微",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "通常与遗传变异有关",
        "特异质反应是先天遗传异常所致的反应，通常与遗传变异有关，多因体内某种酶缺陷引起，并非常见的不良反应、免疫反应或剂量依赖性反应。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch04-effect-factors-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于药物相互作用的说法，不正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "可能表现为药理作用的改变",
      "只在两种或两种以上药物同时应用时出现",
      "可改变药物的体内过程",
      "有时表现为毒性反应的增强",
      "机体对药物的反应性改变",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "只在两种或两种以上药物同时应用时出现",
        "药物相互作用不一定只在两种或两种以上药物同时应用时出现，先后（序贯）用药时也可能发生；其表现包括药理作用的改变、毒性反应的增强、药物体内过程的改变以及机体对药物反应性的改变等。原书 A1 型题第 2 题，参考答案键号 A。",
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
    id: "ext-pharmacology-ch04-effect-factors-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "影响药物效应的因素有哪些？",
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
        "药物因素（药物剂型、剂量和给药途径、合并用药及药物相互作用）与机体因素（年龄、性别、种族、遗传变异、心理、生理和病理因素）",
        "药物在机体内产生的药理作用和效应是药物和机体相互作用的结果，受药物和机体的多种因素影响。药物因素主要有药物剂型、剂量和给药途径、合并用药与药物相互作用；机体因素主要有年龄、性别、种族、遗传变异、心理、生理和病理因素。这些因素往往引起药物代谢动力学差异或药物效应动力学差异，进而导致药物反应的个体差异和药物效应的差异。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch04-effect-factors-short002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "何谓安慰剂效应？在新药临床实验中应如何排除？",
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
        "安慰剂效应主要由病人的心理因素引起；新药临床实验应设安慰剂对照、进行随机分组、双盲评定",
        "安慰剂效应主要由病人的心理因素引起，来自病人对药物和医生的信赖，病人在经医生授予药物后会发生一系列精神和生理上的变化，这些变化不仅包括病人的主观感觉，而且包括许多客观指标。由于安慰剂效应广泛存在，在评价药物临床疗效时应考虑该因素的影响；为排除临床治疗的安慰剂效应，在新药临床实验中应设安慰剂对照、进行随机分组、双盲评定的临床试验。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 配伍题：本章原书无 B1 型题，为空数组 */
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
