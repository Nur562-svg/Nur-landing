import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第11章 肾上腺素受体阻断药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：4 题（含 A1 型 3 题、A2 型病例题 1 题）
 * - 问答题（short-answer）：3 题（含简答、论述）
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：15 题（须等于本文件预算 15）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 8、选择题（A1 型 19 + A2 型 3 + B1 型 3 组
 *   共 13 小题）与简答（论述）9；本文件按 15 道预算在原书顺序内取材。名词解释全取 2，
 *   填空题取前 2 道，选择题按源题量占比取 A1 型前 3 道与 A2 型第 20 题（映射为 a1-single），
 *   问答题取前 3 道，B1 型取第 1 组（23～26 题）完整 4 成员。正确项对齐章末参考答案键号
 *   （A1 型题 1.A/2.E/3.E、A2 型题 20.A、B1 型题 23.D/24.D/25.E/26.C），选项与共用备选
 *   答案已随机重排并同步 correctChoiceIndex。OCR 错字与符号已按药理学医学语义恢复
 *   （如 普蔡洛尔→普萘洛尔、噻四洛尔→噻吗洛尔、嗜饹细胞瘤→嗜铬细胞瘤、坦洛新/育享宾/
 *   哌唑嗪/拉贝洛尔等药名及 α/β 受体亚型），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch11-adrenoceptor-antagonists";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第11章 肾上腺素受体阻断药 习题（核对PDF 第70–76页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肾上腺素升压作用的翻转",
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
        "肾上腺素升压作用的翻转",
        "使用 α 受体阻断药后，肾上腺素的收缩血管 α 效应被阻断，而舒张骨骼肌血管的 β2 效应占优势，此时给予肾上腺素，血压不但不升反而下降，这种现象称为肾上腺素升压作用的翻转。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：内在拟交感活性",
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
        "内在拟交感活性",
        "某些 β 肾上腺素受体阻断药与 β 受体结合后，除能阻断受体外，对 β 受体还具有部分激动作用（partial agonistic action），称为内在拟交感活性（intrinsic sympathomimetic activity，ISA），如吲哚洛尔等。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），2 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "阻断α及β受体的代表药物是___。",
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
        "拉贝洛尔",
        "拉贝洛尔能同时阻断 α 及 β 受体，用于中、重度高血压及心绞痛，静注可用于高血压危象。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "选择性阻断α1受体的代表药物是___。",
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
        "哌唑嗪",
        "哌唑嗪选择性阻断 α1 受体，用于高血压及良性前列腺增生等。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），4 道（A1 型 3 道 + A2 型病例题 1 道） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不属于选择性β1受体阻断药的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "美托洛尔",
      "阿替洛尔",
      "索他洛尔",
      "艾司洛尔",
      "醋丁洛尔",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "索他洛尔",
        "索他洛尔为非选择性 β 受体阻断药（兼有Ⅲ类抗心律失常作用），不属于选择性 β1 受体阻断药；美托洛尔、阿替洛尔、艾司洛尔、醋丁洛尔均为选择性 β1 受体阻断药。原书 A1 型题第 1 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "短效β受体阻断药是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "纳多洛尔",
      "艾司洛尔",
      "普萘洛尔",
      "吲哚洛尔",
      "阿替洛尔",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "艾司洛尔",
        "艾司洛尔为超短效选择性 β1 受体阻断药，血浆半衰期仅数分钟，适用于围术期等需短时控制心率的场合。原书 A1 型题第 2 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能选择性阻断α2受体的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "酚妥拉明",
      "可乐定",
      "育亨宾",
      "甲氧明",
      "哌唑嗪",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "育亨宾",
        "育亨宾选择性阻断突触前膜 α2 受体；酚妥拉明为非选择性 α 受体阻断药，哌唑嗪选择性阻断 α1 受体，甲氧明为 α1 受体激动药，可乐定为 α2 受体激动药。原书 A1 型题第 3 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者，男，45岁，主诉近期指端麻木、指尖发凉，检查见指尖皮肤苍白，诊断为肢端动脉痉挛，可选用的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "多巴胺",
      "坦洛新",
      "可乐定",
      "酚妥拉明",
      "普萘洛尔",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "酚妥拉明",
        "酚妥拉明阻断 α 受体、扩张外周血管，用于肢端动脉痉挛（雷诺病）等外周血管痉挛性疾病。原书 A2 型题第 20 题，参考答案键号 A。",
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
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-short001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "为什么酚妥拉明能治疗顽固性充血性心衰？",
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
        "心衰时心排出量不足、交感张力增加、外周阻力增高，易产生肺水肿。酚妥拉明扩张血管、降低外周阻力，使心脏后负荷明显降低、左室舒张末压与肺动脉压下降、心排出量增加，从而使心力衰竭得以减轻。",
        "顽固性充血性心衰患者因心排出量不足，交感神经张力代偿性增高，外周阻力增高，肺充血和肺动脉压升高，易产生肺水肿。酚妥拉明通过阻断 α 受体扩张血管、降低外周阻力，使心脏后负荷明显降低、左室舒张末压与肺动脉压下降、心排出量增加，心衰症状得以改善。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-short002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "β受体阻断药的主要临床应用有哪些？",
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
        "①心律失常；②心绞痛和心肌梗死；③高血压；④充血性心力衰竭；⑤焦虑状态、辅助治疗甲状腺功能亢进及甲状腺中毒危象、嗜铬细胞瘤和肥厚性心肌病等。",
        "β 受体阻断药通过阻断心脏 β1 受体减慢心率、降低心肌收缩力与心肌耗氧量，并抑制肾素释放等发挥作用，临床应用于心律失常、心绞痛和心肌梗死、高血压、充血性心力衰竭，亦用于焦虑状态，辅助治疗甲状腺功能亢进及甲状腺中毒危象、嗜铬细胞瘤和肥厚性心肌病等。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-short003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "伴有支气管哮喘的心绞痛患者为什么要用选择性β1受体阻断药，而不用非选择性β受体阻断药？",
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
        "非选择性β受体阻断药可阻断支气管平滑肌的β2受体，使呼吸道阻力增加，诱发或加剧哮喘；选择性β1受体阻断药及具有内在拟交感活性的药物一般不引起上述不良反应，故哮喘患者宜选用。",
        "非选择性 β 受体阻断药（如普萘洛尔）对 β2 受体亦有阻断作用，可使支气管平滑肌收缩、呼吸道阻力增加，诱发或加剧哮喘；选择性 β1 受体阻断药（如美托洛尔、阿替洛尔）及具有内在拟交感活性的药物对支气管 β2 受体影响较小，一般不引起上述不良反应，故伴有支气管哮喘的心绞痛患者应选用选择性 β1 受体阻断药。原书简答题第 3 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 4 成员（原书 23～26 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch11-adrenoceptor-antagonists-b001",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "α受体激动药",
      "α1受体激动药",
      "α受体阻断药",
      "α1受体阻断药",
      "α2受体阻断药",
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
        id: "ext-pharmacology-ch11-adrenoceptor-antagonists-b001m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "坦洛新属于",
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
            "α1受体阻断药",
            "坦洛新（坦索罗辛）选择性阻断 α1 受体，主要用于良性前列腺增生所致的排尿困难。原书 B1 型题第 23 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch11-adrenoceptor-antagonists-b001m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "哌唑嗪属于",
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
            "α1受体阻断药",
            "哌唑嗪选择性阻断 α1 受体，用于高血压及良性前列腺增生等。原书 B1 型题第 24 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch11-adrenoceptor-antagonists-b001m3",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "育亨宾属于",
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
            "α2受体阻断药",
            "育亨宾选择性阻断突触前膜 α2 受体，可促进去甲肾上腺素能神经末梢释放去甲肾上腺素。原书 B1 型题第 25 题，参考答案键号 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch11-adrenoceptor-antagonists-b001m4",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "酚妥拉明属于",
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
            "α受体阻断药",
            "酚妥拉明为短效非选择性 α 受体阻断药，对 α1、α2 受体均有阻断作用。原书 B1 型题第 26 题，参考答案键号 C。",
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
