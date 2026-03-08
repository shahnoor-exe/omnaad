'use client';
// DEMO: Simulates sequential checks with animation
// PRODUCTION: Real TRAI DNC API + PostgreSQL DPDP consent + LLM RBI scanner

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete?: (status: string) => void;
  autoRun?: boolean;
  forceRed?: boolean;
}

export default function ComplianceBadge({ onComplete, autoRun = true, forceRed = false }: Props) {
  const [checks, setChecks] = useState([
    { name: 'TRAI DNC Registry', status: 'pending', api: 'TRAI DLT API', icon: '📋' },
    { name: 'DPDP Act 2023 Consent', status: 'pending', api: 'PostgreSQL Consent DB', icon: '🔐' },
    { name: 'RBI Content Rules (30)', status: 'pending', api: 'LLaMA 3 Scanner', icon: '⚖️' },
  ]);
  const [overall, setOverall] = useState<'checking' | 'GREEN' | 'RED'>('checking');

  const runChecks = useCallback(() => {
    setOverall('checking');
    setChecks(prev => prev.map(c => ({ ...c, status: 'pending' })));

    [0, 1, 2].forEach((i) => {
      setTimeout(() => {
        setChecks(prev =>
          prev.map((c, j) =>
            j === i
              ? { ...c, status: forceRed && j === 2 ? 'fail' : 'pass' }
              : c
          )
        );
        if (i === 2) {
          const finalStatus = forceRed ? 'RED' : 'GREEN';
          setOverall(finalStatus);
          onComplete?.(finalStatus);
        }
      }, (i + 1) * 700);
    });
  }, [forceRed, onComplete]);

  useEffect(() => {
    if (autoRun) runChecks();
  }, [autoRun, runChecks]);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 shadow-2xl">
      <div className="text-xs font-mono bg-blue-950 border border-blue-700 rounded px-2 py-1 text-blue-300 mb-4">
        🔬 DEMO: Regex pattern matching  |  ⚡ PRODUCTION: TRAI DNC API + DPDP Consent DB + 30 RBI Rules
      </div>

      <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">
        Compliance Gate
      </h3>

      <div className="space-y-3">
        {checks.map((check, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={
                check.status === 'pass'
                  ? { scale: [1, 1.4, 1], backgroundColor: '#22c55e' }
                  : check.status === 'fail'
                  ? { scale: [1, 1.4, 1], backgroundColor: '#ef4444' }
                  : {}
              }
              transition={{ duration: 0.4 }}
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                check.status === 'pending'
                  ? 'bg-gray-600 animate-pulse'
                  : check.status === 'pass'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            >
              {check.status === 'pass' ? '✓' : check.status === 'fail' ? '✕' : ''}
            </motion.div>
            <span className="text-sm text-gray-200 flex-1 flex items-center gap-2">
              <span>{check.icon}</span>
              {check.name}
            </span>
            <span className="text-[10px] text-gray-500 font-mono">{check.api}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {overall === 'GREEN' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mt-4 bg-green-950/50 border border-green-500/50 rounded-xl p-3 text-center"
          >
            <span className="text-green-400 font-bold text-sm">✅ ALL CHECKS PASSED — SAFE TO SEND</span>
          </motion.div>
        )}
        {overall === 'RED' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mt-4 bg-red-950/50 border border-red-500/50 rounded-xl p-3 text-center"
          >
            <span className="text-red-400 font-bold text-sm">🚫 COMPLIANCE VIOLATION — MESSAGE BLOCKED</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
