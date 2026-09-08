import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 神经病学学习指导与习题集（第3版）— 第7章 神经系统疾病的诊断原则 题库提取（等比取样）
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 选择题（a1-single）：1 题（含 A2 病例题、A3/A4 病例串题）
 * - 问答题（short-answer）：4 题（含简答、论述）
 * - 病例分析题（case）：0 题
 * - B1 配伍题：0 组、共 0 个成员
 * - 独立记分题合计：5 题（须等于本文件预算 5）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型 10、简答题 2、论述题 2，无 A2/A3/A4/B1/病例分析题。
 *   本文件按 5 道预算在原书顺序内取材：简答与论述全取（4 道），A1 取第 1 题。正确项
 *   逐一对齐章末参考答案键号。OCR 错字与双栏错序已按神经病学医学语义恢复，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "neurology-ch07-diagnostic-principles";
const locatorBase =
  "《神经病学学习指导与习题集》第3版 第7章 神经系统疾病的诊断原则 习题（核对PDF 第121–124页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** A1/A2/A3-A4 型选择题（统一映射为 a1-single），1 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch07-diagnostic-principles-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "以下关于神经系统几类主要疾病的临床特点的描述正确的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "变性病起病通常迅猛，呈进行性加重",
      "脑血管病通常起病较缓，症状逐渐加重",
      "中枢神经系统肿瘤通常起病缓慢，病情呈进行性加重，但也可以发展迅速，病程较短",
      "代谢和营养障碍性疾病常发病缓慢，不会急性发病",
      "脱髓鞘疾病常慢性起病，有缓解和复发倾向",
    ],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "中枢神经系统肿瘤通常起病缓慢，病情呈进行性加重，但也可以发展迅速，病程较短",
        "中枢神经系统肿瘤通常起病缓慢、进行性加重，但部分肿瘤（如某些恶性程度高的肿瘤）也可以发展迅速、病程较短；脑血管病通常起病急骤而非较缓，变性病起病隐匿、进行性加重而非迅猛，脱髓鞘疾病常急性或亚急性起病且有缓解复发倾向，代谢和营养障碍性疾病也可急性发病。原书 A1 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer，含简答、论述），4 道 */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch07-diagnostic-principles-short001",
    order: 2,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "从定性诊断的角度上神经系统疾病主要分为哪几大类？",
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
        "神经系统疾病的八大类",
        "从定性诊断的角度上神经系统疾病主要分为：①脑血管病；②感染性疾病；③变性病；④外伤；⑤中枢神经系统肿瘤；⑥脱髓鞘疾病；⑦代谢和营养障碍性疾病；⑧中毒和遗传性疾病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch07-diagnostic-principles-short002",
    order: 3,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述如何进行神经系统定位诊断。",
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
        "神经系统定位诊断的步骤",
        "神经系统定位诊断根据疾病所表现的神经系统症状和体征，结合神经解剖、神经生理和神经病理等方面的知识，来确定神经系统病变所在的部位。可以先根据其病损范围明确病变的空间分布，为局灶性、多灶性、弥漫性还是系统性病变；之后进一步明确其具体部位，是大脑、脑干、小脑、脊髓还是周围神经、肌肉等病变。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch07-diagnostic-principles-short003",
    order: 4,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "详述脊髓疾病的表现特点。",
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
        "脊髓疾病的表现特点",
        "脊髓横贯性损害常有受损部位以下的运动、感觉及括约肌三大功能障碍，呈完全的或不完全的截瘫或四肢瘫、传导束型感觉障碍和尿便功能障碍。可根据感觉障碍的最高平面、运动障碍、深浅反射的改变和自主神经功能的障碍，大致确定脊髓损害的范围。脊髓的单侧损害，可出现脊髓半切损害综合征，表现为病变平面以下对侧痛、温觉减退或丧失，同侧上运动神经元性瘫痪和深感觉减退或丧失。脊髓的部分性损害可仅有锥体束和前角损害症状如肌萎缩侧索硬化症，亦可仅有锥体束及后索损害症状如亚急性脊髓联合变性，或可因后角、前联合受损仅出现节段性痛觉和温度觉障碍，但轻触觉保留，呈分离性感觉障碍，如脊髓空洞症。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch07-diagnostic-principles-short004",
    order: 5,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "神经系统疾病部位按病损范围的分类并作举例说明。",
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
        "按病损范围对神经系统疾病的分类",
        "神经系统的病变，根据其病损范围可分局灶性、多灶性、弥漫性和系统性病变。局灶性病变指只累及神经系统的单一局限部位，如面神经麻痹、尺神经麻痹、脊髓肿瘤等。多灶性病变指病变分布在两个或两个以上的部位，如多发性硬化、视神经脊髓炎等。弥漫性病变常比较广泛侵犯中枢和（或）周围神经系统、肌肉，如中毒性脑病、病毒性脑炎等。系统性病变指病变选择性地损害某一特定功能解剖系统或传导束，如肌萎缩性侧索硬化症、亚急性脊髓联合变性等。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例分析题（case），0 道 */
const caseItems: readonly AssessmentItemDefinition[] = [];

/** B1 共用备选答案配伍题，0 组（本章无 B1 型题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...a1Items,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
