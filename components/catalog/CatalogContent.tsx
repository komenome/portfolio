"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePrices } from "@/hooks/usePrices";
import { GameTabFilter } from "@/components/GameTabFilter";
import { ItemCard } from "@/components/ItemCard";

type GameId = "mlbb-global" | "mlbb-mysg" | "magic-chess" | "pubg-global";

function SectionDivider({ title, color = "cyan" }: { title: string; color?: "cyan" | "gold" }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className={`flex-1 h-px ${color === "gold" ? "bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent" : "bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"}`} />
      <span className={`section-label ${color}`}>
        {color === "gold" ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        )}
        {title}
      </span>
      <div className={`flex-1 h-px ${color === "gold" ? "bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent" : "bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"}`} />
    </div>
  );
}

export function CatalogContent() {
  const { games, loading, error, refetch } = usePrices();
  const [activeGame, setActiveGame] = useState<GameId>("mlbb-global");

  const currentGame = games.find((g) => g.gameId === activeGame);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="section-label cyan mx-auto w-fit mb-4">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
          Price List
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
          Top Up <span className="text-[#00e5ff] glow-cyan">Prices</span> in MMK
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Select your game and server. All prices in Myanmar Kyat.
        </p>
      </motion.div>

      {/* Tab Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center mb-10"
      >
        <GameTabFilter activeGame={activeGame} onGameChange={(id) => setActiveGame(id as GameId)} />
      </motion.div>

      {/* Game Info Bar */}
      {currentGame && (
        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          <span className="text-sm font-bold text-white">{currentGame.gameName}</span>
          {currentGame.currency && <span className="text-sm text-gray-500">({currentGame.currency})</span>}
          <button
            onClick={refetch}
            className="ml-2 p-1.5 rounded-lg text-gray-500 hover:text-[#00e5ff] hover:bg-white/[0.04] transition-all"
            title="Refresh prices"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="price-grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="skeleton h-32" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-10 text-center">
          <div className="text-5xl mb-4">😕</div>
          <p className="text-gray-400 mb-6">Failed to load prices. Please try again.</p>
          <button onClick={refetch} className="btn-primary">
            Try Again
          </button>
        </motion.div>
      )}

      {/* Not Available */}
      {!loading && !error && currentGame?.unavailable && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-12 text-center">
          <div className="text-5xl mb-4">🚧</div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">
            Prices Coming Soon
          </h3>
          <p className="text-gray-400 mb-6">
            {currentGame.gameName} prices are not available yet. Contact us on Telegram for latest pricing.
          </p>
          <a href="https://t.me/KomeNome" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Contact on Telegram
          </a>
        </motion.div>
      )}

      {/* Price Lists */}
      {!loading && !error && currentGame && !currentGame.unavailable && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          {activeGame === "mlbb-global" ? (
            <div>
              {/* Diamonds */}
              {currentGame.items.length > 0 && (
                <>
                  <SectionDivider title="Diamonds" />
                  <div className="price-grid mb-8">
                    {currentGame.items.map((item, i) => (
                      <ItemCard key={`dia-${item.amount}`} item={item} currency="Diamonds" index={i} />
                    ))}
                  </div>
                </>
              )}

              {/* Weekly Pass */}
              {currentGame.weeklyPass && currentGame.weeklyPass.length > 0 && (
                <>
                  <SectionDivider title="Weekly Diamond Pass" color="gold" />
                  <div className="price-grid mb-8">
                    {currentGame.weeklyPass.map((item, i) => (
                      <ItemCard key={`wp-${item.amount}`} item={item} currency="Pass" index={i} />
                    ))}
                  </div>
                </>
              )}

              {/* Double Diamond */}
              {currentGame.doubleDiamond && currentGame.doubleDiamond.length > 0 && (
                <>
                  <SectionDivider title="Double Diamond" />
                  <div className="price-grid">
                    {currentGame.doubleDiamond.map((item, i) => (
                      <ItemCard key={`dd-${item.amount}`} item={item} currency="" index={i} />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div>
              <SectionDivider title={currentGame.currency || "Items"} />
              <div className="price-grid">
                {(currentGame.items ?? []).map((item, i) => (
                  <ItemCard
                    key={`${activeGame}-${item.amount}`}
                    item={item}
                    currency={currentGame.currency ?? ""}
                    index={i}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20 glass p-10 text-center"
      >
        <h3 className="font-heading text-xl font-bold text-white mb-2">
          Can&apos;t find what you&apos;re looking for?
        </h3>
        <p className="text-gray-400 mb-6">Contact us and we&apos;ll help you find the item you need.</p>
        <a href="https://t.me/KomeNome" target="_blank" rel="noopener noreferrer" className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.76-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.92 1.22-5.42 3.58-.51.35-.97.52-1.38.51-.46-.01-1.34-.26-1.99-.47-.8-.26-1.44-.4-1.39-.85.03-.24.36-.49 1-.74 3.91-1.7 6.52-2.83 7.82-3.37 3.72-1.55 4.49-1.82 4.99-1.83.11 0 .36.03.52.17.13.12.17.28.19.45-.01.06.01.24 0 .38z"/>
          </svg>
          Contact on Telegram
        </a>
      </motion.div>
    </div>
  );
}
