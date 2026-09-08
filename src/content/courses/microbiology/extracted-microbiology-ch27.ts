import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学微生物学学习指导与习题集（第2版）— 第27章 急性胃肠炎病毒 题库提取（等比取样）
 * 来源：《医学微生物学学习指导与习题集》第2版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 填空题（fill）：5 题
 * - 选择题（a1-single）：0 题（含 A2 病例题 0 题）
 * - 问答题（short-answer）：4 题
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：14 题（须等于本文件预算 14）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 5、填空题 5、选择题（A1 型 12 + A2 型 4）、B1 型 1 组
 *   （共 2 成员）与简答题 5；本文件按 14 道预算在原书顺序内取材，名词解释与填空全取，
 *   简答取前 4 道（名词解释+填空+简答全取为 15 道，超出预算 1 道，故按原书顺序取前若干道），
 *   预算内未纳入选择题与 B1。OCR 错字与双栏错序已按微生物学医学语义恢复（如 沩→为、
 *   类便→粪便、BLISA→ELISA、疱症性咽峡炎→疱疹性咽峡炎、水样便沩主→水样便为主 等），
 *   数值保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "microbiology-ch27-acute-gastroenteritis-viruses";
const locatorBase =
  "《医学微生物学学习指导与习题集》第2版 第27章 急性胃肠炎病毒 习题（核对PDF 第205–210页）";
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
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：急性胃肠炎病毒（acute gastroenteritis virus）",
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
        "急性胃肠炎病毒（acute gastroenteritis virus）",
        "急性胃肠炎病毒：是指经消化道感染和传播、主要引起急性肠道内感染性疾病的胃肠道感染病毒，也是人类食源性疾病的主要病原体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：轮状病毒（rotavirus）",
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
        "轮状病毒（rotavirus）",
        "轮状病毒：归属于呼肠病毒科，病毒基因组为双链 RNA，无包膜，其双层衣壳排列的形状极像车轮，故命名轮状病毒，是引起婴幼儿腹泻的主要病原体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：诺如病毒（norovirus）",
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
        "诺如病毒（norovirus）",
        "诺如病毒：归属于杯状病毒科，病毒基因组为单正链 RNA，衣壳呈二十面体立体对称，无包膜，是全球引起急性病毒性胃肠炎暴发流行的主要病原体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：星状病毒（astrovirus）",
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
        "星状病毒（astrovirus）",
        "星状病毒：形态学特点是表面结构呈星形，有 5~6 个角，基因组为单正链 RNA，无包膜，是引起人类急性胃肠炎的病毒之一，占病毒性腹泻的 2.8% 左右。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：肠道腺病毒（enteric adenovirus）",
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
        "肠道腺病毒（enteric adenovirus）",
        "肠道腺病毒：是指主要引起急性胃肠炎的腺病毒，包括 40、41 和 42 型腺病毒，是婴幼儿病毒性腹泻中的第二位病原体。基因组为双链 DNA，衣壳呈二十面体立体对称，无包膜。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），本章无 —— 置空 */
