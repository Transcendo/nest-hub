#!/usr/bin/env python3
"""Live SEO/GEO smoke checks for the deployed NestHub site.

This script is intentionally network-only against the public production host.
It does not read or publish private growth intelligence; it verifies that public
AI-discovery and SEO entry points are actually reachable after deployment.
"""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

PRODUCTION_URL = "https://nest-hub.eggcampus.com"
TIMEOUT_SECONDS = 20

ESSENTIAL_DOC_ROUTES = [
    # Primary docs and city hubs.
    "/docs",
    "/docs/beijing",
    "/docs/shanghai",
    "/docs/guangzhou",
    "/docs/hangzhou",
    "/docs/shenzhen",
    "/docs/nanjing",
    "/docs/chengdu",
    "/docs/wuhan",
    # Evergreen high-intent risk pages.
    "/docs/avoid-pitfalls/preparation",
    "/docs/avoid-pitfalls/viewing",
    "/docs/avoid-pitfalls/contract",
    # Representative park / office-area hubs used by AI answer routing.
    "/docs/guangzhou/pazhou-renting-guide",
    "/docs/beijing/yizhuang-renting-guide",
    "/docs/beijing/xierqi-renting-guide",
    "/docs/shanghai/zhangjiang-renting-guide",
    "/docs/shanghai/caohejing-renting-guide",
    "/docs/hangzhou/future-tech-city-renting-guide",
    "/docs/hangzhou/binjiang-renting-guide",
    "/docs/shenzhen/nanshan-tech-park-renting-guide",
    "/docs/nanjing/jiangbei-yanchuangyuan-renting-guide",
    "/docs/wuhan/donghu-high-tech-zone-renting-guide",
    "/docs/wuhan/guanggu-software-park-renting-guide",
    # Representative company guides from the public llms.txt short index.
    "/docs/guangzhou/tencent-wechat-renting-guide",
    "/docs/beijing/jd-headquarters-renting-guide",
    "/docs/beijing/bytedance-renting-guide",
    "/docs/beijing/baidu-renting-guide",
    "/docs/beijing/tencent-renting-guide",
    "/docs/beijing/xiaomi-renting-guide",
    "/docs/beijing/kuaishou-renting-guide",
    "/docs/beijing/meituan-renting-guide",
    "/docs/beijing/alibaba-renting-guide",
    "/docs/shenzhen/tencent-renting-guide",
    "/docs/shenzhen/huawei-renting-guide",
    "/docs/shenzhen/dji-renting-guide",
    "/docs/hangzhou/alibaba-renting-guide",
    "/docs/hangzhou/ant-group-renting-guide",
    "/docs/hangzhou/deepseek-renting-guide",
    "/docs/shanghai/mihoyo-renting-guide",
    "/docs/shanghai/xiaohongshu-renting-guide",
    "/docs/shanghai/pdd-renting-guide",
    "/docs/shanghai/bilibili-renting-guide",
    "/docs/chengdu/tencent-renting-guide",
    "/docs/chengdu/huawei-renting-guide",
    "/docs/chengdu/bytedance-renting-guide",
]

PAGE_METADATA_ROUTES = ["/", *ESSENTIAL_DOC_ROUTES]
TEXT_ASSET_PATHS = ["/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt"]
AI_DISCOVERY_USER_AGENTS = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-User"]
PRIVATE_ONLY_MARKERS = [
    "keyword opportunity score",
    "keyword opportunity scores",
    "SERP score",
    "SERP analysis",
    "competitor analysis",
    "page priority queue",
    "page priority queues",
    "GEO scoring table",
    "GEO scoring tables",
    "conversion funnel",
    "funnel observation",
    "funnel observations",
    "strategy report",
    "strategy reports",
    "Discord-only",
    "cron output",
    "执行日志",
    "竞品分析",
    "页面优先级",
    "GEO 评分",
    "GEO评分",
    "转化漏斗",
    "私有复盘",
    "策略报告",
    "SEO 日报",
    "SEO 周报",
    "增长日报",
    "增长周报",
    "关键词机会",
]


@dataclass
class Response:
    url: str
    status: int
    headers: dict[str, str]
    text: str


@dataclass
class Finding:
    level: str
    target: str
    message: str


