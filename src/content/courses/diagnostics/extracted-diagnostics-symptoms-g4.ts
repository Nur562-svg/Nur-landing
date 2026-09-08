import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 诊断学 学习指导与习题集（第4版）— 第一篇 常见症状 第十二～十七节 题库提取
 * 来源：《诊断学学习指导与习题集》第4版（人民卫生出版社，主编：万学红、卢雪峰）
 *
 * == 统计报告 ==
 *
 * ■ 第十二节 呕血（PDF 第44–46页）
 *   - 名词解释：1 题
 *   - A1 型题：5 题
 *   - A2 型题：2 题
 *   - 问答题：2 题
 *   - B1 型配伍题（共用备选答案）：2 组、共 7 个成员
 *   - B2 型题组（共用题干 A3/A4）：1 组、共 3 个成员
 *   - 独立题合计：10 题（不含组成员）
 *
 * ■ 第十三节 便血（PDF 第46–49页）
 *   - 名词解释：1 题
 *   - A1 型题：4 题
 *   - A2 型题：2 题
 *   - 问答题：2 题
 *   - B1 型配伍题：2 组、共 7 个成员
 *   - B2 型题组：1 组、共 3 个成员
 *   - 独立题合计：9 题（不含组成员）
 *
 * ■ 第十四节 腹痛（PDF 第49–52页）
 *   - 名词解释：2 题
 *   - A1 型题：7 题
 *   - A2 型题：4 题
 *   - 问答题：1 题
 *   - B1 型配伍题：2 组、共 8 个成员
 *   - B2 型题组：2 组、共 5 个成员
 *   - 独立题合计：14 题（不含组成员）
 *
 * ■ 第十五节 腹泻（PDF 第52–53页）
 *   - 名词解释：1 题
 *   - A1 型题：5 题
 *   - 问答题：1 题
 *   - B2 型题组：1 组、共 2 个成员
 *   - 独立题合计：7 题（不含组成员）
 *
 * ■ 第十六节 便秘（PDF 第53–55页）
 *   - 名词解释：1 题
 *   - A1 型题：5 题
 *   - 问答题：1 题
 *   - 独立题合计：7 题（无组题）
 *
 * ■ 第十七节 黄疸（PDF 第55–58页）
 *   - 名词解释：2 题
 *   - A1 型题：11 题
 *   - 问答题：1 题
 *   - B1 型配伍题：2 组、共 10 个成员
 *   - B2 型题组：1 组、共 3 个成员
 *   - 独立题合计：14 题（不含组成员）
 *
 * —— 全局合计 ——
 * - 名词解释：8 题
 * - A1 型题：37 题
 * - A2 型题：8 题
 * - 问答题：8 题
 * - B1 型配伍题：8 组、共 32 个成员
 * - B2 型题组（共用题干）：6 组、共 18 个成员
 * - 独立题合计：61 题（不含组成员）
 * - 缺失答案：0 题
 * - 无法提取：0 题
 * - 说明：
 *   1. 原书为双栏排版，部分题目的选项、答案字母在与下一栏文字交错时出现排版乱码（如
 *      「发甘/口区血/黄瘟」应为「发绀/呕血/黄疸」，「蒙古膜/勃膜/黠膜」应为「黏膜/黏液」，
 *      「蜘蛛痞」应为「蜘蛛痣」，「岩裂」应为「肛裂」，「踊尾虫」应为「蛔虫」，「顿餐」应为「钡餐」，
 *      「曙蛇蘑菇 5ml」等数字单位已按医学语义恢复为「µmol/L」），均按医学语义恢复为主题所指内容；
 *      所有题目均做轻度改写并重排选项，数值与临床细节保留原值。
 *   2. 少量选项文字在原书 PDF 中未完整呈现（双栏排版丢字），无法可靠确认其原文，按医学语义
 *      保守复原并在对应 item 的答案解析中注明「复原」字样的位置：呕血 A3 组第 1 题选项 C
 *      （复原为「消化性溃疡」）；腹痛 A3 组（4～5 题）第 4 题选项 E（复原为「十二指肠溃疡」）；
 *      腹痛 B1 组（5～8 题）未用选项 E（复原为「急性胃炎」）；黄疸 A1 第 6 题选项 C（复原为
 *      「原发性胆汁性肝硬化」）。这些复原为译者对选项语义的最大概率推断，未做医学事实改动。
 *   3. 黄疸 B1 组（6–10 题）第 6 题题干文字为「血清中结合胆红素升高」，而核黄疸/新生儿
 *      核黄疸实由未结合胆红素显著升高所致（Crigler–Najjar 综合征为葡萄糖醛酸转移酶缺乏、
 *      非结合胆红素升高），原书题干措辞存在疑点；本题按原书参考答案标定 D（Crigler–Najjar
 *      综合征）并给出正确机制说明。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

/* =====================================================================
 * 第十二节 呕血（hematemesis）
 * ===================================================================== */

const hematemesisKp = "kp-diagnosis-hematemesis";
const hematemesisLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第十二节 呕血 习题（PDF 第44–46页）";

const hematemesisTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematemesis-s12-term001",
    order: 1,
    knowledgePointId: hematemesisKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：呕血",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呕血",
        "呕血（hematemesis）是上消化道疾病（指屈氏韧带以上的消化道，包括食管、胃、十二指肠以及肝、胆、胰，及胃空肠吻合术后的空肠上段疾病）或全身性疾病所致的上消化道出血，血液经口腔呕出。常伴有黑便，严重时可有急性周围循环衰竭的表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const hematemesisA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematemesis-s12-a1001",
    order: 1,
    knowledgePointId: hematemesisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列各项中，不属于上消化道出血的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胆道出血",
      "空肠上段血管畸形出血",
      "反流性食管炎伴出血",
      "消化性溃疡伴出血",
      "急性胰腺炎合并脓肿或囊肿出血",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "空肠上段血管畸形出血",
        "上消化道指屈氏韧带以上的消化道；空肠位于屈氏韧带以下，属下消化道，故空肠上段血管畸形出血不属于上消化道出血。胆道、反流性食管炎、消化性溃疡及胰腺病变并发出血等均属上消化道出血范畴。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-a1002",
    order: 2,
    knowledgePointId: hematemesisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于呕血，下列叙述不正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "病因多见于消化性溃疡",
      "血中混有食物残渣、胃液",
      "上消化道出血都有呕血",
      "出血方式为呕出",
      "出血前常有恶心症状",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上消化道出血都有呕血",
        "并非所有上消化道出血都表现为呕血；出血量小或出血部位靠近十二指肠以下者仅表现为黑便。故「上消化道出血都有呕血」的说法不正确。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-a1003",
    order: 3,
    knowledgePointId: hematemesisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "呕血最常见的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "急性胃黏膜病变",
      "食管溃疡",
      "消化性溃疡",
      "食管静脉曲张破裂出血",
      "胃癌",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "消化性溃疡",
        "引起呕血最常见的疾病是消化性溃疡，其中以十二指肠溃疡出血更为多见。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-a1004",
    order: 4,
    knowledgePointId: hematemesisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于呕血的颜色，下列叙述正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "出血速度慢时色鲜红",
      "出血量小时色鲜红",
      "出血量大、速度快时色鲜红",
      "出血量大时咖啡色",
      "出血速度快时咖啡色",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "出血量大、速度快时色鲜红",
        "出血量大、速度快时血液在胃内停留时间短，未经胃酸充分作用，呕出为鲜红色；出血量小或速度慢时血液在胃内停留较久，经胃酸作用色偏棕褐或咖啡色。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-a1005",
    order: 5,
    knowledgePointId: hematemesisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "呕吐物可呈咖啡色，是因为其中含有下列哪种成分？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "酸化结合珠蛋白",
      "硫化亚铁",
      "酸化正铁血红蛋白",
      "硫化铁",
      "酸化亚铁血红蛋白",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "酸化正铁血红蛋白",
        "血液在胃内滞留，血红蛋白中的铁被胃酸氧化成正铁血红素（即酸化正铁血红蛋白/酸性正铁血红素），使呕吐物呈咖啡渣样或咖啡色。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const hematemesisA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematemesis-s12-a2001",
    order: 1,
    knowledgePointId: hematemesisKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，26 岁。反复中上腹不适 5 年，间断发作，饥饿痛，进食后缓解，伴呕血、黑便。首先应考虑的诊断是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "功能性消化不良",
      "消化性溃疡",
      "慢性胃炎",
      "慢性胆囊炎",
      "胃食管反流病",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "消化性溃疡",
        "反复中上腹饥饿痛、进食后缓解并伴呕血、黑便，为消化性溃疡（尤其十二指肠溃疡）的典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-a2002",
    order: 2,
    knowledgePointId: hematemesisKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，65 岁。呕血、黑便 1 天，冠心病 10 年，近期口服华法林和阿司匹林，既往无消化系统疾病。首先应考虑的诊断是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "慢性胃炎",
      "急性胃黏膜病变",
      "胃癌",
      "食管癌",
      "消化性溃疡",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性胃黏膜病变",
        "老年患者近期服用阿司匹林、华法林等抗凝抗栓药物后出现急性呕血、黑便，既往无消化病史，首先考虑药物引起的急性胃黏膜病变（糜烂出血性胃炎）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 呕血 B2（共用题干 A3/A4）组 */
