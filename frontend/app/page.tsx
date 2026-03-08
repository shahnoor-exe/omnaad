'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

const channels = [
  { icon: '📞', label: 'IVR Call Centre', color: 'from-blue-500 to-blue-700' },
  { icon: '📱', label: 'Mobile App', color: 'from-cyan-500 to-cyan-700' },
  { icon: '💬', label: 'WhatsApp', color: 'from-green-500 to-green-700' },
  { icon: '📧', label: 'Email', color: 'from-purple-500 to-purple-700' },
  { icon: '🏦', label: 'Branch', color: 'from-amber-500 to-amber-700' },
  { icon: '🤖', label: 'Website Chatbot', color: 'from-pink-500 to-pink-700' },
];

const features = [
  {
    icon: '🧠',
    title: 'Real-Time NLP Engine',
    desc: 'BERT intent classification + RoBERTa sentiment analysis in <200ms',
    prod: 'BERT fine-tuned on banking corpus | 8-class intent | F1: 0.92',
  },
  {
    icon: '🌐',
    title: '8 Indian Languages',
    desc: 'Hindi, Punjabi, Marathi, Tamil, Telugu, Bengali, Gujarati, Kannada',
    prod: 'LLaMA 3 8B via Ollama | IndicBERT tokenizer | Self-hosted',
  },
  {
    icon: '🛡️',
    title: '3-Layer Compliance Gate',
    desc: 'TRAI DNC + DPDP Act 2023 + 30 RBI Rules checked before every send',
    prod: 'TRAI DLT API + PostgreSQL consent DB + LLM rule scanner',
  },
  {
    icon: '📊',
    title: 'Predictive Churn Engine',
    desc: 'ML-powered risk scoring with proactive retention triggers',
    prod: 'XGBoost + behavioral signals + Apache Airflow DAGs',
  },
  {
    icon: '⚡',
    title: 'Apache Kafka Pipeline',
    desc: '10,000+ events/sec from 6 channels unified in real-time',
    prod: 'Kafka topics per channel + Debezium CDC + Elasticsearch',
  },
  {
    icon: '🔐',
    title: 'Bank-Grade Security',
    desc: 'AES-256 encryption + TLS 1.3 + RBAC — data never leaves BOI servers',
    prod: 'Docker + Kubernetes | 3-crore user capacity | Zero data leakage',
  },
];

