import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 药理学学习指导与习题集（第4版，配套《药理学》第9版）— 第27章 调血脂药与抗动脉粥样硬化药 题库提取（等比取样）
 * 来源：《药理学学习指导与习题集》第4版（人民卫生出版社，主编：乔国芬；扫描件 OCR 恢复）
 *
 * == 统计报告（本文件题量 = 每教材 600、章节等比缩放预算）==
 * - 名词解释（term）：2 题
 * - 填空题（fill）：0 题（本章原书无填空题，fillItems 为空数组）
 * - 选择题（a1-single）：7 题（含 A1 型、A2 型病例题）
 * - 问答题（short-answer）：3 题（含简答、论述）
 * - B1 配伍题：1 组、共 5 个成员
 * - 独立记分题合计：17 题（须等于本文件预算 17）
 * - 缺失答案：0；无法可靠提取：0
 * - 说明：本章原书依序含名词解释 2、选择题（A1 型 24 + A2 型 10 + B1 型 1 组共 5 小题）、
 *   简答题 2 与论述题 1，无填空题。本文件按 17 道预算在原书顺序内取材：名词解释全取、
 *   A1 型题取第 1–7 题、简答与论述全取（3 题）、B1 取完整组（35–39 题，共 5 成员）；
 *   未取材：A1 第 8–24 题、A2 第 25–34 题（预算所限）。参考答案键号自 1–39 连续编号
 *   （A1 1–24、A2 25–34、B1 35–39），已按题号与药理学医学语义归位：A2 型题第 34 题键号
 *   在 OCR 中误读为“34.0”，按药理学医学语义恢复为 34.C；B1 型题 35.A、36.D、37.B、38.C、
 *   39.E。正确项对齐章末参考答案键号（A1 型题 1.D、2.B、3.D、4.B、5.E、6.D、7.B），选项已
 *   随机重排并同步 correctChoiceIndex（B1 组选项保持原书顺序，成员指向对应索引）。OCR 错字
 *   已按药理学医学语义恢复（如 葯→药、阿托伐他订→阿托伐他汀、普伐他打→普伐他汀、
 *   洛他汀→洛伐他汀、HIDL→HDL、L.DL→LDL、PPAR-0→PPARα、7-a羟化酶→7α-羟化酶、
 *   顶型→III 型等），数值（9.8mmol/L、378μmol/L、11.2mmol/L 等）均保留原值，未捏造。
 * 解析内容位于 answer.content 的第二个元素。
 */

const topic = "pharmacology-ch27-lipid-lowering-drugs";
const locatorBase =
  "《药理学学习指导与习题集》第4版（配套《药理学》第9版） 第27章 调血脂药与抗动脉粥样硬化药 习题（核对PDF 第182–189页）";
const promptNote =
  "题干改写；原题来自用户提供的章节习题集（扫描件 OCR 恢复），未经第三方授权审核";
const answerNotice =
  "答案依据题集参考答案整理并改写，未经权威教材交叉核对";

const kp = `kp-${topic}`;

/** 名词解释（term），2 道 */
const termItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-term001",
    order: 1,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：调血脂药",
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
        "调血脂药",
        "凡能使 LDL、VLDL、TC、TG 及 apoB 降低，或使 HDL、apoA 升高的药物，都有抗动脉粥样硬化作用，称为调血脂药。原书名词解释第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-term002",
    order: 2,
    knowledgePointId: kp,
    questionKind: "term",
    status: "available",
    prompt: "名词解释：他汀类的多效性作用",
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
        "他汀类的多效性作用",
        "除了调血脂作用外，他汀类药物还有抗氧化、改善血管内皮功能、抑制血管平滑肌细胞的增殖和迁移、促进 VSMCs 凋亡、抑制单核细胞-巨噬细胞的黏附和分泌功能、减少动脉壁泡沫细胞形成、降低血浆 C 反应蛋白、减轻动脉粥样硬化过程中的炎性反应、抑制血小板聚集和提高纤溶活性等非调血脂作用，称为他汀类的多效性作用。原书名词解释第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 填空题（fill）：本章原书无填空题，导出空数组 */
const fillItems: readonly AssessmentItemDefinition[] = [];

