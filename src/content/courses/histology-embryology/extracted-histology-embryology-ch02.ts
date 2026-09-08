import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 组织学与胚胎学学习指导与习题集（第4版）— 第2章 上皮组织 题库提取（等比取样）
 * 来源：《组织学与胚胎学学习指导与习题集》第4版（人民卫生出版社）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：5 题
 * - 选择题（a1-single）：10 题（含 X 型映射）
 * - 填空题（fill）：0 题
 * - 简答/问/论述题（short-answer）：2 题
 * - B1 配伍题：2 组、共 6 个成员
 * - 独立记分题合计：23 题（等于本文件预算 23）
 * - 缺失答案：0；无法可靠提取：1（原书 A1 第 14 题「被覆于肺泡和肾小囊壁层的
 *   上皮」选项双栏交错严重、正确项无法从题干语义明确锚定，予以跳过并换用同源
 *   更清晰的 X 型映射题补足预算）
 * - 说明：本章原书依序含 A1 型选择题（第 1~14 题）、B1 型配伍题（15~17、18~20）、
 *   多选题（21~28）、名词解释 5 个、简答题 4 个、论述题 2 个，无线其余类型。按 23
 *   道预算等比取材：名词解释 5 个全取，A1 取 9 个清晰题 + 1 个 X 型映射（第 21 题
 *   单层扁平上皮），简答/论述取 2 个（上皮组织结构特点、细胞连接结构特点），B1 两
 *   组共 6 个成员全取。双栏错序已按组织学语义恢复（如「被拟/被瀝/脱(膜)/菹(盖)/鏗
 *   (盖)」→被覆/细胞膜/覆盖等），数值、抗拉力等描述保留原义，未捏造。原书 A1 第 4、
 *   5、10、12 题因「描述的是」类题干缺「错误/正确」字样、易引发歧义，未纳入。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "histology-embryology-ch02-epithelium";
