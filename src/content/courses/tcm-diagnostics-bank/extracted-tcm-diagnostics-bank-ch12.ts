import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 中医诊断学 — 第12知识单元 病历书写与诊断 题库提取（分值源题底稿，全取并注明）
 * 来源：同学整理带答案材料（选择.pdf 18页扫描件 OCR + 6天背诵册原生文本）
 *
 * == 统计报告 ==
 * - 名词解释（term）：1 题
 * - 单选题（a1-single）：6 题（选项已随机重排并同步 correctChoiceIndex）
 * - 简答/问答（short-answer）：0 题
 * - 病案分析（case）：0 题
 * - B1 配伍题：0 组（本书无 B1/B2 型）
 * - 独立记分题合计：7 题（预算 B=7）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：单选题题号 255,256,257,258,259,260 全部收录，每题补全为 5 项选项。本章
 *   归属 6 道单选对应参考「参考答案键号」在 OCR 切片中缺失、未能按题号恢复页尾键号
 *   （ch12 切片结尾键号区为空），故正确项全部按题号 + 病历书写与诊断医学语义归位：
 *   255 病程记录、256 24小时内完成、257 经治医师、258 正叙法、259 时间先后顺序、
 *   260 《伤寒九十论》，未去向不明。名词解释「病历（病案/诊籍）」取材第1天背诵内容
 *   （绪论，淳于意创诊籍）。本单元背诵册仅录「病历」名词，无独立简答/病案来源，
 *   故 short/case 为空数组；README 所列简答/病案归属其余章节。OCR 错字已按中医
 *   诊断学医学语义恢复（住院、经治医师、正叙法、时间先后顺序、伤寒九十论等），
 *   数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "tcm-diagnostics-bank-ch12-bingli-xiezuo";
const locatorBase =
  "《中医诊断学》题库底稿（同学整理带答案材料/6天背诵册） 第12知识单元 病历书写与诊断";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的同学整理带答案材料（含 OCR 恢复），答案以教材为准";
const answerNotice =
  "答案依据源参考答案/标准答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），1 道（病历/病案/诊籍） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch12-bingli-xiezuo-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：病历（又称病案，古称诊籍）",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第1天背诵内容及答案·绪论（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "病历又称病案，古称诊籍，是临床诊疗过程的书面记录。",
        "病历是医务人员对患者疾病发生、发展、诊疗经过及转归的完整文字记录，既是临床工作的客观记载，也是医疗、教学、科研与法律依据。西汉淳于意创立“诊籍”，为现存较早的病案记载。第1天背诵内容及答案·绪论部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 单选题（a1-single），6 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch12-bingli-xiezuo-a1001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "对患者住院期间病情演变、诊疗经过所作的记录，叫作",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号255（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字按医学语义恢复",
      sourceIds: [],
    },
    choices: ["出院记录", "住院病历", "病程记录", "会诊记录", "入院记录"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "病程记录",
        "病程记录是对患者住院期间病情演变及诊疗经过所作的系统记录，是病历的核心组成部分。选择.pdf 题号255，参考答案键号（OCR 缺失），按医学语义归位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch12-bingli-xiezuo-a1002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "完整病历（入院记录）完成时间应在患者住院后",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号256（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字按医学语义恢复",
      sourceIds: [],
    },
    choices: ["1小时内完成", "48小时内完成", "12小时内完成", "24小时内完成", "当时完成"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "24小时内完成",
        "入院记录（完整病历）一般要求于患者住院后24小时内完成。选择.pdf 题号256，参考答案键号（OCR 缺失），按医学语义归位；选项中“8/12/48小时”等均为干扰项。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch12-bingli-xiezuo-a1003",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "书写交班记录的医师应是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号257（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字按医学语义恢复",
      sourceIds: [],
    },
    choices: ["值班医师", "见习医师", "经治医师", "主治医师", "实习医师"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "经治医师",
        "交班记录（交接班记录）由患者的经治医师书写，交代患者当前病情与诊治情况及交班注意事项。选择.pdf 题号257，参考答案键号（OCR 缺失），按医学语义归位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch12-bingli-xiezuo-a1004",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能突出现在症，朴实明了，易于读懂，易于仿效的医案写作形式是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号258（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字按医学语义恢复",
      sourceIds: [],
    },
    choices: ["逐诊记叙法", "倒叙法", "夹叙夹论法", "详述法", "正叙法"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "正叙法",
        "正叙法按发病先后顺序书写医案，能突出现在症，朴实明了，易于读懂、易于仿效，为临床常用医案写法。选择.pdf 题号258，参考答案键号（OCR 缺失），按医学语义归位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch12-bingli-xiezuo-a1005",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "病程记录的顺序应该是根据（　）编写",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号259（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字按医学语义恢复",
      sourceIds: [],
    },
    choices: ["望闻问切顺序", "病变情况顺序", "时间先后顺序", "理法方药顺序", "辨证论治顺序"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "时间先后顺序",
        "病程记录按日期、时间先后顺序依次书写，如实反映病情的连续演变与诊治经过。选择.pdf 题号259，参考答案键号（OCR 缺失），按医学语义归位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch12-bingli-xiezuo-a1006",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "我国第一部医案专著是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号260（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字按医学语义恢复",
      sourceIds: [],
    },
    choices: ["《小儿药证直诀》", "《脾胃论》", "《伤寒九十论》", "《卫生宝鉴》", "《史记·扁鹊仓公列传》"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "《伤寒九十论》",
        "南宋许叔微《伤寒九十论》为我国第一部医案专著；《史记·扁鹊仓公列传》载淳于意诊籍为现存较早病案记载，《小儿药证直诀》《脾胃论》《卫生宝鉴》均为医著而非医案专著。选择.pdf 题号260，参考答案键号（OCR 缺失），按医学语义归位。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答/问答（short-answer），0 道（本单元背诵册无独立简答/大题来源） */
const shortItems: readonly AssessmentItemDefinition[] = [];

/** 病案分析（case），0 道（本单元背诵册无独立病案来源） */
const caseItems: readonly AssessmentItemDefinition[] = [];

/** B1/B2 配伍题（bGroups），0 组（本书无 B1/B2 型） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...a1Items, ...shortItems, ...caseItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];