# kaiwei.dev

English-first, static-first personal engineering site for Kai-Wei Chou. It is built with Astro and generates plain static HTML for the portfolio, bilingual blog, tags, RSS, sitemap, and project pages.

## Stack

- Astro with static output
- Tailwind CSS 4 through the Vite integration
- Astro Content Collections for blog posts and projects
- Markdown by default; MDX only when an article needs an Astro component
- Shiki syntax highlighting, GitHub-flavored Markdown, KaTeX, and Mermaid
- No database, CMS, backend, or SPA runtime

## Project structure

```text
src/
├── components/       # Common, home, blog, and project UI
├── content/
│   ├── blog/         # en/ and zh-tw/ Markdown or MDX posts
│   └── projects/     # en/ and zh-tw/ project entries
├── i18n/             # UI dictionaries and stable tag label mappings
├── layouts/          # Base, page, and article layouts
├── pages/            # English routes and the /zh-tw/ route tree
├── styles/           # Tailwind entry point and global article styles
├── utils/            # Dates, content queries, paths, and translations
└── content.config.ts # Content Collection schemas
```

Static assets live in `public/`. Keep each post's images together, for example `public/images/blog/my-post/cover.webp`.

## Local development

Node.js 22.12 or newer is required.

```bash
npm install
npm run dev
```

The local site is available at `http://localhost:4321` by default.

## Checks and build

```bash
npm run check
npm run build
npm run preview
```

`npm run build` runs Astro's type/content checks, writes the complete static site to `dist/`,
and deterministically normalizes every generated HTML, XML, and SVG document. Use
`npm run normalize` to repeat output normalization or `npm run normalize:source` to format XML-based
assets under `public/`.

## Adding a blog post

Create a `.md` file in `src/content/blog/en/` or `src/content/blog/zh-tw/`. The filename becomes the URL slug, so:

```text
src/content/blog/en/designing-a-mini-ip-kvm.md
→ /blog/designing-a-mini-ip-kvm/
```

Use `.mdx` only when the article needs imported Astro components. A minimal post looks like:

```yaml
---
title: "Designing a Mini IP-KVM"
description: "Architecture and design decisions for a compact remote management device."
published: 2026-08-28
updated: 2026-08-28
lang: en
translationKey: mini-ip-kvm
tags:
  - embedded
  - linux
draft: false
featured: true
cover: "/images/blog/mini-ip-kvm/cover.webp"
ogImage: "/images/blog/mini-ip-kvm/og.png"
---
```

`cover` is the on-site article image. Use the optional `ogImage` for a 1200×630 PNG, WebP, or JPEG social preview. Headings automatically receive anchors and feed the article table of contents. Fenced code blocks use Shiki. GitHub-style tables work directly. Use `$...$` or `$$...$$` for KaTeX math, and a fenced `mermaid` block for diagrams.

## Adding a translation

Create a separate post under the other language directory. Slugs do not need to match. Give both entries the same stable `translationKey`:

```text
src/content/blog/en/designing-a-mini-ip-kvm.md
src/content/blog/zh-tw/mini-ip-kvm-design.md
```

```yaml
translationKey: mini-ip-kvm
```

`translationKey` links equivalent content independently of filenames and URLs. The article language switch and `hreflang` metadata are generated only when a matching translation exists. A post without a translation builds normally and shows no broken language link.

Tag values are also stable identifiers such as `open-source` or `embedded`. Localized display names live in `src/i18n/index.ts`; do not translate identifiers in frontmatter.

## Adding a project

Create one Markdown entry in the appropriate `src/content/projects/<language>/` directory:

```yaml
---
name: "Ianvs Example Validator"
description: "Automated validation infrastructure for reproducible example testing."
lang: en
translationKey: ianvs-example-validator
status: active
featured: true
github: "https://github.com/kubeedge/ianvs"
technologies:
  - Python
  - GitHub Actions
  - Docker
order: 30
---
```

The home page and `/projects/` query the same collection. `featured: true` includes a project on the home page. `order` controls its priority.

## Drafts and featured content

- `draft: true` blog posts appear in development but are omitted from production builds, RSS, tags, and static article routes.
- `featured: true` projects are eligible for the home-page selection.
- `featured` is also available on posts for future curated views; the current home page intentionally shows the newest posts.

## Deployment

The canonical site is always `https://kaiwei.dev`. The output has no server runtime dependency and can be deployed from `dist/` to GitHub Pages, Cloudflare Pages, or Vercel.

- GitHub Pages: the included workflow builds and uploads `dist/`. Configure Pages to use GitHub Actions and point the domain DNS to GitHub Pages.
- Cloudflare Pages: build command `npm run build`, output directory `dist`.
- Vercel: framework preset Astro, build command `npm run build`, output directory `dist`.

`public/CNAME` preserves the custom domain for GitHub Pages. Configure the same domain in the selected hosting provider and keep only one production deployment authoritative.
