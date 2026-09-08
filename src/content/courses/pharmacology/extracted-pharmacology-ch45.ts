import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第45章 抗病毒药和抗真菌药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：0 题（本章原书无名词解释题，termItems 为空数组）
 * - 填空题（fill）：0 题（本章原书无填空题，fillItems 为空数组）
 * - 选择题（a1-single）：5 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：11 题（须等于本文件预算 11）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含选择题（A1 型 10 + A2 型 3 + B1 型 2 组共 8 小题）与
 *   简答题 4（本章无名词解释、无填空题）；本文件按 11 道预算取材：A1 型题取第
 *   1–5 题、简答题取第 1–2 题、B1 型取第 1 组（14～17 题）完整 4 成员；A1 型题
 *   第 6–10 题、A2 型题（11–13）、B1 第 2 组（18–21）及简答题第 3–4 题因预算
 *   未纳入。正确项对齐章末参考答案键号（A1 型题 1.D、2.D、3.E、4.A、5.A；
 *   B1 型题 14.B、15.D、16.C、17.A；本文件答案键号自 1–21 连续编号），选项与
 *   共用备选答案已随机重排并同步 correctChoiceIndex。OCR 错字已按药理学医学语义
 *   恢复（如 葯/约→药、博赛匹丰→博赛匹韦、阿普洛丰→阿昔洛韦、与拉维若→马拉维若、
 *   克毒唑/克唑→克霉唑、眯康唑→咪康唑、篆菌→真菌、沩→为、HBSAg→HBsAg、
 *   抗振颤→抗震颤、INF/干扰素→IFN/干扰素 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch45-antiviral-antifungal";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第45章 抗病毒药和抗真菌药 习题（核对PDF 第290–296页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term）：本章原书无名词解释题，导出空数组 */
const termItems: readonly AssessmentItemDefinition[] = [];

