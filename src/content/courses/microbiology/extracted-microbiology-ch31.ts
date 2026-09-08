import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第31章 疱疹病毒 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - 填空题（fill）：4 题
 * - 选择题（a1-single）：2 题（含 A2 病例题 1 题）
 * - 问答题（short-answer）：3 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：14 题（须等于本文件预算 14）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 6、选择题（A1 型 15 + A2 型 2）、B1 型 7 组
 *   （共 24 成员）与简答题 3；本文件按 14 道预算取样，名词解释与简答题全取，填空题取前 4 道，
 *   选择题取 A1 1 道 + A2 1 道，B1 取第 1 组（18~20 题，3 成员）。OCR 错字与双栏错序已按
 *   微生物学医学语义恢复（如 HHV-4/HHV-5 对应关系、CD4⁺ 细胞等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch31-herpesviruses";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第31章 疱疹病毒 习题（核对PDF 第232–237页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch31-herpesviruses-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：VZV",
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
        "VZV",
        "即水痘-带状疱疹病毒。感染后引起水痘-带状疱疹，儿童初次感染表现水痘，成年后复发表现为带状疱疹。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch31-herpesviruses-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：传染性单核细胞增多症",
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
        "传染性单核细胞增多症",
        "指易在青春期感染大量 EB 病毒后引起的一种全身淋巴细胞增生性疾病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch31-herpesviruses-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "疱疹病毒可引起潜伏感染，其特征之一是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "感染后在出现临床症状时，检测不到病毒",
      "原发感染时可检测到病毒，但复发时检测不到病毒",
      "在原发感染及复发时均可检测到病毒，但在原发感染与复发的期间则检测不到病毒",
      "原发感染后始终能检测到病毒",
      "复发时能检测到病毒，但原发感染时检测不到病毒",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "在原发感染及复发时均可检测到病毒，但在原发感染与复发的期间则检测不到病毒",
        "疱疹病毒潜伏感染的特征是：原发感染及复发时均可检测到病毒，但在原发感染与复发的间歇期病毒处于潜伏状态，检测不到病毒。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch31-herpesviruses-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某大学生入学后不久出现发热、咽炎、颈淋巴结炎、肝脾肿大等，病程持续数周，临床检查结果显示：单核细胞和异型淋巴细胞增多，异嗜性抗体阳性，诊断感染的疱疹病毒可能是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["HHV-1", "EBV", "HHV-6", "CMV", "HHV-2"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "EBV",
        "该病例表现为发热、咽炎、颈淋巴结炎、肝脾肿大，单核细胞和异型淋巴细胞增多、异嗜性抗体阳性，符合传染性单核细胞增多症的临床特点，其病原体为 EB 病毒（EBV）。原书 A2 答案第 16 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），4 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch31-herpesviruses-fill001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "人疱疹病毒包括___。",
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
        "HSV-1；HSV-2；EBV；CMV；VZV",
        "人疱疹病毒包括单纯疱疹病毒 1 型（HSV-1）、单纯疱疹病毒 2 型（HSV-2）、EB 病毒（EBV）、巨细胞病毒（CMV）和水痘-带状疱疹病毒（VZV）等。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch31-herpesviruses-fill002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "人疱疹病毒中，最常引起胎儿先天感染的是___；与鼻咽癌有关的是___。",
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
        "HCMV；EBV",
        "人巨细胞病毒（HCMV）是引起胎儿先天感染最常见的疱疹病毒；EB 病毒（EBV）与鼻咽癌密切相关。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch31-herpesviruses-fill003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "主要通过唾液传播，对 B 淋巴细胞有亲嗜性的人疱疹病毒是___。",
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
        "EBV",
        "EB 病毒（EBV）主要通过唾液传播，对 B 淋巴细胞有亲嗜性。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch31-herpesviruses-fill004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "新生儿巨细胞包涵体的病原体是___。",
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
        "CMV",
        "新生儿巨细胞包涵体病由巨细胞病毒（CMV）引起。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch31-herpesviruses-short001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：HHV-1、HHV-2 引起的复发感染与 VZV 引起的复发感染有何不同，为什么？",
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
        "HHV-1/HHV-2 与 VZV 复发感染的区别",
        "HHV-1、HHV-2 引起的复发感染与 VZV 引起的复发感染区别如下：HHV-1/HSV-1 潜伏于神经元（三叉神经节和颈上神经节），复发感染引起唇和（或）眼疱疹、脑感染；HHV-2/HSV-2 潜伏于神经元（骶神经节），复发感染引起生殖器疱疹；HHV-3/VZV 潜伏于神经元（脊髓后根神经节或脑神经感觉神经节），复发感染引起带状疱疹。三者的潜伏部位不同，故复发感染的临床表现不同。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch31-herpesviruses-short002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：与疱疹病毒感染相关的肿瘤有哪些？",
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
        "与疱疹病毒感染相关的肿瘤",
        "①EB 病毒（EBV）：与鼻咽癌、非洲儿童恶性淋巴瘤（Burkitt 淋巴瘤）、B 细胞淋巴瘤相关；②HHV-8：与卡波西肉瘤（Kaposi 肉瘤）相关。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch31-herpesviruses-short003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：感染后可能潜伏于淋巴细胞、淋巴样组织中的疱疹病毒有哪些，可引起哪些疾病？",
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
        "潜伏于淋巴细胞/淋巴样组织的疱疹病毒及其所致疾病",
        "感染后可能潜伏于淋巴细胞/淋巴样组织中的疱疹病毒及其引发的疾病：HHV-5（CMV）潜伏于白细胞，引起单核细胞增多症、眼、肾、脑和先天性感染；HHV-4（EBV）潜伏于 B 细胞，引起传染性单核细胞增多症、Burkitt 淋巴瘤、鼻咽癌；HHV-6 潜伏于淋巴样组织，引起婴儿急疹（婴儿玫瑰疹）；HHV-8 潜伏于淋巴样组织，引起卡波西肉瘤。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），1 组 × 3 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch31-herpesviruses-b001",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "单纯疱疹病毒1型（HSV-1）",
      "单纯疱疹病毒2型（HSV-2）",
      "水痘-带状疱疹病毒（VZV）",
      "巨细胞病毒（CMV）",
      "EB病毒",
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
        id: "ext-microbiology-ch31-herpesviruses-b001m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "潜伏于三叉神经节的是",
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
            "单纯疱疹病毒1型（HSV-1）",
            "HSV-1 原发感染后部分病毒沿神经髓鞘到达三叉神经节细胞中潜伏。原书 B1 答案第 18 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch31-herpesviruses-b001m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "潜伏于骶神经节的是",
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
            "单纯疱疹病毒2型（HSV-2）",
            "HSV-2 原发感染后部分病毒潜伏于骶神经节，主要引起生殖器疱疹。原书 B1 答案第 19 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch31-herpesviruses-b001m3",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "潜伏于脊髓后根神经节的是",
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
            "水痘-带状疱疹病毒（VZV）",
            "VZV 原发感染（水痘）后潜伏于脊髓后根神经节或脑神经感觉神经节，成年后复发引起带状疱疹。原书 B1 答案第 20 题为 C。",
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
  ...a1Items,
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
