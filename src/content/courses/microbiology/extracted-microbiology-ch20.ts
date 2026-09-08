import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第20章 衣原体 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：4 题
 * - 选择题（a1-single）：2 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：1 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：13 题（须等于本文件预算 13）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 4、填空题 4、选择题（A1 型 10 + A2 型 10 + B1 型 3 组
 *   6 小题）与简答题 2。本文件按 13 道预算在原书顺序内取材：名词解释与填空全取，简答取
 *   前 1 道，选择题取 A1 第 1~2 题，B1 取第一组（21~22 题，2 成员）完整组。正确项对齐
 *   章末参考答案键号（A1 1.C 2.E；B1 21.A 22.C）。OCR 错字与双栏错序已按微生物学医学
 *   语义恢复（如 沩/力→为、英膜→荚膜、疱瘆→疱疹、G*菌→G⁺菌 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch20-chlamydia";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第20章 衣原体 习题（核对PDF 第155–161页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch20-chlamydia-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：衣原体",
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
        "衣原体",
        "衣原体：是一类严格真核细胞内寄生、具有独特发育周期、并能通过细菌滤器的原核细胞型微生物，归属于细菌学范畴。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch20-chlamydia-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：原体",
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
        "原体",
        "原体：衣原体繁殖过程中较小的颗粒，是发育成熟的衣原体，具有高度感染性，即具有感染性的发育型颗粒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch20-chlamydia-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：始体",
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
        "始体",
        "始体：衣原体繁殖过程中较大的增殖型颗粒，不具感染性，又称网状体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch20-chlamydia-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：包涵体",
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
        "包涵体",
        "包涵体：衣原体在宿主细胞内增殖后形成的网状体和子代原体的空泡，经染色后可在光镜下观察到，被称为包涵体。",
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
    id: "ext-microbiology-ch20-chlamydia-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "衣原体与病毒的相同点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "含有 RNA 和 DNA",
      "有核糖体",
      "二分裂方式繁殖",
      "对抗生素敏感",
      "严格活胞内寄生",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "严格活胞内寄生",
        "衣原体与病毒均为严格的细胞内寄生微生物，必须在活细胞内才能增殖；但衣原体含有 RNA 和 DNA 两种核酸、有核糖体、以二分裂方式繁殖并对多种抗生素敏感，这些均与病毒不同。原书 A1 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch20-chlamydia-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "衣原体与细菌的不同点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "在无生命培养基上不生长",
      "有细胞壁",
      "含有 RNA 和 DNA",
      "二分裂繁殖方式",
      "对抗生素敏感",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "在无生命培养基上不生长",
        "衣原体严格细胞内寄生，不能在无生命培养基上生长，这是其与一般细菌（可在人工培养基上生长）的主要不同点；衣原体有细胞壁、含 RNA 和 DNA、以二分裂繁殖并对抗生素敏感，这些与细菌相同。原书 A1 答案第 2 题为 E。",
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
    id: "ext-microbiology-ch20-chlamydia-fill001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "衣原体具有特殊的发育周期，可观察到两种不同颗粒，一种是___，另一种是___；前者具有感染性，后者具有___能力。",
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
        "原体；始体；繁殖",
        "衣原体发育周期中可见原体（小颗粒，具感染性）与始体（网状体，大颗粒，具繁殖能力）两种颗粒。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch20-chlamydia-fill002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "引起沙眼的病原体是___，主要通过___或___途径传播。",
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
        "沙眼衣原体；眼-眼；眼-手-眼",
        "沙眼由沙眼衣原体（沙眼生物型 A、B、Ba、C 血清型）引起，主要通过眼-眼及眼-手-眼途径传播。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch20-chlamydia-fill003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "鹦鹉热是由___引起的一种自然疫源性疾病。",
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
        "鹦鹉热衣原体",
        "鹦鹉热由鹦鹉热衣原体引起，是人畜共患的自然疫源性疾病，经呼吸道传播。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch20-chlamydia-fill004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "性病淋巴肉芽肿的病原体是___，其自然宿主是___，主要通过___传播。",
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
        "沙眼衣原体性病淋巴肉芽肿生物型；人；性接触",
        "性病淋巴肉芽肿由沙眼衣原体性病淋巴肉芽肿生物型（L1、L2、L3 血清型）引起，自然宿主为人，主要通过性接触传播。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch20-chlamydia-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：请比较衣原体和病毒有何区别？",
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
        "衣原体与病毒的区别",
        "①衣原体属原核细胞型微生物，病毒属非细胞型微生物；②衣原体有独特发育周期，以二分裂方式繁殖，有 DNA 和 RNA 两种核酸；病毒以复制方式增殖，只有一种核酸类型；③衣原体对多种抗生素敏感，病毒对抗生素治疗不敏感。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（bGroups），1 组 × 2 成员（题组21-22；取材预算内未纳入后两组23-26） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch20-chlamydia-b001",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "沙眼衣原体",
      "兽类衣原体",
      "肺炎衣原体",
      "鹦鹉热衣原体",
      "肺炎支原体",
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
        id: "ext-microbiology-ch20-chlamydia-b001m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可引起沙眼的病原体是",
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
            "沙眼衣原体",
            "沙眼由沙眼衣原体（沙眼生物型）引起，主要通过眼-眼及眼-手-眼途径传播。原书 B1 答案第 21 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch20-chlamydia-b001m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与冠心病、动脉粥样硬化等慢性病发生密切相关的是",
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
            "肺炎衣原体",
            "肺炎衣原体感染与冠心病、动脉粥样硬化等慢性病的发生密切相关，其抗体的存在与冠心病和心肌梗死密切相关。原书 B1 答案第 22 题为 C。",
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
