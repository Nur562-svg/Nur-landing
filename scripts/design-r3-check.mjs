/**
 * Design System R3 浏览器验证脚本（playwright-core + 系统 Chrome headless）。
 * 复用 scripts/design-r2-check.mjs 的登录/截图/暗色真实链路脚手架，R3 差异：
 *  - 覆盖 15 条路由：/learn、/courses、/courses/tcm-diagnostics、知识点页、写作间、推理间、
 *    /question-bank、课程题库首页、章节页、刷题间、模考间、/wrong-questions、/account/billing、
 *    /learn/my-materials、/design-system。
 *  - /wrong-questions 额外断言「已归壳」：侧栏主入口导航存在（R3 唯一路由目录变更）。
 *  - 全量覆盖亮/暗 × 1440/390，控制台 0 错误、390 无横向溢出。
 *  - 暗色走真实链路：context.addInitScript 写 localStorage["nur-theme"]="dark"，
 *    由根 layout 防闪烁脚本挂 .dark（不是脚本里手动加类）。
 *
 * 用法：
 *   npm i --no-save playwright-core
 *   node scripts/design-r3-check.mjs --base http://localhost:3000 --out docs/design-references --tag r3
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
const TAG = arg("tag", "r3");
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
  execFileSync("sqlite3", [DB, `PRAGMA foreign_keys=ON; ${statement}`], { stdio: ["ignore", "pipe", "pipe"] });
}

function sqlScalar(statement) {
  return execFileSync("sqlite3", [DB, statement], { encoding: "utf8" }).trim();
}

/** 注册验证账号，返回 { cookie, userId }。 */
async function registerVerifyUser() {
  const email = `r3-verify-${Date.now()}@example.com`;
  const password = "r3-verify-pass";
  let res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password, displayName: "R3 验证" }),
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

/** 为验证账号插入一本 Hi doc 教材（书架/⌘K 数据源可用，同时验证归壳后壳内最近学习不报错）。 */
function seedHiDocData(userId) {
  sql(`
    DELETE FROM HiDocChapter WHERE id LIKE 'r3-verify-chapter-%';
    DELETE FROM HiDocTextbook WHERE id LIKE 'r3-verify-textbook-%';
  `);
  const month = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit" })
    .format(new Date())
    .slice(0, 7);
  const textbookId = "r3-verify-textbook-0001";
  const chapterId = "r3-verify-chapter-0001";
  const now = "datetime('now')";
  sql(`
    INSERT INTO HiDocTextbook (id, userId, title, fileName, storageKey, sizeBytes, pageCount, hasTextLayer, status, activeMonth, createdAt, updatedAt)
    VALUES ('${textbookId}', '${userId}', 'R3 验证教材', 'r3-verify.pdf', 'hidoc/${userId}/${textbookId}/r3-verify.pdf', 102400, 12, 1, 'ready', '${month}', ${now}, ${now});
  `);
  sql(`
    INSERT INTO HiDocChapter (id, textbookId, "order", title, pageStart, pageEnd, source, status, createdAt, updatedAt)
    VALUES ('${chapterId}', '${textbookId}', 1, '绪论', 1, 12, 'manual', 'extracted', ${now}, ${now});
  `);
  return { textbookId };
}

