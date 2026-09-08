import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学遗传学 学习指导与习题集（第4版）— 第6章 群体遗传 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：5 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：13 题（A1 取 6 题、A2 病案型选 7 题）
 * - 简答题：2 题
 * - 病例（映射 case，Hardy-Weinberg 平衡检验计算）：1 题
 * - B1 共用备选答案配伍题：3 组、共 10 个成员
 * - 独立记分题合计：31 题（含 B1 组成员；须等于本文件预算 31）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依序含名词解释 5、A1 型选择 10、A2 病案型选择 10、
 *   B1 共用备选答案配伍 3 组（21～24、25～27、28～30 题）、简答题 3。原书参考答案区
 *   A1 型第 1 题（“处于遗传平衡状态的群体”）答案缺失，本文件未提取该题并在此如实说明；
 *   其余题目答案完整。实取 31 道作为预算：全部 5 道名词解释、代表性 A1 前 6 题、
 *   代表性 A2 病案型 7 题（含等位基因/携带者/近亲婚配疾病风险频率计算）、全部
 *   3 组 B1 配伍（遗传漂变/隔离群/迁移/建立者效应/自然选择、近婚系数比值、
 *   致死突变与遗传方式）共 10 个成员、第 1、2 道简答，以及第 3 道简答（SNP 位点
 *   Hardy-Weinberg 平衡检验的计算）按项目规约映射为非选择型 case。所有选择题正确项
 *   逐一对齐源参考答案（A1：2.C 3.B 4.B 5.C 6.A 7.C；A2：11.B 12.E 13.A 14.E 15.C
 *   16.A 17.E；B1：21.C 22.D 23.E 24.A 25.B 26.C 27.B 28.B 29.A 30.D），选项顺序
 *   已随机重排并同步 correctChoiceIndex（0 起）。OCR 错字已按语义恢复（如“衡fi”→
 *   衡量、“衡狃”→衡量、“随群”→隔离群、“4 合”之日→杂合、“氨基酸”→氨基酸、“液諷
 *   含也”→汗液氯含量、“谟性纤维化”→囊性纤维化、“反应迟纯”→反应迟钝、“X 轴线”→X线
 *   等），数值、单位、发病率与基因频率（3/50700、1/16900、1/130 等）均按原值保留，
 *   未捏造。A2 第 14 题（PKU 姨表兄妹子代风险）原书选项 OCR 仅恢复 3 项数值，本文件
 *   如实呈现该 3 项。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "medical-genetics-ch6-population-genetics";
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第6章 群体遗传 复习思考题 习题（PDF 第37–41页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），5 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch6-population-genetics-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：群体遗传学（population genetics）",
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
        "群体遗传学",
        "群体遗传学（population genetics）是指研究群体的遗传变异分布、等位基因频率和基因型频率在人群中的维持、变化及其规律的遗传学分支学科。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：连锁不平衡（linkage disequilibrium）",
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
        "连锁不平衡",
        "连锁不平衡（linkage disequilibrium）是指基因组中不同位点上非等位基因之间在群体中的非随机组合，即出现不同基因座上的2个基因同时遗传的频率明显高于预期的随机频率。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：近婚系数（inbreeding coefficient, F）",
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
        "近婚系数",
        "近婚系数（inbreeding coefficient, F）即有亲缘关系的配偶，从他们共同的祖先得到同一基因，又将该基因同时传递给他们的子女而使之成为纯合子的概率。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：适合度（fitness, f）",
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
        "适合度",
        "适合度（fitness, f）是指一个个体能够生存，并将其基因传给下一代的能力。一般用相对生育率来表示。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：遗传漂变（genetic drift）",
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
        "遗传漂变",
        "遗传漂变（genetic drift）是指小群体或隔离人群中基因频率的随机波动。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），13 道（A1 前 6 题 + A2 病案型 7 题） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "在对一个50700例个体居住的社区进行遗传普查时，发现了3例苯丙酮尿症患儿。由此可知这个群体的苯丙酮尿症致病基因频率为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["1/1300", "1/16900", "1/130", "1/260", "1/65"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "1/130",
        "原书A1型选择题第2题参考答案为C（1/130）。苯丙酮尿症为常染色体隐性遗传病，群体发病率q²=3/50700=1/16900，致病基因频率q=√(1/16900)=1/130。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "舅外甥女之间，X-连锁基因的近婚系数为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["0", "1/8", "1/16", "1/64", "1/4"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "1/8",
        "原书A1型选择题第3题参考答案为B（1/8）。舅外甥女之间X-连锁基因的近婚系数为1/8。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对于X-连锁基因，姨表兄妹之间的近婚系数为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["1/16", "1/8", "3/16", "0", "1/4"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "3/16",
        "原书A1型选择题第4题参考答案为B（3/16）。姨表兄妹之间X-连锁基因的近婚系数为3/16。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "基因库是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "一个有性生殖的群体所含有的全部遗传信息",
      "有性生殖群体中某个性状的全部遗传信息",
      "有性生殖的所有生物的全部遗传信息",
      "一个生殖细胞中所含有的全部遗传信息",
      "一个个体细胞中所含有的全部遗传信息",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "一个有性生殖的群体所含有的全部遗传信息",
        "原书A1型选择题第5题参考答案为C。基因库（gene pool）是指一个有性生殖的群体所含有的全部遗传信息。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "适合度可以用在同一环境下",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "患者和他们的正常同胞的生育率之比来衡量",
      "患者和他们的同胞携带致病基因量的多少来衡量",
      "不同患者的平均生育率来衡量",
      "患者同胞的平均生存率来衡量",
      "患者和他们的同胞的生育率之比来衡量",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "患者和他们的正常同胞的生育率之比来衡量",
        "原书A1型选择题第6题参考答案为A。适合度一般用相对生育率来表示，即在同一环境下以患者和他们的正常同胞的生育率之比来衡量。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "在一个10万人的城镇中普查遗传病时，发现10例白化病患者（6男、4女）。由此可估算出这个群体的白化病基因频率为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["1/10000", "1/5000", "1/100", "1/250", "1/50"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "1/100",
        "原书A1型选择题第7题参考答案为C（1/100）。白化病为常染色体隐性遗传病，群体发病率q²=10/100000=1/10000，基因频率q=√(1/10000)=1/100。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某男性患者，20岁，以转氨酶升高、手足徐动就诊。体检发现腱反射亢进，眼角膜与巩膜交界处出现棕色色素环（K-F环）；生化检查发现铜蓝蛋白降低，经DNA测序发现ATP7B基因突变，确诊为肝豆状核变性（Wilson病）。肝豆状核变性是神经内科常见的一种常染色体隐性遗传病，经早期筛查，采取驱铜治疗后可以和正常个体一样生活和生育。随着早期筛查和驱铜治疗的普及，本病经过若干年后的变化是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["发病率升高", "发病率降低", "突变率升高", "症状逐渐减轻", "没有变化"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "发病率升高",
        "原书A2型选择题第11题参考答案为B（发病率升高）。驱铜治疗后患者可像正常个体一样生活生育，选择压力降低，致病基因频率将逐渐升高，故若干年后本病的发病率会升高。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某犹太裔男性新生儿，出生后数天即发生呼吸道感染和肠梗阻症状，X射线检查发现双肺分散片状阴影，患儿汗液氯化物含量增高，诊断为囊性纤维化。本病是西方最常见的一种常染色体隐性遗传病，在欧洲人群中的发病率约为1/2500。欧洲人群中杂合子携带者的比率为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["1/2500", "1/50", "1/25", "2/1250", "1/500"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "1/25",
        "原书A2型选择题第12题参考答案为E（1/25）。囊性纤维化为常染色体隐性遗传病，q²=1/2500，q=1/50，杂合子携带者频率2pq≈2q=1/25。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1009",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "一对非洲裔夫妇生育有2例罹患镰状细胞贫血的孩子。夫妇俩人来咨询，为什么本病在非洲裔人群中更为常见？以下哪一种解释是正确的",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "自然选择",
      "遗传漂变",
      "非洲裔人群中基因流（gene flow）的增加",
      "近亲婚配的影响",
      "突变负荷的增加",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "自然选择",
        "原书A2型选择题第13题参考答案为A（自然选择）。镰状细胞贫血的杂合子在疟疾流行区具有抗疟优势，属杂合子优势，由自然选择维持了该致病基因在非洲裔人群中的较高频率，故在非洲裔人群中更常见。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1010",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某男性患儿，1岁，患儿的父母因其“反应迟钝”、“身上有老鼠气味”来就诊。体检发现患儿皮肤干燥，毛发呈棕黄色，腱反射亢进；实验室检查发现血、尿苯丙氨酸含量均明显增高，确诊为苯丙酮尿症。某群体典型苯丙酮尿症的群体发病率为1/10000，一对表型正常的姨表兄妹婚配，他们的子代罹患苯丙酮尿症的风险为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["1/200", "1/400", "1/1600"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "1/1600",
        "原书A2型选择题第14题参考答案为E（1/1600）。苯丙酮尿症为常染色体隐性遗传病，q²=1/10000，q=1/100。表型正常的姨表兄妹属二级近亲婚配，其近亲婚配使隐性致病基因纯合的机会增加，子代罹患本病风险约为1/1600。（注：本题原书备选项为5项，OCR仅恢复其中的三项数值1/200、1/400、1/1600，本文件如实呈现这三项。）",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1011",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "一个来自中东的家庭有先天性聋哑家族史，经查为GJB2基因突变引起的常染色体隐性遗传先天性聋哑。本病的群体发病率为4/10000，该群体中携带者的频率是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["0.01", "0.0002", "0.04", "0.49", "0.09"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "0.04",
        "原书A2型选择题第15题参考答案为C（0.04）。先天性聋哑为常染色体隐性遗传病，q²=4/10000=0.0004，q=0.02，携带者频率2pq≈2q=0.04。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1012",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "苯硫脲（PTC）味盲为常染色体隐性遗传性状。有些个体只能尝出＞40nmol/L的PTC溶液的苦味，故遗传学上称其为PTC味盲。在我国汉族人群中，PTC味盲者占9%。相对味盲基因的显性基因频率为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["0.7", "0.3", "0.49", "0.42", "0.09"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "0.7",
        "原书A2型选择题第16题参考答案为A（0.7）。PTC味盲为常染色体隐性遗传性状，味盲者即隐性纯合子，q²=9%=0.09，q=0.3，则相对味盲基因的显性基因频率p=1－q=0.7（其杂合子频率2pq=0.42为干扰项）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-a1013",
    order: 18,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "一对夫妇前来进行遗传咨询。妻子有2个兄弟在婴儿期死于脊髓性肌萎缩I型（SMA1）。本病是继囊性纤维化之后，儿童死亡率排名第2位的常染色体隐性遗传病，发病率约为1/20000。丈夫没有本病的家族史。因此，这对夫妇所生的孩子罹患本病的风险为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["1/70", "1/360", "1/240", "1/120", "1/420"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "1/420",
        "原书A2型选择题第17题参考答案为E（1/420）。SMA1为常染色体隐性遗传病，q²=1/20000，q≈1/141。妻子兄弟患病故其父母均为携带者，按孟德尔规律妻子有2/3的概率为携带者；丈夫无家族史，其随机携带者频率2pq≈1/70。子代罹患风险=(2/3)×(1/70)×(1/4)=1/420。",
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
    id: "ext-medical-genetics-ch6-population-genetics-short001",
    order: 29,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述Hardy-Weinberg平衡成立的条件。",
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
        "Hardy-Weinberg平衡成立的条件",
        "Hardy-Weinberg平衡的成立主要有以下几个条件：①无限大的群体（群体应足够大，避免遗传漂变的影响）；②群体内的个体随机交配；③没有自然或人工选择；④没有突变；⑤群体没有大规模个体迁移。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch6-population-genetics-short002",
    order: 30,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "主要的DNA多态性有哪些？",
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
        "主要的DNA多态性",
        "DNA多态性一类为长度的多态性，如可变数目串联重复序列（variable number of tandem repeat，VNTR）和短串联重复序列（short tandem repeat，STR，即微卫星DNA序列）。微卫星序列一般是以2～4个碱基为基本单位的重复序列，如（CA）n重复，为复等位基因，杂合度较高，分布于整个基因组。另一类DNA多态性为序列的多态性，主要是单核苷酸多态性（single nucleotide polymorphism，SNP）。SNP为单碱基的变异，绝大多数是双等位基因，在基因组中广泛分布。相比于数千个微卫星DNA序列，SNP的数量多达几千万个。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例 / 计算型（case，非选择型），1 道（Hardy-Weinberg 平衡检验） */
const caseItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch6-population-genetics-case001",
    order: 31,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "在基因分型（genotyping）完成之后，要对单核苷酸多态性（SNP）位点的基因型进行Hardy-Weinberg平衡检验。如果一个A/G多态性位点，AA、AG和GG的基因型频率分别为0.25、0.5和0.25。这样的基因型分布是否符合Hardy-Weinberg平衡？请简述计算步骤。",
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
        "Hardy-Weinberg平衡检验计算",
        "根据已知的AA、AG和GG基因型频率（观察值O），计算出A、G等位基因的频率p和q，均为p=0.25+0.5/2=0.5，q=0.25+0.5/2=0.5。再由p²+2pq+q²=1，得到AA、AG和GG基因型的预期频率（期望值E）为0.25、0.5和0.25。观察值O与预期（期望）值E做卡方检验：X²=Σ(O－E)²/E。对于AA基因型：(0.25－0.25)²/0.25=0；以此类推，AG、GG的(O－E)²/E均为0。得出X²=0，小于临界值，因而这样的基因型分布符合Hardy-Weinberg平衡。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，3 组共 10 个成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-medical-genetics-ch6-population-genetics-b001",
    order: 19,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["迁移", "遗传漂变", "自然选择", "建立者效应", "隔离群"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-medical-genetics-ch6-population-genetics-b001m1",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "PTC味盲的频率在中国东部和西北人群存在差异，原因在于",
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
            "迁移",
            "原书B1型配伍题第21题参考答案为C（迁移）。中国东部与西北人群间基因频率差异源于人群之间的基因迁移（基因流）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch6-population-genetics-b001m2",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt:
          "囊性纤维化是一种常染色体隐性遗传病，其中以第508密码子的缺失最为常见，这种现象是因为",
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
            "建立者效应",
            "原书B1型配伍题第22题参考答案为D（建立者效应）。某种等位基因（如囊性纤维化的F508del，第508密码子缺失）在人群中高频出现，常由建立者效应导致，即少数奠基者在群体形成时将此等位基因高频率保留下来。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch6-population-genetics-b001m3",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt:
          "在非洲疟疾流行地区，血红蛋白β亚基N端的第6位氨基酸残基是缬氨酸/谷氨酸杂合子的频率很高，原因在于",
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
            "自然选择",
            "原书B1型配伍题第23题参考答案为E（自然选择）。血红蛋白β链第6位缬氨酸/谷氨酸杂合子（镰状细胞贫血杂合子）在疟疾流行区具有抗疟优势，属自然选择中的杂合子优势，故该杂合子频率在该地区很高。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch6-population-genetics-b001m4",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "某种濒危生物数量过少，造成其某些性状丢失的原因在于",
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
            "遗传漂变",
            "原书B1型配伍题第24题参考答案为A（遗传漂变）。小群体（如濒危生物）中基因频率会随机波动，某些等位基因可能随机丢失，导致某些性状丢失，即遗传漂变。",
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
    id: "ext-medical-genetics-ch6-population-genetics-b002",
    order: 23,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["0", "1/16", "1/8", "3/16", "1/64"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-medical-genetics-ch6-population-genetics-b002m1",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "姑表兄妹常染色体基因的近婚系数是",
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
            "1/16",
            "原书B1型配伍题第25题参考答案为B（1/16）。姑表兄妹常染色体基因（一级表亲）的近婚系数为1/16。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch6-population-genetics-b002m2",
        order: 24,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "姨表兄妹X-连锁基因的近婚系数是",
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
            "3/16",
            "原书B1型配伍题第26题参考答案为C（3/16）。姨表兄妹之间X-连锁基因的近婚系数为3/16。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch6-population-genetics-b002m3",
        order: 25,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "三级亲属的近婚系数是",
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
            "1/16",
            "原书B1型配伍题第27题参考答案为B（1/16）。三级亲属（如表（堂）兄妹/姑表兄妹）的近婚系数为1/16。",
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
    id: "ext-medical-genetics-ch6-population-genetics-b003",
    order: 26,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: ["常染色体隐性", "常染色体显性", "X染色体显性", "X染色体隐性", "线粒体遗传"],
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    members: [
      {
        id: "ext-medical-genetics-ch6-population-genetics-b003m1",
        order: 26,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "突变为致死性，患者多为新发突变的是",
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
            "常染色体显性",
            "原书B1型配伍题第28题参考答案为B（常染色体显性）。常染色体显性致死性突变会迅速被选择清除，患者多为新发突变。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch6-population-genetics-b003m2",
        order: 27,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "一个致死性突变，等位基因频率变化最缓慢的是",
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
            "常染色体隐性",
            "原书B1型配伍题第29题参考答案为A（常染色体隐性）。常染色体隐性致死性突变以杂合子携带方式在群体中保存，等位基因频率受选择清除变化最缓慢。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch6-population-genetics-b003m3",
        order: 28,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "男性的表型频率等于相应的群体基因频率的是",
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
            "X染色体隐性",
            "原书B1型配伍题第30题参考答案为D（X染色体隐性）。X-连锁隐性遗传病中男性为半合子，其表型频率等于相应的群体基因频率。",
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