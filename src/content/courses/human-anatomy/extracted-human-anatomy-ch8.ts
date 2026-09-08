import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 系统解剖学习题集（第2版）— 第八章 女性生殖系统 题库提取（等比取样）
 * 来源：《系统解剖学习题集》第2版（人民卫生出版社，以柏树令主编《系统解剖学》第8版为蓝本）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释：3 题
 * - A1/A2/A3 型选择题（a1-single）：9 题
 * - 填空题（fill）：4 题
 * - 判断改错题 + 问答题（short-answer）：5 题
 * - B1 配伍题：1 组、共 3 个成员
 * - 独立记分题合计：24 题（含 B1 组成员；须等于本文件预算 24）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型题 48、A2 型题 11、B1 共用备选答案配伍题（若干组）、
 *   填空题 20、名词解释 16、判断改错题 17、问答题 14（含填图不计分）。
 *   本文件按 24 道预算在原书顺序中取材并改写，聚焦女性生殖（卵巢/输卵管/子宫/阴道/
 *   前庭大腺/乳房/会阴/盆膈/子宫韧带）。原书页面中混入的男性泌尿生殖与直肠肛管
 *   （前列腺、膀胱、尿道、肛管）异章内容未取材，以保证本章主题与可记分语义一致。
 *   A1/A2 型均映射为 a1-single；B1 型按项目规约组织为 Group b1（组内成员各为一独立记分题）。
 *   OCR 错字已按医学语义恢复（如「A，型题/Az型题」→A1/A2 型题、「B，型题」→B1 型题、
 *   「子官/于官」→子宫、「兩侧/两则」→两侧、「韧帶」→韧带、「腹腔口」→腹腔口等），
 *   器官名、结构名、数值与单位均按原文保留，未捏造。
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const topic = "human-anatomy-ch8-female-reproductive";
const locatorBase =
  "《系统解剖学习题集》第2版 第八章 女性生殖系统 复习思考题 习题（扫描版原书核对PDF 第114–125页）";
const promptNote =
  "题干改写；原题来自用户提供的扫描题集（OCR 已按医学语义恢复），未经第三方授权审核";
const xMapNote =
  "题干改写并映射为单选；原题为共用题干/多选题，按项目规约映射为 a1-single，原题来自用户题集，未经第三方授权审核";
const answerNotice =
  "答案依据扫描题集整理并改写，未经权威教材交叉核对，OCR 错字已按医学语义恢复";

const kp = `kp-${topic}`;

