import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第25章 抗高血压药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：4 题
 * - 选择题（a1-single）：1 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：13 题（须等于本文件预算 13）
 * - 缺失答案：0；无法可靠提取：1（填空题第 1 题：题干含 5 空，参考答案仅列 4 项，
 *   末空“伴糖尿病或高血脂的高血压病人不宜用”答案键缺失，跳过未取）
 * - 说明：本章原书依序含名词解释 2、填空题 5、选择题（A1 型 21 + A2 型 2 + B1 型 1 组共 4 小题）
 *   与简答题 5。本文件按 13 道预算取材：名词解释全取、填空题取第 2–5 题、A1 型题取第 1 题、
 *   简答题取第 1–2 题、B1 取完整组（24–27 题，共 4 成员）；未取材：A1 第 2–21 题、
 *   A2 第 22–23 题、简答第 3–5 题（预算所限）。参考答案键号自 1–27 连续编号
 *   （A1 1–21、A2 22–23、B1 24–27），已按题号与药理学医学语义归位：本文件 A1 型题第 1 题
 *   键号 D；B1 型题 24.A、25.B、26.C、27.E。正确项对齐章末参考答案键号，选项已随机重排并
 *   同步 correctChoiceIndex（B1 组选项保持原书顺序，成员指向对应索引）。OCR 错字已按药理学
 *   医学语义恢复（如 葯→药、普茶洛尔/晋萘洛尔→普萘洛尔、AT，受体→AT₁ 受体、o受体→α₁ 受体、
 *   B受体→β受体、以受体→α₂ 受体、N，受体→N₁ 受体、B,Bz→β₁、β₂ 等），数值
 *   （140/90mmHg、163/102mmHg、100ml/d 等）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch25-antihypertensives";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第25章 抗高血压药 习题（核对PDF 第161–167页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch25-antihypertensives-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：高血压的有效治疗",
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
        "高血压的有效治疗",
        "通过治疗将血压控制在 140/90mmHg 以下。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch25-antihypertensives-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：血压波动性",
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
        "血压波动性",
        "血压在 24 小时内存在自发性波动，这种自发性波动称为血压波动性。长效降压药物可减少血压波动性，平稳降压有利于保护靶器官。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），4 道（原书第 1 题答案键缺失末空，未取） */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch25-antihypertensives-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "伴精神抑郁的高血压病人不宜用___；伴支气管哮喘的高血压病人不宜用___，宜用___；伴心动过缓或传导阻滞的高血压病人不宜用___。",
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
        "利血平；普萘洛尔；氢氯噻嗪；维拉帕米或普萘洛尔",
        "利血平有中枢抑制作用，可诱发或加重精神抑郁；普萘洛尔阻断 β₂ 受体可诱发支气管痉挛，故伴支气管哮喘者不宜用、宜用利尿药氢氯噻嗪类；维拉帕米或普萘洛尔减慢心率、抑制传导，伴心动过缓或传导阻滞者不宜用。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch25-antihypertensives-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "主要松弛小动脉平滑肌的降压药是___；钾通道开放药有___和___；对小动脉和静脉都松弛的降压药是___。",
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
        "肼屈嗪；吡那地尔；米诺地尔；硝普钠",
        "肼屈嗪主要松弛小动脉平滑肌；吡那地尔、米诺地尔为钾通道开放药，开放钾通道使钾外流、细胞膜超极化，血管平滑肌舒张；硝普钠在血管平滑肌内代谢产生 NO，对小动脉和小静脉均有直接松弛作用。原书参考答案顺序为“肼屈嗪 硝普钠 吡那地尔 米诺地尔”，此处按题干空序排列。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch25-antihypertensives-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "硝普钠可通过释放___扩张血管，用于治疗___和___。",
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
        "一氧化氮；高血压危象；手术麻醉时控制性降压",
        "硝普钠在血管平滑肌内代谢产生一氧化氮（NO），直接松弛小动脉和小静脉平滑肌，主要用于高血压急症（高血压危象）的治疗和手术麻醉时控制性降压。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch25-antihypertensives-fill004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "拉贝洛尔可阻断___受体、___受体和___受体。",
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
        "β₁；β₂；α",
        "拉贝洛尔兼有 α₁ 和 β 受体阻断作用，可阻断 β₁、β₂ 及 α₁ 受体，通过减少心输出量、抑制肾素释放及扩张外周血管而降压。原书填空题第 5 题答案（参考答案键号显示 β₁、β₂、α）。",
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
    id: "ext-pharmacology-ch25-antihypertensives-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可特异地抑制肾素血管紧张素转化酶的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["利血平", "卡托普利", "可乐定", "美卡拉明", "氢氯噻嗪"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "卡托普利",
        "卡托普利为血管紧张素转化酶（ACE）抑制药，特异性地抑制 ACE，使血管紧张素Ⅱ生成减少、缓激肽降解减少，从而降压；可乐定属中枢性降压药，美卡拉明属神经节阻断药，利血平属去甲肾上腺素能神经末梢阻断药，氢氯噻嗪属利尿降压药。原书 A1 型题第 1 题，参考答案键号 D。",
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
    id: "ext-pharmacology-ch25-antihypertensives-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述硝普钠的作用机制和临床应用。",
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
        "硝普钠在血管平滑肌内代谢产生一氧化氮（NO），直接松弛小动脉和小静脉平滑肌。主要用于高血压急症的治疗和手术麻醉时控制性降压。",
        "硝普钠属血管平滑肌扩张药，通过释放 NO 激活鸟苷酸环化酶、升高细胞内 cGMP，直接松弛小动脉和小静脉平滑肌，降低心脏前、后负荷；作用快速而短暂，用于高血压急症（高血压危象）的治疗及手术麻醉时控制性降压。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch25-antihypertensives-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述可乐定的抗高血压作用机制。",
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
        "过去认为可乐定降压是通过兴奋延髓背侧孤束核突触后膜的 α₂ 受体，抑制交感神经中枢的传出冲动，使外周血管扩张、血压下降；后来研究表明其也作用于延髓腹外侧区的咪唑啉 I₁ 受体，使交感神经张力下降，从而降压。",
        "可乐定属中枢性降压药，用于中度高血压，常在其他药物治疗无效时使用；常见不良反应有口干、便秘、嗜睡、抑郁等，突然停药可出现反跳现象。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 4 成员（原书 24～27 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch25-antihypertensives-b001",
    order: 10,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "可乐定",
      "美卡拉明",
      "利血平",
      "卡托普利",
      "吲达帕胺",
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
        id: "ext-pharmacology-ch25-antihypertensives-b001m1",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "具有中枢性降压作用的药物是",
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
            "可乐定",
            "可乐定为中枢性降压药，通过兴奋延髓背侧孤束核突触后膜 α₂ 受体及作用于延髓腹外侧区咪唑啉 I₁ 受体，降低交感神经张力而降压。原书 B1 型题第 24 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch25-antihypertensives-b001m2",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可阻滞自主神经节上 N₁ 受体的药物是",
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
            "美卡拉明",
            "美卡拉明属神经节阻断药，对交感神经节和副交感神经节上的 N₁ 受体均有阻断作用，降压作用强但不良反应多，主要用于高血压急症或麻醉时控制性降压。原书 B1 型题第 25 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch25-antihypertensives-b001m3",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可耗竭肾上腺素能神经末梢递质的药物是",
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
            "利血平",
            "利血平属去甲肾上腺素能神经末梢阻断药，主要通过影响儿茶酚胺在神经末梢的贮存及释放（耗竭递质）而产生降压作用，作用缓慢、温和、持久。原书 B1 型题第 26 题，参考答案键号 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch25-antihypertensives-b001m4",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "高血脂患者可用的利尿降压药物是",
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
            "吲达帕胺",
            "吲达帕胺为类噻嗪类利尿药，兼有利尿与钙拮抗样扩血管作用，对血脂影响小，可用于高血脂患者的高血压治疗；噻嗪类利尿药长期应用可致高血糖、高脂血症。原书 B1 型题第 27 题，参考答案键号 E。",
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
