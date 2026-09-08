#!/usr/bin/env python3
"""病理学题库提取独立审计：预算对齐、ID 唯一、order 连续、correctChoiceIndex 一致性、B1 组规约、answer 元数据。"""
import glob
import json
import re
import sys
from collections import Counter

ROOT = "src/content/courses/pathology"
BUDGET = json.load(open("scripts/patho-budget.json", encoding="utf-8"))["budget"]

# 预算键 -> 章号
CH_BUDGET = {}
for key, b in BUDGET.items():
    m = re.match(r"ch(\d+)-", key)
    CH_BUDGET[int(m.group(1))] = b


def split_top_level_objects(text):
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    text = re.sub(r"//[^\n]*", "", text)
    objs = []
    i = 0
    n = len(text)
    while i < n:
        c = text[i]
        if _is_quote(c):
            i += 1
            while i < n:
                if text[i] == "\\":
                    i += 2
                    continue
                if _is_quote(text[i]):
                    i += 1
                    break
                i += 1
            continue
        if c == "{":
            depth = 1
            j = i + 1
            while j < n and depth > 0:
                cj = text[j]
                if _is_quote(cj):
                    j += 1
                    while j < n:
                        if text[j] == "\\":
                            j += 2
                            continue
                        if _is_quote(text[j]):
                            j += 1
                            break
                        j += 1
                    continue
                if cj == "{":
                    depth += 1
                elif cj == "}":
                    depth -= 1
                j += 1
            objs.append(text[i:j])
            i = j
            continue
        i += 1
    return objs


def _is_quote(c):
    return c == '"' or c == "`"


def find_balanced(text, start, open_ch="{[", close_ch="}]"):
    depth = 0
    i = start
    n = len(text)
    while i < n:
        c = text[i]
        if _is_quote(c):
            i += 1
            while i < n:
                if text[i] == "\\":
                    i += 2
                    continue
                if _is_quote(text[i]):
                    i += 1
                    break
                i += 1
            continue
        if c in open_ch:
            depth += 1
        elif c in close_ch:
            depth -= 1
            if depth == 0:
                return i + 1, text[start:i + 1]
        i += 1
    return n, text[start:n]


def array_block(block, name):
    m = re.search(rf"\b{name}:\s*\[", block)
    if not m:
        return None
    end, raw = find_balanced(block, m.end() - 1)
    return raw


def object_block(block, name):
    m = re.search(rf"\b{name}:\s*\{{", block)
    if not m:
        return None
    end, raw = find_balanced(block, m.end() - 1)
    return raw


def extract_strings(block):
    return re.findall(r'"((?:[^"\\]|\\.)*)"', block)


def get_field(block, name):
    m = re.search(rf'\b{name}:\s*"((?:[^"\\]|\\.)*)"', block)
    if m:
        return m.group(1)
    m = re.search(rf"\b{name}:\s*(\d+)", block)
    if m:
        return int(m.group(1))
    return None


def get_answer_meta(block):
    ab = object_block(block, "answer")
    if ab is None:
        return None, None
    auth = re.search(r'\bauthority:\s*"((?:[^"\\]|\\.)*)"', ab)
    conf = re.search(r'\bconfidence:\s*"((?:[^"\\]|\\.)*)"', ab)
    return (auth.group(1) if auth else None, conf.group(1) if conf else None)


def strip_members(block):
    arr = array_block(block, "members")
    if arr is None:
        return block
    idx = block.index(arr)
    return block[:idx] + block[idx + len(arr):]


def get_choices(block):
    arr = array_block(block, "choices")
    if arr is None:
        return []
    return [s for s in extract_strings(arr)]


def get_content0(block):
    ab = object_block(block, "answer")
    if ab is None:
        return None
    arr = array_block(ab, "content")
    if arr is None:
        return None
    strs = extract_strings(arr)
    return strs[0] if strs else None


def get_members(block):
    arr = array_block(block, "members")
    if arr is None:
        return []
    return split_top_level_objects(arr)


def parse_group(block):
    gid = get_field(block, "id")
    order = get_field(block, "order")
    has_kp = re.search(r"\bknowledgePointId:", strip_members(block)) is not None
    shared = get_choices(block)
    members = get_members(block)
    mem_records = []
    for mb in members:
        auth, conf = get_answer_meta(mb)
        mem_records.append(
            {
                "id": get_field(mb, "id"),
                "order": get_field(mb, "order"),
                "has_kp": re.search(r"\bknowledgePointId:", mb) is not None,
                "choices": get_choices(mb),
                "cci": get_field(mb, "correctChoiceIndex"),
                "content0": get_content0(mb),
                "authority": auth,
                "confidence": conf,
            }
        )
    return {
        "id": gid,
        "order": order,
        "has_kp": has_kp,
        "shared_count": len(shared),
        "members": mem_records,
    }


def parse_item(block):
    kind = get_field(block, "questionKind")
    auth, conf = get_answer_meta(block)
    rec = {
        "id": get_field(block, "id"),
        "order": get_field(block, "order"),
        "kind": kind,
        "has_kp": re.search(r"\bknowledgePointId:", block) is not None,
        "authority": auth,
        "confidence": conf,
    }
    if kind == "a1-single":
        rec["choices"] = get_choices(block)
        rec["cci"] = get_field(block, "correctChoiceIndex")
        rec["content0"] = get_content0(block)
    elif kind == "b1":
        rec["group"] = parse_group(block)
    return rec


