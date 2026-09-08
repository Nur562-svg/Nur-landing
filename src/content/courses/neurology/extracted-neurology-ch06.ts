import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 神经病学学习指导与习题集（第3版）— 第6章 神经心理学检查 题库提取（等比取样）
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 选择题（a1-single）：6 题（含 A2 病例题 0 题、A3/A4 病例串题 0 题）
 * - 问答题（short-answer）：2 题（含简答 2 题、论述 0 题）
 * - 病例分析题（case）：0 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：12 题（须等于本文件预算 12）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型 13、B1 型 2 组 9 成员、简答题 11、论述题 2，无 A2/A3/A4
 *   与病例分析题。本文件按 12 道预算在原书顺序内取材：A1 取第 1~6 题、简答取第 1~2 题，
 *   B1 取第一组（1~4）完整组。正确项逐一对齐章末参考答案键号。OCR 错字已按神经病学
 *   医学语义恢复（如 行表现→行为表现、专力→专为、Califomia→California、Rivetmead→
 *   Rivermead、Ostertich→Osterrieth、预习→预演、行动机→行为动机 等），数值与量表名
 *   （MMSE、MoCA、CDR、ADAS-cog、WMS、WCST、HIS 等）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "neurology-ch06-neuropsychological-examination";
const locatorBase =
  "《神经病学学习指导与习题集》第3版 第6章 神经心理学检查 习题（核对PDF 第112–120页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** A1 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch06-neuropsychological-examination-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列测验不属于总体认知功能评定量表的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "简易精神状态评价量表（MMSE）",
      "蒙特利尔认知评估量表（MoCA）",
      "Mattis 痴呆评估量表（DRS）",
      "临床痴呆评定量表（CDR）",
      "韦氏记忆量表（WMS）",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "韦氏记忆量表（WMS）",
        "总体认知功能评定量表包括 MMSE、MoCA、Mattis 痴呆评估量表（DRS）、临床痴呆评定量表（CDR）、艾登布鲁克认知测试修订版（ACE-R）、ADAS-cog、GPCOG、IQCODE 等；韦氏记忆量表（WMS）属于记忆功能检测量表，不属于总体认知功能评定量表。原书 A1 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch06-neuropsychological-examination-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "大脑皮质语言功能包括下列语言交流能力，但不包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "口语表达",
      "听理解",
      "写作",
      "阅读",
      "书写",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "写作",
        "失语症表现为口语表达、听理解、阅读、书写四个基本方面能力残缺或缺失，其中口语表达包括自发谈话、复述、命名；不包括“写作”。原书 A1 答案第 2 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch06-neuropsychological-examination-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "失认（agnosia），可粗略地理解为“不能识别”。临床上，失认症可分为视觉失认症、听觉失认症、触觉失认症等，其中最为常见的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "听觉失认症",
      "视觉失认症",
      "触觉失认症",
      "空间失认症",
      "面部失认症",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "视觉失认症",
        "失认症可分为视觉失认症、听觉失认症、触觉失认症等，其中视觉失认症最常见，又可分为物体失认、面孔失认、颜色失认、空间失认等。原书 A1 答案第 3 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch06-neuropsychological-examination-a1004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "失用症（apraxia）又称为运用不能症，是指在意识清楚、语言理解能力和运动功能正常情况下，患者不能准确执行有目的的复杂活动。失用症的检查通常",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "按照从难到易的原则，依次：床边检查—动作模仿—实物操作",
      "按照从易到难的原则，依次为：床边检查—动作模仿—实物操作",
      "按照从难到易的原则，依次：实物操作—动作模仿—床边检查",
      "按照从易到难的原则，依次：实物操作—动作模仿—床边检查",
      "按照从难到易的原则，依次为：动作模仿—实物操作—床边检查",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "按照从难到易的原则，依次：床边检查—动作模仿—实物操作",
        "失用症检查按照从难到易的原则分 3 个水平进行测定：床边检查（按指令用各种姿势完成一个任务）→动作模仿（模仿检查者的动作）→实物操作（使用真实实物完成指令）。原书 A1 答案第 4 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch06-neuropsychological-examination-a1005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "忽视症，是突出的注意障碍之一，通常指脑损伤后以对侧空间刺激不能注意、报告、表征为主要表现的认知功能障碍。以下测验不常用于忽视症检查的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "线段划消",
      "连线测验",
      "自发画钟",
      "线段等分",
      "临摹画花",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "连线测验",
        "忽视症常用的检查方法包括线段划消、线段等分、自发画钟、临摹图画等；连线测验不属于忽视症的常用检查方法。原书 A1 答案第 5 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch06-neuropsychological-examination-a1006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "执行功能（executive function, EF）指有效地启动并完成有目的的活动的能力，是一项复杂的过程，涉及计划、启动、顺序、运行、反馈、决策和判断。临床上，认知功能的核心成分不包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抽象思维",
      "工作记忆",
      "程序记忆",
      "定势转移",
      "反应抑制",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "程序记忆",
        "执行功能的核心成分包括抽象思维、工作记忆、定势转移和反应抑制等；程序记忆（内隐记忆）不属于执行功能的核心成分。原书 A1 答案第 6 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（统一映射为 short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch06-neuropsychological-examination-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述神经心理学的概念。",
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
        "神经心理学是心理学与神经科学交叉的一门学科，它从神经科学的角度来研究心理学的问题，把脑当作心理活动的物质本体来研究脑与心理或脑与行为的关系。",
        "神经心理学是研究行为表现和脑功能损害关系的学科，神经心理学检查是神经心理学的重要组成部分，是痴呆诊断不可缺少的工具。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch06-neuropsychological-examination-short002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "常用的记忆功能检测量表有哪些？进行记忆量表测试的意义有什么？",
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
        "常用的记忆功能检测量表有：Rey 听觉词语测验、California 词语学习测验、韦氏记忆量表、Rey-Osterrieth 复杂图形测验、Rivermead 行为记忆测验、Hopkins 词语学习测验、WHO-UCLA 词语学习测验等。不同类型的痴呆记忆损害的类型与特点不同，例如情景记忆障碍是 AD 早期诊断与鉴别诊断的重要依据。记忆功能的评定对于痴呆的诊断与鉴别诊断非常重要。",
        "记忆功能检测量表是评估可疑记忆障碍的标准工具，记忆评定对痴呆的诊断与鉴别诊断具有重要意义。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例分析题（case），本章无此题型 */
