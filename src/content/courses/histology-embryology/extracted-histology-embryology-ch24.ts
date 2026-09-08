import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第24章 泌尿系统和生殖系统的发生 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 选择题（a1-single）：6 题（A1 型 4 道 + 多选映射 2 道）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：2 题
 * - B1 配伍题：2 组、共 4 个成员
 * - 独立记分题合计：16 题（须等于本文件预算 16）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含选择题（A1 型 1–10、B1 型 2 组 4 小题、多选题 15–19）、名词解释 4、
 *   简答题 2、论述题 1，无填空题；本文件按 16 道预算等比取材并在原书顺序内取满。双栏排版中
 *   题干/选项/题号/字母交错散落，已按胚胎学医学生理语义重建完整选项集合；正确项均对照本章
 *   末尾「参考答案」键号（如 1.E 2.D …）锚定。体节序数（第7~14、14~28体节）、周龄（第4/5/10周、
 *   第7~8周睾丸、第10周卵巢、第7~8个月下降）、结构（生肾节、生肾索、尿生殖嵴、前/中/后肾、
 *   输尿管芽、生后肾原基）与数值（100万~200万个原始卵泡）均保留原值，未捏造。多选题 15/17
 *   按项目规约映射为 a1-single，仅取其中一个正确项。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch24-urinary-reproductive";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第24章 泌尿系统和生殖系统的发生 复习思考题 习题（核对PDF 第194–200页）";
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
    id: "ext-histology-embryology-ch24-urinary-reproductive-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：尿生殖嵴",
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
        "尿生殖嵴",
        "生肾索（间介中胚层分化而来）的尾端增生与体节分离而向胚内体腔凸出，在中轴两侧对称的纵行索条称尿生殖嵴，是中肾、生殖腺和生殖管道的原基，进一步分化为外侧粗而长的中肾嵴和内侧细而短的生殖腺嵴。原书名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch24-urinary-reproductive-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：输尿管芽",
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
        "输尿管芽",
        "中肾管末段近泄殖腔处向背侧头端发出一盲管称输尿管芽。它的出现可①诱导中肾嵴细胞形成生后肾原基；②输尿管芽本身在中肾嵴内继续向头端延伸反复分支形成输尿管、肾盂、肾盏和集合管系。原书名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch24-urinary-reproductive-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：生后肾原基",
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
        "生后肾原基",
        "中肾嵴尾侧的中胚层组织，在输尿管芽的诱导下分化形成，呈帽状包裹在输尿管芽的末端。生后肾原基的外周部分形成肾的被膜，中央部分在输尿管芽的诱导下，形成肾小囊和肾小管。原书名词解释第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch24-urinary-reproductive-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：初级性索",
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
        "初级性索",
        "生殖腺嵴的表面上皮长入其下方的间充质内，形成许多不规则的上皮细胞索，称初级性索。若胚胎细胞的性染色体为XY时，在HY抗原作用下，初级性索与表面上皮分离，伸入生殖腺嵴的深部，形成生精小管、直精小管和睾丸网。若无Y染色体，初级性索则退化。原书名词解释第 4 题参考答案。",
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
    id: "ext-histology-embryology-ch24-urinary-reproductive-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "泌尿生殖系统的主要器官来源于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["内胚层", "外胚层", "侧中胚层", "轴旁中胚层", "间介中胚层"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "间介中胚层",
        "泌尿系统和生殖系统的主要器官发生自间介中胚层。原书 A1 参考答案第 1 题为 E，按选项重排后正确项即「间介中胚层」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch24-urinary-reproductive-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "从中肾管末段背侧长出的盲管是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["中肾旁管", "输尿管芽", "中肾小管", "集合管", "前肾小管"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "输尿管芽",
        "输尿管芽是中肾管末端近泄殖腔处向背侧头端长出的一个盲管，即从中肾管末段背侧长出的盲管。原书 A1 参考答案第 3 题为 B，按选项重排后正确项即「输尿管芽」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch24-urinary-reproductive-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "原始生殖细胞起源于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["生殖腺嵴", "原始性索", "体腔表面上皮", "尿囊内胚层", "卵黄囊内胚层"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "卵黄囊内胚层",
        "第6周时，位于卵黄囊后壁的原始生殖细胞沿着后肠的背系膜陆续向生殖腺嵴内迁移，故原始生殖细胞起源于卵黄囊内胚层。原书 A1 参考答案第 4 题为 E，按选项重排后正确项即「卵黄囊内胚层」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch24-urinary-reproductive-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "形成膀胱的结构是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["脐尿管", "尿生殖窦上段", "尿生殖窦中段", "尿生殖窦下段", "泄殖腔背侧部"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "尿生殖窦上段",
        "尿生殖窦分为三段，其中上段较大，发育分化为膀胱。原书 A1 参考答案第 8 题为 B，按选项重排后正确项即「尿生殖窦上段」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch24-urinary-reproductive-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于前肾的描述正确的是（原题为多选，此处单选其中一正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "发生在生肾索内",
      "先后出现7～10对横行的前肾小管",
      "前肾小管与前肾管相通",
      "前肾小管部分保留",
      "前肾管大部分保留",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "先后出现7～10对横行的前肾小管",
        "前肾位于颈部第7～14体节外侧的生肾节内，先后出现7～10对横行的前肾小管；前肾管保留部分向尾端延伸形成中肾管。原书多选题第 15 题参考答案为 BCE，此处单选取其中一正确项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch24-urinary-reproductive-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于后肾的描述正确的是（原题为多选，此处单选其中一正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "为人体永久肾",
      "来自于输尿管芽和生后肾组织",
      "输尿管芽形成肾单位",
      "生后肾组织形成集合管",
      "其产生的尿液排入羊水",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "为人体永久肾",
        "后肾发育为人体的永久肾，由输尿管芽（形成输尿管、肾盂、肾盏和集合管系）和生后肾原基（形成肾单位）发生而来。原书多选题第 17 题参考答案为 ABE，此处单选取其中一正确项。",
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
    id: "ext-histology-embryology-ch24-urinary-reproductive-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述睾丸的发生。",
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
        "睾丸的发生",
        "答：如果胚胎的遗传性别为男性，其原始生殖细胞即携带XY性染色体。Y染色体短臂上有性别决定区，可编码睾丸决定因子，该因子能使未分化性腺向睾丸方向分化。第7周时，在其影响下，初级性索与表面上皮分离，继续向深部增生，形成许多细长弯曲的睾丸索（青春期时演化为生精小管）。初级性索上皮细胞演变成支持细胞，原始生殖细胞则增殖分化为精原细胞。睾丸索的末端吻合成睾丸网。第8周时，表面上皮下方的间充质形成白膜，睾丸索之间的间充质细胞分化为睾丸间质细胞并分泌雄激素。出生后，睾丸间质细胞退化，至青春期时再现。生殖腺最初位于腹后壁，随着胚体生长、腰部直立，生殖腺由于引带的牵拉而下降。第7～8个月时，睾丸与包绕它的双层腹膜经腹股沟管降入阴囊。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch24-urinary-reproductive-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "论述题：试述中肾管与中肾旁管的来源、演变。",
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
        "中肾管与中肾旁管的来源、演变",
        "答：继前肾之后，中肾嵴相继形成许多横行的中肾小管，其外侧端与向尾侧延伸的前肾管连通后，前肾管即改名为中肾管。在后肾发生时，中肾管尾端发生输尿管芽。输尿管芽形成后肾中的输尿管、肾盂、肾盏和集合管系。在男性，中肾管头侧发育成弯曲的附睾管，中段变直形成输精管，尾端形成射精管和精囊。在女性，中肾管退化。中肾旁管由中肾嵴的表面上皮内陷卷褶而成，头端开口于腹腔，上段与中肾管平行，下段合并成一条管，尾端为盲端，伸到尿生殖窦的背侧壁，在窦腔内形成一隆起，称窦结节。在男性，中肾旁管退化。在女性，中肾旁管上段和中段形成输卵管，下段愈合发育形成子宫。原书论述题第 1 题参考答案。",
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
    id: "ext-histology-embryology-ch24-urinary-reproductive-b001",
    order: 13,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "原始生殖腺的表面上皮",
      "生殖腺嵴表面上皮",
      "皮质索",
      "脏壁中胚层",
      "体壁中胚层",
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
        id: "ext-histology-embryology-ch24-urinary-reproductive-b001m1",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "第5周时，初级性索来源于",
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
            "生殖腺嵴表面上皮",
            "第5周时，生殖腺嵴的表面上皮长入其下方的间充质，形成许多不规则的上皮细胞索，即初级性索。原书 B1 第 11 题答案 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch24-urinary-reproductive-b001m2",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "次级性索来自",
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
            "原始生殖腺的表面上皮",
            "卵巢形成时初级性索退化，生殖腺嵴的表面上皮再次增殖形成次级性索（皮质索），故次级性索来自原始生殖腺的表面上皮。原书 B1 第 12 题答案 A。",
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
    id: "ext-histology-embryology-ch24-urinary-reproductive-b002",
    order: 15,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "睾丸的精原细胞",
      "睾丸的支持细胞",
      "睾丸的间质细胞",
      "卵巢的卵原细胞",
      "卵巢的卵泡细胞",
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
        id: "ext-histology-embryology-ch24-urinary-reproductive-b002m1",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分泌雄激素的细胞是",
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
            "睾丸的间质细胞",
            "胚胎第8周时，睾丸索之间的间充质细胞分化为睾丸间质细胞并分泌雄激素。原书 B1 第 13 题答案 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch24-urinary-reproductive-b002m2",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "胚胎时期能分泌抗中肾旁管激素的细胞是",
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
            "睾丸的支持细胞",
            "若生殖腺分化为睾丸，睾丸的支持细胞可分泌抗中肾旁管激素，使中肾旁管退化。原书 B1 第 14 题答案 B。",
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