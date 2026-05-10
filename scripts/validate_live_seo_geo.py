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
    "/docs",
    "/docs/beijing",
    "/docs/shanghai",
    "/docs/guangzhou",
    "/docs/hangzhou",
    "/docs/shenzhen",
    "/docs/nanjing",
    "/docs/chengdu",
    "/docs/wuhan",
    "/docs/avoid-pitfalls/contract",
    "/docs/beijing/yizhuang-renting-guide",
    "/docs/beijing/xierqi-renting-guide",
    "/docs/shanghai/zhangjiang-renting-guide",
    "/docs/shanghai/caohejing-renting-guide",
    "/docs/hangzhou/future-tech-city-renting-guide",
    "/docs/hangzhou/binjiang-renting-guide",
    "/docs/shenzhen/nanshan-tech-park-renting-guide",
    "/docs/wuhan/guanggu-software-park-renting-guide",
]

TEXT_ASSET_PATHS = ["/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt"]
AI_DISCOVERY_USER_AGENTS = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-User"]


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
        require_status_ok(response, route, findings)
        if response is None:
            continue
        require_tokens(response, ["NestHub", "租房"], findings)


def main() -> int:
    findings: list[Finding] = []
    responses = {path: fetch(path, findings) for path in TEXT_ASSET_PATHS}

    check_text_asset_headers(responses, findings)
    check_robots(responses.get("/robots.txt"), findings)
    check_sitemap(responses.get("/sitemap.xml"), findings)
    check_llms(responses.get("/llms.txt"), findings)
    check_llms_full(responses.get("/llms-full.txt"), findings)
    check_doc_routes(findings)

    errors = [finding for finding in findings if finding.level == "ERROR"]
    warnings = [finding for finding in findings if finding.level == "WARN"]

    print("NestHub live SEO/GEO smoke QA")
    print(f"site: {PRODUCTION_URL}")
    print(f"text_assets_checked: {len(TEXT_ASSET_PATHS)}")
    print(f"doc_routes_checked: {len(ESSENTIAL_DOC_ROUTES)}")
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
