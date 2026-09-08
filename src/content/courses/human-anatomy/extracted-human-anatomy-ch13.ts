import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 系统解剖学习题集（第2版）— 第十三章 前庭蜗器 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - A1/A2/A3 型选择题（a1-single）：7 题
 * - 填空题（fill）：3 题
 * - 判断改错题 + 问答题（short-answer）：2 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：19 题（含 B1 组成员；须等于本文件预算 19）
 * - 缺失答案：0；无法可靠提取：0（或如实记录换题）
 * - 说明：本章原书依序含 选择题 A1 型题 34、A2 型题 9、A3 型题 10（含多个共用题干组）、
 *   B1 共用备选答案配伍题（多组、共 11 个小题）、填空题 15、名词解释 8、判断改错题 10、
 *   问答题 7。本文件按 19 道预算在原书顺序中取材并改写，覆盖鼓室各壁、鼓膜、咽鼓管、
 *   骨迷路/膜迷路、感受器等核心知识点。
 *   A1/A2/A3 型均映射为 a1-single；B1 型按项目规约组织为 Group b1（组内成员各为一独立记分题）。
 *   OCR 错字已按医学语义恢复（如「A，型题/Az型题/A，型题」→A1/A2/A3 型题、「沩/力」→为、
 *   「搁」→胸、「笄」→?、「题骨岩部」→颞骨岩部、「豉膜」→鼓膜、「前庭蜗器」语义复原等），
 *   器官名、结构名、数值与相对位置（前上方/后上方/前庭窗/蜗窗/前庭阶/鼓阶等）均按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "human-anatomy-ch13-vestibulocochlear-organ";
const locatorBase =
  "《系统解剖学习题集》第2版 第十三章 前庭蜗器 复习思考题 习题（扫描版原书核对PDF 第183–192页）";
