# OmNaad — GitHub Copilot Instructions

## Project Context
OmNaad is a Bank of India omni-channel customer communication platform.
It uses AI to unify customer conversations across 6 channels: call centre,
mobile app, WhatsApp, email, branch, and website chatbot.

## Tech Stack (Demo)
- Frontend: Next.js 14, TypeScript, TailwindCSS, Recharts, Framer Motion
- Backend: FastAPI (Python), Pydantic, Mock JSON data
- Deployment: Vercel (serverless functions for backend)

## Tech Stack (Production — label these clearly in comments)
- Event Streaming: Apache Kafka
- Database: PostgreSQL + Redis + Elasticsearch + Neo4j
- AI Models: BERT (intent), RoBERTa (sentiment), LLaMA 3 (draft/summary)
- Orchestration: Apache Airflow
- Infrastructure: Docker + Kubernetes

## Coding Rules
- Always add "// DEMO: uses mock data | PRODUCTION: uses [real tech]" comments
- Keep mock data in /mock/ folder, never hardcode in components
- Every AI feature must show a "Powered by LLaMA 3 / BERT" label in UI
- Use TypeScript strict mode always
- All API responses must match production schema even if data is mocked
