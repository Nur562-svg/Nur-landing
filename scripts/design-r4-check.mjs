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
// 分段跑（dev 服务器长跑会触发内存阈值自动重启 → 连接重置）：
//   --only search,touch,fab   检索 + 390 触控 + 浮球复核
//   --only matrix             R3 15 路由 × 亮/暗 × 1440/390 回归
// 缺省（不传）= 全部段。
const ONLY = arg("only", "");
const only = (section) => ONLY === "" || ONLY.split(",").includes(section);

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

/** 打开 ⌘K：冷编译后首次水合可能晚于 networkidle，按键重试直到面板可见（同 R3 水合等待思路）。 */
async function openPalette(page) {
  const palette = page.locator("[data-command-palette]");
  for (let attempt = 0; attempt < 6; attempt += 1) {
    await page.keyboard.press("Control+k");
    try {
      await palette.waitFor({ state: "visible", timeout: 1500 });
      return palette;
    } catch {
      // 未挂载时按键是 no-op；等待后重试
      await page.waitForTimeout(1000);
    }
  }
  await palette.waitFor({ state: "visible", timeout: 10000 });
  return palette;
}

// ── ⌘K 检索交互（1440）─────────────────────────────────────
if (only("search")) {
  const { context, page, errors } = await newPage(VIEWPORTS[0]);
  try {
    await page.goto(`${BASE}/learn`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(500);

    // 打开命令面板（⌘K / Ctrl+K）
    const palette = await openPalette(page);
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
      // 命中 1 条：知识点「问寒热」（章节按 title 匹配，其 focus 文本不参与）。
      // Enter 走高亮首条 → 知识点讲义路由。
      await input.press("Enter");
      await page.waitForURL("**/courses/tcm-diagnostics/knowledge-points/cold-and-heat", { timeout: 15000 });
      await page.waitForLoadState("networkidle");
      const headings = (await page.getByRole("heading").allTextContents()).join(" ");
      console.log(`[palette-enter-kp] url=${page.url()} headings="${headings.slice(0, 60)}"`);
      if (!page.url().includes("/courses/tcm-diagnostics/knowledge-points/cold-and-heat")) {
        fail(`⌘K Enter 知识点跳转错误：${page.url()}`);
      }

      // 章节课入口：按章节名检索 → Enter → 课程工作台（闭环课章节走页内目录）
      await openPalette(page);
      await palette.locator("input").fill("八纲辨证");
      await page.waitForTimeout(300);
      const chapterItem = palette.locator("button", { hasText: "八纲辨证" });
      if ((await chapterItem.count()) === 0) {
        fail("⌘K 检索「八纲辨证」未命中的章节条目");
      } else {
        await chapterItem.first().click();
        await page.waitForURL("**/courses/tcm-diagnostics", { timeout: 15000 });
        await page.waitForLoadState("networkidle");
        console.log(`[palette-enter-chapter] url=${page.url()}`);
        if (page.url().includes("knowledge-points")) {
          fail(`⌘K 章节跳转错误：${page.url()}`);
        }
      }
    }

    // 空态：「不存在的东西」
    await openPalette(page);
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
    await openPalette(page);
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

// ── R4-2：390 触控（抽屉开合/Esc/scrim/滚锁/焦点 + 面板底部弹出 + 命中区抽查）──
if (only("touch")) {
  const { context, page, errors } = await newPage(VIEWPORTS[1]);
  try {
    await page.goto(`${BASE}/learn`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(500);

    // 顶栏命中区抽查（≥44×44）
    const targets = await page.evaluate(() => {
      const read = (el) => {
        const rect = el?.getBoundingClientRect();
        return rect ? { w: Math.round(rect.width), h: Math.round(rect.height) } : null;
      };
      return {
        hamburger: read(document.querySelector("button[aria-label='打开导航']")),
        searchTrigger: read(document.querySelector("button[aria-label='打开命令面板（⌘K）']")),
        themeToggle: read(document.querySelector("button[aria-label='切换暗色'], button[aria-label='切换亮色']")),
        userChip: read(document.querySelector("[data-user-chip]")),
      };
    });
    console.log(`[touch-targets] ${JSON.stringify(targets)}`);
    for (const [name, size] of Object.entries(targets)) {
      if (!size) continue; // userChip 未登录时可能不存在
      if (size.w < 44 || size.h < 44) fail(`触控目标 ${name} 命中区不足 44×44：${size.w}×${size.h}`);
    }

    // 抽屉：汉堡打开 → 焦点入抽屉 → body 滚锁 → Esc 关闭 → 焦点还汉堡 → 滚锁还原
    const hamburger = page.locator("button[aria-label='打开导航']");
    await hamburger.click();
    await page.waitForTimeout(400);
    const drawerState = await page.evaluate(() => ({
      drawerVisible: document.querySelector("aside[aria-label='工作台导航']")?.getAttribute("data-shell-drawer") === "open",
      bodyLocked: document.documentElement.style.overflow === "hidden",
      focusInDrawer: document.querySelector("aside[aria-label='工作台导航']")?.contains(document.activeElement) ?? false,
      navLinkMinH: (() => {
        const link = document.querySelector("aside[aria-label='工作台导航'] a");
        return link ? Math.round(link.getBoundingClientRect().height) : 0;
      })(),
    }));
    await shoot(page, resolve(OUT, `${TAG}-drawer-open-390.png`));
    console.log(`[drawer-open] ${JSON.stringify(drawerState)}`);
    if (!drawerState.drawerVisible) fail("抽屉未打开");
    if (!drawerState.bodyLocked) fail("抽屉打开时 body 未滚锁");
    if (!drawerState.focusInDrawer) fail("抽屉打开时焦点未进入抽屉");
    if (drawerState.navLinkMinH < 44) fail(`抽屉条目命中高度不足 44px：${drawerState.navLinkMinH}`);

    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const afterEsc = await page.evaluate(() => ({
      drawerVisible: document.querySelector("aside[aria-label='工作台导航']")?.getAttribute("data-shell-drawer") === "open",
      bodyLocked: document.documentElement.style.overflow === "hidden",
      focusOnHamburger: document.activeElement?.getAttribute("aria-label") === "打开导航",
    }));
    console.log(`[drawer-esc] ${JSON.stringify(afterEsc)}`);
    if (afterEsc.drawerVisible) fail("Esc 未关闭抽屉");
    if (afterEsc.bodyLocked) fail("抽屉关闭后滚锁未还原");
    if (!afterEsc.focusOnHamburger) fail("抽屉关闭后焦点未还给汉堡按钮");

    // scrim 点击关闭
    await hamburger.click();
    await page.waitForTimeout(400);
    await page.locator("div[class*='scrim']").click({ position: { x: 340, y: 400 } });
    await page.waitForTimeout(300);
    const afterScrim = await page.evaluate(() =>
      document.querySelector("aside[aria-label='工作台导航']")?.getAttribute("data-shell-drawer") === "open",
    );
    console.log(`[drawer-scrim] open=${afterScrim}`);
    if (afterScrim) fail("scrim 点击未关闭抽屉");

    // ⌘K 面板 390 底部弹出：贴底 + 全宽 + ≤70dvh
    const palette = await openPalette(page);
    await page.waitForTimeout(300);
    await shoot(page, resolve(OUT, `${TAG}-palette-390.png`));
    const panelBox = await palette.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        x: Math.round(rect.x),
        w: Math.round(rect.width),
        bottomGap: Math.round(window.innerHeight - rect.bottom),
        h: Math.round(rect.height),
        vh: window.innerHeight,
        borderTopRadius: getComputedStyle(el).borderTopLeftRadius,
      };
    });
    console.log(`[palette-390] ${JSON.stringify(panelBox)}`);
    if (panelBox.x !== 0 || panelBox.w !== 390) fail(`⌘K 390 面板未全宽：x=${panelBox.x} w=${panelBox.w}`);
    if (panelBox.bottomGap > 1) fail(`⌘K 390 面板未贴底：gap=${panelBox.bottomGap}`);
    if (panelBox.h > Math.ceil(panelBox.vh * 0.7) + 2) fail(`⌘K 390 面板超高 70dvh：${panelBox.h}/${panelBox.vh}`);
    if (parseFloat(panelBox.borderTopRadius) <= 0) fail("⌘K 390 面板缺上沿圆角");

    // 面板条目命中高度 ≥44
    const itemH = await palette.evaluate((el) => {
      const item = el.querySelector("ul button");
      return item ? Math.round(item.getBoundingClientRect().height) : 0;
    });
    console.log(`[palette-390-item] height=${itemH}`);
    if (itemH < 44) fail(`⌘K 390 条目高度不足 44px：${itemH}`);
    await page.keyboard.press("Escape");

    // 390 无横向溢出复核
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    if (overflow.scrollWidth > overflow.clientWidth) {
      fail(`390 横向溢出：${overflow.scrollWidth}/${overflow.clientWidth}`);
    }
    if (errors.length > 0) {
      fail(`390 触控流程存在控制台错误：${errors.slice(0, 3).join(" | ")}`);
    }
  } catch (error) {
    fail(`mobile-touch: ${error}`);
  } finally {
    await context.close();
  }
}

