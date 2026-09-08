import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 诊断学 学习指导与习题集（第4版）— 第一篇常见症状（发热、皮肤黏膜出血、水肿）题库提取
 * 来源：《诊断学学习指导与习题集》第4版（人民卫生出版社，主编：万学红、卢雪峰）
 *
 * == 统计报告 ==
 * == 第一节 发热（slug: fever） ==
 *   - 名词解释：5 题
 *   - A1 型题：13 题
 *   - A2 型题：3 题
 *   - 问答题（简答）：5 题
 *   - 独立题小计：26 题（不含组成员）
 *   - 题组：4 组 —— b2 共用题干 2 组（成员 2+3）、b1 共用备选答案 2 组（成员 5+4），组成员共 14 题
 * == 第二节 皮肤黏膜出血（slug: skin-mucosal-bleeding） ==
 *   - 名词解释：1 题
 *   - A1 型题：6 题
 *   - A2 型题：2 题
 *   - 问答题（简答）：1 题
 *   - 独立题小计：10 题（不含组成员）
 *   - 题组：4 组 —— b2 共用题干 2 组（成员 2+3）、b1 共用备选答案 2 组（成员 5+3），组成员共 13 题
 * == 第三节 水肿（slug: edema） ==
 *   - 名词解释：2 题
 *   - A1 型题：8 题
 *   - A2 型题：5 题
 *   - 问答题（简答）：5 题
 *   - 独立题小计：20 题（不含组成员）
 *   - 题组：5 组 —— b2 共用题干 3 组（成员 2+3+4）、b1 共用备选答案 2 组（成员 5+3），组成员共 17 题
 * == 合计 ==
 *   - 独立题合计：56 题（名词解释＋A1＋A2＋问答题，不含组内成员）
 *   - 题组合计：13 组（b2 共 7 组 + b1 共 6 组），组内成员小题 44 题
 *   - 缺失答案：0 题
 *   - 无法提取：0 题
 *   - 说明：原书为扫描件且含大量 OCR 乱码（如“发甘/发生甘”应为“发绀”、“紫癫/紫瘫”应为
 *     “紫癜”、“站膜/勃膜”应为“黏膜”、“斑摩”应为“斑疹”、“尊麻瘁/麻彦”应为“麻疹”、
 *     “槽留热/荷留热”应为“稽留热”、“驰张热”应为“弛张热”、“症疾/疤疾”应为“疟疾”、
 *     “斑痊伤寒”应为“斑疹伤寒”、“珍断/拟珍”应为“诊断/拟诊”、“尿感?”按医学语义恢复等），
 *     已按医学语义恢复为所指内容。水肿部分“血肌酐 350mmol/L”按临床常态校正为 350µmol/L。
 *     所有题目均做轻度改写并重排选项，数值与临床细节保留原值。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

/* ================================================================== *
 *  第一节 发热
 * ================================================================== */

const feverTopic = "fever";
const feverSlugId = "ext-diagnosis-fever-s1-";
const feverLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第一节 发热 习题（PDF 第12–16页）";
const feverKp = "kp-diagnosis-fever";