/** 名词解释（term），3 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch8-female-reproductive-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：子宫峡",
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
        "子宫峡",
        "子宫颈上端与子宫体相接处较狭窄，称为子宫峡，长约1cm。妊娠期间子宫峡逐渐伸展变长，形成子宫下段；妊娠末期此部可延长至7~11cm，峡壁逐渐变薄，产科常在此处进行剖宫术。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：阴道前庭",
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
        "阴道前庭",
        "阴道前庭是位于两侧小阴唇之间的菱形裂隙，前部有尿道外口，后部有阴道口；小阴唇中、后1/3交界处，左、右各有一个前庭大腺管的开口。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：卵巢悬韧带",
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
        "卵巢悬韧带",
        "卵巢悬韧带又称骨盆漏斗韧带，是起自小骨盆侧缘、向内下至卵巢输卵管端的腹膜皱襞；内含卵巢血管、淋巴管、神经丛、结缔组织和平滑肌纤维，是寻找卵巢血管的标志。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** A1/A2 型选择题（统一映射为 a1-single），9 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch8-female-reproductive-a1001",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "卵巢窝位于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "髂内动脉和髂总动脉的夹角处",
      "髂外动脉的分支之间",
      "髂外动脉和髂内动脉的夹角处",
      "髂内动脉的分支之间",
      "髂外动脉和髂总动脉的夹角处",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "髂外动脉和髂内动脉的夹角处",
        "卵巢窝位于髂内动脉与髂外动脉起始部之间的夹角处，是卵巢外侧面所贴靠的盆腔侧壁浅窝。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-a1002",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "输卵管最细的部位是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "输卵管漏斗",
      "输卵管子宫部",
      "输卵管壶腹",
      "输卵管腹腔口",
      "输卵管峡",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "输卵管峡",
        "输卵管峡部短而直、壁厚腔窄、血管分布少，是管腔最细的部分，输卵管结扎术常在此施行。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-a1003",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于子宫的叙述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "分为体、颈、峡三部分",
      "峡部在非妊娠期明显",
      "颈部全部位于阴道内",
      "子宫颈管通阴道",
      "子宫内腔即子宫腔",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "子宫颈管通阴道",
        "子宫分为底、体、颈三部分，内腔分为子宫腔与子宫颈管，子宫颈管下口（子宫口）通阴道。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-a1004",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "子宫腔呈",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "梭形",
      "椭圆形",
      "菱形",
      "圆形",
      "三角形",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "三角形",
        "子宫腔是子宫底和子宫体围成的内腔，呈前后扁的倒三角形，底及两侧角通输卵管，尖端向下续连子宫颈管。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-a1005",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "子宫圆韧带的作用是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "上提子宫底",
      "防止子宫向下脱垂",
      "牵引子宫颈向后",
      "维持子宫前倾",
      "防止子宫向两侧移位",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "维持子宫前倾",
        "子宫圆韧带起自子宫角的前下方，向前外侧经腹股沟管止于阴阜和大阴唇皮下，是维持子宫前倾位的主要韧带。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-a1006",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "手术时识别输卵管的标志是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "子宫阔韧带",
      "输卵管峡",
      "输卵管子宫部",
      "输卵管壶腹",
      "输卵管伞",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "输卵管伞",
        "输卵管腹腔口的边缘有许多细长的突起，称为输卵管伞，盖在卵巢表面，是寻找输卵管的标志。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-a1007",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列关于乳房的叙述，正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "每个乳腺叶有多条排泄管",
      "位于浅筋膜深面",
      "乳房悬韧带对乳房无任何作用",
      "乳腺叶有8~10个",
      "输乳管以乳头为中心呈放射状排列",
    ],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "输乳管以乳头为中心呈放射状排列",
        "乳腺被结缔组织分隔为15~20个乳腺叶，每个乳腺叶连接一条输乳管，乳腺手术切口宜以乳头为中心呈放射状以尽量减少对输乳管的损伤。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-a1008",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于卵巢的叙述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "上端连卵巢悬韧带",
      "位于卵巢窝内",
      "属于腹膜内位器官",
      "后缘借系膜连于子宫阔韧带",
      "下端连卵巢固有韧带",
    ],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "后缘借系膜连于子宫阔韧带",
        "卵巢前缘（而非后缘）借卵巢系膜连于子宫阔韧带，故该叙述错误；卵巢上端连卵巢悬韧带、下端连卵巢固有韧带均正确。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-a1009",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于子宫位置的叙述，错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "子宫下端位于坐骨棘平面以下",
      "位于盆腔中央",
      "位于膀胱与直肠之间",
      "两侧有输卵管和卵巢",
      "呈前倾前屈位",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "子宫下端位于坐骨棘平面以下",
        "正常子宫颈的下端位于坐骨棘平面的稍上方，而非其下方，故该叙述错误；其余关于子宫位置、毗邻及前倾前屈位的叙述均正确。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），4 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch8-female-reproductive-fill001",
    order: 13,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "子宫底和子宫体围成的内腔是____；子宫颈内腔称____。",
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
        "①子宫腔 ②子宫颈管",
        "子宫内腔分为上下两部：子宫底和子宫体围成的内腔称子宫腔，子宫颈的内腔称子宫颈管。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-fill002",
    order: 14,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "正常子宫呈____位。",
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
        "①前倾前屈",
        "当膀胱空虚时，正常成年人子宫呈轻度前倾前屈位；膀胱或直肠充盈程度会影响子宫的倾斜位置。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-fill003",
    order: 15,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "子宫阔韧带可分为____、____和____。",
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
        "①输卵管系膜 ②卵巢系膜 ③子宫系膜",
        "子宫阔韧带为三层腹膜皱襞，由外侧向内侧分为输卵管系膜、卵巢系膜和子宫系膜三部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-fill004",
    order: 16,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt: "环绕子宫颈阴道部形成的阴道穹可分为____、____和____；其中____部最深，与____相邻。",
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
        "①阴道前穹 ②阴道后穹 ③阴道侧穹 ④后 ⑤子宫直肠陷凹",
        "阴道上端宽阔，环绕子宫颈阴道部形成环形凹陷即阴道穹，分前部、后部和两个侧部；阴道穹后部最深，仅隔阴道壁和一层腹膜与直肠子宫陷凹（子宫直肠陷凹）相邻，可经此后穹引流积液。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 判断改错题 + 问答题（short-answer），5 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-human-anatomy-ch8-female-reproductive-short001",
    order: 17,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：卵巢位于盆腔左、右髂总动脉起始部的夹角处。",
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
        "错误；应将“左、右髂总动脉起始部”改为“髂内动脉与髂外动脉”",
        "卵巢位于卵巢窝内，即髂内动脉与髂外动脉起始部之间的夹角处，而并非位于左、右髂总动脉起始部的夹角处。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-short002",
    order: 18,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：子宫圆韧带起自子宫下外侧缘，止于盆腔侧壁。",
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
        "错误；应将“起自子宫下外侧缘，止于盆腔侧壁”改为“起自子宫角的前下方，止于阴阜和大阴唇的皮下”",
        "子宫圆韧带起自子宫角的前下方，经子宫阔韧带向前外侧进入腹股沟管，止于阴阜和大阴唇的皮下，用以维持子宫前倾。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-short003",
    order: 19,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "判断题（叙述正确者打“对”，错误者改正）：阴道前庭的前部有阴道口，后部有尿道口。",
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
        "错误；应将“前部有阴道口，后部有尿道口”改为“前部有尿道口，后部有阴道口”",
        "阴道前庭是两侧小阴唇之间的裂隙，其前部为尿道外口，后部为阴道口，原题前后恰恰相反。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-short004",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述卵巢和子宫的固定装置。",
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
        "卵巢固定装置：卵巢悬韧带、卵巢固有韧带、卵巢系膜；子宫固定装置：盆膈、尿生殖膈、子宫阔韧带、子宫圆韧带、子宫主韧带、子宫骶韧带及周围结缔组织",
        "卵巢借卵巢悬韧带（上端）、卵巢固有韧带（下端）和卵巢系膜（前缘）固定于盆侧壁；子宫的正常位置主要由盆膈、尿生殖膈和子宫阔韧带、子宫圆韧带、子宫主韧带、子宫骶韧带以及周围结缔组织等共同维持，其中子宫主韧带是防止子宫脱垂的主要结构，子宫骶韧带维持子宫前屈。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-human-anatomy-ch8-female-reproductive-short005",
    order: 21,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述输卵管的分部及其形态特点。",
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
        "输卵管分为四部：①子宫部：位于子宫壁内，管径最细，以输卵管子宫口通子宫腔；②峡部：短而直，壁厚腔窄，血管分布少，是结扎的常用部位；③壶腹部：粗而长，壁薄腔大，血供丰富、行程弯曲，约占全长的2/3，是受精部位；④漏斗部：为末端的膨大部分，末端中央有输卵管腹腔口开口于腹膜腔，腹腔口边缘有许多细长突起称输卵管伞",
        "输卵管是一对弯曲的肌性管道，全长行走于子宫阔韧带的上缘内。合格卵多自壶腹部受精，若受精卵在输卵管内发育则为宫外孕（异位妊娠）；卵巢排出的卵子由漏斗部的输卵管腹腔口进入输卵管。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题（子宫固定韧带），1 组 × 3 成员 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-human-anatomy-ch8-female-reproductive-b001",
    order: 22,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "子宫主韧带",
      "子宫阔韧带",
      "子宫圆韧带",
      "骶子宫韧带",
      "骨盆漏斗韧带",
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
        id: "ext-human-anatomy-ch8-female-reproductive-b001m1",
        order: 22,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "防止子宫脱垂的是",
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
            "子宫主韧带",
            "子宫主韧带又称子宫颈横韧带，自子宫颈连于盆侧壁，是防止子宫脱垂的主要结构。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch8-female-reproductive-b001m2",
        order: 23,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "维持子宫前倾的是",
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
            "子宫圆韧带",
            "子宫圆韧带起自子宫角的前下方，经腹股沟管止于阴阜和大阴唇皮下，是维持子宫前倾的主要韧带。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-human-anatomy-ch8-female-reproductive-b001m3",
        order: 24,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "限制子宫向两侧移位的是",
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
            "子宫阔韧带",
            "子宫阔韧带为自子宫两侧延伸至盆侧壁的双层腹膜皱襞，可限制子宫向两侧移位。",
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