// ── R3 回归矩阵：15 路由 × 亮/暗 × 1440/390（确认本期 CSS 未破坏既有面）──────
const KP = "diet-and-taste";
const ROUTES = [
  { name: "learn", path: "/learn" },
  { name: "learn-my-materials", path: "/learn/my-materials" },
  { name: "courses", path: "/courses" },
  { name: "course-workspace", path: "/courses/tcm-diagnostics" },
  { name: "knowledge-point", path: `/courses/tcm-diagnostics/knowledge-points/${KP}` },
  { name: "subjective-writing", path: `/courses/tcm-diagnostics/knowledge-points/${KP}/subjective-writing` },
  { name: "case-reasoning", path: `/courses/tcm-diagnostics/knowledge-points/${KP}/case-reasoning` },
  { name: "question-bank-global", path: "/question-bank" },
  { name: "question-bank-home", path: "/courses/tcm-diagnostics/question-bank" },
  { name: "question-bank-chapter", path: "/courses/tcm-diagnostics/question-bank/introduction" },
  { name: "question-bank-practice", path: "/courses/tcm-diagnostics/question-bank/introduction/assessment-a1-introduction-principles" },
  { name: "mock-exam", path: "/courses/tcm-diagnostics/mock-exam" },
  { name: "wrong-questions", path: "/wrong-questions" },
  { name: "account-billing", path: "/account/billing" },
  { name: "design-system", path: "/design-system" },
];