const hematemesisB001SharedPrompt =
  "男性，35 岁。既往体健，1 天前突然出现呕血，伴腹痛、黄疸。查体：巩膜轻度黄染，中上腹轻压痛。1 周前曾因车祸受伤。";

const hematemesisB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematemesis-s12-b001m1",
    order: 1,
    knowledgePointId: hematemesisKp,
    questionKind: "b2",
    status: "available",
    prompt: "可能性最小的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "急性胃黏膜病变",
      "贲门黏膜撕裂伤",
      "消化性溃疡",
      "胆道出血",
      "急性出血性胃炎",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "消化性溃疡",
        "该病人急性起病并有车祸外伤史，表现更符合外伤相关的急性胃黏膜病变或胆道出血等；消化性溃疡一般具有慢性病程，本例缺乏慢性病史依据，可能性最小。（注：原书备选答案之 C 选项文字在 PDF 双栏排版中未完整呈现，此处按医学语义复原为「消化性溃疡」。）",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-b001m2",
    order: 2,
    knowledgePointId: hematemesisKp,
    questionKind: "b2",
    status: "available",
    prompt: "为了明确诊断，应首先进行的辅助检查是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "结肠镜检查",
      "X 线胃肠钡餐造影",
      "癌胚抗原测定",
      "胃镜检查",
      "腹部 X 线透视",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胃镜检查",
        "急性上消化道出血首选胃镜检查，以直接明确出血部位与原因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-b001m3",
    order: 3,
    knowledgePointId: hematemesisKp,
    questionKind: "b2",
    status: "available",
    prompt: "如果以上检查结果均阴性，需要进一步排查的脏器病变位于何处？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["结肠", "胆道", "脾脏", "小肠", "心脏"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胆道",
        "该病人呕血伴黄疸且有车祸外伤史，胃镜等检查阴性时需进一步排查胆道出血等胆道病变；胆道出血可表现呕血伴黄疸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 呕血 B1 组一（1–4 题共用备选答案） */
const hematemesisB002SharedChoices = [
  "贲门黏膜撕裂伤",
  "消化性溃疡",
  "食管、胃底静脉曲张破裂",
  "食管癌",
  "胃癌",
];

const hematemesisB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematemesis-s12-b002m1",
    order: 1,
    knowledgePointId: hematemesisKp,
    questionKind: "b1",
    status: "available",
    prompt: "既往体健，反复呕吐后出现呕血，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "贲门黏膜撕裂伤",
        "反复剧烈呕吐损伤食管与胃连接处黏膜（Mallory–Weiss 综合征）引起呕血，多发生于既往体健者反复呕吐之后。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-b002m2",
    order: 2,
    knowledgePointId: hematemesisKp,
    questionKind: "b1",
    status: "available",
    prompt: "反复中上腹饥饿痛，进食缓解，伴呕血，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "消化性溃疡",
        "饥饿痛、进食可缓解并伴呕血，为消化性溃疡出血的典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-b002m3",
    order: 3,
    knowledgePointId: hematemesisKp,
    questionKind: "b1",
    status: "available",
    prompt: "既往有肝硬化病史，突然呕血 1000ml，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "食管、胃底静脉曲张破裂",
        "肝硬化门静脉高压致食管胃底静脉曲张，常于诱因下突然破裂导致大量呕血。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-b002m4",
    order: 4,
    knowledgePointId: hematemesisKp,
    questionKind: "b1",
    status: "available",
    prompt: "中上腹不适半年，无吞咽梗阻，反复黑便，消瘦，呕血 1 天，可见于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胃癌",
        "中上腹不适伴消瘦、反复黑便并呕血，无吞咽梗阻，为胃癌伴出血的常见表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 呕血 B1 组二（5–7 题共用备选答案） */
const hematemesisB003SharedChoices = [
  "腹痛、黑便、呕吐咖啡色液体，伴四肢伸面关节紫癜",
  "呕血伴进行性黄疸、腹痛",
  "呕血伴进行性吞咽梗阻",
  "近期有进食毒菌历史，呕血、伴皮肤瘀斑、黄疸",
  "呕血伴黏液脓血便",
];

const hematemesisB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematemesis-s12-b003m1",
    order: 1,
    knowledgePointId: hematemesisKp,
    questionKind: "b1",
    status: "available",
    prompt: "肝功能衰竭可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "近期有进食毒菌历史，呕血、伴皮肤瘀斑、黄疸",
        "毒蕈中毒可致急性肝损伤甚至肝衰竭，出现呕血、皮肤瘀斑（凝血异常）及黄疸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-b003m2",
    order: 2,
    knowledgePointId: hematemesisKp,
    questionKind: "b1",
    status: "available",
    prompt: "过敏性紫癜可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "腹痛、黑便、呕吐咖啡色液体，伴四肢伸面关节紫癜",
        "过敏性紫癜可致腹型紫癜（腹痛、黑便、呕血）并伴四肢及关节伸面皮肤紫癜。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-b003m3",
    order: 3,
    knowledgePointId: hematemesisKp,
    questionKind: "b1",
    status: "available",
    prompt: "食管癌可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呕血伴进行性吞咽梗阻",
        "食管癌进行性梗阻导致食管狭窄，病变破溃出血可伴呕血。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const hematemesisShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematemesis-s12-sa001",
    order: 1,
    knowledgePointId: hematemesisKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "如何通过症状判断失血占循环血容量的比重？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "如何通过症状判断失血占循环血容量的比重",
        "出血量占循环血容量 10% 以下时，病人一般无明显临床表现；出血量占循环血容量的 10%～20% 时，可有头晕、无力等症状，多元血压、脉搏等变化；出血量达循环血容量的 20% 以上时，则有冷汗、四肢厥冷、心慌、脉搏增快等急性失血症状；若出血量在循环血容量的 30% 以上，则有神志不清、面色苍白、心率加快、脉搏细弱、血压下降、呼吸急促等急性周围循环衰竭的表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-sa002",
    order: 2,
    knowledgePointId: hematemesisKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述呕血的病因。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呕血的病因",
        "呕血的病因包括：（1）消化系统疾病：①食管疾病；②胃及十二指肠疾病；③门静脉高压引起的食管胃底静脉曲张破裂或门静脉高压性胃病出血。（2）上消化道邻近器官或组织的疾病：胆道结石、胆道蛔虫、胆囊癌、胆管癌及壶腹癌出血均可引起大量血液流入十二指肠导致呕血；此外还有急、慢性胰腺炎，胰腺癌合并脓肿破溃，主动脉瘤破入食管、胃或十二指肠，纵隔肿瘤破入食管等。（3）全身性疾病：①血液系统疾病；②感染性疾病；③结缔组织病；④其他：尿毒症、肺源性心脏病、呼吸功能衰竭等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const hematemesisGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-hematemesis-s12-b001",
    order: 1,
    questionKind: "b2",
    status: "available",
    groupPrompt: hematemesisB001SharedPrompt,
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: hematemesisB001Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-b002",
    order: 2,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: hematemesisB002SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: hematemesisB002Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematemesis-s12-b003",
    order: 3,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: hematemesisB003SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematemesisLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: hematemesisB003Members,
    sourceIds: [],
  },
];

