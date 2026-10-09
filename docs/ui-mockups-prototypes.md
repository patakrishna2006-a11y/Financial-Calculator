# UI Mockups & Prototypes

## FinCalc Pro — Smart Financial Calculators for India

**Version:** 2.1
**Date:** October 9, 2026
**Status:** Active
**Design Lead:** patakrishna2006-a11y

**Companion docs:** [ui-design-color-spec.md](ui-design-color-spec.md) (tokens) · [ux-wireframes.md](ux-wireframes.md) (low-fi flows) · [user-story-map-backlog.md](user-story-map-backlog.md) (scope) · [api-documentation.md](api-documentation.md) (contracts)

All colors, radii, shadows, motion values, copy, and sample numbers in these mockups come from the implementation (`static/style.css`, `templates/*.html`, `calculator.py` — every ₹ value below was produced by running the real calculator functions). This is the **high-fidelity** reference; `ux-wireframes.md` remains the low-fi structural reference.

---

## Table of Contents

1. [Scope & Artboards](#1-scope--artboards)
2. [High-Fidelity Mockups](#2-high-fidelity-mockups)
3. [Responsive Variants](#3-responsive-variants)
4. [Theme Variants](#4-theme-variants)
5. [Interactive Prototype Spec](#5-interactive-prototype-spec)
6. [Known Copy Bugs to Fix](#6-known-copy-bugs-to-fix)
7. [Validation & Handoff](#7-validation--handoff)
8. [Document Control](#8-document-control)

---

## 1. Scope & Artboards

### 1.1 Screen Inventory

| # | Screen | Template | Artboards | Frame |
|---|--------|----------|-----------|-------|
| 1 | Landing | `landing.html` | 1280 / 768 / 360 | F01 |
| 2 | Login | `login.html` | 1280 / 360 | F02 |
| 3 | Register — form | `register.html` | 1280 / 360 | F03 |
| 4 | Register — check email | `register.html?check_email=1` | 1280 / 360 | F04 |
| 5 | Forgot password | `forgot_password.html` | 1280 | F05 |
| 6 | Reset password | `reset_password.html` | 1280 | F06 |
| 7 | Dashboard shell | `index.html` | 1280 / 768 / 360 (drawer open + closed) | F07 |
| 8 | SIP panel (flagship) | `index.html` `#panel-SIP` | 1280 / 360 | F08 |
| 9 | EMI panel (loan family rep) | `index.html` `#panel-EMI` | 1280 | F08b |
| 10 | Crypto converter panel | `index.html` `#panel-CRYPTO_CONVERTER` | 1280 / 360 | F08c |
| 11 | History panel | `index.html` `#panel-HISTORY` | 1280 / 360 | F09 |
| 12 | Profile dropdown | `index.html` `#profile-dropdown` | 1280 / 360 | F10 |
| 13 | Modals — Logout / Change Password / Delete | `index.html` | 1280 / 360 | F11–F13 |
| 14 | Confirm deletion page | `confirm_deletion.html` | 1280 | F14 |
| 15 | Error page (404 rep) | `errors/404.html` | 1280 / 360 | F15 |
| 16 | Email template | `email/verification.html` | 600px HTML | F16 |
| 17 | Toast states | inline | overlay | F07a |

> **Not a screen:** `USD_INR_CONVERTER` exists as a backend calculator type but has **no panel and no sidebar item** — it cannot be mocked up for the current UI.

### 1.2 Artboard Setup

| Property | Value |
|----------|-------|
| Units / grid | px · 4px spacing · 56px background grid |
| Frames | 1280 (desktop) · 768 (tablet) · 360 (mobile) · 320 (ultra-narrow check) |
| Palettes | 10 = 5 themes × dark/light, values from [ui-design-color-spec.md §5](ui-design-color-spec.md#5-theme-palettes) |
| Type | Inter 300–900 (dashboard), Roboto fallback — scale in color spec §8 |
| Radii | 10 / 14 / 20 / 28 / 999 px |
| Elevation | shadow-soft/medium/heavy + inset + glows (color spec §10) |

---

## 2. High-Fidelity Mockups

**Notation:** `#hex` fills · `r14` radius px · `blur28` backdrop blur px. Default palette = **Midnight Indigo, dark mode**.

### 2.1 F01 — Landing (1280px)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ HEADER · sticky top:16 · r20 · h72 · glass rgba(8,12,28,.55) blur28          │
│ border rgba(255,255,255,.10) · top hairline gradient rgba(255,255,255,.18)   │
│ ┌────────────────────────────────────────────────────────────────────────┐ │
│ │ [◧ #6c8cff→#b388ff r14] FinCalc Pro        nav · [Login] [Get Started→]│ │
│ └────────────────────────────────────────────────────────────────────────┘ │
│ BACKGROUND: 2 orbs in DOM (#b388ff purple · #6c8cff blue, blur80, drift)     │
│ + 56px grid rgba(255,255,255,.025) · 4-layer radial wash (color spec §7.2)   │
├────────────────────────────────────────────────────────────────────────────┤
│ HERO · grid 1.05fr/1fr · fadeUp 800ms stagger 120/240/360ms                  │
│ ┌───────────────────────────────────────┐ ┌────────────────────────────────┐│
│ │ India's Smartest                      │ │ [Phone mockup, 3D tilt]        ││
│ │ Financial Calculators ← gradient text │ │ live SIP preview + floating ₹  ││
│ │ #6c8cff→#b388ff→#ff7ab8 (clip:text)   │ │ 🪙 icons (floatSlow 5–6s)      ││
│ │                                       │ │                                ││
│ │ 25+ accurate tools…                   │ │                                ││
│ │ [Get Started Free · btn-primary]      │ │                                ││
│ │ [Watch Demo · btn-secondary]          │ │                                ││
│ │ ✓ Bank-grade ✓ Free ✓ Private         │ │                                ││
│ └───────────────────────────────────────┘ └────────────────────────────────┘│
├────────────────────────────────────────────────────────────────────────────┤
│ CATEGORY CARDS · grid auto-fit minmax(260px,1fr) gap24 · perspective1200     │
│ [📈 Investments 10] [🌅 Planning 3] [🏠 Loans & EMI 6] [🧮 General 6] [₿ Crypto 1]│
│ card: glass rgba(255,255,255,.06) blur18 r20 · hover lift −6px + theme glow  │
├────────────────────────────────────────────────────────────────────────────┤
│ FEATURES · grid minmax(220px,1fr): [🔒 Bank-grade] [⚡ Instant] [📱 Mobile]  │
│ FOOTER · Features · Calculators · Security · Contact · Legal                 │
└────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 F02 — Login (centered card)

```
        ┌──────────────────────────────────────────┐
        │ AUTH CARD · glass r20 · centered          │
        │ [◧] FinCalc Pro            ← Back to home │
        │ ──────────────────────────────            │
        │ USERNAME                                 │ ← 3 fields, all required
        │ ┌──────────────────────────────────────┐ │   (username AND email AND
        │ │ 👤                                   │ │    password must match)
        │ └──────────────────────────────────────┘ │
        │ EMAIL                                    │
        │ ┌──────────────────────────────────────┐ │
        │ │ ✉                                    │ │
        │ └──────────────────────────────────────┘ │
        │ PASSWORD                        [👁]     │
        │ ┌──────────────────────────────────────┐ │
        │ │ 🔒 ••••••••••                          │ │
        │ └──────────────────────────────────────┘ │
        │ [        Sign In · btn-auth        ]     │ ← #6c8cff→#b388ff r999
        │ Forgot password? · [Create one →]        │
        └──────────────────────────────────────────┘
```

**Error toasts (top-right):** `"All fields are required."` · `"Please verify your email first. Check your inbox for the verification link."` (warning) · `"Invalid credentials"` (danger, border `rgba(255,92,122,.45)`) · `"Successful login!"` (success) before redirect to dashboard.

### 2.3 F03/F04 — Register (two-step)

**Step 1 — form:**

```
        ┌──────────────────────────────────────────┐
        │ Create Account                           │
        │ USERNAME            [input 👤]           │
        │ EMAIL               [input ✉]           │
        │ PASSWORD                    [👁]         │
        │ CONFIRM PASSWORD            [👁]         │
        │ [   Create Free Account · btn-auth  ]    │
        │ Already have an account? [Login →]       │
        └──────────────────────────────────────────┘
```

**Shipped error flashes:** `"All fields are required."` · `"Passwords do not match."` · `"Invalid email format."` · `"Password must be at least 9 characters long and include a letter, a number, and a symbol."` · `"Username already exists"` / `"An account with this email already exists"` · Success: `"Verification email sent! Please check your inbox (valid for 1 hour)."` · Email-failure variant: `"Account created but verification email could not be sent. Use the \"Resend\" option on the next page."`

**Step 2 — check email** (`?check_email=1`, auto-redirect after submit):

```
        ┌──────────────────────────────────────────┐
        │        Check your email                   │
        │  A verification link was sent — it         │
        │  expires in 1 hour.                       │
        │ [your@email.com]     [Resend →]           │ ← 1 per 5 min
        │ Too many? "Too many requests. Please      │   (rate-limit flash)
        │ wait 5 minutes before resending."         │
        └──────────────────────────────────────────┘
```

### 2.4 F05/F06 — Forgot / Reset

```
 FORGOT:  email → [Send reset link] → ALWAYS the same generic flash (no
          enumeration): "If an account is registered with that email, a
          password reset link has been sent. It is valid for 1 hour."
 RESET:   NEW PASSWORD + CONFIRM → complexity enforced; success flash
          "Your password has been changed. Please login with your new
          password." Invalid/expired token → "This password reset link is
          invalid or has expired." → back to forgot page.
```

### 2.5 F07 — Dashboard Shell (1280px)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ HEADER (glass) [☰ toggle] FinCalc Pro/Dashboard          [👤 avatar 40px] │
├────────────┬───────────────────────────────────────────────────────────────┤
│ SIDEBAR    │ MAIN · page title <title>FinCalc Pro — Your Financial         │
│ w280       │      Dashboard</title> · meta "Access 25+ financial           │
│            │      calculators…" (shipped meta — see §6)                     │
│ ┌────────┐ │                                                               │
│ │🔍 Search│ │  WELCOME                                                     │
│ │  calc  │ │  [◧] Your Financial Command Centre                           │
│ └────────┘ │  "Select a calculator from the sidebar. All computations run  │
│ [🌙][☀️]   │   locally — fast, private, and accurate." ← shipped copy,     │
│  scheme    │   factually misleading — see §6 bug #1                        │
│  toggle    │  QUICK CHIPS (glass pills):                                    │
│            │  [📈 SIP] [🏠 EMI] [🏖 Retirement] [📊 Brokerage] [% CAGR] [🧾 GST]│
│ INVESTMENTS│                                                               │
│  📈 SIP    │  PAGE HEADER (injected per panel) · aria-live=polite           │
│  💰 Lumpsum│  ┌───────────────────────┐ ┌─────────────────────────────┐    │
│  🚀 Step-Up│  │ selected .calc-panel  │ │ results card (per §2.6)     │    │
│  💸 SWP    │  │ (only one visible)    │ │                             │    │
│  🏛️ PPF    │  └───────────────────────┘ └─────────────────────────────┘    │
│  🏢 EPF    │                                                               │
│  🎯 NPS    │  HISTORY PANEL (via "View all →") — §2.9                      │
│  📜 NSC    │                                                               │
│  🏦 Fixed Deposit · 📅 Recurring Deposit                                   │
│ PLANNING   │  ← nav-item: transparent → glass hover → active               │
│  🌅 Retirement · 📊 Inflation · 📉 CAGR                                    │
│ LOANS & EMI│     rgba(108,140,255,.08) + border rgba(108,140,255,.35)      │
│  🧮 EMI · 🏠 Home · 🚗 Car · 🪙 Gold · 🎓 Education · ⚖️ Flat vs Reducing   │
│ GENERAL    │  ← 26 nav items total (one per UI calculator)                  │
│  ➕ Simple · ✖️ Compound · 🧾 GST · 🎁 Gratuity · 👔 Salary · 📋 Brokerage  │
│ CRYPTO     │  ← search: '/' focuses, Esc clears, empty state                │
│  ₿ Crypto Converter      "No calculators match \"xyz\""                     │
│ RECENT ACTIVITY        [View all →]                                        │
│  🕐 {type} 14:30 · 🕐 {type} 13:02 · 🕐 {type} 11:47   (last 3)             │
│  (empty: italic "No history yet")                                          │
│ ACCOUNT                                                                    │
│  [🚪 Logout] → opens logout modal                                          │
└────────────┴───────────────────────────────────────────────────────────────┘
```

### 2.6 F08 — SIP Panel (flagship layout)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ PAGE HEADER:  SIP Calculator                                             │
│               Systematic Investment Plan — wealth via monthly investments│
├───────────────────────┬──────────────────────────────────────────────────┤
│ CARD 1 · Parameters   │ CARD 2 · Results (glass r20)                     │
│ [SIP badge]           │                                                  │
│ Monthly Investment(₹) │  ┌────────────────────────────────────────────┐  │
│ [5,000        ]       │  │ CHART (canvas, hidden until results)        │  │
│ Expected Return (%)   │  │  growth curve · tooltip on hover           │  │
│ [12           ]       │  └────────────────────────────────────────────┘  │
│ Time Period (Years)   │  Total Investment  ₹6,00,000.00                 │
│ [10           ]       │  Future Value       ₹11,50,193.45  ← verified   │
│ Mode [End of Month ▼] │  Wealth Gained       ₹5,50,193.45    (₹ real run)│
│                       │                                                  │
│ [ Calculate ]  ← btn-calc gradient #6c8cff→#4dd0e1, TEXT #051020,        │
│                   r999, hover lift −3px + teal glow                     │
│ ⠋ Computing…    ← loading (spinner)                                       │
│ ⚠ error-box     ← e.g. "Monthly investment cannot be negative"          │
│                   (server-validated, from POST /calculate 400 response) │
└───────────────────────┴──────────────────────────────────────────────────┘
  Result actions: [⧉ Copy Results] → button flips to "✓ Copied!"
                  [📄 Export PDF]   → jsPDF a4 · "Generating…" spinner
                                    → saves "FinCalc Pro - SIP Calculator.pdf"
```

> **Verified sample:** ₹5,000/mo @ 12% × 10 yrs, **End of Month** (the default) → `₹11,50,193.45`. Switching Mode to **Beginning of Month** → `₹11,61,695.38`. Every number displayed here is produced by `calculator.py`, not hand-written.

**Input behavior (shipped JS):** Indian-format on blur (raw value on focus, re-format after 500ms typing pause), `inputmode="numeric"`, IDs follow `{TYPE}-{Param Name}` (e.g. `SIP-Monthly investment`).

### 2.7 F08b — EMI (representative of the 5-loan family)

Same two-card pattern. Fields: `Loan Amount (₹)` · `Interest Rate (% p.a.)` · `Tenure (Years)`. Sample (₹25,00,000 @ 8.5% × 20y — **verified**): **Monthly EMI ₹21,695.58** · Principal ₹25,00,000.00 · Total Interest ₹27,06,939.40 · Total Amount ₹52,06,939.40. Home/Car/Gold/Education panels are byte-identical except badge text and default placeholders (₹50L/8.5/20 · ₹8L/9/5 · ₹2L/7.5/2 · ₹10L/10/10). **Flat vs Reducing** adds the comparison grid: Flat ₹12,500.00/mo vs Reducing ₹10,623.52/mo, **Saves ₹1,12,588.66** (₹5L @ 10% × 5y, verified).

### 2.8 F08c — Crypto Converter (unique layout)

```
┌────────────────────────────┬─────────────────────────────┐
│ Parameters [CRYPTO badge]  │ Conversion Result            │
│ From Currency [BTC ▼]      │ result-grid                  │
│ To Currency   [INR ▼]      │ + #crypto-rate-info box:    │
│ Amount        [1.0000]     │   glass surface, live-rate   │
│ [⇄ Swap] [↻ Refresh Rates] │   caption                   │
│ ⠋ Loading rates…           │ [⧉ Copy Results]             │
└────────────────────────────┴─────────────────────────────┘
```

Differences from other panels: dropdowns are **populated live** from `/api/crypto/prices` (100-coin list), two action buttons (Swap / Refresh), a rate-info strip, **and no Export PDF button** — crypto results are copy-only.

### 2.9 F09 — History Panel

```
┌──────────────────────────────────────────────────────────────────────┐
│ 🕐 Calculation History [LAST 10 badge] (count)   [🔍 Search calcs]   │
│ [filter chips: one per calculator type]                              │
├──────────────────────────────────────────────────────────────────────┤
│ 📈  SIP                          ₹11,50,193.45   ← headline (real)   │
│     future value · ₹5,000/month · 12% · 10 years                     │
│     [↻ Run again] [⧉ copy] [🗑 delete]          08 Oct, 2:30 PM IST  │
├──────────────────────────────────────────────────────────────────────┤
│ 🏠  Home Loan    EMI ₹21,695.58   for ₹25,00,000 · 8.5% · 20 years   │
├──────────────────────────────────────────────────────────────────────┤
│ 🧾  GST          ₹1,180.00        total with GST · ₹1,000 · 18%      │
└──────────────────────────────────────────────────────────────────────┘
 • Entry fields come from build_history_entries(): icon (CALC_META),
   headline+label (per-type spec), summary (per-type builder), IST time.
 • "Run again" → show(type), pre-fill {TYPE}-{Param} inputs from params.
 • Delete → DELETE /history/<id>, card removed, aria-live=polite list.
 • Sidebar "Recent Activity" shows the last 3 of the same 10.
```

### 2.10 F10 — Profile Dropdown (top-right, w320)

```
┌────────────────────────────────────────────┐
│ [👤 76px avatar + 📷 camera chip]           │ ← wash rgba(108,140,255,.14)
│  rahul_28                                   │   → rgba(179,136,255,.10)
│  rahul@example.com                         │
│  ✓ Email verified / ⚠ Email not verified   │
├────────────────────────────────────────────┤
│ 🎂 Member since     12 Sep 2026            │
│ 🕐 Last login       08 Oct, 02:30 PM       │
├────────────────────────────────────────────┤
│ 🎨 Theme  [● Midnight Indigo]        [chev] │ ← expandable submenu
│    ● #6c8cff Indigo  ● #2ee59d Green       │
│    ● #ffb454 Orange   ● #b388ff Purple      │
│    ● #4dd0e1 Teal     active: ✓             │
├────────────────────────────────────────────┤
│ [🔑 Change Password]                       │
│ [🧹 Remove Photo]        (hidden w/o img)   │
│ [🗑 Delete Account]      (danger styling)   │
├────────────────────────────────────────────┤
│ [           Logout           ] (danger pill)│
└────────────────────────────────────────────┘
 enter: translateY(−8px) scale(.97)→none, 280ms · Esc/backdrop closes
 Upload: AJAX → instant swap with ?v= cache-bust · spinner overlay on avatar
```

### 2.11 F11–F13 — Modals (backdrop blur, z-modal 2000)

```
F11 LOGOUT           F12 CHANGE PASSWORD           F13 DELETE ACCOUNT
┌──────────────┐    ┌─────────────────────────┐  ┌──────────────────────────┐
│    [🚪]      │    │ [🔑] Current  [🔒][👁]  │  │ [⚠] This PERMANENTLY     │
│  Logout?     │    │ New          [🔒][👁]   │  │ deletes account, history │
│  Sign out of │    │ Confirm      [🔒][👁]   │  │ and picture.             │
│  your        │    │ [Cancel][Update Password]│  │ Current password [🔒][👁]│
│  account?    │    │ success → toast "Password │  │ [Cancel][📧 Send         │
│ [No][Logout→]│    │ changed successfully. Use │  │  Verification Email]    │
└──────────────┘    │ your new password next   │  └──────────────────────────┘
                     │ time you log in."       │   → emailed link → F14
                     └─────────────────────────┘
```

### 2.12 F14 — Confirm Deletion Page

```
        ┌──────────────────────────────────────────┐
        │        Delete your account?              │
        │  Permanently remove: history, picture,    │
        │  login. Cannot be undone.                 │
        │  [Cancel, keep my account] [Delete now →] │
        └──────────────────────────────────────────┘
 POST → cascade (history → picture file → user) → session cleared →
 landing + "Your account has been permanently deleted. We are sorry to
 see you go!"
```

### 2.13 F15 — Error Page (400/401/403/404/405/413/429/500)

Centered glass card on orbs; 429 shows the `retry_after` countdown; JSON/AJAX callers never see these pages (they get the error envelope).

### 2.14 F16 — Email Template (shared: verify / reset / delete)

600px dark card `#0a0f22` on `#060814`; username greeting; gradient CTA button; **"expires in 1 hour"**; ignore-safely footer. Subjects: "Verify your FinCalc Pro account" · "Reset your FinCalc Pro password" · "Confirm deletion of your FinCalc Pro account".

### 2.15 F07a — Toasts (top-right, spring slide-in 380ms, auto-dismiss 3.5s)

| Type | Border | Real copy examples |
|------|--------|-------------------|
| Success | `rgba(46,229,157,.45)` | "Verification email sent! Please check your inbox (valid for 1 hour)." · "Successful login!" · "Logout successfully!" |
| Danger | `rgba(255,92,122,.45)` | "Invalid credentials" · "Security token expired. Please refresh the page and try again." |
| Warning | `rgba(255,180,84,.45)` | "Please verify your email first…" · "Too many requests. Please wait 5 minutes before resending." |
| Info | `rgba(108,140,255,.45)` | "If an account is registered with that email, a password reset link has been sent…" · "Your account has been permanently deleted…" |

---

## 3. Responsive Variants

### 3.1 Breakpoint Behavior Map

| Component | 360px | 768px | 1280px |
|-----------|-------|-------|--------|
| Sidebar | drawer + scrim via `☰` | drawer | pinned 280px |
| Calc panel | 1 column | 1–2 columns | 2 cards side-by-side |
| Form grid | 1 col | auto-fit 220px | 2–3 col |
| Modals | compact | 90% | ~500px |
| Scheme toggle | 28px buttons | default | default |
| Orbs | shrunk (320/360/480 rules) | default | default |

### 3.2 Mobile 360px — Dashboard with drawer open

```
┌───────────────────────────┐
│[☰] FinCalc Pro       [👤] │
├───────────█───────────────┤  █ = scrim, tap/Esc closes
│ ┌─────────┤                │
│ │DRAWER   │  SIP Calculator│
│ │slide-in │  [Monthly ₹]   │
│ │250ms    │  [Return %]    │
│ │🔍 [🌙☀️]│  [Years][Mode▼]│
│ │ all     │  [ Calculate ] │
│ │sections │  [⧉][📄]       │
│ └─────────┘                │
└───────────────────────────┘
```

Reference evidence: `RESPONSIVE_TEST_REPORT.md` documents the 15-viewport suite (320–2560px, zero horizontal overflow). Tablet keeps the drawer (sidebar never pins below 768px).

---

## 4. Theme Variants

### 4.1 Rendering Matrix

Every frame exists in **10 palettes** (5 themes × dark/light) — values in [color spec §5](ui-design-color-spec.md#5-theme-palettes). Spot-check minimum: indigo/dark, indigo/light, orange/light, teal/light.

### 4.2 Same Element Across Themes — SIP Results Card

| Theme | Card fill | Headline accent | Calculate button | Hover glow |
|-------|-----------|-----------------|------------------|------------|
| 🌌 Indigo | `rgba(255,255,255,.06)` | `#6c8cff` | `#6c8cff→#4dd0e1`, text `#051020` | rgba(108,140,255,.35) |
| 🌲 Green | same | `#2ee59d` | same | rgba(46,229,157,.35) |
| 🌅 Orange | same | `#ffb454` | same | rgba(255,180,84,.35) |
| 👑 Purple | same | `#b388ff` | same | rgba(179,136,255,.35) |
| 🌊 Teal | same | `#4dd0e1` | same | rgba(77,208,225,.35) |

### 4.3 Theme/Scheme Switching (shipped JS)

1. `document.documentElement.classList.add('color-scheme-switching')` (kills transitions)
2. Set `dataset.theme` / `dataset.colorScheme`
3. Persist `localStorage['fincalc-theme']` / `['fincalc-color-scheme']`
4. Update `<meta name="theme-color">` to the theme's bg (`THEME_COLORS_DARK/LIGHT` maps)
5. Remove class → surfaces cross-fade 280ms

---

## 5. Interactive Prototype Spec

### 5.1 Flows to Wire (P1–P6)

**P1 Onboarding** `F01→F03→F04→F02→F07`: Get Started → register (invalid → flash + stay) → check-email → verify link (simulated) → login → dashboard. Toasts carry the exact shipped copy (§2.15).

**P2 Core calculation** `F07→F08`: sidebar SIP → panel reveal → inputs → Calculate → spinner "Computing…" → results + chart → Copy ("Copied!") or PDF ("Generating…" → download `FinCalc Pro - SIP Calculator.pdf`).

**P3 History re-run** `F07→F09→F08`: View all → Run again → form pre-filled, focus on Calculate.

**P4 Theme switch** `F10`: Theme → Ocean Teal → ✓ moves, meta theme-color updates, cross-fade.

**P5 Change password** `F10→F12`: wrong current → inline red "Current password is incorrect"; success → toast.

**P6 Deletion** `F10→F13→F16→F14→F01`: password → email → confirm page → Delete now → landing + info toast.

### 5.2 Trigger Map

| Trigger | Behavior |
|---------|----------|
| Hover button | lift −3px scale 1.02 + glow (420ms spring) |
| Active button | press +1px scale 0.98 |
| Hover card | lift −6px + border-glass-strong + theme glow |
| Focus input | `#6c8cff@70%` border + 4px ring rgba(108,140,255,.18) + lift −1px |
| Type in numeric input | re-format Indian style after 500ms debounce; raw on focus |
| Press `/` | focus sidebar search; Esc clears it |
| Click avatar | dropdown spring-in; Esc/outside closes |
| Click PDF | button → spinner "Generating…", disabled until download |

### 5.3 Animation Tokens (exact, from `style.css`)

| Token | Value | Used by |
|-------|-------|---------|
| `--transition-fast` | 160ms cubic-bezier(.4,0,.2,1) | hover/focus/toast enter |
| `--transition` | 280ms cubic-bezier(.22,.61,.36,1) | modals, dropdowns, theme |
| `--transition-slow` | 520ms same | page transitions |
| `--transition-spring` | 420ms cubic-bezier(.34,1.56,.64,1) | playful pops |
| `fadeUp` | 800ms, stagger 120/240/360ms | hero, welcome |
| Toast | slideInRight 380ms spring · auto-dismiss 3.5s · fade 400ms | all flashes |
| `blink` | 1s step-end | typing cursor (inline style) |
| `spin` | 800ms linear | spinners |
| orb drift | 32/38/44s infinite | backgrounds |
| **prefers-reduced-motion** | all durations → 0.01ms, scroll auto | mandatory global override |

### 5.4 Component State Matrix

| Component | States |
|-----------|---------|
| Buttons | default · hover · active · focus-visible (2px outline offset 3px) · loading (spinner + disabled) |
| Inputs | default · hover · focus · filled (formatted) · error (error-box below) |
| Calc panel | empty → loading (`Computing…`) → results → error-box |
| History | list · search-filtered · deleting · empty |
| Modals | closed → entering → open (focus trap) → exiting |
| Toasts | enter · visible 3.5s · exiting |

### 5.5 Keyboard Map

| Key | Action |
|-----|--------|
| Tab / Shift+Tab | traverse |
| Enter / Space | activate |
| Esc | close modal/drawer/dropdown; clear search when focused |
| `/` | focus calculator search |
| ← → ↑ ↓ | theme options (menuitemradio), sidebar navigation |

---

## 6. Known Copy Bugs to Fix

Shipped strings that are **factually wrong** — keep them in mockups for fidelity, but file tickets:

| # | Location | Shipped copy | Problem |
|---|----------|--------------|---------|
| 1 | `index.html` welcome | "All computations run locally — fast, private, and accurate." | Calculations **POST to `/calculate`** server-side; "locally" is false |
| 2 | `index.html` meta description | "Access 25+ financial calculators…" | Actual count is **26 UI calculators / 27 backend types** — update to "26" |
| 3 | Old docs (fixed here) | PDF filename `FinCalc_{calc}_{timestamp}.pdf` | Actual: **`FinCalc Pro - {title}.pdf`** |

---

## 7. Validation & Handoff

### 7.1 Prototype Review Checklist

- [ ] All 17 frames present × 3 breakpoints
- [ ] 10 palettes applied to header/cards/buttons/inputs/toasts
- [ ] P1–P6 run end-to-end with **shipped toast copy** (§2.15)
- [ ] Error branches reachable (invalid input, wrong password, expired token)
- [ ] Motion matches §5.3; reduced-motion verified
- [ ] Real content: verified ₹ values (§2.6–2.9), IST timestamps, real filenames
- [ ] Contrast spot-checks ≥ 4.5:1 body / ≥ 3:1 borders in every palette

### 7.2 Dev Handoff Checklist

- [ ] Tokens map 1:1 to color spec §17
- [ ] Copy matches shipped templates (or §6 bugs ticketed)
- [ ] Touch targets ≥ 44×44; focus rings in all 10 palettes
- [ ] ARIA roles per implementation (`role="menu"`, `menuitemradio`, `aria-live`, `aria-expanded`)
- [ ] States in §5.4 implemented or deferred explicitly
- [ ] Stories touched reference `user-story-map-backlog.md` DoD

---

## 8. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.1 | Oct 9, 2026 | patakrishna2006-a11y | Accuracy pass: verified ₹ values (run from `calculator.py`), real PDF filename, real toast copy, chart-coverage corrected, crypto panel has no PDF, §6 copy-bug register |
| 1.0 | Oct 9, 2026 | patakrishna2006-a11y | Initial release |

---

**Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Design Lead | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |
| Product Owner | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |
| Accessibility Reviewer | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |

---

*End of UI Mockups & Prototypes Document*
