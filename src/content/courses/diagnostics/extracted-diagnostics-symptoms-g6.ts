import type {
  AssessmentItemDefinition,
  AssessmentItemGroupDefinition,
} from "@/types/learning";

/**
 * 诊断学 学习指导与习题集（第4版）— 第一篇常见症状（血尿、尿频尿急尿痛、少尿无尿多尿、尿失禁、排尿困难）题库提取
 * 来源：《诊断学学习指导与习题集》第4版（人民卫生出版社，主编：万学红、卢雪峰）
 *
 * == 统计报告 ==
 * == 第二十节 血尿（slug: hematuria） ==
 *   - 名词解释：2 题
 *   - A1 型题：10 题
 *   - A2 型题：3 题
 *   - 问答题（简答）：4 题
 *   - 独立题小计：19 题（不含组成员）
 *   - 题组：4 组 —— b2 共用题干 1 组（成员 3）、b1 共用备选答案 3 组（成员 5+4+5），组成员共 17 题
 * == 第二十一节 尿频、尿急与尿痛（slug: urinary-frequency） ==
 *   - 名词解释：3 题
 *   - A1 型题：4 题
 *   - 问答题（简答）：1 题
 *   - 独立题小计：8 题（不含组成员）
 *   - 题组：2 组 —— b1 共用备选答案 2 组（成员 5+5），组成员共 10 题
 * == 第二十二节 少尿、无尿与多尿（slug: urine-output-disorder） ==
 *   - 名词解释：1 题
 *   - A1 型题：6 题
 *   - 问答题（简答）：2 题
 *   - 独立题小计：9 题（不含组成员）
 *   - 题组：5 组 —— b1 共用备选答案 5 组（成员 5+5+6+7+7），组成员共 30 题
 * == 第二十三节 尿失禁（slug: urinary-incontinence） ==
 *   - 名词解释：2 题
 *   - A1 型题：3 题
 *   - A2 型题：1 题
 *   - 问答题（简答）：2 题
 *   - 独立题小计：8 题（不含组成员）
 *   - 题组：2 组 —— b2 共用题干 1 组（成员 2）、b1 共用备选答案 1 组（成员 6），组成员共 8 题
 * == 第二十四节 排尿困难（slug: urination-difficulty） ==
 *   - 名词解释：2 题
 *   - A2 型题：1 题
 *   - 问答题（简答）：2 题
 *   - 独立题小计：5 题（不含组成员）
 *   - 题组：2 组 —— b2 共用题干 1 组（成员 3）、b1 共用备选答案 1 组（成员 5），组成员共 8 题
 * == 合计 ==
 *   - 独立题合计：49 题（名词解释 10 ＋ A1 23 ＋ A2 5 ＋ 问答题 11，不含组内成员）
 *   - 题组合计：15 组（b2 共 3 组 / 成员 8 题；b1 共 12 组 / 成员 65 题），组内成员小题 73 题
 *   - 缺失答案：0 题
 *   - 无法提取：0 题
 *   - 说明：原书为扫描件且含大量 OCR 乱码（如“膀脱/膀肮”应为“膀胱”、“醒固酣/醒固自同”应为
 *     “醛固酮”、“低血押”应为“低血钾”、“血肌酣”应为“血肌酐”、“头子包哗林/头子包瞠林”应为
 *     “头孢唑林”、“环磷酷胶/环磷酌股”应为“环磷酰胺”、“映喃妥因”应为“呋喃妥因”、“皮肤勃膜”
 *     应为“皮肤黏膜”、“日排尿总量”应为“每日排尿总量”、“尿路想室”应为“尿路憩室”、“尿路留/尿满留”
 *     应为“尿潴留”等），已按医学语义恢复为主题所指内容；血肌酐单位按危重肾衰常规恢复为 μmol/L。
 *     所有题目均做轻度改写并重排选项，数值与临床细节一律保留原值。
 *
 * 解析内容位于 answer.content 数组的第二个元素。
 */

const promptNote =
  "题干改写；原题来自用户提供的题集，未经第三方授权审核";
const answerNotice =
  "答案依据上传题集整理并改写，尚未与权威教材交叉核对";

/* ================================================================== *
 *  第二十节 血尿（hematuria）
 * ================================================================== */

const hematuriaLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第二十节 血尿 习题（PDF 第66–70页）";
const hematuriaKp = "kp-diagnosis-hematuria";

const hematuriaTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematuria-s20-term001", order: 1, knowledgePointId: hematuriaKp, questionKind: "term", status: "available",
    prompt: "名词解释：镜下血尿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["镜下血尿", "尿液肉眼观颜色正常，须经显微镜检查方能确定有红细胞的血尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-term002", order: 2, knowledgePointId: hematuriaKp, questionKind: "term", status: "available",
    prompt: "名词解释：血红蛋白尿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血红蛋白尿", "由溶血引起，尿呈均匀暗红色或酱油色，无沉淀，显微镜下无或仅有少数红细胞。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const hematuriaA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematuria-s20-a1001", order: 1, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "在下列引起血尿的疾病中，哪一种不属于全身性疾病？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["败血症", "肾病综合征", "紫癜性肾炎", "狼疮性肾炎", "流行性出血热"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾病综合征", "肾病综合征是肾小球疾病，不属于全身性疾病；紫癜性肾炎、狼疮性肾炎、流行性出血热和败血症均为全身性疾病。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a1002", order: 2, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "下列各项中，不属于尿路邻近器官疾病的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["前列腺炎", "输卵管炎", "出血性膀胱炎", "精囊腺炎", "结肠癌"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["出血性膀胱炎", "出血性膀胱炎为膀胱本身的疾病，属于泌尿系统疾病，而非尿路邻近器官疾病；前列腺炎、输卵管炎、精囊腺炎、结肠癌均为邻近器官疾病。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a1003", order: 3, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "血尿是指尿经离心沉淀后镜检，每高倍视野红细胞有多少个？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["2 个", "10 个以上", "1～2 个", "3 个以上", "5 个"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["3 个以上", "镜检每高倍视野红细胞达 3 个以上即称为血尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a1004", order: 4, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "血尿伴肾绞痛最常见的疾病是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["膀胱结石", "多囊肾", "肾小球肾炎", "输尿管结石", "肾结核"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["输尿管结石", "血尿伴肾绞痛最常见于肾、输尿管结石。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a1005", order: 5, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "下列情况都可出现红细胞尿，但除外哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["感染性心内膜炎", "SLE", "白血病", "肾结核", "急性溶血"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["急性溶血", "急性溶血引起的是血红蛋白尿而非红细胞尿，其余情况均可出现红细胞尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a1006", order: 6, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "一位 50 岁男性出现无痛性血尿，首先应考虑的疾病是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["前列腺增生", "膀胱癌", "肾结石", "膀胱炎", "膀胱结核"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱癌", "中老年人出现无痛性血尿首先应考虑膀胱癌。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a1007", order: 7, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "血尿伴皮肤黏膜出血可见于下列情况，但除外哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["败血症", "流行性出血热", "白血病", "再生障碍性贫血", "肾肿瘤"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾肿瘤", "肾肿瘤引起的血尿为泌尿系统来源，一般不伴皮肤黏膜出血。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a1008", order: 8, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "下列泌尿系统疾病中，不出现血尿的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["IgA 肾病", "非感染性尿道综合征", "肾小球肾炎", "尿路憩室", "薄基底膜肾病"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["非感染性尿道综合征", "非感染性尿道综合征一般不出现血尿；肾小球肾炎、薄基底膜肾病、IgA 肾病、尿路憩室均可出现血尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a1009", order: 9, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "下列血液系统疾病中，不出现血尿的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["过敏性紫癜", "血友病", "再生障碍性贫血", "溶血性贫血", "血小板减少性紫癜"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["溶血性贫血", "溶血性贫血引起血红蛋白尿而非血尿；其余各病均可能引起血尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a1010", order: 10, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "下列药物中，可引起假性血尿的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["环磷酰胺", "利福平", "磺胺类药", "甘露醇", "吲哚美辛"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["利福平", "利福平可使尿呈红色而形成假性血尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const hematuriaA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematuria-s20-a2001", order: 1, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "男，19 岁，受凉后咽痛、发热、咳嗽，1 周后出现颜面及下肢水肿，查尿蛋白（＋）、尿红细胞（＋＋）。最可能的诊断是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["感染性间质性肾炎", "慢性肾小球肾炎", "急性肾小球肾炎", "猩红热", "败血症"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["急性肾小球肾炎", "上呼吸道感染后 1 周出现水肿、蛋白尿及血尿，符合急性肾小球肾炎的典型表现。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a2002", order: 2, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "男，21 岁，自幼发现心脏杂音，最近淋雨后出现高热、活动后气促，并出现肉眼血尿。可能的原因是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["心力衰竭", "败血症", "亚急性细菌性心内膜炎", "再生障碍性贫血", "猩红热"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["亚急性细菌性心内膜炎", "既往有心脏杂音，淋雨后高热并出现肉眼血尿，提示亚急性细菌性心内膜炎并发肾栓塞。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-a2003", order: 3, knowledgePointId: hematuriaKp, questionKind: "a1-single", status: "available",
    prompt: "女，29 岁，新婚后第 2 天出现尿频、尿急，诊断为“蜜月病”，给予磺胺甲噁唑、呋喃妥因口服 1 周后症状缓解，复查尿沉渣白细胞消失，红细胞 5～10 个／高倍视野。引起血尿可能的原因是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["尿路感染加重", "尿源性败血症", "药物对肾间质的损害", "磺胺类药所致再生障碍性贫血", "呋喃类药损害尿路黏膜"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["药物对肾间质的损害", "症状缓解、尿白细胞消失而出现血尿，应考虑磺胺或呋喃类药物引起的肾间质损害。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 血尿 b2 共用题干：A3 型题（1–3 题共用题干）
const hematuriaA3Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematuria-s20-b001m1", order: 1, knowledgePointId: hematuriaKp, questionKind: "b2", status: "available",
    prompt: "该病人出现尿频、尿急、尿痛的原因是下列哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["肾小球疾病引起", "肾小球疾病合并尿路感染", "与长期使用泼尼松有关", "与使用环磷酰胺有关", "肺部感染波及尿路"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾小球疾病合并尿路感染", "肾病综合征大剂量激素及免疫抑制治疗基础上出现尿频尿急尿痛、尿白细胞（＋＋＋），提示合并尿路感染。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b001m2", order: 2, knowledgePointId: hematuriaKp, questionKind: "b2", status: "available",
    prompt: "该病人出现少尿的可能原因是下列哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["肾实质性病变加重", "环磷酰胺引起肾损害", "头孢唑林产生肾损害", "尿路感染引起", "与泼尼松使用有关"],
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾实质性病变加重", "尿量 300ml/d、血肌酐 987μmol/L、尿素氮 20mmol/L 并伴心悸气促，提示肾实质性病变加重致急性肾衰竭。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b001m3", order: 3, knowledgePointId: hematuriaKp, questionKind: "b2", status: "available",
    prompt: "该病人血透后出现血尿的可能原因是下列哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    choices: ["心衰引起", "肾实质损害加重", "与血压升高有关", "与血透时肝素用量过大有关", "与使用环磷酰胺有关"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["与血透时肝素用量过大有关", "血透后出现均一型血尿，多与血透时肝素用量过大有关。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 血尿 b1：第 1 组（1–5 题共用备选答案）
const hematuriaB002SharedChoices = [
  "血尿伴大量蛋白尿",
  "血尿伴肾小管性蛋白尿",
  "血尿伴发热、皮疹",
  "血尿伴肾绞痛",
  "血尿伴活动后心悸、气促",
];

const hematuriaB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematuria-s20-b002m1", order: 1, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "心力衰竭",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血尿伴活动后心悸、气促", "心力衰竭病人活动后可出现心悸、气促，若伴血尿则提示心排血量减少相关肾病。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b002m2", order: 2, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "流行性出血热",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血尿伴发热、皮疹", "流行性出血热可有发热、皮疹（皮肤黏膜出血点）并伴血尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b002m3", order: 3, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "间质性肾炎",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血尿伴肾小管性蛋白尿", "间质性肾炎以肾小管、肾间质损害为主，血尿常伴肾小管性蛋白尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b002m4", order: 4, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "肾小球肾炎",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血尿伴大量蛋白尿", "肾小球肾炎血尿常伴大量蛋白尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b002m5", order: 5, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "肾结石",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血尿伴肾绞痛", "肾结石活动时常表现血尿伴肾绞痛。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 血尿 b1：第 2 组（6–9 题共用备选答案）
const hematuriaB003SharedChoices = [
  "三杯试验第一杯为血尿",
  "三杯试验第二杯为血尿",
  "三杯试验第三杯为血尿",
  "全程血尿",
  "尿棕红色、镜检无红细胞",
];

const hematuriaB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematuria-s20-b003m1", order: 1, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "溶血致血红蛋白尿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿棕红色、镜检无红细胞", "溶血致血红蛋白尿时尿呈棕红色（酱油色），镜检无或极少红细胞。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b003m2", order: 2, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "尿道病变",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["三杯试验第一杯为血尿", "尿道病变出血常表现为三杯试验第一杯为血尿（初始血尿）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b003m3", order: 3, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "膀胱颈部出血",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["三杯试验第三杯为血尿", "膀胱颈部（前列腺部尿道）出血常表现为三杯试验第三杯为血尿（终末血尿）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b003m4", order: 4, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "肾脏病变",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["全程血尿", "肾脏病变出血常表现为全程血尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 血尿 b1：第 3 组（10–14 题共用备选答案）
const hematuriaB004SharedChoices = [
  "膀胱炎",
  "膀胱结石",
  "膀胱癌",
  "膀胱结核",
  "肾小球肾炎",
];

const hematuriaB004Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematuria-s20-b004m1", order: 1, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "排尿时痛、尿流突然中断或排尿困难见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱结石", "膀胱结石常致排尿时痛、尿流突然中断或排尿困难。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b004m2", order: 2, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "血尿伴水肿、高血压见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾小球肾炎", "血尿伴水肿、高血压常见于肾小球肾炎。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b004m3", order: 3, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "尿频、尿急、尿痛均具有见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱炎", "膀胱炎典型表现为尿频、尿急、尿痛同时出现（膀胱刺激征）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b004m4", order: 4, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "无痛性血尿见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱癌", "无痛性血尿首先考虑膀胱癌。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b004m5", order: 5, knowledgePointId: hematuriaKp, questionKind: "b1", status: "available",
    prompt: "尿频、尿急，抗结核治疗 1 周无效应见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱结核", "膀胱结核早期即有尿频、尿急等膀胱刺激征，抗菌治疗无效。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const hematuriaShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-hematuria-s20-sa001", order: 1, knowledgePointId: hematuriaKp, questionKind: "short-answer", status: "available",
    prompt: "简述血尿的病因学分类。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血尿的病因学分类", "血尿病因包括：①泌尿系统疾病，约占 98%，如肾炎、结石、肿瘤；②全身性疾病，约占 1%～2%，包括感染性疾病、血液病、免疫和自身免疫性疾病、心血管疾病；③尿路邻近器官疾病；④化学物品性肾损害；⑤功能性血尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-sa002", order: 2, knowledgePointId: hematuriaKp, questionKind: "short-answer", status: "available",
    prompt: "根据血尿伴随的不同症状，推测判断相应的疾病。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血尿伴随症状与相应疾病", "①伴肾绞痛→肾、输尿管结石；②伴尿流中断或排尿困难→膀胱或尿道结石；③伴膀胱刺激征→膀胱炎和尿道炎；④伴膀胱刺激征、高热、寒战、腰痛→肾盂肾炎；⑤伴水肿、高血压、蛋白尿→肾小球肾炎；⑥伴单侧肾肿块→肿瘤、肾积水、肾囊肿；⑦伴双侧肾肿块→先天性多囊肾；⑧移动性肾脏→肾下垂或游走肾；⑨伴皮肤黏膜及其他部位出血→血液病、某些感染性疾病；⑩合并乳糜尿→丝虫病、慢性肾盂肾炎。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-sa003", order: 3, knowledgePointId: hematuriaKp, questionKind: "short-answer", status: "available",
    prompt: "试述异形血尿形成的原因。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["异形血尿形成机制", "红细胞从肾小球基底膜漏出，经机械摩擦，并通过肾小管在不同梯度渗透压中所经历的化学及物理因素作用，使血红蛋白溢出，细胞形态发生变异，从而形成异形红细胞。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-sa004", order: 4, knowledgePointId: hematuriaKp, questionKind: "short-answer", status: "available",
    prompt: "试述血尿病人的问诊要点。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["血尿病人问诊要点", "①询问尿的颜色；②血尿出现在尿流的哪一段，是否全程血尿，有无血块；③是否伴全身或泌尿系统症状；④有无腰部新近外伤及泌尿道器械检查史；⑤有无高血压及肾炎史；⑥家族中有无耳聋和肾炎史。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 血尿全部题组（b2 A3 共用题干一组 + b1 共用备选答案三组） */
const hematuriaGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-hematuria-s20-b001", order: 1, questionKind: "b2", status: "available",
    groupPrompt: "女性，36 岁，反复出现下肢水肿、蛋白尿 3 年，一直服用泼尼松 30mg/d 治疗。最近 3 天因受凉后出现咽痛、发热、咳嗽住院，发现双下肢膝以下高度水肿，尿蛋白（＋＋＋＋），红细胞 0～3/HPF，并加大泼尼松至 60mg/d 晨顿服，加用环磷酰胺 0.2g 静脉点滴，隔日 1 次。住院第 4 天病人感尿频、尿急、尿痛，查尿常规白细胞（＋＋＋），加用头孢唑林（先锋 V 号）静脉滴注，第 5 天出现水肿加重，尿量 300ml/d，尿素氮 20mmol/L，血肌酐 987μmol/L，并有心悸、气促感，查体心率 110 次/分，双肺湿啰音，血压 165/110mmHg，即行紧急血透，血透 3 小时后气促好转、水肿缓解，但回病房后排出红色尿 100ml，镜检红细胞（＋＋＋），为均一型血尿。",
    sharedChoices: null,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    members: hematuriaA3Members, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b002", order: 2, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: hematuriaB002SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    members: hematuriaB002Members, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b003", order: 3, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: hematuriaB003SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    members: hematuriaB003Members, sourceIds: [],
  },
  {
    id: "ext-diagnosis-hematuria-s20-b004", order: 4, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: hematuriaB004SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: hematuriaLocator, note: promptNote, sourceIds: [] },
    members: hematuriaB004Members, sourceIds: [],
  },
];

/* ================================================================== *
 *  第二十一节 尿频、尿急与尿痛（urinary-frequency）
 * ================================================================== */

const urinaryFrequencyLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第二十一节 尿频、尿急与尿痛 习题（PDF 第70–72页）";
const urinaryFrequencyKp = "kp-diagnosis-urinary-frequency";

const urinaryFrequencyTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-frequency-s21-term001", order: 1, knowledgePointId: urinaryFrequencyKp, questionKind: "term", status: "available",
    prompt: "名词解释：膀胱刺激征",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱刺激征", "病人因膀胱、尿道炎症引起的尿频、尿急、尿痛同时出现的症状，称为膀胱刺激征。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-term002", order: 2, knowledgePointId: urinaryFrequencyKp, questionKind: "term", status: "available",
    prompt: "名词解释：神经源性膀胱",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["神经源性膀胱", "因神经系统疾病导致的膀胱功能异常，常伴有神经系统受损体征，如下肢运动和感觉障碍、肛门括约肌松弛、反射消失等。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-term003", order: 3, knowledgePointId: urinaryFrequencyKp, questionKind: "term", status: "available",
    prompt: "名词解释：生理性尿频",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["生理性尿频", "因饮水过多、精神紧张或气候改变所致的尿频，特点是每次尿量不少，也不伴随尿痛、尿急等其他症状。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const urinaryFrequencyA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-frequency-s21-a1001", order: 1, knowledgePointId: urinaryFrequencyKp, questionKind: "a1-single", status: "available",
    prompt: "尿频、尿急、尿痛同时出现常见于以下疾病，但除外哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    choices: ["急性前列腺炎", "膀胱结核", "神经源性膀胱", "急性膀胱炎", "膀胱癌"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["神经源性膀胱", "神经源性膀胱以排尿功能障碍为主，一般不表现为典型的尿频、尿急、尿痛同时出现；急性膀胱炎、急性前列腺炎、膀胱结核、膀胱癌均可出现。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-a1002", order: 2, knowledgePointId: urinaryFrequencyKp, questionKind: "a1-single", status: "available",
    prompt: "以下疾病中，不会引起多尿性尿频的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    choices: ["尿崩症", "急性肾衰多尿期", "糖尿病", "精神性多饮", "膀胱炎"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱炎", "膀胱炎引起的是炎症性尿频而非多尿性尿频；糖尿病、尿崩症、精神性多饮、急性肾衰多尿期均为多尿性尿频的原因。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-a1003", order: 3, knowledgePointId: urinaryFrequencyKp, questionKind: "a1-single", status: "available",
    prompt: "下列各项中，不属于尿路刺激征表现的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    choices: ["尿频", "尿急", "尿痛", "尿流变细", "排尿不尽"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿流变细", "尿路刺激征指尿频、尿急、尿痛及排尿不尽感等，尿流变细属排尿困难表现，不属于尿路刺激征。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-a1004", order: 4, knowledgePointId: urinaryFrequencyKp, questionKind: "a1-single", status: "available",
    prompt: "以下引起尿急的因素中，错误的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    choices: ["尿道炎症", "尿中含糖量高", "膀胱异物", "前列腺肿瘤", "尿浓缩、酸性高"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿中含糖量高", "尿中含糖量高可引起多尿而非尿急，尿急多见于尿道炎症、膀胱异物、前列腺肿瘤及尿浓缩酸性高刺激等。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 尿频尿急尿痛 b1：第 1 组（1–5 题共用备选答案）
const urinaryFrequencyB001SharedChoices = [
  "尿频、尿急伴肾区叩痛",
  "尿频、尿急伴低热、盗汗",
  "尿频伴口渴多饮",
  "尿频、尿急伴水肿、蛋白尿",
  "尿频伴尿糖升高",
];

const urinaryFrequencyB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-frequency-s21-b001m1", order: 1, knowledgePointId: urinaryFrequencyKp, questionKind: "b1", status: "available",
    prompt: "糖尿病",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿频伴尿糖升高", "糖尿病高渗性利尿可致尿频并伴尿糖升高。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-b001m2", order: 2, knowledgePointId: urinaryFrequencyKp, questionKind: "b1", status: "available",
    prompt: "精神性多饮",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿频伴口渴多饮", "精神性多饮表现为尿频伴口渴多饮。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-b001m3", order: 3, knowledgePointId: urinaryFrequencyKp, questionKind: "b1", status: "available",
    prompt: "肾盂肾炎",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿频、尿急伴肾区叩痛", "肾盂肾炎在膀胱刺激征基础上常伴肾区叩击痛。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-b001m4", order: 4, knowledgePointId: urinaryFrequencyKp, questionKind: "b1", status: "available",
    prompt: "尿路结核",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿频、尿急伴低热、盗汗", "尿路结核的膀胱刺激征常伴低热、盗汗等结核中毒症状。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-b001m5", order: 5, knowledgePointId: urinaryFrequencyKp, questionKind: "b1", status: "available",
    prompt: "肾小球肾炎并尿路感染",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿频、尿急伴水肿、蛋白尿", "肾小球肾炎并尿路感染时，膀胱刺激征同时伴水肿、蛋白尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 尿频尿急尿痛 b1：第 2 组（6–10 题共用备选答案）
const urinaryFrequencyB002SharedChoices = [
  "前列腺增生",
  "输尿管末端结石",
  "急性前列腺炎",
  "膀胱癌",
  "神经源性膀胱",
];

const urinaryFrequencyB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-frequency-s21-b002m1", order: 1, knowledgePointId: urinaryFrequencyKp, questionKind: "b1", status: "available",
    prompt: "伴有神经系统受损体征见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["神经源性膀胱", "神经源性膀胱常伴有神经系统受损体征。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-b002m2", order: 2, knowledgePointId: urinaryFrequencyKp, questionKind: "b1", status: "available",
    prompt: "50 岁以上男性尿频伴进行性尿流变细见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["前列腺增生", "50 岁以上男性尿频伴进行性尿流变细，高度提示前列腺增生。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-b002m3", order: 3, knowledgePointId: urinaryFrequencyKp, questionKind: "b1", status: "available",
    prompt: "尿频、尿急伴会阴、睾丸胀痛见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["急性前列腺炎", "急性前列腺炎尿频、尿急常伴会阴、睾丸胀痛及发热。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-b002m4", order: 4, knowledgePointId: urinaryFrequencyKp, questionKind: "b1", status: "available",
    prompt: "尿频、尿急伴有组织碎片排出见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱癌", "膀胱癌坏死组织脱落可形成组织碎片随尿排出并伴尿频、尿急。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-b002m5", order: 5, knowledgePointId: urinaryFrequencyKp, questionKind: "b1", status: "available",
    prompt: "尿频伴尿流突然中断见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["输尿管末端结石", "输尿管（膀胱）末端结石可致尿频伴尿流突然中断。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const urinaryFrequencyShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-frequency-s21-sa001", order: 1, knowledgePointId: urinaryFrequencyKp, questionKind: "short-answer", status: "available",
    prompt: "试述尿频、尿急、尿痛同时出现可能伴随的症状和常见疾病。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿频尿急尿痛同时出现的伴随症状与疾病", "①伴发热、脓尿，见于急性膀胱炎和尿道炎；②膀胱刺激征存在但不剧烈而伴有双侧腰痛，见于肾盂肾炎；③伴会阴部、腹股沟和睾丸胀痛，见于急性前列腺炎。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 尿频尿急尿痛全部题组（b1 共用备选答案两组） */
const urinaryFrequencyGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-urinary-frequency-s21-b001", order: 1, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: urinaryFrequencyB001SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    members: urinaryFrequencyB001Members, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-frequency-s21-b002", order: 2, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: urinaryFrequencyB002SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryFrequencyLocator, note: promptNote, sourceIds: [] },
    members: urinaryFrequencyB002Members, sourceIds: [],
  },
];

/* ================================================================== *
 *  第二十二节 少尿、无尿与多尿（urine-output-disorder）
 * ================================================================== */

const urineOutputLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第二十二节 少尿、无尿与多尿 习题（PDF 第72–75页）";
const urineOutputKp = "kp-diagnosis-urine-output-disorder";

const urineOutputTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urine-output-disorder-s22-term001", order: 1, knowledgePointId: urineOutputKp, questionKind: "term", status: "available",
    prompt: "名词解释：肾性尿崩症",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾性尿崩症", "肾远曲小管和集合管先天或获得性缺陷，对抗利尿激素反应性降低，水分重吸收减少而出现多尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const urineOutputA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urine-output-disorder-s22-a1001", order: 1, knowledgePointId: urineOutputKp, questionKind: "a1-single", status: "available",
    prompt: "少尿是指 24 小时尿量小于多少？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    choices: ["200ml", "100ml", "400ml", "1000ml", "500ml"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["400ml", "少尿是指 24 小时尿量少于 400ml。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-a1002", order: 2, knowledgePointId: urineOutputKp, questionKind: "a1-single", status: "available",
    prompt: "持续性多尿常见于以下疾病，除外哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    choices: ["尿崩症", "糖尿病", "肾病综合征", "原发性醛固酮增多症", "肾小管酸中毒"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾病综合征", "肾病综合征以大量蛋白尿、低蛋白血症及水肿为主，一般不引起多尿；尿崩症、糖尿病、原发性醛固酮增多症、肾小管酸中毒均可致持续性多尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-a1003", order: 3, knowledgePointId: urineOutputKp, questionKind: "a1-single", status: "available",
    prompt: "少尿可见于以下情况，除外哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    choices: ["休克", "大出血", "心功能不全", "急性肾炎", "原发性醛固酮增多症"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["原发性醛固酮增多症", "原发性醛固酮增多症以高血压、低血钾和多尿为主，一般不引起少尿；休克、大出血、心功能不全、急性肾炎均可致少尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-a1004", order: 4, knowledgePointId: urineOutputKp, questionKind: "a1-single", status: "available",
    prompt: "产生少尿的因素中，不属于肾前性的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    choices: ["水钠丢失", "毛细血管通透性升高水分渗入组织", "肾血管狭窄", "血浆胶体渗透压降低", "肾小球纤维化"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾小球纤维化", "肾小球纤维化属肾脏（肾性）本身病变，非肾前性因素；水钠丢失、水分渗入组织、肾血管狭窄、血浆胶体渗透压降低均为肾前性因素。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-a1005", order: 5, knowledgePointId: urineOutputKp, questionKind: "a1-single", status: "available",
    prompt: "下列各项中，不属于肾后性少尿病因的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    choices: ["尿路结石", "特发性腹膜后纤维化", "严重肾下垂", "肾血管狭窄", "神经源性膀胱"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾血管狭窄", "肾血管狭窄属肾前性或肾血管病变，不属于肾后性病因；尿路结石、特发性腹膜后纤维化、严重肾下垂、神经源性膀胱均可致肾后性少尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-a1006", order: 6, knowledgePointId: urineOutputKp, questionKind: "a1-single", status: "available",
    prompt: "采集多尿病人的病史时，下列各项中不是必需的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    choices: ["多尿开始的时间", "每日排尿总量", "每日饮水量", "是否服用利尿药", "每日摄入盐含量"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["每日摄入盐含量", "多尿病史要点为多尿开始时间、每日排尿总量及饮水量、是否服利尿药等，每日摄入盐含量并非必需内容。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 少尿无尿多尿 b1：第 1 组（1–5 题共用备选答案）
const urineOutputB001SharedChoices = [
  "尿量＜400ml/d（少尿）",
  "尿量≥2500ml/d（多尿）",
  "尿量＜100ml/d（无尿）",
  "多尿而尿比重低",
  "多尿而尿比重正常或增高",
];

const urineOutputB001Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b001m1", order: 1, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "无尿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿量＜100ml/d（无尿）", "无尿指 24 小时尿量少于 100ml。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b001m2", order: 2, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "少尿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿量＜400ml/d（少尿）", "少尿指 24 小时尿量少于 400ml。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b001m3", order: 3, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "多尿",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿量≥2500ml/d（多尿）", "多尿指 24 小时尿量达到或超过 2500ml。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b001m4", order: 4, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "尿崩症",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["多尿而尿比重低", "尿崩症多尿而尿比重低。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b001m5", order: 5, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "糖尿病",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["多尿而尿比重正常或增高", "糖尿病多尿而尿比重正常或增高（尿糖、尿比重升高）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 少尿无尿多尿 b1：第 2 组（6–10 题共用备选答案）
const urineOutputB002SharedChoices = [
  "肾前性少尿",
  "肾性少尿",
  "肾后性少尿",
  "垂体性多尿",
  "溶质性多尿",
];

const urineOutputB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b002m1", order: 1, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "输尿管结石梗阻",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾后性少尿", "输尿管结石梗阻为尿路机械性梗阻，引起肾后性少尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b002m2", order: 2, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "消化道出血",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾前性少尿", "消化道出血致有效血容量减少，引起肾前性少尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b002m3", order: 3, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "急进性肾小球肾炎",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾性少尿", "急进性肾小球肾炎为肾小球病变，引起肾性少尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b002m4", order: 4, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "尿崩症",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["垂体性多尿", "垂体（中枢）性尿崩症为抗利尿激素分泌不足所致垂体性多尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b002m5", order: 5, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "糖尿病",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["溶质性多尿", "糖尿病尿中葡萄糖等溶质增多，渗透性利尿引起溶质性多尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 少尿无尿多尿 b1：第 3 组（11–16 题共用备选答案）
const urineOutputB003SharedChoices = [
  "抗利尿激素分泌减少",
  "肾远曲小管对 ADH 反应性下降",
  "尿中溶质增多形成多尿",
  "肾小管浓缩功能下降",
  "自觉烦渴饮水过多",
];

const urineOutputB003Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b003m1", order: 1, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "精神性多饮",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["自觉烦渴饮水过多", "精神性多饮因自觉烦渴饮水过多而致多尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b003m2", order: 2, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "肾性尿崩症",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["肾远曲小管对 ADH 反应性下降", "肾性尿崩症因肾远曲小管、集合管对 ADH 反应性下降而致多尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b003m3", order: 3, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "糖尿病",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿中溶质增多形成多尿", "糖尿病因尿中溶质增多形成渗透性多尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b003m4", order: 4, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "垂体性尿崩症",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["抗利尿激素分泌减少", "垂体性尿崩症因抗利尿激素分泌减少而致多尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b003m5", order: 5, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "原发性醛固酮增多症",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿中溶质增多形成多尿", "原发性醛固酮增多症以高血压、低血钾致肾浓缩功能障碍而多尿，原书参考答案指向“尿中溶质增多形成多尿”。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b003m6", order: 6, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "原发性甲状旁腺功能亢进",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿中溶质增多形成多尿", "原发性甲状旁腺功能亢进因高血钙等致尿中溶质增多、溶质性利尿而多尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 少尿无尿多尿 b1：第 4 组（17–23 题共用备选答案）
const urineOutputB004SharedChoices = [
  "少尿伴肾绞痛",
  "少尿伴气促、心悸、不能平卧",
  "少尿伴乏力、食欲缺乏、恶心、皮肤黄疸",
  "少尿伴血尿、水肿、高血压",
  "少尿伴尿频、尿急、腰痛",
  "少尿伴尿流细、排尿困难",
  "少尿伴大量蛋白尿、低蛋白血症",
];

const urineOutputB004Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b004m1", order: 1, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "肾病综合征",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 6,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["少尿伴大量蛋白尿、低蛋白血症", "肾病综合征少尿伴大量蛋白尿、低蛋白血症。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b004m2", order: 2, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "肾、输尿管结石",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["少尿伴肾绞痛", "肾、输尿管结石少尿伴肾绞痛。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b004m3", order: 3, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "前列腺增生",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 5,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["少尿伴尿流细、排尿困难", "前列腺增生致尿道梗阻，少尿伴尿流细、排尿困难。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b004m4", order: 4, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "心功能不全",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["少尿伴气促、心悸、不能平卧", "心功能不全少尿伴气促、心悸、不能平卧等心衰表现。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b004m5", order: 5, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "急性肾盂肾炎",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["少尿伴尿频、尿急、腰痛", "急性肾盂肾炎少尿伴尿频、尿急、腰痛（膀胱刺激征伴腰痛）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b004m6", order: 6, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "肝肾综合征",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["少尿伴乏力、食欲缺乏、恶心、皮肤黄疸", "肝肾综合征少尿伴乏力、食欲缺乏、恶心、皮肤黄疸（肝功能损害表现）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b004m7", order: 7, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "急性肾小球肾炎",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["少尿伴血尿、水肿、高血压", "急性肾小球肾炎少尿伴血尿、水肿、高血压。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 少尿无尿多尿 b1：第 5 组（24–30 题共用备选答案）
const urineOutputB005SharedChoices = [
  "多尿伴烦渴、多饮，尿比重＜1.0005",
  "多尿伴多食、消瘦",
  "多尿伴高血压、低血钾",
  "多尿伴骨痛，血 pH 下降",
  "先出现少尿，后出现多尿",
  "多尿伴失眠多梦、抑郁症",
  "多尿伴高血钙、骨密度下降",
];

const urineOutputB005Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b005m1", order: 1, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "甲状旁腺功能亢进",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 6,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["多尿伴高血钙、骨密度下降", "甲状旁腺功能亢进以高血钙致多尿并伴骨密度下降。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b005m2", order: 2, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "垂体尿崩症",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["多尿伴烦渴、多饮，尿比重＜1.0005", "垂体尿崩症多尿伴烦渴多饮，尿比重极低（＜1.0005）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b005m3", order: 3, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "精神性多饮",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 5,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["多尿伴失眠多梦、抑郁症", "精神性多饮常伴失眠多梦、抑郁等精神心理表现。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b005m4", order: 4, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "糖尿病",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["多尿伴多食、消瘦", "糖尿病多尿伴多食、消瘦（三多一少）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b005m5", order: 5, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "急性肾衰竭恢复期",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["先出现少尿，后出现多尿", "急性肾衰竭恢复期先出现少尿，后出现多尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b005m6", order: 6, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "原发性醛固酮增多症",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["多尿伴高血压、低血钾", "原发性醛固酮增多症以高血压、低血钾及多尿为特征。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b005m7", order: 7, knowledgePointId: urineOutputKp, questionKind: "b1", status: "available",
    prompt: "肾小管酸中毒",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["多尿伴骨痛，血 pH 下降", "肾小管酸中毒多尿伴骨痛、代谢性酸中毒（血 pH 下降）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const urineOutputShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urine-output-disorder-s22-sa001", order: 1, knowledgePointId: urineOutputKp, questionKind: "short-answer", status: "available",
    prompt: "试述少尿病人病史询问中的注意事项。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["少尿病史询问注意事项", "①开始出现少尿的时间；②少尿程度及具体量，应以 24 小时尿量为准；③有无引起少尿的病因；④过去和现在是否有泌尿系统疾病；⑤少尿的伴随症状。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-sa002", order: 2, knowledgePointId: urineOutputKp, questionKind: "short-answer", status: "available",
    prompt: "试述引起少尿、无尿的基本病因。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["少尿、无尿的基本病因", "基本病因分三大类：①肾前性：包括有效血容量减少、心脏排血功能下降和肾血管病变；②肾性：包括肾小球和肾小管病变；③肾后性：包括各种原因引起的尿路机械性梗阻、尿路受压，以及其他原因如神经源性膀胱、游走肾等。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 少尿、无尿与多尿全部题组（b1 共用备选答案五组） */
const urineOutputGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b001", order: 1, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: urineOutputB001SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    members: urineOutputB001Members, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b002", order: 2, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: urineOutputB002SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    members: urineOutputB002Members, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b003", order: 3, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: urineOutputB003SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    members: urineOutputB003Members, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b004", order: 4, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: urineOutputB004SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    members: urineOutputB004Members, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urine-output-disorder-s22-b005", order: 5, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: urineOutputB005SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urineOutputLocator, note: promptNote, sourceIds: [] },
    members: urineOutputB005Members, sourceIds: [],
  },
];

/* ================================================================== *
 *  第二十三节 尿失禁（urinary-incontinence）
 * ================================================================== */

const urinaryIncontinenceLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第二十三节 尿失禁 习题（PDF 第75–77页）";
const urinaryIncontinenceKp = "kp-diagnosis-urinary-incontinence";

const urinaryIncontinenceTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-incontinence-s23-term001", order: 1, knowledgePointId: urinaryIncontinenceKp, questionKind: "term", status: "available",
    prompt: "名词解释：尿失禁",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿失禁", "由于膀胱括约肌损伤或神经功能障碍导致排尿自控能力下降或丧失，使尿液不自主地流出。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-term002", order: 2, knowledgePointId: urinaryIncontinenceKp, questionKind: "term", status: "available",
    prompt: "名词解释：神经源性膀胱",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["神经源性膀胱", "因神经系统疾病导致的膀胱功能异常，常伴有神经系统受损体征，如下肢运动和感觉障碍、肛门括约肌松弛、反射消失等。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const urinaryIncontinenceA1Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-incontinence-s23-a1001", order: 1, knowledgePointId: urinaryIncontinenceKp, questionKind: "a1-single", status: "available",
    prompt: "暂时性尿失禁见于下列哪种情况？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    choices: ["脑卒中", "慢性前列腺增生", "尿路感染", "外伤损伤尿道括约肌", "脊髓炎"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿路感染", "尿路感染等可致暂时性（急迫性）尿失禁。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-a1002", order: 2, knowledgePointId: urinaryIncontinenceKp, questionKind: "a1-single", status: "available",
    prompt: "长期性尿失禁见于下列哪种情况？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    choices: ["尿路感染", "急性精神错乱", "痴呆", "药物反应", "心理性抑郁症"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["痴呆", "痴呆等神经精神功能障碍可致长期性尿失禁。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-a1003", order: 3, knowledgePointId: urinaryIncontinenceKp, questionKind: "a1-single", status: "available",
    prompt: "下列因素中，参与尿失禁发病的是哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    choices: ["尿道括约肌受损", "逼尿肌和括约肌功能协同失调", "逼尿肌无反射", "逼尿肌反射亢进", "以上都是"],
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["以上都是", "尿道括约肌受损、逼尿肌无反射、逼尿肌反射亢进、逼尿肌和括约肌功能协同失调等均参与尿失禁的发病。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const urinaryIncontinenceA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-incontinence-s23-a2001", order: 1, knowledgePointId: urinaryIncontinenceKp, questionKind: "a1-single", status: "available",
    prompt: "女性，26 岁，1 周前出现尿频、尿急，尿检有白细胞 3～5 个／高倍视野，服氧氟沙星 1 周无好转，并出现咳嗽时有尿液流出。其尿失禁为下列哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    choices: ["轻度到中度尿失禁之间", "中度尿失禁", "重度尿失禁", "轻度尿失禁", "中度到重度尿失禁之间"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["轻度尿失禁", "咳嗽时才有尿液流出，属轻度（压力性）尿失禁。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 尿失禁 b2 共用题干：A3 型题（1–2 题共用题干）
const urinaryIncontinenceA3Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-incontinence-s23-b001m1", order: 1, knowledgePointId: urinaryIncontinenceKp, questionKind: "b2", status: "available",
    prompt: "其尿失禁属于下列哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    choices: ["轻度到中度尿失禁之间", "中度尿失禁", "重度尿失禁", "轻度尿失禁", "中度到重度尿失禁之间"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["中度尿失禁", "站立、走路、用力时尿液流出，属中度（压力性）尿失禁。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-b001m2", order: 2, knowledgePointId: urinaryIncontinenceKp, questionKind: "b2", status: "available",
    prompt: "其尿失禁的原因可能为下列哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    choices: ["尿路感染", "急性精神错乱", "膀胱膨出", "药物反应", "心理性抑郁症"],
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱膨出", "难产后自觉有物自阴道脱出、用力及站立时尿液流出，符合膀胱膨出（压力性）所致尿失禁。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 尿失禁 b1：第 1 组（1–6 题共用备选答案）
const urinaryIncontinenceB002SharedChoices = [
  "糖尿病性膀胱",
  "神经源性膀胱",
  "急性膀胱炎",
  "上运动神经元病变",
  "慢性阻塞性肺疾病所致腹内压过高",
  "前列腺增生症",
];

const urinaryIncontinenceB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-incontinence-s23-b002m1", order: 1, knowledgePointId: urinaryIncontinenceKp, questionKind: "b1", status: "available",
    prompt: "尿失禁伴排便功能紊乱（如便秘、大便失禁）见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["神经源性膀胱", "神经源性膀胱常伴排便功能紊乱（便秘、大便失禁）。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-b002m2", order: 2, knowledgePointId: urinaryIncontinenceKp, questionKind: "b1", status: "available",
    prompt: "尿失禁伴尿频、尿急、尿痛及脓尿见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["急性膀胱炎", "急性膀胱炎尿失禁伴尿频、尿急、尿痛及脓尿等膀胱刺激征。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-b002m3", order: 3, knowledgePointId: urinaryIncontinenceKp, questionKind: "b1", status: "available",
    prompt: "50 岁以上男性，尿失禁伴进行性排尿困难见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 5,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["前列腺增生症", "50 岁以上男性尿失禁伴进行性排尿困难，首先考虑前列腺增生症。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-b002m4", order: 4, knowledgePointId: urinaryIncontinenceKp, questionKind: "b1", status: "available",
    prompt: "尿失禁伴肢体瘫痪、肌张力增高、腱反射亢进见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["上运动神经元病变", "痉挛性瘫痪（肌张力增高、腱反射亢进）提示上运动神经元病变。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-b002m5", order: 5, knowledgePointId: urinaryIncontinenceKp, questionKind: "b1", status: "available",
    prompt: "尿失禁伴慢性咳嗽、气促见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["慢性阻塞性肺疾病所致腹内压过高", "慢性阻塞性肺疾病腹内压过高，咳嗽用力时出现（压力性）尿失禁。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-b002m6", order: 6, knowledgePointId: urinaryIncontinenceKp, questionKind: "b1", status: "available",
    prompt: "尿失禁伴多饮、多尿和消瘦见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["糖尿病性膀胱", "糖尿病多饮多尿消瘦，可并发糖尿病性膀胱而致尿失禁。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const urinaryIncontinenceShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urinary-incontinence-s23-sa001", order: 1, knowledgePointId: urinaryIncontinenceKp, questionKind: "short-answer", status: "available",
    prompt: "试述尿失禁的形成机制。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿失禁的形成机制", "尿失禁形成机制包括：膀胱和（或）尿道括约肌受损；逼尿肌无反射；逼尿肌反射亢进；逼尿肌和括约肌功能协同失调；膀胱膨出。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-sa002", order: 2, knowledgePointId: urinaryIncontinenceKp, questionKind: "short-answer", status: "available",
    prompt: "试述尿失禁的临床症状和表现形式。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["尿失禁的临床表现形式", "尿失禁的表现形式有：持续性溢尿；间歇性溢尿；压力性溢尿；急迫性溢尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 尿失禁全部题组（b2 A3 共用题干一组 + b1 共用备选答案一组） */
const urinaryIncontinenceGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-urinary-incontinence-s23-b001", order: 1, questionKind: "b2", status: "available",
    groupPrompt: "女性，36 岁，难产后出现尿频、尿急、下腹坠胀、腰酸痛，自觉有物自阴道脱出，排尿后症状缓解。走路、站立、用力提水时有尿液流出。曾到多家医院就诊，服用多种消炎药效果不佳。常出现失眠头昏、心烦意乱、情绪低落。",
    sharedChoices: null,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    members: urinaryIncontinenceA3Members, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urinary-incontinence-s23-b002", order: 2, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: urinaryIncontinenceB002SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinaryIncontinenceLocator, note: promptNote, sourceIds: [] },
    members: urinaryIncontinenceB002Members, sourceIds: [],
  },
];

/* ================================================================== *
 *  第二十四节 排尿困难（urination-difficulty）
 * ================================================================== */

const urinationDifficultyLocator =
  "《诊断学学习指导与习题集》第4版 第一篇常见症状 第二十四节 排尿困难 习题（PDF 第77–79页）";
const urinationDifficultyKp = "kp-diagnosis-urination-difficulty";

const urinationDifficultyTermItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urination-difficulty-s24-term001", order: 1, knowledgePointId: urinationDifficultyKp, questionKind: "term", status: "available",
    prompt: "名词解释：排尿困难",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["排尿困难", "排尿困难是指排尿时须增加腹压才能排出尿液，病情严重时增加腹压也不能将膀胱内的尿排出体外，而形成尿潴留的状态。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urination-difficulty-s24-term002", order: 2, knowledgePointId: urinationDifficultyKp, questionKind: "term", status: "available",
    prompt: "名词解释：急性尿潴留",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["急性尿潴留", "既往无排尿困难的病史，在某些病因作用下尿液潴留，膀胱迅速膨胀，病人常感下腹胀痛并膨隆，尿意急迫，又不能自行排尿。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const urinationDifficultyA2Items: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urination-difficulty-s24-a2001", order: 1, knowledgePointId: urinationDifficultyKp, questionKind: "a1-single", status: "available",
    prompt: "女性，36 岁，难产行阴道侧切后出现排尿疼痛而控制排尿，数小时后出现下腹胀痛、腰酸痛，有尿急感但排不出尿。可能的原因是下列哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    choices: ["神经受损", "精神因素", "膀胱平滑肌受损", "膀胱括约肌受损", "麻醉药作用"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["精神因素", "阴道侧切后因排尿疼痛而控制排尿，属精神（心理）因素引起的排尿困难。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 排尿困难 b2 共用题干：A3 型题（1–3 题共用题干）
const urinationDifficultyA3Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urination-difficulty-s24-b001m1", order: 1, knowledgePointId: urinationDifficultyKp, questionKind: "b2", status: "available",
    prompt: "其基础病因是下列哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    choices: ["膀胱平滑肌受损", "膀胱括约肌受损", "药物副作用", "前列腺增生", "前列腺癌"],
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["前列腺增生", "近 2 年尿频、排尿等待、尿流变细，提示前列腺增生为其基础病因。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urination-difficulty-s24-b001m2", order: 2, knowledgePointId: urinationDifficultyKp, questionKind: "b2", status: "available",
    prompt: "排尿困难最可能的诱因是下列哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    choices: ["膀胱括约肌受损", "药物副作用", "前列腺增生", "前列腺癌", "膀胱平滑肌受损"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["药物副作用", "阿托品为松弛平滑肌药物，可削弱逼尿肌收缩而诱发尿潴留，为此次最可能的诱因。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urination-difficulty-s24-b001m3", order: 3, knowledgePointId: urinationDifficultyKp, questionKind: "b2", status: "available",
    prompt: "排除尿道梗阻最简易可靠的检查方法是下列哪一项？",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    choices: ["腹部 CT", "腹部 B 超", "叩诊膀胱是否增大", "磁共振", "排泄性尿路造影"],
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["腹部 B 超", "腹部 B 超可观察膀胱、前列腺及有无积液，是排除尿道梗阻最简易可靠的检查方法。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

// 排尿困难 b1：第 1 组（1–5 题共用备选答案）
const urinationDifficultyB002SharedChoices = [
  "膀胱颈部结石",
  "膀胱肿瘤",
  "糖尿病神经源性膀胱",
  "脊髓损害",
  "前列腺增生",
];

const urinationDifficultyB002Members: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urination-difficulty-s24-b002m1", order: 1, knowledgePointId: urinationDifficultyKp, questionKind: "b1", status: "available",
    prompt: "排尿困难伴下腹部绞痛并向大腿、会阴方向放射见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 0,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱颈部结石", "膀胱颈部结石致排尿困难伴下腹绞痛并向大腿、会阴方向放射。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urination-difficulty-s24-b002m2", order: 2, knowledgePointId: urinationDifficultyKp, questionKind: "b1", status: "available",
    prompt: "长期无痛性肉眼或镜下血尿，排尿困难进行性加重见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 1,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["膀胱肿瘤", "长期无痛性血尿伴排尿困难进行性加重，首先考虑膀胱肿瘤。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urination-difficulty-s24-b002m3", order: 3, knowledgePointId: urinationDifficultyKp, questionKind: "b1", status: "available",
    prompt: "排尿困难长期伴有血糖、尿糖升高见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 2,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["糖尿病神经源性膀胱", "长期血糖、尿糖升高并排尿困难，提示糖尿病神经源性膀胱。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urination-difficulty-s24-b002m4", order: 4, knowledgePointId: urinationDifficultyKp, questionKind: "b1", status: "available",
    prompt: "排尿困难伴尿流变细、排尿间断见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 4,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["前列腺增生", "前列腺增生致尿道受压，表现排尿困难伴尿流变细、排尿间断。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urination-difficulty-s24-b002m5", order: 5, knowledgePointId: urinationDifficultyKp, questionKind: "b1", status: "available",
    prompt: "排尿困难伴双下肢感觉运动障碍见于",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    correctChoiceIndex: 3,
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["脊髓损害", "脊髓损害可见排尿困难伴双下肢感觉运动障碍。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

const urinationDifficultyShortAnswerItems: readonly AssessmentItemDefinition[] = [
  {
    id: "ext-diagnosis-urination-difficulty-s24-sa001", order: 1, knowledgePointId: urinationDifficultyKp, questionKind: "short-answer", status: "available",
    prompt: "试述阻塞性排尿困难的病因。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["阻塞性排尿困难的病因", "（1）膀胱颈部病变：①膀胱颈部阻塞：被结石、肿瘤、血块、异物阻塞；②膀胱颈部受压：因子宫肌瘤、卵巢囊肿、晚期妊娠压迫；③膀胱颈部器质性狭窄：炎症、先天或后天获得性狭窄等使尿液排出受阻。（2）后尿道疾患：因前列腺增生、前列腺癌、前列腺急性炎症、出血、积脓、纤维化压迫后尿道；以及后尿道本身的炎症、水肿、结石、肿瘤、异物等。（3）前尿道疾患：见于前尿道狭窄、结石、肿瘤、异物、先天畸形。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urination-difficulty-s24-sa002", order: 2, knowledgePointId: urinationDifficultyKp, questionKind: "short-answer", status: "available",
    prompt: "试述功能性排尿困难的病因。",
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    answer: { status: "available", authority: "nur-platform", confidence: "unverified", sourceIds: [], content: ["功能性排尿困难的病因", "（1）神经受损：中枢神经受损，膀胱的压力感受不能上传而致尿潴留；支配膀胱逼尿肌的腹下神经、支配内括约肌的盆神经和支配外括约肌的阴部神经，可因下腹部手术特别是肛门、直肠、子宫等盆腔手术所致外周神经受损。（2）膀胱平滑肌和括约肌病变：糖尿病时膀胱肌球蛋白能量代谢障碍，使用松弛平滑肌的药物如阿托品、654-2、硝酸甘油后可使膀胱收缩无力。（3）精神因素：因排尿环境不良、需绝对卧床或产后、术后排尿疼痛等原因而控制排尿，时间过久即出现排尿困难乃至尿潴留。"], notice: answerNotice },
    scoring: null, sourceIds: [],
  },
];

/** 排尿困难全部题组（b2 A3 共用题干一组 + b1 共用备选答案一组） */
const urinationDifficultyGroups: readonly AssessmentItemGroupDefinition[] = [
  {
    id: "ext-diagnosis-urination-difficulty-s24-b001", order: 1, questionKind: "b2", status: "available",
    groupPrompt: "病人，男性，65 岁，近 2 年来经常有尿频、排尿等待、尿流变细。数小时前因腹痛口服阿托品 1 片，自觉口干、下腹胀痛、腰酸痛，有尿急感但排不出尿。",
    sharedChoices: null,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    members: urinationDifficultyA3Members, sourceIds: [],
  },
  {
    id: "ext-diagnosis-urination-difficulty-s24-b002", order: 2, questionKind: "b1", status: "available",
    groupPrompt: null,
    sharedChoices: urinationDifficultyB002SharedChoices,
    promptSource: { authority: "nur-editorial", wording: "nur-adapted", locator: urinationDifficultyLocator, note: promptNote, sourceIds: [] },
    members: urinationDifficultyB002Members, sourceIds: [],
  },
];

/* ================================================================== *
 *  导出
 * ================================================================== */

export const extractedItems: readonly AssessmentItemDefinition[] = [
  ...hematuriaTermItems,
  ...hematuriaA1Items,
  ...hematuriaA2Items,
  ...hematuriaShortAnswerItems,
  ...urinaryFrequencyTermItems,
  ...urinaryFrequencyA1Items,
  ...urinaryFrequencyShortAnswerItems,
  ...urineOutputTermItems,
  ...urineOutputA1Items,
  ...urineOutputShortAnswerItems,
  ...urinaryIncontinenceTermItems,
  ...urinaryIncontinenceA1Items,
  ...urinaryIncontinenceA2Items,
  ...urinaryIncontinenceShortAnswerItems,
  ...urinationDifficultyTermItems,
  ...urinationDifficultyA2Items,
  ...urinationDifficultyShortAnswerItems,
];

export const extractedGroups: readonly AssessmentItemGroupDefinition[] = [
  ...hematuriaGroups,
  ...urinaryFrequencyGroups,
  ...urineOutputGroups,
  ...urinaryIncontinenceGroups,
  ...urinationDifficultyGroups,
];