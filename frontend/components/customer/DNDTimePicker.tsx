'use client';

import { motion } from 'framer-motion';

interface Props {
  startTime: string;
  endTime: string;
  onStartChange: (val: string) => void;
  onEndChange: (val: string) => void;
  enabled: boolean;
  onToggle: (val: boolean) => void;
}

export default function DNDTimePicker({ startTime, endTime, onStartChange, onEndChange, enabled, onToggle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`rounded-xl border p-4 transition-all ${
        enabled ? 'bg-violet-950/20 border-violet-500/20' : 'bg-gray-900/40 border-gray-800/40'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-bold text-gray-300">🌙 Do Not Disturb</p>
          <p className="text-[10px] text-gray-600">Block non-urgent notifications during this window</p>
        </div>
        <button onClick={() => onToggle(!enabled)} className="relative flex-shrink-0">
          <div className={`w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-violet-600' : 'bg-gray-700'}`}>
            <motion.div
              animate={{ x: enabled ? 20 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
            />
          </div>
        </button>
      </div>

      {enabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center gap-3"
        >
          <div className="flex-1">
            <label className="block text-[10px] text-gray-600 mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => onStartChange(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700/30 rounded-lg px-3 py-1.5 text-xs text-gray-200 outline-none focus:border-violet-500/50"
            />
          </div>
          <span className="text-gray-600 mt-4">→</span>
          <div className="flex-1">
            <label className="block text-[10px] text-gray-600 mb-1">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => onEndChange(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700/30 rounded-lg px-3 py-1.5 text-xs text-gray-200 outline-none focus:border-violet-500/50"
            />
          </div>
        </motion.div>
      )}

      <p className="text-[9px] font-mono text-violet-300/50 mt-2">
        TRAI DNC Registry compliant · Automated enforcement via Apache Kafka scheduler
      </p>
    </motion.div>
  );
}
