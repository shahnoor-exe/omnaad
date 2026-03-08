// DEMO: All data is synthetic | PRODUCTION: Real-time from PostgreSQL + Redis

export interface Customer {
  id: string;
  name: string;
  language: string;
  account: string;
  branch: string;
  churnRisk: number;
  churnReason: string;
  lastContact: string;
  preferredChannel: string;
  sentiment: string;
  intent: string;
  threads: string[];
}

export interface ThreadEvent {
  channel: string;
  timestamp: string;
  message: string;
  intent: string;
  sentiment: string;
  agentId: string | null;
  resolved: boolean;
}

export interface Thread {
  id: string;
  customerId: string;
  events: ThreadEvent[];
}

export interface Draft {
  language: string;
  draft: string;
  poweredBy: string;
  generatedIn: string;
  contextUsed: string[];
  summary?: string;
}

export interface ComplianceCheck {
  name: string;
  status: string;
  detail: string;
  latency_ms: number;
  production_api?: string;
  production_store?: string;
  production_model?: string;
}

export interface ComplianceResult {
  dncStatus: string;
  consentStatus: string;
  rbiContentStatus: string;
  overallStatus: string;
  checkedAt: string;
  poweredBy: string;
}

export const demoCustomers: Customer[] = [
  {
    id: "C001",
    name: "Rajesh Kumar Sharma",
    language: "Hindi",
    account: "Savings — Star Mitra",
    branch: "Ludhiana Main Branch",
    churnRisk: 0.82,
    churnReason: "Financially Stressed + 3 complaints in 30 days",
    lastContact: "3 days ago (IVR Call)",
    preferredChannel: "SMS",
    sentiment: "angry",
    intent: "complaint",
    threads: ["T001", "T002", "T003"]
  },
  {
    id: "C002",
    name: "Priya Venkataraman",
    language: "Tamil",
    account: "Star Home Loan",
    branch: "Chennai Anna Nagar",
    churnRisk: 0.61,
    churnReason: "Competitor Offer Detected",
    lastContact: "12 days ago (Mobile App)",
    preferredChannel: "WhatsApp",
    sentiment: "neutral",
    intent: "loan_inquiry",
    threads: ["T004", "T005"]
  },
  {
    id: "C003",
    name: "Amitabh Banerjee",
    language: "Bengali",
    account: "Star FD Premium",
    branch: "Kolkata Park Street",
    churnRisk: 0.45,
    churnReason: "Low engagement — no login in 52 days",
    lastContact: "52 days ago (Email)",
    preferredChannel: "Email",
    sentiment: "neutral",
    intent: "query",
    threads: ["T006"]
  },
  {
    id: "C004",
    name: "Gurpreet Singh Dhillon",
    language: "Punjabi",
    account: "Star Business Loan",
    branch: "Amritsar GT Road",
    churnRisk: 0.73,
    churnReason: "Missed 2 EMIs + negative sentiment trend",
    lastContact: "1 day ago (WhatsApp)",
    preferredChannel: "WhatsApp",
    sentiment: "stressed",
    intent: "complaint",
    threads: ["T007", "T008"]
  },
  {
    id: "C005",
    name: "Sneha Patil",
    language: "Marathi",
    account: "Star Savings Plus",
    branch: "Pune FC Road",
    churnRisk: 0.38,
    churnReason: "Product inquiry — comparing competitors",
    lastContact: "5 days ago (Branch Visit)",
    preferredChannel: "Mobile App",
    sentiment: "positive",
    intent: "loan_inquiry",
    threads: ["T009"]
  },
  {
    id: "C006",
    name: "Kavitha Nair",
    language: "Malayalam",
    account: "Star Gold Savings",
    branch: "Kochi MG Road",
    churnRisk: 0.29,
    churnReason: "Routine check — high satisfaction",
    lastContact: "8 days ago (Mobile App)",
    preferredChannel: "Mobile App",
    sentiment: "positive",
    intent: "query",
    threads: ["T010"]
  },
  {
    id: "C007",
    name: "Harish Reddy",
    language: "Telugu",
    account: "Star Vehicle Loan",
    branch: "Hyderabad Banjara Hills",
    churnRisk: 0.67,
    churnReason: "Fraud alert — unauthorized transaction",
    lastContact: "Today (IVR Call)",
    preferredChannel: "SMS",
    sentiment: "urgent",
    intent: "fraud_alert",
    threads: ["T011", "T012"]
  },
  {
    id: "C008",
    name: "Meena Kumari Joshi",
    language: "Hindi",
    account: "Star Jan Dhan",
    branch: "Varanasi Cantonment",
    churnRisk: 0.15,
    churnReason: "Loyal customer — 12 years",
    lastContact: "20 days ago (Branch Visit)",
    preferredChannel: "Branch",
    sentiment: "positive",
    intent: "query",
    threads: ["T013"]
  },
  {
    id: "C009",
    name: "Arjun Desai",
    language: "Gujarati",
    account: "Star NRI Advantage",
    branch: "Ahmedabad SG Highway",
    churnRisk: 0.54,
    churnReason: "Service delay complaint + competitor offer",
    lastContact: "2 days ago (Email)",
    preferredChannel: "Email",
    sentiment: "stressed",
    intent: "complaint",
    threads: ["T014", "T015"]
  },
  {
    id: "C010",
    name: "Lakshmi Sundaram",
    language: "Tamil",
    account: "Star Women's Savings",
    branch: "Madurai Main Branch",
    churnRisk: 0.42,
    churnReason: "Balance declining — possible attrition",
    lastContact: "15 days ago (SMS)",
    preferredChannel: "SMS",
    sentiment: "neutral",
    intent: "query",
    threads: ["T016"]
  },
  {
    id: "C011",
    name: "Vikram Malhotra",
    language: "Hindi",
    account: "Star Salary Account",
    branch: "Delhi Connaught Place",
    churnRisk: 0.88,
    churnReason: "Salary credit stopped + closure inquiry",
    lastContact: "Today (Chatbot)",
    preferredChannel: "WhatsApp",
    sentiment: "angry",
    intent: "closure_request",
    threads: ["T017", "T018"]
  },
  {
    id: "C012",
    name: "Fatima Sheikh",
    language: "Urdu",
    account: "Star Home Loan",
    branch: "Mumbai CST Branch",
    churnRisk: 0.35,
    churnReason: "Regular customer — EMI restructure inquiry",
    lastContact: "7 days ago (IVR Call)",
    preferredChannel: "WhatsApp",
    sentiment: "neutral",
    intent: "loan_inquiry",
    threads: ["T019"]
  },
  {
    id: "C013",
    name: "Ravi Shankar Iyer",
    language: "Kannada",
    account: "Star Business Current",
    branch: "Bengaluru MG Road",
    churnRisk: 0.71,
    churnReason: "High-value customer — 3 unresolved tickets",
    lastContact: "1 day ago (Email)",
    preferredChannel: "Email",
    sentiment: "stressed",
    intent: "complaint",
    threads: ["T020", "T021", "T022"]
  },
  {
    id: "C014",
    name: "Pooja Tiwari",
    language: "Hindi",
    account: "Star Education Loan",
    branch: "Lucknow Hazratganj",
    churnRisk: 0.56,
    churnReason: "EMI moratorium request — COVID impact",
    lastContact: "4 days ago (WhatsApp)",
    preferredChannel: "WhatsApp",
    sentiment: "stressed",
    intent: "loan_inquiry",
    threads: ["T023"]
  },
  {
    id: "C015",
    name: "Balwinder Kaur",
    language: "Punjabi",
    account: "Star Senior Citizen FD",
    branch: "Jalandhar Model Town",
    churnRisk: 0.22,
    churnReason: "Loyal senior — 18 years with BOI",
    lastContact: "30 days ago (Branch Visit)",
    preferredChannel: "Branch",
    sentiment: "positive",
    intent: "query",
    threads: ["T024"]
  },
  {
    id: "C016", name: "Deepak Choudhury", language: "Bengali", account: "Star Current Account",
    branch: "Siliguri Hill Cart Road", churnRisk: 0.63, churnReason: "Competitor cross-sell detected",
    lastContact: "3 days ago (Email)", preferredChannel: "Email", sentiment: "neutral", intent: "query", threads: []
  },
  {
    id: "C017", name: "Ananya Mishra", language: "Hindi", account: "Star Women's Savings",
    branch: "Bhopal MP Nagar", churnRisk: 0.47, churnReason: "Low balance alert — ₹500 remaining",
    lastContact: "6 days ago (SMS)", preferredChannel: "SMS", sentiment: "stressed", intent: "query", threads: []
  },
  {
    id: "C018", name: "Suresh Menon", language: "Malayalam", account: "Star NRI Advantage",
    branch: "Trivandrum Statue", churnRisk: 0.31, churnReason: "Routine remittance inquiry",
    lastContact: "10 days ago (Mobile App)", preferredChannel: "Mobile App", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C019", name: "Tariq Ahmed", language: "Urdu", account: "Star Business Loan",
    branch: "Srinagar Lal Chowk", churnRisk: 0.79, churnReason: "Missed EMI + negative review on social media",
    lastContact: "1 day ago (WhatsApp)", preferredChannel: "WhatsApp", sentiment: "angry", intent: "complaint", threads: []
  },
  {
    id: "C020", name: "Jyoti Rao", language: "Kannada", account: "Star Gold Savings",
    branch: "Mysuru Sayyaji Rao Road", churnRisk: 0.25, churnReason: "Satisfied customer — auto-sweep active",
    lastContact: "14 days ago (Mobile App)", preferredChannel: "Mobile App", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C021", name: "Ramesh Yadav", language: "Hindi", account: "Star Jan Dhan",
    branch: "Patna Gandhi Maidan", churnRisk: 0.18, churnReason: "Govt subsidy recipient — steady account",
    lastContact: "25 days ago (Branch Visit)", preferredChannel: "Branch", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C022", name: "Shalini Nair", language: "Malayalam", account: "Star Home Loan",
    branch: "Kozhikode Beach Road", churnRisk: 0.52, churnReason: "Rate comparison — HDFC offer received",
    lastContact: "5 days ago (Email)", preferredChannel: "Email", sentiment: "neutral", intent: "loan_inquiry", threads: []
  },
  {
    id: "C023", name: "Ajay Thakur", language: "Hindi", account: "Star Vehicle Loan",
    branch: "Dehradun Rajpur Road", churnRisk: 0.44, churnReason: "Insurance renewal reminder pending",
    lastContact: "8 days ago (SMS)", preferredChannel: "SMS", sentiment: "neutral", intent: "query", threads: []
  },
  {
    id: "C024", name: "Padmini Srinivasan", language: "Tamil", account: "Star FD Premium",
    branch: "Coimbatore RS Puram", churnRisk: 0.19, churnReason: "High-value FD — ₹25L maturity in 3 months",
    lastContact: "12 days ago (IVR Call)", preferredChannel: "WhatsApp", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C025", name: "Mohammad Rizwan", language: "Urdu", account: "Star Salary Account",
    branch: "Lucknow Aminabad", churnRisk: 0.66, churnReason: "Salary credit delayed — HR issue",
    lastContact: "2 days ago (Chatbot)", preferredChannel: "WhatsApp", sentiment: "stressed", intent: "complaint", threads: []
  },
  {
    id: "C026", name: "Kavya Hegde", language: "Kannada", account: "Star Education Loan",
    branch: "Mangaluru Hampankatta", churnRisk: 0.41, churnReason: "Moratorium period ending — awareness needed",
    lastContact: "7 days ago (Email)", preferredChannel: "Email", sentiment: "neutral", intent: "loan_inquiry", threads: []
  },
  {
    id: "C027", name: "Bhupinder Singh", language: "Punjabi", account: "Star Business Current",
    branch: "Chandigarh Sector 17", churnRisk: 0.74, churnReason: "Large withdrawal + competitor account opened",
    lastContact: "Today (Branch Visit)", preferredChannel: "Branch", sentiment: "angry", intent: "closure_request", threads: []
  },
  {
    id: "C028", name: "Swati Kulkarni", language: "Marathi", account: "Star Women's Savings",
    branch: "Nagpur Sitabuldi", churnRisk: 0.33, churnReason: "Regular SIP — satisfied customer",
    lastContact: "18 days ago (Mobile App)", preferredChannel: "Mobile App", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C029", name: "Nitin Agarwal", language: "Hindi", account: "Star NRI Advantage",
    branch: "Jaipur MI Road", churnRisk: 0.58, churnReason: "Remittance fee complaint — UAE",
    lastContact: "3 days ago (WhatsApp)", preferredChannel: "WhatsApp", sentiment: "stressed", intent: "complaint", threads: []
  },
  {
    id: "C030", name: "Divya Krishnan", language: "Tamil", account: "Star Home Loan",
    branch: "Salem Junction", churnRisk: 0.48, churnReason: "Prepayment inquiry — surplus funds",
    lastContact: "4 days ago (IVR Call)", preferredChannel: "WhatsApp", sentiment: "neutral", intent: "loan_inquiry", threads: []
  },
  {
    id: "C031", name: "Rakesh Pandey", language: "Hindi", account: "Star Salary Account",
    branch: "Varanasi Lanka", churnRisk: 0.15, churnReason: "Loyal employee account — 10 years",
    lastContact: "30 days ago (Branch Visit)", preferredChannel: "Branch", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C032", name: "Asha Bhat", language: "Kannada", account: "Star Senior Citizen FD",
    branch: "Hubli Deshpande Nagar", churnRisk: 0.28, churnReason: "FD auto-renewal confirmed — stable",
    lastContact: "22 days ago (Branch Visit)", preferredChannel: "Branch", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C033", name: "Sanjay Verma", language: "Hindi", account: "Star Business Loan",
    branch: "Kanpur Mall Road", churnRisk: 0.81, churnReason: "CIBIL score dropped + 2 bounced cheques",
    lastContact: "Today (IVR Call)", preferredChannel: "WhatsApp", sentiment: "angry", intent: "complaint", threads: []
  },
  {
    id: "C034", name: "Rekha Devi", language: "Hindi", account: "Star Jan Dhan",
    branch: "Ranchi Main Road", churnRisk: 0.12, churnReason: "Subsidy account — regular DBT credits",
    lastContact: "35 days ago (Branch Visit)", preferredChannel: "Branch", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C035", name: "Prakash Pillai", language: "Malayalam", account: "Star Gold Savings",
    branch: "Ernakulam Broadway", churnRisk: 0.36, churnReason: "Gold loan inquiry — seasonal need",
    lastContact: "6 days ago (Mobile App)", preferredChannel: "Mobile App", sentiment: "neutral", intent: "loan_inquiry", threads: []
  },
  {
    id: "C036", name: "Nandini Shastri", language: "Telugu", account: "Star Women's Savings",
    branch: "Visakhapatnam Beach Road", churnRisk: 0.43, churnReason: "FD matured — reinvestment pending",
    lastContact: "9 days ago (SMS)", preferredChannel: "SMS", sentiment: "neutral", intent: "query", threads: []
  },
  {
    id: "C037", name: "Imran Khan", language: "Urdu", account: "Star Current Account",
    branch: "Bhopal Hamidia Road", churnRisk: 0.69, churnReason: "Business downturn — balance declining",
    lastContact: "2 days ago (IVR Call)", preferredChannel: "WhatsApp", sentiment: "stressed", intent: "complaint", threads: []
  },
  {
    id: "C038", name: "Geeta Mahajan", language: "Marathi", account: "Star Home Loan",
    branch: "Aurangabad Jalna Road", churnRisk: 0.55, churnReason: "Interest rate hike complaint",
    lastContact: "4 days ago (WhatsApp)", preferredChannel: "WhatsApp", sentiment: "stressed", intent: "complaint", threads: []
  },
  {
    id: "C039", name: "Venkatesh Murthy", language: "Kannada", account: "Star FD Premium",
    branch: "Dharwad PB Road", churnRisk: 0.21, churnReason: "High-value NRI deposits — ₹50L",
    lastContact: "15 days ago (Email)", preferredChannel: "Email", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C040", name: "Sunita Sharma", language: "Hindi", account: "Star Salary Account",
    branch: "Gurgaon Cyber City", churnRisk: 0.76, churnReason: "Company switched banks + zero salary credit",
    lastContact: "1 day ago (Chatbot)", preferredChannel: "WhatsApp", sentiment: "angry", intent: "closure_request", threads: []
  },
  {
    id: "C041", name: "Karthik Rajan", language: "Tamil", account: "Star Vehicle Loan",
    branch: "Trichy Thillai Nagar", churnRisk: 0.39, churnReason: "Pre-closure inquiry — part payment done",
    lastContact: "8 days ago (Mobile App)", preferredChannel: "Mobile App", sentiment: "neutral", intent: "loan_inquiry", threads: []
  },
  {
    id: "C042", name: "Harpreet Kaur", language: "Punjabi", account: "Star Women's Savings",
    branch: "Patiala The Mall", churnRisk: 0.27, churnReason: "Active SIP investor — happy customer",
    lastContact: "20 days ago (Mobile App)", preferredChannel: "Mobile App", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C043", name: "Ashok Reddy", language: "Telugu", account: "Star Business Current",
    branch: "Warangal Hanamkonda", churnRisk: 0.83, churnReason: "GST refund delayed + 4 complaints in queue",
    lastContact: "Today (Email)", preferredChannel: "Email", sentiment: "angry", intent: "complaint", threads: []
  },
  {
    id: "C044", name: "Neha Gupta", language: "Hindi", account: "Star Education Loan",
    branch: "Noida Sector 62", churnRisk: 0.50, churnReason: "Placement delayed — EMI concern",
    lastContact: "5 days ago (WhatsApp)", preferredChannel: "WhatsApp", sentiment: "stressed", intent: "loan_inquiry", threads: []
  },
  {
    id: "C045", name: "Subramaniam K", language: "Tamil", account: "Star Senior Citizen FD",
    branch: "Madurai Meenakshi", churnRisk: 0.16, churnReason: "Pension account — 20 year relationship",
    lastContact: "28 days ago (Branch Visit)", preferredChannel: "Branch", sentiment: "positive", intent: "query", threads: []
  },
  {
    id: "C046", name: "Anil Joshi", language: "Gujarati", account: "Star Business Loan",
    branch: "Surat Ring Road", churnRisk: 0.72, churnReason: "Textile business slowdown + EMI restructure request",
    lastContact: "2 days ago (IVR Call)", preferredChannel: "WhatsApp", sentiment: "stressed", intent: "loan_inquiry", threads: []
  },
  {
    id: "C047", name: "Priyanka Das", language: "Bengali", account: "Star Home Loan",
    branch: "Howrah Station Road", churnRisk: 0.46, churnReason: "Transfer to PMAY subsidy — documentation pending",
    lastContact: "7 days ago (Email)", preferredChannel: "Email", sentiment: "neutral", intent: "loan_inquiry", threads: []
  },
  {
    id: "C048", name: "Rajinder Pal", language: "Punjabi", account: "Star Current Account",
    branch: "Ludhiana GT Road", churnRisk: 0.85, churnReason: "Fraud victim — ₹2L unauthorized debit",
    lastContact: "Today (IVR Call)", preferredChannel: "WhatsApp", sentiment: "urgent", intent: "fraud_alert", threads: []
  },
  {
    id: "C049", name: "Manjula Rao", language: "Telugu", account: "Star Gold Savings",
    branch: "Vijayawada MG Road", churnRisk: 0.34, churnReason: "Jewel loan inquiry — Akshaya Tritiya",
    lastContact: "11 days ago (Branch Visit)", preferredChannel: "Branch", sentiment: "positive", intent: "loan_inquiry", threads: []
  },
  {
    id: "C050", name: "Amit Saxena", language: "Hindi", account: "Star NRI Advantage",
    branch: "Delhi Rajiv Chowk", churnRisk: 0.62, churnReason: "Remittance charges high — USA NRI",
    lastContact: "3 days ago (Mobile App)", preferredChannel: "Mobile App", sentiment: "stressed", intent: "complaint", threads: []
  }
];

