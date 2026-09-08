import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 神经病学学习指导与习题集（第3版）— 第23章 内科系统疾病的神经系统并发症 题库提取（等比取样）
 * 来源：《神经病学学习指导与习题集》第3版（人民卫生出版社；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 选择题（a1-single）：10 题（含 A2 病例题 2 题、A3/A4 病例串题 3 题）
 * - 问答题（short-answer）：4 题（含简答 2、论述 2）
 * - 病例分析题（case）：1 题
 * - B1 配伍题：1 组、共 4 个成员
 * - 独立记分题合计：19 题（须等于本文件预算 19）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含 A1 型 19、A2 型 3、A3/A4 型 8（2 组）、B1 型 3 组 11 成员、
 *   简答题 9、论述题 6、病例分析题 1。本文件按 19 道预算在原书顺序内取材：A1 取第
 *   1~5 题、A2 取第 1~2 题、A3/A4 取第 1 组（1~3 题，糖尿病周围神经病病例串）、简答取
 *   第 1~2 题、论述取第 1~2 题、病例分析全取，B1 取第 1 组（1~4）完整组。正确项逐一对
 *   齐章末参考答案键号（章末 A2/A3-A4/B1 各节键号在 OCR 中错位，已按医学语义重建；
 *   B1 第 1 题键号 A 疑为 OCR 错位，按医学语义定为抗 VGCC 抗体）。OCR 错字与双栏错序
 *   已按神经病学医学语义恢复（如 眼险/眼脸→眼睑、井发症→并发症、力鲁唑→利鲁唑、
 *   a-烯醇化酶→α-烯醇化酶、长T」→长T1、Ts-12→T5-12、甲低→甲减、行缺陷→行为缺陷
 *   等），数值与分子标记（抗 Hu/Yo/Ri/Ma2/VGCC 抗体、T2/FLAIR、IgG、CSF、MRI/CT、
 *   T5-12 节段）保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "neurology-ch23-neurological-complications-of-internal-diseases";
