import { useEffect } from "react";
import type { LearningAttemptSurface, LearningMemoryState } from "@/types/learning";

/**
 * NUR Agent Dock 的壳级单实例 props 存储（R1 收敛）。
 *
 * 以前每个页面组件各自挂载一个 <NurAgentDock>（9 处）；现在页面组件只通过
 * useNurAgentDockProps 上报 props，由根布局唯一的 <NurAgentDockHost> 读取并
 * 渲染单实例 dock。dock 自身继续用 createPortal 挂到 document.body、
 * useSyncExternalStore 同步状态，行为不变。
 */

export type NurAgentDockProps = {
  surface: LearningAttemptSurface | "knowledge-point" | "platform";
  state?: LearningMemoryState;
  courseId?: string;
  courseSlug?: string;
  courseVersionId?: string;
  offeringId?: string;
  knowledgePointId?: string;
  taskId?: string;
  segmentId?: string | null;
  currentText?: string;
  selfCheckStarted?: boolean;
  privateRef?: "nur-qwen-private-ref" | null;
  onApplyRewrite?: (rewrittenText: string, criterionId: string) => void;
};

type Listener = () => void;

let currentProps: NurAgentDockProps | null = null;
const listeners = new Set<Listener>();

function setNurAgentDockProps(props: NurAgentDockProps | null) {
  if (props === currentProps) {
    return;
  }
  currentProps = props;
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeNurAgentDockProps(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** 平台级 dock（学习主页/课程工作台/题库/错题本/我的资料共用）的稳定 props。 */
export const PLATFORM_DOCK_PROPS: NurAgentDockProps = { surface: "platform" };

export function getNurAgentDockPropsSnapshot(): NurAgentDockProps | null {
  return currentProps;
}

export function getNurAgentDockPropsServerSnapshot(): NurAgentDockProps | null {
  return null;
}

/** 页面/房间组件用它上报本页 dock 的 props；卸载时自动清空。 */
export function useNurAgentDockProps(props: NurAgentDockProps): void {
  useEffect(() => {
    setNurAgentDockProps(props);
  });
  useEffect(() => {
    return () => {
      setNurAgentDockProps(null);
    };
  }, []);
}
