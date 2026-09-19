/**
 * R3 暗色对比度审计：对 R3 覆盖的 15 条路由逐可见文本元素计算
 * 「有效前景色 × 有效背景色」的 WCAG 对比度，标记 < 2.5 的可疑浅底浅字/深底深字。
 * 复用 scripts/design-r2-dark-audit.mjs 的采样函数与暗色真实链路（localStorage → 防闪烁脚本）。
 * 用法：node scripts/design-r3-dark-audit.mjs --base http://localhost:3000
 */
import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const BASE = arg("base", "http://localhost:3000");
const DB = resolve("prisma/dev.db");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function sql(statement) {
  execFileSync("sqlite3", [DB, `PRAGMA foreign_keys=ON; ${statement}`], { stdio: ["ignore", "pipe", "pipe"] });
}

// 注册 + 造一本 Hi doc 教材（壳侧栏「最近学习」需要，否则该区域为空不影响审计）
const email = `r3-audit-${Date.now()}@example.com`;
const res = await fetch(`${BASE}/api/auth/register`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ email, password: "r3-audit-pass", displayName: "R3 审计" }),
});
const setCookie = res.headers.get("set-cookie");
const payload = await res.json();
const userId = payload?.user?.id;
const match = /nur_session=([^;]+)/.exec(setCookie ?? "");
if (!res.ok || !match || !userId) {
  console.error(`[auth] register ${res.status} 失败`);
  process.exit(1);
}
const cookie = { name: "nur_session", value: match[1], domain: "localhost", path: "/" };

const month = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit" })
  .format(new Date())
  .slice(0, 7);
sql(`
  DELETE FROM HiDocChapter WHERE id LIKE 'r3-verify-chapter-%';
  DELETE FROM HiDocTextbook WHERE id LIKE 'r3-verify-textbook-%';
  INSERT INTO HiDocTextbook (id, userId, title, fileName, storageKey, sizeBytes, pageCount, hasTextLayer, status, activeMonth, createdAt, updatedAt)
  VALUES ('r3-verify-textbook-0001', '${userId}', 'R3 审计教材', 'r3-audit.pdf', 'hidoc/${userId}/r3-verify-textbook-0001/r3-audit.pdf', 102400, 12, 1, 'ready', '${month}', datetime('now'), datetime('now'));
  INSERT INTO HiDocChapter (id, textbookId, "order", title, pageStart, pageEnd, source, status, createdAt, updatedAt)
  VALUES ('r3-verify-chapter-0001', 'r3-verify-textbook-0001', 1, '绪论', 1, 12, 'manual', 'extracted', datetime('now'), datetime('now'));
`);

const KP = "diet-and-taste";
const AUDIT_PAGES = [
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

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-extensions", "--force-color-profile=srgb", "--hide-scrollbars"],
});

const AUDIT_FUNCTION = () => {
  const parseColor = (value) => {
    const m = value.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    if (!m) return null;
    return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a: m[4] === undefined ? 1 : Number(m[4]) };
  };
  const luminance = (c) => {
    const f = (v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const blend = (top, bottom) => ({
    r: top.r * top.a + bottom.r * (1 - top.a),
    g: top.g * top.a + bottom.g * (1 - top.a),
    b: top.b * top.a + bottom.b * (1 - top.a),
    a: 1,
  });
  // 沿祖先找第一层不透明背景；color-mix(..., transparent) 会给出带 alpha 的 rgba，可直接混合
  const effectiveBg = (el) => {
    let chain = [];
    let node = el;
    const root = { r: 38, g: 38, b: 36, a: 1 }; // 暗色 body 底（--bg-100 #262624）
    while (node && node !== document.documentElement) {
      const bg = parseColor(getComputedStyle(node).backgroundColor);
      if (bg && bg.a >= 0.98) {
        let result = bg;
        for (const over of chain.reverse()) result = blend(over, result);
        return result;
      }
      if (bg && bg.a > 0) chain.push(bg);
      node = node.parentElement;
    }
    let result = root;
    for (const over of chain.reverse()) result = blend(over, result);
    return result;
  };
  const flagged = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent.trim();
    if (!text) continue;
    const el = node.parentElement;
    if (!el || seen.has(el)) continue;
    seen.add(el);
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none" || Number(style.opacity) < 0.3) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 4 || rect.height < 4) continue;
    const fg = parseColor(style.color);
    if (!fg) continue;
    const bg = effectiveBg(el);
    const l1 = luminance(fg);
    const l2 = luminance(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    if (ratio < 2.5) {
      flagged.push({
        text: text.slice(0, 24),
        ratio: Math.round(ratio * 100) / 100,
        color: style.color,
        bg: `rgb(${Math.round(bg.r)} ${Math.round(bg.g)} ${Math.round(bg.b)})`,
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 40),
      });
    }
  }
  return flagged;
};

let total = 0;
for (const auditPage of AUDIT_PAGES) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "zh-CN",
    colorScheme: "light",
  });
  await context.addCookies([cookie]);
  await context.addInitScript("try{localStorage.setItem('nur-theme','dark')}catch(e){}");
  const page = await context.newPage();
  try {
    await page.goto(`${BASE}${auditPage.path}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(400);
    const flagged = await page.evaluate(AUDIT_FUNCTION);
    total += flagged.length;
    console.log(`[${auditPage.name}] dark 低对比文本元素 ${flagged.length} 个`);
    for (const item of flagged.slice(0, 8)) {
      console.log(`    ratio=${item.ratio} <${item.tag} class="${item.cls}"> "${item.text}" fg=${item.color} bg=${item.bg}`);
    }
  } catch (error) {
    total += 1;
    console.error(`[${auditPage.name}] FAIL: ${error}`);
  } finally {
    await context.close();
  }
}

sql(`
  DELETE FROM User WHERE id='${userId}';
  DELETE FROM HiDocChapter WHERE id LIKE 'r3-verify-chapter-%';
  DELETE FROM HiDocTextbook WHERE id LIKE 'r3-verify-textbook-%';
`);

await browser.close();
console.log(total === 0 ? "DARK CONTRAST AUDIT PASSED" : `FLAGGED: ${total}`);
process.exit(total === 0 ? 0 : 1);
