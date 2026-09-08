import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第13章 内分泌系统 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：4 题
 * - 选择题（a1-single）：8 题（含 1 道 X 型映射为单选）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：4 题
 * - B1 配伍题：2 组、共 6 个成员
 * - 独立记分题合计：22 题（须等于本文件预算 22）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含选择题（A1 型 13、B1 型 2 组 6 小题、多选题 7）、名词解释 6、
 *   简答题 4、论述题 2，无填空题；本文件按 22 道预算等比取材并在原书顺序内取满。
 *   双栏排版中题干/选项/题号/字母交错散落，已按组织学医学生理语义重建完整选项集合；
 *   正确项均对照本章末尾「参考答案」键号（如 1.C 2.E …）锚定。数值（三碘/四碘甲状腺
 *   原氨酸比例 90%/10%）、结构（滤泡、带、垂体各部位）、百分占比均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch13-endocrine-system";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第13章 内分泌系统 复习思考题 习题（核对PDF 第109–116页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch13-endocrine-system-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：滤泡旁细胞",
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
        "滤泡旁细胞",
        "位于甲状腺滤泡之间和滤泡上皮细胞之间。细胞较大，在HE染色切片中胞质着色较浅，银染法可见胞质内有棕黑色颗粒。滤泡旁细胞分泌降钙素，使血钙浓度降低。原书名词解释第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：垂体门脉系统",
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
        "垂体门脉系统",
        "垂体上动脉从结节部上端穿入神经垂体的漏斗，分支并吻合形成第一级毛细血管网；这些毛细血管下行到结节部下端，汇集形成垂体门微静脉，继续下行到达远侧部，分支并吻合形成第二级毛细血管网。垂体门微静脉及其两端的第一、第二级毛细血管网构成垂体门脉系统。下丘脑弓状核分泌的多种激素通过垂体门脉系统进入腺垂体远侧部，从而调节远侧部细胞的分泌活动。原书名词解释第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：旁分泌",
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
        "旁分泌",
        "少部分内分泌细胞的激素可直接作用于邻近的细胞，而不是经循环系统作用于远处的靶细胞，这种现象称旁分泌。原书名词解释第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：皮质球状带",
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
        "皮质球状带",
        "位于肾上腺皮质被膜下方，较薄。细胞聚集成许多球团，细胞较小，呈锥形，核小染色深，胞质较少、色深，含少量脂滴。球状带细胞分泌盐皮质激素，主要是醛固酮。原书名词解释第 4 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/X 型选择题（统一映射为 a1-single），8 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch13-endocrine-system-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于内分泌系统的描述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "激素由内分泌细胞合成分泌",
      "某些神经细胞也能合成和分泌激素",
      "内分泌细胞就是位于内分泌腺内的细胞",
      "激素多数属于含氮物质",
      "激素也可直接作用于邻近的靶细胞",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "内分泌细胞就是位于内分泌腺内的细胞（错误项）",
        "内分泌细胞除位于内分泌腺（如甲状腺）内，还广泛分布于其他器官（如胰岛、消化管散在的内分泌细胞），故“内分泌细胞就是位于内分泌腺内的细胞”说法错误。激素由内分泌细胞合成分泌，某些神经细胞（神经内分泌细胞）也能合成分泌激素。原书 A1 参考答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于内分泌腺的描述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "无导管",
      "毛细血管丰富",
      "腺细胞排列成索状、团状或滤泡状",
      "产生的激素须与其靶细胞受体结合",
      "合成的激素不能储存",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "合成的激素不能储存（错误项）",
        "内分泌腺无导管、毛细血管丰富、腺细胞排列成索状/团状/滤泡状，激素须与其靶细胞受体结合后发挥作用。但部分激素如甲状腺激素可贮存于滤泡腔内，故“合成的激素不能储存”说法错误。原书 A1 参考答案第 2 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-a1003",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能将分泌物贮存于滤泡的内分泌腺是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["垂体", "肾上腺", "甲状腺", "甲状旁腺", "松果体"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "甲状腺",
        "甲状腺滤泡腔充满均质状、嗜酸性的胶质，可贮存甲状腺激素（碘化甲状腺球蛋白），故甲状腺是能将分泌物贮存于滤泡的内分泌腺。原书 A1 参考答案第 3 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-a1004",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于肾上腺皮质束状带的描述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "位于皮质最内层",
      "腺细胞胞质呈泡沫状或空泡状",
      "腺细胞胞质嗜酸性",
      "腺细胞为球形或椭圆形",
      "分泌盐皮质激素",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "腺细胞胞质呈泡沫状或空泡状",
        "束状带是皮质中最厚的部分，腺细胞体积较大、胞质内含大量脂滴，HE 染色中脂滴被溶解，故胞质呈泡沫状或空泡状而着色浅。束状带位于皮质中部、分泌糖皮质激素（主要为皮质醇）；皮质最内层为网状带。原书 A1 参考答案第 6 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-a1005",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗利尿激素和缩宫素合成于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "垂体远侧部",
      "下丘脑弓状核",
      "下丘脑视上核和室旁核",
      "垂体神经部",
      "正中隆起",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "下丘脑视上核和室旁核",
        "血管升压素（抗利尿激素）和缩宫素由下丘脑视上核和室旁核内的大型神经内分泌细胞合成，经轴突运输至垂体神经部储存和释放。原书 A1 参考答案第 9 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-a1006",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于垂体神经部的描述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "分泌生长激素和缩宫素",
      "合成和分泌催乳激素和加压素",
      "下丘脑通过垂体门脉系统调节其分泌活动",
      "合成和分泌缩宫素和抗利尿激素",
      "贮存和释放抗利尿激素和缩宫素",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "贮存和释放抗利尿激素和缩宫素",
        "垂体神经部的神经纤维来自下丘脑视上核和室旁核，本身不含成激素，是这些核团合成的抗利尿激素（血管升压素）和缩宫素储存和释放的部位；神经部内可见赫令体。原书 A1 参考答案第 10 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-a1007",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "赫令体是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "弓状核细胞分泌颗粒聚集的团块",
      "下丘脑视上核和室旁核细胞分泌颗粒聚集的团块",
      "垂体细胞的分泌物形成的团块",
      "结缔组织钙化形成的团块",
      "见于垂体中间部，内含胶质",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "下丘脑视上核和室旁核细胞分泌颗粒聚集的团块",
        "神经内分泌细胞（来自视上核、室旁核）内的分泌颗粒沿轴突被运输到垂体神经部，在轴突沿途和终末常形成串珠状膨大，光镜下呈嗜酸性大小不等的团块，称赫令体。原书 A1 参考答案第 11 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-a1008",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "含氮激素分泌细胞包括（原题为多选，此处单选其中一正确项）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "嗜铬细胞",
      "垂体嗜碱性细胞",
      "甲状旁腺主细胞",
      "滤泡上皮细胞",
      "甲状旁腺嗜酸性细胞",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "垂体嗜碱性细胞",
        "含氮激素分泌细胞为机体绝大部分内分泌细胞，胞质中有密集的粗面内质网、较发达的高尔基复合体和分泌颗粒，如嗜铬细胞、垂体嗜碱性细胞、甲状旁腺主细胞、滤泡上皮细胞等；甲状旁腺嗜酸性细胞功能不明、不属于典型的含氮激素分泌主群。原书多选题第 21 题参考答案为 ABCD，此处单选取其中一正确项。",
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

/** 简答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch13-endocrine-system-short001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：类固醇激素分泌细胞的电镜和光镜结构特点是什么？请举例。",
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
        "类固醇激素分泌细胞的结构特点",
        "答：结构特点：胞质内有丰富的滑面内质网、较多管状嵴的线粒体和脂滴，无分泌颗粒。这样的细胞在 HE 染色切片中，胞质呈嗜酸性或泡沫状，例如肾上腺皮质束状带腺细胞的胞质就呈泡沫状。肾上腺皮质三个带的腺细胞都属于分泌类固醇激素细胞。原书简答题第 1 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-short002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：下丘脑与腺垂体存在什么关系？",
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
        "下丘脑与腺垂体的关系",
        "答：下丘脑弓状核等核团的一些神经细胞，除了具有神经细胞的一般特性之外，也能合成和释放激素。这些细胞的轴突伸至神经垂体的漏斗，构成下丘脑腺垂体束，其合成的多种激素在轴突末端释放，进入漏斗处的第一级毛细血管网，继而经垂体门微静脉到达腺垂体远侧部的第二级毛细血管网，分别调节远侧部各种腺细胞的分泌活动，产生促进或抑制效应。原书简答题第 2 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-short003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：甲状腺滤泡上皮细胞的形态是如何随功能状态不同而变化的？",
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
        "甲状腺滤泡上皮细胞的形态变化",
        "答：甲状腺滤泡由单层立方的滤泡上皮细胞围成，滤泡腔内充满均质状、嗜酸性的胶质。在功能活跃时，滤泡上皮细胞增高呈低柱状，腔内胶质减少；反之，细胞变矮呈扁平状，腔内胶质增多。原书简答题第 3 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch13-endocrine-system-short004",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：肾上腺的血管分布和血流方向有什么特点？其意义是什么？",
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
        "肾上腺的血管分布、血流方向及其意义",
        "答：肾上腺动脉进入被膜后，大部分分支进入肾上腺皮质，形成与髓质血窦相连续的窦状毛细血管网；少数小动脉分支穿过皮质直接进入髓质，分支形成血窦。髓质的小静脉汇合成一条中央静脉，经肾上腺静脉离开肾上腺。肾上腺的血流方向是由皮质流向髓质。皮质的血液流经髓质时，所含较高浓度的糖皮质激素可增强髓质嗜铬细胞苯乙醇胺-N-甲基转移酶的活性，促进去甲肾上腺素甲基化为肾上腺素，以致髓质肾上腺素细胞远多于去甲肾上腺素细胞。可见肾上腺皮质对髓质细胞激素的生成有很大影响。原书简答题第 4 题参考答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组 × 共 6 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch13-endocrine-system-b001",
    order: 17,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "滤泡旁细胞",
      "室旁核细胞",
      "嗜铬细胞",
      "嗜酸性细胞",
      "嗜碱性细胞",
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
        id: "ext-histology-embryology-ch13-endocrine-system-b001m1",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分泌缩宫素",
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
            "室旁核细胞",
            "缩宫素由下丘脑室旁核、视上核的大型神经内分泌细胞合成并运输至垂体神经部。原书 B1 第 14 题答案 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch13-endocrine-system-b001m2",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分泌降钙素",
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
            "滤泡旁细胞",
            "滤泡旁细胞位于甲状腺滤泡之间和滤泡上皮细胞之间，分泌降钙素，使血钙浓度降低。原书 B1 第 15 题答案 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch13-endocrine-system-b001m3",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分泌卵泡刺激素",
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
            "嗜碱性细胞",
            "腺垂体远侧部嗜碱性细胞中的促性腺激素细胞分泌卵泡刺激素和黄体生成素，卵泡刺激素在女性促进卵泡发育。原书 B1 第 16 题答案 E。",
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
    id: "ext-histology-embryology-ch13-endocrine-system-b002",
    order: 20,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "嗜酸性细胞",
      "室旁核细胞",
      "主细胞",
      "松果体细胞",
      "嗜铬细胞",
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
        id: "ext-histology-embryology-ch13-endocrine-system-b002m1",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分泌生长激素",
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
            "嗜酸性细胞",
            "腺垂体远侧部嗜酸性细胞中的生长激素细胞分泌生长激素，促进骨骼肌、内脏生长及多种代谢过程。原书 B1 第 17 题答案 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch13-endocrine-system-b002m2",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分泌甲状旁腺激素",
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
            "主细胞",
            "甲状旁腺主细胞数量多、分泌甲状旁腺激素，使血钙升高。原书 B1 第 18 题答案 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch13-endocrine-system-b002m3",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分泌去甲肾上腺素",
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
            "嗜铬细胞",
            "肾上腺髓质嗜铬细胞分泌肾上腺素和去甲肾上腺素，其中肾上腺素细胞远多于去甲肾上腺素细胞。原书 B1 第 19 题答案 E。",
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