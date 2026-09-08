import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第43章 四环素类及氯霉素类 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：3 题
 * - 选择题（a1-single）：2 题（A1 型；A2 型病例题因预算未纳入）
 * - 问答题（short-answer）：2 题（含简答、论述）
 * - B1 配伍题：0 组（本章原书 2 组共 4 小题，完整组超出剩余预算，未取样）
 * - 独立记分题合计：9 题（须等于本文件预算 9）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、填空题 3、选择题（A1 型 12 + A2 型 2 +
 *   B1 型 2 组共 4 小题）与简答题 4；本文件按 9 道预算取材：名词解释全取、
 *   填空题全取、A1 型题取第 1–2 题、简答题取第 1–2 题；A1 型题第 3–12 题、
 *   A2 型题（13–14）、B1 型题（15–18）及简答题第 3–4 题因预算未纳入。正确项
 *   对齐章末参考答案键号（A1 型题 1.C、2.B；本文件答案键号自 1–18 连续编号），
 *   选项已随机重排并同步 correctChoiceIndex。OCR 错字已按药理学医学语义恢复
 *   （如 葯→药、氨霉素/氯莓素→氯霉素、Fe^*→Fe²⁺、Cazt*→Ca²⁺、Mg"→Mg²⁺、
 *   AI"→Al³⁺、难辦梭状芽孢杆菌→艰难梭状芽孢杆菌 等），未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch43-tetracyclines-chloramphenicol";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第43章 四环素类及氯霉素类 习题（核对PDF 第279–283页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch43-tetracyclines-chloramphenicol-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：二重感染",
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
        "长期应用广谱抗生素或广谱抗菌药时，口腔、咽喉部和胃肠道的敏感菌被药物抑制，不敏感菌乘机大量繁殖生长，由原来的劣势菌群变为优势菌群，造成新的感染，称作二重感染或菌群交替症",
        "二重感染（菌群交替症）多发生于长期应用广谱抗菌药者，常见为白假丝酵母菌引起的真菌感染和艰难梭状芽孢杆菌感染所致的假膜性肠炎。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch43-tetracyclines-chloramphenicol-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：灰婴综合征",
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
        "早产儿和新生儿因肝脏葡萄糖醛酸基转移酶缺乏、肾排泄功能不完善，大剂量使用氯霉素可致药物中毒，表现循环衰竭、呼吸困难、进行性血压下降、腹胀、吐奶、皮肤苍白和发绀",
        "灰婴综合征为早产儿和新生儿大剂量使用氯霉素引起的中毒性反应，与肝内葡萄糖醛酸基转移酶缺乏和肾排泄功能不完善有关。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill），3 道 */
const fillItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch43-tetracyclines-chloramphenicol-fill001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "米诺环素属长效___四环素类药物，其抗菌活性___多西环素，对青霉素类或___耐药的 A 群链球菌、B 群链球菌、金葡菌和大肠埃希菌对米诺环素仍敏感。",
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
        "半合成；强于；四环素",
        "米诺环素为半合成长效四环素类药物，抗菌活性强于多西环素，其脑脊液浓度高于其他四环素类药物。原书填空题第 1 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch43-tetracyclines-chloramphenicol-fill002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "四环素与细菌核糖体___的 A 位特异性结合，阻止___进入 A 位，从而阻碍肽链的延长和细菌蛋白质合成。",
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
        "30S 亚基；氨酰 tRNA",
        "四环素与核糖体 30S 亚基的 A 位特异性结合，阻止氨酰 tRNA 进入 A 位，抑制肽链延长和蛋白质合成。原书填空题第 2 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch43-tetracyclines-chloramphenicol-fill003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "fill",
    status: "available",
    prompt:
      "四环素与新形成的骨骼和牙齿中沉积的___结合，对骨骼和牙齿的生长发育产生不良影响。",
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
        "钙离子",
        "四环素可与新形成的骨骼和牙齿中沉积的钙离子结合，影响骨骼和牙齿生长发育，故孕妇、哺乳期妇女及 8 岁以下儿童禁用。原书填空题第 3 题答案。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 选择题（a1-single），2 道（A1 型） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch43-tetracyclines-chloramphenicol-a1001",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "可抑制骨髓造血功能的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["四环素", "红霉素", "氯霉素", "米诺环素", "氨苄西林"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "氯霉素",
        "氯霉素对造血系统可能产生致命的毒性（可逆性血细胞减少、再生障碍性贫血），故一般不作首选药物。原书 A1 型题第 1 题，参考答案键号 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch43-tetracyclines-chloramphenicol-a1002",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "四环素的抗菌谱中，不包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["金葡菌", "立克次体", "大肠埃希菌", "伤寒杆菌", "支原体"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "伤寒杆菌",
        "四环素类药物对多数革兰阳性菌和革兰阴性菌具有抑制作用，对立克次体、支原体、衣原体作用较强；伤寒杆菌（伤寒沙门菌）不属于其典型抗菌谱。原书 A1 型题第 2 题，参考答案键号 B。",
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
    id: "ext-pharmacology-ch43-tetracyclines-chloramphenicol-short001",
    order: 8,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "氯霉素对血液系统的毒性有哪些？与剂量和疗程的关系如何？",
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
        "①可逆性血细胞减少：发生率和严重程度与剂量大或疗程长有关，表现为贫血并可伴有血小板减少症或白细胞减少症，此毒性与氯霉素抑制骨髓造血细胞线粒体中的核糖体 70S 亚单位的作用有关；②再生障碍性贫血：骨髓造血功能受到抑制，全血细胞不可逆性减少，发病率与用药量或疗程无关，有些病人一次用药即可发生，发生率低但死亡率很高。",
        "氯霉素对血液系统的毒性是限制其临床应用的主要原因，可逆性血细胞减少与剂量和疗程相关，再生障碍性贫血为不可逆的特异质毒性，与剂量疗程无关。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch43-tetracyclines-chloramphenicol-short002",
    order: 9,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "影响四环素口服吸收的因素有哪些？",
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
        "①食物或其他药物中的 Fe²⁺、Ca²⁺、Mg²⁺、Al³⁺ 等金属离子可与四环素络合而减少四环素吸收；②碱性药、H₂受体阻断药或抗酸药降低药物的溶解度，减少四环素吸收；③酸性药物如维生素 C 可促进四环素吸收。",
        "四环素口服吸收受食物、某些金属离子和酸碱环境影响；食物一般不影响多西环素和米诺环素的口服吸收。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题：本章原书 2 组共 4 小题，完整组超出剩余预算，导出空数组 */
const bGroups: readonly AssessmentItemGroupDefinition[] = [];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...termItems,
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
