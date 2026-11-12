# Victor Kipruto Rop | Engineering Notes

A light-first editorial engineering journal built with Next.js 14, MDX and Cloudflare Workers. The visual language follows the portfolio at [victorkipruto.com](https://www.victorkipruto.com): warm paper surfaces, charcoal typography, restrained red-orange accents, Playfair Display, Plus Jakarta Sans and Fira Code.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Content workflow

Create an MDX file in `content/posts/<slug>.mdx`:

```md
---
title: "A useful engineering title"
date: "2026-11-12"
tags:
  - data engineering
  - systems
draft: true
---

Write the article here.
```

Keep `draft: true` while preparing an article. Remove the field or set `draft: false` only after editorial review. Articles are Git-versioned and statically generated. Search, topic archives, RSS, sitemap and article metadata are derived from published content.

## Newsletter and new-article notifications

The footer subscription form requires explicit consent and submits to `POST /api/subscribe`. Configure these Cloudflare Worker secrets:

- `RESEND_API_KEY`: Resend API key with audience/contact and email/broadcast permissions.
- `RESEND_AUDIENCE_ID`: the audience that receives blog notifications.
- `RESEND_FROM_EMAIL`: a sender identity verified in Resend, for example a name and address on the blog domain.
- `BLOG_NOTIFICATION_SECRET`: a long random secret used to authorize publishing notifications.

A successful subscription creates a Resend audience contact and sends a welcome email. A provider delivery failure is reported separately from contact creation; it is not presented as a successful welcome-email delivery.

After an article is published and deployed, send its notification with:

```bash
curl --fail-with-body -X POST https://blog.victorkipruto.com/api/notify \
  -H "Authorization: Bearer $BLOG_NOTIFICATION_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"slug":"your-published-article-slug"}'
```

The endpoint only accepts a valid published article slug and sends a Resend broadcast to the configured audience. Keep the notification secret outside source control. Do not call the endpoint for draft content. Review the audience and email copy before sending to real subscribers.

## Production deployment: Cloudflare Workers

The production hostname is `blog.victorkipruto.com`. The repository includes `wrangler.jsonc` with the Workers custom-domain route and `.github/workflows/deploy-cloudflare.yml`.

1. In Cloudflare, make sure the `victorkipruto.com` zone is active in the account and the account can create Workers custom domains.
2. In GitHub repository Settings → Secrets and variables → Actions, add:
   - `CLOUDFLARE_API_TOKEN`: scoped to the correct account with Workers Scripts edit and Zone read/custom-hostname permissions needed for the custom domain.
   - `CLOUDFLARE_ACCOUNT_ID`: the target Cloudflare account ID.
3. Merge the reviewed pull request into `main`. The deployment workflow installs locked dependencies, builds the OpenNext Worker and deploys it. It can also be started from Actions → Deploy blog to Cloudflare Workers → Run workflow.
4. Confirm the Worker is healthy and `https://blog.victorkipruto.com`, `/sitemap.xml`, `/robots.txt` and `/api/rss` respond successfully.
5. Configure the four Resend/notification secrets above in the Worker environment before enabling newsletter signups.

The custom-domain route in Wrangler may create the hostname automatically when deployed if the zone and permissions are correct. If Cloudflare reports that the domain is not active in the account, activate the zone first and rerun deployment. Do not create conflicting DNS records manually.

## Validation

Pull requests run `npm ci` and `npm run build`. Production deployment runs only after a push to `main` or manual dispatch. A failed or skipped CI run must be resolved before merging; do not treat a created PR as a deployment.

## Editorial and operational principles

- Light theme only, matching the portfolio identity.
- No fabricated metrics, testimonials, uptime percentages or release history.
- Keep draft articles out of public listings, feeds and sitemap.
- Use primary sources for technical claims and clearly distinguish measured results from estimates.
- Keep secrets in Cloudflare/GitHub secret stores, never in source control.
