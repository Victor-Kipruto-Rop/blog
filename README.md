# Victor Kipruto Rop | Engineering Notes

A personal engineering publication covering data engineering, fintech infrastructure, distributed systems, software architecture and technology in East Africa.

Production domain: **https://blog.victorkipruto.com**

## Product principles

- Portfolio-aligned visual identity: warm paper surfaces, charcoal ink, orange-red accent, Playfair Display, Plus Jakarta Sans and Fira Code.
- Light theme by default, with an optional dark theme.
- Content-first, accessible, responsive and fast.
- Markdown/MDX articles stored in Git and reviewed through normal pull requests.
- No fabricated analytics, uptime, newsletter subscribers or deployment status.

## Stack

- Next.js App Router and React
- TypeScript and Tailwind CSS
- Git-backed MDX content with reading-time metadata
- Cloudflare Workers using the OpenNext adapter
- Cloudflare global edge network and custom domain routing

## Local development

```bash
npm ci
npm run dev
```

## Content authoring

Add one `.mdx` file per article under `content/posts/`:

```md
---
title: "A practical engineering article"
date: "2026-11-12"
tags: ["data-engineering", "architecture"]
---

Write the article in Markdown. Use real publication dates and cite primary sources where appropriate.
```

Posts are version-controlled. Drafts should not be merged into the production branch until reviewed.

## Cloudflare deployment

The project uses Cloudflare Workers + OpenNext because the existing application uses Next.js route handlers and server-side content loading. The Worker custom domain is declared in `wrangler.jsonc`.

Required GitHub Actions secrets:
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Workers Scripts edit and account read permissions for the target account.
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID that owns the `victorkipruto.com` zone.

The deployment workflow installs pinned OpenNext/Wrangler build tools, builds the application, and deploys the Worker on pushes to `main`. The Cloudflare account must already contain the active `victorkipruto.com` zone, and the token must be authorized for it. The custom domain is `blog.victorkipruto.com`.

For a local production-runtime preview, install the Cloudflare tools and run:

```bash
npm install --no-save --package-lock=false @opennextjs/cloudflare@1.20.16 wrangler@4.68.0
npm run cf:preview
```

For a manual deployment:

```bash
npm run cf:deploy
```

## Quality gates

Before merging a content or application change:

```bash
npm ci
npm run build
npm install --no-save --package-lock=false @opennextjs/cloudflare@1.20.16 wrangler@4.68.0
npm run cf:build
```

Review the Worker preview before production deployment. Do not commit `.open-next/`, local secrets or environment files.

## Security and privacy

- Never commit API tokens, newsletter credentials or subscriber data.
- Newsletter capture must be connected to a real provider and use verified consent before it is advertised as active.
- Internal dashboards must remain private and must never expose operational secrets.
- Analytics and operational metrics must be based on real data sources.

## Related properties

- Portfolio: https://www.victorkipruto.com
- GitHub: https://github.com/Victor-Kipruto-Rop
- LinkedIn: https://www.linkedin.com/in/victor-kipruto-rop/
