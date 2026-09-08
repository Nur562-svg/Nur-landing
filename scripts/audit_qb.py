"""结构审计：校验 diagnostics 目录下各 extracted TS 文件的合法性。"""
import re, glob, sys, subprocess, os

os.chdir("/Users/nukeab/projects/Nur-landing")
files = sorted(glob.glob("src/content/courses/diagnostics/extracted-diagnostics-ch*.ts"))
print("审计文件:", [os.path.basename(f) for f in files])

errors = []
for f in files:
    src = open(f, encoding="utf-8").read()
    # 抽取题目对象层级：粗粒度统计 correctChoiceIndex vs choices
    ids = re.findall(r'id: "ext-[^"]+"', src)
    # 检查 id 是否重复
    from collections import Counter
    c = Counter(i.split('"')[1] for i in ids)
    dup = [k for k, v in c.items() if v > 1]
    if dup:
        errors.append(f"{os.path.basename(f)}: 重复ID {dup[:8]}")
    # 统计 choices 数组长度与 correctChoiceIndex 越界（启发式：逐对象近似）
    # 这里做量级检查
    nA = src.count("questionKind: \"a1-single\"")
    nT = src.count("questionKind: \"term\"")
    nS = src.count("questionKind: \"short-answer\"")
    nB = src.count("questionKind: \"b1\"") + src.count("questionKind: \"b2\"")
    print(f"  {os.path.basename(f):40s} a1={nA} term={nT} sa={nS} b={nB} ids={len(ids)}")

# 运行 tsc 整体检查
print("\n运行 tsc...")
r = subprocess.run(["npx", "tsc", "--noEmit", "-p", "tsconfig.json"],
                   capture_output=True, text=True)
out = r.stdout + r.stderr
diag_errors = [l for l in out.splitlines() if "diagnostics/" in l or "diagnostics" in l]
print("tsc exit:", r.returncode)
if diag_errors:
    print("诊断学相关报错:")
    for l in diag_errors[:20]:
        print(" ", l)
else:
    print("诊断学文件无 tsc 报错")

if errors:
    print("\n!! 审计发现:")
    for e in errors:
        print(" -", e)
else:
    print("\n结构审计通过（无重复ID）。")