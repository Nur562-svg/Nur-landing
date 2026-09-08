import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第13章 分枝杆菌属 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 填空题（fill）：0 题
 * - 选择题（a1-single）：1 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：3 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：12 题（须等于本文件预算 12）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 4、选择题（A1 型 10 + A2 型 3）、B1 型 2 组（8 成员）
 *   与简答题 3；本文件按 12 道预算在原书顺序内取材，名词解释与简答题全取，选择题取前 1 道，
 *   B1 取第一组（14~17 题，4 成员）。正确项对齐章末参考答案键号（A1 1.B；B1 14.B 15.D 16.E 17.C）。
 *   OCR 错字与双栏错序已按微生物学医学语义恢复（如 英膜→荚膜、CD4'→CD4⁺、IFN-Y→IFN-γ、
 *   TNF-o→TNF-α、抗煮沸实验→抗煮沸试验、患儿火→患儿为 等），数值（G+C 62%~70%、代时 2~20 小时、
 *   3~4 周、72 小时、5 单位 PPD 等）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch13-mycobacterium";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第13章 分枝杆菌属 习题（核对PDF 第108–113页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch13-mycobacterium-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：抗酸杆菌",
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
        "抗酸杆菌",
        "分枝杆菌属细菌细胞壁中含有大量脂质，难以用一般染料染色，需用助染剂并加热使之着色，着色后又不易以含有 3% HCl 的乙醇脱色，故称抗酸杆菌。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch13-mycobacterium-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：索状因子",
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
        "索状因子",
        "是结核分枝杆菌细胞壁中的一种脂质组分，即海藻糖 6,6’-二分枝菌酸，因可导致细菌在液体培养基中紧密黏成索状的物质，故也称为索状因子，是结核分枝杆菌重要的致病因子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch13-mycobacterium-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：原发综合征",
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
        "原发综合征",
        "结核分枝杆菌进入肺部，在巨噬细胞内大量生长繁殖，最终导致细胞死亡崩解；释放出的结核分枝杆菌在细胞外繁殖或再被细胞吞噬，重复上述过程，如此反复引起渗出性炎症病灶，称为原发灶。原发灶内的结核分枝杆菌可经淋巴管扩散至肺门淋巴结，引起淋巴管炎和淋巴结肿大，X 线胸片显示哑铃状阴影，称原发综合征。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch13-mycobacterium-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：BCG",
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
        "BCG",
        "1908 年 Calmette 和 Guérin 将有毒的牛分枝杆菌培养于含胆汁、甘油、马铃薯的培养基中，经 230 次传代，历时 13 年，使其毒力发生变异，成为对人无致病性，而仍保持良好免疫原性的疫苗株，称为 BCG（Bacille Calmette-Guérin），即卡介苗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch13-mycobacterium-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "分枝杆菌属细菌最显著的特点是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "生长迅速",
      "胞壁中含有大量脂质",
      "抵抗力弱",
      "不容易变异",
      "有芽胞",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胞壁中含有大量脂质",
        "分枝杆菌属细菌细胞壁中含大量脂质、抗酸染色阳性，是最显著的特点；生长缓慢，无鞭毛、无芽胞，不产生内、外毒素。原书 A1 答案第 1 题为 B。",
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
    id: "ext-microbiology-ch13-mycobacterium-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述分枝杆菌属细菌的共同特点。",
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
        "分枝杆菌属细菌的共同特点",
        "①基因组中 G+C 的百分比高，为 62%~70%；②细胞壁中含大量脂质，抗酸染色阳性；③无鞭毛、无芽胞，也不产生内、外毒素，脂质是其主要致病物质；④生长缓慢，代时为 2~20 小时；⑤所致感染多为慢性感染过程，可形成特征性的肉芽肿。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch13-mycobacterium-short002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述结核分枝杆菌的脂质及其主要作用。",
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
        "结核分枝杆菌的脂质及其作用",
        "脂质是结核分枝杆菌的主要毒力因子，多呈糖脂或脂蛋白形式。其主要种类和作用包括：①海藻糖 6,6’-二分枝菌酸：也称索状因子，可与巨噬细胞诱导型 C 型凝集素受体结合，诱导 IL-1 和 TNF-α 的产生，促进肉芽肿形成；还可促进抗原提呈细胞成熟，激活 Th1 和 Th17 反应，具有佐剂特性。②甘露糖脂：包括脂阿拉伯甘露糖、脂阿拉伯甘露聚糖和磷脂酰肌醇甘露糖苷等，可结合巨噬细胞甘露糖受体，帮助细菌进入细胞内，抑制吞噬体成熟，阻止巨噬细胞的杀伤，并诱导抗炎细胞因子如 TNF-α 的产生；或与树突状细胞表面的 DC-SIGN 结合，促进 IL-10 的表达，在感染早期可抑制致敏 T 细胞从淋巴结移行到肺脏的感染灶，有利于细菌在感染灶的繁殖。③硫酸脑苷脂：可抑制吞噬细胞中的吞噬体与溶酶体融合，使结核分枝杆菌在细胞内存活。④磷脂：能刺激单核细胞增生，促使病灶内的巨噬细胞转变为上皮样细胞而形成结核结节，并与干酪样坏死有关。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch13-mycobacterium-short003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述结核菌素试验方法及结果判断。",
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
        "结核菌素试验方法、结果判断及其应用",
        "结核菌素试验目前多采用 PPD 法，取 5 单位 PPD 注入受试者左前臂掌侧前 1/3 中央皮内，72 小时（48~96 小时）后查验，注射部位红肿硬结直径＜5mm 或无反应者阴性；≥5mm 者阳性；≥15mm 者或局部出现双圈、水泡、坏死及淋巴管炎者强阳性。阳性反应表明卡介苗接种成功，或未接种卡介苗和非结核分枝杆菌流行地区结核分枝杆菌感染。强阳性反应则表明可能有活动性结核病，尤其是婴儿。需要注意的是，在原发感染早期、患严重的结核病或患其他严重疾病致细胞免疫功能低下者（如艾滋病病人、肿瘤病人或用过免疫抑制剂者），可能出现阴性反应。结核菌素试验可用于婴幼儿的结核病诊断、卡介苗接种效果测定和结核分枝杆菌感染的流行病学调查，还可用于肿瘤病人细胞免疫功能测定。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 型配伍题（bGroups），1 组 × 4 成员（题组14-17；取材预算内未纳入后一组18-21） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-microbiology-ch13-mycobacterium-b001",
    order: 9,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "索状因子",
      "磷脂",
      "荚膜",
      "硫酸脑苷脂",
      "结核菌素",
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
        id: "ext-microbiology-ch13-mycobacterium-b001m1",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与结核分枝杆菌毒力密切相关的是",
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
            "索状因子",
            "索状因子（海藻糖 6,6’-二分枝菌酸）是结核分枝杆菌重要的致病因子，与毒力密切相关。原书 B1 答案第 14 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch13-mycobacterium-b001m2",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "可抑制吞噬细胞中的吞噬体与溶酶体融合的是",
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
            "硫酸脑苷脂",
            "硫酸脑苷脂可抑制吞噬细胞中的吞噬体与溶酶体融合，使结核分枝杆菌在细胞内存活。原书 B1 答案第 15 题为 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch13-mycobacterium-b001m3",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "能引起皮肤迟发型超敏反应的物质是",
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
            "结核菌素",
            "结核菌素（结核分枝杆菌蛋白质成分）可引起皮肤迟发型超敏反应，用于结核菌素试验。原书 B1 答案第 16 题为 E。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-microbiology-ch13-mycobacterium-b001m4",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "与结核分枝杆菌黏附与入侵细胞相关的物质是",
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
            "荚膜",
            "结核分枝杆菌荚膜的主要成分是多糖，含部分脂质和蛋白质，与细菌黏附与入侵细胞、抵抗吞噬及其他免疫因子杀伤有关。原书 B1 答案第 17 题为 C。",
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
  ...fillItems,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
