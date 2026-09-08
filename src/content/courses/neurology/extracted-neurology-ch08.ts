import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 神经病学学习指导与习题集（第3版）— 第8章 头痛 题库提取（等比取样）
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 选择题（a1-single）：10 题（含 A2 病例题 2 题、A3/A4 病例串题 2 题）
 * - 问答题（short-answer）：4 题（含简答、论述）
 * - 病例分析题（case）：1 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：19 题（须等于本文件预算 19）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型 22、A2 型 10、A3/A4 型 11、B1 型 2 组 10 成员、简答题 9、
 *   论述题 4、病例分析题 2。本文件按 19 道预算在原书顺序内取材：A1 取第 1~6 题、A2 取
 *   第 1~2 题、A3/A4 取第 1 组病例串前 2 题、简答取第 1~3 题、论述取第 1 题、病例分析
 *   取第 1 题，B1 取第 1 组（1~4）完整组。正确项逐一对齐章末参考答案键号。OCR 错字与
 *   双栏错序已按神经病学医学语义恢复（如 祝觉→视觉、于侧→一侧、非留体→非甾体、
 *   Horer→Horner、眼脸→眼睑、吸人→吸入 等），数值与分子标记（60mmH₂O、NSAIDs、
 *   CGRP、ICHD-3）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "neurology-ch08-headache";
