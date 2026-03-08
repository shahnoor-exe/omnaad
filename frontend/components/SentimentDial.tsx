'use client';
// DEMO: Animates on state change using Framer Motion
// PRODUCTION: Updates in real-time via WebSocket from RoBERTa inference stream

import { motion } from 'framer-motion';

const SENTIMENTS: Record<string, { angle: number; color: string; label: string }> = {
  positive: { angle: -80, color: '#22c55e', label: '😊 Positive' },
  neutral:  { angle: -40, color: '#84cc16', label: '😐 Neutral' },
  stressed: { angle: 0,   color: '#f59e0b', label: '😟 Stressed' },
  angry:    { angle: 40,  color: '#ef4444', label: '😠 Angry' },
  urgent:   { angle: 80,  color: '#7c3aed', label: '🚨 Urgent' },
};

export default function SentimentDial({ currentSentiment }: { currentSentiment: string }) {
  const config = SENTIMENTS[currentSentiment] || SENTIMENTS.neutral;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl">
      {/* Production label */}
      <div className="text-xs text-blue-400 mb-3 font-mono bg-blue-950/50 border border-blue-700/30 rounded-lg px-3 py-1">
        🔬 DEMO: Mock data | ⚡ PRODUCTION: RoBERTa fine-tuned | Real-time WebSocket | &lt;200ms
      </div>

      {/* Gauge SVG */}
      <svg width="220" height="130" viewBox="0 0 220 130">
        {/* Background arc */}
        <path d="M 20 110 A 90 90 0 0 1 200 110"
              fill="none" stroke="#374151" strokeWidth="14" strokeLinecap="round" />
        {/* Colored arc */}
        <motion.path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke={config.color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="283"
          animate={{
            strokeDashoffset: 283 - ((config.angle + 80) / 160) * 283,
          }}
          transition={{ type: 'spring', stiffness: 40, damping: 15 }}
        />
        {/* Tick marks */}
        {[-80, -40, 0, 40, 80].map((a, i) => {
          const rad = ((a - 90) * Math.PI) / 180;
          const outerR = 95;
          const innerR = 82;
          return (
            <line
              key={i}
              x1={110 + outerR * Math.cos(rad * 0.55 + Math.PI)}
              y1={110 + outerR * Math.sin(rad * 0.55 + Math.PI)}
              x2={110 + innerR * Math.cos(rad * 0.55 + Math.PI)}
              y2={110 + innerR * Math.sin(rad * 0.55 + Math.PI)}
              stroke="#6b7280"
              strokeWidth="2"
            />
          );
        })}
        {/* Needle */}
        <motion.line
          x1="110" y1="110" x2="110" y2="30"
          stroke={config.color}
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ rotate: config.angle }}
          transition={{ type: 'spring', stiffness: 60, damping: 12 }}
          style={{ originX: '110px', originY: '110px', filter: `drop-shadow(0 0 6px ${config.color})` }}
        />
        {/* Center dot */}
        <motion.circle
          cx="110" cy="110" r="8"
          fill={config.color}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ filter: `drop-shadow(0 0 8px ${config.color})` }}
        />
      </svg>

      {/* Label */}
      <motion.div
        key={currentSentiment}
        initial={{ scale: 0.5, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-xl font-bold mt-3"
        style={{ color: config.color, textShadow: `0 0 20px ${config.color}40` }}
      >
        {config.label}
      </motion.div>
    </div>
  );
}
