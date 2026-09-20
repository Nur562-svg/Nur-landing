/**
 * 墨点路径：一律 8 点闭合三次样条，命令数相同，CSS `d` 才能插值。
 * idle 六态对齐海报 ID/LS/TH/SC/WT/BL；错题为倒圆角 n 边。
 */

import type { BotEmotion } from "@/lib/bot-emotion";

export type BlobShapeId =
  | "id"
  | "ls"
  | "th"
  | "sc"
  | "wt"
  | "bl"
  | "tri"
  | "square"
  | "penta"
  | "hex";

const C = 50;

function nGonRadius(sides: number, angle: number, circumR: number): number {
  const apothem = circumR * Math.cos(Math.PI / sides);
  const sector = (Math.PI * 2) / sides;
  const a = angle + Math.PI / 2;
  const local = (((a % sector) + sector) % sector) - sector / 2;
  return apothem / Math.cos(local);
}

function sampleBoundary(sides: number, count: number, circumR: number): Array<[number, number]> {
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (i / count) * Math.PI * 2;
    const r = nGonRadius(sides, angle, circumR);
    pts.push([C + r * Math.cos(angle), C + r * Math.sin(angle)]);
  }
  return pts;
}

function closedSpline(points: Array<[number, number]>, tension: number): string {
  const n = points.length;
  const get = (i: number): [number, number] => points[((i % n) + n) % n];
  let d = `M ${get(0)[0].toFixed(2)} ${get(0)[1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    const c1x = p1[0] + ((p2[0] - p0[0]) * tension) / 6;
    const c1y = p1[1] + ((p2[1] - p0[1]) * tension) / 6;
    const c2x = p2[0] - ((p3[0] - p1[0]) * tension) / 6;
    const c2y = p2[1] - ((p3[1] - p1[1]) * tension) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return `${d} Z`;
}

const ORGANIC = 0.58;
const FACET = 0.46;

export const BLOB_PATHS: Record<BlobShapeId, string> = {
  id: closedSpline(
    [[50, 10], [76, 18], [90, 42], [86, 70], [60, 90], [32, 88], [12, 62], [16, 30]],
    ORGANIC,
  ),
  ls: closedSpline(
    [[40, 10], [70, 14], [90, 38], [88, 68], [58, 90], [26, 86], [8, 54], [12, 26]],
    ORGANIC,
  ),
  th: closedSpline(
    [[50, 4], [74, 14], [88, 40], [84, 72], [58, 96], [36, 96], [14, 68], [16, 22]],
    ORGANIC,
  ),
  sc: closedSpline(
    [[50, 24], [82, 30], [96, 50], [88, 70], [58, 82], [28, 82], [6, 60], [12, 38]],
    ORGANIC,
  ),
  wt: closedSpline(
    [[50, 6], [68, 22], [88, 48], [84, 74], [58, 92], [36, 92], [14, 70], [24, 28]],
    ORGANIC,
  ),
  bl: closedSpline(
    [[50, 30], [84, 34], [96, 52], [86, 70], [56, 80], [28, 80], [6, 56], [14, 38]],
    ORGANIC,
  ),
  tri: closedSpline(sampleBoundary(3, 8, 46), FACET),
  square: closedSpline(sampleBoundary(4, 8, 44), FACET),
  penta: closedSpline(sampleBoundary(5, 8, 44), FACET),
  hex: closedSpline(sampleBoundary(6, 8, 44), FACET),
};

export const EYE_OFFSETS: Record<BlobShapeId, { x: number; y: number }> = {
  id: { x: 0, y: -6 },
  ls: { x: -6, y: -8 },
  th: { x: 0, y: -10 },
  sc: { x: 0, y: 4 },
  wt: { x: 0, y: 2 },
  bl: { x: 0, y: 8 },
  tri: { x: 0, y: 12 },
  square: { x: 0, y: 0 },
  penta: { x: 0, y: -2 },
  hex: { x: 0, y: 0 },
};

export function shapeFromStreak(
  emotion: BotEmotion | string,
  wrongStreak: number,
  lookX = 0,
): BlobShapeId {
  if (wrongStreak >= 1 && (emotion === "sad" || emotion === "angry")) {
    if (wrongStreak === 1) return "tri";
    if (wrongStreak === 2) return "square";
    if (wrongStreak === 3) return "penta";
    return "hex";
  }
  if (emotion === "thinking") return "th";
  if (emotion === "sleepy") return "bl";
  if (emotion === "sad") return "sc";
  if (emotion === "angry") return "wt";
  if ((emotion === "idle" || emotion === "encourage") && Math.abs(lookX) > 0.35) {
    return "ls";
  }
  return "id";
}
