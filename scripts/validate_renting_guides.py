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


def main() -> int:
    findings: list[Finding] = []

    guides = sorted(CONTENT.glob("*/*-renting-guide.mdx"))
    if not guides:
        findings.append(Finding("ERROR", rel(CONTENT), "no renting guides found"))

    check_meta(findings)
    for guide in guides:
        check_guide(guide, findings)
    check_links(findings)

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