/** 名词解释 */
const feverTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: `${feverSlugId}term001`, order: 1, knowledgePointId: feverKp, questionKind: "term", status: "available",
    prompt: "名词解释：发热",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["发热", "当机体在致热原作用下或各种原因引起体温调节中枢的功能障碍时，体温升高超出正常范围，称为发热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}term002`, order: 2, knowledgePointId: feverKp, questionKind: "term", status: "available",
    prompt: "名词解释：热型",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["热型", "在不同时间测得的体温数值分别记录在体温单上，将各体温数值点连接起来成为体温曲线，该曲线的不同形态（形状）称为热型。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}term003`, order: 3, knowledgePointId: feverKp, questionKind: "term", status: "available",
    prompt: "名词解释：稽留热",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["稽留热", "体温恒定地维持在 39～40℃ 以上的高水平，达数天或数周，24 小时内体温波动范围不超过 1℃。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}term004`, order: 4, knowledgePointId: feverKp, questionKind: "term", status: "available",
    prompt: "名词解释：弛张热",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["弛张热", "体温常在 39℃ 以上，波动幅度大，24 小时内波动范围超过 2℃，但都在正常水平以上。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}term005`, order: 5, knowledgePointId: feverKp, questionKind: "term", status: "available",
    prompt: "名词解释：间歇热",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["间歇热", "体温骤升达高峰后持续数小时，又迅速降至正常水平，无热期（间歇期）可持续 1 天至数天，如此高热期与无热期反复交替出现。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** A1 型题，选项已随机重排 */
const feverA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: `${feverSlugId}a1001`, order: 1, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "正常成人 24 小时内体温波动的范围一般不超过多少？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["0.5 ℃", "1.5 ℃", "1 ℃", "0.8 ℃", "1.2 ℃"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["1 ℃", "正常人体温 24 小时内波动幅度一般不超过 1℃。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1002`, order: 2, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "成人清晨安静状态下的舌下温度正常范围是多少？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["36～37 ℃", "36.2～37.3 ℃", "36.3～37.2 ℃", "36.6～37.7 ℃", "36.5～37.7 ℃"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["36.3～37.2 ℃", "成人清晨安静状态下舌下测法正常温度为 36.3～37.2℃。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1003`, order: 3, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "直接作用于体温调节中枢引起发热的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["病原体产生的外源性致热原", "血液中的白细胞产生的内源性致热原", "血液中的白细胞及病原体产生的代谢产物", "血液中的白细胞产生的外源性致热原", "病原体产生的内源性致热原"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血液中的白细胞产生的内源性致热原", "外源性致热原需激活白细胞等产生内源性致热原，内源性致热原直接作用于体温调节中枢引起发热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1004`, order: 4, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "低热时体温的范围是多少？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["37.2～38 ℃", "37.3～38.1 ℃", "37.3～38 ℃", "37.1～38 ℃", "37.2～38.1 ℃"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["37.3～38 ℃", "低热指体温在 37.3～38℃。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1005`, order: 5, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "先昏迷后发热可见于下列哪种情况？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["流行性乙型脑炎", "中毒性菌痢", "中暑", "脑出血", "斑疹伤寒"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["脑出血", "脑出血等可先出现昏迷而后发热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1006`, order: 6, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "流行性出血热的常见表现是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["发热伴寒战", "发热伴肝脾肿大", "发热伴昏迷", "发热伴出血", "发热伴口角疱疹"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["发热伴出血", "流行性出血热（肾综合征出血热）常表现为发热伴出血。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1007`, order: 7, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "关于外源性致热原的特点，下列叙述正确的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["分子量小", "直接作用于体温调节中枢", "能激活血液中的中性粒细胞等产生内源性致热原", "可以通过血-脑屏障", "致热性可被蛋白酶类水解"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["能激活血液中的中性粒细胞等产生内源性致热原", "外源性致热原不能直接作用于体温调节中枢，而是激活血液中白细胞（尤其是中性粒细胞等）产生内源性致热原而致发热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1008`, order: 8, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "下列属于常见的功能性低热的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["中暑", "甲亢", "药物热", "感染后低热", "结缔组织病"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["感染后低热", "功能性低热包括感染后低热等，中暑、甲亢、药物热、结缔组织病均非功能性低热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1009`, order: 9, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "引起吸收热的疾病是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["中暑", "急性心肌梗死", "甲亢", "脑震荡", "心力衰竭"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["急性心肌梗死", "急性心肌梗死等坏死组织吸收可产生吸收热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1010`, order: 10, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "稽留热最常见的疾病是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["胸膜炎", "肺结核", "疟疾", "急性肾盂肾炎", "大叶性肺炎"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["大叶性肺炎", "稽留热典型见于大叶性肺炎、斑疹伤寒及伤寒高热期。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1011`, order: 11, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "弛张热最常见的疾病是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["伤寒", "败血症", "肺炎", "布鲁菌病", "支气管炎"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["败血症", "弛张热常见于败血症、风湿热、重症肺结核及化脓性炎症等。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1012`, order: 12, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "间歇热最常见的疾病是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["斑疹伤寒", "大叶性肺炎", "疟疾", "风湿热", "败血症"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["疟疾", "间歇热常见于疟疾、急性肾盂肾炎等。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a1013`, order: 13, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "波状热最常见的疾病是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["霍奇金淋巴瘤", "疟疾", "重症肺结核", "伤寒", "布鲁菌病"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["布鲁菌病", "波状热常见于布鲁菌病。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** A2 型题，选项已随机重排 */
const feverA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: `${feverSlugId}a2001`, order: 1, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "女，24 岁，3 天前野外活动后开始发热，体温 39.0～39.8℃，按中暑处理效果不佳，2 天前出现头痛、呕吐，意识逐渐模糊。该病人最可能的诊断是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["休克", "脑梗死", "乙型脑炎", "败血症", "脑出血"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["乙型脑炎", "夏季野外活动后发热、头痛、呕吐并伴意识障碍，按中暑处理无效，最可能为流行性乙型脑炎。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a2002`, order: 2, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "女，35 岁，尿频、尿急、尿痛伴腰痛、发热、寒战 1 天，右侧肾区有压痛、叩击痛。其发热原因最可能是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["膀胱炎", "急性肾小球肾炎", "慢性肾盂肾炎", "急性肾盂肾炎", "慢性肾小球肾炎"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["急性肾盂肾炎", "尿路刺激征伴寒战高热及肾区压痛、叩击痛，符合急性肾盂肾炎。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}a2003`, order: 3, knowledgePointId: feverKp, questionKind: "a1-single", status: "available",
    prompt: "男，25 岁，胸闷、气短 12 天，伴乏力、低热、盗汗，左侧腋后线第 7 肋间以下语颤减低、叩浊、呼吸音减低，腹部正常。拟诊考虑为哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["大叶性肺炎", "胸膜间皮细胞瘤", "肝硬化", "结核性胸膜炎", "充血性心衰"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["结核性胸膜炎", "低热、盗汗伴单侧胸腔积液征（语颤减低、叩浊、呼吸音减低），拟诊结核性胸膜炎。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 问答题 */
const feverShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: `${feverSlugId}sa001`, order: 1, knowledgePointId: feverKp, questionKind: "short-answer", status: "available",
    prompt: "简述发热的临床分度。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["发热的临床分度", "发热的临床分度分为：低热 37.3～38℃，中等度热 38.1～39℃，高热 39.1～41℃，超高热 41℃ 以上。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}sa002`, order: 2, knowledgePointId: feverKp, questionKind: "short-answer", status: "available",
    prompt: "成年人体温在什么情况下出现生理变异？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["体温生理变异", "①下午较早晨高；②剧烈运动、劳动或进餐后略高；③妇女月经前及妊娠期稍高；④老年人相对低于青壮年；⑤高温环境下体温稍高。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}sa003`, order: 3, knowledgePointId: feverKp, questionKind: "short-answer", status: "available",
    prompt: "简述体温不同测量方法的正常值。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["体温测量正常值", "舌下测温法：36.3～37.2℃；肛测法：36.5～37.7℃；腋测法：36～37℃。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}sa004`, order: 4, knowledgePointId: feverKp, questionKind: "short-answer", status: "available",
    prompt: "发热分为几个阶段？各阶段表现如何？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["发热分期及各期表现", "①体温上升期：骤升型，体温在几小时内达 39～40℃ 或以上，常伴寒战；缓升型，体温逐渐上升，于数日内达高峰，多不伴寒战。②高热期：体温上升达高峰后保持一定时间。③体温下降期：骤降，体温于数小时内迅速降至正常，有时可低于正常，常伴大汗淋漓；渐降，体温于数天内逐渐降至正常。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}sa005`, order: 5, knowledgePointId: feverKp, questionKind: "short-answer", status: "available",
    prompt: "简述热型的临床意义。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["热型的临床意义", "①稽留热：体温恒定维持在 39～40℃ 以上水平达数天或数周，24 小时内波动不超过 1℃，见于大叶性肺炎、斑疹伤寒及伤寒高热期。②弛张热：体温在 39℃ 以上，波动范围超过 2℃，但均在正常水平以上，常见于败血症、风湿热、重症肺结核及化脓性炎症等。③间歇热：高热期与无热期反复交替，常见于疟疾、急性肾盂肾炎等。④波状热：体温逐渐升高数天后又降至正常，数天后再度升高，如此反复多次，常见于布鲁菌病。⑤回归热：体温急骤上升至 39℃ 或以上，持续数天后又骤然下降至正常水平，高热期与无热期各持续若干天后规律性交替一次，可见于回归热、霍奇金淋巴瘤等。⑥不规则热：发热曲线无一定规律，可见于结核病、风湿热、支气管肺炎、渗出性胸膜炎等。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 发热 b2 共用题干第 1 组（腹股沟肿物，成员 2 题） */
const feverB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${feverSlugId}b001m1`, order: 1, knowledgePointId: feverKp, questionKind: "b2", status: "available",
    prompt: "为明确诊断应采用的检查是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["腹部B超", "切开", "诊断性穿刺", "钡剂灌肠", "CT 检查"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["诊断性穿刺", "肿物有波动感提示化脓，诊断性穿刺可明确其性质。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}b001m2`, order: 2, knowledgePointId: feverKp, questionKind: "b2", status: "available",
    prompt: "发现该肿物为脓液、黏稠且有粪臭味，考虑感染的病原菌是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["金黄色葡萄球菌（金葡菌）", "链球菌", "粪杆菌", "铜绿假单胞菌", "大肠埃希菌"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["大肠埃希菌", "脓液黏稠并有粪臭味，提示大肠埃希菌等肠道菌感染。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 发热 b2 共用题干第 2 组（铁锈色痰，成员 3 题） */
const feverB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${feverSlugId}b002m1`, order: 1, knowledgePointId: feverKp, questionKind: "b2", status: "available",
    prompt: "拟诊考虑为哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["克雷伯杆菌肺炎", "支原体肺炎", "肺炎链球菌肺炎", "金葡菌肺炎", "铜绿假单胞菌肺炎"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肺炎链球菌肺炎", "受凉后突然寒战、高热、胸痛并咳铁锈色痰，典型为大叶性肺炎（肺炎链球菌肺炎）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}b002m2`, order: 2, knowledgePointId: feverKp, questionKind: "b2", status: "available",
    prompt: "应首先选择的检查是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["血沉", "胸片", "肺部 CT", "胸部B超", "痰培养"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["胸片", "首选胸片以明确肺部炎性阴影及其范围。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}b002m3`, order: 3, knowledgePointId: feverKp, questionKind: "b2", status: "available",
    prompt: "若该病人出现感染性休克，会出现哪一项表现？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    choices: ["尿量增多", "胸痛", "体温不降", "血压下降，脉压减小", "咳嗽加剧"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血压下降，脉压减小", "感染性休克以血压下降、脉压减小为突出表现。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 发热 b1 第 1 组（发热伴随表现，共用备选答案） */
const feverB003SharedChoices = [
  "发热伴皮疹",
  "发热伴昏迷",
  "发热伴寒战",
  "发热伴肝脾肿大",
  "发热伴关节痛",
];

const feverB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${feverSlugId}b003m1`, order: 1, knowledgePointId: feverKp, questionKind: "b1", status: "available",
    prompt: "流行性乙型脑炎",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["发热伴昏迷", "流行性乙型脑炎等中枢神经系统感染常发热伴昏迷。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}b003m2`, order: 2, knowledgePointId: feverKp, questionKind: "b1", status: "available",
    prompt: "麻疹",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["发热伴皮疹", "麻疹出疹期发热伴皮疹为其特征。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}b003m3`, order: 3, knowledgePointId: feverKp, questionKind: "b1", status: "available",
    prompt: "白血病",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["发热伴肝脾肿大", "白血病等血液系统疾病可发热伴肝脾肿大。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}b003m4`, order: 4, knowledgePointId: feverKp, questionKind: "b1", status: "available",
    prompt: "急性肾盂肾炎",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["发热伴寒战", "急性肾盂肾炎常畏寒、寒战伴发热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}b003m5`, order: 5, knowledgePointId: feverKp, questionKind: "b1", status: "available",
    prompt: "风湿热",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["发热伴关节痛", "风湿热常发热伴关节痛（大关节游走性疼痛）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 发热 b1 第 2 组（热型，共用备选答案） */
const feverB004SharedChoices = [
  "稽留热",
  "间歇热",
  "弛张热",
  "波状热",
  "不规则热",
];

const feverB004Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${feverSlugId}b004m1`, order: 1, knowledgePointId: feverKp, questionKind: "b1", status: "available",
    prompt: "重症肺结核",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["弛张热", "重症肺结核等可表现为弛张热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}b004m2`, order: 2, knowledgePointId: feverKp, questionKind: "b1", status: "available",
    prompt: "大叶性肺炎",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["稽留热", "大叶性肺炎多呈稽留热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}b004m3`, order: 3, knowledgePointId: feverKp, questionKind: "b1", status: "available",
    prompt: "急性肾盂肾炎",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["间歇热", "急性肾盂肾炎可出现间歇热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${feverSlugId}b004m4`, order: 4, knowledgePointId: feverKp, questionKind: "b1", status: "available",
    prompt: "布鲁菌病",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["波状热", "布鲁菌病常呈波状热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const feverGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: `${feverSlugId}b001`, order: 1, questionKind: "b2", status: "available",
    groupPrompt: "女，30 岁，发热 1 周，左腹股沟区可扪及 5cm×4cm×3cm 大小的肿物，有压痛，有波动感。",
    sharedChoices: null,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    members: feverB001Members, sourceIds: [],
  },
  {
    id: `${feverSlugId}b002`, order: 2, questionKind: "b2", status: "available",
    groupPrompt: "男，30 岁，2 天前受凉后突然寒战、高热、胸痛，咳铁锈色痰。",
    sharedChoices: null,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    members: feverB002Members, sourceIds: [],
  },
  {
    id: `${feverSlugId}b003`, order: 3, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: feverB003SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    members: feverB003Members, sourceIds: [],
  },
  {
    id: `${feverSlugId}b004`, order: 4, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: feverB004SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: feverLocator, note: promptNote, sourceIds: [] },
    members: feverB004Members, sourceIds: [],
  },
];

/* ================================================================== *
 *  第二节 皮肤黏膜出血
 * ================================================================== */

const skinTopic = "skin-mucosal-bleeding";
const skinSlugId = "ext-diagnosis-skin-mucosal-bleeding-s2-";
const skinLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第二节 皮肤黏膜出血 习题（PDF 第16–19页）";
const skinKp = "kp-diagnosis-skin-mucosal-bleeding";

/** 名词解释 */
const skinTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: `${skinSlugId}term001`, order: 1, knowledgePointId: skinKp, questionKind: "term", status: "available",
    prompt: "名词解释：皮肤黏膜出血",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["皮肤黏膜出血", "因机体止血或凝血功能障碍所引起，通常以全身或局限性皮肤黏膜自发性出血或损伤后难以止血为临床特征。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** A1 型题，选项已随机重排 */
const skinA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: `${skinSlugId}a1001`, order: 1, knowledgePointId: skinKp, questionKind: "a1-single", status: "available",
    prompt: "血管壁功能异常所致的出血性疾病是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["特发性血小板减少性紫癜", "血友病", "弥散性血管内凝血", "血小板增多症", "过敏性紫癜"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["过敏性紫癜", "过敏性紫癜为血管壁（血管炎性）通透性异常所致的出血性疾病。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}a1002`, order: 2, knowledgePointId: skinKp, questionKind: "a1-single", status: "available",
    prompt: "引起出血性疾病较常见的因素是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["血管外因素", "凝血因子缺乏", "肝素或香豆类药物", "抗凝血物质活性增加", "血小板异常"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血小板异常", "血小板异常是引起出血性疾病的较常见因素。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}a1003`, order: 3, knowledgePointId: skinKp, questionKind: "a1-single", status: "available",
    prompt: "紫癫（紫癜）的皮下出血面积的直径一般为多少？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["3～5mm", "<2mm", "5～6mm", "2～3mm", ">6mm"],
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["3～5mm", "紫癜的皮下出血面积直径一般为 3～5mm。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}a1004`, order: 4, knowledgePointId: skinKp, questionKind: "a1-single", status: "available",
    prompt: "四肢或臀部有对称性、高出皮肤的紫癜，且伴有痒感，首先应考虑哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["维生素K 缺乏", "尿毒症", "过敏性紫癜", "低纤维蛋白原血症", "血小板减少性紫癜"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["过敏性紫癜", "对称性、高出皮肤的紫癜并伴痒感，首先考虑过敏性紫癜。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}a1005`, order: 5, knowledgePointId: skinKp, questionKind: "a1-single", status: "available",
    prompt: "血小板减少性紫癫（紫癜）的出血特点是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["反复皮肤瘀点、瘀斑", "儿童多见，常呈自限性", "内脏及颅内出血常见", "常有脾脏肿大", "常有关节腔出血"],
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["反复皮肤瘀点、瘀斑", "血小板减少性紫癜以反复皮肤瘀点、瘀斑为常见出血特点。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}a1006`, order: 6, knowledgePointId: skinKp, questionKind: "a1-single", status: "available",
    prompt: "遗传性凝血功能障碍常见的疾病是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["维生素K 缺乏症", "血小板无力症", "原发性血小板增多症", "异常球蛋白血症", "血友病"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血友病", "血友病为遗传性凝血因子缺乏所致的出血性疾病。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** A2 型题，选项已随机重排 */
const skinA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: `${skinSlugId}a2001`, order: 1, knowledgePointId: skinKp, questionKind: "a1-single", status: "available",
    prompt: "男，30 岁，乏力、心慌，四肢反复出现紫癜。查体：贫血貌，肝脾淋巴结未触及肿大，双上肢内侧可见片状出血。化验 WBC 0.5×10⁹/L，PLT 50×10⁹/L，Hb 80g/L，骨髓检查为脂肪髓，仅见网状细胞、浆细胞、组织嗜碱性细胞。该病例诊断的可能性最大的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["血小板减少性紫癜", "再生障碍性贫血", "白血病", "脾功能亢进", "过敏性紫癜"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["再生障碍性贫血", "全血细胞减少伴骨髓增生不良（脂肪髓），符合再生障碍性贫血。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}a2002`, order: 2, knowledgePointId: skinKp, questionKind: "a1-single", status: "available",
    prompt: "男，20 岁，突发四肢紫癜，高出皮肤、对称分布，伴关节痛及腹痛。化验 WBC 10×10⁹/L，Hb 112g/L，血小板 200×10⁹/L。该病例的诊断应该是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["再生障碍性贫血", "过敏性紫癜", "血小板减少性紫癜", "急性白血病", "血管性假血友病"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["过敏性紫癜", "高出皮肤、对称分布的紫癜伴腹痛、关节痛而血小板正常，符合过敏性紫癜。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 问答题 */
const skinShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: `${skinSlugId}sa001`, order: 1, knowledgePointId: skinKp, questionKind: "short-answer", status: "available",
    prompt: "皮肤黏膜出血的基本病因是什么？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["皮肤黏膜出血的基本病因", "(1)血管壁功能异常，常见于遗传性出血性毛细血管扩张症、过敏性紫癜，以及严重感染、化学物质中毒、代谢障碍等；(2)血小板异常，常见于特发性血小板减少性紫癜、DIC 等致血小板减少，原发性血小板增多症、慢性粒细胞白血病等致血小板增多，以及血小板无力症、尿毒症等致血小板功能异常；(3)凝血功能障碍，常见于血友病等遗传性疾病、严重肝脏疾病等继发凝血功能障碍性疾病，以及循环血液中抗凝物质增多或纤溶亢进（见于异常蛋白血症、抗凝药治疗过量等）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 皮肤黏膜出血 b2 共用题干第 1 组（自幼出血不止，成员 2 题） */
const skinB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${skinSlugId}b001m1`, order: 1, knowledgePointId: skinKp, questionKind: "b2", status: "available",
    prompt: "该病人最可能的诊断是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["急性白血病", "血友病", "再生障碍性贫血", "血小板减少性紫癜", "过敏性紫癜"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血友病", "自幼轻伤后出血不止并伴关节肿痛，最常见于血友病。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}b001m2`, order: 2, knowledgePointId: skinKp, questionKind: "b2", status: "available",
    prompt: "对该病例具有诊断意义的检查是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["凝血因子检查", "血小板抗体检查", "骨髓穿刺检查", "维生素K 测定", "血常规检查"],
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["凝血因子检查", "血友病为凝血因子缺乏，凝血因子检查具有诊断价值。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 皮肤黏膜出血 b2 共用题干第 2 组（发热皮肤紫癜，成员 3 题） */
const skinB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${skinSlugId}b002m1`, order: 1, knowledgePointId: skinKp, questionKind: "b2", status: "available",
    prompt: "首选的检查是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["腹部B超", "肝功能检查", "血常规检查", "血小板抗体检查", "骨髓检查"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血常规检查", "发热、紫癜、贫血并胸骨压痛提示血液系统疾病，首选血常规检查。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}b002m2`, order: 2, knowledgePointId: skinKp, questionKind: "b2", status: "available",
    prompt: "对确诊最有价值的检查是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["血小板功能检测", "骨髓检查", "凝血因子测定", "血液生化检查", "拍胸片"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["骨髓检查", "确诊髓性血液系统疾病（如白血病）最有价值的检查为骨髓检查。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}b002m3`, order: 3, knowledgePointId: skinKp, questionKind: "b2", status: "available",
    prompt: "该病人发热的原因可能是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    choices: ["血液系统疾病", "全身感染", "风湿性关节炎", "脑膜炎", "慢性肝炎"],
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血液系统疾病", "发热是血液系统疾病（如白血病等）的常见表现之一。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 皮肤黏膜出血 b1 第 1 组（出血性疾病分类，共用备选答案） */
const skinB003SharedChoices = [
  "血小板功能异常",
  "血管壁功能异常",
  "血小板减少",
  "凝血功能障碍",
  "循环血液中抗凝物质增多或纤溶亢进",
];

const skinB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${skinSlugId}b003m1`, order: 1, knowledgePointId: skinKp, questionKind: "b1", status: "available",
    prompt: "特发性血小板减少性紫癜",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血小板减少", "特发性血小板减少性紫癜为免疫性血小板减少所致出血。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}b003m2`, order: 2, knowledgePointId: skinKp, questionKind: "b1", status: "available",
    prompt: "过敏性紫癜",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血管壁功能异常", "过敏性紫癜为血管壁（血管炎性）功能异常所致。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}b003m3`, order: 3, knowledgePointId: skinKp, questionKind: "b1", status: "available",
    prompt: "严重肝病",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["凝血功能障碍", "严重肝病致凝血因子合成减少等，属凝血功能障碍。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}b003m4`, order: 4, knowledgePointId: skinKp, questionKind: "b1", status: "available",
    prompt: "血友病",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["凝血功能障碍", "血友病为凝血因子缺乏，属凝血功能障碍。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}b003m5`, order: 5, knowledgePointId: skinKp, questionKind: "b1", status: "available",
    prompt: "血小板无力症",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血小板功能异常", "血小板无力症为血小板黏附、聚集功能障碍。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 皮肤黏膜出血 b1 第 2 组（出血环节，共用备选答案） */
const skinB004SharedChoices = [
  "血小板减少",
  "红细胞破坏增多",
  "血管脆性增加",
  "凝血因子缺乏",
  "血小板功能障碍",
];

const skinB004Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${skinSlugId}b004m1`, order: 1, knowledgePointId: skinKp, questionKind: "b1", status: "available",
    prompt: "再生障碍性贫血的出血",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血小板减少", "再生障碍性贫血因骨髓生成血小板减少而出血。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}b004m2`, order: 2, knowledgePointId: skinKp, questionKind: "b1", status: "available",
    prompt: "过敏性紫癜的出血",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血管脆性增加", "过敏性紫癜因毛细血管脆性、通透性增加而出血。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${skinSlugId}b004m3`, order: 3, knowledgePointId: skinKp, questionKind: "b1", status: "available",
    prompt: "血友病",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["凝血因子缺乏", "血友病因凝血因子缺乏而出血。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const skinGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: `${skinSlugId}b001`, order: 1, questionKind: "b2", status: "available",
    groupPrompt: "女性，20 岁，自幼有轻伤后出血不止，伴有关节肿痛，反复鼻出血、牙龈出血 1 年余，常见皮肤黏膜出血点，自诉月经量过多。",
    sharedChoices: null,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    members: skinB001Members, sourceIds: [],
  },
  {
    id: `${skinSlugId}b002`, order: 2, questionKind: "b2", status: "available",
    groupPrompt: "男性，15 岁，头晕、乏力、全身疼痛，伴发热、皮肤紫癜半个月余。查体：贫血貌，体温 38.5℃，心肺（－），胸骨压痛（＋），肝肋下 0.5cm，脾肋下 0.5cm。",
    sharedChoices: null,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    members: skinB002Members, sourceIds: [],
  },
  {
    id: `${skinSlugId}b003`, order: 3, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: skinB003SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    members: skinB003Members, sourceIds: [],
  },
  {
    id: `${skinSlugId}b004`, order: 4, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: skinB004SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: skinLocator, note: promptNote, sourceIds: [] },
    members: skinB004Members, sourceIds: [],
  },
];

/* ================================================================== *
 *  第三节 水肿
 * ================================================================== */

const edemaTopic = "edema";
const edemaSlugId = "ext-diagnosis-edema-s3-";
const edemaLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第三节 水肿 习题（PDF 第19–23页）";
const edemaKp = "kp-diagnosis-edema";

/** 名词解释 */
const edemaTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: `${edemaSlugId}term001`, order: 1, knowledgePointId: edemaKp, questionKind: "term", status: "available",
    prompt: "名词解释：水肿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["水肿", "人体组织间隙有过多的液体积聚使组织肿胀称为水肿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}term002`, order: 2, knowledgePointId: edemaKp, questionKind: "term", status: "available",
    prompt: "名词解释：积液",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["积液", "液体积聚发生于体腔内称为积液。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** A1 型题，选项已随机重排 */
const edemaA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: `${edemaSlugId}a1001`, order: 1, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "右心衰竭时，产生水肿的始动因素是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["毛细血管通透性增高", "血浆胶体渗透压降低", "毛细血管滤过压增高", "淋巴液回流受阻", "肾小球滤过率下降"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["毛细血管滤过压增高", "右心衰竭时体循环静脉压升高使毛细血管滤过压增高，是产生水肿的始动因素。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a1002`, order: 2, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "水肿首先出现于身体下垂部位，多见于哪一类水肿？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["肾源性水肿", "黏液性水肿", "心源性水肿", "肝源性水肿", "药物源性水肿"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["心源性水肿", "心源性水肿首先出现于身体的干垂（低垂）部位，如两踝部，晨起较轻、下午或站立活动后加重。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a1003`, order: 3, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "水肿与月经周期有明显关系见于哪一情况？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["黏液性水肿", "血管神经性水肿", "间脑综合征", "经前期紧张综合征", "特发性水肿"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["经前期紧张综合征", "经前期紧张综合征水肿与月经周期有明显关系。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a1004`, order: 4, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "肾病综合征产生水肿的原因是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["毛细血管静水压增高", "毛细血管通透性增高", "血浆胶体渗透压降低", "淋巴液回流受阻", "肾小球滤过率下降"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血浆胶体渗透压降低", "肾病综合征大量蛋白尿致低蛋白血症、血浆胶体渗透压降低，从而产生水肿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a1005`, order: 5, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "局限性水肿常见于哪一情况？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["心力衰竭", "肾源性水肿", "血管神经性水肿", "局部静脉回流受阻", "肝硬化"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["局部静脉回流受阻", "局部静脉回流受阻等可引起局限性水肿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a1006`, order: 6, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "水肿伴大量蛋白尿常见于哪一类水肿？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["营养不良性水肿", "肾病综合征", "心源性水肿", "局部淋巴回流受阻", "肾源性水肿"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾源性水肿", "水肿伴大量蛋白尿提示肾源性水肿（常为肾病综合征）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a1007`, order: 7, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "肝硬化与缩窄性心包炎水肿的鉴别点是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["有无肝大", "有无腹腔积液", "有无下肢水肿", "有无肝功能异常", "有无颈静脉怒张"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["有无颈静脉怒张", "缩窄性心包炎因体循环静脉淤血可致颈静脉怒张，肝硬化一般不出现，故为其鉴别点。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a1008`, order: 8, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "心源性水肿与肾源性水肿的鉴别要点是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["水肿部位", "腹腔积液情况", "水肿程度", "水肿开始部位", "对利尿药反应"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["水肿开始部位", "肾源性水肿自眼睑、颜面开始延及全身、发展迅速、软而移动性大；心源性水肿自足部开始向上延及全身、发展较慢、坚实而移动性较小，故鉴别要点为水肿开始部位。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** A2 型题，选项已随机重排 */
const edemaA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: `${edemaSlugId}a2001`, order: 1, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "女，61 岁，患“风心病二尖瓣狭窄并关闭不全”20 年，10 天前劳累后出现胸闷、心悸，不能平卧及双下肢水肿。查体：双肺干湿啰音，心尖部舒张期奔马律，肝大，肝颈静脉回流征阳性。可能的合并症是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["心律失常", "栓塞", "亚急性细菌性心内膜炎", "肺部感染", "心力衰竭"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["心力衰竭", "不能平卧、双下肢水肿、舒张期奔马律及肝颈静脉回流征阳性，为心力衰竭表现，是可能的合并症。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a2002`, order: 2, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "男，34 岁，心前区疼痛 1 周入院，并出现进行性呼吸困难。查体：颈静脉怒张，右肺叩浊音，可闻及管状呼吸音，心界向两侧扩大且随体位改变，肝大，肝颈静脉回流征阳性。考虑最大可能诊断是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["心绞痛", "心肌梗死", "心力衰竭", "心肌病", "心包积液"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["心包积液", "心界向两侧扩大且随体位改变，伴颈静脉怒张、肝颈静脉回流征阳性，符合心包积液。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a2003`, order: 3, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "女，24 岁，低热、乏力、腹胀 1 个多月。查体：腹部膨胀，可触及不规则包块、不易推动，全腹轻压痛，腹壁柔韧，无反跳痛，移动性浊音阳性。腹腔积液检查：比重 1.020，白细胞 0.6×10⁹/L，淋巴细胞 90%，腺苷脱氨酶活性升高。拟诊考虑为哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["结肠癌腹膜转移", "卵巢囊肿", "肝肾综合征", "肝硬化", "结核性腹膜炎"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["结核性腹膜炎", "低热、腹壁柔韧，腹水为淋巴细胞为主的渗出液且腺苷脱氨酶活性增高，拟诊结核性腹膜炎。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a2004`, order: 4, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "男，49 岁，乏力、食欲缺乏半年，腹胀半个月。查体：腹部膨隆，可见腹壁静脉曲张，移动性浊音阳性，肝肋下未及，脾肋下 3cm，两下肢凹陷性水肿。化验：血清白蛋白 22g/L。拟诊应考虑哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["慢性右心衰", "过敏性紫癜肾炎", "慢性肾小球肾炎", "慢性肾盂肾炎", "肝硬化"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肝硬化", "腹壁静脉曲张、脾大、低白蛋白血症并伴腹水及下肢水肿，拟诊肝硬化。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}a2005`, order: 5, knowledgePointId: edemaKp, questionKind: "a1-single", status: "available",
    prompt: "男，50 岁，持续性腹泻 1 年，每日 4～5 次黄色稀水便或糊状便，食欲明显下降，1 个月来出现腹胀及下肢水肿。查体：全身消瘦，皮肤干燥，腹部轻度膨隆，移动性浊音阳性，肝脾未及，双下肢压陷性水肿。最可能的诊断是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["慢性肾炎", "慢性肾盂肾炎", "黏液性水肿", "老年性水肿", "营养不良性水肿"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["营养不良性水肿", "长期腹泻、食欲下降、消瘦伴全身压陷性水肿，最可能为营养不良性水肿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 问答题 */
const edemaShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: `${edemaSlugId}sa001`, order: 1, knowledgePointId: edemaKp, questionKind: "short-answer", status: "available",
    prompt: "简述产生水肿的主要机制。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["水肿的主要机制", "①钠水潴留；②毛细血管内静水压升高；③毛细血管通透性增强；④血浆胶体渗透压降低；⑤组织液胶体渗透压增高；⑥组织间隙机械压力降低；⑦静脉、淋巴回流障碍。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}sa002`, order: 2, knowledgePointId: edemaKp, questionKind: "short-answer", status: "available",
    prompt: "引起全身水肿的原因有哪些？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["全身水肿的病因", "引起全身水肿的原因有：心源性、肾源性、肝源性、内分泌代谢疾病、营养不良性、妊娠性、结缔组织疾病、变态反应性、药物性、经前期紧张综合征、特发性和功能性。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}sa003`, order: 3, knowledgePointId: edemaKp, questionKind: "short-answer", status: "available",
    prompt: "简述心源性水肿与肾源性水肿的鉴别要点。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["心源性水肿与肾源性水肿的鉴别", "肾源性水肿：从眼睑、颜面开始而延及全身，发展迅速，软而移动性大，伴有其他肾脏病征，如高血压、蛋白尿、血尿、管型尿、眼底改变等。心源性水肿：从足部开始，向上延及全身，发展比较缓慢，坚实，移动性较小，伴有心功能不全病征，如心脏增大、心脏杂音、肝大、静脉压升高等。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}sa004`, order: 4, knowledgePointId: edemaKp, questionKind: "short-answer", status: "available",
    prompt: "简述肝源性水肿的形成机制及临床特点。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肝源性水肿的形成机制及临床特点", "机制：门静脉压力增高、低蛋白血症、肝淋巴液回流障碍、继发性醛固酮增多等因素。临床特点：主要表现为腹腔积液，也可先从踝部水肿逐渐向上蔓延，而头、面部及上肢常无水肿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}sa005`, order: 5, knowledgePointId: edemaKp, questionKind: "short-answer", status: "available",
    prompt: "局部性水肿常见于哪些情况？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["局部性水肿的常见情况", "局部性水肿常见于：①局部静脉回流障碍；②局部淋巴回流障碍；③炎症性水肿；④血管神经性水肿；⑤局部黏液性水肿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 水肿 b2 共用题干第 1 组（间断性颜面水肿，成员 2 题） */
const edemaB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${edemaSlugId}b001m1`, order: 1, knowledgePointId: edemaKp, questionKind: "b2", status: "available",
    prompt: "该病人所患疾病可能为哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["心脏疾病", "特发性水肿", "老年性水肿", "肝脏疾病", "肾脏疾病"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾脏疾病", "高血压、蛋白尿、管型尿、血肌酐与尿素氮升高，提示肾脏疾病。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b001m2`, order: 2, knowledgePointId: edemaKp, questionKind: "b2", status: "available",
    prompt: "拟诊应考虑哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["原发性高血压肾损害", "肾结核", "肾肿瘤", "慢性肾盂肾炎", "慢性肾小球肾炎"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["慢性肾小球肾炎", "蛋白尿、血尿、管型尿伴肾功能损害，病程 10 年，拟诊慢性肾小球肾炎。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 水肿 b2 共用题干第 2 组（吞咽困难、心尖杂音，成员 3 题） */
const edemaB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${edemaSlugId}b002m1`, order: 1, knowledgePointId: edemaKp, questionKind: "b2", status: "available",
    prompt: "该病人最可能的诊断是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["更年期综合征", "肺源性心脏病", "心包积液", "风心病", "慢性肾炎"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["风心病", "心尖部舒张期隆隆样杂音、S1 亢进及二尖瓣开放拍击音，为二尖瓣狭窄特征，最可能为风心病。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b002m2`, order: 2, knowledgePointId: edemaKp, questionKind: "b2", status: "available",
    prompt: "对诊断有决定性意义的检查是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["胸片", "心电图", "尿常规", "肾功能", "心脏超声"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["心脏超声", "心脏超声可确定二尖瓣狭窄等心瓣膜病变，为有决定性意义的检查。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b002m3`, order: 3, knowledgePointId: edemaKp, questionKind: "b2", status: "available",
    prompt: "双下肢水肿的原因是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["并发肾功能损害", "右心功能衰竭", "血浆胶体渗透压过低", "心包积液", "合并营养不良"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血浆胶体渗透压过低", "患者消瘦、吞咽困难，伴营养不良使血浆胶体渗透压过低，可致双下肢水肿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 水肿 b2 共用题干第 3 组（乙肝、腹腔积液，成员 4 题） */
const edemaB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${edemaSlugId}b003m1`, order: 1, knowledgePointId: edemaKp, questionKind: "b2", status: "available",
    prompt: "最可能的诊断是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["原发性肝癌", "结核性腹膜炎", "肝硬化", "腹膜转移癌", "肝肾综合征"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肝硬化", "乙肝病史 10 年，出现腹水，腹水细胞数增多且以中性粒细胞为主，考虑肝硬化合并腹水感染。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b003m2`, order: 2, knowledgePointId: edemaKp, questionKind: "b2", status: "available",
    prompt: "该腹腔积液的性质为哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["脓性", "漏出液", "低蛋白液", "淋巴液", "渗出液"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["渗出液", "腹腔积液蛋白定性阳性、细胞数增多且以中性粒细胞为主，为渗出液。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b003m3`, order: 3, knowledgePointId: edemaKp, questionKind: "b2", status: "available",
    prompt: "主要的治疗是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["开腹探查", "抗结核治疗", "抗感染治疗", "腹腔积液浓缩回输", "放腹腔积液"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["抗感染治疗", "肝硬化腹水合并感染（自发性细菌性腹膜炎），主要治疗为抗感染。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b003m4`, order: 4, knowledgePointId: edemaKp, questionKind: "b2", status: "available",
    prompt: "出现腹腔积液的机制为哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    choices: ["淋巴液增多", "营养不良", "组织液回流障碍", "肾脏损害", "门静脉高压合并腹腔积液感染"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["门静脉高压合并腹腔积液感染", "肝硬化以门静脉高压为主并合并腹腔积液感染，共同促成腹水形成。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 水肿 b1 第 1 组（各类水肿的临床特点，共用备选答案） */
const edemaB004SharedChoices = [
  "水肿以下垂部位明显，晨起较轻",
  "水肿以眼睑部、会阴处明显，晨起较重",
  "水肿为全身性，尤以腹腔积液多见",
  "水肿为非凹陷性",
  "水肿为全身性，伴消瘦",
];

const edemaB004Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${edemaSlugId}b004m1`, order: 1, knowledgePointId: edemaKp, questionKind: "b1", status: "available",
    prompt: "心源性水肿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["水肿以下垂部位明显，晨起较轻", "心源性水肿首先出现于身体下垂部位，白天活动后加重、晨起较轻。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b004m2`, order: 2, knowledgePointId: edemaKp, questionKind: "b1", status: "available",
    prompt: "肝源性水肿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["水肿为全身性，尤以腹腔积液多见", "肝源性水肿为全身性，尤以腹腔积液多见，头面部及上肢常无水肿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b004m3`, order: 3, knowledgePointId: edemaKp, questionKind: "b1", status: "available",
    prompt: "肾源性水肿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["水肿以眼睑部、会阴处明显，晨起较重", "肾源性水肿以眼睑、颜面及会阴部明显，晨起较重。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b004m4`, order: 4, knowledgePointId: edemaKp, questionKind: "b1", status: "available",
    prompt: "黏液性水肿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["水肿为非凹陷性", "黏液性水肿为非凹陷性水肿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b004m5`, order: 5, knowledgePointId: edemaKp, questionKind: "b1", status: "available",
    prompt: "营养不良性水肿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["水肿为全身性，伴消瘦", "营养不良性水肿为全身性水肿并伴消瘦。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 水肿 b1 第 2 组（水肿的机制环节，共用备选答案） */
const edemaB005SharedChoices = [
  "毛细血管滤过压增高",
  "毛细血管通透性增高",
  "静脉淤血",
  "血浆胶体渗透压降低",
  "静脉回流受阻",
];

const edemaB005Members: readonly AssessmentItemDefinition[] = [
  {
    id: `${edemaSlugId}b005m1`, order: 1, knowledgePointId: edemaKp, questionKind: "b1", status: "available",
    prompt: "心源性水肿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["静脉淤血", "心源性水肿主要因体循环静脉淤血、毛细血管滤过压增高所致。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b005m2`, order: 2, knowledgePointId: edemaKp, questionKind: "b1", status: "available",
    prompt: "营养不良性水肿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血浆胶体渗透压降低", "营养不良性水肿因低蛋白血症、血浆胶体渗透压降低而产生。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b005m3`, order: 3, knowledgePointId: edemaKp, questionKind: "b1", status: "available",
    prompt: "局部性水肿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["静脉回流受阻", "局部性水肿多见于局部静脉回流受阻等。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const edemaGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: `${edemaSlugId}b001`, order: 1, questionKind: "b2", status: "available",
    groupPrompt: "男，54 岁，间断性颜面水肿 10 年。查体：血压 150/97mmHg，贫血貌，眼睑及下肢轻度凹陷性水肿。血常规：血红蛋白 90g/L，红细胞 3.5×10¹²/L，尿蛋白（＋＋），尿红细胞 3～5/HPF，蜡样管型 0～2/HPF，血清白蛋白 27g/L，血肌酐 350µmol/L，尿素氮 13mmol/L。",
    sharedChoices: null,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    members: edemaB001Members, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b002`, order: 2, questionKind: "b2", status: "available",
    groupPrompt: "女，52 岁，消瘦、吞咽困难 2 个多月，伴心悸、气短、双下肢水肿。查体：口唇发绀，心尖部舒张期隆隆样杂音，S1 亢进，二尖瓣开放拍击音明显，肺动脉瓣区 S2 亢进分裂。",
    sharedChoices: null,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    members: edemaB002Members, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b003`, order: 3, questionKind: "b2", status: "available",
    groupPrompt: "男，54 岁，乙肝病史 10 年，1 个月来乏力、腹胀，双下肢水肿，1 周来自觉低热、乏力、腹胀日益加重，并出现腹痛。查体：移动性浊音（＋）。腹腔积液检查：黏蛋白定性试验（＋），细胞数 0.8×10⁹/L，WBC 0.6×10⁹/L，中性 90%。",
    sharedChoices: null,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    members: edemaB003Members, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b004`, order: 4, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: edemaB004SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    members: edemaB004Members, sourceIds: [],
  },
  {
    id: `${edemaSlugId}b005`, order: 5, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: edemaB005SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: edemaLocator, note: promptNote, sourceIds: [] },
    members: edemaB005Members, sourceIds: [],
  },
];

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...feverTermItems,
  ...feverA1Items,
  ...feverA2Items,
  ...feverShortAnswerItems,
  ...skinTermItems,
  ...skinA1Items,
  ...skinA2Items,
  ...skinShortAnswerItems,
  ...edemaTermItems,
  ...edemaA1Items,
  ...edemaA2Items,
  ...edemaShortAnswerItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...feverGroups,
  ...skinGroups,
  ...edemaGroups,
];