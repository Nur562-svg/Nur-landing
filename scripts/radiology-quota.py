#!/usr/bin/env python3
"""医学影像学题库提取 — 章内题型等比取样配额计算（契约规则）。

统计每章源题量（名词解释 N / 填空 M / 选择题 C=A1+A2 / B型组成员 Q / 简答 S），
按 Hamilton 最大余数法分配各类型目标配额；B1 组按源书顺序整组取（成员数最接近配额），
差额由 a1 类补足/削减，保证五类合计恰等于该章预算 B。

要点：
- 兼容 OCR 异体「參考答案」/「参考 答案」；
- 多节章（ch03/ch07/ch08）每节自带参考答案、选择题键号每节从 1 重新编号：按
  「参考答案块」逐块统计后求和；
- 无 A2 型题时 A1 区止于 B 区或简答区，避免渗漏。
"""
import json
import re

SNIPPETS = "scripts/radiology-snippets"
BUDGET = json.load(open("scripts/radiology-budget.json", encoding="utf-8"))["budget"]

CH_NAMES = {
    "ch01": "影像诊断学总论",
    "ch02": "中枢神经系统",
    "ch03": "头颈部",
    "ch04": "呼吸系统",
    "ch05": "循环系统",
    "ch06": "乳腺",
    "ch07": "消化系统与腹膜腔",
    "ch08": "泌尿生殖系统与腹膜后间隙",
    "ch09": "骨骼与肌肉系统",
    "ch10": "儿科影像诊断学",
    "ch11": "传染性疾病",
    "ch12": "介入放射学总论",
    "ch13": "血管疾病的介入治疗",
    "ch14": "非血管疾病的介入治疗",
    "ch15": "良恶性肿瘤的介入治疗",
}

CH_PAGES = {
    "ch01": (2, 21), "ch02": (22, 37), "ch03": (38, 54), "ch04": (55, 70),
    "ch05": (71, 85), "ch06": (86, 92), "ch07": (93, 119), "ch08": (120, 142),
    "ch09": (143, 160), "ch10": (161, 166), "ch11": (167, 169), "ch12": (170, 175),
    "ch13": (176, 186), "ch14": (187, 191), "ch15": (192, 200),
}

ANS_PAT = r"[参參]\s*[考老]\s*答\s*案"     # 参考答案 / 參考答案 / 参 考 答案
# 简答区止于下一节标题/学习目标；不做作者行截断——作者行模式曾误伤答案续行（如
# "对静脉（窦）的压迫程度…"），且多节章节标题「第X节」完整存在、单节章块至文件尾。


def line_start_numbers(text):
    """行首数字编号：'1.'、'1、'、'12. ' 等，返回 (最大编号, 去重计数)。"""
    nums = []
    for line in text.splitlines():
        m = re.match(r"^\s*(\d{1,3})[.、．]\s*", line)
        if m:
            nums.append(int(m.group(1)))
    uniq = sorted(set(nums))
    return (max(uniq) if uniq else 0, len(uniq))


def key_numbers(text):
    """选择题参考答案键号：'56.C57.B'、'64. A 65. D'、'20.C' 等散落键号行。
    允许字母后紧跟数字（OCR 挤压式 '27.B28.G'），仅限 A-E。"""
    nums = []
    for m in re.finditer(r"(?<!\d)(\d{1,3})\s*[.、．]\s*[A-EＡ-Ｅ]", text):
        nums.append(int(m.group(1)))
    return nums


def between_first(text, start_pat, stop_pats):
    """取 start_pat 首次出现之后、stop_pats 中任一最先出现之前的文本；缺标记返回 None。"""
    m = re.search(start_pat, text)
    if not m:
        return None
    rest = text[m.end():]
    m2 = re.search(stop_pats, rest)
    if m2:
        rest = rest[:m2.start()]
    return rest


