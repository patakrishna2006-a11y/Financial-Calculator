# INVESTMENT CALCULATORS

def format_indian(number: float, decimals: int = 2) -> str:
    """Format number in Indian number system: 1,00,000.00"""
    sign = '-' if number < 0 else ''
    number = abs(number)
    
    integer_part = int(number)
    decimal_part = round(number - integer_part, decimals)
    
    s = str(integer_part)
    if len(s) <= 3:
        formatted_int = s
    else:
        formatted_int = s[-3:]
        s = s[:-3]
        while len(s) > 2:
            formatted_int = s[-2:] + ',' + formatted_int
            s = s[:-2]
        formatted_int = s + ',' + formatted_int if s else formatted_int
    
    if decimals > 0:
        decimal_str = f"{decimal_part:.{decimals}f}".split('.')[1]
        return f"{sign}₹{formatted_int}.{decimal_str}"
    return f"{sign}₹{formatted_int}"


def format_indian_raw(number: float, decimals: int = 2) -> str:
    """Format number in Indian number system without ₹ prefix: 1,00,000.00"""
    sign = '-' if number < 0 else ''
    number = abs(number)
    
    integer_part = int(number)
    decimal_part = round(number - integer_part, decimals)
    
    s = str(integer_part)
    if len(s) <= 3:
        formatted_int = s
    else:
        formatted_int = s[-3:]
        s = s[:-3]
        while len(s) > 2:
            formatted_int = s[-2:] + ',' + formatted_int
            s = s[:-2]
        formatted_int = s + ',' + formatted_int if s else formatted_int
    
    if decimals > 0:
        decimal_str = f"{decimal_part:.{decimals}f}".split('.')[1]
        return f"{sign}{formatted_int}.{decimal_str}"
    return f"{sign}{formatted_int}"


PARAM_DECIMALS = {
    "Monthly investment": 2, "Expected return": 2, "Total investment": 2,
    "Withdrawal amount": 2, "Step up rate": 2, "Yearly investment": 2,
    "Annual interest rate": 2, "Basic salary": 2, "DA": 2,
    "Annual salary growth": 2, "Epf interest rate": 2, "Amount invested": 2,
    "Interest rate": 2, "Principal": 2, "Monthly expense": 2,
    "Inflation": 2, "Annual return": 2, "Loan amount": 2,
    "CTC": 2, "Bonus": 2, "Professional tax": 2,
    "Employer pf": 2, "Employee pf": 2, "Other deductions": 2,
    "Original price": 2, "Gst rate": 2, "Current price": 2,
    "Rate": 2, "Initial value": 2, "Final value": 2,
    "Buy price": 2, "Sell price": 2, "Brokerage": 2,
    "Years": 0, "Years of service": 0, "Current age": 0,
    "Retirement age": 0, "Life expectancy": 0, "Age": 0,
    "Quantity": 0, "Compounding_per_year": 0,
}

def SIP(monthly_investment, Expected_return, years, mode="end"):
    r = Expected_return / 12 / 100
    n = years * 12
    
    if mode == "begin": # Beginning of month SIP (extra compounding)
        fv = monthly_investment * (((1 + r) ** n - 1) / r) * (1 + r)
    else: # End of month SIP (standard case)
        fv = monthly_investment * (((1 + r) ** n - 1) / r)
    
    invested = monthly_investment * n
    
    return {
        "Total Investment": format_indian(invested, 2),
        "Future Value": format_indian(fv, 2),
        "Wealth Gained": format_indian(fv - invested, 2),
    }


def LUMPSUM(Total_investment, Expected_return, years):
    fv = Total_investment * (1 + Expected_return / 100) ** years

    return {
        "Total Investment": format_indian(Total_investment, 2),
        "Future Value": format_indian(fv, 2),
        "Wealth Gained": format_indian(fv - Total_investment, 2),
    }


def SWP(total_investment, withdrawal_amount, Expected_rate, years):
    r = Expected_rate / 12 / 100
    n = years * 12
    fv = (total_investment * (1 + r) ** n) - \
         (withdrawal_amount * (((1 + r) ** n - 1) / r) * (1 + r))
    
    return {
        "Total Investment": format_indian(total_investment, 2),
        "Total Withdrawal": format_indian(withdrawal_amount * n, 2),
        "Future Value": format_indian(fv, 2),
    }


