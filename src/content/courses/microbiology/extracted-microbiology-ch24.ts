import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第24章 病毒感染的检查方法与防治原则 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：0 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：4 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：16 题（须等于本文件预算 16）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、填空题 5、选择题（A1 型 15 + A2 型 2）、B1 型 3 组
 *   （共 8 成员）与问答题 4；本文件按 16 道预算取样，名词解释、填空与问答题全取，
 *   B1 取第 1 组（18~19 题，2 成员）完整组，预算内未纳入选择题。正确项对齐章末参考答案
 *   键号（B1 18.D 19.E）。OCR 错字与双栏错序已按微生物学医学语义恢复（如 TCIDso→TCID50、
 *   沩→为、50% 组织细胞感染量 等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch24-viral-detection-and-prevention";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第24章 病毒感染的检查方法与防治原则 习题（核对PDF 第186–192页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：致细胞病变效应（CPE）",
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
        "致细胞病变效应（CPE）",
        "致细胞病变效应（CPE）：部分病毒在敏感细胞内增殖时可引起特有的细胞病变，可作为病毒增殖的指标。常见的病变有细胞变圆、胞质颗粒增多、细胞聚集、融合、坏死、溶解或脱落，形成包涵体或多核巨细胞等，不同病毒的 CPE 特征不同。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：红细胞吸附试验",
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
        "红细胞吸附试验",
        "红细胞吸附试验：带有血凝素的病毒感染细胞后，细胞膜上可出现血凝素，能与加入的脊椎动物（如豚鼠、鸡、猴等）红细胞结合，常用作含有血凝素病毒的增殖指标。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：血凝抑制试验",
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
        "血凝抑制试验",
        "血凝抑制试验：具有血凝素的病毒能凝集鸡、豚鼠和人等的红细胞，称血凝现象。这种现象能被相应抗体抑制，称血凝抑制。其原理是相应抗体与病毒结合后，阻抑了病毒表面的血凝素与红细胞的结合，常用于黏病毒、乙型脑炎病毒感染的辅助诊断及流行病学调查，也可鉴定病毒的型与亚型。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：空斑形成单位（PFU）",
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
        "空斑形成单位（PFU）",
        "空斑形成单位（plaque forming unit, PFU）：将适当稀释浓度的病毒液定量接种于敏感的单层细胞中，经一定时间培养后，覆盖薄层未凝固的琼脂于细胞上，待其凝固后继续培养，由于病毒的增殖使感染的单层细胞病变脱落，可形成肉眼可见的空斑，一个空斑即一个空斑形成单位（PFU），通常由一个感染病毒增殖所致，计数平板中空斑数可推算出样品中活病毒的数量，通常以 PFU/ml 表示。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：TCID50",
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
        "TCID50",
        "TCID50：即 50% 组织细胞感染量测定，将待测病毒液进行 10 倍系列稀释，分别接种于单层细胞，经培养后观察 CPE 等病毒增殖指标，以感染 50% 细胞的最高病毒稀释度判定终点，经统计学处理计算出 TCID50。此方法是以 CPE 作指标，判断病毒的感染性和毒力。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），本章无 —— 置空 */
