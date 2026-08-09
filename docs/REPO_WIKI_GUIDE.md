# NUR LEARN Repo Wiki 跨 Agent 使用指南

> 本文档详细说明如何将 Qoder 生成的 repo wiki（`.qoder/repowiki/`）导出到其他 AI Agent 中继续使用。

---

## 一、Repo Wiki 概览

### 1.1 Wiki 位置与规模

```
.qoder/repowiki/                    (总计约 2.8 MB, 180 个 .md 文件)
├── knowledge/zh/                    ← 模块级知识卡片 (76 个 .md)
│   ├── _index.yaml                  ← 全部模块索引（含作用域与依赖关系）
│   └── NUR LEARN ...（根工程）/     ← 12 个子模块目录
│       ├── 概述.md
│       ├── 架构设计.md
│       ├── 技术栈.md
│       ├── 编码规范.md
│       ├── 特殊配置与命令.md
│       └── _module.yaml
├── zh/content/                      ← 全量 Wiki 文章 (104 个 .md)
│   ├── 项目概述.md                  ← 最核心总览文章
│   ├── 快速开始.md
│   ├── 架构设计/
│   ├── 核心功能模块/
│   ├── 数据模型设计/
│   ├── 学习记忆系统/
│   ├── AI 集成系统/
│   ├── API 接口文档/
│   ├── 组件开发指南/
│   ├── 内容管理系统/
│   ├── 测试策略/
│   ├── 部署指南/
│   └── ...
└── zh/meta/
    └── repowiki-metadata.json       ← 元数据 (459 KB)
```

### 1.2 两层结构对比

| 特性 | `knowledge/zh/` 知识卡片 | `zh/content/` Wiki 文章 |
|---|---|---|
| **粒度** | 每个模块 5 张卡片，每卡 1-10 行 | 每篇 200-400 行，含 Mermaid 图表 |
| **内容** | 职责一句话、架构分层、技术栈列表、编码规则、配置命令 | 完整分析：简介、结构、组件、架构、依赖、性能、排障 |
| **图表** | 无 | 含 Mermaid（流程图/类图/时序图/架构图） |
| **文件引用** | 有作用域（scope）声明 | 有逐段的 `cite` 文件引用 |
| **适合场景** | 快速理解模块职责、编码前查规范 | 深入理解系统设计、新 Agent 入门 |
| **上下文占用** | 低（几百 tokens/模块） | 中高（几千 tokens/文章） |

---

## 二、Repo Wiki 包含的知识卡片类型

### 2.1 模块级知识卡片（每个模块 5 张标准卡片）

每个模块目录下有统一的 5 张卡片 + 1 个 YAML 元数据文件：

| 卡片 | 内容 | 典型长度 |
|---|---|---|
| **概述.md** | 模块一句话定义、核心职责 | 1-2 行 |
| **架构设计.md** | 分层结构、依赖方向、关键组件 | 3-10 行 |
| **技术栈.md** | 使用的库/框架/工具列表 | 3-10 行 |
| **编码规范.md** | 命名约定、代码风格、设计模式 | 3-10 行 |
| **特殊配置与命令.md** | 环境变量、构建命令、部署配置 | 3-10 行 |
| **_module.yaml** | 作用域文件列表、子模块引用、依赖关系 | ~15 行 YAML |

### 2.2 模块树结构（12 个子模块）

```
NUR LEARN 中西医结合学习平台（根工程）
├── NUR LEARN 应用外壳（Next.js App Router）
│   ├── 应用根布局与首页
│   ├── Next.js API Routes（课程构建器与 NUR Agent）
│   └── 课程知识点与训练室页面
├── NUR Agent 结构辅助与对话组件
├── NUR LEARN 项目文档与素材归档
├── 学习仪表盘与记忆辅助面板
├── 材料导入与 DOCX 本地解析审核界面
├── 知识点学习与主观题/案例推理训练室
├── 课程内容目录与素材注册中心
├── 课程构建工作台与材料编译引擎
├── 课程验证、FSRS 记忆算法与学习状态管理
└── 领域类型定义与数据契约
```

