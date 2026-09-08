import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第02章 细菌的生理 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：6 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：5 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：18 题（须等于本文件预算 18）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 10、选择题（A1 型 24 + A2 型 2 + B1 型 3 组 12 小题）与
 *   简答题 8，无填空题。本文件按 18 道预算在原书顺序内取材：名词解释、简答各取前 5 道；
 *   选择题取 A1 第 1~6 题；B1 取第 3 组（37~38，2 成员）完整组以凑足预算。正确项对齐
 *   章末参考答案键号。OCR 错字与双栏错序已按微生物学医学语义恢复（如沩/力→为、
 *   靛基质→吲哚试验等），数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch02-bacterial-physiology";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第02章 细菌的生理 习题（核对PDF 第26–34页）";
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
    id: "ext-microbiology-ch02-bacterial-physiology-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：培养基",
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
        "培养基",
        "培养基是由人工方法配制而成的，专供微生物生长繁殖使用的混合营养物制品，又称细菌生长繁殖所需的饲料，具有一定的湿度和 pH 值。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：热原质",
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
        "热原质",
        "热原质又称致热原，是细菌合成的一种极微量的注入人体或动物体内能引起发热反应的物质，其化学成分为脂多糖，耐高温。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：菌落",
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
        "菌落",
        "经划线的方法将细菌分散在固体培养基上，单个细菌经一定时间（18~24 小时）培养后，形成一个肉眼可见的细菌集团，称为菌落。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：细菌素",
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
        "细菌素",
        "某些细菌菌株产生的一类对近缘菌具有抗菌作用的蛋白质称为细菌素。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：消毒",
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
        "消毒",
        "消毒是指杀死物体上或环境中的病原微生物，但不一定能杀死细菌芽胞和非病原微生物的方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch02-bacterial-physiology-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "细菌生长的稳定期",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细菌繁殖数和死亡数大体相等",
      "细菌代谢速度最快",
      "细菌不形成芽胞",
      "细菌的形态、染色性、生理活性较典型",
      "细菌极少繁殖",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细菌繁殖数和死亡数大体相等",
        "稳定期细菌繁殖速度渐减、死亡数逐渐增加，两者大致平衡；此期细菌的芽胞、外毒素和抗生素等代谢产物大多产生。原书 A1 答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列监测细菌生化反应的试验中，用于检测靛基质试验的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["甲基红试验", "尿素酶试验", "柠檬酸盐利用试验", "吲哚试验", "硫化氢试验"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "吲哚试验",
        "靛基质即吲哚（I），吲哚试验用于检测细菌分解色氨酸产生吲哚的能力，是 IMViC 试验之一。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于细菌代谢产物的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["内毒素", "抗毒素", "细菌素", "外毒素", "抗生素"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抗毒素",
        "内毒素、外毒素、抗生素、细菌素均为细菌的代谢产物；抗毒素是用类毒素或外毒素免疫动物后获得的免疫血清制品，不是细菌代谢产物。原书 A1 答案第 3 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不是抗生素的范畴的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "可由真菌产生",
      "只对产生菌、有近缘关系菌有杀伤作用",
      "可由细菌产生",
      "对微生物有抑制作用",
      "可由放线菌产生",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "只对产生菌、有近缘关系菌有杀伤作用",
        "抗生素是某些微生物代谢过程中产生的能抑制或杀死某些其他微生物或癌细胞的物质，可由细菌、真菌、放线菌产生；仅对产生菌及近缘关系菌有杀伤作用的是细菌素，不属于抗生素。原书 A1 答案第 4 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "细菌代谢产物中与致病性无关的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["外毒素", "内毒素", "色素", "热原质", "侵袭性酶"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "色素",
        "外毒素、内毒素、侵袭性酶（如透明质酸酶、血浆凝固酶）及热原质均与细菌致病性有关；色素仅用于细菌的鉴别，与致病性无关。原书 A1 答案第 5 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于热原质的叙述，下列哪项是错误的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "多由革兰阴性菌产生",
      "本质是细菌细胞壁中的脂多糖",
      "注入人体内能引起发热反应",
      "高压蒸汽灭菌法可破坏热原质",
      "250°C 高温干烤可破坏热原质",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "高压蒸汽灭菌法可破坏热原质",
        "热原质耐高温，高压蒸汽灭菌法（121°C）不能破坏热原质，需 250°C 高温干烤才能破坏；热原质多由革兰阴性菌产生，本质是细胞壁中的脂多糖，注入人体可引起发热反应。原书 A1 答案第 6 题为 D。",
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

/** 问答题（short-answer），5 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch02-bacterial-physiology-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：影响细菌生长繁殖的因素有哪些？",
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
        "影响细菌生长繁殖的因素",
        "影响细菌生长繁殖的因素有：①营养物质：为细菌的新陈代谢及生长繁殖提供必要的原料和能量；②氢离子浓度（pH）：每种细菌都有一个可生长的 pH 范围及最适生长 pH，多数病原菌最适 pH 为 7.2~7.6；③温度：各类细菌对温度要求不一，病原菌多为嗜温菌，最适温度为 37°C；④气体：根据细菌代谢时对分子氧的需要与否，将细菌分为专性需氧菌、微需氧菌、兼性厌氧菌与专性厌氧菌，分离培养时应提供适宜的气体环境；⑤渗透压。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：细菌根据其代谢时对分子氧的需要不同如何分类？",
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
        "按对分子氧的需要分类",
        "①专性需氧菌：有完善的酶系统，需要分子氧作最后的受氢体以完成呼吸作用，在无游离氧的环境中不能生长；②专性厌氧菌：缺乏完善的呼吸酶系统，游离氧对其有毒性，只能进行无氧发酵，必须在无氧条件下生长；③兼性厌氧菌：在有氧和无氧环境中均能生长；④微需氧菌：在低氧压下生长良好，高氧压对其有抑制作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-short003",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述细菌的合成代谢产物及其意义。",
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
        "细菌合成代谢产物及其意义",
        "细菌在医学上具有重要意义的合成代谢产物包括：与细菌致病性有关的：①热原质，在制备生物制品和注射用水等制剂时必须使用无热原质水；②毒素与酶，细菌可产生内毒素、外毒素及侵袭性酶，与致病性密切相关。可供临床治疗用的：③抗生素，某些微生物代谢过程中产生的能抑制或杀死某些其他微生物或癌细胞的物质；④维生素，细菌能合成某些维生素，如肠道大肠埃希菌合成的 B 族维生素和维生素 K 可被人体吸收利用。可用于鉴别细菌的：⑤色素，分为脂溶性和水溶性两种，对细菌鉴别有一定意义；⑥细菌素，由某些细菌产生、仅作用于有近缘关系细菌的抗生素类物质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-short004",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：用来对细菌分类并有鉴别意义的生化试验有哪些？",
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
        "有鉴别意义的生化试验",
        "①糖代谢产物的检测：糖发酵试验、V-P 试验、甲基红试验；②简单碳源利用的检测：枸橼酸盐利用试验；③蛋白质代谢产物检测：吲哚试验、硫化氢试验、尿素分解试验等。其中吲哚（I）、甲基红（M）、VP（V）、枸橼酸盐利用（C）四种试验合称 IMViC 试验，常用于鉴定肠道杆菌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch02-bacterial-physiology-short005",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：培养基按其功能可分为几类？各有何意义？",
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
        "培养基按功能分为五类",
        "①基础培养基：含有一般微生物生长繁殖所需的基本营养物质；②营养培养基：用于培养营养要求比较苛刻的异养型微生物，还可用来富集和分离某种微生物；③选择培养基：用来将某种或某类微生物从混杂微生物群体中分离出来；④鉴别培养基：用于微生物的快速分类鉴定，以及分离和筛选产生某种代谢产物的微生物菌种；⑤厌氧培养基：用来培养厌氧微生物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（题组 37~38） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch02-bacterial-physiology-b001",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "煮沸",
      "高压蒸汽灭菌",
      "紫外线消毒",
      "巴氏消毒法",
      "滤菌器过滤",
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
        id: "ext-microbiology-ch02-bacterial-physiology-b001m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "常用生理盐水和手术器械等耐热物品的灭菌方法是",
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
            "高压蒸汽灭菌",
            "生理盐水、手术器械等耐热物品常用高压蒸汽灭菌法（121°C、15~30 分钟）灭菌，是热力灭菌中效力最强的方法。原书 B1 答案第 37 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch02-bacterial-physiology-b001m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "目前主要用于牛乳消毒的方法是",
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
            "巴氏消毒法",
            "巴氏消毒法（61.1~62.8°C、30 分钟或 71.7°C、15~30 秒）可杀灭液体中的病原菌或特定微生物而保持不耐热成分不被破坏，常用于牛奶、酒类的消毒。原书 B1 答案第 38 题为 D。",
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