function cleanupVerifyUser(userId) {
  sql(`
    DELETE FROM User WHERE id='${userId}';
    DELETE FROM HiDocChapter WHERE id LIKE 'r3-verify-chapter-%';
    DELETE FROM HiDocTextbook WHERE id LIKE 'r3-verify-textbook-%';
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
console.log(`[seed] user=${session.userId} textbook=${seed.textbookId}`);

const KP = "diet-and-taste";
const ROUTES = [
  // D 组：/learn 主页与私人过渡态
  { name: "learn", path: "/learn" },
  { name: "learn-my-materials", path: "/learn/my-materials" },
  // A 组：官方课面
  { name: "courses", path: "/courses" },
  { name: "course-workspace", path: "/courses/tcm-diagnostics" },
  { name: "knowledge-point", path: `/courses/tcm-diagnostics/knowledge-points/${KP}` },
  { name: "subjective-writing", path: `/courses/tcm-diagnostics/knowledge-points/${KP}/subjective-writing` },
  { name: "case-reasoning", path: `/courses/tcm-diagnostics/knowledge-points/${KP}/case-reasoning` },
  // B 组：题库/考试面
  { name: "question-bank-global", path: "/question-bank" },
  { name: "question-bank-home", path: "/courses/tcm-diagnostics/question-bank" },
  { name: "question-bank-chapter", path: "/courses/tcm-diagnostics/question-bank/introduction" },
  { name: "question-bank-practice", path: "/courses/tcm-diagnostics/question-bank/introduction/assessment-a1-introduction-principles" },
  { name: "mock-exam", path: "/courses/tcm-diagnostics/mock-exam" },
  { name: "wrong-questions", path: "/wrong-questions" },
  // C 组：计费/账户面
  { name: "account-billing", path: "/account/billing" },
  // 设计系统预览
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

/** 截图属证据留档，不参与判定：超时/字体竞态不应误报为页面缺陷。 */
async function shoot(page, file) {
  try {
    await page.screenshot({ path: file, fullPage: false, timeout: 20000 });
  } catch (error) {
    console.warn(`[warn] screenshot 跳过 ${file}: ${error}`);
  }
}

// ── 矩阵：15 路由 × 亮/暗 × 1440/390 ────────────────────────
for (const theme of ["light", "dark"]) {
  for (const viewport of VIEWPORTS) {
    for (const route of ROUTES) {
      const { context, page, errors } = await newPage(viewport, { dark: theme === "dark" });
      page.__errors = errors;
      try {
        const sample = await openAndSample(page, route, viewport, theme);
        const suffix = theme === "dark" ? "-dark" : "";
        const file = resolve(OUT, `${TAG}-${route.name}-${viewport.name}${suffix}.png`);
        await shoot(page, file);
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

// ── 错题中心归壳断言（R3 唯一路由目录变更）──────────────────
{
  const { context, page, errors } = await newPage(VIEWPORTS[0]);
  try {
    await page.goto(`${BASE}/wrong-questions`, { waitUntil: "networkidle", timeout: 60000 });
    // 页面内容标记（dev 下 notFound() 也返回 200，故不能只看状态码）
    const hasContent = (await page.getByRole("heading", { level: 1 }).allTextContents()).join(" ").includes("错题");
    // 壳标记：侧栏「主入口」导航（归壳前裸页面无此导航）
    const hasShell = (await page.locator("nav[aria-label='主入口']").count()) > 0;
    const hasTierChip = (await page.getByRole("button", { name: /切换暗色|切换亮色/ }).count()) > 0;
    console.log(
      `[wrong-questions-shell] content=${hasContent} sidebarNav=${hasShell} themeToggle=${hasTierChip} errors=${errors.length}`,
    );
    if (!hasContent || !hasShell || !hasTierChip || errors.length > 0) {
      fail("错题中心未正确归入 workspace 壳");
    }
    await shoot(page, resolve(OUT, `${TAG}-wrong-questions-in-shell-1440.png`));
  } catch (error) {
    fail(`wrong-questions-shell: ${error}`);
  } finally {
    await context.close();
  }
}

// ── 明暗切换交互 + 刷新保持（1440，/learn）─────────────────
{
  const { context, page, errors } = await newPage(VIEWPORTS[0]);
  try {
    await page.goto(`${BASE}/learn`, { waitUntil: "networkidle", timeout: 60000 });
    const toggle = page.getByRole("button", { name: /切换暗色|切换亮色/ }).first();
    if (!(await toggle.count())) {
      fail("壳顶栏明暗切换按钮未找到");
    } else {
      // 水合等待：整轮 60 次页面加载后浏览器较忙，networkidle 不代表 React 已挂载监听器。
      // 未挂载时的点击是 no-op（DOM 类与 localStorage 都不变），故以「localStorage 是否写入」
      // 为水合完成信号重试，最多 4 次；一旦写入即停（保证只真正切换一次，结果确定）。
      const readTheme = () =>
        page.evaluate(() => ({
          cls: document.documentElement.classList.contains("dark"),
          stored: localStorage.getItem("nur-theme"),
        }));
      const clickUntilHydrated = async () => {
        let state = await readTheme();
        for (let attempt = 0; attempt < 4; attempt += 1) {
          await toggle.click();
          await page.waitForTimeout(400);
          state = await readTheme();
          if (state.stored !== null) return state;
          await page.waitForTimeout(1000);
        }
        return state;
      };
      const labelBefore = await toggle.getAttribute("aria-label");
      const darkAfter = await clickUntilHydrated();
      await shoot(page, resolve(OUT, `${TAG}-toggled-dark-learn-1440.png`));
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(600);
      const darkAfterReload = await readTheme();
      await shoot(page, resolve(OUT, `${TAG}-toggled-dark-learn-reload-1440.png`));
      const toggleBack = page.getByRole("button", { name: /切换暗色|切换亮色/ }).first();
      await toggleBack.click();
      await page.waitForTimeout(400);
      const lightRestored = await readTheme();
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

// ── 清理验证数据 ────────────────────────────────────────────
try {
  cleanupVerifyUser(session.userId);
  console.log("[cleanup] 验证账号与其 Hi doc 数据已删除");
} catch (error) {
  console.error(`[cleanup] 删除失败（请手动清理 userId=${session.userId}）：${error}`);
}

await browser.close();
console.log(failures === 0 ? "ALL CHECKS PASSED" : `FAILURES: ${failures}`);
process.exit(failures === 0 ? 0 : 1);
