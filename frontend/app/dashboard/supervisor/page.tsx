'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supervisorMetrics, demoCustomers } from '@/lib/mockData';
import AnomalyAlert from '@/components/AnomalyAlert';

const SENTIMENT_COLORS: Record<string, string> = {
  positive: '#22c55e',
  neutral: '#84cc16',
  stressed: '#f59e0b',
  angry: '#ef4444',
  urgent: '#7c3aed',
};

const RISK_COLORS: Record<string, string> = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
  critical: '#dc2626',
};

export default function SupervisorDashboard() {
  const [showAnomaly, setShowAnomaly] = useState(true);
  const [bulkSent, setBulkSent] = useState(false);

  const sentimentData = Object.entries(supervisorMetrics.sentimentBreakdown).map(([key, val]) => ({
    name: key, value: val, color: SENTIMENT_COLORS[key],
  }));

  const channelData = Object.entries(supervisorMetrics.channelDistribution).map(([key, val]) => ({
    name: key.replace('_', ' '), value: val,
  }));

  const intentData = supervisorMetrics.topIntents;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Nav */}
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
          <span className="text-sm text-gray-400">Supervisor Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-950/30 border border-green-500/20 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">Live Monitoring</span>
          </div>
          <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Agent Console
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Production label */}
        <div className="text-xs font-mono bg-blue-950 border border-blue-700 rounded px-2 py-1 text-blue-300 mb-6 inline-block">
          🔬 DEMO: Mock metrics  |  ⚡ PRODUCTION: Real-time Kafka Streams + Elasticsearch analytics + Grafana dashboards
        </div>

        {/* Anomaly Alert */}
        {showAnomaly && !bulkSent && (
          <div className="mb-6">
            <AnomalyAlert
              region={supervisorMetrics.anomalies[0].region}
              type={supervisorMetrics.anomalies[0].type}
              spike={supervisorMetrics.anomalies[0].spike}
              affected={supervisorMetrics.anomalies[0].affected}
              message={supervisorMetrics.anomalies[0].message}
              onDismiss={() => { setShowAnomaly(false); setBulkSent(true); }}
            />
          </div>
        )}

        {bulkSent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4"
          >
            <span className="text-sm font-bold text-emerald-300">✅ Bulk outreach triggered — 14 personalized SMS dispatched to affected customers in Ludhiana region</span>
          </motion.div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Conversations', value: supervisorMetrics.totalActiveConversations.toLocaleString(), icon: '💬', color: 'blue' },
            { label: 'Avg Response Time', value: supervisorMetrics.avgResponseTime, icon: '⏱️', color: 'emerald' },
            { label: 'High Risk Customers', value: demoCustomers.filter(c => c.churnRisk >= 0.7).length.toString(), icon: '⚠️', color: 'red' },
            { label: 'Active Anomalies', value: supervisorMetrics.anomalies.length.toString(), icon: '🚨', color: 'amber' },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900/60 border border-gray-800/50 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{kpi.icon}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{kpi.label}</span>
              </div>
              <p className={`text-3xl font-black text-${kpi.color}-400`}>
                {kpi.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Sentiment Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/60 border border-gray-800/50 rounded-xl p-4"
          >
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
              Sentiment Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {sentimentData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#9ca3af' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2">
              {sentimentData.map((s, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-[10px] text-gray-500">{s.name}: {s.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Channel Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/60 border border-gray-800/50 rounded-xl p-4"
          >
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
              Channel Volume
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={channelData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} animationDuration={1500} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Intent Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900/60 border border-gray-800/50 rounded-xl p-4"
          >
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
              Top Intents
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={intentData}>
                <XAxis dataKey="intent" tick={{ fontSize: 9, fill: '#9ca3af' }} />
                <YAxis hide />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} animationDuration={1500} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Regional Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900/60 border border-gray-800/50 rounded-xl p-6 mb-8"
        >
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
            🗺️ Regional Heatmap
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {supervisorMetrics.regionalHeatmap.map((region, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`rounded-xl p-3 border cursor-default ${
                  region.risk === 'critical'
                    ? 'bg-red-950/50 border-red-500/40 shadow-lg shadow-red-500/10'
                    : region.risk === 'high'
                    ? 'bg-red-950/30 border-red-500/20'
                    : region.risk === 'medium'
                    ? 'bg-amber-950/30 border-amber-500/20'
                    : 'bg-green-950/30 border-green-500/20'
                }`}
              >
                <p className="text-xs font-bold text-gray-200">{region.region}</p>
                <p className="text-lg font-black" style={{ color: RISK_COLORS[region.risk] || '#22c55e' }}>
                  {region.conversations}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: SENTIMENT_COLORS[region.sentiment] || '#84cc16' }} />
                  <span className="text-[9px] text-gray-500">{region.sentiment}</span>
                </div>
                {region.risk === 'critical' && (
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-[9px] text-red-400 font-bold mt-1"
                  >
                    ⚠️ CRITICAL
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* High Risk Customers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-900/60 border border-gray-800/50 rounded-xl p-6"
        >
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
            ⚠️ High Risk Customers — Immediate Action Required
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800/50">
                  <th className="text-left py-2 text-[10px] text-gray-500 uppercase">Customer</th>
                  <th className="text-left py-2 text-[10px] text-gray-500 uppercase">Language</th>
                  <th className="text-left py-2 text-[10px] text-gray-500 uppercase">Risk</th>
                  <th className="text-left py-2 text-[10px] text-gray-500 uppercase">Reason</th>
                  <th className="text-left py-2 text-[10px] text-gray-500 uppercase">Sentiment</th>
                  <th className="text-left py-2 text-[10px] text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {demoCustomers
                  .filter(c => c.churnRisk >= 0.6)
                  .sort((a, b) => b.churnRisk - a.churnRisk)
                  .map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.05 }}
                      className="border-b border-gray-800/30 hover:bg-gray-800/20"
                    >
                      <td className="py-2 text-gray-300">{c.name}</td>
                      <td className="py-2 text-gray-400">{c.language}</td>
                      <td className="py-2">
                        <span className={`font-bold ${c.churnRisk >= 0.7 ? 'text-red-400' : 'text-amber-400'}`}>
                          {Math.round(c.churnRisk * 100)}%
                        </span>
                      </td>
                      <td className="py-2 text-gray-500 text-xs max-w-[200px] truncate">{c.churnReason}</td>
                      <td className="py-2 text-gray-400">{c.sentiment}</td>
                      <td className="py-2">
                        <Link href="/dashboard">
                          <button className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white rounded px-2 py-1 transition-colors">
                            Open →
                          </button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
