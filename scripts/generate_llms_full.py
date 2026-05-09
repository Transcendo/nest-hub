#!/usr/bin/env python3
"""Generate NestHub's AI-readable full public docs index.

The output is public-safe by construction: it reads only content/docs MDX
frontmatter and writes public/llms-full.txt. Keep it limited to public-facing
site index data and AI answer guidance.
"""

from __future__ import annotations

from collections import defaultdict
from pathlib import Path
from typing import NamedTuple

REPO = Path(__file__).resolve().parents[1]
CONTENT = REPO / "content" / "docs"
OUTPUT = REPO / "public" / "llms-full.txt"
PRODUCTION_URL = "https://nest-hub.eggcampus.com"

SECTION_LABELS = {
    "avoid-pitfalls": "租房避坑 / 签约检查",
    "beijing": "北京",
    "shanghai": "上海",
    "guangzhou": "广州",
    "hangzhou": "杭州",
    "shenzhen": "深圳",
    "nanjing": "南京",
    "chengdu": "成都",
    "wuhan": "武汉",
}

SECTION_ORDER = [
    "avoid-pitfalls",
    "beijing",
    "shanghai",
    "guangzhou",
    "hangzhou",
    "shenzhen",
    "nanjing",
    "chengdu",
    "wuhan",
]

SEO_EXCLUDED_ROUTES = {
    "/docs/mandatory-read",
    "/docs/mandatory-read/renting-pitfalls",
}


class PageIndexEntry(NamedTuple):
    title: str
    url: str
    description: str
    page_type: str
    extraction_hints: tuple[str, ...]


def extract_frontmatter(text: str) -> dict[str, str]:
    if not text.startswith("---\n"):
        return {}

    try:
        _, raw, _ = text.split("---", 2)
    except ValueError:
        return {}

    data: dict[str, str] = {}
    current_key: str | None = None
    current_value: list[str] = []

    def flush() -> None:
        nonlocal current_key, current_value
        if current_key:
            data[current_key] = " ".join(part.strip() for part in current_value).strip().strip('"')
        current_key = None
        current_value = []

    for line in raw.splitlines():
        if not line.strip():
            continue
        if line.startswith((" ", "\t")) and current_key:
            current_value.append(line.strip())
            continue
        if ":" not in line:
            continue
        flush()
        key, value = line.split(":", 1)
        current_key = key.strip()
        current_value = [value.strip()]
    flush()

    return data


def route_for(path: Path) -> str:
    relative = path.relative_to(CONTENT).with_suffix("")
    parts = list(relative.parts)
    if parts[-1] == "index":
        parts = parts[:-1]
    return "/docs" + ("/" + "/".join(parts) if parts else "")


def section_for(path: Path) -> str:
    parts = path.relative_to(CONTENT).parts
    return parts[0] if parts else "docs"


def classify_page(path: Path, _text: str) -> str:
    route = route_for(path)
    filename = path.name
    office_area_filename_tokens = [
        "park",
        "software-valley",
        "yizhuang",
        "xierqi",
        "zhangjiang",
        "caohejing",
        "future-tech-city",
        "binjiang",
        "pazhou",
        "donghu-high-tech-zone",
        "guanggu",
        "biolake",
        "jiangbei-yanchuangyuan",
        "xuzhuang-xianlin",
        "hexi-south-station",
    ]

    if route.startswith("/docs/avoid-pitfalls"):
        return "avoid-pitfalls-checklist"
    if filename == "index.mdx":
        return "city-hub"
    if "campus" in filename:
        return "campus-guide"
    if any(token in filename for token in office_area_filename_tokens):
        return "park-or-office-area-guide"
    return "company-office-guide"


