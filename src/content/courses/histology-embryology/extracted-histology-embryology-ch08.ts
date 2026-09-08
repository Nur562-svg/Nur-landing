import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第8章 神经系统 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - 选择题（a1-single）：12 题（A1 型 8 题 + X 型多选映射 4 题）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：2 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：20 题（须等于本文件预算 20）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型选择 13、B1 型 1 组 4 小题、X 型多选 6、名词解释 5、
 *   简答题 3、论述题 1；本文件按 20 道预算等比取材并在原书顺序内取满。X 型多选按项目
 *   规约映射为 a1-single（取其一正确项）。部分 A1 题（如皮质分层/神经元位置的判断、灰质
 *   构成）因双栏错序严重、唯一正确项无法可靠锚定，已改选同源更清晰题；B1 组备选答案
 *   字母与文字散落，已按医学语义重建组级备选并同步对齐各成员正确项，未捏造数值与结构。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch08-nervous-system";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第8章 神经系统 复习思考题 习题（核对PDF 第65–72页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch08-nervous-system-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：巨大锥体细胞",
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
        "巨大锥体细胞",
        "又称 Betz 细胞，位于大脑中央前回运动区皮质内锥体细胞层内，是胞体巨大的锥体细胞，其顶树突伸到分子层，轴突下行组成投射纤维到达脑干和脊髓。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：血-脑屏障",
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
        "血-脑屏障",
        "在脑组织与毛细血管之间，由毛细血管内皮细胞、基膜和神经胶质膜构成。脑和脊髓的毛细血管属连续型，其内皮细胞之间以紧密连接封闭，内皮外有基板、周细胞及星形胶质细胞突起的脚板围绕。血-脑屏障可阻止血液中某些物质进入神经组织，但能选择性让营养物质和代谢产物顺利通过，以维持组织内环境的相对稳定。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（a1-single），8 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "大脑皮质内没有的神经元是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["锥体细胞", "星形细胞", "浦肯野细胞", "梭形细胞", "水平细胞"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "浦肯野细胞",
        "大脑皮质由锥体细胞、星形细胞（颗粒细胞）、梭形细胞、水平细胞等组成，无浦肯野细胞（浦肯野细胞属小脑皮质）。原书 A1 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "脊髓前角运动神经元轴突终末的突触小泡内含",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["脑啡肽", "P 物质", "多巴胺", "乙酰胆碱", "去甲肾上腺素"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "乙酰胆碱",
        "脊髓前角运动神经元为胆碱能神经元，其轴突末梢突触小泡内含乙酰胆碱。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "小脑皮质颗粒层内的神经元有",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "篮状细胞和星形细胞",
      "高尔基细胞和星形细胞",
      "颗粒细胞和星形细胞",
      "颗粒细胞和高尔基细胞",
      "高尔基细胞和篮状细胞",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "颗粒细胞和高尔基细胞",
        "小脑皮质颗粒层含有密集的颗粒细胞和一些高尔基细胞；星形细胞与篮状细胞位于分子层。原书 A1 答案第 6 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "锥体细胞分布于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["脊髓灰质", "小脑皮质", "大脑皮质", "脊髓后角", "脊髓前角"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "大脑皮质",
        "锥体细胞是大脑皮质的主要神经元（小脑皮质和脊髓灰质内没有锥体细胞）。原书 A1 答案第 7 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "小脑皮质的传出神经元是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["颗粒细胞", "高尔基细胞", "星形细胞", "篮状细胞", "浦肯野细胞"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "浦肯野细胞",
        "浦肯野细胞的轴突进入小脑白质，止于小脑内部核群，是小脑唯一的传出纤维。原书 A1 答案第 8 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1006",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于浦肯野细胞的描述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "树突分支茂密呈扇形展开",
      "胞体位于皮质最深层",
      "树突表面树突棘极多",
      "是小脑皮质中最大的神经元",
      "轴突构成小脑的传出纤维",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胞体位于皮质最深层",
        "浦肯野细胞胞体位于小脑皮质中层的浦肯野细胞层（最深层为颗粒层），并非位于最深层；它是小脑皮质最大的神经元，树突分支繁密呈扇形展开。原书 A1 答案第 9 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1007",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "小脑皮质由浅至深依次分为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "颗粒层、浦肯野细胞层和分子层",
      "分子层、颗粒层和浦肯野细胞层",
      "颗粒层、锥体层和分子层",
      "分子层、浦肯野细胞层和颗粒层",
      "分子层、颗粒层和锥体层",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "分子层、浦肯野细胞层和颗粒层",
        "小脑皮质由浅至深分为分子层、浦肯野细胞层和颗粒层三层。原书 A1 答案第 11 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1008",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "大脑皮质中的大锥体细胞主要位于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["外锥体细胞层", "内颗粒层", "多形细胞层", "内锥体细胞层", "外颗粒层"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "内锥体细胞层",
        "内锥体细胞层（第5层）由大、中型锥体细胞组成，中央前回有巨大的 Betz 细胞。原书 A1 答案第 12 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** X 型多选映射（a1-single），4 道，排序在 a1008 之后 */
const a1XItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1009",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "脊神经节神经元的结构特征是（按单选作答，取其正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "为双极神经元",
      "胞体周围无神经胶质细胞",
      "为假单极神经元",
      "胞体发出的轴突在附近呈 T 形分叉",
      "胞体大小不等，成群分布",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "为假单极神经元",
        "脊神经节内含许多假单极神经元（感觉神经元），胞体大小不等、成群分布，其突起在附近呈 T 形分叉，胞体外有卫星细胞包裹；原题为多选，正确答案为 ABC，此为映射代表项。原书 X 型第 18 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1010",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与脊神经节和脑神经节相比，自主神经节的特点是（按单选作答，取其正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "神经元轴突终末形成内脏运动神经末梢",
      "节细胞大部分为多极神经元",
      "神经纤维多无髓鞘",
      "神经元均为去甲肾上腺素能神经元",
      "卫星细胞少",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "神经纤维多无髓鞘",
        "自主神经节内神经纤维多为无髓神经纤维，卫星细胞数量少，节细胞主要是多极运动神经元，其轴突终末形成内脏运动神经末梢（「均为去甲肾上腺素能神经元」说法错误）；原题为多选，正确答案为 ACDE，此为映射代表项。原书 X 型第 19 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1011",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于脊髓灰质神经元的描述，正确的是（按单选作答，取其正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "侧角内的是内脏运动神经元",
      "后角内的是中间神经元",
      "前角内的大多是躯体运动神经元",
      "运动神经元都是胆碱能神经元",
      "都是多极神经元",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "运动神经元都是胆碱能神经元",
        "脊髓灰质前角为躯体运动神经元、侧角为内脏运动神经元、后角为中间神经元，运动神经元多为胆碱能；原题为多选，正确答案为 ABCDE（全部），此为映射代表项。原书 X 型第 20 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-a1012",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "构成血-脑脊液屏障的成分有（按单选作答，取其正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: ["软膜", "内皮基膜", "神经胶质膜", "连续型毛细血管内皮细胞", "紧密连接"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "连续型毛细血管内皮细胞",
        "血-脑屏障由连续型毛细血管内皮细胞、内皮基膜（基板）和神经胶质膜构成，内皮细胞间以紧密连接封闭；原题为多选，正确答案为 ABCD（软膜不参与），此为映射代表项。原书 X 型第 22 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），0 道（本章无填空题） */
const fillItems: readonly AssessmentItemDefinition[] = [
  /* 本章原书无「填空题」题型，故为空数组 */
];

/** 简答/论述题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch08-nervous-system-short001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述脊髓灰质的结构。",
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
        "脊髓中央蝴蝶形灰质（前角+侧角+后角），周围为白质",
        "脊髓中央有蝴蝶形的灰质，周围是白质。脊髓灰质分前角、后角和侧角（胸腰段脊髓）。(1)前角内有：①α神经元胞体大、轴突较粗，其末梢分布到骨骼肌（梭外肌）；②γ神经元胞体较小、轴突较细，支配肌梭的梭内肌纤维。(2)侧角内的神经元是交感神经系统的节前神经元，其轴突终止于交感神经节。(3)后角内有：①束细胞的轴突长，在白质内形成各种上行纤维束，至脑干、小脑和丘脑；②中间神经元轴突长短不一，但都不离开脊髓。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch08-nervous-system-short002",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "比较脊神经节和自主神经节的结构特点。",
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
        "脊神经节＝假单极感觉神经元、胞体成群、T 形分支、卫星细胞多；自主神经节＝节后多极运动神经元、胞体散在偏位、节前+节后纤维",
        "(1)脊神经节内含许多假单极神经元（感觉神经元）胞体和平行排列的神经纤维束，胞体往往被分隔成群。神经元胞体呈圆形或卵圆形、大小不等，大的染色浅、小的染色深；胞核圆形位于中央，核仁明显，胞质内尼氏体细小分散。从胞体发出的突起根部在胞体附近盘曲，然后呈 T 形分支，一支走向中枢（中枢突），另一支（周围突）经脊神经分布到周围组织和器官，其终末分支形成感觉神经末梢。(2)自主神经节内含许多节后神经元，属多极运动神经元。胞体大小相近但一般较感觉神经元小、散在分布，胞核常偏位于细胞一侧，部分细胞有双胞核，胞质内尼氏体呈颗粒状、均匀分布。节后神经元发出节后纤维，其末梢支配平滑肌、心肌和腺的活动，即内脏运动神经末梢。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 4 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch08-nervous-system-b001",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["中间神经元", "假单极神经元", "浦肯野细胞", "躯体运动神经元", "多极神经元"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch08-nervous-system-b001m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "脊髓灰质内支配骨骼肌收缩的神经元是",
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
            "躯体运动神经元",
            "脊髓前角 α 神经元为躯体运动神经元，胞体大、轴突粗，分布到骨骼肌（梭外肌），支配骨骼肌收缩。原书 B1 第 14 题（双栏错序，按医学语义重建，备选为躯体运动神经元）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch08-nervous-system-b001m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "脊神经节的神经元为",
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
            "假单极神经元",
            "脊神经节是感觉神经节，内含许多假单极神经元（感觉神经元）胞体群。原书 B1 第 15 题答案 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch08-nervous-system-b001m3",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "自主神经节的神经元为",
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
            "多极神经元",
            "自主神经节内的节细胞主要是自主神经系统的节后神经元，属多极运动神经元。原书 B1 第 16 题答案 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch08-nervous-system-b001m4",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "其轴突构成小脑皮质唯一传出纤维的细胞是",
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
            "浦肯野细胞",
            "浦肯野细胞的轴突自胞体底部发出、进入小脑白质，止于小脑内部核群，是小脑唯一的传出纤维。原书 B1 第 17 题答案 A。",
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

/* caseItems 为空数组（本章无病例题） */
const caseItems: readonly AssessmentItemDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...a1XItems,
  ...fillItems,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];