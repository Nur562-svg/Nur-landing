"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  CircleCheck,
  ClipboardCheck,
  Loader2,
  PenLine,
  RotateCw,
  Route,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  LOOP_PROFILES,
  type LoopProfileId,
  type LoopStage,
} from "@/types/loop-profile";
import { listLoopProfiles, LOOP_STAGE_DISPLAY } from "@/lib/loop-profile";
import styles from "./clew.module.css";

/**
 * Clew 学习闭环 Profile UI（ZCODE-M2 Phase 3 + 2026-10-02 体验补丁）：
 * - ClewLoopProfileBadge：KP 卡片上的 profile 标签，点击展开切换菜单（AI 建议只是默认，用户可改）；
 * - ClewStageSpine：竖向时间轴脊柱（贴讲义侧）。环节 = 真实动作入口：
 *   已接入的环节可点击并真的做事（学 → 滚动到讲义；评 → 打开自测；诊 → 打开「还需看」清单；迁移 → 课题工作坊）；
 *   尚未接入功能的环节以「未接入」如实标注、按不可用呈现——不装会响的按钮，也不写「进入间隔复习」这类空承诺。
 */

const STAGE_ICONS: Record<LoopStage, LucideIcon> = {
  learn: BookOpen,
  practice: PenLine,
  assess: ClipboardCheck,
  diagnose: Stethoscope,
  review: RotateCw,
  transfer: Route,
};

type ClewLoopProfileBadgeProps = {
  profileId: LoopProfileId;
  saving: boolean;
  error: string | null;
  onChange: (profileId: LoopProfileId) => void;
};

export function ClewLoopProfileBadge({ profileId, saving, error, onChange }: ClewLoopProfileBadgeProps) {
  const [open, setOpen] = useState(false);
  const profile = LOOP_PROFILES[profileId] ?? LOOP_PROFILES["full-loop"];

  return (
    <div className={styles.loopProfileWrap}>
      <button
        type="button"
        className={styles.loopProfileBadge}
        aria-expanded={open}
        aria-haspopup="listbox"
        title={`${profile.description}（可切换学习闭环）`}
        onClick={() => setOpen((value) => !value)}
      >
        <Route aria-hidden="true" size={13} strokeWidth={1.6} />
        <span>{profile.name}</span>
        {saving ? (
          <Loader2 className={styles.spin} aria-hidden="true" size={12} strokeWidth={1.8} />
        ) : (
          <ChevronDown aria-hidden="true" size={12} strokeWidth={1.6} />
        )}
      </button>
      {open ? (
        <ul className={styles.loopProfileMenu} role="listbox" aria-label="选择学习闭环">
          {listLoopProfiles().map((candidate) => {
            const isActive = candidate.id === profileId;
            return (
              <li key={candidate.id} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={isActive ? styles.loopProfileOptionActive : styles.loopProfileOption}
                  onClick={() => {
                    setOpen(false);
                    if (!isActive) {
                      onChange(candidate.id as LoopProfileId);
                    }
                  }}
                >
                  <span className={styles.loopProfileOptionName}>{candidate.name}</span>
                  <span className={styles.loopProfileOptionStages}>
                    {candidate.stages.map((stage) => LOOP_STAGE_DISPLAY[stage].name).join(" → ")}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
      {error ? <p className={styles.loopProfileError}>{error}</p> : null}
    </div>
  );
}

/** 脊柱节点状态：done 已完成 / current 当前 / todo 未开始 / unavailable 尚未接入。 */
export type ClewStageSpineState = "done" | "current" | "todo" | "unavailable";

export type ClewStageSpineItem = {
  stage: LoopStage;
  state: ClewStageSpineState;
  /** 点击行为（unavailable 节点不提供）。 */
  onSelect?: () => void;
  /** 悬浮提示：unavailable 节点说明真实原因；其余用环节说明。 */
  hint?: string;
};

type ClewStageSpineProps = {
  items: readonly ClewStageSpineItem[];
};

export function ClewStageSpine({ items }: ClewStageSpineProps) {
  return (
    <nav className={styles.stageSpine} aria-label="学习闭环环节">
      <ol className={styles.stageSpineList}>
        {items.map((item, index) => {
          const Icon = STAGE_ICONS[item.stage];
          const display = LOOP_STAGE_DISPLAY[item.stage];
          const unavailable = item.state === "unavailable";
          return (
            <li key={item.stage} className={styles.stageSpineItem} data-state={item.state}>
              <button
                type="button"
                className={styles.stageSpineButton}
                aria-current={item.state === "current" ? "step" : undefined}
                aria-disabled={unavailable ? true : undefined}
                title={item.hint ?? display.hint}
                onClick={unavailable ? undefined : item.onSelect}
              >
                <span className={styles.stageSpineMarker} aria-hidden="true">
                  {item.state === "done" ? (
                    <CircleCheck size={13} strokeWidth={1.7} />
                  ) : (
                    <Icon size={13} strokeWidth={1.6} />
                  )}
                </span>
                <span className={styles.stageSpineText}>
                  <span className={styles.stageSpineIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.stageSpineName}>{display.name}</span>
                  {unavailable ? <span className={styles.stageSpineTag}>未接入</span> : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
