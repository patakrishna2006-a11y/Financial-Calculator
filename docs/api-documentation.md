# API Documentation

## FinCalc Pro patakrishna2006-a11y Smart Financial Calculators for India

**Version:** 2.1
**Date:** October 9, 2026
**Status:** Active
**Base URL:** `https://<your-deployment>` (dev: `http://localhost:5000`)
**Source of truth:** `app.py`, `calculator.py`, `templates/index.html`

---

## Table of Contents

1. [Overview](#1-overview)
2. [Authentication & Sessions](#2-authentication--sessions)
3. [Rate Limiting](#3-rate-limiting)
4. [Request/Response Conventions](#4-requestresponse-conventions)
5. [Authentication Endpoints](#5-authentication-endpoints)
6. [Calculator API](#6-calculator-api)
7. [Calculator Type Reference (27 Types)](#7-calculator-type-reference)
8. [History Endpoints](#8-history-endpoints)
9. [Profile & Account Endpoints](#9-profile--account-endpoints)
10. [Public Market Data Endpoints](#10-public-market-data-endpoints)
11. [Error Catalog](#11-error-catalog)
12. [Security Reference](#12-security-reference)
13. [Changelog](#13-changelog)

---

## 1. Overview

FinCalc Pro exposes a JSON API consumed by its own server-rendered frontend (Jinja2 + vanilla JS). All calculator and account endpoints require an authenticated session. Two market-data endpoints are public.

| Attribute | Value |
|-----------|-------|
| Transport | HTTPS (HSTS in production) |
| Format | JSON (`Content-Type: application/json` for JSON APIs) |
| Auth model | Session cookie (Flask signed session) |
| CSRF | Flask-WTF global; **`POST /calculate` is `@csrf.exempt`** and relies on session auth |
| Rate limiting | Flask-Limiter (`get_remote_address` → **per-IP**), Redis in prod, memory in dev |
| Timezone | All timestamps in IST (`Asia/Kolkata`) |
| Currency | INR, Indian number format (`₹1,00,000.00`) |
| Calculator types | **27** backend types; **26** exposed in the UI (see §7 note) |

### 1.1 Envelope Format

Success from `/calculate`:

```json
{
  "success": true,
  "result": { },
  "formatted_params": { }
}
```

Failure (all JSON endpoints):

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

> **Note:** the response key is `result` (not `data`), and the request parameter keys are human-readable labels with spaces (e.g. `"Monthly investment"`), matching the UI labels exactly.

---

## 2. Authentication & Sessions

| Property | Value |
|----------|-------|
| Session mechanism | Flask signed cookie (`session`) |
| Cookie flags | `HttpOnly`, `SameSite=Lax`, `Secure` (production only) |
| Lifetime | 24 hours (`PERMANENT_SESSION_LIFETIME`) |
| Fixation prevention | `session.clear()` before login; new session issued |
| Login identity | Username **AND** email **AND** password must all match a verified account |
| Email verification | Required before first login (1-hour, single-use, hashed token) |

Protected endpoints without a valid session receive **401**:

```json
{ "success": false, "error": "Authentication required" }
```

---

## 3. Rate Limiting

All limits are enforced **per IP address** (`get_remote_address`). Production uses Redis so limits are shared across workers. Exceeding a limit returns **429** with `Retry-After` (JSON clients) or the 429 error page (HTML flow).

| Endpoint | Limit |
|----------|-------|
| Global default | 200/day, 50/hour |
| `POST /calculate` | 30/min, 100/hour |
| `GET/POST /register` | 5/min, 20/hour |
| `POST /resend-verification` | 1 per 5 min, 5/hour |
| `GET/POST /login` | 10/min, 50/hour |
| `GET/POST /forgot-password` | 5/hour |
| `POST /change-password` | 5/min, 10/hour |
| `POST /update-profile-picture` | 5/min, 20/hour |
| `POST /remove-profile-picture` | 5/min, 20/hour |
| `POST /request-account-deletion` | 3/hour, 10/day |
| `GET /api/crypto/prices` | 60/min |
| `GET /api/usd-inr/rate` | 60/min |

**429 (JSON clients):**

```json
{ "success": false, "error": "Rate limit exceeded. Please try again later." }
```
```
Retry-After: 60
```

**Special HTML redirects on 429** (form flows): `/resend-verification` → flash "Too many requests. Please wait 5 minutes before resending."; `/forgot-password` → flash "Too many requests. Please wait before requesting another reset link."

---

## 4. Request/Response Conventions

- JSON APIs require `Content-Type: application/json`; otherwise **400**.
- Form endpoints (`/register`, `/login`, `/forgot-password`, `/reset-password`, `/resend-verification`, `/confirm-account-deletion`) accept `application/x-www-form-urlencoded` and respond with **302 redirects + flash messages**.
- A request is treated as AJAX if `request.is_json` or it carries `X-Requested-With: XMLHttpRequest` patakrishna2006-a11y AJAX gets JSON errors, everyone else gets HTML.
- Numeric params may be numbers or numeric strings; the server coerces via `safe_float`/`safe_int` (non-numeric → 0).
- All money results are **pre-formatted Indian-format strings** (e.g. `"₹11,50,193.45"`) patakrishna2006-a11y ready for display, not raw numbers.

---

## 5. Authentication Endpoints

### 5.1 Register

```
GET  /register            → 200 HTML (form)
POST /register            → 302 redirect
```

**Form fields:**

| Field | Rules |
|-------|-------|
| `username` | Required, ≤50 chars, unique |
| `email` | Required, valid format, ≤100 chars, unique |
| `password` | ≥9 chars, ≥1 letter, ≥1 number, ≥1 symbol |
| `confirm_password` | Must match `password` |

**Behavior (all responses are 302 + flash):**

- Success → unverified account created, 1-hour verification token emailed, redirect `/register?check_email=1`, flash `"Verification email sent! Please check your inbox (valid for 1 hour)."`
- Email send failure → account still created, flash `"Account created but verification email could not be sent. Use the \"Resend\" option on the next page."`
- Duplicate **unverified** account (by username or email) → token regenerated, verification re-sent, redirect to check-email page
- Duplicate **verified** account → `"Username already exists"` / `"An account with this email already exists"`
- Weak password → `"Password must be at least 9 characters long and include a letter, a number, and a symbol."`
- Missing fields → `"All fields are required."`; mismatch → `"Passwords do not match."`; bad email → `"Invalid email format."`

### 5.2 Verify Email

```
GET /verify-email/<token>   → 302 redirect
```

- Valid → `is_verified=True`, token cleared, redirect `/login`, flash `"Email verified successfully! You can now login."`
- Invalid/expired → redirect `/register`, flash `"Invalid verification link."` / `"Verification link has expired. Please register again."`
- Already verified → flash `"Email already verified. Please login."`

Token details: `secrets.token_urlsafe(32)`, stored as PBKDF2 hash, 1-hour expiry, single-use, constant-time comparison.

### 5.3 Resend Verification

```
POST /resend-verification    (form field: email)
Rate limit: 1 per 5 min, 5/hour
```

- Found unverified account → new token, email re-sent, flash `"Verification email resent! Please check your inbox (valid for 1 hour)."`
- Not found → generic flash `"If this email is registered and unverified, a new verification link has been sent."` (no enumeration)

### 5.4 Login

```
GET  /login    → 200 HTML
POST /login    → 302 redirect
```

**Form fields:** `username`, `email`, `password` (all three required)

- Success → `session.clear()` then new session, `last_login` updated, redirect `/dashboard`, flash `"Successful login!"`
- Unverified → flash `"Please verify your email first. Check your inbox for the verification link."`
- Bad credentials → flash `"Invalid credentials"`

### 5.5 Logout

```
GET /logout   → 302 to /
```
Clears the session entirely; flash `"Logout successfully!"`. No rate limit.

### 5.6 Forgot / Reset Password

```
GET/POST /forgot-password           → HTML / 302
GET/POST /reset-password/<token>    → HTML / 302
```

- `POST /forgot-password` (`email`): if the account exists, a 1-hour reset token is emailed. The response is always the **same generic flash** patakrishna2006-a11y `"If an account is registered with that email, a password reset link has been sent. It is valid for 1 hour."` (no enumeration).
- `POST /reset-password/<token>` (`password`, `confirm_password`): validates token (hashed, constant-time, 1-hour, single-use patakrishna2006-a11y expiry clears the token), enforces the same password complexity, clears the token on success, flash `"Your password has been changed. Please login with your new password."`

---

## 6. Calculator API

### 6.1 Execute Calculation

```
POST /calculate
Auth: session required
Rate limit: 30/min, 100/hour (per IP)
Content-Type: application/json
CSRF: exempt (@csrf.exempt) patakrishna2006-a11y protected by session auth
```

**Request:**

```json
{
  "type": "SIP",
  "params": {
    "Monthly investment": 5000,
    "Expected return": 12,
    "Years": 10,
    "Mode": "End of Month"
  }
}
```

**Success patakrishna2006-a11y 200** (values verified by running `calculator.py` directly):

```json
{
  "success": true,
  "result": {
    "Total Investment": "₹6,00,000.00",
    "Future Value": "₹11,50,193.45",
    "Wealth Gained": "₹5,50,193.45"
  },
  "formatted_params": {
    "Monthly investment": "5,000.00",
    "Expected return": "12.00",
    "Years": "10",
    "Mode": "End of Month"
  }
}
```

> The sample above is the **default End-of-Month** mode. With `"Mode": "Beginning of Month"` the same inputs yield `Future Value ₹11,61,695.38`, `Wealth Gained ₹5,61,695.38`.

- `result` patakrishna2006-a11y display-ready key/value strings (Indian format)
- `formatted_params` patakrishna2006-a11y inputs normalized per `PARAM_DECIMALS` for history storage

**Side effect:** every successful calculation is persisted to the user's history (`calc_type`, formatted params, result, IST timestamp).

**Error responses:**

| Status | Condition | Body |
|--------|-----------|------|
| 400 | Not JSON | `"Content-Type must be application/json"` |
| 400 | Unparseable JSON | `"Invalid JSON"` |
| 400 | Missing type | `"Missing calculator type"` |
| 400 | Unknown type | `"Invalid calculator type"` |
| 400 | Missing params | `"Missing required parameters for SIP"` |
| 400 | Range violation | `"<key> cannot be negative"` · `"<key> must be positive"` · `"<key> out of valid range"` · `"<key> percentage out of valid range"` · `"Invalid value for <key>"` |
| 400 | Domain error (raised by calculator) | e.g. `"Years must be greater than 0"` |
| 401 | No session | `"Authentication required"` |
| 429 | Rate limit | See §3 |
| 500 | Calculation failure | `"Calculation failed"` (details in `security.log`) |

**Server-side validation rules (`validate_calculator_input`):**

- Required keys per type patakrishna2006-a11y see §7
- Non-numeric passthrough keys: `Segment`, `Mode`, `mode`, `From Currency`, `To Currency`
- Amounts cannot be negative; keys containing `rate`/`return`/`interest`/`growth`/`inflation` are capped at 100
- `Years`, `Years of service`, ages, `Quantity`, `Compounding_per_year` must be > 0; ages ≤ 120

### 6.2 Example patakrishna2006-a11y EMI (verified values)

```json
{
  "type": "EMI",
  "params": { "Loan amount": 2500000, "Interest rate": 8.5, "Years": 20 }
}
```

```json
{
  "success": true,
  "result": {
    "Monthly EMI": "₹21,695.58",
    "Principal": "₹25,00,000.00",
    "Total Interest": "₹27,06,939.40",
    "Total Amount": "₹52,06,939.40"
  },
  "formatted_params": { "Loan amount": "25,00,000.00", "Interest rate": "8.50", "Years": "20" }
}
```

### 6.3 Example patakrishna2006-a11y Crypto Converter

```json
{
  "type": "CRYPTO_CONVERTER",
  "params": { "From Currency": "BTC", "To Currency": "INR", "Amount": 0.5 }
}
```

Response shape (values vary with live market data):

```json
{
  "success": true,
  "result": {
    "From Currency": "BTC",
    "To Currency": "INR",
    "From Amount": "0.50000000",
    "To Amount": "4150000.00000000",
    "From Value (USD)": "$43500.00",
    "To Value (USD)": "$43500.00",
    "From Value (INR)": "₹43,50,000.00",
    "To Value (INR)": "₹43,50,000.00"
  },
  "formatted_params": { "From Currency": "BTC", "To Currency": "INR", "Amount": "0.50000000" }
}
```

> Prices come from the server-side cache (CoinGecko, 30s TTL; CurrencyAPI, 60s TTL). If a currency is missing from cached data the `result` object contains `"Error": "Currency not found in price data"` patakrishna2006-a11y the HTTP status is still 200 because the calculation endpoint resolved. Live feed health is exposed by §10.

### 6.4 More Verified Samples (from `calculator.py`)

| Calculator | Inputs | Output |
|------------|--------|--------|
| `CAGR` | 100000 → 200000, 5 yrs | `CAGR %: "14.87%"` |
| `GST` | ₹1,000 @ 18% | GST Amount ₹180.00 · Total ₹1,180.00 |
| `INFLATION` | ₹1,000 @ 6% × 10 yrs | Future ₹1,790.85 · Increase ₹790.85 |
| `PPF` | ₹1.5L/yr @ 7.1% × 15 yrs | Maturity ₹40,68,209.22 |
| `LUMPSUM` | ₹1L @ 12% × 10 yrs | Future ₹3,10,584.82 |
| `FLAT_VS_REDUCING` | ₹5L @ 10% × 5 yrs | Flat ₹12,500.00/mo vs Reducing ₹10,623.52/mo · Saves ₹1,12,588.66 |
| `RETIREMENT_CALCULATOR` | age 30, ₹50k/mo, retire 60, live 85, 6% infl, 7% ret | Corpus ₹7,64,27,464.51 · SIP ₹62,646.95/mo |

---

## 7. Calculator Type Reference

**27 valid `type` values** (the `valid_types` list in `app.py`). **26 appear in the UI sidebar**; `USD_INR_CONVERTER` is a backend type with **no panel or sidebar item** in `templates/index.html` patakrishna2006-a11y it is reachable only by direct API call.

### 7.1 Investments (10)

| Type | Required params | Optional (defaults) | Result keys |
|------|-----------------|--------------------|-------------|
| `SIP` | `Monthly investment`, `Expected return`, `Years` | `Mode` (`"End of Month"` default; `"Beginning of Month"`) | Total Investment, Future Value, Wealth Gained |
| `LUMPSUM` | `Total investment`, `Expected return`, `Years` | patakrishna2006-a11y | Total Investment, Future Value, Wealth Gained |
| `STEP_UP_SIP` | `Monthly investment`, `Step up rate`, `Expected return`, `Years` | patakrishna2006-a11y | Total Investment, Future Value, Wealth Gained |
| `SWP` | `Total investment`, `Withdrawal amount`, `Expected rate`, `Years` | patakrishna2006-a11y | Total Investment, Total Withdrawal, Future Value |
| `PPF` | `Yearly investment`, `Annual interest rate`, `Years` | patakrishna2006-a11y | Total Investment, Maturity Value, Wealth Gained |
| `EPF` | `Basic salary`, `DA`, `Years of service`, `Annual salary growth`, `Epf interest rate` | patakrishna2006-a11y | Total Contribution, Total Corpus, Interest Earned |
| `NPS` | `Monthly investment`, `Annual return`, `Current age` | `Retirement age` (60) | Investment Period (Years), Total Investment, Interest Earned, Maturity Amount, 60% Lump Sum, 40% Annuity |
| `NSC` | `Amount invested`, `Interest rate` | `Years` (5) | Invested Amount, Maturity Amount, Wealth Gained |
| `FD_SIMPLE` | `Principal`, `Interest rate`, `Years` | patakrishna2006-a11y | Principal, Interest, Maturity Amount |
| `RD` | `Monthly investment`, `Expected rate`, `Years` | patakrishna2006-a11y | Invested Amount, Maturity Amount, Wealth Gained |

### 7.2 Planning (3)

| Type | Required params | Optional (defaults) | Result keys |
|------|-----------------|--------------------|-------------|
| `RETIREMENT_CALCULATOR` | `Age`, `Monthly expense` | `Retirement age` (60), `Life expectancy` (85), `Inflation` (6), `Annual return` (7) | Retirement Corpus Required, Monthly SIP Required |
| `INFLATION` | `Current price`, `Rate`, `Years` | patakrishna2006-a11y | Current Price, Future Price, Cost Increase |
| `CAGR` | `Initial value`, `Final value`, `Years` | patakrishna2006-a11y | CAGR % |

### 7.3 Loans & EMI (6)

| Type | Required params | Result keys |
|------|-----------------|-------------|
| `EMI`, `HOME_LOAN_EMI`, `CAR_LOAN_EMI`, `GOLD_LOAN_EMI`, `EDUCATION_LOAN_EMI` | `Loan amount`, `Interest rate`, `Years` | Monthly EMI, Principal, Total Interest, Total Amount |
| `FLAT_VS_REDUCING` | `Principal`, `Annual rate`, `Years` | Flat EMI, Flat Total Payable, Reducing EMI, Reducing Total Payable, Saves |

### 7.4 General Finance (6)

| Type | Required params | Optional | Result keys |
|------|-----------------|----------|-------------|
| `SIMPLE_INTEREST` | `Principal amount`, `Rate of interest`, `Years` | patakrishna2006-a11y | Principal Amount, Interest, Total Amount |
| `COMPOUND_INTEREST` | `Principal amount`, `Interest rate`, `Years` | `Compounding_per_year` (4) | Principal Amount, Interest, Total Amount |
| `GST` | `Original price`, `Gst rate` | patakrishna2006-a11y | Original Price, GST Amount, Total Amount |
| `GRATUITY` | `Basic salary`, `DA`, `Years of service` | patakrishna2006-a11y | Gratuity Amount |
| `SALARY_CALCULATOR` | `CTC`, `Bonus`, `Professional tax`, `Employer pf`, `Employee pf`, `Other deductions` | patakrishna2006-a11y | Total Monthly Deduction, Take Home Monthly, Take Home Annual, Total Annual Deduction |
| `BROKERAGE_CALCULATOR` | `Segment`, `Quantity`, `Buy price`, `Sell price`, `Brokerage` | `Segment` default `"delivery"` | Segment, Turnover, P&L, Brokerage, STT, Exchange Charges, SEBI Charges, GST, Stamp Duty, Total Charges, Net P&L |

`Segment` values: `delivery` \| `intraday` \| `futures` \| `options` patakrishna2006-a11y anything else returns `"Error": "Invalid segment type"` in `result`.

### 7.5 Crypto & Currency (2)

| Type | Required params | Notes |
|------|-----------------|-------|
| `CRYPTO_CONVERTER` | `From Currency`, `To Currency`, `Amount` | Live CoinGecko prices (100-coin list) + INR via CurrencyAPI; 8-decimal amounts |
| `USD_INR_CONVERTER` | `From Currency`, `To Currency`, `Amount` | **Backend-only patakrishna2006-a11y no UI panel.** Only USD/INR pair supported; uses live CurrencyAPI rate |

---

## 8. History Endpoints

### 8.1 Dashboard History Payload

There is **no standalone `GET /history` JSON endpoint**. `GET /dashboard` server-renders the SPA and embeds the **last 10** entries (`.limit(10)`, newest first) as `history_json` via `build_history_entries()`:

```
GET /dashboard   (auth required) → 200 HTML
```

**Entry shape:**

```json
{
  "id": 42,
  "calc": "SIP",
  "icon": "📈",
  "time": "2026-10-08T14:30:00+05:30",
  "headline": "₹11,50,193.45",
  "label": "future value",
  "summary": "₹5,000/month · 12% · 10 years",
  "inputs": { "Monthly investment": "5,000.00", "Expected return": "12.00", "Years": "10", "Mode": "End of Month" },
  "results": { "Total Investment": "₹6,00,000.00", "Future Value": "₹11,50,193.45", "Wealth Gained": "₹5,50,193.45" },
  "type": "SIP",
  "params": { "Monthly investment": "5,000.00", "Expected return": "12.00", "Years": "10", "Mode": "End of Month" }
}
```

- `type` + `params` power the **"Run again"** action (pre-fills the calculator form by input ID `{TYPE}-{Param}` )
- `headline`/`label`/`summary` are display captions derived per calculator type
- Icons come from `CALC_META` (emoji per type)

### 8.2 Delete a History Entry

```
DELETE /history/<entry_id>   (auth required)
```

| Status | Body |
|--------|------|
| 200 | `{"success": true}` |
| 401 | `{"success": false, "error": "Authentication required"}` |
| 404 | `{"success": false, "error": "Entry not found"}` |
| 500 | `{"success": false, "error": "Failed to delete entry"}` |

Ownership enforced by `filter_by(id=entry_id, user_id=session['user_id'])` patakrishna2006-a11y IDOR-safe.

---

## 9. Profile & Account Endpoints

All are AJAX JSON endpoints (send `Content-Type: application/json`, except the multipart upload) and require a session.

### 9.1 Change Password

```
POST /change-password
Rate limit: 5/min, 10/hour
```

**Request:**

```json
{
  "current_password": "Old@Pass1",
  "new_password": "New@Pass2",
  "confirm_password": "New@Pass2"
}
```

**Rules:** current password must verify; new must match confirmation and the 9+/letter/number/symbol policy; new must differ from current. On success any pending email reset tokens are invalidated (session persists patakrishna2006-a11y no forced logout).

**200:**

```json
{ "success": true, "message": "Password changed successfully. Use your new password next time you log in." }
```

**400:** `"All fields are required"` · `"Current password is incorrect"` · `"New passwords do not match"` · password policy text · `"New password must be different from the current password"`

### 9.2 Update Profile Picture

```
POST /update-profile-picture
Content-Type: multipart/form-data   (field: picture)
Rate limit: 5/min, 20/hour
```

**Validation chain:**

| Check | Status / error |
|-------|----------------|
| No file | 400 `"No image selected"` |
| Disallowed extension | 400 `"Only JPG, PNG, WEBP or GIF images are allowed"` |
| Empty file | 400 `"The selected file is empty"` |
| > 2 MB | 413 `"Image is too large patakrishna2006-a11y maximum size is 2 MB"` |
| Bad magic bytes | 400 `"Invalid or corrupted image file"` |

**200:**

```json
{ "success": true, "picture_url": "/static/uploads/profiles/user_1_0be8c0add78c9a4f.jpg?v=1760000000" }
```

Filenames are server-generated (`user_{id}_{token_hex(8)}.{fmt}`); the previous file is deleted. SVG is intentionally rejected (stored-XSS risk).

### 9.3 Remove Profile Picture

```
POST /remove-profile-picture
Rate limit: 5/min, 20/hour
```

Idempotent patakrishna2006-a11y **200:**

```json
{ "success": true, "message": "Profile picture removed" }
```
(or `"No profile picture to remove"` when none was set)

### 9.4 Request Account Deletion (Step 1)

```
POST /request-account-deletion
Rate limit: 3/hour, 10/day
```

**Request:** `{"current_password": "..."}`

Verifies password → issues 1-hour hashed deletion token → emails confirmation link. If the email fails, the token is rolled back and **500** is returned: `"Could not send the verification email. Please try again later."`

**200:**

```json
{ "success": true, "message": "Verification email sent. Check your inbox to confirm account deletion patakrishna2006-a11y the link is valid for 1 hour." }
```

### 9.5 Confirm Account Deletion (Step 2)

```
GET/POST /confirm-account-deletion/<token>
```

- `GET` → renders `confirm_deletion.html` (username + warning)
- `POST` (CSRF-protected form) → cascade delete: **history rows → profile picture file → user row → session cleared if it was the deleted user** → redirect `/` with flash `"Your account has been permanently deleted. We are sorry to see you go!"`
- Invalid/expired token → redirect `/` with error flash; expired tokens are cleared

This route is unauthenticated by design patakrishna2006-a11y the emailed link is the proof of intent.

---

## 10. Public Market Data Endpoints

### 10.1 Crypto Prices

```
GET /api/crypto/prices
Rate limit: 60/min · Auth: none
```

**200:**

```json
{
  "success": true,
  "prices": {
    "BTC": 67000.5, "btc": 67000.5,
    "ETH": 3200.25, "eth": 3200.25,
    "inr": 0.0120,
    "usd_inr_rate": 83.12
  },
  "coins": ["BTC", "ETH", "USDT", "BNB", "SOL"],
  "usd_inr_rate": 83.12,
  "cached_at": 1728403200.123
}
```

- `prices` maps UPPERCASE symbols (and lowercase duplicates for tolerant lookup) to USD values; `inr` is stored as USD-per-INR (`1 / usd_inr_rate`) so it participates in the same conversion formula
- The coin list is the fixed 77-ID `COINGECKO_TOP_100_IDS` list (top ~100 coins), fetched as one batch call
- Crypto cache TTL: **30 s**; USD/INR cache TTL: **60 s**; stale cache is served if the upstream fetch fails

**503** (never-fetched feeds):

```json
{ "success": false, "error": "Live market rates are temporarily unavailable" }
```

### 10.2 USD/INR Rate

```
GET /api/usd-inr/rate
Rate limit: 60/min · Auth: none
```

**200:**

```json
{
  "success": true,
  "rate": 83.12,
  "provider": "CurrencyAPI",
  "cached_at": 1728403200.123,
  "source_updated_at": null
}
```

**503:**

```json
{ "success": false, "error": "Live USD/INR rate is unavailable. Configure CURRENCY_API_KEY." }
```

> **By design there is no hard-coded fallback FX rate.** If CurrencyAPI fails, the last successful cached rate is served; if none exists, 503. Freshness depends on the CurrencyAPI plan (free = daily, Small = hourly, Medium/Large = 60 s updates).

---

## 11. Error Catalog

| Status | When | JSON body |
|--------|------|-----------|
| 400 | Malformed JSON, validation, CSRF failure (AJAX) | `{"success": false, "error": "..."}` |
| 401 | Missing session on protected endpoint | `"Authentication required"` (HTML users redirected to login) |
| 403 | Access denied | `"Access denied"` |
| 404 | Unknown route / history entry | `"Not found"` |
| 405 | Wrong verb | `"Method not allowed"` |
| 413 | Body > 5 MB | `"Payload too large"` |
| 429 | Rate limit (+`Retry-After`) | `"Rate limit exceeded. Please try again later."` |
| 500 | Unhandled exception (DB rolled back) | `"Internal server error"` |

Error pages exist as themed templates for 400, 401, 403, 404, 405, 413, 429, 500.

---

## 12. Security Reference

| Control | Behavior |
|---------|----------|
| CSRF | Flask-WTF global; 12-hour server limit (`WTF_CSRF_TIME_LIMIT=43200`), 1-hour JS refresh (`WTF_CSRF_TIME_OUT=3600`); `/calculate` exempt (session-auth protected) |
| Session | `HttpOnly; SameSite=Lax; Secure` (prod); 24-hour lifetime; cleared on login |
| Rate limiting | Per-IP, Redis-backed in prod |
| Tokens | `secrets.token_urlsafe(32)`; PBKDF2-hashed at rest; constant-time compare; 1-hour expiry; single-use |
| Input validation | `validate_calculator_input()` on all 27 types |
| IDOR | History filtered by `user_id` |
| Uploads | Magic-byte validation, 2 MB, server-generated names, SVG rejected |
| Headers (every response) | CSP, HSTS (prod), `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy, COOP, CORP |
| Logging | Security events to rotating `security.log` (10 MB × 10 backups); format `EVENT | ip=X | user_id=Y | details` |
| Errors | No stack traces; generic 500 |

**CSP:**

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
img-src 'self' data: https:;
connect-src 'self' https://cdn.jsdelivr.net;
frame-ancestors 'none'; base-uri 'self'; form-action 'self'
```

---

## 13. Changelog

No URL versioning yet; `/api/v1/` prefix planned for the future public API platform.

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | Oct 9, 2026 | Accuracy pass: 27 types (USD_INR backend-only), per-IP limits, `/calculate` CSRF-exempt, verified example values, real PDF filename, no standalone history endpoint |
| 2.0 | Oct 8, 2026 | Full flow documentation |
| 1.0 | Sep 2026 | Initial API |

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.1 | Oct 9, 2026 | patakrishna2006-a11y | Verified against `app.py` commit; all sample values computed by running `calculator.py` |

---

**Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |
| Lead Developer | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |
| Security Reviewer | patakrishna2006-a11y | patakrishna2006-a11y | October 9, 2026 |

---

*End of API Documentation*
