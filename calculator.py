# INVESTMENT CALCULATORS

def SIP(monthly_investment, Expected_return, years, mode="end"):
    r = Expected_return / 12 / 100
    n = years * 12
    
    if mode == "begin": # Beginning of month SIP (extra compounding)
        fv = monthly_investment * (((1 + r) ** n - 1) / r) * (1 + r)
    else: # End of month SIP (standard case)
        fv = monthly_investment * (((1 + r) ** n - 1) / r)
    
    invested = monthly_investment * n
    
    return {
        "Total Investment": f"₹{round(invested, 2):,.2f}",
        "Future Value": f"₹{round(fv, 2):,.2f}",
        "Wealth Gained": f"₹{round(fv - invested, 2):,.2f}",
    }

def LUMPSUM(Total_investment, Expected_return, years):
    fv = Total_investment * (1 + Expected_return / 100) ** years

    return {
        "Total Investment": f"₹{round(Total_investment, 2):,.2f}",
        "Future Value": f"₹{round(fv, 2):,.2f}",
        "Wealth Gained": f"₹{round(fv - Total_investment, 2):,.2f}",
    }


def SWP(total_investment, withdrawal_amount, Expected_rate, years):
    r = Expected_rate / 12 / 100
    n = years * 12
    fv = (total_investment * (1 + r) ** n) - \
         (withdrawal_amount * (((1 + r) ** n - 1) / r) * (1 + r))
    
    return {
        "Total Investment": f"₹{round(total_investment, 2):,.2f}",
        "Total Withdrawal": f"₹{round(withdrawal_amount * n, 2):,.2f}",
        "Future Value": f"₹{round(fv, 2):,.2f}",
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
        "Total Investment": f"₹{round(total_investment, 2):,.2f}",
        "Future Value": f"₹{round(fund_value, 2):,.2f}",
        "Wealth Gained": f"₹{round(fund_value - total_investment, 2):,.2f}",
    }


def PPF(yearly_investment, annual_interest_rate, years):
    r = annual_interest_rate / 100
    maturity = yearly_investment * (((1 + r) ** years - 1) / r) * (1 + r)
    invested = yearly_investment * years

    return {
        "Total Investment": f"₹{round(invested, 2):,.2f}",
        "Maturity Value": f"₹{round(maturity, 2):,.2f}",
        "Wealth Gained": f"₹{round(maturity - invested, 2):,.2f}",
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
        "Total Contribution": f"₹{total_contribution:,.2f}",
        "Total Corpus": f"₹{total_balance:,.2f}",
        "Interest Earned": f"₹{(total_balance - total_contribution):,.2f}",
    }


# NATIONAL SAVINGS CERTIFICATE
def NSC(amount_invested, interest_rate, years=5):
    r = interest_rate / 100
    maturity = amount_invested * (1 + r) ** years

    return {
        "Invested Amount": f"₹{round(amount_invested, 2):,.2f}",
        "Maturity Amount": f"₹{round(maturity, 2):,.2f}",
        "Wealth Gained": f"₹{round(maturity - amount_invested, 2):,.2f}",
    }


# FIXED DEPOSIT SIMPLE
def FD_SIMPLE(principal, interest_rate, years):
    maturity = principal + (principal * interest_rate * years / 100)

    return {
        "Principal": f"₹{round(principal, 2):,.2f}",
        "Interest": f"₹{round(maturity - principal, 2):,.2f}",
        "Maturity Amount": f"₹{round(maturity, 2):,.2f}",
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
        "Invested Amount": f"₹{round(invested, 2):,.2f}",
        "Maturity Amount": f"₹{round(maturity, 2):,.2f}",
        "Wealth Gained": f"₹{round(maturity - invested, 2):,.2f}",
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
        "Investment Period (Years)": years,
        "Total Investment": f"₹{round(invested, 2):,.2f}",
        "Interest Earned": f"₹{round(interest, 2):,.2f}",
        "Maturity Amount": f"₹{round(corpus, 2):,.2f}",
        "60% Lump Sum": f"₹{round(lump_sum_60, 2):,.2f}",
        "40% Annuity": f"₹{round(annuity_40, 2):,.2f}",
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
        "Retirement Corpus Required": f"₹{corpus:,.2f}",
        "Monthly SIP Required": f"₹{sip_needed:,.2f}",
    }



# GRATUITY
def GRATUITY(basic_salary, DA, years_of_service):
    total_salary = basic_salary + DA
    gratuity_amount = total_salary * years_of_service * 15 / 26

    return {"Gratuity Amount": f"₹{round(gratuity_amount, 2):,.2f}", 
    }


# SALARY CALCULATOR
def SALARY_CALCULATOR(ctc, bonus, proffesional_tax, employer_pf, employee_pf, other_deductions):
    total_monthly_deduction = bonus + proffesional_tax + employer_pf + employee_pf + other_deductions
    annual_deduction = total_monthly_deduction * 12
    take_home_annual = ctc - annual_deduction
    take_home_monthly = take_home_annual / 12

    return {
        "Total Monthly Deduction": f"₹{round(total_monthly_deduction, 2):,.2f}",
        "Take Home Monthly": f"₹{round(take_home_monthly, 2):,.2f}",
        "Take Home Annual": f"₹{round(take_home_annual, 2):,.2f}",
        "Total Annual Deduction": f"₹{round(annual_deduction, 2):,.2f}",
    }


