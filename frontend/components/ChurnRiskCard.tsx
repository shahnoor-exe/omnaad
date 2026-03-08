'use client';

import { motion } from 'framer-motion';

interface Props {
  churnRisk: number;
  churnReason: string;
  customerName: string;
}

export default function ChurnRiskCard({ churnRisk, churnReason, customerName }: Props) {
  const riskColor = churnRisk >= 0.7 ? '#ef4444' : churnRisk >= 0.4 ? '#f59e0b' : '#22c55e';
  const riskLabel = churnRisk >= 0.7 ? 'HIGH RISK' : churnRisk >= 0.4 ? 'MEDIUM RISK' : 'LOW RISK';
  const riskBg = churnRisk >= 0.7 ? 'bg-red-950/50 border-red-500/30' : churnRisk >= 0.4 ? 'bg-amber-950/50 border-amber-500/30' : 'bg-green-950/50 border-green-500/30';

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 shadow-2xl">
      <div className="text-xs text-blue-400 font-mono mb-3 bg-blue-950/50 border border-blue-700/30 rounded-lg px-3 py-1">
        🔬 DEMO: Rule-based score | ⚡ PRODUCTION: XGBoost + BERT signals | Apache Airflow retraining
      </div>

      <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
        Churn Risk Score
      </h3>

      {/* Risk gauge bar */}
      <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${churnRisk * 100}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, #22c55e, #f59e0b, #ef4444)`,
            boxShadow: `0 0 12px ${riskColor}50`,
          }}
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-2xl font-black"
          style={{ color: riskColor, textShadow: `0 0 16px ${riskColor}40` }}
        >
          {Math.round(churnRisk * 100)}%
        </motion.span>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
          className={`text-xs font-bold rounded-full px-3 py-1 border ${riskBg}`}
          style={{ color: riskColor }}
        >
          {riskLabel}
        </motion.span>
      </div>

      {/* Reason */}
      <div className="bg-gray-950/60 rounded-xl p-3 border border-gray-700/30">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Churn Reason</p>
        <p className="text-sm text-gray-300">{churnReason}</p>
      </div>

      {/* Recommended action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-3 bg-violet-950/30 border border-violet-500/20 rounded-xl p-3"
      >
        <p className="text-[10px] text-violet-400 uppercase tracking-wider mb-1">Recommended Action</p>
        <p className="text-sm text-violet-200">
          {churnRisk >= 0.7
            ? `Immediate personal outreach to ${customerName.split(' ')[0]} via preferred channel`
            : churnRisk >= 0.4
            ? `Schedule proactive check-in within 48 hours`
            : `No immediate action needed — monitor monthly`}
        </p>
      </motion.div>
    </div>
  );
}