const caseItems: readonly AssessmentItemDefinition[] = [];

/** B1 配伍题组（b1），1 组、共 4 个成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-neurology-ch06-neuropsychological-examination-b001",
    order: 9,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "波士顿诊断性失语症检查汉语版",
      "临床痴呆评定量表（CDR）",
      "阿尔茨海默病评估量表认知部分（ADAS-cog）",
      "蒙特利尔认知评估量表（MoCA）",
      "Stroop 测试",
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
        id: "ext-neurology-ch06-neuropsychological-examination-b001m1",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "常用于轻中度 AD 的疗效评估，是国内外药物临床试验的疗效主要评估工具的是",
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
            "阿尔茨海默病评估量表认知部分（ADAS-cog）",
            "ADAS-cog 包括 12 项，覆盖记忆力、定向力、语言、注意力等，常用于轻中度 AD 的疗效评估，是国内外药物临床试验的疗效主要评估工具之一。原书 B1 答案第 1 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch06-neuropsychological-examination-b001m2",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "用于 MCI 患者和早期 AD 患者的筛查的是",
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
            "蒙特利尔认知评估量表（MoCA）",
            "MoCA 由 Ziad Nasreddin 1996 年编制，内容覆盖 8 个认知域，共计 30 分，主要用于 MCI 患者和早期 AD 患者的筛查。原书 B1 答案第 2 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch06-neuropsychological-examination-b001m3",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "应用于痴呆分级与分期，并可评估 AD 的进展的是",
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
            "临床痴呆评定量表（CDR）",
            "CDR 包括记忆、定向、判断和解决问题、工作及社交能力、家庭生活和爱好、独立生活能力六个项目，可作出正常、可疑、轻、中、重度痴呆五级判断，广泛应用于痴呆分级与分期。原书 B1 答案第 3 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch06-neuropsychological-examination-b001m4",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "常用的失语症检查量表是",
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
            "波士顿诊断性失语症检查汉语版",
            "国内常用的失语症检查量表有汉语失语成套测试（ABC）和波士顿诊断性失语症检查汉语版（在 BDAE 基础上修订，包括对话及自发谈话、听理解、言语表达、阅读、书写五个测试）。原书 B1 答案第 4 题为 A。",
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
  ...a1Items, ...shortItems, ...caseItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
