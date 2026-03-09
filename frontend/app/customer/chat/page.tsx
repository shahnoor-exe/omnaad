'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from '../../../components/customer/MessageBubble';
import TypingIndicator from '../../../components/customer/TypingIndicator';
import HandoffBanner from '../../../components/customer/HandoffBanner';
import BotResponseLoader from '../../../components/customer/BotResponseLoader';
import Link from 'next/link';

/* ── Demo conversation seed ──────────────────────────────── */
interface Msg {
  id: number;
  sender: 'user' | 'bot' | 'agent';
  message: string;
  timestamp: string;
  intent?: string;
  sentiment?: string;
}

const demoResponses: Record<string, { reply: string; intent: string; sentiment: string }> = {
  'hello': { reply: 'Hello! Welcome to Bank of India 🏦 I\'m OmNaad AI — your omni-channel assistant. How can I help you today?', intent: 'greeting', sentiment: 'positive' },
  'hi': { reply: 'Hi there! Welcome to Bank of India. I\'m OmNaad AI, ready to assist you. What would you like help with?', intent: 'greeting', sentiment: 'positive' },
  'loan': { reply: 'I can help you with loan inquiries! We offer Home Loans (8.4% p.a.), Personal Loans (10.5% p.a.), and Education Loans (9.0% p.a.). Which type interests you?', intent: 'loan_inquiry', sentiment: 'neutral' },
  'complaint': { reply: 'I\'m sorry to hear you have a concern. Let me help you file a complaint. Could you please describe the issue? I\'ll assign it a tracking ID.', intent: 'complaint', sentiment: 'stressed' },
  'fraud': { reply: '🚨 Fraud alert registered. I\'m immediately escalating this to our security team. Your account has been flagged for enhanced monitoring. A case ID will be generated within 30 seconds.', intent: 'fraud_alert', sentiment: 'urgent' },
  'balance': { reply: 'For security, I\'ll verify your identity via OTP. Once confirmed, your account summary will show: Savings A/c ****6789 — ₹2,45,678.90 | Fixed Deposit — ₹5,00,000 (maturity: 15-Mar-2025).', intent: 'query', sentiment: 'neutral' },
  'agent': { reply: 'Connecting you to a live agent now. Your complete chat history will be shared so you won\'t need to repeat anything. Please hold for a moment...', intent: 'escalation', sentiment: 'neutral' },
  'speak': { reply: 'I understand you\'d like to speak with a human agent. Let me transfer you right away — all context will be preserved.', intent: 'escalation', sentiment: 'neutral' },
  'interest': { reply: 'Current BOI interest rates: Savings Account — 2.7% p.a. | FD (1yr) — 6.8% p.a. | RD (1yr) — 6.5% p.a. | Home Loan — 8.4% p.a. Rates effective from 01-Jan-2025.', intent: 'query', sentiment: 'neutral' },
  'kyc': { reply: 'You can complete your KYC update through: 1) Video KYC via this portal 2) Visit your nearest BOI branch 3) Upload documents on our Self-Service Portal. Shall I guide you through Video KYC?', intent: 'query', sentiment: 'neutral' },
  'credit card': { reply: 'BOI offers: 1) BOI Pride Card (No annual fee) 2) BOI Elite+ (Airport lounge + 5x rewards) 3) BOI Business Card (GST benefits). Want me to compare features or start an application?', intent: 'query', sentiment: 'neutral' },
  'emi': { reply: 'I can help calculate your EMI! For a ₹10,00,000 Home Loan at 8.4% for 20 years: EMI ≈ ₹8,614/month. Want me to calculate for a different amount or tenure?', intent: 'loan_inquiry', sentiment: 'neutral' },
  'transfer': { reply: 'To initiate a fund transfer, please use our secure Self-Service Portal which supports NEFT, RTGS, and IMPS. I can guide you through the process or redirect you there.', intent: 'query', sentiment: 'neutral' },
  'default': { reply: 'Thank you for your message. Let me analyze that for you using our AI engine. Could you provide more details so I can assist you better?', intent: 'query', sentiment: 'neutral' },
};

const initMessages: Msg[] = [
  { id: 1, sender: 'bot', message: 'Welcome to Bank of India 🏦 I\'m OmNaad AI — your omni-channel assistant powered by LLaMA 3. How can I help you today?', timestamp: '10:00 AM', intent: 'greeting', sentiment: 'positive' },
];

function matchResponse(text: string) {
  const lower = text.toLowerCase();
  for (const key of Object.keys(demoResponses)) {
    if (lower.includes(key)) return demoResponses[key];
  }
  return demoResponses['default'];
}