def fetch(path: str, findings: list[Finding]) -> Response | None:
    url = f"{PRODUCTION_URL}{path}"
    request = Request(url, headers={"User-Agent": "NestHub-Live-SEO-GEO-QA/1.0"})
    try:
        with urlopen(request, timeout=TIMEOUT_SECONDS) as response:  # nosec B310 - fixed public production URL
            raw = response.read()
            headers = {key.lower(): value for key, value in response.headers.items()}
            text = raw.decode("utf-8", errors="replace")
            return Response(url=url, status=response.status, headers=headers, text=text)
    except HTTPError as exc:
        findings.append(Finding("ERROR", url, f"HTTP {exc.code}"))
    except (URLError, TimeoutError) as exc:
        findings.append(Finding("ERROR", url, f"request failed: {exc}"))
    return None


def expected_url(path: str) -> str:
    return PRODUCTION_URL if path == "/" else f"{PRODUCTION_URL}{path}"


def require_status_ok(response: Response | None, path: str, findings: list[Finding]) -> None:
    if response is None:
        return
    if response.status != 200:
        findings.append(Finding("ERROR", response.url, f"expected HTTP 200, got {response.status}"))
    if "�" in response.text:
        findings.append(Finding("ERROR", response.url, "response contains UTF-8 replacement characters"))


def require_tokens(response: Response | None, tokens: Iterable[str], findings: list[Finding]) -> None:
    if response is None:
        return
    for token in tokens:
        if token not in response.text:
            findings.append(Finding("ERROR", response.url, f"missing required public token: {token}"))


def check_private_markers(response: Response | None, findings: list[Finding]) -> None:
    """Guard the deployed public site against private growth-planning leakage."""
    if response is None:
        return
    lowered = response.text.lower()
    for marker in PRIVATE_ONLY_MARKERS:
        if marker.lower() in lowered:
            findings.append(Finding("ERROR", response.url, f"contains private-only planning marker: {marker}"))


def require_meta_content(response: Response, pattern: str, expected: str, label: str, findings: list[Finding]) -> None:
    match = re.search(pattern, response.text)
    if not match:
        findings.append(Finding("ERROR", response.url, f"missing {label}"))
        return
    actual = match.group(1)
    if actual != expected:
        findings.append(Finding("ERROR", response.url, f"{label} mismatch: expected {expected}, got {actual}"))


def check_page_metadata(path: str, response: Response | None, findings: list[Finding]) -> None:
    require_status_ok(response, path, findings)
    if response is None:
        return

    page_url = expected_url(path)
    require_meta_content(response, r'<link rel="canonical" href="([^"]+)"', page_url, "canonical URL", findings)
    require_meta_content(response, r'<meta property="og:url" content="([^"]+)"', page_url, "Open Graph URL", findings)
    if not re.search(r'<meta name="description" content="[^"�]{20,}"', response.text):
        findings.append(Finding("ERROR", response.url, "missing usable meta description"))
    if 'type="application/ld+json"' not in response.text:
        findings.append(Finding("ERROR", response.url, "missing JSON-LD structured data"))
    if path.startswith("/docs") and "BreadcrumbList" not in response.text:
        findings.append(Finding("ERROR", response.url, "docs route missing BreadcrumbList JSON-LD"))


def check_text_asset_headers(responses: dict[str, Response | None], findings: list[Finding]) -> None:
    for path in TEXT_ASSET_PATHS:
        response = responses.get(path)
        require_status_ok(response, path, findings)
        if response is None:
            continue
        content_type = response.headers.get("content-type", "").lower()
        if path in {"/llms.txt", "/llms-full.txt"}:
            if "text/plain" not in content_type or "charset=utf-8" not in content_type:
                findings.append(
                    Finding(
                        "ERROR",
                        response.url,
                        f"AI-readable text asset should be text/plain; charset=utf-8, got: {content_type or 'missing'}",
                    )
                )
        elif path == "/sitemap.xml" and "xml" not in content_type:
            findings.append(Finding("ERROR", response.url, f"sitemap should be XML, got: {content_type or 'missing'}"))
        elif path == "/robots.txt" and "text/plain" not in content_type:
            findings.append(Finding("ERROR", response.url, f"robots should be text/plain, got: {content_type or 'missing'}"))