/** 已知 dev 竞态签名：冷编译偶发 manifest 500（"Unexpected end of JSON input" 或 "Manifest file is empty"；生产构建无此问题）。 */
function isKnownDevRace(status, errors) {
  return status === 500 && errors.some((text) =>
    text.includes("Unexpected end of JSON input") || text.includes("Manifest file is empty"),
  );
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

for (const theme of ["light", "dark"]) {
  for (const viewport of VIEWPORTS) {
    for (const route of only("matrix") ? ROUTES : []) {
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

// ── Agent 浮球位置复核（390：不得遮挡内容页主 CTA 与底部抽屉 CTA）──────────
if (only("fab")) {
  const { context, page } = await newPage(VIEWPORTS[1]);
  try {
    await page.goto(`${BASE}/courses/tcm-diagnostics`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(800);
    const overlap = await page.evaluate(() => {
      const fab = document.querySelector("button[class*='fab']");
      if (!fab) return { fab: null };
      const f = fab.getBoundingClientRect();
      const rect = (el) => { const r = el?.getBoundingClientRect(); return r ? { x: r.x, y: r.y, w: r.width, h: r.height } : null; };
      // 底部抽屉主 CTA（.sessionStartLink 等）与「直接进入学习」入口
      const cta = document.querySelector("[class*='sessionStartLink']") ?? document.querySelector("[class*='readyLink']");
      const c = rect(cta);
      const intersects = c
        ? !(f.right < c.x || f.x > c.x + c.w || f.bottom < c.y || f.y > c.y + c.h)
        : null;
      return {
        fab: { x: Math.round(f.x), y: Math.round(f.y), w: Math.round(f.width), h: Math.round(f.height) },
        cta: c ? { x: Math.round(c.x), y: Math.round(c.y), w: Math.round(c.w), h: Math.round(c.h) } : null,
        intersects,
      };
    });
    console.log(`[agent-fab-390] ${JSON.stringify(overlap)}`);
    if (overlap.intersects === true) {
      fail("Agent 浮球遮挡内容页主 CTA（390）");
    }
  } catch (error) {
    fail(`agent-fab: ${error}`);
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

