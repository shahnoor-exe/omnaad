'use client';

import { motion } from 'framer-motion';

interface TimelineEvent {
  id: number;
  date: string;
  channel: string;
  channelIcon: string;
  status: string;
  description: string;
  agent?: string;
}

const channelColors: Record<string, string> = {
  WhatsApp: 'from-green-500 to-emerald-600',
  IVR: 'from-orange-500 to-amber-600',
  Email: 'from-blue-500 to-indigo-600',
  Branch: 'from-purple-500 to-violet-600',
  SMS: 'from-cyan-500 to-teal-600',
  'Mobile App': 'from-pink-500 to-rose-600',
};

export default function ComplaintTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-violet-500/30 to-transparent" />

      <div className="space-y-4">
        {events.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 150 }}
            className="relative flex gap-4 pl-2"
          >
            {/* Circle */}
            <div className="relative z-10 flex-shrink-0">
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${channelColors[ev.channel] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-xs`}>
                {ev.channelIcon}
              </div>
            </div>

            {/* Card */}
            <div className="flex-1 bg-gray-900/60 border border-gray-800/50 rounded-xl p-3 hover:border-gray-700/60 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-200">{ev.channel}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    ev.status === 'Resolved' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30' :
                    ev.status === 'Escalated' ? 'bg-red-950/50 text-red-400 border border-red-500/30' :
                    ev.status === 'In Progress' ? 'bg-amber-950/50 text-amber-400 border border-amber-500/30' :
                    'bg-blue-950/50 text-blue-400 border border-blue-500/30'
                  }`}>
                    {ev.status}
                  </span>
                </div>
                <span className="text-[9px] text-gray-600">{ev.date}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{ev.description}</p>
              {ev.agent && (
                <p className="text-[10px] text-gray-600 mt-1">Handled by: {ev.agent}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
