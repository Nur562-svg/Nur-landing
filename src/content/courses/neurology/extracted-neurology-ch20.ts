import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 神经病学学习指导与习题集（第3版）— 第20章 神经系统遗传性疾病 题库提取（等比取样）
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 选择题（a1-single）：7 题（含 A2 病例题 1 题、A3/A4 病例串题 3 题）
 * - 问答题（short-answer）：4 题（含简答 2、论述 2）
 * - 病例分析题（case）：1 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：16 题（须等于本文件预算 16）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型 12、A2 型 1、A3/A4 型 6（2 组）、B1 型 3 组 12 成员、
 *   简答题 17、论述题 6、病例分析题 1。本文件按 16 道预算在原书顺序内取材：A1 取第
 *   1~3 题、A2 取第 1 题、A3/A4 取第 1 组（1~3 题，FRDA 病例串）、简答取第 1~2 题、
 *   论述取第 1~2 题、病例分析全取，B1 取第 1 组（1~4）完整组。正确项逐一对齐章末
 *   参考答案键号。OCR 错字与双栏错序已按神经病学医学语义恢复（如 洽疗→治疗、
 *   菱缩→萎缩、星型细胞瘤→星形细胞瘤、眼肌痹→眼肌麻痹、脊桂侧凸→脊柱侧凸、
 *   力→为、120mmH,O→120mmH₂O、苓树叶状→卵圆形（ash leaf） 等），数值与分子标记
 *   （FRDA 基因 GAA、PMP22、GJB1、TSC1/TSC2、Lisch 结节）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "neurology-ch20-hereditary-nervous-system-diseases";
