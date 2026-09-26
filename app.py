from flask import Flask, request, jsonify, render_template, redirect, url_for, flash, session, g
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
import os
from dotenv import load_dotenv
import json
import re
import logging
import secrets
import requests
from logging.handlers import RotatingFileHandler
from flask_wtf.csrf import CSRFProtect, CSRFError
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_mail import Mail, Message
from sqlalchemy import inspect, text

load_dotenv()

IST = ZoneInfo("Asia/Kolkata")

def now_ist():
    return datetime.now(IST)

from calculator import (
    SIP, LUMPSUM, SWP, STEP_UP_SIP, PPF, EPF, NSC,
    FD_SIMPLE, RD, NPS, RETIREMENT_CALCULATOR, GRATUITY,
    SALARY_CALCULATOR, EMI, HOME_LOAN_EMI, CAR_LOAN_EMI,
    GOLD_LOAN_EMI, EDUCATION_LOAN_EMI, FLAT_VS_REDUCING,
    SIMPLE_INTEREST, COMPOUND_INTEREST, GST, CAGR,
    INFLATION, BROKERAGE_CALCULATOR, CRYPTO_CONVERTER,
    USD_INR_CONVERTER,
    format_indian_raw, PARAM_DECIMALS
)

app = Flask(__name__)

# --- Security Configuration ---
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')
if not app.config['SECRET_KEY']:
    raise RuntimeError("FLASK_SECRET_KEY environment variable must be set")

# Database configuration - use PostgreSQL in production, SQLite for development
database_url = os.environ.get('DATABASE_URL')
if database_url:
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

# Session cookie security
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = os.environ.get('FLASK_ENV', 'development') == 'production'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=24)
app.config['SESSION_PERMANENT'] = True

# CSRF Configuration
app.config['WTF_CSRF_TIME_LIMIT'] = None
app.config['WTF_CSRF_SSL_STRICT'] = app.config['SESSION_COOKIE_SECURE']

# Profile picture uploads (applies to any request body)
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5 MB
MAX_PROFILE_PICTURE_BYTES = 2 * 1024 * 1024  # 2 MB per image
ALLOWED_PROFILE_PICTURE_EXTENSIONS = {'jpg', 'jpeg', 'png', 'webp', 'gif'}

db = SQLAlchemy(app)

# --- Initialize Extensions ---
csrf = CSRFProtect(app)

# Rate limiter storage: Redis for production, memory for development
redis_url = os.environ.get('REDIS_URL')
if redis_url:
    storage_uri = redis_url
else:
    storage_uri = "memory://"

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri=storage_uri,
)

# --- Mail Configuration ---
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')
app.config['BASE_URL'] = os.environ.get('BASE_URL', 'http://localhost:5000')

mail = Mail(app)

# --- Security Logging Setup ---
security_logger = logging.getLogger('security')
security_logger.setLevel(logging.INFO)
if not security_logger.handlers:
    handler = RotatingFileHandler('security.log', maxBytes=10_000_000, backupCount=10)
    handler.setFormatter(logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    ))
    security_logger.addHandler(handler)

def log_security_event(event_type, details, user_id=None, ip=None):
    """Log security-relevant events."""
    ip = ip or request.remote_addr
    user_info = f"user_id={user_id}" if user_id else "anonymous"
    security_logger.info(f"{event_type} | ip={ip} | {user_info} | {details}")


def generate_verification_token():
    """Generate a secure random token for email verification."""
    return secrets.token_urlsafe(32)


def hash_token(token):
    """Hash a token for secure storage."""
    return generate_password_hash(token)


def verify_token(token_hash, token):
    """Verify a token against its hash using constant-time comparison."""
    if not token_hash or not token:
        return False
    return check_password_hash(token_hash, token)


def format_ist(dt):
    """Format a datetime (naive or aware) for display in IST."""
    if not dt:
        return None
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=IST)
    return dt.astimezone(IST).strftime('%d %b %Y, %I:%M %p')


def allowed_profile_picture(filename):
    """Check that the uploaded file has an allowed image extension."""
    if not filename or '.' not in filename:
        return False
    return filename.rsplit('.', 1)[1].lower() in ALLOWED_PROFILE_PICTURE_EXTENSIONS


def detect_image_format(file_storage):
    """Validate the image by magic bytes; returns the format or None.

    Relying on the client-supplied extension/content-type is unsafe, so the
    actual file header is inspected instead. SVG is intentionally not
    supported (XSS risk when served inline).
    """
    try:
        header = file_storage.stream.read(12)
    finally:
        file_storage.stream.seek(0)

    if len(header) < 8:
        return None
    if header.startswith(b'\xff\xd8\xff'):
        return 'jpg'
    if header.startswith(b'\x89PNG\r\n\x1a\n'):
        return 'png'
    if header.startswith((b'GIF87a', b'GIF89a')):
        return 'gif'
    if header.startswith(b'RIFF') and header[8:12] == b'WEBP':
        return 'webp'
    return None


def delete_profile_picture_file(user):
    """Safely remove the user's profile picture file from disk.

    The stored DB value is a path relative to /static. Only files inside
    static/uploads can ever be deleted (guards against tampered values).
    """
    if not user.profile_picture:
        return
    try:
        file_path = os.path.normpath(os.path.join(app.static_folder, user.profile_picture))
        uploads_root = os.path.normpath(os.path.join(app.static_folder, 'uploads'))
        if file_path.startswith(uploads_root + os.sep) and os.path.isfile(file_path):
            os.remove(file_path)
    except OSError:
        pass  # Non-critical: orphaned file is harmless


def send_verification_email(user, token):
    """Send verification email to user."""
    verify_url = f"{app.config['BASE_URL']}/verify-email/{token}"
    
    html = render_template('email/verification.html',
        username=user.username,
        verify_url=verify_url,
        expiry_hours=1
    )
    
    msg = Message(
        subject="Verify your FinCalc Pro account",
        recipients=[user.email],
        html=html
    )
    mail.send(msg)


def send_password_reset_email(user, token):
    """Send a one-hour password reset email to the user."""
    reset_url = f"{app.config['BASE_URL']}/reset-password/{token}"
    html = render_template('email/verification.html',
        username=user.username,
        reset_url=reset_url,
        expiry_hours=1,
        email_type='password_reset'
    )
    msg = Message(
        subject="Reset your FinCalc Pro password",
        recipients=[user.email],
        html=html
    )
    mail.send(msg)


def send_account_deletion_email(user, token):
    """Send a one-hour account deletion confirmation email to the user."""
    deletion_url = f"{app.config['BASE_URL']}/confirm-account-deletion/{token}"
    html = render_template('email/verification.html',
        username=user.username,
        deletion_url=deletion_url,
        expiry_hours=1,
        email_type='account_deletion'
    )
    msg = Message(
        subject="Confirm deletion of your FinCalc Pro account",
        recipients=[user.email],
        html=html
    )
    mail.send(msg)


# --- Crypto Price Caching ---
import time
import threading

_crypto_cache = {"prices": {}, "timestamp": 0, "coins": []}
_crypto_lock = threading.Lock()
CACHE_TTL = 30  # seconds

