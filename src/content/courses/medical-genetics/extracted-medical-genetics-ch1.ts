import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学遗传学 学习指导与习题集（第4版）— 第1章 基于疾病的遗传学数据分析 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：5 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：6 题
 * - 简答题 / 病例（映射 short-answer 或 case）：5 题（其中 4 题为 case）
 * - B1 共用备选答案配伍题：0 组、共 0 个成员
 * - 独立记分题合计：16 题（含 B1 组成员；须等于本文件预算 16）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依序含名词解释 5、A1 型选择题 10、简答题 5（其中简答 4 为
 *   Huntington 病家系遗传咨询病案分析，按项目规约映射为 non-选择型 case）；实取 20 道
 *   中的 16 道作为预算：全部 5 道名词解释、全部 5 道简答/病例，以及前 6 道代表性
 *   A1 选择题（原书第 10 道选择题补充，按原书顺序覆盖取材至预算满为止）。所有选择题
 *   均为单选，正确项逐一对齐源参考答案（1.E 2.C 3.A 4.E 5.D 6.A 对应本题已采取前 6 题）。
 *   选项顺序已随机重排并同步 correctChoiceIndex（0 起）。OCR 错字已按语义恢复（如
 *   “0MIM”→OMIM、“Huntngtcm/Huntingtcm”→Huntington、“FOYC7”→FOXP2、“电离”→等）。
 *   数值、单位、数据库名与 CAG 重复数（38/35/42 次）均按原值保留，未捏造。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "medical-genetics-ch1-genetic-data-analysis";
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第1章 基于疾病的遗传学数据分析 复习思考题 习题（PDF 第8–12页）";
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
    id: "ext-medical-genetics-ch1-genetic-data-analysis-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：生物信息学（bioinformatics）",
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
        "生物信息学",
        "生物信息学是研究海量生物医学数据复杂关系的学科，其特征是多学科交叉，以互联网为媒介、数据库为载体，用数学知识建立各种数学模型，以计算机为工具对实验所得的大量生物学数据进行储存、检索、处理和分析，并以生物医学知识对结果进行阐释。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：OMIM",
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
        "OMIM",
        "OMIM 即“Online Mendelian Inheritance in Man（在线《人类孟德尔遗传》）”的简称，由美国 Johns Hopkins 大学医学院创建和维护。OMIM 源自该院 Victor A. McKusick 教授主编的《人类孟德尔遗传》（Mendelian Inheritance in Man: Catalog of Human Genes and Genetic Disorders，简称《MIM》）一书。《MIM》一直是遗传医学最权威、最有参考价值的百科全书和数据库。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：参考序列（reference sequence）",
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
        "参考序列",
        "参考序列是指通过一个或少数个体的基因组测序得到的序列，常代表这一物种的基因组序列。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Ensembl",
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
        "Ensembl",
        "Ensembl 是有关人类基因组和其他物种基因组的全面资源的综合性基因组数据库，由欧洲生物信息学会（European Bioinformatics Institute）和 Wellcome 基金会 Sanger 研究所共同维护。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：可读框（open reading frame, ORF）",
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
        "可读框",
        "可读框（open reading frame, ORF）是基因序列的一部分，包含一段可以编码蛋白的碱基序列，拥有特定的起始密码子和终止密码子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2/X 型选择题（统一映射为 a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "你所在的临床科室遇到一个疑难杂症家系，迟迟无法通过临床检查手段确诊疾病。科主任吩咐你尽快查询相关的遗传医学数据库，看看哪一家医院、独立医学检验机构或医学院的研究室能够开展相关的分子诊断检测，以便对这个遗传病家系进行辅助诊断，最终确诊疾病。毫无相关经验的你应该首先查阅哪一个网站？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "PubMed",
      "OMIM",
      "GeneTests",
      "MitoMap",
      "Ensembl",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "GeneTests",
        "原书 A1 型选择题答案第一题为 E，即 GeneTests。GeneTests 是人类遗传病基因检测与基因诊断的权威目录式数据库，用于查询可开展分子诊断检测的机构与名录。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列哪一家网站是最权威的有关线粒体基因病研究和分子诊断的资源？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "OMIM",
      "MitoMap",
      "PubMed",
      "GeneTests",
      "Ensembl",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "MitoMap",
        "原书 A1 型选择题答案第二题为 C，即 MitoMap。MitoMap 是最权威的有关线粒体基因组、线粒体基因病研究和分子诊断的资源。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-a1003",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "在完成了疾病的全外显子组测序（whole exome sequencing, WES）实验之后，通常应该首先查询哪一家网站进行数据比对，以便剔除基因组 DNA 的多态性信息？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "ExAC",
      "GeneCards",
      "OMIM",
      "Ensembl",
      "MitoMap",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "ExAC",
        "原书 A1 型选择题答案第三题为 A，即 ExAC。ExAC（Exome Aggregation Consortium）用于 WES 数据比对以剔除人群中常见的基因组 DNA 多态性信息。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-a1004",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "请查询相关医学遗传学网站，看看 FOXP2 基因包含几个外显子？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "6 ~ 10",
      "1 ~ 5",
      "16 ~ 20",
      "21 ~ 25",
      "11 ~ 15",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "21 ~ 25",
        "原书 A1 型选择题答案第四题为 E，即 FOXP2 基因包含 21~25 个外显子。这是需要实际查询 Ensembl 等网站核对的数据库应用型题目。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-a1005",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "请查询相关医学遗传学网站，看看 FOXP2 基因编码的蛋白最有可能的功能是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "离子通道（ion channel）",
      "转录因子（transcription factor）",
      "分泌激素（secreted hormone）",
      "核膜的组分（nuclear membrane component）",
      "酪氨酸激酶（tyrosine kinase）",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "转录因子",
        "原书 A1 型选择题答案第五题为 D，即 FOXP2 基因编码的蛋白最可能的功能是转录因子（transcription factor）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-a1006",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "请查询相关医学遗传学网站，明确到底是哪一位学者首次报道了 Huntington 病例？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "William Osler",
      "George Huntington",
      "Archibald Garrod",
      "Vessie PR",
      "George Sumner Huntington",
    ],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "George Huntington",
        "原书 A1 型选择题答案第六题为 A，即 George Huntington 是首次报道 Huntington 病例的学者。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-short001",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "生物信息学在医学上有什么意义？",
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
        "生物信息学在医学上的意义",
        "生物信息学是多学科的交叉产物，涉及生物学、数学、物理、计算机科学和信息科学等多个领域。生物信息学对管理现代生物学和医学数据具有重大意义，在临床医学上的应用主要是：①发现疾病相关基因——用生物信息学方法可快速发现新的疾病基因，例如以计算机和互联网为手段发展新算法，对公用、商用或自有数据库中存储的表达序列标签（expressed sequence tag，EST）进行修正、聚类、拼接和组装，获得完整的基因序列以期发现新基因，这种方法称为“电脑克隆”；②发现新的药物分子靶点——通过表达序列标签数据库的搜寻、综合分子特征和结构生物学等方法，帮助人们在药物开发过程中更早、更快地找到更佳的药物作用靶点，减少研发时间和所需临床试验的数量；③设计药物——针对疾病相关的靶标生物大分子进行直接药物设计，已逐渐成为药物设计的主要方法。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-short002",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "请列举几个国际上权威的核酸序列数据库。",
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
        "国际上权威的核酸序列数据库",
        "国际上最权威、最主要的三大核酸序列数据库：①美国国家生物技术信息中心（National Center for Biotechnology Information，NCBI）维护的 GenBank；②欧洲分子生物学研究实验室（European Molecular Biology Laboratory，EMBL）下属的欧洲生物信息学研究所（European Bioinformatics Institute，EBI）维护的 EMBL-EBI；③日本国立遗传学研究所维护的 DDBJ（DNA Data Bank of Japan）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-short003",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是序列排比？",
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
        "序列排比",
        "序列排比（sequence alignment）又称“序列比对”，是核酸或蛋白质序列的比较分析法。将序列之间的相同和不同部分排列出来，由此显示序列间的相关性或同源性（homology）程度。序列排比一般借助于计算机软件（如 BLAST）进行分析，通过在序列中搜索一系列单个性状或性状模式来比较 2 个（双序列排比）或更多个（多重序列排比）序列。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-short004",
    order: 16,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "医学遗传学数据库与精准医学有什么关系？",
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
        "医学遗传学数据库与精准医学的关系",
        "所谓精准医学是以个性化医疗（personalized medicine）为基础，随着基因组测序技术快速进步以及生物信息与大数据科学的交叉应用而发展起来的新型医学概念与医疗模式。在本质上，精准医学是通过基因组、蛋白质组等诸多“组学”技术和医学前沿手段，对大样本人群与特定疾病类型进行生物标志物（biomarker）的分析与鉴定、验证与应用，从而精确寻找疾病的原因和治疗的靶点，并对一种疾病的不同状态和过程进行精确亚分类，最终实现对疾病和特定患者进行个性化精准治疗的目的，提高疾病诊治与预防的效益。因此，精准医学与医学遗传学数据库的使用密切相关，例如：①获取分子水平上的数据信息，并挖掘其内涵；②建立分子水平上的知识与宏观疾病表型的联系，即基因型-表型的关联，搭建分子水平信息和疾病间的桥梁；③融合临床检验、影像学等指标，使医疗做得更加精准。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例 / 病案分析（case，非选择型），1 道 */
const caseItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch1-genetic-data-analysis-case001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "Huntington 病（Huntington disease，OMIM:#143100）是西方最常见的常染色体显性遗传病之一，中国人较为罕见。本病外显率几乎为 100%：即某一显性基因在杂合状态（Aa）下在群体中得以显现表型的个体百分率。本病常于 30~45 岁时缓慢起病，表现为进行性加重的舞蹈样不自主运动（不能控制的痉挛和书写动作）和智能障碍，患者常有欣快表情、生活懒散、衣着不整、妄想或幻觉，部分病例可有癫痫发作；病情呈进行性加重，发病后生存期约 15~20 年。在某 Huntington 病家系中，男性韩某的哥哥罹患本病。DNA 诊断发现，韩某本人为前突变（premutation），即其 HTT 基因的（CAG)n 三核苷酸串联重复序列拷贝数处在不致病的动态突变范围；而韩某 3 个子代的 HTT 基因分析结果依次为：35 岁的大女儿（CAG)n 重复 38 次，30 岁的儿子（CAG)n 重复 35 次，29 岁的小女儿（CAG)n 重复 42 次。据此，你该怎样对此家系进行遗传咨询？",
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
        "Huntington 病家系遗传咨询分析",
        "以“Huntington disease”为关键词检索最权威、最常用的遗传病基因检测和基因诊断数据库 GeneTests 的 GeneReviews，其中明确显示（CAG)n 重复的分类如下：Normal alleles（p.Gln18，26 或更少次 CAG 重复，即 ≤26）不致病；Intermediate alleles（p.Gln18，27~35 次 CAG 重复），个体自身不致病，但因 CAG 重复的不稳定性，其后代有获得致病范围等位基因的风险；HD-causing alleles（p.Gln18，≥36 次 CAG 重复），个体有终生发病风险，其中重度外显率（reduced-penetrance，36~39 次）者可能发病也可能不发病，而完全外显（full-penetrance，≥40 次）者几乎确定终身将发病。据此对韩某 3 个子女的 DNA 诊断结果可准确阐释如下：①35 岁的大女儿（CAG)n 重复 38 次：处于重度外显范围，外显率不定，未来可能发病也可能不发病，难以预测；②30 岁的儿子（CAG)n 重复 35 次：与其父韩某一样属于前突变（中间型等位基因），自身肯定不发病，但其子女有可能获得致病范围等位基因而患遗传病风险，须在未来检测其子女的（CAG)n 重复次数才能进一步分析；③29 岁的小女儿（CAG)n 重复 42 次：处于完全外显范围，未来将肯定出现临床症状，应密切注意观察和随访。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章无 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...a1Items,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];