'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SentimentDial from '@/components/SentimentDial';
import ComplianceBadge from '@/components/ComplianceBadge';
import AutoDraftBox from '@/components/AutoDraftBox';
import ChurnRiskCard from '@/components/ChurnRiskCard';
import ConversationThread from '@/components/ConversationThread';
import AnomalyAlert from '@/components/AnomalyAlert';
import { demoCustomers, demoThreads, demoDrafts, supervisorMetrics } from '@/lib/mockData';
import { demoScenarios } from '@/lib/demoScenarios';

export default function DashboardPage() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState(demoCustomers[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [sentimentOverride, setSentimentOverride] = useState<string | null>(null);
  const [showEscalation, setShowEscalation] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [showCompliance, setShowCompliance] = useState(false);
  const [complianceForceRed, setComplianceForceRed] = useState(false);
  const [showAnomaly, setShowAnomaly] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const resetState = () => {
    setCurrentStep(0);
    setSentimentOverride(null);
    setShowEscalation(false);
    setShowDraft(false);
    setShowCompliance(false);
    setComplianceForceRed(false);
    setShowAnomaly(false);
    setMessageSent(false);
  };

  const runScenario = (scenarioId: string) => {
    resetState();
    setActiveScenario(scenarioId);

    const scenario = demoScenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    const customer = demoCustomers.find(c => c.id === scenario.customerId);
    if (customer) setSelectedCustomer(customer);

    if (scenarioId === 'scenario-1') {
      // The Angry Customer
      setTimeout(() => { setCurrentStep(1); setSentimentOverride('neutral'); }, 500);
      setTimeout(() => { setCurrentStep(2); setSentimentOverride('stressed'); }, 2000);
      setTimeout(() => { setCurrentStep(2); setSentimentOverride('angry'); }, 3500);
      setTimeout(() => { setCurrentStep(3); setShowEscalation(true); }, 4500);
      setTimeout(() => { setCurrentStep(5); setShowDraft(true); }, 6000);
      setTimeout(() => { setCurrentStep(6); setShowCompliance(true); }, 8500);
      setTimeout(() => { setCurrentStep(7); setMessageSent(true); setSentimentOverride('neutral'); }, 11000);
    } else if (scenarioId === 'scenario-2') {
      // Compliance Block
      setComplianceForceRed(true);
      setTimeout(() => { setCurrentStep(1); }, 500);
      setTimeout(() => { setCurrentStep(2); setShowCompliance(true); }, 1500);
      setTimeout(() => { setCurrentStep(3); }, 4000);
      setTimeout(() => {
        setCurrentStep(5);
        setComplianceForceRed(false);
        setShowCompliance(false);
        setTimeout(() => setShowCompliance(true), 100);
      }, 6000);
      setTimeout(() => { setCurrentStep(6); setMessageSent(true); }, 9000);
    } else if (scenarioId === 'scenario-3') {
      // Proactive Outreach
      setTimeout(() => { setCurrentStep(1); }, 500);
      setTimeout(() => { setCurrentStep(2); }, 1500);
      setTimeout(() => { setCurrentStep(3); setShowDraft(true); }, 2500);
      setTimeout(() => { setCurrentStep(4); }, 4500);
      setTimeout(() => { setCurrentStep(5); setShowCompliance(true); }, 5500);
      setTimeout(() => { setCurrentStep(6); setMessageSent(true); }, 7500);
    } else if (scenarioId === 'scenario-4') {
      // Multilingual Magic
      const customers = ['C001', 'C002', 'C004', 'C005', 'C007'];
      customers.forEach((cId, i) => {
        setTimeout(() => {
          const c = demoCustomers.find(cu => cu.id === cId);
          if (c) setSelectedCustomer(c);
          setCurrentStep(i + 1);
          setShowDraft(true);
        }, (i + 1) * 2000);
      });
    } else if (scenarioId === 'scenario-5') {
      // Anomaly Alert
      setTimeout(() => { setCurrentStep(1); }, 500);
      setTimeout(() => { setCurrentStep(2); setShowAnomaly(true); }, 1500);
      setTimeout(() => { setCurrentStep(3); }, 3000);
      setTimeout(() => { setCurrentStep(4); }, 4000);
      setTimeout(() => { setCurrentStep(5); setMessageSent(true); }, 5500);
    }
  };

  const thread = demoThreads.find(t => t.customerId === selectedCustomer.id);
  const draft = demoDrafts[selectedCustomer.id] || demoDrafts['DEFAULT'];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-800/50 backdrop-blur-xl bg-gray-950/90 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
              ॐ
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              OmNaad
            </span>
          </Link>
          <span className="text-xs text-gray-600 font-mono">|</span>
          <span className="text-sm text-gray-400">Agent Console</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-950/30 border border-green-500/20 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">Live</span>
          </div>
          <Link href="/dashboard/supervisor" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            Supervisor View →
          </Link>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar — Scenario Selector */}
        <aside className="w-80 border-r border-gray-800/50 min-h-[calc(100vh-52px)] p-4 bg-gray-900/30">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            🎬 Demo Scenarios
          </h2>
          <div className="space-y-2">
            {demoScenarios.map((scenario) => (
              <motion.button
                key={scenario.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => runScenario(scenario.id)}
                className={`w-full text-left rounded-xl p-3 border transition-all ${
                  activeScenario === scenario.id
                    ? 'bg-blue-950/50 border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'bg-gray-900/50 border-gray-800/30 hover:border-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{scenario.icon}</span>
                  <span className="text-sm font-bold text-gray-200">{scenario.title}</span>
                </div>
                <p className="text-[10px] text-gray-500 ml-7">{scenario.subtitle}</p>
              </motion.button>
            ))}
          </div>

          {/* Customer selector */}
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-6 mb-3">
            👤 Smart Inbox
          </h2>
          <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
            {demoCustomers.slice(0, 10).map((customer) => (
              <motion.button
                key={customer.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => { setSelectedCustomer(customer); resetState(); }}
                className={`w-full text-left rounded-lg p-2.5 border transition-all ${
                  selectedCustomer.id === customer.id
                    ? 'bg-gray-800/60 border-gray-600/50'
                    : 'bg-gray-900/30 border-gray-800/20 hover:bg-gray-800/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-300 truncate max-w-[140px]">{customer.name}</span>
                  <span className={`text-[9px] font-bold rounded px-1.5 py-0.5 ${
                    customer.churnRisk >= 0.7 ? 'bg-red-950/50 text-red-400' :
                    customer.churnRisk >= 0.4 ? 'bg-amber-950/50 text-amber-400' :
                    'bg-green-950/50 text-green-400'
                  }`}>
                    {Math.round(customer.churnRisk * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[9px] text-gray-600">{customer.language}</span>
                  <span className="text-[9px] text-gray-700">•</span>
                  <span className="text-[9px] text-gray-600">{customer.intent}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-52px)]">
          {/* Scenario Progress Bar */}
          {activeScenario && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-gray-900/60 rounded-xl p-4 border border-gray-800/50"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">
                  {demoScenarios.find(s => s.id === activeScenario)?.icon}
                </span>
                <span className="text-sm font-bold text-gray-200">
                  {demoScenarios.find(s => s.id === activeScenario)?.title}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  Step {currentStep} / {demoScenarios.find(s => s.id === activeScenario)?.steps.length}
                </span>
              </div>
              <div className="flex gap-1">
                {demoScenarios.find(s => s.id === activeScenario)?.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    className={`h-1.5 rounded-full flex-1 ${
                      i < currentStep ? 'bg-blue-500' : 'bg-gray-800'
                    }`}
                    animate={i < currentStep ? { backgroundColor: '#3b82f6' } : {}}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
              {currentStep > 0 && (
                <p className="text-xs text-gray-400 mt-2">
                  {demoScenarios.find(s => s.id === activeScenario)?.steps[currentStep - 1]?.description}
                </p>
              )}
            </motion.div>
          )}

          {/* Anomaly Alert */}
          <AnimatePresence>
            {showAnomaly && (
              <div className="mb-6">
                <AnomalyAlert
                  region={supervisorMetrics.anomalies[0].region}
                  type={supervisorMetrics.anomalies[0].type}
                  spike={supervisorMetrics.anomalies[0].spike}
                  affected={supervisorMetrics.anomalies[0].affected}
                  message={supervisorMetrics.anomalies[0].message}
                  onDismiss={() => setShowAnomaly(false)}
                />
              </div>
            )}
          </AnimatePresence>

          {/* Escalation Alert */}
          <AnimatePresence>
            {showEscalation && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mb-6 bg-orange-950/40 border border-orange-500/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-2xl"
                  >
                    🚨
                  </motion.span>
                  <div>
                    <p className="text-sm font-bold text-orange-300">Level-2 RM Escalation Triggered</p>
                    <p className="text-xs text-orange-400/70">
                      Customer {selectedCustomer.name} — {selectedCustomer.sentiment} sentiment + {selectedCustomer.intent} intent across multiple channels
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message Sent Success */}
          <AnimatePresence>
            {messageSent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mb-6 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="text-sm font-bold text-emerald-300">Message Dispatched Successfully</p>
                    <p className="text-xs text-emerald-400/70">
                      Sent via {selectedCustomer.preferredChannel} to {selectedCustomer.name} in {draft.language}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Customer Info Header */}
          <motion.div
            key={selectedCustomer.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-900/60 rounded-xl p-4 border border-gray-800/50 mb-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-100">{selectedCustomer.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500">{selectedCustomer.id}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">{selectedCustomer.account}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">{selectedCustomer.branch}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] bg-gray-800/80 border border-gray-700/30 rounded-full px-2 py-0.5 text-gray-400">
                    🗣 {selectedCustomer.language}
                  </span>
                  <span className="text-[10px] bg-gray-800/80 border border-gray-700/30 rounded-full px-2 py-0.5 text-gray-400">
                    📡 Preferred: {selectedCustomer.preferredChannel}
                  </span>
                  <span className="text-[10px] bg-gray-800/80 border border-gray-700/30 rounded-full px-2 py-0.5 text-gray-400">
                    🕐 {selectedCustomer.lastContact}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Conversation Thread */}
              {thread && (
                <ConversationThread
                  events={thread.events}
                  customerName={selectedCustomer.name}
                />
              )}

              {/* Auto Draft */}
              <AnimatePresence>
                {showDraft && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <AutoDraftBox
                      draft={draft.draft}
                      language={draft.language}
                      poweredBy={draft.poweredBy}
                      generatedIn={draft.generatedIn}
                      contextUsed={draft.contextUsed}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Sentiment Dial */}
              <SentimentDial
                currentSentiment={sentimentOverride || selectedCustomer.sentiment}
              />

              {/* Churn Risk */}
              <ChurnRiskCard
                churnRisk={selectedCustomer.churnRisk}
                churnReason={selectedCustomer.churnReason}
                customerName={selectedCustomer.name}
              />

              {/* Compliance Badge */}
              <AnimatePresence>
                {showCompliance && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <ComplianceBadge
                      autoRun={true}
                      forceRed={complianceForceRed}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
