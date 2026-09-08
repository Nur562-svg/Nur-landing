import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 医学遗传学 学习指导与习题集（第4版）— 第15章 出生缺陷 题库提取（等比取样）
 * 来源：《医学遗传学学习指导与习题集》第4版（人民卫生出版社，主编：张咸宁、杨玲）
 *
 * == 统计报告（本文件题量 = 按“每教材 600、章节等比缩放”预算）==
 * - 名词解释：8 题
 * - A1/A2/X 型选择题（统一映射为 a1-single 单选）：5 题
 * - 简答题 / 病例（映射 short-answer 或 case）：3 题（全部为 short-answer）
 * - B1 共用备选答案配伍题：2 组、共 9 个成员
 * - 独立记分题合计：25 题（含 B1 组成员；须等于本文件预算 25）
 * - 缺失答案：0 题；无法可靠提取：0 题
 * - 说明：本章原书依序含名词解释 8、A1 型选择题 10、A2 型选择题 10、B1 配伍题 2 组
 *   （21~24 与 25~29）、简答题 3。按预算 25 等比取样：全部 8 道名词解释、全部 3 道简
 *   答题、2 组 B1 全部 9 个成员，以及 5 道代表性选择（原书 A1 第 1、5、7 题与 A2 第
 *   11、12 题，覆盖“非出生缺陷病种／神经管缺陷产前诊断时机／先心病遗传比例／风疹感
 *   染孕周／沙利度胺致畸药物”）。本章源素材无 X 型多选题，故无 xMapNote 映射项；也无
 *   独立非选择型病案（case），A2 病例型选择题已按规约映射为 a1-single。所有选择题正确
 *   项逐一对齐源参考答案（1.A 5.D 7.B 11.E 12.C；B1: 21.C 22.D 23.A 24.E 25.A 26.B
 *   27.C 28.D 29.E）。选项顺序已随机重排并同步 correctChoiceIndex（0 起）。OCR 错字已
 *   按语义恢复（如“多躲肾/多猫肾”→多囊肾、“先夫性”→先天性、“鼍畸/崎形”→畸形、
 *   “L/C4A”→L1CAM、“风疼病毒”→风疹病毒、“挤穿剌”→脐穿剌等）。数值、百分比与致
 *   畸因子、畸形类型及围孕周时间窗（4~8 周、9~10 周、12~13 周、14~18 周、21~22 周、
 *   17~32 周、10 周左右；6%、7%~8%、95%~98%、50%等）均按原值保留，未捏造。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "medical-genetics-ch15-birth-defects";
const locatorBase =
  "《医学遗传学学习指导与习题集》第4版 第15章 出生缺陷 复习思考题 习题（PDF 第92–97页）";