def count_block(block):
    """对单个参考答案块计数。返回 (term, fill, a1, a2, b, short)。"""
    term_sec = between_first(block, r"（?一?）?\s*名词解释", r"（?二?）?\s*填空")
    fill_sec = between_first(block, r"（?二?）?\s*填空", r"选择题")
    a1_sec = between_first(block, r"【?A1\s*型题】?", r"【?A2\s*型题】?|【?B\s*型题】?|（?四?）?\s*简答")
    a2_sec = between_first(block, r"【?A2\s*型题】?", r"【?B\s*型题】?|（?四?）?\s*简答")
    b_sec = between_first(block, r"【?B\s*型题】?", r"（?四?）?\s*简答")
    short_sec = between_first(block, r"（?四?）?\s*简答", r"(?!)")  # 到块尾
    if short_sec is not None:
        m = re.search(
            r"\n[一二三四五六七八九十]+、学习目标"
            + r"|\n第[一二三四五六七八九十百]+节",
            short_sec,
        )
        if m:
            short_sec = short_sec[:m.start()]

    term_n = line_start_numbers(term_sec)[1] if term_sec else 0
    fill_n = line_start_numbers(fill_sec)[1] if fill_sec else 0
    a1_keys = key_numbers(a1_sec) if a1_sec else []
    a2_keys = key_numbers(a2_sec) if a2_sec else []
    b_keys = key_numbers(b_sec) if b_sec else []
    # 节内键号连续：A1 从 1 起，A2 延续 A1 末号，B 延续 A2 末号
    n_a1 = max(a1_keys) if a1_keys else 0
    n_a2 = (max(a2_keys) - n_a1) if a2_keys else 0
    n_b = (max(b_keys) - n_a1 - n_a2) if b_keys else 0
    short_n = line_start_numbers(short_sec)[1] if short_sec else 0
    return term_n, fill_n, n_a1, n_a2, n_b, short_n


def split_blocks(text):
    """按 参考答案 标记切块；每块止于下一答案标记或文件尾（不做章/节截断，防页眉误伤）。"""
    blocks = []
    pos = 0
    while True:
        m = re.search(ANS_PAT, text[pos:])
        if not m:
            break
        start = pos + m.start()
        rest = text[m.end() + pos:]
        m2 = re.search(ANS_PAT, rest)
        end = (m2.start() + m.end() + pos) if m2 else len(text)
        blocks.append(text[start:end])
        pos = m.end() + pos
    return blocks


def count_b1_groups(question_part):
    """解析 B 型题组：'（68~69 题共用备选答案）' 形标记，返回 [(start, end), ...]。
    兼容 OCR 变体：'（25~29 共用备选答案）'（无题字）、'（50~52.题共用备选答案）'（带点）。"""
    groups = []
    for m in re.finditer(r"（\s*(\d{1,3})\s*[~～-]\s*(\d{1,3})[.、．]?\s*题?\s*共用备选答案\s*）", question_part):
        groups.append((int(m.group(1)), int(m.group(2))))
    return groups


def hamilton_quota(B, counts):
    T = sum(counts.values())
    raw = {k: B * v / T for k, v in counts.items()}
    floor = {k: int(r) for k, r in raw.items()}
    rem = B - sum(floor.values())
    order = sorted(raw.keys(), key=lambda k: raw[k] - floor[k], reverse=True)
    for k in order[:rem]:
        floor[k] += 1
    return floor


# OCR 键号错位块真值修正（依据题目区题号 + 参考答案键号归位）：
# ch07 第一节 B 键 16/17 挤入简答行；ch07 第四节 A2 键 25~31 归入 B 区、B 键 32/33 挤入简答行；
# ch08 第二节 A2 键 9 归入 B 区；ch06/ch10/ch11 的 A2/B 键被 OCR 并入 B 区。
# 键值: (a1_true, a2_true, b_true)
KEY_FIXES = {
    "ch06": {1: (25, 2, 6)},
    "ch07": {1: (14, 0, 3), 4: (24, 7, 2)},
    "ch08": {2: (8, 1, 5)},
    "ch10": {1: (23, 0, 6)},
    "ch11": {1: (2, 0, 3)},
}


