import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 神经病学学习指导与习题集（第3版）— 第22章 睡眠障碍 题库提取（等比取样）
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 选择题（a1-single）：5 题（含 A2 病例题 1 题、A3/A4 病例串题 2 题）
 * - 问答题（short-answer）：2 题（含简答 1、论述 1）
 * - 病例分析题（case）：1 题
 * - B1 配伍题：1 组、共 5 个成员
 * - 独立记分题合计：13 题（须等于本文件预算 13）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型 12、A2 型 1、A3/A4 型 2（1 组）、B1 型 1 组 5 成员、
 *   简答题 12、论述题 3、病例分析题 1。本文件按 13 道预算在原书顺序内取材：A1 取第
 *   1~2 题、A2 取第 1 题、A3/A4 取第 1 组（1~2 题，RLS 病例串）、简答取第 1 题、论述取
 *   第 1 题、病例分析全取，B1 取第 1 组（1~5）完整组。正确项逐一对齐章末参考答案键号。
 *   OCR 错字与双栏错序已按神经病学医学语义恢复（如 苯二氮草类→苯二氮䓬类、
 *   Y-羟丁酸钠→γ-羟丁酸钠、人睡→入睡、何请→何谓、自动行→自动行为、
 *   hyponea→hypopnea、起劲跺脚→使劲跺脚 等），数值与分子标记（PSG、PLM、Hcrt-1、
 *   ICSD-3、NREM/REM、3~4 周、25%）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "neurology-ch22-sleep-disorders";
