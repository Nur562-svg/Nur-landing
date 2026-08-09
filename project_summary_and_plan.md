# NUR LEARN — 项目总览与下一步行动计划

> **Last updated: 2026-08-08 (M3/M4 完成 + M2 云同步核心落地)**
> 本文档是 NUR LEARN 在不具备完整对话历史时，可被其他 AI Agent（Codex、Claude Code、Gemini CLI、Cursor 等）直接消费的完整项目手册。含项目定位、所有已完成功能、技术栈、下一步计划、注意事项。

---

## 一、项目概述

### 1.1 NUR LEARN 是什么

NUR LEARN 是一个面向**中西医结合临床医学**专业本科生的高质量医学学习平台。首期课程为《中医诊断学》，目标群体是**南京中医药大学、中西医结合临床、大一、2026 学年下学期**的学生。

核心理念："从证据开始辨证"（evidence-first syndrome differentiation）。

### 1.2 产品定位

- **首要目标**：支撑学期全程学习与期末考试
- **次要目标**：研究生入学考试（考研）支持（后期）
- **学习节奏**：每周 3-4 次，每次 30-60 分钟
- **核心差异化**：每个知识点同时引入中医与现代医学视角，用明确的**关系标签**（`可关联` / `帮助理解` / `不可直接等同`）防止虚假等同，通过证据和推理进行教学

### 1.3 关键设计原则

- **不编造证据**：所有学术内容必须有来源出处，缺失材料显示为 `待确认` 或 `待导入`
- **题目权威分离**：题干出处、答案出处、评分标准出处是三个独立维度，绝不混淆
- **本地优先**：当前为纯本地原型，无数据库后端、无 CMS、无认证（M1 刚完成）、无部署
- **课程通用性**：所有 UI 组件从 typed 课程定义渲染，不为每个课程复制页面
- **内容真相与学习状态分离**：课程定义（`src/content/courses/`）是真相层，学习记录是浏览器本地状态

---

## 二、核心内容：所有已完成功能

### 2.1 路由与页面（20+ 产品路由）

| 路由 | 功能 | 状态 |
|---|---|---|
| `/` | 互动式首页，指针跟随圆形揭示，隐藏纹理文字 `你好，成绩将飞速提升` | ✅ 已恢复 |
| `/learn` | 证据优先周学习主页，学习进度、周计划抽屉（含薄弱知识点回流）、可编辑资料 | ✅ 完成 |
| `/login` | 邮箱+密码登录页（JWT 会话） | ✅ 2026-08-06 完成 |
| `/register` | 注册页 | ✅ 2026-08-06 完成 |
| `/wrong-questions` | 错题中心：按知识点聚合错题、薄弱 KP 卡片、深度链接 | ✅ 2026-08-06 |
| `/learn/course-builder` | 课程构建器：材料摄入→DOCX 解析→私人分析→准入记录→人工审批 | ✅ 完成 |
| `/courses/tcm-diagnostics` | 中医诊断学课程工作台：章/节导航、学习阶段、45 分钟学习队列、考试蓝图、自定义考试结构 | ✅ 完成 |
| `/courses/tcm-diagnostics/knowledge-points/diet-and-taste` | `问诊·问饮食口味` 知识点页：取证→对照→输出→迁移四段学习 | ✅ 完成 |
| `.../diet-and-taste/subjective-writing` | 主观题写作室：草稿→NUR 结构参考→逐项自核→改写，含名词解释与简答 | ✅ 完成 |
| `.../diet-and-taste/case-reasoning` | 案例推理室：证据分组→病机评估→暂定辨证→鉴别排除四阶段 | ✅ 完成 |
| `.../knowledge-points/tongue-coating` | 望舌苔知识点 (5 个额外的 TCM 深度循环之一) | ✅ |
| `.../knowledge-points/cold-and-heat` | 问寒热 | ✅ |
| `.../knowledge-points/common-pulses` | 常见病脉 | ✅ |
| `.../knowledge-points/exterior-interior` | 表里辨证 | ✅ |
| `.../knowledge-points/spleen-stomach` | 脾胃病辨证（含合成案例） | ✅ |
| `/courses/physiology/knowledge-points/internal-environment-and-homeostasis` | 生理学 `western-primary` 知识点 | ✅ |
| `.../internal-environment-and-homeostasis/subjective-writing` | 生理学写作室 | ✅ |
| `/courses/tcm-diagnostics/question-bank` | 题库主页（60 题含 A1/B1/B2/填空/名词/简答/案例） | ✅ 2026-08-06 |
| `/courses/tcm-diagnostics/mock-exam` | 100 分完整模考组卷与运行房 | ✅ 2026-08-06 |

