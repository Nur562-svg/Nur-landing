import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 诊断学 学习指导与习题集（第4版）— 第一篇常见症状 第4～7节（咳嗽与咳痰 / 咯血 / 发绀 / 呼吸困难）题库提取
 * 来源：《诊断学学习指导与习题集》第4版（人民卫生出版社，主编：万学红、卢雪峰）
 *
 * == 统计报告（4 节合计） ==
 * - 名词解释（term）：5 题
 * - A1 型题（单句型最佳选择题）：16 题
 * - A2 型题（病例型最佳选择题）：16 题
 * - 问答题（简答）：5 题
 * - B 型配伍题：8 组、共 34 个成员
 *   其中 B1 型（共用备选答案）：4 组、共 20 个成员
 *   其中 B2 型（共用题干，A3/A4）：4 组、共 14 个成员
 * - 独立题合计：42 题（不含 B 型组成员）
 * - 缺失答案：0 题
 * - 无法提取：0 题
 * - 分节小计：
 *   第四节 咳嗽与咳痰：名词解释 1、A1 4、A2 4、问答题 1、B 组 2（成员 8）；独立题 10
 *   第五节 咯血：名词解释 1、A1 4、A2 4、问答题 1、B 组 2（成员 8）；独立题 10
 *   第六节 发绀：名词解释 1、A1 4、A2 4、问答题 1、B 组 2（成员 10）；独立题 10
 *   第七节 呼吸困难：名词解释 2、A1 4、A2 4、问答题 2、B 组 2（成员 8）；独立题 12
 * - 说明：原书排版存在大量 OCR 乱码（如「发甘/发生甘/发钳/发绵」应为「发绀」、「咳I嗽/咳l败/咳I耿」应为「咳嗽」、「l度痰/服性痰/腋痰」应为「脓痰」、「眼音」应为「啰音」、「样状指/件状指」应为「杵状指」、「麻磨/麻痊」应为「麻疹」、「勃膜/蒙古膜」应为「黏膜」、「1昆合性」应为「混合性」、「糖尿病酬症」应为「糖尿病酮症」、「口周癌瘦」应为「口周疱疹」等），已按医学语义恢复为主题所指内容；所有题目均做轻度改写并重排选项，数值与临床细节保留原值。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 * 对应知识点的循环页面见 /courses/tcm-diagnostics/knowledge-points/ 下相关路由。
 */

const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

/************************************************************
 * 第四节 咳嗽与咳痰
 ************************************************************/
const coughKp = "kp-diagnosis-cough-phlegm";
const coughLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第四节 咳嗽与咳痰 习题（PDF 第23–25页）";

/** 名词解释（term） */
const coughTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cough-phlegm-s4-term001",
    order: 1,
    knowledgePointId: coughKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：咳痰",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "咳痰",
        "咳痰：借助咳嗽将气管、支气管的分泌物或肺泡内的渗出液排出口腔的病态现象称为咳痰。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型题（a1-single），选项已随机重排，correctChoiceIndex 指向新顺序 */
const coughA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cough-phlegm-s4-a1001",
    order: 1,
    knowledgePointId: coughKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "刺激性咳嗽最常见于下列哪种疾病？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肺气肿", "支气管肺癌", "支气管扩张症", "肺结核", "慢性支气管炎"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支气管肺癌",
        "肺癌肿块刺激支气管黏膜可引起刺激性干咳；而慢性支气管炎等多呈慢性反复咳嗽，支气管扩张、肺结核亦不以刺激性咳嗽为典型表现，故刺激性咳嗽最常见于支气管肺癌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-a1002",
    order: 2,
    knowledgePointId: coughKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "夜间咳嗽最常见于下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["支气管肺癌", "支气管扩张", "百日咳", "支气管结核", "左心衰竭"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "左心衰竭",
        "左心衰竭患者夜间平卧时回心血量增加、肺淤血加重，常于夜间出现阵发性咳嗽，故夜间咳嗽最常见于左心衰竭。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-a1003",
    order: 3,
    knowledgePointId: coughKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "铁锈色痰最常见于下列哪种疾病？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肺炎球菌肺炎", "急性支气管炎", "肺泡癌", "支原体肺炎", "急性肺脓肿"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺炎球菌肺炎",
        "肺炎球菌肺炎因肺泡内红细胞渗出、含铁血黄素与脓性炎性渗出物相混，表现为典型的铁锈色痰。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-a1004",
    order: 4,
    knowledgePointId: coughKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于咳嗽与咳痰的叙述，下列错误的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "咳嗽是一种保护性反射动作",
      "胸膜疾病或心血管疾病不会出现咳嗽",
      "咳嗽亦属一种病理现象",
      "咳痰是一种病态现象",
      "咳嗽的控制中枢在延髓",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胸膜疾病或心血管疾病不会出现咳嗽",
        "胸膜疾病及心血管疾病（如心力衰竭、肺栓塞等）同样可以引起咳嗽，故「胸膜疾病或心血管疾病不会出现咳嗽」的说法是错误的。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A2 型题（病例型最佳选择题，questionKind 亦为 a1-single），选项已随机重排 */
