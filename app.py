from flask import Flask, request, jsonify, render_template, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo 
import os   
from dotenv import load_dotenv
import json
import re
load_dotenv()

IST = ZoneInfo("Asia/Kolkata")

def now_ist():
    return datetime.now(IST)

# Import your calculator functions
from calculator import (
    SIP, LUMPSUM, SWP, STEP_UP_SIP, PPF, EPF, NSC,
    FD_SIMPLE, RD, NPS, RETIREMENT_CALCULATOR, GRATUITY,
    SALARY_CALCULATOR, EMI, HOME_LOAN_EMI, CAR_LOAN_EMI,
    GOLD_LOAN_EMI, EDUCATION_LOAN_EMI, FLAT_VS_REDUCING,
    SIMPLE_INTEREST, COMPOUND_INTEREST, GST, CAGR,
    INFLATION, BROKERAGE_CALCULATOR,
    format_indian_raw, PARAM_DECIMALS
)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False  # Set to True in production with HTTPS
db = SQLAlchemy(app)

# --- Database Models ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    
    __table_args__ = (
        db.UniqueConstraint('username', 'email', name='_username_email_uc'),
    )

class CalculationHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    calc_type = db.Column(db.String(50), nullable=False)
    params = db.Column(db.Text, nullable=False)
    result = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=now_ist)

with app.app_context():
    db.create_all()

# --- Helper Function for Formatting ---

def format_json_data(json_str):
    try:
        data = json.loads(json_str)
        # Data is already formatted in Indian number system, just join
        return ", ".join([f"{str(k).replace('_', ' ').title()}: {v}" for k, v in data.items()])
    except:
        return json_str

# --- Routes ---

