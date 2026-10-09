# Product UI Design & Color Specification

## FinCalc Pro — Smart Financial Calculators for India

**Version:** 2.1  
**Date:** October 9, 2026  
**Status:** Active  
**Design Lead:** patakrishna2006-a11y

**Source of truth:** `static/style.css` (CSS custom properties). This document is the human-readable specification of the implemented design system. Where a value is listed here, it exists in code.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Brand Identity](#2-brand-identity)
3. [Token Architecture](#3-token-architecture)
4. [Color System — Semantic Tokens](#4-color-system--semantic-tokens)
5. [Theme Palettes (5 Themes × 2 Modes)](#5-theme-palettes)
6. [Semantic & Status Colors](#6-semantic--status-colors)
7. [Gradients & Background Environment](#7-gradients--background-environment)
8. [Typography](#8-typography)
9. [Spacing, Radius & Blur](#9-spacing-radius--blur)
10. [Elevation: Shadows & Glows](#10-elevation-shadows--glows)
11. [Motion & Transitions](#11-motion--transitions)
12. [Layout & Z-Index](#12-layout--z-index)
13. [Component Color Specifications](#13-component-color-specifications)
14. [Chart Palette](#14-chart-palette)
15. [Accessibility & Contrast](#15-accessibility--contrast)
16. [Usage Rules — Do's & Don'ts](#16-usage-rules--dos--donts)
17. [Token Quick Reference](#17-token-quick-reference)

---

## 1. Design Philosophy

| Principle | Expression in the system |
|-----------|--------------------------|
| **Glass & depth** | Semi-transparent surfaces + backdrop blur + layered radial glows create hierarchy without heavy borders |
| **One accent family per theme** | Every theme owns a tight 3-hue accent ramp (primary/secondary/tertiary); status colors are theme-independent |
| **Tokens, not values** | Components consume CSS variables only; raw hex values are forbidden in component CSS |
| **Dark-first, light-parity** | Dark is the default canvas; light mode re-derives every token so no component needs mode-specific rules (with rare documented exceptions) |
| **Motion with restraint** | Fast transitions (≤280ms) for feedback; spring easing only for playful micro-interactions; full `prefers-reduced-motion` opt-out |
| **Accessible by construction** | Light-mode accents are darkened (not just dark accents reused) to hold ≥4.5:1 on light surfaces |

---

## 2. Brand Identity

### 2.1 Logo Lockup

| Element | Spec |
|---------|------|
| Logo mark | 44×44px rounded square (14px radius), gradient `#6c8cff → #b388ff` (135°), white glyph, layered shadow + inset |
| Wordmark | "Fin**Calc**Pro" — 800 weight, white; the "Calc" segment uses `--accent-primary`; subtext "Dashboard" in 0.7rem uppercase, letterspaced, `--text-muted` |
| Hover motion | Mark rotates −8° and scales 1.05 (spring) |
| Tagline | *Your financial future, calculated.* |

### 2.2 Mark Colors

| Token | Value | Use |
|--------|-------|-----|
| Indigo | `#6c8cff` | Brand primary — logo, links, focus rings, default accent |
| Violet | `#b388ff` | Brand secondary — logo gradient end, hero gradient |
| Teal | `#4dd0e1` | Brand tertiary — calculate action, data highlights |

---

## 3. Token Architecture

Tokens are CSS custom properties, set on `:root` (dark default) and re-declared by two independent attributes:

```
[data-theme="indigo|green|orange|purple|teal"]        ← hue family
[data-color-scheme="dark|light"]                      ← surface polarity
```

**Naming convention:**

```
--{category}-{role}[-{variant}][-rgb]
```

| Category | Examples |
|----------|----------|
| `bg` | `--bg-primary`, `--bg-secondary`, `--bg-tertiary` |
| `surface` | `--surface`, `--surface-strong`, `--surface-glass`, `--surface-glass-hover` |
| `border` | `--border-glass`, `--border-glass-strong`, `--border-soft` |
| `text` | `--text-primary`, `--text-secondary`, `--text-muted` |
| `accent` | `--accent-primary`, `--accent-secondary`, `--accent-tertiary`, `--accent-gold`, `--accent-success`, `--accent-warning`, `--accent-danger`, `--accent-pink` |
| `glow` | `--glow-primary` … `--glow-gold` |
| `shadow` | `--shadow-soft`, `--shadow-medium`, `--shadow-heavy`, `--shadow-inset` |
| `radius` | `--radius-sm|md|lg|xl|pill` |
| `transition` | `--transition-fast`, `--transition`, `--transition-slow`, `--transition-spring` |
| `blur` | `--blur-sm|md|lg|xl` |
| `z` | `--z-bg|base|elevated|nav|toast|modal` |

**RGB twins:** every accent exposes `-rgb` (e.g. `--accent-primary-rgb: 108, 140, 255`) for composing alpha colors: `rgba(var(--accent-primary-rgb), 0.18)`.

**Preference storage:** theme persists at `localStorage['fincalc-theme']` (values `indigo|green|orange|purple|teal`, default `indigo`), scheme at `localStorage['fincalc-color-scheme']` (values `dark|light`, default `dark`). Both re-apply on load. The `<meta name="theme-color">` element is kept in sync with the active theme's `--bg-primary` (dark map: `#060814/#051a0f/#1a0f05/#10051a/#051a1f`; light map: `#f8fafc/#f0fdf4/#fff7ed/#faf5ff/#f0fdfa`). `theme-switching` / `color-scheme-switching` classes temporarily kill transitions during the swap.

---

## 4. Color System — Semantic Tokens

### 4.1 Dark Mode (default `:root` — Midnight Indigo)

| Token | Value | Role |
|-------|-------|------|
| `--bg-primary` | `#060814` | Page canvas |
| `--bg-secondary` | `#0a0f22` | Raised panels, dropdowns |
| `--bg-tertiary` | `#0e1530` | Highest fixed surface |
| `--surface` | `rgba(255,255,255,0.04)` | Input fill |
| `--surface-strong` | `rgba(255,255,255,0.08)` | Emphasized fill |
| `--surface-glass` | `rgba(255,255,255,0.06)` | Cards, header, modals |
| `--surface-glass-hover` | `rgba(255,255,255,0.10)` | Hover fill on glass |
| `--border-glass` | `rgba(255,255,255,0.10)` | Default border |
| `--border-glass-strong` | `rgba(255,255,255,0.16)` | Hover/active border |
| `--border-soft` | `rgba(255,255,255,0.06)` | Hairline dividers |
| `--text-primary` | `#f5f7ff` | Headings, values |
| `--text-secondary` | `rgba(245,247,255,0.72)` | Body, labels |
| `--text-muted` | `rgba(245,247,255,0.50)` | Captions, placeholders |
| `--accent-primary` | `#6c8cff` (rgb 108,140,255) | Primary interactive |
| `--accent-secondary` | `#b388ff` (rgb 179,136,255) | Secondary interactive |
| `--accent-tertiary` | `#4dd0e1` (rgb 77,208,225) | Calculate action |
| `--accent-gold` | `#ffd166` (rgb 255,209,102) | Highlights, premium chips |
| `--accent-success` | `#2ee59d` (rgb 46,229,157) | Success states |
| `--accent-warning` | `#ffb454` (rgb 255,180,84) | Warning states |
| `--accent-danger` | `#ff5c7a` (rgb 255,92,122) | Destructive/error |
| `--accent-pink` | `#ff7ab8` | Hero gradient terminus |

**Text on glass (dark):** all text tokens are the same hue as the canvas tint — light text at descending opacity (100% → 72% → 50%) over white-alpha glass.

### 4.2 Light Mode (Midnight Indigo)

| Token | Value | Change strategy |
|-------|-------|-----------------|
| `--bg-primary` | `#f8fafc` | Slate-tinted paper |
| `--bg-secondary` | `#ffffff` | Panels |
| `--bg-tertiary` | `#f1f5f9` | Sunken areas |
| `--surface` | `rgba(0,0,0,0.04)` | **Alpha polarity flips** (black-alpha) |
| `--surface-strong` | `rgba(0,0,0,0.08)` | |
| `--surface-glass` | `rgba(0,0,0,0.05)` | |
| `--surface-glass-hover` | `rgba(0,0,0,0.08)` | |
| `--border-glass` | `rgba(0,0,0,0.08)` | |
| `--border-glass-strong` | `rgba(0,0,0,0.12)` | |
| `--border-soft` | `rgba(0,0,0,0.05)` | |
| `--text-primary` | `#0f172a` | Slate-900 |
| `--text-secondary` | `rgba(15,23,42,0.72)` | Same opacity ladder |
| `--text-muted` | `rgba(15,23,42,0.50)` | |
| `--accent-primary` | `#3b2f9b` (rgb 59,47,155) | **Darkened** for 4.5:1 on paper |
| `--accent-secondary` | `#5b21b6` (rgb 91,33,182) | |
| `--accent-tertiary` | `#0e7490` (rgb 14,116,144) | |
| `--accent-gold` | `#b45309` (rgb 180,83,9) | |
| `--accent-success` | `#15803d` (rgb 21,128,61) | |
| `--accent-warning` | `#c27300` (rgb 194,115,0) | |
| `--accent-danger` | `#b91c1c` (rgb 185,28,28) | |
| `--accent-pink` | `#be185d` | |

> **Rule:** light mode never reuses dark accents. Each hue gets a WCAG-tuned darker variant (Tailwind-700/800-range values), and glows soften from 0.35 → 0.25 max alpha.

---

## 5. Theme Palettes

Five hue families. Only canvas tints, text, and the 3 brand accents change; surfaces, borders, and status colors derive from the mode (Section 4).

### 5.1 Dark Palettes

| Token | 🌌 Midnight Indigo *(default)* | 🌲 Forest Green | 🌅 Sunset Orange | 👑 Royal Purple | 🌊 Ocean Teal |
|-------|----------|----------|----------|----------|----------|
| `--bg-primary` | `#060814` | `#051a0f` | `#1a0f05` | `#10051a` | `#051a1f` |
| `--bg-secondary` | `#0a0f22` | `#082618` | `#261808` | `#1a0826` | `#082633` |
| `--bg-tertiary` | `#0e1530` | `#0b3320` | `#33200b` | `#260b33` | `#0b3347` |
| `--text-primary` | `#f5f7ff` | `#f0fff5` | `#fff8f0` | `#faf0ff` | `#f0fdff` |
| `--accent-primary` | `#6c8cff` | `#2ee59d` | `#ffb454` | `#b388ff` | `#4dd0e1` |
| `--accent-primary-rgb` | 108,140,255 | 46,229,157 | 255,180,84 | 179,136,255 | 77,208,225 |
| `--accent-secondary` | `#b388ff` | `#1de9b6` | `#ff9f1c` | `#a855f7` | `#06b6d4` |
| `--accent-tertiary` | `#4dd0e1` | `#69f0ae` | `#ffcc80` | `#d8b4fe` | `#67e8f9` |

### 5.2 Light Palettes

| Token | 🌤 Indigo Light | 🍃 Green Light | ☀️ Orange Light | 💜 Purple Light | 💧 Teal Light |
|-------|----------|----------|----------|----------|----------|
| `--bg-primary` | `#f8fafc` | `#f0fdf4` | `#fff7ed` | `#faf5ff` | `#f0fdfa` |
| `--bg-secondary` | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` | `#ffffff` |
| `--bg-tertiary` | `#f1f5f9` | `#dcfce7` | `#ffedd5` | `#f3e8ff` | `#ccfbf1` |
| `--text-primary` | `#0f172a` | `#052e16` | `#3b1400` | `#2e004d` | `#042f2e` |
| `--accent-primary` | `#3b2f9b` | `#166534` | `#c27300` | `#5b21b6` | `#0f766e` |
| `--accent-primary-rgb` | 59,47,155 | 22,101,52 | 194,115,0 | 91,33,182 | 15,118,110 |
| `--accent-secondary` | `#5b21b6` | `#0f766e` | `#b45309` | `#7e22ce` | `#0d9488` |
| `--accent-tertiary` | `#0e7490` | `#15803d` | `#ea580c` | `#be185d` | `#0891b2` |

### 5.3 Theme Selector Dots

The picker swatch uses the theme's **dark-mode primary** in both modes (fixed values, not tokens): indigo `#6c8cff` · green `#2ee59d` · orange `#ffb454` · purple `#b388ff` · teal `#4dd0e1`.

---

## 6. Semantic & Status Colors

Status colors are **mode-dependent but theme-independent** (same values across all 5 themes in a given mode).

| Status | Dark | Light | Dark border/glow alpha | Used for |
|--------|------|-------|------------------------|-----------|
| Success | `#2ee59d` | `#15803d` | 0.45 | Toast-success, verified badge, positive deltas |
| Warning | `#ffb454` | `#c27300` | 0.45 | Unverified badge, caution copy |
| Danger | `#ff5c7a` | `#b91c1c` | 0.45 | Errors, destructive buttons, delete/logout actions |
| Info | `--accent-primary` per theme | same | 0.45 | Info toasts |
| Gold | `#ffd166` | `#b45309` | 0.35 | Premium/feature chips (e.g. "NEW" clip) |

**Status fill recipe:** `rgba(var(--accent-*-rgb), 0.08–0.14)` background + `0.35–0.45` border + full-strength text. Never use status colors as large fills.

---

## 7. Gradients & Background Environment

### 7.1 Brand Gradients

| Gradient | Stops (135°) | Applied to |
|----------|--------------|------------|
| **Primary** | `#6c8cff → #b388ff` | Logo mark, `btn-primary`, `btn-auth`, avatars (uses `--accent-primary → --accent-secondary` in code) |
| **Calculate** | `rgba(108,140,255,0.95) → rgba(77,208,225,0.95)` with text `#051020` | `btn-calc` (deliberately dark text on bright teal terminus) |
| **Hero highlight** | `--accent-primary → --accent-secondary → --accent-pink` | Hero headline text (background-clip) |
| **Gold clip** | `#ffd166 → #ff8a00`, text `#1a1300` | Feature-card "NEW" badge |
| **Profile card top** | `rgba(primary,0.14) → rgba(secondary,0.10)` | Dropdown header wash |

### 7.2 Page Background Stack (dark)

```
1. radial 80×60% @ 20% 10%  rgba(108,140,255,0.18)
2. radial 70×50% @ 90% 30%  rgba(179,136,255,0.15)
3. radial 60×50% @ 50% 100% rgba(77,208,225,0.10)
4. linear 180°  --bg-primary → --bg-secondary
```
Plus a **fixed 56px grid overlay** (`rgba(255,255,255,0.025)` lines, radially masked) and three drifting blurred orbs (purple/blue/teal, 32–44s loops, `blur(80px)`, opacity 0.55, sized down at 480/360/320px). Light mode replaces the stack with pale tints of the same hues.

---

## 8. Typography

| Attribute | Value |
|-----------|-------|
| Primary face | **Inter** (dashboard, `index.html`) — weights 300–900 |
| Fallback stack | `'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif` |
| Loading | Google Fonts, `preconnect` + `display=swap` |
| Base size / lh | 16px / 1.6 |
| Rendering | Antialiased, `optimizeLegibility` |

### 8.1 Fluid Scale (`clamp()`)

| Role | Size | Weight | Notes |
|------|------|--------|-------|
| `h1` / hero title | `clamp(2.4rem, 5vw, 4.4rem)` hero; `clamp(2.2rem, 4.5vw, 4rem)` base | 800 | `letter-spacing: -0.03em` hero |
| `h2` | `clamp(1.8rem, 3.2vw, 2.6rem)` | 700 | Section headers, `lh 1.15` |
| `h3` | `clamp(1.3rem, 2vw, 1.6rem)` | 700 | Card titles |
| `h4` | `clamp(1.05rem, 1.4vw, 1.2rem)` | 600 | Feature titles |
| Body | 1rem, `lh 1.7` | 400 | `--text-secondary` |
| Small | 0.875rem | 400 | `--text-muted` |
| Micro (badges, labels) | 0.70–0.82rem | 500–600 | Labels 0.82rem; badges 0.7rem `+0.10em` tracking uppercase |
| Buttons | 0.95rem (large 1rem) | 600–700 | `+0.01em` tracking |
| Result values | 0.95rem grid; headline emphasized | 600 | Indian format `₹1,00,000.00` |

**Heading color:** all headings use `--text-primary`; body copy uses `--text-secondary` — never lower than `--text-muted` for content.

---

## 9. Spacing, Radius & Blur

**Spacing scale (4px base):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64. Sections use `clamp(3rem, 6vw, 5.5rem)` vertical padding; containers `clamp(1rem, 3vw, 1.5rem)` gutters; grid gap `1rem` (fields) / `1.5rem` (cards).

| Radius token | Value | Applied to |
|--------------|-------|------------|
| `--radius-sm` | 10px | Rows, small buttons, inputs in modals |
| `--radius-md` | 14px | Inputs, toasts |
| `--radius-lg` | 20px | Cards, header, modals, dropdowns |
| `--radius-xl` | 28px | Large feature surfaces |
| `--radius-pill` | 999px | Buttons, chips, status pills, avatars |

| Blur token | Value | Applied to |
|------------|-------|------------|
| `--blur-sm` | 8px | Inputs |
| `--blur-md` | 18px | Secondary buttons, toasts |
| `--blur-lg` | 28px | Glass cards, header (with `saturate(150–160%)`) |
| `--blur-xl` | 40px | Page-transition overlay |

---

## 10. Elevation: Shadows & Glows

| Token | Dark | Light |
|-------|------|-------|
| `--shadow-soft` | `0 8px 32px rgba(2,6,23,0.40)` | `0 8px 32px rgba(2,6,23,0.08)` |
| `--shadow-medium` | `0 14px 40px rgba(2,6,23,0.55)` | `0 14px 40px rgba(2,6,23,0.12)` |
| `--shadow-heavy` | `0 24px 70px rgba(2,6,23,0.65)` | `0 24px 70px rgba(2,6,23,0.15)` |
| `--shadow-inset` | `inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.30)` | `inset 0 1px 0 rgba(255,255,255,0.80), inset 0 -1px 0 rgba(0,0,0,0.05)` |

**Glows (dark, 40px blur):** primary `rgba(108,140,255,0.35)` · secondary `0.30` · tertiary `0.30` · gold `0.35`. Light mode halves these (0.25/0.20/0.20/0.25). Glow = hover/active reward on cards, buttons, and focus; never resting state.

**Elevation recipe:** glass surfaces combine `--shadow-soft` + `--shadow-inset`; hover upgrades to `--shadow-heavy` + inset + theme glow.

---

## 11. Motion & Transitions

| Token | Duration / Easing | Use |
|-------|--------------------|-----|
| `--transition-fast` | 160ms `cubic-bezier(0.4,0,0.2,1)` | Hover, focus, toast enter |
| `--transition` | 280ms `cubic-bezier(0.22,0.61,0.36,1)` | Modals, drawers, theme swap |
| `--transition-slow` | 520ms same | Page-level transitions |
| `--transition-spring` | 420ms `cubic-bezier(0.34,1.56,0.64,1)` | Playful pops (logo tilt, hover lift) |

**Signature motions:** button hover `translateY(-3px) scale(1.02)` → active `translateY(1px) scale(0.98)` · card hover `translateY(-6px)` + glow · dropdown enter `translateY(-8px) scale(0.97) → none` · toast slide-in-right with spring · chart fade-up on load.

**Reduced motion — mandatory:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 12. Layout & Z-Index

| Token | Value | Note |
|-------|-------|------|
| `--max-width` | 1280px | Container cap |
| `--sidebar-width` | 280px | Collapses to drawer < 768px |
| `--header-height` | 72px | Sticky, 16px offset, radius-lg glass |

| Z-scale | Value | Layer |
|---------|-------|-------|
| `--z-bg` | 0 | Orbs, grid overlay |
| `--z-base` | 1 | Content |
| `--z-elevated` | 10 | Floating chips |
| `--z-nav` | 100 | Sticky header (dropdowns +50) |
| `--z-toast` | 1000 | Toasts |
| `--z-modal` | 2000 | Modals, page transition |

**Selection color:** `rgba(108,140,255,0.40)` with white text. **Scrollbars:** 6px, `rgba(108,140,255,0.3)` thumb (thin).

---

## 13. Component Color Specifications

### 13.1 Buttons

| Variant | Fill | Text | Border | Hover | Active |
|---------|------|------|--------|-------|--------|
| `btn-primary` | Primary gradient | `#fff` | `rgba(255,255,255,0.20)` + inner gloss | lift −3px, glow `rgba(108,140,255,0.55)` + shine sweep | press +1px |
| `btn-secondary` | `--surface-glass` + `--blur-md` | `--text-primary` | `--border-glass-strong` | violet border `0.55` + gradient underlay | press |
| `btn-outline` | transparent | `--text-primary` | `--border-glass-strong` | glass fill + primary border `0.65` | press |
| `btn-auth` | Primary gradient, full-width, 1rem pad | `#fff` | as primary | as primary | as primary |
| `btn-calc` | Indigo→teal gradient | **`#051020`** (dark text) | `rgba(255,255,255,0.30)` | teal glow `0.50` | press |
| Danger (logout/delete confirm) | `rgba(--accent-danger-rgb,0.10)` | `--accent-danger` | `rgba(...,0.35)` | solid `--accent-danger` fill, white text, glow `0.40` | press |

Shared: `min-height 44px` (touch target), `--radius-pill`, focus ring `outline 2px --accent-primary, offset 3px`, gloss `::before` on top 50%, loading state (spinner + `pointer-events:none`, opacity 0.7).

### 13.2 Inputs

| State | Border | Fill | Shadow |
|-------|--------|------|--------|
| Default | `--border-glass` | `--surface` | inset depth `rgba(0,0,0,0.30)` |
| Hover | `--border-glass-strong` | `--surface-glass` | — |
| Focus | `rgba(108,140,255,0.70)` | `--surface-glass` | inset + `0 0 0 4px rgba(108,140,255,0.18)` + 30px glow, lift −1px |
| Error | danger border + shake animation | — | — |

Selects render native-looking chevrons via CSS gradients; `select option` uses `#1e293b` on `#f9f8f8`. Autofill is forced to theme colors. Toggle-password icon sits 14px from right.

### 13.3 Cards & Surfaces

| Component | Recipe |
|-----------|--------|
| `.card` / `.calc-card` | `--surface-glass` + `--blur-md` `saturate(150%)` + `--border-glass` + soft/inset shadows; gloss `::before` at 10% white (dark); hover lifts + glow |
| Header | `rgba(8,12,28,0.55)` fixed glass + `--blur-lg` saturate(160%) + top hairline gradient `rgba(255,255,255,0.18)` |
| Badge | gradient wash `rgba(108,140,255,0.20)→rgba(179,136,255,0.20)`, text `--accent-primary`, border `0.30`, 0.7rem uppercase |
| Toast success | border `rgba(46,229,157,0.45)` + triple shadow incl. 30px green glow |
| Toast error/danger | border `rgba(255,92,122,0.45)` + red glow |
| Toast info | border `rgba(108,140,255,0.45)` + indigo glow |

### 13.4 Profile & Status

| Element | Spec |
|---------|------|
| Avatar | gradient primary→secondary, white 700-weight initial, 40px (header) / 76px (`profile-avatar-xl`) |
| Verified badge | text `--accent-success` on `rgba(success,0.10)`, border `0.35` |
| Unverified badge | `--accent-warning`, same recipe |
| Camera chip | `--accent-primary` circle, white icon; hover→secondary |
| Danger action row | icon + text→`--accent-danger` on hover, fill `rgba(danger,0.08)` |

### 13.5 Sidebar & History

| Element | Spec |
|----------|------|
| Search input | icon-led, glass fill, focus ring as inputs; clear button appears with value |
| Scheme toggle | two icon buttons (moon/sun), active = `--accent-primary` |
| Nav item | transparent → glass hover → active `rgba(primary,0.08)` + border `0.35`; icons keep calculator emoji |
| History mini-item | clock icon, type + `HH:MM` right-aligned; "View all →" in `--accent-primary` |

---

## 14. Chart Palette

Chart.js series colors follow the theme so charts never clash:

| Role | Dark | Light |
|------|------|-------|
| Primary series | `--accent-primary` | `--accent-primary` |
| Secondary series | `--accent-secondary` | `--accent-secondary` |
| Tertiary series | `--accent-tertiary` | `--accent-tertiary` |
| Invested/neutral | `--accent-gold` or muted `--text-muted` | same |
| Grid lines | `rgba(text-primary, 0.08)` | `rgba(text-primary, 0.08)` |
| Tooltip panel | `--bg-secondary` + `--border-glass` | same |

Charts must read against `--surface-glass` backdrops; use `-rgb` twins for area fills (e.g. `rgba(--accent-primary-rgb, 0.2)`).

---

## 15. Accessibility & Contrast

**Targets (WCAG 2.1 AA):** body text ≥ 4.5:1 · large text/UI borders ≥ 3:1 · focus indicators ≥ 3:1 against adjacent colors.

| Pair (dark, any theme) | Ratio (approx.) | Verdict |
|------------------------|-----------------|---------|
| `--text-primary` (#f5f7ff class) on `--bg-primary` (#060814 class) | ~17:1 | ✅ AAA |
| `--text-secondary` (72%) on glass surface | ~10:1 | ✅ AAA |
| `--text-muted` (50%) on `--bg-primary` | ~7:1 | ✅ AA (captions only) |
| `--accent-primary` on `--bg-primary` (links, focus) | 5–7:1 across themes | ✅ AA |
| White on primary gradient (buttons) | ~3.5:1 (indigo) — 600-weight 0.95rem = large-ish; verify per theme | ✅ with 19px+ bold or per-theme check |
| Dark `#051020` on calculate gradient (teal end) | ~12:1 | ✅ AAA |

| Pair (light) | Ratio (approx.) | Verdict |
|--------------|-----------------|---------|
| `--text-primary` (#0f172a class) on `#f8fafc` | ~16:1 | ✅ AAA |
| `--accent-primary` (#3b2f9b class) on paper | ~9:1 | ✅ AAA |
| `--accent-success` #15803d on `rgba(0,0,0,0.05)` | ~5:1 | ✅ AA |
| `--accent-warning` #c27300 on light | ~3.3:1 | ⚠️ use ≥19px/600 or pair with icon — never body copy |

**Non-negotiables:** focus ring always `2px solid --accent-primary` + `3px` offset · touch targets ≥ 44×44px · status never conveyed by color alone (icon + text) · `prefers-reduced-motion` honored globally.

---

## 16. Usage Rules — Do's & Don'ts

**Do**
- Consume tokens (`var(--…)`) exclusively; new colors must be added as tokens first
- Use `rgba(var(--accent-*-rgb), α)` for tints so themes stay automatic
- Keep large fills to `--bg-*`/surfaces; accents live in text, borders, icons, small fills
- Test any new component in all 10 combinations (5 themes × 2 modes) — spot-check at minimum the default pair and extremes (orange light, teal light)
- Re-derive `-rgb` twins whenever adding an accent

**Don't**
- Never hard-code hex in component CSS (only the fixed set: `#051020` calc-button text, `#fff` on gradients, `#1e293b`/`#f9f8f8` select options, theme dots)
- Never mix hue families within one theme (no teal buttons on indigo theme)
- Never use `--text-muted` below caption size or for critical info
- Never stack two glows or two gradient fills in the same component
- Never rely on `--accent-warning`/`--accent-gold` for small light-mode text (contrast floor)
- Never add motion > 520ms or without a reduced-motion path

### 16.1 Known Code Discrepancies (verified)

Small places where shipped code deviates from this spec's own rules — file tickets, do not copy:

| # | Location | Reality |
|---|----------|---------|
| 1 | `PARAM_DECIMALS["Amount"]` | Backend `calculator.py` uses **8** decimals (crypto precision); the frontend JS copy in `index.html` uses **2** — stored history formatting follows the backend |
| 2 | `.typing-cursor` | Defined **inline in `index.html`**, not in `style.css` — belongs in the stylesheet |
| 3 | `select option` colors | Hard-coded `#1e293b` / `#f9f8f8` — native dropdown options can't read CSS variables, accepted exception |
| 4 | Fixed JS hex maps | `THEME_DOT_COLORS`, `THEME_COLORS_DARK/LIGHT` duplicate token values in JS for `<meta theme-color>` — must be updated when themes change |

---

## 17. Token Quick Reference

Dark default values (override per theme/mode as defined above):

```css
:root {
  /* Canvas & surfaces */
  --bg-primary:#060814; --bg-secondary:#0a0f22; --bg-tertiary:#0e1530;
  --surface:rgba(255,255,255,.04); --surface-strong:rgba(255,255,255,.08);
  --surface-glass:rgba(255,255,255,.06); --surface-glass-hover:rgba(255,255,255,.10);
  --border-glass:rgba(255,255,255,.10); --border-glass-strong:rgba(255,255,255,.16);
  --border-soft:rgba(255,255,255,.06);
  /* Text */
  --text-primary:#f5f7ff; --text-secondary:rgba(245,247,255,.72);
  --text-muted:rgba(245,247,255,.50);
  /* Accents */
  --accent-primary:#6c8cff;  --accent-primary-rgb:108,140,255;
  --accent-secondary:#b388ff;--accent-secondary-rgb:179,136,255;
  --accent-tertiary:#4dd0e1; --accent-tertiary-rgb:77,208,225;
  --accent-gold:#ffd166;      --accent-gold-rgb:255,209,102;
  --accent-success:#2ee59d;   --accent-success-rgb:46,229,157;
  --accent-warning:#ffb454;   --accent-warning-rgb:255,180,84;
  --accent-danger:#ff5c7a;    --accent-danger-rgb:255,92,122;
  --accent-pink:#ff7ab8;
  /* Shape & motion */
  --radius-sm:10px; --radius-md:14px; --radius-lg:20px; --radius-xl:28px; --radius-pill:999px;
  --transition-fast:160ms cubic-bezier(.4,0,.2,1);
  --transition:280ms cubic-bezier(.22,.61,.36,1);
  --transition-slow:520ms cubic-bezier(.22,.61,.36,1);
  --transition-spring:420ms cubic-bezier(.34,1.56,.64,1);
  --blur-sm:8px; --blur-md:18px; --blur-lg:28px; --blur-xl:40px;
  /* Layout */
  --max-width:1280px; --sidebar-width:280px; --header-height:72px;
  --z-bg:0; --z-base:1; --z-elevated:10; --z-nav:100; --z-toast:1000; --z-modal:2000;
}
```

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.1 | Oct 9, 2026 | patakrishna2006-a11y | Accuracy pass: real localStorage keys, `<meta theme-color>` maps, §16.1 code-discrepancy register; all token values re-verified against `style.css` |
| 1.0 | Oct 8, 2026 | patakrishna2006-a11y | Full token spec extracted from `static/style.css` (dark + light × 5 themes), component color recipes, contrast matrix, usage rules |

---

**Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Design Lead | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |
| Product Owner | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |
| Accessibility Reviewer | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |

---

*End of Product UI Design & Color Specification Document*