# --- USD/INR Exchange Rate Caching ---
_usd_inr_cache = {"rate": None, "timestamp": 0, "source_updated_at": None}
_usd_inr_lock = threading.Lock()
USD_INR_CACHE_TTL = 60  # Recheck provider every 60 seconds

COINGECKO_TOP_100_IDS = [
    "bitcoin", "ethereum", "tether", "binancecoin", "solana",
    "usd-coin", "staked-ether", "xrp", "dogecoin", "toncoin",
    "cardano", "shiba-inu", "avalanche-2", "wrapped-bitcoin", "chainlink",
    "polkadot", "tron", "polygon", "litecoin", "uniswap",
    "bitcoin-cash", "near", "internet-computer", "dai", "aptos",
    "ethereum-classic", "stellar", "filecoin", "cosmos", "hedera-hashgraph",
    "vechain", "monero", "okb", "render-token", "theta-token",
    "injective-protocol", "fantom", "maker", "arbitrum", "optimism",
    "celestia", "sei-network", "mantle", "gala", "rocket-pool",
    "axie-infinity", "the-sandbox", "decentraland", "chiliz", "flow",
    "tezos", "eos", "klaytn", "quant-network", "lido-dao",
    "curve-dao-token", "aave", "synthetix", "compound", "yearn-finance",
    "sushi", "1inch", "balancer", "bancor", "kyber-network",
    "0x", "loopring", "ren", "uma", "alchemy-pay",
    "mask-network", "audius", "rally", "superrare", "nftx",
    "fractional", "whale", "nft-index", "muse", "rare"
]

def fetch_crypto_prices():
    """Fetch top 100 crypto prices from CoinGecko."""
    try:
        ids = ",".join(COINGECKO_TOP_100_IDS)
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={ids}&vs_currencies=usd,inr"
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        data = resp.json()
        
        # Transform: {bitcoin: {usd: 50000, inr: 4150000}} -> {btc: 50000, inr: 83}
        prices = {}
        for coin_id, price_data in data.items():
            symbol = coin_id.replace("-", "").upper()[:10]  # Simplified symbol
            if coin_id == "bitcoin": symbol = "BTC"
            elif coin_id == "ethereum": symbol = "ETH"
            elif coin_id == "tether": symbol = "USDT"
            elif coin_id == "binancecoin": symbol = "BNB"
            elif coin_id == "solana": symbol = "SOL"
            elif coin_id == "usd-coin": symbol = "USDC"
            elif coin_id == "staked-ether": symbol = "STETH"
            elif coin_id == "xrp": symbol = "XRP"
            elif coin_id == "dogecoin": symbol = "DOGE"
            elif coin_id == "toncoin": symbol = "TON"
            elif coin_id == "cardano": symbol = "ADA"
            elif coin_id == "shiba-inu": symbol = "SHIB"
            elif coin_id == "avalanche-2": symbol = "AVAX"
            elif coin_id == "wrapped-bitcoin": symbol = "WBTC"
            elif coin_id == "chainlink": symbol = "LINK"
            elif coin_id == "polkadot": symbol = "DOT"
            elif coin_id == "tron": symbol = "TRX"
            elif coin_id == "polygon": symbol = "MATIC"
            elif coin_id == "litecoin": symbol = "LTC"
            elif coin_id == "uniswap": symbol = "UNI"
            elif coin_id == "bitcoin-cash": symbol = "BCH"
            elif coin_id == "near": symbol = "NEAR"
            elif coin_id == "internet-computer": symbol = "ICP"
            elif coin_id == "dai": symbol = "DAI"
            elif coin_id == "aptos": symbol = "APT"
            elif coin_id == "ethereum-classic": symbol = "ETC"
            elif coin_id == "stellar": symbol = "XLM"
            elif coin_id == "filecoin": symbol = "FIL"
            elif coin_id == "cosmos": symbol = "ATOM"
            elif coin_id == "hedera-hashgraph": symbol = "HBAR"
            elif coin_id == "vechain": symbol = "VET"
            elif coin_id == "monero": symbol = "XMR"
            elif coin_id == "okb": symbol = "OKB"
            elif coin_id == "render-token": symbol = "RENDER"
            elif coin_id == "theta-token": symbol = "THETA"
            elif coin_id == "injective-protocol": symbol = "INJ"
            elif coin_id == "fantom": symbol = "FTM"
            elif coin_id == "maker": symbol = "MKR"
            elif coin_id == "arbitrum": symbol = "ARB"
            elif coin_id == "optimism": symbol = "OP"
            elif coin_id == "celestia": symbol = "TIA"
            elif coin_id == "sei-network": symbol = "SEI"
            elif coin_id == "mantle": symbol = "MNT"
            elif coin_id == "gala": symbol = "GALA"
            elif coin_id == "rocket-pool": symbol = "RPL"
            elif coin_id == "axie-infinity": symbol = "AXS"
            elif coin_id == "the-sandbox": symbol = "SAND"
            elif coin_id == "decentraland": symbol = "MANA"
            elif coin_id == "chiliz": symbol = "CHZ"
            elif coin_id == "flow": symbol = "FLOW"
            elif coin_id == "tezos": symbol = "XTZ"
            elif coin_id == "eos": symbol = "EOS"
            elif coin_id == "klaytn": symbol = "KLAY"
            elif coin_id == "quant-network": symbol = "QNT"
            elif coin_id == "lido-dao": symbol = "LDO"
            elif coin_id == "curve-dao-token": symbol = "CRV"
            elif coin_id == "aave": symbol = "AAVE"
            elif coin_id == "synthetix": symbol = "SNX"
            elif coin_id == "compound": symbol = "COMP"
            elif coin_id == "yearn-finance": symbol = "YFI"
            elif coin_id == "sushi": symbol = "SUSHI"
            elif coin_id == "1inch": symbol = "1INCH"
            elif coin_id == "balancer": symbol = "BAL"
            elif coin_id == "bancor": symbol = "BNT"
            elif coin_id == "kyber-network": symbol = "KNC"
            elif coin_id == "0x": symbol = "ZRX"
            elif coin_id == "loopring": symbol = "LRC"
            elif coin_id == "ren": symbol = "REN"
            elif coin_id == "uma": symbol = "UMA"
            elif coin_id == "alchemy-pay": symbol = "ACH"
            elif coin_id == "mask-network": symbol = "MASK"
            elif coin_id == "audius": symbol = "AUDIO"
            elif coin_id == "rally": symbol = "RLY"
            elif coin_id == "superrare": symbol = "RARE"
            elif coin_id == "nftx": symbol = "NFTX"
            elif coin_id == "fractional": symbol = "FRAC"
            elif coin_id == "whale": symbol = "WHALE"
            elif coin_id == "nft-index": symbol = "NFTI"
            elif coin_id == "muse": symbol = "MUSE"
            elif coin_id == "rare": symbol = "RARE"
            elif coin_id == "inr":
                prices["INR"] = price_data.get("inr", 83.0)
                continue
            
            prices[symbol] = price_data.get("usd", 0)
            # Also store lowercase for lookup
            prices[symbol.lower()] = price_data.get("usd", 0)
        
        # Normalize INR to USD-per-INR so it can participate in
        # the same conversion formula as crypto assets.
        usd_inr_rate = get_cached_usd_inr_rate()
        if usd_inr_rate and usd_inr_rate > 0:
            prices["inr"] = 1.0 / usd_inr_rate
            prices["usd_inr_rate"] = usd_inr_rate

        return prices
    except Exception as e:
        log_security_event('CRYPTO_PRICE_FETCH_ERROR', str(e), ip=request.remote_addr if request else None)
        return None