const locatorBase =
  "《神经病学学习指导与习题集》第3版 第8章 头痛 习题（核对PDF 第125–138页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** A1/A2/A3-A4 型选择题（统一映射为 a1-single），10 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch08-headache-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "最常见的偏头痛类型是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "有先兆偏头痛",
      "偏瘫性偏头痛",
      "无先兆偏头痛",
      "视网膜性偏头痛",
      "基底型偏头痛",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "无先兆偏头痛",
        "无先兆偏头痛约占偏头痛患者的 80%，是最常见的偏头痛类型。原书 A1 答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不属于原发性头痛的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "紧张型头痛",
      "脑血管疾病",
      "无先兆偏头痛",
      "基底型偏头痛",
      "丛集性头痛",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脑血管疾病",
        "原发性头痛包括偏头痛、紧张型头痛、丛集性头痛和其他三叉自主神经头痛、其他原发性头痛；脑血管疾病所致的头痛属于继发性头痛。原书 A1 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列不是偏头痛特征的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "搏动样头痛",
      "一般持续15分钟至3小时",
      "常伴恶心、呕吐",
      "多为偏侧",
      "光、声刺激或日常活动均可加重头痛",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "一般持续15分钟至3小时",
        "偏头痛未经治疗或治疗无效时头痛持续 4~72 小时，而非 15 分钟至 3 小时；偏侧性、搏动样、中重度、日常活动加重以及伴恶心呕吐、畏光畏声等均为偏头痛特征。原书 A1 答案第 3 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-a1004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "易合并出现药物过量使用性头痛的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "偏瘫性偏头痛",
      "有先兆偏头痛",
      "视网膜性偏头痛",
      "无先兆偏头痛",
      "基底型偏头痛",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "无先兆偏头痛",
        "无先兆偏头痛发作频繁，患者常反复使用急性对症药物，因此易合并出现药物过量使用性头痛。原书 A1 答案第 4 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-a1005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "偏头痛最常见的先兆是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "运动先兆",
      "言语先兆",
      "感觉先兆",
      "视觉先兆",
      "感觉合并运动先兆",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "视觉先兆",
        "偏头痛先兆最常见的是视觉先兆，常表现为双眼同向症状如视物模糊、暗点、闪光、亮点亮线或视物变形；其次为感觉先兆。原书 A1 答案第 5 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-a1006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列是偏头痛预防药物的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "布洛芬",
      "利扎曲普坦",
      "托吡酯",
      "阿司匹林",
      "二氢麦角胺",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "托吡酯",
        "托吡酯属于抗癫痫药，是偏头痛预防性治疗药物之一；利扎曲普坦、二氢麦角胺为发作期特异性治疗药物，阿司匹林、布洛芬为非特异性止痛药。原书 A1 答案第 6 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-a1007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，47 岁，头部四周紧箍样持续胀痛 4 个月。工作紧张后可出现，但静心或休息时消失。无恶心、呕吐，神经系统检查无异常，仅有双颞肌明显压痛。脑脊液压力、生化检查以及头颅 CT 无异常。可能的诊断为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "偏头痛",
      "低颅压性头痛",
      "紧张性头痛",
      "颅内占位病变",
      "短暂性脑缺血发作",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "紧张性头痛",
        "患者表现为头部紧箍样持续胀痛，与精神紧张有关，休息后缓解，双颞肌明显压痛，脑脊液及头颅 CT 无异常，符合紧张性头痛的临床特点。原书 A2 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-a1008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，28 岁，反复发作头痛，每年春季发作，每次发作持续 3 个月，表现为眼眶周围剧烈的刺痛伴有流泪，查体无异常，颅脑 CT 正常，最可能的诊断为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "无先兆偏头痛",
      "基底型偏头痛",
      "紧张型头痛",
      "丛集性头痛",
      "有先兆偏头痛",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "丛集性头痛",
        "患者每年春季成串发作、持续约 3 个月，表现为眼眶周围剧烈刺痛伴流泪，符合丛集性头痛的特点。原书 A2 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-a1009",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，18 岁，反复发作右侧肢体麻木、无力伴右额颞部搏动样疼痛。右侧肢体无力在头痛消失后约 1 小时即可完全缓解。颅脑 MRI 检查无异常。家庭中有类似患者。该患者最可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "常为偏头痛前驱的儿童周期性综合征",
      "偏头痛等位发作",
      "家族性偏瘫性偏头痛",
      "遗传性头痛",
      "基底型偏头痛",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "家族性偏瘫性偏头痛",
        "患者反复出现可逆的肢体无力先兆（右侧偏瘫）伴搏动样头痛，且家庭中有类似患者，符合家族性偏瘫性偏头痛的诊断。原书 A3/A4 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-a1010",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，18 岁，反复发作右侧肢体麻木、无力伴右额颞部搏动样疼痛。右侧肢体无力在头痛消失后约 1 小时即可完全缓解。颅脑 MRI 检查无异常。家庭中有类似患者。若患者的一级或二级亲属中无类似患者，则应诊断为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "遗传性头痛",
      "基底型偏头痛",
      "偏头痛等位发作",
      "偏瘫性偏头痛",
      "常为偏头痛前驱的儿童周期性综合征",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "偏瘫性偏头痛",
        "偏瘫性偏头痛分为家族性和散发性：一级或二级亲属中有类似患者者为家族性偏瘫性偏头痛，无家族史者则为散发性偏瘫性偏头痛。原书 A3/A4 答案第 2 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer，含简答、论述），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch08-headache-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "头痛主要分哪三大类？",
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
        "头痛的三大分类",
        "2013 年国际头痛疾病分类第 3 版试用版（ICHD-3）将头痛分为原发性头痛、继发性头痛、痛性脑神经病及其他面痛和其他头痛三大类。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "原发性头痛包括哪些？",
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
        "原发性头痛的组成",
        "原发性头痛包括偏头痛、紧张型头痛、丛集性头痛和其他三叉自主神经头痛、其他原发性头痛。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-short003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "继发性头痛常见原因有哪些？",
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
        "继发性头痛的常见病因",
        "继发性头痛的病因包括各种颅内病变如脑血管疾病、颅内感染、颅脑外伤，全身性疾病如发热、内环境紊乱以及滥用精神活性药物等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch08-headache-short004",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述伴典型先兆的偏头痛性头痛的诊断标准。",
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
        "伴典型先兆的偏头痛性头痛的诊断标准",
        "（1）符合（2）~（4）特征的至少 2 次发作。（2）至少出现以下一种完全可逆的先兆症状：①视觉症状，包括阳性表现（如闪光、亮点或亮线）和（或）阴性表现（如视野缺损）；②感觉异常，包括阳性表现（如针刺感）和（或）阴性表现（如麻木）；③言语和（或）语言功能障碍；④运动症状；⑤脑干症状；⑥视网膜症状。（3）至少满足以下 2 项：①至少 1 个先兆症状逐渐发展时间≥5 分钟，和（或）至少 2 个先兆症状连续出现；②每个先兆症状持续 5~60 分钟；③至少 1 个先兆症状是单侧的；④头痛伴随先兆发生，或发生在先兆之后，间隔时间少于 60 分钟。（4）不能归因于其他疾病，且排除短暂性脑缺血发作。",
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
    id: "ext-neurology-ch08-headache-case001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "女性，48 岁，主诉：反复发作性头痛 10 年，双眼视力下降 2 年。患者 10 年前开始，反复出现发作性头痛，可由情绪变化诱发，多位于左侧上眼眶部及左侧太阳穴部，呈搏动性，伴恶心、呕吐，不伴畏光、畏声，偶伴流泪，每次持续 12~72 小时，发作时口服“脑宁”2 片，症状可缓解，上述症状每月均有发生，次数不定。查体：体温正常，头颅、五官、心肺腹等检查未见异常。神经系统：神清，语利，脑神经（-），四肢肌力、肌张力正常，四肢腱反射（++），病理征阴性，颈软，Kernig 征（-），Brudzinski 征（-）。血常规、尿常规、便常规、生化全套、心电图、胸片等检查均正常。请回答：（1）请写出诊断及诊断依据。（2）需与哪些疾病鉴别？至少写出 3 种疾病。（3）还应做哪些辅助检查？（4）治疗原则是什么？",
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
        "无先兆偏头痛的诊断、鉴别、辅助检查与治疗",
        "（1）诊断：无先兆偏头痛。诊断依据：中年女性，反复发作性头痛 10 年。头痛特点为发作性、偏侧性、搏动性、额颞部为主，情绪变化可诱发或加重头痛，可伴有恶心、呕吐、畏光、畏声，持续数小时或 1 天。神经系统查体未见阳性体征。（2）需要鉴别的疾病有丛集性头痛、紧张型头痛、症状性偏头痛、药物过量使用性头痛等。（3）应行颅脑 CT 或颅脑核磁除外颅内器质性病变。（4）治疗目的是减轻或终止头痛发作，缓解伴发症状，预防头痛复发，包括药物治疗和非药物治疗。治疗原则：1）非药物治疗：加强宣教，寻找并避免各种偏头痛诱因。2）发作期治疗：①轻-中度头痛可单用 NSAIDs，如无效再用特异性药物；②中-重度头痛可直接选用特异性药物；③缓解伴随症状：止吐、镇静等。3）预防性治疗：若头痛频繁发作，严重影响日常生活和工作，需使用预防性药物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 4 成员（题组 1~4） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-neurology-ch08-headache-b001",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "体位性头痛",
      "双侧搏动样头痛",
      "偏侧搏动样头痛",
      "紧缩性或压迫性头痛",
      "一侧眼眶周围发作性头痛",
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
        id: "ext-neurology-ch08-headache-b001m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "低颅压性头痛主要特点是",
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
            "体位性头痛",
            "低颅压性头痛的典型特点是体位性头痛，立位时出现或加重，卧位时减轻或消失。原书 B1 答案第 1 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch08-headache-b001m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "丛集性头痛主要特点是",
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
            "一侧眼眶周围发作性头痛",
            "丛集性头痛表现为一侧眼眶周围、眶上、眼球后和（或）颞部的尖锐、爆炸样、非搏动性剧痛，常伴同侧颜面部自主神经功能症状。原书 B1 答案第 2 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch08-headache-b001m3",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "偏头痛主要特点是",
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
            "偏侧搏动样头痛",
            "偏头痛多为单侧、搏动性头痛，常伴恶心、呕吐、畏光、畏声。原书 B1 答案第 3 题为 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch08-headache-b001m4",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "紧张型头痛主要特点是",
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
            "紧缩性或压迫性头痛",
            "紧张型头痛的性质为压迫感或紧箍样（非搏动样），多为双侧。原书 B1 答案第 4 题为 A。",
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
