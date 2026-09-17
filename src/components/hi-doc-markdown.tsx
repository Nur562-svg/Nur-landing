"use client";

import type { ReactNode } from "react";
import { parseHiDocInline, parseHiDocMarkdown } from "@/lib/hidoc/lesson-markdown";
import styles from "./hi-doc.module.css";

/**
 * Hi doc 讲义 markdown 渲染（客户端，只渲染受支持的子集）。
 * 不使用 dangerouslySetInnerHTML：所有内容都作为 React 文本节点插入。
 */

function renderInline(text: string): ReactNode[] {
  return parseHiDocInline(text).map((token, index) => {
    if (token.kind === "bold") {
      return <strong key={index}>{token.text}</strong>;
    }
    if (token.kind === "code") {
      return <code key={index}>{token.text}</code>;
    }
    return <span key={index}>{token.text}</span>;
  });
}

export function HiDocMarkdown({ markdown }: { markdown: string }) {
  const blocks = parseHiDocMarkdown(markdown);
  return (
    <div className={styles.markdown}>
      {blocks.map((block, index) => {
        if (block.kind === "heading") {
          if (block.level === 1) {
            return <h1 key={index}>{renderInline(block.text)}</h1>;
          }
          if (block.level === 2) {
            return <h2 key={index}>{renderInline(block.text)}</h2>;
          }
          return <h3 key={index}>{renderInline(block.text)}</h3>;
        }
        if (block.kind === "quote") {
          return <blockquote key={index}>{renderInline(block.text)}</blockquote>;
        }
        if (block.kind === "list") {
          const items = block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ));
          return block.ordered ? <ol key={index}>{items}</ol> : <ul key={index}>{items}</ul>;
        }
        return <p key={index}>{renderInline(block.text)}</p>;
      })}
    </div>
  );
}