### 2.2 课程引擎与数据模型

- **类型契约** (`src/types/learning.ts`)：`CourseDefinition`、`ChapterDefinition`、`KnowledgePointDefinition`、`AssessmentItemDefinition`、`CaseDefinition`、`ExamBlueprint`、`LearnerCourseState`、B1/B2 组契约
- **课程注册** (`src/content/courses/`)：`tcm-diagnostics.ts` + `tcm-diagnostics-deep-loops.ts` + `physiology.ts` + `tcm-diagnostics-question-bank.ts` + `tcm-diagnostics-question-bank-complete.ts` + `tcm-diagnostics-question-bank-groups.ts`
- **材料目录** (`src/content/materials/`)：全局 SHA-256 物料资产、来源族系/衍生关系、隐私/出版状态
- **官方物料包 v1** (`tcm-diagnostics-official-pack-v1.ts`)：9 个包含教材/教师重点/幻灯片/历史考卷 + 2 个明确排除、39 知识点证据矩阵、10/15/14 深度分层
- **课程校验** (`src/lib/course-validation.ts`)：唯一 ID、排序、参考完整性、考试算术、B1/B2 组校验
- **考试蓝图表**：中诊 30(A1) + 10(B1) + 5(B2) + 5(填空) + 15(名词) + 15(简答) + 20(案例) = 100 分

### 2.3 NUR Agent 体系

| 阶段 | 内容 | 状态 |
|---|---|---|
| Phase 0 | 提供者中立 Agent 运行时：4 步确定性地检查结构覆盖，无模型可用时正常运行 | ✅ |
| Phase 1 | FSRS 感知推理：Agent 读取 FSRS 记忆状态（难度/稳定性/遗忘次数），优先薄弱维度 | ✅ |
| Phase 2 | 浮动 Agent UI：FAB 按钮 + 右侧抽屉，支持知识点/写作/案例三个场景 | ✅ |
| Phase 3 | 通用 Q&A 对话：Vercel AI SDK + DashScope qwen3.7-plus 流式对话，含 `structural_analysis` 工具 | ✅ |
| 扩展 | 平台级通用医学助手（`/learn` 和课程工作台均可使用），非课程内容标注为"通用医学知识" | ✅ |
| 方向调整 | Agent 重新定位为"知识点专属写作与推理教练"，深度阅读学生文字、引用具体措辞、针对性诊断 | ✅ |

### 2.4 课程构建器

- **官方包编译**：允许列表的材料包→Qwen 规划→强校验→人工审批（3 次确认）
- **私人材料摄入**：最多 8 文件 / 25MB 每个 / 80MB 总批，浏览器 SHA-256 去重，隐私/来源确认
- **DOCX 本地解析**：Mammoth 1.12 浏览器内转换→语义块提取→分段审核→内容叠加层
- **私人材料分析**：无需官方包，Qwen Function Calling 分解→主题/题目/参考答案草案/不确定性→`partial/insufficient/unmapped`
- **材料准入记录**：8 次人工确认→ `approved-as-local-candidate` →浏览器本地持久化 + JSON 导出
- **私人学习单元**：导入题目→本地草稿/收藏/确认保存/重做/复习排程（复用现有学习记忆合约）

### 2.5 学习记忆与复习

- **FSRS 间隔重复** (`src/lib/fsrs.ts`)
- **确认尝试记录** (`src/lib/learning-memory.ts`)：`LearnerAttemptRecord`，仅显式确认保存后创建
- **A/B 学习辅助**：A=当前作答结构提示（默认开启），B=确认历史回看（默认关闭，首次保存后建议开启）
- **48 小时弱项回流**：同一记忆准则累计漏 3 次不同任务 → 提议复习 → 48 小时后回做 → 自核完成 → 关闭任务

