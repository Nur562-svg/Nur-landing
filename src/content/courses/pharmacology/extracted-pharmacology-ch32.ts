import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第32章 作用于消化系统的药物 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：0 题（本章原书无名词解释）
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：4 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：10 题（须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含填空题 7、选择题（A1 型 16 + A2 型 2 + B1 型 2 组各 2 小题）
 *   与简答题 4，无名词解释；本文件按 10 道预算在原书顺序内取材。填空题取前 2 道，
 *   选择题取 A1 型前 4 道（映射为 a1-single），简答题取前 2 道，B1 型取第 1 组
 *   （19～20 题共用备选答案）完整 2 成员；A2 型病例题（17、18）与 B1 第 2 组
 *   （21、22）因预算未纳入。正确项对齐章末参考答案键号（A1 型题 1.A/2.D/3.D/4.D、
 *   B1 型题 19.D/20.B），选项与共用备选答案已随机重排并同步 correctChoiceIndex。
 *   OCR 错字与符号已按药理学医学语义恢复（如 葯→药、H，受体→H₂受体、D，受体→
 *   D₂受体、H'-K*-ATP 酶→H⁺-K⁺-ATP 酶、枸檬酸铋钾→枸橼酸铋钾、非体类抗炎药→
 *   非甾体类抗炎药等），剂量单位与数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch32-gastrointestinal-drugs";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第32章 作用于消化系统的药物 习题（核对PDF 第218–223页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），本章原书无名词解释 */
