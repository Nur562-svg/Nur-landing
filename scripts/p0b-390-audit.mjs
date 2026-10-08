/** P0-B 390 专项审计（只读）：Top 6 高频面的溢出/触控目标/布局实测。 */
import { chromium } from "playwright-core";
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const res = await fetch("http://localhost:3000/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "v4qa2-1791112494@example.com", password: "m6d-walkthrough" }) });
const cookie = /nur_session=([^;]+)/.exec(res.headers.get("set-cookie"))[1];
const PAGES = [
  ["学习页", "http://localhost:3000/learn/clew/t/v4qa-textbook-1/c/1?kp=v4qa-kp-01"],
  ["书架", "http://localhost:3000/learn/clew"],
  ["教材详情", "http://localhost:3000/learn/clew/t/v4qa-textbook-1"],
  ["我的学习", "http://localhost:3000/learn"],
  ["错题中心", "http://localhost:3000/wrong-questions"],
  ["账单", "http://localhost:3000/account/billing"],
];
for (const [name, url] of PAGES) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await context.addCookies([{ name: "nur_session", value: cookie, domain: "localhost", path: "/" }]);
  const page = await context.newPage();
  const errors = [];
  page.on("console", m => { if (m.type() === "error") errors.push(m.text().slice(0, 80)); });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2800);
  const audit = await page.evaluate(() => {
    const doc = document.scrollingElement;
    const overflowX = doc.scrollWidth - doc.clientWidth;
    // 触控目标：主内容可点按钮/链接 < 40px 高的（前 5 个）
    const small = [];
    for (const el of document.querySelectorAll("button, a")) {
      if (!el.offsetParent) continue;
      const r = el.getBoundingClientRect();
      if (r.height > 0 && r.height < 40 && small.length < 5) {
        small.push(`${(el.textContent ?? "").trim().slice(0, 12) || el.getAttribute("aria-label") || "?"}:${Math.round(r.height)}px`);
      }
    }
    // 溢出元素定位（横向超出视口的元素）
    const offenders = [];
    for (const el of document.querySelectorAll("*")) {
      if (el.scrollWidth > doc.clientWidth + 2 && offenders.length < 4 && el.tagName !== "HTML" && el.tagName !== "BODY") {
        offenders.push(`${el.tagName}.${String(el.className).slice(0, 30)}(+${el.scrollWidth - doc.clientWidth})`);
      }
    }
    return { overflowX, small, offenders };
  });
  console.log(`${audit.overflowX > 0 ? "✖" : "✔"} ${name} — 横向溢出=${audit.overflowX}px${audit.overflowX > 0 ? " 溢出源:" + audit.offenders.join(" | ") : ""}；触控<40px: ${audit.small.length ? audit.small.join(", ") : "无"}`);
  if (errors.length) console.log(`   console: ${errors.length} ${errors[0]}`);
  await context.close();
}
await browser.close();