const techStack = {
  demo: [
    { name: 'Next.js 14', icon: '▲' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'TailwindCSS', icon: '🎨' },
    { name: 'Framer Motion', icon: '🎭' },
    { name: 'FastAPI', icon: '⚡' },
    { name: 'Recharts', icon: '📊' },
  ],
  production: [
    { name: 'Apache Kafka', icon: '🔄' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Redis', icon: '🔴' },
    { name: 'Neo4j', icon: '🕸️' },
    { name: 'LLaMA 3', icon: '🦙' },
    { name: 'BERT', icon: '🧠' },
    { name: 'Kubernetes', icon: '☸️' },
    { name: 'Elasticsearch', icon: '🔍' },
  ],
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-600/10 via-violet-600/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-to-tl from-emerald-600/10 via-cyan-600/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-gray-800/50 backdrop-blur-xl bg-gray-950/70">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">
            ॐ
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            OmNaad
          </span>
          <span className="text-[10px] text-gray-500 font-mono border border-gray-700/50 rounded px-1.5 py-0.5">
            DEMO v1.0
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Link
            href="/dashboard"
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            Agent Console
          </Link>
          <Link
            href="/dashboard/supervisor"
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            Supervisor
          </Link>
          <Link
            href="/dashboard"
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-medium rounded-lg px-4 py-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
          >
            Launch Demo →
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        {/* Floating channel icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {channels.map((ch, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-20"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                y: [0, -20, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0],
              }}
              transition={{ repeat: Infinity, duration: 4 + i * 0.5, delay: i * 0.3 }}
              style={{
                top: `${15 + (i * 13) % 70}%`,
                left: `${5 + (i * 17) % 85}%`,
              }}
            >
              {ch.icon}
            </motion.div>
          ))}
        </div>

        {/* Bank of India badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-amber-950/30 border border-amber-500/20 text-amber-300 text-xs font-mono rounded-full px-4 py-1.5">
            🏦 Bank of India — PSBs Hackathon IDEA 2.0
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div style={{ y }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
            className="text-6xl md:text-8xl font-black mb-4 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              OmNaad
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-2 font-light"
          >
            Omni-Channel AI Communication Orchestrator
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto mb-8"
          >
            Unifying <span className="text-blue-400 font-semibold">6 channels</span> · <span className="text-violet-400 font-semibold">8 Indian languages</span> · <span className="text-emerald-400 font-semibold">Real-time AI</span> · <span className="text-amber-400 font-semibold">RBI Compliant</span>
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4 mb-12"
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-lg rounded-xl px-8 py-4 shadow-2xl shadow-blue-500/20 transition-all"
            >
              🚀 Launch Agent Console
            </motion.button>
          </Link>
          <Link href="/dashboard/supervisor">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800/50 border border-gray-700/50 text-gray-300 font-medium text-lg rounded-xl px-8 py-4 hover:bg-gray-800/80 transition-all"
            >
              📊 Supervisor Dashboard
            </motion.button>
          </Link>
        </motion.div>

        {/* Channel Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {channels.map((ch, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white shadow-lg bg-gray-800/40 border border-gray-700/30"
            >
              <span className="text-lg">{ch.icon}</span>
              <span className="text-gray-300 text-xs font-medium">{ch.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-gray-600 text-sm"
        >
          ↓ Scroll to explore
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-center mb-4"
        >
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Intelligent Features
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-500 text-center mb-12 max-w-xl mx-auto"
        >
          Every feature is AI-powered, RBI-compliant, and designed for 3 crore+ customers
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 group cursor-default"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{f.desc}</p>
              <div className="text-[10px] text-blue-400 font-mono bg-blue-950/30 border border-blue-700/20 rounded-lg px-2 py-1">
                ⚡ PRODUCTION: {f.prod}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-center mb-12"
        >
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Tech Stack
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Demo stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900/60 border border-gray-800/50 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-blue-400 mb-1">🔬 Demo Version</h3>
            <p className="text-xs text-gray-500 mb-4">What&apos;s running right now</p>
            <div className="grid grid-cols-2 gap-3">
              {techStack.demo.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30 flex items-center gap-2"
                >
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-sm text-gray-300">{t.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Production stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900/60 border border-violet-500/20 rounded-2xl p-6 glow-violet"
          >
            <h3 className="text-lg font-bold text-violet-400 mb-1">⚡ Production Version</h3>
            <p className="text-xs text-gray-500 mb-4">What powers the full system</p>
            <div className="grid grid-cols-2 gap-3">
              {techStack.production.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-violet-950/30 rounded-xl p-3 border border-violet-500/20 flex items-center gap-2"
                >
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-sm text-violet-200">{t.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Scenarios CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-700/50 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-black mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
              5 Live Demo Scenarios
            </span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Experience the full OmNaad journey — from angry customer resolution to fraud spike detection — all with real-time animations and AI-powered responses.
          </p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(245,158,11,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-lg rounded-xl px-10 py-4 shadow-2xl"
            >
              🎬 Start Demo Experience
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 py-8 px-6 text-center">
        <p className="text-sm text-gray-600">
          OmNaad — Bank of India Omni-Channel AI Platform | PSBs Hackathon IDEA 2.0
        </p>
        <p className="text-xs text-gray-700 mt-1">
          Built with GitHub Copilot + Next.js + FastAPI | Deployed on Vercel
        </p>
      </footer>
    </div>
  );
}