export const demoThreads: Thread[] = [
  {
    id: "T001",
    customerId: "C001",
    events: [
      {
        channel: "ivr_call",
        timestamp: "2026-03-04 09:14 AM",
        message: "Called about EMI bounce on home loan. Agent promised callback.",
        intent: "complaint",
        sentiment: "stressed",
        agentId: "A045",
        resolved: false
      },
      {
        channel: "branch_visit",
        timestamp: "2026-03-05 11:30 AM",
        message: "Visited Ludhiana branch. Teller had no record of Monday call. Customer frustrated.",
        intent: "complaint",
        sentiment: "angry",
        agentId: "B012",
        resolved: false
      },
      {
        channel: "whatsapp",
        timestamp: "2026-03-06 02:15 PM",
        message: "Yaar meri EMI bounce ho gayi. 3rd time bol raha hoon. Koi sun nahi raha.",
        intent: "escalation",
        sentiment: "angry",
        agentId: null,
        resolved: false
      }
    ]
  },
  {
    id: "T004",
    customerId: "C002",
    events: [
      {
        channel: "mobile_app",
        timestamp: "2026-02-25 03:45 PM",
        message: "Checked home loan interest rates on app. Competitor offering 8.2%.",
        intent: "loan_inquiry",
        sentiment: "neutral",
        agentId: null,
        resolved: false
      },
      {
        channel: "email",
        timestamp: "2026-02-28 10:00 AM",
        message: "Sent email asking about loan transfer process and documentation required.",
        intent: "loan_inquiry",
        sentiment: "neutral",
        agentId: "A023",
        resolved: false
      }
    ]
  },
  {
    id: "T007",
    customerId: "C004",
    events: [
      {
        channel: "ivr_call",
        timestamp: "2026-03-01 08:30 AM",
        message: "Meri EMI nahi bhar paaya, business mein loss ho gaya. Kuch help karo.",
        intent: "complaint",
        sentiment: "stressed",
        agentId: "A067",
        resolved: false
      },
      {
        channel: "whatsapp",
        timestamp: "2026-03-08 04:20 PM",
        message: "Bhai sahab, do EMI miss ho gayi. Recovery wale call kar rahe hain. Koi raasta batao.",
        intent: "complaint",
        sentiment: "stressed",
        agentId: null,
        resolved: false
      }
    ]
  },
  {
    id: "T011",
    customerId: "C007",
    events: [
      {
        channel: "ivr_call",
        timestamp: "2026-03-09 07:45 AM",
        message: "URGENT: Unauthorized transaction of Rs 45,000 from my account. I need this reversed NOW.",
        intent: "fraud_alert",
        sentiment: "urgent",
        agentId: "A012",
        resolved: false
      },
      {
        channel: "mobile_app",
        timestamp: "2026-03-09 07:50 AM",
        message: "Also filed complaint on mobile app. Transaction ID: TXN20260309074532.",
        intent: "fraud_alert",
        sentiment: "urgent",
        agentId: null,
        resolved: false
      }
    ]
  },
  {
    id: "T017",
    customerId: "C011",
    events: [
      {
        channel: "chatbot",
        timestamp: "2026-03-09 11:00 AM",
        message: "I want to close my salary account. My company has switched to another bank.",
        intent: "closure_request",
        sentiment: "angry",
        agentId: null,
        resolved: false
      },
      {
        channel: "whatsapp",
        timestamp: "2026-03-09 11:30 AM",
        message: "Nobody responded on chatbot. I am closing this account TODAY. Give me the process.",
        intent: "closure_request",
        sentiment: "angry",
        agentId: null,
        resolved: false
      }
    ]
  }
];

