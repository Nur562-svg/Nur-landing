import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第23章 消化系统和呼吸系统的发生 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 选择题（a1-single）：6 题（A1 型 5 道 + 多选映射 1 道）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：3 题
 * - B1 配伍题：2 组、共 4 个成员
 * - 独立记分题合计：17 题（须等于本文件预算 17）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含选择题（A1 型 1–9、B1 型 2 组 4 小题、多选题 14–18）、名词解释 4、
 *   简答题 3、论述题 1，无填空题；本文件按 17 道预算等比取材并在原书顺序内取满。双栏排版中
 *   题干/选项/题号/字母交错散落，已按胚胎学医学生理语义重建完整选项集合；正确项均对照本章
 *   末尾「参考答案」键号（如 1.E 2.E …）锚定。咽囊对数（5 对）、旋转方向（逆时针 90°/180°）、
 *   距离（距回盲部 40~50cm）、周龄（第 3/4/6/7/10 周、第 5 对咽囊）等均保留原值，未捏造。
 *   多选题 16 按项目规约映射为 a1-single，仅取其中一个正确项。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch23-digestive-respiratory";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第23章 消化系统和呼吸系统的发生 复习思考题 习题（核对PDF 第188–193页）";
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
    id: "ext-histology-embryology-ch23-digestive-respiratory-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：麦克尔憩室",
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
        "麦克尔憩室",
        "又称回肠憩室，是由于卵黄蒂近端未退化所致。表现为回肠壁上距回盲部40～50cm处的囊状突起，其顶端可有纤维索与脐相连。原书名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：咽囊",
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
        "咽囊",
        "前肠头端膨大，形成背腹扁平、漏斗形的原始咽，在咽的两侧向外伸出囊状突起，称咽囊。咽囊有5对，分别与外侧的5对鳃沟相对。原书名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：气管食管瘘",
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
        "气管食管瘘",
        "气管发育时，由于气管食管隔发育不良，气管与食管分隔不完全，两者间有瘘管相连，即称气管食管瘘。原书名词解释第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肺芽",
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
        "肺芽",
        "胚胎发育第4周，呼吸憩室末端膨大并分为左、右两支，称为肺芽，是支气管和肺的原基。原书名词解释第 4 题参考答案。",
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
    id: "ext-histology-embryology-ch23-digestive-respiratory-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "原始消化管管壁的构成是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "内胚层和体壁中胚层",
      "中胚层和脏壁中胚层",
      "内胚层和脏壁中胚层",
      "外胚层和脏壁中胚层",
      "体壁中胚层",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "内胚层和脏壁中胚层",
        "原始消化管由卵黄囊顶部的内胚层及其外侧的脏壁中胚层在体内形成。原书 A1 参考答案第 1 题为 E，按选项重排后正确项即「内胚层和脏壁中胚层」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "甲状旁腺的发生是由",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "第三对咽囊腹侧份的上皮增生、分化形成",
      "第三和第四对咽囊腹侧份的上皮增生、分化形成",
      "第四对咽囊腹侧份的上皮增生、分化形成",
      "第三和第四对咽囊背侧份的上皮增生、分化形成",
      "第五对咽囊的上皮增生、分化形成",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第三和第四对咽囊背侧份的上皮增生、分化形成",
        "第3对咽囊背侧上皮增生形成下一对甲状旁腺，第4对咽囊背侧形成上一对甲状旁腺，故甲状旁腺由第三、四对咽囊背侧份的上皮增生分化形成。原书 A1 参考答案第 3 题为 D，按选项重排后正确项即本项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "演变形成中耳鼓室和咽鼓管的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["第二对咽囊", "第一对咽囊", "第一对鳃沟", "第二对鳃沟", "第三对鳃沟"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第一对咽囊",
        "第1对咽囊形成中耳鼓室与咽鼓管。原书 A1 参考答案第 4 题为 A，按选项重排后正确项即「第一对咽囊」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于中肠演变的描述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "中肠的头部与前肠尾部共同形成十二指肠",
      "中肠生长迅速，形成弯曲的U形中肠袢",
      "肠系膜上动脉伸入中肠袢中轴",
      "中肠袢以卵黄蒂为界分为头、尾两支",
      "中肠袢的顶部与尿囊相连",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "中肠袢的顶部与尿囊相连（错误项）",
        "中肠袢的顶部与卵黄蒂相连，卵黄蒂以上的为中肠袢头支、以下的为尾支；并非与尿囊相连，故「中肠袢的顶部与尿囊相连」说法错误。原书 A1 参考答案第 6 题为 E，按选项重排后正确项即本错误项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "中肠袢在脐腔内围绕何种结构旋转",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["脐静脉", "脐动脉", "肠系膜上动脉", "肠系膜下动脉", "卵黄动脉"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠系膜上动脉",
        "中肠袢以肠系膜上动脉为轴，在脐腔内逆时针旋转90°，退出脐腔后再逆时针旋转180°。原书 A1 参考答案第 7 题为 C，按选项重排后正确项即「肠系膜上动脉」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于泄殖腔的描述正确的是（原题为多选，此处单选其中一正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "后肠尾部的膨大部分",
      "前方与尿囊相通",
      "两侧面有中肾管开口",
      "尾侧壁是泄殖腔膜",
      "尿直肠隔将其分为原始直肠和尿生殖窦",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "尿直肠隔将其分为原始直肠和尿生殖窦",
        "泄殖腔是后肠末段的膨大部分，被尿直肠隔分隔为背侧的原始直肠和腹侧的尿生殖窦，可发育为膀胱、尿道、直肠和肛管上段。原书多选题第 16 题参考答案为 ABCDE，此处单选取其中一正确项。",
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

/** 简答/论述题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述咽囊的形成及其演变的结构。",
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
        "咽囊的形成及其演变的结构",
        "答：咽囊的形成：胚发育第4周，前肠头端膨大，发育成背腹扁平、漏斗形的原始咽，在咽的两侧壁向外伸出5对囊状突起，即是咽囊。演变的结构：第一对咽囊外侧膨大形成中耳鼓室，内侧延伸形成咽鼓管，末端的黏膜分化为鼓膜，第一鳃沟形成外耳道；第二对咽囊外侧退化，内侧形成腭扁桃体窝；第三对咽囊分为背、腹两部分，腹侧上皮增生形成左、右两条细胞索，在胸骨后愈合形成胸腺的上皮性网状细胞，背侧上皮增生随胸腺下移到甲状腺背侧，形成下一对甲状旁腺；第四对咽囊也分为背、腹两部分，腹侧退化，背侧形成上一对甲状旁腺；第五对咽囊仅为一小团细胞，称后鳃体，其一部分细胞迁移到甲状腺，将分化成滤泡旁细胞。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：原始消化管是怎样发生的？",
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
        "原始消化管的发生",
        "答：人胚第3周，随着胚盘向腹侧卷折，卵黄囊顶部的内胚层及其外侧的脏壁中胚层，在体内形成头尾方向的原始消化管，其头侧段称为前肠，尾侧段称为后肠，中段称为中肠。前肠的头端有口咽膜封闭，后肠的尾端有泄殖腔膜封闭，中肠与卵黄囊之间的连接部变细称为卵黄蒂。原书简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-short003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "论述题：试述肠的发生过程。",
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
        "肠的发生过程",
        "答：①中肠袢形成：肠大部分由中肠发生，中肠的头部与前肠的尾部共同形成十二指肠。胚体第4周，十二指肠以下的中肠生长迅速，由最初的直管形成向腹侧弯曲的U形的中肠袢，中肠袢顶部与卵黄蒂相连，卵黄蒂以上的中肠袢为头支，卵黄蒂以下的中肠袢为尾支，肠系膜上动脉走行于肠系膜中。②中肠袢逆时针旋转：胚体第6周，增长迅速的中肠袢突入到脐腔，并以肠系膜上动脉为轴，逆时针旋转90°，即头支从胚体头侧转向右侧，尾支从尾侧转向左侧，并在尾支上发生一个囊状的盲肠突，为盲肠和阑尾的原基。胚体第10周，中肠袢从脐腔退回腹腔，头支在先、尾支在后退出，边退边再向逆时针方向旋转180°。头支分化形成空肠和回肠，位居腹腔的中部；尾支形成至横结肠右2/3段。③后肠演变：后肠形成横结肠左1/3段、降结肠和乙状结肠。后肠尾端膨大形成泄殖腔后，直肠由泄殖腔分隔而成。原书论述题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组 × 共 4 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch23-digestive-respiratory-b001",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["外胚层", "中胚层", "内胚层", "胚外中胚层", "中胚层和间充质"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch23-digestive-respiratory-b001m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "胃上皮的来源",
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
            "内胚层",
            "消化管黏膜的上皮及腺体的实质大多来自原始消化管的内胚层，胃上皮（黏膜上皮）来自内胚层。原书 B1 第 10 题答案 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch23-digestive-respiratory-b001m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "胃壁肌层的来源",
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
            "中胚层和间充质",
            "管壁上的结缔组织、肌肉组织来自脏壁中胚层（间充质分化），胃壁肌层来源即中胚层和间充质。原书 B1 第 11 题答案 E。",
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
    id: "ext-histology-embryology-ch23-digestive-respiratory-b002",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["前肠末段", "中肠中段", "后肠", "中肠起始段和前肠尾段", "中肠末段"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch23-digestive-respiratory-b002m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "肝的原基位于",
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
            "前肠末段",
            "前肠末端腹侧壁向外突出的囊状肝憩室为肝和胆的原基，故肝的原基位于前肠末段。原书 B1 第 12 题答案 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch23-digestive-respiratory-b002m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "十二指肠的原基位于",
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
            "中肠起始段和前肠尾段",
            "中肠的头部与前肠尾部共同形成十二指肠，故十二指肠的原基位于中肠起始段和前肠尾段。原书 B1 第 13 题答案 D。",
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