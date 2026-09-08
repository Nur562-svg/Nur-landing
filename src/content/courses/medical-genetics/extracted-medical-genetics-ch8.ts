import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学遗传学 学习指导与习题集（第4版）— 第8章 人类染色体 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：6 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：13 题（A1 型 9 题 + A2 型 4 题）
 * - 简答题 / 病例（映射 short-answer 或 case）：1 题（short-answer）
 * - B1 共用备选答案配伍题：1 组、共 2 个成员
 * - 独立记分题合计：22 题（含 B1 组成员；须等于本文件预算 22）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依次含名词解释 6、A1 型选择 10、A2 型病历选择 5、B1 配伍 5 组、
 *   简答题 3。本文件按 22 道预算按原书顺序等样取材：全部 6 道名词解释、前 9 道 A1
 *   （舍弃 OCR 严重残缺的 A1 第 3 题“基因位于”区带定位题）、4 道代表性 A2（原书
 *   A2 第 1、2、4、5 题，即无精子症 48,XXXY、胚胎停育核型分析、G6PD 蚕豆病、Y 长臂
 *   多态；舍弃原书 A2 第 3 题——46,XX 伴重度少精子症的 SRY 基因缺失题，因其 OCR
 *   选项重度残缺、无法可靠重建唯一正确项，故按规约舍弃并以后续清晰代表题填满预算）、
 *   1 组完整 B1 配伍（第 16–17 题），以及 1 道代表性简答题（常染色质与异染色质差异）。
 *   原书并无可独立成题的（非选择型）病案/遗传咨询计算题，故 case=0（A2 病历型均已
 *   按规约映射为 a1-single 单选）。所有选择题正确项逐一对齐源参考答案（A1：1.A 2.B
 *   4.C 5.D 6.C 7.A 8.D 9.C 10.E；A2：11.C 12.D 14.E 15.B；B1：16.A、17.E）。
 *   选项顺序已随机重排并同步 correctChoiceIndex（0 起）。OCR 错字已按语义恢复
 *   （如“48,XXXV”→48,XXXY、“双y基因/SRY 相关选项”→已随原题舍弃、“嫌旋/蜾旋/螺旋”→
 *   螺旋、“次溢痕”→次缢痕）。核型符号（46,XX、48,XXXY）及 ISCN 区带坐标（如 Xp11.31、
 *   1p31.3、2q11.31 等）按原值保留，未捏造。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "medical-genetics-ch8-human-chromosomes";
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第8章 人类染色体 复习思考题 习题（PDF 第48–52页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：兼性异染色质（facultative heterochromatin）",
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
        "兼性异染色质",
        "兼性异染色质（facultative heterochromatin）是指一类在特定细胞或在一定发育阶段由常染色质凝缩转变而形成的异染色质。当其浓缩时，基因失去了活性，无转录功能；当其处于松散状态时，又能够转变为常染色质，恢复其转录活性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：同源染色体（homologous chromosome; homolog）",
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
        "同源染色体",
        "同源染色体（homologous chromosome; homolog）即在人类正常核型中，染色体是成对存在的，每一对染色体在形态结构、大小和着丝粒位置上基本相同，其中一条来自父本的精子，一条来自母本的卵子，称为同源染色体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：染色体组（chromosome set）",
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
        "染色体组",
        "染色体组（chromosome set）是指在真核生物中，一个正常生殖细胞中所含的全套染色体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：带（band）",
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
        "带",
        "带（band）是指在核型分析时，不同的染色技术可将每一条染色体区分为不同的节段（segment）。例如，G-显带方法可将早中期的人类染色体区分为850条左右的带。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：核型（karyotype）",
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
        "核型",
        "核型（karyotype）是指将一个体细胞中的全部染色体按其大小和形态特征，依次排列而成图像。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：染色体多态性（heteromorphism; chromosomal polymorphism）",
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
        "染色体多态性",
        "染色体多态性（heteromorphism; chromosomal polymorphism）是指在正常健康人群中，存在着个别染色体恒定的微小变异，包括结构、带纹宽窄和着色强度等。这类恒定而微小的正常变异按照孟德尔方式遗传。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），13 道（A1 9 道 + A2 4 道） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "染色质和染色体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "不同物质在细胞的不同时期的两种不同的存在形式",
      "不同物质在细胞的同一时期的不同表现",
      "两者的组成和结构完全不同",
      "同一物质在细胞的不同时期的两种不同的存在形式",
      "同一物质在细胞的同一时期的不同表现",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "同一物质在细胞的不同时期的两种不同的存在形式",
        "原书 A1 型选择题答案第一题为 A，即染色质和染色体是同一物质在细胞的不同时期的两种不同的存在形式：间期呈染色质，分裂期凝缩为染色体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "常染色质是间期细胞核中",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "螺旋化程度高，有转录活性的染色质",
      "螺旋化程度高，无转录活性的染色质",
      "螺旋化程度低，有转录活性的染色质",
      "螺旋化程度低，很少有转录活性的染色质",
      "螺旋化程度低，无转录活性的染色质",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "螺旋化程度低，有转录活性的染色质",
        "原书 A1 型选择题答案第二题为 B，即常染色质是间期细胞核中螺旋化程度低、有转录活性的染色质。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "根据《ISCN》，人类 C 组染色体数目为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "6对",
      "7对+Y染色体",
      "6对+X染色体",
      "7对+X染色体",
      "7对",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "7对+X染色体",
        "原书 A1 型选择题答案第四题为 C，即人类 C 组染色体数目为 7对+X染色体（C 组含第6~12号染色体 7 对，X 染色体亦属 C 组）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "染色体的类型划分主要根据",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "染色体的长短",
      "随体的有无",
      "着丝粒的位置",
      "端粒的位置",
      "次缢痕的位置",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "着丝粒的位置",
        "原书 A1 型选择题答案第五题为 D，即染色体的类型划分主要根据着丝粒的位置。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1005",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "人类最小的中着丝粒染色体属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "E组",
      "F组",
      "D组",
      "Y染色体",
      "G组",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "F组",
        "原书 A1 型选择题答案第六题为 C，即人类最小的中着丝粒染色体属于 F 组。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1006",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "按照《ISCN》的标准，第1号染色体，短臂，3区，1带，第3亚带应表示为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "1q31.3",
      "1p3.13",
      "1p31.3",
      "1p313",
      "1q3.13",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "1p31.3",
        "原书 A1 型选择题答案第七题为 A，即第1号染色体短臂、3区、1带、第3亚带应表示为 1p31.3（p=短臂，依次为区、带、亚带号）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1007",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "用染色体显带技术使染色体末端的端粒部分特异性深染，形成的带型为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Q带",
      "T带",
      "N带",
      "C带",
      "G带",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "T带",
        "原书 A1 型选择题答案第八题为 D，即用染色体显带技术使染色体末端的端粒部分特异性深染形成的带型为 T 带。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1008",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在正常男性核型中，具有随体的染色体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "亚中着丝粒染色体",
      "端着丝粒染色体",
      "中着丝粒染色体",
      "Y染色体",
      "近端着丝粒染色体",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "近端着丝粒染色体",
        "原书 A1 型选择题答案第九题为 C，即在正常男性核型中具有随体的染色体是近端着丝粒染色体（D 组、G 组染色体短臂末端可见随体）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1009",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于染色体多态性的常见部位，下面哪一项是错误的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Y染色体长臂结构异染色质区",
      "第1、9、16号染色体次缢痕部位",
      "D组染色体的随体区",
      "G组染色体的随体区",
      "X染色体末端",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "X染色体末端",
        "原书 A1 型选择题答案第十题为 E，即“X染色体末端”不是染色体多态性的常见部位，故为本题的错误项；其余选项均为常见多态性部位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1010",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某男性患者，30岁，不育，临床诊断为无精子症。染色体检查分析发现其核型为 48,XXXY。请问该患者的体细胞内有",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "3个X小体，1个Y小体",
      "2个X小体，0个Y小体",
      "3个X小体，0个Y小体",
      "2个X小体，1个Y小体",
      "1个X小体，1个Y小体",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "2个X小体，1个Y小体",
        "原书 A2 型选择题答案第十一题为 C。核型 48,XXXY 含 3 条 X 染色体与 1 条 Y 染色体；X 小体数=X 染色体数−1=2，故体细胞内有 2 个 X 小体、1 个 Y 小体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1011",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "一对正常夫妇因两次不明原因发生早期胚胎停育，并生育过一个多发畸形儿，前来医院就诊。医生建议首先有必要进行的检查是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "血常规检查",
      "酶活性分析",
      "尿常规检查",
      "核型分析",
      "基因诊断",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "核型分析",
        "原书 A2 型选择题答案第十二题为 D。一对正常夫妇反复早期胚胎停育并生育多发畸形儿，应首先进行夫妻双方染色体的核型分析，以筛查可能存在的数目或结构异常（尤其平衡易位等）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1012",
    order: 18,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某女性患者，6岁，在进食新鲜蚕豆后1天内发生头痛、厌食、恶心、呕吐、腹痛、溶血性贫血等症状，临床诊断为蚕豆病（即 G6PD 缺乏症）。基因检查发现患者和其母均为 G6PD 突变基因的杂合子，但患者母亲即使食用蚕豆也极少发病。已知 G6PD 缺乏症为 X-连锁不完全显性遗传病，男性半合子发病，女性杂合子具有不同的表现度。患者的母亲表型正常的原因是 X 染色体失活导致的患病风险降低。具体可解释为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "携带有活性的突变型等位基因细胞群的比例高，其G6PD酶活性不变",
      "携带有活性的突变型等位基因细胞群的比例高，其G6PD酶活性明显增高",
      "携带有活性的野生型等位基因细胞群的比例高，其G6PD酶活性明显降低",
      "携带有活性的突变型等位基因细胞群的比例高，其G6PD酶活性明显降低",
      "携带有活性的野生型等位基因细胞群的比例高，其G6PD酶活性接近正常",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "携带有活性的野生型等位基因细胞群的比例高，其G6PD酶活性接近正常",
        "原书 A2 型选择题答案第十四题为 E。由于 X 染色体失活（Lyon 假说）是随机的，女性杂合子呈嵌合体：若其体细胞中携带活性的野生型（正常）等位基因的细胞群比例高，则整体 G6PD 酶活性接近正常，故食用蚕豆也极少发病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-a1013",
    order: 19,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某男性的外周血染色体检查初步结果显示：在非显带和 G 显带标本中，染色体数目正常，但 Y 染色体的长臂加长，其大小接近 E 组染色体。为了证实该男性存在 Y 染色体长臂结构异染色质区的多态性变异，可建议增加",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Q显带分析",
      "N显带分析",
      "C显带分析",
      "R显带分析",
      "T显带分析",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "C显带分析",
        "原书 A2 型选择题答案第十五题为 B。C 显带能使结构异染色质区（着丝粒及 Y 染色体长臂异染色质区）特异性深染，可用于证实 Y 染色体长臂结构异染色质区的多态性变异。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），1 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-short001",
    order: 22,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "常染色质与异染色质在结构和功能上有何差异？",
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
        "常染色质与异染色质的结构功能差异",
        "常染色质（euchromatin）是指在细胞间期呈松散状态部分的染色质纤维，其螺旋化程度低，染色较浅而均匀，含有单一或重复序列 DNA，具有转录活性，常位于间期核的中央部分；而异染色质（heterochromatin）多分布在核膜内表面，在细胞间期呈凝缩状态，其螺旋化程度较高，着色较深，含有重复 DNA 序列，为间期核中不活跃的染色质，其 DNA 复制较晚，很少转录或无转录活性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例 / 病案分析（case，非选择型）：本章无 */
const caseItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，1 组 × 2 成员（原书 16–17 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-medical-genetics-ch8-human-chromosomes-b001",
    order: 20,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["F组", "E组", "A组", "C组", "D组"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-medical-genetics-ch8-human-chromosomes-b001m1",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "第20号染色体属于",
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
            "F组",
            "原书 B1 型选择题答案第十六题为 A，即第20号染色体属于 F 组（F 组为第19~20号染色体）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch8-human-chromosomes-b001m2",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "X染色体属于",
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
            "C组",
            "原书 B1 型选择题答案第十七题为 E，即 X 染色体属于 C 组（C 组为第6~12号染色体及 X 染色体）。",
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