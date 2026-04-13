# AGENTS.md - content-show

This repository is a documentation/content site built with **Next.js + Fumadocs**.

## What this repo is for

- Publishing structured knowledge/content pages
- Organizing topic collections into browsable documentation
- Maintaining clean, source-backed reference content

Current repo state suggests it started from a docs frontend template and is now being repurposed into a content site.

## Working rules

1. Prefer **content-first changes** over framework churn unless the user explicitly asks for UI/engineering work.
2. New editorial/topic collections should live in a clearly named content folder first, then be wired into the docs nav if needed.
3. For knowledge content:
   - use credible sources
   - distinguish fact vs interpretation
   - avoid hypey claims unless clearly labeled as opinion
4. When creating new topic series, prefer a stable folder structure that can expand over time.
5. Keep edits minimal and legible. Do not randomly refactor the app shell unless needed.

## Recommended structure for editorial work

- `AI Knowledge/` for topic-driven research/content drafts and source-backed explainers
- `content/docs/` for pages that should appear in the site navigation

## Current overview

- Framework: Next.js 16
- Docs system: Fumadocs
- Package manager: pnpm
- Main purpose right now: docs/content publishing frontend

## Notes for future work

- If the user asks for a repo overview, summarize both:
  - technical stack
  - content information architecture
- If a topic is research-heavy, collect sources first, then write the page
- If publishing to the live docs site becomes necessary, mirror or adapt draft content from `AI Knowledge/` into `content/docs/`
