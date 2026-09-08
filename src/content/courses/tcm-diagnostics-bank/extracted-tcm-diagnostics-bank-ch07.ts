import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 中医诊断学 — 第07知识单元 按诊 题库提取（分值源题底稿，全取并注明）
 * 来源：同学整理带答案材料（选择.pdf 18页扫描件 OCR + 6天背诵册原生文本）
 *
 * == 统计报告 ==
 * - 名词解释（term）：4 题
 * - 单选题（a1-single）：2 题（选项已随机重排并同步 correctChoiceIndex）
 * - 简答/问答（short-answer）：1 题
 * - 病案分析（case）：0 题
 * - B1 配伍题：0 组（本书无 B1/B2 型）
 * - 独立记分题合计：7 题（预算 B=7）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：单选题题号 112,113 全部收录，每题补全为 5 项选项。正确项对照选择.pdf
 *   页尾参考答案键号：112 手心热盛→内伤发热（键号 A），与第3天背诵内容「手足心热甚多
 *   内伤发热」一致；113 扪按虚里→了解宗气之强弱（键号 C），与第3天背诵内容「虚里为
 *   宗气之外候」一致。两根键号均与中医诊断学医学语义吻合，无 OCR 冲突、无需归位。
 *   名词解释取材第3天背诵内容（按诊核心背诵+名词解释速背清单中的 虚里/癥积/瘕聚，
 *   另补 按诊 概念定义）；简答题取自第3天 核心简答大题第6题（项目整理标准答案）。
 *   OCR 错字已按中医诊断学医学语义恢复（按诊手法相关术语等），数值与单位保留原值，
 *   未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "tcm-diagnostics-bank-ch07-anzhen";
const locatorBase =
  "《中医诊断学》题库底稿（同学整理带答案材料/6天背诵册） 第07知识单元 按诊";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的同学整理带答案材料（含 OCR 恢复），答案以教材为准";
const answerNotice =
  "答案依据源参考答案/标准答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），4 道（虚里/癥积/瘕聚/按诊） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch07-anzhen-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：虚里",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第3天背诵内容及答案（按诊核心背诵/名词解释速背清单，项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "虚里是左乳下第四、五肋间、乳头下稍内侧的心尖搏动处，为宗气之外候。",
        "按虚里可察宗气之强弱：搏动不显露、按之应手、动而不紧、节律清楚为常；搏动微弱多宗气虚弱、心肺气虚；搏动强烈或范围扩大可见心阳亢盛、外感热病或宗气外泄。第3天背诵内容及答案·按虚里与胸胁、名词解释速背清单。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch07-anzhen-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：癥积",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第3天背诵内容及答案（脘腹按诊/名词解释速背清单，项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "癥积是腹内肿块固定不移、痛有定处的病证，病属血分，多由血瘀所致。",
        "癥与瘕相对：癥固定不移、痛有定处、属血分（多血瘀）；瘕推之可移、聚散不定、属气分（多气滞）。口诀「癥固定、痛定、属血」。第3天背诵内容及答案·脘腹按诊、名词解释速背清单。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch07-anzhen-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：瘕聚",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第3天背诵内容及答案（脘腹按诊/名词解释速背清单，项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "瘕聚是腹内肿块推之可移、聚散不定、痛无定处的病证，病属气分，多由气滞所致。",
        "瘕与癥相对：瘕可移、聚散不定、属气分（多气滞）；癥固定不移、痛有定处、属血分（多血瘀）。口诀「瘕可移、聚散、属气」。第3天背诵内容及答案·脘腹按诊、名词解释速背清单。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch07-anzhen-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：按诊",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第3天背诵内容及答案（按诊核心背诵·概念、手法和顺序）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "按诊是医生用手直接触摸、按压、叩击患者身体有关部位，以了解局部寒热、润燥、疼痛、肿胀、肿块及脏腑虚实的诊察方法。常用手法有触法、摸法、按法、叩法。",
        "触法以手掌轻触、滑动辨肌肤寒热润燥；摸法稍用力寻抚辨感觉、病位与浅表肿块；按法重手按压辨深部压痛、肿块与脏腑虚实；叩法依叩击音、波动感判断病变。按诊顺序由轻到重、由浅入深、先远后近、先上后下，腹部一般先按无痛处、后按痛处。第3天背诵内容及答案·按诊核心背诵（概念、手法和顺序）。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 单选题（a1-single），2 道（选择.pdf 题号 112、113） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch07-anzhen-a1001",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "按诊时若手心热盛者，多为",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号112（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字按医学语义恢复",
      sourceIds: [],
    },
    choices: ["外感发热", "内伤发热", "阴虚发热", "肝郁发热", "气虚发热"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "内伤发热",
        "按诊辨手足：手足心热甚者多内伤发热，手足背热甚者多外感发热；额热甚于手心为表热，手心热甚于额为里热。本题参照选择.pdf 题号112参考答案键号 A（内伤发热），与第3天背诵内容「手足心热甚→多内伤发热」一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch07-anzhen-a1002",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "按诊扪按虚里搏动，可以了解（ ）之强弱。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号113（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["胃气", "宗气", "肺气", "心气", "阳气"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "宗气",
        "虚里为左乳下第四、五肋间心尖搏动处，是宗气之外候，故扪按虚里可了解宗气之强弱；搏动微弱多宗气虚弱，搏动强烈或范围扩大可见宗气外泄等。本题参照选择.pdf 题号113参考答案键号 C（宗气），与第3天背诵内容「虚里为宗气之外候」一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答/问答（short-answer），1 道（第3天 核心简答大题第6题） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch07-anzhen-short001",
    order: 7,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "试述按诊中腹部虚实、癥瘕以及水肿与气肿如何鉴别。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第3天背诵内容及答案 核心简答大题第6题（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "腹部虚实：腹痛喜按、按之痛减、腹壁柔软多属虚证（如脾胃气虚、阳虚）；腹痛拒按、按之痛甚、腹部硬满多属实证（如食积、胃肠实热、瘀血）。腹满按之充实、有抵抗、拒按为实满；腹满按之柔软、无压痛、喜按为虚满。癥瘕：肿块固定不移、痛有定处为癥积，病属血分（多血瘀）；肿块推之可移、聚散不定、痛无定处为瘕聚，病属气分（多气滞）。水肿与气肿：肿胀按之凹陷、不能即起为水肿；按之凹陷、举手即起为气肿、气胀。",
        "本题综合按压脘腹的三类鉴别，均基于按诊（腹）软硬、喜按拒按、肿块固定性及凹陷恢复速度判断；腹水可按腹部膨隆、波动感与叩之浊音移动辨别。口诀「癥固定、痛定、属血；瘕可移、聚散、属气」。第3天背诵内容及答案 核心简答大题第6题。",
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