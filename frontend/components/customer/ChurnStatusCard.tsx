'use client';

import { motion } from 'framer-motion';

interface Props {
  score: number; // 0-100
  label: string;
  riskLevel: 'low' | 'medium' | 'high';
  factors: string[];
}

const riskConfig = {
  low: { color: 'text-emerald-400', bar: 'from-emerald-500 to-green-500', bg: 'bg-emerald-950/30 border-emerald-500/20', emoji: '🟢' },
  medium: { color: 'text-amber-400', bar: 'from-amber-500 to-yellow-500', bg: 'bg-amber-950/30 border-amber-500/20', emoji: '🟡' },
  high: { color: 'text-red-400', bar: 'from-red-500 to-rose-500', bg: 'bg-red-950/30 border-red-500/20', emoji: '🔴' },
};

export default function ChurnStatusCard({ score, label, riskLevel, factors }: Props) {
  const cfg = riskConfig[riskLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-4 ${cfg.bg}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{cfg.emoji}</span>
          <div>
            <p className="text-xs font-bold text-gray-300">Relationship Health</p>
            <p className={`text-[10px] ${cfg.color}`}>{label}</p>
          </div>
        </div>
        <span className={`text-2xl font-bold ${cfg.color}`}>{score}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${cfg.bar} rounded-full`}
        />
      </div>

      {/* Factors */}
      <div className="space-y-1">
        <p className="text-[10px] text-gray-600 font-bold">Contributing Factors</p>
        {factors.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center gap-1.5 text-[10px] text-gray-500"
          >
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            {f}
          </motion.div>
        ))}
      </div>

      <div className="mt-3 text-[9px] font-mono bg-blue-950/40 border border-blue-700/30 rounded px-2 py-1 text-blue-300">
        XGBoost + BERT behavioral signals | Apache Airflow pipeline
      </div>
    </motion.div>
  );
}