export const demoDrafts: Record<string, Draft> = {
  "C001": {
    language: "Hindi",
    draft: "आदरणीय श्री शर्मा जी, हमें खेद है कि आपको बार-बार एक ही समस्या बतानी पड़ी। हम देख सकते हैं कि आपने 4 मार्च को कॉल किया था और 5 मार्च को ब्रांच विजिट की थी। आपकी EMI बाउंस की समस्या के लिए हम तुरंत EMI पुनर्गठन का प्रस्ताव भेज रहे हैं। कृपया कल सुबह 10 बजे तक हमारा संदेश प्रतीक्षा करें।",
    poweredBy: "LLaMA 3 (Self-hosted)",
    generatedIn: "2.3 seconds",
    contextUsed: ["IVR call transcript (Mar 4)", "Branch visit log (Mar 5)", "Customer profile", "Star Sahyog EMI restructuring scheme"]
  },
  "C002": {
    language: "Tamil",
    draft: "அன்புள்ள திருமதி வெங்கடராமன், உங்கள் வீட்டுக் கடன் வட்டி விகிதம் குறித்த விசாரணைக்கு நன்றி. Bank of India-ன் Star Home Loan திட்டத்தில் 8.1% சிறப்பு வட்டி விகிதம் கிடைக்கிறது. உங்கள் கடன் மாற்றத்தை எளிதாக செய்ய எங்கள் அண்ணா நகர் கிளை மேலாளர் உங்களை நாளை தொடர்பு கொள்வார்.",
    poweredBy: "LLaMA 3 (Self-hosted)",
    generatedIn: "2.1 seconds",
    contextUsed: ["Mobile app browsing history", "Competitor rate comparison", "Star Home Loan scheme details", "Customer profile"]
  },
  "C004": {
    language: "Punjabi",
    draft: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਸ੍ਰੀ ਧਿੱਲੋਂ ਜੀ, ਅਸੀਂ ਸਮਝਦੇ ਹਾਂ ਕਿ ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਵਿੱਚ ਮੁਸ਼ਕਲ ਆਈ ਹੈ। Bank of India ਦੀ Star Sahyog ਯੋਜਨਾ ਤਹਿਤ ਅਸੀਂ ਤੁਹਾਡੀ EMI ਨੂੰ 3 ਮਹੀਨਿਆਂ ਲਈ ਮੁਲਤਵੀ ਕਰ ਸਕਦੇ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਕੱਲ੍ਹ ਅੰਮ੍ਰਿਤਸਰ ਜੀ.ਟੀ. ਰੋਡ ਬ੍ਰਾਂਚ ਵਿੱਚ ਆਓ।",
    poweredBy: "LLaMA 3 (Self-hosted)",
    generatedIn: "2.5 seconds",
    contextUsed: ["IVR call transcript (Mar 1)", "WhatsApp message (Mar 8)", "Business loan account details", "Star Sahyog EMI moratorium scheme"]
  },
  "C005": {
    language: "Marathi",
    draft: "नमस्कार सुश्री पाटील, Bank of India च्या Star Savings Plus खात्यावर तुम्हाला 7.5% व्याजदर मिळतो. तुमच्या गृहकर्जाच्या चौकशीसाठी आम्ही पुणे FC रोड शाखेतून तुम्हाला उद्या संपर्क करू. आमच्या विशेष ऑफरबद्दल अधिक माहितीसाठी कृपया प्रतीक्षा करा.",
    poweredBy: "LLaMA 3 (Self-hosted)",
    generatedIn: "2.0 seconds",
    contextUsed: ["Branch visit log (Mar 4)", "Product comparison browsing", "Customer profile", "Star Home Loan rates"]
  },
  "C007": {
    language: "Telugu",
    draft: "గౌరవనీయ శ్రీ హరీష్ రెడ్డి గారు, మీ ఖాతా నుండి అనధికార లావాదేవీ గురించి మేము తక్షణ చర్య తీసుకుంటున్నాము. Rs 45,000 లావాదేవీ (TXN20260309074532) ని తాత్కాలికంగా నిలిపివేశాము. 24 గంటల్లో పూర్తి రీఫండ్ ప్రక్రియ పూర్తి అవుతుంది. దయచేసి మీ కార్డ్‌ని బ్లాక్ చేయండి.",
    poweredBy: "LLaMA 3 (Self-hosted)",
    generatedIn: "1.8 seconds",
    contextUsed: ["IVR call transcript (Today)", "Mobile app complaint", "Transaction records", "Fraud detection protocol"]
  },
  "C011": {
    language: "Hindi",
    draft: "आदरणीय श्री मल्होत्रा जी, हम समझते हैं कि आपकी कंपनी ने बैंक बदला है। लेकिन Bank of India में आपके 5 साल के रिश्ते को देखते हुए, हम आपको Star Premium Salary Account में upgrade कर सकते हैं — जिसमें zero balance, free insurance और 2% ज्यादा FD rate मिलेगा। क्या आप कल एक बार हमारे RM से बात कर सकते हैं?",
    poweredBy: "LLaMA 3 (Self-hosted)",
    generatedIn: "2.4 seconds",
    contextUsed: ["Chatbot conversation (Today)", "WhatsApp message (Today)", "Account history — 5 years", "Star Premium Salary scheme", "Retention protocol"]
  },
  "DEFAULT": {
    language: "English",
    draft: "Dear Valued Customer, thank you for reaching out to Bank of India. We have reviewed your query and our team will get back to you within 24 hours with a resolution. For urgent matters, please call our helpline at 1800-103-1906.",
    poweredBy: "LLaMA 3 (Self-hosted)",
    generatedIn: "1.5 seconds",
    contextUsed: ["Customer profile", "Recent interactions", "Account details"]
  }
};

