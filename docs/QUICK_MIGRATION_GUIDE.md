# NUR LEARN — 快速迁移指南

> 在任意新 AI Agent（Claude Code、Cursor、GitHub Copilot、Codex、Gemini CLI 等）中继续 NUR LEARN 项目开发的一站式操作手册。

---

## 一、迁移文件清单

### 1.1 必复制（核心上下文文件，共 12 个）

这些文件构成新 Agent 理解项目的**最小知识集**：

```
📄 project_summary_and_plan.md          ← 浓缩版项目手册（所有 Agent 先读这个）
📄 AGENTS.md                            ← AI Agent 行为准则 + 代码边界定义
📄 README.md                            ← 项目入口、路由列表、限制说明
📄 design-qa.md                         ← 25 轮设计验证记录
📄 docs/PROJECT_STATE.md               ← 权威真相来源（990 行）
📄 docs/CONTENT_ARCHITECTURE.md        ← 课程模型、类型契约
📄 docs/REPO_WIKI_GUIDE.md             ← Repo Wiki 使用指南
📄 docs/materials/2026-07-18-material-intake-report.md
📄 docs/materials/2026-07-18-material-inventory.md
📄 docs/materials/2026-07-19-tcm-official-pack-v1.md
📄 .env.example                         ← 环境变量模板（无密钥，安全可复制）
📄 package.json                         ← 依赖与脚本定义
```

### 1.2 推荐复制（加速理解，约 2.8 MB）

```
📁 .qoder/repowiki/                     ← 180 个知识卡片 + Wiki 文章
```

### 1.3 可选复制（按需）

```
📄 docs/NEXT_SESSION_PROMPT.md          ← 原有跨会话提示词模板（可作为参考）
📄 CHANGELOG.md                         ← 变更历史
📁 docs/design-references/              ← 设计 QA 截图证据
```

### 1.4 禁止复制

```
⛔ .env.local                           ← 含 API Key，绝对不要分发
⛔ .env                                 ← 含 DATABASE_URL
⛔ prisma/dev.db                        ← 本地 SQLite 数据库
⛔ node_modules/                        ← 在新环境 npm install
⛔ .next/                               ← 构建产物
⛔ tmp/ temp/                           ← 临时文件
```

### 1.5 一键打包命令

在项目根目录运行：

```bash
# 创建迁移包（不含敏感信息）
tar -czf nur-learn-migration.tar.gz \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.env.local' \
  --exclude='.env' \
  --exclude='prisma/dev.db' \
  --exclude='tmp' \
  --exclude='temp' \
  project_summary_and_plan.md \
  AGENTS.md \
  README.md \
  design-qa.md \
  package.json \
  .env.example \
  .qoder/repowiki/ \
  docs/PROJECT_STATE.md \
  docs/CONTENT_ARCHITECTURE.md \
  docs/REPO_WIKI_GUIDE.md \
  docs/QUICK_MIGRATION_GUIDE.md \
  docs/materials/
```

---

## 二、在新 AI Agent 中的初始化步骤

### 步骤 1：打开项目

在新 Agent 中打开 NUR LEARN 项目的工作区目录。确保所有源文件可见。

### 步骤 2：安装依赖

```bash
npm install
```

### 步骤 3：初始化数据库（如使用认证功能）

```bash
npx prisma migrate dev
```

### 步骤 4：配置环境变量

```bash
cp .env.example .env.local
# 编辑 .env.local，填入：
#   DASHSCOPE_API_KEY=xxx          （如需模型功能）
#   AUTH_SECRET=xxx                 （生产环境随机生成）
#   DATABASE_URL=file:./prisma/dev.db
```

### 步骤 5：启动开发服务器

```bash
npm run dev
# 访问 http://localhost:3000
```

### 步骤 6：运行质量检查确认一切正常

```bash
npm run check    # ESLint + TypeScript + 生产构建
npm test         # 140 个测试用例
```

---

## 三、快速让 AI Agent 理解项目的提示词模板

### 3.1 最小版（800 tokens，适合快速上手）

复制以下内容作为新会话的第一条消息：

```markdown
我正在继续开发 NUR LEARN 项目（一个面向中西医结合临床医学专业学生的本地优先学习平台）。

在开始任何修改前，请先阅读以下文件：
1. project_summary_and_plan.md（项目总览）
2. AGENTS.md（代码边界：Tier 1-4）
3. docs/PROJECT_STATE.md 的第 5、8、9 节（已完成功能 + 下一步计划）

当前项目状态（2026-08-06）：
- 20+ 产品路由全部可运行
- 中诊 60 题题库 + 100 分完整模考
- 错题中心 + 弱项回流到周计划
- NUR Agent 3 阶段智能升级完成
- M1 账户认证完成（Prisma + SQLite + JWT）
- npm run check 通过，npm test 140/140

下一步最高优先级：M2 学习状态云同步（学习记忆/题库进度/模考报告的服务端持久化）

关键规则：
- 不要 reset/discard/commit/push/deploy 未经我明确要求
- API Key 仅在 .env.local，绝对不要读/打/提交
- 修改前先读对应模块的 repowiki 知识卡片
- 保持暖象牙纸/黑墨/宋体/方形容器的设计语言
```

