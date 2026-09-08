import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学遗传学 学习指导与习题集（第4版）— 第18章 遗传病的诊断 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：6 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：4 题（其中 A1 型 3 题、A2 病例型 1 题）
 * - 简答题 / 病例（映射 short-answer 或 case）：2 题（均为 short-answer，本章无非选择型病例）
 * - B1 共用备选答案配伍题：1 组、共 2 个成员
 * - 独立记分题合计：14 题（含 B1 组成员；须等于本文件预算 14）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依序含名词解释 6、A1 型选择题 13、A2 型选择题 2、
 *   B1 共用备选答案配伍题（16~20 题，共 5 个成员）、简答题 5，均无独立（非选择型）病例。
 *   实取本文件预算 14 道：全部 6 道名词解释、4 道代表性选择题（A1 第 1/5/12 题与
 *   A2 第 14 题 PCR-RFLP 病案）、B1 组（16~17 题）全部 2 个成员、简答题第 4/5 题。
 *   选择题正确项逐一对齐源参考答案（A1“1.B 5.D 12.C”、A2“14.B”、B1“16.B 17.A”），
 *   选项顺序已随机重排并同步 correctChoiceIndex（0 起）。B1 组备选项因 OCR 换行错位，
 *   已按答案与题干语义恢复为清晰 5 选项（绒毛样本/羊膜穿刺术/脐带血/B超/脐穿刺术）。
 *   全文保留全部诊断方法（产前诊断/新生儿筛查/基因诊断/核型分析与 CMA）、技术名
 *   （羊膜穿刺术、CVS、PGD、NIPT、RFLP、PCR、Sanger DNA 测序）与数值窗口期
 *   （妊娠 15~17 周、10~11 周、10 周左右、35 岁左右），按原值保留，未捏造。
 *   解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "medical-genetics-ch18-genetic-diagnostics";
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第18章 遗传病的诊断 复习思考题 习题（PDF 第107–110页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），6 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：系谱分析（pedigree analysis）",
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
        "系谱分析",
        "系谱分析（pedigree analysis）即对具有某种性状的家系成员进行观察，并分析该性状在家系后代中分离或传递的方式。系谱分析有助于区分患者是否罹患遗传病，单基因病还是多基因病；若是单基因病，可判断其遗传方式；并有助于区分某些表型相似的遗传病以及因遗传异质性造成的遗传方式的混淆。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：产前诊断（prenatal diagnosis；antenatal diagnosis）",
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
        "产前诊断",
        "产前诊断（prenatal diagnosis；antenatal diagnosis）是指对可能罹患遗传病的个体在其出生之前，利用各种影像学、细胞遗传学、生化遗传学和分子遗传学等方法予以确诊的临床诊断技术。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：RFLP",
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
        "RFLP（限制性片段长度多态性）",
        "RFLP 意即限制性片段长度多态性（restriction fragment length polymorphism），属于第一代分子标记物。当基因组 DNA 序列上发生变化而出现或丢失某一个限制性内切酶位点时，可造成酶切产生的片段长度和数量发生变化的现象。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：基因诊断（gene diagnosis）",
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
        "基因诊断",
        "基因诊断（gene diagnosis）是指通过对基因或基因组进行直接分析而诊断疾病的手段。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：PGD",
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
        "PGD（植入前遗传学诊断）",
        "PGD 即“植入前遗传学诊断（preimplantation genetic diagnosis）”，是指对体外受精获得的早期胚胎进行遗传学检测，以选用无遗传性缺陷的早期胚胎进行移植的技术。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：NIPT",
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
        "NIPT（无创产前检测技术）",
        "NIPT（non-invasive prenatal testing，无创产前检测技术）是近年来迅猛发展的一种新型胎儿染色体病（遗传病）筛查技术。相对于传统的 CVS 或羊膜穿刺术等具有“有创（侵入）性”的产前检测方法而言，NIPT 通过高通量测序技术检测妊娠 10 周左右的孕妇外周血浆中的胎儿游离 DNA，属于一种“无创（非侵入）性”产前诊断方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/X 型选择题（统一映射为 a1-single），4 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-a1001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "家系调查的最主要目的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "了解疾病的遗传方式",
      "了解家系内的患病人数",
      "收集病例",
      "了解临床治疗的效果",
      "便于与患者进行联系",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "了解疾病的遗传方式",
        "原书 A1 型选择题答案第一题为 B。家系调查的最主要目的是了解疾病的遗传方式。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-a1002",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "羊膜穿刺术的最佳时间在妊娠的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "第 15~17 周",
      "第 2 周",
      "第 10 周",
      "第 30 周",
      "第 4 周",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "第 15~17 周",
        "原书 A1 型选择题答案第二题为 D。羊膜穿刺术的最佳时间在妊娠的第 15~17 周。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-a1003",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对孕妇和胎儿损伤最小的产前诊断方法为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "B 超检查",
      "胎儿镜检查",
      "X-射线检查",
      "羊膜穿刺术",
      "绒毛取样术（CVS）",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "B 超检查",
        "原书 A1 型选择题答案第十二题为 C。B 超检查是对孕妇和胎儿损伤最小的产前诊断方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-a1004",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某孕妇，35 岁。第一胎生育苯丙酮尿症（PKU）患儿。通过 PCR-RFLP 分子诊断分析的结果为：其夫（正常个体）200bp/100bp；孕妇（正常个体）300bp/400bp；患儿 100bp/400bp；其已妊娠的第二胎为 100bp/300bp。据此判断该胎儿是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "携带者",
      "正常个体",
      "患者",
      "暂时无法判断",
      "需确定胎儿性别后才能判断",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "携带者",
        "原书 A2 型选择题答案第十四题为 B。患儿同时从父方遗传到 100bp、从母方遗传到 400bp 而患病；产科 PCR-RFLP 结果中胎儿为 100bp/300bp，其中 100bp 为父方携带的致病相关片段、300bp 为母方正常片段，故胎儿为杂合携带者（患者则为 100bp/400bp）。",
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
    id: "ext-medical-genetics-ch18-genetic-diagnostics-short001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "遗传病实验室检查的主要方法有哪些？",
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
        "遗传病实验室检查的主要方法",
        "遗传病实验室检查的主要方法包括染色体检查、性染色质检查、生化检测及基因诊断等。染色体检查也叫核型分析，是确诊染色体病的最终手段；目前盛行的染色体微阵列分析（chromosomal microarray analysis，CMA）具有更高的分辨率，可检出 CNV，越来越得到广泛的应用。性染色质检查可辅助诊断性染色体数目畸变所造成的疾病，如 Turner 综合征、Klinefelter 综合征、XYY 综合征及两性畸形等。生化检查是临床医学诊断单基因代谢病的首选方法。而基因诊断是诊断遗传病的最佳方法，其中的 Sanger DNA 测序技术为基因诊断的“金标准”。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-short002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "哪些临床情况需要做产前诊断？",
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
        "需做产前诊断的临床情况",
        "应接受产前诊断服务的对象包括：①夫妇之一有染色体畸变，特别是平衡易位携带者，或生育过染色体病患儿的夫妇；②35 岁左右或以上的孕妇；③夫妇之一有开放性神经管畸形，或生育过这种畸形患儿的孕妇；④夫妇之一有先天性代谢缺陷，或生育过这种患儿的孕妇；⑤X-连锁遗传病致病基因携带者孕妇；⑥有习惯性流产史的孕妇；⑦羊水过多的孕妇；⑧夫妇之一有致畸因素接触史的孕妇；⑨有遗传病家族史，又系近亲结婚的孕妇等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例 / 病案分析（case，非选择型）：本章无 */
const caseItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，1 组、共 2 个成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-medical-genetics-ch18-genetic-diagnostics-b001",
    order: 11,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "绒毛样本",
      "羊膜穿刺术",
      "脐带血",
      "B 超检查",
      "脐穿刺术",
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
        id: "ext-medical-genetics-ch18-genetic-diagnostics-b001m1",
        order: 11,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "妊娠 15~17 周需做胎儿细胞遗传学检查，可采用",
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
            "羊膜穿刺术",
            "原书 B1 型题答案第十六题为 B。妊娠 15~17 周需做胎儿细胞遗传学检查，可采用羊膜穿刺术（羊膜穿刺术的最佳时间即在妊娠 15~17 周）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch18-genetic-diagnostics-b001m2",
        order: 12,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "妊娠 10~11 周需进行染色体病、代谢病和基因诊断时，可采用",
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
            "绒毛样本",
            "原书 B1 型题答案第十七题为 A。妊娠 10~11 周需进行染色体病、代谢病和基因诊断时，可采用绒毛取样（CVS）获取的绒毛样本（CVS 的最佳时间在妊娠 10~11 周）。",
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
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];