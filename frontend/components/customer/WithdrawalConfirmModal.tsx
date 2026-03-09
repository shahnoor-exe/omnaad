'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function WithdrawalConfirmModal({ open, onConfirm, onCancel }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm mx-4 bg-gray-900 border border-red-500/30 rounded-2xl p-6"
          >
            <div className="text-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-14 h-14 mx-auto mb-3 bg-red-950/50 border border-red-500/30 rounded-full flex items-center justify-center text-2xl"
              >
                ⚠️
              </motion.div>
              <h3 className="text-base font-bold text-red-400">Withdraw All Consent?</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                This will withdraw your consent for all marketing & promotional communications. 
                Transactional messages (OTP, alerts) will continue as required by RBI regulations.
              </p>
            </div>

            <div className="bg-red-950/30 border border-red-500/20 rounded-lg p-3 mb-4">
              <p className="text-[10px] text-red-300/80 leading-relaxed">
                <span className="font-bold">DPDP Act Compliance:</span> Per Section 6(6), you have the right to withdraw consent at any time. 
                Withdrawal will be processed within 72 hours and recorded in our DPDP Consent Database.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onCancel}
                className="flex-1 py-2.5 bg-gray-800 text-gray-400 text-xs font-bold rounded-xl hover:bg-gray-700 transition-colors"
              >
                Keep My Consent
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className="flex-1 py-2.5 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-500 transition-colors"
              >
                Withdraw Now
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
