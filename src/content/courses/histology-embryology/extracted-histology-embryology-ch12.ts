import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第12章 眼与耳 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材章节等比缩放预算）==
 * - 名词解释：4 题
 * - 选择题（a1-single）：12 题（含 A2/X 型映射）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：4 题
 * - B1 配伍题：2 组、共 4 个成员
 * - 独立记分题合计：24 题（须等于本文件预算 24）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 选择题、B1 共用备选答案配伍、多选题、名词解释、
 *   简答题与论述题。本文件按 24 道预算在原书顺序内取满。多选未取（预算已满且
 *   单选/B1 已覆盖本章要点）。双栏错序已恢复题干/选项/键号对应，角膜分层、房水
 *   产生、视网膜四层、膜蜗管三壁、听弦变化等结构与数值保留，未捏造。
 *   原书第20 题（关于血管纹特点，错误的是）正确项 C 在双栏错序中未能完整恢复，
 *   故改选其他同源清晰题，缺失如实记录。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch12-eye-ear";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第12章 眼与耳 复习思考题 习题（核对PDF 第100–108页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch12-eye-ear-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：角膜基质",
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
        "角膜基质",
        "角膜基质约占角膜全厚度的90%，主要成分为多层与表面平行的胶原板层，含较多水分。胶原板层由大量胶原原纤维平行排列而成，相邻板层的纤维排列方向互相垂直，之间散在分布扁平多突起的成纤维细胞，能产生基质和纤维，参与角膜损伤的修复。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：视网膜色素上皮",
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
        "视网膜色素上皮",
        "单层立方上皮，基底面紧贴玻璃膜。细胞顶部有大突起伸入视细胞的外节之间。胞质内含大量粗大的黑素颗粒和吞噬体。细胞侧面有紧密连接。具有保护视细胞、稳定视网膜的内环境、贮存维生素A、营养神经层和吞噬视细胞脱落物等功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：鼓膜",
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
        "鼓膜",
        "为半透明薄膜，分隔外耳道与中耳。鼓膜分三层：外层为复层扁平上皮，与外耳道的表皮连续；中层主要由胶原纤维束组成，与鼓膜的振动有关；内层为黏膜层，由单层扁平上皮和薄层疏松结缔组织构成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：螺旋器",
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
        "螺旋器",
        "螺旋器（柯蒂氏器）是听觉感受器，为基底膜上高度分化的结构，呈螺旋状走行，由支持细胞和毛细胞组成。支持细胞主要有柱细胞和指细胞。毛细胞是感受听觉刺激的上皮细胞，坐落于指细胞顶部的凹陷内。基底膜里有听弦。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型选择题（含 A2/X 型映射为单选），12 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "角膜各层中与骨板结构类似的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["角膜上皮", "前界层", "角膜基质", "后界层", "角膜内皮"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "角膜基质",
        "角膜基质含多层与表面平行、相邻板层纤维方向互相垂直的胶原板层，结构类似骨板（骨密质层板状排列），是角膜最厚的一层。原书第12章选择题第1题答案 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于角膜缘上皮，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细胞层数通常会增多至10层以上",
      "上皮内含有杯状细胞",
      "基底层细胞为干细胞",
      "上皮内含有黑素细胞",
      "细胞较小，核深染",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上皮内含有杯状细胞",
        "角膜缘上皮层数增多至10余层、基底层细胞为干细胞（可增殖移行补充角膜基底层细胞）、含黑素细胞且细胞较小核深染，但不含杯状细胞。原书第12章选择题第3题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于虹膜，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "为环形带状薄膜",
      "虹膜基质含大量黑素细胞",
      "虹膜不含血管和神经",
      "虹膜上皮为视网膜盲部",
      "瞳孔开大肌由上皮特化而成",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "虹膜不含血管和神经",
        "虹膜基质为富含血管和黑素细胞的疏松结缔组织，含血管神经；虹膜上皮为视网膜盲部，瞳孔括约肌、开大肌由虹膜上皮特化（肌上皮细胞）而成。原书第12章选择题第4题答案 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于睫状肌，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "属于平滑肌",
      "附着于巩膜距或其附近",
      "肌纤维有三种走向",
      "参与调节晶状体曲度",
      "收缩时导致睫状体后缩",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "收缩时导致睫状体后缩",
        "睫状肌为平滑肌，有环行、放射状和纵行三种走向，附着于巩膜距或其附近，收缩时睫状体突向前方内侧、睫状小带松弛，借以调节晶状体曲度；并不会导致睫状体后缩。原书第12章选择题第5题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "分泌房水的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["角膜上皮", "角膜内皮", "晶状体上皮", "虹膜色素上皮", "睫状体非色素上皮"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "睫状体非色素上皮",
        "睫状体上皮内层为非色素上皮细胞，分泌房水。原书第12章选择题第6题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "视网膜色素上皮",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "为单层扁平上皮",
      "易与脉络膜分离",
      "游离面有大量纤毛",
      "胞质内含大量粗大的黑素颗粒和吞噬体",
      "能合成维生素A",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胞质内含大量粗大的黑素颗粒和吞噬体",
        "视网膜色素上皮为单层立方或矮柱状上皮（而非扁平），细胞顶部有突起伸入视细胞外节之间，胞质内含大量黑素颗粒和吞噬体，可贮存维生素A（而非合成）。原书第12章选择题第7题答案 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "将视网膜的信息传递到大脑的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["双极细胞", "水平细胞", "节细胞", "无长突细胞", "弥散双极细胞"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "节细胞",
        "节细胞轴突向眼球后极汇聚形成视神经离开眼球，将视觉信息传递到大脑。原书第12章选择题第10题答案 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1008",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "视网膜的主要神经胶质细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "星形胶质细胞",
      "少突胶质细胞",
      "小胶质细胞",
      "放射状胶质细胞",
      "室管膜细胞",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "放射状胶质细胞",
        "放射状胶质细胞又称米勒细胞，是视网膜内特有的神经胶质细胞，几乎贯穿整个视网膜。原书第12章选择题第12题答案 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1009",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列无血管分布的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["角膜", "巩膜", "脉络膜", "虹膜", "视网膜"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "角膜",
        "角膜透明，无血管分布，其营养依靠房水及泪液等供给。原书第12章选择题第13题答案 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1010",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "眼睑结构由前向后依次为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "皮肤—皮下组织—睑板—睑结膜—肌层",
      "皮肤—皮下组织—肌层—睑板—睑结膜",
      "皮肤—皮下组织—肌层—睑结膜—睑板",
      "皮肤—皮下组织—睑结膜—睑板—肌层",
      "睑板—皮肤—皮下组织—肌层—睑结膜",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "皮肤—皮下组织—肌层—睑板—睑结膜",
        "眼睑由前向后分为皮肤、皮下组织、肌层（主要为眼轮匝肌和提上睑肌）、睑板（致密结缔组织支架，含睑板腺）和睑结膜五层。原书第12章选择题第15题答案 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1011",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于听弦，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "从蜗底到蜗顶，听弦逐渐变短",
      "从蜗底到蜗顶，听弦逐渐变长",
      "从蜗底到蜗顶，听弦长度不变",
      "蜗底和蜗顶处的听弦短，两者之间的听弦长",
      "蜗底和蜗顶处的听弦长，两者之间的听弦短",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "从蜗底到蜗顶，听弦逐渐变长",
        "基底膜内的听弦从蜗底到蜗顶逐渐变长，蜗底听弦短（感高频声），蜗顶听弦长（感低频声）。原书第12章选择题第18题答案 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-a1012",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于螺旋器，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "位于膜蜗管的基底膜上",
      "每个耳蜗中的螺旋器为连续性的整体",
      "上皮由毛细胞和支持细胞组成",
      "内毛细胞排成3~4列，外毛细胞排成1列",
      "毛细胞的游离面有规则排列的静纤毛",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "内毛细胞排成3~4列，外毛细胞排成1列",
        "螺旋器由支持细胞和毛细胞组成，其中内毛细胞排成1列、外毛细胞排成3~4列，题干所述恰好颠倒。原书第12章选择题第19题答案 D。",
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
    id: "ext-histology-embryology-ch12-eye-ear-short001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述睫状体的结构和功能。",
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
        "睫状体的结构和功能",
        "结构：睫状体由睫状肌、基质和上皮组成。睫状肌为平滑肌，有环行、放射状和纵行三种走向。睫状体基质为富含血管和黑素细胞的结缔组织。上皮由两层细胞组成，外层为立方形色素上皮细胞，内层为矮柱状非色素上皮细胞，可分泌房水，并产生构成睫状小带和玻璃体的生化成分。功能：①分泌房水；②睫状肌收缩时，睫状体突向前方内侧，睫状小带松弛，反之则紧张，借此改变晶状体的位置和曲度，从而调节焦距。原书第12章简答题第1题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-short002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述壶腹嵴的结构和功能。",
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
        "壶腹嵴的结构和功能",
        "结构：壶腹嵴是指膜壶腹内局部黏膜增厚呈嵴样的突起，表面覆以高柱状上皮，内含支持细胞和毛细胞。支持细胞分泌的糖蛋白形成圆锥形胶质的壶腹帽。前庭神经中的传入纤维末梢分布于毛细胞的基部。功能：能感受头部旋转运动开始和终止时的刺激。由于3个半规管互相垂直排列，所以不管身体或头部在哪个方向旋转，都会有半规管内淋巴流动使壶腹帽倾斜，刺激毛细胞产生兴奋，经前庭神经传入中枢。原书第12章简答题第2题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-short003",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述视网膜结构的分层。",
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
        "视网膜结构的四层",
        "视网膜从外向内可分为四层。(1)色素上皮层：最外层，单层立方或矮柱状上皮，细胞基底部附着于玻璃膜，细胞顶部与视细胞相接触并有大量突起伸入其中，但两者间无牢固连接结构，视网膜脱离常发生在这两者之间；胞质内含大量黑素颗粒和吞噬体，具有保护视细胞、稳定内环境、贮存维生素A、营养神经层和吞噬视细胞脱落物等功能。(2)视细胞层：视细胞是感光神经元，分胞体、外突（树突）和内突（轴突）三部分；外突分内节（合成蛋白质，含线粒体、粗面内质网和高尔基复合体）和外节（感光部位，含平行层叠的扁平状膜盘），内突末端主要与双极细胞形成突触；分视杆细胞和视锥细胞。(3)双极细胞层：双极细胞是连接视细胞和节细胞的纵向中间神经元，本层还有水平细胞、无长突细胞和网间细胞等中间神经元，构成局部环路。(4)节细胞层：节细胞是具有长轴突的多极神经元，其树突主要与双极细胞形成突触，轴突向眼球后极汇聚形成视神经离开眼球。原书第12章论述题第1题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch12-eye-ear-short004",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述膜蜗管的结构和功能。",
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
        "膜蜗管的结构和功能",
        "膜蜗管为螺旋形膜性管道，横切面呈三角形，有上、外侧和下三个壁。上壁：为菲薄的前庭膜，由两层单层扁平上皮夹一层基板组成，呈外高内低的斜行走向。外侧壁：上皮为特殊的含毛细血管的复层上皮，称血管纹，可产生内淋巴，上皮下方为增厚的骨膜，称螺旋韧带。下壁：由内侧的骨螺旋板和外侧的膜螺旋板共同构成。骨螺旋板是蜗轴骨组织向外延伸形成的螺旋形薄板；膜螺旋板由两层上皮夹一层基膜构成，朝向膜蜗管的上皮为单层柱状，并局部膨隆形成螺旋器。螺旋器由支持细胞和毛细胞组成，呈螺旋形，是听觉感受器。原书第12章论述题第2题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组、共 4 个成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch12-eye-ear-b001",
    order: 21,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "单层扁平上皮",
      "单层立方上皮",
      "单层柱状上皮",
      "复层柱状上皮",
      "复层扁平上皮",
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
        id: "ext-histology-embryology-ch12-eye-ear-b001m1",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "角膜上皮是",
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
            "复层扁平上皮",
            "角膜上皮为未角化的复层扁平上皮，内有丰富的游离神经末梢。原书第12章选择题第23题答案 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch12-eye-ear-b001m2",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "睑结膜上皮是",
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
            "复层柱状上皮",
            "睑结膜为薄层黏膜，上皮为复层柱状，含杯状细胞。原书第12章选择题第24题答案 D。",
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
    id: "ext-histology-embryology-ch12-eye-ear-b002",
    order: 23,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["睫状体", "虹膜", "脉络膜", "前庭膜", "血管纹"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch12-eye-ear-b002m1",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "产生房水的是",
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
            "睫状体",
            "睫状体上皮内层的非色素上皮细胞分泌房水。原书第12章选择题第25题答案 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch12-eye-ear-b002m2",
        order: 24,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "产生内淋巴的是",
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
            "血管纹",
            "膜蜗管外侧壁上皮为含毛细血管的复层上皮，称血管纹，可产生内淋巴。原书第12章选择题第26题答案 E。",
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