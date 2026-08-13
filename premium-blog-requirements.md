# Premium Blog — Full Requirements Prompt

A complete build/requirements prompt for a premium personal engineering blog
(DataForge Log). Organized so it can be used directly as a build brief or
project checklist.

---

## 1. Design & Branding

- Consistent color palette with a maximum of 1–2 accent colors
- Type system: one body font, one display/heading font, monospace reserved
  for code and metadata only
- Logo / brand mark + favicon (all sizes: 16x16, 32x32, apple-touch-icon)
- Consistent spacing and grid system (8px base unit recommended)
- Dark mode as the primary theme (matching existing portfolio identity)
- Custom Open Graph images generated per post (for social share previews)

---

## 2. Content Architecture

- 3–5 clear content pillars (e.g. data engineering, fintech infrastructure,
  East African tech ecosystem)
- Tag/category taxonomy defined before writing begins
- Author bio / about page
- **3–5 launch posts written and published before going live** — an empty
  blog undermines credibility more than a slightly late launch
- Editorial guidelines: voice, target length, posting cadence

---

## 3. Core Pages & Features

- [ ] Home / landing page
- [ ] Post index (list or log-style view)
- [ ] Individual post pages
- [ ] Tag / category pages
- [ ] Search
- [ ] About / README page
- [ ] Custom-styled 404 page
- [ ] RSS feed

---

## 4. Technical Foundation

- Fast hosting with CDN (Vercel, Render, or similar)
- SEO essentials:
  - Meta tags (title, description, OG, Twitter card)
  - `sitemap.xml`
  - `robots.txt`
  - Structured data (JSON-LD, `Article` schema)
- Privacy-friendly analytics (Plausible or Umami)
- Image optimization (`next/image`, WebP/AVIF formats)
- Mobile responsiveness tested on real devices, not just browser resize
- Accessibility basics: alt text on all images, sufficient contrast ratios,
  full keyboard navigation

---

## 5. Growth & Engagement

- Newsletter / subscribe capture (email input, confirmation flow)
- Social share buttons on post pages
- Related posts / internal linking between posts
- Comments or lightweight reactions (optional, not launch-blocking)
- Custom domain + matching email address (e.g. `you@dataforge.dev`)

---

## 6. Trust Signals

- Real headshot / avatar (not a placeholder)
- Links to GitHub, LinkedIn, and existing portfolio
- Published date **and** last-updated date shown on each post
- Reading time estimate on post cards and post pages

---

## 7. Post-Launch (v2 — do not block launch on these)

- Public status / uptime dashboard
- Changelog page
- Monitoring and alerting subsystem
- Analytics dashboard beyond basic pageviews (post velocity, tag
  distribution, word count trends)

---

## 8. Priority Guidance

**Launch-blocking:** Sections 1–4 fully complete, plus 3–5 posts published.

**Nice-to-have at launch, safe to add later:** Section 5 (engagement) and
Section 6 (trust signals) can be layered in incrementally post-launch
without hurting first impressions.

**Explicitly deferred:** Section 7 — these are valuable but should never
delay a first version. Build them only after the blog has real posts and
real traffic to monitor.

> Note: given other in-flight priorities (e.g. production hardening work
> on active projects), treat this as a backlog to pull from over several
> weeks rather than a single pre-launch checklist to clear all at once.
