# Copy-Ready Prompt for the Next Session

```text
继续 `/Users/nukeab/projects/Nur-landing` 中的 NUR LEARN 项目。

开始任何计划或修改前，完整阅读：
1. `project_summary_and_plan.md`（浓缩版项目手册，最新剩余任务和状态）
2. `AGENTS.md`（AI Agent 行为准则 + 代码边界定义）
3. `docs/PROJECT_STATE.md`（权威真相来源，所有产品决策、里程碑、验证记录）
4. `README.md`
5. `docs/QUICK_MIGRATION_GUIDE.md`
6. `design-qa.md`
7. `docs/CONTENT_ARCHITECTURE.md`
8. 本文件

先执行 `git status --short`。当前 worktree 含用户和前会话未提交改动；不得 reset、discard、stage、commit、push 或 deploy，除非我明确要求。原始学习资料继续只读，不移动、不覆盖、不删除，不复制进 `public/`。

安全边界：

- DashScope `qwen3.7-plus` 已真实配置并验证；凭证只存在被 Git 忽略、权限为 `600` 的 `.env.local`。
- 不得读取、打印、复制、截图或提交 API Key；Key 不得进入浏览器代码、日志、文档或测试输出。
- `DASHSCOPE_BASE_URL` 是阿里云业务空间 compatible-mode 地址；现有适配器只接受 HTTPS `aliyuncs.com` 主机。
- 不需要重新申请、配置或展示 Key。

## 最近一个里程碑（2026-08-08）：M2 可靠登录合并 + 双向同步骨架 + 文件清理

- 新增并集中 `performReliableLoginMerge()`（`src/lib/learner-state-sync.ts`）：登录时全量上传（delta=false）+ 顺序 GET 下载 server 状态 + `mergeServerStateIntoLocal`（timestamp 优先 union）+ 状态更新。
- `src/components/learning-dashboard.tsx` 登录 useEffect 已切换为调用该可靠入口（user.email 去重）。
- 所有核心写路径已确认接 `triggerLearnerStateSync`：learning-memory（recordConfirmedAttempt / acceptReviewTask / proposeReviewTaskForAttempt）、question-bank-store（addQBAttempt / toggleQBFavorite）、mock-exam-store（saveMockExamSession）。
- 验证通过：`npm run typecheck` 0 错误、`npm run lint` 0 errors、`npm run build` 成功、`npm run check` 全绿。
- Worktree 清理：删除了 `GEMINI.md`、`CLAUDE.md`、`.gemini/`（空遗留 stub）。
- 文档同步：`project_summary_and_plan.md` 和 `docs/PROJECT_STATE.md` 已补全所有剩余任务、文件审计结果和 M2 最新状态。
- 证据：本次会话 terminal 输出、文件变更、check 结果。

## 此前全部历史里程碑（均已完成并验证）

- 二十个产品路由实例、typed course engine、材料目录与来源权威、按课程定义的考试结构、浏览器本地学习记忆、48小时回流、受限 NUR Agent；
- 六个中诊深闭环（问饮食口味、望舌苔、问寒热、常见病脉、表里辨证、脾胃病辨证）+ 两个案例（问饮食口味 + 纯合成脾胃病案）；
- 生理学 `western-primary` 压力测试（知识点 + 写作路由）；
- allow-listed 《中医诊断学》Course Builder（known-pack、baseline/provider 双模式、真实 `qwen3.7-plus` 构建）；
- 浏览器本地私人材料 intake → DOCX 本地解析 → section-first 审核 → 当前会话 overlay → 一次性模型传输授权 → 私人分析（base-pack-independent）→ 严格版式化 material admission + JSON export；
- 官方《中医诊断学》材料包 v1（9 included / 2 excluded、39 点证据矩阵、10/15/14 分层、六个 protected loops）；
- 私人学习单元可行动化（草稿/收藏/确认/重做/复习调度）；
- Qwen-powered bounded 学习 Agent（typed tools + 私人单元端到端）；
- NUR Agent 智能升级：FSRS-aware → 浮动 FAB+抽屉 → 平台通用医学学习助手；
- 题库扩充到 60 题 + 100 分完整模考 + 错题中心 + 弱项回流到周计划（2026-08-06）；
- M1 账户与认证（邮箱+密码、Prisma+SQLite、JWT）；
- M2 学习状态云同步核心（server 持久化 + 登录合并 + 双向流动）。

## 最近验证（2026-08-08）

- `npm run check` 通过（0 errors，build 成功，91 路由生成）。
- M2 可靠登录合并 + 双向同步骨架已落地并验证。
- Worktree 已清理无用 stub。
- `project_summary_and_plan.md` 和 `docs/PROJECT_STATE.md` 已更新剩余任务。

## 当前尚未实现 / 待办

- **M2 可靠登录合并剩余**：跨设备真实测试（部署后）、私人 consent 同步边界强化、增量 payload 优化。
- **M4 发布前打磨**（当前优先级）：
  - SEO 元数据（title/meta/og for /learn、course、mock-exam 等）
  - robots.txt + sitemap 完善
  - 全局 ErrorBoundary + loading.tsx 完善
  - 数据导出增强（扩展 `src/lib/export-learner-data.ts` 支持 attempts/FSRS/QB/mocks/admission）
  - 移动端细节：44px touch targets、更多响应式、无 overflow（390×844 / 1440×1000）
  - a11y（aria-label、focus-visible）
  - 性能 memo + console 生产 guard
  - 一轮 `npm run check` + 浏览器 QA + 更新 `design-qa.md`
- **M5 部署**：待用户采购域名后决策（Vercel 或国内云）；生产需换 AUTH_SECRET、切 Postgres、登录限流共享存储。
- 内容 pending：教师 9 页最终重点 PDF + 真实 rubric（来源待提供）、部分材料答案 unverified、错题中心增强（主观题错题 + FSRS reviewTasks 关联）。
- 转接维护：保持 `project_summary_and_plan.md`、`docs/PROJECT_STATE.md`、`docs/NEXT_SESSION_PROMPT.md` 最新。

## 不可退化验收（必须保持）

- 官方中诊 39 点、六个深闭环、0 blocking、所有 non-grants（publication/catalog/registry/official-compilation）不变；
- 私人分析无官方 base pack 仍可真实调用 `qwen3.7-plus`；
- 学校题干不证明答案正确；来源附答案不等于教师采分点；历史试卷不证明当前频率；OCR 未经复核不能成为 verified truth；
- 所有新题必须保留来源 provenance，不得编造教材页码或教师重点。

## 操作规范

- 修改 Next.js API、Route Handler 或 Server/Client 边界前，完整阅读 `node_modules/next/dist/docs/` 对应本地文档；
- 不新增依赖，除非现有 TypeScript 与小型本地工具确实不能完成；
- 保持暖象牙纸、黑墨、细线、宋体标题、方形容器、克制朱砂与蓝色语义色；
- 完成可见里程碑后运行 `npm run check` + 浏览器验证主流程、warning/error、横向溢出，并更新 README、PROJECT_STATE、CONTENT_ARCHITECTURE、design-qa、必要截图和本文件；
- 若编辑 `AGENTS.md`，运行 `bash scripts/sync-agent-rules.sh`。

下一任务候选（按优先级）：
1. M4 发布前打磨（SEO、导出增强、移动端/a11y、ErrorBoundary、QA）。
2. M2 可靠登录合并剩余可靠性验证。
3. M5 部署准备（待域名）。
4. 错题中心增强 + 内容 pending 跟进。
```
