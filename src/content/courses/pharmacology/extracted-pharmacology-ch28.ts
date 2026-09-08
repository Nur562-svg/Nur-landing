import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第28章 抗心绞痛药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：0 题（本章无名词解释题）
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：6 题（含 A1 型、A2 型病例题；本章取样均为 A1 型）
 * - 问答题（short-answer）：4 题（含简答、论述；本章取样均为简答题）
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：15 题（须等于本文件预算 15）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含填空题 11、选择题（A1 型 30 + A2 型 5 + B1 型 1 组共 3 小题）与
 *   简答题 4，无名词解释与论述题。本文件按 15 道预算取材：简答 4 全取、B1 全组（36～38 题，
 *   共 3 成员），剩余 8 题在填空（11 源）与选择（35 源）间按源题占比分配，取填空前 2 道、
 *   选择前 6 道。A1/A2 均映射为 a1-single，正确项对齐章末参考答案键号（本文件 A1 型题
 *   1.D、2.D、3.B、4.E、5.D、6.E）。参考答案区将 25～30 题键号列于「A2型题」段下，但题干区
 *   25～30 为一般药理题、31～35 为病例题（A2），已按题干题号与药理学医学语义归位（本文件
 *   取样 1～6 题不受影响）。B1 型题第 37 题参考答案键号 OCR 为 D（维拉帕米），与「释放 NO
 *   松弛血管平滑肌」的医学语义不符，按药理学医学语义归位为硝酸甘油（原键号 C）；B1 型题
 *   36.D、38.A 与键号一致。OCR 错字已按药理学医学语义恢复（如 葯→药、B受体→β受体、
 *   普蔡洛尔/普茶洛尔→普萘洛尔、地尔硫草/地尔硫章→地尔硫䓬、麦异型→变异型、硫基→巯基、
 *   心肉膜→心内膜 等），数值与剂量均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch28-antianginal-drugs";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第28章 抗心绞痛药 习题（核对PDF 第190–195页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），0 道（本章无名词解释题） */