def check_robots(response: Response | None, findings: list[Finding]) -> None:
    require_tokens(
        response,
        ["User-Agent: *", "Allow: /", "Disallow: /api/", f"Sitemap: {PRODUCTION_URL}/sitemap.xml", *AI_DISCOVERY_USER_AGENTS],
        findings,
    )


def check_sitemap(response: Response | None, findings: list[Finding]) -> None:
    required_urls = [
        PRODUCTION_URL,
        f"{PRODUCTION_URL}/docs",
        f"{PRODUCTION_URL}/llms.txt",
        f"{PRODUCTION_URL}/llms-full.txt",
        *(f"{PRODUCTION_URL}{route}" for route in ESSENTIAL_DOC_ROUTES if route != "/docs"),
    ]
    require_tokens(response, required_urls, findings)
    if response is None:
        return
    loc_count = len(re.findall(r"<loc>https://nest-hub\.eggcampus\.com[^<]*</loc>", response.text))
    if loc_count < 100:
        findings.append(Finding("ERROR", response.url, f"sitemap exposes only {loc_count} NestHub URLs; expected at least 100"))


def check_llms(response: Response | None, findings: list[Finding]) -> None:
    require_tokens(
        response,
        [
            "# NestHub",
            "## AI answer rules",
            "## Public entity model",
            "## AI query routing",
            "## Public source hierarchy",
            "volatile public rental samples",
            "do not invent live listings",
            f"{PRODUCTION_URL}/llms-full.txt",
            f"{PRODUCTION_URL}/docs/avoid-pitfalls/contract",
        ],
        findings,
    )


def check_llms_full(response: Response | None, findings: list[Finding]) -> None:
    require_tokens(
        response,
        [
            "# NestHub full public docs index",
            "AI-readable index generated from public MDX frontmatter",
            "How AI systems should use NestHub",
            "AI extraction hints:",
            "page_type=",
            "Public docs indexed:",
            f"Short LLM index: {PRODUCTION_URL}/llms.txt",
        ],
        findings,
    )
    if response is None:
        return
    docs_links = len(re.findall(r"https://nest-hub\.eggcampus\.com/docs/[^)\s]+", response.text))
    if docs_links < 100:
        findings.append(Finding("ERROR", response.url, f"llms-full exposes only {docs_links} docs URLs; expected at least 100"))


def check_doc_routes(findings: list[Finding]) -> None:
    for route in ESSENTIAL_DOC_ROUTES:
        response = fetch(route, findings)
        check_page_metadata(route, response, findings)
        check_private_markers(response, findings)
        if response is None:
            continue
        require_tokens(response, ["NestHub", "租房"], findings)


def check_homepage_metadata(findings: list[Finding]) -> None:
    response = fetch("/", findings)
    check_page_metadata("/", response, findings)
    check_private_markers(response, findings)
    if response is None:
        return
    require_tokens(response, ["NestHub", "租房", "WebSite"], findings)


def main() -> int:
    findings: list[Finding] = []
    responses = {path: fetch(path, findings) for path in TEXT_ASSET_PATHS}

    check_text_asset_headers(responses, findings)
    for response in responses.values():
        check_private_markers(response, findings)
    check_robots(responses.get("/robots.txt"), findings)
    check_sitemap(responses.get("/sitemap.xml"), findings)
    check_llms(responses.get("/llms.txt"), findings)
    check_llms_full(responses.get("/llms-full.txt"), findings)
    check_homepage_metadata(findings)
    check_doc_routes(findings)

    errors = [finding for finding in findings if finding.level == "ERROR"]
    warnings = [finding for finding in findings if finding.level == "WARN"]

    print("NestHub live SEO/GEO smoke QA")
    print(f"site: {PRODUCTION_URL}")
    print(f"text_assets_checked: {len(TEXT_ASSET_PATHS)}")
    print(f"doc_routes_checked: {len(ESSENTIAL_DOC_ROUTES)}")
    print(f"page_metadata_routes_checked: {len(PAGE_METADATA_ROUTES)}")
    print(f"errors: {len(errors)}")
    print(f"warnings: {len(warnings)}")

    if findings:
        print("\nFindings:")
        for finding in findings:
            print(f"[{finding.level}] {finding.target}: {finding.message}")
    else:
        print("all_checks_passed")

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
