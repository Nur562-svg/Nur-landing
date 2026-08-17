# NUR LEARN 知径上线准备 — 可执行检查清单

**最后更新**：2026-08-17（基于实际代码与配置）

本文档是**可执行**的上线前检查清单。按顺序执行，每步都有验证命令。

**前提**：
- 所有修改必须通过 `npm run check`。
- 域名/备案/服务器未就绪时仅做代码层准备。
- 永远不要提交真实密钥到仓库。
- 本次上线准备只修复**上线必须项**，不新增功能。

---

## 1. 上线前必做

### 1.1 环境变量清单（.env.local）

在服务器上创建 `/app/.env.local`（权限 600），至少包含：

```bash
# === 数据库（生产必须 Postgres） ===
DATABASE_URL="postgresql://nur:YOUR_STRONG_PASSWORD@db:5432/nur_learn?schema=public"

# === 认证（必须！） ===
# 生成：openssl rand -base64 32
AUTH_SECRET="生成的长随机字符串"

# === 站点（备案后填写） ===
NEXT_PUBLIC_SITE_URL="https://your-real-domain.com"
NEXT_PUBLIC_SITE_DOMAIN="your-real-domain.com"
NEXT_PUBLIC_ICP_RECORD_NUMBER="苏ICP备XXXXXXX号"
NEXT_PUBLIC_PUBLIC_SECURITY_RECORD_NUMBER="XXXXXX号"
NEXT_PUBLIC_CONTACT_EMAIL="contact@your-domain.com"

# === 邮件（SMTP，可先 mock/console） ===
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="NUR LEARN <noreply@your-domain.com>"

# === 支付（先 mock） ===
PAYMENT_PROVIDER=mock

# === 定时补偿 secret（生产 cron 用） ===
CRON_SECRET="$(openssl rand -hex 16)"

# === AI 模型（可选，Course Builder / Agent） ===
DASHSCOPE_API_KEY="你的阿里云密钥"
DASHSCOPE_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
NUR_COURSE_BUILDER_PROVIDER=dashscope
NUR_COURSE_BUILDER_MODEL=qwen3.7-plus
```

**验证**：
```bash
# 本地测试（不要提交）
cat .env.local | grep -E 'AUTH_SECRET|DATABASE_URL' | head -2
# 必须看到真实值，但文件在 .gitignore 中
```

### 1.2 生产数据库策略

- **开发/本地**：SQLite（`DATABASE_URL="file:./prisma/dev.db"` + schema provider=sqlite）
- **生产**：Postgres 16（docker-compose 已声明 postgres:16-alpine）
- 切换步骤见 DEPLOYMENT.md 和下方构建命令。
- **绝不**在生产使用 SQLite。

**schema 变更**（生产前）：
编辑 `prisma/schema.prisma`：
```prisma
datasource db {
  provider = "postgresql"   # 生产改为此
  url      = env("DATABASE_URL")
}
```

### 1.3 构建与启动命令

本地验证：
```bash
npm run check          # lint + typecheck + build（必须全绿）
```

生产 Docker 构建/启动（服务器）：
```bash
# 1. 准备 .env.local（见 1.1）
# 2. 确保 schema provider 匹配目标数据库（见 1.2）
docker compose build app

# 启动数据库 + 迁移 + 应用
docker compose up -d db
docker compose run --rm app npx prisma migrate deploy
docker compose up -d app caddy

# 查看状态
docker compose ps
docker compose logs -f app
```

### 1.4 健康检查路径

当前路径：`GET /`（返回首页 200 即视为健康）

Docker healthcheck（已修复）：
```yaml
# docker-compose.yml 中
healthcheck:
  test: ["CMD-SHELL", "wget -qO- http://localhost:3000/ || exit 1"]
```

**验证**：
```bash
# 容器内
docker compose exec app wget -qO- http://localhost:3000/ | head -c 200
# 应返回 HTML 片段
```

### 1.5 日志与错误页确认

- 生产错误边界：`src/app/error.tsx`、`src/app/global-error.tsx`、`src/app/not-found.tsx` 已就绪（中文友好，无 stack 泄露）。
- 日志：`docker compose logs -f app`
- 开发时仍可看到详细错误。

### 1.6 数据导出与隐私边界确认

