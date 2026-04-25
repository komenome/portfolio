"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { value: "700+", label: "Successful Trades" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "9AM–11PM", label: "Support Available" },
];

export function HeroSection() {
  return (
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
            Trusted Game Shop Service
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[#00e5ff] via-[#7c4dff] to-[#b347ff] bg-clip-text text-transparent">
              BINGO
            </span>
            <br />
            <span className="text-white">Game Shop</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Mobile Legends, Magic Chess, and PUBG Mobile top-up services.
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
  );
}
