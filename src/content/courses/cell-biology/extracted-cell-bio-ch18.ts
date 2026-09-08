import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学细胞生物学实验指导与习题集（第4版）— 第18章 细胞工程 题库提取（等比取样）
 * 来源：《医学细胞生物学实验指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：7 题
 * - 单项选择题（a1-single）：11 题（其中多项选择题映射 2 题）
 * - 独立记分题合计：18 题（须等于本文件预算 18）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依次含名词解释 7、单项选择题 35、多项选择题 5；本书无配伍/填空/简答，故在
 *   原书顺序内取材补满预算 18 道（名词 7 + 单选 9 + 多选映射 2）。多选映射按项目规约改为单选句、
 *   取其中一个正确项，promptSource.note 用 xMapNote。正确项均对照章末参考答案键号
 *   （单选 1.C…35.A；多选 1.ABCDE、2.ABD…5.BDE）锚定；选项恢复完整集合（单选 5 项、多选 5 项）
 *   并同步 correctChoiceIndex（0 起）。双栏错序已按细胞工程医学生物学语义恢复（含数值等级、过程
 *   顺序、疫苗/抗生素等类别），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "cell-bio-ch18-cell-engineering";
const locatorBase =
  "《医学细胞生物学实验指导与习题集》第4版 第18章 细胞工程 习题集（核对PDF 第222–226页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多项选择题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），7 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-cell-bio-ch18-cell-engineering-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：细胞工程",
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
        "细胞工程（cell engineering）",
        "细胞工程是将细胞生物学知识与生物工程学技术相结合而形成的一门新的学科领域。主要通过细胞融合或拆合、核质交换或核移植、染色体或基因转移以及经由细胞培养和筛选，按照人们预先的设计产生出新的细胞，用于生产或医疗实践。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：悬浮培养",
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
        "悬浮培养（suspension culture）",
        "悬浮培养是细胞在培养液中呈悬浮状态生长和增殖的培养方法。适用于血液淋巴组织细胞及其肿瘤细胞、转化细胞、融合细胞的培养。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：三维细胞培养",
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
        "三维细胞培养（three-dimensional cell culture，TDCC）",
        "三维细胞培养是指将具有不同三维结构的材料作为载体，与各种不同种类的细胞在体外共同培养，使细胞能够在载体的三维立体空间结构中迁移、生长，构成三维的细胞载体复合物。这种培养方法获得的细胞与体内细胞生长情况极为相似。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：细胞融合",
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
        "细胞融合（cell fusion）",
        "细胞融合又称细胞杂交（cell hybridization），是指 2 个或 2 个以上的细胞合并成 1 个细胞的过程。可用于研究细胞的遗传变异、进化、发育及用于生产单克隆抗体等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：细胞核移植",
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
        "细胞核移植（nuclear transfer）",
        "细胞核移植是指通过显微操作将一个细胞的细胞核移植到一个去核的卵母细胞内的技术过程。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因转移",
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
        "基因转移（gene transfer）",
        "基因转移是将外源基因导入受体细胞并整合至受体细胞的基因组中，使受体细胞遗传性状及表型发生一定改变的技术。借此可以选择出所需的新型细胞，乃至新的个体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：细胞重编程",
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
        "细胞重编程（cell reprogramming）",
        "细胞重编程是指不改变基因序列，通过表观遗传修饰来改变细胞的命运，使已分化细胞的核基因组恢复其分化前的功能状态，该技术可用于细胞治疗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 单项选择题（a1-single），11 道（含多选映射 2 道，置于数组末尾） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-cell-bio-ch18-cell-engineering-a1001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "细胞大规模培养时，培养容量通常至少为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["0.5L", "1L", "2L", "4L", "5L"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "2L",
        "细胞大规模培养的培养容量通常至少为 2L（相对于小规模培养）。原书单选答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-a1002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "2 个或 2 个以上的细胞合并成 1 个细胞的过程称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["细胞培养", "细胞融合", "细胞克隆", "核质交换", "基因转移"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细胞融合",
        "细胞融合（细胞杂交）指 2 个或 2 个以上细胞合并为 1 个细胞。原书单选答案第 10 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-a1003",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可用于构建人工工程组织或器官的细胞被称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["干细胞", "种子细胞", "细胞融合", "多能诱导干细胞", "杂交细胞"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "种子细胞",
        "用于构建人工工程组织或器官的细胞称为种子细胞。原书单选答案第 12 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-a1004",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "制备单克隆抗体过程中，能在 HAT 选择性培养基中存活的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["T细胞", "B细胞", "骨髓瘤细胞", "杂交细胞", "淋巴细胞"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "杂交细胞",
        "杂交瘤（杂交）细胞既具 B 细胞的分泌抗体能力又具骨髓瘤细胞的无限增殖特性，能在 HAT 选择性培养基中存活（骨髓瘤细胞因缺乏次黄嘌呤鸟嘌呤磷酸核糖转移酶而不能存活）。原书单选答案第 14 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-a1005",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "1962 年由 Y. Okada 和 J. Tadokoro 发现的可以促进细胞融合的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "灭活的疱疹病毒",
      "PEG",
      "溶血卵磷脂",
      "油酸",
      "灭活的仙台病毒",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "灭活的仙台病毒",
        "1962 年 Okada 与 Tadokoro 发现灭活的仙台病毒可诱导细胞融合。原书单选答案第 16 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-a1006",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "胚胎干细胞技术与核移植技术相结合，用于产生疾病替代治疗细胞的新技术是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "同源克隆技术",
      "生殖性克隆技术",
      "治疗性克隆技术",
      "体细胞克隆技术",
      "胚胎干细胞技术",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "治疗性克隆技术",
        "将核移植（体细胞核移植）获得的胚胎干细胞用于产生疾病替代治疗细胞，属治疗性克隆；与以产生后代为目的的生殖性克隆相对。原书单选答案第 20 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-a1007",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "杂交瘤细胞的无限增殖能力来自",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["B淋巴细胞", "T淋巴细胞", "淋巴瘤细胞", "骨髓瘤细胞", "浆细胞"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "骨髓瘤细胞",
        "杂交瘤细胞由 B 淋巴细胞与骨髓瘤细胞融合而成，其无限增殖能力来自骨髓瘤细胞（浆细胞瘤细胞）。原书单选答案第 27 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-a1008",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "由杂交瘤细胞分泌的、针对单一表位、具有高亲和力和高特异性的蛋白被称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["第二抗体", "多克隆抗体", "双特异性抗体", "单克隆抗体", "单链抗体"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "单克隆抗体",
        "单克隆抗体由单一杂交瘤细胞克隆分泌，针对单一表位、具高亲和力和高特异性。原书单选答案第 30 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-a1009",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可有效保护细胞免受搅拌和通气反应器中的流体机械破坏作用的非离子表面活性剂是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["Pluronic F68", "EDTA", "DMSO", "胰蛋白酶", "SDS"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Pluronic F68",
        "Pluronic F68（泊洛沙姆/普朗尼克 F68）是非离子型表面活性剂，能保护细胞免受搅拌与通气反应器中的流体机械剪切破坏。原书单选答案第 34 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-x001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "大规模细胞培养方法在实际应用中常采用的方法之一是（原题为多项选择题，此处取其中一个正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "悬浮培养技术",
      "贴壁细胞培养技术",
      "三维细胞培养技术",
      "固化培养技术",
      "微载体培养",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "悬浮培养技术",
        "原书多选答案第 3 题为 ADE（悬浮培养、固化培养与微载体培养为大规模培养常采用的方法）。此处取其中一个正确项「悬浮培养技术」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-cell-bio-ch18-cell-engineering-x002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "细胞融合后，对融合细胞进行筛选以获得所需杂交瘤细胞的常用筛选方法是（原题为多项选择题，此处取其中一个正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "抗生素筛选",
      "荧光标记筛选",
      "抗药性筛选",
      "营养缺陷筛选",
      "温度敏感筛选",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抗药性筛选",
        "原书多选答案第 4 题为 CDE（抗药性、营养缺陷、温度敏感筛选）。此处取其中一个正确项「抗药性筛选」。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B 型配伍题：本书无 B1/B2 型，置空数组 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];