'use client';
// DEMO: Shows pre-written draft with typing animation
// PRODUCTION: LLaMA 3 8B via Ollama with Neo4j memory graph context

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  draft: string;
  language: string;
  poweredBy: string;
  generatedIn: string;
  contextUsed: string[];
}

export default function AutoDraftBox({ draft, language, poweredBy, generatedIn, contextUsed }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const words = draft.split(' ');
    const interval = setInterval(() => {
      if (i < words.length) {
        setDisplayedText(prev => prev + (i > 0 ? ' ' : '') + words[i]);
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [draft]);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 shadow-2xl">
      <div className="text-xs font-mono bg-blue-950 border border-blue-700 rounded px-2 py-1 text-blue-300 mb-3">
        🔬 DEMO: Template matching  |  ⚡ PRODUCTION: LLaMA 3 8B via Ollama | Self-hosted | RBI Compliant
      </div>
      <div className="text-xs font-mono bg-blue-950 border border-blue-700 rounded px-2 py-1 text-blue-300 mb-3">
        🧠 CONTEXT: Neo4j Memory Graph | Customer relationship context | Cross-channel history
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
          AI Auto-Draft
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-violet-950/50 border border-violet-500/30 text-violet-300 rounded-full px-2 py-0.5">
            {language}
          </span>
          <span className="text-xs bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 rounded-full px-2 py-0.5">
            ⚡ {generatedIn}
          </span>
        </div>
      </div>

      {/* Draft text area */}
      <div className="bg-gray-950/80 rounded-xl p-4 min-h-[120px] border border-gray-700/30 relative">
        <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
          {displayedText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="inline-block w-0.5 h-4 bg-violet-400 ml-1 align-text-bottom"
            />
          )}
        </p>
      </div>

      {/* Context chips */}
      <div className="mt-3">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">Context Used:</p>
        <div className="flex flex-wrap gap-1.5">
          {contextUsed.map((ctx, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] bg-gray-800/80 border border-gray-600/30 text-gray-400 rounded-full px-2 py-0.5"
            >
              {ctx}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Powered by badge */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-[10px] bg-gradient-to-r from-violet-950/50 to-blue-950/50 border border-violet-500/20 text-violet-300 rounded-full px-3 py-1">
          🤖 Powered by {poweredBy}
        </span>
      </div>
    </div>
  );
}