export const demoComplianceResults: Record<string, ComplianceResult> = {
  "C001_whatsapp": {
    dncStatus: "PASS — Not on TRAI DNC registry",
    consentStatus: "PASS — WhatsApp consent valid since Jan 15 2026",
    rbiContentStatus: "PASS — No violations found in 30-rule scan",
    overallStatus: "GREEN",
    checkedAt: "2026-03-06 14:16:23",
    poweredBy: "TRAI DNC API + DPDP Consent Manager + LLM Rule Checker"
  },
  "C002_whatsapp": {
    dncStatus: "PASS — Not on TRAI DNC registry",
    consentStatus: "PASS — WhatsApp consent valid since Feb 01 2026",
    rbiContentStatus: "PASS — No violations found in 30-rule scan",
    overallStatus: "GREEN",
    checkedAt: "2026-03-09 10:30:00",
    poweredBy: "TRAI DNC API + DPDP Consent Manager + LLM Rule Checker"
  }
};

export const channelIcons: Record<string, string> = {
  ivr_call: "📞",
  branch_visit: "🏦",
  whatsapp: "💬",
  email: "📧",
  mobile_app: "📱",
  chatbot: "🤖",
  sms: "💌",
  website: "🌐"
};

export const channelColors: Record<string, string> = {
  ivr_call: "bg-blue-500",
  branch_visit: "bg-amber-500",
  whatsapp: "bg-green-500",
  email: "bg-purple-500",
  mobile_app: "bg-cyan-500",
  chatbot: "bg-pink-500",
  sms: "bg-orange-500",
  website: "bg-indigo-500"
};