/* ── Page Component ──────────────────────────────────────── */
export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>(initMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [handoff, setHandoff] = useState<'none' | 'connecting' | 'connected'>('none');
  const [chatOpen, setChatOpen] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, loading]);

  const sendMessage = useCallback(() => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { id: nextId.current++, sender: 'user', message: text, timestamp: now }]);
    setInput('');
    setTyping(true);

    const matched = matchResponse(text);
    const isEscalation = matched.intent === 'escalation';

    setTimeout(() => {
      setTyping(false);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setMessages((prev) => [
          ...prev,
          { id: nextId.current++, sender: 'bot', message: matched.reply, timestamp: now, intent: matched.intent, sentiment: matched.sentiment },
        ]);
        if (isEscalation) {
          setHandoff('connecting');
          setTimeout(() => {
            setHandoff('connected');
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                { id: nextId.current++, sender: 'agent', message: 'Hi, I\'m Agent Priya from Bank of India support. I\'ve reviewed your chat history. How can I assist you further?', timestamp: now },
              ]);
            }, 1200);
          }, 2500);
        }
      }, 600);
    }, 1200);
  }, [input, loading]);

  const quickActions = ['Check Balance', 'Loan Info', 'File Complaint', 'Speak to Agent', 'Interest Rates', 'Credit Card'];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              OmNaad
            </span>
            <span className="text-[10px] font-mono bg-blue-950 border border-blue-700 text-blue-300 rounded px-1.5 py-0.5">
              Customer Chat
            </span>
          </Link>
          <div className="flex gap-3 text-xs">
            <Link href="/customer/portal" className="text-gray-400 hover:text-blue-400 transition-colors">Portal</Link>
            <Link href="/customer/preferences" className="text-gray-400 hover:text-blue-400 transition-colors">Preferences</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors">Agent View</Link>
          </div>
        </div>
      </nav>

      <div className="pt-14 flex flex-col lg:flex-row min-h-screen">
        {/* Left panel - info */}
        <div className="hidden lg:flex lg:w-[350px] flex-col justify-center px-8 border-r border-gray-800/50">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered Chat
              </span>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Experience Bank of India&apos;s intelligent omni-channel support. Our AI understands intent, sentiment, and context — and seamlessly hands off to a human when needed.
            </p>

            {/* Feature list */}
            <div className="space-y-3 mb-8">
              {[
                { icon: '🧠', label: 'Intent Detection', desc: 'BERT fine-tuned, 8-class' },
                { icon: '💬', label: 'LLM Responses', desc: 'LLaMA 3 8B via Ollama' },
                { icon: '📡', label: 'Event Streaming', desc: 'Apache Kafka real-time' },
                { icon: '🔁', label: 'Seamless Handoff', desc: 'Full context preserved' },
                { icon: '🔒', label: 'DPDP Compliant', desc: 'End-to-end encrypted' },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 bg-gray-900/50 border border-gray-800/50 rounded-lg px-3 py-2"
                >
                  <span className="text-lg">{f.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-200">{f.label}</p>
                    <p className="text-[10px] text-gray-500">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Demo label */}
            <div className="text-xs font-mono bg-blue-950 border border-blue-700 rounded-lg px-3 py-2 text-blue-300 space-y-1">
              <p className="font-bold text-blue-200">Demo Mode — Mock Responses</p>
              <p>LLaMA 3 (Demo: Mock JSON) · BERT fine-tuned (Demo: Keyword match)</p>
              <p>Apache Kafka event (Demo: State change)</p>
            </div>
          </motion.div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Floating bubble for mobile (hidden on desktop since chat is always open) */}
          <div className="lg:hidden fixed bottom-6 right-6 z-50">
            <AnimatePresence>
              {!chatOpen && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setChatOpen(true)}
                  className="w-14 h-14 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                  >
                    1
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Chat window */}
          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="flex-1 flex flex-col bg-gray-950 lg:bg-transparent"
              >
                {/* Chat header */}
                <div className="bg-gray-900/60 backdrop-blur-sm border-b border-gray-800/50 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center text-sm font-bold">
                        AI
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-gray-900 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-100">OmNaad AI Assistant</p>
                      <p className="text-[10px] text-emerald-400">Online — avg. response &lt;2s</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg.message}
                      sender={msg.sender}
                      timestamp={msg.timestamp}
                      intent={msg.intent}
                      sentiment={msg.sentiment}
                    />
                  ))}

                  <AnimatePresence>
                    {typing && <TypingIndicator />}
                    {loading && <BotResponseLoader />}
                  </AnimatePresence>

                  {handoff !== 'none' && (
                    <HandoffBanner
                      connected={handoff === 'connected'}
                      agentId="Agent Priya (A045)"
                    />
                  )}
                  <div ref={endRef} />
                </div>

                {/* Quick action chips */}
                {messages.length <= 2 && (
                  <div className="px-4 pb-2">
                    <p className="text-[10px] text-gray-600 mb-2">Quick actions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {quickActions.map((qa) => (
                        <motion.button
                          key={qa}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setInput(qa);
                          }}
                          className="text-[11px] bg-gray-800/60 border border-gray-700/40 text-gray-400 hover:text-blue-400 hover:border-blue-500/40 rounded-full px-3 py-1 transition-colors"
                        >
                          {qa}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-3 bg-gray-900/60 backdrop-blur-sm border-t border-gray-800/50">
                  <div className="flex items-center gap-2 bg-gray-800/60 border border-gray-700/40 rounded-2xl px-4 py-2 focus-within:border-blue-500/50 transition-colors">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder={handoff === 'connected' ? 'Reply to live agent...' : 'Type your message...'}
                      className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="w-8 h-8 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center disabled:opacity-30 transition-opacity"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </motion.button>
                  </div>
                  <p className="text-center text-[9px] text-gray-700 mt-1.5">
                    Powered by OmNaad AI · LLaMA 3 8B · DPDP Compliant · End-to-End Encrypted
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
