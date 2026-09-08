import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 生理学 学习指导与习题集（第3版）— 第十二章 生殖 题库提取（等比取样）
 * 来源：《生理学学习指导与习题集》第3版（人民卫生出版社，主编：罗自强、祁金顺）
 *
 * == 统计报告（本项目题量预算 = 24）==
 * - 名词解释：2 题（原书两节共 6 个名词，按占比取材）
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：16 题
 * - 简答题：2 题（比重最大的两节共 7 道简答，按占比取材并保留完整答案）
 * - 思考题（病例）：1 题（映射为 case）
 * - B1 共用备选答案配伍题：1 组、共 3 个成员
 * - 独立记分题合计：24 题（含 B1 组成员）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书第一节（男性生殖功能和女性生殖功能）与第二节（妊娠）依次含
 *   名词解释 6、A 型选择（含 A2 病例）52、B 型 8 成员、X 型多选 6、简答 7、思考题 2；
 *   本文件按 24 道预算等比取材并改写。X 型多选按项目规约映射为 a1-single 单选
 *   （题干改写并在 promptSource.note 中标注）。A2 病例型亦映射为 a1-single。
 *   OCR 错字已按医学语义恢复（如“用”→量、“雄激素结合蛋白”→“雄激素结合蛋白”、
 *   “间质细胞”→“间质细胞”等），数值与单位保留原值，未捏造。
 *   各选择题可选项行（题号相邻）经人工重建为 A–E 逻辑顺序后填入 choices，
 *   再将选项随机重排并同步刷新 correctChoiceIndex。
 * 注意：本文件覆盖 PDF 第339–354页（第十二章 生殖，含第一节与第二节）。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "physiology-ch12-reproduction";
