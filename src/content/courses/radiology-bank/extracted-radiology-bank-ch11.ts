import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学影像学学习指导与习题集 第3版 — 第11章 传染性疾病 题库提取（等比取样）
 * 来源：《医学影像学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：1 题
 * - 选择题（a1-single）：2 题（均为 A1 型，本章无 A2 型题）
 * - 简答题（short-answer）：1 题
 * - B1 配伍题：0 组 / 0 成员
 * - 独立记分题合计：5 题（须等于本文件预算 5）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含名词解释、填空题、选择题（A1/B1）、简答题；本文件按 5 道预算在
 *   原书顺序内取材：名词解释取第 1–1 题、填空题取第 1–1 题、A1 型取第 1–2 题（本章无
 *   A2 型题）、B 型不取（本章 B1 配额为 0）、简答题取第 1–1 题；未纳入的题因预算所限。
 *   正确项对齐章末参考答案键号（A1/A2/B1 全书连续编号），选项已随机重排并同步
 *   correctChoiceIndex。OCR 错字已按医学影像学医学语义恢复（如 T WI→T1WI、选项次序
 *   散落归位 等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "radiology-bank-ch11-infectious";
const locatorBase =
  "《医学影像学学习指导与习题集》第3版 第11章 传染性疾病 习题（核对PDF 第167–169页）";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道（原书第 1 题） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch11-infectious-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：月弓征",
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
        "月弓征：耶氏肺孢子菌肺炎时，磨玻璃密度影边缘近肺外带可见弓形或新月形透亮间隙。",
        "月弓征为耶氏肺孢子菌肺炎（PCP）的典型征象：磨玻璃密度影边缘近肺外带可见弓形或新月形透亮间隙。原书第11章名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），1 道（原书第 1 题） */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch11-infectious-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "PML 皮质下白质受侵时，病灶多为___分布。",
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
        "扇形",
        "进行性多灶性脑白质病（PML）皮质下白质受侵时，病灶多为扇形分布。原书第11章填空题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），2 道（A1 型原书第 1–2 题） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch11-infectious-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪一种征象是布鲁菌病脊柱炎的特征性表现",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["猫咬征", "石棺征", "Wimberger 征", "花边椎", "夹心饼征"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "花边椎",
        "花边椎为布鲁菌病脊柱炎的特征性征象，表现为椎体边缘骨质破坏伴骨质增生硬化。原书第11章 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-radiology-radiology-bank-ch11-infectious-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪种表现是艾滋病相关弓形虫脑炎的影像学表现",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "病变多发生在皮髓质交界区和基底节区，单发多见",
      "病灶呈等或高密度",
      "T1WI 上呈等或稍低信号，T2WI 上呈高信号",
      "无水肿及占位效应",
      "增强后病灶无强化",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "T1WI 上呈等或稍低信号，T2WI 上呈高信号",
        "弓形虫脑炎病灶多位于皮髓质交界区与基底节区，MRI 呈 T1WI 等或稍低信号、T2WI 高信号；OCR 误作「T WI」已按医学影像学语义恢复为「T1WI」，选项次序散落已归位。原书第11章 A1 型题第 2 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），1 道（原书第 1 题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-radiology-radiology-bank-ch11-infectious-short001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述 AIDS 相关进行性多灶性脑白质病的典型 MRI 表现。",
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
        "典型 MRI 表现为皮质下白质或脑室旁白质多发局灶性或融合成片的异常信号区，FLAIR 和 T2WI 为高信号，T1WI 为低信号，边界不清楚。",
        "进行性多灶性脑白质病（PML）以皮质下白质或脑室旁白质多发局灶性或融合成片的异常信号为特征，FLAIR/T2WI 高信号、T1WI 低信号、边界不清。原书第11章简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 配伍题（bGroups），0 组（本章 B1 配额为 0） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...fillItems, ...a1Items, ...shortItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
