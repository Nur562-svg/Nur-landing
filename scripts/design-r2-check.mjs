/**
 * Design System R2 浏览器验证脚本（playwright-core + 系统 Chrome headless）。
 * 复用 scripts/design-r1-check.mjs 的登录/截图脚手架，R2 新增：
 *  - 动态路由造数：注册临时账号后直接向 dev SQLite（prisma/dev.db）插入
 *    教材×2（1 激活 + 1 冻结）/ 章节×2 / 知识点×3 / 讲义×1 / 课题×1，跑完级联删除。
 *  - 暗色走真实链路：context.addInitScript 写 localStorage["nur-theme"]="dark"，
 *    由根 layout 防闪烁脚本挂 .dark（不是脚本里手动加类）。
 *  - 壳顶栏明暗切换交互 + 刷新保持验证。
 *
 * 用法：
 *   npm i --no-save playwright-core
 *   node scripts/design-r2-check.mjs --base http://localhost:3000 --out docs/design-references --tag r2
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const BASE = arg("base", "http://localhost:3000");
const OUT = resolve(arg("out", "docs/design-references"));
const TAG = arg("tag", "r2");
const DB = resolve(arg("db", "prisma/dev.db"));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "390", width: 390, height: 844 },
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-extensions", "--force-color-profile=srgb", "--hide-scrollbars"],
});

let failures = 0;
const fail = (message) => {
  failures += 1;
  console.error(`[FAIL] ${message}`);
};

function sql(statement) {
  // sqlite3 CLI 默认不启用外键；打开后 User 删除才会级联清理其名下 Hi doc 数据
  execFileSync("sqlite3", [DB, `PRAGMA foreign_keys=ON; ${statement}`], { stdio: ["ignore", "pipe", "pipe"] });
}

function sqlScalar(statement) {
  return execFileSync("sqlite3", [DB, statement], { encoding: "utf8" }).trim();
}

/** 注册验证账号，返回 { cookie, userId }。 */
async function registerVerifyUser() {
  const email = `r2-verify-${Date.now()}@example.com`;
  const password = "r2-verify-pass";
  let res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password, displayName: "R2 验证" }),
  });
  if (res.status === 400) {
    res = await fetch(`${BASE}/api/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  }
  const setCookie = res.headers.get("set-cookie");
  if (!res.ok || !setCookie) {
    throw new Error(`register/login ${res.status}，无法建立会话`);
  }
  const payload = await res.json();
  const userId = payload?.user?.id ?? sqlScalar(`SELECT id FROM User WHERE email='${email}';`);
  const match = /nur_session=([^;]+)/.exec(setCookie);
  if (!match || !userId) {
    throw new Error("会话 cookie 或 userId 缺失");
  }
  return { cookie: { name: "nur_session", value: match[1], domain: "localhost", path: "/" }, userId };
}

/** 为验证账号插入 Hi doc 动态路由数据（教材/章节/知识点/讲义/课题）；先清残留保证幂等。 */
function seedHiDocData(userId) {
  sql(`
    DELETE FROM HiDocLesson WHERE kpId LIKE 'r2-verify-kp-%';
    DELETE FROM HiDocKnowledgePoint WHERE id LIKE 'r2-verify-kp-%';
    DELETE FROM HiDocChapter WHERE id LIKE 'r2-verify-chapter-%';
    DELETE FROM HiDocTextbook WHERE id LIKE 'r2-verify-textbook-%';
    DELETE FROM HiDocWorkshop WHERE id LIKE 'r2-verify-workshop-%';
  `);
  const month = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit" })
    .format(new Date())
    .slice(0, 7);
  const textbookId = "r2-verify-textbook-0001";
  const frozenId = "r2-verify-textbook-0002";
  const chapterId = "r2-verify-chapter-0001";
  const chapter2Id = "r2-verify-chapter-0002";
  const kp1 = "r2-verify-kp-0001";
  const kp2 = "r2-verify-kp-0002";
  const kp3 = "r2-verify-kp-0003";
  const workshopId = "r2-verify-workshop-0001";
  const now = "datetime('now')";
  const lessonMd = [
    "## 概念",
    "**阴阳**是中国古代哲学的一对范畴，用以说明事物的对立统一关系。",
    "",
    "## 要点",
    "1. 阴阳对立制约；",
    "2. 阴阳互根互用；",
    "3. 阴阳消长平衡；",
    "4. 阴阳相互转化。",
    "",
    "> 取象比类是中医认知事物的基本方法之一。",
    "",
    "## 易错点",
    "阴阳是`可关联`现代医学的调节理论，但**不可直接等同**。",
  ].join("\n");

  sql(`
    INSERT INTO HiDocTextbook (id, userId, title, fileName, storageKey, sizeBytes, pageCount, hasTextLayer, status, activeMonth, createdAt, updatedAt)
    VALUES
      ('${textbookId}', '${userId}', '设计系统验证教材', 'r2-verify.pdf', 'hidoc/${userId}/${textbookId}/r2-verify.pdf', 1234567, 24, 1, 'ready', '${month}', ${now}, ${now}),
      ('${frozenId}', '${userId}', '设计系统验证·冻结教材', 'r2-verify-old.pdf', 'hidoc/${userId}/${frozenId}/r2-verify-old.pdf', 7654321, 18, 1, 'toc_ready', '2026-01', ${now}, ${now});
  `);
  sql(`
    INSERT INTO HiDocChapter (id, textbookId, "order", title, pageStart, pageEnd, source, status, createdAt, updatedAt)
    VALUES
      ('${chapterId}', '${textbookId}', 1, '绪论', 1, 12, 'manual', 'extracted', ${now}, ${now}),
      ('${chapter2Id}', '${textbookId}', 2, '望诊', 13, 24, 'manual', 'pending', ${now}, ${now});
  `);
  sql(`
    INSERT INTO HiDocKnowledgePoint (id, chapterId, "order", title, description, keyTerms, prerequisites, sourcePage, createdAt)
    VALUES
      ('${kp1}', '${chapterId}', 1, '阴阳的基本概念', '阴阳是对自然界相互关联的某些事物或现象对立双方属性的概括。', '["阴阳","对立统一"]', '[]', 1, ${now}),
      ('${kp2}', '${chapterId}', 2, '阴阳学说的基本内容', '对立制约、互根互用、消长平衡、相互转化四对关系。', '["对立制约","互根互用"]', '["阴阳的基本概念"]', 3, ${now}),
      ('${kp3}', '${chapterId}', 3, '阴阳学说在中医学中的应用', '说明人体组织结构、生理功能与病理变化，并指导诊断与治疗。', '["取象比类"]', '["阴阳学说的基本内容"]', 6, ${now});
  `);
  sql(`
    INSERT INTO HiDocLesson (id, kpId, contentMd, style, generator, sourceExcerpt, generatedAt, updatedAt)
    VALUES ('r2-verify-lesson-0001', '${kp1}', '${lessonMd.replaceAll("'", "''")}', 'zh-primary', 'heuristic', '【PDF 第 1 页】阴阳，是中国古代哲学的一对范畴。', ${now}, ${now});
  `);
  sql(`
    INSERT INTO HiDocWorkshop (id, userId, title, note, createdAt, updatedAt)
    VALUES ('${workshopId}', '${userId}', '设计系统验证课题', 'R2 换装验证用（自动清理）', ${now}, ${now});
  `);
  return { textbookId, workshopId };
}

function cleanupVerifyUser(userId) {
  // 外键级联：删 User 连带其教材/章节/知识点/讲义/课题；再显式清 r2-verify-* 残留兜底
  sql(`
    DELETE FROM User WHERE id='${userId}';
    DELETE FROM HiDocLesson WHERE kpId LIKE 'r2-verify-kp-%';
    DELETE FROM HiDocKnowledgePoint WHERE id LIKE 'r2-verify-kp-%';
    DELETE FROM HiDocChapter WHERE id LIKE 'r2-verify-chapter-%';
    DELETE FROM HiDocTextbook WHERE id LIKE 'r2-verify-textbook-%';
    DELETE FROM HiDocWorkshop WHERE id LIKE 'r2-verify-workshop-%';
  `);
}

// ── 注册 + 造数 ─────────────────────────────────────────────
let session;
try {
  session = await registerVerifyUser();
} catch (error) {
  console.error(`[auth] ${error}`);
  await browser.close();
  process.exit(1);
}
const seed = seedHiDocData(session.userId);
console.log(`[seed] user=${session.userId} textbook=${seed.textbookId} workshop=${seed.workshopId}`);

const ROUTES = [
  { name: "learn-hi-doc", path: "/learn/hi-doc" },
  { name: "learn-hi-doc-t", path: `/learn/hi-doc/t/${seed.textbookId}` },
  { name: "learn-hi-doc-t-c-1", path: `/learn/hi-doc/t/${seed.textbookId}/c/1` },
  { name: "learn-hi-doc-w", path: "/learn/hi-doc/w" },
  { name: "learn-hi-doc-w-room", path: `/learn/hi-doc/w/${seed.workshopId}` },
  { name: "learn", path: "/learn" },
  { name: "design-system", path: "/design-system" },
];

async function newPage(viewport, { dark = false } = {}) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "zh-CN",
  });
  await context.addCookies([session.cookie]);
  if (dark) {
    // 真实链路：页面脚本运行前写入 localStorage，由根 layout 防闪烁脚本挂 .dark
    await context.addInitScript("try{localStorage.setItem('nur-theme','dark')}catch(e){}");
  }
  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return { context, page, errors };
}

/** 已知 dev 竞态签名：冷编译偶发 manifest JSON.parse 500（生产构建无此问题）。 */
function isKnownDevRace(status, errors) {
  return status === 500 && errors.some((text) => text.includes("Unexpected end of JSON input"));
}

/** 打开页面并采样（状态/暗色/溢出/控制台错误）；已知 dev 竞态自动整页重试一次。 */
async function openAndSample(page, route, viewport, theme) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const response = await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle", timeout: 60000 });
    const status = response?.status() ?? 0;
    await page.waitForTimeout(500);
    const sample = {
      status,
      errors: [...page.__errors],
      dark: theme === "dark" ? await page.evaluate(() => document.documentElement.classList.contains("dark")) : null,
      overflow:
        viewport.name === "390"
          ? await page.evaluate(() => ({
              scrollWidth: document.documentElement.scrollWidth,
              clientWidth: document.documentElement.clientWidth,
            }))
          : null,
    };
    if (attempt === 1 && isKnownDevRace(status, sample.errors)) {
      page.__errors.length = 0;
      await page.waitForTimeout(1200);
      continue; // 整页重试一次
    }
    return sample;
  }
  throw new Error("unreachable");
}

// ── 矩阵：7 路由 × 亮/暗 × 1440/390 ─────────────────────────
for (const theme of ["light", "dark"]) {
  for (const viewport of VIEWPORTS) {
    for (const route of ROUTES) {
      const { context, page, errors } = await newPage(viewport, { dark: theme === "dark" });
      page.__errors = errors;
      try {
        const sample = await openAndSample(page, route, viewport, theme);
        const suffix = theme === "dark" ? "-dark" : "";
        const file = resolve(OUT, `${TAG}-${route.name}-${viewport.name}${suffix}.png`);
        await page.screenshot({ path: file, fullPage: false });
        const overflowBad = sample.overflow ? sample.overflow.scrollWidth > sample.overflow.clientWidth : false;
        const bad = sample.status !== 200 || overflowBad || sample.errors.length > 0 || sample.dark === false;
        if (bad) fail(`${route.path} @${viewport.name} ${theme}`);
        console.log(
          `[${sample.status}] ${route.path} @${viewport.name} ${theme}` +
            (sample.dark !== null ? ` dark=${sample.dark}` : "") +
            (sample.overflow
              ? ` scroll=${sample.overflow.scrollWidth}/client=${sample.overflow.clientWidth}${overflowBad ? " OVERFLOW" : ""}`
              : "") +
            ` errors=${sample.errors.length}` +
            (sample.errors.length ? `\n    ${sample.errors.slice(0, 3).join("\n    ")}` : ""),
        );
      } catch (error) {
        fail(`${route.path} @${viewport.name} ${theme}: ${error}`);
      } finally {
        await context.close();
      }
    }
  }
}

// ── 明暗切换交互 + 刷新保持（1440，书架页）──────────────────
{
  const { context, page, errors } = await newPage(VIEWPORTS[0]);
  try {
    await page.goto(`${BASE}/learn/hi-doc`, { waitUntil: "networkidle", timeout: 60000 });
    const toggle = page.getByRole("button", { name: /切换暗色|切换亮色/ }).first();
    if (!(await toggle.count())) {
      fail("壳顶栏明暗切换按钮未找到");
    } else {
      const labelBefore = await toggle.getAttribute("aria-label");
      await toggle.click();
      await page.waitForTimeout(300);
      const darkAfter = await page.evaluate(() => ({
        cls: document.documentElement.classList.contains("dark"),
        stored: localStorage.getItem("nur-theme"),
      }));
      await page.screenshot({ path: resolve(OUT, `${TAG}-toggled-dark-bookshelf-1440.png`) });
      // 刷新后保持暗色（防闪烁脚本 + localStorage）
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(400);
      const darkAfterReload = await page.evaluate(() => ({
        cls: document.documentElement.classList.contains("dark"),
        stored: localStorage.getItem("nur-theme"),
      }));
      await page.screenshot({ path: resolve(OUT, `${TAG}-toggled-dark-bookshelf-reload-1440.png`) });
      // 切回亮色
      const toggleBack = page.getByRole("button", { name: /切换暗色|切换亮色/ }).first();
      await toggleBack.click();
      await page.waitForTimeout(300);
      const lightRestored = await page.evaluate(() => ({
        cls: document.documentElement.classList.contains("dark"),
        stored: localStorage.getItem("nur-theme"),
      }));
      console.log(
        `[theme-toggle] label=${labelBefore} after=${JSON.stringify(darkAfter)} reload=${JSON.stringify(darkAfterReload)} restored=${JSON.stringify(lightRestored)} errors=${errors.length}`,
      );
      const ok =
        labelBefore === "切换暗色" &&
        darkAfter.cls && darkAfter.stored === "dark" &&
        darkAfterReload.cls && darkAfterReload.stored === "dark" &&
        !lightRestored.cls && lightRestored.stored === "light";
      if (!ok) fail("明暗切换/刷新保持行为不符合预期");
    }
  } catch (error) {
    fail(`theme-toggle: ${error}`);
  } finally {
    await context.close();
  }
}

// ── 清理验证数据（User 级联删除其名下 Hi doc 数据）────────────
try {
  cleanupVerifyUser(session.userId);
  console.log("[cleanup] 验证账号与其 Hi doc 数据已删除");
} catch (error) {
  console.error(`[cleanup] 删除失败（请手动清理 userId=${session.userId}）：${error}`);
}

await browser.close();
console.log(failures === 0 ? "ALL CHECKS PASSED" : `FAILURES: ${failures}`);
process.exit(failures === 0 ? 0 : 1);
