# OmNaad — Omni-Channel AI Communication Platform

<div align="center">

![OmNaad Banner](https://img.shields.io/badge/OmNaad-Bank_of_India-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBhdGggZD0iTTggMTRzMS41IDIgNCAyczQtMiA0LTIiLz48bGluZSB4MT0iOSIgeTE9IjkiIHgyPSI5LjAxIiB5Mj0iOSIvPjxsaW5lIHgxPSIxNSIgeTE9IjkiIHgyPSIxNS4wMSIgeTI9IjkiLz48L3N2Zz4=)

**🏆 PSBs Hackathon IDEA 2.0 — Bank of India**

🌐 **Live Demo:** [https://omnaadaiplatform.vercel.app/](https://omnaadaiplatform.vercel.app/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shahnoor-exe/omnaad)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

*One Voice. Every Channel. No Customer Left Behind.*

</div>

---

## 🎯 Problem Statement

Public-sector banks handle **50 million+** daily interactions across voice, SMS, email, WhatsApp, UPI, branch walk-ins — yet each channel runs on siloed software. Customers repeat themselves, agents lack context, and compliance teams chase violations after the fact.

**OmNaad** unifies all channels into a single AI-powered console that understands sentiment, drafts responses in 12+ Indian languages, blocks compliance violations in real time, and predicts churn before it happens.

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        CUSTOMER LAYER                        │
│  📞 Voice  💬 WhatsApp  📧 Email  📱 UPI  🏦 Branch  💳 SMS │
└──────────────┬───────────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────────┐
│                    OMNAAD AI CORE ENGINE                     │
│  ┌──────────┐ ┌───────────┐ ┌────────────┐ ┌─────────────┐ │
│  │Sentiment │ │ Multilingual│ │ Compliance │ │   Churn     │ │
│  │ Analysis │ │  NLP + LLM │ │  Firewall  │ │ Prediction  │ │
│  └──────────┘ └───────────┘ └────────────┘ └─────────────┘ │
│  ┌──────────┐ ┌───────────┐ ┌────────────┐ ┌─────────────┐ │
│  │ Thread   │ │  Auto     │ │  Anomaly   │ │  Smart      │ │
│  │ Merger   │ │  Draft    │ │  Detection │ │  Routing    │ │
│  └──────────┘ └───────────┘ └────────────┘ └─────────────┘ │
└──────────────┬───────────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────────┐
│                     AGENT & SUPERVISOR UI                    │
│  🖥️ Agent Console  │  📊 Supervisor Dashboard  │  🚨 Alerts │
└──────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

| Feature | Demo | Production |
|---------|------|------------|
| **Sentiment Analysis** | Keyword-based scoring | Azure AI / IndicBERT fine-tuned |
| **Auto-Draft Responses** | Template matching (12+ languages) | GPT-4 / IndicTrans2 |
| **Compliance Firewall** | Regex pattern matching | TRAI DNC + DPDP + RBI rule engine |
| **Churn Prediction** | Static risk scores | XGBoost / Random Forest ML |
| **Anomaly Detection** | Threshold-based spikes | Isolation Forest real-time |
| **Channel Unification** | Mock 6-channel timeline | Live API integrations |

---

## 🛠️ Tech Stack

### Demo Prototype (This Repository)

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, TailwindCSS, Framer Motion |
| Charts | Recharts |
| Backend | FastAPI (Python 3.11) |
| Deployment | Vercel (Serverless) |
| CI/CD | GitHub Actions |

### Production Roadmap

| Layer | Technology |
|-------|-----------|
| AI/ML | Azure Cognitive Services, IndicBERT, GPT-4, XGBoost |
| Backend | FastAPI + Celery + Redis |
| Database | PostgreSQL + TimescaleDB |
| Streaming | Apache Kafka |
| Infrastructure | Azure AKS + Terraform |

---

## 🚀 Quick Start

### 🌐 Live Deployment

**Vercel:** [https://omnaadaiplatform.vercel.app/](https://omnaadaiplatform.vercel.app/)

### Prerequisites
- Node.js 20+
- Python 3.11+
- npm or yarn

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn api.index:app --reload
# → http://localhost:8000
```

---

## 📂 Project Structure

```
omnaad/
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout (dark theme)
│   │   ├── globals.css           # Custom animations & styles
│   │   └── dashboard/
│   │       ├── page.tsx          # Agent Console (5 demo scenarios)
│   │       └── supervisor/
│   │           └── page.tsx      # Supervisor Dashboard
│   ├── components/
│   │   ├── SentimentDial.tsx     # Animated sentiment gauge
│   │   ├── ComplianceBadge.tsx   # 3-stage compliance check
│   │   ├── AutoDraftBox.tsx      # AI draft with typing effect
│   │   ├── ChurnRiskCard.tsx     # Risk score visualization
│   │   ├── ConversationThread.tsx# Omni-channel timeline
│   │   └── AnomalyAlert.tsx      # Regional anomaly alert
│   └── lib/
│       ├── mockData.ts           # All synthetic demo data
│       └── demoScenarios.ts      # 5 scripted demo flows
├── backend/
│   ├── api/
│   │   ├── index.py              # FastAPI endpoints
│   │   └── mock/
│   │       ├── drafts.json       # Multilingual draft templates
│   │       └── customers.json    # Customer data
│   └── requirements.txt
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                # CI pipeline
│   │   └── deploy-prod.yml       # Vercel deployment
│   └── copilot-instructions.md
├── vercel.json                   # Monorepo deployment config
└── README.md
```

---

## 🎬 Demo Scenarios

1. **😡 Angry Customer De-escalation** — Watch sentiment shift from red to green as AI drafts an empathetic response
2. **🚫 Compliance Block** — AI catches a TRAI DNC violation and blocks the message in real-time
3. **📢 Proactive Outreach** — AI detects churn risk and generates a retention offer
4. **🌐 Multilingual Magic** — Auto-draft in Hindi, Tamil, Punjabi, Marathi, Telugu
5. **🚨 Anomaly Alert** — Regional SMS complaint spike triggers supervisor notification

---

## 👥 Team

**Team OmNaad** — PSBs Hackathon IDEA 2.0, Bank of India

---

## 📄 License

This project is built for the PSBs Hackathon IDEA 2.0 competition. All rights reserved.

---

<div align="center">

**Built with ❤️ for Indian Banking Innovation**

*OmNaad — One Voice. Every Channel. No Customer Left Behind.*

</div>
