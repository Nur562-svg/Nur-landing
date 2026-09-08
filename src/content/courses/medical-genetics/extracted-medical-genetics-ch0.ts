import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学遗传学 学习指导与习题集（第4版）— 第0章 绪论 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：5 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：8 题
 * - 简答题：2 题
 * - B1 共用备选答案配伍题：2 组、共 4 个成员
 * - 独立记分题合计：19 题（含 B1 组成员；等于预算 19）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依次含名词解释 12、A1 型选择 13、A2 型选择 2、B1 型 2 组 × 5、
 *   简答 4，无 X 型多选。本文件按 19 道预算在原书顺序内等比取材并改写（名词解释
 *   取 遗传病/医学遗传学/再现风险/精准医学/割裂基因，A 型取 1、2、3、4、6、8、9、
 *   14 号，简答取 1、3 号，B1 每组各取 2 个成员）。A1/A2 均为单选并于填入时随机
 *   重排可选项、同步 correctChoiceIndex，正确项全部对照源参考答案。OCR 错字已按
 *   语义恢复（如“割裂基因”“再现风险”“葡糖-6-磷酸脱氢酶”“外显子组”“表观遗传学”等），
 *   数值、单位、学者姓名与年份、疾病名称保留原值，未捏造。
 * 注意：本文件覆盖 PDF 第 2–7 页（第0章 绪论）。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "medical-genetics-ch0-introduction";
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第0章 绪论 复习思考题 习题（PDF 第2–7页）";
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
    id: "ext-medical-genetics-ch0-introduction-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：遗传病（genetic disorder）",
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
        "遗传病",
        "遗传病（genetic disorder）是指由遗传物质发生改变而引起的疾病的统称。除外伤和非正常死亡以外，人类所有疾病的发生、发展和转归都与DNA的直接或间接变化相关。因此几乎所有的疾病都属于遗传病，但遗传因素的作用有大有小。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：医学遗传学（medical genetics）",
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
        "医学遗传学",
        "医学遗传学（medical genetics）或称“遗传医学”，是指应用遗传学的理论与方法研究遗传因素在疾病的发生、流行、诊断、预防、治疗和遗传咨询等中的作用机制及其规律的学科。它既是人类遗传学的分支，又是医学与遗传学的交叉学科，主要从遗传流行病学、细胞遗传学和分子遗传学三个方面探讨疾病的遗传规律。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：再现风险（recurrence risk）",
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
        "再现风险",
        "再现风险（recurrence risk）即一个家系中已出现一个或多个遗传病患者，在此基础上，根据遗传病的遗传方式及流行病学特征推算出另一家系成员再发同样疾病的可能性大小。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：精准医学（precision medicine）",
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
        "精准医学",
        "精准医学（precision medicine）实质上是“个性化医学”的替代术语。意即通过飞速发展的基因组测序技术与生物信息学、大数据科学的交叉应用，精确寻找疾病的病因和治疗的靶点，并对每一种疾病的不同状态和过程进行精确分类，最终实现对疾病和特定患者进行个体化精准治疗的目的，提高疾病诊治与预防的效益。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：割裂基因（split gene）",
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
        "割裂基因",
        "割裂基因（split gene）意即真核基因中的编码氨基酸的序列（外显子）不是连续的，而是被若干个非编码区（内含子）分隔的。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），8 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch0-introduction-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列对医学遗传学的描述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "是一门独特的，与其他临床医学分支学科的联系较为少见",
      "属于人类遗传学的分支学科，主要探讨疾病的遗传因素",
      "只有在谈到某些特殊的疾病或综合征时，“医学遗传学”的相关术语才更易于理解",
      "是一门新出现的学科，即使是在发达国家也仍然没有专列为特殊的一个临床科室",
      "在临床实践中主要限于探讨各种综合征",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "属于人类遗传学的分支学科，主要探讨疾病的遗传因素",
        "医学遗传学属于人类遗传学的分支学科，主要探讨疾病的遗传因素，并因此与临床各科广泛联系，而并非孤立、新出现或仅限于探讨综合征的学科。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列对个性化医学的描述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "对临床诊断的帮助不大",
      "可直接指导临床治疗，以及鉴定个体的易感性",
      "目前还是一种医学理论，可能在未来的临床实践中发挥作用",
      "一旦实施，将增高医疗成本和支出",
      "可应用于疾病的一级预防",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "可直接指导临床治疗，以及鉴定个体的易感性",
        "个性化医学以个体基因组信息为基础并结合其转录物组、蛋白质组、代谢组等多组学内环境信息，可直接指导临床治疗，并可鉴定个体对特定疾病的易感性。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "遗传病是指",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "既有先天性，又有家族性特点的疾病",
      "先天性疾病",
      "遗传物质改变引起的疾病",
      "不可医治的疾病",
      "家族性疾病",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "遗传物质改变引起的疾病",
        "遗传病是指由遗传物质发生改变而引起的疾病的统称。先天性疾病、家族性疾病并不都等于遗传病，遗传病也并非都不可医治。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "环境因素可诱导发病的单基因病为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "白化病",
      "葡糖-6-磷酸脱氢酶（G6PD）缺乏症（俗称蚕豆病）",
      "镰状细胞贫血",
      "Huntington 病",
      "血友病A",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "葡糖-6-磷酸脱氢酶（G6PD）缺乏症（俗称蚕豆病）",
        "葡糖-6-磷酸脱氢酶（G6PD）缺乏症为单基因病，可由进食蚕豆等环境因素诱导溶血发病；白化病、镰状细胞贫血、Huntington 病、血友病A等一般不由环境因素诱导。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "首次提出“分子病”概念的学者是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Archibald Garrod (1857—1936)",
      "George Beadle (1903—1989)",
      "Charles Ford (1912—1999)",
      "Linus Pauling (1901—1994)",
      "Karl Landsteiner (1868—1943)",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Linus Pauling (1901—1994)",
        "Linus Pauling（1950年代提出镰状细胞贫血为“分子病”）首次提出“分子病”概念，其发现奠定了分子病研究的基础。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "被誉为“精准医学之父”的学者是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "James Watson (1928—)",
      "Francis Collins (1950)",
      "Archibald Garrod (1857—1936)",
      "Linus Pauling (1901—1994)",
      "Alfred Knudson (1922—2016)",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Archibald Garrod (1857—1936)",
        "Archibald Garrod 是“人类生化遗传学说”的创始人，著有《先天性代谢缺陷》，被誉为“精准医学之父”。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-a1007",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "基因组DNA内所有的蛋白编码序列统称为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "内含子（intron）",
      "编码序列",
      "外显子组（exome）",
      "ENCODE",
      "外显子（exon）",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "外显子组（exome）",
        "基因组中所有蛋白质编码外显子的总和构成外显子组（exome），故蛋白编码序列统称为外显子组；而非单指某个外显子、内含子或 ENCODE 数据库。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-a1008",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "某2岁男性患儿，以“进行性面色苍黄、葡萄酒样尿液及发热三天”入院，发病前4天进食蚕豆后出现面色黄染、尿色呈红葡萄酒样，确诊为葡糖-6-磷酸脱氢酶缺乏症。本病属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "线粒体基因病",
      "体细胞遗传病",
      "染色体病",
      "多基因病",
      "单基因病",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "单基因病",
        "葡糖-6-磷酸脱氢酶缺乏症由单基因（X连锁）缺陷引起，属单基因病；进食蚕豆是诱发溶血的常见环境因素。",
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
    id: "ext-medical-genetics-ch0-introduction-short001",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "遗传病可分为几类？遗传病有什么特点？",
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
        "遗传病的分类与特点",
        "分类：国内学者传统上将遗传病分为5大类：①染色体病；②单基因病；③多基因病（复杂疾病）；④线粒体基因（或遗传）病；⑤体细胞遗传病，如肿瘤、衰老、自身免疫性疾病等。另外，有人将基因组病（genomic disorder）划分为一类，指基因组DNA序列的异常重组造成的邻接基因重排而引起的某些综合征，如1A型Charcot-Marie-Tooth病、DiGeorge综合征等。特点：遗传病一般具有先天性、家族性、垂直传递等特征。①先天性：许多遗传病的症状生来就有，如白化病是常染色体隐性遗传病，婴儿刚出生时就表现出“白化”症状；②家族性：许多遗传病具有家族聚集性，如Huntington病患者往往具有阳性家族史；③垂直传递：即遗传物质由亲代直接传递给子代，某些遗传病表现为连代传递，如大多数常染色体显性遗传病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch0-introduction-short002",
    order: 15,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述真核生物的基因表达调控。",
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
        "真核生物基因表达调控的层次",
        "真核生物基因表达的调控可简要归纳为转录水平调控、转录后调控、翻译水平调控、翻译后调控和表观遗传学调控等5个层次的调控。①转录水平的调控：通过蛋白因子与旁侧序列或内含子序列中的调控序列相结合来进行。②转录后水平的调控：真核细胞mRNA转录后形成成熟的mRNA需要经过剪接、戴帽、加尾等过程，影响其中任何一个环节都可能调控基因的表达，如可变剪接、RNA编辑等。③翻译水平的调控：包括翻译起始阶段的调控、microRNA的调控等。④翻译后水平的调控：某些蛋白质合成完成后需经过适当的加工修饰才有活性，增加了蛋白质的多样性和复杂性，如蛋白质的磷酸化、糖基化、泛素化、SUMO化、乙酰化和甲基化等。⑤表观遗传学水平的调控：基因的编码部分结构完整、未发生改变，但其邻接DNA序列发生改变或发生基因的修饰，如DNA甲基化、组蛋白的乙酰化等，也可能导致基因表达或活性的改变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，2 组 × 2 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-medical-genetics-ch0-introduction-b001",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "翻译后水平的调控",
      "表观遗传学水平的调控",
      "转录水平的调控",
      "转录后水平的调控",
      "翻译水平的调控",
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
        id: "ext-medical-genetics-ch0-introduction-b001m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "转录因子对基因表达的调控属于",
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
            "转录水平的调控",
            "转录因子通过与旁侧序列或内含子序列中的调控序列结合，作用于基因的转录水平，对基因表达进行调控。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch0-introduction-b001m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "蛋白质的磷酸化对基因表达的调控属于",
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
            "翻译后水平的调控",
            "蛋白质合成完成后经磷酸化等加工修饰方具活性，故蛋白质的磷酸化属于翻译后水平的调控。",
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
    id: "ext-medical-genetics-ch0-introduction-b002",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "体细胞遗传病",
      "线粒体基因病",
      "染色体病",
      "单基因病",
      "多基因病",
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
        id: "ext-medical-genetics-ch0-introduction-b002m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "动脉粥样硬化属于",
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
            "多基因病",
            "动脉粥样硬化受多个微效基因与环境因素共同影响，属于多基因病（复杂疾病）。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch0-introduction-b002m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "Leber视神经萎缩（Leber病）属于",
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
            "线粒体基因病",
            "Leber视神经萎缩由线粒体基因突变引起，属线粒体基因（遗传）病。",
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
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];