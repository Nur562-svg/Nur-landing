import pymupdf, re, json

SRC = "src/source_pdfs: /15.生物化学与分子生物学学习指导与习题集-全书签.pdf"
doc = pymupdf.open(SRC)

pages = []
for i in range(doc.page_count):
    t = doc[i].get_text()
    pages.append(t)

with open("scripts/biochem-text.txt", "w", encoding="utf-8") as f:
    for i, t in enumerate(pages):
        f.write(f"===== PDF_PAGE_{i+1:03d} =====\n{t}\n")

# chapter start pages (1-based pdf page), name
chapters = [
 (13,"ch1-蛋白质-结构与功能"),(31,"ch2-核酸-结构与功能"),(43,"ch3-酶与酶促反应"),
 (59,"ch4-聚糖-结构与功能"),(71,"ch5-糖代谢"),(93,"ch6-生物氧化"),(109,"ch7-脂质代谢"),
 (132,"ch8-氨基酸代谢"),(163,"ch9-核苷酸代谢"),(171,"ch10-代谢整合和调节"),
 (191,"ch11-真核基因与基因组"),(196,"ch12-DNA合成"),(209,"ch13-DNA损伤修复"),
 (216,"ch14-RNA合成"),(230,"ch15-蛋白质合成"),(247,"ch16-基因表达调控"),
 (275,"ch17-细胞信号转导"),(289,"ch18-血液生物化学"),(295,"ch19-肝生物化学"),
 (303,"ch20-维生素"),(310,"ch21-钙磷微量元素"),(315,"ch22-癌基因与抑癌基因"),
 (323,"ch23-重组DNA技术"),(335,"ch24-常用分子生物学技术"),(349,"ch25-基因结构功能"),
 (363,"ch26-基因诊断与基因治疗"),(375,"ch27-组学与系统生物医学"),
]
ends = chapters[1:] + [(387,"end")]
data = {}
total_chars = 0
for (start,name),(end,_) in zip(chapters, ends):
    seg = "".join(pages[start-1:end-1])
    # 习题区: 从 习题 标题起；保留全章字符作为等比代理
    chars = len(re.sub(r"\s","",seg))
    data[name] = {"start":start,"end":end-1,"chars":chars}
    total_chars += chars

print("total chars:", total_chars)
TARGET=600
rounded=0
alloc={}
for name,d in data.items():
    if d["chars"]>=total_chars: alloc[name]=TARGET; break
    q=TARGET*d["chars"]/total_chars
    alloc[name]=q
# integer allocation (largest remainder to sum 600)
base={k:int(v) for k,v in alloc.items()}
rem={k:v-int(v) for k,v in alloc.items()}
left=TARGET-sum(base.values())
for k in sorted(rem,key=lambda k:rem[k],reverse=True)[:left]:
    base[k]+=1

with open("scripts/biochem-meta.json","w",encoding="utf-8") as f:
    json.dump({"summary":data,"budget":{k:base[k] for k in data}},f,ensure_ascii=False,indent=1)
print("sum budget:",sum(base.values()))
for k in data:
    print(f"{k:<30} pages {data[k]['start']}-{data[k]['end']} chars {data[k]['chars']} budget {base[k]}")