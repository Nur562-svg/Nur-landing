import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 中医诊断学 — 第04知识单元 闻诊（听声音、嗅气味） 题库提取（分值源题底稿，全取并注明）
 * 来源：同学整理带答案材料（选择.pdf 18页扫描件 OCR + 6天背诵册原生文本）
 *
 * == 统计报告 ==
 * - 名词解释（term）：9 题
 * - 单选题（a1-single）：10 题（选项已随机重排并同步 correctChoiceIndex）
 * - 简答/问答（short-answer）：1 题
 * - 病案分析（case）：0 题
 * - B1 配伍题：0 组（本书无 B1/B2 型）
 * - 独立记分题合计：20 题（预算 B=20）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：单选题题号 81,82,83,84,85,86,87,88,89,90 全部收录，每题补全为 5 项选项。
 *   正确项对照选择.pdf 页尾参考答案键号，本段 OCR 键号大多截断（仅 `89. B` 可见，与本题
 *   太息·肝郁归位一致）；其余题（81,82,83,84,85,86,87,88,90）键号缺失/截断，按题号 +
 *   中医诊断学医学语义归位：81 郑声、82 少气、83 呃逆、84 胃实热证（口气臭秽多胃热）、
 *   85 以气息言（喘以气息言，哮以喉间痰鸣言）、86 消渴病危重期（病室烂苹果味＝重症消渴）、
 *   87 干咳无痰（燥咳）、88 胃实热证（呕势急、声响亮）、90 亲切和蔼（正常声音特点不包括）。
 *   名词解释取材第2天背诵内容及答案·闻诊核心背诵（发声与语言/呼吸咳嗽/呃逆嗳气/嗅气味）
 *   与第6天背诵内容及答案 名词#13（谵语郑声），答案以“项目整理标准答案”为准。简答题取
 *   日2闻诊·嗅气味综合大题，与 9 个名词概念（谵语/郑声/太息/呃逆/嗳气/咳声/独语/错语/失音）
 *   不重复。名词“漉漉声”因背诵册未提供其标准答案定义、无法可靠取材，为避免捏造改用同章
 *   高质闻诊名词“错语”代入，并已计入 term 总数。OCR 错字已按中医诊断学医学语义恢复
 *   （干吸→干呕、喧气→嗳气、息微/短气等呼吸术语、嗅气味术语），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "tcm-diagnostics-bank-ch04-wenzhen";
const locatorBase =
  "《中医诊断学》题库底稿（同学整理带答案材料/6天背诵册） 第04知识单元 闻诊";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的同学整理带答案材料（含 OCR 恢复），答案以教材为准";