### 3.2 完整版（5K tokens，适合复杂任务）

<details>
<summary>点击展开完整提示词模板</summary>

```markdown
我正在继续 NUR LEARN 项目。请严格按照以下步骤理解项目后再行动：

## 第一步：阅读核心文档（按顺序）

1. `project_summary_and_plan.md` — 浓缩版项目手册，一次性了解全貌
2. `AGENTS.md` — 代码四层边界定义、设计系统、操作规则
3. `docs/PROJECT_STATE.md` — 权威真相来源
   - Section 5: 所有已实现功能
   - Section 8.6: 产品化决策与 M1 完成
   - Section 9: 19 步计划完成状态
   - Section 10: 已解决产品问题
4. `docs/CONTENT_ARCHITECTURE.md` — 课程模型 + 类型契约 + 文件结构

## 第二步：理解架构（按需查阅）

- Repo Wiki: `.qoder/repowiki/`
  - 模块知识卡片: `knowledge/zh/` — 每个模块 5 张标准卡片
  - 完整 Wiki: `zh/content/` — 含 Mermaid 图表的深度文档
- 详阅: `docs/REPO_WIKI_GUIDE.md`

## 当前状态（2026-08-06 最新）

### 已完成
✅ M1 账户与认证（Prisma + SQLite + JWT + bcryptjs）
✅ 100 分完整模考（60 题：A1/B1/B2/fill/term/short-answer/case）
✅ B1/B2 组契约（确认语义后实现）
✅ 题库 60 题 + 题库主页
✅ 错题中心 + 薄弱 KP 周计划回流
✅ NUR Agent Phase 1/2/3 + 平台通用医学助手
✅ Base-pack-independent 私人材料分析
✅ 私人学习单元可行动化
✅ 官方 TCM 材料包 v1
✅ Qwen-powered bounded 学习 Agent

### 下一步最高优先级
M2 学习状态云同步：学习记忆的 FSRS 状态、题库进度/收藏/作答、
模考会话/报告 的服务端持久化，首次登录时从 localStorage 上传合并。

## 不可违反的规则

1. **安全**: API Key 仅 .env.local（600 权限），绝不可读/打印/提交/截图
2. **内容**: 不编造教材页码、教师重点、考试频率；缺失标为「待确认」
3. **架构**: Tier 1→4 依赖方向不可逆转；UI 不定义教学内容
4. **设计**: 暖象牙纸、黑墨线、宋体标题、方形容器、朱砂/石板蓝语义色
5. **技术**: TypeScript strict、禁止 any、2-space 缩进、不随意加依赖
6. **操作**: 不 reset/discard/commit/push/deploy 未经明确请求
7. **验证**: 变更后运行 `npm run check` + `npm test` + 浏览器 QA

## 遇到不确定时

先读取对应模块的 repowiki 知识卡片（`.qoder/repowiki/knowledge/zh/...`），
然后读取实际源码验证，再行动。不确定时先询问。
```

</details>

### 3.3 单项任务版（200 tokens，适合聚焦修改）

```markdown
我正在开发 NUR LEARN（中西医结合学习平台，Next.js 16 + React 19 + TypeScript）。

[在此描述你的具体任务]

在修改前请先阅读:
- .qoder/repowiki/knowledge/zh/NUR LEARN.../[对应模块]/概述.md
- .qoder/repowiki/knowledge/zh/NUR LEARN.../[对应模块]/编码规范.md

完成后运行 npm run check 验证。
```

---

## 四、推荐开发流程与工作顺序

### 4.1 新 Agent 启动时的标准流程

```
┌─────────────────────────────────────────────────┐
│ ① 复制迁移包 → 解压到新环境                        │
│ ② npm install → npx prisma migrate dev           │
│ ③ cp .env.example .env.local → 填入必需变量        │
│ ④ npm run dev → 确认 localhost:3000 可访问         │
│ ⑤ npm run check → 确认构建通过                      │
│ ⑥ 发送提示词 3.1 → AI Agent 理解项目               │
│ ⑦ 开始开发                                         │
└─────────────────────────────────────────────────┘
```

### 4.2 推荐的工作顺序（按产品优先级）

| 优先级 | 任务 | 依赖 | 预计复杂度 |
|---|---|---|---|
| **1** | **M2 学习状态云同步** | M1 账户系统 | 高 |
| 2 | M3 会员与配额边界 | M2 | 中 |
| 3 | M4 发布前打磨（SEO/错误边界/导出） | M2 | 中 |
| 4 | M5 部署（Vercel 或国内云） | M2-M4 | 高 |

### 4.3 修改代码的标准 SOP

