# Blog Build Prompt — DataForge Log

A single, robust prompt for generating a modern, premium, sleek personal engineering
blog. Visual identity carries over from the portfolio at
`https//:victor-kipruto-rop.github.io/victor-resum-web`, reframed as a self-contained "system."

---

## 1. Project Brief

Build a personal engineering blog for **Victor Kipruto Rop (DataForge)** — a
data engineer/data science student writing about data engineering, fintech
infrastructure, and East African tech. The site should feel **premium and
professional first**, with subtle "systems/terminal" craft details second —
never a full hacker-theme gimmick.

It should feel like a natural extension of the existing portfolio site: same
visitor, zero visual whiplash when clicking Portfolio → Blog.

---

## 2. Design System

### Color palette
- Background: near-black / charcoal (`#0a0e0f` – `#0d1117` range)
- Text: white / light gray, high contrast
- Accent: single GitHub-green (`#40c463`) — used sparingly for links, hover
  states, status indicators, chart bars
- Borders: 1px, low-opacity gray (`rgba(255,255,255,0.08)` range)

### Typography
- Body: clean sans-serif (Inter or similar)
- Metadata/labels/code only: monospace (JetBrains Mono / Fira Code) —
  reserved for dates, tags, terminal UI, code blocks. Not the whole site.

### Texture & motion
- Subtle dot/grid background texture, very low opacity
- Rounded corners: 8–12px on cards
- Hover states: border brightens to accent green, slight lift/shadow
- Scroll-triggered fade/slide-in on sections
- Animated underline on nav link hover
- Small pulsing "online" status dot near the brand mark

### Signature detail
- Small uppercase/monospace "tag" line above section headings, echoing the
  portfolio's `// AVAILABLE FOR INTERNSHIPS · 2026` style
  — e.g. `// LATEST POST`, `// SYSTEM ONLINE`, `// ALL POSTS`

---

## 3. Page Structure

1. **Header**
   - Brand mark (DataForge) + avatar
   - Nav: Home · Posts · Tags · Search · Readme · Status
   - Pulsing green "online" indicator

2. **Hero**
   - One-line intro + terminal-style tag
   - Primary CTA: "Read Latest Post"
   - Secondary CTA: "Subscribe"

3. **Featured Post**
   - Large card, cover image/treatment
   - Metadata row in monospace: `date · read time · tags`

4. **Post Index**
   - Dense, scannable list/card-table hybrid: date, title, tags, read time
   - Mirrors the portfolio's project-list clarity

5. **Tag Cloud**
   - Pill-style tags, glow to accent green on hover

6. **GitHub Activity Strip**
   - Real contribution chart embed (green palette), not decorative filler

7. **Subscribe Section**
   - Clean inline email form
   - Optional: feed/email/Telegram-style subscribe options, matching the
     portfolio's existing "Subscribe for Updates" modal pattern

8. **Footer**
   - Social links (Email, GitHub, LinkedIn)
   - Copyright + "Built with Next.js" credit line

---

## 4. Tone & Voice

- Premium, confident, understated — not flashy
- Terminal/monospace touches are craft details, not the whole aesthetic
- Content-first: typography and spacing do the work, color accents are used
  sparingly and with intent

---

## 5. Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Content:** MDX for posts
- **Animation:** Framer Motion (scroll reveals, hover transitions)
- **Search:** Fuse.js (client-side)
- **Feed:** RSS via `feed` package

---

## 6. Before Locking the Palette

The exact hex values and spacing here are reconstructed from visible signals
on the portfolio (GitHub chart green, terminal-style tag, dark theme
conventions) — do a quick visual diff against the live portfolio before
finalizing colors, to make sure the blog matches pixel-for-pixel rather than
just in spirit.
