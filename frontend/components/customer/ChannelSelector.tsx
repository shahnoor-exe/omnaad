'use client';

import { motion } from 'framer-motion';

const channels = [
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬', desc: 'Messages via WhatsApp Business API' },
  { id: 'sms', label: 'SMS', icon: '📩', desc: 'Text messages to registered mobile' },
  { id: 'email', label: 'Email', icon: '✉️', desc: 'Communications to registered email' },
  { id: 'ivr', label: 'IVR / Call', icon: '📞', desc: 'Voice calls from BOI contact center' },
  { id: 'push', label: 'Push Notification', icon: '🔔', desc: 'Mobile app push notifications' },
  { id: 'branch', label: 'Branch Visit', icon: '🏦', desc: 'In-person branch communications' },
];

interface Props {
  selected: string[];
  onChange: (channels: string[]) => void;
}

export default function ChannelSelector({ selected, onChange }: Props) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((c) => c !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 mb-2">Preferred Channels</label>
      <div className="grid sm:grid-cols-2 gap-2">
        {channels.map((ch, i) => {
          const active = selected.includes(ch.id);
          return (
            <motion.button
              key={ch.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(ch.id)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl border text-left transition-all ${
                active
                  ? 'bg-blue-600/15 border-blue-500/50'
                  : 'bg-gray-900/40 border-gray-800/40 hover:border-gray-700/50'
              }`}
            >
              <span className="text-xl">{ch.icon}</span>
              <div className="flex-1">
                <p className={`text-xs font-bold ${active ? 'text-blue-400' : 'text-gray-300'}`}>{ch.label}</p>
                <p className="text-[9px] text-gray-600">{ch.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                active ? 'bg-blue-600 border-blue-500' : 'border-gray-700'
              }`}>
                {active && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