const termItems: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），2 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch32-gastrointestinal-drugs-fill001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "抗酸药是一类___物质，能中和___，解除其对胃及十二指肠黏膜的侵蚀及对溃疡的刺激，用于治疗消化性溃疡和反流性食管炎。",
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
        "弱碱性；胃酸",
        "抗酸药为弱碱性物质，口服后在胃内直接中和胃酸并降低胃蛋白酶活性，解除胃酸和胃蛋白酶对胃及十二指肠黏膜的侵蚀与刺激，主要用于消化性溃疡和反流性食管炎。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch32-gastrointestinal-drugs-fill002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "抑制胃酸分泌的药物种类有___。",
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
        "H₂受体阻断药；M胆碱受体阻断药；H⁺-K⁺-ATP酶抑制药；胃泌素受体阻断药",
        "抑制胃酸分泌药包括 H₂ 受体阻断药（西咪替丁、雷尼替丁、法莫替丁等）、H⁺-K⁺-ATP 酶抑制药（质子泵抑制药，奥美拉唑、兰索拉唑、泮托拉唑等）、M 胆碱受体阻断药（哌仑西平等）及胃泌素受体阻断药（丙谷胺）。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），4 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch32-gastrointestinal-drugs-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列药物能抑制胃酸分泌的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "枸橼酸铋钾",
      "哌仑西平",
      "硫糖铝",
      "三硅酸镁",
      "氢氧化铝",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "哌仑西平",
        "哌仑西平为选择性 M 胆碱受体阻断药，阻断壁细胞上的 M 受体、抑制胃酸分泌；硫糖铝、枸橼酸铋钾为胃黏膜保护药，三硅酸镁、氢氧化铝为抗酸药。原书 A1 型题第 1 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch32-gastrointestinal-drugs-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在溃疡面形成黏胶保护层的抗酸药是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "碳酸钙",
      "氧化镁",
      "三硅酸镁",
      "氢氧化镁",
      "碳酸氢钠",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "三硅酸镁",
        "三硅酸镁口服后与胃酸作用，在溃疡面形成黏稠的胶体保护层，同时有轻泻作用；氧化镁、氢氧化镁、碳酸钙、碳酸氢钠虽亦为抗酸药，但均不以形成黏胶保护层为特点。原书 A1 型题第 2 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch32-gastrointestinal-drugs-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "雷尼替丁治疗消化性溃疡的主要作用机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抑制幽门螺杆菌",
      "阻断 H₂ 受体，减少胃酸分泌",
      "阻断 M 胆碱受体，减少胃酸分泌",
      "抑制胃壁细胞 H⁺-K⁺-ATP 酶，减少胃酸分泌",
      "阻断胃泌素受体，减少胃酸分泌",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "阻断 H₂ 受体，减少胃酸分泌",
        "雷尼替丁为 H₂ 受体阻断药，阻断壁细胞上的 H₂ 受体，抑制基础胃酸和夜间胃酸分泌，对胃泌素及 M 受体激动引起的胃酸分泌也有抑制作用，用于治疗消化性溃疡。原书 A1 型题第 3 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch32-gastrointestinal-drugs-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "兰索拉唑治疗消化性溃疡的主要作用机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "保护胃黏膜",
      "阻断 M 胆碱受体，抑制胃酸分泌",
      "阻断 H₂ 受体，抑制胃酸分泌",
      "抑制 H⁺-K⁺-ATP 酶，减少胃酸分泌",
      "阻断胃泌素受体，抑制胃酸分泌",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抑制 H⁺-K⁺-ATP 酶，减少胃酸分泌",
        "兰索拉唑与奥美拉唑同属 H⁺-K⁺-ATP 酶抑制药（质子泵抑制药），与壁细胞 H⁺-K⁺-ATP 酶的 α 亚单位结合使酶失去活性，抗胃酸分泌作用强而持久。原书 A1 型题第 4 题，参考答案键号 D。",
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
    id: "ext-pharmacology-ch32-gastrointestinal-drugs-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述常用抗消化性溃疡药的分类及其代表药物。",
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
        "常用抗消化性溃疡药分为四大类：①抗酸药：氢氧化铝等；②抑制胃酸分泌药：包括以雷尼替丁为代表的 H₂ 受体阻断药、以奥美拉唑为代表的 H⁺-K⁺-ATP 酶抑制药、以哌仑西平为代表的 M 胆碱受体阻断药、以丙谷胺为代表的胃泌素受体阻断药；③胃黏膜保护药：硫糖铝等；④抗幽门螺杆菌药：甲硝唑等。",
        "抗消化性溃疡药按作用机制分类，抗酸药直接中和胃酸；抑制胃酸分泌药通过阻断 H₂ 受体、抑制质子泵、阻断 M 胆碱受体或胃泌素受体减少胃酸分泌；胃黏膜保护药增强黏膜屏障；抗幽门螺杆菌药根除幽门螺杆菌。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch32-gastrointestinal-drugs-short002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述奥美拉唑的药理作用及临床应用。",
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
        "药理作用：①抑制胃酸分泌：与壁细胞的 H⁺-K⁺-ATP 酶结合，抑制各种原因引起的胃酸分泌，作用强而持久；②抑制胃蛋白酶分泌；③抑制幽门螺杆菌。临床应用：①胃及十二指肠溃疡；②反流性食管炎；③卓-艾综合征；④上消化道出血。",
        "奥美拉唑为质子泵抑制药，通过与 H⁺-K⁺-ATP 酶 α 亚单位结合使其失活而不可逆地抑制胃酸分泌，同时减少胃蛋白酶分泌并抑制幽门螺杆菌，广泛用于酸相关疾病。原书简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（原书第 1 组，19～20 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch32-gastrointestinal-drugs-b001",
    order: 9,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "美卡拉明",
      "间羟胺",
      "毛果芸香碱",
      "哌仑西平",
      "酚酞",
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
        id: "ext-pharmacology-ch32-gastrointestinal-drugs-b001m1",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "用于治疗胃、十二指肠溃疡的药物是",
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
            "哌仑西平",
            "哌仑西平为选择性 M 胆碱受体阻断药，阻断胃壁细胞上的 M 受体抑制胃酸分泌，用于治疗胃、十二指肠溃疡。原书 B1 型题第 19 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch32-gastrointestinal-drugs-b001m2",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与肠液形成钠盐，促进肠蠕动而起导泻作用的药物是",
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
            "酚酞",
            "酚酞为刺激性泻药，口服后在肠内与碱性肠液形成可溶性钠盐，刺激肠壁促进肠蠕动而起导泻作用，适用于习惯性便秘。原书 B1 型题第 20 题，参考答案键号 B。",
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
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
