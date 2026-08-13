# Blog System Scaffold

A Next.js 14 blog structured as a system of subsystems, matching a control-room /
deep-navy aesthetic.

## Launch-blocking (v1)
- Content Engine (`lib/content-engine`)
- Posts index + single post (`app/(site)/posts`)
- Tags (`app/(site)/tags`)
- Search (`app/(site)/search`, `lib/search`)
- README/about (`app/(site)/readme`)
- RSS (`app/api/rss`)
- Subscribe (`app/api/subscribe`)

## Post-launch (v2)
- Status dashboard (`app/(site)/status`)
- Changelog (`app/(site)/changelog`)
- Internal dashboard (`app/(internal)/dashboard`)
- Monitoring (`lib/monitoring`)
- Alerting (`lib/alerting`, `.github/workflows/link-check.yml`)

## Setup
```bash
npm install
npm run dev
```

Add posts as `.mdx` files in `content/posts/` with frontmatter:
```md
---
title: "Post Title"
date: "2026-07-14"
tags: ["tag1", "tag2"]
---
```

## Env vars (v2 features)
- `ALERT_WEBHOOK_URL` — Slack/Discord webhook for alerting
- `EMAIL_PROVIDER_API_KEY` — Resend/Buttondown key for subscriber notifications