/** 选择题（a1-single），7 道 */
const a1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-a1001",
    order: 3,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "HMG-CoA 还原酶抑制剂最严重的不良反应是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["肝损伤", "中枢神经系统反应", "甲状腺功能异常", "横纹肌溶解症", "肺纤维化"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "横纹肌溶解症",
        "他汀类（HMG-CoA 还原酶抑制剂）最严重的不良反应是横纹肌溶解症，表现为肌痛、肌无力、肌酸磷酸激酶（CPK）升高，严重者可致急性肾衰竭，用药期间有肌痛者应检测 CPK，必要时停药。原书 A1 型题第 1 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-a1002",
    order: 4,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "能够降低血浆 Lp(a) 的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["考来烯胺", "苯扎贝特", "多烯脂肪酸", "烟酸", "硫酸软骨素A"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "烟酸",
        "血浆 Lp(a) 升高是动脉粥样硬化的独立危险因素；烟酸除降低血清 TG 和 VLDL、升高血浆 HDL 外，还可降低 Lp(a)；考来烯胺、苯扎贝特、多烯脂肪酸、硫酸软骨素 A 对 Lp(a) 无明显降低作用。原书 A1 型题第 2 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-a1003",
    order: 5,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "抑制胆固醇在肝脏合成的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["阿昔莫司", "非诺贝特", "考来烯胺", "烟酸", "阿托伐他汀"],
    correctChoiceIndex: 4,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "阿托伐他汀",
        "阿托伐他汀为他汀类（HMG-CoA 还原酶抑制剂），与 HMG-CoA 化学结构相似，竞争性抑制胆固醇合成限速酶 HMG-CoA 还原酶，从而抑制胆固醇在肝脏的合成；考来烯胺为胆汁酸结合树脂，主要减少胆固醇吸收。原书 A1 型题第 3 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-a1004",
    order: 6,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "药物中降低血浆胆固醇作用最明显的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["贝特类", "抗氧化剂", "他汀类", "烟酸", "多烯脂肪酸类"],
    correctChoiceIndex: 2,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "他汀类",
        "他汀类对 LDL-C 的降低作用最强、TC 次之，降 TG 作用弱，是降低血浆胆固醇作用最明显的一类药物；贝特类主要降低 TG 及 VLDL，烟酸为广谱调血脂药但降 TC 作用不及他汀类。原书 A1 型题第 4 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-a1005",
    order: 7,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "属广谱调血脂的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["普伐他汀", "烟酸", "考来烯胺", "硫酸软骨素", "二十二碳六烯酸"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "烟酸",
        "烟酸能降低血清 TG 和 VLDL、降低 LDL 及 Lp(a)，升高 HDL，属广谱调血脂药；考来烯胺主要降低 TC 和 LDL-C，普伐他汀为他汀类，二十二碳六烯酸（DHA）为多烯脂肪酸，硫酸软骨素为黏多糖类。原书 A1 型题第 5 题，参考答案键号 E。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-a1006",
    order: 8,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "以下可引起肌酸磷酸激酶升高和肌肉触痛的药物是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["胆汁酸结合树脂", "他汀类", "苯氧酸类", "多不饱和脂肪酸类", "抗氧化剂"],
    correctChoiceIndex: 1,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "他汀类",
        "他汀类可致肌病，表现为肌酸磷酸激酶（CPK）升高和肌肉触痛，严重者发生横纹肌溶解症；苯氧酸类（贝特类）与他汀类合用时肌病风险明显增加，需定期监测 CPK。原书 A1 型题第 6 题，参考答案键号 D。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-a1007",
    order: 9,
    knowledgePointId: kp,
    questionKind: "a1-single",
    status: "available",
    prompt: "不属于调血脂药的是",
    promptSource: {
      authority: "nur-editorial",
      wording: "nur-adapted",
      locator: locatorBase,
      note: promptNote,
      sourceIds: [],
    },
    choices: ["普伐他汀", "非诺贝特", "烟酸", "普罗布考", "考来替泊"],
    correctChoiceIndex: 3,
    answer: {
      status: "available",
      authority: "nur-platform",
      confidence: "unverified",
      content: [
        "普罗布考",
        "按本章分类，普罗布考归入抗氧化剂类抗动脉粥样硬化药而非调血脂药（进入体内被氧化为普罗布考自由基，阻断脂质过氧化，并能抑制 HMG-CoA 还原酶、增加 LDL 清除）；非诺贝特（贝特类）、普伐他汀（他汀类）、考来替泊（胆汁酸结合树脂）、烟酸均属调血脂药。原书 A1 型题第 7 题，参考答案键号 B。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** 问答题（short-answer），3 道（含简答 2、论述 1） */
const shortItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-short001",
    order: 10,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述抗动脉粥样硬化药的分类及各类的代表药物。",
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
        "①调血脂药：HMG-CoA 还原酶抑制药（洛伐他汀、辛伐他汀等）、胆汁酸结合树脂（考来烯胺、考来替泊等）、烟酸类（烟酸、阿昔莫司等）、苯氧酸类（吉非贝齐、非诺贝特等）；②抗氧化剂：普罗布考、维生素 E 等；③多烯脂肪酸类：n-3 型（EPA、DHA 等）、n-6 型（亚油酸、月见草油等）；④黏多糖和多糖类：低分子量肝素（依诺肝素、替地肝素等）、天然类肝素（冠心舒、藻酸双酯钠等）",
        "抗动脉粥样硬化药的分类及代表药物：①调血脂药：包括 HMG-CoA 还原酶抑制药（洛伐他汀、辛伐他汀等）、胆汁酸结合树脂（考来烯胺、考来替泊等）、烟酸类（烟酸、阿昔莫司等）、苯氧酸类（吉非贝齐、非诺贝特等）；②抗氧化剂：普罗布考、维生素 E 等；③多烯脂肪酸类：n-3 型（二十碳五烯酸 EPA、二十二碳六烯酸 DHA 等）与 n-6 型（亚油酸、月见草油等）；④黏多糖和多糖类：低分子量肝素（依诺肝素、替地肝素等）与天然类肝素（冠心舒、藻酸双酯钠等）。原书简答题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-short002",
    order: 11,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "简述胆汁酸结合树脂的作用机制。",
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
        "胆汁酸结合树脂口服不被消化道吸收，在肠道与胆汁酸络合随粪排出，阻断胆汁酸重吸收；促进肝中胆固醇向胆汁酸转化；胆汁酸也是肠道吸收胆固醇所必需，故也影响胆固醇吸收；以上作用使肝中胆固醇水平下降，代偿性使肝细胞表面 LDL 受体数目增加，促进血中 LDL 向肝中转移，导致血浆 LDL-C 和 TC 浓度下降",
        "考来烯胺、考来替泊等胆汁酸结合树脂在肠道通过离子交换与胆汁酸结合：①被结合的胆汁酸失去活性，减少食物中脂类（包括胆固醇）的吸收；②阻滞胆汁酸在肠道的重吸收；③肝内胆固醇经 7α-羟化酶作用转化为胆汁酸而大量丢失；④肝细胞中胆固醇减少，导致肝细胞表面 LDL 受体增加或活性增强；⑤LDL 经受体进入肝细胞，使血浆 TC 和 LDL-C 降低。原书简答题第 2 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-short003",
    order: 12,
    knowledgePointId: kp,
    questionKind: "short-answer",
    status: "available",
    prompt: "论述他汀类药物抗动脉粥样硬化的作用机制和临床应用。",
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
        "作用机制：①调血脂作用：竞争性抑制胆固醇合成限速酶 HMG-CoA 还原酶，使肝中胆固醇合成减少，通过负反馈调节使肝细胞表面 LDL 受体表达增加或活性增强，摄取 LDL 增多，加之肝合成及释放 VLDL 减少，终致血浆 LDL 和 VLDL 减少；②非调血脂作用：抗氧化、改善血管内皮功能、抑制血管平滑肌细胞增殖和迁移、促进 VSMCs 凋亡、抑制单核细胞-巨噬细胞黏附和分泌、减少动脉壁泡沫细胞形成、降低血浆 C 反应蛋白、抑制血小板聚集和提高纤溶活性等。临床应用：调血脂、肾病综合征、血管成形术后再狭窄、预防心脑血管急性事件、缓解器官移植后排异反应及治疗骨质疏松症",
        "他汀类（如洛伐他汀、辛伐他汀、阿托伐他汀）抗动脉粥样硬化的机制：①调血脂作用：竞争性抑制 HMG-CoA 还原酶，使肝脏胆固醇合成减少，负反馈调节使肝细胞表面 LDL 受体表达增加或活性增强，摄取 LDL 增多，加之肝脏合成及释放 VLDL 减少，血浆 LDL 和 VLDL 减少，HDL 升高（可能为 VLDL 减少的间接结果）；②非调血脂（多效性）作用：改善血管内皮功能、抑制 VSMCs 增殖和迁移、促进 VSMCs 凋亡、减少动脉壁巨噬细胞及泡沫细胞形成、降低血浆 C 反应蛋白、抑制血小板聚集和提高纤溶活性等，使动脉粥样硬化斑块稳定和缩小。临床应用：主要用于杂合子家族性和非家族性 IIa、IIb 及 III 型高脂蛋白血症，2 型糖尿病和肾病综合征引起的高胆固醇血症，亦可用于肾病综合征、血管成形术后再狭窄、预防心脑血管急性事件、缓解器官移植后排异反应及治疗骨质疏松症。原书论述题第 1 题。",
      ],
      notice: answerNotice,
      sourceIds: [],
    },
    scoring: null,
    sourceIds: [],
  },
];

