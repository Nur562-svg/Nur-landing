import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第9章 核苷酸代谢 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - A1/A2 型选择题（a1-single）：4 题
 * - 简答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：11 题（须等于本文件预算 11）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 4、【A1型题】1–20、【A2型题】21–24、
 *   【B1型题】25–27 与 28–30（两组共用备选答案）及简答题 1–3。本文件按 11 道
 *   预算在原书顺序中取材并改写，覆盖嘌呤核苷酸从头/补救合成（肝、尿酸、IMP、
 *   HGPRT、磷酸戊糖途径）与核苷酸抗代谢物（5-氟尿嘧啶、阿糖胞苷、甲氨蝶呤）
 *   等本章核心知识点。A1 型均映射为 a1-single；B1 型按项目规约组织为 Group b1
 *   （取 28–30 题共用备选答案"抗代谢物作用机制"配伍一组的三个成员）。正确项逐一
 *   对齐源参考答案（1.B 肝、2.C 尿酸、6.D 嘌呤核苷酸补救合成、15.D 磷酸戊糖途径、
 *   28.C 抑制胸苷酸合酶、29.D 抑制核糖核苷酸还原酶、30.A 抑制二氢叶酸还原酶）。
 *   选项顺序已随机重排并同步 correctChoiceIndex（0 起）。原生文本双栏错序已按
 *   核苷酸代谢的医学语义恢复（题干/选项被打散重建，如"嘌昤/嘌吟/瞟吟"→嘌呤、
 *   "喂吟/瞟昤"→嘌呤、"核甘酸"→核苷酸、"a-"→α- 等），缩写与结构（PRPP、IMP、
 *   AMP、GMP、UMP、dTMP、CO2、FH4、HGPRT）均保留原文，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "biochem-ch9-nucleotide";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第9章 核苷酸代谢 复习思考题 习题（核对原书PDF 第163–170页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch9-nucleotide-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：核苷酸的从头合成（de novo synthesis）",
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
        "核苷酸的从头合成",
        "核苷酸的从头合成（de novo synthesis）是以氨基酸、一碳单位和磷酸核糖等为原料，从头合成嘌呤核苷或嘧啶碱，再合成核苷酸的过程，是核苷酸合成的主要途径（嘌呤核苷酸从头合成关键酶为 PRPP 合成酶和磷酸核糖酰胺转移酶；嘧啶核苷酸从头合成关键酶为 PRPP 合成酶和氨基甲酰磷酸合成酶Ⅱ）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch9-nucleotide-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：嘌呤核苷酸的补救合成（salvage pathway）",
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
        "嘌呤核苷酸的补救合成",
        "嘌呤核苷酸的补救合成（salvage pathway）是体内利用游离的嘌呤或嘌呤核苷，经过简单的反应过程合成嘌呤核苷酸的过程。参与的关键酶为腺嘌呤磷酸核糖转移酶（APRT）和次黄嘌呤-鸟嘌呤磷酸核糖转移酶（HGPRT），由 PRPP 提供磷酸核糖；HGPRT 是补救途径的关键酶，其缺陷与 Lesch-Nyhan 综合征有关。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），4 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch9-nucleotide-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人体内嘌呤核苷酸从头合成最活跃的组织是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["胸腺", "小肠黏膜", "脑", "肝", "骨髓"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝",
        "原书 A1 型选择题答案第二题为 B（肝）。人体内嘌呤核苷酸的从头合成主要在肝进行，其次是小肠黏膜和胸腺，在细胞质中进行；脑、骨髓等组织因缺乏从头合成嘌呤核苷酸的酶系，只能进行补救合成，故最活跃的组织是肝。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch9-nucleotide-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人体内嘌呤分解代谢的终产物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["尿素", "肌酸", "CO2 和 NH3", "肌酸酐", "尿酸"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "尿酸",
        "原书 A1 型选择题答案第三题为 C（尿酸）。各种嘌呤均转变为黄嘌呤，再经黄嘌呤氧化酶催化生成尿酸（2,6,8-三羟基嘌呤），尿酸是嘌呤分解代谢的终产物。若血中尿酸过高则可引起痛风症，可用别嘌呤醇治疗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch9-nucleotide-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "次黄嘌呤-鸟嘌呤磷酸核糖转移酶（HGPRT）参与的反应是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "嘌呤核苷酸从头合成",
      "嘧啶核苷酸分解代谢",
      "嘌呤核苷酸分解代谢",
      "嘌呤核苷酸补救合成",
      "嘧啶核苷酸从头合成",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "嘌呤核苷酸补救合成",
        "原书 A1 型选择题答案第六题为 D（嘌呤核苷酸补救合成）。HGPRT 是嘌呤核苷酸补救合成的关键酶，由 PRPP 提供磷酸核糖，催化次黄嘌呤、鸟嘌呤生成 IMP、GMP；其缺陷与 Lesch-Nyhan 综合征有关。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch9-nucleotide-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列途径中与核酸合成关系最为密切的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["糖异生", "糖酵解", "尿素循环", "磷酸戊糖途径", "三羧酸循环"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "磷酸戊糖途径",
        "原书 A1 型选择题答案第十五题为 D（磷酸戊糖途径）。磷酸戊糖途径产生核糖-5-磷酸（5-磷酸核糖），是核苷酸合成（形成 PRPP）的直接原料来源，故与核酸合成关系最为密切。",
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
    id: "ext-biochem-ch9-nucleotide-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述嘌呤核苷酸生物合成的原料来源以及特点。",
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
        "嘌呤核苷酸生物合成的原料来源及特点",
        "原料来源：CO2、天冬氨酸、甘氨酸、一碳单位（来自四氢叶酸 FH4）、谷氨酰胺、磷酸核糖。特点：①不是先形成游离的嘌呤碱，再与核糖、磷酸生成核苷酸，而是直接形成次黄嘌呤核苷酸（IMP），再转变为其他嘌呤核苷酸；②合成首先从 5-磷酸核糖开始，形成 PRPP；③由 PRPP 的 C1 原子开始，先形成咪唑五元环，再形成六元环，生成 IMP。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch9-nucleotide-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "在核苷酸合成代谢中，何谓补救合成途径？嘌呤核苷酸和嘧啶核苷酸补救合成途径中有哪些关键酶？补救合成途径的生理意义？",
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
        "补救合成途径、关键酶及生理意义",
        "嘌呤核苷酸补救合成途径的关键酶是次黄嘌呤-鸟嘌呤磷酸核糖转移酶（HGPRT），能催化次黄嘌呤和鸟嘌呤与磷酸核糖焦磷酸（PRPP）反应生成次黄嘌呤核苷酸（IMP）和鸟嘌呤核苷酸（GMP）。嘧啶核苷酸补救合成途径中的关键酶，一个是尿苷激酶，能催化尿嘧啶核苷及胞嘧啶核苷生成 UMP 和 CMP；二是脱氧胸苷激酶，能催化脱氧胸苷生成 dTMP。补救合成途径的生理意义在于：①可节省从头合成时能量和一些氨基酸的消耗；②对无从头合成途径酶系的组织器官（如大脑、骨髓、脾等）很重要，这些组织器官只能通过补救合成途径合成核苷酸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员（取原书 28–30 题共用备选答案） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch9-nucleotide-b001",
    order: 7,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "抑制二氢叶酸还原酶",
      "抑制黄嘌呤氧化酶",
      "抑制胸苷酸合酶（胸苷酸合成酶）",
      "抑制核糖核苷酸还原酶",
      "胸苷激酶",
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
        id: "ext-biochem-ch9-nucleotide-b001m1",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "5-氟尿嘧啶治疗肿瘤的作用机制是",
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
            "抑制胸苷酸合酶（胸苷酸合成酶）",
            "原书 B1 型题 28 题答案为 C（抑制胸苷酸合酶）。5-氟尿嘧啶（5-FU）结构与胸腺嘧啶相似，需先在体内转变为一磷酸脱氧核糖氟尿嘧啶核苷（FdUMP）及三磷酸氟尿嘧啶核苷（FUTP）后发挥作用：FdUMP 与 dUMP 结构相似，是 TMP 合成酶（胸苷酸合酶）的抑制剂，使 TMP 合成受阻；FUTP 以 FUMP 的形式掺入 RNA，破坏 RNA 的结构与功能。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch9-nucleotide-b001m2",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "阿糖胞苷治疗肿瘤的作用机制是",
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
            "抑制核糖核苷酸还原酶",
            "原书 B1 型题 29 题答案为 D（抑制核糖核苷酸还原酶）。阿糖胞苷是改变核糖结构形成的核苷类似物，能抑制 CDP 还原成 dCDP，进而影响 DNA 的合成。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch9-nucleotide-b001m3",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "甲氨蝶呤治疗肿瘤的作用机制是",
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
            "抑制二氢叶酸还原酶",
            "原书 B1 型题 30 题答案为 A（抑制二氢叶酸还原酶）。甲氨蝶呤（MTX）竞争性抑制二氢叶酸还原酶，使叶酸不能还原成二氢叶酸及四氢叶酸，造成一碳单位代谢障碍，干扰 dUMP→dTMP 的反应，阻断胸苷酸生成，进而影响 DNA 的合成。",
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
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];