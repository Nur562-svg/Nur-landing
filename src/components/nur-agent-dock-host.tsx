"use client";

import { useSyncExternalStore } from "react";

import {
  getNurAgentDockPropsServerSnapshot,
  getNurAgentDockPropsSnapshot,
  subscribeNurAgentDockProps,
} from "@/lib/agent-dock-props";
import { NurAgentDock } from "./nur-agent-dock";

/**
 * NUR Agent Dock 壳级单实例宿主：在根布局挂载一次，读取
 * useNurAgentDockProps 上报的 props 并渲染唯一一个 dock。
 * dock 自身仍通过 createPortal 渲染到 document.body，视觉与交互不变。
 */
export function NurAgentDockHost() {
  const props = useSyncExternalStore(
    subscribeNurAgentDockProps,
    getNurAgentDockPropsSnapshot,
    getNurAgentDockPropsServerSnapshot,
  );
  if (!props) {
    return null;
  }
  return <NurAgentDock {...props} />;
}