const locatorBase =
  "《神经病学学习指导与习题集》第3版 第20章 神经系统遗传性疾病 习题（核对PDF 第370–381页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** A1/A2/A3-A4 型选择题（统一映射为 a1-single），7 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "Friedreich 型共济失调临床表现的首发症状是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "进行性的步态共济失调",
      "深感觉障碍",
      "腱反射消失",
      "构音障碍",
      "心肌病",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "进行性的步态共济失调",
        "Friedreich 型共济失调（FRDA）发病年龄通常为 4~15 岁，首发症状一般是进行性的步态共济失调，双下肢同时受累，表现为站立不稳和行走困难。原书 A1 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于 Friedreich 型共济失调下列错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "明显的浅感觉障碍",
      "儿童或少年期起病",
      "呈常染色体隐性遗传",
      "自下肢向上肢发展的进行性共济失调",
      "腱反射消失",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "明显的浅感觉障碍",
        "FRDA 早期以位置觉和振动觉等深感觉减退为主，后期才有触觉、痛温觉轻度减退，故“明显的浅感觉障碍”表述错误；其余均符合 FRDA 的特点。原书 A1 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不用于诊断 Friedreich 型共济失调的检查是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脑电图",
      "心电图",
      "超声心动图",
      "X 光片",
      "CT 和 MRI",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脑电图",
        "FRDA 的辅助检查包括心电图、超声心动图、X 光片（显示心脏异常改变）以及 CT/MRI（显示脊髓变细）等，脑电图不用于诊断 FRDA。原书 A1 答案第 3 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-a1004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "4 岁儿童，患有癫痫，出生时右侧前额及眼部可见红葡萄酒色扁平血管痣，头颅平片检查发现颅内与脑回外形一致的双轨状钙化灶，提示诊断为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脑面血管瘤病",
      "松果体瘤",
      "颅咽管瘤",
      "神经纤维瘤病",
      "结节性硬化症",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脑面血管瘤病",
        "红葡萄酒色扁平血管痣伴癫痫发作、颅内与脑回外形一致的双轨状钙化灶，为脑面血管瘤病（Sturge-Weber 综合征）的典型表现。原书 A2 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-a1005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，12 岁，站立不稳和行走困难 3 年，双手取物时震颤 1 年，查体神清，言语缓慢，眼球运动不受限，四肢肌力 5 级，肌张力正常，腱反射消失，双病理征阳性。患儿站立时足距增宽，Romberg 征阳性，双手有动作性和意向性震颤。此患者以下检查不恰当的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脑电图",
      "脊髓 MRI",
      "肌电图",
      "心电图",
      "FRDA 基因 GAA 异常扩增检测",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脑电图",
        "患儿表现符合 Friedreich 型共济失调，诊断性检查应围绕脊髓 MRI、肌电图、心电图及 FRDA 基因 GAA 扩增检测等，脑电图对 FRDA 诊断价值不大，故不恰当。原书 A3/A4 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-a1006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，12 岁，站立不稳和行走困难 3 年，双手取物时震颤 1 年，查体神清，言语缓慢，眼球运动不受限，四肢肌力 5 级，肌张力正常，腱反射消失，双病理征阳性。患儿站立时足距增宽，Romberg 征阳性，双手有动作性和意向性震颤。若脊髓 MRI 显示脊髓变细，肌电图提示感觉传导速度减慢，心电图发现心室肥厚、心律失常，考虑可能性大的疾病是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Friedreich 型共济失调",
      "脊髓小脑性共济失调",
      "遗传性痉挛性截瘫",
      "腓骨肌萎缩症",
      "脊肌萎缩症",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Friedreich 型共济失调",
        "脊髓变细、感觉神经传导速度减慢伴心肌病（心室肥厚、心律失常）是 Friedreich 型共济失调的典型表现。原书 A3/A4 答案第 2 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-a1007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，12 岁，站立不稳和行走困难 3 年，双手取物时震颤 1 年，查体神清，言语缓慢，眼球运动不受限，四肢肌力 5 级，肌张力正常，腱反射消失，双病理征阳性。患儿站立时足距增宽，Romberg 征阳性，双手有动作性和意向性震颤。首选的药物治疗是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "辅酶 Q 和其他的抗氧化剂",
      "B 族维生素",
      "丙种球蛋白",
      "皮质激素",
      "新型钙通道阻滞剂",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "辅酶 Q 和其他的抗氧化剂",
        "FRDA 目前治疗措施包括给予辅酶 Q 和其他抗氧化剂（泛醌、艾地苯醌）等。原书 A3/A4 答案第 3 题为 A。",
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
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是神经系统遗传性疾病？",
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
        "神经系统遗传性疾病的定义",
        "神经系统遗传性疾病是由于遗传物质异常或由遗传因素决定的疾病，以神经功能缺损为主要临床表现的疾病称为神经系统遗传性疾病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "神经系统遗传性疾病的分类是什么？",
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
        "神经系统遗传性疾病的分类",
        "根据受累的遗传物质不同，神经系统遗传性疾病主要分为四大类：单基因遗传病、多基因遗传病、染色体病和线粒体遗传病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-short003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "Friedreich 型共济失调的主要临床表现是什么？",
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
        "Friedreich 型共济失调的主要临床表现",
        "发病年龄通常是 4~15 岁，首发症状一般是进行性的步态共济失调，通常是双下肢同时受累，表现为站立不稳和行走困难，症状明显时有感觉性和小脑性共济失调并存。数月或数年后出现双上肢的共济失调，有动作性和意向性震颤。最后是构音障碍、言语缓慢。疾病后期可见轻度肌萎缩。早期位置觉和振动觉减退，后期有触觉、痛温觉轻度减退。几乎所有患者腱反射早期消失，伸性跖反射，括约肌功能通常不受累，智力一般不受累。弓形足和脊柱后侧凸畸形可出现在神经症状的前后。约半数以上患者可出现心肌病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-short004",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "脊髓小脑性共济失调的共有症状和各亚型的特征性症状是什么？",
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
        "脊髓小脑性共济失调的共有症状与亚型特征",
        "共有症状：30~40 岁隐匿起病，缓慢进展，以下肢共济失调为首发症状，表现为走路摇晃、步基宽、突然跌倒，伴双手笨拙及意向性震颤、辨距不良、构音障碍、眼球震颤等，通常起病 10~20 年后不能行走，查体可见肌张力障碍、锥体束征和深感觉障碍。各亚型特征：SCA1 有周围神经病、锥体束征，病程晚期有肌张力障碍；SCA2 有面肌束颤、眼睑退缩、眼球慢扫视运动、反射低、周围神经病和痴呆；SCA3 有锥体束和锥体外系受累体征、面肌和舌肌束颤、眼肌麻痹和突眼、感觉性周围神经病、肌肉萎缩；SCA6 有振动觉和关节位置觉减退，无锥体束、锥体外系症状和认知功能障碍，进展缓慢；SCA7 有眼肌麻痹、锥体束和锥体外系体征、振动觉减弱、视网膜黄斑变性；SCA8 有振动觉减退、反射增强，进展缓慢；SCA10 表现为纯小脑性共济失调，可有全面性和（或）复杂部分性癫痫发作。",
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
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-case001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "男性，35 岁，因“走路摇摆、容易跌倒 1 年余，言语不清半年”入院。1 年多前无明显诱因出现走路摇摆、步基宽、容易跌倒，症状缓慢逐渐加重，伴有双手笨拙，取物时出现震颤，近半年出现言语不清，遂来诊。既往否认高血压、糖尿病，否认长期饮酒史。家族史：患者叔叔有类似病史。入院查体：神清，构音障碍，记忆力、计算力、定向力、理解判断力正常，眼球运动正常，瞳孔反射存在，有水平眼震，面肌对称，伸舌居中，四肢肌力 V 级，肌张力正常，双手指鼻不准，有意向性震颤，Romberg 征阳性，感觉系统检查基本正常，病理征阳性。辅助检查：头 CT 和 MRI 显示小脑萎缩，增强无异常表现。肌电图为周围神经损害。脑干诱发电位异常。腰穿检查压力 120mmH₂O，脑脊液生化及常规正常。院内查血生化、血常规、抗体三项、肿瘤四项、心电图、甲状腺功能、肺 CT 等检查均正常。请回答：（1）请写出诊断及诊断依据。（2）需与哪些疾病鉴别（写出至少 3 种疾病名）？（3）还应做哪些辅助检查？（4）治疗原则是什么？",
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
        "脊髓小脑性共济失调的诊断、鉴别、辅助检查与治疗",
        "（1）诊断及诊断依据：临床诊断为脊髓小脑性共济失调。依据：中年男性，隐袭起病，缓慢进展，病程 1 年半；首发症状走路摇摆、容易跌倒，逐渐加重，伴双手笨拙、取物时震颤，近半年出现言语不清；查体构音障碍、水平眼震、双手指鼻不准、意向性震颤、Romberg 征阳性、病理征阳性；头 CT/MRI 示小脑萎缩，增强无异常；肌电图示周围神经损害，脑干诱发电位异常，腰穿压力 120mmH₂O、脑脊液生化及常规正常；除外酒精中毒及肿瘤性疾病；家族史：患者叔叔有类似病史。（2）需与非遗传性、获得性共济失调的一些病因鉴别，如酒精中毒、多发性硬化、多系统萎缩、原发性或转移性肿瘤、副肿瘤综合征、血管性疾病等。（3）进一步确诊应进行分子遗传学检查。（4）目前本病尚无特异性治疗方法，对症治疗可缓解症状；应用金刚烷胺可改善共济失调症状，左旋多巴可缓解强直等锥体外系症状；康复训练、物理治疗及辅助行走可能有助于改善生活质量；进行遗传咨询对了解下一代的发病情况有所裨益。",
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
    id: "ext-neurology-ch20-hereditary-nervous-system-diseases-b001",
    order: 13,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "面部皮脂腺瘤",
      "背部多发片状牛奶咖啡斑",
      "颜面蝶形红斑",
      "颜面部红葡萄酒色扁平血管痣",
      "眼睑紫红色水肿",
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
        id: "ext-neurology-ch20-hereditary-nervous-system-diseases-b001m1",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "结节性硬化症的皮疹是",
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
            "面部皮脂腺瘤",
            "结节性硬化症的面部皮脂腺瘤实际上是血管纤维瘤，主要分布在鼻唇沟、颏部和颊部，呈粉红色或淡棕色表面光滑的蜡样丘疹。原书 B1 答案第 1 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch20-hereditary-nervous-system-diseases-b001m2",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "神经纤维瘤 1 型的皮疹是",
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
            "背部多发片状牛奶咖啡斑",
            "神经纤维瘤病 1 型最主要的临床表现之一是皮肤牛奶咖啡斑，好发于躯干非暴露部位，形状大小不一、边缘不整、不凸于皮面。原书 B1 答案第 2 题为 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch20-hereditary-nervous-system-diseases-b001m3",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "脑面血管瘤病的皮疹是",
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
            "颜面部红葡萄酒色扁平血管痣",
            "脑面血管瘤病（Sturge-Weber 综合征）出生时即可见红葡萄酒色扁平血管痣，多沿三叉神经第 1 支范围分布。原书 B1 答案第 3 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch20-hereditary-nervous-system-diseases-b001m4",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "系统性红斑狼疮的面部典型皮疹是",
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
            "颜面蝶形红斑",
            "系统性红斑狼疮的面部典型皮疹为蝶形红斑，分布于面颊及鼻梁部，与神经皮肤综合征的皮疹不同。原书 B1 答案第 4 题为 D。",
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
