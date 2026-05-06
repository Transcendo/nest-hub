#!/usr/bin/env python3
"""Static SEO/GEO checks for NestHub public discovery assets.

The script intentionally avoids dev servers and browsers. It validates only
public-safe website assets: robots, sitemap, llms.txt, canonical/OG metadata,
and MDX link syntax that can break Fumadocs builds.
"""

from __future__ import annotations

import importlib.util
import re
import sys
from dataclasses import dataclass
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
PRODUCTION_URL = "https://nest-hub.eggcampus.com"
CONTENT = REPO / "content" / "docs"

PRIVATE_ONLY_MARKERS = [
    "keyword opportunity score",
    "SERP score",
    "competitor analysis",
    "conversion funnel",
    "Discord-only",
    "cron output",
    "执行日志",
    "竞品分析",
    "转化漏斗",
    "关键词机会",
]

SEO_EXCLUDED_ROUTES = {
    "/docs/mandatory-read",
    "/docs/mandatory-read/renting-pitfalls",
}


@dataclass
class Finding:
    level: str
    path: str
    message: str


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(REPO))
    except ValueError:
        return str(path)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")


def route_for_doc(path: Path) -> str:
    relative = path.relative_to(CONTENT).with_suffix("")
    parts = list(relative.parts)
    if parts[-1] == "index":
        parts = parts[:-1]
    return "/docs" + ("/" + "/".join(parts) if parts else "")


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


def require_file(path: Path, findings: list[Finding]) -> bool:
    if not path.exists():
        findings.append(Finding("ERROR", rel(path), "required SEO/GEO file is missing"))
        return False
    return True


def check_private_markers(path: Path, text: str, findings: list[Finding]) -> None:
    lowered = text.lower()
    for marker in PRIVATE_ONLY_MARKERS:
        if marker.lower() in lowered:
            findings.append(Finding("ERROR", rel(path), f"contains private-only planning marker: {marker}"))


def check_robots(findings: list[Finding]) -> None:
    robots = REPO / "app" / "robots.ts"
    if not require_file(robots, findings):
        return

    text = read_text(robots)
    required_tokens = ["MetadataRoute.Robots", "productionSiteUrl", "allow", "sitemap"]
    for token in required_tokens:
        if token not in text:
            findings.append(Finding("ERROR", rel(robots), f"robots.ts missing token: {token}"))
    if "/sitemap.xml" not in text:
        findings.append(Finding("ERROR", rel(robots), "robots.ts does not advertise sitemap.xml"))


def check_sitemap(findings: list[Finding]) -> None:
    sitemap = REPO / "app" / "sitemap.ts"
    if not require_file(sitemap, findings):
        return

    text = read_text(sitemap)
    for token in ["MetadataRoute.Sitemap", ".getPages()", "productionSiteUrl", "changeFrequency", "`${BASE_URL}/docs`"]:
        if token not in text:
            findings.append(Finding("ERROR", rel(sitemap), f"sitemap.ts missing token: {token}"))


def check_llms(findings: list[Finding]) -> None:
    llms = REPO / "public" / "llms.txt"
    if not require_file(llms, findings):
        return

    text = read_text(llms)
    required_links = [
        PRODUCTION_URL,
        f"{PRODUCTION_URL}/sitemap.xml",
        f"{PRODUCTION_URL}/llms-full.txt",
        f"{PRODUCTION_URL}/docs",
        f"{PRODUCTION_URL}/docs/beijing",
        f"{PRODUCTION_URL}/docs/shanghai",
        f"{PRODUCTION_URL}/docs/hangzhou",
        f"{PRODUCTION_URL}/docs/shenzhen",
        f"{PRODUCTION_URL}/docs/avoid-pitfalls/contract",
    ]
    for link in required_links:
        if link not in text:
            findings.append(Finding("ERROR", rel(llms), f"llms.txt missing important public URL: {link}"))

    if len(re.findall(r"https://nest-hub\.eggcampus\.com/docs/[^)\s]+", text)) < 12:
        findings.append(Finding("ERROR", rel(llms), "llms.txt should expose at least 12 public docs URLs"))

    check_private_markers(llms, text, findings)


