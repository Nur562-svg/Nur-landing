import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ZCODE-M2 Phase 3：Loop Profile 规则引擎、切换校验与显示信息

describe("LoopProfile", async () => {
  const {
    suggestLoopProfile,
    canSwitchProfile,
    getLoopProfileDisplay,
    coerceLoopProfileId,
    listLoopProfiles,
    LOOP_STAGE_DISPLAY,
  } = await import("@/lib/loop-profile");
  const { LOOP_PROFILES, isLoopProfileId } = await import("@/types/loop-profile");

  const baseContent = {
    type: "clew-kp" as const,
    title: "知识点",
    description: "描述",
    hasLesson: true,
    hasPractice: false,
    hasCase: false,
    questionKinds: [] as string[],
    estimatedDurationMinutes: 15,
  };

  it("题库章节固定建议 exam-cram", () => {
    const profile = suggestLoopProfile({ ...baseContent, type: "qb-chapter" });
    assert.strictEqual(profile, "exam-cram");
  });

  it("没有讲义材料的内容以练带学（exam-cram）", () => {
    const profile = suggestLoopProfile({ ...baseContent, hasLesson: false });
    assert.strictEqual(profile, "exam-cram");
  });

  it("含病例的内容走完整闭环（full-loop）", () => {
    const profile = suggestLoopProfile({ ...baseContent, hasCase: true });
    assert.strictEqual(profile, "full-loop");
  });

  it("有练习且题型含 case 走技能应用（skill-application）", () => {
    const profile = suggestLoopProfile({
      ...baseContent,
      hasPractice: true,
      questionKinds: ["case"],
    });
    assert.strictEqual(profile, "skill-application");
  });

  it("短内容（≤10 分钟）走概念理解（concept-mastery）", () => {
    const profile = suggestLoopProfile({ ...baseContent, estimatedDurationMinutes: 5 });
    assert.strictEqual(profile, "concept-mastery");
  });

  it("纯术语/填空题型走长期积累（long-term-retention）", () => {
    const profile = suggestLoopProfile({
      ...baseContent,
      estimatedDurationMinutes: 30,
      questionKinds: ["term", "fill"],
    });
    assert.strictEqual(profile, "long-term-retention");
  });

  it("其余内容默认技能应用（skill-application）", () => {
    const profile = suggestLoopProfile(baseContent);
    assert.strictEqual(profile, "skill-application");
  });

  it("六种预定义 profile 的 stages 均为合法环节有序子集且含入口环节", () => {
    const validStages = new Set(["learn", "practice", "assess", "diagnose", "review", "transfer"]);
    for (const profile of Object.values(LOOP_PROFILES)) {
      assert.ok(profile.stages.length > 0, `${profile.id} stages 非空`);
      for (const stage of profile.stages) {
        assert.ok(validStages.has(stage), `${profile.id} 含非法环节 ${stage}`);
      }
      assert.ok(
        (profile.stages as readonly string[]).includes(profile.entryStage),
        `${profile.id} entryStage 在 stages 内`,
      );
      if (profile.exitBehavior.kind === "loop-back") {
        assert.ok(
          (profile.stages as readonly string[]).includes(profile.exitBehavior.targetStage),
          `${profile.id} loop-back 目标在 stages 内`,
        );
      }
    }
  });

  it("exploration 不进 FSRS 与错题中心（fsrsEnabled=false 契约）", () => {
    assert.equal(LOOP_PROFILES.exploration.fsrsEnabled, false);
    assert.equal(LOOP_PROFILES.exploration.wrongQuestionEnabled, false);
    assert.equal(LOOP_PROFILES["full-loop"].fsrsEnabled, true);
  });

  it("getLoopProfileDisplay 返回名称与环节名列表", () => {
    const display = getLoopProfileDisplay("concept-mastery");
    assert.strictEqual(display.name, "概念理解");
    assert.deepEqual(display.stageNames, ["学", "评", "复"]);
  });

  it("listLoopProfiles 覆盖六种且顺序稳定", () => {
    const ids = listLoopProfiles().map((profile) => profile.id);
    assert.deepEqual(ids, [
      "concept-mastery",
      "skill-application",
      "exam-cram",
      "long-term-retention",
      "exploration",
      "full-loop",
    ]);
  });

  it("canSwitchProfile：无会话或无孤立进度时允许切换", () => {
    assert.deepEqual(canSwitchProfile("concept-mastery", "full-loop"), { allowed: true });
    assert.deepEqual(
      canSwitchProfile("concept-mastery", "full-loop", {
        id: "s1",
        userId: "u1",
        contentType: "clew-kp",
        contentId: "kp1",
        profileId: "concept-mastery",
        currentStageIndex: 0,
        stageStates: { learn: { status: "completed", completedAt: "2026-10-01T00:00:00.000Z" } },
        startedAt: "2026-10-01T00:00:00.000Z",
        completedAt: null,
      }),
      { allowed: true },
    );
  });

  it("canSwitchProfile：进行中会话在新 profile 缺失已激活环节时拒绝并说明", () => {
    const verdict = canSwitchProfile("full-loop", "concept-mastery", {
      id: "s1",
      userId: "u1",
      contentType: "clew-kp",
      contentId: "kp1",
      profileId: "full-loop",
      currentStageIndex: 1,
      stageStates: {
        practice: { status: "active", enteredAt: "2026-10-01T00:00:00.000Z" },
        learn: { status: "completed", completedAt: "2026-10-01T00:00:00.000Z" },
      },
      startedAt: "2026-10-01T00:00:00.000Z",
      completedAt: null,
    });
    assert.equal(verdict.allowed, false);
    assert.ok(verdict.reason?.includes("练"), `原因应提到孤立环节：${verdict.reason}`);
  });

  it("coerceLoopProfileId：非法值回退 full-loop 并标注", () => {
    assert.deepEqual(coerceLoopProfileId("exam-cram"), { profileId: "exam-cram", fallback: false });
    assert.deepEqual(coerceLoopProfileId("nonsense"), { profileId: "full-loop", fallback: true });
  });

  it("isLoopProfileId 与环节显示映射覆盖全部环节", () => {
    assert.equal(isLoopProfileId("full-loop"), true);
    assert.equal(isLoopProfileId("nope"), false);
    for (const stage of ["learn", "practice", "assess", "diagnose", "review", "transfer"] as const) {
      assert.ok(LOOP_STAGE_DISPLAY[stage].name.length > 0);
    }
  });
});