/* =====================================================================
 * 第十三节 便血（hematochezia）
 * ===================================================================== */

const hematocheziaKp = "kp-diagnosis-hematochezia";
const hematocheziaLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第十三节 便血 习题（PDF 第46–49页）";

const hematocheziaTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematochezia-s13-term001",
    order: 1,
    knowledgePointId: hematocheziaKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：隐血便",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "隐血便",
        "消化道出血每日在 5～10ml 以内者，无肉眼可见的粪便颜色改变，需用隐血试验才能确定，称为隐血便。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const hematocheziaA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematochezia-s13-a1001",
    order: 1,
    knowledgePointId: hematocheziaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "黑便的化学成分是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "硫化亚铁",
      "酸化正铁血红蛋白",
      "硫化铁",
      "酸化亚铁血红蛋白",
      "酸化结合珠蛋白",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "硫化亚铁",
        "血液中的铁在肠道内与硫化物结合形成硫化亚铁，使粪便呈黑色（柏油样便）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-a1002",
    order: 2,
    knowledgePointId: hematocheziaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于便血，下列表述不正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "黑便一定是上消化道出血",
      "呕血是上消化道出血",
      "暗红色血便既可以是上消化道出血，也可以是下消化道出血",
      "便血伴冷汗、四肢厥冷、心慌、脉搏增快说明失血量达血容量 20% 以上",
      "大便颜色正常，隐血阳性，说明失血量至少 5ml",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "黑便一定是上消化道出血",
        "黑便可由上消化道出血引起，也可由右（升）结肠出血在肠内停留久、或口服铁剂、铋剂等药物所致，故「黑便一定是上消化道出血」的说法不正确，其余表述正确。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-a1003",
    order: 3,
    knowledgePointId: hematocheziaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪种情况不可能出现黑便？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "口服铁剂",
      "服用丽珠得乐（铋剂）",
      "痔疮伴出血",
      "食用动物血",
      "消化性溃疡",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "痔疮伴出血",
        "痔疮出血多表现为排便后滴鲜血，一般不会形成黑便；口服铁剂、服用铋剂、食用动物血及消化性溃疡出血均可能引起黑便或隐血阳性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-a1004",
    order: 4,
    knowledgePointId: hematocheziaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "黏液脓血便伴里急后重，最常见于下列哪种疾病？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "结肠血管畸形",
      "急性细菌性痢疾",
      "结肠癌",
      "痔疮",
      "Crohn 病",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性细菌性痢疾",
        "黏液脓血便伴里急后重为直肠刺激征象，最常见于急性细菌性痢疾。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const hematocheziaA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematochezia-s13-a2001",
    order: 1,
    knowledgePointId: hematocheziaKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，36 岁。黑便 5 天，无呕血、无头晕心慌，查体：生命体征平稳，查见肝掌、蜘蛛痣。消化道出血的原因首先应考虑的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "消化性溃疡",
      "胃癌",
      "食管、胃底静脉曲张破裂",
      "肝硬化门静脉高压性胃病",
      "胆管癌",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝硬化门静脉高压性胃病",
        "肝掌、蜘蛛痣提示慢性肝病（肝硬化）。该病人出血不太急、生命体征平稳且无呕血，更符合肝硬化门静脉高压性胃病出血。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-a2002",
    order: 2,
    knowledgePointId: hematocheziaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "女性，35 岁。反复黏液脓血便 2 年，最可能的原因是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "消化性溃疡",
      "Crohn 病",
      "结肠癌",
      "溃疡性结肠炎",
      "肠结核",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "溃疡性结肠炎",
        "反复黏液脓血便达 2 年、病程慢性，最常见于溃疡性结肠炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 便血 B2（共用题干 A3/A4）组 */
const hematocheziaB001SharedPrompt =
  "男性，35 岁。暗红色血便 3 天，伴头晕、心慌、冷汗、黑朦。既往体健。查体：HR 110 次/分，BP 90/60mmHg，腹部无阳性发现。";

const hematocheziaB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematochezia-s13-b001m1",
    order: 1,
    knowledgePointId: hematocheziaKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人出血部位在哪里？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "下消化道出血",
      "上消化道出血",
      "中消化道出血",
      "中、下消化道出血都有可能",
      "上、中、下消化道出血都有可能",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "上、中、下消化道出血都有可能",
        "暗红色血便可为上消化道、中消化道或下消化道出血所致，且本例查体无阳性定位体征，故上、中、下消化道均有可能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-b001m2",
    order: 2,
    knowledgePointId: hematocheziaKp,
    questionKind: "b2",
    status: "available",
    prompt: "为了明确出血原因，首先进行的检查是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "腹部 X 线透视",
      "X 线胃肠钡餐造影",
      "胃镜检查",
      "腹部 CT",
      "癌胚抗原测定",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胃镜检查",
        "需首先排除上消化道出血，故首选胃镜检查。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-b001m3",
    order: 3,
    knowledgePointId: hematocheziaKp,
    questionKind: "b2",
    status: "available",
    prompt: "如果以上检查结果均阴性，还需要安排的检查是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "腹部彩超",
      "腹腔血管造影",
      "结肠镜检查",
      "腹部 MRI",
      "腹腔核素扫描",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "结肠镜检查",
        "胃镜及上述检查阴性时，需行结肠镜检查以排查下消化道出血病变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 便血 B1 组一（1–4 题共用备选答案） */
const hematocheziaB002SharedChoices = [
  "便后滴血",
  "柏油便",
  "黏液脓血便",
  "洗肉水样便",
  "果酱样黏液血便",
];

const hematocheziaB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematochezia-s13-b002m1",
    order: 1,
    knowledgePointId: hematocheziaKp,
    questionKind: "b1",
    status: "available",
    prompt: "急性细菌性痢疾可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "黏液脓血便",
        "急性细菌性痢疾里急后重，排黏液脓血便。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-b002m2",
    order: 2,
    knowledgePointId: hematocheziaKp,
    questionKind: "b1",
    status: "available",
    prompt: "阿米巴痢疾可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "果酱样黏液血便",
        "阿米巴痢疾常排果酱样黏液血便。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-b002m3",
    order: 3,
    knowledgePointId: hematocheziaKp,
    questionKind: "b1",
    status: "available",
    prompt: "胃溃疡可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "柏油便",
        "胃溃疡出血在胃内氧化较充分，血液经肠道可表现为柏油样黑便。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-b002m4",
    order: 4,
    knowledgePointId: hematocheziaKp,
    questionKind: "b1",
    status: "available",
    prompt: "急性出血坏死性肠炎可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "洗肉水样便",
        "急性出血坏死性肠炎有消化道出血，可排洗肉水样大便并伴肠坏死表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 便血 B1 组二（5–7 题共用备选答案） */
const hematocheziaB003SharedChoices = [
  "腹痛、黑便、呕吐咖啡色液体",
  "暗红色血便伴腹痛、腹部包块",
  "鲜红色血便，伴脐周疼痛，便后滴血",
  "黏液脓血便",
  "间断黑便伴黄疸",
];

