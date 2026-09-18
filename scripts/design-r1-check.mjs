/**
 * Design System R1 浏览器验证脚本（playwright-core + 系统 Chrome headless）。
 *
 * 用法：
 *   npm i --no-save playwright-core
 *   node scripts/design-r1-check.mjs --base http://localhost:3000 --out docs/design-references --tag r1-after
 *
 * 可选参数：
 *   --routes /learn,/courses,...  覆盖默认业务路由清单
 *   --no-shell                    跳过壳交互验证（⌘K / 抽屉 / 明暗切换）
 *
 * 输出：逐路由 200 状态 + 1440×900 / 390×844 截图（<tag>-<route>-<viewport>.png）
 *       控制台 error 计数；横向溢出检测（390 视口）。
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}
function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

const BASE = arg("base", "http://localhost:3000");
const OUT = resolve(arg("out", "docs/design-references"));
const TAG = arg("tag", "r1");
const ROUTES = (arg("routes", "/learn,/courses,/question-bank,/account/billing,/learn/hi-doc,/learn/hi-doc/w,/wrong-questions")
  .split(",")
  .map((r) => r.trim())
  .filter(Boolean));
const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "390", width: 390, height: 844 },
];

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-extensions", "--force-color-profile=srgb", "--hide-scrollbars"],
});

let failures = 0;

/** 注册/登录一个验证账号，返回 nur_session cookie（供需登录态的页面使用）。 */
async function getSessionCookie() {
  const email = `r1-verify-${Date.now()}@example.com`;
  const password = "r1-verify-pass";
  let res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password, displayName: "R1 验证" }),
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
    console.error(`[auth] 无法建立会话（register/login ${res.status}），登录态相关检查将跳过`);
    return null;
  }
  const match = /nur_session=([^;]+)/.exec(setCookie);
  return match ? { name: "nur_session", value: match[1], domain: "localhost", path: "/" } : null;
}

const SESSION_COOKIE = await getSessionCookie();

async function newPage(viewport, { authed = false } = {}) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "zh-CN",
  });
  if (authed && SESSION_COOKIE) {
    await context.addCookies([{ ...SESSION_COOKIE }]);
  }
  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return { context, page, errors };
}

