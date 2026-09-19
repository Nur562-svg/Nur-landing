/**
 * R2-1 专项验证：/design-system 暗色下 secondary 按钮可读性截图。
 * 复用 design-r1-check.mjs 的登录脚手架（注册临时账号 → nur_session cookie）。
 * 用法：node scripts/design-r21-check.mjs --base http://localhost:3000
 */
import { chromium } from "playwright-core";
import { resolve } from "node:path";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const BASE = arg("base", "http://localhost:3000");
const OUT = resolve(arg("out", "docs/design-references"));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-extensions", "--force-color-profile=srgb", "--hide-scrollbars"],
});

let failures = 0;

async function getSessionCookie() {
  const email = `r21-verify-${Date.now()}@example.com`;
  const password = "r21-verify-pass";
  let res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password, displayName: "R2-1 验证" }),
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
    console.error(`[auth] register/login ${res.status}，无法建立会话`);
    return null;
  }
  const match = /nur_session=([^;]+)/.exec(setCookie);
  return match ? { name: "nur_session", value: match[1], domain: "localhost", path: "/" } : null;
}

const cookie = await getSessionCookie();
if (!cookie) {
  failures += 1;
} else {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "zh-CN",
  });
  await context.addCookies([cookie]);
  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  try {
    const response = await page.goto(`${BASE}/design-system`, { waitUntil: "networkidle", timeout: 45000 });
    const status = response?.status() ?? 0;
    // 壳顶栏明暗切换（R2-2 前先落 design-system 自带开关，二者 aria-label 同名均可命中）
    const toggle = page.getByRole("button", { name: /切换暗色|切换亮色/ }).first();
    if (await toggle.count()) {
      await toggle.click();
      await page.waitForTimeout(300);
    } else {
      // 兜底：直接挂 .dark
      await page.evaluate(() => document.documentElement.classList.add("dark"));
      await page.waitForTimeout(200);
    }
    // 实测 secondary 按钮（v2 组件区第二行）底/字对比度
    const contrast = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const secondary = buttons.find((b) => b.textContent?.includes("打开设计指南"));
      if (!secondary) return null;
      const style = getComputedStyle(secondary);
      return { background: style.backgroundColor, color: style.color, text: secondary.textContent?.trim() };
    });
    await page.screenshot({ path: resolve(OUT, "r2-1-design-system-dark-1440.png"), fullPage: false });
    console.log(`[design-system-dark] status=${status} secondary=${JSON.stringify(contrast)} errors=${errors.length}`);
    if (status !== 200 || !contrast || errors.length) failures += 1;
  } catch (error) {
    failures += 1;
    console.error(`[FAIL] design-system dark: ${error}`);
  } finally {
    await context.close();
  }
}

await browser.close();
console.log(failures === 0 ? "R2-1 CHECK PASSED" : `FAILURES: ${failures}`);
process.exit(failures === 0 ? 0 : 1);