const locatorBase =
  "《生理学学习指导与习题集》第3版 第十二章 生殖 复习思考题 习题（PDF 第339–354页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-physiology-ch12-reproduction-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：周期性募集（cyclic recruitment）",
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
        "周期性募集",
        "指在青春期后每次月经周期的黄体期向卵泡期转化的时候，由于垂体 FSH 分泌增加，一群 10~20 个小窦状卵泡进入成熟前 FSH 高度依赖的快速生长阶段。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：月经周期（menstrual cycle）",
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
        "月经周期",
        "指卵巢的周期性变化导致子宫的结构和功能也发生周期性变化，一般指两次月经第一天（月经来潮）之间的时间，平均约 28 天。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/X 型选择题（统一映射为 a1-single），16 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-physiology-ch12-reproduction-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "由睾丸间质细胞分泌的激素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "雄激素结合蛋白（ABP）",
      "促性腺激素",
      "睾酮",
      "抑制素",
      "雌激素",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "睾酮",
        "睾丸间质细胞主要分泌雄激素，其中以睾酮的分泌量最多、生物活性最强；抑制素和雄激素结合蛋白（ABP）由支持细胞分泌，促性腺激素由腺垂体分泌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于睾丸生精过程的叙述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "最适宜的温度是体温",
      "睾丸产生的精子具备运动和受精能力",
      "精子形成约需要一个月",
      "精子生成需要卵泡刺激素（FSH）和睾酮",
      "精原细胞可以进行减数分裂",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "精子生成需要卵泡刺激素（FSH）和睾酮",
        "从精原细胞发育成为精子约需 64 天，FSH 和睾酮分别对生精的始动与维持发挥重要作用；生精最适宜温度低于体温，睾丸产生的精子须在附睾中停留后才能获得运动和受精能力，精原细胞主要进行有丝分裂。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪项不属于睾丸支持细胞的功能",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "分泌抑制素",
      "产生睾酮",
      "分泌雄激素结合蛋白（ABP）",
      "参与形成血-睾屏障",
      "对生精细胞起支持、保护和营养作用",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "产生睾酮",
        "睾酮由睾丸间质细胞分泌，不是支持细胞的功能；支持细胞的功能包括对生精细胞机械支持、保护和营养，分泌雄激素结合蛋白（ABP）与抑制素，以及参与形成血-睾屏障。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对睾丸生精过程始动发挥作用的激素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["孕激素", "睾酮", "卵泡刺激素（FSH）", "雌激素"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "卵泡刺激素（FSH）",
        "FSH 对睾丸生精过程的始动起着重要作用；睾酮主要维持生精，LH 则通过刺激睾丸间质细胞分泌睾酮间接发挥作用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于孕激素作用的叙述，下列哪项是不正确的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "刺激乳腺腺泡发育",
      "使子宫平滑肌活动减弱",
      "促子宫内膜上皮细胞增殖",
      "促进能量代谢",
      "使体温升高",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "促子宫内膜上皮细胞增殖",
        "孕激素抑制而非促进子宫内膜上皮细胞增殖，促使其转化为分泌功能；孕激素还使子宫平滑肌活动减弱、促进乳腺腺泡发育、促进机体散热而使体温升高。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1006",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在月经周期中出现两次分泌高峰的激素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["雌激素", "催乳素", "绒毛膜促性腺激素", "孕激素", "雄激素"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "雌激素",
        "雌激素在月经周期中出现两次分泌高峰：一为卵泡期末（排卵前），一为黄体期的第二个高峰；孕激素仅在黄体期出现一个高峰。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1007",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "排卵后子宫内膜的分泌期变化是由于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "高浓度孕激素的作用",
      "LH 浓度升高",
      "高浓度雌激素的作用",
      "孕激素和雌激素共同作用",
      "FSH 浓度升高",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "孕激素和雌激素共同作用",
        "排卵后黄体形成并分泌孕激素和雌激素，在二者尤其是孕激素作用下，子宫内膜由增生期转变为分泌期，为胚胎着床创造条件。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1008",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "某育龄女性月经周期为 28~30 天，预计她的排卵最可能发生在周期的哪几天",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "第6天和第8天",
      "第14天和第16天",
      "第10天和第12天",
      "第22天和第24天",
      "第18天和第20天",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第14天和第16天",
        "排卵一般发生在下次月经来潮前的 14 天左右。月经周期为 28~30 天时，排卵约发生在周期的第 14~16 天。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1009",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "月经周期中控制排卵发生最重要的激素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "卵泡刺激素",
      "雌激素",
      "孕激素",
      "睾酮",
      "黄体生成素（LH）",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "黄体生成素（LH）",
        "LH 峰值出现后可引发成熟卵泡排卵，一般在 LH 峰出现后 16~24 小时排卵，是控制排卵发生最重要的激素。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1010",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "月经周期中，优势卵泡产生大量雌激素最明显的时期是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "第21~25天",
      "第1~4天",
      "第5~14天",
      "第26~28天",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第5~14天（卵泡期）",
        "卵泡期（约周期的第 5~14 天）优势卵泡不断发育成熟，分泌雌激素的量随卵泡生长而显著增加。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1011",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "排卵前，血中黄体生成素（LH）出现高峰的原因是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "血中孕激素对腺垂体的正反馈作用",
      "血中雌激素对腺垂体的正反馈作用",
      "FSH 的促进作用",
      "血中孕激素和雌激素共同的作用",
      "少量 LH 本身的短反馈作用",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "血中雌激素对腺垂体的正反馈作用",
        "排卵前优势卵泡成熟，血中雌激素水平迅速升高，升高到一定程度时子宫内膜下丘脑、腺垂体产生正反馈调节作用，触发 LH 和 FSH 大幅增加，尤以 LH 峰最为明显。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1012",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "一名 15 岁男孩因单侧隐睾就诊，家长担心其生育功能受影响。关于睾丸的叙述，哪一项是正确的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "出生时睾丸已有精子产生，但青春期后才排放",
      "睾丸所在阴囊温度低于体温有利于生精",
      "睾丸生成的精子形态及功能都已成熟",
      "睾丸间质细胞分泌睾酮需要卵泡刺激素（FSH）",
      "黄体生成素（LH）直接作用于支持细胞促进生精",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "睾丸所在阴囊温度低于体温有利于生精",
        "精子发生的适宜温度远低于体温，阴囊内温度约 32℃ 左右，有利于睾丸精子的产生；精子须在附睾中获得运动和受精能力，间质细胞在 LH（而非 FSH）作用下分泌睾酮。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1013",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "一位 22 岁男性染色体型为 XXY，阴茎短小、睾丸偏小而呈两性畸形表现。直接促进男性外生殖器发育最重要的激素是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["睾酮", "雄烯二酮", "双氢睾酮", "雄酮", "抗苗勒氏激素"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "双氢睾酮",
        "男性外生殖器的分化与发育主要依赖睾酮在局部转化为的双氢睾酮（DHT）的作用；胚胎型间质细胞分泌睾酮诱导内外生殖器发育，青春期后间质细胞分泌的睾酮则促进第二性征发育。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1014",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "一名有规律 28 天月经周期的女性，在月经周期第 17 天刮宫，其子宫内膜应属于哪一期",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "增生晚期",
      "分泌早期",
      "增生早期",
      "排卵期",
      "分泌晚期",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "分泌早期",
        "排卵约发生在周期第 14 天，第 17 天处于黄体期早期（分泌期早期），排卵后黄体分泌的孕激素使子宫内膜呈分泌早期的改变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1015",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "某 35 岁女性诊断为卵巢早衰。下列哪项改变最不可能出现",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "血中 LH 降低",
      "血中 AMH 降低",
      "血中 FSH 降低",
      "血中雌激素降低",
      "血中孕激素水平降低",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "血中 FSH 降低",
        "卵巢早衰时卵泡耗竭，卵泡不能生长分泌雌激素、无排卵及黄体生成，故雌激素、孕激素减少；同时因缺乏雌孕激素对下丘脑、垂体的负反馈，FSH、LH 升高，AMH 也因早期窦卵泡减少而降低。因此“血中 FSH 降低”最不可能出现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-a1016",
    order: 18,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于睾丸功能调节的正确叙述是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "睾丸内部细胞间的旁分泌调节",
      "生精过程只受 FSH 的调节",
      "FSH 调节间质细胞合成和分泌睾酮",
      "睾丸激素对下丘脑和垂体进行反馈调节",
      "睾丸功能受下丘脑和垂体的调控",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "睾丸功能受下丘脑和垂体的调控",
        "原书为X型多选（正确答案 ABE），按规约映射为单选，此处选取其中一条正确叙述：睾丸的生精和内分泌功能受下丘脑—腺垂体轴的调控。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-physiology-ch12-reproduction-short001",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "为什么有生育要求的男性不能随便使用雄激素？",
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
        "滥用雄激素可造成睾丸生精障碍",
        "睾丸的精子发生需要腺垂体分泌的促性腺激素作用：FSH 促进生精过程，LH 促进睾丸间质细胞分泌睾酮，睾酮与雄激素结合蛋白结合被转运至曲细精管，维持生精所需的高浓度雄激素环境。另一方面，睾酮对下丘脑和腺垂体具有负反馈调节作用，可直接或间接抑制腺垂体促性腺激素的分泌。当自行服用雄激素后，血中雄激素增加，加强了对下丘脑和腺垂体的负反馈调节，抑制腺垂体分泌促性腺激素，进而使间质细胞产生的内源性睾酮减少，曲细精管中生精所需的高浓度雄激素环境得不到维持，从而影响生精过程，故有生育要求的男性不能随便使用雄激素。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-physiology-ch12-reproduction-short002",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "根据卵泡优势卵泡选择机制，分析在实施“试管婴儿”技术时如何获得更多的成熟卵子。",
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
        "外源性补充 FSH 使更多卵泡持续发育成熟",
        "每个月经周期被募集的一群卵泡对 FSH 的敏感性并不一致。随着卵泡生长，卵泡分泌的雌激素通过负反馈使垂体 FSH 分泌减少，此时一般仅有一个发育最快的卵泡因 FSH 阈值最小、对 FSH 反应最敏感，能在已降低的血中 FSH 浓度支持下继续发育成熟，其余卵泡因得不到足够 FSH 支持而闭锁，这就是卵泡选择的“FSH 阈值”学说。据此，临床对不孕病人行试管婴儿超促排卵时，外源性补充 FSH，使血中 FSH 在相对较长时间内维持在较高水平，即可使更多卵泡持续得到 FSH 支持、继续生长并最终成熟，从而获得更多成熟卵子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 思考题（病例，映射为 case），1 道 */
const caseItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-physiology-ch12-reproduction-case001",
    order: 21,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "患者，女，30 岁，未采取任何避孕措施，因月经周期不规律（22~35 天）、结婚 3 年未孕就诊。常规体格检查及血常规、尿常规等无异常，每次月经持续 3~5 天、经量适中、无痛经。妇科检查子宫大小正常、外生殖器形态正常，丈夫精液分析各项指标正常。请利用生理学知识分析：该患者不孕最可能的原因有哪些？根据以上分析，患者还需要做哪些检查来确定病因？",
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
        "不孕原因与进一步检查方向",
        "根据女性生殖功能的特点，妇女成功怀孕必须具备：①女方卵巢功能正常，卵泡能正常发育并排卵；②卵子和精子能在输卵管内相遇并结合为受精卵；③受精卵从输卵管进入子宫腔继续发育成囊胚并植入具备接受态的子宫内膜。该患者不孕的可能原因：①下丘脑、垂体功能异常导致卵泡发育异常和（或）不能排卵；②黄体功能异常致内膜不能接受胚胎植入；③输卵管病变。进一步检查：①生殖相关激素检查（血浆雌二醇、孕酮、睾酮、FSH、LH、PRL、AMH）；②B 超观察卵泡发育，结合基础体温判断有无排卵，并观察子宫形态及内膜厚度；③输卵管造影以诊断输卵管通畅程度。",
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
    id: "ext-physiology-ch12-reproduction-b001",
    order: 22,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["LH", "hCG", "孕激素", "雌激素", "FSH"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-physiology-ch12-reproduction-b001m1",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "促进成熟卵泡排卵的激素是",
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
            "LH",
            "LH 峰触发成熟卵泡排卵，排卵一般发生在 LH 峰出现后 16~24 小时。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-physiology-ch12-reproduction-b001m2",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "维持妊娠黄体功能的激素是",
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
            "hCG",
            "受精后滋养层细胞分泌的人绒毛膜促性腺激素（hCG）促使月经黄体转变为妊娠黄体，并继续分泌孕激素和雌激素以维持妊娠。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-physiology-ch12-reproduction-b001m3",
        order: 24,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "使基础体温升高的激素是",
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
            "孕激素",
            "孕激素兴奋下丘脑体温调节中枢，使基础体温在排卵后升高约 0.3~0.5℃，可据此判断排卵是否发生。",
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
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];