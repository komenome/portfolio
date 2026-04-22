"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const games = [
  {
    name: "Mobile Legends",
    desc: "Diamonds, Passes & Bundles",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    iconColor: "text-[#00e5ff]",
    gradient: "from-[#00e5ff]/20 to-[#00e5ff]/0",
    border: "border-[#00e5ff]/10 hover:border-[#00e5ff]/30",
  },
  {
    name: "Magic Chess",
    desc: "Coming Soon",
    icon: <span className="text-4xl">♟️</span>,
    iconColor: "text-[#b347ff]",
    gradient: "from-[#b347ff]/20 to-[#b347ff]/0",
    border: "border-[#b347ff]/10 hover:border-[#b347ff]/30",
  },
  {
    name: "PUBG Mobile",
    desc: "UC, bundles & skins",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
        <line x1="12" y1="2" x2="12" y2="6"/>
        <line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="6" y2="12"/>
        <line x1="18" y1="12" x2="22" y2="12"/>
      </svg>
    ),
    iconColor: "text-[#ffd700]",
    gradient: "from-[#ffd700]/20 to-[#ffd700]/0",
    border: "border-[#ffd700]/10 hover:border-[#ffd700]/30",
  },
];

export function GamesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="section-label cyan mx-auto w-fit mb-4">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 6H3a1 1 0 00-1 1v4a1 1 0 001 1h18a1 1 0 001-1V7a1 1 0 00-1-1zM21 14H3a1 1 0 00-1 1v4a1 1 0 001 1h18a1 1 0 001-1v-4a1 1 0 00-1-1z"/>
          </svg>
          Supported Games
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
          Choose Your <span className="glow-cyan text-[#00e5ff]">Game</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {games.map((game) => (
          <Link
            key={game.name}
            href="/checker"
            className={`glass-card p-8 group relative overflow-hidden border ${game.border}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10">
              <div className={`mb-4 ${game.iconColor}`}>{game.icon}</div>
              <h3 className="font-heading text-xl font-bold text-white mb-2">{game.name}</h3>
              <p className="text-sm text-gray-500">{game.desc}</p>
              <span className="inline-flex items-center gap-1 text-[#00e5ff] text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                Browse
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
