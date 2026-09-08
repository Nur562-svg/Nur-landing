import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 诊断学 学习指导与习题集（第4版）— 第一章 基本方法 题库提取
 * 来源：《诊断学学习指导与习题集》第4版（人民卫生出版社，主编：万学红、卢雪峰）
 *
 * == 统计报告 ==
 * - 名词解释：10 题
 * - A1 型题（单句型最佳选择题）：6 题
 * - 问答题（简答）：1 题
 * - B 型配伍题：0 组
 * - 独立题合计：17 题
 * - 缺失答案：0 题
 * - 无法提取：0 题
 * - 说明：原书含个别水印与少量排版乱码（如“口p诊”“噢觉”等），已按医学语义恢复为主题所指内容；所有题目均做轻度改写并重排选项，数值与临床细节保留原值。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "beginner-method";
const chapterLabel = "第一章";
const locatorBase =
  "《诊断学学习指导与习题集》第4版 第一章 基本方法 习题（PDF 第108–110页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-diagnosis-${topic}`;

/** 名词解释（term） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-beginner-method-ch1-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：体格检查（physical examination）",
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
        "体格检查",
        "医师运用自身感官或借助常见简便器具（体温表、血压计、叩诊锤、听诊器等），对病人身体状况进行客观了解与评估的一系列最基本的检查。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：检体诊断（physical diagnosis）",
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
        "检体诊断",
        "完成全面体格检查后，对病人健康状况和所患疾病提出的临床判断称为检体诊断。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：视诊（inspection）",
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
        "视诊",
        "医师运用眼睛观察病人全身或局部表现的诊断方法，是最基本的体格检查方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：触诊（palpation）",
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
        "触诊",
        "医师用手接触被检查部位，通过手部感知来判断被检部位情况的一种检查方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：浅部触诊法（light palpation）",
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
        "浅部触诊法",
        "用于体表浅在病变（如关节、软组织、浅部动脉静脉神经、阴囊、精索等）检查与评估的触诊方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：深部触诊法（deep palpation）",
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
        "深部触诊法",
        "医师用单手或两手重叠，由浅入深逐渐加压，以探查深部病变的触诊方法，包括深部滑行、双手、深压和冲击触诊法等；腹部深部触诊腹壁压陷深度常在 2cm 以上，有时可达 4～5cm。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：冲击触诊法（ballottement，又称浮沉触诊法）",
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
        "冲击触诊法",
        "医师以右手并拢的示、中、环三指呈 70°～90° 角置于腹壁拟查部位，作数次快速而较有力的冲击以完成检查，适用于大量腹腔积液时肝、脾及腹腔包块难以触及时。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：叩诊（percussion）",
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
        "叩诊",
        "医师用手、手指或借助叩诊锤叩击体表某一部位，依据叩击部位的震动、声响及病人的反应特点，判断被检查部位有无异常的方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-term009",
    order: 9,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：听诊（auscultation）",
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
        "听诊",
        "医师根据病人身体各部位所发出声音的变化来判断其正常与否的诊断方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-term010",
    order: 10,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt:
      "名词解释：嗅诊（olfactory examination）",
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
        "嗅诊",
        "通过嗅觉辨别病人散发的异常气味，并据此判断这些气味与疾病之间关系的一种方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型题（a1-single），选项已随机重排，correctChoiceIndex 指向新顺序 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-beginner-method-ch1-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "正常青年人的叩诊过程中不会出现的叩诊音是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["清音", "实音", "鼓音", "过清音", "浊音"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "过清音",
        "正常人肺部叩诊为清音；过清音是肺泡含气量增多、弹性减弱的体征，常见于肺气肿，正常青年人不会出现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列体征中，哪一项不能用叩诊法进行检查？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["Oppenheim 征", "肺下缘移动度", "脾大小", "肝大小", "二头肌肌腱反射"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Oppenheim 征",
        "Oppenheim 征属锥体束病理反射，需以神经系统检查法诱出，不借助叩诊判定。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列体征中，哪一项不适用于深部触诊法进行探查？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["阑尾点压痛、反跳痛", "右肾下极", "中输尿管点压痛", "乙状结肠包块", "板状腹"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "板状腹",
        "板状腹见于急性弥漫性腹膜炎所致的腹壁显著紧张，属浅部触诊即可察觉的体征，不宜施以深部触诊。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-a1004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于深压触诊法，下列哪项描述是正确的？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "用于检查腹腔有无积液",
      "用于肝、脾脏的触诊",
      "用于探测腹腔深在病变的部位以确定腹腔压痛点",
      "用于检查腹部有无肌紧张",
      "用于脾脏的触诊",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "用于探测腹腔深在病变的部位以确定腹腔压痛点",
        "深压触诊法以一手或两手逐渐深压腹部确定腹腔深在部位以探测压痛点，多用于胆囊压痛点及输尿管压痛的检查。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-a1005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "触诊腹腔积液病人的腹腔内有无肿块，最宜选用哪种触诊法？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["双手触诊法", "冲击触诊法", "滑动触诊法", "插入触诊法", "浅部触诊法"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "冲击触诊法",
        "腹腔积液量较大时肝、脾及包块难以直接触及，冲击触诊法（浮沉触诊法）可在液体冲击下触及深部肿物，故最适用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-beginner-method-ch1-a1006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "呼气呈现烂苹果气味，最多见于下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["尿毒症", "肝性脑病", "酒精中毒", "糖尿病酮症酸中毒", "有机磷农药中毒"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "糖尿病酮症酸中毒",
        "烂苹果味由酮体（丙酮）经呼吸排出引起，是糖尿病酮症酸中毒的典型气味。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer） */
const shortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-beginner-method-ch1-sa001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "进行体格检查时，应注意的主要问题有哪些？",
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
        "体格检查时应注意：①坚持以病人为中心，关心体贴病人，避免引起交叉感染；②医师仪表端庄、举止大方、态度诚恳和蔼；③站立于病人右侧，礼貌自我介绍并说明检查目的与要求；④查体时光线适当、室内温暖、环境安静，手法规范轻柔，充分暴露被检部位；⑤全身体格检查力求全面、系统、重点、规范、正确；⑥按一定顺序检查，避免重复遗漏，避免反复翻动病人；⑦注意相邻部位的对照；⑧保护病人隐私；⑨检查结束对病人的配合表示谢意；⑩根据病情变化及时复查。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...shortAnswerItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [];