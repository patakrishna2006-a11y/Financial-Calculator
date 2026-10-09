# Product Requirements Document (PRD)

## FinCalc Pro — Smart Financial Calculators for India

**Version:** 2.1
**Date:** October 9, 2026
**Status:** Active
**Product Owner:** patakrishna2006-a11y
**Last Updated:** October 9, 2026

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Problem Statement](#2-problem-statement)
3. [Target Audience](#3-target-audience)
4. [Product Vision & Strategy](#4-product-vision--strategy)
5. [Key Features & Epics](#5-key-features--epics)
6. [User Stories & Acceptance Criteria](#6-user-stories--acceptance-criteria)
7. [Release Plan](#7-release-plan)
8. [Competitive Analysis](#8-competitive-analysis)
9. [Risks & Mitigation](#9-risks--mitigation)
10. [Appendices](#10-appendices)

---

## 1. Product Overview

### 1.1 Product Name
**FinCalc Pro** — Smart Financial Calculators for India

### 1.2 Tagline
*Your financial future, calculated.*

### 1.3 Product Summary
FinCalc Pro is a full-stack financial calculator web application for Indian users. It provides **27 backend calculator types (26 exposed in the UI)** covering investments, loans, retirement planning, general finance, and cryptocurrency — in a responsive, secure interface with Indian number formatting (lakh/crore).

### 1.4 Core Value Proposition (Verified)
- **Accuracy:** Standard Indian banking/government financial formulas, unit-tested against known values
- **Localization:** Indian number formats (₹1,00,000.00), rupee currency, India-specific instruments
- **Security:** 18/18 security controls pass (CSRF, rate limiting, token hashing, input validation, security headers)
- **Experience:** 5 themes × dark/light, Chart.js visualizations, PDF export, calculation history
- **Registration Required:** All calculators require an authenticated account (`/dashboard` redirects anonymous users)

> **Note:** Registration **is required** to use any calculator. There is no guest/anonymous calculation mode.

---

## 2. Problem Statement

### 2.1 Current Pain Points
| Problem | Impact |
|---------|--------|
| **Fragmented Tools** | Users need multiple websites/apps for different calculations |
| **No Indian Context** | Most tools use Western formats (millions/billions vs lakh/crore) |
| **Poor Mobile Experience** | Many existing tools don't work well on phones |
| **No History/Export** | Most free tools can't save or share calculations |

---

## 3. Target Audience

### 3.1 Primary Personas (Planning Fictions — No Live User Data)

> **Reality:** The app has **no analytics** (by design). These personas are planning tools, not data-driven profiles.

#### Persona 1: Young Professional (Rahul, 28)
- **Profile:** Software engineer, first-time investor
- **Goals:** Start SIP, plan for home loan, understand tax savings
- **Usage:** SIP, Lumpsum, EMI, Home Loan

#### Persona 2: Family Planner (Priya, 35)
- **Profile:** Marketing manager, married, 2 kids
- **Goals:** Children's education fund, retirement, emergency fund
- **Usage:** Retirement, PPF, EPF, NPS, Step-Up SIP

#### Persona 3: Pre-Retiree (Rajesh, 52)
- **Profile:** Senior manager, 8 years to retirement
- **Goals:** Corpus adequacy check, SWP planning
- **Usage:** SWP, Retirement, CAGR, Inflation

#### Persona 4: Small Business Owner (Kavya, 40)
- **Profile:** Retail chain owner, GST registered
- **Goals:** Working capital loans, GST calculations, gratuity planning
- **Usage:** GST, EMI, Gratuity, Salary, Brokerage

---

## 4. Product Vision & Strategy

### 4.1 Vision Statement
> "To become a trusted financial calculator platform for Indian users — where every calculation is accurate, every interaction is fast, and every user feels confident about their financial decisions."

### 4.2 Strategic Pillars

| Pillar | Description | Current State |
|--------|-------------|---------------|
| **Accuracy First** | Standard Indian financial formulas | ✅ 27 backend types, unit-tested |
| **User Experience** | Fast, themed, responsive | ✅ 5 themes × dark/light, 15 breakpoints |
| **Trust & Security** | Production-hardened | ✅ 18/18 controls pass, Bandit/pip-audit clean |
| **Indian Context** | Lakh/crore, rupee, Indian instruments | ✅ Native Indian formatting throughout |
| **Accessibility** | Inclusive by default | ✅ WCAG 2.1 AA, reduced motion, keyboard nav |

### 4.3 Product Principles (As Implemented)
1. **No Dark Patterns** — No ads, no data selling, no upsells
2. **Privacy by Design** — Minimal data (username, email, password hash, calculation history); user controls deletion via 2-step email-confirmed flow
3. **No Analytics** — No Google Analytics, Mixpanel, or tracking of any kind
4. **Registration Required** — All calculators require authenticated session

---

## 5. Key Features & Epics

### Epic 1: Authentication & Identity (COMPLETED)
| Feature | Status |
|---------|--------|
| User registration (username + email + password, 9+ chars w/ letter+number+symbol) | ✅ Done |
| Email verification (1-hour single-use hashed token) | ✅ Done |
| Login (username AND email AND password, session-based) | ✅ Done |
| Password reset via email (1-hour token, generic response) | ✅ Done |
| In-session password change (current-password proof) | ✅ Done |
| Profile picture upload/remove (magic-byte validated, ≤2MB, AJAX) | ✅ Done |
| Two-step account deletion (password → email link → cascade) | ✅ Done |

### Epic 2: Calculator Engine (COMPLETED)
| Calculator Category | Backend Types | UI Panels | Status |
|---------------------|---------------|-----------|--------|
| Investments (SIP, Lumpsum, Step-Up SIP, SWP, PPF, EPF, NPS, NSC, FD, RD) | 10 | 10 | ✅ Done |
| Planning (Retirement, Inflation, CAGR) | 3 | 3 | ✅ Done |
| Loans (EMI, Home, Car, Gold, Education, Flat-vs-Reducing) | 6 | 6 | ✅ Done |
| General (Simple Interest, Compound Interest, GST, Gratuity, Salary, Brokerage) | 6 | 6 | ✅ Done |
| Crypto (Converter) | 1 | 1 | ✅ Done |
| Currency (USD⇄INR Converter) | 1 | **0 (backend-only, no UI panel)** | ✅ Done |
| **Total** | **27** | **26** | **✅ Done** |

> **Note:** `USD_INR_CONVERTER` is a valid backend calculator type (reachable via `POST /calculate`) but has **no panel or sidebar item** in `templates/index.html`.

### Epic 3: Calculation History & Export (COMPLETED)
| Feature | Status |
|---------|--------|
| Auto-save every calculation (params + result + IST timestamp) | ✅ Done |
| Sidebar "Recent Activity" (last 3) | ✅ Done |
| History panel ("LAST 10", search, filter chips) | ✅ Done |
| Re-run from history (pre-fills form) | ✅ Done |
| Per-entry delete (ownership-checked) | ✅ Done |
| PDF export (jsPDF + html2canvas, theme-aware) | ✅ Done |
| Clipboard copy ("Copied!" feedback) | ✅ Done |

### Epic 4: UI/UX Excellence (COMPLETED)
| Feature | Status |
|---------|--------|
| 5 themes (Indigo, Green, Orange, Purple, Teal) × dark/light | ✅ Done |
| 15 responsive breakpoints (320px–2560px) | ✅ Done |
| Sidebar with search, categories, history preview | ✅ Done |
| Chart.js visualizations (on ~17 of 26 panels) | ✅ Done |
| Indian number formatting (input + output) | ✅ Done |
| WCAG 2.1 AA compliance | ✅ Done |
| Reduced motion support | ✅ Done |
| `prefers-reduced-motion` global override | ✅ Done |

### Epic 5: Security Hardening (COMPLETED)
| Security Control | Status |
|------------------|--------|
| CSRF protection (12hr server, 1hr JS refresh; `/calculate` exempt, session-protected) | ✅ Done |
| Rate limiting (per-IP, Redis-ready, per-endpoint limits) | ✅ Done |
| Security headers (CSP, HSTS, X-Frame-Options, COOP, CORP, Permissions-Policy) | ✅ Done |
| Token hashing (PBKDF2, constant-time compare, 1hr expiry, single-use) | ✅ Done |
| Input validation (all 27 calculator types) | ✅ Done |
| Custom error pages (400, 401, 403, 404, 405, 413, 429, 500) | ✅ Done |
| Security logging (10MB rotation × 10 backups) | ✅ Done |

### Epic 6: Future Enhancements (PLANNED — Not Implemented)

| Priority | Epic | Description | Target |
|----------|------|-------------|--------|
| HIGH | Tax Calculator Suite | Old vs New regime, 80C/80D optimizer, HRA calculator | Q1 2027 |
| HIGH | Goal-Based Planning | "Buy house in 5 years" → reverse SIP calculator | Q2 2027 |
| MEDIUM | Portfolio Tracker | Import MF/Stock holdings, XIRR, asset allocation | Q3 2027 |
| LOW | Public API Platform | `/api/v1/` versioned endpoints | 2028 |

> **Status:** None of these features exist in the current codebase. All are roadmap items only.

---

## 6. User Stories & Acceptance Criteria

### 6.1 Authentication Stories

#### Story: User Registration
**As a** new user
**I want to** register with username, email, and password
**So that** I can access calculators and save my calculation history

**Acceptance Criteria (verified against `app.py`):**
- [x] Username: 1-50 chars, unique
- [x] Email: Valid format, ≤100 chars, unique
- [x] Password: ≥9 chars, ≥1 letter, ≥1 number, ≥1 symbol
- [x] Confirm password must match
- [x] Email verification sent (1-hour single-use hashed token)
- [x] Generic error messages (no account enumeration for unverified)
- [x] Redirect to "check email" page on success
- [x] Duplicate unverified → resend verification
- [x] Duplicate verified → flash "Username already exists" / "An account with this email already exists"

#### Story: Login
**As a** registered, verified user
**I want to** log in
**So that** I can access my dashboard and calculators

**Acceptance Criteria:**
- [x] All three fields required: username, email, password
- [x] All three must match the same verified account
- [x] Unverified → "Please verify your email first. Check your inbox for the verification link."
- [x] Bad credentials → "Invalid credentials"
- [x] Session-fixation prevention (`session.clear()` before new session)
- [x] 24-hour session cookie (HttpOnly, SameSite=Lax, Secure in prod)
- [x] `last_login` updated on success

#### Story: Account Deletion
**As a** user
**I want to** permanently delete my account
**So that** my data is completely removed

**Acceptance Criteria:**
- [x] Step 1: Current password verification (AJAX)
- [x] Step 2: 1-hour email confirmation token
- [x] Confirmation page with cascade details
- [x] Cascade: History rows → Profile picture file → User row
- [x] Session invalidated if deleted user was logged in
- [x] Token single-use, 1-hour expiry, rolled back if email fails

---

### 6.2 Calculator Stories

#### Story: SIP Calculator
**As an** investor
**I want to** calculate SIP returns
**So that** I can plan monthly investments

**Acceptance Criteria (verified against `calculator.py`):**
- [x] Inputs: Monthly investment (₹), Expected return (%), Time period (years), Mode (End of Month / Beginning of Month)
- [x] Outputs: Total Investment, Future Value, Wealth Gained
- [x] Indian number format (₹11,50,193.45)
- [x] Chart: Investment vs Returns growth curve
- [x] Validation: Non-negative amounts, rates ≤100%, years > 0
- [x] Re-run from history works
- [x] Copy results to clipboard
- [x] Export to PDF

**Verified sample:** ₹5,000/mo @ 12% × 10 yrs, End of Month → Future Value **₹11,50,193.45**. Beginning of Month → **₹11,61,695.38**.

#### Story: EMI Calculator Family
**As a** borrower
**I want to** calculate loan EMI
**So that** I can compare loan offers

**Acceptance Criteria:**
- [x] Inputs: Loan amount, Interest rate (% p.a.), Tenure (years)
- [x] Outputs: Monthly EMI, Principal, Total Interest, Total Amount
- [x] Chart: Principal vs Interest breakdown
- [x] Variants: EMI, Home Loan, Car Loan, Gold Loan, Education Loan (same formula, different placeholders)
- [x] Flat vs Reducing comparison available

**Verified sample:** ₹25,00,000 @ 8.5% × 20 yrs → Monthly EMI **₹21,695.58**, Total Interest **₹27,06,939.40**.

#### Story: Crypto Converter
**As a** crypto user
**I want to** convert between crypto coins and INR
**So that** I can check values in real-time

**Acceptance Criteria:**
- [x] 100-coin list from CoinGecko (fixed `COINGECKO_TOP_100_IDS` list)
- [x] Live USD/INR from CurrencyAPI (no hard-coded fallback rate)
- [x] Inputs: From currency, To currency, Amount
- [x] Outputs: Converted amount, USD values, INR values
- [x] 30-second cache for crypto prices, 60-second for USD/INR
- [x] Swap and Refresh Rates buttons
- [x] Copy-only (no PDF export on this panel)
- [x] Error handling: "Currency not found in price data" if feed unavailable

---

### 6.3 History & Export Stories

#### Story: View History
**As a** user
**I want to** see my past calculations
**So that** I can review and compare

**Acceptance Criteria:**
- [x] Sidebar shows last 3 (of 10 fetched)
- [x] History panel shows last 10 with "LAST 10" badge
- [x] Search box + filter chips (one per calculator type)
- [x] Timestamps in IST
- [x] Click "Run again" to pre-fill form
- [x] Per-entry delete button

#### Story: PDF Export
**As a** user
**I want to** export results to PDF
**So that** I can save/share professionally

**Acceptance Criteria:**
- [x] One-click export button (on all panels except Crypto)
- [x] Includes: Calculator name, inputs, results, chart (via html2canvas)
- [x] Theme-aware colors
- [x] Noto Sans font loaded for ₹ symbol support
- [x] Indian formatting preserved
- [x] Filename: `FinCalc Pro - {title}.pdf`

---

### 6.4 UI/UX Stories

#### Story: Theme Switching
**As a** user
**I want to** switch between 5 themes and dark/light modes
**So that** I can personalize my experience

**Acceptance Criteria:**
- [x] 5 themes: Midnight Indigo, Forest Green, Sunset Orange, Royal Purple, Ocean Teal
- [x] Dark/Light toggle (sidebar, moon/sun icons)
- [x] Theme picker (profile dropdown, expandable submenu)
- [x] Persists in localStorage (`fincalc-theme`, `fincalc-color-scheme`)
- [x] `<meta name="theme-color">` synced with active theme
- [x] Respects `prefers-reduced-motion`

#### Story: Responsive Design
**As a** mobile user
**I want to** use all features on my phone
**So that** I can calculate on the go

**Acceptance Criteria (verified — 45/45 responsive tests pass):**
- [x] 15 viewports tested (320px–2560px)
- [x] Zero horizontal overflow
- [x] Sidebar collapses to hamburger drawer below 768px
- [x] Charts resize responsively
- [x] PDF export works on mobile
- [x] Touch targets ≥44×44px (buttons have min-height 44px)

---

## 7. Release Plan

### 7.1 Version History

| Version | Date | Key Deliverables |
|---------|------|------------------|
| 1.0 | Sep 2026 | Core calculators, basic auth, landing page |
| 1.5 | Sep 2026 | Security hardening, responsive overhaul |
| 2.0 | Oct 2026 | 27 backend calculator types (26 in UI), full auth, history panel, PDF export, 5 themes, security hardening |
| **2.1** | **Q1 2027** | **Tax Calculator Suite (PLANNED)** |
| 2.2 | Q2 2027 | Goal-Based Planning (PLANNED) |
| 2.3 | Q3 2027 | Portfolio Tracker (PLANNED) |
| 3.0 | 2028 | Public API Platform (PLANNED) |

> **Current version:** 2.0 (October 2026). All features listed above through 2.0 are **implemented and verified**.

---

## 8. Competitive Analysis

### 8.1 Positioning

| Aspect | FinCalc Pro | Typical Competitors |
|--------|-------------|---------------------|
| Indian formatting (lakh/crore) | ✅ Native | ❌ Usually millions/billions |
| Registration required | ✅ Yes (all calculators) | Varies |
| PDF export with charts | ✅ Yes (25 of 26 panels) | ❌ Rare |
| 5 themes + dark mode | ✅ Yes | ❌ Rare |
| Security hardened (18 controls) | ✅ Yes | ❌ Usually unknown |
| No analytics/tracking | ✅ Zero tracking | ❌ Usually analytics/ads |
| Open formulas (in code) | ✅ Transparent (`calculator.py`) | ❌ Usually black box |

---

## 9. Risks & Mitigation

| Risk | Likelihood | Impact | Current Mitigation |
|------|------------|--------|--------------------|
| CoinGecko/CurrencyAPI rate limits | HIGH | MEDIUM | 30s/60s cache, stale-cache fallback, no hard-coded FX rate |
| Formula accuracy disputes | MEDIUM | HIGH | Unit tests against known values, formulas in code |
| Security vulnerability | LOW | CRITICAL | Bandit, pip-audit, security headers, token hashing |
| Email delivery failures | MEDIUM | HIGH | Registration doesn't fail on email error (resend available) |
| Regulatory changes (tax laws) | MEDIUM | HIGH | Tax calculators not yet built (planned Q1 2027) |
| Scaling under load | LOW | HIGH | Stateless app, Redis-ready rate limiting, SQLite→PostgreSQL switch |

---

## 10. Appendices

### Appendix A: Formula Sources

| Calculator | Formula Basis |
|------------|---------------|
| SIP/EMI/FD/RD | Standard compound-interest and annuity formulas |
| PPF/EPF/NPS | Standard government scheme formulas (12% PF, EPS split) |
| Gratuity | Payment of Gratuity Act, 1972 formula: (Basic+DA) × years × 15/26 |
| GST | GST Act, 2017: rate × base price |
| Brokerage | SEBI charge structure (STT, exchange, SEBI, stamp duty, GST) |

### Appendix B: Design System Tokens (Verified from `static/style.css`)

| Token | Dark Value | Light Value |
|-------|------------|-------------|
| `--bg-primary` | `#060814` | `#f8fafc` |
| `--bg-secondary` | `#0a0f22` | `#ffffff` |
| `--bg-tertiary` | `#0e1530` | `#f1f5f9` |
| `--text-primary` | `#f5f7ff` | `#0f172a` |
| `--text-secondary` | `rgba(245,247,255,0.72)` | `rgba(15,23,42,0.72)` |
| `--accent-primary` (indigo) | `#6c8cff` | `#3b2f9b` |
| `--accent-primary` (green) | `#2ee59d` | `#166534` |
| `--accent-primary` (orange) | `#ffb454` | `#c27300` |
| `--accent-primary` (purple) | `#b388ff` | `#5b21b6` |
| `--accent-primary` (teal) | `#4dd0e1` | `#0f766e` |
| `--radius-sm` | `10px` | `10px` |
| `--radius-md` | `14px` | `14px` |
| `--radius-lg` | `20px` | `20px` |
| `--radius-xl` | `28px` | `28px` |
| `--radius-pill` | `999px` | `999px` |
| `--transition-fast` | `160ms cubic-bezier(0.4,0,0.2,1)` | same |
| `--transition` | `280ms cubic-bezier(0.22,0.61,0.36,1)` | same |
| `--shadow-soft` | `0 8px 32px rgba(2,6,23,0.40)` | `0 8px 32px rgba(2,6,23,0.08)` |

> Full token specification: [ui-design-color-spec.md](ui-design-color-spec.md)

### Appendix C: Breakpoint Map (Verified)

| Breakpoint | Category | CSS Media Queries Present |
|------------|----------|---------------------------|
| 320px | Ultra-narrow | ✅ `@media (max-width: 320px)` |
| 360px | Narrow | ✅ `@media (max-width: 360px)` |
| 375-414px | Standard phones | ✅ `@media (max-width: 480px)` covers |
| 768px | Tablet | ✅ Sidebar drawer breakpoint |
| 1280px+ | Desktop | ✅ Sidebar pins, two-card layout |
| 1920px+ | Large | ✅ Content caps at `--max-width: 1280px` |

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.1 | Oct 9, 2026 | patakrishna2006-a11y | Accuracy pass: 27 types (26 UI), registration required, verified SIP/EMI values, corrected design tokens, removed false growth metrics |
| 2.0 | Oct 8, 2026 | patakrishna2006-a11y | Security hardening, responsive fixes, code cleanup |
| 1.0 | Sep 2026 | patakrishna2006-a11y | Initial release |

---

**Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |
| Lead Developer | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |

---

*End of PRD Document*
