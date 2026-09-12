/**
 * 煤球多边形路径：8 个边界采样点 → 统一结构三次贝塞尔，
 * 便于 CSS 对 `d` 做平滑插值。角点用张力系数倒圆角。
 */

export type BlobShapeId = "circle" | "tri" | "square" | "penta" | "hex";

const C = 50;

/** 正 n 边形在指定角度上的边界半径（外接圆 R） */
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

/** 闭合三次样条（Catmull-Rom → Bezier），圆润且命令数固定 */
function closedSpline(points: Array<[number, number]>, tension = 0.42): string {
  const n = points.length;
  if (n < 3) {
    return "";
  }
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

/**
 * 默认煤球：接近正圆、仅极轻微不对称
 * （对齐最初 CSS: border-radius 58% 42% 52% 48% / 48% 55% 45% 52%）
 */
const ORGANIC_IDLE: Array<[number, number]> = [
  [50, 7],
  [72, 12],
  [88, 32],
  [88, 54],
  [72, 86],
  [50, 91],
  [26, 86],
  [12, 52],
];

/** 各形状：默认接近圆；错误多边形略缩 */
export const BLOB_PATHS: Record<BlobShapeId, string> = {
  circle: closedSpline(ORGANIC_IDLE, 0.62),
  tri: closedSpline(sampleBoundary(3, 8, 46), 0.28),
  square: closedSpline(sampleBoundary(4, 8, 44), 0.3),
  penta: closedSpline(sampleBoundary(5, 8, 44), 0.32),
  hex: closedSpline(sampleBoundary(6, 8, 44), 0.34),
};

/** 眼睛中心相对偏移（%），跟形状重心 */
export const EYE_OFFSETS: Record<BlobShapeId, { x: number; y: number }> = {
  circle: { x: 0, y: 0 },
  // 三角重心偏下
  tri: { x: 0, y: 14 },
  square: { x: 0, y: 2 },
  penta: { x: 0, y: -2 },
  hex: { x: 0, y: 0 },
};

export function shapeFromStreak(emotion: string, wrongStreak: number): BlobShapeId {
  if (wrongStreak < 1 || (emotion !== "sad" && emotion !== "angry")) {
    return "circle";
  }
  if (wrongStreak === 1) return "tri";
  if (wrongStreak === 2) return "square";
  if (wrongStreak === 3) return "penta";
  return "hex";
}