外加 6 个独立知识条目（无子模块）：Next.js 构建与容器化部署、Node.js 依赖管理、基于 Tailwind v4 + shadcn/ui 的原子化样式、日志系统、环境变量与运行时配置、课程构建 API 的错误处理体系。

### 2.3 Wiki 文章分类

| 分类 | 篇数 | 核心文章 |
|---|---|---|
| 项目概述 | 1 | `项目概述.md`（355 行，含 8 个 Mermaid 图） |
| 快速开始 | 1 | `快速开始.md`（298 行） |
| 架构设计 | 13 | 系统架构概览、数据流设计、组件架构、路由导航、状态管理 |
| 核心功能模块 | 12 | 学习仪表板、课程工作空间、知识点教学、写作室、推理室、NUR Agent 集成 |
| 数据模型设计 | 14 | 课程定义、双视角内容、来源引用、评估题目、案例推理、考试蓝图、FSRS |
| 学习记忆系统 | 8 | FSRS 算法、复习任务调度、尝试记录、存储管理、辅助偏好 |
| AI 集成系统 | 9 | Agent 架构、上下文管理、安全权限、DashScope 集成、提供商接口 |
| API 接口文档 | 3 | Course Builder API、NUR Agent API |
| 组件开发指南 | 18 | UI 组件库、样式系统（Tailwind/CSS Modules）、自定义 Hooks |
| 内容管理系统 | 7 | 材料目录、摄入处理、准入审核、课程构建 |
| 测试策略 | 6 | 单元测试、组件测试、API 测试、质量检查 |
| 部署指南 | 7 | Docker、docker-compose、Vercel、生产优化、监控日志 |

---

## 三、如何导出/复制到其他 AI Agent

### 3.1 方案 A：完整复制 repo wiki（推荐用于新 Agent 入门）

将整个 wiki 目录复制到目标 AI Agent 可读取的位置：

```bash
# 在项目根目录执行
cp -r .qoder/repowiki /path/to/target/project/.qoder/repowiki
```

目标 Agent 需要能读取 `.qoder/repowiki/` 目录。大多数 AI 编程工具（Cursor、Claude Code、Codex、Gemini CLI）默认就能读取工作区内的文件。

### 3.2 方案 B：打包为上下文文件（推荐用于注入 Agent 提示词）

将关键文件合并为一个或多个上下文包：

```bash
# 方案 B1: 提取模块级知识卡片（紧凑版，约 15-20K tokens）
find .qoder/repowiki/knowledge -name "*.md" -exec echo "---" \; -exec cat {} \; > /tmp/nur-wiki-knowledge-cards.md

# 方案 B2: 提取关键 Wiki 文章（精选版，约 50-80K tokens）
cat .qoder/repowiki/zh/content/项目概述.md > /tmp/nur-wiki-core.md
cat .qoder/repowiki/zh/content/架构设计/系统架构概览.md >> /tmp/nur-wiki-core.md
cat .qoder/repowiki/zh/content/数据模型设计/数据模型设计.md >> /tmp/nur-wiki-core.md
# ... 按需添加更多

# 方案 B3: 生成模块索引（最精简版，约 2-3K tokens）
cat .qoder/repowiki/knowledge/zh/_index.yaml > /tmp/nur-wiki-index.md
# 在所有模块概述前加上此索引
```

### 3.3 方案 C：直接在工作区中使用（零成本）

Copilot 等工具自动使用 `.qoder/repowiki/`，无需额外操作。Qoder 本身也自动加载。

对于 Claude Code / Cursor / Codex 等工具，它们会在工作区根目录中自动索引所有文件。只需确认 `.qoder/repowiki/` 在项目根目录下即可。