### 2.6 题库与模考

- **中诊题库**：60 题（A1 单选 30 / B1 共用备选答案配伍 10 / B2 共用题干题组 5 / 填空 5 / 名词解释 5 / 简答 10 / 案例 2）
- **模考组卷**：按官方蓝图取 60 题 100 分，客观题自动评分（45 分），主观题待核对
- **错题中心**：从题库练习 + 模考会话读取，按知识点聚合，薄弱 KP 回流到 `/learn` 周计划

### 2.7 账户与认证（M1，2026-08-06 完成）

- 自建轻量认证：bcryptjs 密码哈希 + jose HS256 JWT（30 天 httpOnly cookie）
- 内存限流：同邮箱+IP 连续 5 失败锁 15 分钟
- Prisma 6.10 + SQLite（`prisma/dev.db`），生产可切 Postgres
- `/login` / `/register` 编辑风格页面，支持 `?next=` 回跳
- `/learn` 账户菜单集成真实会话

---

## 三、技术栈

### 3.1 核心依赖

| 类别 | 技术 | 版本 |
|---|---|---|
| 前端框架 | Next.js App Router + React 19 | 16.2.1 / 19.2.4 |
| 语言 | TypeScript strict | ^5 |
| 样式 | Tailwind CSS v4 + CSS Modules | ^4 |
| UI 基元 | shadcn/ui / Radix + Lucide React | ^1.3.0 / ^1.6.0 |
| AI 集成 | Vercel AI SDK (`ai` + `@ai-sdk/react` + `@ai-sdk/openai`) | ^7.0 / ^4.0 / ^4.0 |
| DOCX 解析 | Mammoth | ^1.12 |
| 认证 | bcryptjs + jose | ^3.0 / ^6.2 |
| 数据库 ORM | Prisma 6.10 | ^6.10 |
| 测试 | Node.js 原生 test runner (tsx) | ^4 |

### 3.2 开发环境

- **Node.js**：>= 24
- **运行时**：`npm run dev`（Turbopack）
- **模型提供者**：DashScope (Alibaba Cloud Model Studio)，默认模型 `qwen3.7-plus`
- **环境变量**：`.env`（Prisma）+ `.env.local`（API keys，gitignored）
- **关键环境变量**：`DATABASE_URL`、`DASHSCOPE_API_KEY`、`DASHSCOPE_BASE_URL`、`AUTH_SECRET`

### 3.3 质量检查

```bash
npm run check        # ESLint + TypeScript + production build
npm run quick-check  # 变更感知快速检查
npm test             # 140 个测试用例
```

---

## 四、代码架构与边界

### 4.1 核心分层

| Tier | 职责 | 路径 |
|---|---|---|
| **Tier 1** 内容真相 | 课程定义、知识点、评估题、来源出处、材料目录 | `src/content/courses/` `src/content/materials/` |
| **Tier 2** 校验与评分引擎 | 课程校验、FSRS 算法、学习记忆、考试结构、材料校验 | `src/lib/course-validation.ts` `src/lib/learning-memory.ts` `src/lib/fsrs.ts` 等 |
| **Tier 3** 构建与 Agent 引擎 | 课程构建器、NUR Agent 运行时、提供者适配器 | `src/lib/course-builder/` `src/lib/nur-agent/` |
| **Tier 4** 数据契约 | TypeScript 类型定义 | `src/types/` |
| **自由变更区** | UI 组件、页面路由、CSS Modules、hooks、demo 数据 | `src/components/` `src/app/` `src/hooks/` |

### 4.2 依赖方向（不可逆转）

```
UI (components/app) → lib/services → types
```

内容真相单向流动：`src/content/` → selectors → components。组件决不定义教学内容。

### 4.3 关键文件速查

