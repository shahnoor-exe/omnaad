'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function SaveConfirmBanner({ show, onClose }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          className="fixed top-14 left-0 right-0 z-40"
        >
          <div className="max-w-4xl mx-auto px-4 py-2">
            <div className="bg-emerald-950/80 border border-emerald-500/30 rounded-xl px-4 py-3 backdrop-blur-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-lg"
                >
                  ✅
                </motion.span>
                <div>
                  <p className="text-xs font-bold text-emerald-300">Preferences Saved Successfully</p>
                  <p className="text-[9px] text-emerald-400/60">Changes synced to DPDP Consent DB · Kafka event published</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-emerald-400/60 hover:text-emerald-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