@app.route('/')
def home():
    return render_template('landing.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        # Password complexity validation
        if not password or len(password) < 9 or not re.search(r'[A-Za-z]', password) or not re.search(r'\d', password) or not re.search(r'[^A-Za-z0-9]', password):
            flash('Password must be at least 9 characters long and include a letter, a number, and a symbol.', 'danger')
            return redirect(url_for('register'))
            
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password, email=email)
        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Successfully registered!', 'success')
            return redirect(url_for('login'))
        except Exception as e:
            db.session.rollback()
            # Check which constraint was violated
            if User.query.filter_by(username=username).first():
                flash('Username already exists', 'danger')
            else:
                flash('An account with this username and email combination already exists', 'danger')
            return redirect(url_for('register'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
        
    username = request.form.get('username')
    password = request.form.get('password')
    email = request.form.get('email')   
    user = User.query.filter_by(username=username, email=email).first()
    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id
        flash('Successful login!', 'success')
        return redirect(url_for('dashboard'))
    flash('Invalid credentials', 'danger')
    return redirect(url_for('login'))

@app.route("/dashboard")
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('home'))

    raw_history = (
        CalculationHistory.query
        .filter_by(user_id=session['user_id'])
        .order_by(CalculationHistory.timestamp.desc())
        .limit(10)
        .all()
    )

    processed_history = []

    for entry in raw_history:
        india_time = entry.timestamp

        processed_history.append({
            'calc_type': entry.calc_type.replace('_', ' '),
            'params': format_json_data(entry.params),
            'result': format_json_data(entry.result),
            'timestamp': india_time
        })

    return render_template(
        "index.html",
        history=processed_history
    )

@app.route('/logout')
def logout():
    session.clear()
    flash('Logout successfully!', 'success')
    return redirect(url_for('home'))

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json()
    calc_type = data.get("type")
    result = data.get("result")
    params = data.get("params", {})

    def safe_float(val, default=0):
        try:
            return float(val)
        except (ValueError, TypeError):
            return default

    def safe_int(val, default=0):
        try:
            return int(val)
        except (ValueError, TypeError):
            return default

    try:
        calculators = {
            "SIP": lambda p: SIP(safe_float(p.get("Monthly investment")), safe_float(p.get("Expected return")), safe_float(p.get("Years")), p.get("Mode", "End of Month")),
            "LUMPSUM": lambda p: LUMPSUM(safe_float(p.get("Total investment")), safe_float(p.get("Expected return")), safe_float(p.get("Years"))),
            "SWP": lambda p: SWP(safe_float(p.get("Total investment")), safe_float(p.get("Withdrawal amount")), safe_float(p.get("Expected rate")), safe_float(p.get("Years"))),
            "STEP_UP_SIP": lambda p: STEP_UP_SIP(safe_float(p.get("Monthly investment")), safe_float(p.get("Step up rate")), safe_float(p.get("Expected return")), safe_float(p.get("Years"))),
            "PPF": lambda p: PPF(safe_float(p.get("Yearly investment")), safe_float(p.get("Annual interest rate")), safe_float(p.get("Years"))),
            "EPF": lambda p: EPF(safe_float(p.get("Basic salary")), safe_float(p.get("DA")), safe_int(p.get("Years of service")), safe_float(p.get("Annual salary growth")), safe_float(p.get("Epf interest rate"))),
            "NSC": lambda p: NSC(safe_float(p.get("Amount invested")), safe_float(p.get("Interest rate")), safe_int(p.get("Years", 5))),
            "FD_SIMPLE": lambda p: FD_SIMPLE(safe_float(p.get("Principal")), safe_float(p.get("Interest rate")), safe_float(p.get("Years"))),
            "RD": lambda p: RD(safe_float(p.get("Monthly investment")), safe_float(p.get("Expected rate")), safe_float(p.get("Years"))),
            "NPS": lambda p: NPS(safe_float(p.get("Monthly investment")), safe_float(p.get("Annual return")), safe_int(p.get("Current age")), safe_int(p.get("Retirement age", 60))),
            "RETIREMENT_CALCULATOR": lambda p: RETIREMENT_CALCULATOR(safe_int(p.get("Age")), safe_float(p.get("Monthly expense")), safe_int(p.get("Retirement age", 60)), safe_int(p.get("Life expectancy", 85)), safe_float(p.get("Inflation", 6)), safe_float(p.get("Annual return", 7))),
            "GRATUITY": lambda p: GRATUITY(safe_float(p.get("Basic salary")), safe_float(p.get("DA")), safe_float(p.get("Years of service"))),
            "SALARY_CALCULATOR": lambda p: SALARY_CALCULATOR(safe_float(p.get("CTC")), safe_float(p.get("Bonus")), safe_float(p.get("Professional tax")), safe_float(p.get("Employer pf")), safe_float(p.get("Employee pf")), safe_float(p.get("Other deductions"))),
            "EMI": lambda p: EMI(safe_float(p.get("Loan amount")), safe_float(p.get("Interest rate")), safe_float(p.get("Years"))),
            "HOME_LOAN_EMI": lambda p: HOME_LOAN_EMI(safe_float(p.get("Loan amount")), safe_float(p.get("Interest rate")), safe_float(p.get("Years"))),
            "CAR_LOAN_EMI": lambda p: CAR_LOAN_EMI(safe_float(p.get("Loan amount")), safe_float(p.get("Interest rate")), safe_float(p.get("Years"))),
            "GOLD_LOAN_EMI": lambda p: GOLD_LOAN_EMI(safe_float(p.get("Loan amount")), safe_float(p.get("Interest rate")), safe_float(p.get("Years"))),
            "EDUCATION_LOAN_EMI": lambda p: EDUCATION_LOAN_EMI(safe_float(p.get("Loan amount")), safe_float(p.get("Interest rate")), safe_float(p.get("Years"))),
            "FLAT_VS_REDUCING": lambda p: FLAT_VS_REDUCING(safe_float(p.get("Principal")), safe_float(p.get("Annual rate")), safe_float(p.get("Years"))),
            "SIMPLE_INTEREST": lambda p: SIMPLE_INTEREST(safe_float(p.get("Principal amount")), safe_float(p.get("Rate of interest")), safe_float(p.get("Years"))),
            "COMPOUND_INTEREST": lambda p: COMPOUND_INTEREST(safe_float(p.get("Principal amount")), safe_float(p.get("Interest rate")), safe_float(p.get("Years")), safe_int(p.get("Compounding_per_year", 4))),
            "GST": lambda p: GST(safe_float(p.get("Original price")), safe_float(p.get("Gst rate"))),
            "CAGR": lambda p: CAGR(safe_float(p.get("Initial value")), safe_float(p.get("Final value")), safe_float(p.get("Years"))),
            "INFLATION": lambda p: INFLATION(safe_float(p.get("Current price")), safe_float(p.get("Rate")), safe_float(p.get("Years"))),
            "BROKERAGE_CALCULATOR": lambda p: BROKERAGE_CALCULATOR(p.get("Segment", "delivery"), safe_int(p.get("Quantity")), safe_float(p.get("Buy price")), safe_float(p.get("Sell price")), safe_float(p.get("Brokerage")))
        }

        if calc_type in calculators:
            result = calculators[calc_type](params)
            
            # Format params for storage/display in Indian number system
            formatted_params = {}
            for key, value in params.items():
                decimals = PARAM_DECIMALS.get(key, 2)
                try:
                    formatted_params[key] = format_indian_raw(float(value), decimals)
                except (ValueError, TypeError):
                    formatted_params[key] = value
            
            # --- Store Result in History ---
            if 'user_id' in session:
                history_entry = CalculationHistory(
                    user_id=session['user_id'],
                    calc_type=calc_type,
                    params=json.dumps(formatted_params),
                    result=json.dumps(result)
                )
                db.session.add(history_entry)
                db.session.commit()

            return jsonify({"success": True, "result": result, "formatted_params": formatted_params})
        else:
            return jsonify({"success": False, "error": f"Unknown calculator type: {calc_type}"}), 400

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)