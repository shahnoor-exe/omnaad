'use client';

import { motion } from 'framer-motion';

type Status = 'open' | 'in_progress' | 'resolved' | 'escalated' | 'closed';

const statusConfig: Record<Status, { bg: string; text: string; dot: string; label: string }> = {
  open: { bg: 'bg-blue-950/50 border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-400', label: 'Open' },
  in_progress: { bg: 'bg-amber-950/50 border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-400', label: 'In Progress' },
  resolved: { bg: 'bg-emerald-950/50 border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'Resolved' },
  escalated: { bg: 'bg-red-950/50 border-red-500/30', text: 'text-red-400', dot: 'bg-red-400', label: 'Escalated' },
  closed: { bg: 'bg-gray-800/50 border-gray-600/30', text: 'text-gray-400', dot: 'bg-gray-400', label: 'Closed' },
};

export default function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status] || statusConfig.open;
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold border rounded-full px-2 py-0.5 ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </motion.span>
  );
}
