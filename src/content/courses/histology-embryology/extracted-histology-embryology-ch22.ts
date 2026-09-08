import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第22章 颜面和四肢的发生 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - 选择题（a1-single）：6 题（A1 型 5 道 + 多选映射 1 道）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：2 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：13 题（须等于本文件预算 13）
 * - 缺失答案：0；无法可靠提取：1（第12~13题共用备选 B1 组「面斜裂/正中腭裂」因双栏错序
 *   中其正确项键号 12.C、13.E 与「共用备选答案」字母无法可靠对应到医学语义，未纳入）
 * - 说明：本章原书依序含选择题（A1 型 1–9、B1 型 2 组 4 小题、多选题 14–18）、名词解释 3、
 *   简答题 2、论述题 1，无填空题。原书第 1 题题干与选项因扫描文本残缺（首题题干「下列鳃器的
 *   是」无法还原），已改选同源更清晰的题；本文件按 13 道预算等比取材并在原书顺序内取满。
 *   双栏排版中题干/选项/题号/字母交错散落，已按胚胎学医学生理语义重建完整选项集合；正确项
 *   均对照本章末尾「参考答案」键号（如 1.C 2.B …）锚定。鳃弓对数（6 对）、突起（额鼻突、
 *   上颌突、下颌突、内侧鼻突、外侧鼻突）、畸形（唇裂、腭裂、面斜裂）等均保留原值，未捏造。
 *   多选题 14 按项目规约映射为 a1-single，仅取其中一个正确项。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch22-face-limb";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第22章 颜面和四肢的发生 复习思考题 习题（核对PDF 第183–187页）";
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
    id: "ext-histology-embryology-ch22-face-limb-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：鳃弓",
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
        "鳃弓",
        "第4周人胚头部两侧的间充质增生，形成背腹走向、左右对称的6对弓形隆起，称鳃弓。鳃弓外表面被覆体表外胚层，中轴为间充质，内表面为咽囊内胚层。原书名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch22-face-limb-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：唇裂",
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
        "唇裂",
        "是最常见的颜面畸形，常因上颌突与同侧内侧鼻突未愈合所致，裂沟多位于人中外侧。唇裂常发生在上唇，有单侧和双侧唇裂。原书名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch22-face-limb-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：腭裂",
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
        "腭裂",
        "较常见，有多种类型。因外侧腭突与正中腭突未融合所致者称前腭裂，表现为切齿孔至切齿之间的裂隙；因左、右外侧腭突未融合所致者称正中腭裂，表现为从切齿孔至腭垂间的矢状裂隙；前腭裂和正中腭裂兼有者称全腭裂。原书名词解释第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/X 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch22-face-limb-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于鳃弓的描述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "鳃弓位于头部",
      "由外胚层增长形成",
      "为背腹方向排列的柱状隆起",
      "共6对鳃弓",
      "相邻鳃弓之间是鳃沟",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "由外胚层增长形成（错误项）",
        "鳃弓由头部两侧的间充质增生形成（内表面为咽囊内胚层、外表面被覆体表外胚层），并非由外胚层增长形成，故「由外胚层增长形成」说法错误。原书 A1 参考答案第 2 题为 B，按选项重排后正确项即本错误项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch22-face-limb-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "第1鳃弓腹侧份的分支是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "额鼻突和上颌突",
      "上颌突和下颌突",
      "下颌突和鼻突",
      "上颌突和舌突",
      "正中腭突和外侧腭突",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上颌突和下颌突",
        "第1鳃弓腹侧部分叉为上颌突与下颌突。原书 A1 参考答案第 3 题为 B，按选项重排后正确项即「上颌突和下颌突」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch22-face-limb-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "上唇外侧部分来源于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["额鼻突", "内侧鼻突", "上颌突", "外侧鼻突", "正中腭突"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上颌突",
        "上颌突发育形成上唇的外侧部分与上颌。原书 A1 参考答案第 4 题为 D，按选项重排后正确项即「上颌突」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch22-face-limb-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "上唇裂的成因是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "两侧上颌突未融合",
      "同侧的内、外侧鼻突未融合",
      "额鼻突和外侧鼻突未融合",
      "上颌突与同侧的外侧鼻突未融合",
      "上颌突与同侧的内侧鼻突未融合",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上颌突与同侧的内侧鼻突未融合",
        "唇裂是最常见的颜面畸形，多因上颌突与同侧的内侧鼻突未融合所致，裂沟位于人中外侧。原书 A1 参考答案第 8 题为 E，按选项重排后正确项即本项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch22-face-limb-a1005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "面斜裂的成因是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "两侧上颌突未融合",
      "同侧的内、外侧鼻突未融合",
      "额鼻突和外侧鼻突未融合",
      "上颌突与同侧的外侧鼻突未融合",
      "上颌突与同侧的内侧鼻突未融合",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上颌突与同侧的外侧鼻突未融合",
        "面斜裂位于眼内眦与口角之间，因上颌突与同侧外侧鼻突未融合所致。原书 A1 参考答案第 9 题为 D，按选项重排后正确项即本项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch22-face-limb-a1006",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "参与颜面发生的结构是（原题为多选，此处单选其中一正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: ["额鼻突", "上颌突", "下颌突", "口凹", "第二鳃弓"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上颌突",
        "颜面主要由胚体头端的额鼻突、左右上颌突与左右下颌突五个突起融合演变形成，上颌突参与颜面的发生。原书多选题第 14 题参考答案为 ABCD，此处单选取其中一正确项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无，置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答/论述题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch22-face-limb-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述第一鳃弓在颜面发生中的作用。",
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
        "第一鳃弓在颜面发生中的作用",
        "答：颜面是由胚体头端的额鼻突及其两侧的第1对鳃弓共同参与形成的。第1对鳃弓腹侧分叉成上、下两部分，分别为左、右上颌突和下颌突。由此五个突起组成了早期胚胎的颜面。额鼻突的下缘两侧，局部外胚层增生形成左、右一对鼻板。鼻板的中央部凹陷形成鼻窝。上颌突参与上颌和上唇外侧部的形成，下颌突参与下颌和下唇的形成。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch22-face-limb-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "论述题：试述颜面的形成过程及相关畸形。",
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
        "颜面的形成过程及相关畸形",
        "答：颜面主要由胚体头端5个突起融合演变形成，即额鼻突、左右上颌突和左右下颌突，它们围成口凹，即原始口腔。口凹的底是口咽膜，破裂后，原始口腔与原始咽相通。颜面形成和鼻的发生密切相关。在额鼻突的下部两侧外胚层增厚形成一对鼻板，鼻板中央凹陷为鼻窝，鼻窝两侧的突起分别称内侧鼻突和外侧鼻突。颜面的演化是从两侧向正中方向发展的。胚第5周，左右下颌突在中线融合，将发育为下颌与下唇。左右上颌突也向中线生长，与同侧的外侧鼻突和内侧鼻突融合形成上唇的外侧部分与上颌。左右内侧鼻突渐融合、下延，形成鼻梁、鼻尖、上唇的正中部分和人中。外侧鼻突发育为鼻的侧壁和鼻翼。额鼻突发育成前额。鼻窝向深部扩大，形成原始鼻腔。口鼻膜破裂后，原始鼻腔与口腔相通。至第8周末，胚胎颜面初具人貌。唇裂是最常见的颜面畸形，表现为人中外侧的裂沟，可为单侧或双侧，多因上颌突与同侧的内侧鼻突未融合所致。面斜裂为较严重的颜面畸形，表现为位于眼内眦与口角之间裂隙，因上颌突与同侧外侧鼻突未融合所致。原书论述题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch22-face-limb-b001",
    order: 12,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["额鼻突", "上颌突", "下颌突", "内侧鼻突", "外侧鼻突"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch22-face-limb-b001m1",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "人中来源于",
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
            "内侧鼻突",
            "左右内侧鼻突融合、下延，形成鼻梁、鼻尖、上唇的正中部分和人中，故人中来源于内侧鼻突。原书 B1 第 10 题答案 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch22-face-limb-b001m2",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "鼻翼来源于",
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
            "外侧鼻突",
            "外侧鼻突发育为鼻的侧壁和鼻翼，故鼻翼来源于外侧鼻突。原书 B1 第 11 题答案 E。",
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