const termItems: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），2 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-fill001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "常用的抗心绞痛药通过___、___、___而发挥抗心绞痛作用的。",
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
        "增加氧供；降低氧需；恢复氧的供需平衡",
        "心绞痛的发生与心肌氧的供需失衡有关，抗心绞痛药通过增加心肌供氧、降低心肌耗氧、恢复氧的供需平衡而发挥抗心绞痛作用。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-fill002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "常用抗心绞痛的钙拮抗药有___。",
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
        "硝苯地平；地尔硫䓬；维拉帕米",
        "常用的抗心绞痛钙拮抗药为硝苯地平、地尔硫䓬和维拉帕米，通过抑制心肌收缩力、减慢心率、延长舒张期及扩张外周血管和冠状动脉而降低心肌耗氧量、增加心肌供血供氧。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "硝酸甘油没有下列哪一种作用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["降低回心血量", "增加室壁肌张力", "扩张静脉", "降低前负荷", "增快心率"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "增加室壁肌张力",
        "硝酸甘油主要扩张容量血管（静脉）和小动脉，减少回心血量、降低前负荷与室壁肌张力，从而降低心肌耗氧量，故增加室壁肌张力不是硝酸甘油的作用。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "普萘洛尔、硝酸甘油、硝苯地平治疗心绞痛的共同作用是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["缩小心室容积", "降低心肌氧耗量", "减慢心率", "扩张冠脉", "抑制心肌收缩力"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "降低心肌氧耗量",
        "普萘洛尔通过阻断心脏 β 受体减慢心率、降低收缩力，硝酸甘油通过扩张容量血管降低前负荷，硝苯地平通过抑制心肌收缩力、扩张血管，三者均通过降低心肌耗氧量发挥抗心绞痛作用。原书 A1 型题第 2 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "普萘洛尔治疗心绞痛时可产生下列哪一种不利作用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "心室容积缩小，射血时间缩短，降低氧耗",
      "扩张动脉，降低后负荷",
      "心收缩力增加，心率减慢",
      "心室容积增大，射血时间延长，增加氧耗",
      "扩张冠脉，增加心肌血供",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心室容积增大，射血时间延长，增加氧耗",
        "普萘洛尔抑制心脏可使心室排空减少、心室容积增大、室壁肌张力升高，同时心肌收缩力减弱可致射血时间延长，均使心肌耗氧量增加，是其治疗心绞痛时的不利作用。原书 A1 型题第 3 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "硝酸甘油不直接扩张下列哪类血管",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["小静脉", "冠状动脉的小阻力血管", "小动脉", "冠状动脉的侧支血管", "冠状动脉的输送血管"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "冠状动脉的小阻力血管",
        "硝酸甘油扩张较大的冠状血管（输送血管和侧支血管）及小动脉、小静脉，但不直接扩张冠状动脉的小阻力血管，避免缺血区血流被“窃走”。原书 A1 型题第 4 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-a1005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不宜用于变异型心绞痛的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["硝酸甘油", "硝苯地平", "维拉帕米", "硝酸异山梨酯", "普萘洛尔"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "普萘洛尔",
        "普萘洛尔阻断 β 受体后 α 受体占优势，可引起冠状血管收缩，故忌用于变异型心绞痛；硝酸甘油、硝苯地平、维拉帕米、硝酸异山梨酯均可用于变异型心绞痛。原书 A1 型题第 5 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-a1006",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不具有扩张冠状动脉的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["维拉帕米", "普萘洛尔", "硝酸异山梨酯", "硝酸甘油", "硝苯地平"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "普萘洛尔",
        "普萘洛尔为 β 受体阻断药，不具有扩张冠状动脉作用；硝酸甘油、硝酸异山梨酯属硝酸酯类，硝苯地平、维拉帕米属钙拮抗药，均可扩张冠状动脉。原书 A1 型题第 6 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-short001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "硝酸甘油治疗心绞痛的原理是什么？",
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
        "①降低心肌耗氧量：扩张容量血管，减少回心血量，室壁张力下降；②增加缺血区的血液灌注：扩张心脏较大的输送血管和侧支血管；③改善心内膜的供血：回心血量减少，左室舒张末期压力降低，血液易从心外膜流向心内膜的缺血区。",
        "硝酸甘油在血管平滑肌细胞内与巯基化合物反应产生 NO，激活鸟苷酸环化酶，使细胞内 cGMP 增加，最终使细胞内游离钙减少并抑制收缩蛋白，导致血管舒张。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-short002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述β-肾上腺素受体阻断药治疗心绞痛的原理。",
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
        "①降低心肌耗氧量：阻断心脏 β 受体，使心率减慢、收缩力减弱；②改善缺血区的供血：降低心肌耗氧量可提高非缺血区血管的阻力，促进血液由非缺血区流向缺血区；此外心率减慢、舒张期延长，有利于心肌供血。",
        "β-肾上腺素受体阻断药（以普萘洛尔为代表）只适用于稳定型心绞痛，忌用于变异型心绞痛。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-short003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述普萘洛尔和硝酸甘油合用治疗心绞痛的理论基础。",
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
        "在降低心肌耗氧量方面，普萘洛尔和硝酸甘油起协同作用。普萘洛尔能纠正硝酸甘油扩血管所引起的反射性心率加快，而硝酸甘油又能纠正由普萘洛尔所增加的心室容积和室壁张力。",
        "两类药物合用可互相抵消各自的不良反应、增强抗心绞痛作用；可将普萘洛尔与硝酸酯类或硝苯地平合用。原书简答题第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-short004",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述使用硝酸酯类药物产生耐受的机制及防治措施。",
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
        "机制：连续应用硝酸酯类药物，可因巯基耗竭以及激活 RAAS 而导致耐受性的产生。防治：①可采用间歇给药；②联合用药；③给药不宜频繁，用药间隔时间超过 8 小时；④给予乙酰半胱氨酸补充巯基。",
        "硝酸甘油生成 NO 需要巯基供体，巯基耗竭及肾素-血管紧张素-醛固酮系统（RAAS）激活是其耐受产生的主要原因。原书简答题第 4 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员（原书 36～38 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch28-antianginal-drugs-b001",
    order: 13,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["硝酸甘油", "洛伐他汀", "维拉帕米", "普萘洛尔", "硝苯地平"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-pharmacology-ch28-antianginal-drugs-b001m1",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对变异型心绞痛的疗效好，也可用于不稳定型心绞痛的是",
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
            "维拉帕米可用于稳定型、变异型心绞痛，亦可试用于不稳定型心绞痛；硝苯地平对变异型心绞痛最有效。原书 B1 型题第 36 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch28-antianginal-drugs-b001m2",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "通过释放 NO 松弛血管平滑肌而发挥抗心绞痛作用的药物是",
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
            "硝酸甘油",
            "硝酸甘油在血管平滑肌细胞内与巯基化合物反应产生 NO，激活鸟苷酸环化酶使细胞内 cGMP 增加，最终使细胞内游离钙减少并抑制收缩蛋白，导致血管舒张。原书 B1 型题第 37 题；参考答案区键号 OCR 为 D（维拉帕米），与题述不符，按药理学医学语义归位为硝酸甘油（原键号 C）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch28-antianginal-drugs-b001m3",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可使变异型心绞痛病情加剧的抗心绞痛药是",
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
            "普萘洛尔",
            "普萘洛尔阻断 β 受体后 α 受体占优势，可致冠状血管收缩，使变异型心绞痛病情加剧，故忌用于变异型心绞痛。原书 B1 型题第 38 题，参考答案键号 A。",
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