const locatorBase =
  "《组织学与胚胎学学习指导与习题集》第4版 第2章 上皮组织 复习思考题 习题（核对PDF 第13–21页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为多选，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch02-epithelium-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：纹状缘",
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
        "纹状缘",
        "指光镜下小肠上皮细胞游离面的线状结构，是由密集的微绒毛整齐排列而成。微绒毛可使细胞表面积显著增大，有利于细胞的吸收功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：内皮",
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
        "内皮",
        "衬贴在心、血管和淋巴管腔面的单层扁平上皮称内皮。其表面光滑，有利于血液和淋巴的流动，也有利于内皮细胞进行物质交换。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：盖细胞",
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
        "盖细胞",
        "变移上皮的表层细胞可覆盖几个中间层细胞，故称为盖细胞。其形态可随器官的空虚与扩张状态而变化：如膀胱空虚时盖细胞呈大的立方形，膀胱充盈扩张时盖细胞呈扁平状。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：浆半月",
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
        "浆半月",
        "在混合性腺泡的黏液性腺泡底部，有少量浆液细胞呈半月形排列的结构，称浆半月。浆液细胞的外方还可有扁平、多突起的肌上皮细胞，其收缩有助于排出分泌物。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：半桥粒",
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
        "半桥粒",
        "位于上皮细胞基底面，为桥粒结构的一半，质膜内也有桥粒斑，角蛋白丝附着其上、折成袢状返回胞质，主要作用是将上皮细胞固着在基膜上。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1 型及 X 型映射选择题（统一映射为 a1-single），10 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch02-epithelium-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "被覆上皮的分类依据是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细胞的层数",
      "细胞的形态",
      "细胞的层数和表层细胞的形态",
      "分布和功能",
      "细胞的数目",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细胞的层数和表层细胞的形态",
        "被覆上皮根据细胞层数（单层/复层）和表层细胞的形态（扁平、立方、柱状等）进行分类。原书 A1 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "假复层纤毛柱状上皮主要分布于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "生殖管道",
      "消化道",
      "呼吸道",
      "循环管道",
      "泌尿道",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呼吸道",
        "假复层纤毛柱状上皮主要由柱状、梭形、锥形和杯状细胞组成，表面有纤毛，主要分布于呼吸道（呼吸管道等）腔面。原书 A1 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "角化与未角化复层扁平上皮最大的区别在于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "细胞层数",
      "细胞大小",
      "细胞形态",
      "浅表层细胞是否含细胞核",
      "细胞数目",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "浅表层细胞是否含细胞核",
        "角化的复层扁平上皮（如皮肤表皮）浅层细胞核消失、胞质充满角蛋白；未角化的复层扁平上皮（如口腔、食管）浅层细胞有核、含角蛋白少。二者最大区别是浅表层细胞是否含细胞核。原书 A1 答案第 3 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于变移上皮的描述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "游离面布满大量纤毛",
      "分布于心血管腔面",
      "游离面有大量微绒毛",
      "细胞层数和浅层细胞形状可发生变化",
      "基底面凹凸不平",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "细胞层数和浅层细胞形状可发生变化",
        "变移上皮细胞形状和层数可随器官的空虚与扩张状态而变化（如膀胱空虚时上皮变厚、盖细胞呈大的立方形，充盈时上皮变薄、盖细胞呈扁平状）。其余选项分布或外形描述均不正确。原书 A1 答案第 6 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "微绒毛内纵行排列的结构是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "中间丝",
      "线粒体",
      "微管",
      "微丝",
      "微体",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "微丝",
        "微绒毛胞质中有许多纵行的微丝，上端附着于微绒毛顶部，下端插入细胞顶部胞质中、附着于终末网。微丝为肌动蛋白丝，其收缩可使微绒毛伸长或变短。原书 A1 答案第 7 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "纤毛内纵行排列的结构是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "微丝",
      "线粒体",
      "微管",
      "中间丝",
      "微体",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "微管",
        "纤毛中央有 2 条单独纵向排列的微管，周围为 9 组二联微管；微管与根部基体的微管相连续。原书 A1 答案第 8 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "桥粒连接区的细胞间隙中存在",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "低密度丝状物和无致密的中间线",
      "高密度的丝状物和低密度的中间线",
      "低密度丝状物和致密的中间线",
      "高密度的丝状物和无致密的中间线",
      "高密度的丝状物和致密的中间线",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "低密度丝状物和致密的中间线",
        "桥粒连接处相邻细胞间隙较宽，其中有低电子密度丝状物与一条致密中间线（由丝状物交织而成）。桥粒是一种很牢固的连接，像铆钉般把细胞相连。原书 A1 答案第 9 题为 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "单层柱状上皮细胞间的连接结构由浅至深一般依次是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "桥粒、紧密连接、黏着小带",
      "黏着小带、桥粒、紧密连接",
      "紧密连接、桥粒、黏着小带",
      "紧密连接、黏着小带、桥粒",
      "桥粒、黏着小带、紧密连接",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "紧密连接、黏着小带、桥粒",
        "上皮细胞侧面顶端为紧密连接，其下方为黏着小带，深部为桥粒，故由浅至深依次为紧密连接、黏着小带、桥粒。原书 A1 答案第 11 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于腺的描述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "是指以腺细胞为主要成分的组织",
      "是指有吸收和分泌功能的器官",
      "是指以腺上皮为主要成分的器官",
      "腺的分泌物均经导管排至体表或器官腔内",
      "腺的分泌物称激素",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "是指以腺上皮为主要成分的器官",
        "以腺上皮为主要成分组成的器官称腺。内分泌腺无导管、分泌物释放入血或淋巴液，故「分泌物均经导管排出」「分泌物称激素」均不全面。原书 A1 答案第 13 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属于单层扁平上皮分布的部位是（原题为多选题「单层扁平上皮可见于」，取其一个正确部位）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: xMapNote,
      sourceIds: [],
    },
    choices: [
      "肺泡",
      "胆小管",
      "肾近端小管",
      "膀胱腔面",
      "呼吸道黏膜上皮",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺泡",
        "单层扁平上皮中除内皮、间皮外，还衬于肺泡和肾小囊壁层等腔面，故选肺泡。肾近端小管、胆小管为单层立方/立方柱状上皮，膀胱腔面为变移上皮，呼吸道黏膜上皮为假复层纤毛柱状上皮。原书多选题第 21 题答案 ABC，含淋巴管、腹膜、肺泡，本项目取肺泡为映射正确项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill）— 本章原书无此类题，空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 简答/论述题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-histology-embryology-ch02-epithelium-short001",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简答题：简述上皮组织的结构特点及其主要功能。",
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
        "上皮组织的结构特点及其主要功能",
        "结构特点：①细胞多、细胞形态规则、排列紧密，细胞外基质少；②上皮细胞有明显的极性，细胞可分为游离面和基底面，上皮基底面附着于基膜，借基膜与深部结缔组织相连；③上皮组织内大都无血管，但有丰富的游离神经末梢。功能：上皮组织具有保护、吸收、分泌和排泄等功能。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-histology-embryology-ch02-epithelium-short002",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "论述题：试从功能角度阐述各种细胞连接的结构特点。",
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
        "各种细胞连接的结构特点",
        "在四种细胞连接中，桥粒和黏着小带属于机械性连接，这两种连接处的细胞膜胞质面都有致密物，分别有中间丝和微丝附着；连接部位的细胞间隙都有丝状物质将相邻细胞质膜黏合起来，在桥粒还形成致密的中间线，使桥粒的连接作用特别牢固、如铆钉。紧密连接处细胞间隙几乎消失，虽也具一定机械作用，但主要功能是在细胞间隙中形成一道屏障、阻挡物质通过细胞间隙。缝隙连接由相邻细胞的连接小体对接、管腔通连形成，连接小体中央有约 2 nm 的管腔，使相邻细胞间的小分子物质得以交换，故又称通讯连接。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组 × 6 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-histology-embryology-ch02-epithelium-b001",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["内皮", "单层立方上皮", "单层柱状上皮", "间皮", "假复层柱状上皮"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch02-epithelium-b001m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分布于甲状腺滤泡腔面的是",
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
            "单层立方上皮",
            "甲状腺滤泡腔面衬以单层立方上皮。原书 B1 第 15 题答案 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch02-epithelium-b001m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分布于胃、肠、胆道和子宫等腔面的是",
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
            "单层柱状上皮",
            "胃、肠、胆道和子宫等腔面衬以单层柱状上皮。原书 B1 第 16 题答案 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch02-epithelium-b001m3",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "分布于胸膜、腹膜和心包膜表面的是",
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
            "间皮",
            "分布于胸膜、腹膜和心包膜表面的单层扁平上皮称间皮。原书 B1 第 17 题答案 D。",
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
    id: "ext-histology-embryology-ch02-epithelium-b002",
    order: 21,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["紧密连接", "黏着小带", "桥粒", "缝隙连接", "连接复合体"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-histology-embryology-ch02-epithelium-b002m1",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "允许小分子物质在相邻细胞间流通的是",
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
            "缝隙连接",
            "缝隙连接的连接小体对接、管腔通连，可供相邻细胞间小分子物质交换，又称通讯连接。原书 B1 第 18 题答案 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch02-epithelium-b002m2",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "像铆钉般把细胞相连的是",
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
            "桥粒",
            "桥粒是一种很牢固的连接，像铆钉般把细胞相连接，在易受机械牵拉的组织中较丰富。原书 B1 第 19 题答案 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-histology-embryology-ch02-epithelium-b002m3",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "能阻止物质穿过细胞间隙的是",
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
            "紧密连接",
            "紧密连接封闭了细胞间隙，可阻挡物质穿过细胞间隙，具有屏障作用。原书 B1 第 20 题答案 A。",
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