# FinCalc Pro — Smart Financial Calculators for India

[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7.svg)](https://render.com)

A modern, full-stack financial calculator web application built with **Flask** (Python) and **Vanilla JavaScript**. Features 25+ calculators tailored for Indian financial planning — from SIP and EMI to retirement, tax, and investment planning.

---

## ✨ Features

### 🔐 Authentication & User Management
- **Secure Registration/Login** — Password hashing with Werkzeug, complexity validation (9+ chars, letter, number, symbol)
- **Session Management** — Flask sessions with SQLite database
- **Calculation History** — Persistent history per user with timestamps

### 📊 25+ Financial Calculators

| Category | Calculators |
|----------|-------------|
| **Investments** | SIP, Lumpsum, Step-Up SIP, SWP, PPF, EPF, NPS, NSC, FD, RD |
| **Retirement & Planning** | Retirement Corpus, Inflation Impact, CAGR |
| **Loans & EMIs** | EMI, Home Loan, Car Loan, Gold Loan, Education Loan, Flat vs Reducing Balance |
| **General Finance** | Simple Interest, Compound Interest, GST, Gratuity, Salary Breakdown, Brokerage |

### 🎨 Modern UI/UX
- **Dark/Light Theme** — 5 color themes (Indigo, Green, Orange, Purple, Teal) with glassmorphism effects
- **Responsive Design** — Mobile-first, tested across 19 device viewports (320px–1920px)
- **Sidebar Navigation** — Collapsible category-based navigation with search & history preview
- **Real-time Results** — Instant calculations with formatted Indian Rupee (₹) output
- **Copy to Clipboard** — One-click result copying
- **PDF Export** — Export calculator results to PDF
- **Scroll Animations** — Smooth reveal animations on landing page

### ⚡ Performance Optimized
- GPU-accelerated animations using `transform`/`opacity` only
- Targeted theme transitions (no global `*` transition)
- `will-change` hints and `contain` for rendering isolation
- Respects `prefers-reduced-motion` accessibility preference

---

## 📱 Responsive Engineering

This project underwent a **complete responsive overhaul** to ensure flawless operation across all device classes:

| Device Class | Viewports Tested | Status |
|--------------|------------------|--------|
| **Ultra-narrow phones** | iPhone 5/SE (320×568), Galaxy Note 5 (360×640) | ✅ PASS |
| **Standard phones** | iPhone 13/16/17 Pro, Pixel 5/6, Galaxy S22/S24, iPhone 11/Air | ✅ PASS |
| **Foldable** | Galaxy Z Flip 3 (360×880) | ✅ PASS |
| **Tablets** | iPad mini (1024×768), iPad Air (1180×820), Galaxy Tab S7 (1280×800) | ✅ PASS |
| **Desktop** | 1280×720, 1920×1080 | ✅ PASS |

**66/66 automated tests pass** (19 viewports × 3 pages: Landing, Login, Register)

### Key Responsive Fixes
1. **Background orb overflow** (320px) — Wrapped decorative orbs in clipped container with responsive sizing
2. **Floating card overflow** (1180px tablet) — Adjusted positioning at 1024px/1280px breakpoints
3. **Header button overflow** (≤360px) — Added flex-wrap and compact sizing for auth buttons

See [QA_REPORT.md](QA_REPORT.md) for complete test matrix and bug details.

---

## 📁 Project Structure

```
Financial Calculators/
├── app.py                 # Flask backend — routes, auth, API endpoints
├── calculator.py          # Core calculation logic (25+ functions)
├── requirements.txt       # Python dependencies
├── Procfile               # Deployment config (gunicorn)
├── README.md              # This file
├── QA_REPORT.md           # Responsive QA test results
├── instance/
│   └── users.db           # SQLite database (auto-created)
├── static/
│   └── style.css          # Complete stylesheet (CSS variables, responsive, performant)
└── templates/
    ├── index.html         # Main dashboard (SPA with all calculators)
    ├── landing.html       # Public landing page with stats & features
    ├── login.html         # Login page
    └── register.html      # Registration page
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- pip (Python package manager)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/patakrishna2006-a11y/Financial-calculator.git
cd "Financial Calculators"

# 2. Create virtual environment (recommended)
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the application
python app.py

# 5. Open in browser
http://127.0.0.1:5000
```

### Environment Variables (Optional)

Create a `.env` file in the project root:

```env
SECRET_KEY=your-super-secret-key-change-in-production
DATABASE_URL=sqlite:///users.db
FLASK_ENV=development
FLASK_DEBUG=1
```

---

## 🧮 Calculator Reference

### Investment Calculators

| Calculator | Function | Key Parameters |
|------------|----------|----------------|
| **SIP** | `SIP(monthly_investment, return%, years, mode)` | Monthly amount, expected return, duration, begin/end |
| **Lumpsum** | `LUMPSUM(amount, return%, years)` | One-time investment, return, duration |
| **Step-Up SIP** | `STEP_UP_SIP(monthly, step_up%, return%, years)` | Monthly SIP, annual step-up %, return, duration |
| **SWP** | `SWP(corpus, withdrawal, return%, years)` | Initial corpus, monthly withdrawal, return, duration |
| **PPF** | `PPF(yearly_investment, rate%, years)` | Annual investment, interest rate, duration (15 yr default) |
| **EPF** | `EPF(basic, DA, years, salary_growth%, epf_rate%)` | Basic salary, DA, service years, growth rates |
| **NPS** | `NPS(monthly, return%, current_age, retirement_age)` | Monthly contribution, return, ages |
| **NSC** | `NSC(amount, rate%, years=5)` | Investment, rate, fixed 5-year term |
| **FD** | `FD_SIMPLE(principal, rate%, years)` | Principal, simple interest rate, duration |
| **RD** | `RD(monthly, rate%, years)` | Monthly deposit, quarterly compounding rate, duration |

### Planning Calculators

| Calculator | Function | Key Parameters |
|------------|----------|----------------|
| **Retirement** | `RETIREMENT_CALCULATOR(age, monthly_expense, ...)` | Current age, monthly expense, retirement age, life expectancy, inflation, return |
| **Inflation** | `INFLATION(amount, rate%, years)` | Present value, inflation rate, years |
| **CAGR** | `CAGR(beginning, ending, years)` | Start value, end value, duration |

### Loan Calculators

| Calculator | Function | Key Parameters |
|------------|----------|----------------|
| **EMI** | `EMI(principal, rate%, years)` | Loan amount, annual rate, tenure |
| **Home Loan** | `HOME_LOAN_EMI(principal, rate%, years)` | Same as EMI with home loan context |
| **Car Loan** | `CAR_LOAN_EMI(principal, rate%, years)` | Vehicle loan specific |
| **Gold Loan** | `GOLD_LOAN_EMI(principal, rate%, years)` | Gold-backed loan |
| **Education Loan** | `EDUCATION_LOAN_EMI(principal, rate%, years)` | Education loan with moratorium option |
| **Flat vs Reducing** | `FLAT_VS_REDUCING(principal, rate%, years)` | Comparison of both methods |

### General Calculators

| Calculator | Function | Key Parameters |
|------------|----------|----------------|
| **Simple Interest** | `SIMPLE_INTEREST(principal, rate%, years)` | Basic interest calculation |
| **Compound Interest** | `COMPOUND_INTEREST(principal, rate%, years, freq)` | Compounded growth with frequency |
| **GST** | `GST(amount, rate%)` | Tax calculation (5%, 12%, 18%, 28%) |
| **Gratuity** | `GRATUITY(basic, DA, years)` | End-of-service benefit (15/26 formula) |
| **Salary** | `SALARY_CALCULATOR(ctc)` | CTC breakdown: basic, HRA, PF, tax, in-hand |
| **Brokerage** | `BROKERAGE_CALCULATOR(buy, sell, qty, brokerage%)` | Trade charges, STT, turnover, net P&L |

---

## 🌐 Deployment

### Render (Free Tier) — Recommended

1. Push to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your repository
4. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment**: Python 3
5. Click **Deploy**

### Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Heroku

```bash
heroku create fincalc-pro
git push heroku main
```

### Docker (Optional)

```dockerfile
# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "app:app"]
```

```bash
docker build -t fincalc-pro .
docker run -p 5000:5000 fincalc-pro
```

---

## 🔧 Configuration

### Database
- **Default**: SQLite (`instance/users.db`) — auto-created on first run
- **Production**: Set `DATABASE_URL` to PostgreSQL/MySQL URI

### Security
- Change `SECRET_KEY` in production (use `secrets.token_hex(32)`)
- Enable HTTPS in production (Render/Railway/Heroku provide this automatically)
- Consider adding rate limiting for API endpoints

### Customization
- **Calculators**: Modify `calculator.py` to add/change formulas
- **UI**: Edit `static/style.css` (CSS variables at top for theming)
- **Templates**: Modify `templates/*.html` for layout changes

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `flask` | ≥3.0.0 | Web framework |
| `gunicorn` | ≥21.2.0 | WSGI production server |
| `flask_sqlalchemy` | ≥3.0.0 | ORM for database |
| `werkzeug` | ≥3.0.0 | Security utilities (password hashing) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-calculator`
3. Add your calculator function in `calculator.py`
4. Add the route in `app.py` and UI in `templates/index.html`
5. Test thoroughly
6. Submit a Pull Request

### Adding a New Calculator

```python
# 1. Add function in calculator.py
def MY_CALCULATOR(param1, param2, param3):
    # ... calculation logic ...
    return {
        "Result Label": f"₹{round(result, 2):,.2f}",
        "Another Label": f"₹{round(another, 2):,.2f}",
    }

# 2. Import in app.py
from calculator import MY_CALCULATOR

# 3. Add API route in app.py
@app.route('/api/my_calculator', methods=['POST'])
def api_my_calculator():
    data = request.get_json()
    result = MY_CALCULATOR(data['param1'], data['param2'], data['param3'])
    return jsonify(result)

# 4. Add UI in templates/index.html (calculator card + form + JS handler)
```

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

## 🙏 Acknowledgments

- **Flask** — Lightweight Python web framework
- **Font Awesome** — Icons
- **Google Fonts (Inter, Roboto)** — Typography
- **Indian Financial Formulas** — Based on standard banking/government formulas

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/patakrishna2006-a11y)
- **Discussions**: [GitHub Discussions](https://github.com/patakrishna2006-a11y)

---

## 📊 Quality Assurance

Complete responsive test results: [QA_REPORT.md](QA_REPORT.md)

- ✅ 66/66 automated tests pass (19 device viewports × 3 pages)
- ✅ Zero horizontal overflow across all viewports
- ✅ All calculators functional at all screen sizes
- ✅ Theme switching, dark/light mode, sidebar, charts, PDF export verified
- ✅ Animation performance optimized (GPU-accelerated, 60fps target)

---

**Made with ❤️ for Indian Financial Planning**