const hematocheziaB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematochezia-s13-b003m1",
    order: 1,
    knowledgePointId: hematocheziaKp,
    questionKind: "b1",
    status: "available",
    prompt: "结肠癌可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "暗红色血便伴腹痛、腹部包块",
        "结肠癌可致暗红色血便，并伴腹痛、腹部包块等表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-b003m2",
    order: 2,
    knowledgePointId: hematocheziaKp,
    questionKind: "b1",
    status: "available",
    prompt: "肛裂可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "鲜红色血便，伴脐周疼痛，便后滴血",
        "肛裂常表现为便时便后滴鲜红色血，并伴排便时/便后肛门（OPM 见校）疼痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-b003m3",
    order: 3,
    knowledgePointId: hematocheziaKp,
    questionKind: "b1",
    status: "available",
    prompt: "胆道出血可见上述的临床表现是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "间断黑便伴黄疸",
        "胆道出血血液进入肠道可致黑便，并常伴胆道梗阻引起的黄疸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const hematocheziaShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematochezia-s13-sa001",
    order: 1,
    knowledgePointId: hematocheziaKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述便血的常见病因。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "便血的常见病因",
        "引起便血的原因很多，常见于下列疾病：（1）下消化道疾病：①小肠疾病；②结肠疾病；③直肠肛管疾病；④血管病变。（2）上消化道疾病。（3）全身性疾病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-sa002",
    order: 2,
    knowledgePointId: hematocheziaKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述便血的临床表现。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "便血的临床表现",
        "便血多为下消化道出血，可表现为急性大出血、慢性少量出血及间歇性出血。便血颜色可因出血部位不同、出血量的多少以及血液在肠腔内停留时间的长短而异：如出血量多、速度快则呈鲜红色；若出血量小、速度慢、血液在肠道内停留时间较长，可为暗红色。粪便可全为血液或混有粪便，也可仅带附于粪便表面或于排便后肛门滴血。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const hematocheziaGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-hematochezia-s13-b001",
    order: 1,
    questionKind: "b2",
    status: "available",
    groupPrompt: hematocheziaB001SharedPrompt,
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: hematocheziaB001Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-b002",
    order: 2,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: hematocheziaB002SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: hematocheziaB002Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematochezia-s13-b003",
    order: 3,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: hematocheziaB003SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hematocheziaLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: hematocheziaB003Members,
    sourceIds: [],
  },
];

/* =====================================================================
 * 第十四节 腹痛（abdominal-pain）
 * ===================================================================== */

const abdominalPainKp = "kp-diagnosis-abdominal-pain";
const abdominalPainLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第十四节 腹痛 习题（PDF 第49–52页）";

const abdominalPainTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-abdominal-pain-s14-term001",
    order: 1,
    knowledgePointId: abdominalPainKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：躯体性腹痛",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "躯体性腹痛",
        "躯体性腹痛是由来自腹膜壁层及腹壁的痛觉信号，经体神经传至脊神经根，反映到相应脊髓节段所支配的皮肤所引起。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-term002",
    order: 2,
    knowledgePointId: abdominalPainKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：牵涉痛",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "牵涉痛",
        "牵涉痛指内脏性疼痛牵涉到身体体表部位，即内脏痛觉信号传至相应脊髓节段，引起该节段支配的体表部位疼痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const abdominalPainA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-abdominal-pain-s14-a1001",
    order: 1,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可引起呕吐伴右上腹痛、发热、黄疸的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肠系膜淋巴结核",
      "肠道炎症",
      "肝、胆系统感染",
      "尿路结石",
      "消化性溃疡",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝、胆系统感染",
        "呕吐伴右上腹痛、发热、黄疸符合肝、胆系统感染（胆系感染）的典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-a1002",
    order: 2,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列表现为慢性腹痛的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "急性胆囊炎",
      "卵巢囊肿蒂扭转",
      "急性胰腺炎",
      "结核性腹膜炎",
      "尿路结石",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "结核性腹膜炎",
        "结核性腹膜炎病程较长，常表现为慢性腹痛；急性胰腺炎、急性胆囊炎、卵巢囊肿蒂扭转、尿路结石多急性起病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-a1003",
    order: 3,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列常引起空腹疼痛的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胆囊炎",
      "胰腺炎",
      "十二指肠溃疡",
      "肝炎",
      "胃溃疡",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "十二指肠溃疡",
        "十二指肠溃疡多表现为饥饿痛、空腹及夜间疼痛，进食后缓解。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-a1004",
    order: 4,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "左侧卧位可使疼痛减轻，提示的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胰头癌",
      "反流性食管炎",
      "胃黏膜脱垂",
      "病毒性肝炎",
      "十二指肠溃疡",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胃黏膜脱垂",
        "胃黏膜脱垂患者左侧卧位时疼痛可减轻，右侧卧位时可加重。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-a1005",
    order: 5,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "膝胸位或俯卧位可使疼痛减轻，提示的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "反流性食管炎",
      "胰头癌",
      "病毒性肝炎",
      "十二指肠壅滞症",
      "胃黏膜脱垂",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "十二指肠壅滞症",
        "十二指肠壅滞症患者采取膝胸位或俯卧位时，可减轻肠系膜上动脉对十二指肠的压迫，因而疼痛减轻。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-a1006",
    order: 6,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于腹痛部位，下列叙述正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肝脓肿疼痛多在中下腹",
      "急性阑尾炎疼痛在右下腹麦氏点",
      "胃、十二指肠溃疡疼痛多在脐周",
      "小肠疾病多在右上腹部",
      "胆囊炎疼痛多在左上腹",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性阑尾炎疼痛在右下腹麦氏点",
        "急性阑尾炎初为脐周或上腹部疼痛，典型者随后转移并固定于右下腹麦氏点，该描述正确；其余选项腹痛部位描述均有误。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-a1007",
    order: 7,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪一项不是内脏性腹痛的特点？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "疼痛部位接近腹中线",
      "常伴自主神经兴奋症状",
      "疼痛感觉模糊",
      "腹痛可因体位变化加重",
      "疼痛部位不明确",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "腹痛可因体位变化加重",
        "内脏性腹痛的特点为疼痛部位不明确、接近腹中线、疼痛感觉模糊，常伴恶心、呕吐、出汗等自主神经兴奋症状；腹痛可因体位变化加重为躯体性（壁层腹膜受刺激）腹痛的特点，故不是内脏性腹痛的特点。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const abdominalPainA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-abdominal-pain-s14-a2001",
    order: 1,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，30 岁。早期腹痛位于脐周，伴恶心、呕吐，住院诊断为急性阑尾炎。其腹痛发生的机制是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "中枢性腹痛",
      "躯体性腹痛",
      "内脏性腹痛",
      "反射性腹痛",
      "牵涉痛",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "内脏性腹痛",
        "早期阑尾腔轻度扩张刺激内脏神经，疼痛多位于脐周、部位模糊且伴恶心，属内脏性腹痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-a2002",
    order: 2,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，16 岁。10 小时前脐周痛，现腹痛加剧并转移至右下腹，病变尚未波及腹膜壁层，诊断为急性阑尾炎。其腹痛发生的机制是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "反射性腹痛",
      "内脏性腹痛",
      "中枢性腹痛",
      "牵涉痛",
      "躯体性腹痛",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "牵涉痛",
        "病变尚未波及腹膜壁层而以右下腹转移痛为主，为内脏痛信号传至相应脊髓节段引起该节段支配体表部位疼痛，属牵涉痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-a2003",
    order: 3,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性,35 岁。进餐后出现上腹痛，呈剧烈绞痛，查体见表情痛苦、不安。该病人最可能的诊断是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "急性胃炎",
      "急性胆囊炎",
      "急性心肌梗死",
      "急性阑尾炎",
      "急性胰腺炎",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性胆囊炎",
        "进餐后出现上腹剧烈绞痛，多见于急性胆囊炎等胆系疾病所致的胆绞痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-a2004",
    order: 4,
    knowledgePointId: abdominalPainKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，60 岁。反复冬季上腹痛 3 年，腹痛多于餐后半小时发作，餐前缓解。查体：神志清，无贫血貌，腹部剑突下压痛（＋），肝脾未触及。最可能的疾病是哪一项",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "十二指肠溃疡",
      "胃癌",
      "慢性胆囊炎",
      "慢性胃炎",
      "胃溃疡",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胃溃疡",
        "腹痛于餐后（餐后半小时）发作、餐前缓解，符合胃溃疡的疼痛规律。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 腹痛 B2 组一（1–3 题共用题干） */