// Supervisor dashboard data
export const supervisorMetrics = {
  totalActiveConversations: 1247,
  avgResponseTime: "4.2 min",
  sentimentBreakdown: {
    positive: 34,
    neutral: 38,
    stressed: 15,
    angry: 9,
    urgent: 4
  },
  channelDistribution: {
    whatsapp: 31,
    ivr_call: 24,
    mobile_app: 19,
    email: 12,
    branch_visit: 8,
    chatbot: 6
  },
  topIntents: [
    { intent: "query", count: 423 },
    { intent: "complaint", count: 312 },
    { intent: "loan_inquiry", count: 198 },
    { intent: "fraud_alert", count: 87 },
    { intent: "closure_request", count: 65 },
    { intent: "escalation", count: 42 }
  ],
  anomalies: [
    {
      region: "Ludhiana",
      type: "fraud_alert",
      spike: "340%",
      affected: 14,
      message: "⚠️ 340% spike in fraud_alert intent in last 2 hours — 14 customers affected"
    }
  ],
  regionalHeatmap: [
    { region: "Delhi NCR", conversations: 234, sentiment: "neutral", risk: "medium" },
    { region: "Mumbai", conversations: 198, sentiment: "neutral", risk: "low" },
    { region: "Chennai", conversations: 156, sentiment: "positive", risk: "low" },
    { region: "Kolkata", conversations: 134, sentiment: "neutral", risk: "low" },
    { region: "Ludhiana", conversations: 89, sentiment: "angry", risk: "critical" },
    { region: "Bengaluru", conversations: 167, sentiment: "neutral", risk: "medium" },
    { region: "Hyderabad", conversations: 112, sentiment: "stressed", risk: "medium" },
    { region: "Pune", conversations: 98, sentiment: "positive", risk: "low" },
    { region: "Ahmedabad", conversations: 76, sentiment: "neutral", risk: "low" }
  ]
};