def get_cached_crypto_prices():
    """Get cached crypto prices, fetching if stale."""
    global _crypto_cache
    now = time.time()
    
    with _crypto_lock:
        if now - _crypto_cache["timestamp"] < CACHE_TTL and _crypto_cache["prices"]:
            return _crypto_cache["prices"], _crypto_cache["coins"]
        
        # Fetch fresh prices
        prices = fetch_crypto_prices()
        if prices:
            _crypto_cache["prices"] = prices
            _crypto_cache["timestamp"] = now
            # Create coin list for dropdown
            _crypto_cache["coins"] = sorted([k for k in prices.keys() if k.isupper() and len(k) <= 10 and k != "INR"])
            return _crypto_cache["prices"], _crypto_cache["coins"]
        
        # Return stale cache if fetch failed
        return _crypto_cache["prices"], _crypto_cache["coins"]


def fetch_usd_inr_rate():
    """Fetch the latest USD/INR rate from CurrencyAPI.

    CurrencyAPI requires an API key. Its freshness depends on the plan:
    free = daily, Small = hourly, Medium/Large = 60-second updates.
    We never substitute a hard-coded FX value.
    """
    api_key = os.environ.get("CURRENCY_API_KEY")
    if not api_key:
        log_security_event(
            'USD_INR_CONFIG_ERROR',
            'CURRENCY_API_KEY is not configured',
            ip=request.remote_addr if request else None
        )
        return None

    try:
        url = "https://api.currencyapi.com/v3/latest"
        resp = requests.get(
            url,
            headers={"apikey": api_key},
            params={"base_currency": "USD", "currencies": "INR"},
            timeout=10
        )
        resp.raise_for_status()
        data = resp.json()

        rate = (data.get("data", {}).get("INR", {}) or {}).get("value")
        if rate is not None and float(rate) > 0:
            return float(rate)

        raise ValueError("CurrencyAPI returned no valid USD/INR rate")
    except Exception as e:
        log_security_event('USD_INR_FETCH_ERROR', str(e), ip=request.remote_addr if request else None)

    return None


def get_cached_usd_inr_rate():
    """Get cached USD/INR rate, fetching if stale."""
    global _usd_inr_cache
    now = time.time()
    
    with _usd_inr_lock:
        if now - _usd_inr_cache["timestamp"] < USD_INR_CACHE_TTL and _usd_inr_cache["rate"]:
            return _usd_inr_cache["rate"]
        
        # Fetch fresh rate
        rate = fetch_usd_inr_rate()
        if rate:
            _usd_inr_cache["rate"] = rate
            _usd_inr_cache["timestamp"] = now
            return rate
        
        # Return the last successful rate only. Never invent a fallback FX rate.
        return _usd_inr_cache["rate"]


@app.route('/api/usd-inr/rate')
@limiter.limit("60 per minute")
def usd_inr_rate():
    """Return the latest available USD/INR rate from CurrencyAPI."""
    rate = get_cached_usd_inr_rate()
    if not rate:
        return jsonify({
            "success": False,
            "error": "Live USD/INR rate is unavailable. Configure CURRENCY_API_KEY."
        }), 503

    return jsonify({
        "success": True,
        "rate": rate,
        "provider": "CurrencyAPI",
        "cached_at": _usd_inr_cache["timestamp"],
        "source_updated_at": _usd_inr_cache.get("source_updated_at")
    })


@app.route('/api/crypto/prices')
@limiter.limit("60 per minute")
def crypto_prices():
    """API endpoint for cached crypto prices."""
    prices, coins = get_cached_crypto_prices()
    usd_inr_rate = get_cached_usd_inr_rate()
    if not prices or not usd_inr_rate:
        return jsonify({
            "success": False,
            "error": "Live market rates are temporarily unavailable"
        }), 503

    return jsonify({
        "success": True,
        "prices": prices,
        "coins": coins,
        "usd_inr_rate": usd_inr_rate,
        "cached_at": _crypto_cache["timestamp"]
    })


# --- Security Headers Middleware ---
@app.after_request
def add_security_headers(response):
    """Add security headers to all responses."""
    # Content Security Policy
    csp = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; "
        "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; "
        "img-src 'self' data: https:; "
        "connect-src 'self' https://cdn.jsdelivr.net; "
        "frame-ancestors 'none'; "
        "base-uri 'self'; "
        "form-action 'self'"
    )
    response.headers['Content-Security-Policy'] = csp
    
    # HSTS - only in production with HTTPS
    if app.config['SESSION_COOKIE_SECURE']:
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    
    # Prevent MIME sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'
    
    # Referrer Policy
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    
    # Permissions Policy
    response.headers['Permissions-Policy'] = (
        'geolocation=(), microphone=(), camera=(), '
        'payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
    )
    
    # X-Frame-Options (backup for CSP frame-ancestors)
    response.headers['X-Frame-Options'] = 'DENY'
    
    # Cross-Origin policies
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Resource-Policy'] = 'same-origin'
    
    return response

# --- CSRF Error Handler ---
@app.errorhandler(CSRFError)
def handle_csrf_error(e):
    log_security_event('CSRF_FAILURE', f'reason={e.description}', ip=request.remote_addr)
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({"success": False, "error": "CSRF token missing or invalid"}), 400
    flash('Security token expired. Please try again.', 'danger')
    return redirect(url_for('home'))

# --- Custom Error Pages ---
@app.errorhandler(400)
def bad_request(e):
    log_security_event('BAD_REQUEST', str(e), ip=request.remote_addr)
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({"success": False, "error": "Bad request"}), 400
    return render_template('errors/400.html'), 400

@app.errorhandler(401)
def unauthorized(e):
    log_security_event('UNAUTHORIZED', str(e), ip=request.remote_addr)
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({"success": False, "error": "Authentication required"}), 401
    return redirect(url_for('login'))

@app.errorhandler(403)
def forbidden(e):
    log_security_event('FORBIDDEN', str(e), user_id=session.get('user_id'), ip=request.remote_addr)
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({"success": False, "error": "Access denied"}), 403
    return render_template('errors/403.html'), 403

@app.errorhandler(404)
def not_found(e):
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({"success": False, "error": "Not found"}), 404
    return render_template('errors/404.html'), 404

@app.errorhandler(405)
def method_not_allowed(e):
    log_security_event('METHOD_NOT_ALLOWED', f'{request.method} {request.path}', ip=request.remote_addr)
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({"success": False, "error": "Method not allowed"}), 405
    return render_template('errors/405.html'), 405

@app.errorhandler(413)
def payload_too_large(e):
    log_security_event('PAYLOAD_TOO_LARGE', f'content_length={request.content_length}', ip=request.remote_addr)
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({"success": False, "error": "Payload too large"}), 413
    return render_template('errors/413.html'), 413

