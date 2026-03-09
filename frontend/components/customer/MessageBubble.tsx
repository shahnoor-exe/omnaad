'use client';

import { motion } from 'framer-motion';

interface Props {
  message: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: string;
  intent?: string;
  sentiment?: string;
}

const sentimentEmoji: Record<string, string> = {
  positive: '😊', neutral: '😐', stressed: '😟', angry: '😠', urgent: '🚨',
};

const intentColors: Record<string, string> = {
  complaint: 'bg-red-950/50 text-red-400 border-red-500/30',
  query: 'bg-gray-800/50 text-gray-400 border-gray-600/30',
  loan_inquiry: 'bg-blue-950/50 text-blue-400 border-blue-500/30',
  fraud_alert: 'bg-purple-950/50 text-purple-400 border-purple-500/30',
  greeting: 'bg-emerald-950/50 text-emerald-400 border-emerald-500/30',
  escalation: 'bg-orange-950/50 text-orange-400 border-orange-500/30',
};

export default function MessageBubble({ message, sender, timestamp, intent, sentiment }: Props) {
  const isUser = sender === 'user';
  const isAgent = sender === 'agent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-1'}`}>
        {/* Sender label */}
        <div className={`flex items-center gap-1.5 mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          {!isUser && (
            <span className="text-[10px] font-bold text-blue-400">
              {isAgent ? '👤 Live Agent' : '🤖 OmNaad AI'}
            </span>
          )}
          {sentiment && !isUser && (
            <span className="text-xs">{sentimentEmoji[sentiment] || '😐'}</span>
          )}
          {intent && !isUser && (
            <span className={`text-[9px] font-bold rounded-full px-1.5 py-0.5 border ${intentColors[intent] || intentColors.query}`}>
              {intent.replace('_', ' ').toUpperCase()}
            </span>
          )}
        </div>

        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-br-md'
              : isAgent
              ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-100 rounded-bl-md'
              : 'bg-gray-800/80 border border-gray-700/30 text-gray-200 rounded-bl-md'
          }`}
        >
          {message}
        </div>

        {/* Timestamp */}
        <p className={`text-[9px] text-gray-600 mt-0.5 ${isUser ? 'text-right' : 'text-left'}`}>
          {timestamp}
        </p>
      </div>
    </motion.div>
  );
}
