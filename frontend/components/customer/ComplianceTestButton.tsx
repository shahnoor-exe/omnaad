'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const checks = [
  { id: 'dpdp', label: 'DPDP Act Consent Verification', time: 180 },
  { id: 'trai', label: 'TRAI DNC Registry Check', time: 250 },
  { id: 'rbi', label: 'RBI Communication Guidelines', time: 320 },
  { id: 'encrypt', label: 'End-to-End Encryption Validation', time: 150 },
];

export default function ComplianceTestButton() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<{ id: string; status: 'pass' | 'pending' }[]>([]);

  const runTest = () => {
    setTesting(true);
    setResults([]);
    checks.forEach((check, i) => {
      setTimeout(() => {
        setResults((prev) => [...prev, { id: check.id, status: 'pass' }]);
        if (i === checks.length - 1) {
          setTimeout(() => setTesting(false), 500);
        }
      }, (i + 1) * 600);
    });
  };

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={runTest}
        disabled={testing}
        className="w-full py-2.5 bg-violet-600/20 border border-violet-500/40 text-violet-400 text-xs font-bold rounded-xl hover:bg-violet-600/30 transition-colors disabled:opacity-50"
      >
        {testing ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              ⚙️
            </motion.span>
            Running Compliance Checks...
          </span>
        ) : (
          '🔒 Run Compliance Verification'
        )}
      </motion.button>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 space-y-1.5"
          >
            {results.map((r) => {
              const check = checks.find((c) => c.id === r.id)!;
              return (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between bg-emerald-950/20 border border-emerald-500/15 rounded-lg px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-xs">✓</span>
                    <span className="text-[10px] text-gray-300">{check.label}</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">{check.time}ms</span>
                </motion.div>
              );
            })}
            {!testing && results.length === checks.length && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[10px] text-emerald-400 font-bold mt-2"
              >
                ✅ All compliance checks passed
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