### 3.4 方案 D：自定义 System Prompt 注入

将关键 wiki 内容写入 Agent 的 system prompt 或 rules 文件：

**Claude Code**: 写入 `CLAUDE.md` 或 `.claude/rules/`  
**Cursor**: 写入 `.cursor/rules/`  
**GitHub Copilot**: 写入 `.github/copilot-instructions.md`  
**Codex**: 写入 `AGENTS.md`  

示例注入内容：

```markdown
# 项目模块架构（来自 Repo Wiki）

## 模块树
[粘贴 _index.yaml 的内容]

## 各模块概述
[粘贴所有 knowledge/.../概述.md 的内容]

## 编码规范
[粘贴所有 knowledge/.../编码规范.md 的内容]
```

---

## 四、在其他 AI Agent 中有效利用 Wiki

### 4.1 推荐的工作流

```
1. 让 Agent 先读 project_summary_and_plan.md（最高层总览）
2. 再让 Agent 读 .qoder/repowiki/zh/content/项目概述.md（wiki 总览，含架构图）
3. 针对具体任务，让 Agent 读取对应的知识卡片：
   - 改 NUR Agent → 读 knowledge/.../NUR Agent 结构辅助与对话组件/ 下 5 张卡片
   - 改课程引擎 → 读 knowledge/.../课程验证、FSRS 记忆算法与学习状态管理/ 下卡片
   - 改题型系统 → 读 zh/content/数据模型设计/评估数据模型/ 下相关文章
```

### 4.2 针对不同任务的读取策略

| 任务类型 | 推荐读取 |
|---|---|
| **理解项目全貌** | `项目概述.md` + `_index.yaml` + 各模块 `概述.md` |
| **修改某个组件** | 对应模块的 5 张知识卡片 + 对应 `zh/content/` 文章 |
| **新增功能** | `架构设计/系统架构概览.md` + 对应模块卡片 + 类型定义卡片 |
| **代码审查** | 对应模块的 `编码规范.md` + `架构设计.md` |
| **Bug 修复** | 对应模块的 `架构设计.md` + `特殊配置与命令.md` |
| **环境/构建问题** | `快速开始.md` + `特殊配置与命令.md` + `部署指南/` |
| **添加测试** | `测试策略/` + 对应模块的 `架构设计.md` |

### 4.3 在提示词中引用 Wiki 的示例

```
"我需要修改 src/lib/nur-agent/ 下的 Agent 运行时逻辑，让它支持新的工具调用。
在修改前，请先阅读：
1. .qoder/repowiki/knowledge/zh/NUR LEARN.../NUR Agent 结构辅助与对话组件/ 下所有卡片
2. .qoder/repowiki/zh/content/AI 集成系统/Agent 架构设计.md
3. .qoder/repowiki/zh/content/AI 集成系统/上下文管理系统.md

然后按照编码规范.md 中的约定实施修改。"
```

### 4.4 Wiki 中的 "cite" 引用机制

Wiki 文章中的 `<cite>` 块列出了分析来源的原始文件。在新 Agent 中：

1. **先看 cite 列表**，确认该文章覆盖了哪些文件
2. **如需深入细节**，直接读取 cite 中列出的源文件
3. **文件路径是** `file://` 协议的绝对/相对路径，需要根据目标 Agent 的工作区适当转换

---

## 五、格式与转换注意事项

### 5.1 Mermaid 图表兼容性

Wiki 文章大量使用 Mermaid 图表（流程图、类图、时序图、架构图）。不同 AI Agent 对 Mermaid 的渲染支持不同：

| Agent | Mermaid 支持 |
|---|---|
| Claude Code | ✅ 完全支持（直接渲染） |
| Cursor | ✅ 支持（预览面板） |
| GitHub Copilot | ⚠️ 文本显示，不会渲染 |
| Codex | ✅ 支持 |
| Gemini CLI | ⚠️ 取决于界面 |

