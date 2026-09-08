import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 中医诊断学 — 第01知识单元 绪论 题库提取（分值源题底稿，全取并注明）
 * 来源：同学整理带答案材料（选择.pdf 18页扫描件 OCR + 6天背诵册原生文本）
 *
 * == 统计报告 ==
 * - 名词解释（term）：8 题
 * - 单选题（a1-single）：11 题（选项已随机重排并同步 correctChoiceIndex）
 * - 简答/问答（short-answer）：1 题
 * - 病案分析（case）：0 题
 * - B1 配伍题：0 组（本书无 B1/B2 型）
 * - 独立记分题合计：20 题（预算 B=20）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：单选题题号 1,2,3,4,5,6,121,122,123,124,125 全部收录，每题补全为 5 项选项。
 *   正确项对照选择.pdf 页尾参考答案键号（OCR 常挤行/截断，如 `5.B6.6.D`、`……121. A
 *   122. A 123. A 124. E / 125. C`，按题号 + 中医诊断学医学语义归位）：1《伤寒杂病论》、
 *   2《脉经》、3 元代、4 淳于意、5 王叔和、6 李时珍、121 症、122 八纲辨证、123 症状、
 *   124 气血津液辨证、125 病症（不属于辨证要素），全部与源参考答案键号一致，本单元无
 *   冲突复位题、无换题。名词解释与简答题取材第1天/第6天背诵册·绪论部分，答案以“项目
 *   整理标准答案”为准：term 8 题（诊法、辨证、病、证、证候、证型、体征、病历/诊籍），
 *   均取绪论核心概念，且与 11 道单选的正确项概念、与大题1 的短答概念无重复（避免同一
 *   概念以名词/简答双计数）；短答题取大题1《三原理三原则》。OCR 错字已按中医诊断学医学
 *   语义恢复（如 频湖脉学→濒湖脉学、瘟病条辨→温病条辨、约/条辨等），数值与单位保留
 *   原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "tcm-diagnostics-bank-ch01-gulun";
const locatorBase =
  "《中医诊断学》题库底稿（同学整理带答案材料/6天背诵册） 第01知识单元 绪论";
const promptNote =
  "题干轻度改写（同义替换/语序/句式）；原题来自用户提供的同学整理带答案材料（含 OCR 恢复），答案以教材为准";
