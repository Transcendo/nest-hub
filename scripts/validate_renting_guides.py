#!/usr/bin/env python3
"""Lightweight static QA for NestHub renting-guide content.

This intentionally avoids dev servers, browsers, and full builds. It checks the
content/navigation invariants that most often break public Fumadocs pages.
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

REPO = Path(__file__).resolve().parents[1]
CONTENT = REPO / "content" / "docs"
SCAN_LINK_DIRS = ["content/docs", "components", "app", "lib"]
PLACEHOLDERS = ["TODO", "待补充", "待拆分", "后续补充", "暂未形成独立", "还未开独立"]
MIN_GUIDE_BYTES = 7_500
MIN_SOURCE_LINKS = 2


@dataclass
class Finding:
    level: str
    path: str
    message: str


def rel(path: Path) -> str:
    return str(path.relative_to(REPO))


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def mdx_target_exists(route: str) -> bool:
    """Return whether a /docs/... href maps to an MDX page or index."""
    route = route.split("#", 1)[0].split("?", 1)[0].rstrip("/")
    if not route.startswith("/docs"):
        return True
    suffix = route.removeprefix("/docs").strip("/")
    if not suffix:
        return True
    direct = CONTENT / f"{suffix}.mdx"
    index = CONTENT / suffix / "index.mdx"
    return direct.exists() or index.exists()


def iter_text_files(paths: Iterable[str]) -> Iterable[Path]:
    for root in paths:
        base = REPO / root
        if not base.exists():
            continue
        for pattern in ("*.mdx", "*.tsx", "*.ts"):
            yield from base.rglob(pattern)


def check_meta(findings: list[Finding]) -> None:
    for meta in sorted(CONTENT.rglob("meta.json")):
        try:
            data = json.loads(read_text(meta))
        except Exception as exc:  # pragma: no cover - diagnostic path
            findings.append(Finding("ERROR", rel(meta), f"invalid JSON: {exc}"))
            continue

        pages = data.get("pages", [])
        if not isinstance(pages, list):
            findings.append(Finding("ERROR", rel(meta), "pages must be a list"))
            continue

        folder = meta.parent
        for page in pages:
            if not isinstance(page, str) or page.startswith("---"):
                # Fumadocs allows separators like "---Section"; skip those.
                continue
            target_file = folder / f"{page}.mdx"
            target_index = folder / page / "index.mdx"
            if not target_file.exists() and not target_index.exists():
                findings.append(
                    Finding(
                        "ERROR",
                        rel(meta),
                        f"meta page '{page}' has no matching .mdx or index.mdx",
                    )
                )

        # For city folders, every renting guide file should be listed in meta.
        if folder != CONTENT:
            listed = {p for p in pages if isinstance(p, str)}
            for guide in sorted(folder.glob("*-renting-guide.mdx")):
                slug = guide.stem
                if slug not in listed:
                    findings.append(Finding("ERROR", rel(guide), "renting guide is missing from city meta.json"))


def check_guide(path: Path, findings: list[Finding]) -> None:
    text = read_text(path)
    where = rel(path)

    if not re.match(r"^---\n[\s\S]+?\n---\n", text):
        findings.append(Finding("ERROR", where, "missing or invalid frontmatter block"))
    else:
        fm = text.split("---", 2)[1]
        if "title:" not in fm:
            findings.append(Finding("ERROR", where, "frontmatter missing title"))
        if "description:" not in fm:
            findings.append(Finding("ERROR", where, "frontmatter missing description"))

    if not re.search(r"^# .+租房指南", text, flags=re.MULTILINE):
        findings.append(Finding("ERROR", where, "missing H1 renting-guide title"))
    if text.count("<Callout") < 1:
        findings.append(Finding("ERROR", where, "missing Callout conclusion/risk block"))
    if "## 相关入口" not in text or "<Cards>" not in text or text.count("<Card ") < 2:
        findings.append(Finding("ERROR", where, "missing related-entry Cards block"))
    if "## 资料来源与口径" not in text:
        findings.append(Finding("ERROR", where, "missing '资料来源与口径' section"))
    if not re.search(r"最后更新：\d{4}-\d{2}-\d{2}", text):
        findings.append(Finding("ERROR", where, "missing normalized update date"))
    if path.stat().st_size < MIN_GUIDE_BYTES:
        findings.append(Finding("ERROR", where, f"below minimum guide size: {path.stat().st_size} bytes"))
    if text.count("http") < MIN_SOURCE_LINKS:
        findings.append(Finding("ERROR", where, f"fewer than {MIN_SOURCE_LINKS} source links"))

    for token in PLACEHOLDERS:
        if token in text:
            findings.append(Finding("ERROR", where, f"placeholder token remains: {token}"))

    # Keep component syntax checks cheap but useful.
    for tag in ("Callout", "Cards", "Tabs", "Tab"):
        opens = len(re.findall(rf"<{tag}(?:\s|>)", text))
        closes = text.count(f"</{tag}>")
        if tag in {"Callout", "Cards", "Tabs"} and opens != closes:
            findings.append(Finding("ERROR", where, f"unbalanced <{tag}> blocks: {opens} open / {closes} close"))


def check_links(findings: list[Finding]) -> None:
    href_re = re.compile(r"href=[\"'](/docs/[^\"'#?]+(?:#[^\"']*)?)[\"']")
    markdown_re = re.compile(r"\[[^\]]+\]\((/docs/[^)#?]+(?:#[^)]+)?)\)")
    for path in sorted(iter_text_files(SCAN_LINK_DIRS)):
        text = read_text(path)
        for route in href_re.findall(text) + markdown_re.findall(text):
            if not mdx_target_exists(route):
                findings.append(Finding("ERROR", rel(path), f"broken internal docs link: {route}"))


def get_nanjing_guide_slugs() -> list[str]:
    city = "nanjing"
    city_dir = CONTENT / city
    meta = city_dir / "meta.json"
    if not meta.exists():
        return []
    pages = json.loads(read_text(meta)).get("pages", [])
    return [
        page
        for page in pages
        if isinstance(page, str)
        and page != "index"
        and (city_dir / f"{page}.mdx").exists()
        and page.endswith("-renting-guide")
    ]


def check_nanjing_exposure(findings: list[Finding]) -> None:
    """Nanjing cron guard: every shipped guide must be visible from index and overview.

    This is intentionally scoped to Nanjing so older city corpora with different
    index patterns do not block the current scheduled content-debt run.
    """
    city = "nanjing"
    city_dir = CONTENT / city
    meta = city_dir / "meta.json"
    index = city_dir / "index.mdx"
    overview = REPO / "components" / "docs" / "nanjing-overview.tsx"

    required = [meta, index, overview]
    if not all(path.exists() for path in required):
        for path in required:
            if not path.exists():
                findings.append(Finding("ERROR", rel(path), "required Nanjing exposure file is missing"))
        return

    guide_slugs = get_nanjing_guide_slugs()
    index_text = read_text(index)
    overview_text = read_text(overview)

    for slug in guide_slugs:
        route = f"/docs/{city}/{slug}"
        if route not in index_text:
            findings.append(Finding("ERROR", rel(index), f"Nanjing guide missing from city index Cards/copy: {route}"))
        if route not in overview_text:
            findings.append(Finding("ERROR", rel(overview), f"Nanjing guide missing from overview exposure: {route}"))

    hrefs = re.findall(r"/docs/nanjing/[a-z0-9-]+-renting-guide", index_text + "\n" + overview_text)
    missing_files = sorted({href.removeprefix("/docs/nanjing/") for href in hrefs if not (city_dir / f"{href.removeprefix('/docs/nanjing/')}.mdx").exists()})
    for slug in missing_files:
        findings.append(Finding("ERROR", f"content/docs/{city}/{slug}.mdx", "Nanjing exposure points to a missing guide file"))


def check_nanjing_company_directory(findings: list[Finding]) -> None:
    """Assert Nanjing company pages are also exposed through shared aggregators.

    The city index and overview can link every page while homepage/sidebar company
    surfaces still miss newly shipped company guides. Area/offer pages are
    intentionally excluded from the company directory.
    """
    city = "nanjing"
    company_guides = REPO / "lib" / "company-guides.ts"
    sidebar = REPO / "components" / "sidebar-content.tsx"
    homepage = REPO / "app" / "page.tsx"

    excluded_non_company_slugs = {
        "bigtech-offer-renting-guide",
        "jiangbei-yanchuangyuan-renting-guide",
        "hexi-south-station-renting-guide",
        "xuzhuang-xianlin-renting-guide",
    }
    expected_company_hrefs = {
        f"/docs/{city}/{slug}"
        for slug in get_nanjing_guide_slugs()
        if slug not in excluded_non_company_slugs
    }
    if not expected_company_hrefs:
        return

    required = [company_guides, sidebar, homepage]
    for path in required:
        if not path.exists():
            findings.append(Finding("ERROR", rel(path), "required Nanjing directory exposure file is missing"))
    if not all(path.exists() for path in required):
        return

    company_text = read_text(company_guides)
    sidebar_text = read_text(sidebar)
    homepage_text = read_text(homepage)
    company_dir_hrefs = set(
        re.findall(
            r"\{[^{}]*href: [\"'](/docs/nanjing/[a-z0-9-]+-renting-guide)[\"'][^{}]*city: [\"']nanjing[\"'][^{}]*\}",
            company_text,
        )
    )

    missing_from_company_dir = sorted(expected_company_hrefs - company_dir_hrefs)
    extra_company_dir = sorted(company_dir_hrefs - expected_company_hrefs)
    for href in missing_from_company_dir:
        findings.append(Finding("ERROR", rel(company_guides), f"Nanjing company guide missing from shared company directory: {href}"))
    for href in extra_company_dir:
        findings.append(Finding("ERROR", rel(company_guides), f"Nanjing company directory points to missing or non-company guide: {href}"))

    if 'city: "nanjing"' not in sidebar_text or 'cityLabel: "南京"' not in sidebar_text:
        findings.append(Finding("ERROR", rel(sidebar), "sidebar does not derive Nanjing company guide items from shared company directory"))
    if "cityCompanyGuideCounts.nanjing" not in homepage_text:
        findings.append(Finding("ERROR", rel(homepage), "homepage city card does not use shared Nanjing company guide count"))


def main() -> int:
    findings: list[Finding] = []

    guides = sorted(CONTENT.glob("*/*-renting-guide.mdx"))
    if not guides:
        findings.append(Finding("ERROR", rel(CONTENT), "no renting guides found"))

    check_meta(findings)
    for guide in guides:
        check_guide(guide, findings)
    check_links(findings)
    check_nanjing_exposure(findings)
    check_nanjing_company_directory(findings)

    errors = [f for f in findings if f.level == "ERROR"]
    warnings = [f for f in findings if f.level == "WARN"]

    print("NestHub renting guide static QA")
    print(f"repo: {REPO}")
    print(f"guides_checked: {len(guides)}")
    print(f"errors: {len(errors)}")
    print(f"warnings: {len(warnings)}")

    if findings:
        print("\nFindings:")
        for f in findings:
            print(f"[{f.level}] {f.path}: {f.message}")
    else:
        print("all_checks_passed")

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
