import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第03章 噬菌体 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：4 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：2 题
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：9 题（须等于本文件预算 9）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 6、选择题（A1 型 9 + A2 型 1）与简答题 3，无 B 型题。
 *   本文件按 9 道预算在原书顺序内取材：名词解释取前 3 道、简答取前 2 道、选择题取 A1
 *   第 1~4 题。正确项对齐章末参考答案键号。OCR 错字与双栏错序已按微生物学医学语义
 *   恢复（如“不符食”→“不符合”、“力”→“为”等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch03-bacteriophage";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第03章 噬菌体 习题（核对PDF 第35–38页）";
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
    id: "ext-microbiology-ch03-bacteriophage-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：噬菌体",
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
        "噬菌体",
        "噬菌体是感染细菌、真菌、放线菌或螺旋体等微生物的病毒，个体微小，可通过细菌滤器，无细胞结构，只能在活的微生物细胞内复制增殖，具有严格的宿主特异性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch03-bacteriophage-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：毒性噬菌体",
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
        "毒性噬菌体",
        "能在宿主菌细胞内复制增殖，产生许多子代噬菌体，并最终裂解细菌的噬菌体，称毒性噬菌体，只有溶菌性周期。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch03-bacteriophage-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：温和噬菌体",
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
        "温和噬菌体",
        "噬菌体基因组整合于宿主菌染色体中，不产生子代噬菌体，也不引起细菌裂解，但噬菌体 DNA 随细菌基因组的复制而复制，并随细菌的分裂而分配至子代细菌的基因组中，称为温和噬菌体（溶原性噬菌体），有溶原性周期和溶菌性周期。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（映射为 a1-single），4 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch03-bacteriophage-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪一项不符合噬菌体的特性",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "只含有一种核酸",
      "具有细胞结构",
      "严格的宿主特异性",
      "可通过细菌滤器",
      "既有溶原性周期又有溶菌性周期",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "具有细胞结构",
        "噬菌体是感染微生物的病毒，无细胞结构，只含有一种核酸，可通过细菌滤器，具有严格的宿主特异性；“既有溶原性周期又有溶菌性周期”是温和噬菌体的特性，并非所有噬菌体都具备。原书 A1 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch03-bacteriophage-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "溶原性细菌是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "带有前噬菌体的细菌",
      "被毒性噬菌体感染的细菌",
      "带有 F 质粒的细菌",
      "能产生细菌素的细菌",
      "带有 R 质粒的细菌",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "带有前噬菌体的细菌",
        "带有前噬菌体（整合在细菌染色体上的噬菌体基因组）的细菌称为溶原性细菌。原书 A1 答案第 2 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch03-bacteriophage-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "噬菌体在分类上属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["原虫", "病毒", "支原体", "细菌", "真菌"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "病毒",
        "噬菌体是感染细菌、真菌、放线菌或螺旋体等微生物的病毒，在分类上属于病毒。原书 A1 答案第 3 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch03-bacteriophage-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "白喉棒状杆菌能够产生白喉毒素是因为其基因组发生了",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["转化", "溶原性转换", "接合", "基因突变", "转导"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "溶原性转换",
        "β-棒状杆菌噬菌体 DNA 携带编码白喉毒素的基因，感染无毒的白喉棒状杆菌后整合于染色体，使细菌获得产生白喉毒素的能力，这种因前噬菌体导致细菌基因型和性状改变的方式称为溶原性转换。原书 A1 答案第 4 题为 E。",
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
    id: "ext-microbiology-ch03-bacteriophage-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述噬菌体的形态结构、组成及功能。",
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
        "噬菌体的形态结构、组成及功能",
        "噬菌体在电子显微镜下有三种基本形态，即蝌蚪形、微球形和细杆形。大多数噬菌体呈蝌蚪形，由头部和尾部两部分组成：头部由蛋白质衣壳包绕核酸组成；尾部是管状结构，由一个中空的尾髓和外面包裹的尾鞘组成，尾髓具有收缩功能，可将头部的核酸注入宿主菌。尾部末端尚有尾板、尾刺和尾丝，尾板内含有溶菌酶，尾丝是噬菌体的吸附器官，能识别宿主菌体表面的特异性受体。头部和尾部连接处有尾领、尾须结构，尾领与头部装配有关。噬菌体主要由核酸和蛋白质组成：核酸是噬菌体的遗传物质；蛋白质构成头部衣壳与尾部，起保护核酸的作用，并决定噬菌体外形和表面特征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch03-bacteriophage-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：试比较毒性噬菌体和温和噬菌体的特点。",
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
        "毒性噬菌体与温和噬菌体的比较",
        "毒性噬菌体能在宿主菌细胞内复制增殖，产生许多子代噬菌体，并最终裂解细菌，只有一个溶菌性周期，包括吸附、穿入、生物合成、成熟与释放四个阶段。温和噬菌体的基因组整合于宿主菌基因组中形成前噬菌体，前噬菌体可随细菌染色体的复制而复制，并通过细菌的分裂而传给下一代，不引起细菌裂解，这种带有前噬菌体的细菌称为溶原性细菌；前噬菌体偶尔可自发地或在某些理化和生物因素的诱导下脱离宿主菌染色体而进入溶菌性周期，产生成熟的子代噬菌体，导致细菌裂解。因此，温和噬菌体有溶原性周期和溶菌性周期两个周期。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章无 —— 置空 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
