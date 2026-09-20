import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

// 设计系统 v2 R1：六件套纯渲染冒烟测试。
// 组件 import 了 *.module.css，先用加载钩子把 CSS 模块替换为类名代理，
// 再动态 import 组件与断言渲染产物。

register("./helpers/css-module-hooks.mjs", import.meta.url);

type AnyProps = Record<string, unknown>;

let components: Record<string, (props: AnyProps) => React.ReactElement>;

function h(component: (props: AnyProps) => React.ReactElement, props: AnyProps = {}, ...children: React.ReactNode[]) {
  return React.createElement(component, props, ...children);
}

describe("Design System v2 six-piece components (pure render smoke)", () => {
  before(async () => {
    // R4 顺手修复并发 flake：Promise.all 的 6 个动态 import 与 register() 的 ESM 钩子
    // 存在时序竞态（偶发 CSS 被当 JS 解析 → 6 cancelled）。先空转一次 stub import
    // 让出事件循环确保钩子 attach，再串行 import 组件。
    await import("./helpers/css-module-stub.mjs");
    const button = await import("../src/components/ui/v2/button");
    const card = await import("../src/components/ui/v2/card");
    const input = await import("../src/components/ui/v2/input");
    const badge = await import("../src/components/ui/v2/badge");
    const chatBubble = await import("../src/components/ui/v2/chat-bubble");
    const navigation = await import("../src/components/ui/v2/navigation");
    components = {
      V2Button: button.V2Button as unknown as (props: AnyProps) => React.ReactElement,
      V2Card: card.V2Card as unknown as (props: AnyProps) => React.ReactElement,
      V2Input: input.V2Input as unknown as (props: AnyProps) => React.ReactElement,
      V2Badge: badge.V2Badge as unknown as (props: AnyProps) => React.ReactElement,
      V2ChatBubble: chatBubble.V2ChatBubble as unknown as (props: AnyProps) => React.ReactElement,
      V2ChatThread: chatBubble.V2ChatThread as unknown as (props: AnyProps) => React.ReactElement,
      V2TabStrip: navigation.V2TabStrip as unknown as (props: AnyProps) => React.ReactElement,
      V2SideRail: navigation.V2SideRail as unknown as (props: AnyProps) => React.ReactElement,
      V2BottomNav: navigation.V2BottomNav as unknown as (props: AnyProps) => React.ReactElement,
    };
  });

  it("V2Button 渲染三种变体与禁用态", () => {
    const primary = renderToStaticMarkup(h(components.V2Button, {}, "开始学习"));
    const secondary = renderToStaticMarkup(h(components.V2Button, { variant: "secondary" }, "打开指南"));
    const ghost = renderToStaticMarkup(h(components.V2Button, { variant: "ghost" }, "跳过"));
    const disabled = renderToStaticMarkup(h(components.V2Button, { disabled: true }, "不可用"));
    assert.ok(primary.includes("开始学习"));
    assert.ok(primary.includes("button"));
    assert.ok(secondary.includes("打开指南"));
    assert.ok(ghost.includes("跳过"));
    assert.ok(disabled.includes("disabled"));
  });

  it("V2Card 渲染 floating/sunken/emphasis/disabled 与内容插槽", () => {
    const html = renderToStaticMarkup(
      h(components.V2Card, {
        eyebrow: "Reading Card",
        title: "总结这一章",
        body: "正文示例",
      }),
    );
    assert.ok(html.includes("Reading Card"));
    assert.ok(html.includes("总结这一章"));
    assert.ok(html.includes("正文示例"));
    const emphasis = renderToStaticMarkup(h(components.V2Card, { variant: "emphasis" }, "强调"));
    const sunken = renderToStaticMarkup(h(components.V2Card, { variant: "sunken" }, "凹陷"));
    const disabledCard = renderToStaticMarkup(h(components.V2Card, { variant: "disabled" }, "禁用"));
    for (const html2 of [emphasis, sunken, disabledCard]) {
      assert.ok(html2.length > 0);
    }
  });

  it("V2Input 渲染 field 与 bar 变体及禁用态", () => {
    const field = renderToStaticMarkup(h(components.V2Input, { placeholder: "搜索组件…" }));
    const bar = renderToStaticMarkup(h(components.V2Input, { variant: "bar", placeholder: "内嵌输入" }));
    const disabled = renderToStaticMarkup(h(components.V2Input, { disabled: true }));
    assert.ok(field.includes("input"));
    assert.ok(field.includes("搜索组件"));
    assert.ok(bar.includes("input"));
    assert.ok(disabled.includes("disabled"));
  });

  it("V2Badge 渲染三种变体与 aria-disabled", () => {
    const filled = renderToStaticMarkup(h(components.V2Badge, {}, "简答"));
    const muted = renderToStaticMarkup(h(components.V2Badge, { variant: "muted" }, "名词解释"));
    const outline = renderToStaticMarkup(h(components.V2Badge, { variant: "outline" }, "待确认"));
    const disabled = renderToStaticMarkup(h(components.V2Badge, { disabled: true }, "禁用"));
    assert.ok(filled.includes("简答"));
    assert.ok(muted.includes("名词解释"));
    assert.ok(outline.includes("待确认"));
    assert.ok(disabled.includes("aria-disabled"));
  });

  it("V2ChatBubble/V2ChatThread 渲染 user/assistant/disabled 与线程容器", () => {
    const user = renderToStaticMarkup(h(components.V2ChatBubble, { role: "user", meta: "你 · 刚刚" }, "问题"));
    const assistant = renderToStaticMarkup(h(components.V2ChatBubble, { role: "assistant", meta: "NUR Agent" }, "回答"));
    const disabledBubble = renderToStaticMarkup(
      h(components.V2ChatBubble, { role: "user", meta: "排队中", disabled: true }, "排队"),
    );
    const thread = renderToStaticMarkup(
      h(
        components.V2ChatThread,
        {},
        h(components.V2ChatBubble, { role: "user" }, "一"),
        h(components.V2ChatBubble, { role: "assistant" }, "二"),
      ),
    );
    assert.ok(user.includes("你 · 刚刚"));
    assert.ok(assistant.includes("NUR Agent"));
    assert.ok(disabledBubble.includes("aria-disabled"));
    assert.ok(thread.includes("一") && thread.includes("二"));
  });

  it("V2TabStrip/V2SideRail/V2BottomNav 渲染条目、active 与禁用", () => {
    const items = [
      { id: "a", label: "讲义" },
      { id: "b", label: "推理室" },
      { id: "c", label: "维护中", disabled: true },
    ];
    const tabs = renderToStaticMarkup(h(components.V2TabStrip, { items, activeId: "a" }));
    const rail = renderToStaticMarkup(
      h(components.V2SideRail, {
        brand: "NUR LEARN",
        items: [
          { id: "hidoc", label: "Hi doc", href: "/learn/hi-doc" },
          { id: "courses", label: "官方课程", href: "/courses" },
        ],
        activeId: "hidoc",
      }),
    );
    const bottom = renderToStaticMarkup(
      h(components.V2BottomNav, { items: [{ id: "learn", label: "学习", href: "/learn" }], activeId: "learn" }),
    );
    assert.ok(tabs.includes("讲义"));
    assert.ok(tabs.includes("维护中"));
    assert.ok(rail.includes("Hi doc"));
    assert.ok(rail.includes("official-course") === false);
    assert.ok(bottom.includes("学习"));
    // active 条目带 aria-current
    assert.ok(rail.includes("aria-current"));
    assert.ok(bottom.includes("aria-current"));
  });
});