```
src/types/learning.ts                       课程与学习状态类型契约
src/types/nur-agent.ts                       NUR Agent 请求/响应契约
src/types/course-builder.ts                  课程构建器契约
src/types/material-*.ts                      材料摄入/解析/准入契约
src/content/courses/tcm-diagnostics.ts       中诊课程定义
src/content/courses/tcm-diagnostics-deep-loops.ts  5 个 TCM 深度知识点
src/content/courses/physiology.ts            生理学课程定义
src/content/courses/tcm-diagnostics-question-bank*.ts  题库（60 题 + 分组）
src/content/courses/index.ts                 课程注册表
src/content/materials/material-catalog.ts    全局材料目录
src/content/materials/tcm-diagnostics-official-pack-v1.ts  官方物料包 v1
src/lib/course-validation.ts                 课程校验
src/lib/course-selectors.ts                  课程数据选择器
src/lib/learning-memory.ts                   学习记忆与复习
src/lib/fsrs.ts                              FSRS 算法
src/lib/mock-exam.ts                         模考组卷引擎
src/lib/wrong-questions.ts                   错题聚合
src/lib/course-builder/                      课程构建引擎
src/lib/nur-agent/                           NUR Agent 引擎
src/lib/auth/                                认证服务层
src/lib/prisma.ts                            Prisma 单例
src/app/api/nur-agent/route.ts               Agent API
src/app/api/nur-agent/chat/route.ts          Agent 对话 API
src/app/api/course-builder/route.ts          课程构建 API
src/app/api/auth/                            认证 API
prisma/schema.prisma                         数据库 Schema
```

---

## 五、下一步行动计划

### 5.1 当前已完成内容
**✅ M2 学习状态云同步 核心完成（2026-08-08）**：
- Prisma 模型 + server 端 record* / mergeLocalStateOnLogin / getLearnerStateForUser
- /api/learn/sync 路由 + payload 构建 + 防抖 trigger
- 登录后 push local + pull server + mergeServerStateIntoLocal（dashboard useEffect）
- 私人 admission consent gate 已包含在 payload
- 类型清理（移除 no-explicit-any，严格类型）
- UI 文案更新为支持同步
- 仍为 local-first，跨设备/完整可靠性为后续增量


根据 `docs/PROJECT_STATE.md` 第 9 节，前 19 个计划步骤全部完成。最近完成的：

- ✅ M1 账户与认证（2026-08-06）
- ✅ 100 分完整模考（2026-08-06）
- ✅ B1/B2 组契约与渲染
- ✅ 题库 60 题
- ✅ 错题中心 + 薄弱 KP 周计划回流
- ✅ NUR Agent Phase 1/2/3 + 平台级通用助手
- ✅ Base-pack-independent 私人材料分析
- ✅ 私人学习单元可行动化（草稿/收藏/确认/重做/复习）

**✅ M3 完成记录（用户 2026-08-08 指定任务）**：
- 1. **Agent 调用真正接上** — 客户端 `recordAgentCallUsage()` 已接在 chat handleSubmit + pilot requestReview；服务端两个 Agent 路由（structured + chat）已记录 `recordServerUsage` 并前置门控。
- 2. **Server 持久化构建历史** — `User.usage` JSON（courseBuilds / agentCalls）已通过 Prisma 持久化；所有 Course Builder（private/normal）和 Agent 调用均调用 `recordServerUsage`；`computeUserQuotas` 正确合并 server + client bump。
- 3. **更多门控** — 新增 `checkAndEnforceQuota` helper，免费用户超限返回 429 + 清晰错误；Course Builder 两路径、Agent 两路径均在模型调用**前**执行 gate；客户端 workbench 增加预检 + 按钮 disabled 保护；UI 配额展示已就位。
- 4. 自完善（用户授权“然后你觉得哪些地方需要完善的，你就自行完善就好了”） — 配额事件、错误处理、构建历史记录、demo 清理等细节已补齐。
- 5. **M4 发布前打磨** ✅ 已完成（2026-08-08）：所有项目落地并通过 typecheck/build 验证

**已标记/删除完成部分**：M3 相关优先级已从“下一步”转为已完成说明（见 5.2 更新）。

### 5.2 下一步优先级（按顺序）

1. **M2 学习状态云同步** ✅ 核心已落地（最高优先级剩余：可靠性/完整迁移/部署后测试）
   - 学习记忆（FSRS 状态、确认尝试）、题库进度/收藏/作答、模考会话/报告的账户绑定
   - 服务端持久化（Prisma）
   - 首次登录从 localStorage 上传合并
   - 私人材料准入记录上云需独立明确同意（learner-private 边界保持）