const abdominalPainB001SharedPrompt =
  "病人，男，50 岁。中上腹饥饿性疼痛反复发作近 20 年，伴反酸、嗳气，服用抑酸药后可缓解。";

const abdominalPainB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-abdominal-pain-s14-b001m1",
    order: 1,
    knowledgePointId: abdominalPainKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人最可能的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胃癌",
      "十二指肠溃疡",
      "胰腺癌",
      "慢性胆囊炎",
      "慢性胃炎",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "十二指肠溃疡",
        "长期中上腹饥饿性疼痛伴反酸嗳气、抑酸药可缓解，为十二指肠溃疡的典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b001m2",
    order: 2,
    knowledgePointId: abdominalPainKp,
    questionKind: "b2",
    status: "available",
    prompt: "病人 3 小时前突发中上腹剧烈腹痛，呈刀割样。该病人可能出现的并发症是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胃癌并发幽门梗阻",
      "急性胆囊炎并发胆汁性腹膜炎",
      "十二指肠溃疡并发急性穿孔",
      "急性胰腺炎并发出血坏死",
      "胰腺癌并发肠梗阻",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "十二指肠溃疡并发急性穿孔",
        "突发刀割样剧烈腹痛提示溃疡溃穿至腹腔，为十二指肠溃疡的急性穿孔并发症。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b001m3",
    order: 3,
    knowledgePointId: abdominalPainKp,
    questionKind: "b2",
    status: "available",
    prompt: "如进行腹部检查，最具有诊断价值的体征是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "腹壁柔韧感",
      "墨菲征阳性",
      "肠鸣音亢进",
      "肝浊音界消失或缩小",
      "腹肌紧张",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝浊音界消失或缩小",
        "溃疡穿孔后气体进入腹腔（气腹），致肝浊音界缩小或消失，对该并发症最有诊断价值。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 腹痛 B2 组二（4–5 题共用题干） */
const abdominalPainB002SharedPrompt =
  "病人，男，60 岁。反复上腹痛 25 年，近年来消瘦、乏力，持续性呕吐宿食，腹痛规律改变。";

const abdominalPainB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-abdominal-pain-s14-b002m1",
    order: 1,
    knowledgePointId: abdominalPainKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人最可能的诊断是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "反流性食管炎",
      "十二指肠溃疡",
      "胃癌",
      "慢性胃炎",
      "胃多发性溃疡",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胃癌",
        "老年患者长期上腹痛规律改变、消瘦乏力并呕吐宿食，提示胃癌可能。（注：原书备选答案之 E 选项文字在 PDF 双栏排版中未完整呈现，此处按医学语义复原为「十二指肠溃疡」。）",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b002m2",
    order: 2,
    knowledgePointId: abdominalPainKp,
    questionKind: "b2",
    status: "available",
    prompt: "为明确诊断，应首选的检查是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "上消化道钡餐造影",
      "腹部超声",
      "立位腹部 X 线平片",
      "卧位腹部 X 线平片",
      "胃镜检查",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胃镜检查",
        "疑诊胃癌者应首选胃镜检查并取活组织病理确诊。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 腹痛 B1 组一（1–4 题共用备选答案） */
const abdominalPainB003SharedChoices = [
  "溃疡性结肠炎",
  "急性胆道感染",
  "肾绞痛",
  "肠梗阻",
  "胆囊炎",
];

const abdominalPainB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-abdominal-pain-s14-b003m1",
    order: 1,
    knowledgePointId: abdominalPainKp,
    questionKind: "b1",
    status: "available",
    prompt: "腹痛伴发热、寒战",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性胆道感染",
        "腹痛伴发热、寒战，提示急性胆道感染等全身炎症反应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b003m2",
    order: 2,
    knowledgePointId: abdominalPainKp,
    questionKind: "b1",
    status: "available",
    prompt: "腹痛伴黏液脓血便",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "溃疡性结肠炎",
        "溃疡性结肠炎常表现为腹痛伴黏液脓血便。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b003m3",
    order: 3,
    knowledgePointId: abdominalPainKp,
    questionKind: "b1",
    status: "available",
    prompt: "腹痛伴呕吐、排气排便停止",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠梗阻",
        "腹痛伴呕吐、肛门停止排气排便为肠梗阻的典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b003m4",
    order: 4,
    knowledgePointId: abdominalPainKp,
    questionKind: "b1",
    status: "available",
    prompt: "腹痛伴尿频、尿急，有血尿",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肾绞痛",
        "肾绞痛常为腰部绞痛并向下放射，可伴尿频、尿急及血尿。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 腹痛 B1 组二（5–8 题共用备选答案） */
const abdominalPainB004SharedChoices = [
  "胆道蛔虫症",
  "消化性溃疡",
  "急性胰腺炎",
  "十二指肠穿孔",
  "急性胃炎",
];

const abdominalPainB004Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-abdominal-pain-s14-b004m1",
    order: 1,
    knowledgePointId: abdominalPainKp,
    questionKind: "b1",
    status: "available",
    prompt: "腹痛有周期性、节律性、季节性",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "消化性溃疡",
        "消化性溃疡腹痛具有周期性、节律性与季节性等特点。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b004m2",
    order: 2,
    knowledgePointId: abdominalPainKp,
    questionKind: "b1",
    status: "available",
    prompt: "腹痛为钻顶样感",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胆道蛔虫症",
        "胆道蛔虫症腹痛多呈剧烈钻顶样绞痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b004m3",
    order: 3,
    knowledgePointId: abdominalPainKp,
    questionKind: "b1",
    status: "available",
    prompt: "突发中上腹剧烈刀割样痛",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "十二指肠穿孔",
        "十二指肠溃疡穿孔常表现为突发中上腹刀割样剧烈腹痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b004m4",
    order: 4,
    knowledgePointId: abdominalPainKp,
    questionKind: "b1",
    status: "available",
    prompt: "上腹部持续刀割样疼痛呈阵发性加剧",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性胰腺炎",
        "急性胰腺炎常表现为上腹部持续刀割样疼痛、阵发性加剧，并向腰背放射。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const abdominalPainShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-abdominal-pain-s14-sa001",
    order: 1,
    knowledgePointId: abdominalPainKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述肠绞痛、胆绞痛、肾绞痛的区别。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠绞痛、胆绞痛、肾绞痛的区别",
        "三者的区别如下：①肠绞痛：疼痛多位于脐周围、下腹部，伴有恶心、呕吐、腹泻、便秘、肠鸣音增加等。②胆绞痛：疼痛常位于右上腹，放射至右背与右肩胛，常有黄疸、发热，肝可触及或 Murphy 征阳性。③肾绞痛：疼痛位于腰部并向下放射，可达腹股沟、外生殖器及大腿内侧，常有尿频、尿急，小便含蛋白质、红细胞等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const abdominalPainGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-abdominal-pain-s14-b001",
    order: 1,
    questionKind: "b2",
    status: "available",
    groupPrompt: abdominalPainB001SharedPrompt,
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: abdominalPainB001Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b002",
    order: 2,
    questionKind: "b2",
    status: "available",
    groupPrompt: abdominalPainB002SharedPrompt,
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: abdominalPainB002Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b003",
    order: 3,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: abdominalPainB003SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: abdominalPainB003Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-abdominal-pain-s14-b004",
    order: 4,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: abdominalPainB004SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: abdominalPainLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: abdominalPainB004Members,
    sourceIds: [],
  },
];