def STEP_UP_SIP(monthly_investment, step_up_rate, Expected_return, years):
    monthly_rate = Expected_return / 12 / 100
    step_up = step_up_rate / 100
    total_months = int(years * 12)

    fund_value = 0
    total_investment = 0
    current_sip = monthly_investment
    values = []

    for month in range(total_months):
        fund_value *= (1 + monthly_rate)
        fund_value += current_sip
        total_investment += current_sip
        values.append(fund_value)
        if (month + 1) % 12 == 0:
            current_sip *= (1 + step_up)

    return {
        "Total Investment": format_indian(total_investment, 2),
        "Future Value": format_indian(fund_value, 2),
        "Wealth Gained": format_indian(fund_value - total_investment, 2),
    }


def PPF(yearly_investment, annual_interest_rate, years):
    r = annual_interest_rate / 100
    maturity = yearly_investment * (((1 + r) ** years - 1) / r) * (1 + r)
    invested = yearly_investment * years

    return {
        "Total Investment": format_indian(invested, 2),
        "Maturity Value": format_indian(maturity, 2),
        "Wealth Gained": format_indian(maturity - invested, 2),
    }


def EPF(basic_salary, DA, years_of_service, annual_salary_growth, epf_interest_rate):
    salary = basic_salary + DA
    annual_salary_growth /= 100
    epf_interest_rate /= 100

    total_balance = 0.0
    total_contribution = 0.0
    balances = []

    for year in range(years_of_service):
        if year > 0:
            salary *= (1 + annual_salary_growth)

        employee_pf = 0.12 * salary * 12
        employer_pf_total = 0.12 * salary * 12

        eps_salary_limit = min(salary, 15000)
        employer_eps = 0.0833 * eps_salary_limit * 12
        employer_epf = employer_pf_total - employer_eps

        yearly_epf = employee_pf + employer_epf
        total_contribution += yearly_epf
        total_balance = (total_balance + yearly_epf) * (1 + epf_interest_rate)
        balances.append(total_balance)

    return {
        "Total Contribution": format_indian(total_contribution, 2),
        "Total Corpus": format_indian(total_balance, 2),
        "Interest Earned": format_indian(total_balance - total_contribution, 2),
    }


# NATIONAL SAVINGS CERTIFICATE
def NSC(amount_invested, interest_rate, years=5):
    r = interest_rate / 100
    maturity = amount_invested * (1 + r) ** years

    return {
        "Invested Amount": format_indian(amount_invested, 2),
        "Maturity Amount": format_indian(maturity, 2),
        "Wealth Gained": format_indian(maturity - amount_invested, 2),
    }


# FIXED DEPOSIT SIMPLE
def FD_SIMPLE(principal, interest_rate, years):
    maturity = principal + (principal * interest_rate * years / 100)

    return {
        "Principal": format_indian(principal, 2),
        "Interest": format_indian(maturity - principal, 2),
        "Maturity Amount": format_indian(maturity, 2),
    }

# RECURRING DEPOSIT
def RD(monthly_investment, Expected_rate, years):
    months = int(years * 12)
    quarterly_rate = Expected_rate / 100 / 4
    maturity = 0
    values = []

    for m in range(months):
        remaining_months = months - m
        quarters = remaining_months / 3
        maturity += monthly_investment * (1 + quarterly_rate) ** quarters
        values.append(maturity)

    invested = monthly_investment * months

    return {
        "Invested Amount": format_indian(invested, 2),
        "Maturity Amount": format_indian(maturity, 2),
        "Wealth Gained": format_indian(maturity - invested, 2),
    }


# NATIONAL PENSION SCHEME
def NPS(monthly_investment, annual_return, current_age, retirement_age=60):
    years = retirement_age - current_age
    if years <= 0:
        return {"Error": "Retirement age must be greater than current age."}

    r = annual_return / 100 / 12
    n = years * 12
    corpus = monthly_investment * (((1 + r) ** n - 1) / r) * (1 + r)
    invested = monthly_investment * n
    interest = corpus - invested

    lump_sum_60 = corpus * 0.60
    annuity_40 = corpus * 0.40

    return {
        "Investment Period (Years)": format_indian_raw(years, 0),
        "Total Investment": format_indian(invested, 2),
        "Interest Earned": format_indian(interest, 2),
        "Maturity Amount": format_indian(corpus, 2),
        "60% Lump Sum": format_indian(lump_sum_60, 2),
        "40% Annuity": format_indian(annuity_40, 2),
    }


