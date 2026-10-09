# User Story Mapping & Product Backlog

## FinCalc Pro — Smart Financial Calculators for India

**Version:** 2.1
**Date:** October 9, 2026
**Status:** Active
**Product Owner:** patakrishna2006-a11y

**Sources of truth:** `app.py` (routes/validation), `calculator.py` (27 types), `templates/index.html` (UI), `docs/srs.md` (FR IDs), `docs/prd.md` (roadmap)

---

## Table of Contents

1. [How to Read This Document](#1-how-to-read-this-document)
2. [Users & Personas](#2-users--personas)
3. [The Story Map](#3-the-story-map)
4. [Story Map Detail](#4-story-map-detail)
5. [The Walking Skeleton (Shipped MVP)](#5-the-walking-skeleton)
6. [Prioritized Backlog](#6-prioritized-backlog)
7. [Epic Summaries](#7-epic-summaries)
8. [Release Slices](#8-release-slices)
9. [Sprint Plan](#9-sprint-plan)
10. [Definition of Ready / Definition of Done](#10-definition-of-ready--definition-of-done)
11. [Estimation & Velocity](#11-estimation--velocity)
12. [Requirements Traceability](#12-requirements-traceability)
13. [Known Discrepancies (Doc vs Reality)](#13-known-discrepancies)

---

## 1. How to Read This Document

Work is organized around the **user's experience**, not technical components.

| Concept | Meaning |
|----------|---------|
| **Activity** | Top-level thing a user does (the backbone, read left → right) |
| **Step** | A user task within an activity, ordered in time |
| **Story** | A card under a step; height = priority (top ships first) |
| **Release slice** | A horizontal cut across the map for a coherent release |
| **Backlog** | The single ordered list of story cards with priority/estimate/status |

**Story card format:**

```
ID: US-<AREA>-##        Priority: Must / Should / Could / Won't
Estimate: <points>       Status: ✅ Done | 🚧 In Progress | 📋 Planned | 💡 Idea
Epic: <Epic>             Traces to: <SRS FR IDs>
Story: As a <persona>, I want <capability>, so that <benefit>.
AC:  [Acceptance criteria]
```

**ID prefixes:** `DIS` Discover · `AUT` Auth · `CALC` Calculators · `VIZ` Visualization · `HIST` History · `EXP` Export · `UI` Personalization · `PRF` Profile · `DEL` Deletion · `SEC` Security · `NFR` Non-functional · `TAX/GOAL/PORT/PLAT` Future epics

---

## 2. Users & Personas

Personas are planning fictions from the PRD (§3) used to write user-centered stories — no live user data exists (the app has **no analytics**, by design).

| Persona | Profile | Jobs-to-be-done | Map focus |
|---------|---------|-----------------|-----------|
| **Rahul, 28** — Young Professional | First-time investor | Start SIP, size home loan, save tax | Calculate, Export |
| **Priya, 35** — Family Planner | Household CFO | Education fund, retirement, comparisons | Calculate, History |
| **Rajesh, 52** — Pre-Retiree | 8 yrs to retirement | Corpus check, SWP modeling | Planning, Charts |
| **Kavya, 40** — Business Owner | GST registered | GST, working capital, gratuity | General finance |

> **Reality note:** registration **is required** to use any calculator (`/dashboard` redirects anonymous users to `/`). The PRD's "no registration required for basic use" claim does **not** match the implementation — see §13.

---

## 3. The Story Map

```
USER JOURNEY ──────────────────────────────────────────────────────────────────────────────►

 DISCOVER          ONBOARD              ACCESS              RECOVER            CALCULATE
 ────────          ────────             ──────              ───────            ─────────
 Land on     →   Register        →   Login          →   Forgot/Reset   →   Find calculator
 marketing        Verify email        Logout            Change pwd         Enter inputs
 page                                                                          See results

 VISUALIZE        REVIEW HISTORY       EXPORT              PERSONALIZE         ACCOUNT & DELETE
 ─────────        ──────────────       ──────              ───────────        ────────────────
 See chart    →   Recent activity →    Copy results   →   5 themes      →   Avatar mgmt
 Interact         History panel        Export PDF          Dark/light        Change password
                  Run again / delete                       Persist prefs     Two-step delete
```

Priority runs **top → bottom** within each step; the top row across the map is the shipped MVP (§5).

---

## 4. Story Map Detail

### 4.1 DISCOVER

| Step | Story cards |
|------|-------------|
| Land on page | ✅ `US-DIS-01` Hero + CTAs · ✅ `US-DIS-04` Responsive landing |
| Explore calculators | ✅ `US-DIS-02` Category cards with counts · 💡 `US-DIS-05` Guest demo (no signup) |
| Trust | ✅ `US-DIS-03` Trust indicators |

### 4.2 ONBOARD

| Step | Story cards |
|------|-------------|
| Register | ✅ `US-AUT-01` Register (username + email + password, 9+/letter/number/symbol) · ✅ `US-AUT-02` Confirm match |
| Verify email | ✅ `US-AUT-03` 1-hour single-use hashed-token link · ✅ `US-AUT-04` Check-email page · ✅ `US-AUT-05` Resend (1/5min) |
| Gate | ✅ `US-AUT-03a` Unverified users blocked at login with clear guidance |

### 4.3 ACCESS

| Step | Story cards |
|------|-------------|
| Login | ✅ `US-AUT-06` Login (username AND email AND password) · ✅ `US-AUT-09` Session-fixation prevention (`session.clear()`) |
| Session | ✅ `US-AUT-07` 24-hour cookie (HttpOnly, SameSite=Lax, Secure in prod) |
| Logout | ✅ `US-AUT-08` Logout with confirmation modal |

### 4.4 RECOVER

| Step | Story cards |
|------|-------------|
| Request reset | ✅ `US-AUT-10` Forgot-password email (generic response — no enumeration) |
| Reset | ✅ `US-AUT-11` Reset via 1-hour token (single-use, complexity enforced) |
| In-session | ✅ `US-AUT-12` Change password (current-password proof; invalidates reset tokens) |

### 4.5 CALCULATE — 26 UI calculators (27 backend types)

| Step | Story cards |
|------|-------------|
| Find | ✅ `US-CALC-01` Categorized sidebar (Investments 10 · Planning 3 · Loans & EMI 6 · General 6 · Crypto 1) · ✅ `US-CALC-02` Search with `data-search-tags` synonyms · ✅ `US-CALC-10` Quick chips (SIP, EMI, Retirement, Brokerage, CAGR, GST) |
| Inputs | ✅ `US-CALC-08` Server-side validation per type + inline error box · ✅ `US-CALC-09` Indian-format input formatting (format on blur, raw on focus) |
| Run | ✅ `US-CALC-03` 10 investment types (FR-CALC-01–10) · ✅ `US-CALC-04` 3 planning types (FR-CALC-11–13) · ✅ `US-CALC-05` 6 loan types (FR-CALC-14–19) · ✅ `US-CALC-06` 6 general types (FR-CALC-20–25) · ✅ `US-CALC-07` Crypto converter UI (FR-CALC-26) + backend-only USD⇄INR type (FR-CALC-27, no panel) |
| Results | ✅ `US-CALC-11` Result grid + loading spinner + error states |

### 4.6 VISUALIZE

| Step | Story cards |
|------|-------------|
| Chart | ✅ `US-VIZ-01` Chart.js per panel (present on SIP, Lumpsum, Step-Up SIP, PPF, NSC, FD, RD, Inflation, EMI family, Flat-vs-Reducing, SI, CI, GST) |
| Interact | ✅ `US-VIZ-02` Tooltips + legend · ✅ `US-VIZ-03` Responsive resize |

> Not every panel has a chart — e.g. SWP, EPF, NPS, Retirement, Gratuity, Salary, Brokerage render results without a chart canvas in the current UI.

### 4.7 REVIEW HISTORY

| Step | Story cards |
|------|-------------|
| Recent | ✅ `US-HIST-01` Auto-save every calculation · ✅ `US-HIST-02` Sidebar "Recent Activity" (last 3) |
| All | ✅ `US-HIST-03` History panel — "LAST 10" badge, search box, filter chips |
| Re-run | ✅ `US-HIST-04` "Run again" pre-fills `{TYPE}-{Param}` inputs |
| Delete | ✅ `US-HIST-05` Per-entry delete (ownership-checked) |

### 4.8 EXPORT

| Step | Story cards |
|------|-------------|
| Copy | ✅ `US-EXP-01` Copy formatted results (button flips to "Copied!") |
| PDF | ✅ `US-EXP-02` jsPDF + html2canvas export, theme-aware, Noto Sans font for ₹ · ✅ `US-EXP-03` Filename `FinCalc Pro - {title}.pdf` |

### 4.9 PERSONALIZE

| Step | Story cards |
|------|-------------|
| Theme | ✅ `US-UI-01` 5 themes via profile dropdown (Midnight Indigo, Forest Green, Sunset Orange, Royal Purple, Ocean Teal) |
| Mode | ✅ `US-UI-02` Dark/light toggle in sidebar |
| Persist | ✅ `US-UI-03` `localStorage` (`fincalc-theme`, `fincalc-color-scheme`) · ✅ `US-UI-04` `prefers-reduced-motion` · ✅ `US-UI-05` Responsive 320–2560px |

### 4.10 MANAGE ACCOUNT

| Step | Story cards |
|------|-------------|
| Profile | ✅ `US-PRF-01` Dropdown (username, email, verified badge, member since, last login) |
| Avatar | ✅ `US-PRF-02` Upload (JPG/PNG/WEBP/GIF ≤2 MB, magic-byte validated, AJAX swap) · ✅ `US-PRF-03` Remove (idempotent) |
| Password | ✅ `US-AUT-12` Change password modal |

### 4.11 DELETE ACCOUNT

| Step | Story cards |
|------|-------------|
| Step 1 | ✅ `US-DEL-01` Password gate → 1-hour emailed deletion link |
| Step 2 | ✅ `US-DEL-02` Confirm page → cascade (history → picture file → user row) |
| After | ✅ `US-DEL-03` Session cleared, landing redirect |

---

## 5. The Walking Skeleton (Shipped MVP)

```
Land → Register → Verify email → Login → Open SIP → ₹5,000 · 12% · 10 yrs (End of Month)
→ Future Value ₹11,50,193.45 + chart → Saved to history → Export PDF → Logout
```

Release 1.0 (Sep 2026) delivered this slice; 1.5 added security hardening + responsive overhaul; 2.0 (Oct 2026) completed the calculator matrix, history panel, themes, profile management, and deletion flow.

---

## 6. Prioritized Backlog

Legend: **P** = MoSCoW · **Pt** = points · ✅ Done (v1.0–2.0) · 📋 Planned · 💡 Idea

### 6.1 Discovery & Onboarding

| ID | Story | P | Pt | Status | Traces |
|----|-------|---|----|--------|--------|
| US-DIS-01 | …visitor, hero with clear value props, instantly understand the offer | Must | 3 | ✅ | FR-UI-03 |
| US-DIS-02 | …visitor, category cards with counts, see full breadth up front | Must | 3 | ✅ | FR-UI-03 |
| US-DIS-03 | …visitor, trust indicators, believe results are accurate/private | Should | 2 | ✅ | FR-UI-03 |
| US-DIS-04 | …mobile visitor, landing works at 320px | Must | 3 | ✅ | FR-UI-02 |
| US-DIS-05 | …visitor, guest demo calculator, try before registering | Could | 5 | 💡 | — |
| US-AUT-01 | …new user, register with username/email/password, save my work | Must | 5 | ✅ | FR-AUTH-01 |
| US-AUT-02 | …new user, password rules + confirmation, no weak/mistyped passwords | Must | 2 | ✅ | FR-AUTH-01 |
| US-AUT-03 | …new user, 1-hour verification link, account is provably mine | Must | 5 | ✅ | FR-AUTH-02 |
| US-AUT-04 | …new user, "check your email" page, know what to do next | Must | 2 | ✅ | FR-AUTH-02 |
| US-AUT-05 | …new user, resend verification, recover from a lost email | Should | 2 | ✅ | FR-AUTH-02 |

### 6.2 Access & Recovery

| ID | Story | P | Pt | Status | Traces |
|----|-------|---|----|--------|--------|
| US-AUT-06 | …returning user, log in (username + email + password), reach dashboard | Must | 3 | ✅ | FR-AUTH-03 |
| US-AUT-07 | …logged-in user, 24-hour secure session, stay safe without re-login | Must | 3 | ✅ | FR-AUTH-04 |
| US-AUT-08 | …logged-in user, confirm-logout modal, no accidental sign-out | Should | 1 | ✅ | FR-AUTH-05 |
| US-AUT-09 | …user, session regeneration on login, fixation attacks fail | Must | 2 | ✅ | FR-AUTH-10 |
| US-AUT-10 | …user, emailed reset link, regain access | Must | 5 | ✅ | FR-AUTH-06 |
| US-AUT-11 | …user, reset via token, secure single-use recovery | Must | 3 | ✅ | FR-AUTH-06 |
| US-AUT-12 | …logged-in user, change password in-session, no email round-trip | Should | 3 | ✅ | FR-AUTH-07 |

### 6.3 Calculators

| ID | Story | P | Pt | Status | Traces |
|----|-------|---|----|--------|--------|
| US-CALC-01 | …user, categorized sidebar, find any calculator in one glance | Must | 3 | ✅ | FR-UI-03 |
| US-CALC-02 | …user, search with synonyms ("home loan" finds EMI) | Must | 3 | ✅ | FR-UI-03 |
| US-CALC-03 | …investor, 10 investment calculators (SIP…RD) | Must | 13 | ✅ | FR-CALC-01–10 |
| US-CALC-04 | …planner, Retirement/Inflation/CAGR | Must | 8 | ✅ | FR-CALC-11–13 |
| US-CALC-05 | …borrower, 6 loan calculators incl. Flat-vs-Reducing | Must | 8 | ✅ | FR-CALC-14–19 |
| US-CALC-06 | …user, SI/CI/GST/Gratuity/Salary/Brokerage | Must | 8 | ✅ | FR-CALC-20–25 |
| US-CALC-07 | …crypto user, live converter (100-coin CoinGecko list) | Should | 8 | ✅ | FR-CALC-26–27 |
| US-CALC-08 | …user, inline validation, errors caught before/after submit | Must | 3 | ✅ | NFR-SEC-06 |
| US-CALC-09 | …Indian user, lakh/crore formatting everywhere | Must | 3 | ✅ | FR-UI-05 |
| US-CALC-10 | …first-time user, quick chips, jump into popular calculators | Could | 2 | ✅ | FR-UI-03 |
| US-CALC-11 | …user, labeled result grid, every output self-explanatory | Must | 2 | ✅ | FR-UI-04 |

### 6.4 Visualization, History & Export

| ID | Story | P | Pt | Status | Traces |
|----|-------|---|----|--------|--------|
| US-VIZ-01 | …user, chart per calculation, trends at a glance | Should | 5 | ✅ | FR-UI-06 |
| US-VIZ-02 | …user, tooltips/legend, interrogate data points | Should | 2 | ✅ | FR-UI-06 |
| US-VIZ-03 | …user, charts resize on mobile | Should | 2 | ✅ | FR-UI-02 |
| US-HIST-01 | …user, every calculation auto-saved | Must | 3 | ✅ | FR-HIST-01 |
| US-HIST-02 | …user, recent activity in sidebar (last 3) | Should | 2 | ✅ | FR-HIST-02 |
| US-HIST-03 | …user, searchable history panel (last 10 + filter chips) | Should | 5 | ✅ | FR-HIST-02 |
| US-HIST-04 | …user, one-click re-run pre-fills the form | Should | 3 | ✅ | FR-HIST-03 |
| US-HIST-05 | …user, delete a single entry | Should | 2 | ✅ | FR-HIST-04 |
| US-EXP-01 | …user, copy results to clipboard ("Copied!" feedback) | Should | 2 | ✅ | FR-HIST-05 |
| US-EXP-02 | …user, PDF export with inputs/results (chart via html2canvas) | Should | 5 | ✅ | FR-HIST-04 |
| US-EXP-03 | …user, sortable filename `FinCalc Pro - {title}.pdf` | Could | 1 | ✅ | FR-HIST-04 |

### 6.5 Personalization, Profile & Deletion

| ID | Story | P | Pt | Status | Traces |
|----|-------|---|----|--------|--------|
| US-UI-01 | …user, 5 color themes, the app feels mine | Should | 3 | ✅ | FR-UI-01 |
| US-UI-02 | …user, dark/light toggle, match my environment | Should | 3 | ✅ | FR-UI-01 |
| US-UI-03 | …user, prefs persisted in localStorage | Must | 1 | ✅ | FR-UI-01 |
| US-UI-04 | …motion-sensitive user, reduced-motion support | Should | 2 | ✅ | FR-UI-07 |
| US-UI-05 | …user, full responsiveness 320–2560px | Must | 8 | ✅ | FR-UI-02 |
| US-PRF-01 | …user, profile card (member since, last login) | Should | 3 | ✅ | FR-AUTH-08 |
| US-PRF-02 | …user, upload avatar (≤2 MB, magic-byte validated) | Should | 5 | ✅ | FR-AUTH-08 |
| US-PRF-03 | …user, remove avatar, revert to initials | Could | 2 | ✅ | FR-AUTH-08 |
| US-PRF-04 | …user, verification badge visible | Could | 1 | ✅ | FR-AUTH-02 |
| US-DEL-01 | …user, password-gated + emailed deletion flow | Must | 5 | ✅ | FR-AUTH-09 |
| US-DEL-02 | …user, full cascade deletion of my data | Must | 3 | ✅ | FR-AUTH-09 |
| US-DEL-03 | …user, session killed after deletion | Must | 1 | ✅ | FR-AUTH-09 |

### 6.6 Security & Non-Functional (cross-cutting)

| ID | Story | P | Pt | Status | Traces |
|----|-------|---|----|--------|--------|
| US-SEC-01 | CSRF protection on state changes | Must | 5 | ✅ | NFR-SEC-02 |
| US-SEC-02 | Rate limiting (per-IP) | Must | 5 | ✅ | NFR-SEC-03 |
| US-SEC-03 | Security headers (CSP, HSTS, COOP/CORP…) | Must | 3 | ✅ | NFR-SEC-05 |
| US-SEC-04 | Email tokens hashed at rest | Must | 5 | ✅ | NFR-SEC-10 |
| US-SEC-05 | Validated inputs on all 27 types | Must | 5 | ✅ | NFR-SEC-06 |
| US-SEC-06 | Ownership checks on history (IDOR-safe) | Must | 3 | ✅ | NFR-SEC-07 |
| US-SEC-07 | Safe file uploads (no SVG, magic bytes) | Must | 5 | ✅ | NFR-SEC-06 |
| US-SEC-08 | Rotating security logs | Should | 2 | ✅ | NFR-SEC-09 |
| US-NFR-01 | Page < 3s, API < 500ms p95 | Must | 5 | ✅ | NFR-PERF-01/02 |
| US-NFR-02 | WCAG 2.1 AA | Must | 8 | ✅ | NFR-USE-03 |
| US-NFR-03 | Zero critical/high static findings | Must | 3 | ✅ | NFR-SEC-11 |

### 6.7 Future Backlog (Roadmap — not scheduled)

| ID | Story | P | Pt | Status | Release |
|----|-------|---|----|--------|---------|
| US-TAX-01 | Old-vs-new regime comparison | Must | 8 | 📋 | 2.1 / Q1 2027 |
| US-TAX-02 | 80C/80D optimizer | Must | 8 | 📋 | 2.1 |
| US-TAX-03 | HRA exemption calculator | Should | 5 | 📋 | 2.1 |
| US-TAX-04 | TDS & advance-tax calculators | Should | 5 | 📋 | 2.1 |
| US-TAX-05 | Form 16 parser | Could | 13 | 📋 | 2.1 |
| US-GOAL-01 | Reverse SIP (target → monthly amount) | Must | 8 | 📋 | 2.2 / Q2 2027 |
| US-GOAL-02 | Goal tracker | Must | 8 | 📋 | 2.2 |
| US-GOAL-03 | Multi-goal optimizer | Should | 13 | 📋 | 2.2 |
| US-GOAL-04 | Inflation scenarios | Should | 5 | 📋 | 2.2 |
| US-PORT-01 | CSV import of holdings | Must | 13 | 📋 | 2.3 / Q3 2027 |
| US-PORT-02 | XIRR per holding | Must | 8 | 📋 | 2.3 |
| US-PORT-03 | Asset allocation + rebalancing alerts | Should | 13 | 📋 | 2.3 |
| US-PLAT-01 | Family/shared goals | Could | 13 | 💡 | 2.4 / Q4 2027 |
| US-PLAT-02 | Public versioned API (`/api/v1/`) | Could | 21 | 💡 | 3.0 / 2028 |
| US-PLAT-03 | Native mobile companion | Could | 40 | 💡 | 3.0 / 2028 |
| US-DIS-05 | Guest demo calculator | Could | 5 | 💡 | Unscheduled |

---

## 7. Epic Summaries

| Epic | Goal | Stories | Status |
|------|------|---------|--------|
| **E1 · Auth & Identity** | Secure account lifecycle | US-AUT-01…12 | ✅ Complete |
| **E2 · Calculator Engine** | 27 accurate backend types (26 in UI) | US-CALC-01…11 | ✅ Complete |
| **E3 · History & Export** | Nothing lost, everything shareable | US-HIST-01…05, US-EXP-01…03 | ✅ Complete |
| **E4 · UI/UX Excellence** | Beautiful, responsive, accessible, personal | US-UI-01…05, US-VIZ-01…03, US-DIS-01…04 | ✅ Complete |
| **E5 · Security Hardening** | 18/18 controls pass | US-SEC-01…08 | ✅ Complete |
| **E6 · Profile & Deletion** | Full user control of data | US-PRF-01…04, US-DEL-01…03 | ✅ Complete |
| **E7 · Tax Suite** | Regime comparison, deductions | US-TAX-01…05 | 📋 Q1 2027 |
| **E8 · Goal Planning** | Reverse SIP, goal tracking | US-GOAL-01…04 | 📋 Q2 2027 |
| **E9 · Portfolio Tracker** | Holdings, XIRR, allocation | US-PORT-01…03 | 📋 Q3 2027 |
| **E10 · Platform** | Family sharing, public API, mobile | US-PLAT-01…03 | 💡 2028 |

---

## 8. Release Slices

| Release | Date | Slice contents | Outcome |
|---------|------|----------------|---------|
| **1.0** | Sep 2026 | Walking skeleton: landing, register/verify/login, core calculators, history save | Usable end-to-end |
| **1.5** | Sep 2026 | Security hardening + responsive overhaul | Production-safe, mobile-perfect |
| **2.0** | Oct 2026 | Full matrix (27 types), history panel, PDF export, 5 themes, profile mgmt, two-step deletion | **Current** — E1–E6 complete |
| **2.1** | Q1 2027 | Tax suite | Tax-season ready |
| **2.2** | Q2 2027 | Goal planning | Goal-driven planning |
| **2.3** | Q3 2027 | Portfolio tracker | Investment tracking |
| **3.0** | 2028 | Public API + mobile | Platform |

**Release criteria:** tests pass · Bandit/pip-audit clean · p95 within budget · WCAG 2.1 AA verified · docs updated · PO + Security + QA sign-off.

---

## 9. Sprint Plan

Two-week sprints · velocity assumption ~34 pts (2 dev + 1 QA) · 20% maintenance reserve.

| Sprint | Focus | Stories | Points |
|--------|-------|---------|--------|
| 1–2 | Tax suite — core | US-TAX-01…03 | 21 |
| 3–4 | Tax suite — extended | US-TAX-04, US-TAX-05 | 18 |
| 5–6 | Goal planning — core | US-GOAL-01, US-GOAL-02 | 16 |
| 7–8 | Goal planning — advanced | US-GOAL-03, US-GOAL-04 | 18 |
| 9–10 | Portfolio — core | US-PORT-01, US-PORT-02 | 21 |
| 11–12 | Portfolio — advanced | US-PORT-03 | 13 |

---

## 10. Definition of Ready / Definition of Done

### 10.1 Definition of Ready

- [ ] Persona perspective + clear benefit
- [ ] Testable acceptance criteria
- [ ] Traced to SRS FR IDs
- [ ] UI reference exists (`ux-wireframes.md` / `ui-design-color-spec.md`)
- [ ] API contract known (`api-documentation.md`)
- [ ] Dependencies identified (external APIs, keys, migrations)
- [ ] Estimated; nothing > 13 pts (split first)

### 10.2 Definition of Done

- [ ] Code reviewed
- [ ] Calculator outputs verified against known values (run `calculator.py` directly)
- [ ] Input validation + rate limiting on any new endpoint
- [ ] Responsive check 320/768/1280
- [ ] Accessibility: labels, contrast ≥ 4.5:1, keyboard, ARIA
- [ ] Bandit + pip-audit clean
- [ ] Security events logged
- [ ] Docs updated
- [ ] PO acceptance against AC

---

## 11. Estimation & Velocity

| Points | Meaning | Example |
|--------|---------|---------|
| 1 | Trivial | US-EXP-03 filename |
| 2 | Small | Toasts, toggles, badges |
| 3 | Standard component | Sidebar search, themes |
| 5 | Multi-surface | PDF export, email flows |
| 8 | Feature slice | Planning calculators |
| 13 | Large — consider splitting | CSV import |
| 21+ | Epic — must split | Public API |

**Velocity:** v2.0 shipped ~150 pts across E1–E6 (~34 pts/sprint over ~4.5 sprints). Future epics are roadmap placeholders.

---

## 12. Requirements Traceability

| Story group | SRS FR IDs | Verification |
|--------------|-----------|--------------|
| US-AUT-01…05 | FR-AUTH-01, 02 | Auth flow E2E |
| US-AUT-06…09 | FR-AUTH-03, 04, 05, 10 | Security regression |
| US-AUT-10…12 | FR-AUTH-06, 07 | Reset/change E2E |
| US-CALC-03…07 | FR-CALC-01…27 | Known-value unit tests (values run from `calculator.py`) |
| US-HIST-01…05 | FR-HIST-01…05 | History panel E2E |
| US-EXP-01…03 | FR-HIST-04, 05 | Export E2E |
| US-UI-01…05 | FR-UI-01…07 | Responsive suite + Lighthouse a11y |
| US-PRF/US-DEL | FR-AUTH-08, 09 | Upload + cascade tests |
| US-SEC-01…08 | NFR-SEC-01…18 | Security audit, Bandit, pip-audit |

**Rule:** no story is ✅ Done without a matching verification artifact.

---

## 13. Known Discrepancies (Doc vs Reality)

Items where earlier documents (PRD/SRS) state something the code does not do. These are documented here so QA and PM treat the **code as truth**:

| # | Earlier claim | Reality (from code) |
|---|---------------|---------------------|
| 1 | "25+ calculators free, no registration for basic use" | **All calculators require login** — `/dashboard` redirects anonymous users to `/` |
| 2 | "26 calculators" | **27 backend types**; 26 in UI sidebar; `USD_INR_CONVERTER` is backend-only (no panel) |
| 3 | "Calculations run locally" (welcome copy in `index.html`) | Calculations **POST to the server** (`/calculate`); the shipped copy text is misleading and should be updated (candidate bug ticket) |
| 4 | PDF filename `FinCalc_{calculator}_{timestamp}.pdf` | Actual: **`FinCalc Pro - {title}.pdf`** (line 3601 of `index.html`) |
| 5 | API returns `{success, data}` | Actual keys: **`result`** + `formatted_params` |
| 6 | Rate limits "per user" | All limits keyed by **IP** (`get_remote_address`) |
| 7 | "Charts on all calculators" | ~17 of 26 panels have chart canvases; SWP, EPF, NPS, Retirement, Gratuity, Salary, Brokerage render grids without charts |

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.1 | Oct 9, 2026 | patakrishna2006-a11y | Accuracy pass: 27 types, per-IP limits, real PDF filename, verified sample values, §13 discrepancy register |
| 1.0 | Oct 8, 2026 | patakrishna2006-a11y | Initial story map + backlog |

---

**Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |
| Scrum Master | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |
| Lead Developer | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |

---

*End of User Story Mapping & Product Backlog Document*