@app.errorhandler(429)
def rate_limit_exceeded(e):
    log_security_event('RATE_LIMIT_EXCEEDED', f'{request.method} {request.path}', 
                       user_id=session.get('user_id'), ip=request.remote_addr)
    retry_after = getattr(e, 'retry_after', 60)
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        resp = jsonify({"success": False, "error": "Rate limit exceeded. Please try again later."})
        resp.headers['Retry-After'] = str(retry_after)
        return resp, 429
    return render_template('errors/429.html', retry_after=retry_after), 429

@app.errorhandler(500)
def internal_error(e):
    log_security_event('INTERNAL_ERROR', str(e), user_id=session.get('user_id'), ip=request.remote_addr)
    db.session.rollback()
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({"success": False, "error": "Internal server error"}), 500
    return render_template('errors/500.html'), 500

# --- Database Models ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    is_verified = db.Column(db.Boolean, default=False, nullable=False)
    verification_token_hash = db.Column(db.String(100), unique=True, nullable=True)
    verification_token_expires = db.Column(db.DateTime, nullable=True)
    reset_token_hash = db.Column(db.String(100), unique=True, nullable=True)
    reset_token_expires = db.Column(db.DateTime, nullable=True)
    # Account deletion confirmation (email-verified)
    deletion_token_hash = db.Column(db.String(100), unique=True, nullable=True)
    deletion_token_expires = db.Column(db.DateTime, nullable=True)
    # Profile information
    profile_picture = db.Column(db.String(255), nullable=True)  # path relative to /static
    created_at = db.Column(db.DateTime, nullable=True)
    last_login = db.Column(db.DateTime, nullable=True)
    # Legacy plaintext columns (for migration compatibility)
    verification_token = db.Column(db.String(100), unique=True, nullable=True)
    reset_token = db.Column(db.String(100), unique=True, nullable=True)
    
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
    existing_columns = {column['name'] for column in inspect(db.engine).get_columns('user')}
    with db.engine.begin() as connection:
        if 'reset_token' not in existing_columns:
            connection.execute(text('ALTER TABLE "user" ADD COLUMN reset_token VARCHAR(100)'))
        if 'reset_token_expires' not in existing_columns:
            connection.execute(text('ALTER TABLE "user" ADD COLUMN reset_token_expires TIMESTAMP'))
        if 'verification_token_hash' not in existing_columns:
            connection.execute(text('ALTER TABLE "user" ADD COLUMN verification_token_hash VARCHAR(100)'))
        if 'reset_token_hash' not in existing_columns:
            connection.execute(text('ALTER TABLE "user" ADD COLUMN reset_token_hash VARCHAR(100)'))
        if 'profile_picture' not in existing_columns:
            connection.execute(text('ALTER TABLE "user" ADD COLUMN profile_picture VARCHAR(255)'))
        if 'created_at' not in existing_columns:
            connection.execute(text('ALTER TABLE "user" ADD COLUMN created_at TIMESTAMP'))
        if 'last_login' not in existing_columns:
            connection.execute(text('ALTER TABLE "user" ADD COLUMN last_login TIMESTAMP'))
        if 'deletion_token_hash' not in existing_columns:
            connection.execute(text('ALTER TABLE "user" ADD COLUMN deletion_token_hash VARCHAR(100)'))
        if 'deletion_token_expires' not in existing_columns:
            connection.execute(text('ALTER TABLE "user" ADD COLUMN deletion_token_expires TIMESTAMP'))
        # Create unique indexes for token hashes
        try:
            connection.execute(text('CREATE UNIQUE INDEX IF NOT EXISTS ix_user_verification_token_hash ON "user" (verification_token_hash)'))
        except Exception:
            pass
        try:
            connection.execute(text('CREATE UNIQUE INDEX IF NOT EXISTS ix_user_reset_token_hash ON "user" (reset_token_hash)'))
        except Exception:
            pass
        try:
            connection.execute(text('CREATE UNIQUE INDEX IF NOT EXISTS ix_user_deletion_token_hash ON "user" (deletion_token_hash)'))
        except Exception:
            pass

# --- Helper Functions ---
def format_json_data(json_str):
    try:
        data = json.loads(json_str)
        return ", ".join([f"{str(k).replace('_', ' ').title()}: {v}" for k, v in data.items()])
    except:
        return json_str

def validate_calculator_input(calc_type, params):
    """Validate calculator input parameters."""
    validators = {
        'SIP': lambda p: all(k in p for k in ['Monthly investment', 'Expected return', 'Years']),
        'LUMPSUM': lambda p: all(k in p for k in ['Total investment', 'Expected return', 'Years']),
        'SWP': lambda p: all(k in p for k in ['Total investment', 'Withdrawal amount', 'Expected rate', 'Years']),
        'STEP_UP_SIP': lambda p: all(k in p for k in ['Monthly investment', 'Step up rate', 'Expected return', 'Years']),
        'PPF': lambda p: all(k in p for k in ['Yearly investment', 'Annual interest rate', 'Years']),
        'EPF': lambda p: all(k in p for k in ['Basic salary', 'DA', 'Years of service', 'Annual salary growth', 'Epf interest rate']),
        'NSC': lambda p: all(k in p for k in ['Amount invested', 'Interest rate', 'Years']),
        'FD_SIMPLE': lambda p: all(k in p for k in ['Principal', 'Interest rate', 'Years']),
        'RD': lambda p: all(k in p for k in ['Monthly investment', 'Expected rate', 'Years']),
        'NPS': lambda p: all(k in p for k in ['Monthly investment', 'Annual return', 'Current age', 'Retirement age']),
        'RETIREMENT_CALCULATOR': lambda p: all(k in p for k in ['Age', 'Monthly expense', 'Retirement age', 'Life expectancy', 'Inflation', 'Annual return']),
        'GRATUITY': lambda p: all(k in p for k in ['Basic salary', 'DA', 'Years of service']),
        'SALARY_CALCULATOR': lambda p: all(k in p for k in ['CTC', 'Bonus', 'Professional tax', 'Employer pf', 'Employee pf', 'Other deductions']),
        'EMI': lambda p: all(k in p for k in ['Loan amount', 'Interest rate', 'Years']),
        'HOME_LOAN_EMI': lambda p: all(k in p for k in ['Loan amount', 'Interest rate', 'Years']),
        'CAR_LOAN_EMI': lambda p: all(k in p for k in ['Loan amount', 'Interest rate', 'Years']),
        'GOLD_LOAN_EMI': lambda p: all(k in p for k in ['Loan amount', 'Interest rate', 'Years']),
        'EDUCATION_LOAN_EMI': lambda p: all(k in p for k in ['Loan amount', 'Interest rate', 'Years']),
        'FLAT_VS_REDUCING': lambda p: all(k in p for k in ['Principal', 'Annual rate', 'Years']),
        'SIMPLE_INTEREST': lambda p: all(k in p for k in ['Principal amount', 'Rate of interest', 'Years']),
        'COMPOUND_INTEREST': lambda p: all(k in p for k in ['Principal amount', 'Interest rate', 'Years', 'Compounding_per_year']),
        'GST': lambda p: all(k in p for k in ['Original price', 'Gst rate']),
        'CAGR': lambda p: all(k in p for k in ['Initial value', 'Final value', 'Years']),
        'INFLATION': lambda p: all(k in p for k in ['Current price', 'Rate', 'Years']),
        'BROKERAGE_CALCULATOR': lambda p: all(k in p for k in ['Segment', 'Quantity', 'Buy price', 'Sell price', 'Brokerage']),
        'CRYPTO_CONVERTER': lambda p: all(k in p for k in ['From Currency', 'To Currency', 'Amount']),
        'USD_INR_CONVERTER': lambda p: all(k in p for k in ['From Currency', 'To Currency', 'Amount']),
    }
    
    if calc_type not in validators:
        return False, f"Unknown calculator type: {calc_type}"
    
    if not validators[calc_type](params):
        return False, f"Missing required parameters for {calc_type}"
    
    # Validate numeric ranges
    # Skip non-numeric parameters
    non_numeric_keys = {'Segment', 'Mode', 'mode', 'From Currency', 'To Currency'}
    for key, value in params.items():
        if key in non_numeric_keys:
            continue
        try:
            num_val = float(value)
            if num_val < 0 and 'rate' not in key.lower() and 'return' not in key.lower() and 'growth' not in key.lower() and 'inflation' not in key.lower():
                return False, f"{key} cannot be negative"
            if key in ['Years', 'Years of service', 'Current age', 'Retirement age', 'Life expectancy', 'Age', 'Quantity', 'Compounding_per_year']:
                if num_val <= 0:
                    return False, f"{key} must be positive"
                if key in ['Current age', 'Retirement age', 'Life expectancy', 'Age'] and num_val > 120:
                    return False, f"{key} out of valid range"
            if 'rate' in key.lower() or 'return' in key.lower() or 'interest' in key.lower() or 'growth' in key.lower() or 'inflation' in key.lower():
                if num_val > 100:
                    return False, f"{key} percentage out of valid range"
        except (ValueError, TypeError):
            return False, f"Invalid value for {key}"
    
    return True, None

