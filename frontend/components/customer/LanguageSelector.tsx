'use client';

import { motion } from 'framer-motion';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
];

interface Props {
  selected: string;
  onChange: (code: string) => void;
}

export default function LanguageSelector({ selected, onChange }: Props) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 mb-2">Preferred Language</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {languages.map((lang, i) => (
          <motion.button
            key={lang.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(lang.code)}
            className={`relative text-left px-3 py-2.5 rounded-xl border transition-all ${
              selected === lang.code
                ? 'bg-blue-600/15 border-blue-500/50 ring-1 ring-blue-500/20'
                : 'bg-gray-900/40 border-gray-800/40 hover:border-gray-700/50'
            }`}
          >
            <p className={`text-xs font-bold ${selected === lang.code ? 'text-blue-400' : 'text-gray-300'}`}>{lang.label}</p>
            <p className="text-[10px] text-gray-600">{lang.native}</p>
            {selected === lang.code && (
              <motion.div
                layoutId="lang-check"
                className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      <p className="text-[9px] text-gray-700 mt-1.5">
        LLaMA 3 multilingual fine-tune · Auto-detects language from input · Responses generated natively
      </p>
    </div>
  );
}
