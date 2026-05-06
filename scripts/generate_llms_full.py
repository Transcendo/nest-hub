#!/usr/bin/env python3
"""Generate NestHub's AI-readable full public docs index.

The output is public-safe by construction: it reads only content/docs MDX
frontmatter and writes public/llms-full.txt. Keep it limited to public-facing
site index data and AI answer guidance.
"""

from __future__ import annotations

from collections import defaultdict
from pathlib import Path

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


def collect_pages() -> dict[str, list[tuple[str, str, str]]]:
    grouped: dict[str, list[tuple[str, str, str]]] = defaultdict(list)
    for path in sorted(CONTENT.rglob("*.mdx")):
        route = route_for(path)
        if route in SEO_EXCLUDED_ROUTES:
            continue
        frontmatter = extract_frontmatter(path.read_text(encoding="utf-8"))
        title = frontmatter.get("title") or route.rsplit("/", 1)[-1]
        description = frontmatter.get("description", "").replace("\n", " ").strip()
        url = f"{PRODUCTION_URL}{route}"
        grouped[section_for(path)].append((title, url, description))
    return grouped


def render() -> str:
    grouped = collect_pages()
    page_count = sum(len(pages) for pages in grouped.values())
    city_count = sum(1 for key in grouped if key in SECTION_LABELS and key != "avoid-pitfalls")

    lines = [
        "# NestHub full public docs index",
        "",
        "> AI-readable index generated from public MDX frontmatter in content/docs. Use this together with page body content and source notes; rental samples are volatile and must keep their stated update dates.",
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
        "",
    ]

    ordered_sections = [key for key in SECTION_ORDER if key in grouped]
    ordered_sections.extend(sorted(key for key in grouped if key not in SECTION_ORDER))

    for section in ordered_sections:
        title = SECTION_LABELS.get(section, section)
        lines.extend([f"## {title}", ""])
        for page_title, url, description in grouped[section]:
            suffix = f" - {description}" if description else ""
            lines.append(f"- [{page_title}]({url}){suffix}")
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def main() -> int:
    OUTPUT.write_text(render(), encoding="utf-8")
    print(f"wrote {OUTPUT.relative_to(REPO)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