const promptNote =
  "题干改写；原题来自用户提供的扫描题集（OCR 已按医学语义恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选/共用题干，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据扫描题集整理并改写，未经权威教材交叉核对，OCR 错字已按医学语义恢复";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：光锥",
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
        "光锥",
        "在鼓膜的外侧面，鼓膜紧张部的前下方有一个三角形的反光区，称为光锥。中耳的一些疾患可引起光锥改变或消失，为活体检查鼓膜的标志之一。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：耳蜗",
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
        "耳蜗",
        "耳蜗位于前庭的前方，形如蜗牛壳。尖向前外侧，称为蜗顶；底朝向后内侧，称为蜗底，对向内耳道底。耳蜗由蜗轴和蜗螺旋管构成。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-term003",
    order: 3,
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
        "螺旋器是蜗管基底膜上的听觉感受器，又称 Corti 器，能感受声波的刺激并产生神经冲动，是听觉的主要感受器。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：咽鼓管",
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
        "咽鼓管",
        "咽鼓管为连通鼓室和鼻咽部的管道，由骨部和软骨部构成。其作用是维持鼓室内气压和外界大气压相等。小儿咽鼓管短而宽，接近水平位，易使咽部感染侵入鼓室。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/A3 型选择题（统一映射为 a1-single），7 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于听觉感受器的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["椭圆囊斑", "壶腹骨脚", "膜壶腹", "螺旋器", "球囊斑"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "螺旋器",
        "螺旋器位于蜗管基底膜上，是听觉感受器（Corti 器）；椭圆囊斑、球囊斑与壶腹嵴均为位置觉感受器。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "鼓室的后壁有",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "前庭窗",
      "面神经管凸",
      "乳突窦的开口",
      "咽鼓管的开口",
      "蜗窗",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "乳突窦的开口",
        "鼓室后壁为乳突壁，上部有乳突窦的入口，鼓室借乳突窦向后通入乳突内的乳突小房。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于鼓膜的叙述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "位于内耳道与鼓室之间",
      "构成鼓室外侧壁的大部分",
      "鼓膜中心向内凹陷，称为鼓膜脐，为镫骨附着处",
      "婴儿鼓膜更倾斜，近似呈垂直位",
      "鼓膜边缘附着于颞骨鼓部和鳞部，鼓膜周缘较薄",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "构成鼓室外侧壁的大部分",
        "鼓膜构成鼓室外侧壁的大部分；鼓膜脐为锤骨柄附着处而非镫骨，婴儿鼓膜近似水平位而非垂直位，据此排除其他各项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "关于咽鼓管的叙述，错误的是：咽鼓管软骨部向前内开口于咽鼓管咽口，平时处于开放状态",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "咽鼓管骨部向后外开口于咽鼓管鼓室口",
      "咽鼓管连通鼻咽部与鼓室",
      "咽鼓管软骨部向前内开口于咽鼓管咽口，平时处于开放状态",
      "小儿咽鼓管短而宽，接近水平位，故咽部感染可经咽鼓管侵入鼓室",
      "咽鼓管使鼓室的气压与外界的大气压相等，以保持鼓膜内、外的压力平衡",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "咽鼓管软骨部向前内开口于咽鼓管咽口，平时处于开放状态",
        "咽鼓管软骨部开口于咽鼓管咽口，但其平时多处于关闭状态，仅在咀嚼、吞咽时开放以平衡鼓室与外界气压，故该项叙述错误。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于鼓膜穿孔时的叙述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "空气振动能兴奋螺旋器",
      "不能引起听觉",
      "螺旋器能产生神经冲动，经蜗神经传导听觉",
      "能引起鼓阶的外淋巴振动",
      "空气振动可以波及第二鼓膜",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "不能引起听觉",
        "鼓膜穿孔时经外耳道进入鼓室的空气可直接波及第二鼓膜，引起鼓阶外淋巴波动并兴奋螺旋器，仍能产生一定程度的听觉，故「不能引起听觉」的叙述错误。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "感受旋转运动刺激的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: ["螺旋器", "蜗管", "壶腹嵴", "椭圆囊斑、球囊斑", "膜壶腹"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "壶腹嵴",
        "壶腹嵴位于各膜半规管的膜壶腹壁上，是位置觉感受器，能感受头部旋转变速运动的刺激。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪个不属于位置觉感受器",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: ["膜壶腹", "螺旋器", "椭圆囊斑", "壶腹嵴", "球囊斑"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "螺旋器",
        "螺旋器是听觉感受器，不属于位置觉感受器；椭圆囊斑、球囊斑及壶腹嵴均为位置觉感受器。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），3 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-fill001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "鼓膜张肌由____神经支配，镫骨肌受____神经支配。",
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
        "①下颌神经 ②面神经",
        "鼓膜张肌由下颌神经支配，镫骨肌受面神经（镫骨肌支）支配；镫骨肌受损常引起听觉过敏。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-fill002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "咽鼓管连通鼻咽部与____，咽鼓管的作用是使____的气压与____的大气压相等，以保持鼓膜内、外两面的压力平衡。",
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
        "①鼓室 ②鼓室 ③外界",
        "咽鼓管连通鼻咽部与鼓室，使鼓室内的气压与外界大气压相等，从而保持鼓膜内、外两面的压力平衡。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-fill003",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "小儿咽鼓管的形态特点是____，故咽部感染可经咽鼓管侵入鼓室。",
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
        "①短 ②宽 ③接近水平位",
        "小儿咽鼓管短而宽、接近水平位，故咽部感染易经咽鼓管侵入鼓室引起中耳炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断改错题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-short001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：在骨半规管壶腹壁上有壶腹嵴，是位置觉感受器，能接受旋转运动的刺激。",
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
        "错误；应将“骨半规管”改为“膜半规管”",
        "壶腹嵴位于各膜半规管的膜壶腹壁上（膜壶腹是膜半规管的膨大部），而非骨半规管上，故原题结构名称错误。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-short002",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：螺旋器位于蜗管的基底膜上，是位置觉感受器。",
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
        "错误；应将“位置觉感受器”改为“听觉感受器”",
        "螺旋器位于蜗管的基底膜上，是听觉感受器（Corti 器），能感受声波刺激，而非位置觉感受器。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 3 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-human-anatomy-ch13-vestibulocochlear-organ-b001",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["螺旋器", "椭圆囊斑和球囊斑", "壶腹嵴", "膜壶腹", "血管纹"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-human-anatomy-ch13-vestibulocochlear-organ-b001m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "感受旋转运动刺激的是",
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
            "壶腹嵴",
            "壶腹嵴位于膜壶腹壁，是位置觉感受器，能感受头部旋转变速运动的刺激。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch13-vestibulocochlear-organ-b001m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "感受直线加速或减速运动刺激的是",
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
            "椭圆囊斑和球囊斑",
            "椭圆囊斑和球囊斑是位置觉感受器，分别感受头部静止的位置和直线变速（加速或减速）运动的刺激。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch13-vestibulocochlear-organ-b001m3",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "听觉感受器是",
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
            "螺旋器",
            "螺旋器（Corti 器）位于蜗管基底膜上，是听觉感受器，能感受声波的刺激。",
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

/** 无 case 类题（本文件不含病例推导题），caseItems 为空跳过 */
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];