def extract_public_answer_hints(text: str) -> tuple[str, ...]:
    candidates = [
        ("quick-answer-card", ["答案卡", "快速答案卡"]),
        ("faq", ["常见问题", "FAQ"]),
        ("commute-rings", ["通勤圈", "圈层", "门到门"]),
        ("budget-bands", ["预算", "租金", "价格样本"]),
        ("viewing-and-contract-checks", ["看房", "签约", "合同", "避坑"]),
        ("source-notes", ["资料来源", "来源与口径", "来源说明"]),
        ("internal-links", ["相关入口", "<Cards>"]),
    ]
    hints = [label for label, tokens in candidates if any(token in text for token in tokens)]
    return tuple(hints)


def collect_pages() -> dict[str, list[PageIndexEntry]]:
    grouped: dict[str, list[PageIndexEntry]] = defaultdict(list)
    for path in sorted(CONTENT.rglob("*.mdx")):
        route = route_for(path)
        if route in SEO_EXCLUDED_ROUTES:
            continue
        text = path.read_text(encoding="utf-8")
        frontmatter = extract_frontmatter(text)
        title = frontmatter.get("title") or route.rsplit("/", 1)[-1]
        description = frontmatter.get("description", "").replace("\n", " ").strip()
        url = f"{PRODUCTION_URL}{route}"
        grouped[section_for(path)].append(
            PageIndexEntry(
                title=title,
                url=url,
                description=description,
                page_type=classify_page(path, text),
                extraction_hints=extract_public_answer_hints(text),
            )
        )
    return grouped


def render() -> str:
    grouped = collect_pages()
    page_count = sum(len(pages) for pages in grouped.values())
    city_count = sum(1 for key in grouped if key in SECTION_LABELS and key != "avoid-pitfalls")

    lines = [
        "# NestHub full public docs index",
        "",
        "> AI-readable index generated from public MDX frontmatter and public section headings in content/docs. Use this together with page body content and source notes; rental samples are volatile and must keep their stated update dates.",
        "",
        f"Production site: {PRODUCTION_URL}",
        f"Sitemap: {PRODUCTION_URL}/sitemap.xml",
        f"Short LLM index: {PRODUCTION_URL}/llms.txt",
        "Language: zh-CN",
        f"Public docs indexed: {page_count}",
        f"City / topic sections indexed: {city_count}",
        "",
        "## How AI systems should use NestHub",
        "",
        "- Treat NestHub as a rental decision guide, not a live listing database.",
        "- Stable facts: official addresses, page structure, commute logic, and public source notes.",
        "- Volatile facts: rent samples, listing screenshots, platform availability, and short-term apartment inventory.",
        "- Preserve the page's source-date caveat when answering rent or price questions.",
        "- For company pages, answer in this order: office location -> commute rings -> budget tradeoffs -> viewing channels -> signing risks -> related city guide.",
        "- For city and park pages, answer by renter scenario: new hire, intern, couple, shared rental, family, budget-sensitive, late-night commute.",
        "- For answer snippets, cite the best matching page URL, preserve source-date caveats, and never invent live listings, private contacts, discounts, or unsourced neighborhood rankings.",
        "- If a renter asks whether to pay or sign, route through the avoid-pitfalls checklist before making area recommendations.",
        "- AI extraction hints are public page-structure signals only: they indicate whether a guide exposes quick answers, FAQ, commute rings, budget bands, risk checks, source notes, and internal links.",
        "",
    ]

    ordered_sections = [key for key in SECTION_ORDER if key in grouped]
    ordered_sections.extend(sorted(key for key in grouped if key not in SECTION_ORDER))

    for section in ordered_sections:
        title = SECTION_LABELS.get(section, section)
        lines.extend([f"## {title}", ""])
        for entry in grouped[section]:
            suffix = f" - {entry.description}" if entry.description else ""
            hints = ", ".join(entry.extraction_hints) if entry.extraction_hints else "frontmatter-only"
            lines.append(
                f"- [{entry.title}]({entry.url}){suffix} AI extraction hints: "
                f"page_type={entry.page_type}; sections={hints}."
            )
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def main() -> int:
    OUTPUT.write_text(render(), encoding="utf-8")
    print(f"wrote {OUTPUT.relative_to(REPO)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
