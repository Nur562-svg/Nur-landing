import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第19章 肝 的生物化学 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - A1/A2 型选择题（a1-single）：6 题（均为 A1 型单选）
 * - 简答题（short-answer）：0 题
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：11 题（含 B1 组成员；须等于本文件预算 11）
 * - 缺失答案：0；无法可靠提取：0（换题/恢复说明见下）
 * - 说明：本章原书依序含名词解释 5、A1 型选择题 18、A2 型选择题 6、
 *   B1 型配伍 3 组（25–36）、简答题 4。本文件按 11 道预算依原书顺序取材：
 *   取全部 5 道名词解释与前 6 道 A1 选择题（A1 第 1–6 题）。原书参考答案
 *   正确项为 1.C 2.D 3.A 4.E 5.A 6.E，均逐一锚定题面并随机重排选项后同步
 *   correctChoiceIndex（0 起）。本书为原生文本层 PDF 但双栏排版错序，题干/选项
 *   被拆散（如“生物卅A养”“甘気/牛磺”“胆红素转为结合胆红素”等），已按肝生物
 *   化学医学语义恢复；其中 A1 第 6 题选项 B 在源文本中作“乙酸转变为乙酸”（双栏
 *   重伤残缺、原意不可复原），因属“第二相结合反应”的判断，该错项按第一相反应
 *   语义补全为水解型代表项“酯类水解为羧酸和醇”，其余四项（硝基苯还原为苯胺、
 *   乙醇氧化为乙醛、乙酰水杨酸水解为水杨酸 = 第一相；胆红素结合葡糖醛酸 = 第二相）
 *   均与源参考答案及章节知识一致。数值、缩写（NAD+、UDPGA、ALA、PAPS、GSH、
 *   SAM 等）均保留原文，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "biochem-ch19-liver-biochem";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第19章 肝 的生物化学 复习思考题 习题（核对原书PDF 第295–302页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch19-liver-biochem-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：生物转化（biotransformation）",
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
        "生物转化",
        "生物转化是指某些代谢过程的产物（如胺类、胆红素等）、生物活性物质（如激素、神经递质）、外界进入体内的各种异物（如药物及其他化学物质）、毒物或从肠道吸收的腐败产物等在肝经代谢转变，使其生物学活性或毒性降低或消除、水溶性增强，易于从胆汁或尿中排出的过程。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch19-liver-biochem-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：胆色素（bile pigments）",
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
        "胆色素",
        "胆色素是铁卟啉类化合物的主要分解代谢产物，包括胆绿素、胆红素、胆素原和胆素。这些化合物主要随胆汁排出体外，其中胆红素居于胆色素代谢的中心。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch19-liver-biochem-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：胆汁酸的肠肝循环（enterohepatic circulation of bile acids）",
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
        "胆汁酸的肠肝循环",
        "胆汁酸的肠肝循环是指在肝细胞以胆固醇为原料合成的初级胆汁酸随胆汁排入肠腔后，约95%的胆汁酸经门静脉重吸收入肝（以结合型胆汁酸主动重吸收为主），在肝细胞内游离型胆汁酸可再重新合成为结合型胆汁酸，并同肝新合成的初级结合型胆汁酸一同再随胆汁排入肠道的循环过程。体内合成的胆汁酸不能满足饱餐后脂类消化吸收的需要，通过肠肝循环可使有限的胆汁酸库重复循环利用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch19-liver-biochem-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：初级胆汁酸（primary bile acid）",
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
        "初级胆汁酸",
        "初级胆汁酸是在肝细胞内以胆固醇为原料直接合成的胆汁酸，包括胆酸、鹅脱氧胆酸及二者分别与甘氨酸、牛磺酸结合形成的结合物。初级胆汁酸经肠菌作用脱去第7位α羟基（脱氧）后生成的为次级胆汁酸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch19-liver-biochem-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：黄疸（jaundice）",
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
        "黄疸",
        "黄疸是血清中胆红素含量过高（血浆胆红素超过 17.1μmol/L 时称为高胆红素血症）时，过多的胆红素扩散进入组织，造成组织黄染的症状。临床上常按病因分为溶血性（肝前性）、肝细胞性（肝原性）和阻塞性（肝后性）黄疸三类。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch19-liver-biochem-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "生物转化（biotransformation）是指体内某些非营养物质在肝中经代谢转变的过程。下列选项中属于生物转化的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "糖异生（使非糖物质转变为葡萄糖）",
      "酮体的生成",
      "结合胆红素的生成（胆红素与葡糖醛酸结合）",
      "蛋白质的合成",
      "甘油磷脂的生成",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "结合胆红素的生成",
        "原书 A1 型选择题第 1 题答案为 C，即结合胆红素的生成。游离胆红素在肝内与葡糖醛酸结合生成水溶性结合胆红素即属于生物转化中的第二相（结合）反应；糖异生、酮体生成、蛋白质合成、甘油磷脂生成均属正常中间代谢而非生物转化。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch19-liver-biochem-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪种物质属于需要经肝生物转化处理的物质？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脂肪",
      "激素",
      "蛋白质",
      "糖",
      "核酸",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "激素",
        "原书 A1 型选择题第 2 题答案为 D，即激素。激素属生物活性物质，需在肝内经生物转化灭活处理；脂肪、蛋白质、糖、核酸为参与正常中间代谢的营养物质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch19-liver-biochem-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "参与肝生物转化第一相反应中氧化反应的最重要酶是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "单胺氧化酶",
      "脱氢酶",
      "单加氧酶（细胞色素 P450 为组分的单加氧酶系）",
      "过氧化物酶",
      "加双氧酶",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "单加氧酶",
        "原书 A1 型选择题第 3 题答案为 A，即单加氧酶。单加氧酶系是参与肝生物转化中氧化反应最重要的酶，需要 NADPH+H+、O2 与细胞色素 P450 参与。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch19-liver-biochem-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "有些物质本身无明显毒性或活性，但在肝内经生物转化后反而可产生致癌、致突变等作用。下列哪种物质经生物转化后可产生致癌性？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "苯巴比妥",
      "乙醇",
      "黄曲霉素B1",
      "苯甲酸",
      "胆红素",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "黄曲霉素B1",
        "原书 A1 型选择题第 4 题答案为 E，即黄曲霉素B1。黄曲霉素B1 本身不直接致癌，但在肝内经细胞色素 P450 单加氧酶系代谢活化后生成环氧化物等致癌物，即生物转化的“解毒致毒双重性”。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch19-liver-biochem-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肝内参与生物转化第一相反应的酶常需下列哪种辅酶或辅助因子？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "泛酸",
      "NAD+",
      "维生素B6",
      "硫辛酸",
      "维生素B12",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "NAD+",
        "原书 A1 型选择题第 5 题答案为 A，即 NAD+。NAD+ 为脱氢酶类（肝生物转化第一相反应中氧化酶之一）的辅酶。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch19-liver-biochem-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肝生物转化反应分为第一相（氧化、还原、水解）与第二相（结合）反应。下列哪个过程属于第二相（结合）反应？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "硝基苯转变为苯胺（还原反应）",
      "酯类水解为羧酸和醇（水解反应）",
      "乙醇转变为乙醛（氧化反应）",
      "乙酰水杨酸转化为水杨酸（水解反应）",
      "胆红素转变为结合胆红素（与葡糖醛酸结合，结合反应）",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胆红素转变为结合胆红素",
        "原书 A1 型选择题第 6 题答案为 E，即胆红素转变为结合胆红素。胆红素在内质网与活性葡糖醛酸（UDPGA）结合生成结合胆红素，属于第二相（结合）反应；硝基苯还原为苯胺、乙醇氧化为乙醛、乙酰水杨酸水解为水杨酸均属第一相反应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer）：本章未取 */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题：本章未取 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];