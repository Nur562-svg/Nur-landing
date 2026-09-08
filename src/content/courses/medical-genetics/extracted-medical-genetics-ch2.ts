import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学遗传学 学习指导与习题集（第4版）— 第2章 基因突变与遗传多态性 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：4 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：6 题
 * - 简答题 / 病例（映射 short-answer 或 case）：3 题
 * - B1 共用备选答案配伍题：2 组、共 8 个成员
 * - 独立记分题合计：21 题（含 B1 组成员；须等于本文件预算 21）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依次含名词解释 8、A1 型 22、A2 型 2（含着色性干皮病病例题）、
 *   B1 型 2 组（每组各 5 个成员）、简答 3，无 X 型多选，故本文件未使用 xMapNote。
 *   A2 病例型为通用型选择题，按规约映射为 a1-single。
 *   OCR 错字已按语义恢复（如“核莳酸”→核苷酸、“喊基”→碱基、“炙类碱雄”→
 *   异类碱基、“仁）麟题”→二)习题、“罌”→二），数值与单位保留原值，未捏造。
 *   各 B1 组 sharedChoices 仅保留本组被引用的互斥选项并映射到相应正确项。
 * 注意：本文件覆盖 PDF 第13–17页（第二章 基因突变与遗传多态性）。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "medical-genetics-ch2-gene-mutation-and-polymorphism";
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第2章 基因突变与遗传多态性 复习思考题 习题（PDF 第13–17页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：突变（mutation）",
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
        "突变",
        "突变（mutation）是指基因组 DNA 中永久性的、可遗传的序列改变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：动态突变（dynamic mutation）",
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
        "动态突变",
        "动态突变（dynamic mutation）是指基因组内一些简单串联重复序列（如 (CCG)n、(CAG)n、(CCTG)n 等）的拷贝数在每次减数分裂或体细胞有丝分裂过程中发生的不稳定改变。动态突变可发生于基因的任何位置。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：重组修复（recombination repair）",
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
        "重组修复",
        "重组修复（recombination repair）又称“复制后修复”。这种 DNA 修复方式必须在 DNA 复制时进行，在不切除胸腺嘧啶二聚体的情况下，通过 DNA 复制过程中两条 DNA 链的重组交换而完成 DNA 的修复。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：移码突变（frameshift mutation）",
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
        "移码突变",
        "移码突变（frameshift mutation）是指基因编码区内缺失或增加的核苷酸数目不是 3 的倍数而造成的读框（reading frame）的移动。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "由三核苷酸串联重复扩增而引起疾病的突变为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["动态突变", "移码突变", "转换", "颠换", "片段突变"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "动态突变",
        "三核苷酸串联重复的拷贝数逐代累加扩增即动态突变，是导致强直性肌营养不良等疾病的原因；原书为 A1 型，题号 6，正确答案 B（动态突变）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在突变点之后所有密码子均发生移位的突变为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["颠换", "转换", "移码突变", "片段突变", "动态突变"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "移码突变",
        "移码突变使突变点之后所有的密码子读框发生移位，导致编码序列整体错乱；原书为 A1 型，题号 7，正确答案 A（移码突变）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "异类碱基之间发生置换（嘌呤↔嘧啶互换）的突变为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["转换", "片段突变", "颠换", "动态突变", "移码突变"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "颠换",
        "嘌呤与嘧啶之间的置换称为颠换（transversion）；原书为 A1 型，题号 8，正确答案 E（颠换）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不改变所编码氨基酸的基因突变为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["错义突变", "无义突变", "终止密码突变", "同义突变", "移码突变"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "同义突变",
        "同义突变（synonymous mutation）因遗传密码的简并性而不改变所编码的氨基酸；原书为 A1 型，题号 11，正确答案 A（同义突变）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "DNA 多态可以用于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "基因定位",
      "以上都是",
      "亲权鉴定",
      "基因诊断",
      "人类进化学研究",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "以上都是",
        "DNA 多态可用于基因诊断、基因定位、亲权鉴定以及人类进化学研究等多个方面，故“以上都是”；原书为 A1 型，题号 22，正确答案 E（以上都是）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "一名 4 岁女童皮肤白皙，面部较多雀斑、光过敏，易被晒伤，其中一个雀斑色泽很深，初诊为着色性干皮病。着色性干皮病是哪一种 DNA 修复途径的缺陷所致",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "光复活修复",
      "重组修复",
      "核酸切除修复",
      "错配修复",
      "SOS修复",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "核酸切除修复",
        "着色性干皮病（XP）患者因核酸切除修复（核苷酸切除修复）途径缺陷，不能有效修复紫外线引起的 DNA 损伤，故易晒伤并出现皮肤色素改变；原书为 A2 型，题号 23，正确答案 D（核酸切除修复）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];
/** 简答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是基因突变？基因突变可分为哪些类型？",
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
        "基因突变的含义与分类",
        "基因突变主要指基因组 DNA 分子在结构上发生的碱基对组成或序列的改变，通常只涉及某一基因的部分变化。一般可将基因突变分为静态突变和动态突变两大类。静态突变包括点突变和片段突变：点突变是指 DNA 链中一个或一对碱基发生的改变，又可分为碱基置换和移码突变两种形式；片段突变是指 DNA 链中某些小片段的碱基序列发生缺失、重复或重排。动态突变是串联重复的三核苷酸序列随世代的传递而拷贝数逐代累加的突变方式。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述 DNA 损伤的修复机制。",
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
        "DNA 损伤的修复机制",
        "生物体内存在多种 DNA 修复系统。当 DNA 受到损伤时，在一定条件下，这些修复系统可以部分修正 DNA 分子的损伤，从而大大降低突变所引起的有害效应，保持遗传物质的稳定性。紫外线引起的 DNA 损伤主要通过光复活修复、重组修复、切除修复等机制进行修复；电离辐射引起的 DNA 损伤通过超快修复、快修复和慢修复机制进行修复。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-short003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是遗传多态性？遗传多态性有哪几种表现形式？",
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
        "遗传多态性的含义与表现形式",
        "多态性意即有两种或以上的存在形式。遗传多态性是指在同一种群中的某种遗传性状同时存在两种或以上不连续的变异体，或同一基因座上两个或以上等位基因共存的遗传现象。遗传多态性既可呈现为个体水平上表型遗传性状的多态性，亦可表现为细胞水平上染色体遗传的多态性和分子水平上基因组 DNA 遗传的多态性。其中基因组 DNA 遗传多态性又包括限制性片段长度多态性（RFLP）、可变数目串联重复序列（VNTR）多态性、短串联重复序列（STR）多态性、单核苷酸多态性（SNP）等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组 × 共 8 个成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-b001",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["静态突变", "动态突变", "片段突变", "转换", "颠换"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-b001m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "染色体结构畸变属于",
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
            "片段突变",
            "染色体结构畸变属于片段突变；原书 B1 型题号 25，正确答案 C（片段突变）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-b001m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "碱基 C 置换为碱基 T（同为嘧啶）属于",
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
            "转换",
            "同为嘧啶类碱基之间的置换为转换（transition）；原书 B1 型题号 26，正确答案 D（转换）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-b001m3",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "导致强直性肌营养不良的基因突变属于",
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
            "动态突变",
            "强直性肌营养不良由三核苷酸串联重复的动态突变所致；原书 B1 型题号 27，正确答案 B（动态突变）。",
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
  {
    id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-b002",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "同义突变",
      "错义突变",
      "无义突变",
      "终止密码突变",
      "移码突变",
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
        id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-b002m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "突变后引起编码蛋白的长度变短的是",
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
            "无义突变",
            "无义突变使编码密码子提前成为终止密码，编码蛋白长度变短；原书 B1 型题号 28，正确答案 C（无义突变）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-b002m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "突变后引起编码蛋白的长度变长的是",
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
            "终止密码突变",
            "终止密码突变使终止信号改变、翻译延伸，故编码蛋白长度变长；原书 B1 型题号 29，正确答案 D（终止密码突变）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-b002m3",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "突变后引起编码蛋白的氨基酸组成发生错乱，蛋白的长度变短或变长的是",
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
            "移码突变",
            "移码突变使读框之后所有密码子错乱，蛋白氨基酸组成混乱、长度或短或长；原书 B1 型题号 30，正确答案 E（移码突变）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-b002m4",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "突变后编码蛋白的长度未发生改变，但氨基酸组成发生错乱的是",
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
            "错义突变",
            "错义突变仅替换一个氨基酸，编码蛋白长度不变但氨基酸组成改变；原书 B1 型题号 31，正确答案 B（错义突变）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch2-gene-mutation-and-polymorphism-b002m5",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "突变后没有造成编码蛋白的氨基酸组成发生改变的是",
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
            "同义突变",
            "同义突变因密码简并性而不改变氨基酸组成；原书 B1 型题号 32，正确答案 A（同义突变）。",
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
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];