const a1Items: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），5 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-fill001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "因病毒在室温中易失去活性，故所采集的标本应___，不能立即检查的标本，应置于___保存。",
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
        "低温保存；尽快送检；-70°C",
        "病毒标本应冷藏保存、快速送检，病变组织可置含抗生素的 50% 甘油缓冲盐水中低温保存，不能立即检查的标本应置于 -70°C 保存。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-fill002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "最常用的病毒培养方法是___，流感病毒最适的培养方法是___。",
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
        "细胞培养；鸡胚培养",
        "细胞培养法是病毒分离鉴定中最常用的方法；流感病毒最适的培养方法是鸡胚培养。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-fill003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "感染复数（MOI）已被普遍用于病毒感染细胞的研究中，含义是感染时___与___数量的比值。",
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
        "病毒；细胞",
        "感染复数（MOI）指感染时病毒与细胞数量的比值。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-fill004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "病毒感染的快速诊断方法包括光学显微镜下观察___、直接观察病毒可用___、检查病毒抗原可用___方法。",
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
        "包涵体；电子显微镜；免疫学",
        "病毒感染早期的快速诊断：光学显微镜下观察包涵体（CPE），直接观察病毒可用电子显微镜（免疫电镜），检查病毒抗原可用免疫学方法（如 EIA、IFA）。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-fill005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "病毒性疾病的特异性防治手段包括___免疫和___免疫，即___及细胞免疫制剂等。",
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
        "人工主动；人工被动；接种疫苗；注射抗体",
        "病毒性疾病的特异性防治包括人工主动免疫（接种疫苗）和人工被动免疫（注射抗体）及细胞免疫制剂等。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述病毒标本采集和送检的原则。",
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
        "病毒标本采集和送检的原则",
        "（1）采集急性期标本；（2）对本身带有其他微生物或易受污染的标本使用抗生素处理；（3）冷藏保存、快速送检，病变组织可置含抗生素的 50% 甘油缓冲盐水中低温保存，不能立即检查的标本，应置于 -70°C 保存；（4）血清学检查标本采集双份血清，即发病初期和病后 2~3 周内各取 1 份血清。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试述培养病毒最常使用的方法。",
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
        "培养病毒最常使用的方法",
        "细胞培养法是病毒分离鉴定中最常用的方法。可根据细胞生长的方式分为单层细胞培养和悬浮细胞培养。从细胞的来源、染色体特征及传代次数等可分为：①原代细胞，来源于动物、鸡胚或引产人胚组织的细胞，对多种病毒敏感性高，但来源困难。②二倍体细胞，在体外分裂 50~100 代后仍保持 2 倍染色体数目的单层细胞，常用于人类病毒的分离或病毒疫苗生产。③传代细胞系，由肿瘤细胞或二倍体细胞突变而来，能在体外持续传代，对病毒的敏感性稳定，但不能用来源于肿瘤的传代细胞生产疫苗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-short003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：病毒感染早期的实验室快速诊断方法有哪些？",
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
        "病毒感染早期的实验室快速诊断方法",
        "病毒感染早期的实验室快速诊断方法根据感染病毒类型的不同可选择：（1）形态学检查：①电镜和免疫电镜检查：对病毒含量多的样品可直接用电镜观察；病毒含量少可先将标本与特异抗血清混合，使病毒颗粒凝聚用免疫电镜法检查。②光学显微镜检查：观察病毒感染后的 CPE 现象，如包涵体或多核巨细胞等。（2）病毒成分检测：①病毒抗原的检测：可采用免疫学标记技术直接检测标本中的病毒抗原进行早期诊断，目前常用酶免疫测定（EIA）和免疫荧光测定（IFA）。②病毒核酸的检测：包括核酸扩增技术、核酸杂交技术、基因芯片技术和基因测序技术等，可以直接从病变标本中检出微量病毒核酸。③病毒 IgM 抗体检测：病毒感染机体后，特异性 IgM 抗体出现较早，检测病毒 IgM 抗体可辅助诊断急性病毒感染，常用的方法包括 ELISA 和 IFA。④检测早期抗原的抗体也是快速诊断的方法之一。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-short004",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：可用于预防病毒感染的疫苗有哪些类型，各有哪些特点？",
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
        "预防病毒感染的疫苗类型及特点",
        "（1）灭活疫苗：通过理化方法将具有毒力的病毒灭活后制成，灭活疫苗失去了感染性但仍保留原病毒的抗原性，在贮存和运输方面较减毒活疫苗更方便。常用的有肾综合征出血热疫苗、狂犬病疫苗、甲型肝炎疫苗、流感疫苗等。（2）减毒活疫苗：通过毒力变异或人工选择培养将毒株变为减毒株或无毒株，可在体内增殖诱生免疫应答，接种量及接种次数均比灭活疫苗少，常用的有脊髓灰质炎疫苗、流感疫苗、麻疹疫苗、腮腺炎疫苗、风疹疫苗、乙型脑炎疫苗等。（3）亚单位疫苗：是指用病毒保护性抗原如病毒包膜或衣壳的蛋白亚单位制成的不含有核酸、但能诱发机体产生免疫应答的疫苗。如 HBsAg 及狂犬病病毒刺突糖蛋白等。（4）基因工程疫苗：采用 DNA 重组技术，提取编码病毒保护性抗原基因，将其插入载体，并导入细菌、酵母菌或哺乳动物细胞中表达、纯化后制成的疫苗。如目前广泛使用的重组乙肝疫苗。（5）重组载体疫苗和核酸疫苗大多处于研制阶段，尚未进入大规模的临床应用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），1 组 × 2 成员（题组18-19；预算内未纳入后两组20-25） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch24-viral-detection-and-prevention-b001",
    order: 15,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "红细胞吸附试验",
      "血凝抑制试验",
      "补体结合试验",
      "中和试验",
      "PCR",
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
        id: "ext-microbiology-ch24-viral-detection-and-prevention-b001m1",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "适用于人群免疫情况调查的试验是",
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
            "中和试验",
            "中和试验特异性较高，常用于检测病人血清中抗体的消长情况，适用于人群免疫情况调查。原书 B1 答案第 18 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch24-viral-detection-and-prevention-b001m2",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可在体外扩增病毒核酸的试验是",
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
            "PCR",
            "PCR（聚合酶链反应）可在体外扩增病毒核酸，用于病毒核酸检测。原书 B1 答案第 19 题为 E。",
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
