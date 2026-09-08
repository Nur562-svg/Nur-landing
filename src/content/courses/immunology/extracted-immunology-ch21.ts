import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学免疫学学习指导与习题集（第3版）— 第21章 感染免疫 题库提取（等比取样）
 * 来源：《医学免疫学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：6 题（含 A2 病例题 1 题）
 * - 问答题（short-answer）：2 题
 * - 独立记分题合计：17 题（须等于本文件预算 17）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原题依序含名词解释 4、填空题 5、选择题 A1 16 题＋A2 8 题＋B1 18 题、问答题 8；
 *   本文件按 17 道预算等比取材（名词、填空全部收录，单选取样 6，问答题取材 2）。B1 配伍题按
 *   项目规约不映射独立记分，归入空数组。
 *   OCR 错字与符号已按免疫学医学语义恢复（如 Th1/Th2、IFN-γ/IFN-α/IFN-β、CD4⁺/CD8⁺、CD40L、
 *   MAC 等）；A2 病例题保留全部临床细节。胞外/胞内菌、病毒各型干扰素、寄生虫/真菌免疫术语
 *   均按源文恢复，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "immunology-ch21-infection-immunity";
const locatorBase =
  "《医学免疫学学习指导与习题集》第3版 第21章 感染免疫 习题（核对PDF 第236–244页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对，OCR 错字已按免疫学医学语义恢复";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch21-infection-immunity-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗毒素",
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
        "用以抵御细菌毒素的抗体，通过中和毒素作用使细菌不与细胞接触，达到防御细菌入侵的目的",
        "抗毒素（antitoxin）本质是中和细菌毒素的抗体；它中和毒素后使毒素不能与其靶细胞结合，从而阻断致病。原书名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：慢性期",
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
        "病毒在急性期未被彻底清除而残留形成持续感染时，低水平病毒复制和持续感染致疾病长期存在、病程反复发作的时期",
        "慢性期属于持续性感染的部分表现，此时病原体未被彻底清除、持续低水平复制，病程迁延反复。原书名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗原漂移",
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
        "病毒通过连续世代中随机突变改变抗原表位、快速修饰自身抗原从而逃避免疫细胞或抗体识别的过程",
        "抗原漂移是病毒变异逃避免疫攻击的常见途径：变异后的病毒以新的方式存在，不再被机体已有的记忆性淋巴细胞或抗体所识别。原书名词解释第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肉芽肿",
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
        "抗胞内菌免疫与病原体相持不下而转慢性感染时，感染局部形成的一种内层含巨噬细胞和 CD4⁺T 细胞、外层为 CD8⁺T 细胞以局限化感染的特殊结构",
        "肉芽肿的作用是将胞内菌「关」在局部以局限化感染、阻止其扩散；见于结核等慢性胞内菌感染。原书名词解释第 4 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题 A1/A2 型（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch21-infection-immunity-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "机体抗胞外菌免疫主要依赖于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "体液免疫",
      "细胞免疫",
      "天然免疫",
      "获得性免疫",
      "巨噬细胞",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "体液免疫",
        "体液免疫是宿主对抗胞外菌感染的主要保护性免疫机制，通过体液免疫清除病原体或中和毒素；细胞免疫主要清除胞内菌/病毒。原书 A1 第 1 题答案 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对巨噬细胞的高活化、最终导致肉芽肿的形成发挥关键作用的细胞因子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IFN-γ", "IL-2", "IL-5", "IL-10", "TNF-α"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IFN-γ",
        "活化效应 Th1 细胞产生的 IFN-γ 使巨噬细胞高活化，增强抗菌（包括产 ROI 和 RNI）能力，并最终导致肉芽肿形成；IL-5 主要参与嗜酸性粒细胞活化，IL-10 为抑制性细胞因子。原书 A1 第 2 题答案 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "在机体抗病毒免疫中发挥重要作用的细胞因子是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["IFN（干扰素）", "CSF", "TNF", "IL", "GF"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "IFN（干扰素）",
        "干扰素是抗病毒免疫最重要的早期免疫分子，尤以 I 型干扰素（IFN-α/β）抑制病毒复制最为关键。原书 A1 第 7 题答案 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "机体抗原生动物寄生虫免疫的关键Th细胞类型是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["Th1", "Treg", "Tfh", "Th2", "Th17"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Th1",
        "Th1 应答（含巨噬细胞高活化和 IFN-γ）是原生动物寄生虫免疫的关键；Th2 应答是防御大的多细胞蠕虫的关键。原书 A1 第 10 题答案 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "机体抗蠕虫寄生虫免疫的关键Th细胞类型是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["Th2", "Th1", "Treg", "Tfh", "Th17"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Th2",
        "Th2 应答是防御大的、多细胞的蠕虫的关键，Th2 细胞因子促进 IgE 产生、肥大细胞与嗜酸性粒细胞活化以驱除蠕虫。原书 A1 第 13 题答案 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者，男性，45岁。初诊为肺结核，可检测哪种微生物以辅助诊断",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "结核分枝杆菌",
      "伤寒杆菌",
      "弗氏志贺菌",
      "嗜肺性军团杆菌",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "结核分枝杆菌",
        "肺结核由结核分枝杆菌引起，可检测抗酸染色、结核菌培养或结核感染 T 细胞/抗体以辅助诊断。原书 A2 第 20 题答案 A；原书选项第 5 项与第 2 项 OCR 重复（均显示伤寒杆菌），按医学语义保留 4 项清晰选项，未捏造替代项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），5 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch21-infection-immunity-fill001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "五类主要病原体包括___、___、___、___和___。",
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
        "胞外菌、胞内菌、病毒、寄生虫、真菌",
        "五类主要病原体为胞外菌、胞内菌、病毒、寄生虫和真菌，各自激活不同类型的抗感染免疫应答。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-fill002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "胞外菌分泌的毒素有如下两类：___和___。",
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
        "外毒素、内毒素",
        "外毒素是细菌产生并释放的毒性蛋白，致病作用强、具有选择性；内毒素主要是革兰阴性菌细胞壁的脂多糖（LPS）。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-fill003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "抗胞内菌免疫转为慢性感染会形成肉芽肿，肉芽肿内层包含___细胞和___细胞，而外层是___细胞。",
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
        "内层：巨噬细胞、CD4⁺T细胞；外层：CD8⁺T细胞",
        "肉芽肿是抗胞内菌免疫转慢性感染时局限化感染的机制：内层为巨噬细胞和 CD4⁺T 细胞，外层为 CD8⁺T 细胞。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-fill004",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "I型干扰素包括___和___，而II型干扰素为___。",
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
        "I型干扰素：IFN-α、IFN-β；II型干扰素：IFN-γ",
        "Ⅰ型干扰素（IFN-α、IFN-β）主要由病毒感染细胞等产生、抗病毒作用突出；Ⅱ型干扰素即 IFN-γ，主要由活化 T 细胞和 NK 细胞产生，是巨噬细胞高活化与 Th1 分化的关键。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-fill005",
    order: 15,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "病毒特异性CTL应答是抗病毒免疫的关键，它在引流淋巴结被激活后到达感染部位，通过以下三种机制杀死靶细胞：___、___和___。",
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
        "颗粒介导的细胞毒性作用、Fas介导的细胞凋亡、分泌细胞因子（TNF 和 IFN，如 TNF-α 与 IFN-γ）",
        "病毒特异性 CTL 通过颗粒（穿孔素/颗粒酶）介导的细胞毒性作用、Fas 介导的细胞凋亡，以及分泌 TNF 和 IFN 细胞因子三条途径杀伤病毒感染的靶细胞。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-immunology-ch21-infection-immunity-short001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述抗体在机体抗胞内菌感染中的作用机制。",
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
        "中和抗体与刚进入宿主的细菌或释出胞外尚未感染新细胞的子代菌结合，阻断细菌进入宿主细胞，并经调理吞噬或经典补体介导的溶解清除，抑制病原体传播",
        "被感染的细胞死亡时释放的细菌组分可激活 B 细胞产生中和性抗体；这些抗体与刚进入宿主的细菌结合，或与释放到胞外但尚未感染新宿主细胞的子代细菌结合，使细菌无法进入宿主细胞，随后被调理吞噬作用或经典补体介导的溶解作用清除，从而抑制病原体播散。抗体对宿主防御部分胞内菌具有重要作用。原书问答题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-immunology-ch21-infection-immunity-short002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "各列举一种胞内菌逃避抗体和T细胞的机制。",
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
        "逃避抗体：通过伪足入侵转移到新的宿主细胞，细菌从未暴露于胞外环境而不成为抗体靶标（如李斯特菌）；逃避T细胞：通过减少 APCs 的抗原提呈（如结核分枝杆菌感染 DC 后下调 MHC Ⅰ/Ⅱ类与 CD1）逃避 T 细胞攻击",
        "①逃避抗体机制：李斯特菌等胞内菌可诱导宿主产生基于肌动蛋白的伪足，内陷进入邻近非吞噬细胞，邻近细胞吞噬含菌伪足、细菌经 LLO 和磷脂酶破坏囊泡进入新细胞胞质。由于细菌从未暴露于胞外，因此从不成为抗体靶标。②逃避 T 细胞机制：结核分枝杆菌感染 DC 后引起 MHC Ⅰ类、Ⅱ类分子和 CD1 下调，使抗原无法提呈给 T 细胞和 NKT 细胞，从而逃避 T 细胞应答。原书问答题第 4 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 配伍题：本书第 21 章虽有 B1 组题，但按项目规约 B 型不映射独立记分，置空数组。 */
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