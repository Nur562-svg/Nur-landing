import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第32章 逆转录病毒 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：6 题
 * - 填空题（fill）：6 题
 * - 选择题（a1-single）：2 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：5 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：21 题（须等于本文件预算 21）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 6、填空题 6、选择题（A1 型 20 + A2 型 5）、B1 型 4 组
 *   （共 12 成员）与简答题 5；本文件按 21 道预算取样，名词解释、填空与简答题全取，
 *   选择题取 A1 2 道，B1 取第 1 组（26~27 题，2 成员）。OCR 错字与双栏错序已按微生物学
 *   医学语义恢复（如 CD4⁺T 细胞、+ssRNA、gp120/gp41、gag/pol/env 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch32-retroviruses";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第32章 逆转录病毒 习题（核对PDF 第238–244页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch32-retroviruses-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：逆转录病毒",
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
        "逆转录病毒",
        "病毒颗粒中含有逆转录酶，在病毒基因组复制中出现 RNA→DNA→RNA 过程。人类致病性的逆转录病毒主要有 HIV、HTLV（原书参考答案另列 HBV，但 HBV 属嗜肝 DNA 病毒，仅其复制过程经逆转录，通常不归入逆转录病毒科）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：gp120",
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
        "gp120",
        "为 HIV 包膜表面刺突糖蛋白。当 HIV 感染 CD4⁺T 细胞时，gp120 可与细胞表面的 CD4 分子结合，与 HIV 吸附易感宿主细胞有关；gp120 可刺激机体产生中和抗体，但其抗原性易发生变异。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：AIDS 相关综合征",
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
        "AIDS 相关综合征",
        "当 HIV 感染后，随着 HIV 的大量复制并造成机体免疫系统进行性损伤，出现各种症状如发热、盗汗、慢性腹泻及全身淋巴结肿大等，并呈进行性加重。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：AIDS",
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
        "AIDS",
        "获得性免疫缺陷综合征（acquired immunodeficiency syndrome 的英文缩写）。AIDS 由 HIV 感染引起，通过性接触、输血、注射、母-婴等方式传播。HIV 可感染 CD4⁺T 细胞及单核-巨噬细胞，损伤机体免疫系统导致免疫功能严重缺陷，引起致死性机会感染或恶性肿瘤。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：高效抗逆转录病毒治疗（HAART）",
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
        "高效抗逆转录病毒治疗（HAART）",
        "HAART 是 highly active antiretroviral therapy 的英文缩写，俗称“鸡尾酒”疗法，其本质是多种不同作用机制的抗病毒药物联合使用，一般是联合应用 2 种核苷类药物 + 1 种非核苷类药物或蛋白酶抑制剂，能有效抑制 HIV 复制，控制病情发展。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：HTLV",
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
        "HTLV",
        "人类嗜T细胞病毒（human T lymphotropic virus 的英文缩写）。HTLV 属于人类逆转录病毒，是一种 RNA 肿瘤病毒。HTLV-1 是成人 T 淋巴细胞白血病的病原体，HTLV-2 引起毛细胞白血病。",
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
    id: "ext-microbiology-ch32-retroviruses-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "逆转录病毒复制的特点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "病毒基因组是分节段 RNA",
      "病毒复制过程中，以病毒基因组 RNA 为模板直接合成 RNA",
      "病毒复制过程中，以病毒基因组 RNA 为模板合成 DNA 复制中间体后再转录为 RNA",
      "病毒的基因组是 DNA",
      "病毒复制利用病毒的 RNA 依赖 RNA 聚合酶",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "病毒复制过程中，以病毒基因组 RNA 为模板合成 DNA 复制中间体后再转录为 RNA",
        "逆转录病毒复制时以病毒基因组 RNA 为模板，经逆转录酶合成 DNA 复制中间体（RNA→DNA→RNA），再转录为子代 RNA。原书 A1 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "HIV 主要感染的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "B 淋巴细胞",
      "CD8⁺T 淋巴细胞",
      "单核-巨噬细胞",
      "CD4⁺T 淋巴细胞",
      "中性粒细胞",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "CD4⁺T 淋巴细胞",
        "HIV 的主要受体是 CD4 分子，主要感染表达 CD4 分子的细胞，尤其是 CD4⁺T 淋巴细胞；也可感染单核-巨噬细胞等。原书 A1 答案第 9 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），6 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch32-retroviruses-fill001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "逆转录病毒的主要特性包括___。",
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
        "中等大小球形包膜病毒；含 +ssRNA 并有逆转录酶；病毒复制需经逆转录过程；具有 gag、pol 和 env 3 个结构基因；成熟的病毒颗粒以出芽方式释放",
        "逆转录病毒的主要特性包括：中等大小球形包膜病毒、含正链单股 RNA（+ssRNA）并有逆转录酶、病毒复制需经逆转录过程、具有 gag、pol 和 env 3 个结构基因、成熟的病毒颗粒以出芽方式释放。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-fill002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "HIV 病毒可分为___两型，引起全球流行的是___。",
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
        "HIV-1；HIV-2；HIV-1",
        "HIV 可分为 HIV-1 和 HIV-2 两型，引起全球流行的是 HIV-1。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-fill003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "HIV 病毒颗粒胞膜上与靶细胞表面 CD4 分子结合的结构是___，与膜融合有关的分子是___。",
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
        "gp120；gp41",
        "HIV 包膜糖蛋白 gp120 与靶细胞表面 CD4 分子结合，gp41 与膜融合有关。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-fill004",
    order: 12,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "HIV 病毒的核酸为___，基因组中分别有___、___和___3 个结构基因。",
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
        "+ssRNA；gag；pol；env",
        "HIV 病毒的核酸为正链单股 RNA（+ssRNA），基因组中有 gag、pol 和 env 3 个结构基因。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-fill005",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "HIV 的主要传播途径包括___、___和___。",
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
        "性接触；血液传播；母婴传播",
        "HIV 的主要传播途径包括性接触传播、血液传播和母婴传播。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-fill006",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "HTLV-1 主要感染___细胞，引起的疾病是___。",
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
        "CD4⁺T 淋巴细胞；T 淋巴细胞白血病",
        "HTLV-1 主要感染 CD4⁺T 淋巴细胞，引起成人 T 淋巴细胞白血病。原书填空题第 6 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），5 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch32-retroviruses-short001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述 HIV 的形态结构特点。",
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
        "HIV 的形态结构特点",
        "HIV 病毒颗粒呈球形，直径 80~120nm。最外层有包膜，表面有糖蛋白刺突 gp120 和 gp41。病毒基因组为正链单股 RNA（+ssRNA，二聚体），含核衣壳蛋白（p7）、衣壳蛋白（p24）、内膜蛋白（p17），并携带逆转录酶、整合酶、蛋白酶和 RNA 酶 H。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-short002",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：以 HIV 为例简述逆转录病毒的复制周期。",
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
        "HIV 的复制周期",
        "HIV 的复制周期包括 5 个步骤：①吸附：HIV gp120 首先与靶细胞表面的 CD4 分子结合，然后再与辅助受体结合。②穿入：病毒包膜与细胞膜融合，病毒核衣壳进入靶细胞。③脱壳：在多种酶的作用下，释放出病毒基因组 RNA。④生物合成：在病毒体含有的逆转录酶作用下，以病毒 RNA 为模板合成双链 DNA（+ssRNA→RNA:DNA→dsDNA），病毒双链 DNA 整合至细胞染色体中成为前病毒；前病毒活化后转录形成子代病毒基因组 RNA 及 mRNA，mRNA 翻译出病毒蛋白。⑤装配与释放：病毒基因组 RNA 与病毒蛋白质在胞内装配，出芽释放。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-short003",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述 HIV 的传染源、传播途径及致病机制。",
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
        "HIV 的传染源、传播途径及致病机制",
        "HIV 的传染源主要是 HIV 感染者和 AIDS 患者。传播途径：①性传播：是 HIV 的主要传播方式，性活跃人群（包含同性恋和异性恋者）是高危人群。②血液传播：通过血液或血制品、骨髓或器官移植，使用被污染的注射器、针头、手术器械等途径传染，静脉毒品成瘾者是高危人群。③母婴传播：通过胎盘、产道、哺乳等途径母婴传播，其中经胎盘感染胎儿最为多见。致病机制：CD4⁺T 细胞是 HIV 攻击的主要靶细胞。HIV 损伤 CD4⁺T 细胞的机制复杂，主要有：（1）CD4⁺T 细胞破坏增加：①细胞融合或细胞的生物合成被抑制，导致细胞死亡；②细胞凋亡；③CTL 和 ADCC 对靶细胞的破坏作用。（2）HIV 侵犯胸腺细胞、骨髓造血干细胞，使 CD4⁺T 细胞产生减少。（3）HIV 引起 Th2 极化，造成 CD4⁺T 细胞功能受损。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-short004",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：临床筛查和确认 HIV 感染者常用哪些微生物学检查方法？",
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
        "HIV 感染的微生物学检查方法",
        "临床检查 HIV 感染的微生物学检查方法有：（1）检测 HIV 抗体：常用 ELISA 法进行初筛实验，采用 Western Blot 法进行确认。大多数人在感染 6~12 周内即可在血液中检出 HIV 抗体，6 个月后几乎所有感染者的抗体均呈阳性。（2）检测 HIV 抗原：ELISA 法检测血浆中 HIV 抗原 p24，可用于早期诊断。（3）检测 HIV 核酸：定量 RT-PCR 方法测定血浆中 HIV RNA 的拷贝数（病毒载量），用于监测疾病进展和评价抗病毒治疗效果。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch32-retroviruses-short005",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：目前治疗 HIV 感染的药物有几类？简述艾滋病的治疗原则。",
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
        "治疗 HIV 感染的药物分类与艾滋病治疗原则",
        "目前治疗 HIV 感染的药物主要有 4 类：①逆转录酶抑制剂：包括核苷类逆转录酶抑制剂（NRTI）和非核苷类逆转录酶抑制剂（NNRTI）；②蛋白酶抑制剂（PI）；③病毒入胞抑制剂：包括融合抑制剂（FI）和 CCR5 拮抗剂；④整合酶抑制剂（INSTI）。艾滋病的治疗原则：联合使用多种抗 HIV 药物，称为高效抗逆转录病毒治疗（HAART，俗称“鸡尾酒”疗法）。HAART 一般是联合应用 2 种核苷类药 + 1 种非核苷类药或蛋白酶抑制剂。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），1 组 × 2 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch32-retroviruses-b001",
    order: 20,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "外周血单个核细胞共培养法",
      "血常规",
      "尿常规",
      "ELISA 检查 HIV 抗体",
      "Western Blot 检查 HIV 抗体",
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
        id: "ext-microbiology-ch32-retroviruses-b001m1",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "HIV 感染的初筛实验采用的方法是",
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
            "ELISA 检查 HIV 抗体",
            "HIV 感染的初筛实验常用 ELISA 法检测 HIV 抗体。原书 B1 答案第 26 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch32-retroviruses-b001m2",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "HIV 感染的确证实验采用的方法是",
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
            "Western Blot 检查 HIV 抗体",
            "HIV 感染的确证实验采用 Western Blot 法检测 HIV 抗体。原书 B1 答案第 27 题为 E。",
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
