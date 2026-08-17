# NUR LEARN 部署指南

## 前置条件

1. **域名**：已实名认证的 `.com` 或 `.cn` 域名
2. **ICP 备案**：通过云服务商提交备案（3-20 工作日）
3. **服务器**：阿里云/腾讯云轻量应用服务器（2C2G+ Ubuntu 24.04，华东/华南）
4. **营业执照**（收费前）：个体工商户或有限公司

## 生产环境变量清单

在服务器 `.env.local` 中配置以下变量：

```bash
# === 数据库 ===
DATABASE_URL=postgresql://nur:强密码@db:5432/nur_learn?schema=public
POSTGRES_DB=nur_learn
POSTGRES_USER=nur
POSTGRES_PASSWORD=强密码

# === 认证 ===
AUTH_SECRET=（openssl rand -base64 32 生成的随机字符串）

# === 站点配置 ===
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_DOMAIN=your-domain.com
NEXT_PUBLIC_ICP_RECORD_NUMBER=苏ICP备XXXXXXX号
NEXT_PUBLIC_CONTACT_EMAIL=contact@your-domain.com

# === 邮件（SMTP）===
SMTP_HOST=smtp.your-domain.com
SMTP_PORT=587
SMTP_USER=noreply@your-domain.com
SMTP_PASS=密码
SMTP_FROM=NUR LEARN <noreply@your-domain.com>

# === 支付（默认 mock，商户号到位后切换）===
PAYMENT_PROVIDER=mock  # mock | wechat | alipay

# 微信支付（APIv3 Native）
WECHAT_PAY_MCHID=
WECHAT_PAY_APP_ID=
WECHAT_PAY_SERIAL_NO=
WECHAT_PAY_PRIVATE_KEY_PATH=/app/keys/wechat_private_key.pem
WECHAT_PAY_APIV3_KEY=
WECHAT_PAY_NOTIFY_URL=https://your-domain.com/api/pay/notify/wechat

# 支付宝（网站支付）
ALIPAY_APP_ID=
ALIPAY_PRIVATE_KEY=
ALIPAY_PUBLIC_KEY=

# === 定时补偿（cron 调用 /api/pay/cron/reconcile 时验证）===
CRON_SECRET=（openssl rand -hex 16 生成）

# === AI 模型 ===
DASHSCOPE_API_KEY=（仅服务端）
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
NUR_COURSE_BUILDER_PROVIDER=dashscope
NUR_COURSE_BUILDER_MODEL=qwen3.7-plus

# 生产关键提醒（当前代码状态）：
# - .env.local 中的 DATABASE_URL 必须是完整 postgres 串
# - docker-compose 不再硬编码损坏的 DATABASE_URL（依赖 env_file）
# - 健康检查依赖 wget（Dockerfile 已安装）
# - prisma runtime 支持 postgres（src/lib/prisma.ts）
# - 构建会运行 postinstall: prisma generate
```

## 部署步骤

### 1. 本地准备

```bash
# 注意：当前 schema 默认 sqlite（生产需切换 provider）
# 1. 确保 .env.local 包含完整 DATABASE_URL（生产 postgres）
# 2. 运行 postinstall 会触发 prisma generate（已在 package.json）
npm install

# 生产 Postgres 准备（按需）：
# 编辑 prisma/schema.prisma 将 provider 改为 "postgresql"
# npx prisma generate
# npx prisma migrate dev --name init_postgres   # 或在服务器用 migrate deploy

# 构建生产镜像
docker compose build app
```

### 2. 服务器部署

```bash
# 在服务器上
git pull
docker compose pull
docker compose up -d db
docker compose run --rm app npx prisma migrate deploy
docker compose up -d app caddy
```

### 3. 验证

- HTTPS 访问 `https://your-domain.com`
- 备案号展示
- 注册/登录/支付/同步全链路
- 备份恢复演练
- 支付回调到达与验签
- cron 补偿端点（漏单修复 + 超时关闭）

## 数据库备份

```bash
# cron 每日 pg_dump
0 3 * * * docker exec nur-learn-db pg_dump -U nur nur_learn | gzip > /backup/nur_$(date +\%Y\%m\%d).sql.gz
# 上传到对象存储（ossutil/rclone）
# 保留 30 天
0 4 * * * find /backup -name "nur_*.sql.gz" -mtime +30 -delete
```

## 支付定时补偿

```bash
# cron 每分钟调用：漏单查单 + 超时关闭
* * * * * curl -s -X POST https://your-domain.com/api/pay/cron/reconcile -H "X-Cron-Secret: $CRON_SECRET" > /dev/null
```

## 安全组

仅开放以下端口：
- 80（HTTP → Caddy 重定向 HTTPS）
- 443（HTTPS）
- 22（SSH，建议限制 IP）

## 支付渠道切换

商户号到位后：
1. 在 `.env.local` 填入支付密钥
2. `PAYMENT_PROVIDER=wechat` 或 `alipay`
3. 重启服务：`docker compose restart app`
4. 跑通回调验签回归测试

无需改动业务代码。

## 合规事项

| 事项 | 周期 | 说明 |
| --- | --- | --- |
| ICP 备案 | 3-20 工作日 | 上线前提，免费 |
| 公安联网备案 | 上线 30 日内 | 服务器所在地公安 |
| 经营性 ICP 许可证 | 40-60 工作日 | 收费必须，需有限公司 |
| 生成式 AI 服务登记 | 1-3 个月 | 调用通义千问需登记 |
