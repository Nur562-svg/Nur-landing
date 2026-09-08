import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第6章 肌组织 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：2 题
 * - 选择题（a1-single）：11 题（A1 型 6 题 + X 型多选映射 5 题）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：1 题
 * - B1 配伍题：2 组、共 4 个成员
 * - 独立记分题合计：18 题（须等于本文件预算 18）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型选择 11、B1 型 2 组共 4 小题、X 型多选 6、名词解释 5、
 *   简答题 3、论述题 1；本文件按 18 道预算等比取材并在原书顺序内取满。X 型多选按项目
 *   规约映射为 a1-single（取其一正确项）。双栏错序已按医学语义恢复，带名（I 带/A 带/
 *   H 带/M 线/Z 线）、结构（横小管/肌质网/三联体/二联体/闰盘）与微粒组成均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch06-muscle";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第6章 肌组织 复习思考题 习题（核对PDF 第48–54页）";
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
    id: "ext-histology-embryology-ch06-muscle-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肌节",
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
        "肌节",
        "为相邻两条 Z 线之间的一段肌原纤维，一个肌节由 1/2 明带+暗带+1/2 明带组成。肌节是肌原纤维结构和功能的基本单位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch06-muscle-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：三联体",
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
        "三联体",
        "肌纤维的肌膜向细胞内凹陷形成横小管，肌质网在横小管之间纵向包绕肌原纤维形成纵小管，纵小管靠近横小管处膨大并相互连接形成终池，由横小管及其两侧相邻的终池构成的结构称为三联体。三联体的功能是将兴奋经肌膜传至肌质网膜。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch06-muscle-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "骨骼肌纤维的肌膜向胞质内凹陷形成",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["纵小管", "终池", "横小管", "肌质网", "三联体"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "横小管",
        "肌膜横向凹陷入肌质内形成横小管，位于肌原纤维明、暗带交界处，可将神经冲动传入肌细胞引起收缩。原书 A1 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch06-muscle-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肌原纤维内只有粗肌丝而无细肌丝的部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["I 带内", "相邻 Z 线之间", "H 带内", "A 带内", "Z 线处"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "H 带内",
        "H 带仅有粗肌丝，I 带仅由细肌丝构成，H 带两侧的 A 带既有粗肌丝又有细肌丝。原书 A1 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch06-muscle-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "Z 线位于肌原纤维的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["暗带中央", "暗带与明带之间", "肌节中央", "H 带中央", "明带中央"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "明带中央",
        "暗带又称 A 带，暗带中央有 H 带、H 带中央有 M 线；明带中央有一条深色的 Z 线。原书 A1 答案第 3 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch06-muscle-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于肌节的描述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "由 1/2A 带+1 带+1/2A 带组成",
      "位于相邻两条 M 线之间",
      "位于相邻两条 Z 线之间",
      "由 1 个 I 带+1 个 A 带组成",
      "位于 M 线与 Z 线之间",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "位于相邻两条 Z 线之间",
        "肌节是相邻两条 Z 线之间的一段肌原纤维，由 1/2 I 带+A 带+1/2 I 带组成，是骨骼肌纤维结构和功能的基本单位。原书 A1 答案第 4 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch06-muscle-a1005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "骨骼肌纤维收缩时",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["A 带缩短", "肌节消失", "I 带和 H 带缩短", "I 带和 A 带缩短", "A 带和 H 带缩短"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "I 带和 H 带缩短",
        "肌纤维收缩时细肌丝在粗肌丝之间向 M 线滑动，明带（I 带）缩短、H 带变窄，肌节缩短，但暗带（A 带）长度不变。原书 A1 答案第 5 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch06-muscle-a1006",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "肌原纤维上两种肌丝皆有的部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["M 线处", "I 带内", "H 带两侧的暗带部分", "A 带的中央部", "Z 线处"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "H 带两侧的暗带部分",
        "H 带两侧的 A 带部分既有粗肌丝又有细肌丝；I 带仅细肌丝，H 带仅粗肌丝。原书 A1 答案第 7 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** X 型多选映射（a1-single），5 道，排序在 a1006 之后 */
const a1XItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch06-muscle-a1007",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "组成细肌丝的蛋白质是（按单选作答，取其正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: ["肌红蛋白", "原肌球蛋白", "肌动蛋白", "肌钙蛋白", "肌球蛋白"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肌动蛋白",
        "细肌丝由肌动蛋白、原肌球蛋白和肌钙蛋白组成，粗肌丝由肌球蛋白组成；原题为多选，正确答案为 BCD，此为映射代表项。原书 X 型第 16 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch06-muscle-a1008",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "平滑肌纤维内含有（按单选作答，取其正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: ["中间丝", "密斑和密体", "肌原纤维", "粗肌丝", "细肌丝"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "密斑和密体",
        "平滑肌细胞内无肌原纤维，可见大量密斑、密体、中间丝、细肌丝和粗肌丝；原题为多选，正确答案为 ABCD，此为映射代表项。原书 X 型第 17 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch06-muscle-a1009",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "由肌质网形成的结构是（按单选作答，取其正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: ["中间连接", "横小管", "终池", "缝隙连接", "纵小管"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "纵小管",
        "肌质网由纵向的纵小管和两端膨大的终池组成；原题为多选，正确答案为 BD（纵小管、终池），此为映射代表项。原书 X 型第 18 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch06-muscle-a1010",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与骨骼肌纤维相比，心肌纤维的特点是（按单选作答，取其正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "有缝隙连接",
      "肌浆网不发达",
      "横小管较粗，位于 Z 线水平",
      "有闰盘",
      "肌质网参与形成二联体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "横小管较粗，位于 Z 线水平",
        "心肌横小管较粗、位于 Z 线水平，终池少而小，多见横小管与一侧终池形成二联体，有闰盘和缝隙连接；原题为多选，正确答案为 ABCDE（全部），此为映射代表项。原书 X 型第 19 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch06-muscle-a1011",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "心肌闰盘中含有（按单选作答，取其正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: ["紧密连接", "半桥粒", "黏着小带", "桥粒", "缝隙连接"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "缝隙连接",
        "闰盘的横向部分有黏着小带与桥粒，纵位部分存在缝隙连接，利于细胞间化学信息交流和电冲动传导；原题为多选，正确答案为 ABD，此为映射代表项。原书 X 型第 21 题。",
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

/** 简答/论述题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch06-muscle-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述骨骼肌纤维横纹的结构基础。",
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
        "明暗相间的横纹由粗细肌丝规律排列构成（I 带细肌丝、H 带粗肌丝、A 带两侧两种皆有）",
        "骨骼肌纤维的肌质内含有许多与细胞长轴平行排列的肌原纤维。每一条肌原纤维上有明暗相间的横纹，是由许多粗、细肌丝有规律地沿肌原纤维的长轴排列构成。粗肌丝位于肌节中部，两端游离，中央借 M 线固定；细肌丝位于肌节两侧，一端附着于 Z 线，另一端伸至粗肌丝之间并与之平行走行，末端游离、止于 H 带的外侧。明带（I 带）仅由细肌丝构成，H 带仅有粗肌丝，H 带两侧的暗带两种肌丝皆有。由于每条肌原纤维的明暗横纹都相应排列在同一水平，因此使骨骼肌纤维出现明暗交替的横纹。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组 × 2 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch06-muscle-b001",
    order: 15,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["肌原纤维", "肌膜", "闰盘", "粗面内质网", "肌质网"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch06-muscle-b001m1",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "属于细胞连接的是",
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
            "闰盘",
            "闰盘是心肌纤维之间的细胞连接结构，位于 Z 线水平，含黏着小带、桥粒和缝隙连接。原书 B1 第 12 题答案 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch06-muscle-b001m2",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "骨骼肌纤维内 Ca²⁺ 贮存的部位是",
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
            "肌质网",
            "肌质网膜上有钙泵和钙通道，钙泵能逆浓度差把肌质中的 Ca²⁺ 泵入肌质网内贮存。原书 B1 第 13 题答案 C。",
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
    id: "ext-histology-embryology-ch06-muscle-b002",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["H 带", "A 带", "I 带", "M 线", "Z 线"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch06-muscle-b002m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "心肌纤维的横小管位于",
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
            "Z 线",
            "心肌横小管较粗，位于 Z 线水平；骨骼肌横小管位于明、暗带交界处。原书 B1 第 14 题答案 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch06-muscle-b002m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "暗带中央有",
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
            "M 线",
            "暗带中央有浅色窄带 H 带，H 带中央有一条深色的 M 线。原书 B1 第 15 题答案 E。",
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