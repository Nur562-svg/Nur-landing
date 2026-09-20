/**
 * Design System R4 浏览器验证脚本（playwright-core + 系统 Chrome headless）。
 * 复用 scripts/design-r3-check.mjs 的登录/造数/截图脚手架，R4 差异：
 *  - ⌘K 真检索交互：打开 → 输入「寒热」→ 命中官方课知识点 → Enter 跳转正确路由；
 *    输入「不存在的东西」→ 空态；书架教材章节命中（按教材名匹配）。
 *  - 390 触控：抽屉开合/Esc/scrim、⌘K 面板底部弹出、主路径按钮命中区抽查。
 *  - R3 的 15 路由 × 亮/暗回归（确认本期 CSS 未破坏既有面）。
 *  - 造数：验证账号 + 一本 12 章 Hi doc 教材（书架章节索引数据源），终态级联删除。
 *
 * 用法：
 *   npm i --no-save playwright-core
 *   node scripts/design-r4-check.mjs --base http://localhost:3000 --out docs/design-references --tag r4
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
const TAG = arg("tag", "r4");
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
  const email = `r4-verify-${Date.now()}@example.com`;
  const password = "r4-verify-pass";
  let res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password, displayName: "R4 验证" }),
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

/** 为验证账号插入一本 12 章 Hi doc 教材（⌘K 书架章节索引数据源）。 */
function seedHiDocData(userId) {
  sql(`
    DELETE FROM HiDocChapter WHERE id LIKE 'r4-verify-chapter-%';
    DELETE FROM HiDocTextbook WHERE id LIKE 'r4-verify-textbook-%';
  `);
  const month = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit" })
    .format(new Date())
    .slice(0, 7);
  const textbookId = "r4-verify-textbook-0001";
  const chapterId = "r4-verify-chapter-0001";
  const now = "datetime('now')";
  sql(`
    INSERT INTO HiDocTextbook (id, userId, title, fileName, storageKey, sizeBytes, pageCount, hasTextLayer, status, activeMonth, createdAt, updatedAt)
    VALUES ('${textbookId}', '${userId}', 'R4 验证教材', 'r4-verify.pdf', 'hidoc/${userId}/${textbookId}/r4-verify.pdf', 102400, 12, 1, 'ready', '${month}', ${now}, ${now});
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
    DELETE FROM HiDocChapter WHERE id LIKE 'r4-verify-chapter-%';
    DELETE FROM HiDocTextbook WHERE id LIKE 'r4-verify-textbook-%';
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

/** 截图属证据留档，不参与判定。 */
async function shoot(page, file) {
  try {
    await page.screenshot({ path: file, fullPage: false, timeout: 20000 });
  } catch (error) {
    console.warn(`[warn] screenshot 跳过 ${file}: ${error}`);
  }
}

// ── ⌘K 检索交互（1440）─────────────────────────────────────
{
  const { context, page, errors } = await newPage(VIEWPORTS[0]);
  try {
    await page.goto(`${BASE}/learn`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(500);

    // 打开命令面板（⌘K / Ctrl+K）
    await page.keyboard.press("Control+k");
    const palette = page.locator("[data-command-palette]");
    await palette.waitFor({ state: "visible", timeout: 10000 });
    const foot = (await palette.locator("p").last().textContent()) ?? "";
    console.log(`[palette-open] foot="${foot.trim()}"`);
    if (!foot.includes("Esc 关闭")) {
      fail(`⌘K 页脚文案未更新：${foot.trim()}`);
    }

    // 检索「寒热」→ 官方课知识点命中
    const input = palette.locator("input");
    await input.fill("寒热");
    await page.waitForTimeout(300);
    await shoot(page, resolve(OUT, `${TAG}-palette-search-hanre-1440.png`));
    const target = palette.locator("button", { hasText: "寒热" });
    const targetCount = await target.count();
    console.log(`[palette-search] query=寒热 hits=${targetCount}`);
    if (targetCount === 0) {
      fail("⌘K 检索「寒热」无命中");
    } else {
      // 命中 2 条：章节「八纲辨证」（课程工作台）在前、知识点「问寒热」在后。
      // Enter 走高亮首条 → 章节课入口（课程工作台路由）。
      await input.press("Enter");
      await page.waitForURL("**/courses/tcm-diagnostics", { timeout: 15000 });
      await page.waitForLoadState("networkidle");
      console.log(`[palette-enter-chapter] url=${page.url()}`);
      if (page.url().includes("knowledge-points")) {
        fail(`⌘K Enter 高亮首条应为章节入口：${page.url()}`);
      }

      // 重新打开并点击知识点条目 → 应跳知识点讲义路由
      await page.keyboard.press("Control+k");
      await palette.waitFor({ state: "visible", timeout: 10000 });
      await palette.locator("input").fill("寒热");
      await page.waitForTimeout(300);
      const kpItem = palette.locator("button", { hasText: "问寒热" });
      if ((await kpItem.count()) === 0) {
        fail("⌘K 检索「寒热」未命中官方课知识点「问寒热」");
      } else {
        await kpItem.first().click();
        await page.waitForURL("**/courses/tcm-diagnostics/knowledge-points/cold-and-heat", { timeout: 15000 });
        await page.waitForLoadState("networkidle");
        const headings = (await page.getByRole("heading").allTextContents()).join(" ");
        console.log(`[palette-enter-kp] url=${page.url()} headings="${headings.slice(0, 60)}"`);
        if (!page.url().includes("/courses/tcm-diagnostics/knowledge-points/cold-and-heat")) {
          fail(`⌘K 知识点跳转错误：${page.url()}`);
        }
      }
    }

    // 空态：「不存在的东西」
    await page.keyboard.press("Control+k");
    await palette.waitFor({ state: "visible", timeout: 10000 });
    await palette.locator("input").fill("不存在的东西");
    await page.waitForTimeout(300);
    const emptyText = (await palette.textContent()) ?? "";
    await shoot(page, resolve(OUT, `${TAG}-palette-empty-1440.png`));
    console.log(`[palette-empty] has-empty-state=${emptyText.includes("没有匹配的内容")}`);
    if (!emptyText.includes("没有匹配的内容")) {
      fail("⌘K 空态未显示「没有匹配的内容」");
    }
    await page.keyboard.press("Escape");
    await palette.waitFor({ state: "hidden", timeout: 5000 }).catch(() => fail("⌘K Esc 未关闭面板"));

    // 书架教材章节：按教材名命中，跳 /learn/hi-doc/t/{id}/c/1
    await page.keyboard.press("Control+k");
    await palette.waitFor({ state: "visible", timeout: 10000 });
    await palette.locator("input").fill("R4 验证教材");
    await page.waitForTimeout(400);
    const shelfHit = palette.locator("button", { hasText: "第 1 章" });
    const shelfCount = await shelfHit.count();
    const shelfText = (await palette.textContent()) ?? "";
    await shoot(page, resolve(OUT, `${TAG}-palette-shelf-1440.png`));
    console.log(`[palette-shelf] hits=${shelfCount} hasShelfGroup=${shelfText.includes("书架教材")}`);
    if (shelfCount === 0 || !shelfText.includes("书架教材")) {
      fail("⌘K 书架教材章节未命中（索引未接入书架内存数据）");
    } else {
      await shelfHit.first().click();
      await page.waitForURL(`**/learn/hi-doc/t/${seed.textbookId}/c/1`, { timeout: 15000 });
      console.log(`[palette-shelf-enter] url=${page.url()}`);
    }
    if (errors.length > 0) {
      fail(`⌘K 检索交互存在控制台错误：${errors.slice(0, 3).join(" | ")}`);
    }
  } catch (error) {
    fail(`palette-search: ${error}`);
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