# --- Routes ---
@app.route('/')
def home():
    return render_template('landing.html')

@app.route('/register', methods=['GET', 'POST'])
@limiter.limit("5 per minute; 20 per hour")
def register():
    check_email = request.args.get('check_email', '0') == '1'
    
    if request.method == 'GET':
        return render_template('register.html', check_email=check_email)
    
    username = request.form.get('username', '').strip()
    email = request.form.get('email', '').strip()
    password = request.form.get('password', '')
    confirm_password = request.form.get('confirm_password', '')
    
    # Input validation
    if not username or not email or not password or not confirm_password:
        log_security_event('REGISTRATION_FAILURE', 'missing_fields', ip=request.remote_addr)
        flash('All fields are required.', 'danger')
        return redirect(url_for('register'))
    
    if password != confirm_password:
        log_security_event('REGISTRATION_FAILURE', 'password_mismatch', ip=request.remote_addr)
        flash('Passwords do not match.', 'danger')
        return redirect(url_for('register'))
    
    if len(username) > 50:
        flash('Username too long.', 'danger')
        return redirect(url_for('register'))
    
    if len(email) > 100:
        flash('Email too long.', 'danger')
        return redirect(url_for('register'))
    
    # Email format validation
    if not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
        flash('Invalid email format.', 'danger')
        return redirect(url_for('register'))
    
    # Password complexity validation
    if len(password) < 9 or not re.search(r'[A-Za-z]', password) or not re.search(r'\d', password) or not re.search(r'[^A-Za-z0-9]', password):
        log_security_event('REGISTRATION_FAILURE', 'weak_password', ip=request.remote_addr)
        flash('Password must be at least 9 characters long and include a letter, a number, and a symbol.', 'danger')
        return redirect(url_for('register'))
    
    # Check if user already exists (unverified)
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        if existing_user.is_verified:
            flash('Username already exists', 'danger')
            return redirect(url_for('register'))
        else:
            # Resend verification for unverified user
            token = generate_verification_token()
            existing_user.verification_token_hash = hash_token(token)
            existing_user.verification_token = None  # Clear legacy
            existing_user.verification_token_expires = now_ist() + timedelta(hours=1)
            db.session.commit()
            try:
                send_verification_email(existing_user, token)
                log_security_event('VERIFICATION_RESENT', f'username={username}', user_id=existing_user.id, ip=request.remote_addr)
            except Exception as e:
                log_security_event('VERIFICATION_EMAIL_FAILED', f'username={username} error={str(e)}', ip=request.remote_addr)
            return redirect(url_for('register', check_email=1))
    
    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        if existing_email.is_verified:
            flash('An account with this email already exists', 'danger')
            return redirect(url_for('register'))
        else:
            # Resend verification for unverified user
            token = generate_verification_token()
            existing_email.verification_token_hash = hash_token(token)
            existing_email.verification_token = None  # Clear legacy
            existing_email.verification_token_expires = now_ist() + timedelta(hours=1)
            db.session.commit()
            try:
                send_verification_email(existing_email, token)
                log_security_event('VERIFICATION_RESENT', f'email={email}', user_id=existing_email.id, ip=request.remote_addr)
            except Exception as e:
                log_security_event('VERIFICATION_EMAIL_FAILED', f'email={email} error={str(e)}', ip=request.remote_addr)
            return redirect(url_for('register', check_email=1))
    
    hashed_password = generate_password_hash(password)
    token = generate_verification_token()
    token_expires = now_ist() + timedelta(hours=1)
    
    new_user = User(
        username=username,
        password=hashed_password,
        email=email,
        is_verified=False,
        verification_token_hash=hash_token(token),
        verification_token_expires=token_expires,
        created_at=now_ist()
    )
    
    try:
        db.session.add(new_user)
        db.session.commit()
        log_security_event('REGISTRATION_SUCCESS', f'username={username}', user_id=new_user.id, ip=request.remote_addr)
        
        # Send verification email (non-blocking - log failure but don't fail registration)
        try:
            send_verification_email(new_user, token)
            log_security_event('VERIFICATION_EMAIL_SENT', f'username={username}', user_id=new_user.id, ip=request.remote_addr)
            flash('Verification email sent! Please check your inbox (valid for 1 hour).', 'success')
        except Exception as e:
            log_security_event('VERIFICATION_EMAIL_FAILED', f'username={username} error={str(e)}', user_id=new_user.id, ip=request.remote_addr)
            flash('Account created but verification email could not be sent. Use the "Resend" option on the next page.', 'warning')
        
        return redirect(url_for('register', check_email=1))
    except Exception as e:
        db.session.rollback()
        log_security_event('REGISTRATION_FAILURE', f'db_error={str(e)}', ip=request.remote_addr)
        flash('Registration failed. Please try again.', 'danger')
        return redirect(url_for('register'))


