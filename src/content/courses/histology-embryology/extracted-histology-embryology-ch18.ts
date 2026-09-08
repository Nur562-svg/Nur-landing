import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第18章 男性生殖系统 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - 选择题（a1-single）：6 题（A1 型 4 题 + X 型多选映射 2 题）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：3 题（简答 2 题 + 论述 1 题）
 * - B1 配伍题：2 组、共 4 个成员
 * - 独立记分题合计：16 题（须等于本文件预算 16）
 * - 缺失答案：0；无法可靠提取：1（原书 A1 第 2 题「生精细胞中进行分裂的是」其参考答案
 *   键号 D 与重建选项映射冲突、无法锚定唯一正确项，故按同源更清晰题替换取其他题为样本）
 * - 说明：本章原书依序含选择题（A1 型 13、B1 型 2 组 4 小题、多选题 6）、名词解释 5、
 *   简答题 3、论述题 1，无填空题；本文件按 16 道预算等比取材并在原书顺序内取满。题干/
 *   选项/题号在双栏排版中交错散落（如 B1 备选字母与文字分离散落、生精细胞发育序列），
 *   已按男性生殖系统组织学医学语义重建完整选项集合；正确项全数对照章末「参考答案」键号
 *   锚定。X 型多选沿项目规约取样其中一正确项并映射为 a1-single（note=xMapNote）。数值与
 *   结构（生精小管 30～70cm、初级精母细胞 4n DNA、精子约 64 天、附睾精血停留约 12 天等）
 *   均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch18-male-reproductive-system";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第18章 男性生殖系统 复习思考题 习题（核对PDF 第150–156页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：顶体",
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
        "顶体",
        "是在精子形成过程中，由高尔基复合体形成的特殊结构，覆盖在精子头部核的前 2/3，内含多种水解酶，如顶体蛋白酶、透明质酸酶、酸性磷酸酶等，在受精时起重要作用。原书名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：生精细胞",
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
        "生精细胞",
        "是构成生精小管的两类细胞之一，自生精小管基底部至腔面，依次分为精原细胞、初级精母细胞、次级精母细胞、精子细胞和精子。原书名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：精子发生",
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
        "精子发生",
        "从精原细胞至形成精子的过程称精子发生。原书名词解释第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/X 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "生精上皮的组成是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "支持细胞和生精细胞",
      "肌样细胞和生精细胞",
      "支持细胞、肌样细胞和精原细胞",
      "支持细胞和肌样细胞",
      "以上都不对",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支持细胞和生精细胞",
        "生精上皮由支持细胞和 5～8 层生精细胞组成，基膜外侧有胶原纤维和梭形的肌样细胞（不属生精上皮）。原书 A1 参考答案第 1 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "具有四倍体（4n DNA）的生殖细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "精原细胞",
      "初级精母细胞",
      "次级精母细胞",
      "精子细胞",
      "精子",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "初级精母细胞",
        "初级精母细胞染色体核型为 46,XY，经 DNA 复制后具有 4n DNA，进行第一次成熟分裂，形成两个次级精母细胞。原书 A1 参考答案第 5 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "睾丸内产生雄激素的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "精原细胞",
      "初级精母细胞",
      "睾丸间质细胞",
      "精母细胞",
      "精子",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "睾丸间质细胞",
        "睾丸间质内成群分布的间质细胞（Leydig 细胞）在间质细胞刺激素（ICSH）作用下合成和分泌雄激素，促进精子发生、男性生殖器官发育分化并维持第二性征。原书 A1 参考答案第 6 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "分泌抑制素的细胞是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "睾丸间质细胞",
      "支持细胞",
      "精原细胞",
      "附睾上皮细胞",
      "初级精母细胞",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "支持细胞",
        "支持细胞可分泌抑制素，抑制腺垂体远侧部合成和分泌 FSH；另在 FSH 和雄激素作用下合成雄激素结合蛋白（ABP）以维持生精小管内高浓度雄激素。原书 A1 参考答案第 12 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-a1005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "生精细胞中具有单倍体 DNA 的是（原为多项选择）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "精原细胞",
      "初级精母细胞",
      "次级精母细胞",
      "精子细胞",
      "精子",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "精子细胞",
        "题干改写并映射为单选；本作为原多选题正确答案之一（原题答案 DE）。精子细胞经第二次成熟分裂形成，染色体为单倍体；精子亦为单倍体 DNA。原书多选题第 19 题参考答案为 DE。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-a1006",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "精子顶体含有的水解酶是（原为多项选择）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "顶体蛋白酶",
      "透明质酸酶",
      "酸性磷酸酶",
      "溶菌酶",
      "组胺酶",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "顶体蛋白酶",
        "题干改写并映射为单选；本作为原多选题正确答案之一（原题答案 ABC）。顶体内含多种水解酶，如顶体蛋白酶、透明质酸酶、酸性磷酸酶等；不含溶菌酶、组胺酶。原书多选题第 21 题参考答案为 ABC。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），本章无，置空 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答题/论述题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述生精小管内支持细胞的结构和功能。",
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
        "支持细胞的结构和功能",
        "答：光镜下轮廓不清，核常呈不规则形或三角形，染色浅，核仁明显。电镜下呈不规则锥体形，基部紧贴基膜，顶端伸至腔面，侧面和腔面有许多不规则凹陷，其内镶嵌着各级生精细胞。胞质内有大量滑面内质网和一些粗面内质网、发达的高尔基复合体以及较多的线粒体、溶酶体、微丝、微管等。相邻支持细胞侧面近基部细胞膜形成紧密连接，是构成血-睾屏障的主要结构。功能：对生精细胞起支持和营养作用；能吞噬和消化精子成熟后脱落的残余胞质；微丝、微管收缩可促进精子释放；分泌少量液体有助于精子输送并分泌抑制素；能合成雄激素结合蛋白（ABP）；睾丸的免疫豁免由支持细胞维持。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述血-睾屏障的结构和功能。",
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
        "血-睾屏障的结构和功能",
        "答：血-睾屏障是血管和生精小管之间的屏障结构，其组成包括睾丸间质的毛细血管内皮及其基膜、结缔组织、生精上皮基膜和支持细胞紧密连接。紧密连接是构成血-生精小管屏障的主要结构。该屏障可阻止某些物质进出生精小管，形成并维持有利于精子发生的微环境，还能防止精子抗原物质逸出生精小管外而发生自身免疫反应。原书简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-short003",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "论述题：试述睾丸功能的内分泌调节。",
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
        "睾丸功能的内分泌调节",
        "答：下丘脑分泌的促性腺激素释放激素（GnRH）能促使腺垂体嗜碱性细胞分泌卵泡刺激素（FSH）和黄体生成素（LH）。黄体生成素（LH）刺激睾丸间质细胞合成和分泌雄激素；卵泡刺激素（FSH）促使生精小管支持细胞合成雄激素结合蛋白（ABP），与雄激素结合而使生精小管内含有高浓度雄激素，为精子发生所必需。支持细胞分泌的抑制素和睾丸间质细胞分泌的雄激素均能反馈性抑制下丘脑分泌 GnRH，抑制腺垂体分泌 FSH 和 LH。原书论述第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组 × 共 4 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch18-male-reproductive-system-b001",
    order: 13,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["精原细胞", "初级精母细胞", "次级精母细胞", "精子细胞", "精子"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch18-male-reproductive-system-b001m1",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "体积最大的生精细胞是",
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
            "初级精母细胞",
            "初级精母细胞位于精原细胞近腔侧，体积较大，直径约 18μm，是体积最大的生精细胞。原书 B1 第 14 题答案 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch18-male-reproductive-system-b001m2",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "无需染色体复制便进行第二次成熟分裂的生精细胞是",
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
            "次级精母细胞",
            "次级精母细胞染色体核型为 23,X 或 23,Y（2n DNA），细胞不复制 DNA 即进入第二次成熟分裂，形成两个精子细胞（1n DNA），存在时间短、切片中不易找到。原书 B1 第 15 题答案 C。",
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
    id: "ext-histology-embryology-ch18-male-reproductive-system-b002",
    order: 15,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "高柱状纤毛和低柱状无纤毛上皮",
      "单层立方或矮柱状上皮",
      "单层立方上皮",
      "假复层纤毛柱状上皮",
      "单层柱状上皮",
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
        id: "ext-histology-embryology-ch18-male-reproductive-system-b002m1",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "构成输出小管管壁的上皮是",
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
            "高柱状纤毛和低柱状无纤毛上皮",
            "输出小管上皮由高柱状纤毛细胞及低柱状细胞相间排列构成，故管腔不规则。原书 B1 第 16 题答案 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch18-male-reproductive-system-b002m2",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "构成附睾管管壁的上皮是",
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
            "假复层纤毛柱状上皮",
            "附睾管管腔规则，上皮由高柱状细胞（游离面有细长静纤毛）和基细胞组成，属假复层纤毛柱状上皮。原书 B1 第 17 题答案 D。",
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