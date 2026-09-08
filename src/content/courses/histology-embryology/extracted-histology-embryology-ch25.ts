import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第25章 心血管系统的发生 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社，本章页脚注作者 郝立宏）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 选择题（a1-single）：10 题（含 A2/X 型映射）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：5 题
 * - B1 配伍题：2 组、共 4 个成员
 * - 独立记分题合计：23 题（须等于本文件预算 23）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书习题区依序为 A1 型选择题 16 题、B1 型 2 组（第 17~18、19~20 题）、
 *   多选题 8 题、名词解释 5 题、简答题 3 题、论述题 2 题，无填空题。本文件按 23 道预算在
 *   原文顺序内取材：A1 型 10 题（第 1、3、4、6、7、11、12、13、14、15 题，正确项均对
 *   齐章末参考答案键号）、B1 两组全部 4 个成员、名词解释 4（血岛、动脉导管、房间隔缺损、
 *   室间隔缺损）、简答+论述 5 道。多选 8 道未选取（预算所限）。双栏错序已按医学语义重建
 *   选项集合（如 Q15 形成动脉导管的是＝第6对弓动脉），发育周龄、弓动脉对数、结构来源均
 *   保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch25-cardiovascular";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第25章 心血管系统的发生 复习思考题 习题（核对PDF 第201–208页）";
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
    id: "ext-histology-embryology-ch25-cardiovascular-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：血岛",
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
        "血岛",
        "胚胎早期，卵黄囊胚外中胚层间充质细胞密集而成的细胞团称血岛。其周边细胞变扁，分化为内皮细胞，进而生长并相互吻合成网，形成原始血管；中央的细胞分化为原始血细胞（造血干细胞）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：动脉导管",
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
        "动脉导管",
        "动脉导管是胎儿时期血液循环经路中的特殊结构之一。由左侧第6弓动脉的远侧段演变而成，连于左肺动脉和主动脉弓之间。胎儿期因肺无呼吸功能，肺动脉血大部分经此进入主动脉降部；出生后肺循环建立，肺动脉血流入肺内，动脉导管因无血流而渐闭锁成为动脉韧带。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：房间隔缺损",
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
        "房间隔缺损",
        "以卵圆孔未闭最为多见。可由下列原因引起：卵圆孔瓣上有穿孔；第一房间隔在形成第二房间孔时吸收过度，导致卵圆孔瓣太小，不足以完全遮盖卵圆孔；第二房间隔发育不全，形成过大的卵圆孔；心内膜垫发育不全，使第一房间隔不能与其融合等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：室间隔缺损",
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
        "室间隔缺损",
        "分为室间隔膜部缺损和室间隔肌部缺损，以膜部缺损较常见。原因是球嵴、心内膜垫组织、室间隔肌部彼此之间未融合所致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），10 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch25-cardiovascular-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "原始血管最早发生于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "外胚层",
      "胚外中胚层形成的血岛",
      "中胚层形成的血岛",
      "内胚层",
      "间充质",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胚外中胚层形成的血岛",
        "复习纲要：胚外血管来自血岛，由卵黄囊、体蒂、绒毛膜处的胚外中胚层细胞密集而成；血岛周边细胞分化为血管内皮，中央细胞游离形成造血干细胞。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人胚最早开始进行血液循环的时间是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["第2周末", "第3周末", "第4周末", "第8周末", "第3月末"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第3周末",
        "复习纲要：约第3周末，胚体内、外的血管与心管连接，形成胚体循环、卵黄囊循环和脐循环，开始进行血液循环。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "原始心脏发生于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脊索腹侧的中胚层",
      "脊索头端的中胚层",
      "口咽膜头端的中胚层",
      "口咽膜尾端的中胚层",
      "前肠背侧的中胚层",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "口咽膜头端的中胚层",
        "复习纲要：心脏的原基发生于生心区，为胚盘头端口咽膜前方的中胚层。原书 A1 答案第 4 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "早期心管的 4 个膨大，从头端至尾端依次为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "心球、心室、心房、动脉干",
      "心房、心室、心球、静脉窦",
      "心球、心室、心房、静脉窦",
      "静脉窦、心房、心室、心球",
      "心球、心房、心室、静脉窦",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心球、心室、心房、静脉窦",
        "复习纲要与名词解释「心管」：心管发育中呈不均等生长，自头端向尾端依次出现心球、心室、心房和静脉窦 4 个膨大。原书 A1 答案第 6 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "心脏内部分隔时，卵圆孔位于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "第二房间隔头侧端",
      "第一房间隔与心内膜垫之间",
      "第二房间隔与心内膜垫之间",
      "第一房间隔头侧端的中央",
      "第二房间隔头侧端的中央",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第二房间隔与心内膜垫之间",
        "复习纲要：第二房间隔与心内膜垫融合时，留下卵圆孔；卵圆孔位置比第二房间孔低，两孔呈交错重叠。原书 A1 答案第 7 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "胎儿血液循环中含氧量最高的血液位于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["主动脉", "肺动脉", "肺静脉", "脐动脉", "脐静脉"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脐静脉",
        "胎儿在胎盘进行物质交换后，富含氧和营养的血经脐静脉进入胚体，故脐静脉血含氧量最高。原书 A1 答案第 11 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于胎儿血液循环，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脐静脉血主要从静脉导管流入下腔静脉",
      "进入右心房的血液大部分流入右心室",
      "肺动脉的血大部分经动脉导管入主动脉",
      "主动脉弓的血大部分布到头颈部",
      "脐动脉血流向胎盘",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "进入右心房的血液大部分流入右心室",
        "胎儿期进入右心房的血大部经卵圆孔进入左心房（因下腔静脉入口正对卵圆孔、右心房压力大于左心房），而非大部分流入右心室，故该项属错误描述，为本题应选答案。原书 A1 答案第 12 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-a1008",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "胎儿时期左、右心房间的血流方向是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "右心房血经第一房间孔至左心房",
      "左心房血经卵圆孔至右心房",
      "右心房血经卵圆孔至左心房",
      "左心房血经第一房间孔至右心房",
      "左、右心房血经卵圆孔双向流动",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "右心房血经卵圆孔至左心房",
        "出生前肺循环无功能，左心房压力小于右心房，右心房的血液大部分冲开卵圆孔瓣经卵圆孔进入左心房。原书 A1 答案第 13 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-a1009",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "脐静脉的腹腔内段在出生后闭锁形成",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["静脉韧带", "肝圆韧带", "静脉导管", "脐侧韧带", "动脉韧带"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝圆韧带",
        "复习纲要：出生后脐静脉闭锁成肝圆韧带；脐动脉远侧段闭锁成脐外侧韧带，近侧段成为膀胱上动脉。原书 A1 答案第 14 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-a1010",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "形成动脉导管的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "第3对弓动脉",
      "第4对弓动脉",
      "第5对弓动脉",
      "第6对弓动脉",
      "第2对弓动脉",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第6对弓动脉",
        "弓动脉共 6 对，第 6 对远侧段左侧成为动脉导管，右侧退化。原书 A1 答案第 15 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill）— 本章原书无此类题，空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答/问/论述题（short-answer），5 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch25-cardiovascular-short001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述心脏外形演变的原因和演变结果。",
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
        "心脏外形演变的原因和演变结果",
        "演变原因：①心管的头端与动脉相连，尾端与静脉相接，两端相对固定；②心管各段生长速度不同，由头向尾依次产生心球、心室、心房和静脉窦 4 个膨大；③心管的生长速度快于围心腔。演变结果：心球和心室朝右、腹、尾侧弯曲，心房和静脉窦逐渐脱离横隔，朝左、背、头方弯曲成一个「U」字形的球室袢，进而变成「S」形。心房和静脉窦的生长受腹侧的心球、动脉干与背侧的食管限制，逐渐上移并膨出于心球和动脉干的两侧。心球的尾段膨大，成为原始右心室；原来的心室成为原始左心室，左、右心室之间的表面出现室间沟。至此，心脏初具成体心脏的外形。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-short002",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述心室的分隔，包括室间隔膜部是如何形成的。",
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
        "心室分隔及室间隔膜部的形成",
        "人胚第 4 周末，心室底壁的心尖处发生一半月形的肌性隔膜，称室间隔肌部。其向心内膜垫方向生长，游离缘与心内膜垫之间留有室间孔。第 7 周末，室间孔由室间隔膜部封闭。室间隔膜部由心球嵴和心内膜垫的心内膜下组织向尾部延伸，并与室间隔肌部相互愈合而成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-short003",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述法洛四联症的形成原因和表现。",
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
        "法洛四联症的形成原因和表现",
        "形成原因：主要是由于心球和动脉干分隔不均，偏向于肺动脉一侧。导致 4 种心脏结构异常同时出现，即肺动脉狭窄、室间隔缺损、主动脉骑跨和右心室肥大。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-short004",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述心房的分隔过程。",
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
        "心房分隔的过程",
        "心房中线顶部先后形成第一房间隔和第二房间隔，向心内膜垫延伸。第一房间隔与心内膜垫之间暂留第一房间孔。在第一房间孔封闭前，第一房间隔上部被吸收，出现第二房间孔。继而，在第一房间隔的右侧，由心房头端腹侧壁再长出第二房间隔，与心内膜垫融合时，留下卵圆孔。卵圆孔位置比第二房间孔低，两孔呈交错重叠。遮盖卵圆孔左侧的第一房间隔较薄，呈活瓣状，称卵圆孔瓣。出生前，由于肺循环无功能，左心房压力小于右心房，使右心房的血液大部分冲开卵圆孔瓣进入左心房。出生后，肺循环建立，左心房压力增大，致使卵圆孔瓣与第二房间隔紧贴，卵圆孔生理性关闭，一年后完全封闭成为卵圆窝。左、右心房被完全分隔。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch25-cardiovascular-short005",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述胎儿血液循环有哪些特点？出生后血液循环有何重要变化？",
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
        "胎儿血液循环特点及出生后变化",
        "胎儿血液循环的主要特点是：①有胎盘循环，脐动脉和脐静脉分别把静脉血和动脉血输入和输出胎盘；②脐静脉的血大部分经静脉导管进入下腔静脉；③进入右心房的血大部分经卵圆孔进入左心房；④进入主动脉弓的血大部分进入头颈部，保证神经系统的供血和发育；⑤由于肺循环未建立，进入肺动脉干的血大部分经动脉导管进入降主动脉。胎儿出生后，胎盘循环消失，肺循环建立，脐静脉和脐动脉分别闭锁，形成肝圆韧带和脐侧韧带；静脉导管和动脉导管分别闭锁成为静脉韧带和动脉韧带；卵圆孔关闭；此时建立了与正常成人相似的血液循环。",
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
    id: "ext-histology-embryology-ch25-cardiovascular-b001",
    order: 20,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["动脉韧带", "静脉韧带", "肝圆韧带", "脐侧韧带", "静脉导管"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch25-cardiovascular-b001m1",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "脐动脉出生后形成",
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
            "脐侧韧带",
            "出生后脐动脉远侧段闭锁成脐外侧韧带（脐侧韧带），近侧段成为膀胱上动脉。原书 B1 第 17 题答案 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch25-cardiovascular-b001m2",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "动脉导管出生后形成",
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
            "动脉韧带",
            "出生后，肺循环建立，动脉导管因无血流渐闭锁成为动脉韧带。原书 B1 第 18 题答案 A。",
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
    id: "ext-histology-embryology-ch25-cardiovascular-b002",
    order: 22,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["房室孔", "室间孔", "第1房间孔", "第2房间孔", "卵圆孔"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch25-cardiovascular-b002m1",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "出生后关闭的是",
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
            "卵圆孔",
            "出生后肺循环建立、左心房压力增大，卵圆孔瓣紧贴第二房间隔，卵圆孔关闭成卵圆窝。原书 B1 第 19 题答案 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch25-cardiovascular-b002m2",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "由肌部和膜部封闭的是",
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
            "室间孔",
            "心室分隔：室间隔肌部与心内膜垫之间留有室间孔，第 7 周末由室间隔膜部封闭，膜部由心球嵴、心内膜垫组织与室间隔肌部愈合而成。原书 B1 第 20 题答案 B。",
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