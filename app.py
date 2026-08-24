from flask import Flask, request, jsonify, render_template, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import os   
from dotenv import load_dotenv
import json
import re
laod = load_dotenv()

# Import your calculator functions
from calculator import (
    SIP, LUMPSUM, SWP, STEP_UP_SIP, PPF, EPF, NSC,
    FD_SIMPLE, RD, NPS, RETIREMENT_CALCULATOR, GRATUITY,
    SALARY_CALCULATOR, EMI, HOME_LOAN_EMI, CAR_LOAN_EMI,
    GOLD_LOAN_EMI, EDUCATION_LOAN_EMI, FLAT_VS_REDUCING,
    SIMPLE_INTEREST, COMPOUND_INTEREST, GST, CAGR,
    INFLATION, BROKERAGE_CALCULATOR
)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

# --- Database Models ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class CalculationHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    calc_type = db.Column(db.String(50), nullable=False)
    params = db.Column(db.Text, nullable=False)
    result = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

# --- Helper Function for Formatting ---

def format_json_data(json_str):
    try:
        data = json.loads(json_str)
        # Removes {}, "", replaces _ with space, and titles keys
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
        new_user = User(username=username, password=hashed_password , email=email)
        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Successfully registered!', 'success')
            return redirect(url_for('login'))
        except:
            db.session.rollback()
            flash('Username already exists', 'danger')
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
    
    raw_history = CalculationHistory.query.filter_by(user_id=session['user_id'])\
        .order_by(CalculationHistory.timestamp.desc()).limit(10).all()

    processed_history = []
    for entry in raw_history:
        # Time Logic: UTC to IST (+5:30)
        ist_time = entry.timestamp + timedelta(hours=5, minutes=30)
        
        processed_history.append({
            'calc_type': entry.calc_type.replace('_', ' '),
            'params': format_json_data(entry.params),
            'result': format_json_data(entry.result),
            'timestamp': ist_time,
        })

    return render_template("index.html", history=processed_history)

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

    try:
        calculators = {
            "SIP": lambda p: SIP(float(p["Monthly_investment"]), float(p["Expected_return"]), float(p["Years"]), p.get("Mode", "end")),
            "LUMPSUM": lambda p: LUMPSUM(float(p["Total_investment"]), float(p["Expected_return"]), float(p["Years"])),
            "SWP": lambda p: SWP(float(p["Total_investment"]), float(p["Withdrawal_amount"]), float(p["Expected_rate"]), float(p["Years"])),
            "STEP_UP_SIP": lambda p: STEP_UP_SIP(float(p["Monthly_investment"]), float(p["Step_up_rate"]), float(p["Expected_return"]), float(p["Years"])),
            "PPF": lambda p: PPF(float(p["Yearly_investment"]), float(p["Annual_interest_rate"]), float(p["Years"])),
            "EPF": lambda p: EPF(float(p["Basic_salary"]), float(p["DA"]), int(p["Years_of_service"]), float(p["Annual_salary_growth"]), float(p["Epf_interest_rate"])),
            "NSC": lambda p: NSC(float(p["Amount_invested"]), float(p["Interest_rate"]), int(p.get("Years", 5))),
            "FD_SIMPLE": lambda p: FD_SIMPLE(float(p["Principal"]), float(p["Interest_rate"]), float(p["Years"])),
            "RD": lambda p: RD(float(p["Monthly_investment"]), float(p["Expected_rate"]), float(p["Years"])),
            "NPS": lambda p: NPS(float(p["Monthly_investment"]), float(p["Annual_return"]), int(p["Current_age"]), int(p.get("Retirement_age", 60))),
            "RETIREMENT_CALCULATOR": lambda p: RETIREMENT_CALCULATOR(int(p["Age"]), float(p["Monthly_expense"]), int(p.get("Retirement_age", 60)), int(p.get("Life_expectancy", 85)), float(p.get("Inflation", 0.06)), float(p.get("Annual_return", 0.07))),
            "GRATUITY": lambda p: GRATUITY(float(p["Basic_salary"]), float(p["DA"]), float(p["Years_of_service"])),
            "SALARY_CALCULATOR": lambda p: SALARY_CALCULATOR(float(p["CTC"]), float(p["Bonus"]), float(p["Proffesional_tax"]), float(p["Employer_pf"]), float(p["Employee_pf"]), float(p["Other_deductions"])),
            "EMI": lambda p: EMI(float(p["Loan_amount"]), float(p["Interest_rate"]), float(p["Years"])),
            "HOME_LOAN_EMI": lambda p: HOME_LOAN_EMI(float(p["Loan_amount"]), float(p["Interest_rate"]), float(p["Years"])),
            "CAR_LOAN_EMI": lambda p: CAR_LOAN_EMI(float(p["Loan_amount"]), float(p["Interest_rate"]), float(p["Years"])),
            "GOLD_LOAN_EMI": lambda p: GOLD_LOAN_EMI(float(p["Loan_amount"]), float(p["Interest_rate"]), float(p["Years"])),
            "EDUCATION_LOAN_EMI": lambda p: EDUCATION_LOAN_EMI(float(p["Loan_amount"]), float(p["Interest_rate"]), float(p["Years"])),
            "FLAT_VS_REDUCING": lambda p: FLAT_VS_REDUCING(float(p["Principal"]), float(p["Annual_rate"]), float(p["Years"])),
            "SIMPLE_INTEREST": lambda p: SIMPLE_INTEREST(float(p["Principal_amount"]), float(p["Rate_of_interest"]), float(p["Years"])),
            "COMPOUND_INTEREST": lambda p: COMPOUND_INTEREST(float(p["Principal_amount"]), float(p["Interest_rate"]), float(p["Years"]), int(p["Compounding_per_year"])),
            "GST": lambda p: GST(float(p["Original_price"]), float(p["Gst_rate"])),
            "CAGR": lambda p: CAGR(float(p["Initial_value"]), float(p["Final_value"]), float(p["Years"])),
            "INFLATION": lambda p: INFLATION(float(p["Current_price"]), float(p["Rate"]), float(p["Years"])),
            "BROKERAGE_CALCULATOR": lambda p: BROKERAGE_CALCULATOR(p["Segment"], int(p["Quantity"]), float(p["Buy_price"]), float(p["Sell_price"]), float(p["Brokerage"]))
        }

        if calc_type in calculators:
            result = calculators[calc_type](params)
            
            # --- Store Result in History ---
            if 'user_id' in session:
                history_entry = CalculationHistory(
                    user_id=session['user_id'],
                    calc_type=calc_type,
                    params=json.dumps(params),
                    result=json.dumps(result)
                )
                db.session.add(history_entry)
                db.session.commit()

            return jsonify({"success": True, "result": result})
        else:
            return jsonify({"success": False, "error": f"Unknown calculator type: {calc_type}"}), 400

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)