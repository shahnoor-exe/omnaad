'use client';

import { motion } from 'framer-motion';

interface Props {
  label: string;
  description: string;
  enabled: boolean;
  locked?: boolean;
  onChange: (val: boolean) => void;
}

export default function ConsentToggle({ label, description, enabled, locked, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
        locked
          ? 'bg-gray-800/20 border-gray-700/20'
          : enabled
          ? 'bg-emerald-950/20 border-emerald-500/20'
          : 'bg-gray-900/40 border-gray-800/40'
      }`}
    >
      <div className="flex-1 mr-4">
        <div className="flex items-center gap-2">
          <p className={`text-xs font-bold ${enabled ? 'text-gray-200' : 'text-gray-500'}`}>{label}</p>
          {locked && (
            <span className="text-[8px] bg-amber-950/50 text-amber-400 border border-amber-500/30 rounded px-1 py-0.5 font-bold">
              REQUIRED
            </span>
          )}
        </div>
        <p className="text-[10px] text-gray-600 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => !locked && onChange(!enabled)}
        disabled={locked}
        className="relative flex-shrink-0"
      >
        <div className={`w-10 h-5 rounded-full transition-colors ${
          enabled ? 'bg-emerald-600' : 'bg-gray-700'
        } ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
          <motion.div
            animate={{ x: enabled ? 20 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
          />
        </div>
      </button>
    </motion.div>
  );
}
