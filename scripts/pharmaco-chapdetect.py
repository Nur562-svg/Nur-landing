import re

content = open("scripts/pharmacology-ocr.txt", encoding="utf-8").read()
pages = {}
for m in re.finditer(r"===== PDF_PAGE_(\d{3}) =====", content):
    pages[int(m.group(1))] = m.start()

# 中文数字映射
cn = {"一":1,"二":2,"三":3,"四":4,"五":5,"六":6,"七":7,"八":8,"九":9,"十":10}
def parse_cn(s):
    if not s: return None
    s = s.strip()
    if s == "十": return 10
    if "十" in s:
        a,b = s.split("十")
        return (cn.get(a,0) if a else 1)*10 + cn.get(b,0)
    return cn.get(s)

# 在每页文本开头找 "第X章"
page_first_lines = {}
for pno, start in pages.items():
    end = pages.get(pno+1, len(content))
    block = content[start:end]
    # 取页首 400 字符
    head = block[:400]
    m = re.search(r"第([一二三四五六七八九十]+)章", head)
    if m:
        page_first_lines[pno] = f"第{m.group(1)}章"

for pno in sorted(page_first_lines):
    print(pno, page_first_lines[pno])