def main():
    result = {}
    for key, B in BUDGET.items():
        ch = re.match(r"(ch\d+)", key).group(1)
        name = CH_NAMES[ch]
        text = open(f"{SNIPPETS}/{ch}-{name}.txt", encoding="utf-8").read()

        q_part = text.split("参考答案")[0]
        if len(q_part) >= len(text):
            q_part = text.split("參考答案")[0]
        if len(q_part) >= len(text):
            q_part = re.split(ANS_PAT, text)[0]

        blocks = split_blocks(text)
        term_n = fill_n = a1_n = a2_n = b_n = short_n = 0
        for bi, blk in enumerate(blocks, 1):
            t, f, a1, a2, b, s = count_block(blk)
            fix = KEY_FIXES.get(ch, {}).get(bi)
            if fix:
                a1, a2, b = fix
            term_n += t
            fill_n += f
            a1_n += a1
            a2_n += a2
            b_n += b
            short_n += s

        C = a1_n + a2_n
        Q = b_n
        S = short_n
        counts = {"term": term_n, "fill": fill_n, "a1": C, "b1": Q, "short": S}
        T = sum(counts.values())
        quotas = hamilton_quota(B, counts)

        groups = count_b1_groups(text)
        gs = [e - s + 1 for s, e in groups]
        best_k, best_members = 0, 0
        if gs:
            best_gap = None
            for k in range(len(gs) + 1):
                members = sum(gs[:k])
                gap = abs(members - quotas["b1"])
                if best_gap is None or gap < best_gap:
                    best_gap, best_k, best_members = gap, k, members
        b1_actual, b1_groups_used = best_members, best_k

        a1_target = quotas["a1"] + (quotas["b1"] - b1_actual)
        total = quotas["term"] + quotas["fill"] + a1_target + quotas["short"] + b1_actual
        if total != B:
            a1_target += B - total
            total = B

        result[ch] = {
            "name": name,
            "pages": CH_PAGES[ch],
            "budget": B,
            "source_counts": counts,
            "T": T,
            "quotas": quotas,
            "a1_final": a1_target,
            "b1_actual": b1_actual,
            "b1_groups": b1_groups_used,
            "b1_groups_total": len(groups),
            "blocks": len(blocks),
        }

    print(f"{'ch':<6}{'章名':<14}{'B':>4}{'N':>4}{'M':>4}{'C':>4}{'Q':>4}{'S':>4}"
          f"{'t':>4}{'f':>4}{'a1':>4}{'short':>4}{'b1m':>4}{'b1g':>4}{'blk':>3}  ok")
    tot = {"B": 0, "t": 0, "f": 0, "a": 0, "s": 0, "b": 0, "g": 0}
    for ch in sorted(result.keys()):
        r = result[ch]
        ok = r["budget"] == r["quotas"]["term"] + r["quotas"]["fill"] + r["a1_final"] + r["quotas"]["short"] + r["b1_actual"]
        tot["B"] += r["budget"]; tot["t"] += r["quotas"]["term"]; tot["f"] += r["quotas"]["fill"]
        tot["a"] += r["a1_final"]; tot["s"] += r["quotas"]["short"]; tot["b"] += r["b1_actual"]; tot["g"] += r["b1_groups"]
        print(f"{ch:<6}{r['name']:<14}{r['budget']:>4}{r['source_counts']['term']:>4}"
              f"{r['source_counts']['fill']:>4}{r['source_counts']['a1']:>4}{r['source_counts']['b1']:>4}"
              f"{r['source_counts']['short']:>4}{r['quotas']['term']:>4}{r['quotas']['fill']:>4}"
              f"{r['a1_final']:>4}{r['quotas']['short']:>4}{r['b1_actual']:>4}{r['b1_groups']:>4}"
              f"{r['blocks']:>3}  {'OK' if ok else 'FAIL'}")
    print(f"{'合计':<10}{'':<6}{tot['B']:>4}{'':>16}{tot['t']:>4}{tot['f']:>4}{tot['a']:>4}{tot['s']:>4}{tot['b']:>4}{tot['g']:>4}")
    json.dump(result, open("scripts/radiology-quota.json", "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