const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原书为X型多选题，按项目规约映射为a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），8 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch15-birth-defects-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：出生缺陷（birth defect）",
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
        "出生缺陷",
        "出生缺陷（birth defect）又称“先天性异常（congenital anomaly）”，即胚胎发育紊乱引起的形态、结构、功能、代谢、行为等方面的异常的统称。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：畸形（malformation）",
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
        "畸形",
        "畸形（malformation）是指某一器官或器官的某一部分原发性缺失，其基本原因是发育过程中的遗传缺陷，导致发育过程的阻滞或方向错误。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：畸化（disruption）",
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
        "畸化",
        "畸化（disruption）是指环境因素干扰了正常的发育过程导致器官或组织的异常，有时也称为继发性畸形。环境因素包括缺血（ischemia）、感染（infection）、外伤（trauma）等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：序列征（sequence）",
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
        "序列征",
        "序列征（sequence）是指由单因素引发的级联反应（cascade）而导致的单一器官缺陷。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：关联征（association）",
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
        "关联征",
        "关联征（association）是指几种畸形在发生机制上并不能用序列征、综合征发生的机制来解释，但又非随机地一起发生的一组未知病因、病理的先天性异常。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：Arnold-Chiari 畸形（Arnold-Chiari malformation）",
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
        "Arnold-Chiari 畸形",
        "Arnold-Chiari 畸形（Arnold-Chiari malformation）又称“Arnold-Chiari 综合征”，是指脊髓脊膜膨出合并延髓和一部分小脑向尾端移位到椎管，由于枕骨大孔被延髓或小脑所阻塞，使脑脊液不能通过第 4 脑室孔，导致脊髓脊膜膨出、脊柱裂和脑积水的先天性畸形。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：致畸剂（teratogen）",
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
        "致畸剂",
        "致畸剂（teratogen）是指能够导致胚胎畸变的物理、化学或生物因子。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：发育异常（dysplasia）",
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
        "发育异常",
        "发育异常（dysplasia）是指在胚胎发育早期（即胚层形成、细胞分化和组织发生三个阶段）出现的组织形成受阻的过程及由此引发的形态学变异。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），5 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch15-birth-defects-a1001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "传统的观念上，以下哪一种疾病不属于出生缺陷？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "小头畸形",
      "膀胱外翻",
      "白化病",
      "唇裂",
      "先天性心脏病",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "白化病",
        "原书 A1 型选择题答案第 1 题为 A，即传统的观念上白化病不属于出生缺陷。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-a1002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "神经管缺陷的产前诊断最佳时间为下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "孕4 ~ 8周",
      "孕12 ~ 13周",
      "孕14 ~ 18周",
      "孕9 ~ 10周",
      "孕21 ~ 22周",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "孕14 ~ 18周",
        "原书 A1 型选择题答案第 5 题为 D，即神经管缺陷的产前诊断最佳时间为孕 14~18 周。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-a1003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "由遗传因素导致的先天性心脏病占本病总数的大约为下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["75%", "95% ~ 98%", "25%", "2% ~ 5%", "100%"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "95% ~ 98%",
        "原书 A1 型选择题答案第 7 题为 B，即由遗传因素导致的先天性心脏病占本病总数的大约 95%~98%。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-a1004",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "某 3 岁女孩，诊断为先天性耳聋。可考虑其母在怀孕的哪个时期感染了风疹病毒？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["3 ~ 4周", "6 ~ 7周", "9 ~ 10周", "5 ~ 6周", "7 ~ 8周"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "9 ~ 10周",
        "原书 A2 型选择题答案第 11 题为 E，即该患儿可考虑其母在怀孕的 9~10 周感染了风疹病毒。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-a1005",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "20 世纪 60 年代，欧洲、日本等国相继出现大量短肢畸形（phocomelia，俗称“海豹肢”）患儿，产科医生经研究证实与患儿母亲妊娠期服用的一种药物有关，该药物最终被从市场召回。这一药物是下列哪一项？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "非那西丁",
      "己烯雌酚",
      "孕激素",
      "沙利度胺（反应停）",
      "苯丙胺",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "沙利度胺（反应停）",
        "原书 A2 型选择题答案第 12 题为 C，即导致短肢畸形（海豹肢）的药物是沙利度胺（反应停）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答题（short-answer），3 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-medical-genetics-ch15-birth-defects-short001",
    order: 23,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "出生缺陷有哪些类型？神经管缺陷是临床上较为常见的一种出生缺陷，请试述神经管缺陷的相关知识。",
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
        "出生缺陷类型与神经管缺陷",
        "出生缺陷可分两类：①简单畸形，包括畸形、畸化、变形、发育异常；②多发性畸形，包括序列征、综合征、关联征。神经管（neural tube）是指神经沟在枕节平面开始闭合、闭合向头尾两端进展、第 4 周末神经沟完全封闭形成的一条神经上皮管，其头段将分化为脑，尾段将分化为脊髓。就神经管缺陷（neural tube defect，NTD）而言，如果神经沟未能关闭，神经组织露在外面，这样的缺损可长达胚体身体的全长，也可以只局限于一小区域，通常称为开放性神经管缺陷。尾侧的神经沟未能关闭，使大范围的椎弓未发育、表面皮肤裂开、脊髓发育不全并直接暴露于体表所致的畸形称为脊髓裂（myeloschisis）；神经沟在头端部分未能关闭，致使前脑原基发育异常所致的畸形称为无脑畸形（anencephaly）。脊髓裂必然合并脊柱裂（spina bifida，rachischisis）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-short002",
    order: 24,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "造成出生缺陷发生的因素有哪些？",
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
        "出生缺陷的遗传与环境因素",
        "导致出生缺陷发生的因素包括遗传因素和环境因素。（1）遗传因素包括亲代的血缘传递及配子或胚体细胞的染色体畸变和基因突变：①染色体畸变约占可识别先天畸形原因的 6%，一般而言，常染色体任何可被检测到的不平衡（如重复、缺失、三体、单体等）都可能引起严重的结构和发育畸形，导致妊娠早期的流产，常见的染色体畸变引起的疾病如 Down 综合征、Turner 综合征、Klinefelter 综合征、猫叫综合征等，遗传不平衡是导致这类畸形发生的原因；②单基因缺陷约 7%~8% 的先天畸形由单基因突变引发，部分病例仅涉及单器官的畸形，但也可以引起涉及多系统、多器官的多发性畸形；③多基因遗传：绝大多数的出生缺陷呈多基因遗传方式，包括某些累及心脏、中枢神经系统和肾脏的单一畸形，这种情况下可基于流行病学研究估算经验风险，有助于对已经生育有 1 例患儿的夫妇再生育时再现风险的评估。（2）影响胚胎发育的环境因素包括 3 个方面，即母体周围的外环境、母体的内环境和胚体周围的微环境，引起胚胎畸形的这三个层次的环境因素均称为环境致畸剂，主要有生物性致畸剂、物理性致畸剂、致畸性药物、致畸性化学物质和其他致畸剂。某些外环境中的致畸剂可穿过内环境和微环境直接作用于胚体，某些则通过改变内环境和微环境而间接作用于胚体。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-medical-genetics-ch15-birth-defects-short003",
    order: 25,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述主要的出生缺陷产前诊断措施。",
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
        "出生缺陷的主要产前诊断措施",
        "主要的产前诊断措施包括：①通过羊膜穿刺术抽取羊水，分析胎儿的代谢状况、胎儿的染色体组成、基因是否存在缺陷等；②通过绒毛膜活检（CVS）分析胚体细胞的染色体组成、基因是否存在缺陷等；③在 B 超的引导下将胎儿镜插入羊膜腔中直接观察胎儿的体表（四肢、五官、手指、脚趾和生殖器官等）是否发生畸形，并可通过活检钳采集胎儿的皮肤组织和血液等样本做进一步检查；④B 超检查是一种简便易行且安全可靠的宫内诊断方法，可在荧光屏上较为清晰地观察到胎儿的影像，不仅能诊断胎儿外部畸形，还可诊断某些明显的内脏畸形（如先天性心脏病、内脏外翻、多囊肾、神经管缺陷、无脑畸形、脑积水、水肿儿、葡萄胎等）；⑤将水溶性造影剂注入羊膜腔，可在 X-射线荧屏上观察胎儿的大小和外部畸形，如果将某种脂溶性造影剂注入羊膜腔使其吸附于胎儿体表，便可于 X-射线下清晰地观察胎儿的外部畸形；⑥脐穿刺术是在 B 超引导下于孕中期、孕晚期（17~32 周）经母腹抽取胎儿静脉血用于染色体或血液学各种检查，亦可作为因羊水细胞培养失败，或在错过 CVS 和羊水取样时机时的补充；⑦无创产前检测（NIPT）技术，通过抽取孕妇 10 周左右的外周血，分析血浆中的游离胎儿 DNA，可检测胎儿的非整倍体畸形（Down 综合征、13 三体、18 三体）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例 / 病案分析（case）：本章无独立非选择型病案/遗传咨询计算题 */
const caseItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，2 组：21~24 共 4 成员、25~29 共 5 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-medical-genetics-ch15-birth-defects-b001",
    order: 14,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "胎儿镜检查",
      "B超检查",
      "染色体核型分析",
      "致病基因的分析",
      "生化代谢物分析",
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
        id: "ext-medical-genetics-ch15-birth-defects-b001m1",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "筛查苯丙酮尿症（PKU）新生儿的最佳方法是",
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
            "生化代谢物分析",
            "原书 B1 型题第 21 题为 C，即筛查苯丙酮尿症新生儿的最佳方法是生化代谢物分析。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch15-birth-defects-b001m2",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "Turner 综合征的最佳确诊方法是",
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
            "染色体核型分析",
            "原书 B1 型题第 22 题为 D，即 Turner 综合征的最佳确诊方法是染色体核型分析。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch15-birth-defects-b001m3",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "先天性心脏病、内脏外翻、多囊肾的最佳检查方法是",
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
            "B超检查",
            "原书 B1 型题第 23 题为 A，即先天性心脏病、内脏外翻、多囊肾的最佳检查方法是 B 超检查。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch15-birth-defects-b001m4",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "囊性纤维化的最佳确诊方法是",
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
            "致病基因的分析",
            "原书 B1 型题第 24 题为 E，即囊性纤维化的最佳确诊方法是致病基因的分析。",
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
    id: "ext-medical-genetics-ch15-birth-defects-b002",
    order: 18,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "Noonan综合征和先天性风疹的特征之一",
      "可能是肾不发育（renal agenesis）的后果之一",
      "可导致50%以上的自然流产",
      "既可能导致失明，同时也可能导致耳聋",
      "可能是妊娠早期的糖尿病未得到及时治疗的后果之一",
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
        id: "ext-medical-genetics-ch15-birth-defects-b002m1",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "下列描述中，与“遗传因素”关系最密切的是",
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
            "可导致50%以上的自然流产",
            "原书 B1 型题第 25 题为 A，即与“遗传因素”关系最密切的是“可导致 50% 以上的自然流产”。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch15-birth-defects-b002m2",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "下列描述中，与“马蹄足畸形”关系最密切的是",
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
            "可能是肾不发育（renal agenesis）的后果之一",
            "原书 B1 型题第 26 题为 B，即与“马蹄足畸形”关系最密切的是“可能是肾不发育（renal agenesis）的后果之一”。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch15-birth-defects-b002m3",
        order: 20,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "下列描述中，与“先天性感染”关系最密切的是",
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
            "既可能导致失明，同时也可能导致耳聋",
            "原书 B1 型题第 27 题为 C，即与“先天性感染”关系最密切的是“既可能导致失明，同时也可能导致耳聋”。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch15-birth-defects-b002m4",
        order: 21,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "下列描述中，与“椎体缺陷”关系最密切的是",
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
            "可能是妊娠早期的糖尿病未得到及时治疗的后果之一",
            "原书 B1 型题第 28 题为 D，即与“椎体缺陷”关系最密切的是“可能是妊娠早期的糖尿病未得到及时治疗的后果之一”。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-medical-genetics-ch15-birth-defects-b002m5",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "下列描述中，与“肺动脉狭窄”关系最密切的是",
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
            "Noonan综合征和先天性风疹的特征之一",
            "原书 B1 型题第 29 题为 E，即与“肺动脉狭窄”关系最密切的是“Noonan 综合征和先天性风疹的特征之一”。",
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