def render_llms_full_from_generator(generator: Path, findings: list[Finding]) -> str | None:
    try:
        spec = importlib.util.spec_from_file_location("nesthub_generate_llms_full", generator)
        if spec is None or spec.loader is None:
            findings.append(Finding("ERROR", rel(generator), "could not load llms-full generator module"))
            return None
        module = importlib.util.module_from_spec(spec)
        previous_write_bytecode = sys.dont_write_bytecode
        sys.dont_write_bytecode = True
        try:
            spec.loader.exec_module(module)
        finally:
            sys.dont_write_bytecode = previous_write_bytecode
        render = getattr(module, "render", None)
        if not callable(render):
            findings.append(Finding("ERROR", rel(generator), "llms-full generator does not expose render()"))
            return None
        rendered = render()
    except Exception as exc:  # pragma: no cover - QA script should report exact failure text.
        findings.append(Finding("ERROR", rel(generator), f"llms-full generator failed: {exc}"))
        return None

    if not isinstance(rendered, str) or not rendered.strip():
        findings.append(Finding("ERROR", rel(generator), "llms-full generator produced empty or non-string output"))
        return None
    return rendered


def check_llms_full(findings: list[Finding]) -> None:
    llms_full = REPO / "public" / "llms-full.txt"
    generator = REPO / "scripts" / "generate_llms_full.py"
    if not require_file(llms_full, findings):
        return
    generator_exists = require_file(generator, findings)

    text = read_text(llms_full)
    if generator_exists:
        rendered = render_llms_full_from_generator(generator, findings)
        if rendered is not None and rendered != text:
            findings.append(
                Finding(
                    "ERROR",
                    rel(llms_full),
                    "llms-full.txt is stale; run python3 scripts/generate_llms_full.py and commit the regenerated public index",
                )
            )

    required_tokens = [
        "# NestHub full public docs index",
        "AI-readable index generated from public MDX frontmatter",
        f"Production site: {PRODUCTION_URL}",
        f"Sitemap: {PRODUCTION_URL}/sitemap.xml",
        f"Short LLM index: {PRODUCTION_URL}/llms.txt",
        "How AI systems should use NestHub",
        "Public docs indexed:",
    ]
    for token in required_tokens:
        if token not in text:
            findings.append(Finding("ERROR", rel(llms_full), f"llms-full.txt missing token: {token}"))

    docs_links = re.findall(r"https://nest-hub\.eggcampus\.com/docs/[^)\s]+", text)
    mdx_paths = [
        path
        for path in CONTENT.rglob("*.mdx")
        if route_for_doc(path) not in SEO_EXCLUDED_ROUTES
    ]
    mdx_count = len(mdx_paths)
    if len(docs_links) < mdx_count:
        findings.append(
            Finding(
                "ERROR",
                rel(llms_full),
                f"llms-full.txt indexes {len(docs_links)} docs URLs, fewer than {mdx_count} MDX docs",
            )
        )

    duplicate_links = sorted({link for link in docs_links if docs_links.count(link) > 1})
    if duplicate_links:
        findings.append(
            Finding(
                "ERROR",
                rel(llms_full),
                f"llms-full.txt contains duplicate docs URLs: {', '.join(duplicate_links[:5])}",
            )
        )

    expected_links = {f"{PRODUCTION_URL}{route_for_doc(path)}" for path in mdx_paths}
    indexed_links = set(docs_links)
    missing_links = sorted(expected_links - indexed_links)
    extra_links = sorted(indexed_links - expected_links)
    if missing_links:
        findings.append(
            Finding(
                "ERROR",
                rel(llms_full),
                f"llms-full.txt is missing docs URLs generated from content/docs: {', '.join(missing_links[:5])}",
            )
        )
    if extra_links:
        findings.append(
            Finding(
                "ERROR",
                rel(llms_full),
                f"llms-full.txt contains docs URLs without matching MDX files: {', '.join(extra_links[:5])}",
            )
        )

    check_private_markers(llms_full, text, findings)


