'use client';

import { motion } from 'framer-motion';

interface Props {
  agentId?: string;
  connected: boolean;
}

export default function HandoffBanner({ agentId, connected }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      className={`mx-3 mb-2 rounded-xl p-3 border ${
        connected
          ? 'bg-emerald-950/40 border-emerald-500/30'
          : 'bg-amber-950/40 border-amber-500/30'
      }`}
    >
      <div className="flex items-center gap-2">
        {connected ? (
          <>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2.5 h-2.5 bg-emerald-500 rounded-full"
            />
            <span className="text-xs font-bold text-emerald-300">
              Live Agent Connected — {agentId || 'Agent A045'}
            </span>
          </>
        ) : (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full"
            />
            <span className="text-xs font-bold text-amber-300">
              Connecting you to a live agent...
            </span>
          </>
        )}
      </div>
      {connected && (
        <p className="text-[10px] text-emerald-400/70 mt-1 ml-4">
          Full chat history has been shared with the agent. No need to repeat yourself.
        </p>
      )}
    </motion.div>
  );
}
