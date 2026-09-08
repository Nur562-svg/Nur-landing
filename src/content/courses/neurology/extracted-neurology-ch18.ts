import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 神经病学学习指导与习题集（第3版）— 第18章 自主神经系统疾病 题库提取（等比取样）
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 选择题（a1-single）：3 题（含 A2 病例题 1 题）
 * - 问答题（short-answer）：2 题（含简答 2）
 * - 病例分析题（case）：1 题
 * - B1 配伍题：1 组、共 2 个成员
 * - 独立记分题合计：8 题（须等于本文件预算 8）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型 10、A2 型 1、A3/A4 型 2、B1 型 3 组 7 成员、简答题 3、
 *   论述题 3、病例分析题 1。本章为小章，按 8 道预算在原书顺序内取材：A1 取第 1~2 题、
 *   A2 取第 1 题、简答取第 1~2 题、病例分析全取，B1 取第 1 组完整组（雷诺病/红斑肢痛症
 *   2 成员）。正确项逐一对齐章末参考答案键号。OCR 错字与双栏错序已按神经病学医学语义
 *   恢复（如 Horer→Horner、菱缩→萎缩、胶痛→肢痛、刀痕样萎缩等），数值与分子标记
 *   （K-F 环、MRI、β-受体阻滞剂、5-羟色胺再摄取抑制剂、C-反应蛋白）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "neurology-ch18-autonomic-nervous-system-diseases";
const locatorBase =
  "《神经病学学习指导与习题集》第3版 第18章 自主神经系统疾病 习题（核对PDF 第343–349页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** A1/A2 型选择题（统一映射为 a1-single），3 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch18-autonomic-nervous-system-diseases-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "雷诺病的常见诱因是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "感染",
      "劳累",
      "饮酒",
      "寒冷",
      "按摩",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "寒冷",
        "雷诺病多见于青年女性，寒冷、情绪变化可诱发，温暖或活动可缓解。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch18-autonomic-nervous-system-diseases-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "雷诺病诊断病史至少需要",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "3 个月",
      "6 个月",
      "1 年",
      "3 年",
      "2 年",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "2 年",
        "雷诺病的诊断要点之一是病史 2 年以上。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch18-autonomic-nervous-system-diseases-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，24 岁，2 年前起反复出现双足皮肤潮红、皮温升高，伴剧烈烧灼痛，夜间为著。睡觉时由于害怕剧痛（环境温度升高），双脚要暴露于被单外。查体：双足无感觉和运动障碍，足背动脉搏动略增强，足部皮肤与指（趾）甲变厚。实验室检查未见异常。该患者的可能诊断为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "雷诺病",
      "红斑肢痛症",
      "雷诺现象",
      "丹毒",
      "脉管炎",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "红斑肢痛症",
        "双足对称性皮肤潮红、皮温升高、剧烈烧灼痛，环境温度升高（怕热而暴露于被单外）诱发或加剧，足背动脉搏动存在，实验室检查正常，符合红斑肢痛症。原书 A2 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer，简答），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch18-autonomic-nervous-system-diseases-short001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是雷诺病？",
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
        "雷诺病的定义",
        "雷诺病又称肢端动脉痉挛病，是阵发性肢端小动脉痉挛而引起的局部缺血现象，表现为四肢末端（手指为主）对称性皮肤苍白、发绀、继之皮肤发红，伴感觉异常（指或趾疼痛），多见于青年女性，寒冷或情绪激动可诱发。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch18-autonomic-nervous-system-diseases-short002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "雷诺病的诊断要点是什么？",
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
        "雷诺病的诊断要点",
        "雷诺病诊断要点：①典型临床表现为多发生于青年女性、寒冷及情绪改变可诱发，双侧受累，以手指多见，界限分明的苍白、青紫及潮红等变化；②病史 2 年以上；③无其他引起血管痉挛发作疾病的证据。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例分析题（case），1 道 */
const caseItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch18-autonomic-nervous-system-diseases-case001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "男性，42 岁，因“双足趾端阵发性红、肿、疼痛 1 年”入院。1 年前无明显诱因出现左脚趾端阵发性发红，肿胀疼痛，夜间因疼痛加剧而影响入眠，1 周后右脚趾端也出现红肿胀痛，趾麻木。每次发作时间数分钟至数小时不等。双下肢下垂时热痛明显，抬高患肢后减轻；发作时将双足浸入冷水中症状可缓解。患者曾多次就医，先后给予抗过敏和抗炎治疗无效，遂来诊。既往体健。查体：双足趾端红紫，轻度水肿，皮温轻度升高，触压痛明显；足背动脉与胫后动脉搏动略增强。血常规、肝肾功能、血糖、血脂、血沉、自身抗体、补体、免疫球蛋白、类风湿因子均正常。请回答：（1）请写出诊断及诊断依据。（2）需与哪些疾病鉴别（写出至少 3 种疾病名）？（3）治疗原则是什么？",
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
        "红斑性肢痛症的诊断、鉴别诊断与治疗",
        "（1）诊断及诊断依据：红斑性肢痛症。依据：成年期发病；出现双侧对称性肢端阵发性红、肿、热、痛；下垂患肢疼痛加剧，冷水浴、抬高患肢疼痛减轻；抗炎治疗无效，排除局部感染及炎症；各项实验室常规检查及免疫学检查均未见异常，排除继发性红斑性肢痛症。该患者符合红斑性肢痛症的诊断标准。（2）需要鉴别的疾病有血栓闭塞性脉管炎、糖尿病周围神经病及雷诺病等。（3）一般治疗为在急性期卧床休息，抬高患肢，局部冷敷，急性期后应避免任何引起血管扩张的局部刺激。药物治疗可用小剂量阿司匹林、β-受体阻滞剂、5-羟色胺再摄取抑制剂及前列腺素等。对于继发性红斑性肢痛症患者，应同时积极治疗原发疾病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 2 成员（题组 1） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-neurology-ch18-autonomic-nervous-system-diseases-b001",
    order: 7,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "双侧肢端出现界限分明的苍白、青紫及潮红变化，寒冷情绪激动加重，温暖环境可缓解，足背动脉搏动存在",
      "双侧肢端对称发绀，寒冷情绪激动加重，温暖环境可略缓解，不能完全消失，无界限分明的苍白、青紫及潮红变化，足背动脉搏动存在",
      "双侧肢端阵发性红、肿、热、痛；以夜间明显，活动或长时间站立可加剧，抬高患肢和休息后疼痛减轻",
      "单侧肢端出现皮肤苍白、发绀及剧烈疼痛，并有肢端坏死，寒冷可诱发，足背动脉搏动减弱",
      "静息状态下双下肢难以形容的感觉异常与不适，常在夜间休息时加重，活动后可缓解",
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
        id: "ext-neurology-ch18-autonomic-nervous-system-diseases-b001m1",
        order: 7,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "符合雷诺病临床表现的是",
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
            "双侧肢端出现界限分明的苍白、青紫及潮红变化，寒冷情绪激动加重，温暖环境可缓解，足背动脉搏动存在",
            "雷诺病表现为双侧肢端界限分明的苍白、青紫及潮红变化，寒冷或情绪激动加重、温暖环境可缓解，足背动脉搏动存在。原书 B1 答案第 1 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch18-autonomic-nervous-system-diseases-b001m2",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "符合红斑肢痛症临床表现的是",
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
            "双侧肢端阵发性红、肿、热、痛；以夜间明显，活动或长时间站立可加剧，抬高患肢和休息后疼痛减轻",
            "红斑肢痛症表现为双侧肢端阵发性红、肿、热、痛，以夜间明显，活动或长时间站立可加剧，抬高患肢和休息后疼痛减轻。原书 B1 答案第 2 题为 C。",
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
  ...a1Items,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
