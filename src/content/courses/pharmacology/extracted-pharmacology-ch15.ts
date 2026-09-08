import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第15章 镇静催眠药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：0 题（本章原书无填空题）
 * - 选择题（a1-single）：2 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书 1 组共 3 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：4 题（须等于本文件预算 4）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 1、选择题（A1 型 7 + A2 型 1 + B1 型 1 组共 3 小题）
 *   与简答题 1，无填空题；本文件按 4 道预算取材（term 1、a1 2、short 1）。A1 型
 *   正确项对齐章末参考答案键号（1.D、2.E）；选项已随机重排并同步 correctChoiceIndex。
 *   B1 型完整组含 3 个成员，按“B1 必须取完整组”规约无法在剩余预算内取样，本文件
 *   如实未取；A2 型病例题（第 8 题）亦因预算未纳入。OCR 错字与符号已按药理学医学
 *   语义恢复（如 葯→药、苯二氮草类→苯二氮䓬类、GABA、受体→GABAA 受体、CI→Cl-），
 *   数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch15-sedatives-hypnotics";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第15章 镇静催眠药 习题（核对PDF 第92–94页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch15-sedatives-hypnotics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：镇静催眠药",
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
        "镇静催眠药",
        "指一类抑制中枢神经系统功能而起镇静催眠作用的药物。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章原书无填空题 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 选择题（a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch15-sedatives-hypnotics-a1001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "地西泮不具有以下哪种作用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["镇静", "催眠", "抗焦虑", "抗精神分裂", "抗惊厥"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抗精神分裂",
        "地西泮具有抗焦虑、镇静催眠、抗惊厥抗癫痫及中枢性肌肉松弛等作用，但无抗精神病（抗精神分裂）作用，治疗精神分裂症需选用抗精神失常药。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch15-sedatives-hypnotics-a1002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可以抑制呼吸中枢的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["尼可刹米", "二甲弗林", "洛贝林", "贝美格", "苯巴比妥"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "苯巴比妥",
        "尼可刹米、二甲弗林、洛贝林、贝美格均为中枢兴奋药（呼吸兴奋药），可兴奋呼吸中枢；苯巴比妥为镇静催眠药，静脉注射过快、过量时可抑制呼吸中枢。原书 A1 型题第 2 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch15-sedatives-hypnotics-short001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述地西泮的作用机制和药理作用。",
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
        "作用机制：地西泮作用于 GABAA 受体（苯二氮䓬受体），促进 GABA 与受体结合，增加氯离子内流，产生中枢抑制效应。药理作用：（1）抗焦虑作用；（2）镇静催眠作用；（3）抗惊厥、抗癫痫作用；（4）中枢性肌肉松弛作用。",
        "苯二氮䓬类与 GABAA 受体上的 BZ 位点结合，诱导受体构象改变，促进 GABA 与受体结合并增加氯离子通道开放频率，增强 GABA 能神经元传递，从而产生抗焦虑、镇静催眠、抗惊厥及中枢性肌肉松弛等作用。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/**
 * B1 共用备选答案配伍题（本章原书 1 组共 3 小题，完整组超出剩余预算，
 * 按“B1 必须取完整组”规约未取样，故导出空数组）
 */
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
