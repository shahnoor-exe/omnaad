'use client';
// DEMO: Static thread display | PRODUCTION: Real-time WebSocket from Kafka

import { motion } from 'framer-motion';
import { ThreadEvent } from '@/lib/mockData';
import { channelIcons, channelColors } from '@/lib/mockData';

interface Props {
  events: ThreadEvent[];
  customerName: string;
}

const sentimentEmojis: Record<string, string> = {
  positive: '😊',
  neutral: '😐',
  stressed: '😟',
  angry: '😠',
  urgent: '🚨',
};

const intentBadgeColors: Record<string, string> = {
  complaint: 'bg-red-950/50 text-red-400 border-red-500/30',
  escalation: 'bg-orange-950/50 text-orange-400 border-orange-500/30',
  loan_inquiry: 'bg-blue-950/50 text-blue-400 border-blue-500/30',
  fraud_alert: 'bg-purple-950/50 text-purple-400 border-purple-500/30',
  closure_request: 'bg-rose-950/50 text-rose-400 border-rose-500/30',
  query: 'bg-gray-800/50 text-gray-400 border-gray-600/30',
};

export default function ConversationThread({ events, customerName }: Props) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 shadow-2xl">
      <div className="text-xs text-blue-400 font-mono mb-3 bg-blue-950/50 border border-blue-700/30 rounded-lg px-3 py-1">
        🔬 DEMO: Static data | ⚡ PRODUCTION: Apache Kafka | Real-time 6-channel event stream
      </div>

      <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
        Omni-Channel Thread — {customerName}
      </h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-amber-500/50 to-red-500/50" />

        <div className="space-y-4">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, type: 'spring', stiffness: 100 }}
              className="relative pl-10"
            >
              {/* Channel icon bubble */}
              <motion.div
                className={`absolute left-0 w-9 h-9 rounded-full flex items-center justify-center text-sm ${channelColors[event.channel] || 'bg-gray-600'} shadow-lg`}
                whileHover={{ scale: 1.2 }}
                style={{
                  boxShadow: `0 0 12px ${event.sentiment === 'angry' ? '#ef444440' : event.sentiment === 'urgent' ? '#7c3aed40' : '#3b82f620'}`,
                }}
              >
                {channelIcons[event.channel] || '💬'}
              </motion.div>

              <div className="bg-gray-950/60 rounded-xl p-3 border border-gray-700/30 ml-2">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] text-gray-500 font-mono">{event.timestamp}</span>
                  <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 border ${intentBadgeColors[event.intent] || intentBadgeColors.query}`}>
                    {event.intent.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-sm">{sentimentEmojis[event.sentiment] || '😐'}</span>
                  {event.agentId && (
                    <span className="text-[10px] text-gray-600 font-mono">Agent: {event.agentId}</span>
                  )}
                  {!event.resolved && (
                    <span className="text-[10px] text-red-400 font-mono">● UNRESOLVED</span>
                  )}
                </div>
                {/* Message */}
                <p className="text-sm text-gray-200 leading-relaxed">{event.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
