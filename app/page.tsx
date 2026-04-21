"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { value: "700+", label: "Successful Trades" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "9AM–11PM", label: "Support Available" },
];

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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,229,255,0.08)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(179,71,255,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_#06060b_100%)] opacity-60" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00e5ff]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#b347ff]/[0.03] rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label cyan mb-8 mx-auto w-fit">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Trusted Game Top-Up Service
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-[#00e5ff] via-[#7c4dff] to-[#b347ff] bg-clip-text text-transparent">
                BINGO
              </span>
              <br />
              <span className="text-white">Game Top Up</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Premium Mobile Legends, Magic Chess, and PUBG Mobile top-up services.
              Best prices in Myanmar Kyat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/catalog" className="btn-primary">
                Browse Catalog
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <a href="https://t.me/KomeNome" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Contact via Telegram
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-3xl font-bold text-white glow-cyan">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#06060b] to-transparent" />
      </section>

      {/* Games Section */}
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

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00e5ff]/5 to-[#b347ff]/5" />
          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
              Contact us on Telegram for the fastest response. We process orders within minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://t.me/KomeNome" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.76-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.92 1.22-5.42 3.58-.51.35-.97.52-1.38.51-.46-.01-1.34-.26-1.99-.47-.8-.26-1.44-.4-1.39-.85.03-.24.36-.49 1-.74 3.91-1.7 6.52-2.83 7.82-3.37 3.72-1.55 4.49-1.82 4.99-1.83.11 0 .36.03.52.17.13.12.17.28.19.45-.01.06.01.24 0 .38z"/>
                </svg>
                Contact via Telegram
              </a>
              <Link href="/catalog" className="btn-outline">
                Browse Catalog
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}