const answerNotice =
  "答案依据源参考答案/标准答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），8 道（绪论核心名词：诊法、辨证、病/证/证候/证型、体征、病历/诊籍） */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：诊法",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第1天/第6天背诵内容及答案·绪论（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "诊法是中医诊察疾病、收集病情资料的基本方法，主要包括望、闻、问、切四诊。",
        "四诊必须合参、互相补充，不能互相替代：望（看）、闻（听嗅）、问（询问）、切（切按脉搏及病体）。第1天/第6天背诵内容及答案·绪论部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：辨证",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第1天/第6天背诵内容及答案·绪论（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "辨证是在中医学理论指导下，将望、闻、问、切四诊所得资料进行分析综合，判断疾病当前阶段的病位、病因、病性及邪正盛衰等病机本质，并概括为完整证名的思维过程。",
        "辨证强调把握“当前阶段”的病机本质（病位、病因、病性、邪正盛衰）并将其概括为规范证名，是辨证论治的核心一环。第1天/第6天背诵内容及答案·绪论部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-term003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：病",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第1天/第6天背诵内容及答案·绪论（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "病是对疾病从其发生到发展全过程的特点与规律所作的概括，即疾病全过程的总称。如感冒、痢疾、消渴。",
        "病是一个横向贯串全过程的名称，同一病可有不同的证，相同证也可见于不同病。第1天/第6天背诵内容及答案·绪论部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-term004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：证",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第1天/第6天背诵内容及答案·绪论（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "证是对疾病当前阶段的病位、病因、病性及邪正盛衰等所作的病理概括，是疾病本质的反映。",
        "证强调“当前阶段、本质”，既能反映疾病发展某一阶段的病机，又能据此确立治法；与“病”（全过程总称）相对照记忆。第1天/第6天背诵内容及答案·绪论部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-term005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：证候",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第1天/第6天背诵内容及答案·绪论（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "证候是一个证所表现出的、具有内在联系的一组症状和体征，即构成证的症状体征群，是证的外在表现。",
        "证候是从“症”上升到“证”的中间环节：内在的本质为证，外在有内在联系的一组症状体征即为证候。第1天/第6天背诵内容及答案·绪论部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-term006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：证型",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第1天/第6天背诵内容及答案·绪论（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "证型是临床常见、典型且名称规范的证，即经过规范化整理的典型证候类型、常见证候的归类。",
        "证型具有规范、公认的证名与相对固定的证候表现，便于临床辨证、交流与记忆。第1天/第6天背诵内容及答案·绪论部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-term007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：体征",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第1天/第6天背诵内容及答案·绪论（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "体征是医生通过观察或检查发现的异常征象，如面色发白、舌红、脉数、肌肤压痛等客观可见的异常表现。",
        "症状（患者主观感受，如疼痛）与体征（医生客观检查所得，如舌象、脉象）共同构成“症”；症是疾病表现的总称，症不等于证。第1天/第6天背诵内容及答案·绪论部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-term008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：病历（病案/诊籍）",
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
        "病历又称病案，古称诊籍，是临床诊疗过程的书面记录，使其资料化、可查存。",
        "古代淳于意首创“诊籍”，为现存较早的病案记载，对后世病历书写制度有奠基意义。第1天背诵内容及答案·绪论部分。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 单选题（a1-single），11 道（题号 1,2,3,4,5,6,121,122,123,124,125） */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1001",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "确立辨证论治理论的著作是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号1（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字（瘟病条辨）按医学语义恢复为温病条辨",
      sourceIds: [],
    },
    choices: ["《黄帝内经》", "《伤寒杂病论》", "《诸病源候论》", "《景岳全书》", "《温病条辨》"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "《伤寒杂病论》",
        "东汉张仲景《伤寒杂病论》建立辨证论治理论体系；《黄帝内经》奠定理论基础，《诸病源候论》为病源证候专著。选择.pdf 题号1，参考答案键号 B，与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1002",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "我国第一部中医脉诊专著是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号2（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["《难经》", "《濒湖脉学》", "《脉经》", "《脉诀》", "《三指禅》"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "《脉经》",
        "西晋王叔和《脉经》为我国现存最早的脉学专著。《难经》重视脉诊对独取寸口有所发挥，李时珍《濒湖脉学》为系统论述脉象的重要脉学著作。选择.pdf 题号2，参考答案键号 C，与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1003",
    order: 11,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "我国现存最早的舌诊专著成书于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号3（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["汉代", "晋代", "元代", "明代", "清代"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "元代",
        "元代敖氏《伤寒金镜录》为我国第一部舌诊专著（成书于元代）。选择.pdf 题号3，参考答案键号 C，与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1004",
    order: 12,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "首创“诊籍”的作者是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号4（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["扁鹊", "淳于意", "张仲景", "华佗", "张景岳"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "淳于意",
        "西汉·淳于意创立“诊籍”，为现存较早的病案记载；扁鹊善诊、张仲景著《伤寒杂病论》。选择.pdf 题号4，参考答案键号 B，与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1005",
    order: 13,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "《脉经》的作者是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号5（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["扁鹊", "王叔和", "李时珍", "滑寿", "张景岳"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "王叔和",
        "西晋王叔和著《脉经》，为我国现存最早的脉学专著；李时珍著《濒湖脉学》。选择.pdf 题号5，参考答案键号 B，与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1006",
    order: 14,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "《濒湖脉学》的作者是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号6（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写，OCR 错字（频湖脉学）按医学语义恢复为濒湖脉学",
      sourceIds: [],
    },
    choices: ["张仲景", "张景岳", "叶天士", "李时珍", "孙思邈"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "李时珍",
        "明·李时珍《濒湖脉学》系统论述脉象，为重要脉学著作。选择.pdf 题号6，参考答案键号 D（参考键行 OCR 挤为 `5.B6.6.D`，按题号 6+医学语义归位为李时珍 D），与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1007",
    order: 15,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "判断病种、辨别证候的依据是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号121（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["症", "病", "证", "证型", "病案"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "症",
        "症是症状与体征的总称，是疾病表现出的个别、孤立现象，也是判断病种（辨别其所属病）与辨别证候的基本依据；证要对当前阶段病机概括。选择.pdf 题号121，参考答案键号 A，与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1008",
    order: 16,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "中医诊断学中辨证的基本纲领是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号122（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["八纲辨证", "脏腑辨证", "病因辨证", "气血津液辨证", "经络辨证"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "八纲辨证",
        "八纲（表里、寒热、虚实、阴阳）是辨证的最高纲领，统摄其他各种辨证方法；脏腑、病因、气血津液、经络辨证均在其统摄下运用。选择.pdf 题号122，参考答案键号 A，与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1009",
    order: 17,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "头痛、恶寒等属于",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号123（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["症状", "体征", "证候", "病名", "证型"],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "症状",
        "头痛、恶寒等主要是患者主观感受到的不适，属症状；体征为医生客观检查所得（如舌红、脉数），证候是一个证所表现的一组症状体征群。选择.pdf 题号123，参考答案键号 A，与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1010",
    order: 18,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "下列辨证方法中，主要不是用于外感病辨证的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号124（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["病因辨证", "六经辨证", "卫气营血辨证", "三焦辨证", "气血津液辨证"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "气血津液辨证",
        "六经辨证（伤寒）、卫气营血辨证与三焦辨证（温病）主要用于外感病辨证；气血津液辨证主要用于内伤杂病。选择.pdf 题号124，参考答案键号 E，与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-a1011",
    order: 19,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "中医辨证的主要要素不包括",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；中医诊断学选择.pdf题号125（同学整理参考版）`,
      note: "同学整理参考版，以教材为准；选择题题干轻度改写",
      sourceIds: [],
    },
    choices: ["病位", "病性", "病症", "病因", "病势"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "病症",
        "中医辨证的主要要素是病位、病因、病性、病势及邪正盛衰关系，不含“病症”这一项；“病症”并非辨证要素的规范名称。选择.pdf 题号125，参考答案键号 C，与医学语义一致。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 简答/问答（short-answer），1 道（第1天 绪论 大题1《三原理三原则》） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-tcm-diagnostics-bank-tcm-diagnostics-bank-ch01-gulun-short001",
    order: 20,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述中医诊断的基本原理和基本原则。",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: `${locatorBase}；第1天背诵内容及答案·绪论 核心简答大题第1题（项目整理标准答案）`,
      note: "项目整理标准答案；题干轻度改写",
      sourceIds: [],
    },
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "基本原理：①司外揣内——通过观察外在症状体征推测内在脏腑病理变化，认识疾病本质；②见微知著——通过局部、微小的变化测知整体和内在病情；③以常衡变——以正常状态为标准，通过比较异常变化认识疾病的性质与程度。基本原则：①整体审察——从人体自身整体及其与自然、社会环境的联系中全面诊察分析病情；②诊法合参——四诊并重、诸法参用，综合收集病情资料，避免以偏概全；③病证结合——辨病与辨证相结合，既把握疾病全过程规律，又把握当前阶段病理本质。",
        "三原理记“外、微、常”——司外揣内、见微知著、以常衡变；三原则记“整、合、病证”——整体审察、诊法合参、病证结合。原理讲诊断的逻辑方法，原则讲临床诊察与辨病辨证的运用总纲。第1天背诵内容及答案·绪论 大题1。",
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