- 学习数据导出：`/learn` 账户面板 → “导出学习数据”（browser-local，`nur-learner-data-snapshot`）。
- 导出内容**不包含**：课程真相、API 密钥、原始私人二进制、服务器独有态。
- 云同步：仅已显式同意的 `materialAdmissionSyncConsents` + 学习记录。
- 所有导出/同步均有 `exportBoundary` 非授予声明。

**验证**：
在浏览器登录后导出，检查 JSON `exportBoundary` 各项均为 false，`importSupported: false`。

---

## 2. 上线前建议（冒烟测试）

### 2.1 移动端抽查路径（390×844 或类似）
- `/`
- `/learn`
- `/courses/tcm-diagnostics`
- 一个知识点（如 `/courses/tcm-diagnostics/knowledge-points/cold-and-heat`）
- 主观写作室、案例室
- 登录/注册页
- 错题中心 `/wrong-questions`
- 账户面板（导出、同步状态）

要求：无水平溢出、`scrollWidth === clientWidth`。

### 2.2 核心学习闭环冒烟
1. 注册/登录（邮箱+密码）
2. 进入 `/courses/tcm-diagnostics`
3. 选择一个有完整闭环的知识点 → 理解 → 输出（写作室）
4. 完成自核 + 确认 → 产生 attempt
5. 去错题中心查看
6. 导出学习数据
7. 登出后刷新，验证本地状态仍存在（未登录时）

### 2.3 robots / sitemap
```bash
npm run build
# 检查构建产物或运行后访问
curl -s http://localhost:3000/robots.txt | head -20
curl -s http://localhost:3000/sitemap.xml | head -30
```
- 私密路由（login, register, wrong-questions, course-builder 等）应被 noindex 或 disallow。
- 公开内容（/、/learn、课程工作台、知识点）应在 sitemap。

### 2.4 配额与会员边界
- 免费/专业 quota（M3 已实现）：Agent 调用、Course Builder、私人材料次数等。
- 超限返回 429 + UI banner。
- 验证：在 UI 中触发多次调用，观察 gate。

---

## 3. 明确暂缓（域名/备案未定时）

- 任何需要真实域名的操作（正式 ICP 展示、真实支付回调、邮件验证链接等）。
- 真实微信/支付宝商户支付（保持 `mock`）。
- 大规模内容扩展（新课程、大量题库导入）。
- 多实例部署下的登录限流共享存储（当前内存限流仅单实例有效）。
- 生产监控、告警、备份策略的完整落地（仅文档化最小要求）。

---

## 4. 回滚与风险

### 最可能出问题的点（按概率）
1. `DATABASE_URL` 格式错误或 provider/adapter 不匹配 → Prisma 连接失败。
2. `AUTH_SECRET` 未设置或太短 → 启动时显式报错（好现象）。
3. 健康检查失败（wget 缺失或 root 响应非 200）。
4. docker-compose 环境变量插值问题。
5. Prisma migrate 失败（schema 与 URL 不匹配）。
6. 同步/Agent 在无 key 时的降级行为被误认为 bug。

### 出问题后的最小处理方式
```bash
# 1. 停止
docker compose down

# 2. 检查关键变量
docker compose exec app env | grep -E 'DATABASE_URL|AUTH_SECRET|NODE_ENV'

# 3. 回滚到上一个镜像（如果有）
docker compose pull   # 或使用之前 tag

# 4. 重新迁移/启动
docker compose up -d db
docker compose run --rm app npx prisma migrate status
docker compose up -d app caddy

# 5. 查看日志
docker compose logs --tail=100 app
```

**浏览器侧**：
- 清空相关 localStorage key 恢复演示状态。
- 导出数据前先备份浏览器 localStorage。

---

## 5. 快速验证清单（复制执行）

```bash
# 本地
npm run check
npm test

# Docker 本地模拟（可选）
docker compose build app
docker compose up -d db
docker compose run --rm app npx prisma migrate deploy
docker compose up -d app

# 健康
curl -f http://localhost:3000/ || echo "fail"

# 清理
docker compose down -v
```

---

**完成标准**：
- [ ] `npm run check` 全绿
- [ ] `docs/LAUNCH_CHECKLIST.md` 存在且内容与代码一致
- [ ] PROJECT_STATE.md 已记录本次准备结果
- [ ] 未提交任何真实密钥
- [ ] 未进行非必须改动

准备就绪后，等待域名/服务器 + ICP 备案即可上线。