/** B1 共用备选答案配伍题，1 组 × 5 成员（原书 35～39 题） */
const bGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-pharmacology-ch27-lipid-lowering-drugs-b001",
    order: 13,
    questionKind: "b1",
    status: "available",
    groupPrompt: null,
    sharedChoices: [
      "考来烯胺",
      "依折麦布",
      "吉非贝齐",
      "烟酸",
      "洛伐他汀",
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
        id: "ext-pharmacology-ch27-lipid-lowering-drugs-b001m1",
        order: 13,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "有特殊臭味和刺激性的是",
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
            "考来烯胺",
            "考来烯胺为胆汁酸结合树脂，因使用剂量较大，有特殊的臭味和一定的刺激性，可有便秘、腹胀、嗳气和食欲减退等，一般两周后消失。原书 B1 型题第 35 题，参考答案键号 A。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch27-lipid-lowering-drugs-b001m2",
        order: 14,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "常见皮肤潮红和瘙痒不良反应的是",
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
            "烟酸",
            "烟酸常见不良反应为皮肤潮红、瘙痒、刺激胃黏膜，可加重或引起消化道溃疡，用药前可合用阿司匹林或缓释制剂减轻皮肤反应。原书 B1 型题第 36 题，参考答案键号 D。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch27-lipid-lowering-drugs-b001m3",
        order: 15,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "抑制小肠对胆固醇吸收的是",
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
            "依折麦布",
            "依折麦布与小肠上皮刷状缘上的 NPC1L1 蛋白特异性结合，抑制饮食及胆汁中胆固醇的吸收，在他汀类基础上使用可进一步降低心血管事件。原书 B1 型题第 37 题，参考答案键号 B。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch27-lipid-lowering-drugs-b001m4",
        order: 16,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "作用机制与激活核因子受体有关的是",
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
            "吉非贝齐",
            "吉非贝齐为贝特类（苯氧酸类）药物，通过激活 PPARα（过氧化物酶体增殖物激活受体 α，属核受体超家族），调节 LPL、apoC Ⅲ、apoA Ⅰ 等基因表达，降低 apoC Ⅲ 转录、增加 LPL 和 apoA Ⅰ 的生成与活性，使含 TG 的脂蛋白减少。原书 B1 型题第 38 题，参考答案键号 C。",
          ],
          notice: answerNotice,
          sourceIds: [],
        },
        scoring: null,
        sourceIds: [],
      },
      {
        id: "ext-pharmacology-ch27-lipid-lowering-drugs-b001m5",
        order: 17,
        knowledgePointId: kp,
        questionKind: "b1",
        status: "available",
        prompt: "抑制内源性胆固醇的合成的是",
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
            "洛伐他汀",
            "洛伐他汀为他汀类，竞争性抑制内源性胆固醇合成的限速酶 HMG-CoA 还原酶，从而抑制内源性胆固醇的合成。原书 B1 型题第 39 题，参考答案键号 E。",
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
  ...fillItems,
  ...a1Items,
  ...shortItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...bGroups,
];