/* =====================================================================
 * 第十五节 腹泻（diarrhea）
 * ===================================================================== */

const diarrheaKp = "kp-diagnosis-diarrhea";
const diarrheaLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第十五节 腹泻 习题（PDF 第52–53页）";

const diarrheaTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-diarrhea-s15-term001",
    order: 1,
    knowledgePointId: diarrheaKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：腹泻",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: diarrheaLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "腹泻",
        "腹泻指排便次数增多，粪质稀薄或带有黏液、脓血及未消化的食物。如解水样便，每日 3 次以上，或每天粪便总量大于 200g，其中粪便含水量大于 80%，则可认为是腹泻。腹泻可分为急性与慢性两种，超过 2 个月者属慢性腹泻。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const diarrheaA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-diarrhea-s15-a1001",
    order: 1,
    knowledgePointId: diarrheaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "引起腹泻伴重度失水的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: diarrheaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肠结核",
      "溃疡性结肠炎",
      "霍乱",
      "肠伤寒",
      "吸收不良综合征",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "霍乱",
        "霍乱大量分泌性腹泻，常引起重度失水及电解质紊乱。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-diarrhea-s15-a1002",
    order: 2,
    knowledgePointId: diarrheaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "腹泻至少超过多少时间可称为慢性腹泻？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: diarrheaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["3 个月", "4 个月", "1 个月", "2 个月", "5 个月"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["2 个月", "腹泻持续超过 2 个月者属慢性腹泻。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-diarrhea-s15-a1003",
    order: 3,
    knowledgePointId: diarrheaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "腹泻伴皮疹或皮下出血，可见于下列哪种疾病？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: diarrheaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "霍乱",
      "细菌性食物中毒",
      "伤寒或副伤寒",
      "急性细菌性痢疾",
      "肠结核",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "伤寒或副伤寒",
        "伤寒可于胸、腹、背部出现玫瑰疹，并可因血管损伤出现皮下出血；腹泻伴皮疹或皮下出血多见于伤寒或副伤寒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-diarrhea-s15-a1004",
    order: 4,
    knowledgePointId: diarrheaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列引起腹泻的疾病中，属于肠道非感染性病变的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: diarrheaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肠结核",
      "血吸虫病",
      "慢性阿米巴痢疾",
      "慢性细菌性痢疾",
      "慢性非特异性溃疡性结肠炎",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "慢性非特异性溃疡性结肠炎",
        "慢性非特异性溃疡性结肠炎为非感染性炎症性肠病，其余疾病均由病原体感染所致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-diarrhea-s15-a1005",
    order: 5,
    knowledgePointId: diarrheaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列疾病所致的腹泻不属于分泌性腹泻的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: diarrheaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "血管活性肽瘤",
      "胃泌素瘤",
      "肠易激综合征",
      "慢性肠炎",
      "霍乱",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠易激综合征",
        "肠易激综合征腹泻多与肠动力及内脏敏感性异常有关，不属于分泌性腹泻；霍乱、胃泌素瘤、血管活性肽瘤及部分慢性肠炎（分泌型）多含分泌性腹泻机制。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 腹泻 B2（共用题干 A3/A4）组 */
const diarrheaB001SharedPrompt =
  "女性，18 岁。1 天前在路边摊点进餐后感头昏、疲劳，随后出现米汤样便，间断呕吐，不伴里急后重，大便量多，无黏液脓血。入院查体：体温、血压正常，腹部无压痛，未扪及包块。新鲜大便悬滴检查可见运动活泼呈穿梭状的弧菌。";

const diarrheaB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-diarrhea-s15-b001m1",
    order: 1,
    knowledgePointId: diarrheaKp,
    questionKind: "b2",
    status: "available",
    prompt: "对该病人腹泻的分类和原因说法正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: diarrheaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "慢性腹泻，为全身性感染",
      "急性腹泻，为全身性感染",
      "慢性腹泻，为肠道内感染",
      "急性腹泻，为肠道内感染",
      "急性腹泻，为急性中毒",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性腹泻，为肠道内感染",
        "病程仅 1 天、起病急，新鲜大便中见穿梭状弧菌（霍乱弧菌），为急性肠道内感染。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-diarrhea-s15-b001m2",
    order: 2,
    knowledgePointId: diarrheaKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人腹泻的发生机制是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: diarrheaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "动力性腹泻",
      "渗出性腹泻",
      "分泌性腹泻",
      "渗透性腹泻",
      "吸收不良性腹泻",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "分泌性腹泻",
        "米汤样便、量多且无黏液脓血，为霍乱弧菌肠毒素刺激肠上皮细胞过度分泌所致，属分泌性腹泻。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const diarrheaShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-diarrhea-s15-sa001",
    order: 1,
    knowledgePointId: diarrheaKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述腹泻的问诊要点。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: diarrheaLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "腹泻的问诊要点",
        "腹泻的问诊要点包括：①腹泻的起病；②大便的性状及臭味；③腹泻伴随症状：发热、腹痛、里急后重、贫血、水肿、营养不良等对判断病因有帮助；④同食者群集发病的历史；⑤腹泻加重、缓解的因素；⑥病后一般情况变化；⑦与腹泻相关的既往史及家族史。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const diarrheaGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-diarrhea-s15-b001",
    order: 1,
    questionKind: "b2",
    status: "available",
    groupPrompt: diarrheaB001SharedPrompt,
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: diarrheaLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: diarrheaB001Members,
    sourceIds: [],
  },
];

/* =====================================================================
 * 第十六节 便秘（constipation）
 * ===================================================================== */

const constipationKp = "kp-diagnosis-constipation";
const constipationLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第十六节 便秘 习题（PDF 第53–55页）";

const constipationTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-constipation-s16-term001",
    order: 1,
    knowledgePointId: constipationKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：便秘",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: constipationLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "便秘",
        "便秘是指大便次数减少，一般每周少于 3 次，排便困难，粪便干结。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const constipationA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-constipation-s16-a1001",
    order: 1,
    knowledgePointId: constipationKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列引起功能性便秘的原因是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: constipationLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "腹腔或盆腔内肿瘤的压迫",
      "直肠与肛门病变",
      "结肠运动功能紊乱",
      "局部病变导致排便无力",
      "结肠完全或不完全性梗阻",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "结肠运动功能紊乱",
        "结肠运动功能紊乱等肠蠕动功能障碍为功能性便秘的原因；肿瘤压迫、局部病变导致排便无力、肠道梗阻及直肠肛门病变等属器质性便秘。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-constipation-s16-a1002",
    order: 2,
    knowledgePointId: constipationKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列常引起便秘与腹泻交替出现的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: constipationLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Crohn 病",
      "阿米巴痢疾",
      "霍乱",
      "肠结核",
      "结肠癌",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠结核",
        "肠结核可致肠道吸收与运动功能紊乱，常表现便秘与腹泻交替。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-constipation-s16-a1003",
    order: 3,
    knowledgePointId: constipationKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "便秘伴腹部包块最常见的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: constipationLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "血吸虫病",
      "结肠癌",
      "肠结核",
      "溃疡性结肠炎",
      "肠易激综合征",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠结核",
        "肠结核可于右下腹触及包块，为便秘伴腹部包块的常见病因。（注：严格遵循原书参考答案标定，结肠癌亦可致腹部包块，此处以题集参考答案为准。）",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-constipation-s16-a1004",
    order: 4,
    knowledgePointId: constipationKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "便秘是指 7 天以内排便次数少于多少次？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: constipationLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["5 次", "2 次", "4 次", "3 次", "1 次"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "3 次",
        "便秘一般指每周排便少于 3 次，即排便次数显著减少（且伴排便困难、粪便干结）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-constipation-s16-a1005",
    order: 5,
    knowledgePointId: constipationKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列属于功能性便秘的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: constipationLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肠粘连",
      "先天性巨结肠症",
      "结肠良性或恶性肿瘤",
      "肠梗阻",
      "肠易激综合征",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠易激综合征",
        "肠易激综合征属功能性胃肠病，其便秘为功能性便秘；肠粘连、肠梗阻、先天性巨结肠症及结肠肿瘤、梗阻均属器质性便秘。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const constipationShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-constipation-s16-sa001",
    order: 1,
    knowledgePointId: constipationKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述便秘的分类与问诊要点。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: constipationLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "便秘的分类与问诊要点",
        "便秘可分为功能性便秘和器质性便秘两类。问诊要点包括：①询问病人所指便秘的确切含义，以确定是否便秘；②询问便秘的起病与病程，持续或间歇发作，诱发因素；③了解年龄、职业、生活（包括饮食）习惯；④询问是否长期服用泻药，是否有腹部、盆腔手术史；⑤询问有无可引起便秘的药物服用史；⑥询问伴随症状，有无恶心、呕吐、腹胀、痉挛性腹痛及里急后重感；⑦询问其他疾病情况，如代谢病、内分泌病、慢性铅中毒等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const constipationGroups: readonly AssessmentItemGroupDefinition[] = [];

