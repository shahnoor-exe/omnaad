# OmNaad Backend — FastAPI Mock API
# DEMO: Returns pre-tagged mock NLP results from JSON
# PRODUCTION: BERT + RoBERTa + LLaMA 3 + Apache Kafka + PostgreSQL

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import random
import asyncio
from datetime import datetime

app = FastAPI(
    title="OmNaad API",
    description="Bank of India Omni-Channel Communication Platform — Demo API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load mock data
MOCK_DIR = os.path.join(os.path.dirname(__file__), "mock")


def load_json(filename):
    filepath = os.path.join(MOCK_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


DRAFTS = load_json("drafts.json")
CUSTOMERS = load_json("customers.json")
BOT_RESPONSES = load_json("bot_responses.json")

# --- Keyword-based mock NLP (simulates BERT in demo) ---
INTENT_KEYWORDS = {
    "complaint": ["bounce", "problem", "issue", "complaint", "wrong", "shikayat", "galat"],
    "closure_request": ["close", "band", "leave", "transfer", "chhod", "hatao"],
    "fraud_alert": ["fraud", "unauthorized", "stolen", "dhokha", "chori"],
    "loan_inquiry": ["loan", "emi", "interest", "rate", "karz", "rin"],
    "escalation": ["escalate", "manager", "senior", "supervisor", "3rd time"],
}

SENTIMENT_MAP = {
    "angry": ["gussa", "frustrated", "angry", "3rd time", "koi nahi sun", "fed up"],
    "stressed": ["worried", "tension", "problem", "help", "please", "mushkil"],
    "urgent": ["emergency", "immediately", "abhi", "turant", "asap", "urgent"],
    "positive": ["thank", "shukriya", "dhanyavaad", "good", "great", "happy"],
}


@app.get("/")
async def root():
    return {
        "service": "OmNaad API",
        "version": "1.0.0 (Demo)",
        "status": "running",
        "demo_note": "DEMO: FastAPI mock endpoints | PRODUCTION: Kafka + PostgreSQL + BERT + LLaMA 3",
    }


@app.get("/api/health")
async def health():
    return {"status": "healthy", "mode": "demo"}


@app.post("/api/analyze")
async def analyze_message(payload: dict):
    message = payload.get("message", "").lower()
    customer_id = payload.get("customer_id", "")

    intent = "query"
    for intent_class, keywords in INTENT_KEYWORDS.items():
        if any(k in message for k in keywords):
            intent = intent_class
            break

    sentiment = "neutral"
    for sentiment_class, keywords in SENTIMENT_MAP.items():
        if any(k in message for k in keywords):
            sentiment = sentiment_class
            break

    escalation_triggered = sentiment in ["angry", "urgent"] and intent in [
        "closure_request",
        "complaint",
    ]

    return {
        "intent": intent,
        "intent_confidence": round(random.uniform(0.88, 0.97), 2),
        "sentiment": sentiment,
        "sentiment_confidence": round(random.uniform(0.85, 0.96), 2),
        "escalation_triggered": escalation_triggered,
        "latency_ms": random.randint(140, 195),
        "demo_note": "DEMO: keyword-based | PRODUCTION: BERT fine-tuned, 8-class, <200ms",
        "production_model": "bert-base-multilingual-cased + IndicBERT tokenizer",
    }


@app.post("/api/draft")
async def generate_draft(payload: dict):
    customer_id = payload.get("customer_id", "")
    draft_data = DRAFTS.get(customer_id, DRAFTS.get("DEFAULT", {}))

    return {
        "draft_text": draft_data.get("draft", ""),
        "language": draft_data.get("language", "English"),
        "generated_in_seconds": draft_data.get("generatedIn", "1.5 seconds"),
        "context_used": draft_data.get("contextUsed", []),
        "summary": draft_data.get("summary", ""),
        "demo_note": "DEMO: pre-written draft | PRODUCTION: LLaMA 3 8B via Ollama",
        "production_stack": {
            "llm": "LLaMA 3 8B (4-bit quantized via llama.cpp)",
            "memory": "Neo4j graph summary injected in prompt",
            "languages": [
                "Hindi",
                "Punjabi",
                "Marathi",
                "Tamil",
                "Telugu",
                "Bengali",
                "Gujarati",
                "Kannada",
            ],
            "hosting": "Self-hosted — data never leaves BOI servers (RBI compliant)",
        },
    }


@app.post("/api/compliance/check")
async def check_compliance(payload: dict):
    customer_id = payload.get("customer_id", "")
    message = payload.get("message", "")
    channel = payload.get("channel", "sms")

    await asyncio.sleep(0.8)

    forbidden_phrases = ["guaranteed returns", "100% safe", "no risk"]
    content_flag = any(p in message.lower() for p in forbidden_phrases)

    return {
        "checks": [
            {
                "name": "TRAI DNC Registry Check",
                "status": "PASS",
                "detail": "Number not found on DNC registry",
                "latency_ms": 245,
                "production_api": "TRAI DLT Platform API",
            },
            {
                "name": "DPDP Act 2023 Consent Verification",
                "status": "PASS",
                "detail": f"{channel.title()} consent valid — granted Jan 15, 2026",
                "latency_ms": 180,
                "production_store": "PostgreSQL append-only consent table (7-year log)",
            },
            {
                "name": "RBI Content Compliance Scan",
                "status": "FAIL" if content_flag else "PASS",
                "detail": (
                    "Flagged: 'guaranteed returns' violates RBI Circular"
                    if content_flag
                    else "All 30 RBI rules checked — no violations"
                ),
                "latency_ms": 320,
                "production_model": "LLaMA 3 fine-tuned on 30 RBI communication rules",
            },
        ],
        "overall": "RED" if content_flag else "GREEN",
        "audit_log_id": f"LOG-{customer_id}-{channel}-{abs(hash(message)) % 100000}",
        "demo_note": "DEMO: rule-based simulation | PRODUCTION: real API calls + LLM scanner",
    }


@app.get("/api/customers")
async def get_customers():
    return {"customers": CUSTOMERS, "total": len(CUSTOMERS) if isinstance(CUSTOMERS, list) else 0}


@app.get("/api/dashboard/metrics")
async def get_metrics():
    return {
        "totalActiveConversations": 1247,
        "avgResponseTime": "4.2 min",
        "sentimentBreakdown": {
            "positive": 34,
            "neutral": 38,
            "stressed": 15,
            "angry": 9,
            "urgent": 4,
        },
        "channelDistribution": {
            "whatsapp": 31,
            "ivr_call": 24,
            "mobile_app": 19,
            "email": 12,
            "branch_visit": 8,
            "chatbot": 6,
        },
        "demo_note": "DEMO: static metrics | PRODUCTION: real-time from Kafka + Elasticsearch",
    }


# =========================================================
# CUSTOMER-SIDE ROUTES
# =========================================================

@app.post("/api/chat/message")
async def chat_message(payload: dict):
    """Process customer chat message — demo uses keyword match, production uses LLaMA 3."""
    message = payload.get("message", "").lower()

    # Intent detection (keyword-based demo)
    intent = "query"
    for intent_class, keywords in INTENT_KEYWORDS.items():
        if any(k in message for k in keywords):
            intent = intent_class
            break

    # Sentiment detection
    sentiment = "neutral"
    for sentiment_class, keywords in SENTIMENT_MAP.items():
        if any(k in message for k in keywords):
            sentiment = sentiment_class
            break

    # Match bot response from bot_responses.json
    response_text = "Thank you for your message. Let me look into that for you."
    if isinstance(BOT_RESPONSES, dict):
        scenarios = BOT_RESPONSES.get("scenarios", [])
        for scenario in scenarios:
            triggers = scenario.get("triggers", [])
            if any(t in message for t in triggers):
                response_text = scenario.get("response", response_text)
                break

    return {
        "reply": response_text,
        "intent": intent,
        "intent_confidence": round(random.uniform(0.88, 0.97), 2),
        "sentiment": sentiment,
        "sentiment_confidence": round(random.uniform(0.85, 0.96), 2),
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "demo_note": "DEMO: keyword match + JSON responses | PRODUCTION: LLaMA 3 8B + BERT",
    }


@app.post("/api/chat/handoff")
async def chat_handoff(payload: dict):
    """Initiate handoff from bot to live agent."""
    customer_id = payload.get("customer_id", "UNKNOWN")
    await asyncio.sleep(1.5)
    return {
        "status": "connected",
        "agent_id": "A045",
        "agent_name": "Priya Sharma",
        "queue_position": 0,
        "context_transferred": True,
        "kafka_event": f"HANDOFF_{customer_id}_{datetime.now().strftime('%H%M%S')}",
        "demo_note": "DEMO: instant mock | PRODUCTION: Apache Kafka agent-routing + Neo4j context graph",
    }


@app.get("/api/portal/thread")
async def get_portal_thread(customer_id: str = "C001"):
    """Get complaint threads for a customer."""
    return {
        "customer_id": customer_id,
        "tickets": [
            {
                "id": "TKT-2024-001", "subject": "Failed UPI Transaction",
                "category": "Transaction Dispute", "status": "in_progress",
                "date": "15 Jan 2025", "channel": "Mobile App",
                "timeline": [
                    {"date": "15 Jan 2025, 10:00 AM", "channel": "Mobile App", "status": "Opened", "description": "UPI transaction of ₹5,000 failed but amount debited."},
                    {"date": "15 Jan 2025, 10:05 AM", "channel": "WhatsApp", "status": "Update", "description": "OmNaad AI confirmed failure. Reversal initiated."},
                    {"date": "15 Jan 2025, 02:30 PM", "channel": "Email", "status": "In Progress", "description": "Confirmation email sent. Reversal in 3-5 days."},
                ],
            },
            {
                "id": "TKT-2024-002", "subject": "Debit Card Not Working Abroad",
                "category": "Card Problem", "status": "resolved",
                "date": "10 Jan 2025", "channel": "IVR",
                "timeline": [
                    {"date": "10 Jan 2025, 08:00 AM", "channel": "IVR", "status": "Opened", "description": "Debit card declined at POS in Singapore."},
                    {"date": "10 Jan 2025, 08:10 AM", "channel": "WhatsApp", "status": "Resolved", "description": "International usage enabled. Card working."},
                ],
            },
        ],
        "demo_note": "DEMO: static mock tickets | PRODUCTION: PostgreSQL + Kafka real-time sync",
    }


@app.post("/api/portal/complaint")
async def submit_complaint(payload: dict):
    """File a new complaint."""
    ticket_id = f"BOI-{abs(hash(str(payload))) % 999999:06d}"
    return {
        "ticket_id": ticket_id,
        "status": "open",
        "category": payload.get("category", "General"),
        "subject": payload.get("subject", ""),
        "channel": payload.get("channel", "chat"),
        "estimated_resolution": "24-48 hours",
        "kafka_event": f"NEW_COMPLAINT_{ticket_id}",
        "demo_note": "DEMO: mock ticket | PRODUCTION: PostgreSQL + Kafka + auto-assignment engine",
    }


@app.get("/api/preferences/get")
async def get_preferences(customer_id: str = "C001"):
    """Get customer communication preferences."""
    return {
        "customer_id": customer_id,
        "language": "en",
        "channels": ["whatsapp", "email", "push"],
        "consents": {
            "transactional": True,
            "marketing": True,
            "promotional": False,
            "research": False,
            "thirdParty": False,
        },
        "dnd": {"enabled": True, "start": "22:00", "end": "07:00"},
        "last_updated": "2025-01-15T10:30:00Z",
        "demo_note": "DEMO: static mock | PRODUCTION: DPDP Consent DB + TRAI DNC API",
    }


@app.post("/api/preferences/update")
async def update_preferences(payload: dict):
    """Update customer preferences."""
    return {
        "status": "updated",
        "customer_id": payload.get("customer_id", "C001"),
        "changes_applied": list(payload.keys()),
        "kafka_event": f"PREF_UPDATE_{payload.get('customer_id', 'C001')}",
        "consent_audit_id": f"AUDIT-{abs(hash(str(payload))) % 999999:06d}",
        "demo_note": "DEMO: mock response | PRODUCTION: DPDP Consent DB write + Kafka broadcast",
    }


@app.post("/api/preferences/withdraw-consent")
async def withdraw_consent(payload: dict):
    """DPDP Act § 6(6) — Withdraw all non-essential consent."""
    customer_id = payload.get("customer_id", "C001")
    return {
        "status": "withdrawn",
        "customer_id": customer_id,
        "retained": ["transactional"],
        "withdrawn": ["marketing", "promotional", "research", "thirdParty"],
        "effective_within": "72 hours",
        "dpdp_reference": "Section 6(6) — Right to Withdraw Consent",
        "audit_trail_id": f"WITHDRAW-{customer_id}-{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "demo_note": "DEMO: mock withdrawal | PRODUCTION: DPDP Consent DB + TRAI DNC update + Kafka event",
    }


# Vercel serverless handler
handler = app
