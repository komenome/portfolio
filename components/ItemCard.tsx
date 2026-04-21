"use client";

import { motion } from "framer-motion";
import type { PriceItem } from "@/data/types";

interface ItemCardProps {
  item: PriceItem;
  currency: string;
  index?: number;
}

export function ItemCard({ item, currency, index = 0 }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
    >
      <div className={`glass-card p-5 relative overflow-hidden select-none ${item.popular ? "glass-card-gold" : ""}`}>
        {item.popular && (
          <div className="popular-badge">
            ⭐ POPULAR
          </div>
        )}

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-black text-white tracking-tight">{item.amount}</span>
          <span className="text-xs text-gray-500 font-medium">{currency}</span>
        </div>

        <div className="divide-line my-3" />

        <div className="text-xl font-bold glow-cyan text-[#00e5ff]">{item.price}</div>
        {item.bonus && (
          <p className="text-xs text-gray-500 mt-1.5">
            +{item.bonus} <span className="text-gray-600">bonus</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}