2. **M3 会员与配额边界** ✅ **已完成（2026-08-08）**
   - Agent 调用、server 持久化构建历史、更多门控 + 自完善已全部落地
   - 见 5.1 详细列表

3. **M4 发布前打磨** ✅ **已完成（2026-08-08）**
   - SEO 元数据、robots/sitemap 完善（/learn + course-builder + mock-exam + 根布局）
   - 错误边界 + loading 态
   - 用户数据导出（可复用 lib + attempts/fsrs/qb/mocks/admission 等全源）
   - 移动端细节 + touch 优化（44px targets、多 .module.css + globals）
   - a11y 改进（aria-labels、aria-hidden、focus-visible）
   - Console 清理（生产 guard）+ 性能小优化
   - 所有 type 回归已修复，npm run check 通过
   - 复用现有 contracts，不新增大模型/支付

4. **M5 部署**
   - Vercel（无需服务器）或国内云（需服务器+域名+备案）
   - 生产环境 AUTH_SECRET 更换、切 Postgres、登录限流换共享存储
   - **当前暂缓，待用户采购域名后决策**

### 5.3 产品方向（用户确认）

- **暂不部署**（服务器与域名待购买）
- 先把代码层产品化完成
- 四个子方向：账户与云同步 → 部署上线（暂缓）→ 发布前打磨 → 会员与配额边界

---

## 六、设计系统

### 6.1 视觉方向

- **暖象牙白纸**背景 (`#f4efe4` 等暖色系)
- **黑色墨线**，一像素编辑规则
- **宋体风格**中文展示标题，克制的无衬线元数据
- **方形容器**，几乎无圆角
- **朱砂红**（muted cinnabar）用于活跃/关注状态
- **石板蓝**（slate blue）用于现代医学/焦点语义
- **薄 Lucide 轮廓图标**
- 无渐变、无玻璃卡片、无装饰 blob、无 emoji 替代

### 6.2 排版

- 中文标题：系统宋体降级栈
- 元数据/导航/进度：系统无衬线
- 浅色超大幽灵字（ghost typography）用于装饰

### 6.3 响应式断点

- 1280px：最大宽桌面
- 1200px / 1050px / 900px：列重排
- 700px：单列布局，章节变为水平滚动条
- 560px：表单单列
- 390px：最小支持宽度

---

## 七、开发注意事项

### 7.1 代码规则

- **TypeScript strict**，禁止 `any`
- 命名导出，PascalCase 组件，camelCase 工具函数
- 2 空格缩进
- 偏好 Server Components，仅在有状态/事件处理/浏览器 API 时才用 Client Components
- 用 `next/link` 做内部路由
- 用 CSS Modules 或现有 Tailwind 约定，**禁止内联样式**
- **不添加依赖**当 TypeScript + 小工具就能完成时
- Next.js 16.2.1 有 breaking changes，编写框架代码前阅读 `node_modules/next/dist/docs/`

### 7.2 内容规则

- **从不编造**：未提供的教材页码、教师重点、考试频率必须保留为 `待确认`
- 课程 UI 必须从 typed 课程定义生成，不按课程复制
- 缺失内容暴露 `待确认` 或 `待导入`，不隐藏
- 学员进度在 `src/content/demo/` 中保持 demo 标识
- 现代医学与 TCM 保留分离评分但进入训练，关系标签（`可关联`/`帮助理解`/`不可直接等同`）严格使用
- B1/B2 语义已确认：B1=共用备选答案配伍题；B2=共用题干题组

### 7.3 数据安全

- **API keys 仅在服务器端**（`.env.local`，gitignored，mode 600），绝对不进入浏览器 bundle
- 原始二进制文件、`File` handles、绝对路径、API keys 决不入截图、文档、commit
- 私人材料分析仅发送已接纳摘录文本，不发送原始文件
- JWT secret（`AUTH_SECRET`）生产环境必须更换

### 7.4 操作规则

- **不要重置、丢弃、暂存、提交、推送或部署**未经用户明确请求
- worktree 可能包含未提交的实现文件和截图，属于已完成的项目
- 编辑 `AGENTS.md` 后运行 `bash scripts/sync-agent-rules.sh`
- 实现变更后运行 `npm run check` 和浏览器验证
- 视觉变更后更新 `design-qa.md` 和相关截图