```
1. 确定影响的 Tier
   ├── Tier 1 (内容真相) → 读 PROJECT_STATE.md + 对应 content/ 知识卡片
   ├── Tier 2 (校验引擎) → 读对应 lib/ 知识卡片 + 跑测试
   ├── Tier 3 (Agent/Builder) → 读对应知识卡片 + 检查 API 边界
   ├── Tier 4 (类型) → 读 types/ 知识卡片 + 检查所有消费者
   └── 自由区 → 读 design-qa.md 对齐设计

2. 实施修改
3. npm run check          ← 每次修改后
4. npm test               ← 涉及 Tier 1-3 时
5. 浏览器验证              ← 涉及 UI 时
6. 更新 PROJECT_STATE.md  ← 产品决策/里程碑变化时
7. 更新 design-qa.md      ← 视觉变化时
```

---

## 五、不同 AI Agent 的兼容性说明

| Agent | Repo Wiki | Mermaid 图 | 建议注入方式 |
|---|---|---|---|
| **Claude Code** | 自动索引 | ✅ 渲染 | 放入 CLAUDE.md system prompt |
| **Cursor** | 自动索引 | ✅ 预览 | 放入 .cursor/rules/ |
| **GitHub Copilot** | 自动索引 | 文本 | 放入 .github/copilot-instructions.md |
| **Codex** | 自动索引 | ✅ 支持 | 通过 AGENTS.md |
| **Gemini CLI** | 自动索引 | 部分 | 通过 GEMINI.md |
| **Windsurf** | 自动索引 | ✅ 支持 | 通过 .windsurfrules |
| **Qoder** | ✅ 原生支持 | ✅ | 自动加载 MEMORY.md + repowiki |

---

## 六、注意事项与常见问题

### 6.1 安全红线

- ⛔ `.env.local` 中的 `DASHSCOPE_API_KEY` 和 `AUTH_SECRET` **绝对不能**进入迁移包、Git、截图或日志
- ⛔ 原始学习资料文件（PDF/DOCX 等）保持只读，不移动、不覆盖、不复制进 `public/`
- ⛔ `prisma/dev.db` 含用户数据，不要分发

### 6.2 常见问题

**Q: 新 Agent 说找不到某个文件？**
A: Repo wiki 中的文件路径（如 `file://src/app/page.tsx`）是相对于项目根目录的。确保新 Agent 的工作区根目录与项目根目录一致。

**Q: `npm run check` 失败？**
A: 常见原因：
1. Node.js 版本 < 24 → 升级 Node
2. `.env` 缺少 `DATABASE_URL` → Prisma 需要
3. TypeScript 严格模式错误 → 检查是否用了 `any`

**Q: 数据库相关错误？**
A: 先运行 `npx prisma migrate dev`，确认 `prisma/dev.db` 存在。SQLite 不需要额外安装。

**Q: Agent 读 repowiki 时上下文太长？**
A: 不要一次性读 180 个文件。告诉 Agent："读取 `.qoder/repowiki/knowledge/zh/.../[模块名]/概述.md`"即可。

**Q: 如何在 Gemini CLI 中使用？**
A: Gemini CLI 读取 `GEMINI.md`（当前指向 `@AGENTS.md`）。可以额外在 system instruction 中加入提示词模板 3.1。

**Q: Mermaid 图表在新 Agent 中无法渲染怎么办？**
A: 即使不渲染，Mermaid 代码中的节点名和关系描述仍然是可读的结构化信息，不影响理解。

### 6.3 当前项目状态速查

```
验证状态:  npm run check ✅ | npm test 140/140 ✅
页面数量:  52 个静态生成页面 + 数个动态 API 路由
数据库:    Prisma 6.10 + SQLite（开发）/ Postgres（生产可切换）
认证:      JWT (jose) + bcryptjs，自建轻量
模型:      DashScope qwen3.7-plus（已配置，可选）
构建:      Next.js 16.2.1 standalone 输出
Node.js:   >= 24
```

### 6.4 更新此指南

项目里程碑发生变化时，请同步更新：
- `project_summary_and_plan.md`（项目总览）
- `docs/PROJECT_STATE.md`（权威真相来源）
- 本文件的状态速查部分

---

## 附录：迁移包快速参考

```
nur-learn-migration.tar.gz
├── project_summary_and_plan.md       ← 第一必读
├── AGENTS.md                         ← 第二必读
├── README.md
├── design-qa.md
├── package.json
├── .env.example
├── .qoder/repowiki/                  ← 知识库（2.8 MB）
├── docs/
│   ├── PROJECT_STATE.md
│   ├── CONTENT_ARCHITECTURE.md
│   ├── REPO_WIKI_GUIDE.md
│   ├── QUICK_MIGRATION_GUIDE.md      ← 本文件
│   └── materials/
│       ├── 2026-07-18-material-intake-report.md
│       ├── 2026-07-18-material-inventory.md
│       └── 2026-07-19-tcm-official-pack-v1.md
└── (源代码在 git 仓库中，不在此包内)
```
