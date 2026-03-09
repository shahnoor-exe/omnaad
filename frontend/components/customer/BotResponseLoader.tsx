'use client';

import { motion } from 'framer-motion';

export default function BotResponseLoader() {
  return (
    <div className="flex justify-start mb-3">
      <div className="max-w-[80%]">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-bold text-blue-400">🤖 OmNaad AI</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800/80 border border-gray-700/30 rounded-2xl rounded-bl-md px-4 py-3 space-y-2"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              className={`h-3 bg-gray-700 rounded-full ${i === 3 ? 'w-2/3' : 'w-full'}`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
