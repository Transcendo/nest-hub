<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/branding/better-auth-logo-wordmark-dark.svg" />

  <source media="(prefers-color-scheme: light)" srcset="public/branding/better-auth-logo-wordmark-light.svg" />

  <img alt="Better Auth" src="public/branding/better-auth-logo-wordmark-dark.svg" width="280" />
</picture>

### Fumadocs Frontend

Standalone Better Auth documentation frontend built with Next.js and Fumadocs.

[![Website](https://img.shields.io/badge/better--auth.com-000?style=flat\&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCA2MCA0NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMEgxNVYxNUgzMFYzMEgxNVY0NUgwVjMwVjE1VjBaTTQ1IDMwVjE1SDMwVjBINDVINjBWMTVWMzBWNDVINDVIMzBWMzBINDVaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==\&logoColor=white)](https://better-auth.com)
[![GitHub Stars](https://img.shields.io/github/stars/better-auth/better-auth?style=flat\&logo=github\&label=stars\&color=24292e)](https://github.com/better-auth/better-auth)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat)](LICENSE)

***

## Quick Start

```bash
# install
pnpm install

# develop
pnpm dev
```

Open **[localhost:3000/docs/introduction](http://localhost:3000/docs/introduction)** to preview.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS 4
- **Docs**: Fumadocs
- **Search**: Fumadocs static search
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## Structure

```
├─ app/
│  ├─ page.tsx              # Redirects to the docs
│  ├─ api/search/           # Static Fumadocs search index
│  └─ docs/[[...slug]]/     # Documentation pages
│
├─ components/
│  ├─ docs/                 # Documentation components
│  ├─ ui/                   # Shared primitives
│  └─ icons/                # Brand icons & logo
│
├─ content/docs/            # MDX documentation files
│
├─ lib/
│  ├─ source.ts             # Fumadocs content source
│  └─ utils.ts              # Utilities
│
└─ public/
   └─ branding/             # Logo assets (SVG + PNG)
```

## Scripts

```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm start        # Serve the static out/ build
pnpm typecheck    # Type-check the app
```


## GitHub Pages Deployment

This project is already configured for **static export** with Next.js:

- `next.config.js` uses `output: "export"`
- production output is generated into `out/`

### Local production check

```bash
pnpm install
pnpm build
pnpm start
```

Then open the locally served static site.

### Deploy with GitHub Actions

This repository includes a GitHub Actions workflow:

- `.github/workflows/deploy-github-pages.yml`

To enable deployment:

1. Go to **GitHub → Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main`
4. GitHub Actions will build the site and deploy the `out/` directory to Pages

### Notes

- If you later publish under a repository subpath (for example `https://<user>.github.io/content-show/`), you may also need to configure `basePath` and `assetPrefix` in `next.config.js`.
- If you deploy to a custom domain or root domain via GitHub Pages, the current setup is the simplest path.