**建议**：即使目标 Agent 不渲染 Mermaid，图表中的文本信息（节点名称、关系描述）仍然有价值，不需要转换格式。

### 5.2 YAML 元数据文件

`_index.yaml` 和 `_module.yaml` 是结构化元数据。如果目标 Agent 不解析 YAML：

- `_index.yaml` → 可直接阅读，模块名、作用域、依赖关系一目了然
- `_module.yaml` → 可以忽略，内容已包含在 5 张知识卡片中

### 5.3 文件路径引用

Wiki 中的文件引用如 `[src/app/layout.tsx](file://src/app/layout.tsx)` 是相对于项目根目录的路径。在新 Agent 中：

- 保持项目根目录不变即可正常解析
- 如果复制 wiki 到另一项目，需要同时复制对应的源文件结构

### 5.4 中文内容

Wiki 全部为中文，这对大多数 Agent（Claude、GPT-4、Gemini、Qwen 等）都是完全支持的。无需翻译。

---

## 六、推荐的最小导出包

如果你只需要最小的便携包，以下文件可以覆盖 90% 的需求：

```
# 最小包（约 30 个文件，~200 KB）
.qoder/repowiki/knowledge/zh/_index.yaml                        # 模块索引
.qoder/repowiki/knowledge/zh/NUR LEARN...（根工程）/概述.md      # 根工程概述
.qoder/repowiki/knowledge/zh/NUR LEARN...（根工程）/架构设计.md   # 根工程架构
.qoder/repowiki/knowledge/zh/NUR LEARN.../各子模块/概述.md      # 12 个子模块概述
.qoder/repowiki/knowledge/zh/NUR LEARN.../各子模块/编码规范.md   # 12 个编码规范
.qoder/repowiki/zh/content/项目概述.md                          # 全量项目概述
.qoder/repowiki/zh/content/快速开始.md                           # 快速开始
.qoder/repowiki/zh/content/架构设计/系统架构概览.md              # 系统架构
```

加上项目根目录的 `project_summary_and_plan.md`、`AGENTS.md`、`docs/PROJECT_STATE.md`，就形成了完整的可迁移知识库。

---

## 七、快速参考卡

```
项目定位        → project_summary_and_plan.md（浓缩版）或 docs/PROJECT_STATE.md（完整版）
系统架构        → .qoder/repowiki/zh/content/项目概述.md（含架构图）
模块职责        → .qoder/repowiki/knowledge/zh/.../各模块/概述.md
技术栈          → .qoder/repowiki/knowledge/zh/.../各模块/技术栈.md
代码规范        → .qoder/repowiki/knowledge/zh/.../各模块/编码规范.md
构建配置        → .qoder/repowiki/knowledge/zh/.../各模块/特殊配置与命令.md
API 文档        → .qoder/repowiki/zh/content/API 接口文档/
数据模型        → .qoder/repowiki/zh/content/数据模型设计/
学习功能        → .qoder/repowiki/zh/content/核心功能模块/
Agent 系统      → .qoder/repowiki/zh/content/AI 集成系统/
部署运维        → .qoder/repowiki/zh/content/部署指南/
快速排障        → .qoder/repowiki/zh/content/快速开始.md（含排障指南）
```

---

## 八、总结

1. **Repo Wiki 是 Qoder 自动生成的、基于实际代码分析的结构化知识库**，分为模块卡片（快速参考）和详细文章（深度理解）两层。
2. **零成本即可在其他 Agent 中使用**：wiki 已在工作区中，所有主流 AI Agent 会自动索引。
3. **最小可迁移知识包**只需 ~30 个文件（200 KB），配合 `project_summary_and_plan.md` 可覆盖 90% 需求。
4. **使用时按任务精准读取**对应模块的卡片，而不是让 Agent 一次读完 180 个文件。
5. **不需要格式转换**：Markdown + Mermaid + YAML 都是 AI Agent 可直接消费的标准格式。