const coughA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cough-phlegm-s4-a2001",
    order: 1,
    knowledgePointId: coughKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人张某，男，24 岁。受凉后发热（T 39℃）、咳嗽、咳铁锈色痰伴胸痛 3 天。最可能患有的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["渗出性胸膜炎", "支气管肺癌", "肺炎球菌肺炎", "自发性气胸", "支气管扩张"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺炎球菌肺炎",
        "受凉后高热、咳嗽、咳铁锈色痰伴胸痛，是肺炎球菌肺炎（大叶性肺炎）的典型表现，故最可能为肺炎球菌肺炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-a2002",
    order: 2,
    knowledgePointId: coughKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人王某，女，56 岁。反复咳嗽、咳大量脓性痰，伴杵状指 2 年。最可能的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["二尖瓣狭窄", "支气管扩张", "铜绿假单胞菌肺炎", "慢性支气管炎", "支气管肺癌"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支气管扩张",
        "反复咳嗽、咳大量脓性痰并伴杵状指多年，是支气管扩张的典型临床特征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-a2003",
    order: 3,
    knowledgePointId: coughKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人李某，男，40 岁。发作性咳嗽、气喘 4 年，近日外出旅游后咳嗽加剧。最可能的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["支气管肺癌", "支气管结核", "急性左心衰", "慢性支气管炎", "支气管哮喘"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支气管哮喘",
        "发作性咳嗽、气喘，且接触过敏环境（外出旅游）后加剧，符合支气管哮喘的临床特点。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-a2004",
    order: 4,
    knowledgePointId: coughKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人赵某，女，67 岁。发热、咳嗽伴咳砖红色胶冻样痰 2 周。体检：T 37.8℃，双肺未闻及干、湿啰音。最可能的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肺结核", "肺脓肿", "肺炎克雷伯杆菌肺炎", "支气管扩张", "支气管肺癌"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺炎克雷伯杆菌肺炎",
        "咳砖红色胶冻样痰是肺炎克雷伯杆菌肺炎的特征性表现，故最可能为肺炎克雷伯杆菌肺炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer） */
const coughShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cough-phlegm-s4-sa001",
    order: 1,
    knowledgePointId: coughKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述咳嗽与咳痰的病因。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "咳嗽与咳痰的病因",
        "引起咳嗽与咳痰的病因有：①呼吸道疾病：包括呼吸道感染、咽喉炎、喉结核、喉癌、支气管扩张、支气管哮喘、支气管结核、支气管肺癌及各种物理、化学、过敏因素等刺激气管、支气管，其中呼吸道感染是引起咳嗽、咳痰最常见的原因；②胸膜疾病：各种原因所致的胸膜炎、胸膜间皮瘤、自发性气胸等；③心血管疾病：心力衰竭、肺栓塞等；④中枢神经因素：脑炎、脑膜炎等；⑤其他因素所致的慢性咳嗽：服用血管紧张素转化酶抑制药后咳嗽、胃食管反流病所致咳嗽、习惯性及心理性咳嗽等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B2 型题（共用题干，A3/A4） */
const coughB2GroupPrompt =
  "病人张某，女，40 岁。幼年曾患麻疹，反复咳嗽、咳脓痰 10 年，近 2 日受凉后脓痰增多。查体：体温 36.5℃，心率 80 次/分，左下肺侧胸部可闻及散在的湿啰音。下列各题共用此题干。";

const coughB2Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cough-phlegm-s4-b001m1",
    order: 1,
    knowledgePointId: coughKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人最可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肺炎", "支气管肺癌", "支气管扩张", "肺结核", "慢性阻塞性肺疾病"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支气管扩张",
        "幼年麻疹后反复咳嗽、咳脓痰多年，左下肺侧胸部可闻及散在湿啰音，符合支气管扩张的典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-b001m2",
    order: 2,
    knowledgePointId: coughKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人还可能出现以下临床表现，除了",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["咯血", "贫血", "杵状指", "声音嘶哑", "发热"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "声音嘶哑",
        "支气管扩张常见的临床表现有发热、咯血、贫血及杵状指等；声音嘶哑并非其常见表现，故本题「除了」所排除的为声音嘶哑。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-b001m3",
    order: 3,
    knowledgePointId: coughKp,
    questionKind: "b2",
    status: "available",
    prompt: "有关该病人咳嗽、咳痰的可能特点，描述不正确的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "咳出的痰液可能为砖红色胶冻样",
      "咳嗽、咳痰经常发生于夜间平卧睡眠时",
      "咳出的痰液静置后可分层",
      "咳嗽、咳痰经常发生于早晨起床时",
      "咳出的痰液也可能为绿色",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "咳嗽、咳痰经常发生于夜间平卧睡眠时",
        "支气管扩张的咳嗽、咳痰常于晨起及体位改变时加重，故「经常发生于夜间平卧睡眠时」的描述不正确。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型题（共用备选答案） */
const coughB1SharedChoices = [
  "发作性咳嗽伴双肺哮鸣音",
  "咳嗽伴胸痛、发热",
  "慢性咳嗽伴呼吸困难",
  "咳嗽伴脓痰、咯血、杵状指",
  "咳嗽伴烧心、反酸、嗳气",
];

const coughB1Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cough-phlegm-s4-b002m1",
    order: 1,
    knowledgePointId: coughKp,
    questionKind: "b1",
    status: "available",
    prompt: "支气管扩张",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "咳嗽伴脓痰、咯血、杵状指",
        "支气管扩张典型表现为慢性咳嗽、咳大量脓痰、咯血及杵状指，故咳嗽伴脓痰、咯血、杵状指。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-b002m2",
    order: 2,
    knowledgePointId: coughKp,
    questionKind: "b1",
    status: "available",
    prompt: "慢性阻塞性肺疾病",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "慢性咳嗽伴呼吸困难",
        "慢性阻塞性肺疾病以反复慢性咳嗽、逐渐加重的呼吸困难为特征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-b002m3",
    order: 3,
    knowledgePointId: coughKp,
    questionKind: "b1",
    status: "available",
    prompt: "胸膜炎",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["咳嗽伴胸痛、发热", "胸膜炎常表现为咳嗽伴胸痛、发热。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-b002m4",
    order: 4,
    knowledgePointId: coughKp,
    questionKind: "b1",
    status: "available",
    prompt: "支气管哮喘",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["发作性咳嗽伴双肺哮鸣音", "支气管哮喘呈发作性咳嗽，常伴双肺哮鸣音与呼气性呼吸困难。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-b002m5",
    order: 5,
    knowledgePointId: coughKp,
    questionKind: "b1",
    status: "available",
    prompt: "反流性食管炎",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["咳嗽伴烧心、反酸、嗳气", "胃食管反流病所致咳嗽常伴烧心、反酸、嗳气等反流症状。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const coughGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-cough-phlegm-s4-b001",
    order: 1,
    questionKind: "b2",
    status: "available",
    groupPrompt: coughB2GroupPrompt,
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: coughB2Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cough-phlegm-s4-b002",
    order: 2,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: coughB1SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: coughLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: coughB1Members,
    sourceIds: [],
  },
];

/************************************************************
 * 第五节 咯血
 ************************************************************/
const hemoptysisKp = "kp-diagnosis-hemoptysis";
const hemoptysisLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第五节 咯血 习题（PDF 第25–28页）";

/** 名词解释（term） */
const hemoptysisTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hemoptysis-s5-term001",
    order: 1,
    knowledgePointId: hemoptysisKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：咯血",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["咯血", "咯血：是指喉及喉部以下的呼吸道出血，经口腔咯出。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型题（a1-single），选项已随机重排，correctChoiceIndex 指向新顺序 */
const hemoptysisA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hemoptysis-s5-a1001",
    order: 1,
    knowledgePointId: hemoptysisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "引起咯血最常见的支气管—肺部疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肺寄生虫病", "肺梗死", "良性支气管肿瘤", "支气管扩张", "支气管非特异性炎症"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支气管扩张",
        "引起咯血最常见的支气管—肺部疾病是支气管扩张，其次为肺结核、支气管肺癌、肺脓肿等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-a1002",
    order: 2,
    knowledgePointId: hemoptysisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "咯血伴呛咳最常见于下列哪种疾病？（按题集参考答案）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["支气管扩张", "空洞性肺结核", "支原体肺炎", "肺梗死", "慢性肺脓肿"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支原体肺炎",
        "按题集参考答案，咯血伴呛咳最常见于支原体肺炎。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-a1003",
    order: 3,
    knowledgePointId: hemoptysisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "每天咯血量为多少时属于大量咯血？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["100～200ml", "300～500ml", "100ml 以内", "500ml 以上", "300ml 以内"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "500ml 以上",
        "按题集标准，每日咯血量超过 500ml 属于大量咯血。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-a1004",
    order: 4,
    knowledgePointId: hemoptysisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列各项中，不是咯血特点的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "出血前多有喉痒、胸闷、咳嗽",
      "血中含有泡沫、痰液",
      "多由支气管或肺疾病引起",
      "多呈酸性",
      "多呈碱性",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多呈酸性",
        "咯血多呈碱性，呕血多呈酸性，故「多呈酸性」不是咯血的特点。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A2 型题（病例型最佳选择题，questionKind 亦为 a1-single），选项已随机重排 */
const hemoptysisA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hemoptysis-s5-a2001",
    order: 1,
    knowledgePointId: hemoptysisKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人张某，男，44 岁。反复咳嗽、咳痰、咯血 15 年，再发咯血 2 天。幼年时患过「麻疹」。体检：左下肺可闻及湿啰音，可见杵状指。最可能的诊断是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["支气管扩张", "肺结核", "肺脓肿", "支气管肺癌", "支气管肺炎"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支气管扩张",
        "反复咳嗽、咳痰、咯血多年，幼年有麻疹史，左下肺湿啰音并见杵状指，符合支气管扩张。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-a2002",
    order: 2,
    knowledgePointId: hemoptysisKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人李某，男，20 岁。因咳嗽、咳痰，并痰中带血 1 个多月伴低热入院。首先考虑的诊断是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["支原体肺炎", "肺炎球菌肺炎", "肺结核", "二尖瓣狭窄", "支气管扩张"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺结核",
        "青年男性，咳嗽、痰中带血伴低热，为肺结核的常见表现，首先考虑肺结核。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-a2003",
    order: 3,
    knowledgePointId: hemoptysisKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人王某，男，70 岁。咳嗽、咳痰、痰中带血半年，近 2 周出现声音嘶哑。最可能的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["慢性支气管炎", "肺结核", "支气管扩张", "支气管肺癌", "肺间质纤维化"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支气管肺癌",
        "老年男性，痰中带血半年后新出现声音嘶哑，提示肿瘤累及喉返神经，最可能为支气管肺癌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-a2004",
    order: 4,
    knowledgePointId: hemoptysisKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人韩某，女，65 岁。劳动后突然出现左侧胸部绞痛伴咯血、呼吸困难，自含服「硝酸甘油」后未能缓解而急诊入院。查体：BP 110/70mmHg，口唇发绀，双肺未闻及明显干、湿啰音。最可能的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["食管炎", "肺梗死", "支气管肺癌", "自发性气胸", "心绞痛"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺梗死",
        "老年患者劳动后突发胸痛、咯血、呼吸困难，含服硝酸甘油不缓解，伴口唇发绀，符合肺梗死（肺栓塞）的表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer） */
const hemoptysisShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hemoptysis-s5-sa001",
    order: 1,
    knowledgePointId: hemoptysisKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述咯血与呕血的鉴别。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "咯血与呕血的鉴别",
        "咯血与呕血的鉴别要点：①出血前症状：咯血多元喉部痒感、胸闷、咳嗽；呕血多先有上腹部不适、恶心、呕吐。②出血方式：咯血为咯出；呕血为呕出，可为喷射状。③出血颜色：咯血为鲜红色；呕血为暗红色、棕色，有时为鲜红色。④血中混有物：咯血混有痰、泡沫；呕血混有食物残渣、胃液。⑤酸碱反应：咯血呈碱性；呕血呈酸性。⑥黑便：咯血多无黑便，若咽下血液量较多时可有；呕血为有，可为柏油样便，且呕血停止后仍可持续数日。⑦出血后痰的性状：咯血出血后常有血痰数日；呕血则无痰。⑧病因：咯血见于肺结核、支气管扩张、支气管肺癌、肺脓肿、心脏病等；呕血见于消化性溃疡、肝硬化、急性胃黏膜病变、胆道出血、胃癌等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B2 型题（共用题干，A3/A4） */
const hemoptysisB2GroupPrompt =
  "病人辛某，男，21 岁。发热、咳嗽 2 周，咳少量白色黏痰，近 3 天咳鲜红色血痰，昨日咯血量突然增多，全天咯血约 200ml。伴乏力、盗汗、食欲不振。查体：T 37.8℃，双肺未闻及明显干、湿啰音。下列各题共用此题干。";

const hemoptysisB2Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hemoptysis-s5-b001m1",
    order: 1,
    knowledgePointId: hemoptysisKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人最可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肺脓肿", "急性支气管炎", "肺炎", "支气管肺癌", "肺结核"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺结核",
        "青年男性，发热、咳嗽、咯血伴乏力、盗汗、食欲不振，符合肺结核的表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-b001m2",
    order: 2,
    knowledgePointId: hemoptysisKp,
    questionKind: "b2",
    status: "available",
    prompt:
      "该病人若突然出现呼吸不畅、表情恐怖、张口瞪眼、大汗淋漓，进而意识丧失，应首先考虑发生了",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["哮喘", "窒息", "休克", "呼吸衰竭", "急性左心衰"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "窒息",
        "大量咯血后突发呼吸困难、表情恐怖、张口瞪眼、意识丧失，首先考虑血块堵塞气道引起的窒息。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-b001m3",
    order: 3,
    knowledgePointId: hemoptysisKp,
    questionKind: "b2",
    status: "available",
    prompt: "床头胸片显示左上肺薄壁空洞。该病人咯血的原因最可能是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肺动脉栓塞",
      "肺毛细血管静水压增高",
      "病变引起小动脉破裂",
      "肺毛细血管通透性增加",
      "先天性肺动静脉畸形",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "病变引起小动脉破裂",
        "肺结核空洞壁病变累及血管致小动脉破裂，是引起咯血的原因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型题（共用备选答案） */
const hemoptysisB1SharedChoices = [
  "青年男性，咯血伴午后低热、乏力、盗汗、消瘦",
  "青年女性，反复咯血、咳脓痰伴杵状指",
  "老年男性，痰中带血伴声音嘶哑",
  "青年女性，咳铁锈色痰伴高热、寒战",
  "老年女性，大量输液后咳粉红色泡沫样痰伴极度呼吸困难",
];

const hemoptysisB1Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hemoptysis-s5-b002m1",
    order: 1,
    knowledgePointId: hemoptysisKp,
    questionKind: "b1",
    status: "available",
    prompt: "支气管扩张",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "青年女性，反复咯血、咳脓痰伴杵状指",
        "支气管扩张多见于青壮年，常表现为反复咯血、咳大量脓痰伴杵状指。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-b002m2",
    order: 2,
    knowledgePointId: hemoptysisKp,
    questionKind: "b1",
    status: "available",
    prompt: "肺炎球菌肺炎",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "青年女性，咳铁锈色痰伴高热、寒战",
        "肺炎球菌肺炎典型表现为咳铁锈色痰，伴高热、寒战。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-b002m3",
    order: 3,
    knowledgePointId: hemoptysisKp,
    questionKind: "b1",
    status: "available",
    prompt: "肺结核",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "青年男性，咯血伴午后低热、乏力、盗汗、消瘦",
        "肺结核可引起咯血，并伴午后低热、乏力、盗汗、消瘦等全身症状。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-b002m4",
    order: 4,
    knowledgePointId: hemoptysisKp,
    questionKind: "b1",
    status: "available",
    prompt: "急性左心衰",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "老年女性，大量输液后咳粉红色泡沫样痰伴极度呼吸困难",
        "大量输液诱发急性左心衰、急性肺水肿，表现为咳粉红色泡沫样痰伴极度呼吸困难。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-b002m5",
    order: 5,
    knowledgePointId: hemoptysisKp,
    questionKind: "b1",
    status: "available",
    prompt: "支气管肺癌",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "老年男性，痰中带血伴声音嘶哑",
        "老年肺癌患者可出现痰中带血，肿瘤累及喉返神经时可伴声音嘶哑。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const hemoptysisGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-hemoptysis-s5-b001",
    order: 1,
    questionKind: "b2",
    status: "available",
    groupPrompt: hemoptysisB2GroupPrompt,
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: hemoptysisB2Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-hemoptysis-s5-b002",
    order: 2,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: hemoptysisB1SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: hemoptysisLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: hemoptysisB1Members,
    sourceIds: [],
  },
];

/************************************************************
 * 第六节 发绀
 ************************************************************/
const cyanosisKp = "kp-diagnosis-cyanosis";
const cyanosisLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第六节 发绀 习题（PDF 第28–31页）";

/** 名词解释（term） */
const cyanosisTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cyanosis-s6-term001",
    order: 1,
    knowledgePointId: cyanosisKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：发绀",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "发绀",
        "发绀：是指血液中还原血红蛋白增多使皮肤和黏膜呈青紫色改变的一种表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型题（a1-single），选项已随机重排，correctChoiceIndex 指向新顺序 */
const cyanosisA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cyanosis-s6-a1001",
    order: 1,
    knowledgePointId: cyanosisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列疾病中，出现中心性发绀的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["法洛四联症", "血栓性静脉炎", "右心衰竭", "严重休克", "缩窄性心包炎"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "法洛四联症",
        "法洛四联症因肺循环内右向左分流使血液中还原血红蛋白增多，出现中心性发绀。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-a1002",
    order: 2,
    knowledgePointId: cyanosisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "周围性发绀最常见于下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["呼吸道阻塞", "阻塞性肺气肿", "严重休克", "大量胸腔积液", "先天性心脏病"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "严重休克",
        "严重休克时心排血量减少、外周循环障碍，是引起周围性发绀的常见原因。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-a1003",
    order: 3,
    knowledgePointId: cyanosisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列各项中，与中心性发绀不符合的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "心肺功能改善后发绀缓解或消失",
      "发绀部位皮肤发冷",
      "按摩和加温后发绀不消失",
      "发绀呈全身性分布",
      "血中还原血红蛋白增多而引起",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "发绀部位皮肤发冷",
        "中心性发绀主要见于严重心肺疾病，受累部位皮肤温暖；发绀部位皮肤发冷多见于周围性发绀，故与中心性发绀不符。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-a1004",
    order: 4,
    knowledgePointId: cyanosisKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "导致「肠源性青紫」的原因是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "由于便秘或其他原因导致体内硫化血红蛋白上升",
      "是一种混合性发绀",
      "进食含较多亚硝酸盐的食物",
      "见于女性，与月经周期相关",
      "右心衰导致消化道吸收功能异常",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "进食含较多亚硝酸盐的食物",
        "进食含较多亚硝酸盐的食物可使血红蛋白氧化成高铁血红蛋白，出现「肠源性青紫」（高铁血红蛋白血症）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A2 型题（病例型最佳选择题，questionKind 亦为 a1-single），选项已随机重排 */
const cyanosisA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cyanosis-s6-a2001",
    order: 1,
    knowledgePointId: cyanosisKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人刘某，男，67 岁。反复咳嗽、咳痰、气喘 30 年，近期因「感冒」后再发，伴咳黄色脓性痰。查体：口唇发绀，双肺可闻及干、湿啰音。最可能的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["大量气胸", "急性左心衰竭", "高铁血红蛋白血症", "急性呼吸道梗阻", "慢性阻塞性肺疾病"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "慢性阻塞性肺疾病",
        "老年患者反复咳嗽、咳痰、气喘 30 年，本次受凉后加重伴脓痰、口唇发绀及干湿啰音，符合慢性阻塞性肺疾病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-a2002",
    order: 2,
    knowledgePointId: cyanosisKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人周某，女，36 岁。受凉后寒战、发热 5 天，意识障碍 1 天。查体：BP 80/50mmHg，昏睡状，口唇发绀，左肺可闻及管状呼吸音。最可能的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["药物或化学品中毒", "大量自发性气胸", "感染中毒性休克", "急性心功能衰竭", "缩窄性心包炎"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "感染中毒性休克",
        "寒战高热、意识障碍、血压下降、口唇发绀并闻及管状呼吸音，提示肺炎引起的感染中毒性休克。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-a2003",
    order: 3,
    knowledgePointId: cyanosisKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人杨某，女，10 岁。在公园玩耍时突然出现喘憋，呼吸困难，口唇发绀，呼气延长，肺部满布哮鸣音。诊断应考虑哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["气道异物", "肺实变", "气胸", "支气管哮喘", "肺不张"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支气管哮喘",
        "小儿突发喘憋、呼气延长、肺部满布哮鸣音，符合支气管哮喘急性发作。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-a2004",
    order: 4,
    knowledgePointId: cyanosisKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人董某，男，5 岁。在家中玩耍时突然出现呼吸困难，面部青紫，「三凹征」阳性，并听到单一高调的哮鸣音。最可能的诊断是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["急性喉炎", "支气管哮喘", "气管异物", "急性支气管炎", "急性左心衰竭"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "气管异物",
        "小儿玩耍时突发呼吸困难、三凹征阳性并听到单一高调哮鸣音，提示气管异物引起的上气道梗阻。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer） */
const cyanosisShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cyanosis-s6-sa001",
    order: 1,
    knowledgePointId: cyanosisKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "中心性发绀与周围性发绀有何区别？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "中心性发绀与周围性发绀的区别",
        "中心性发绀的特点表现为全身性，除四肢及颜面外，也累及躯干和黏膜的皮肤，但受累部位的皮肤是温暖的。常见于各种严重的呼吸道疾病，即由于呼吸功能不全、肺氧合作用不足所致，如喉、气管、支气管的阻塞、肺淤血、肺水肿、肺炎、肺气肿、大量胸腔积液等；也见于体内有异常通道分流，使部分静脉血未通过肺进行氧合作用而进入体循环动脉，如分流量超过心排血量的 1/3 即可出现发绀，常见于发绀型先天性心脏病。周围性发绀常由于周围循环血流障碍所致，其特点表现为发绀常出现于肢体的末端与下垂部位，这些部位的皮肤是发冷的，但若给予按摩或加温使皮肤转暖，发绀可消退；常见于：①引起体循环淤血的疾病，如右心衰竭、缩窄性心包炎等；②引起心排血量减少的疾病，如严重休克、暴露于寒冷中等；③局部血流障碍性疾病，如血栓性静脉炎、上腔静脉阻塞综合征、闭塞性动脉硬化等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B2 型题（共用题干，A3/A4） */
const cyanosisB2GroupPrompt =
  "男性，73 岁。咳嗽、咳痰 30 余年，伴气喘 10 余年。2 周前气喘加剧，咳白色泡沫痰，不能平卧，食欲差。近 3 日痰黏稠，呈黄色，不易咳出，夜间烦躁不眠，白天嗜睡。查体：体温 37.1℃，脉搏 100 次/分，呼吸 28 次/分，血压 150/90mmHg，有时答非所问，口唇及甲床发绀，皮肤温暖，球结膜充血水肿，颈静脉怒张。下列各题共用此题干。";

const cyanosisB2Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cyanosis-s6-b001m1",
    order: 1,
    knowledgePointId: cyanosisKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人最可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["高血压性心脏病左心衰竭", "支气管哮喘", "肺心病右心衰竭", "支气管扩张", "肺间质纤维化"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺心病右心衰竭",
        "长期咳痰喘病史，本次气喘加重、口唇甲床发绀、颈静脉怒张、球结膜充血水肿并嗜睡，符合慢性肺源性心脏病伴右心衰竭。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-b001m2",
    order: 2,
    knowledgePointId: cyanosisKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人的胸廓呈",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["局限凹陷", "桶状胸", "单侧隆起", "局限隆起", "单侧凹陷"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "桶状胸",
        "长期慢性阻塞性肺疾病、肺气肿致胸廓前后径增大，呈桶状胸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-b001m3",
    order: 3,
    knowledgePointId: cyanosisKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人的呼吸运动",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["双侧增强", "一侧减弱", "不对称增强", "双侧减弱", "一侧增强"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "双侧减弱",
        "肺气肿时胸廓呼吸运动双侧减弱，动度降低。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-b001m4",
    order: 4,
    knowledgePointId: cyanosisKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人肺部听诊可闻及",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "支气管肺泡呼吸音",
      "两肺散在哮鸣音，肺底闻及细湿啰音",
      "支气管呼吸音",
      "干啰音",
      "肺泡呼吸音加强",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "两肺散在哮鸣音，肺底闻及细湿啰音",
        "慢阻肺、肺心病急性加重期常于两肺闻及散在哮鸣音，肺底可闻及细湿啰音。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-b001m5",
    order: 5,
    knowledgePointId: cyanosisKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人发绀的原因不可能是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["还原性血红蛋白增加", "体循环淤血", "血氧饱和度下降", "高铁血红蛋白增加", "肺功能损害"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "高铁血红蛋白增加",
        "本病例发绀主要因肺功能损害、血氧饱和度下降及体循环淤血等使还原性血红蛋白增加所致，而非高铁血红蛋白增多。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型题（共用备选答案） */
const cyanosisB1SharedChoices = [
  "发绀伴呼吸困难",
  "发绀伴杵状指",
  "发绀伴意识障碍",
  "发绀伴红细胞增多",
  "发绀伴心脏杂音",
];

const cyanosisB1Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-cyanosis-s6-b002m1",
    order: 1,
    knowledgePointId: cyanosisKp,
    questionKind: "b1",
    status: "available",
    prompt: "药物或化学物质急性中毒",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["发绀伴意识障碍", "药物或化学物质急性中毒时，发绀常伴意识障碍等中毒表现。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-b002m2",
    order: 2,
    knowledgePointId: cyanosisKp,
    questionKind: "b1",
    status: "available",
    prompt: "急性呼吸道阻塞性疾病",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["发绀伴呼吸困难", "急性呼吸道阻塞性疾病引起通气障碍，发绀伴明显呼吸困难。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-b002m3",
    order: 3,
    knowledgePointId: cyanosisKp,
    questionKind: "b1",
    status: "available",
    prompt: "发绀性先天性心脏病",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["发绀伴心脏杂音", "发绀型先天性心脏病（如法洛四联症）常伴心脏杂音。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-b002m4",
    order: 4,
    knowledgePointId: cyanosisKp,
    questionKind: "b1",
    status: "available",
    prompt: "慢性肺部化脓性疾病",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["发绀伴杵状指", "肺脓肿等慢性肺部化脓性疾病病程迁延，常伴杵状指。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-b002m5",
    order: 5,
    knowledgePointId: cyanosisKp,
    questionKind: "b1",
    status: "available",
    prompt: "真性红细胞增多症",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["发绀伴红细胞增多", "真性红细胞增多症以外周血红细胞增多为特征，发绀伴红细胞增多。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const cyanosisGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-cyanosis-s6-b001",
    order: 1,
    questionKind: "b2",
    status: "available",
    groupPrompt: cyanosisB2GroupPrompt,
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: cyanosisB2Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-cyanosis-s6-b002",
    order: 2,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: cyanosisB1SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: cyanosisLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: cyanosisB1Members,
    sourceIds: [],
  },
];

/************************************************************
 * 第七节 呼吸困难
 ************************************************************/
const dyspneaKp = "kp-diagnosis-dyspnea";
const dyspneaLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第七节 呼吸困难 习题（PDF 第31–33页）";

/** 名词解释（term） */
const dyspneaTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dyspnea-s7-term001",
    order: 1,
    knowledgePointId: dyspneaKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：三凹征",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "三凹征",
        "三凹征：是指严重吸气性呼吸困难时出现的胸骨上窝、锁骨上窝和肋间隙的明显凹陷的体征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-term002",
    order: 2,
    knowledgePointId: dyspneaKp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：心源性哮喘",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心源性哮喘",
        "心源性哮喘：是指急性左心衰时出现夜间阵发性呼吸困难，表现为睡眠中突感胸闷气急，咳粉红色泡沫痰，重者可有端坐呼吸、面色发绀、出汗、哮鸣音及肺底湿啰音，心率加快，可有奔马律。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型题（a1-single），选项已随机重排，correctChoiceIndex 指向新顺序 */
const dyspneaA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dyspnea-s7-a1001",
    order: 1,
    knowledgePointId: dyspneaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "吸气性呼吸困难最常见于下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["支气管哮喘", "气管异物", "肺炎球菌肺炎", "慢性阻塞性肺疾病", "广泛性胸膜钙化"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "气管异物",
        "吸气性呼吸困难多为上呼吸道（喉、气管、大气管）梗阻所致，气管异物引起吸气性呼吸困难最常见。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-a1002",
    order: 2,
    knowledgePointId: dyspneaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "发作性呼气性呼吸困难常见于下列哪种疾病？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["大叶性肺炎", "大量胸腔积液", "支气管哮喘", "慢性左心衰竭", "慢性支气管炎"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支气管哮喘",
        "支气管哮喘因小气道广泛痉挛，以发作性呼气性呼吸困难为特征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-a1003",
    order: 3,
    knowledgePointId: dyspneaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列可引起混合性呼吸困难的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["慢性阻塞性肺气肿", "支气管哮喘", "气胸", "气管异物", "喉痉挛"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "气胸",
        "气胸使肺扩张受限、通气及换气功能均受影响，可出现混合性呼吸困难。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-a1004",
    order: 4,
    knowledgePointId: dyspneaKp,
    questionKind: "a1-single",
    status: "available",
    prompt: "库斯莫尔（Kussmaul）深大呼吸最常见于下列哪种情况？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["神经性呼吸困难", "血源性呼吸困难", "糖尿病酮症酸中毒", "心源性呼吸困难", "肺源性呼吸困难"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "糖尿病酮症酸中毒",
        "糖尿病酮症酸中毒时血中酸性代谢产物增多、刺激呼吸中枢，出现深大（库斯莫尔）呼吸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A2 型题（病例型最佳选择题，questionKind 亦为 a1-single），选项已随机重排 */
const dyspneaA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dyspnea-s7-a2001",
    order: 1,
    knowledgePointId: dyspneaKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人陈某，女，35 岁。发作性呼吸困难 6 年，今日在打扫卫生时突然再发，且伴有明显哮鸣音。最可能的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["心源性哮喘", "大面积肺梗死", "急性心包炎", "支气管哮喘", "急性心肌梗死"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支气管哮喘",
        "青年患者反复发作性呼吸困难伴明显哮鸣音，接触环境刺激（打扫卫生）后加重，最可能为支气管哮喘。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-a2002",
    order: 2,
    knowledgePointId: dyspneaKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人董某，男，18 岁。今日上体育课时突然发生左侧胸痛，呼吸时加重并伴呼吸困难而急诊入院。查体：BP 110/70mmHg，左肺呼吸音消失。最可能的疾病是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["大叶性肺炎", "渗出性胸膜炎", "自发性气胸", "急性心肌梗死", "支气管肺癌"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "自发性气胸",
        "运动后突发左侧胸痛、呼吸时加重，患侧（左肺）呼吸音消失，符合自发性气胸。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-a2003",
    order: 3,
    knowledgePointId: dyspneaKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人谭某，女，40 岁。半个月来常于夜间睡眠时憋醒，伴咳嗽、咳黏液痰、气喘，两肺底闻及湿啰音。该表现属于哪一类呼吸困难？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肺源性呼吸困难", "心源性呼吸困难", "血源性呼吸困难", "中毒性呼吸困难", "神经精神性呼吸困难"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "心源性呼吸困难",
        "夜间睡眠时憋醒、气喘，伴咳嗽、咳黏液痰及两肺底湿啰音，为左心衰竭所致的心源性呼吸困难。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-a2004",
    order: 4,
    knowledgePointId: dyspneaKp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "病人曾某，女，20 岁。情绪激动后突发晕厥伴面色苍白、发绀、呼吸困难、手足抽搐。下列疾病首先考虑的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["高血压", "急性左心衰", "重症贫血", "过度换气综合征", "脑出血"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "过度换气综合征",
        "情绪激动后突发晕厥、面色苍白、呼吸困难伴手足抽搐，为过度换气综合征（神经精神性）的典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer） */
const dyspneaShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dyspnea-s7-sa001",
    order: 1,
    knowledgePointId: dyspneaKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述呼吸困难的病因有哪些？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呼吸困难的病因",
        "引起呼吸困难的病因有：①呼吸系统疾病，如气管阻塞、肺疾病、胸廓疾病、神经肌肉疾病、膈肌运动障碍等；②心血管系统疾病；③中毒性疾病，如某些药物、化学毒物中毒或代谢障碍；④血液系统疾病，如重度贫血、高铁血红蛋白血症、硫化血红蛋白血症等；⑤神经精神系统疾病，如颅脑疾患、焦虑症、癔症等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-sa002",
    order: 2,
    knowledgePointId: dyspneaKp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述左心衰竭发生呼吸困难的主要原因及其机制。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "左心衰竭发生呼吸困难的主要机制",
        "左心衰竭发生呼吸困难的主要原因是肺淤血和肺泡弹性降低。其机制为：①肺淤血，使气体弥散功能降低；②肺泡张力增高，刺激迷走神经反射，兴奋呼吸中枢；③肺泡弹性减退，使肺活量减少；④肺循环压力升高对呼吸中枢的反射性刺激。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B2 型题（共用题干，A3/A4） */
const dyspneaB2GroupPrompt =
  "病人程某，男，23 岁。因受凉后寒战、高热、胸痛、咳嗽、咳脓性铁锈色痰 3 天，呼吸困难 1 天。查体：体温 39.5℃，呼吸 30 次/分，血压 100/70mmHg，口周疱疹，口唇轻度发绀。下列各题共用此题干。";

const dyspneaB2Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dyspnea-s7-b001m1",
    order: 1,
    knowledgePointId: dyspneaKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人首先考虑的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["支气管肺炎", "肺结核", "大叶性肺炎", "间质性肺炎", "肺脓肿"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "大叶性肺炎",
        "受凉后寒战高热、胸痛、咳脓性铁锈色痰，是大叶性肺炎（肺炎球菌肺炎）的典型表现。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-b001m2",
    order: 2,
    knowledgePointId: dyspneaKp,
    questionKind: "b2",
    status: "available",
    prompt: "体检时下列不属于常见体征的是哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "胸膜摩擦音",
      "叩诊浊音",
      "急性热病容",
      "闻及支气管呼吸音",
      "语音震颤增强",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胸膜摩擦音",
        "大叶性肺炎常见肺部叩诊浊音、语音震颤增强、可闻及支气管呼吸音并呈急性热病容；胸膜摩擦音并非其常见体征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-b001m3",
    order: 3,
    knowledgePointId: dyspneaKp,
    questionKind: "b2",
    status: "available",
    prompt: "该病人呼吸困难的特点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["呼气性呼吸困难", "中毒性呼吸困难", "吸气性呼吸困难", "心源性呼吸困难", "混合性呼吸困难"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "混合性呼吸困难",
        "大叶性肺炎肺实变范围较广，通气和换气功能均受影响，呈混合性呼吸困难。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型题（共用备选答案） */
const dyspneaB1SharedChoices = [
  "吸气性呼吸困难",
  "呼气性呼吸困难",
  "混合性呼吸困难",
  "中毒性呼吸困难",
  "心源性呼吸困难",
];

const dyspneaB1Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-dyspnea-s7-b002m1",
    order: 1,
    knowledgePointId: dyspneaKp,
    questionKind: "b1",
    status: "available",
    prompt: "慢性阻塞性肺疾病",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["呼气性呼吸困难", "慢性阻塞性肺疾病因小气道病变，以呼气性呼吸困难为主。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-b002m2",
    order: 2,
    knowledgePointId: dyspneaKp,
    questionKind: "b1",
    status: "available",
    prompt: "重症肺炎",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["混合性呼吸困难", "重症肺炎肺功能受损范围广，多呈混合性呼吸困难。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-b002m3",
    order: 3,
    knowledgePointId: dyspneaKp,
    questionKind: "b1",
    status: "available",
    prompt: "支气管肿瘤",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["吸气性呼吸困难", "支气管内肿瘤阻塞气道，多引起吸气性呼吸困难。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-b002m4",
    order: 4,
    knowledgePointId: dyspneaKp,
    questionKind: "b1",
    status: "available",
    prompt: "急性左心衰",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["心源性呼吸困难", "急性左心衰竭致肺淤血，表现为心源性呼吸困难。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-b002m5",
    order: 5,
    knowledgePointId: dyspneaKp,
    questionKind: "b1",
    status: "available",
    prompt: "尿毒症",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: ["中毒性呼吸困难", "尿毒症时体内代谢产物蓄积（酸中毒等）刺激呼吸中枢，表现为中毒性呼吸困难。"],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

const dyspneaGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-dyspnea-s7-b001",
    order: 1,
    questionKind: "b2",
    status: "available",
    groupPrompt: dyspneaB2GroupPrompt,
    sharedChoices: null,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: dyspneaB2Members,
    sourceIds: [],
  },
  {
    id: "ext-diagnosis-dyspnea-s7-b002",
    order: 2,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: dyspneaB1SharedChoices,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: dyspneaLocator,
      note: promptNote,
      sourceIds: [],
    },
    members: dyspneaB1Members,
    sourceIds: [],
  },
];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...coughTermItems,
  ...coughA1Items,
  ...coughA2Items,
  ...coughShortAnswerItems,
  ...hemoptysisTermItems,
  ...hemoptysisA1Items,
  ...hemoptysisA2Items,
  ...hemoptysisShortAnswerItems,
  ...cyanosisTermItems,
  ...cyanosisA1Items,
  ...cyanosisA2Items,
  ...cyanosisShortAnswerItems,
  ...dyspneaTermItems,
  ...dyspneaA1Items,
  ...dyspneaA2Items,
  ...dyspneaShortAnswerItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...coughGroups,
  ...hemoptysisGroups,
  ...cyanosisGroups,
  ...dyspneaGroups,
];