const locatorBase =
  "《神经病学学习指导与习题集》第3版 第22章 睡眠障碍 习题（核对PDF 第391–399页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** A1/A2/A3-A4 型选择题（统一映射为 a1-single），5 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch22-sleep-disorders-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列描述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "根据电生理变化，睡眠可分为 NREM 睡眠与 REM 睡眠",
      "睡眠时脑活动处于静止状态",
      "NREM 睡眠时全身代谢活动增强",
      "REM 睡眠可以分为 1~4 期",
      "REM 的特征是各种感觉功能增强",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "根据电生理变化，睡眠可分为 NREM 睡眠与 REM 睡眠",
        "人类正常睡眠根据电生理变化分为非快速眼动睡眠（NREM）和快速眼动睡眠（REM）两个时相；睡眠时脑活动并非静止，NREM 睡眠时全身代谢活动减慢，REM 睡眠不能分为 1~4 期，REM 的特征是各种感觉功能明显减退。原书 A1 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch22-sleep-disorders-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "慢波睡眠是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "NREM 睡眠 4 期",
      "REM 睡眠",
      "NREM 睡眠 1 期",
      "NREM 睡眠 2 期",
      "NREM 睡眠 3 期",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "NREM 睡眠 4 期",
        "慢波睡眠指 NREM 睡眠中的深睡期（3~4 期），脑电图以高幅慢波为主，本题按原书参考答案取 NREM 睡眠 4 期。原书 A1 答案第 2 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch22-sleep-disorders-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，50 岁，2 年前开始打鼾伴睡眠中憋醒，每夜发作 1~2 次，以后逐渐加重，夜间憋醒数次，白天嗜睡，精神差。半年来睡眠时被迫采取坐位。神经系统检查未见异常。该患者为确定诊断，应进行的辅助检查是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "多导睡眠图",
      "睡眠脑电图",
      "睡眠肌电图",
      "睡眠心电图",
      "睡眠血气分析",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多导睡眠图",
        "患者打鼾伴睡眠中憋醒、白天嗜睡，考虑阻塞性睡眠呼吸暂停综合征，多导睡眠图（PSG）监测是确定诊断的主要依据。原书 A2 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch22-sleep-disorders-a1004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，70 岁，十多年前不明原因突然出现双腿不适感，每次为双侧小腿深部有一种难以忍受的非痛性不适感，像虫爬样、针刺样、烧灼样……难以描述，患者需拍打腿部，有时需使劲跺脚、下地溜达才能缓解。症状多于夜间或休息时发生。本病的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "不安腿综合征（RLS）",
      "雷诺病",
      "末梢神经炎",
      "感觉性异常股痛",
      "红斑性肢痛症",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "不安腿综合征（RLS）",
        "静息状态下双下肢难以形容的感觉异常与不适，有活动双腿的强烈愿望，需拍打、跺脚、下地溜达才能缓解，症状于夜间或休息时发生，符合不安腿综合征（RLS）的诊断。原书 A3/A4 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch22-sleep-disorders-a1005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，70 岁，十多年前不明原因突然出现双腿不适感，每次为双侧小腿深部有一种难以忍受的非痛性不适感，像虫爬样、针刺样、烧灼样……难以描述，患者需拍打腿部，有时需使劲跺脚、下地溜达才能缓解。症状多于夜间或休息时发生。本病的治疗可选用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "多巴胺能药物",
      "钙通道拮抗剂",
      "新型中枢兴奋剂",
      "选择性 5-羟色胺再摄取抑制剂",
      "肾上腺素再摄取抑制剂",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "多巴胺能药物",
        "原发性不安腿综合征以小剂量多巴胺能药物为首选，如左旋多巴、多巴胺受体激动剂（溴隐亭、普拉克索、卡麦角林、罗匹尼罗）等。原书 A3/A4 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer，含简答、论述），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch22-sleep-disorders-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "人类正常睡眠分哪两个时相？两个时相的各自特征是什么？",
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
        "正常睡眠的两个时相及各自特征",
        "人类正常睡眠分两个时相，即非快速眼动睡眠（NREM）和快速眼动睡眠（REM）。NREM 的特征是全身代谢减慢、对外界的反应减少，脑电图出现慢波、纺锤波及 K-复合波，肌电图显示肌肉活动减少。REM 的特征是自主神经不稳定，肌张力进一步降低，各种感觉功能明显减退，脑电图表现与 NREM 1 期相似，肌电图中肌肉活动减少或消失。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch22-sleep-disorders-short002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "发作性睡病的主要临床表现有哪些？",
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
        "发作性睡病的主要临床表现",
        "发作性睡病通常于 10~30 岁起病。主要表现为：（1）日间过度睡眠是发作性睡病的主要症状，表现为白天突然发生不可克制的睡眠发作，可以发生在静息时，也可以在一些运动如上课、驾车、乘坐汽车、看电视等情况下发生，睡眠持续时间从几分钟到数小时不等。（2）猝倒发作是本病的特征性症状，具有诊断价值，表现为在觉醒时躯体随意肌突然失去张力而摔倒，持续几秒钟，偶可达几分钟，无意识丧失；大笑是最常见的诱因，生气、愤怒、恐惧及体育活动也可诱发。（3）夜间睡眠障碍，包括夜间睡眠中断、觉醒次数和时间增多、睡眠效率下降、睡眠瘫痪、入睡前幻觉、梦魇、异态睡眠及 REM 睡眠期行为障碍等，其中最具特征性的是与梦境相关的入睡前幻觉和睡眠瘫痪；睡眠幻觉出现于睡眠开始时或睡眠到觉醒之间的转换过程中，睡眠瘫痪发生于刚刚入睡或刚觉醒时数秒钟到数分钟内，表现为肢体不能活动、不能言语，发作时意识清楚，患者常有濒死感，这种发作可以被轻微刺激所终止。（4）自动行为，即患者在看似清醒的状态下出现漫无目的的单调、重复的动作。其他症状可有睡眠时不自主肢体运动、夜间睡眠不安、记忆力下降等。",
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
    id: "ext-neurology-ch22-sleep-disorders-case001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "男性，15 岁。因“睡眠增多 1 年，发作性双下肢无力半年”入院。1 年前无明显疲劳或紧张后出现睡眠增多，多于日间发作，每次持续数分钟至数小时，睡意不能克制。终日精神不振，思睡，课间、走路亦有打盹，但睡眠浅、易被唤醒。半年前出现大笑后双腿无力，瘫软，不能行走，但神志清楚，数分钟后自行缓解。就诊前 1 月又出现类似症状，遂来诊。患者自发病以来饮食起居如常，无善饥多食，但有厌学及自卑感。学习能力下降，注意力不集中，近半年学习成绩明显下降。既往无脑外伤、脑炎、癫痫等病史，亦无类似疾病家族史。入院查体：神清语利，记忆力、计算力、定向力、理解判断力均正常。感觉检查正常，四肢肌力 V 级，肌张力正常，病理征未引出。颅脑 MRI 和 CT 未见异常。EEG 检查正常。血、尿、便常规检查均未见异常。请回答：（1）请写出诊断及诊断依据。（2）需与哪些疾病鉴别（写出至少 3 种疾病名）？（3）治疗原则是什么？",
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
        "发作性睡病的诊断、鉴别与治疗",
        "（1）诊断及诊断依据：发作性睡病。依据：首发症状为白天频繁小睡，病程 1 年；半年后出现由大笑诱导的猝倒发作；体格检查无局灶性神经系统体征；符合发作性睡病的诊断标准；患者自发病以来饮食起居如常，无善饥多食，排除 Kleine-Levin 综合征；既往无脑外伤、脑炎、癫痫等病史，EEG 检查正常，排除癫痫发作；血、尿、便常规、颅脑 MRI 和 CT 未见异常，排除低血糖反应性发作性睡病、低血钙性发作性睡病、脑干肿瘤所致的发作性睡病。（2）需要鉴别的疾病有特发性睡眠过多症、Kleine-Levin 综合征、复杂部分性癫痫发作、低血糖反应性发作性睡病、低血钙性发作性睡病、脑干肿瘤所致的发作性睡病等。（3）包括非药物治疗和药物治疗。非药物治疗首先需保持生活规律、养成良好的睡眠习惯、控制体重、避免情绪波动、白天有意安排小憩以减轻症状；其次应尽量避免较有危险的体育活动，如登山、游泳、驾车及操作机械等；同时还要对患者进行心理卫生教育，特别是青少年患者容易造成较大的心理压力，应加强对本病的知识普及。治疗药物主要包括 3 方面：中枢兴奋剂治疗日间嗜睡、抗抑郁剂改善猝倒症状、镇静催眠药物治疗夜间睡眠障碍。中枢兴奋剂包括传统的中枢兴奋剂（如苯丙胺、咖啡因等）和新型中枢兴奋剂（如莫达非尼）；对猝倒发作可使用选择性 5-羟色胺与去甲肾上腺素再摄取抑制剂类和选择性去甲肾上腺素再摄取抑制剂；镇静催眠药物可治疗睡眠行为障碍。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 5 成员（题组 1~5） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-neurology-ch22-sleep-disorders-b001",
    order: 9,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "新型中枢兴奋剂",
      "苯二氮䓬类药物",
      "三环类抗抑郁药",
      "多巴胺能药物",
      "经鼻持续正压气道通气",
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
        id: "ext-neurology-ch22-sleep-disorders-b001m1",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可改善发作性睡病中病理性睡眠症状的是",
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
            "新型中枢兴奋剂",
            "发作性睡病的日间过度睡眠可用中枢兴奋剂（莫达非尼、苯丙胺、哌甲酯等）激活下丘脑觉醒中枢而改善。原书 B1 答案第 1 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch22-sleep-disorders-b001m2",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "目前使用最广泛的治疗失眠的药物是",
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
            "苯二氮䓬类药物",
            "苯二氮䓬类药物是目前使用最广泛的治疗失眠的药物，可缩短入睡时间、减少觉醒次数。原书 B1 答案第 2 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch22-sleep-disorders-b001m3",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对猝倒发作疗效较好的是",
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
            "三环类抗抑郁药",
            "三环类抗抑郁药可抑制 REM 睡眠、减少猝倒发作，对发作性睡病的猝倒发作疗效较好。原书 B1 答案第 3 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch22-sleep-disorders-b001m4",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "RLS 的首选治疗药物",
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
            "多巴胺能药物",
            "原发性不安腿综合征以小剂量多巴胺能药物为首选，如左旋多巴、多巴胺受体激动剂等。原书 B1 答案第 4 题为 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch22-sleep-disorders-b001m5",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "中重度 OSAHS 的一线治疗措施是",
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
            "经鼻持续正压气道通气",
            "无创气道正压通气治疗是成人 OSAHS 患者的首选治疗手段，中重度患者以经鼻持续正压气道通气（CPAP）为一线治疗措施。原书 B1 答案第 5 题为 D。",
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