def check_metadata(findings: list[Finding]) -> None:
    helper = REPO / "lib" / "metadata.ts"
    docs_page = REPO / "app" / "docs" / "[...slug]" / "page.tsx"
    home_page = REPO / "app" / "page.tsx"
    if require_file(helper, findings):
        text = read_text(helper)
        for token in ["metadataBase", "openGraph", "twitter", "productionSiteUrl"]:
            if token not in text:
                findings.append(Finding("ERROR", rel(helper), f"metadata helper missing token: {token}"))

    if require_file(docs_page, findings):
        text = read_text(docs_page)
        for token in ["alternates", "canonical", "absoluteUrl", "url: absoluteUrl"]:
            if token not in text:
                findings.append(Finding("ERROR", rel(docs_page), f"docs page metadata missing token: {token}"))

    if require_file(home_page, findings):
        text = read_text(home_page)
        for token in ["export const metadata", "homeDescription", "alternates", "canonical", "url: homeUrl"]:
            if token not in text:
                findings.append(Finding("ERROR", rel(home_page), f"homepage metadata missing token: {token}"))


def check_structured_data(findings: list[Finding]) -> None:
    docs_page = REPO / "app" / "docs" / "[...slug]" / "page.tsx"
    home_page = REPO / "app" / "page.tsx"
    if require_file(docs_page, findings):
        text = read_text(docs_page)
        required_tokens = [
            'type="application/ld+json"',
            "Article",
            "BreadcrumbList",
            "mainEntityOfPage",
            "itemListElement",
            "serializeJsonLd",
        ]
        for token in required_tokens:
            if token not in text:
                findings.append(Finding("ERROR", rel(docs_page), f"docs page structured data missing token: {token}"))

    if require_file(home_page, findings):
        text = read_text(home_page)
        required_tokens = [
            'type="application/ld+json"',
            "WebSite",
            "Organization",
            "ItemList",
            "itemListElement",
            "homeJsonLd",
        ]
        for token in required_tokens:
            if token not in text:
                findings.append(Finding("ERROR", rel(home_page), f"homepage structured data missing token: {token}"))


def check_mdx_autolinks(findings: list[Finding]) -> None:
    bad_pattern = re.compile(r"<https?://[^>]+>")
    for path in sorted(CONTENT.rglob("*.mdx")):
        text = read_text(path)
        for match in bad_pattern.finditer(text):
            line = text.count("\n", 0, match.start()) + 1
            findings.append(
                Finding(
                    "ERROR",
                    rel(path),
                    f"angle-bracket URL autolink can be parsed as JSX at line {line}; use [source](url)",
                )
            )


def check_public_content_boundaries(findings: list[Finding]) -> None:
    for path in sorted(CONTENT.rglob("*.mdx")):
        text = read_text(path)
        frontmatter = extract_frontmatter(text)

        for key in ["title", "description"]:
            if not frontmatter.get(key):
                findings.append(Finding("ERROR", rel(path), f"MDX frontmatter missing public SEO field: {key}"))

        check_private_markers(path, text, findings)


def main() -> int:
    findings: list[Finding] = []
    check_robots(findings)
    check_sitemap(findings)
    check_llms(findings)
    check_llms_full(findings)
    check_metadata(findings)
    check_structured_data(findings)
    check_mdx_autolinks(findings)
    check_public_content_boundaries(findings)

    errors = [finding for finding in findings if finding.level == "ERROR"]
    warnings = [finding for finding in findings if finding.level == "WARN"]

    print("NestHub SEO/GEO static QA")
    print(f"repo: {REPO}")
    print(f"errors: {len(errors)}")
    print(f"warnings: {len(warnings)}")

    if findings:
        print("\nFindings:")
        for finding in findings:
            print(f"[{finding.level}] {finding.path}: {finding.message}")
    else:
        print("all_checks_passed")

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