---

## 八、快速启动

```bash
# 安装依赖
npm install

# 初始化数据库（首次）
npx prisma migrate dev

# 启动开发服务器
npm run dev
# 访问 http://localhost:3000

# 质量检查
npm run check       # ESLint + TypeScript + 生产构建
npm test            # 单元测试（140 用例）
npm run quick-check # 快速变更检查
```

### 可选：启用 DashScope（课程构建器 + Agent 对话）

```bash
# 在 .env.local 中设置（文件已 gitignored）
DASHSCOPE_API_KEY=your-key
# 可选：
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
```

---

## 九、关键参考文档

| 文档 | 路径 | 用途 |
|---|---|---|
| 项目状态 | `docs/PROJECT_STATE.md` | 单一真相来源，所有产品决策、里程碑、验证记录 |
| 内容架构 | `docs/CONTENT_ARCHITECTURE.md` | 课程模型、类型契约、验证门、实现结果 |
| 设计 QA | `design-qa.md` | 25 轮设计验证记录，每轮通过/失败详情 |
| README | `README.md` | 项目入口，路由列表，技术栈 |
| 新会话提示 | `docs/NEXT_SESSION_PROMPT.md` | 在新 AI 会话中继续工作的复制即用提示 |
| 材料摄入报告 | `docs/materials/2026-07-18-*.md` | 源审计、覆盖报告、冲突登记 |
| 官方包审计 | `docs/materials/2026-07-19-tcm-official-pack-v1.md` | 官方物料包清单、证据矩阵 |
| 代理规则 | `AGENTS.md` | AI Agent 行为指南，代码边界定义 |

---

## 十、继续工作的建议

如果你在其他 AI Agent 中继续 NUR LEARN 的开发，最有效的方法：

1. **让它先读** `docs/PROJECT_STATE.md` — 这是权威的项目状态记录（本文档是其浓缩版）
2. 然后读 `docs/CONTENT_ARCHITECTURE.md` — 理解数据模型和代码组织
3. 根据需要参考 `design-qa.md` 来理解视觉规范
4. **决不让 AI 在未理解代码边界（Tier 1–4）前直接修改核心逻辑**

**当前优先级（用户 2026-08-08 指定）**：**M2 学习状态云同步核心已实现（server 持久化 + 登录合并 + 双向 + 类型严格 + admission gate）。M3/M4 已完成。**
## 十一、2026-08-08 更新：M2 可靠登录合并 + 双向同步骨架完成 + 文件审计 + 转接准备

**本会话高效自完成（M2 可靠登录合并骨架）：**
- 集中 performReliableLoginMerge()（src/lib/learner-state-sync.ts）：登录全量上传 (delta=false) + 顺序 GET 下载 + mergeServerStateIntoLocal + 状态更新。
- Dashboard 登录 effect 已切换为使用该可靠入口（去重保留）。
- 所有写路径已接 trigger：learning-memory、question-bank-store、mock-exam-store。
- 验证通过：npm run check 0 errors，build 成功。
- M2 代码变更已落地（本次会话）。

**文件审计（完整扫描）：**
- 无 0 字节文件。
- 明确 stub/遗留（建议删除）：
  - GEMINI.md (11 bytes，只含 "@AGENTS.md")
  - CLAUDE.md (相同 stub)
  - .gemini/ （空目录，遗留自早期模板）
- .qoder/MEMORY.md 小 stub；tmp/ 有 artifacts（保留）。
- 推荐清理命令已记录在下方。

**剩余任务全列表（已同步补入 PROJECT_STATE.md）：**
1. M2 可靠登录合并剩余（跨设备测试、consent 边界、增量优化）。
2. M4 发布前打磨：SEO、robots/sitemap、ErrorBoundary、export-learner-data 增强、44px touch + a11y、perf/console guard、浏览器 QA + design-qa 更新。
3. M5 部署（待域名）。
4. 内容 pending（9页 rubric、部分 unverified 答案、错题中心主观/FSRS 增强）。
5. 转接维护：保持本文件、PROJECT_STATE、NEXT_SESSION_PROMPT 最新。

**当前优先级更新**：M2 可靠登录合并核心已落地（本次）。M4 打磨启动。M5 待决策。