# EMI VARIANTS (Home, Car, Gold, Education)
def EMI(loan_amount, interest_rate, years):
    n = years * 12
    r = interest_rate / 12 / 100
    emi_value = loan_amount * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total = emi_value * n
    interest = total - loan_amount

    return {
        "Monthly EMI": f"₹{round(emi_value, 2):,.2f}",
        "Principal": f"₹{round(loan_amount, 2):,.2f}",
        "Total Interest": f"₹{round(interest, 2):,.2f}",
        "Total Amount": f"₹{round(total, 2):,.2f}",
    }
# HOME LOAN EMI
def HOME_LOAN_EMI(loan_amount, interest_rate, years):
    n = years * 12
    r = interest_rate / 12 / 100
    emi_value = loan_amount * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total = emi_value * n
    interest = total - loan_amount

    return {
        "Monthly EMI": f"₹{round(emi_value, 2):,.2f}",
        "Principal": f"₹{round(loan_amount, 2):,.2f}",
        "Total Interest": f"₹{round(interest, 2):,.2f}",
        "Total Amount": f"₹{round(total, 2):,.2f}",
    }


# CAR LOAN EMI
def CAR_LOAN_EMI(loan_amount, interest_rate, years):
    n = years * 12
    r = interest_rate / 12 / 100
    emi_value = loan_amount * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total = emi_value * n
    interest = total - loan_amount

    return {
        "Monthly EMI": f"₹{round(emi_value, 2):,.2f}",
        "Principal": f"₹{round(loan_amount, 2):,.2f}",
        "Total Interest": f"₹{round(interest, 2):,.2f}",
        "Total Amount": f"₹{round(total, 2):,.2f}",
    }


# GOLD LOAN EMI
def GOLD_LOAN_EMI(loan_amount, interest_rate, years):
    n = years * 12
    r = interest_rate / 12 / 100
    emi_value = loan_amount * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total = emi_value * n
    interest = total - loan_amount

    return {
        "Monthly EMI": f"₹{round(emi_value, 2):,.2f}",
        "Principal": f"₹{round(loan_amount, 2):,.2f}",
        "Total Interest": f"₹{round(interest, 2):,.2f}",
        "Total Amount": f"₹{round(total, 2):,.2f}",
    }


# EDUCATION LOAN EMI
def EDUCATION_LOAN_EMI(loan_amount, interest_rate, years):
    n = years * 12
    r = interest_rate / 12 / 100
    emi_value = loan_amount * r * (1 + r) ** n / ((1 + r) ** n - 1)
    total = emi_value * n
    interest = total - loan_amount

    return {
        "Monthly EMI": f"₹{round(emi_value, 2):,.2f}",
        "Principal": f"₹{round(loan_amount, 2):,.2f}",
        "Total Interest": f"₹{round(interest, 2):,.2f}",
        "Total Amount": f"₹{round(total, 2):,.2f}",
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
        "Flat EMI": f"₹{round(flat_emi, 2):,.2f}",
        "Flat Total Payable": f"₹{round(flat_total, 2):,.2f}",
        "Reducing EMI": f"₹{round(reducing_emi, 2):,.2f}",
        "Reducing Total Payable": f"₹{round(reducing_total, 2):,.2f}",
        "Saves": f"₹{round(flat_total - reducing_total, 2):,.2f}",
    }


# SIMPLE INTEREST
def SIMPLE_INTEREST(principal_amount, rate_of_interest, years):
    interest = principal_amount * rate_of_interest * years / 100
    total = principal_amount + interest

    return {
        "Principal_amount": f"₹{round(principal_amount, 2):,.2f}",
        "Interest_rate": f"₹{round(interest, 2):,.2f}", 
        "Total Amount": f"₹{round(total, 2):,.2f}", 
    }


# COMPOUND INTEREST
def COMPOUND_INTEREST(principal_amount, interest_rate, years, compounding_per_year):
    r = interest_rate / 100
    n = compounding_per_year
    total = principal_amount * (1 + r / n) ** (n * years)

    return {"Principal Amount": f"₹{round(principal_amount, 2):,.2f}", "Interest": f"₹{round(total - principal_amount, 2):,.2f}", "Total Amount": f"₹{round(total, 2):,.2f}",}


# GST CALCULATOR
def GST(original_price, gst_rate):
    gst_amount = original_price * gst_rate / 100
    total = original_price + gst_amount

    return {"Original Price": f"₹{round(original_price, 2):,.2f}", "GST Amount": f"₹{round(gst_amount, 2):,.2f}", "Total Amount": f"₹{round(total, 2):,.2f}"}


# CAGR
def CAGR(initial_value, final_value, years):
    cagr_value = (final_value / initial_value) ** (1 / years) - 1

    return {"CAGR %": round(cagr_value * 100, 2)}


# INFLATION
def INFLATION(current_price, rate, years):
    r = rate / 100
    future = current_price * (1 + r) ** years

    return {
        "Current Price": f"₹{round(current_price, 2):,.2f}",
        "Future Price": f"₹{round(future, 2):,.2f}",
        "Cost Increase": f"₹{round(future - current_price, 2):,.2f}",
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
        "Turnover": f"₹{round(turnover, 2):,.2f}",
        "P&L": f"₹{round(pnl, 2):,.2f}",
        "Brokerage": f"₹{round(brokerage, 2):,.2f}",
        "STT": f"₹{round(stt, 2):,.2f}",
        "Exchange Charges": f"₹{round(exchange, 2):,.2f}",
        "SEBI Charges": f"₹{round(sebi, 2):,.2f}",
        "GST": f"₹{round(gst, 2):,.2f}",
        "Stamp Duty": f"₹{round(stamp, 2):,.2f}",
        "Total Charges": f"₹{round(total_charges, 2):,.2f}",
        "Net P&L": f"₹{round(net_pnl, 2):,.2f}"
    }