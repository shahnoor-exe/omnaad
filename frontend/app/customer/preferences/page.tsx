'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LanguageSelector from '../../../components/customer/LanguageSelector';
import ChannelSelector from '../../../components/customer/ChannelSelector';
import ConsentToggle from '../../../components/customer/ConsentToggle';
import DNDTimePicker from '../../../components/customer/DNDTimePicker';
import WithdrawalConfirmModal from '../../../components/customer/WithdrawalConfirmModal';
import SaveConfirmBanner from '../../../components/customer/SaveConfirmBanner';
import ComplianceTestButton from '../../../components/customer/ComplianceTestButton';

export default function PreferencesPage() {
  const [language, setLanguage] = useState('en');
  const [channels, setChannels] = useState(['whatsapp', 'email', 'push']);
  const [consents, setConsents] = useState({
    transactional: true,
    marketing: true,
    promotional: false,
    research: false,
    thirdParty: false,
  });
  const [dnd, setDnd] = useState({ enabled: true, start: '22:00', end: '07:00' });
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3500);
  };

  const handleWithdraw = () => {
    setConsents({ transactional: true, marketing: false, promotional: false, research: false, thirdParty: false });
    setWithdrawn(true);
    setShowWithdrawal(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <SaveConfirmBanner show={showSaved} onClose={() => setShowSaved(false)} />
      <WithdrawalConfirmModal open={showWithdrawal} onConfirm={handleWithdraw} onCancel={() => setShowWithdrawal(false)} />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              OmNaad
            </span>
            <span className="text-[10px] font-mono bg-blue-950 border border-blue-700 text-blue-300 rounded px-1.5 py-0.5">
              Preference Centre
            </span>
          </Link>
          <div className="flex gap-3 text-xs">
            <Link href="/customer/chat" className="text-gray-400 hover:text-blue-400 transition-colors">Chat</Link>
            <Link href="/customer/portal" className="text-gray-400 hover:text-blue-400 transition-colors">Portal</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors">Agent View</Link>
          </div>
        </div>
      </nav>

      <div className="pt-14 max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Preference Centre
            </span>
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Control how Bank of India communicates with you. Your preferences are protected under the DPDP Act.
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Section 1 — Language */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/40 border border-gray-800/40 rounded-2xl p-5"
          >
            <h2 className="text-sm font-bold text-gray-200 mb-4 flex items-center gap-2">
              🌐 Language
            </h2>
            <LanguageSelector selected={language} onChange={setLanguage} />
          </motion.section>

          {/* Section 2 — Channels */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/40 border border-gray-800/40 rounded-2xl p-5"
          >
            <h2 className="text-sm font-bold text-gray-200 mb-4 flex items-center gap-2">
              📡 Communication Channels
            </h2>
            <ChannelSelector selected={channels} onChange={setChannels} />
          </motion.section>

          {/* Section 3 — Consent Toggles */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/40 border border-gray-800/40 rounded-2xl p-5"
          >
            <h2 className="text-sm font-bold text-gray-200 mb-4 flex items-center gap-2">
              🔐 Consent Management
            </h2>
            <div className="space-y-2">
              <ConsentToggle
                label="Transactional Alerts"
                description="OTP, balance alerts, transaction confirmations — required by RBI"
                enabled={consents.transactional}
                locked={true}
                onChange={() => {}}
              />
              <ConsentToggle
                label="Marketing Communications"
                description="Product offers, rate changes, and personalized recommendations"
                enabled={consents.marketing}
                onChange={(v) => setConsents({ ...consents, marketing: v })}
              />
              <ConsentToggle
                label="Promotional Offers"
                description="Special deals, festive offers, partner promotions"
                enabled={consents.promotional}
                onChange={(v) => setConsents({ ...consents, promotional: v })}
              />
              <ConsentToggle
                label="Research & Surveys"
                description="Feedback requests, NPS surveys, product research"
                enabled={consents.research}
                onChange={(v) => setConsents({ ...consents, research: v })}
              />
              <ConsentToggle
                label="Third-Party Sharing"
                description="Share preferences with BOI partner services"
                enabled={consents.thirdParty}
                onChange={(v) => setConsents({ ...consents, thirdParty: v })}
              />
            </div>

            {/* DPDP compliance note */}
            <div className="mt-3 text-[9px] font-mono bg-blue-950/40 border border-blue-700/30 rounded px-3 py-1.5 text-blue-300">
              DPDP Act § 6(6) · Consent granularity with per-purpose toggles · TRAI DNC Registry enforced · Audit trail maintained
            </div>
          </motion.section>

          {/* Section 4 — DND */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <DNDTimePicker
              startTime={dnd.start}
              endTime={dnd.end}
              onStartChange={(v) => setDnd({ ...dnd, start: v })}
              onEndChange={(v) => setDnd({ ...dnd, end: v })}
              enabled={dnd.enabled}
              onToggle={(v) => setDnd({ ...dnd, enabled: v })}
            />
          </motion.section>

          {/* Section 5 — Compliance Test */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-900/40 border border-gray-800/40 rounded-2xl p-5"
          >
            <h2 className="text-sm font-bold text-gray-200 mb-4 flex items-center gap-2">
              🛡️ Compliance Verification
            </h2>
            <p className="text-[10px] text-gray-500 mb-3">
              Run a real-time compliance check to verify your preferences meet all regulatory requirements.
            </p>
            <ComplianceTestButton />
          </motion.section>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold rounded-xl"
            >
              Save Preferences
            </motion.button>
            {!withdrawn && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowWithdrawal(true)}
                className="py-3 px-6 bg-red-950/30 border border-red-500/30 text-red-400 text-sm font-bold rounded-xl hover:bg-red-950/50 transition-colors"
              >
                Withdraw All Consent
              </motion.button>
            )}
          </motion.div>

          {withdrawn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-amber-950/30 border border-amber-500/20 rounded-xl p-4 text-center"
            >
              <p className="text-xs text-amber-300 font-bold">Consent Withdrawn</p>
              <p className="text-[10px] text-amber-400/60 mt-1">
                All non-essential communications stopped. Transactional alerts remain active per RBI mandate.
              </p>
            </motion.div>
          )}

          {/* Demo footer label */}
          <div className="text-center pb-6">
            <div className="inline-block text-xs font-mono bg-blue-950/60 border border-blue-700/30 rounded-lg px-4 py-2 text-blue-300">
              DPDP Consent DB + TRAI DNC API + 30 RBI Rules · Apache Kafka preference sync · End-to-End Encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
