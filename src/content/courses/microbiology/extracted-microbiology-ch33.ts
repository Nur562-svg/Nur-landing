import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第33章 其他病毒 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：2 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：3 题
 * - B1 配伍题：0 组（本章原书含 2 组 B1 配伍题，本文件预算剩余未纳入）
 * - 独立记分题合计：10 题（须等于本文件预算 10）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、选择题（A1 型 8 + A2 型 4）、B1 型 2 组（共 5 成员）
 *   与简答题 3；本文件按 10 道预算取样，名词解释与简答题全取，选择题取 A1 2 道，
 *   B1 配伍题未纳入（预算剩余全部用于 A1 选择题）。OCR 错字与双栏错序已按微生物学
 *   医学语义恢复（如内基小体、固定毒株、HPV 型别等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch33-other-viruses";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第33章 其他病毒 习题（核对PDF 第245–249页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch33-other-viruses-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：野毒株（wild strain）",
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
        "野毒株（wild strain）",
        "野毒株或称街毒株，是指从自然感染的动物体内分离到的毒力强的狂犬病病毒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch33-other-viruses-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：恐水症（hydrophobia）",
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
        "恐水症（hydrophobia）",
        "即狂犬病。由于病毒感染引起迷走神经核、舌咽神经核和舌下神经核受损，患者可发生呼吸肌、吞咽肌痉挛，临床上出现恐水、吞咽困难等症状。其中，特殊的恐水症状表现在饮水、见水、流水声或谈及饮水时，均可引起严重咽喉肌痉挛，故也称狂犬病为恐水症。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch33-other-viruses-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：固定毒株（fixed strain）",
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
        "固定毒株（fixed strain）",
        "将野毒株在家兔脑内连续传代后，病毒对家兔致病的潜伏期逐渐缩短，50 代左右时，潜伏期可由原来的 4 周左右缩短为 4~6 天；但继续进行传代，潜伏期不再缩短。这种毒力变异的狂犬病病毒被称为固定毒株，其重要特点是对家兔的致病性增强，对人或犬的致病性明显减弱；并且从脑外途径对犬进行接种时，不能侵入脑神经组织引起狂犬病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch33-other-viruses-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：内基小体（Negri body）",
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
        "内基小体（Negri body）",
        "狂犬病病毒在动物或人的中枢神经细胞中增殖时，在细胞质内形成的嗜酸性包涵体，叫内基小体，可作为诊断狂犬病的指标。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch33-other-viruses-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：传染性红斑",
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
        "传染性红斑",
        "由细小病毒 B19 引起，常发生于学龄前儿童，呈流感样表现，随之出现皮疹，面颊部可出现典型的掌击样面容。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），2 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch33-other-viruses-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "与子宫颈癌发生有关的病毒是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["HBV", "CMV", "HPV", "HAV", "HSV-1"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "HPV",
        "高危型人乳头瘤病毒（HPV，如 16、18 型等）与宫颈癌等恶性肿瘤的发生密切相关。原书 A1 答案第 1 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch33-other-viruses-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于狂犬病病毒叙述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "病毒在末梢神经细胞内增殖",
      "潜伏期短",
      "动物发病前 5 天内唾液中含有病毒",
      "病死率低",
      "在动物脑组织中感染均形成内基小体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "动物发病前 5 天内唾液中含有病毒",
        "狂犬病病毒在动物发病前 5 天内即可从唾液排出，人被咬伤后感染风险高；狂犬病病死率极高、潜伏期长短不一，病毒主要在神经组织（脑组织）内增殖并形成内基小体。原书 A1 答案第 5 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无 —— 置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 问答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch33-other-viruses-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简答狂犬病毒固定毒株的概念与用途。",
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
        "狂犬病毒固定毒株的概念与用途",
        "把狂犬病病毒野毒株连续在家兔脑内传 50 代后，家兔发病的潜伏期从最初的 4 周左右逐渐缩短至 4~6 天，继续传代时潜伏期不再缩短，这种病毒株称为固定毒株。因固定毒株对人及犬致病力弱，脑外接种后一般不能侵入脑内增殖，不引起动物发病，因此可用固定毒株制成疫苗，以预防狂犬病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch33-other-viruses-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：当人被狂犬咬伤后，应采取哪些措施预防狂犬病发生。",
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
        "狂犬咬伤后的预防措施",
        "①伤口处理：用 3%~5% 肥皂水或 0.1% 苯扎溴铵溶液及清水清洗伤口，再用 75% 乙醇或碘涂擦消毒。②预防接种：尽早接种狂犬病疫苗。③被动免疫制剂使用：注射抗狂犬病马血清或人源免疫球蛋白。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch33-other-viruses-short003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述人乳头瘤病毒（HPV）的传播途径及致病特点。",
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
        "HPV 的传播途径及致病特点",
        "HPV 的传播主要通过直接接触或间接接触、性行为传播和新生儿在通过产道时感染。HPV 主要侵犯人类皮肤黏膜，引起相应疾病。跖疣或寻常疣常由 HPV1、2 和 4 型引起；扁平疣常由 HPV3 和 10 型引起。生殖器 HPV 感染可引起尖锐湿疣，被确定为性传播疾病（STD），主要由 HPV6、HPV11 型感染所致。HPV16、18、31 和 33 型与子宫颈癌发生密切相关。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章原书含 2 组，本文件未纳入 —— 置空 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
