#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
tcmdx-slice.py — 把《中医诊断学选择.pdf》的 OCR 全文（scripts/tcmdx-ocr.txt）
按 12 个知识单元的题号归属，切分成章节片段 scripts/tcmdx-snippets/ch{NN}.txt。

每个片段包含：
  1. 头部信息（单元名 / 预算 B / 归属题号 / 各题型取材说明 / 源备注）
  2. 该章全部单选题的 OCR 原文块（含题目、选项、以及就近的参考答案键号行）
  3. 聚合的“参考答案键号（原文，需按中医诊断学医学语义归位）”清单

答案键号行特征：形如 `1.B 2.C 3.C 4.B …`（数字后紧跟拉丁字母），与题目行
（数字后紧跟汉字）区分。OCR 常把键号挤一行、截断、或散落（如 `5.B6.6.D`、
`27. B28.`、`20756`），本脚本如实保留原文，交由生成代理按题号+医学语义归位。
"""

import json
import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
OCR = os.path.join(BASE, "tcmdx-ocr.txt")
BUDGET = os.path.join(BASE, "tcmdx-budget.json")
OUT_DIR = os.path.join(BASE, "tcmdx-snippets")
CHAP_SLICES = os.path.join(BASE, "tcmdx-chap-slices.json")

with open(BUDGET, "r", encoding="utf-8") as f:
    budget = json.load(f)

CHAPTERS = budget["chapters"]  # ch01..ch12

PAGE = re.compile(r"^===== PDF_PAGE_\d+ =====")
BARE_NUM = re.compile(r"^\s*\d{1,2}\s*$")
NUM = re.compile(r"^\s*(\d{1,3})")
DELIMS = set("．.。，,、：:。;；")
KEY_START = re.compile(r"^\s*\d{1,3}\s*[．.。]\s*[A-Za-z]")
HAS_CJK = re.compile(r"[\u4e00-\u9fff]")

with open(OCR, "r", encoding="utf-8") as f:
    lines = f.read().splitlines()

blocks = {}  # q -> list[str]
cur = None
keys_raw = []  # 原始答案键号行


def is_question_start(stripped):
    """返回题号或 None。规则：行首数字 ≤260；数字后是分隔符（任一允许）→题干；
    数字后紧跟汉字/中文标点 → 题干（如 `173患者`）；数字后紧跟拉丁字母或其他数字
    且无分隔符 → 不是题干（如答案键号 `1.B`、乱码 `20756`）。"""
    m = NUM.match(stripped)
    if not m:
        return None
    n = int(m.group(1))
    if n > 260:
        return None
    rest = stripped[m.end():].lstrip()
    if not rest:
        return None
    first = rest[0]
    if first in DELIMS:
        return n
    if HAS_CJK.match(first) or first in "（《“【〔":
        return n
    return None


for ln in lines:
    stripped = ln.strip()
    if not stripped:
        continue
    if PAGE.match(stripped):
        continue
    if BARE_NUM.match(stripped):
        continue
    if KEY_START.match(stripped):
        keys_raw.append(stripped)
        continue
    n = is_question_start(stripped)
    if n is not None:
        cur = n
        blocks.setdefault(n, [])
        blocks[n].append(ln)
        continue
    # 续行：仅当含中文或形如选项时才并入当前块，滤除纯数字/纯标点噪音
    if cur is not None and (HAS_CJK.search(stripped) or re.match(r"^[A-Ea-e][.．、)）]", stripped)):
        blocks[cur].append(ln)

for n in range(1, 261):
    blocks.setdefault(n, [])

qs_per_chapter = {
    ch: CHAPTERS[ch]["questionNumbers"] for ch in CHAPTERS
}

os.makedirs(OUT_DIR, exist_ok=True)

chap_slices = {}
for ch in sorted(CHAPTERS.keys()):
    meta = CHAPTERS[ch]
    qs = meta["questionNumbers"]
    chap_slices[ch] = {
        "file": f"{ch}.txt",
        "budget": meta["budget"],
        "topic": meta["topic"],
        "questionNumbers": qs,
        "count": len(qs),
    }
    out = []
    out.append(f"# {ch} {meta['topic']} —— 单选片段（预算 {meta['budget']}，单选 {meta['a1']}）")
    out.append(f"# 归属题号（{len(qs)} 道）：{','.join(map(str, qs))}")
    out.append("# 来源：scripts/tcmdx-ocr.txt（《中医诊断学选择.pdf》18页扫描件，macOS Vision OCR）")
    out.append("# 备注：选择题『参考答案』为同学整理参考版，如有误差以教材为准。")
    out.append("# 键号常被 OCR 挤行/截断/散落，须按题号+中医诊断学医学语义归位。")
    out.append("# 名词解释/简答/病案须另读 scripts/tcmdx-booklets/dayN.txt（见契约章素材要点）。")
    out.append("")
    for q in qs:
        body = blocks.get(q) or []
        if not body:
            out.append(f"—— 题 {q}：OCR 未能定位到题干（须回到 tcmdx-ocr.txt 人工核对） ——")
            continue
        out.append(f"---- 题 {q} ----")
        out.extend(body)
        out.append("")
    out.append("")
    out.append("===== 本章参考答案键号（OCR原文，供归位） =====")
    out.append("# 说明：键号从0起转换交给生成代理；冲突时按医学语义归位并如实注明。")
    for k in keys_raw:
        if any(f"{q}." in k or f"{q}．" in k or f"{q}。" in k for q in qs):
            out.append(k)
    out.append("")
    with open(os.path.join(OUT_DIR, f"{ch}.txt"), "w", encoding="utf-8") as f:
        f.write("\n".join(out))

with open(CHAP_SLICES, "w", encoding="utf-8") as f:
    json.dump(chap_slices, f, ensure_ascii=False, indent=2)

# 汇总：每章题号是否都定位到 block
print("== 每章题号定位统计 ==")
for ch in sorted(CHAPTERS.keys()):
    qs = CHAPTERS[ch]["questionNumbers"]
    missing = [q for q in qs if not blocks.get(q)]
    print(f"{ch}: 题数={len(qs)} 未定位={missing if missing else 0}")
print(f"片段输出目录: {OUT_DIR}")
print(f"每章片段清单: {CHAP_SLICES}")