function safeName(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/[/?&#]+/g, "-");
}

for (const viewport of VIEWPORTS) {
  for (const route of ROUTES) {
    const { context, page, errors } = await newPage(viewport);
    const url = `${BASE}${route}`;
    try {
      const response = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      const status = response?.status() ?? 0;
      await page.waitForTimeout(600);
      const overflow =
        viewport.name === "390"
          ? await page.evaluate(() => ({
              scrollWidth: document.documentElement.scrollWidth,
              clientWidth: document.documentElement.clientWidth,
            }))
          : null;
      const file = resolve(OUT, `${TAG}-${safeName(route)}-${viewport.name}.png`);
      await page.screenshot({ path: file, fullPage: false });
      const overflowBad = overflow && overflow.scrollWidth > overflow.clientWidth;
      if (status !== 200 || overflowBad) failures += 1;
      console.log(
        `[${status}] ${route} @${viewport.name}` +
          (overflow ? ` scroll=${overflow.scrollWidth}/client=${overflow.clientWidth}${overflowBad ? " OVERFLOW" : ""}` : "") +
          ` errors=${errors.length}` +
          (errors.length ? `\n    ${errors.slice(0, 3).join("\n    ")}` : ""),
      );
    } catch (error) {
      failures += 1;
      console.error(`[FAIL] ${route} @${viewport.name}: ${error}`);
    } finally {
      await context.close();
    }
  }
}

// ── 壳交互验证（R1）：明暗切换 / ⌘K / 390 抽屉 / 登录态壳 ───────────────
if (!hasFlag("no-shell")) {
  {
    const { context, page, errors } = await newPage(VIEWPORTS[0], { authed: true });
    try {
      const response = await page.goto(`${BASE}/design-system`, { waitUntil: "networkidle", timeout: 45000 });
      const status = response?.status() ?? 0;
      await page.screenshot({ path: resolve(OUT, `${TAG}-design-system-1440.png`) });
      const toggle = page.getByRole("button", { name: /切换暗色|切换亮色/ }).first();
      if (await toggle.count()) {
        await toggle.click();
        await page.waitForTimeout(300);
        const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
        await page.screenshot({ path: resolve(OUT, `${TAG}-design-system-dark-1440.png`) });
        console.log(`[design-system] ${status} dark=${isDark} errors=${errors.length}`);
        if (status !== 200 || !isDark) failures += 1;
      } else {
        console.log(`[design-system] ${status} 暗色开关未找到 errors=${errors.length}`);
        failures += 1;
      }
    } catch (error) {
      failures += 1;
      console.error(`[FAIL] design-system: ${error}`);
    } finally {
      await context.close();
    }
  }

  {
    // 登录态壳：顶栏用户/会员状态
    const { context, page, errors } = await newPage(VIEWPORTS[0], { authed: true });
    try {
      await page.goto(`${BASE}/learn`, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(600);
      const chip = await page.evaluate(() => document.querySelector("[data-user-chip]")?.textContent ?? null);
      await page.screenshot({ path: resolve(OUT, `${TAG}-shell-authed-learn-1440.png`) });
      console.log(`[shell-authed] chip=${JSON.stringify(chip)} errors=${errors.length}`);
      if (!chip) failures += 1;
    } catch (error) {
      failures += 1;
      console.error(`[FAIL] shell-authed: ${error}`);
    } finally {
      await context.close();
    }
  }

  {
    const { context, page, errors } = await newPage(VIEWPORTS[0]);
    try {
      await page.goto(`${BASE}/learn`, { waitUntil: "networkidle", timeout: 45000 });
      await page.keyboard.press("Meta+k");
      await page.waitForTimeout(350);
      const paletteVisible = await page.evaluate(() => Boolean(document.querySelector("[data-command-palette]")));
      await page.screenshot({ path: resolve(OUT, `${TAG}-palette-open-1440.png`) });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(250);
      const paletteClosed = await page.evaluate(() => !document.querySelector("[data-command-palette]"));
      console.log(`[palette] open=${paletteVisible} closed=${paletteClosed} errors=${errors.length}`);
      if (!paletteVisible || !paletteClosed) failures += 1;
    } catch (error) {
      failures += 1;
      console.error(`[FAIL] palette: ${error}`);
    } finally {
      await context.close();
    }
  }

  {
    const { context, page, errors } = await newPage(VIEWPORTS[1]);
    try {
      await page.goto(`${BASE}/learn`, { waitUntil: "networkidle", timeout: 45000 });
      await page.screenshot({ path: resolve(OUT, `${TAG}-shell-learn-390.png`) });
      const menu = page.getByRole("button", { name: /打开导航|导航菜单/ }).first();
      if (await menu.count()) {
        await menu.click();
        await page.waitForTimeout(350);
        const drawerVisible = await page.evaluate(() => Boolean(document.querySelector("[data-shell-drawer]")));
        await page.screenshot({ path: resolve(OUT, `${TAG}-drawer-open-390.png`) });
        console.log(`[drawer] open=${drawerVisible} errors=${errors.length}`);
        if (!drawerVisible) failures += 1;
      } else {
        console.log(`[drawer] 汉堡按钮未找到 errors=${errors.length}`);
        failures += 1;
      }
    } catch (error) {
      failures += 1;
      console.error(`[FAIL] drawer: ${error}`);
    } finally {
      await context.close();
    }
  }
}

await browser.close();
console.log(failures === 0 ? "ALL CHECKS PASSED" : `FAILURES: ${failures}`);
process.exit(failures === 0 ? 0 : 1);
