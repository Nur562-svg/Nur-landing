/**
 * P1-A token 归一走查探针：明暗 × 1440/390 截图 + console + 横向溢出（before/after 双跑对比用）。
 *
 * 用法：node scripts/p1a-codemod-walkthrough.mjs --tag before|after --base http://localhost:3000
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const BASE = arg("base", "http://localhost:3000");
const TAG = arg("tag", "before");
const OUT = resolve(arg("out", "docs/design-references"));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ["learn", "/learn"],
  ["clew-study", "/learn/clew/t/v4qa-textbook-1/c/1?kp=v4qa-kp-01"],
  ["clew-shelf", "/learn/clew"],
  ["course-builder", "/learn/course-builder"],
  ["my-materials", "/learn/my-materials"],
  ["wrong-questions", "/wrong-questions"],
  ["courses", "/courses"],
  ["course-tcm", "/courses/tcm-diagnostics"],
  ["billing", "/account/billing"],
];

async function login(email, password) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const match = /nur_session=([^;]+)/.exec(res.headers.get("set-cookie") ?? "");
  if (!match) throw new Error(`login failed ${res.status}`);
  return { name: "nur_session", value: match[1], domain: "localhost", path: "/" };
}

const cookie = await login("v4qa2-1791112494@example.com", "m6d-walkthrough");
const browser = await chromium.launch({ executablePath: CHROME, headless: true });

const consoleErrors = [];
const failures = [];

async function capture(viewport, dark, routes) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "zh-CN",
  });
  await context.addCookies([cookie]);
  if (dark) {
    await context.addInitScript("try{localStorage.setItem('nur-theme','dark')}catch(e){}");
  }
  const page = await context.newPage();
  const label = `${viewport.width}${dark ? "d" : "l"}`;
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(`[${label}] ${m.text().slice(0, 160)}`);
  });
  page.on("pageerror", (e) => consoleErrors.push(`[${label}] pageerror: ${String(e).slice(0, 160)}`));

  for (const [name, path] of routes) {
    await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2200);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 1) failures.push(`overflow ${label} ${name}: ${overflow}px`);
    await page.screenshot({ path: resolve(OUT, `p1a-${TAG}-${name}-${label}.png`) });
    console.log(`✔ p1a-${TAG}-${name}-${label}.png (overflow=${overflow}px)`);
  }
  await context.close();
}

const V1440 = { width: 1440, height: 900 };
const V390 = { width: 390, height: 844 };
const routes390 = ROUTES.filter(([n]) => ["learn", "clew-study", "wrong-questions"].includes(n));

await capture(V1440, false, ROUTES);
await capture(V1440, true, ROUTES);
await capture(V390, false, routes390);
await capture(V390, true, routes390);

await browser.close();
console.log(`\nconsole errors: ${consoleErrors.length}`);
for (const line of consoleErrors.slice(0, 10)) console.log("  ", line);
if (failures.length > 0) {
  console.error(`溢出失败：${failures.join("、")}`);
  process.exit(1);
}
console.log(`P1-A 走查基线（${TAG}）采集完成。`);
