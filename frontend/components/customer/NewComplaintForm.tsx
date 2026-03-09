'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  'Account Issue', 'Transaction Dispute', 'Loan Inquiry', 'Card Problem',
  'Internet Banking', 'Mobile App Bug', 'Branch Service', 'Fraud Report', 'Other',
];

const channels = [
  { id: 'chat', label: 'Chat', icon: '💬' },
  { id: 'email', label: 'Email', icon: '📧' },
  { id: 'call', label: 'Call Back', icon: '📞' },
];

interface Props {
  onSubmit: (data: { category: string; subject: string; description: string; channel: string }) => void;
}

export default function NewComplaintForm({ onSubmit }: Props) {
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [channel, setChannel] = useState('chat');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = () => {
    if (!category || !subject || !description) return;
    const id = `BOI-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setTicketId(id);
    setSubmitted(true);
    onSubmit({ category, subject, description, channel });
  };

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5">Category</label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-[11px] rounded-full px-3 py-1 border transition-all ${
                    category === cat
                      ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                      : 'bg-gray-800/40 border-gray-700/30 text-gray-500 hover:text-gray-300 hover:border-gray-600/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of your issue..."
              className="w-full bg-gray-800/40 border border-gray-700/30 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Please provide details about your issue..."
              className="w-full bg-gray-800/40 border border-gray-700/30 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-blue-500/50 transition-colors resize-none"
            />
          </div>

          {/* Preferred Channel */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1.5">Preferred Response Channel</label>
            <div className="flex gap-2">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setChannel(ch.id)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-all ${
                    channel === ch.id
                      ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                      : 'bg-gray-800/40 border-gray-700/30 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <span>{ch.icon}</span>
                  {ch.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!category || !subject || !description}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold rounded-xl disabled:opacity-30 transition-opacity"
          >
            Submit Complaint
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 bg-emerald-950/50 border border-emerald-500/30 rounded-full flex items-center justify-center text-3xl"
          >
            ✓
          </motion.div>
          <h3 className="text-lg font-bold text-emerald-400 mb-1">Complaint Registered</h3>
          <p className="text-xs text-gray-500 mb-3">Your ticket has been created and assigned</p>
          <div className="inline-block bg-gray-800/60 border border-gray-700/30 rounded-lg px-4 py-2">
            <p className="text-[10px] text-gray-600">Ticket ID</p>
            <p className="text-sm font-mono font-bold text-blue-400">{ticketId}</p>
          </div>
          <p className="text-[10px] text-gray-600 mt-3">
            Expected response: Within 24 hours via {channel}
          </p>
          <button
            onClick={() => { setSubmitted(false); setCategory(''); setSubject(''); setDescription(''); }}
            className="mt-4 text-xs text-blue-400 hover:text-blue-300 transition-colors underline"
          >
            File Another Complaint
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