@app.route('/verify-email/<token>')
def verify_email(token):
    """Verify user's email with token from email link."""
    # Find user by verifying token hash (constant-time comparison)
    # Query candidates with non-expired token hashes
    candidates = User.query.filter(
        User.verification_token_hash.isnot(None),
        User.verification_token_expires > now_ist()
    ).all()
    
    user = None
    for candidate in candidates:
        if verify_token(candidate.verification_token_hash, token):
            user = candidate
            break
    
    # Fallback: check legacy plaintext tokens (for migration)
    if not user:
        legacy_user = User.query.filter_by(verification_token=token).first()
        if legacy_user:
            # Verify legacy token hasn't expired
            token_expires = legacy_user.verification_token_expires
            if token_expires and token_expires.tzinfo is None:
                token_expires = token_expires.replace(tzinfo=IST)
            if token_expires and token_expires >= now_ist():
                user = legacy_user
    
    if not user:
        log_security_event('VERIFICATION_FAILED', 'invalid_token', ip=request.remote_addr)
        flash('Invalid verification link.', 'danger')
        return redirect(url_for('register'))
    
    # Parse expiry datetime - handle both naive and aware datetimes
    token_expires = user.verification_token_expires
    if token_expires is None:
        log_security_event('VERIFICATION_EXPIRED', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
        flash('Verification link has expired. Please register again.', 'danger')
        return redirect(url_for('register'))
    
    # Convert to timezone-aware if naive (assume IST)
    if token_expires.tzinfo is None:
        token_expires = token_expires.replace(tzinfo=IST)
    
    if token_expires < now_ist():
        log_security_event('VERIFICATION_EXPIRED', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
        flash('Verification link has expired. Please register again.', 'danger')
        return redirect(url_for('register'))
    
    if user.is_verified:
        log_security_event('VERIFICATION_ALREADY_DONE', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
        flash('Email already verified. Please login.', 'info')
        return redirect(url_for('login'))
    
    user.is_verified = True
    user.verification_token_hash = None
    user.verification_token = None  # Clear legacy
    user.verification_token_expires = None
    db.session.commit()
    
    log_security_event('EMAIL_VERIFIED', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
    flash('Email verified successfully! You can now login.', 'success')
    return redirect(url_for('login'))


@app.route('/resend-verification', methods=['POST'])
@limiter.limit("1 per 5 minutes; 5 per hour", error_message="Too many requests. Please wait before resending.")
def resend_verification():
    """Resend verification email for unverified users."""
    email = request.form.get('email', '').strip()
    
    if not email:
        flash('Email is required.', 'danger')
        return redirect(url_for('register', check_email=1))
    
    user = User.query.filter_by(email=email, is_verified=False).first()
    
    if not user:
        # Don't reveal if email exists or not for security
        flash('If this email is registered and unverified, a new verification link has been sent.', 'info')
        return redirect(url_for('register', check_email=1))
    
    token = generate_verification_token()
    user.verification_token_hash = hash_token(token)
    user.verification_token = None  # Clear legacy
    user.verification_token_expires = now_ist() + timedelta(hours=1)
    db.session.commit()
    
    try:
        send_verification_email(user, token)
        log_security_event('VERIFICATION_RESENT', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
        flash('Verification email resent! Please check your inbox (valid for 1 hour).', 'success')
    except Exception as e:
        log_security_event('VERIFICATION_EMAIL_FAILED', f'username={user.username} error={str(e)}', user_id=user.id, ip=request.remote_addr)
        flash('Failed to send verification email. Please try again later.', 'danger')
    
    return redirect(url_for('register', check_email=1))


@app.route('/forgot-password', methods=['GET', 'POST'])
@limiter.limit("5 per hour")
def forgot_password():
    """Request a password reset link without revealing account existence."""
    if request.method == 'GET':
        return render_template('forgot_password.html')

    email = request.form.get('email', '').strip()
    if email and len(email) <= 100 and re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
        user = User.query.filter_by(email=email).first()
        if user:
            token = generate_verification_token()
            user.reset_token_hash = hash_token(token)
            user.reset_token = None  # Clear legacy
            user.reset_token_expires = now_ist() + timedelta(hours=1)
            db.session.commit()
            try:
                send_password_reset_email(user, token)
                log_security_event('PASSWORD_RESET_EMAIL_SENT', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
            except Exception as e:
                log_security_event('PASSWORD_RESET_EMAIL_FAILED', f'username={user.username} error={str(e)}', user_id=user.id, ip=request.remote_addr)

    log_security_event('PASSWORD_RESET_REQUEST', 'email_submitted', ip=request.remote_addr)
    flash('If an account is registered with that email, a password reset link has been sent. It is valid for 1 hour.', 'info')
    return redirect(url_for('login'))


@app.route('/reset-password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    """Render and process a one-time password reset link."""
    # Find user by verifying token hash (constant-time comparison)
    candidates = User.query.filter(
        User.reset_token_hash.isnot(None),
        User.reset_token_expires > now_ist()
    ).all()
    
    user = None
    for candidate in candidates:
        if verify_token(candidate.reset_token_hash, token):
            user = candidate
            break
    
    # Fallback: check legacy plaintext tokens (for migration)
    if not user:
        legacy_user = User.query.filter_by(reset_token=token).first()
        if legacy_user:
            token_expires = legacy_user.reset_token_expires
            if token_expires and token_expires.tzinfo is None:
                token_expires = token_expires.replace(tzinfo=IST)
            if token_expires and token_expires >= now_ist():
                user = legacy_user
    
    if not user or not user.reset_token_expires:
        flash('This password reset link is invalid or has expired.', 'danger')
        return redirect(url_for('forgot_password'))

    token_expires = user.reset_token_expires
    if token_expires.tzinfo is None:
        token_expires = token_expires.replace(tzinfo=IST)
    if token_expires < now_ist():
        user.reset_token_hash = None
        user.reset_token = None  # Clear legacy
        user.reset_token_expires = None
        db.session.commit()
        flash('This password reset link has expired. Please request a new one.', 'danger')
        return redirect(url_for('forgot_password'))

    if request.method == 'GET':
        return render_template('reset_password.html', token=token)

    password = request.form.get('password', '')
    confirm_password = request.form.get('confirm_password', '')
    if not password or not confirm_password:
        flash('Both password fields are required.', 'danger')
        return render_template('reset_password.html', token=token)
    if password != confirm_password:
        flash('Passwords do not match.', 'danger')
        return render_template('reset_password.html', token=token)
    if len(password) < 9 or not re.search(r'[A-Za-z]', password) or not re.search(r'\d', password) or not re.search(r'[^A-Za-z0-9]', password):
        flash('Password must be at least 9 characters long and include a letter, a number, and a symbol.', 'danger')
        return render_template('reset_password.html', token=token)

    user.password = generate_password_hash(password)
    user.reset_token_hash = None
    user.reset_token = None  # Clear legacy
    user.reset_token_expires = None
    db.session.commit()
    log_security_event('PASSWORD_RESET_SUCCESS', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
    flash('Your password has been changed. Please login with your new password.', 'success')
    return redirect(url_for('login'))


@app.errorhandler(429)
def ratelimit_handler(e):
    """Handle rate limit exceeded with proper redirect for form submissions."""
    if request.path == '/resend-verification':
        flash('Too many requests. Please wait 5 minutes before resending.', 'warning')
        return redirect(url_for('register', check_email=1))
    if request.path == '/forgot-password':
        flash('Too many requests. Please wait before requesting another reset link.', 'warning')
        return redirect(url_for('forgot_password'))
    # Default handler for other routes
    retry_after = getattr(e, 'retry_after', 60)
    if request.is_json or request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        resp = jsonify({"success": False, "error": "Rate limit exceeded. Please try again later."})
        resp.headers['Retry-After'] = str(retry_after)
        return resp, 429
    return render_template('errors/429.html', retry_after=retry_after), 429


@app.route('/login', methods=['GET', 'POST'])
@limiter.limit("10 per minute; 50 per hour")
def login():
    if request.method == 'GET':
        return render_template('login.html')
    
    username = request.form.get('username', '').strip()
    password = request.form.get('password', '')
    email = request.form.get('email', '').strip()
    
    if not username or not password or not email:
        log_security_event('LOGIN_FAILURE', 'missing_fields', ip=request.remote_addr)
        flash('All fields are required.', 'danger')
        return redirect(url_for('login'))
    
    user = User.query.filter_by(username=username, email=email).first()
    
    if user and not user.is_verified:
        log_security_event('LOGIN_FAILURE', 'unverified_email', ip=request.remote_addr)
        flash('Please verify your email first. Check your inbox for the verification link.', 'warning')
        return redirect(url_for('login'))
    
    if user and check_password_hash(user.password, password):
        session.clear()  # Prevent session fixation
        session['user_id'] = user.id
        session.permanent = True
        user.last_login = now_ist()
        db.session.commit()
        log_security_event('LOGIN_SUCCESS', f'username={username}', user_id=user.id, ip=request.remote_addr)
        flash('Successful login!', 'success')
        return redirect(url_for('dashboard'))
    
    log_security_event('LOGIN_FAILURE', 'invalid_credentials', ip=request.remote_addr)
    flash('Invalid credentials', 'danger')
    return redirect(url_for('login'))

@app.route("/dashboard")
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('home'))

    user = User.query.get(session['user_id'])
    if not user:
        session.clear()
        return redirect(url_for('home'))

    profile = {
        'username': user.username,
        'email': user.email,
        'is_verified': bool(user.is_verified),
        'created_at': format_ist(user.created_at),
        'last_login': format_ist(user.last_login),
        'profile_picture': url_for('static', filename=user.profile_picture) if user.profile_picture else None,
        'initials': (user.username[:1] or '?').upper(),
    }

    raw_history = (
        CalculationHistory.query
        .filter_by(user_id=session['user_id'])
        .order_by(CalculationHistory.timestamp.desc())
        .limit(10)
        .all()
    )

    processed_history = []
    for entry in raw_history:
        processed_history.append({
            'calc_type': entry.calc_type.replace('_', ' '),
            'params': format_json_data(entry.params),
            'result': format_json_data(entry.result),
            'timestamp': entry.timestamp
        })

    return render_template("index.html", history=processed_history, profile=profile)


@app.route('/update-profile-picture', methods=['POST'])
@limiter.limit("5 per minute; 20 per hour")
def update_profile_picture():
    """Update the logged-in user's profile picture (AJAX, no page refresh)."""
    if 'user_id' not in session:
        return jsonify({"success": False, "error": "Authentication required"}), 401

    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({"success": False, "error": "Account not found"}), 401

    file = request.files.get('picture')
    if file is None or file.filename == '':
        return jsonify({"success": False, "error": "No image selected"}), 400

    if not allowed_profile_picture(file.filename):
        return jsonify({"success": False, "error": "Only JPG, PNG, WEBP or GIF images are allowed"}), 400

    # Size check (stream-based; MAX_CONTENT_LENGTH guards the request itself)
    file.stream.seek(0, os.SEEK_END)
    size = file.stream.tell()
    file.stream.seek(0)
    if size == 0:
        return jsonify({"success": False, "error": "The selected file is empty"}), 400
    if size > MAX_PROFILE_PICTURE_BYTES:
        return jsonify({"success": False, "error": "Image is too large — maximum size is 2 MB"}), 413

    # Content validation via magic bytes (never trust the file extension)
    fmt = detect_image_format(file)
    if not fmt:
        return jsonify({"success": False, "error": "Invalid or corrupted image file"}), 400

    upload_dir = os.path.join(app.static_folder, 'uploads', 'profiles')
    os.makedirs(upload_dir, exist_ok=True)

    # Server-generated filename: no user input ever reaches the filesystem path
    filename = f"user_{user.id}_{secrets.token_hex(8)}.{fmt}"
    try:
        file.save(os.path.join(upload_dir, filename))
    except OSError:
        log_security_event('PROFILE_PICTURE_SAVE_FAILED', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
        return jsonify({"success": False, "error": "Failed to save the image. Please try again."}), 500

    # Remove the previous picture (only within static/uploads, defensively)
    delete_profile_picture_file(user)

    user.profile_picture = f"uploads/profiles/{filename}"
    db.session.commit()

    picture_url = f"{url_for('static', filename=user.profile_picture)}?v={int(now_ist().timestamp())}"
    log_security_event('PROFILE_PICTURE_UPDATED', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
    return jsonify({"success": True, "picture_url": picture_url})


@app.route('/change-password', methods=['POST'])
@limiter.limit("5 per minute; 10 per hour")
def change_password():
    """Change the password of the logged-in user without email verification.

    Being logged in with valid credentials is the proof of identity, so the
    user only needs to confirm the CURRENT password. The logged-out email
    flow (/forgot-password) is intentionally left untouched.
    """
    if 'user_id' not in session:
        return jsonify({"success": False, "error": "Authentication required"}), 401

    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({"success": False, "error": "Account not found"}), 401

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"success": False, "error": "Invalid request"}), 400

    current_password = data.get('current_password', '')
    new_password = data.get('new_password', '')
    confirm_password = data.get('confirm_password', '')

    if not current_password or not new_password or not confirm_password:
        return jsonify({"success": False, "error": "All fields are required"}), 400

    # The current password is the identity proof for this operation
    if not check_password_hash(user.password, current_password):
        log_security_event('PASSWORD_CHANGE_FAILURE', 'invalid_current_password', user_id=user.id, ip=request.remote_addr)
        return jsonify({"success": False, "error": "Current password is incorrect"}), 400

    if new_password != confirm_password:
        return jsonify({"success": False, "error": "New passwords do not match"}), 400

    # Same complexity policy as registration
    if len(new_password) < 9 or not re.search(r'[A-Za-z]', new_password) \
            or not re.search(r'\d', new_password) or not re.search(r'[^A-Za-z0-9]', new_password):
        return jsonify({"success": False, "error": "Password must be at least 9 characters long and include a letter, a number, and a symbol"}), 400

    if check_password_hash(user.password, new_password):
        return jsonify({"success": False, "error": "New password must be different from the current password"}), 400

    user.password = generate_password_hash(new_password)
    # Invalidate any pending email-based reset links (security hardening)
    user.reset_token_hash = None
    user.reset_token = None  # Clear legacy
    user.reset_token_expires = None
    db.session.commit()

    log_security_event('PASSWORD_CHANGED', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
    return jsonify({"success": True, "message": "Password changed successfully. Use your new password next time you log in."})


@app.route('/remove-profile-picture', methods=['POST'])
@limiter.limit("5 per minute; 20 per hour")
def remove_profile_picture():
    """Remove the logged-in user's profile picture (direct action, no refresh).

    The file is deleted from disk and the avatar reverts to the default
    initials. Idempotent: succeeds even if no picture is set.
    """
    if 'user_id' not in session:
        return jsonify({"success": False, "error": "Authentication required"}), 401

    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({"success": False, "error": "Account not found"}), 401

    had_picture = bool(user.profile_picture)
    delete_profile_picture_file(user)
    user.profile_picture = None
    db.session.commit()

    if had_picture:
        log_security_event('PROFILE_PICTURE_REMOVED', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
    return jsonify({"success": True, "message": "Profile picture removed" if had_picture else "No profile picture to remove"})


def find_user_by_deletion_token(token):
    """Find the user whose pending deletion token matches (constant-time compare)."""
    if not token:
        return None
    candidates = User.query.filter(
        User.deletion_token_hash.isnot(None),
        User.deletion_token_expires > now_ist()
    ).all()

    for candidate in candidates:
        if verify_token(candidate.deletion_token_hash, token):
            return candidate
    return None


@app.route('/request-account-deletion', methods=['POST'])
@limiter.limit("3 per hour; 10 per day")
def request_account_deletion():
    """Step 1 of account deletion: verify current password, then email a confirmation link."""
    if 'user_id' not in session:
        return jsonify({"success": False, "error": "Authentication required"}), 401

    user = User.query.get(session['user_id'])
    if not user:
        return jsonify({"success": False, "error": "Account not found"}), 401

    data = request.get_json(silent=True)
    current_password = (data or {}).get('current_password', '')
    if not current_password:
        return jsonify({"success": False, "error": "Please enter your current password"}), 400

    if not check_password_hash(user.password, current_password):
        log_security_event('ACCOUNT_DELETION_REQUEST_FAILURE', 'invalid_password', user_id=user.id, ip=request.remote_addr)
        return jsonify({"success": False, "error": "Current password is incorrect"}), 400

    token = generate_verification_token()
    user.deletion_token_hash = hash_token(token)
    user.deletion_token_expires = now_ist() + timedelta(hours=1)
    db.session.commit()

    try:
        send_account_deletion_email(user, token)
    except Exception as e:
        # Email is the whole confirmation mechanism — without it the user
        # cannot proceed, so undo the token and report failure.
        user.deletion_token_hash = None
        user.deletion_token_expires = None
        db.session.commit()
        log_security_event('ACCOUNT_DELETION_EMAIL_FAILED', f'username={user.username} error={str(e)}', user_id=user.id, ip=request.remote_addr)
        return jsonify({"success": False, "error": "Could not send the verification email. Please try again later."}), 500

    log_security_event('ACCOUNT_DELETION_REQUESTED', f'username={user.username}', user_id=user.id, ip=request.remote_addr)
    return jsonify({"success": True, "message": "Verification email sent. Check your inbox to confirm account deletion — the link is valid for 1 hour."})


@app.route('/confirm-account-deletion/<token>', methods=['GET', 'POST'])
def confirm_account_deletion(token):
    """Step 2 of account deletion: confirm via the emailed link and delete everything."""
    user = find_user_by_deletion_token(token)

    if not user:
        log_security_event('ACCOUNT_DELETION_CONFIRM_FAILURE', 'invalid_token', ip=request.remote_addr)
        flash('This account deletion link is invalid or has expired.', 'danger')
        return redirect(url_for('home'))

    token_expires = user.deletion_token_expires
    if token_expires and token_expires.tzinfo is None:
        token_expires = token_expires.replace(tzinfo=IST)
    if token_expires and token_expires < now_ist():
        user.deletion_token_hash = None
        user.deletion_token_expires = None
        db.session.commit()
        flash('This account deletion link has expired. You can request a new one from your profile.', 'danger')
        return redirect(url_for('home'))

    if request.method == 'GET':
        return render_template('confirm_deletion.html', token=token, username=user.username)

    # POST — final confirmation from the dedicated page (CSRF-protected form)
    username = user.username
    user_id = user.id

    # 1. Delete calculation history first (FK constraint on user.id)
    CalculationHistory.query.filter_by(user_id=user_id).delete()

    # 2. Delete the profile picture file from disk
    delete_profile_picture_file(user)

    # 3. Delete the account row
    db.session.delete(user)
    db.session.commit()

    # 4. Invalidate the session (the deleted user may be the one logged in)
    if session.get('user_id') == user_id:
        session.clear()

    log_security_event('ACCOUNT_DELETED', f'username={username}', ip=request.remote_addr)
    flash('Your account has been permanently deleted. We are sorry to see you go!', 'info')
    return redirect(url_for('home'))

@app.route('/logout')
def logout():
    user_id = session.get('user_id')
    session.clear()
    log_security_event('LOGOUT', '', user_id=user_id, ip=request.remote_addr)
    flash('Logout successfully!', 'success')
    return redirect(url_for('home'))

@app.route("/calculate", methods=["POST"])
@csrf.exempt  # API endpoint - CSRF handled via custom header
@limiter.limit("30 per minute; 100 per hour")
def calculate():
    # Verify authentication
    if 'user_id' not in session:
        return jsonify({"success": False, "error": "Authentication required"}), 401
    
    # Validate JSON
    if not request.is_json:
        return jsonify({"success": False, "error": "Content-Type must be application/json"}), 400
    
    data = request.get_json()
    if data is None:
        return jsonify({"success": False, "error": "Invalid JSON"}), 400
    
    calc_type = data.get("type")
    params = data.get("params", {})
    
    if not calc_type:
        return jsonify({"success": False, "error": "Missing calculator type"}), 400
    
    # Validate calculator type
    valid_types = [
        "SIP", "LUMPSUM", "SWP", "STEP_UP_SIP", "PPF", "EPF", "NSC",
        "FD_SIMPLE", "RD", "NPS", "RETIREMENT_CALCULATOR", "GRATUITY",
        "SALARY_CALCULATOR", "EMI", "HOME_LOAN_EMI", "CAR_LOAN_EMI",
        "GOLD_LOAN_EMI", "EDUCATION_LOAN_EMI", "FLAT_VS_REDUCING",
        "SIMPLE_INTEREST", "COMPOUND_INTEREST", "GST", "CAGR",
        "INFLATION", "BROKERAGE_CALCULATOR", "CRYPTO_CONVERTER",
        "USD_INR_CONVERTER"
    ]
    
    if calc_type not in valid_types:
        return jsonify({"success": False, "error": f"Invalid calculator type"}), 400
    
    # Validate input parameters
    valid, error = validate_calculator_input(calc_type, params)
    if not valid:
        return jsonify({"success": False, "error": error}), 400
    
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
            "BROKERAGE_CALCULATOR": lambda p: BROKERAGE_CALCULATOR(p.get("Segment", "delivery"), safe_int(p.get("Quantity")), safe_float(p.get("Buy price")), safe_float(p.get("Sell price")), safe_float(p.get("Brokerage"))),
            "CRYPTO_CONVERTER": lambda p: CRYPTO_CONVERTER(p.get("From Currency"), p.get("To Currency"), safe_float(p.get("Amount")), get_cached_crypto_prices()[0]),
            "USD_INR_CONVERTER": lambda p: USD_INR_CONVERTER(p.get("From Currency"), p.get("To Currency"), safe_float(p.get("Amount")), get_cached_usd_inr_rate())
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
            
            # Store Result in History (only for authenticated users)
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

    except ValueError as e:
        return jsonify({"success": False, "error": str(e)}), 400
    except Exception as e:
        log_security_event('CALCULATION_ERROR', f'type={calc_type} error={str(e)}', user_id=session.get('user_id'), ip=request.remote_addr)
        return jsonify({"success": False, "error": "Calculation failed"}), 500

if __name__ == "__main__":
    debug_mode = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
    app.run(debug=debug_mode)