import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第21章 离子通道概论及钙通道阻滞药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：1 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：3 题（含简答、论述）
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：10 题（须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：13（填空题第 1–13 题：OCR 中仅参考答案键号保留、题干未恢复，未取）
 * - 说明：本章原书依序含名词解释 2、填空题 14（OCR 仅恢复第 14 题题干）、选择题
 *   （A1 型 10 + A2 型 7 + B1 型 1 组共 3 小题）与简答题 3；本文件按 10 道预算取材：
 *   名词解释全取、填空题取第 14 题、A1 型题取第 1 题、简答题全取、B1 取完整组（18–20 题）。
 *   参考答案键号自 1–20 连续编号（非各小节独立编号），已按题号与药理学医学语义逐题归位：
 *   键号 8.B、9.B、10.C 对应 A1 型题第 8–10 题，键号 11.C–17.B 对应 A2 型题第 11–17 题，
 *   键号 18.A、19.D、20.E 对应 B1 型题第 18–20 题。A1/A2/B1 按项目规约映射为 a1-single/b1，
 *   正确项对齐章末参考答案键号（A1 型题 1.C；B1 型题 18.A、19.D、20.E），选项已随机重排并
 *   同步 correctChoiceIndex。OCR 错字已按药理学医学语义恢复（如 钙通道阻滞约→钙通道阻滞药、
 *   地尔硫草→地尔硫䓬、Ca？+→Ca²⁺、KArP→KATP、嵩→䓬、晋蔡洛尔→普萘洛尔 等），
 *   数值（160/85mmHg、心率140次/分、3～5分钟 等）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch21-ion-channel-calcium-blockers";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第21章 离子通道概论及钙通道阻滞药 习题（核对PDF 第132–137页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：钾通道开放药",
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
        "钾通道开放药",
        "是选择性作用于钾通道，增加细胞膜对钾离子的通透性、促进钾离子外流的一类药物。目前临床应用的钾通道开放药主要作用于 KATP 通道，用于高血压、心绞痛和心肌梗死等的治疗。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：钙通道阻滞药",
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
        "钙通道阻滞药",
        "又称钙拮抗药，是一类选择性阻滞钙通道、抑制细胞外钙离子内流、降低细胞内钙离子浓度的药物。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），1 道（其余 13 道题干未在 OCR 中恢复） */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "钙通道阻滞药主要用于治疗___、___和___。",
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
        "高血压；心绞痛；心律失常",
        "钙通道阻滞药临床主要用于高血压、心绞痛、心律失常的治疗，还可用于脑血管疾病及外周血管痉挛性疾病等。原书填空题第 14 题（OCR 仅恢复该题题干，题干含三处空，按参考答案补足）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列属于二氢吡啶类钙通道阻滞药的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "氟桂利嗪",
      "硝苯地平",
      "维拉帕米",
      "普尼拉明",
      "地尔硫䓬",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "硝苯地平",
        "硝苯地平属于二氢吡啶类选择性钙通道阻滞药；维拉帕米属苯烷胺类、地尔硫䓬属苯并噻氮䓬类；氟桂利嗪与普尼拉明属非选择性钙通道阻滞药。原书 A1 型题第 1 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-short001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述钙通道阻滞药的药理作用。",
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
        "①对心脏有负性肌力、负性频率和负性传导作用；②松弛血管平滑肌、扩张血管和松弛其他平滑肌；③抗动脉粥样硬化作用；④增加红细胞稳定性、抗血小板聚集作用；⑤增加肾血流、排钠利尿作用",
        "钙通道阻滞药的药理作用包括：①对心脏有负性肌力、负性频率和负性传导作用；②松弛血管平滑肌、扩张血管和松弛其他平滑肌作用；③抗动脉粥样硬化作用；④增加红细胞稳定性、抗血小板聚集作用；⑤增加肾血流、排钠利尿作用。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-short002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述钙通道阻滞药的临床应用。",
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
        "高血压；心绞痛；心律失常；脑血管疾病；外周血管痉挛性疾病；预防动脉粥样硬化、治疗偏头痛、支气管哮喘等",
        "钙通道阻滞药的临床应用包括：①高血压：主要是二氢吡啶类药物如硝苯地平应用较多；②心绞痛：对各型心绞痛都有不同程度的疗效；③心律失常：维拉帕米和地尔硫䓬应用较多；④脑血管疾病：尼莫地平、氟桂利嗪选择性扩张脑血管，应用较多；⑤外周血管痉挛性疾病：硝苯地平和地尔硫䓬可改善大多数雷诺病患者的症状；⑥预防动脉粥样硬化、治疗偏头痛、支气管哮喘等。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-short003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述钙通道阻滞药扩血管的作用及作用特点。",
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
        "扩血管作用：血管平滑肌收缩所需 Ca²⁺ 主要来自细胞外，对其作用敏感；特点：小动脉扩张强于小静脉、对痉挛血管作用更强、扩张缺血区冠脉、硝苯地平＞维拉帕米＞地尔硫䓬",
        "钙通道阻滞药扩血管的作用及作用特点：①扩血管作用：血管平滑肌的肌浆网发育较差，血管收缩时所需 Ca²⁺ 主要来自细胞外，故血管平滑肌对钙通道阻滞药的作用很敏感。②扩血管作用特点：对小动脉的扩张作用比小静脉明显；对痉挛的血管作用更强，故硝苯地平对变异型心绞痛效果最好；对缺血区的冠状动脉也有扩张作用；三类钙通道阻滞药的扩血管作用强度依次为硝苯地平＞维拉帕米＞地尔硫䓬。原书简答题第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员（原书 18～20 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-b001",
    order: 8,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "氨氯地平",
      "尼莫地平",
      "维拉帕米",
      "地尔硫䓬",
      "硝苯地平",
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
        id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-b001m1",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对心脏负性肌力作用和负性频率作用最强的钙拮抗药是",
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
            "维拉帕米",
            "三类选择性钙通道阻滞药对心脏的抑制作用强度为维拉帕米＞地尔硫䓬＞硝苯地平，维拉帕米的负性肌力、负性频率和负性传导作用最强。原书 B1 型题第 18 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-b001m2",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "上述钙拮抗药中半衰期最长的是",
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
            "氨氯地平",
            "氨氯地平为长效二氢吡啶类钙通道阻滞药，半衰期长（约 35～50 小时），可每日给药 1 次。原书 B1 型题第 19 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch21-ion-channel-calcium-blockers-b001m3",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对脑血管选择性高的钙拮抗药是",
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
            "尼莫地平",
            "尼莫地平对脑血管有选择性扩张作用，主要用于脑血管疾病，如脑血管痉挛、蛛网膜下腔出血后的脑血管痉挛等。原书 B1 型题第 20 题，参考答案键号 E。",
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