const locatorBase =
  "《神经病学学习指导与习题集》第3版 第23章 内科系统疾病的神经系统并发症 习题（核对PDF 第400–414页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** A1/A2/A3-A4 型选择题（统一映射为 a1-single），10 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-a1001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "神经系统副肿瘤综合征患者最常见的原发性肿瘤是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肺癌",
      "前列腺癌",
      "淋巴瘤",
      "卵巢癌",
      "胃癌",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺癌",
        "神经系统副肿瘤综合征（PNS）最常见的原发性肿瘤是肺癌（尤其小细胞肺癌），其次为卵巢癌、淋巴瘤等。原书 A1 答案第 1 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-a1002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "神经系统副肿瘤综合征（PNS）发病与原发性肿瘤关系中描述错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "特定肿瘤的癌相关神经抗原可刺激免疫系统产生特异性抗体，该抗体能够特异性地提示肿瘤的病理类型",
      "可以先出现原发灶症状再出现 PNS 症状",
      "可以原发肿瘤和 PNS 同时发现",
      "多数先出现神经、肌肉症状后才发现原发灶",
      "肿瘤与神经、肌肉组织存在共同抗原决定簇",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "特定肿瘤的癌相关神经抗原可刺激免疫系统产生特异性抗体，该抗体能够特异性地提示肿瘤的病理类型",
        "PNS 症状可先于、同时或晚于原发灶出现，多数先出现神经、肌肉症状后才发现原发灶；肿瘤与神经、肌肉组织存在共同抗原决定簇，癌相关神经抗原可刺激产生特异性抗体，但抗体仅提示相关肿瘤类型，并不能特异性地确定肿瘤的病理类型。原书 A1 答案第 2 题为 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-a1003",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "关于副肿瘤性边缘叶性脑炎的描述中错误的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "脑脊液中发现寡克隆区带则可排除副肿瘤综合征而诊断多发性硬化",
      "病变主要侵犯边缘系统，表现近记忆力减退、定向力障碍、行为异常、虚构、幻觉、抑郁、多种形式的癫痫发作等",
      "病变累及下丘脑可表现为思睡、体温升高及内分泌功能紊乱",
      "头部 MRI 可见一侧或双侧颞叶、丘脑及脑干在 T2 加权像和 FLAIR 相呈高信号，但无特异性",
      "脑电图可正常或单侧、双侧颞叶慢波或尖波",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "脑脊液中发现寡克隆区带则可排除副肿瘤综合征而诊断多发性硬化",
        "副肿瘤性边缘叶性脑炎脑脊液可出现寡克隆带，故发现寡克隆区带并不能排除副肿瘤综合征而诊断多发性硬化，其余描述均正确。原书 A1 答案第 3 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-a1004",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "亚急性感觉神经元病的临床表现中最突出的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "步态不稳和感觉性共济失调",
      "亚急性起病",
      "肢体无力相对较轻",
      "腱反射可减弱或消失",
      "无病理反射",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "步态不稳和感觉性共济失调",
        "亚急性感觉神经元病主要侵及脊髓背根神经节和后索神经纤维，深感觉障碍突出，临床表现中最突出的是步态不稳和感觉性共济失调。原书 A1 答案第 4 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-a1005",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "Lambert-Eaton 综合征患者最常见的肿瘤是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肺癌",
      "前列腺癌",
      "淋巴瘤",
      "卵巢癌",
      "胃癌",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肺癌",
        "Lambert-Eaton 综合征（LEMS）是一种免疫介导的神经-肌肉接头功能障碍性疾病，最常见的相关肿瘤是小细胞肺癌。原书 A1 答案第 5 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-a1006",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "男性，40 岁，近 3 个月不明原因消瘦且感四肢无力。查体：眼球运动自如，无复视，四肢近端肌力 4 级，远端 5 级，腱反射明显减低，病理征（-）。血生化正常，胸片怀疑占位性病变。该患者最可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "Lambert-Eaton 综合征",
      "低钾型周期性瘫痪",
      "重症肌无力",
      "进行性肌营养不良症",
      "多发性肌炎",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "Lambert-Eaton 综合征",
        "中年男性消瘦伴四肢近端无力、腱反射明显减低，胸片怀疑占位性病变，符合 Lambert-Eaton 综合征（常合并小细胞肺癌）的临床特点。原书 A2 答案第 1 题为 C。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-a1007",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，23 岁，在确诊 SLE 后 2 年出现亚急性发病的双下肢无力伴有尿便障碍，MRI 显示 T5-12 节段长 T2 信号，伴有轻微水肿，脑脊液蛋白水平增高，寡克隆区带阴性，视觉诱发电位未见异常，该患者最可能的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "狼疮性脊髓病",
      "视神经脊髓炎",
      "脊髓前动脉血栓",
      "脊髓压迫症",
      "急性脊髓炎",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "狼疮性脊髓病",
        "SLE 患者出现亚急性脊髓病表现（双下肢无力、尿便障碍），MRI 示胸髓长 T2 信号，视觉诱发电位正常，寡克隆区带阴性，符合狼疮性脊髓病。原书 A2 答案第 2 题为 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-a1008",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，39 岁，因四肢无力 3 个月就诊。四肢无力进展性加重，不伴麻木和疼痛，无病态疲劳性。有糖尿病病史 5 年，控制较好。查体：脑神经未见异常，四肢肌力 4 级，腱反射消失，病理征阴性，踝部以下震动觉减退，余感觉正常。患者应该首选的检查是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "肌电图",
      "头颅 MRI",
      "新斯的明试验",
      "肌肉活检",
      "空腹血糖和糖耐量试验",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "肌电图",
        "患者四肢无力伴腱反射消失、远端震动觉减退，有糖尿病病史，首先应行肌电图（神经传导速度）检查以明确周围神经病变的性质与范围。原书 A3/A4 答案第 1 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-a1009",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，39 岁，因四肢无力 3 个月就诊。四肢无力进展性加重，不伴麻木和疼痛，无病态疲劳性。有糖尿病病史 5 年，控制较好。查体：脑神经未见异常，四肢肌力 4 级，腱反射消失，病理征阴性，踝部以下震动觉减退，余感觉正常。若肌电图显示神经源性改变，可见多根神经的神经传导速度明显减慢，波幅轻微减低，无针极肌电图异常，考虑可能性大的诊断是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "慢性炎症性脱髓鞘性多神经病",
      "糖尿病性多发性周围神经病",
      "多灶性运动神经病",
      "脊肌萎缩症",
      "运动神经元病",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "慢性炎症性脱髓鞘性多神经病",
        "肌电图示多根神经传导速度明显减慢、波幅轻微减低、无针极肌电图异常，符合脱髓鞘性周围神经病特点，结合亚急性进展、腱反射消失，考虑慢性炎症性脱髓鞘性多神经病（CIDP）。原书 A3/A4 答案第 2 题为 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-a1010",
    order: 10,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt:
      "女性，39 岁，因四肢无力 3 个月就诊。四肢无力进展性加重，不伴麻木和疼痛，无病态疲劳性。有糖尿病病史 5 年，控制较好。查体：脑神经未见异常，四肢肌力 4 级，腱反射消失，病理征阴性，踝部以下震动觉减退，余感觉正常。首选的药物治疗是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: [
      "糖皮质激素",
      "利鲁唑",
      "B 族维生素",
      "大剂量丙种球蛋白",
      "降糖药物",
    ],
    correctChoiceIndex: 0,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "糖皮质激素",
        "慢性炎症性脱髓鞘性多神经病（CIDP）首选糖皮质激素治疗，也可用大剂量丙种球蛋白或血浆置换。原书 A3/A4 答案第 3 题为 D。",
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
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-short001",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述 PNS 的发病机制。",
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
        "PNS 的发病机制",
        "PNS 的发病机制目前比较推崇的学说是自身免疫反应。认为某些癌肿与神经、肌肉组织存在共同抗原决定簇，癌肿细胞作为抗原，启动机体产生高度特异性抗体，在补体的参与下，不仅杀伤癌肿细胞，也损伤和破坏机体的神经、肌肉组织，同时进一步刺激 B 淋巴细胞产生更多的抗体，引起更强烈、更广泛的免疫应答反应。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-short002",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "糖尿病性神经系统病变主要有哪些类型？",
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
        "糖尿病性神经系统病变的类型",
        "糖尿病性神经系统病变主要类型有糖尿病性脑血管病、糖尿病性多发性周围神经病、糖尿病性单神经病、糖尿病性自主神经病、糖尿病性脊髓病和糖尿病脑病。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-short003",
    order: 13,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "常见的与 PNS 相关的抗神经组织抗体有哪些？临床意义如何？",
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
        "与 PNS 相关的抗神经组织抗体及临床意义",
        "常见的与 PNS 相关抗神经组织抗体及其相关肿瘤：Anti-Hu（ANNA-1）见于脑脊髓炎、边缘叶性脑炎、感觉神经元病、亚急性小脑变性、自主神经病，相关肿瘤为小细胞肺癌、神经母细胞瘤、前列腺癌；Anti-Yo（PCA-1）见于亚急性小脑变性，相关肿瘤为卵巢癌、乳腺癌；Anti-CV2（CRMP5）见于脑脊髓炎、舞蹈症、边缘叶性脑炎、感觉神经元病、感觉运动神经病、视神经炎、亚急性小脑变性、自主神经病，相关肿瘤为小细胞肺癌、胸腺瘤；Anti-Ri（ANNA-2）见于斜视性阵挛-肌阵挛、脑干炎，相关肿瘤为乳腺癌、小细胞肺癌；Anti-Ma2（Ta）见于边缘叶性脑炎、间脑炎、脑干炎、亚急性小脑变性，相关肿瘤为睾丸及肺肿瘤；Anti-amphiphysin 见于僵人综合征、脑脊髓炎、亚急性感觉神经元病、感觉运动神经病，相关肿瘤为乳腺癌、小细胞肺癌；Anti-recoverin 见于癌相关的视网膜病，相关肿瘤为小细胞肺癌。临床意义：特定抗体与特定肿瘤及临床综合征相关，有助于提示原发肿瘤的类型和部位，指导肿瘤筛查和诊断。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-short004",
    order: 14,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "副肿瘤性脑脊髓炎的主要临床表现有哪些？",
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
        "副肿瘤性脑脊髓炎的主要临床表现",
        "副肿瘤性脑脊髓炎主要包括副肿瘤性边缘叶性脑炎、副肿瘤性脑干炎和副肿瘤性脊髓炎，可重叠发生。呈亚急性、慢性或隐匿起病。累及边缘系统时，表现为近记忆力减退、定向力障碍、行为异常、虚构、幻觉、抑郁、多种形式的癫痫发作等，病变累及下丘脑可表现为思睡、体温升高及内分泌功能紊乱，病情进行性加重最后痴呆。累及脑干时表现为眩晕、恶心、吞咽困难、构音障碍、复视、眼震、凝视麻痹和共济失调，甚至出现锥体束征。可以累及脊髓的任何部位，以脊髓前角细胞为主，表现为慢性进行性对称或不对称性肌无力、肌萎缩，上肢多见。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 病例分析题（case），1 道 */
const caseItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-case001",
    order: 15,
    knowledgePointId: kp,
    questionKind: "case",
    status: "available",
    prompt:
      "男性，65 岁，因视物成双 5 天，右侧眼睑下垂 2 天就诊。视物成双时有右侧额部轻微疼痛，到眼睑下垂时疼痛消失。无“晨轻暮重”现象。既往糖尿病病史 8 年，服“中药”治疗，不经常查血糖，不饮酒。近 3 年常感到四肢发麻，双足烧灼样疼痛。查体：右侧眼睑下垂，右眼内收露白 3mm，上、下视均受限，其他方向眼动正常。左眼各方向运动自如。双侧瞳孔等大，对光反射正常。其他脑神经未见异常。四肢肌力、肌张力正常，腱反射减低，病理征（-），双侧踝部音叉振动觉减退，膝部振动觉正常，踝以下袜套样痛觉减退，呈渐变性，皮肤略显粗糙。头颅 MRI 未见异常。请回答：（1）请写出诊断及诊断依据。（2）需与哪些疾病鉴别（写出至少 3 种疾病名）？（3）还应做哪些辅助检查？（4）治疗原则是什么？",
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
        "糖尿病性动眼神经麻痹与糖尿病性多发性周围神经病的诊断、鉴别、辅助检查与治疗",
        "（1）诊断有两个：糖尿病性动眼神经麻痹；糖尿病性多发性周围神经病。诊断依据：①亚急性起病的动眼神经麻痹，眼外肌受累而眼内肌未受累，无对侧肢体无力和病理征，糖尿病病史且血糖控制不良；②查体时发现腱反射减低和远端对称性感觉减退，伴有轻微的皮肤自主神经受累表现，糖尿病病史且血糖控制不良。（2）鉴别诊断：①对于糖尿病性动眼神经麻痹，应该鉴别动脉瘤、Weber 综合征、眶内炎性假瘤和重症肌无力等；②对于糖尿病性多发性周围神经病应该鉴别慢性炎症性脱髓鞘性多神经病、药物或毒物中毒导致的周围神经病、异常蛋白血症伴发的周围神经病、尿毒症性多发性神经病和亚急性联合变性等。（3）应做空腹血糖、糖化血红蛋白、血沉、C 肽、生化全套、血清蛋白电泳、M 蛋白、血清维生素 B12 水平检测，药物和毒物筛查、头颅 MRI、眼眶 CT、肌电图和重复神经刺激，必要时腰穿检测脑脊液白细胞数和蛋白水平以及行 DSA 检查。（4）包括：①首要的是将血糖控制在理想范围内，包括控制饮食、口服降糖药、使用胰岛素等；②由于糖尿病性神经病变多以髓鞘改变为主，故 B 族维生素的使用非常重要；③应用一些改善循环和营养神经的药物；④疼痛可给予卡马西平、对症治疗。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 4 成员（题组 1~4） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-b001",
    order: 16,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "抗 VGCC 抗体",
      "抗 Hu 抗体",
      "抗 Ri 抗体",
      "抗 Yo 抗体",
      "抗 Ma2 抗体",
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
        id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-b001m1",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在有 Lambert-Eaton 综合征临床表现的小细胞肺癌患者可见",
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
            "抗 VGCC 抗体",
            "Lambert-Eaton 综合征由自身抗体作用于突触前膜电压依赖性钙离子通道（VGCC）所致，小细胞肺癌合并 LEMS 患者可检出抗 VGCC 抗体。原书 B1 答案第 1 题键号为 A（抗 Hu 抗体），疑为 OCR 错位，按神经病学医学语义定为抗 VGCC 抗体。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-b001m2",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在有斜视性阵挛-肌阵挛临床表现的小细胞肺癌患者可见",
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
            "抗 Ri 抗体",
            "斜视性阵挛-肌阵挛患者中，成年女性查到 Ri（ANNA-2）抗体高度提示患有乳腺癌或妇科肿瘤，在男性提示小细胞肺癌和膀胱癌的可能。原书 B1 答案第 2 题为 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-b001m3",
        order: 18,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在有亚急性小脑变性的卵巢癌患者可见",
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
            "抗 Yo 抗体",
            "亚急性小脑变性患者血清和脑脊液中可查到 Hu、Yo、PCA-Tr、mGluR1 抗体等，其中抗 Yo 抗体（PCA-1）与卵巢癌、乳腺癌相关。原书 B1 答案第 3 题为 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-neurology-ch23-neurological-complications-of-internal-diseases-b001m4",
        order: 19,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "在有亚急性小脑变性的小细胞肺癌患者可见",
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
            "抗 Hu 抗体",
            "小细胞肺癌相关的副肿瘤综合征常检出抗 Hu 抗体（ANNA-1），可见于脑脊髓炎、感觉神经元病及亚急性小脑变性等。原书 B1 答案第 4 题为 A。",
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
  ...a1Items,
  ...shortItems,
  ...caseItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