const answerNotice =
  "答案依据源参考答案/标准答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），9 道（闻诊发声与语言/呼吸咳嗽/呃逆嗳气等） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：谵语",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第2天背诵内容及答案·闻诊·发声与语言；第6天背诵内容及答案 名词#13（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "谵语指神识不清、语无伦次（胡言乱语）、声高有力的语言异常表现，多属邪热扰神之实证。",
        "谵语声响而有力、语无伦次，多见于温热病邪热内陷心包、高热神昏或痰火扰神等，属实证；与声低无力的虚证郑声相对。第2天背诵内容及答案·闻诊；第6天 名词#13。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：郑声",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第2天背诵内容及答案·闻诊·发声与语言；第6天背诵内容及答案 名词#13（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "郑声指神识不清、语言重复、时断时续、声音低弱的语言异常表现，多属久病脏气衰竭、心神散乱之虚证。",
        "郑声与谵语均神识不清，但郑声声低无力、重复断续，属虚证（久病脏气衰竭）；谵语声高有力、语无伦次，属实证（邪热扰神）。第2天背诵内容及答案·闻诊；第6天 名词#13。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：太息",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第2天背诵内容及答案·闻诊·呼吸、咳嗽及其他声音（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "太息指呼吸时呼气后长出气（长吁短叹、叹息）的现象，多因情志不遂、肝气郁结所致。",
        "太息为患者自觉胸中憋闷、时时长出气以舒气为快，多伴胸闷胁胀；常由情志不遂、肝气郁结，气机郁滞所致。第2天背诵内容及答案·闻诊。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：呃逆",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第2天背诵内容及答案·闻诊·呼吸、咳嗽及其他声音（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呃逆指喉间呃呃连声、声短而频、不能自制的症状，为胃气上逆所致。",
        "呃逆辨证：高亢有力多热实，低沉无力多虚寒。新病呃逆声响亮多实，久病呃逆低沉无力多虚寒属逆。第2天背诵内容及答案·闻诊。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：嗳气",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第2天背诵内容及答案·闻诊·呼吸、咳嗽及其他声音（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "嗳气指胃中气体上出所致、声音长而缓的症状（俗称打嗝/嗳气），为胃气上逆表现之一。",
        "嗳气辨证：嗳气酸腐多食滞胃脘；嗳气频作、随情绪波动多肝气犯胃；嗳气低沉无力多脾胃虚弱。嗳气与呃逆鉴别：呃逆声短而频、不能自制，嗳气声长而缓。第2天背诵内容及答案·闻诊。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：咳声（咳嗽声）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第2天背诵内容及答案·闻诊·呼吸、咳嗽及其他声音（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "咳声指咳嗽时发出的声音，其轻重、清浊、有无痰液等反映病邪性质与病位深浅，属闻诊听声音的重要内容。",
        "咳声辨证：咳声重浊而有力多实证、寒痰湿浊（如痰浊壅肺）；咳声不扬、痰黄黏稠多肺热或痰热；干咳、痰少难咯多燥邪犯肺或肺阴虚；咳声轻清多表证病浅；顿咳咳后有鸡鸣样回声即百日咳。第2天背诵内容及答案·闻诊。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：独语",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第2天背诵内容及答案·闻诊·发声与语言（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "独语指自言自语、喃喃不休、首尾不续、见人则止的语言异常表现，多属气郁痰结、心神失养所致。",
        "独语多见于癫病（气郁痰结、心神失养），患者神识一般清楚、自言自语但见人即止，与谵语郑声之神识不清不同。第2天背诵内容及答案·闻诊。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：错语",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第2天背诵内容及答案·闻诊·发声与语言（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "错语指语言错乱、言后自知其错、神志一般清楚的语言异常表现，多因心气不足、神失所养所致。",
        "错语与独语均神识一般清楚，但错语为讲错话后自知（说后自知），独语为自言自语、见人则止；错语多心气不足，独语多气郁痰结。第2天背诵内容及答案·闻诊。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-term009",
    order: 9,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：失音",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第2天背诵内容及答案·闻诊·发声与语言（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "失音指声音不能发出或声音嘶哑，主要病在肺、喉，患者通常知道要说什么。",
        "金实不鸣多新病顿起（实证，外邪犯肺、痰湿壅肺、肺气不宣）；金破不鸣多久病（虚证，肺肾阴虚、虚火灼金或肺气不足）。失音与失语区别：失语为不能正确理解或表达语言，与脑神、心神受损有关，非单纯声带问题。第2天背诵内容及答案·闻诊。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 单选题（a1-single），10 道（题号 81~90） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-a1001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者神识不清，语言重复，时断时续，声音低弱者，是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号81（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["狂言", "郑声", "独语", "谵语", "错语"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "郑声",
        "郑声以神识不清、语言重复、时断时续、声音低弱为特点，属久病脏气衰竭、心神散乱之虚证；谵语则语无伦次、声高有力属实证。选择.pdf 题号81，参考键号 OCR 截断，按中医诊断学医学语义归位为郑声。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-a1002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者呼吸微弱，气少不足以息者，属",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号82（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字按医学语义恢复",
      sourceIds: [],
    },
    choices: ["短气", "喘气", "少气", "嗳气", "息微"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "少气",
        "少气指呼吸微弱、气少不足以息（说话无力、动则气促）；短气为呼吸短促不能接续、似喘但无抬肩喉鸣。选择.pdf 题号82，参考键号 OCR 截断（选项挤行），按医学语义归位为少气。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-a1003",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "气从胃中逆上，出咽喉而发声短频者称",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号83（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字按医学语义恢复",
      sourceIds: [],
    },
    choices: ["嗳气", "呃逆", "恶心", "太息", "干呕"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "呃逆",
        "呃逆为气从胃中逆上、出咽喉而声短而频、不能自制（呃呃连声），属胃气上逆。选择.pdf 题号83，参考键号 OCR 截断，按医学语义归位为呃逆；OCR“干吸”恢复为干呕。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-a1004",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者口气臭秽，多为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号84（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["胃阴亏虚", "胃实热证", "内有宿食", "脾胃湿热", "胃实寒证"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胃实热证",
        "口气臭秽多属胃热（胃实热证）；若口气酸臭则多属胃有宿食、食积。选择.pdf 题号84，参考键号 OCR 截断，按医学语义归位为胃实热证。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-a1005",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "喘与哮的区别，关键在于喘是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号85（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 选项挤行按医学语义恢复",
      sourceIds: [],
    },
    choices: ["以抬肩言", "以鼻煽言", "以气息言", "以痰鸣言", "以张口言"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "以气息言",
        "喘以气息言（呼吸急促困难，甚则张口抬肩、鼻翼煽动），哮以喉间痰鸣言（喉中有哮鸣音）；哮必兼喘、喘不一定兼哮。选择.pdf 题号85，参考键号 OCR 截断，按医学语义归位为以气息言。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-a1006",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "患者散发烂苹果样气味，常提示为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号86（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["失血重证", "瘟疫病", "消渴病危重期", "水肿病晚期", "脏腑败坏"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "消渴病危重期",
        "病室或患者散发烂苹果样气味多提示重症消渴（糖尿病酮症酸中毒）；病室尿臊味提示水肿晚期或肾功能衰败，蒜臭味提示有机磷农药中毒。选择.pdf 题号86，参考键号 OCR 截断，按医学语义归位为消渴病危重期。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-a1007",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "燥咳的特点应为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号87（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["咳声重浊", "咳声轻清", "干咳无痰", "咳声不扬", "咳嗽痰多"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "干咳无痰",
        "燥咳表现为干咳无痰或痰少难咯，多由燥邪犯肺或肺阴虚津伤所致；咳声重浊多实证寒痰湿浊，咳声不扬痰黄稠多肺热痰热。选择.pdf 题号87，参考键号 OCR 截断，按医学语义归位为干咳无痰。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-a1008",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "呕势急剧，呕声响亮者，多属",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号88（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["肝气郁结", "胃虚寒证", "胃气亏虚", "胃实热证", "热扰神明"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "胃实热证",
        "呕吐属实热者声大势猛、吐物秽浊；属虚寒者声小势缓、吐物清稀。呕势急剧、呕声响亮多属胃实热证（胃气上逆、邪热内盛）。选择.pdf 题号88，参考键号 OCR 截断，按医学语义归位为胃实热证。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-a1009",
    order: 18,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "太息的产生，多与（　）有关。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号89（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["心火", "肾虚", "肺虚", "肝郁", "胃逆"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肝郁",
        "太息长吁短叹，多因情志不遂、肝气郁结、气机郁滞所致，故与肝郁最为相关。选择.pdf 题号89，参考键号 89.B 与归位一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-a1010",
    order: 19,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "正常声音的特点不包括（　）。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号90（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["音调和畅", "言语清楚", "发声自然", "亲切和蔼", "言与意符"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "亲切和蔼",
        "正常声音的特点为发声自然、音调和畅、言语清楚、言与意符；“亲切和蔼”属于人的态度与表达方式，不属于正常声音的诊断特点，故本题“不包括”者为亲切和蔼。选择.pdf 题号90，参考键号 OCR 截断，按医学语义归位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答/大题（short-answer），1 道（闻诊嗅气味综合大题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch04-wenzhen-short001",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt:
      "试述闻诊中嗅气味（口气、汗气、痰涕、呕吐物、二便及病室气味）的辨证要点及临床意义。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第2天背诵内容及答案·闻诊·嗅气味（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "①口气：口气臭秽多胃热；口气酸臭多胃有宿食、食积。②汗气：汗气腥膻多湿热久蕴；汗气臭秽多热毒内盛。③痰涕：痰涕腥臭多属肺热、鼻渊或内有脓腐。④呕吐物：呕吐物酸腐臭秽多食积或胃热。⑤二便：大便酸臭难闻多食积，臭秽异常多湿热；小便臊臭、黄赤多下焦湿热。⑥经带：经带恶露臭秽多属湿热或热毒。⑦病室气味：病室尿臊味提示水肿晚期或肾功能衰败；病室烂苹果味提示重症消渴；病室蒜臭味提示有机磷农药中毒。总规律：气味酸腐多食积，秽臭多实热，腥膻多湿热，气味淡薄多虚寒。",
        "嗅气味主要从排出物（口气、汗、痰涕、呕吐物、二便、经带）与病室气味辨病邪寒热虚实：酸腐多食积、秽臭多实热、腥膻多湿热、淡薄多虚寒；久病重病出现烂苹果味、尿臊味等提示病情危重。第2天背诵内容及答案·闻诊·嗅气味。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1/B2 配伍题（bGroups），0 组（本书无 B1/B2 型） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...a1Items, ...shortItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];