"use client";

import { motion } from "framer-motion";

const features = [
  {
    emoji: "⚡",
    title: "Fast Delivery",
    desc: "Orders are processed within minutes. No waiting around — get your diamonds and items instantly.",
    gradient: "from-[#00e5ff]/10 to-transparent",
    border: "hover:border-[#00e5ff]/20",
  },
  {
    emoji: "🛡️",
    title: "Safe & Secure",
    desc: "500+ successful trades with zero issues. Your account safety is our top priority.",
    gradient: "from-[#b347ff]/10 to-transparent",
    border: "hover:border-[#b347ff]/20",
  },
  {
    emoji: "💬",
    title: "9 AM – 11 PM Support",
    desc: "Our team is available on Telegram, Facebook, and Viber during business hours to help you with any questions.",
    gradient: "from-[#ffd700]/10 to-transparent",
    border: "hover:border-[#ffd700]/20",
  },
  {
    emoji: "💰",
    title: "Best Prices",
    desc: "Competitive pricing in MMK with regular discounts and promotions for loyal customers.",
    gradient: "from-[#00e5ff]/10 to-transparent",
    border: "hover:border-[#00e5ff]/20",
  },
];

export function AboutContent() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="section-label cyan mx-auto w-fit mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            About BINGO
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Your Trusted <span className="text-[#00e5ff] glow-cyan">Game Top-Up</span> Service
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
            Fast, reliable, and affordable game top-up service for Myanmar gamers.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`glass-card p-7 relative overflow-hidden border ${f.border}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-50 pointer-events-none`} />
              <div className="relative z-10">
                <span className="text-3xl mb-4 block">{f.emoji}</span>
                <h2 className="font-heading font-semibold text-white text-lg mb-2">{f.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 glass p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/5 to-[#b347ff]/5" />
          <div className="relative z-10">
            <h3 className="font-heading text-2xl font-bold text-white mb-3">Ready to top up?</h3>
            <p className="text-gray-400 mb-6">Contact us on Telegram for the fastest response.</p>
            <a
              href="https://t.me/KomeNome"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.76-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.92 1.22-5.42 3.58-.51.35-.97.52-1.38.51-.46-.01-1.34-.26-1.99-.47-.8-.26-1.44-.4-1.39-.85.03-.24.36-.49 1-.74 3.91-1.7 6.52-2.83 7.82-3.37 3.72-1.55 4.49-1.82 4.99-1.83.11 0 .36.03.52.17.13.12.17.28.19.45-.01.06.01.24 0 .38z"/>
              </svg>
              Contact on Telegram
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
