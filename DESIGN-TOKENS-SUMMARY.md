# Audit Summary: Blog Design Tokens

**Quick Reference**

## Portfolio vs Blog: Key Differences

```
PORTFOLIO (Real)           BLOG (Current)              DECISION
─────────────────────────────────────────────────────────────────
Accent: #c8401a (orange)   Accent: #3ddc97 (green)     ⚠️ Different
BG: #0a0e14                BG: #0a0e1a                 ⚠️ Close but different
Fonts: DM Serif/Syne/Mono  Fonts: Tailwind defaults    ❌ Not matching
Spacing: 10–32px scale     Spacing: Tailwind (4–96px)  ⚠️ Not aligned
Terminal tag: YES          Terminal tag: NO            ❌ Missing on blog
```

## Critical Finding

**The portfolio uses ORANGE-RED (#c8401a), NOT green (#40c463).**

The blog's green accent was an assumption in the build prompt and is **intentionally different** from the portfolio. This creates visual disconnect when users switch between portfolio and blog.

## Design Token Files

| File | Purpose |
|------|---------|
| `tokens.md` | Detailed extraction of all portfolio design tokens |
| `design-audit.md` | Comprehensive audit with 3 implementation options |
| `tailwind.config.portfolio-match.ts` | Tailwind config to match portfolio exactly |
| `tailwind.config.current-blog.ts` | Reference: current blog's green config |

## Recommended Decision

Three options (pick one):

### 🎯 Option A: Match Portfolio (Recommended)
- **Goal:** "Same visitor, zero visual whiplash"
- **Changes:** Colors, fonts, spacing, terminal tags
- **Effort:** 3–4 hours
- **Result:** Seamless brand experience

### 🎨 Option B: Keep Blog Distinct  
- **Goal:** Blog has own identity
- **Changes:** None
- **Effort:** 0 hours
- **Result:** Visual disconnect (not recommended)

### 🔄 Option C: Hybrid  
- **Goal:** Some matching, keep green accent
- **Changes:** Spacing, fonts, terminal tags (keep green)
- **Effort:** 1–2 hours  
- **Result:** Partial consistency

## Portfolio Design Tokens (Exact)

### Colors
```
Dark mode (default):
  --paper:  #0a0e14  (background)
  --ink:    #f5f0e8  (text)
  --rule:   #27272a  (borders)
  --accent: #c8401a  (primary accent — orange-red)
  --card:   #18181b  (secondary surface)
  --muted:  #a1a1aa  (secondary text)
```

### Fonts
```
  Display:  'DM Serif Display', serif
  Body:     'Syne', sans-serif
  Mono:     'DM Mono', monospace
```

### Spacing
```
  xs: 10px
  sm: 16px
  md: 20px
  lg: 24px
  xl: 32px
```

### Border Radius
```
  sm: 4px
  base: 8px
  md: 10px
  lg: 12px
  full: 50%
```

### Motion
```
  Durations: 0.12s, 0.2s, 0.3s, 0.6s, 0.8s
  Easing: ease, cubic-bezier(0.16, 1, 0.3, 1)
```

### Terminal Tag Format
```
// AVAILABLE FOR INTERNSHIPS · 2026
├─ //      (double slash)
├─ CAPS    (uppercase text)
├─ ·       (middle dot separator)
└─ 2026    (year)
```

## Implementation Checklist (if choosing Option A or C)

- [ ] Decide: Match (A), Distinct (B), or Hybrid (C)
- [ ] Update `tailwind.config.ts` with new color/spacing tokens
- [ ] Add font imports (DM Serif Display, Syne, DM Mono) to `app/layout.tsx`
- [ ] Update accent color references in components
- [ ] Add terminal tag format to hero/featured sections
- [ ] Test colors, spacing, shadows in browser
- [ ] Verify accessibility (contrast ratios)
- [ ] Run `npm run build` to ensure no breaking changes

## Ambiguities Requiring Manual Inspection

- 🚩 Exact box-shadow values on portfolio cards
- 🚩 Font weights beyond 400 on headings/buttons
- 🚩 H1 letter-spacing implementation (CSS vs. markup)
- 🚩 Animation trigger points (scroll, hover)

## Next Step

**Recommend:** Review `design-audit.md` for full context, decide on implementation option, then proceed with component updates.