/** 填空题（fill）：本章原书无填空题，导出空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 选择题（a1-single），5 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch45-antiviral-antifungal-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "单纯疱疹病毒感染的首选药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["齐多夫定", "阿昔洛韦", "阿糖腺苷", "拉米夫定", "糖皮质激素"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "阿昔洛韦",
        "阿昔洛韦是目前最有效的抗Ⅰ型和Ⅱ型单纯疱疹病毒药物之一，为单纯疱疹病毒感染的首选药，也可用于乙型肝炎的治疗。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch45-antiviral-antifungal-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可局部用于口腔、皮肤、阴道念珠菌病的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["多黏菌素", "灰黄霉素", "四环素", "克霉唑", "两性霉素 B"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "克霉唑",
        "克霉唑具广谱抗真菌活性，因全身用药不良反应多见，现已很少全身应用，仅作局部用药，可局部用于口腔、皮肤、阴道念珠菌感染。原书 A1 型题第 2 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch45-antiviral-antifungal-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "唑类抗真菌药物的作用机制是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "抑制二氢叶酸合成酶",
      "抑制核酸合成",
      "抑制蛋白质合成",
      "抑制细胞膜类固醇合成，使其通透性增加",
      "抑制二氢叶酸还原酶",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "抑制细胞膜类固醇合成，使其通透性增加",
        "唑类抗真菌药（咪唑类和三唑类）通过抑制真菌细胞膜麦角固醇（类固醇）的合成，改变细胞膜通透性而发挥抗真菌作用。原书 A1 型题第 3 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch45-antiviral-antifungal-a1004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "皮肤癣菌临床感染常选用",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["青霉素", "林可霉素", "灰黄霉素", "制霉菌素", "两性霉素 B"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "灰黄霉素",
        "灰黄霉素对各种浅表皮肤癣菌有较强的抑制作用，主要用于皮肤真菌感染。原书 A1 型题第 4 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch45-antiviral-antifungal-a1005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抗菌谱广，不良反应小的抗真菌药是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["氟康唑", "咪康唑", "伊曲康唑", "酮康唑", "氟胞嘧啶"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "伊曲康唑",
        "伊曲康唑抗真菌谱与酮康唑相似，对深部真菌与浅表真菌都有抗菌作用，副作用较少见，常见胃肠道不适如厌食、恶心、腹痛和便秘。原书 A1 型题第 5 题，参考答案键号 A。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），2 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch45-antiviral-antifungal-short001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述唑类抗真菌药的分类及代表药的应用。",
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
        "唑类抗真菌药可分为咪唑类和三唑类。（1）咪唑类包括酮康唑、咪康唑、益康唑、克霉唑、联苯苄唑等，酮康唑等可作为治疗浅表真菌感染的首选药；酮康唑是第一个广谱口服抗真菌药，口服可有效治疗深部、皮下及浅表真菌感染，亦可局部用药治疗表浅部真菌感染；咪康唑为广谱抗真菌药，主要局部应用治疗阴道、皮肤或指甲的真菌感染；益康唑临床应用与咪康唑相仿；克霉唑为广谱抗真菌药，局部用药治疗各种浅部真菌感染；联苯苄唑临床用于治疗皮肤癣菌感染。（2）三唑类包括伊曲康唑、氟康唑和伏立康唑等，可作治疗深部真菌感染的首选药；伊曲康唑可有效治疗深部、皮下及浅表真菌感染，已成为治疗罕见真菌如组织胞浆菌感染和芽生菌感染的首选药；氟康唑具有广谱抗真菌作用（隐球菌属、念珠菌属和球孢子菌属等），是治疗艾滋病患者隐球菌性脑膜炎的首选药；伏立康唑为广谱抗真菌药，对多种条件性真菌和地方流行性真菌均具有抗菌活性。",
        "唑类按结构分为咪唑类（酮康唑、咪康唑、益康唑、克霉唑、联苯苄唑等）与三唑类（伊曲康唑、氟康唑、伏立康唑等），浅部感染常选咪唑类，深部感染常选三唑类。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch45-antiviral-antifungal-short002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述氟康唑的临床应用。",
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
        "氟康唑具有广谱抗真菌作用（隐球菌属、念珠菌属和球孢子菌属等），是治疗艾滋病患者隐球菌性脑膜炎的首选药，与氟胞嘧啶合用可增强疗效。口服和静脉给药均有效，多次给药可进一步提高血药浓度，可分布到各组织和体液，对正常和炎症脑膜均具有强大穿透力。",
        "氟康唑为三唑类抗真菌药，对新型隐球菌、白色念珠菌等敏感菌所致各种真菌感染有效，如隐球菌性脑膜炎、复发性口咽念珠菌病等。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 4 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch45-antiviral-antifungal-b001",
    order: 8,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["制霉菌素", "碘苷", "灰黄霉素", "金刚烷胺", "甲硝唑"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-pharmacology-ch45-antiviral-antifungal-b001m1",
        order: 8,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "对急性上皮型疱疹性角膜炎最好的药物是",
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
            "碘苷",
            "碘苷全身应用毒性大，临床仅限于局部用药，治疗眼部或皮肤疱疹病毒和牛痘病毒感染，对急性上皮性疱疹性角膜炎疗效最好。原书 B1 型题第 14 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch45-antiviral-antifungal-b001m2",
        order: 9,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "口服易吸收，在体内不被代谢的抗病毒药是",
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
            "金刚烷胺",
            "金刚烷胺可阻止病毒进入宿主细胞并抑制其复制，口服易吸收，在体内不被代谢，主要用于预防 A 型流感病毒感染。原书 B1 型题第 15 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch45-antiviral-antifungal-b001m3",
        order: 10,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "主要用于皮肤癣菌感染的药物是",
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
            "灰黄霉素",
            "灰黄霉素对各种浅表皮肤癣菌有较强的抑制作用，主要用于皮肤真菌（癣菌）感染。原书 B1 型题第 16 题，参考答案键号 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch45-antiviral-antifungal-b001m4",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "口服用于防治消化道念珠菌病的药物是",
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
            "制霉菌素",
            "制霉菌素抗菌作用与两性霉素 B 基本相同，但毒性更大，主要用于治疗皮肤、口腔及阴道念珠菌感染和阴道滴虫病，口服也用于胃肠道真菌感染。原书 B1 型题第 17 题，参考答案键号 A。",
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
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
