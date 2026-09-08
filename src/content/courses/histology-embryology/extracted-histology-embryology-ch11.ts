import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第11章 皮肤 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材章节等比缩放预算）==
 * - 名词解释：3 题
 * - 选择题（a1-single）：4 题（含 A2/X 型映射）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：4 题
 * - B1 配伍题：3 组、共 6 个成员
 * - 独立记分题合计：17 题（须等于本文件预算 17）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 选择题、B1 共用备选答案配伍、多选题、名词解释、
 *   简答题与论述题。本文件按 17 道预算在原书顺序内取满。多选未取（预算已满且
 *   单选/B1 已覆盖本章要点）。双栏错序已恢复题干/选项/键号对应，毛囊、黑素细胞、
 *   分层与角化等结构与数值保留，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch11-skin";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第11章 皮肤 复习思考题 习题（核对PDF 第93–99页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch11-skin-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：角质形成细胞",
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
        "角质形成细胞",
        "角质形成细胞是构成表皮的主要细胞，从基底至表面依次为基底层的基底细胞、棘层的棘细胞、颗粒层细胞、透明层和角质层细胞。这些细胞从基底层逐渐向表面推移，并合成透明角质颗粒和角蛋白丝，最终形成角蛋白，充满细胞，并使细胞完全角化。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch11-skin-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：黑素细胞",
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
        "黑素细胞",
        "黑素细胞胞体散在于基底细胞之间。HE染色细胞体呈圆形，细胞核深染而胞质透明。突起伸入基底细胞和棘细胞之间，不易辨认。电镜下，胞质内有特征性黑素体和黑素颗粒，内含黑色素，于光镜下呈黄褐色。黑色素能吸收紫外线，防止表皮深层幼稚细胞的DNA受辐射损伤。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch11-skin-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：朗格汉斯细胞",
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
        "朗格汉斯细胞",
        "朗格汉斯细胞散在分布于表皮棘层，细胞具有树枝状突起，胞质内有特征性伯贝克颗粒。在HE染色切片上细胞呈圆形，细胞核深染，细胞质清亮。朗格汉斯细胞是一种抗原呈递细胞。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（含 X 型多选映射为单选），4 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch11-skin-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "表皮中的干细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["棘细胞", "角质细胞", "朗格汉斯细胞", "梅克尔细胞", "基底细胞"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基底细胞",
        "基底细胞附着于基膜，是表皮的干细胞，不断分裂，部分子细胞分化为棘细胞。原书第11章选择题第2题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch11-skin-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "决定皮肤颜色的重要因素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["角化层厚度", "颗粒层厚度", "黑素细胞多少", "黑素颗粒的多少及分布", "黑素细胞位置的深浅"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "黑素颗粒的多少及分布",
        "皮肤颜色主要取决于黑素颗粒的多少及分布。原书第11章选择题第5题答案 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch11-skin-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "角质形成细胞之间的细胞连接是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["紧密连接", "黏合带", "桥粒", "缝隙连接", "连接复合体"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "桥粒",
        "角质形成细胞之间以大量桥粒相连，与基膜则以半桥粒相连。原书第11章选择题第8题答案 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch11-skin-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "黑素形成过程中起主要作用的成分是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["单氧化酶", "组胺酶", "酪氨酸酶", "儿茶酚胺", "过氧化物酶"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "酪氨酸酶",
        "黑色素由酪氨酸在黑素细胞内经酪氨酸酶的作用转化而成。原书第11章选择题第11题答案 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无填空题 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答/论述题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch11-skin-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述毛囊的结构。",
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
        "毛囊的结构",
        "毛囊包裹着毛根，其内层为上皮性鞘，与表皮相连续；外层为结缔组织性鞘，与真皮相连续。毛根和毛囊上皮性鞘的下端为膨大的毛球。其上皮细胞为毛母质细胞，是毛发的生长点。原书第11章简答题第1题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch11-skin-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述真皮的分层及功能特点。",
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
        "真皮的分层及功能特点",
        "真皮分为乳头层和网织层。乳头层为薄层较致密结缔组织，形成真皮乳头，有利于表皮与真皮牢固连接和从真皮获得营养；网织层为较厚的致密结缔组织，内有粗大胶原纤维束交织成网，赋予皮肤韧性和弹性。原书第11章简答题第2题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch11-skin-short003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述皮肤受损后的主要再生过程。",
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
        "皮肤受损后的主要再生过程",
        "皮肤损伤后修复过程和时间依损伤面积和深度不同而异。小面积浅表损伤，数天即可修复，不留瘢痕。较大面积和较深的损伤，先于创伤处发生凝血，随之单核细胞进入组织，并分化为巨噬细胞，清除组织碎片，同时分泌趋化因子吸引成纤维细胞和血管内皮细胞至损伤处，充填缺损部，毛细血管长入其中，产生肉芽组织，之后被瘢痕组织取代。原书第11章简答题第3题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch11-skin-short004",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "阐述厚皮肤表皮的分层结构及角化过程。",
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
        "厚皮肤表皮的分层结构及角化过程",
        "角质形成细胞是构成表皮的主要细胞。位于基底层的基底细胞为干细胞，可不断增殖，分化为棘层的棘细胞，并合成角蛋白丝，细胞向表皮表面推移，分化为颗粒层细胞，并合成透明角质颗粒，进而细胞分化为透明层和角质层细胞。角质层细胞充满角蛋白，即透明角质颗粒所含富有组氨酸的均质状物质和角蛋白丝的复合物。此时细胞完全角化，细胞连接松散，脱落后为皮屑。厚皮肤表皮由基底层、棘层、颗粒层、透明层和角质层五层组成。原书第11章论述题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，3 组、共 6 个成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch11-skin-b001",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["毛囊", "皮脂腺", "汗腺", "立毛肌", "环层小体"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch11-skin-b001m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "导管开口于表皮汗孔的是",
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
            "汗腺",
            "汗腺导管穿越表皮呈螺旋形走行，直接开口于表皮汗孔。原书第11章选择题第15题答案 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch11-skin-b001m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "导管开口于毛囊上部的是",
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
            "皮脂腺",
            "皮脂腺经导管将分泌物排入毛囊上部，或直接排到皮肤表面。原书第11章选择题第16题答案 B。",
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
    id: "ext-histology-embryology-ch11-skin-b002",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["基底细胞", "棘细胞", "颗粒层细胞", "透明层细胞", "角化层细胞"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch11-skin-b002m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "细胞呈梭形，胞质内可见许多嗜碱性颗粒，细胞核和细胞器已退化的是",
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
            "颗粒层细胞",
            "颗粒层由梭形细胞组成，细胞核与细胞器已退化，胞质内板层颗粒增多并出现强嗜碱性的透明角质颗粒。原书第11章选择题第17题答案 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch11-skin-b002m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "有增殖、分化能力的细胞是",
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
            "基底细胞",
            "基底细胞是表皮的干细胞，不断分裂，部分子细胞分化为棘细胞，具有增殖、分化能力。原书第11章选择题第18题答案 A。",
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
    id: "ext-histology-embryology-ch11-skin-b003",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["黑素细胞", "朗格汉斯细胞", "梅克尔细胞", "角化层细胞", "透明层细胞"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch11-skin-b003m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "抗原呈递细胞是",
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
            "朗格汉斯细胞",
            "朗格汉斯细胞是表皮中的抗原呈递细胞。原书第11章选择题第19题答案 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch11-skin-b003m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "内含黑素体和黑素颗粒的细胞是",
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
            "黑素细胞",
            "黑素细胞胞质内含特征性黑素体和黑素颗粒。原书第11章选择题第20题答案 A。",
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