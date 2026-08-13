# Design Tokens — Victor Kipruto Portfolio Audit

Extracted from live portfolio at `https://victor-kipruto-rop.github.io/victor-resum-web/` on 2026-07-14.

## Critical Finding: Accent Color Mismatch

**The portfolio uses ORANGE-RED (#c8401a / #ff4b2b), NOT GitHub green (#40c463).**

The blog-build-prompt assumed GitHub green as the accent. The portfolio's actual accent is a warm orange-red. This document captures the real portfolio tokens; the blog build prompt's green accent choice is noted as a **deliberate deviation** (may be intentional for blog differentiation).

---

## Color Palette

### CSS Variables (Dark Mode — Default)

```css
--paper:  #0a0e14  /* Background / Primary surface */
--ink:    #f5f0e8  /* Text / Foreground */
--rule:   #27272a  /* Borders / Dividers */
--accent: #c8401a  /* Primary accent — warm orange-red (primary) */
--accent: #ff4b2b  /* Secondary accent — brighter orange (hover states) */
--card:   #18181b  /* Card / Secondary surface */
--muted:  #a1a1aa  /* Secondary text / Metadata */
```

### Light Mode (Available but not primary)

```css
--paper:  #f5f0e8  /* Background */
--ink:    #0a0e14  /* Text */
--rule:   #d4cec2  /* Borders */
--accent: #c8401a  /* Accent (consistent) */
--card:   #ede8de  /* Card surface */
--muted:  #7a7060  /* Secondary text */
```

### Semantic Mapping

| Token | Hex | Use |
|-------|-----|-----|
| `--paper` | #0a0e14 | Page background, primary surface |
| `--ink` | #f5f0e8 | Body text, primary foreground |
| `--rule` | #27272a | 1px borders, dividers, subtle rules |
| `--card` | #18181b | Card backgrounds, elevated surfaces |
| `--muted` | #a1a1aa | Secondary text, labels, metadata |
| `--accent` (primary) | #c8401a | Links, focus states, call-to-action |
| `--accent` (hover) | #ff4b2b | Hover/active states on accent elements |

### Contrast Notes

- Body text on background: #f5f0e8 on #0a0e14 — **High contrast, WCAG AAA**
- Muted text on background: #a1a1aa on #0a0e14 — **Sufficient for body copy; flag for accessibility**
- Accent on white: #c8401a on white — **Good contrast**

---

## Typography

### Font Families

| Role | Font | Fallback | Weight | Notes |
|------|------|----------|--------|-------|
| **Headings** | 'DM Serif Display' | serif | 400 (default) | Large display font, spaced-out letters in H1 |
| **Body / UI** | 'Syne' | sans-serif | 400–700 | Clean, modern sans-serif for nav, buttons, body copy |
| **Monospace** | 'DM Mono' | monospace | 400 | Terminal-style labels, code blocks, metadata |

### Typography Scale

**Extracted from portfolio:**

- H1: Large display heading, spaced letter-by-letter (CSS transform or per-letter wrapping)
- H2: Section headings
- Body: Standard paragraph text
- Labels: Monospace (DM Mono), typically smaller scale for metadata

**Observation:** H1 letters are visually spaced out — likely `letter-spacing` or individual `<span>` per character.

---

## Spacing Scale

CSS Variables:

```css
--space-xs:  10px
--space-sm:  16px
--space-md:  20px
--space-lg:  24px
--space-xl:  32px
```

Common pixel values observed in inline styles:
- 6px, 8px, 10px, 12px, 16px, 20px, 24px, 32px

---

## Border Radius

Observed values:
- `4px` — Small UI elements
- `8px` — Standard cards, inputs
- `10px` — Alternative card size
- `12px` — Larger cards, panels
- `50%` — Circles, avatar containers

---

## Shadows

Observed transition patterns (indicating shadow usage):

```css
/* Common shadow transitions */
transition: box-shadow 0.25s;
transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.25s;
transition: transform 0.14s, box-shadow 0.14s;
```

**Specific shadow values not directly extracted.** Portfolio likely uses subtle shadows (0-8px blur, low opacity) on cards and hover states. Recommend inspecting `box-shadow` property on `.card`, `.button:hover` elements in DevTools for exact values.

---

## Motion / Transitions

### Duration Scale

- **Instant:** 0.12s–0.15s (micro-interactions, hover feedback)
- **Quick:** 0.2s–0.25s (button presses, small transitions)
- **Standard:** 0.3s–0.35s (card reveals, medium animations)
- **Slow:** 0.6s–0.8s (page transitions, scroll reveals)

### Easing Functions

```css
ease                                      /* Default easing */
ease-in                                   /* Accelerating */
cubic-bezier(0.16, 1, 0.3, 1)            /* Smooth spring-like (common) */
cubic-bezier(0.85, 0, 0.15, 1)           /* Slow start, fast end */
cubic-bezier(0.12s, ease)                 /* Variant */
```

### Common Transition Patterns

```css
transition: all 0.3s ease;
transition: color 0.3s ease;
transition: border-color 0.3s ease;
transition: background 0.3s ease;
transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
transition: opacity 0.6s ease;
```

---

## Component Patterns

### Terminal Tag Format

```text
// AVAILABLE FOR INTERNSHIPS · 2026
```

**Anatomy:**
- Prefix: `//` (double slash)
- Space
- Content: UPPERCASE TEXT
- Separator: ` · ` (middle dot with spaces)
- Year: `2026`

**CSS:** Applied to paragraphs with `font-family: 'DM Mono'` and `color: var(--accent)`

### Borders

- **Standard border:** 1px solid var(--rule)
- **Active/Focus border:** 2px solid var(--accent)
- **Observed usage:** Cards, inputs, interactive elements

### Buttons

**Primary button pattern:**

```css
background: var(--accent);
color: white;
border: none;
transition: background 0.3s ease;
```

**Secondary button pattern:**

```css
background: transparent;
border: 1px solid var(--rule);
color: var(--ink);
transition: border-color 0.3s ease, color 0.3s ease;
```

---

## Ambiguities & Flags

🚩 **Box-shadow values not fully extracted** — Visual inspection needed on specific components (cards, modals, hover states).

🚩 **Exact font weights beyond 400** — Portfolio may use 700 or other weights on buttons/headings; verify in production.

🚩 **Light mode visual testing** — Audit was conducted in dark mode; light mode button/link styling may have subtle differences.

🚩 **Animation easing cubic-bezier precision** — Some bezier values may have rounding; extracted values are precise to CSS output.

🚩 **Letter-spacing on H1** — Portfolio H1 has spaced-out letters; implementation unclear (CSS vs. per-character markup). Recommend checking portfolio source.

---

## Recommendations for Blog

### If matching portfolio exactly:

1. **Keep orange-red accent** (#c8401a / #ff4b2b), NOT green.
2. **Use matching typography:** DM Serif Display (headings), Syne (body), DM Mono (labels).
3. **Use CSS variables** for colors to support dark/light mode toggle.
4. **Apply spacing scale** consistently (10px, 16px, 20px, 24px, 32px).

### If intentionally differentiating blog:

1. **Keep green accent** (#40c463) as planned in build prompt.
2. **Keep Tailwind defaults** or specify contrasting typography.
3. **Note in documentation:** Blog accent intentionally differs from portfolio for visual distinction.

---

## Files to Reference

- **Portfolio GitHub:** `https://github.com/Victor-Kipruto-Rop/victor-resum-web` (if public)
- **Live site:** `https://victor-kipruto-rop.github.io/victor-resum-web/`
- **Extract date:** 2026-07-14

