// Pre-scripted demo flows for the 5 demo scenarios
export interface DemoScenario {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  customerId: string;
  steps: DemoStep[];
}

export interface DemoStep {
  label: string;
  description: string;
  highlight: string;
  delay: number;
}

export const demoScenarios: DemoScenario[] = [
  {
    id: "scenario-1",
    title: "The Angry Customer",
    subtitle: "EMI bounce — 3 channels, 0 resolution",
    icon: "😠",
    color: "red",
    customerId: "C001",
    steps: [
      { label: "Open Thread", description: "View 3-channel conversation history (IVR → Branch → WhatsApp)", highlight: "thread", delay: 500 },
      { label: "Sentiment Shift", description: "Watch Sentiment Dial: Neutral → Stressed → ANGRY (red)", highlight: "sentiment", delay: 1200 },
      { label: "Escalation Alert", description: "🚨 Level-2 RM Alert Triggered — auto escalation", highlight: "escalation", delay: 800 },
      { label: "AI Summary", description: "Customer complained 3 times across 3 channels in 3 days", highlight: "summary", delay: 1000 },
      { label: "Auto Draft", description: "Hindi draft generated in 2.3 seconds by LLaMA 3", highlight: "draft", delay: 2300 },
      { label: "Compliance Gate", description: "All 3 checks PASS — GREEN — safe to send", highlight: "compliance", delay: 1800 },
      { label: "Send & Resolve", description: "Message dispatched via WhatsApp — sentiment → Neutral", highlight: "resolve", delay: 600 }
    ]
  },
  {
    id: "scenario-2",
    title: "Compliance Block",
    subtitle: "RBI content violation caught & corrected",
    icon: "🛡️",
    color: "amber",
    customerId: "C002",
    steps: [
      { label: "Agent Types", description: "Agent writes: 'Guaranteed 9% returns on Star FD'", highlight: "input", delay: 500 },
      { label: "Compliance Scan", description: "Running 3-stage compliance check...", highlight: "scan", delay: 1800 },
      { label: "RED FLAG", description: "RBI Content Check: RED — 'guaranteed returns' flagged", highlight: "flag", delay: 800 },
      { label: "Message Blocked", description: "Message BLOCKED — cannot send to customer", highlight: "block", delay: 500 },
      { label: "Suggestion", description: "Fix: Replace with 'projected returns of up to 9%'", highlight: "suggest", delay: 1000 },
      { label: "Re-check", description: "Agent corrects → Re-run → All GREEN → Send", highlight: "recheck", delay: 1500 }
    ]
  },
  {
    id: "scenario-3",
    title: "Proactive Outreach",
    subtitle: "AI-triggered retention for inactive customer",
    icon: "🎯",
    color: "emerald",
    customerId: "C003",
    steps: [
      { label: "Risk Detected", description: "Customer Amitabh — 52 days inactive, Churn Risk 45%", highlight: "risk", delay: 500 },
      { label: "Auto Trigger", description: "OmNaad triggers proactive check-in", highlight: "trigger", delay: 800 },
      { label: "Draft Generated", description: "Bengali language draft appears automatically", highlight: "draft", delay: 1500 },
      { label: "Channel Selected", description: "Email — preference score 0.91 (optimal channel)", highlight: "channel", delay: 600 },
      { label: "Time Optimized", description: "Send time: Tonight 7:30 PM (best engagement window)", highlight: "time", delay: 500 },
      { label: "Dispatched", description: "Compliance cleared → Scheduled for dispatch", highlight: "dispatch", delay: 1000 }
    ]
  },
  {
    id: "scenario-4",
    title: "Multilingual Magic",
    subtitle: "5 languages, 5 customers, instant drafts",
    icon: "🌐",
    color: "violet",
    customerId: "C001",
    steps: [
      { label: "Hindi", description: "Draft for Rajesh Kumar — EMI resolution in Hindi", highlight: "hindi", delay: 800 },
      { label: "Tamil", description: "Draft for Priya — Loan comparison in Tamil", highlight: "tamil", delay: 800 },
      { label: "Punjabi", description: "Draft for Gurpreet — EMI moratorium in Punjabi", highlight: "punjabi", delay: 800 },
      { label: "Marathi", description: "Draft for Sneha — Product offer in Marathi", highlight: "marathi", delay: 800 },
      { label: "Telugu", description: "Draft for Harish — Fraud response in Telugu", highlight: "telugu", delay: 800 }
    ]
  },
  {
    id: "scenario-5",
    title: "Anomaly Alert",
    subtitle: "Supervisor detects regional fraud spike",
    icon: "📊",
    color: "rose",
    customerId: "C007",
    steps: [
      { label: "Dashboard View", description: "Supervisor opens regional heatmap", highlight: "heatmap", delay: 500 },
      { label: "Anomaly Detected", description: "Ludhiana branch lights up RED", highlight: "anomaly", delay: 800 },
      { label: "Alert Details", description: "⚠️ 340% spike in fraud_alert intent — 2 hours", highlight: "alert", delay: 600 },
      { label: "Affected Customers", description: "14 affected customers identified and listed", highlight: "customers", delay: 800 },
      { label: "Bulk Outreach", description: "14 personalized SMS triggered in 1 click", highlight: "outreach", delay: 1000 }
    ]
  }
];