/* =====================================================================
 * 第十七节 黄疸（jaundice）
 * ===================================================================== */

const jaundiceKp = "kp-diagnosis-jaundice";
const jaundiceLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第十七节 黄疸 习题（PDF 第55–58页）";

const jaundiceTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-jaundice-s17-term001",
    order: 1,
    knowledgePointId: jaundiceKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：黄疸",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "黄疸",
        "黄疸是由于血清中胆红素升高致使皮肤、黏膜和巩膜发黄的症状和体征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-term002",
    order: 2,
    knowledgePointId: jaundiceKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：隐性黄疸",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "隐性黄疸",
        "隐性黄疸是指血清胆红素在 17.1～34.2µmol/L 之间，临床上不易察觉的胆红素升高所致的症状与体征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const jaundiceA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-jaundice-s17-a1001",
    order: 1,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可引起呕吐伴右上腹痛、发热、黄疸的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "急性腹膜炎",
      "急性胰腺炎",
      "急性肠炎",
      "急性肾盂肾炎",
      "急性化脓性胆管炎",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "急性化脓性胆管炎",
        "呕吐伴右上腹痛、发热、黄疸为 Charcot 三联征表现，最常见于急性化脓性胆管炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-a1002",
    order: 2,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "常引起肝细胞性黄疸的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胆总管狭窄",
      "病毒性肝炎",
      "胆管癌",
      "原发性胆汁性肝硬化",
      "毛细胆管型病毒性肝炎",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "病毒性肝炎",
        "病毒性肝炎致肝细胞变性坏死，常引起肝细胞性黄疸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-a1003",
    order: 3,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "区别肝外胆管阻塞与肝内胆汁淤积性黄疸，最好的检查是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "X 线检查",
      "B 型超声",
      "CT",
      "经皮肝穿刺胆管造影（PTC）",
      "经十二指肠镜逆行胰胆管造影（ERCP）",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "经十二指肠镜逆行胰胆管造影（ERCP）",
        "ERCP 能直接显示胰胆管形态，判断有无肝外阻塞及阻塞部位，为区别肝外胆管阻塞与肝内胆汁淤积性黄疸最好的检查。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-a1004",
    order: 4,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "血清总胆红素（TB）的正常参考值是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "0.17～1.7µmol/L",
      "1.51～15.1µmol/L",
      "1.7～17.1µmol/L",
      "17～34µmol/L",
      "17～170µmol/L",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "1.7～17.1µmol/L",
        "血清总胆红素正常参考值为 1.7～17.1µmol/L。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-a1005",
    order: 5,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可引起黄疸、呕血、发热及全身皮肤黏膜出血的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "败血症",
      "慢性胃炎",
      "钩端螺旋体病",
      "化脓性胆管炎",
      "消化性溃疡",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "败血症",
        "败血症可致感染肝损害/溶血（黄疸）、凝血异常（皮肤黏膜出血）以及全身中毒表现（发热、呕血）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-a1006",
    order: 6,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可引起胆汁淤积性黄疸的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "流行性出血热",
      "原发性胆汁性肝硬化",
      "病毒性肝炎",
      "毛细胆管型病毒性肝炎",
      "药物性肝炎",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "毛细胆管型病毒性肝炎",
        "毛细胆管型病毒性肝炎以肝内胆汁淤积为主要表现，可引起胆汁淤积性黄疸。（注：原书备选答案之 C 选项文字在 PDF 双栏排版中未完整呈现，此处按医学语义复原为「原发性胆汁性肝硬化」。）",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-a1007",
    order: 7,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "血清结合胆红素的正常参考值是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "0～3.42µmol/L",
      "0.3～15.1µmol/L",
      "1.7～17.1µmol/L",
      "1.7～13.68µmol/L",
      "0.4～17.0µmol/L",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "0～3.42µmol/L",
        "血清结合胆红素正常参考值为 0～3.42µmol/L（均在总胆红素参考下限以下）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-a1008",
    order: 8,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "黄疸伴呕血见于下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胃黏膜脱垂症",
      "胆道疾病",
      "反流性食管炎",
      "消化性溃疡",
      "慢性胃炎",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胆道疾病",
        "胆道疾病出血可流入十二指肠并随消化道上行，表现为呕血，并常伴胆道梗阻所致的黄疸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-a1009",
    order: 9,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不属于胆汁淤积性黄疸的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肝内泥沙样结石",
      "肝硬化",
      "硬化型胆管炎",
      "原发性胆汁性肝硬化",
      "肝内胆管结石",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝硬化",
        "肝硬化以肝细胞性黄疸为主（可伴胆汁淤积成分），不属于典型的胆汁淤积性黄疸；肝内结石、硬化型胆管炎、原发性胆汁性肝硬化等为胆汁淤积性黄疸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-a1010",
    order: 10,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不属于先天性非溶血性黄疸的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Dubin-Johnson 综合征",
      "Gilbert 综合征",
      "遗传性球形红细胞增多症",
      "Crigler-Najjar 综合征",
      "Rotor 综合征",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "遗传性球形红细胞增多症",
        "遗传性球形红细胞增多症为红细胞膜异常所致溶血性黄疸，不属于先天性非溶血性黄疸；Dubin-Johnson、Gilbert、Crigler-Najjar、Rotor 综合征均为先天性非溶血性黄疸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-a1011",
    order: 11,
    knowledgePointId: jaundiceKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "引起黄疸的疾病中，下列不是后天获得性溶血性贫血的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "伯氨喹引起的贫血",
      "海洋性贫血",
      "蛇毒引起的溶血",
      "毒蕈引起的溶血",
      "不同血型输血后",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "海洋性贫血",
        "海洋性贫血（地中海贫血）为珠蛋白基因缺陷所致的遗传性溶血，不属于后天获得性溶血性贫血；其余各项均为后天获得性溶血原因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 黄疸 B2（共用题干 A3）组 */
const jaundiceB001SharedPrompt =
  "女性，42 岁。右上腹绞痛 3 小时入院。查体：皮肤、巩膜未见黄染。辅助检查：血清总胆红素 26µmol/L，超声示胆总管结石。";

