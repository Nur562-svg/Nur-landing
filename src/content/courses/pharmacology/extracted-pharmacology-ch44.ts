import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第44章 人工合成抗菌药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：0 题（本章原书无名词解释题，termItems 为空数组）
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：2 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书 1 组共 2 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：9 题（须等于本文件预算 9）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含填空题 5、选择题（A1 型 14 + A2 型 4 + B1 型 1 组共
 *   2 小题）与简答题 2（本章无名词解释题）；本文件按 9 道预算取材：填空题全取、
 *   A1 型题取第 1–2 题、简答题全取；A1 型题第 3–14 题、A2 型题（15–18）、
 *   B1 型题（19–20）因预算未纳入。正确项对齐章末参考答案键号（A1 型题 1.B、
 *   2.A；本文件答案键号自 1–20 连续编号），选项已随机重排并同步
 *   correctChoiceIndex。OCR 错字已按药理学医学语义恢复（如 葯→药、
 *   毗哌酸/肶哌酸→吡哌酸、草兰/草兰氏→革兰、非体抗炎药→非甾体抗炎药、
 *   磺胺啼啶银→磺胺嘧啶银、磺胺甲唑→磺胺甲噁唑、B-内酰胺→β-内酰胺 等），
 *   未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch44-synthetic-antimicrobials";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第44章 人工合成抗菌药 习题（核对PDF 第284–289页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term）：本章原书无名词解释题，导出空数组 */
const termItems: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），5 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch44-synthetic-antimicrobials-fill001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "磺胺药的基本化学结构与___相似，能与___竞争___，抑制___的形成，从而影响细菌核酸的合成，发挥抗菌作用。",
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
        "对氨苯甲酸；对氨苯甲酸；二氢蝶酸合酶；二氢叶酸",
        "磺胺与对氨苯甲酸（PABA）结构相似，可与 PABA 竞争二氢蝶酸合酶，阻止细菌二氢叶酸的合成，抑制细菌生长繁殖。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch44-synthetic-antimicrobials-fill002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "喹诺酮类药物通过形成___三元复合物，抑制 DNA 回旋酶对 DNA 的___活性和___活性，阻碍细菌 DNA 复制而达到杀菌作用。",
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
        "回旋酶-DNA-药物；切口；封口",
        "对于革兰阴性菌，喹诺酮类药物作用于 DNA 回旋酶的 A 亚基，形成“酶-DNA-药物”三元复合物，抑制 DNA 回旋酶对 DNA 的切口活性和封口活性，达到杀菌作用；对革兰阳性菌则通过抑制拓扑异构酶 IV 发挥作用。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch44-synthetic-antimicrobials-fill003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "磺胺药的乙酰化代谢产物的溶解度___其原形药。",
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
        "低于",
        "磺胺药主要在肝脏代谢为无活性的乙酰化物，乙酰化物的溶解度低于原形药物，在酸性尿液中易结晶析出，可致泌尿系统损害。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch44-synthetic-antimicrobials-fill004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "细菌对磺胺类药物产生耐药性的机制包括：产生较多的___对抗磺胺药的作用，或产生对磺胺药低亲和力的___，或直接利用外源性___。",
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
        "PABA；二氢蝶酸合酶；叶酸",
        "细菌对磺胺类药物产生耐药性的机制包括产生较多的 PABA 对抗磺胺药的作用、产生对磺胺药低亲和力的二氢蝶酸合酶，或直接利用外源性叶酸；各磺胺药之间有交叉耐药性。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch44-synthetic-antimicrobials-fill005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "磺胺类药物主要从肾脏以原形药、乙酰化代谢产物、葡糖醛酸结合物三种形式排泄，其中乙酰化物在___尿中溶解度高，在___尿液中易结晶析出。",
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
        "碱性；酸性",
        "磺胺药及其乙酰化物在碱性尿液中溶解度高，在酸性尿液中易结晶析出，服用磺胺嘧啶（SD）或磺胺甲噁唑（SMZ）时应增加饮水量并同服等量碳酸氢钠碱化尿液。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），2 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch44-synthetic-antimicrobials-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "新生儿使用磺胺类药物易出现胆红素脑病，是因药物",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "减少胆红素排泄",
      "抑制肝药酶",
      "溶解红细胞",
      "竞争血浆白蛋白而置换出胆红素",
      "降低血-脑脊液屏障的功能",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "竞争血浆白蛋白而置换出胆红素",
        "磺胺类药物可与胆红素竞争血浆白蛋白结合部位，置换出游离胆红素，游离胆红素透过新生儿尚未发育完善的血-脑脊液屏障进入脑组织，引起胆红素脑病（核黄疸）。原书 A1 型题第 1 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch44-synthetic-antimicrobials-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "竞争性抑制磺胺类药物抗菌作用的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["6-APA", "TMP", "GABA", "7-ACA", "PABA"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "PABA",
        "磺胺与对氨苯甲酸（PABA）结构相似，PABA 是细菌合成二氢叶酸的前体，可与磺胺竞争二氢蝶酸合酶，因此 PABA 竞争性抑制磺胺药的抗菌作用。原书 A1 型题第 2 题，参考答案键号 A。",
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
    id: "ext-pharmacology-ch44-synthetic-antimicrobials-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述氟喹诺酮类药物的禁忌证及药物相互作用。",
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
        "①不宜常规用于儿童，不宜用于有精神病或癫痫病病史者；②禁用于喹诺酮过敏者、孕妇和哺乳妇女；③慎与茶碱类、非甾体抗炎药合用；④使用本类药物期间应避免过度日照，药物应避光保存；⑤不宜与Ⅰa 类及Ⅲ类抗心律失常药和延长心脏 QT 间期的药物如红霉素、三环类抗抑郁药合用；⑥糖尿病患者慎用。",
        "氟喹诺酮类可致软骨损害、中枢神经系统毒性、光敏反应和心脏毒性（QT 间期延长、尖端扭转型室性心动过速），故上述人群与药物合用需谨慎。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch44-synthetic-antimicrobials-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述 SMZ 与 TMP 配伍的药理学依据。",
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
        "①复方新诺明是 SMZ 和 TMP 按 5:1 比例制成的复方制剂，对细菌四氢叶酸合成具有双重阻断作用：SMZ 抑制二氢蝶酸合酶，TMP 抑制二氢叶酸还原酶；②二者的主要药代学参数相近，合用后的抗菌活性是两药单独等量应用时的数倍至数十倍，甚至呈现杀菌作用；③抗菌谱扩大，并可减少细菌耐药性的产生。",
        "SMZ 与 TMP 分别作用于叶酸代谢的不同环节，产生双重阻断，是复方新诺明配伍的药理学基础。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书 1 组共 2 小题，完整组超出剩余预算，导出空数组 */
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
