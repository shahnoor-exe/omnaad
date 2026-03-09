'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ComplaintTimeline from '../../../components/customer/ComplaintTimeline';
import NewComplaintForm from '../../../components/customer/NewComplaintForm';
import ChurnStatusCard from '../../../components/customer/ChurnStatusCard';

/* ── Mock customer data ────────────────────────────────── */
const customers = [
  { id: 'C001', name: 'Rajesh Sharma', region: 'Mumbai', type: 'savings' },
  { id: 'C012', name: 'Priya Patel', region: 'Ahmedabad', type: 'current' },
  { id: 'C023', name: 'Amit Verma', region: 'Delhi', type: 'loan' },
  { id: 'C035', name: 'Sunita Reddy', region: 'Hyderabad', type: 'savings' },
  { id: 'C047', name: 'Kiran Naik', region: 'Bengaluru', type: 'current' },
];

const mockComplaints = [
  {
    id: 'TKT-2024-001', subject: 'Failed UPI Transaction', category: 'Transaction Dispute',
    status: 'in_progress' as const, date: '15 Jan 2025', channel: 'Mobile App',
    timeline: [
      { id: 1, date: '15 Jan 2025, 10:00 AM', channel: 'Mobile App', channelIcon: '📱', status: 'Opened', description: 'Customer reported UPI transaction of ₹5,000 failed but amount debited.', agent: 'Auto-logged' },
      { id: 2, date: '15 Jan 2025, 10:05 AM', channel: 'WhatsApp', channelIcon: '💬', status: 'Update', description: 'OmNaad AI confirmed transaction failure. Reversal initiated.', agent: 'Bot' },
      { id: 3, date: '15 Jan 2025, 02:30 PM', channel: 'Email', channelIcon: '✉️', status: 'In Progress', description: 'Confirmation email sent. Reversal expected within 3-5 business days.', agent: 'Agent Priya' },
    ],
  },
  {
    id: 'TKT-2024-002', subject: 'Debit Card Not Working Abroad', category: 'Card Problem',
    status: 'resolved' as const, date: '10 Jan 2025', channel: 'IVR',
    timeline: [
      { id: 1, date: '10 Jan 2025, 08:00 AM', channel: 'IVR', channelIcon: '📞', status: 'Opened', description: 'Customer called from Singapore. Debit card declined at POS terminal.', agent: 'IVR Bot' },
      { id: 2, date: '10 Jan 2025, 08:05 AM', channel: 'SMS', channelIcon: '📩', status: 'Update', description: 'International usage was disabled. SMS sent with activation link.', agent: 'Bot' },
      { id: 3, date: '10 Jan 2025, 08:10 AM', channel: 'WhatsApp', channelIcon: '💬', status: 'Resolved', description: 'Customer confirmed card working after enabling international transactions.', agent: 'Agent Amit' },
    ],
  },
  {
    id: 'TKT-2024-003', subject: 'Home Loan Prepayment Query', category: 'Loan Inquiry',
    status: 'open' as const, date: '18 Jan 2025', channel: 'Branch',
    timeline: [
      { id: 1, date: '18 Jan 2025, 11:00 AM', channel: 'Branch', channelIcon: '🏦', status: 'Opened', description: 'Customer visited Andheri West branch for home loan prepayment calculation.', agent: 'Branch Manager' },
      { id: 2, date: '18 Jan 2025, 11:30 AM', channel: 'Email', channelIcon: '✉️', status: 'Open', description: 'Prepayment schedule and foreclosure charges document emailed.', agent: 'Agent Ravi' },
    ],
  },
];

const churnData = {
  low: { score: 25, label: 'Healthy Relationship', riskLevel: 'low' as const, factors: ['Regular transactions', 'Active digital banking', 'SIP investments active', 'No recent complaints'] },
  medium: { score: 55, label: 'Moderate Risk — Needs Attention', riskLevel: 'medium' as const, factors: ['Decreased transaction frequency', 'Pending complaint >5 days', 'No recent product engagement', 'Competing bank inquiry detected'] },
  high: { score: 82, label: 'High Churn Probability', riskLevel: 'high' as const, factors: ['Multiple unresolved complaints', 'Large fund transfer to other bank', 'Deactivated auto-pay mandates', 'Negative sentiment in recent interactions'] },
};