const a1Items: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill），5 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-fill001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "急性胃肠炎病毒包括___、___、___和___，均以___和___症状为主。",
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
        "轮状病毒；杯状病毒；星状病毒；肠道腺病毒；腹泻；呕吐",
        "急性胃肠炎病毒包括轮状病毒、杯状病毒、星状病毒和肠道腺病毒，引起以腹泻和呕吐为主要症状的病毒性胃肠炎。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-fill002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "轮状病毒腹泻病人粪便中可见三种类型的病毒颗粒，即___、___，以及直径 37nm、常缺少基因组 RNA、无感染性的颗粒。",
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
        "光滑型颗粒；粗糙型颗粒",
        "轮状病毒腹泻病人粪便中可见光滑型颗粒、粗糙型颗粒以及直径 37nm、常缺少基因组 RNA、无感染性的颗粒三种类型。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-fill003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "杯状病毒基因组为___，可引起人类急性病毒性胃肠炎的杯状病毒是___和___。",
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
        "单正链 RNA（+ssRNA）；诺如病毒属；札幌病毒属",
        "杯状病毒基因组为单正链 RNA（+ssRNA），可引起人类急性病毒性胃肠炎的杯状病毒是诺如病毒属和札幌病毒属。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-fill004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "星状病毒在电镜下表面结构呈___，无包膜，基因组为___。",
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
        "星形；单正链 RNA",
        "星状病毒在电镜下表面结构呈星形，无包膜，基因组为单正链 RNA。原书填空题第 4 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-fill005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "肠道腺病毒是指主要引起急性胃肠炎的腺病毒，其中___、___和___三型腺病毒均可引起消化道感染，但以___型最多见。",
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
        "40；41；42；41",
        "肠道腺病毒指主要引起急性胃肠炎的腺病毒 40、41、42 三型，均可引起消化道感染，但以 41 型最多见。原书填空题第 5 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述 A 组轮状病毒的感染特点和致病机制。",
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
        "A 组轮状病毒的感染特点和致病机制",
        "A 组轮状病毒是引起 6 个月~2 岁婴幼儿严重胃肠炎的主要病原体，主要通过粪-口途径传播，多发于深秋初冬季节。病毒经胃肠道侵入人体后，在小肠黏膜绒毛细胞内增殖并损伤其转运机制，造成小肠上皮细胞微绒毛萎缩、脱落和细胞溶解死亡，使肠道吸收功能受损而致泻。致泻的另一原因是病毒的非结构蛋白 NSP4 有肠毒素样的作用，刺激细胞内钙离子升高，引发肠液过度分泌和重吸收减少，出现严重腹泻。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述诺如病毒感染和致病性的特点。",
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
        "诺如病毒感染和致病性的特点",
        "诺如病毒是全球引起急性病毒性胃肠炎暴发流行的主要病原体之一，其引起的急性胃肠炎的高发季节为秋冬季，可感染任何年龄组人群。人、隐性感染者及健康带毒者均可为传染源，但污染的水和烹制不当的食品（如海鲜、冷饮、凉菜等）也是常见的原因。粪-口为主要传播途径，传染性强，在人口聚集的学校、幼儿园、医院等场所容易引起暴发流行，从而成为突发公共卫生问题。病毒感染后引起小肠绒毛轻度萎缩和黏膜上皮细胞的破坏，感染的潜伏期约 24~48 小时，然后突然发病，出现恶心、呕吐、腹痛和水样腹泻，症状通常持续 1~3 天。多数感染者呈自限性，预后较好，无死亡病例发生。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-short003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简述人星状病毒致病性的主要特点。",
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
        "人星状病毒致病性的主要特点",
        "人星状病毒侵犯十二指肠黏膜细胞，并在其中大量增殖，造成细胞死亡裂解，将病毒颗粒释放到肠腔中。在感染的急性期，粪便中含大量病毒颗粒，是导致星状病毒医院感染的重要原因。星状病毒胃肠炎的临床表现类似于轮状病毒胃肠炎，主要症状是恶心、呕吐、腹痛、腹泻，以水样便为主；但症状较轻，病程 1~4 天。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-microbiology-ch27-acute-gastroenteritis-viruses-short004",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "问答题：简要叙述轮状病毒感染的微生物学检查方法。",
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
        "轮状病毒感染的微生物学检查方法",
        "轮状病毒感染的微生物学检查与其他病毒性疾病的检查方法大致相同，包括分离培养病毒、查病毒核酸和抗原。但因为其感染的病程短，一般为 7 天，所以其微生物学检查也有一定的特性，归纳起来有：①利用电镜查粪便中的轮状病毒颗粒；②采用 ELISA 查粪便中的轮状病毒抗原；③提取病毒 RNA 进行聚丙烯酰胺凝胶电泳；④RT-PCR 方法查病毒核酸；⑤细胞培养分离病毒，但临床上少用。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题（bGroups），本章无 —— 置空 */
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
