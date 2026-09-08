import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生物化学与分子生物学学习指导与习题集 — 第10章 代谢整合和调节 题库提取（等比取样）
 * 来源：《生物化学与分子生物学学习指导与习题集》（人民卫生出版社，主编：周春燕）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - A1/A2 型选择题（a1-single）：9 题（其中 1 题为 A2 型病案单选，统一映射为 a1-single）
 * - 简答题（short-answer）：4 题
 * - B1 配伍题：3 组、共 9 个成员
 * - 独立记分题合计：26 题（含 B1 组成员；须等于本文件预算 26）
 * - 缺失答案：0；无法可靠提取：0（换题如实说明见下）
 * - 取材说明：原书本章依序含名词解释 11、A1 型选择题 54、A2 型选择题 4、
 *   B1 型配伍 7 组（59–79）、简答题 12。本文件按 26 道预算取材：取 4 道名词解释、
 *   9 道选择题、4 道简答、以及 3 组 B1（每组 3 个成员）。选择题按原书顺序跳过因双栏
 *   错序导致选项无法可靠复原、或源参考答案与物质代谢整合事实冲突而无法锚定唯一正确
 *   项的题目（如原书 A1 第 13 题“乙酰CoA能转变成丙酮酸”与生化事实相反、第 8/9/15
 *   题选项残缺或选项与“错误的是”题干均成立、第 57 题地震获救女性血胰岛素判定等），
 *   实取 9 道可清洗还原的题，正确项逐一对齐源参考答案（1.A 2.E 10.C 12.E 14.D 19.C
 *   33.D 51.A 及 A2 第 55 题 A）。选项顺序已随机重排并同步 correctChoiceIndex（0 起）。
 * - 恢复说明：本书为原生文本层 PDF 但双栏排版错序，题干/选项被拆散（如
 *   “乙酰CoA”“α-酮戊二酸”“磷酸烯醇式丙酮酸”“脂肪酸β-氧化”“果糖-2,6-二磷酸”
 *   等长术语被截断错位），已按物质代谢整合与器官间调节的生化/医学语义恢复；数值、
 *   缩略语（ATP、NADPH、NAD+、HMG-CoA、CoA 等）均保留原文，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "biochem-ch10-metabolic-integration";
const locatorBase =
  "《生物化学与分子生物学学习指导与习题集》第10章 代谢整合和调节 复习思考题 习题（核对原书PDF 第171–190页）";
const promptNote =
  "题干改写；原题来自用户提供的配套习题集（原生文本但双栏错序，已按医学语义恢复），未经第三方授权审核";
