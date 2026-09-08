import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第18章 支原体 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - 填空题（fill）：4 题
 * - 选择题（a1-single）：2 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：3 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：14 题（须等于本文件预算 14）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 3、填空题 4、选择题（A1 型 7 + A2 型 8）、B1 型 3 组
 *   （16~17、18~19、20~21 题，各 2 成员）与简答题 3；本文件按 14 道预算在原书顺序内取材，
 *   名词解释、填空题与简答题全取，B1 取第一组（16~17 题，2 成员，覆盖支原体致病物质），
 *   选择题取第 2、3 题（支原体定义与无细胞壁特性）。正确项对齐章末参考答案键号
 *   （选择题 2.A 3.C；B1 16.E 17.A）。OCR 错字与双栏错序已按微生物学医学语义恢复
 *   （如 豚原体→脲原体、于→与、BLISA→ELISA、CD4“→CD4⁺、IFN-Y→IFN-γ、0.45um→0.45μm 等），
 *   数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch18-mycoplasma";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第18章 支原体 习题（核对PDF 第144–149页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch18-mycoplasma-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：支原体（Mycoplasma）",
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
        "支原体（Mycoplasma）",
        "支原体是一类缺乏细胞壁、呈高度多形性、能通过滤菌器、在无生命培养基中能生长繁殖的最小原核细胞型微生物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch18-mycoplasma-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：生长抑制试验（growth inhibition test，GIT）",
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
        "生长抑制试验（growth inhibition test，GIT）",
        "将含有特异性抗血清的纸片贴于接种有支原体的琼脂平板表面，若两者相对应则纸片周围生长的菌落受到抑制，该试验具有较高的特异性和敏感性，是多数支原体血清学分型和鉴定最常用的方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch18-mycoplasma-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：代谢抑制试验（metabolic inhibition test，MIT）",
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
        "代谢抑制试验（metabolic inhibition test，MIT）",
        "将支原体接种在一个含有抗血清与酚红的葡萄糖培养基中，若抗体与支原体相对应，则支原体的生长、代谢受到抑制，酚红不变颜色，该试验特异性和敏感性较高，可用于支原体的血清学分型和鉴定。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），2 道（原书第 2、3 题） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch18-mycoplasma-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能在无生命培养基中生长繁殖的最小原核细胞型微生物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "病毒",
      "支原体",
      "螺旋体",
      "衣原体",
      "立克次体",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支原体",
        "支原体是缺乏细胞壁、能在无生命培养基中生长繁殖的最小原核细胞型微生物。原书选择题第 2 题答案 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch18-mycoplasma-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "支原体与细菌的主要不同点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "无细胞壁",
      "含有两种核酸",
      "含有核糖体",
      "能在无生命培养基中生长",
      "仅有核质，无核膜和核仁",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "无细胞壁",
        "支原体缺乏细胞壁，这是支原体与细菌的主要不同点；支原体含有 DNA 和 RNA 两种核酸及核糖体，能在无生命培养基中生长。原书选择题第 3 题答案 C。",
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
    id: "ext-microbiology-ch18-mycoplasma-fill001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "对人类致病性支原体主要有___、___、___和___。",
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
        "肺炎支原体；人型支原体；生殖支原体；嗜精子支原体",
        "对人类致病的支原体主要有肺炎支原体、人型支原体、生殖支原体、嗜精子支原体等。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch18-mycoplasma-fill002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "支原体的大小介于___和___之间，能通过直径___滤膜。其在宿主细胞膜上起定植作用的结构是___。",
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
        "细菌；病毒；0.45μm；顶端结构",
        "支原体的大小介于细菌和病毒之间，能通过 0.45μm 滤菌器，其顶端结构可黏附于宿主细胞膜上发挥定植作用。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch18-mycoplasma-fill003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "原发性非典型肺炎的病原体是___，主要经___感染，发病率以___青少年最高。",
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
        "肺炎支原体；飞沫；5~15 岁",
        "原发性非典型肺炎的病原体是肺炎支原体，主要经飞沫传播感染，发病率以 5~15 岁青少年最高。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch18-mycoplasma-fill004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "支原体细胞膜上的抗原结构由___和___组成。补体结合试验取决于抗原的___部分，ELISA 取决于抗原的___部分。",
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
        "蛋白质；糖脂；糖脂；蛋白质",
        "支原体细胞膜上的抗原结构由蛋白质和糖脂组成，补体结合试验取决于抗原的糖脂部分，ELISA 取决于抗原的蛋白质部分。原书填空题第 4 题答案。",
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
    id: "ext-microbiology-ch18-mycoplasma-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：列举 5 种能引起尿道炎的常见病原菌。",
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
        "能引起尿道炎的常见病原菌",
        "能引起尿道炎的病原体有：脲原体、人型支原体、沙眼衣原体、生殖支原体、白假丝酵母菌和大肠杆菌（以上任选 5 种）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch18-mycoplasma-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：支原体与 L 型细菌有哪些相似的生物学特性？有哪些主要区别？",
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
        "支原体与 L 型细菌的相似性与主要区别",
        "①支原体与 L 型细菌的相似处：无细胞壁，呈多形性，能通过滤菌器，固体培养菌落呈荷包蛋样或颗粒状。②两者的主要区别：L 型细菌在无抗生素等诱导因素作用下易返祖为原菌，细胞膜不含胆固醇；支原体则在遗传上与细菌无关，不能回复为细菌，细胞膜有胆固醇。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch18-mycoplasma-short003",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：对人致病的支原体种类有哪些？简述其致病性。",
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
        "对人致病的支原体种类及其致病性",
        "①肺炎支原体主要经飞沫传播，能引起原发性非典型肺炎，可并发支气管肺炎，个别病人可见皮疹、心血管和神经系统症状等呼吸道外的并发症。②人型支原体主要通过性接触传播，在男性可引起附睾炎，女性主要引起盆腔炎、慢性羊膜炎和产褥热，新生儿可引起肺炎、脑炎及脑脓肿。③生殖支原体能通过性接触传播，能黏附在人类泌尿生殖道上皮细胞上，主要引起尿道炎、宫颈炎、子宫内膜炎和盆腔炎，与男性不育有关。④嗜精子支原体能黏附于精子表面而引起男性不育。⑤发酵支原体、穿透支原体、梨支原体、解脲脲原体和微小脲原体则可引起条件致病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（bGroups），1 组 × 2 成员（题组16-17） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch18-mycoplasma-b001",
    order: 13,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "荚膜",
      "肽聚糖",
      "顶端结构",
      "神经毒素",
      "脂多糖",
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
        id: "ext-microbiology-ch18-mycoplasma-b001m1",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在支原体表面起抗吞噬作用的致病物质是",
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
            "荚膜",
            "支原体的荚膜（生物被膜）具有抗吞噬作用，并形成多重耐药性。原书 B1 答案第 16 题为 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch18-mycoplasma-b001m2",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "支原体的致病物质中可发挥定植作用的是",
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
            "顶端结构",
            "肺炎支原体的顶端结构（黏附素）可黏附于呼吸道或泌尿生殖道上皮细胞的黏蛋白受体上，发挥定植作用，导致宿主细胞损伤。原书 B1 答案第 17 题为 A。",
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
