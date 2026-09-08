import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第12章 中枢神经系统药理学概论 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：1 题
 * - 填空题（fill）：2 题
 * - 选择题（a1-single）：2 题（A1 型；本章无 A2 型病例题）
 * - 问答题（short-answer）：1 题（含简答、论述）
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：8 题（须等于本文件预算 8）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 3、填空题 4、选择题（A1 型 10 + B1 型 2 组共 5 小题）
 *   与简答题 3；本文件按 8 道预算在原书顺序内取材（term 1、fill 2、a1 2、short 1、
 *   B1 取第 14～15 题组完整 2 成员）。A1 型正确项对齐章末参考答案键号（1.C、2.A），
 *   B1 成员对齐键号（14.A、15.D）；选项已随机重排并同步 correctChoiceIndex。
 *   OCR 恢复说明：参考答案区【B1型题】标题后紧跟的 7.D、8.B、9.C、10.E 实为 A1 型
 *   第 7～10 题答案（OCR 标题错位），已按题号与药理学医学语义归位；A1 型第 1 题选项
 *   字母双栏错序（键号 C 对应“神经胶质细胞参与 CNS 的生理功能调节”），已按医学语义
 *   重建；填空题第 1 题原文空位在 OCR 中缺失，已按参考答案列出的六种递质补全空位。
 *   错字按药理学医学语义恢复（Glu/NA/DA/5-HT、GABAA 受体、M1 受体、D4 受体等），
 *   数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch12-cns-pharmacology";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第12章 中枢神经系统药理学概论 习题（核对PDF 第77–82页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch12-cns-pharmacology-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：神经递质",
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
        "神经递质",
        "指神经末梢释放的、作用于突触后膜受体、导致离子通道开放并形成兴奋性突触后电位或抑制性突触后电位的化学物质，其特点是传递信息快、作用强、选择性高。原书名词解释第 1 题。",
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
    id: "ext-pharmacology-ch12-cns-pharmacology-fill001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "中枢神经系统的重要递质有___、___、___、___、___和___等。",
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
        "乙酰胆碱；γ-氨基丁酸；兴奋性氨基酸；多巴胺；去甲肾上腺素；5-羟色胺",
        "中枢神经系统的重要递质包括乙酰胆碱（ACh）、γ-氨基丁酸（GABA）、兴奋性氨基酸（谷氨酸等）、多巴胺（DA）、去甲肾上腺素（NA）和 5-羟色胺（5-HT）等。原书填空题第 1 题答案；原题空位在 OCR 中缺失，按参考答案列出的六种递质补全空位（题干改写）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch12-cns-pharmacology-fill002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "典型的神经元由___、___和___组成。",
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
        "树突；胞体；轴索",
        "神经元由胞体、树突和轴索三个部分组成，是中枢神经系统（CNS）基本的结构和功能单位。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch12-cns-pharmacology-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于神经胶质细胞，正确的叙述是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "与脑内神经细胞数量相同",
      "神经胶质细胞参与CNS 的生理功能调节",
      "与神经精神疾病的发生和发展相关性极小",
      "仅仅为神经细胞提供营养",
      "与神经递质的代谢无关",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "神经胶质细胞参与CNS 的生理功能调节",
        "神经胶质细胞与 CNS 的生理功能调节以及帕金森病、脑卒中、精神分裂症、药物成瘾等神经精神疾病的发生和发展密切相关，已成为临床治疗学突破和研发理想治疗药物的重要靶标。原书 A1 型题第 1 题，参考答案键号 C（选项字母双栏错序，已按医学语义确定正确项）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch12-cns-pharmacology-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "脑内主要胆碱受体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["M1受体", "M2受体", "M3受体", "M4受体", "N受体"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "M1受体",
        "脑内绝大多数胆碱能受体（约 90%）为 M 受体（M1～M5），其中以 M1 受体为主，占 M 受体总数的 50%～80%。原书 A1 型题第 2 题，参考答案键号 A。",
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
    id: "ext-pharmacology-ch12-cns-pharmacology-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述神经元之间或神经元与效应细胞之间的信息传递过程。",
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
        "神经递质把信息从突触前神经元传递到突触后神经元，主要包括神经递质的合成和贮存、突触前膜去极化和胞外钙内流触发神经递质的释放、神经递质与突触后受体结合引起突触后生物学效应、释放后的递质消除及囊泡的再循环。",
        "几乎所有的突触都是化学性突触，神经递质将信息从突触前神经元传递到突触后神经元，其过程主要包括上述四个环节。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（原书第 14～15 题组） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch12-cns-pharmacology-b001",
    order: 7,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "中枢乙酰胆碱",
      "γ-氨基丁酸",
      "谷氨酸",
      "多巴胺",
      "5-羟色胺",
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
        id: "ext-pharmacology-ch12-cns-pharmacology-b001m1",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要涉及觉醒、学习、记忆和运动调节的神经递质是",
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
            "中枢乙酰胆碱",
            "中枢乙酰胆碱的功能主要涉及觉醒、学习、记忆和运动调节，脑干上行激动系统的 ACh 对维持觉醒状态起着重要作用。原书 B1 型题第 14 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch12-cns-pharmacology-b001m2",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与帕金森病、精神分裂症发生发展密切相关的递质是",
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
            "多巴胺",
            "多巴胺（DA）在大脑的运动控制、情感思维和神经内分泌方面发挥重要的生理作用，与帕金森病、精神分裂症、药物依赖与成瘾的病理密切相关。原书 B1 型题第 15 题，参考答案键号 D。",
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