def RETIREMENT_CALCULATOR(
    age, 
    monthly_expense, 
    retirement_age=60, 
    life_expectancy=85, 
    inflation=0.06, 
    annual_return=0.07
):
    # Years until retirement and retirement duration
    years_to_retire = retirement_age - age
    retirement_years = life_expectancy - retirement_age
    
    # Future monthly expense adjusted for inflation
    future_monthly_expense = monthly_expense * ((1 + inflation) ** years_to_retire)
    annual_expense_retirement = future_monthly_expense * 12
    
    # Real return (inflation-adjusted)
    real_return = ((1 + annual_return) / (1 + inflation)) - 1
    
    # Corpus required
    corpus = annual_expense_retirement * (
        (1 - (1 + real_return) ** (-retirement_years)) / real_return
    )
    
    # SIP required
    monthly_rate = annual_return / 12
    months = years_to_retire * 12
    sip_needed = corpus * monthly_rate / ((1 + monthly_rate) ** months - 1)
    
    return {
        "Retirement Corpus Required": format_indian(corpus, 2),
        "Monthly SIP Required": format_indian(sip_needed, 2),
    }


# GRATUITY
def GRATUITY(basic_salary, DA, years_of_service):
    total_salary = basic_salary + DA
    gratuity_amount = total_salary * years_of_service * 15 / 26

    return {"Gratuity Amount": format_indian(gratuity_amount, 2), 
    }


# SALARY CALCULATOR
def SALARY_CALCULATOR(ctc, bonus, proffesional_tax, employer_pf, employee_pf, other_deductions):
    total_monthly_deduction = bonus + proffesional_tax + employer_pf + employee_pf + other_deductions
    annual_deduction = total_monthly_deduction * 12
    take_home_annual = ctc - annual_deduction
    take_home_monthly = take_home_annual / 12

    return {
        "Total Monthly Deduction": format_indian(total_monthly_deduction, 2),
        "Take Home Monthly": format_indian(take_home_monthly, 2),
        "Take Home Annual": format_indian(take_home_annual, 2),
        "Total Annual Deduction": format_indian(annual_deduction, 2),
    }


# EMI VARIANTS (Home, Car, Gold, Education)
def EMI(loan_amount, interest_rate, years):
    n = years * 12
    r = interest_rate / 12 / 100
    emi_value = loan_amount * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total = emi_value * n
    interest = total - loan_amount

    return {
        "Monthly EMI": format_indian(emi_value, 2),
        "Principal": format_indian(loan_amount, 2),
        "Total Interest": format_indian(interest, 2),
        "Total Amount": format_indian(total, 2),
    }
# HOME LOAN EMI
def HOME_LOAN_EMI(loan_amount, interest_rate, years):
    n = years * 12
    r = interest_rate / 12 / 100
    emi_value = loan_amount * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total = emi_value * n
    interest = total - loan_amount

    return {
        "Monthly EMI": format_indian(emi_value, 2),
        "Principal": format_indian(loan_amount, 2),
        "Total Interest": format_indian(interest, 2),
        "Total Amount": format_indian(total, 2),
    }


# CAR LOAN EMI
def CAR_LOAN_EMI(loan_amount, interest_rate, years):
    n = years * 12
    r = interest_rate / 12 / 100
    emi_value = loan_amount * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total = emi_value * n
    interest = total - loan_amount

    return {
        "Monthly EMI": format_indian(emi_value, 2),
        "Principal": format_indian(loan_amount, 2),
        "Total Interest": format_indian(interest, 2),
        "Total Amount": format_indian(total, 2),
    }


# GOLD LOAN EMI
def GOLD_LOAN_EMI(loan_amount, interest_rate, years):
    n = years * 12
    r = interest_rate / 12 / 100
    emi_value = loan_amount * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total = emi_value * n
    interest = total - loan_amount

    return {
        "Monthly EMI": format_indian(emi_value, 2),
        "Principal": format_indian(loan_amount, 2),
        "Total Interest": format_indian(interest, 2),
        "Total Amount": format_indian(total, 2),
    }


# EDUCATION LOAN EMI
def EDUCATION_LOAN_EMI(loan_amount, interest_rate, years):
    n = years * 12
    r = interest_rate / 12 / 100
    emi_value = loan_amount * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total = emi_value * n
    interest = total - loan_amount

    return {
        "Monthly EMI": format_indian(emi_value, 2),
        "Principal": format_indian(loan_amount, 2),
        "Total Interest": format_indian(interest, 2),
        "Total Amount": format_indian(total, 2),
    }