const answerNotice =
  "答案依据配套习题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch10-metabolic-integration-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：代谢池（metabolic pool）",
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
        "代谢池",
        "体内每一种代谢物无论其来源如何，都汇聚在一起而形成的总和称为代谢池；无论何种代谢去路，均从同一代谢池中消耗这种代谢物。代谢池体现了体内多种物质代谢相互联系、构成统一整体的特征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：关键酶（key enzyme）",
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
        "关键酶",
        "一条代谢途径中包含一系列酶催化的连锁酶促反应，其中一个或几个酶是整条途径代谢流量的限制因素，这些酶称为关键酶。关键酶催化的反应多为速度最慢且几乎不可逆的单向反应，常位于代谢途径的起始处或分支处，因而决定整条代谢途径的速度和方向，其活性与含量受到精确调节。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：别构调节（allosteric regulation）",
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
        "别构调节",
        "一些小分子代谢物（别构效应剂）通过非共价键结合在酶的调节部位（非催化部位），引起酶分子构象变化，从而改变酶活性，这种调节称为别构调节。别构调节是细胞水平快速调节的重要形式，主要用于维持能量供需平衡、协调代谢网络。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：化学修饰（chemical modification）",
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
        "化学修饰",
        "在激素作用下，通过级联反应使下游酶分子中某些氨基酸残基在其上游酶的催化下发生可逆的共价修饰，从而改变酶活性，这种调节称为化学修饰。最常见的方式是磷酸化/脱磷酸化；其反应为酶促反应、特异性强、具有级联放大效应，调节效率高，适应快速应激。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），9 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch10-metabolic-integration-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "细胞进行生理、生化活动时利用的直接供能物质是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["GTP", "葡萄糖", "脂肪酸", "UTP", "ATP"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "ATP",
        "原书 A1 型选择题答案第一题为 A，即 ATP。ATP 是机体能量储存和利用的“能量货币”，糖、脂肪和蛋白质释放的能量均以 ATP 形式储存，细胞生理、生化活动直接利用 ATP。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "为脂类合成提供还原当量的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["NADH", "ATP", "GTP", "UTP", "NADPH"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "NADPH",
        "原书 A1 型选择题答案第二题为 E，即 NADPH。体内合成代谢所需的还原当量主要由 NADPH 提供，NADPH 主要来源于葡萄糖的磷酸戊糖途径，将物质的氧化分解与还原性合成联系起来。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "糖、脂肪酸、氨基酸分解供能的共同中间产物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["甘油", "丙酮酸", "草酰乙酸", "磷酸二羟丙酮", "乙酰CoA"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "乙酰CoA",
        "原书 A1 型选择题答案第十题为 C，即乙酰CoA。糖、脂肪和蛋白质虽经不同途径分解，但有共同的中间代谢物——乙酰CoA；三羧酸循环和氧化磷酸化是三者最后分解的共同途径。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "一碳单位可联系的代谢途径是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "糖/脂肪酸",
      "糖/氨基酸",
      "糖/核苷酸",
      "脂肪酸/氨基酸",
      "氨基酸/核苷酸",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "氨基酸/核苷酸",
        "原书 A1 型选择题答案第十二题为 E，即一碳单位可联系氨基酸/核苷酸代谢。一碳单位主要来自某些氨基酸（如丝氨酸、甘氨酸）的分解，是嘌呤、嘧啶等核苷酸合成的重要原料，从而把氨基酸代谢与核苷酸代谢联系起来。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不属于乙酰CoA代谢去路的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "合成酮体",
      "合成胆固醇",
      "进入三羧酸循环",
      "转变成葡萄糖",
      "合成脂肪酸",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "转变成葡萄糖",
        "原书 A1 型选择题答案第十四题为 D，即乙酰CoA不能转变成葡萄糖。乙酰CoA的去路包括进入三羧酸循环氧化供能、合成脂肪酸、合成胆固醇、合成酮体等；由于丙酮酸脱氢酶复合体催化的反应不可逆，乙酰CoA不能逆行转变为丙酮酸，故不能净生成糖。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "使糖酵解减弱而糖异生增强的主要调节因素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "柠檬酸浓度降低",
      "异柠檬酸浓度降低",
      "乙酰CoA浓度降低",
      "果糖-2,6-二磷酸浓度增高",
      "ATP/ADP比值增高",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "ATP/ADP比值增高",
        "原书 A1 型选择题答案第十九题为 C，即 ATP/ADP 比值增高可抑制糖酵解（ATP 抑制磷酸果糖激酶-1 等）而增强糖异生。高能状态有利于机体转向糖异生储备血糖，同时减弱糖酵解产能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "机体耗氧最多的器官是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["心", "肾", "肾上腺", "肝", "脑"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脑",
        "原书 A1 型选择题答案第三十三题为 D，即脑。脑是机体耗能最大的主要器官，耗氧量约占全身耗氧量的 20%～25%，基本以葡萄糖为唯一供能物质，但在长期饥饿时可利用酮体供能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-a1008",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "短期饥饿（1～3 天）时维持血糖浓度的最主要因素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肾糖异生",
      "肝糖原分解",
      "肌糖原分解",
      "组织蛋白质分解",
      "肝糖异生",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝糖异生",
        "原书 A1 型选择题答案第五十一题为 A，即肝糖异生。短期饥饿（1～3 天）时肝糖原已基本耗尽，维持血糖的最主要途径是糖异生，其原料主要来源于骨骼肌释放入血的氨基酸，以丙氨酸和谷氨酰胺形式为主。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-a1009",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "一名 2 岁男童食用新鲜蚕豆后出现发热、恶心、呕吐，临床表现为贫血、黄疸、血红蛋白尿，追问病史其母亲曾有类似病史。可初步认定是下列哪种酶缺乏导致的遗传病",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "糖原磷酸化酶",
      "丙酮酸脱氢酶复合体",
      "糖原合酶",
      "己糖激酶",
      "葡糖-6-磷酸脱氢酶",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "葡糖-6-磷酸脱氢酶",
        "原书 A2 型选择题答案第五十五题为 A，即葡糖-6-磷酸脱氢酶（G6PD）缺乏。G6PD 缺乏致磷酸戊糖途径受阻、NADPH 生成不足，红细胞抗氧化能力下降，接触蚕豆等氧化性因素后发生溶血，出现贫血、黄疸、血红蛋白尿，属遗传性疾病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-biochem-ch10-metabolic-integration-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述糖代谢和脂代谢的相互联系。",
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
        "①葡萄糖可转变为脂肪；②脂肪大部分不能转变为糖（仅甘油可生糖）；③两者均可经乙酰CoA通过三羧酸循环供能",
        "（1）葡萄糖的分解产物乙酰CoA通过羧化生成丙二酰CoA，进而合成脂肪酸和脂肪，因此葡萄糖在体内能够转变为脂肪。（2）脂肪动员释出的脂肪酸分解生成的乙酰CoA不能转变为丙酮酸，无法异生为糖；仅脂肪的甘油部分可转变成磷酸二羟丙酮进而异生为糖，因此脂肪大部分不能转变为糖。（3）葡萄糖和脂肪均可分解生成乙酰CoA，通过三羧酸循环为机体供能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-short002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述细胞水平的物质代谢主要调节方式。",
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
        "①关键酶的别构调节；②酶的化学修饰调节；③酶量的调节（诱导与阻遏、降解）",
        "细胞水平的物质代谢主要通过关键酶活性与含量的调节实现：①关键酶的别构调节：代谢途径中的关键酶大多是别构酶，通过小分子别构效应剂与酶非共价结合改变酶活性，实现细胞的快速调节；②酶的化学修饰调节：通过酶蛋白肽链上某些氨基酸残基的可逆共价修饰（最常见磷酸化/脱磷酸化）改变酶的活性，使细胞能够快速应激；③酶量的调节：通过对酶蛋白合成的诱导与阻遏、以及酶蛋白的降解等调节细胞内酶的含量，属于较慢但持久的调节。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-short003",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述短期饥饿（1～3 天）时机体的代谢改变特点。",
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
        "①糖异生增强（原料主要来自氨基酸）；②脂肪动员加强、肝酮体生成增多，脂肪酸和酮体为肝外组织供能；③骨骼肌蛋白质分解加强，以丙氨酸和谷氨酰胺释放供糖异生",
        "短期饥饿（1～3 天）时肝糖原耗尽，胰岛素分泌极少而胰高血糖素分泌增加，机体代谢改变为：①糖代谢：糖异生增强，原料主要来源于氨基酸，血糖降低；②脂代谢：大多数组织（脑和红细胞除外）转变为以脂肪供能为主，脂肪动员加强且肝酮体生成增多，脂肪酸和酮体作为心肌、骨骼肌等的重要能源，部分酮体为脑利用；③氨基酸代谢：骨骼肌蛋白质分解加强，释放入血的氨基酸增多，以丙氨酸和谷氨酰胺形式为主，为糖异生提供原料。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-biochem-ch10-metabolic-integration-short004",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "机体在应激状态时发生哪些代谢改变？",
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
        "①血糖升高（肝糖原分解、糖异生加强，糖利用降低，保证脑和红细胞供能）；②脂肪动员加强、血浆游离脂肪酸升高；③蛋白质分解加强、尿素生成及排出增加",
        "应激时交感神经系统兴奋，肾上腺髓质和皮质分泌肾上腺素和肾上腺皮质激素增多，胰岛素分泌减少，而胰高血糖素及生长素分泌增加。代谢变化如下：①血糖升高：肝糖原分解、糖异生均加强，而糖的利用降低，引起血糖升高，以保证脑和红细胞的供能；②脂肪动员加强：血浆游离脂肪酸升高，成为心肌、骨骼肌及肾等组织的主要能量来源；③蛋白质分解加强：肌组织释出丙氨酸等氨基酸增加，尿素生成及尿素排出增加，呈负氮平衡。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，3 组 × 3 个成员（原书 59–61、64–66、70–72，依序对齐源参考答案） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-biochem-ch10-metabolic-integration-b001",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt:
      "（59～61 题共用备选答案）根据代谢途径发生的亚细胞部位选择合适的代谢途径。",
    sharedChoices: [
      "糖酵解",
      "核酸合成",
      "尿素合成",
      "胆固醇合成",
      "脂肪酸β-氧化",
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
        id: "ext-biochem-ch10-metabolic-integration-b001m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在胞质和线粒体进行",
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
            "尿素合成",
            "原书 B1 型参考答案对应第 59 题为 C，即尿素合成在胞质和线粒体进行。尿素循环的部分酶（如氨基甲酰磷酸合成酶Ⅰ）位于线粒体，另一部分酶（如精氨酸代琥珀酸合成酶、精氨酸酶）位于胞质，故该途径在两者中进行。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch10-metabolic-integration-b001m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在线粒体进行",
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
            "脂肪酸β-氧化",
            "原书 B1 型参考答案对应第 60 题为 E，即脂肪酸β-氧化在线粒体进行。脂肪酸经肉碱脂酰转移酶Ⅰ等转运进入线粒体基质后，在基质内进行的β-氧化为主要氧化途径。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch10-metabolic-integration-b001m3",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "只能在胞质中进行",
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
            "糖酵解",
            "原书 B1 型参考答案对应第 61 题为 A，即糖酵解只能在胞质中进行。糖酵解途径的酶均位于胞质，产物丙酮酸随后可进入线粒体进行有氧氧化。",
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
  {
    id: "ext-biochem-ch10-metabolic-integration-b002",
    order: 21,
    questionKind: "b1",
    status: "available",
    groupPrompt:
      "（64～66 题共用备选答案）根据功能描述选择相应的代谢循环。",
    sharedChoices: [
      "乳酸循环",
      "鸟氨酸循环",
      "三羧酸循环",
      "丙氨酸-葡萄糖循环",
      "柠檬酸-丙酮酸循环",
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
        id: "ext-biochem-ch10-metabolic-integration-b002m1",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "为细胞合成脂肪酸提供乙酰CoA",
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
            "柠檬酸-丙酮酸循环",
            "原书 B1 型参考答案对应第 64 题为 E，即柠檬酸-丙酮酸循环为细胞合成脂肪酸提供乙酰CoA。线粒体内生成的乙酰CoA通过该循环以柠檬酸形式运至胞质，再由ATP-柠檬酸裂解酶释放乙酰CoA供脂肪酸合成。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch10-metabolic-integration-b002m2",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "将肌组织中的氨以无毒形式运至肝",
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
            "丙氨酸-葡萄糖循环",
            "原书 B1 型参考答案对应第 65 题为 D，即丙氨酸-葡萄糖循环将肌组织中的氨以无毒形式运至肝。肌肉中氨基酸脱下的氨基与丙酮酸生成丙氨酸，随血入肝后脱氨基用于糖异生，尿素在肝合成，氨以无毒形式转运。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch10-metabolic-integration-b002m3",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "将体内产生的氨以无毒形式排出体外",
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
            "鸟氨酸循环",
            "原书 B1 型参考答案对应第 66 题为 B，即鸟氨酸循环将体内产生的氨以无毒形式排出体外。氨在肝内经鸟氨酸循环（尿素循环）合成尿素，随尿排出，是机体排氨的主要方式。",
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
  {
    id: "ext-biochem-ch10-metabolic-integration-b003",
    order: 24,
    questionKind: "b1",
    status: "available",
    groupPrompt:
      "（70～72 题共用备选答案）根据关键酶选择相应的代谢途径。",
    sharedChoices: [
      "丙酮酸羧化酶",
      "乙酰CoA羧化酶",
      "HMG-CoA合酶",
      "HMG-CoA还原酶",
      "HMG-CoA裂解酶",
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
        id: "ext-biochem-ch10-metabolic-integration-b003m1",
        order: 24,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "酮体生成的关键酶是",
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
            "HMG-CoA合酶",
            "原书 B1 型参考答案对应第 70 题为 C，即HMG-CoA合酶是酮体生成的关键酶。酮体在肝中由乙酰乙酰CoA经HMG-CoA合成途径生成，HMG-CoA合酶为该途径的关键酶。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch10-metabolic-integration-b003m2",
        order: 25,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "胆固醇合成的关键酶是",
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
            "HMG-CoA还原酶",
            "原书 B1 型参考答案对应第 71 题为 D，即HMG-CoA还原酶是胆固醇合成的关键酶。HMG-CoA还原酶催化HMG-CoA还原生成甲羟戊酸，是胆固醇合成的关键步骤和主要调节位点。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-biochem-ch10-metabolic-integration-b003m3",
        order: 26,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "脂肪酸合成的关键酶是",
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
            "乙酰CoA羧化酶",
            "原书 B1 型参考答案对应第 72 题为 B，即乙酰CoA羧化酶是脂肪酸合成的关键酶。乙酰CoA羧化酶催化乙酰CoA羧化生成丙二酰CoA，是脂肪酸合成的限速步骤。",
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