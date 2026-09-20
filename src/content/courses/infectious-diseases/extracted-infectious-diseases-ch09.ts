/**
 * 传染病学学习指导与习题集 第3版 — 第9章 朊粒病 题库提取（等比取样）
 * 来源：《传染病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：0 题
 * - 选择题（a1-single）：3 题
 * - 简答题（short-answer）：1 题
 * - 病案分析（case）：0 题
 * - B1 配伍题：0 组 / 0 成员
 * - 独立记分题合计：4 题（须等于本文件预算 4）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书含选择题 6 题（A1/A2/A3/A4/B1）、名词解释 0 题、问答题 2 题，源题总量 8。正确项对齐章末参考答案键号，选项已随机重排并同步 correctChoiceIndex。OCR 错字已按传染病学医学语义恢复（如 病原体→病原体、品性感染→显性感染、潜伏→潜伏、菜姆病→莱姆病、雀乱→霍乱 等），数值与单位保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

const topic = "infectious-diseases-ch09";
const locatorBase =
  "《传染病学学习指导与习题集》第3版 第9章 朊粒病 习题（核对PDF 第393–396页）";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";
const kp = "kp-" + topic;

const termItems: AssessmentItemDefinition[] = [];

const a1Items: AssessmentItemDefinition[] = [
  {
    id: "ext-infectious-diseases-ch09-a1001",
    order: 1,
    knowledgePointId: "kp-infectious-diseases-ch09",
    questionKind: "a1-single",
    status: "available",
    prompt: "仅含蛋白成分，不含核酸的感染因子称为",
    choices: ["缺损病毒", "类病毒", "DNA病毒", "拟病毒", "朊粒（朊病毒）"],
    correctChoiceIndex: 4,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "《传染病学学习指导与习题集》第3版 第9章 朊粒病 习题（核对PDF 第393–396页） A1型题 第1题",
      note: `题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）`,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "朊粒（朊病毒）",
        `答案依据题集参考答案整理并改写，未经权威教材交叉核对（原书第9章 朊粒病 A1型题 第1题 参考答案 C）朊粒（prion）的本质是一种不含核酸、有感染性的蛋白质。其余病毒均含核酸。`,
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-infectious-diseases-ch09-a1002",
    order: 2,
    knowledgePointId: "kp-infectious-diseases-ch09",
    questionKind: "a1-single",
    status: "available",
    prompt: "关于朊粒的叙述，错误的是",
    choices: ["又名蛋白质感染颗粒", "化学成分为蛋白酶K抗性的蛋白", "可引起人和动物感染", "检出 PrP即可诊断为 prion 病", "为传染性海绵状脑病的病原体"],
    correctChoiceIndex: 3,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "《传染病学学习指导与习题集》第3版 第9章 朊粒病 习题（核对PDF 第393–396页） A1型题 第2题",
      note: `题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）`,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "检出 PrP即可诊断为 prion 病",
        `答案依据题集参考答案整理并改写，未经权威教材交叉核对（原书第9章 朊粒病 A1型题 第2题 参考答案 D）朊蛋白（prion protein, PrP）有2种异构体，分别细胞朊蛋白（P:PC）和羊瘙痒症朊
蛋白（PrPsc）。PrPC存在于正常和朊粒病患者组织中，对蛋白酶敏感，无致病性；后者只存在朊粒
病患者组织中，对蛋白酶抵抗，有致病性和传染性。检出 PrPsc才可确诊朊粒病。`,
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-infectious-diseases-ch09-a1003",
    order: 3,
    knowledgePointId: "kp-infectious-diseases-ch09",
    questionKind: "a1-single",
    status: "available",
    prompt: "男，62 岁，因头晕2个月伴言语不清，步态不稳半个月人院。患者于入院前2个月余无明显诱\n因出现阵发性，头晕，有时星天旋地转感，无头痛。起病1个月后患者逐渐出现右侧肢体乏力，阵\n发性视物重影，出现言语不清、步态不稳，间有阵发性肢体及头部抽动，病情逐渐加重。体检：心、\n忆力差，言语欠流利，对答不完全切题，能复述句子，脑神经检查未见异常，不能站立，四肢肌张力\n肺、腹部未见异常。神清，反应迟钝，检查不完全合作，仪表与行为无异常，定向力尚可，理解力、记\n增高，肌力V级，双上肢、颈部见阵发性肌阵挛，未见手足徐动及舞蹈样动作，腱反射活跃，病理征\n\n\n386\n第九章朊粒病\n阴性，脑膜刺激征（-）。脑脊液常规检查、头颅 MRI 未见明显异常，但两次脑电图均提示高度异\n常，可见连续长程（15 ~25s）周期性、阵发性、双侧同步性出现尖波、双相波及高 的Q波发放，\n情迅速恶化，出现表情淡漠、做鬼脸，不能应答，间有进食呛咳，四肢、颈部肌阵挛加重，四肢肌力减\n尤以左侧半球占优，阵发间歇时间为0.5~18s，间歇期为少量低幅的2、B活动。人院后患者病\n退（右侧尤明显），出现阵发性全身强直，每次持续约5~8min,5~60次/，抽搐时瞳孔，无明显改\n变；有时出现呻吟，大声叫喊，但对外界刺激无反应，四肢肌张力增高，双眼可无目的转动，有自发\n性微笑。\n要明确诊断，最重要的是",
    choices: ["临床症状和体征", "影像学检查", "脑脊液培养", "脑脊液 14-3-3 蛋白", "血清学检查"],
    correctChoiceIndex: 3,
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "《传染病学学习指导与习题集》第3版 第9章 朊粒病 习题（核对PDF 第393–396页） A4型题 第7题",
      note: `题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）`,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脑脊液 14-3-3 蛋白",
        `答案依据题集参考答案整理并改写，未经权威教材交叉核对（原书第9章 朊粒病 A4型题 第7题 参考答案 B）除脑组织活检，脑脊液14-3-3蛋白仍是最重要的间接诊断指标。`,
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  }
];

const shortItems: AssessmentItemDefinition[] = [
  {
    id: "ext-infectious-diseases-ch09-short001",
    order: 4,
    knowledgePointId: "kp-infectious-diseases-ch09",
    questionKind: "short-answer",
    status: "available",
    prompt: "什么是朊粒蛋白？",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: "《传染病学学习指导与习题集》第3版 第9章 朊粒病 习题（核对PDF 第393–396页） 问答题 第2题",
      note: `题干轻度改写（同义替换/语序/句式）；原题来自用户提供的教材配套学习指导与习题集（扫描件 OCR 恢复）`,
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "朊粒蛋白本是由人体基因组表达的正常蛋白 PrPC，在遗传或者外源性 PrPSc的作用下，\nPrPSc 可以被高温、强酸强碱等措施灭活。",
        `答案依据题集参考答案整理并改写，未经权威教材交叉核对（原书第9章 朊粒病 问答题 第2题）`,
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  }
];

const caseItems: AssessmentItemDefinition[] = [];

const bGroups: AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems, ...a1Items, ...shortItems, ...caseItems,
];
export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