# FLAT VS REDUCING LOAN
def FLAT_VS_REDUCING(principal, annual_rate, years):
    flat_interest = principal * (annual_rate / 100) * years
    flat_total = principal + flat_interest
    flat_emi = flat_total / (years * 12)

    r = (annual_rate / 100) / 12
    n = int(years * 12)
    reducing_emi = principal * r * (1 + r) ** n / ((1 + r) ** n - 1)
    reducing_total = reducing_emi * n

    return {
        "Flat EMI": format_indian(flat_emi, 2),
        "Flat Total Payable": format_indian(flat_total, 2),
        "Reducing EMI": format_indian(reducing_emi, 2),
        "Reducing Total Payable": format_indian(reducing_total, 2),
        "Saves": format_indian(flat_total - reducing_total, 2),
    }


# SIMPLE INTEREST
def SIMPLE_INTEREST(principal_amount, rate_of_interest, years):
    interest = principal_amount * rate_of_interest * years / 100
    total = principal_amount + interest

    return {
        "Principal Amount": format_indian(principal_amount, 2),
        "Interest": format_indian(interest, 2), 
        "Total Amount": format_indian(total, 2), 
    }


# COMPOUND INTEREST
def COMPOUND_INTEREST(principal_amount, interest_rate, years, compounding_per_year):
    r = interest_rate / 100
    n = compounding_per_year
    total = principal_amount * (1 + r / n) ** (n * years)

    return {"Principal Amount": format_indian(principal_amount, 2), "Interest": format_indian(total - principal_amount, 2), "Total Amount": format_indian(total, 2),}


# GST CALCULATOR
def GST(original_price, gst_rate):
    gst_amount = original_price * gst_rate / 100
    total = original_price + gst_amount

    return {"Original Price": format_indian(original_price, 2), "GST Amount": format_indian(gst_amount, 2), "Total Amount": format_indian(total, 2)}


# CAGR
def CAGR(initial_value, final_value, years):
    cagr_value = (final_value / initial_value) ** (1 / years) - 1

    return {"CAGR %": f"{round(cagr_value * 100, 2)}%"}


# INFLATION
def INFLATION(current_price, rate, years):
    r = rate / 100
    future = current_price * (1 + r) ** years

    return {
        "Current Price": format_indian(current_price, 2),
        "Future Price": format_indian(future, 2),
        "Cost Increase": format_indian(future - current_price, 2),
    }


def BROKERAGE_CALCULATOR(segment, Quantity, buy_price, sell_price, brokerage):

    segment = segment.lower()

    buy_value = Quantity * buy_price
    sell_value = Quantity * sell_price
    turnover = buy_value + sell_value
    pnl = sell_value - buy_value

    # -------- Default Charges --------
    sebi = turnover * 0.000001  # SEBI charges

    # -------- Segment Based Logic --------
    if segment == "delivery":
        stt = (buy_value * 0.001) + (sell_value * 0.001)
        exchange = turnover * 0.0000297
        stamp = buy_value * 0.00015

    elif segment == "intraday":
        stt = sell_value * 0.00025
        exchange = turnover * 0.0000297
        stamp = buy_value * 0.00003

    elif segment == "futures":
        stt = sell_value * 0.000125
        exchange = turnover * 0.000019
        stamp = buy_value * 0.00002

    elif segment == "options":
        stt = sell_value * 0.000625
        exchange = turnover * 0.00053
        stamp = buy_value * 0.00003

    else:
        return {"Error": "Invalid segment type"}

    gst = (brokerage + exchange) * 0.18

    total_charges = brokerage + stt + exchange + sebi + stamp + gst
    net_pnl = pnl - total_charges

    return {
        "Segment": segment.title(),
        "Turnover": format_indian(turnover, 2),
        "P&L": format_indian(pnl, 2),
        "Brokerage": format_indian(brokerage, 2),
        "STT": format_indian(stt, 2),
        "Exchange Charges": format_indian(exchange, 2),
        "SEBI Charges": format_indian(sebi, 2),
        "GST": format_indian(gst, 2),
        "Stamp Duty": format_indian(stamp, 2),
        "Total Charges": format_indian(total_charges, 2),
        "Net P&L": format_indian(net_pnl, 2)
    }