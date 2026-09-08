import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第22章 病毒的基本性状 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：8 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：3 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：17 题（须等于本文件预算 17）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 13、选择题（A1 型 25）、B1 型 2 组（共 8 成员）与简答题 6。
 *   本文件按 17 道预算在原书顺序内取材：名词解释取前 8 道、简答取前 2 道，选择题取 A1 第 1~3 题，
 *   B1 取第 1 组（26~29 题，4 成员）完整组。正确项对齐章末参考答案键号（A1 1.E 2.A 3.B；
 *   B1 26.A 27.C 28.E 29.B）。OCR 错字与双栏错序已按微生物学医学语义恢复（如 沩→为、
 *   脱売→脱壳、表面突起称沩壳粒→表面突起称为壳粒 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch22-virus-basic-properties";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第22章 病毒的基本性状 习题（核对PDF 第168–175页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），8 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch22-virus-basic-properties-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：病毒体",
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
        "病毒体",
        "病毒体：将具有一定形态结构和感染性的完整病毒颗粒，称病毒体。病毒体大小的测量单位为纳米或毫微米。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch22-virus-basic-properties-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：核衣壳",
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
        "核衣壳",
        "核衣壳：病毒的基本结构，由核心和衣壳组成。有些病毒在核衣壳外面还有包膜，有包膜的病毒称为包膜病毒，无包膜的病毒称为裸露病毒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch22-virus-basic-properties-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：感染性核酸",
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
        "感染性核酸",
        "感染性核酸：有些病毒经化学方法除去衣壳蛋白所获得的核酸，仍具有感染性，进入宿主细胞后能引起感染，这种病毒核酸称感染性核酸。感染性核酸不受衣壳蛋白和宿主细胞表面受体的限制，易感细胞范围较广，但易被体液中核酸酶等因素破坏，因此感染性比完整的病毒体要低。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch22-virus-basic-properties-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：刺突",
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
        "刺突",
        "刺突：包膜表面常有不同形状的突起，称包膜子粒或刺突。其化学成分为糖蛋白，亦称刺突糖蛋白。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch22-virus-basic-properties-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：病毒复制",
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
        "病毒复制",
        "病毒复制：病毒缺乏增殖所需的酶系统，只能在有易感性的活细胞内进行增殖，方式是以其基因组为模板进行复制。人和动物病毒的复制周期依次包括吸附、穿入、脱壳、生物合成及组装、成熟和释放等步骤。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch22-virus-basic-properties-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：顿挫感染",
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
        "顿挫感染",
        "顿挫感染：病毒进入宿主细胞后，如细胞不能为病毒增殖提供所需要的酶、能量及必要的成分，则病毒就不能合成本身的成分，或者虽合成部分或合成全部病毒成分，但不能组装和释放出有感染性的病毒颗粒，称为顿挫感染。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch22-virus-basic-properties-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：缺陷病毒",
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
        "缺陷病毒",
        "缺陷病毒：因病毒基因组不完整或者因某一基因位点改变，不能进行正常增殖，复制不出完整的有感染性病毒颗粒，此病毒称为缺陷病毒。当与另一种病毒共同培养时，若后者能为前者提供所缺乏的物质，就能使缺陷病毒完成正常的增殖。HDV 就是缺陷病毒，与 HBV 一起感染时，才能完成正常的增殖。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch22-virus-basic-properties-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：辅助病毒",
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
        "辅助病毒",
        "辅助病毒：与缺陷病毒共同培养时，能为缺陷病毒提供所缺乏的物质，从而使缺陷病毒完成正常的增殖，这种有辅助作用的病毒被称为辅助病毒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch22-virus-basic-properties-a1001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "测量病毒大小通常是用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["m", "cm", "mm", "μm", "nm"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "nm",
        "病毒体大小的测量单位为纳米（nm）或毫微米，必须用电子显微镜才能观察到。原书 A1 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch22-virus-basic-properties-a1002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可直接测量病毒体大小的方法是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "电镜观察法",
      "光镜观察法",
      "X 线衍射法",
      "超速离心法",
      "超过滤法",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "电镜观察法",
        "病毒体大小以纳米计，必须用电子显微镜才能直接观察和测量。原书 A1 答案第 2 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch22-virus-basic-properties-a1003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对病毒生物学性状的描述，不正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "对抗生素不敏感，对干扰素敏感",
      "含有 DNA 和 RNA 两种核酸",
      "以复制方式增殖",
      "必须寄生于活细胞内",
      "属于非细胞型微生物",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "含有 DNA 和 RNA 两种核酸",
        "病毒只含一种类型的核酸（DNA 或 RNA），并非同时含有两种核酸，故该项描述不正确。病毒对抗生素不敏感、对干扰素敏感，以复制方式增殖，必须寄生于活细胞内，属于非细胞型微生物。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无 —— 置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch22-virus-basic-properties-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：病毒与其他微生物相比有何主要特点？",
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
        "病毒与其他微生物相比的主要特点",
        "病毒是一类非细胞型的微生物；体积非常微小，一般需用电子显微镜放大千万倍以上方能观察到；结构简单，只含一种类型的核酸（DNA 或 RNA）；严格的细胞内寄生，只能在一定种类的活细胞中增殖；对抗生素不敏感，但对干扰素敏感。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch22-virus-basic-properties-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述病毒的结构、化学组成及其功能。",
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
        "病毒的结构、化学组成及其功能",
        "①病毒体的基本结构是核衣壳，包括两部分，即核心和衣壳。无包膜的病毒，核衣壳就是病毒体。病毒核心是病毒体的中心结构，其成分主要由一种类型核酸即 DNA 或 RNA 组成，功能：病毒复制；决定病毒的特性；具有感染性。病毒衣壳是包围在病毒核心外面的一层蛋白质结构，功能：保护病毒核酸；参与感染过程；具有抗原性。②包膜：是包绕在某些病毒核衣壳外面的双层膜，主要成分是蛋白质、多糖及脂类，常以糖蛋白或脂蛋白形式存在，功能：维护病毒体结构的完整性；具有与宿主细胞膜亲和及融合的性能；具有病毒抗原的特异性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），1 组 × 4 成员（题组26-29；预算内未纳入第二组30-33） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch22-virus-basic-properties-b001",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "正黏病毒科",
      "副黏病毒科",
      "小 RNA 病毒科",
      "痘病毒科",
      "逆转录病毒科",
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
        id: "ext-microbiology-ch22-virus-basic-properties-b001m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "流感病毒属于",
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
            "正黏病毒科",
            "流感病毒属于正黏病毒科，基因组为分节段的单负链 RNA。原书 B1 答案第 26 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch22-virus-basic-properties-b001m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "脊髓灰质炎病毒属于",
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
            "小 RNA 病毒科",
            "脊髓灰质炎病毒属于小 RNA 病毒科，为无包膜的单正链 RNA 病毒。原书 B1 答案第 27 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch22-virus-basic-properties-b001m3",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "人类免疫缺陷病毒属于",
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
            "逆转录病毒科",
            "人类免疫缺陷病毒（HIV）属于逆转录病毒科，基因组为单正链 RNA，复制时经逆转录形成 DNA 中间体。原书 B1 答案第 28 题为 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch22-virus-basic-properties-b001m4",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "腮腺炎病毒属于",
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
            "副黏病毒科",
            "腮腺炎病毒属于副黏病毒科，为不分节段的单负链 RNA 病毒。原书 B1 答案第 29 题为 B。",
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
