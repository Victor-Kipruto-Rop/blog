# Blog Implementation Prompt — What to Add Next

A gap-analysis prompt against the existing scaffold, organized by priority.
Use this to drive the next implementation pass.

---

## Already Implemented

- Content engine (frontmatter parsing, reading time)
- Post index, individual post pages
- Tags (index + per-tag pages)
- Client-side search (Fuse.js)
- RSS feed
- Subscribe API endpoint
- Dark theme with single green accent
- Monospace metadata styling
- CLI-style nav

---

## 1. Launch-Blocking — Add Next

### SEO essentials
- [ ] `app/sitemap.ts` — dynamic sitemap generation from post registry
- [ ] `app/robots.ts` — robots.txt config
- [ ] `generateMetadata()` per post — title, description, OG tags, Twitter card
- [ ] JSON-LD `Article` structured data on post pages

### OG image generation
- [ ] `app/api/og/route.tsx` using `next/og`
- [ ] Auto-generate share image per post: title + date + tag, styled in the
      existing dark/green palette
- [ ] Reference generated OG image in `generateMetadata()`

### 404 page
- [ ] `app/not-found.tsx`, styled to match site theme
      (e.g. `$ 404: route_not_found`)

### Favicon set
- [ ] `favicon.ico` (16x16, 32x32)
- [ ] `apple-touch-icon.png`
- [ ] `manifest.json` (PWA-ready icon set + theme color)

### Analytics wiring
- [ ] Add Plausible or Umami script tag to `app/layout.tsx`
- [ ] Confirm `lib/analytics/track.ts` is actually called from relevant
      client interactions (not just defined)

### Image optimization
- [ ] Replace any raw `<img>` tags with `next/image`
- [ ] Add post cover image field to frontmatter schema

### Reading time & last-updated
- [ ] Display reading time on post cards (already computed, not yet shown)
- [ ] Add `updated` field to frontmatter alongside `date`
- [ ] Display "Last updated" on post pages when `updated` differs from `date`

### Accessibility pass
- [ ] Alt text on all images
- [ ] Visible focus states on nav links and interactive elements
- [ ] Verify contrast ratio of gray-on-navy body text meets WCAG AA

---

## 2. Add Once Real Posts Exist

- [ ] Related posts — simple tag-overlap matching, shown at bottom of post
- [ ] Social share buttons on post pages (Twitter/X, LinkedIn, copy link)
- [ ] Real author bio content on `/readme` (replace placeholder text)

---

## 3. Explicitly Deferred (v2 — do not implement yet)

- Status / uptime dashboard
- Changelog page
- Internal analytics dashboard
- Monitoring / alerting subsystem

These are already stubbed in the scaffold. Leave them as-is until the blog
has real posts and real traffic to monitor — building them out further now
just delays launch.

---

## Suggested Build Order

1. SEO essentials + 404 page (foundation, low effort)
2. Favicon set + analytics wiring (quick wins)
3. OG image generation (moderate effort, high payoff for shares)
4. Reading time / last-updated display (small UI addition)
5. Accessibility pass (ongoing, do last before launch)
6. Image optimization (only once cover images are actually added)