def main():
    files = sorted(
        glob.glob(f"{ROOT}/extracted-pathology-ch*.ts"),
        key=lambda p: int(re.search(r"ch(\d+)", p).group(1)),
    )
    if not files:
        print("NO FILES FOUND")
        sys.exit(1)

    global_ids = []
    errors = []
    total = 0
    total_members = 0
    total_groups = 0
    print(f"{'file':<46}{'budget':>7}{'items':>7}{'groups':>8}{'members':>9}  status")
    print("-" * 100)
    for fp in files:
        ch = int(re.search(r"ch(\d+)", fp).group(1))
        budget = CH_BUDGET.get(ch)
        txt = open(fp, encoding="utf-8").read()
        objs = split_top_level_objects(txt)
        items = []
        groups = []
        for ob in objs:
            if re.search(r"\bid:\s*\"ext-", ob) and re.search(r"\bquestionKind:", ob):
                rec = parse_item(ob)
                if rec["kind"] == "b1":
                    groups.append(rec)
                else:
                    items.append(rec)
        n_items = len(items)
        member_count = sum(len(g["group"]["members"]) for g in groups)
        orders = [it["order"] for it in items]
        for g in groups:
            orders.append(g["order"])
            orders.extend(m["order"] for m in g["group"]["members"])
        max_order = max(orders) if orders else 0
        independent = max_order
        ok = independent == budget if budget is not None else True
        if budget is None:
            errors.append(f"{fp}: 预算缺失 ch{ch}")
        if independent != budget:
            errors.append(f"{fp}: 独立记分题 {independent} != 预算 {budget}")
        distinct_orders = sorted(set(orders))
        if distinct_orders != list(range(1, max_order + 1)):
            errors.append(f"{fp}: order 不连续 1..{max_order}")
        ids = [it["id"] for it in items]
        for g in groups:
            gid = g["id"]
            ids.append(gid)
            ids.extend(m["id"] for m in g["group"]["members"])
        dup = [i for i, c in Counter(ids).items() if c > 1]
        if dup:
            errors.append(f"{fp}: 文件内重复 ID {dup[:5]}")
        global_ids.extend(ids)
        for it in items:
            if it["kind"] == "a1-single":
                if it["choices"] and it["cci"] is not None:
                    if it["cci"] >= len(it["choices"]) or it["choices"][it["cci"]] != it["content0"]:
                        errors.append(f"{fp}: a1 {it['id']} correctChoiceIndex 与答案不一致")
                if it["authority"] != "nur-platform" or it["confidence"] != "unverified":
                    errors.append(f"{fp}: a1 {it['id']} authority/confidence 不符")
                if not it["has_kp"]:
                    errors.append(f"{fp}: a1 {it['id']} 缺 knowledgePointId")
        for g in groups:
            gr = g["group"]
            if gr["has_kp"]:
                errors.append(f"{fp}: b1 组 {gr['id']} 组级不应有 knowledgePointId")
            if not gr["members"]:
                errors.append(f"{fp}: b1 组 {gr['id']} 无成员")
                continue
            first_order = gr["members"][0]["order"]
            if gr["order"] != first_order:
                errors.append(f"{fp}: b1 组 {gr['id']} 组级 order 与首成员不一致")
            morders = [m["order"] for m in gr["members"]]
            if morders != list(range(first_order, first_order + len(morders))):
                errors.append(f"{fp}: b1 组 {gr['id']} 成员 order 不连续递增")
            for m in gr["members"]:
                if not m["has_kp"]:
                    errors.append(f"{fp}: b1 成员 {m['id']} 缺 knowledgePointId")
                if m["choices"] and m["cci"] is not None:
                    if m["cci"] >= len(m["choices"]) or m["choices"][m["cci"]] != m["content0"]:
                        errors.append(f"{fp}: b1 成员 {m['id']} correctChoiceIndex 与答案不一致")
                if m["authority"] != "nur-platform" or m["confidence"] != "unverified":
                    errors.append(f"{fp}: b1 成员 {m['id']} authority/confidence 不符")
        total += independent
        total_groups += len(groups)
        total_members += member_count
        status = "OK" if ok and not any(fp in e for e in errors) else "CHECK"
        print(f"{fp.split('/')[-1]:<46}{str(budget):>7}{independent:>7}{len(groups):>8}{member_count:>9}  {status}")

    print("=" * 100)
    print(f"TOTAL independent scored items: {total} (target 600)")
    print(f"TOTAL groups: {total_groups}, members: {total_members}")
    dup_global = {i: c for i, c in Counter(global_ids).items() if c > 1}
    print(f"GLOBAL duplicate IDs: {len(dup_global)}")
    for i, c in list(dup_global.items())[:30]:
        print("   ", i, "x", c)
    if errors:
        print(f"\nERRORS ({len(errors)}):")
        for e in errors[:60]:
            print("  -", e)
        sys.exit(1)
    print("\nALL CHECKS PASSED")


if __name__ == "__main__":
    main()
