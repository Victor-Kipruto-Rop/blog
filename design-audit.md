# Design Audit Report: Blog vs Portfolio

**Date:** 2026-07-14  
**Portfolio URL:** https://victor-kipruto-rop.github.io/victor-resum-web/  
**Blog Branch:** /home/kipruto/Desktop/blog

---

## Executive Summary

The blog's current design intentionally diverges from the portfolio:

| Aspect | Portfolio | Blog (Current) | Status |
|--------|-----------|--------|--------|
| **Accent Color** | #c8401a (orange-red) | #3ddc97 (green) | ✅ Intentional difference |
| **Background** | #0a0e14 | #0a0e1a | ⚠️ Slightly different |
| **Text** | #f5f0e8 | N/A (Tailwind default) | ⚠️ Different palette |
| **Borders** | #27272a | #1c2438 | ⚠️ Different values |
| **Typography** | DM Serif Display / Syne / DM Mono | Tailwind defaults + monospace | ⚠️ Not matching |
| **Terminal Tag** | `// AVAILABLE FOR... · 2026` | Not yet implemented | ❌ Missing on blog |

---

## Color Audit

### Portfolio Colors (Confirmed)

**Dark Mode (Primary):**
```
--paper:  #0a0e14  ← Background
--ink:    #f5f0e8  ← Text
--rule:   #27272a  ← Borders
--accent: #c8401a  ← Orange-red (primary)
--accent: #ff4b2b  ← Orange (hover)
--card:   #18181b  ← Secondary bg
--muted:  #a1a1aa  ← Secondary text
```

### Blog Colors (Current)

```
bg:      #0a0e1a  ← Background (1 shade darker than portfolio)
text:    (Tailwind: white / gray-200)
accent:  #3ddc97  ← GitHub green (NOT portfolio orange)
border:  #1c2438  ← Borders (lighter than portfolio)
panel:   #0f1524  ← Secondary bg
```

### Comparison

**Accent Color Mismatch:**
- Portfolio: `#c8401a` (warm orange-red)
- Blog: `#3ddc97` (cool green)
- **Impact:** Completely different visual identity and brand consistency

**Background Difference:**
- Portfolio: `#0a0e14`
- Blog: `#0a0e1a`
- **Impact:** 6-shade difference; creates visual disconnect when switching between sites

**Border Difference:**
- Portfolio: `#27272a` (slightly warmer gray)
- Blog: `#1c2438` (cooler, slightly bluer gray)
- **Impact:** Subtle but noticeable in side-by-side comparison

---

## Typography Audit

### Portfolio Typography Stack

| Use | Font | Weight | Notes |
|-----|------|--------|-------|
| Display / Headings | 'DM Serif Display' | 400 | Elegant serif, spaced-out letters |
| Body / UI | 'Syne' | 400–700 | Modern sans-serif, warm feel |
| Metadata / Code | 'DM Mono' | 400 | Terminal-style, monospace |

### Blog Typography Stack

| Use | Font | Weight | Notes |
|-----|------|--------|-------|
| Display / Headings | Tailwind default (sans-serif) | 400–700 | No serif font loaded |
| Body / UI | Tailwind default (sans-serif) | 400–700 | No 'Syne' font loaded |
| Metadata / Code | Custom `--font-mono` | 400 | Generic monospace fallback |

### Impact

- **No serif display font:** Blog headings use sans-serif; portfolio uses distinctive serif
- **No 'Syne' font:** Blog uses generic sans-serif; portfolio has branded body font
- **Monospace:** Both use monospace for metadata, but blog's is generic

---

## Spacing & Layout

### Portfolio Spacing Scale
```css
--space-xs:  10px
--space-sm:  16px
--space-md:  20px
--space-lg:  24px
--space-xl:  32px
```

### Blog Spacing
- Tailwind defaults (0.25rem, 0.5rem, 1rem, 1.5rem, 2rem, etc.)
- Not aligned with portfolio scale

### Border Radius
- Portfolio: 4px, 8px, 10px, 12px, 50%
- Blog: Tailwind defaults (0.25rem, 0.375rem, 0.5rem, 0.75rem, etc.)

---

## Motion / Animation

### Portfolio Animation Patterns
```css
0.12s–0.15s  → Micro-interactions
0.2s–0.25s   → Quick transitions
0.3s–0.35s   → Standard transitions
0.6s–0.8s    → Page/scroll reveals

Easing: ease, ease-in, cubic-bezier(0.16, 1, 0.3, 1)
```

