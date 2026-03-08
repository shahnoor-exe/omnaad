'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  region: string;
  type: string;
  spike: string;
  affected: number;
  message: string;
  onDismiss?: () => void;
}

export default function AnomalyAlert({ region, type, spike, affected, message, onDismiss }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        className="bg-red-950/60 backdrop-blur-sm border border-red-500/50 rounded-2xl p-5 shadow-2xl relative overflow-hidden"
      >
        {/* Animated background pulse */}
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10"
        />

        <div className="relative z-10">
          <div className="text-xs text-blue-400 font-mono mb-3 bg-blue-950/50 border border-blue-700/30 rounded-lg px-3 py-1 inline-block">
            🔬 DEMO: Mock alert | ⚡ PRODUCTION: Apache Kafka anomaly detection + Elasticsearch
          </div>

          <div className="flex items-start gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-3xl"
            >
              ⚠️
            </motion.div>

            <div className="flex-1">
              <h3 className="text-red-400 font-bold text-lg mb-1">Anomaly Detected — {region}</h3>
              <p className="text-red-200 text-sm mb-3">{message}</p>

              <div className="flex flex-wrap gap-3">
                <div className="bg-red-900/50 rounded-lg px-3 py-1.5 border border-red-500/30">
                  <p className="text-[10px] text-red-400 uppercase tracking-wider">Spike</p>
                  <p className="text-lg font-black text-red-300">{spike}</p>
                </div>
                <div className="bg-red-900/50 rounded-lg px-3 py-1.5 border border-red-500/30">
                  <p className="text-[10px] text-red-400 uppercase tracking-wider">Affected</p>
                  <p className="text-lg font-black text-red-300">{affected} customers</p>
                </div>
                <div className="bg-red-900/50 rounded-lg px-3 py-1.5 border border-red-500/30">
                  <p className="text-[10px] text-red-400 uppercase tracking-wider">Type</p>
                  <p className="text-lg font-black text-red-300">{type.replace('_', ' ')}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-3 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg px-4 py-2 transition-colors"
                onClick={onDismiss}
              >
                🚀 Trigger Bulk Outreach ({affected} personalized SMS)
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