const jaundiceB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-jaundice-s17-b001m1",
    order: 1,
    knowledgePointId: jaundiceKp,
    questionKind: "b2",
    status: "available",
    prompt: "关于黄疸的诊断，该病人符合哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "无黄疸",
      "隐性黄疸",
      "重度黄疸",
      "中度黄疸",
      "轻度黄疸",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "隐性黄疸",
        "血清总胆红素 26µmol/L 介于 17.1～34.2µmol/L 之间，皮肤巩膜未见黄染，符合隐性黄疸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b001m2",
    order: 2,
    knowledgePointId: jaundiceKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人行胆红素测定时，可出现的改变是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "结合胆红素/总胆红素比值明显下降",
      "结合胆红素/总胆红素比值<20%",
      "血清总胆红素和结合胆红素及非结合胆红素升高",
      "血清总胆红素和非结合胆红素升高",
      "血清总胆红素和结合胆红素升高",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "血清总胆红素和结合胆红素升高",
        "胆总管结石致胆汁排泄受阻，以结合胆红素升高为主，血清总胆红素与结合胆红素均升高。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b001m3",
    order: 3,
    knowledgePointId: jaundiceKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人的尿胆红素代谢检查可出现的改变是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胆红素阴性，尿胆原减少",
      "胆红素阳性，尿胆原中度升高",
      "胆红素强阳性，尿胆原减少",
      "胆红素阴性，尿胆原明显升高",
      "胆红素阴性，尿胆原正常",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胆红素强阳性，尿胆原减少",
        "梗阻性黄疸时结合胆红素升高使尿胆红素强阳性，胆红素进入肠道减少致尿胆原（来源减少）相应减少。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 黄疸 B1 组一（1–5 题共用备选答案） */
const jaundiceB002SharedChoices = [
  "胆石症",
  "迷路炎",
  "肠梗阻",
  "食物中毒",
  "幽门梗阻",
];

const jaundiceB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-jaundice-s17-b002m1",
    order: 1,
    knowledgePointId: jaundiceKp,
    questionKind: "b1",
    status: "available",
    prompt: "呕吐伴发热、黄疸",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胆石症",
        "胆石症可致胆道梗阻与感染，表现呕吐伴发热、黄疸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b002m2",
    order: 2,
    knowledgePointId: jaundiceKp,
    questionKind: "b1",
    status: "available",
    prompt: "呕吐伴眩晕、眼球震颤",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "迷路炎",
        "迷路炎为前庭功能障碍，表现为眩晕、眼球震颤并伴呕吐。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b002m3",
    order: 3,
    knowledgePointId: jaundiceKp,
    questionKind: "b1",
    status: "available",
    prompt: "呕吐伴腹泻、腹痛、少尿",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "食物中毒",
        "食物中毒常致呕吐、腹泻、腹痛，严重失水时可伴少尿。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b002m4",
    order: 4,
    knowledgePointId: jaundiceKp,
    questionKind: "b1",
    status: "available",
    prompt: "呕吐物量大，有粪臭味",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肠梗阻",
        "肠梗阻时呕吐物量大，可含粪样物质而有粪臭味。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b002m5",
    order: 5,
    knowledgePointId: jaundiceKp,
    questionKind: "b1",
    status: "available",
    prompt: "呕吐大量隔宿食物",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "幽门梗阻",
        "幽门梗阻致胃内容物滞留，可呕吐大量隔宿（宿食）食物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 黄疸 B1 组二（6–10 题共用备选答案） */
const jaundiceB003SharedChoices = [
  "溶血性黄疸",
  "肝硬化性黄疸",
  "胆汁淤积性黄疸",
  "Crigler-Najjar 综合征",
  "Rotor 综合征",
];

const jaundiceB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-jaundice-s17-b003m1",
    order: 1,
    knowledgePointId: jaundiceKp,
    questionKind: "b1",
    status: "available",
    prompt: "血清中结合胆红素升高，故可产生核黄疸（见于新生儿）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Crigler-Najjar 综合征",
        "Crigler-Najjar 综合征为葡萄糖醛酸转移酶缺乏所致，血清未结合胆红素显著升高，故易于发生核黄疸（新生儿）。注：核黄疸实由未结合胆红素明显升高引起，原书题干「结合胆红素升高」措辞有误，本题按原书参考答案标定 Crigler-Najjar 综合征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b003m2",
    order: 2,
    knowledgePointId: jaundiceKp,
    questionKind: "b1",
    status: "available",
    prompt: "血清中结合胆红素增加",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胆汁淤积性黄疸",
        "胆汁淤积性黄疸胆汁排泄受阻，血清结合胆红素增加明显。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b003m3",
    order: 3,
    knowledgePointId: jaundiceKp,
    questionKind: "b1",
    status: "available",
    prompt: "血清中结合胆红素与非结合胆红素均增加",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝硬化性黄疸",
        "肝硬化时肝细胞摄取、结合与排泄功能受损，血清结合与非结合胆红素均可升高。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b003m4",
    order: 4,
    knowledgePointId: jaundiceKp,
    questionKind: "b1",
    status: "available",
    prompt: "血清中总胆红素增加，以非结合胆红素为主",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "溶血性黄疸",
        "溶血性黄疸因红细胞破坏增多，产生大量非结合胆红素，血清总胆红素增加以非结合胆红素为主。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b003m5",
    order: 5,
    knowledgePointId: jaundiceKp,
    questionKind: "b1",
    status: "available",
    prompt: "肝细胞对摄取 UCB 和排泄 CB 存在先天性障碍",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Rotor 综合征",
        "Rotor 综合征为肝细胞对摄取未结合胆红素（UCB）及排泄结合胆红素（CB）存在先天性障碍所致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const jaundiceShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-jaundice-s17-sa001",
    order: 1,
    knowledgePointId: jaundiceKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "如何鉴别溶血性黄疸、肝细胞性黄疸、胆汁淤积性黄疸？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "溶血性黄疸、肝细胞性黄疸、胆汁淤积性黄疸的鉴别",
        "三者的鉴别要点如下：总胆红素（TB）三种黄疸均增加；结合胆红素（CB）分别为正常／增加／明显增加；CB/TB 比值分别为 <20%／20%～50%／>50%；尿胆红素分别为（－）／＋＋／＋＋；尿胆原分别为增加／轻度增加／减少或消失；ALT、AST 分别为正常／明显增高／可增高；ALP 分别为正常／增高／明显增高；GGT 分别为正常／增高／明显增高；PT 分别为正常／延长／延长；对维生素 K 的反应分别为无／差／好；胆固醇分别为正常／轻度增加或降低／明显增加；血浆蛋白分别为正常／白蛋白降低、球蛋白升高／正常。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const jaundiceGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-jaundice-s17-b001",
    order: 1,
    questionKind: "b2",
    status: "available",
    groupPrompt: jaundiceB001SharedPrompt,
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: jaundiceB001Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b002",
    order: 2,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: jaundiceB002SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: jaundiceB002Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-jaundice-s17-b003",
    order: 3,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: jaundiceB003SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: jaundiceLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: jaundiceB003Members,
    sourceIds: [],
  },
];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...hematemesisTermItems,
  ...hematemesisA1Items,
  ...hematemesisA2Items,
  ...hematemesisShortAnswerItems,
  ...hematocheziaTermItems,
  ...hematocheziaA1Items,
  ...hematocheziaA2Items,
  ...hematocheziaShortAnswerItems,
  ...abdominalPainTermItems,
  ...abdominalPainA1Items,
  ...abdominalPainA2Items,
  ...abdominalPainShortAnswerItems,
  ...diarrheaTermItems,
  ...diarrheaA1Items,
  ...diarrheaShortAnswerItems,
  ...constipationTermItems,
  ...constipationA1Items,
  ...constipationShortAnswerItems,
  ...jaundiceTermItems,
  ...jaundiceA1Items,
  ...jaundiceShortAnswerItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...hematemesisGroups,
  ...hematocheziaGroups,
  ...abdominalPainGroups,
  ...diarrheaGroups,
  ...constipationGroups,
  ...jaundiceGroups,
];