/* ── Page Component ──────────────────────────────────────── */
export default function PortalPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'complaints' | 'new' | 'health'>('complaints');
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(mockComplaints[0].id);

  const customer = customers.find((c) => c.id === selectedCustomer);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              OmNaad
            </span>
            <span className="text-[10px] font-mono bg-blue-950 border border-blue-700 text-blue-300 rounded px-1.5 py-0.5">
              Self-Service Portal
            </span>
          </Link>
          <div className="flex gap-3 text-xs">
            <Link href="/customer/chat" className="text-gray-400 hover:text-blue-400 transition-colors">Chat</Link>
            <Link href="/customer/preferences" className="text-gray-400 hover:text-blue-400 transition-colors">Preferences</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors">Agent View</Link>
          </div>
        </div>
      </nav>

      <div className="pt-14">
        {/* Login gate */}
        {!selectedCustomer ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md mx-4"
            >
              <div className="text-center mb-8">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-4xl font-bold mb-3"
                >
                  <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Self-Service Portal
                  </span>
                </motion.h1>
                <p className="text-gray-500 text-sm">Track complaints, view status, and manage your relationship with Bank of India</p>
              </div>

              <div className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
                <label className="block text-xs font-bold text-gray-400 mb-2">Select Your Customer Profile (Demo)</label>
                <div className="space-y-2">
                  {customers.map((c, i) => (
                    <motion.button
                      key={c.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCustomer(c.id)}
                      className="w-full flex items-center gap-3 bg-gray-800/40 border border-gray-700/30 hover:border-blue-500/40 rounded-xl px-4 py-3 transition-all group"
                    >
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-violet-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-bold text-gray-200 group-hover:text-blue-400 transition-colors">{c.name}</p>
                        <p className="text-[10px] text-gray-600">{c.id} · {c.region} · {c.type}</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-700 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </motion.button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-700 mt-3 text-center">
                  Demo Mode — No real authentication. Select any profile to explore.
                </p>
              </div>

              {/* Demo labels */}
              <div className="mt-4 text-xs font-mono bg-blue-950/60 border border-blue-700/30 rounded-lg px-4 py-2 text-blue-300 text-center">
                DPDP Consent DB · Apache Kafka 10K events/sec · Neo4j Memory Graph
              </div>
            </motion.div>
          </div>
        ) : (
          /* Main portal view */
          <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Customer header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-gray-900/60 border border-gray-800/50 rounded-2xl p-4 mb-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-violet-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {customer?.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-100">{customer?.name}</p>
                  <p className="text-[10px] text-gray-500">{customer?.id} · {customer?.region} · {customer?.type} account</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 bg-emerald-500 rounded-full"
                />
                <span className="text-[10px] text-emerald-400">Online</span>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-xs text-gray-600 hover:text-red-400 transition-colors ml-2"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-900/40 border border-gray-800/30 rounded-xl p-1 mb-6 w-fit">
              {[
                { key: 'complaints' as const, label: 'My Complaints', icon: '📋' },
                { key: 'new' as const, label: 'New Complaint', icon: '➕' },
                { key: 'health' as const, label: 'Relationship Health', icon: '💚' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.key
                      ? 'bg-blue-600/20 text-blue-400 font-bold'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Complaints Tab */}
              {activeTab === 'complaints' && (
                <motion.div
                  key="complaints"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid lg:grid-cols-[360px_1fr] gap-6"
                >
                  {/* Complaint list */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-gray-500 mb-3">Open & Recent Tickets</h3>
                    {mockComplaints.map((c, i) => (
                      <motion.button
                        key={c.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => setSelectedComplaint(c.id)}
                        className={`w-full text-left bg-gray-900/60 border rounded-xl p-3 transition-all ${
                          selectedComplaint === c.id
                            ? 'border-blue-500/40 bg-blue-950/10'
                            : 'border-gray-800/50 hover:border-gray-700/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono text-gray-600">{c.id}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border ${
                            c.status === 'resolved' ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30' :
                            c.status === 'in_progress' ? 'bg-amber-950/50 text-amber-400 border-amber-500/30' :
                            'bg-blue-950/50 text-blue-400 border-blue-500/30'
                          }`}>
                            {c.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gray-200 mb-0.5">{c.subject}</p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-600">
                          <span>{c.category}</span>
                          <span>·</span>
                          <span>{c.date}</span>
                          <span>·</span>
                          <span>{c.channel}</span>
                        </div>
                      </motion.button>
                    ))}

                    {/* Real-time status banner */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-3 mt-3"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <motion.div
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                        />
                        <span className="text-[10px] font-bold text-cyan-400">Real-Time Updates</span>
                      </div>
                      <p className="text-[9px] text-cyan-300/60">
                        Ticket status updates are streamed via Apache Kafka. Any agent action reflects here instantly.
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline detail */}
                  <div>
                    {(() => {
                      const complaint = mockComplaints.find((c) => c.id === selectedComplaint);
                      if (!complaint) return <p className="text-xs text-gray-600">Select a ticket to view timeline</p>;
                      return (
                        <div className="bg-gray-900/40 border border-gray-800/40 rounded-2xl p-5">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm font-bold text-gray-200">{complaint.subject}</p>
                              <p className="text-[10px] text-gray-600">{complaint.id} · {complaint.category}</p>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                              complaint.status === 'resolved' ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30' :
                              complaint.status === 'in_progress' ? 'bg-amber-950/50 text-amber-400 border-amber-500/30' :
                              'bg-blue-950/50 text-blue-400 border-blue-500/30'
                            }`}>
                              {complaint.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-gray-500 mb-3">Omni-Channel Timeline</h4>
                          <ComplaintTimeline events={complaint.timeline} />

                          <div className="mt-4 text-[9px] font-mono bg-blue-950/40 border border-blue-700/30 rounded px-2 py-1 text-blue-300">
                            Apache Kafka | 10,000 events/sec | 6 channel topics | Neo4j conversation graph
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              )}

              {/* New Complaint Tab */}
              {activeTab === 'new' && (
                <motion.div
                  key="new"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-lg"
                >
                  <div className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-gray-200 mb-4">File a New Complaint</h3>
                    <NewComplaintForm onSubmit={() => {}} />
                  </div>
                </motion.div>
              )}

              {/* Health Tab */}
              {activeTab === 'health' && (
                <motion.div
                  key="health"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {Object.values(churnData).map((data, i) => (
                    <motion.div
                      key={data.riskLevel}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <ChurnStatusCard {...data} />
                    </motion.div>
                  ))}
                  <div className="md:col-span-3 text-xs font-mono bg-blue-950/40 border border-blue-700/30 rounded-lg px-3 py-2 text-blue-300 text-center">
                    Churn prediction: XGBoost + BERT behavioral signals | Apache Airflow retrains daily | Neo4j relationship graph
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
