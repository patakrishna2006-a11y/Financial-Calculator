# Technical Requirements Document (TRD)

## FinCalc Pro — Smart Financial Calculators for India

**Version:** 2.1
**Date:** October 9, 2026
**Status:** Active
**Technical Lead:** patakrishna2006-a11y

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture Design](#3-architecture-design)
4. [Database Design](#4-database-design)
5. [API Specification](#5-api-specification)
6. [Security Implementation](#6-security-implementation)
7. [Deployment](#7-deployment)
8. [Development Standards](#8-development-standards)
9. [Appendices](#9-appendices)

---

## 1. System Overview

### 1.1 Purpose
This TRD defines the technical implementation of FinCalc Pro, translating functional requirements into technical designs. All values verified against the actual codebase.

### 1.2 System Context

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FinCalc Pro System                            │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    HTTPS/REST      ┌──────────────────────────┐       │
│  │   Browser    │ ◄────────────────► │     Flask Application    │       │
│  │  (Client)    │                    │         (app.py)         │       │
│  └──────────────┘                    └────────────┬─────────────┘       │
│                                                   │                     │
│                    ┌──────────────────────────────┼──────────────┐      │
│                    ▼                              ▼              ▼      │
│             ┌─────────────┐              ┌──────────────┐ ┌──────────┐  │
│             │  Database   │              │    Cache     │ │ External │  │
│             │ (SQLite/PG) │              │   (Redis)    │ │   APIs   │  │
│             └─────────────┘              └──────────────┘ └──────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Key Technical Decisions (As Implemented)

| Decision | Rationale |
|----------|-----------|
| Flask (not Django/FastAPI) | Lightweight, explicit, team familiarity |
| Vanilla JS (not React/Vue) | Zero build step, server-rendered, inline in template |
| SQLAlchemy ORM | Database-agnostic (SQLite→PostgreSQL via env var) |
| Jinja2 templates | Server-rendered, CSP-compatible |
| CSS custom properties | Theming without preprocessor (10 palettes from 5 themes × 2 modes) |
| Chart.js 4.4.1 via CDN | No bundle, lightweight |
| jsPDF 4.2.1 + html2canvas 1.4.1 via CDN | Client-side PDF, no server dependency |
| Flask-Limiter with `get_remote_address` | Per-IP rate limiting, Redis-ready |
| Flask-WTF CSRF | Global protection; `/calculate` exempt (session-protected) |

---

## 2. Technology Stack (Verified)

### 2.1 Backend

| Layer | Technology | File | Size |
|-------|------------|------|------|
| Web Framework | Flask | `app.py` | ~1700 lines |
| Calculator Engine | Pure Python (zero deps) | `calculator.py` | ~580 lines |
| ORM | SQLAlchemy | in `app.py` | 2 models |
| CSRF | Flask-WTF | in `app.py` | Global |
| Rate Limiting | Flask-Limiter | in `app.py` | Per-IP |
| Email | Flask-Mail | in `app.py` | SMTP |
| Database | SQLite (dev) / PostgreSQL (prod) | via `DATABASE_URL` | — |
| Cache | Redis (prod) / memory (dev) | via `REDIS_URL` | Rate limiting only |

### 2.2 Frontend

| Component | Technology | Delivery | Location |
|-----------|------------|----------|----------|
| Templates | Jinja2 | Server-rendered | `templates/` |
| Dashboard JS | Vanilla ES6+ | Inline | `index.html` (~3800 lines) |
| Styles | CSS3 custom properties | Static file | `style.css` (~4300 lines) |
| Charts | Chart.js 4.4.1 | CDN (jsDelivr) | `<script>` in head |
| PDF | jsPDF 4.2.1 + html2canvas 1.4.1 | CDN (cdnjs) | `<script>` in head |
| Icons | Font Awesome 6.5.0 | CDN (cdnjs) | `<link>` in head |
| Fonts | Inter 300-900 | Google Fonts | `<link>` with preconnect |

### 2.3 External Dependencies

| Service | Protocol | Auth | Fallback |
|---------|----------|------|----------|
| CoinGecko API | HTTPS REST | None (public) | 30s cache, stale-while-revalidate |
| CurrencyAPI | HTTPS REST | API Key (`CURRENCY_API_KEY`) | 60s cache; **no hard-coded fallback rate** — 503 if never fetched |
| SMTP | SMTP/TLS | User/Pass | Registration succeeds but email fails (resend available) |

---

## 3. Architecture Design

### 3.1 Architectural Pattern

**Pattern:** Modular Monolith — all logic in 2 Python files + 1 large template

```
┌───────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────┐     │
│  │   Jinja2    │  │  Static     │  │   Inline JS            │     │
│  │  Templates  │  │  style.css  │  │   (index.html)         │     │
│  │  (10 files) │  │  (~4300 ln) │  │   (~3800 lines)        │     │
│  └─────────────┘  └─────────────┘  └────────────────────────┘     │
├───────────────────────────────────────────────────────────────────┤
│                        Application Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────┐     │
│  │   Routes    │  │  Security   │  │   Validation           │     │
│  │  (18 total) │  │  Headers    │  │   (validate_calculator │     │
│  │             │  │  CSRF       │  │    _input, 27 types)   │     │
│  │             │  │  Rate Limit │  │                        │     │
│  └─────────────┘  └─────────────┘  └────────────────────────┘     │
├───────────────────────────────────────────────────────────────────┤
│                          Domain Layer                             │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │              Calculator Engine (calculator.py)           │     │
│  │  27 Pure Functions • Zero Dependencies • Fully Testable  │     │
│  └──────────────────────────────────────────────────────────┘     │
├───────────────────────────────────────────────────────────────────┤
│                        Data Access Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────────┐     │
│  │  SQLAlchemy │  │  Redis      │  │  External API          │     │
│  │  (SQLite/PG)│  │  (rate lim) │  │  (CoinGecko, Currency) │     │
│  └─────────────┘  └─────────────┘  └────────────────────────┘     │
└───────────────────────────────────────────────────────────────────┘
```

### 3.2 Module Structure (Verified)

```
FinCalc Pro/
├── app.py                      # Flask app, 18 routes, models, middleware (~1700 lines)
├── calculator.py               # 27 pure calculation functions (~580 lines)
├── requirements.txt            # Python dependencies
├── docs/                       # Documentation (this file + 7 others)
├── templates/
│   ├── index.html              # Dashboard SPA: 26 panels + inline JS (~3800 lines)
│   ├── landing.html            # Landing page
│   ├── login.html              # Login (3 fields: username + email + password)
│   ├── register.html           # Registration + check-email step
│   ├── forgot_password.html    # Reset request (generic response)
│   ├── reset_password.html     # Token-gated reset
│   ├── confirm_deletion.html   # Final deletion confirmation
│   ├── email/verification.html # Shared email (verify/reset/delete)
│   └── errors/                 # 8 error pages (400-500)
├── static/
│   ├── style.css               # ~4300 lines, 5 themes × dark/light
│   └── uploads/profiles/       # User avatars (server-generated filenames)
└── instance/
    └── users.db                # SQLite (dev)
```

### 3.3 Calculator Engine Design (Verified)

```python
# calculator.py — 27 pure functions, zero dependencies

# Design principles (as implemented):
# 1. Pure functions — no side effects, no global state
# 2. Single responsibility — one calculator per function
# 3. Explicit validation (SIP only; other functions trust server-side validation)
# 4. Consistent output: dict of Indian-formatted strings
# 5. Zero external dependencies — pure Python stdlib

def SIP(monthly_investment, Expected_return, years, mode="end"):
    # Mode normalization (accepts "End of Month"/"Beginning of Month" or "end"/"begin")
    # Input validation: monthly >= 0, years > 0, return >= 0
    # Core: FV = P × [((1+r)^n - 1)/r] × (1+r if begin)
    # Output: {"Total Investment": "₹6,00,000.00", "Future Value": "₹11,50,193.45", ...}

# Indian number formatting:
def format_indian(number, decimals=2):
    # Returns "₹1,00,000.00" (lakh/crore grouping)

def format_indian_raw(number, decimals=2):
    # Returns "1,00,000.00" (no ₹ prefix)
```

---

## 4. Database Design

### 4.1 Entity Relationship

```
USER (1) ────< CALCULATION_HISTORY (N)
```

### 4.2 Table Definitions (Verified from SQLAlchemy Models)

#### User Table

```sql
CREATE TABLE "user" (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    verification_token_hash VARCHAR(100) UNIQUE,
    verification_token_expires DATETIME,
    reset_token_hash VARCHAR(100) UNIQUE,
    reset_token_expires DATETIME,
    deletion_token_hash VARCHAR(100) UNIQUE,
    deletion_token_expires DATETIME,
    profile_picture VARCHAR(255),
    created_at DATETIME,
    last_login DATETIME,
    CONSTRAINT _username_email_uc UNIQUE (username, email)
);
```

#### CalculationHistory Table

```sql
CREATE TABLE calculation_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES "user"(id),
    calc_type VARCHAR(50) NOT NULL,
    params TEXT NOT NULL,           -- JSON: formatted input parameters
    result TEXT NOT NULL,           -- JSON: output results
    timestamp DATETIME DEFAULT now_ist()
);
```

### 4.3 Schema Management

The app uses `db.create_all()` + runtime column inspection/addition (not Alembic migrations):

```python
# On startup (in app.py):
with app.app_context():
    db.create_all()
    # Check for missing columns and add via ALTER TABLE
    # Creates unique indexes for token hashes if missing
```

> **Note:** No Alembic/Flask-Migrate is used. Schema changes are handled via runtime `ALTER TABLE` statements in the startup block.

---

## 5. API Specification (Verified)

### 5.1 API Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Response format** | `{success: bool, result?: object, formatted_params?: object, error?: string}` |
| **Parameter keys** | Human-readable labels matching UI labels (e.g. `"Monthly investment"`) |
| **Authentication** | Session cookie (all protected endpoints) |
| **CSRF** | Flask-WTF global; **`/calculate` is `@csrf.exempt`** (protected by session auth) |
| **Rate limiting** | Per-IP (`get_remote_address`), Flask-Limiter |
| **Money format** | Pre-formatted Indian strings (e.g. `"₹11,50,193.45"`) |

### 5.2 Endpoints (18 Total — Verified)

#### Authentication (8)

| Method | Endpoint | Rate Limit | Description |
|--------|----------|-------------|-------------|
| `GET` | `/` | 200/day, 50/hr (default) | Landing page |
| `GET/POST` | `/register` | 5/min, 20/hr | Registration |
| `GET` | `/verify-email/<token>` | default | Email verification |
| `POST` | `/resend-verification` | 1/5min, 5/hr | Resend verification |
| `GET/POST` | `/login` | 10/min, 50/hr | Login (3 fields) |
| `GET` | `/logout` | default | Session destruction |
| `GET/POST` | `/forgot-password` | 5/hr | Reset request (generic response) |
| `GET/POST` | `/reset-password/<token>` | default | Token-gated reset |

#### Calculator & History (3)

| Method | Endpoint | Auth | Rate Limit | Description |
|--------|----------|------|-------------|-------------|
| `GET` | `/dashboard` | Yes | default | Main SPA (embeds last-10 history) |
| `POST` | `/calculate` | Yes | 30/min, 100/hr | Calculator API |
| `DELETE` | `/history/<id>` | Yes | default | Delete history entry |

> **Note:** There is **no standalone `GET /history` JSON endpoint**. History is server-rendered into `/dashboard` as `history_json`.

#### Profile & Account (5)

| Method | Endpoint | Auth | Rate Limit | Description |
|--------|----------|------|-------------|-------------|
| `POST` | `/change-password` | Yes | 5/min, 10/hr | Change password (JSON) |
| `POST` | `/update-profile-picture` | Yes | 5/min, 20/hr | Avatar upload (multipart) |
| `POST` | `/remove-profile-picture` | Yes | 5/min, 20/hr | Avatar removal |
| `POST` | `/request-account-deletion` | Yes | 3/hr, 10/day | Deletion step 1 (password gate) |
| `GET/POST` | `/confirm-account-deletion/<token>` | No | default | Deletion step 2 (email link) |

#### Public Market Data (2)

| Method | Endpoint | Rate Limit | Description |
|--------|----------|-------------|-------------|
| `GET` | `/api/crypto/prices` | 60/min | Live crypto prices (30s cache) |
| `GET` | `/api/usd-inr/rate` | 60/min | Live USD/INR rate (60s cache) |

### 5.3 Calculator API Contract (Verified)

#### Request
```json
POST /calculate
Content-Type: application/json

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

> **Note:** Parameter keys are **human-readable labels** with spaces, matching UI labels exactly. Not snake_case.

#### Success Response (200) — Verified Output
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

> **Note:** The response key is **`result`** (not `data`), plus `formatted_params` for history storage.

#### Error Response (400)
```json
{
  "success": false,
  "error": "Missing required parameters for SIP"
}
```

#### Error Response (401)
```json
{
  "success": false,
  "error": "Authentication required"
}
```

#### Error Response (429)
```json
{
  "success": false,
  "error": "Rate limit exceeded. Please try again later."
}
```
Headers: `Retry-After: 60`

### 5.4 Calculator Types Reference (Verified — 27 Types)

> **Key:** Parameter keys below show the **exact labels** used in the API (matching UI labels).

| Type | Required Parameters | Optional (defaults) |
|------|---------------------|--------------------|
| `SIP` | Monthly investment, Expected return, Years | Mode ("End of Month" default) |
| `LUMPSUM` | Total investment, Expected return, Years | — |
| `STEP_UP_SIP` | Monthly investment, Step up rate, Expected return, Years | — |
| `SWP` | Total investment, Withdrawal amount, Expected rate, Years | — |
| `PPF` | Yearly investment, Annual interest rate, Years | — |
| `EPF` | Basic salary, DA, Years of service, Annual salary growth, Epf interest rate | — |
| `NPS` | Monthly investment, Annual return, Current age | Retirement age (60) |
| `NSC` | Amount invested, Interest rate | Years (5) |
| `FD_SIMPLE` | Principal, Interest rate, Years | — |
| `RD` | Monthly investment, Expected rate, Years | — |
| `RETIREMENT_CALCULATOR` | Age, Monthly expense | Retirement age (60), Life expectancy (85), Inflation (6), Annual return (7) |
| `INFLATION` | Current price, Rate, Years | — |
| `CAGR` | Initial value, Final value, Years | — |
| `EMI` | Loan amount, Interest rate, Years | — |
| `HOME_LOAN_EMI` | Loan amount, Interest rate, Years | — |
| `CAR_LOAN_EMI` | Loan amount, Interest rate, Years | — |
| `GOLD_LOAN_EMI` | Loan amount, Interest rate, Years | — |
| `EDUCATION_LOAN_EMI` | Loan amount, Interest rate, Years | — |
| `FLAT_VS_REDUCING` | Principal, Annual rate, Years | — |
| `SIMPLE_INTEREST` | Principal amount, Rate of interest, Years | — |
| `COMPOUND_INTEREST` | Principal amount, Interest rate, Years | Compounding_per_year (4) |
| `GST` | Original price, Gst rate | — |
| `GRATUITY` | Basic salary, DA, Years of service | — |
| `SALARY_CALCULATOR` | CTC, Bonus, Professional tax, Employer pf, Employee pf, Other deductions | — |
| `BROKERAGE_CALCULATOR` | Segment, Quantity, Buy price, Sell price, Brokerage | Segment default "delivery" |
| `CRYPTO_CONVERTER` | From Currency, To Currency, Amount | Prices (auto-fetched server-side) |
| `USD_INR_CONVERTER` | From Currency, To Currency, Amount | usd_inr_rate (auto-fetched; **backend-only, no UI**) |

### 5.5 Verified Calculator Outputs (Run from `calculator.py`)

| Calculator | Inputs | Verified Output |
|------------|--------|-----------------|
| SIP (End of Month) | ₹5,000/mo, 12%, 10y | FV **₹11,50,193.45** |
| SIP (Beginning of Month) | ₹5,000/mo, 12%, 10y | FV **₹11,61,695.38** |
| EMI | ₹25,00,000, 8.5%, 20y | EMI **₹21,695.58**, Total Interest ₹27,06,939.40 |
| CAGR | ₹1L → ₹2L, 5y | **14.87%** |
| GST | ₹1,000 @ 18% | GST ₹180.00, Total ₹1,180.00 |
| Inflation | ₹1,000 @ 6% × 10y | Future ₹1,790.85 |
| PPF | ₹1.5L/yr @ 7.1% × 15y | Maturity ₹40,68,209.22 |
| Lumpsum | ₹1L @ 12% × 10y | FV ₹3,10,584.82 |
| Flat vs Reducing | ₹5L @ 10% × 5y | Flat ₹12,500/mo vs Reducing ₹10,623.52/mo, Saves ₹1,12,588.66 |
| Retirement | age 30, ₹50k/mo, retire 60, live 85, 6% infl, 7% ret | Corpus ₹7,64,27,464.51, SIP ₹62,646.95/mo |

---

## 6. Security Implementation (Verified — 18 Controls)

### 6.1 Security Controls Matrix

| Control | Implementation | Status |
|---------|----------------|--------|
| **Secret Key** | RuntimeError if `FLASK_SECRET_KEY` not set | ✅ |
| **Debug Mode** | `FLASK_DEBUG=false` default | ✅ |
| **CSRF** | Flask-WTF global; `/calculate` exempt (session-protected) | ✅ |
| **CSRF Expiry** | `WTF_CSRF_TIME_LIMIT=43200` (12hr), `WTF_CSRF_TIME_OUT=3600` (1hr JS) | ✅ |
| **Rate Limiting** | Flask-Limiter, per-IP (`get_remote_address`), Redis-ready | ✅ |
| **Session** | HttpOnly, SameSite=Lax, Secure (prod), 24hr, `session.clear()` on login | ✅ |
| **Security Headers** | CSP, HSTS (prod), X-Frame-Options DENY, COOP, CORP, nosniff, Referrer-Policy, Permissions-Policy | ✅ |
| **Input Validation** | `validate_calculator_input()` on all 27 types | ✅ |
| **IDOR Prevention** | History filtered by `user_id`; uploads in `static/uploads/profiles/` only | ✅ |
| **Error Handling** | Custom templates (400-500), no stack traces | ✅ |
| **Security Logging** | RotatingFileHandler 10MB × 10, no secrets | ✅ |
| **Token Hashing** | PBKDF2 via `generate_password_hash`, constant-time `check_password_hash` | ✅ |
| **Token Storage** | Only hashes; legacy plaintext writes set to None | ✅ |
| **Upload Validation** | Magic bytes (JPG/PNG/GIF/WEBP), 2MB limit, SVG rejected | ✅ |
| **JSON Parsing** | `get_json(silent=True)` with specific exception handling | ✅ |
| **Dependency Scanning** | pip-audit clean, Bandit: 0 findings | ✅ |

### 6.2 Token Management (Verified)

| Token Type | Generation | Storage | Expiry | Verification |
|------------|------------|---------|--------|--------------|
| Email Verification | `secrets.token_urlsafe(32)` | PBKDF2 hash | 1 hour | Constant-time |
| Password Reset | `secrets.token_urlsafe(32)` | PBKDF2 hash | 1 hour | Constant-time |
| Account Deletion | `secrets.token_urlsafe(32)` | PBKDF2 hash | 1 hour | Constant-time |
| CSRF Token | Flask-WTF | Signed cookie | 12 hours | Flask-WTF |
| Session ID | Flask | Signed cookie | 24 hours | Flask |

### 6.3 File Upload Security (Verified)

| Control | Implementation |
|---------|----------------|
| **Allowed Types** | JPG, PNG, WEBP, GIF (magic-byte validated) |
| **Max Size** | 2MB per file (`MAX_PROFILE_PICTURE_BYTES`), 5MB request (`MAX_CONTENT_LENGTH`) |
| **Filename** | Server-generated: `user_{id}_{secrets.token_hex(8)}.{fmt}` |
| **Storage Path** | `static/uploads/profiles/` only (path traversal check on delete) |
| **Cleanup** | Previous file deleted on update/remove |
| **SVG Rejected** | Not in allowlist (stored-XSS risk) |

---

## 7. Deployment

### 7.1 Environment Configuration

| Setting | Development | Production |
|---------|-------------|------------|
| `FLASK_DEBUG` | `true` | `false` |
| `DATABASE_URL` | `sqlite:///users.db` | PostgreSQL URI |
| `REDIS_URL` | `memory://` | Redis URI |
| `SESSION_COOKIE_SECURE` | `false` | `true` |
| `FLASK_SECRET_KEY` | set | set (required) |
| `CURRENCY_API_KEY` | optional | set (or USD/INR returns 503) |
| SMTP vars | optional | set (or emails fail) |

### 7.2 Running Locally

```bash
pip install -r requirements.txt
set FLASK_SECRET_KEY=<random-32-char-string>
python app.py
# App runs on http://localhost:5000
# Debug mode controlled by FLASK_DEBUG env var (default: false)
```

### 7.3 Production Checklist

- [ ] `FLASK_SECRET_KEY` set (app refuses to start without it)
- [ ] `FLASK_DEBUG=false`
- [ ] `DATABASE_URL` set to PostgreSQL
- [ ] `REDIS_URL` set (or rate limiting is per-worker in-memory)
- [ ] SMTP credentials configured (or verification/reset emails fail)
- [ ] `BASE_URL` set to production HTTPS URL (for email links)
- [ ] `CURRENCY_API_KEY` configured (or USD/INR returns 503)
- [ ] HTTPS enforced (HSTS auto-enabled when `SESSION_COOKIE_SECURE=true`)

> **Note:** No Dockerfile, render.yaml, or CI/CD workflow files exist in the repository. Deployment configuration is environment-based only.

---

## 8. Development Standards

### 8.1 Code Quality

| Tool | Purpose | Status |
|------|---------|--------|
| Bandit | Static security analysis | ✅ 0 findings |
| pip-audit | Dependency vulnerability scan | ✅ Clean |
| pyflakes/pylint | Python linting | ✅ Clean |

### 8.2 Code Review Checklist

- [ ] Calculator outputs verified against known values (run `calculator.py` directly)
- [ ] Input validation on any new calculator type (`validate_calculator_input`)
- [ ] Rate limiting configured on any new endpoint
- [ ] CSRF on any new state-changing route
- [ ] Security events logged
- [ ] Responsive check (320px / 768px / 1280px)
- [ ] Accessibility: labels, contrast, keyboard, ARIA
- [ ] Documentation updated

---

## 9. Appendices

### Appendix A: Calculator Function Signatures (Verified from `calculator.py`)

```python
# Investment (10)
SIP(monthly_investment, Expected_return, years, mode="end")
LUMPSUM(Total_investment, Expected_return, years)
STEP_UP_SIP(monthly_investment, step_up_rate, Expected_return, years)
SWP(total_investment, withdrawal_amount, Expected_rate, years)
PPF(yearly_investment, annual_interest_rate, years)
EPF(basic_salary, DA, years_of_service, annual_salary_growth, epf_interest_rate)
NPS(monthly_investment, annual_return, current_age, retirement_age=60)
NSC(amount_invested, interest_rate, years=5)
FD_SIMPLE(principal, interest_rate, years)
RD(monthly_investment, Expected_rate, years)

# Planning (3)
RETIREMENT_CALCULATOR(age, monthly_expense, retirement_age=60, life_expectancy=85, inflation=6, annual_return=7)
INFLATION(current_price, rate, years)
CAGR(initial_value, final_value, years)

# Loans (6)
EMI(loan_amount, interest_rate, years)
HOME_LOAN_EMI(loan_amount, interest_rate, years)
CAR_LOAN_EMI(loan_amount, interest_rate, years)
GOLD_LOAN_EMI(loan_amount, interest_rate, years)
EDUCATION_LOAN_EMI(loan_amount, interest_rate, years)
FLAT_VS_REDUCING(principal, annual_rate, years)

# General (6)
SIMPLE_INTEREST(principal_amount, rate_of_interest, years)
COMPOUND_INTEREST(principal_amount, interest_rate, years, compounding_per_year)
GST(original_price, gst_rate)
GRATUITY(basic_salary, DA, years_of_service)
SALARY_CALCULATOR(ctc, bonus, professional_tax, employer_pf, employee_pf, other_deductions)
BROKERAGE_CALCULATOR(segment, Quantity, buy_price, sell_price, brokerage)

# Crypto & Currency (2)
CRYPTO_CONVERTER(from_currency, to_currency, amount, prices)
USD_INR_CONVERTER(from_currency, to_currency, amount, usd_inr_rate)

# Utilities
_format_indian_core(number, decimals) -> (sign, int_str, decimal_str)
format_indian(number, decimals) -> "₹1,00,000.00"
format_indian_raw(number, decimals) -> "1,00,000.00"
PARAM_DECIMALS = {...}  # decimals per parameter key
```

### Appendix B: Error Responses (Verified)

| HTTP Code | When | JSON Body |
|-----------|------|-----------|
| 400 | Validation, malformed JSON, CSRF failure (AJAX) | `{"success": false, "error": "..."}` |
| 401 | Missing session on protected endpoint | `"Authentication required"` |
| 403 | Access denied | `"Access denied"` |
| 404 | Unknown route, entry not found | `"Not found"` / `"Entry not found"` |
| 405 | Wrong HTTP verb | `"Method not allowed"` |
| 413 | Request body > 5MB | `"Payload too large"` |
| 429 | Rate limit exceeded (+`Retry-After`) | `"Rate limit exceeded. Please try again later."` |
| 500 | Unhandled exception (DB rolled back) | `"Internal server error"` / `"Calculation failed"` |

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.1 | Oct 9, 2026 | patakrishna2006-a11y | Accuracy pass: verified API envelope (`result` key), human-readable param labels, verified SIP/EMI outputs, per-IP rate limits, removed non-existent infrastructure (Docker, CI/CD, render.yaml, monitoring), corrected module structure |
| 2.0 | Oct 8, 2026 | patakrishna2006-a11y | Security hardening, responsive fixes, code cleanup |
| 1.0 | Sep 2026 | patakrishna2006-a11y | Initial release |

---

*End of TRD Document*