### Blog Animation
- Not yet implemented in audit

---

## Terminal Tag Pattern

### Portfolio Format
```
// AVAILABLE FOR INTERNSHIPS · 2026
```

**Breakdown:**
- `//` (double slash, no space after)
- Space
- `AVAILABLE FOR INTERNSHIPS` (uppercase)
- ` · ` (middle dot, spaced)
- `2026` (year)

**Styling:**
- Font: 'DM Mono' (monospace)
- Color: #c8401a or #ff4b2b (orange-red accent)
- Size: Small, typically 12–14px

### Blog Implementation
- **Status:** Not yet on blog homepage
- **Recommendation:** Add to hero or featured section with terminal tag pattern

---

## Recommendations

### Option A: Match Portfolio (Full Alignment)

**Pros:**
- Consistent brand experience across portfolio & blog
- Builds trust ("same designer" signal)
- Portfolio has proven, polished design

**Cons:**
- Requires font imports (DM Serif Display, Syne, DM Mono)
- Need to adjust colors from green to orange-red
- May feel less "blog-like" (more portfolio-extension)

**Work:**
1. Replace `tailwind.config.ts` with values from `tailwind.config.portfolio-match.ts`
2. Add font imports for DM Serif Display, Syne, DM Mono to `app/layout.tsx`
3. Update color references in components (esp. accent from green → orange)
4. Verify shadows, spacing scale, border-radius across all components
5. Test motion transitions

**Estimated effort:** 3–4 hours

---

### Option B: Keep Blog Distinct (Current Path)

**Pros:**
- Blog has its own identity
- Green accent may better align with "tech blog" expectations
- Fewer changes to current codebase

**Cons:**
- Visual disconnect when switching from portfolio to blog
- Doesn't feel like a natural extension of portfolio
- Contradicts the build prompt's goal: *"same visitor, zero visual whiplash"*

**Work:**
- Continue with current setup
- Consider documenting the intentional difference in blog README
- Monitor user feedback on brand consistency

**Estimated effort:** 0 hours (no changes)

---

### Option C: Hybrid (Partial Match)

**Pros:**
- Keep green accent (distinct from portfolio)
- Match some other elements (spacing, border-radius, terminal-tag format)
- Easier than full match, still improves consistency

**Cons:**
- Half-measures often feel inconsistent
- Still requires font imports for best look

**Work:**
1. Keep green accent (#3ddc97)
2. Adopt portfolio spacing scale (10px, 16px, 20px, 24px, 32px)
3. Add DM Mono for terminal/monospace styling
4. Sync border-radius scale
5. Keep background close to portfolio (#0a0e14 or #0a0e1a)

**Estimated effort:** 1–2 hours

---

## Decision Matrix

| Consideration | Option A (Match) | Option B (Distinct) | Option C (Hybrid) |
|---------------|------------------|-------------------|------------------|
| Brand consistency | ✅ Perfect | ❌ None | ⚠️ Partial |
| Implementation effort | ⚠️ High | ✅ None | ⚠️ Medium |
| Visual whiplash | ✅ None | ❌ High | ⚠️ Moderate |
| Aligns with build prompt | ✅ Yes | ❌ No | ⚠️ Partially |
| Tech-blog aesthetic | ⚠️ Professional | ✅ Modern | ⚠️ Mixed |

---

## Ambiguities Flagged

🚩 **Exact shadow values:** Portfolio shadows not fully extracted; requires DevTools inspection on live site

🚩 **Font weights:** Portfolio may use 700+ on buttons/headings; not fully documented

🚩 **Letter-spacing on H1:** Portfolio H1 has spaced-out letters; CSS vs. markup implementation unclear

🚩 **Light mode:** Audit focused on dark mode; light mode styling may have subtle differences

🚩 **Animation details:** Portfolio animation triggers (scroll, hover, etc.) not fully documented

---

## Files Generated

1. **tokens.md** — Full design token extraction
2. **tailwind.config.portfolio-match.ts** — Config to match portfolio exactly
3. **tailwind.config.current-blog.ts** — Reference: current blog config
4. **design-audit.md** (this file) — Decision framework and recommendations

---

## Next Steps

**Recommend:** Pick Option A or C before finalizing additional homepage components.

If Option A: Update tailwind.config immediately, test colors in browser, iterate.  
If Option B or C: Document decision and finalize current green palette.

